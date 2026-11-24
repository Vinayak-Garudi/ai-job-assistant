"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { apiRequest } from "@/lib/api";
import {
  LoginPromptDialog,
  useLoginPrompt,
} from "@/components/guest/LoginPromptDialog";

interface AddJobFormProps {
  isGuest?: boolean;
}

type Mode = "url" | "manual";

// Backend error code returned when a job URL can't be scraped
const JOB_SCRAPE_FAILED = "JOB_SCRAPE_FAILED";
const MIN_DESCRIPTION_LENGTH = 50;

export default function AddJobForm({ isGuest = false }: AddJobFormProps) {
  const router = useRouter();
  // Manual entry is only offered as a fallback when URL extraction fails
  const [mode, setMode] = useState<Mode>("url");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { guard, dialogProps } = useLoginPrompt(isGuest);

  const switchToUrlMode = () => {
    setMode("url");
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guard("analyse a job posting")) return;
    setIsLoading(true);
    setError(null);

    try {
      const response =
        mode === "url"
          ? await apiRequest("job-match/analyze-url", {
              method: "POST",
              body: JSON.stringify({ jobUrl: url }),
            })
          : await apiRequest("job-match/analyze-manual", {
              method: "POST",
              body: JSON.stringify({
                jobTitle: title.trim(),
                company: company.trim(),
                location: location.trim(),
                jobDescription: description.trim(),
                // Keep the original link on the saved analysis
                ...(url && { jobUrl: url }),
              }),
            });

      if (response.success && response.data?._id) {
        router.push(`/dashboard/job-match/${response.data._id}`);
        return;
      }

      if (mode === "url" && response.errorCode === JOB_SCRAPE_FAILED) {
        setMode("manual");
        return;
      }

      setError(response.message || "Failed to analyze job. Please try again.");
    } catch (err) {
      console.error("Error analyzing job:", err);
      setError("An error occurred while analyzing the job. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>
            {mode === "url" ? "Enter Job Posting URL" : "Enter Job Details"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "url" ? (
              <div className="space-y-2">
                <Input
                  id="url"
                  type="url"
                  placeholder="https://example.com/job-posting"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Paste a link from LinkedIn, Indeed, or any job board
                </p>
              </div>
            ) : (
              <>
                <div className="flex gap-3 p-3 rounded-md bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
                  <AlertTriangle className="h-4 w-4 mt-0.5 shrink-0 text-amber-600 dark:text-amber-400" />
                  <div className="space-y-1 min-w-0">
                    <p className="text-sm font-medium text-amber-800 dark:text-amber-300">
                      We couldn&apos;t read this job posting automatically
                    </p>
                    <p className="text-sm text-amber-700 dark:text-amber-400">
                      The page may require login or block automated access.
                      Copy the job description from the posting and paste it
                      below.
                    </p>
                    {url && (
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-xs text-amber-700 dark:text-amber-400 underline truncate"
                      >
                        {url}
                      </a>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="title" className="text-sm font-medium">
                    Job Title
                  </label>
                  <Input
                    id="title"
                    type="text"
                    placeholder="e.g., Senior Software Engineer"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    minLength={2}
                    maxLength={200}
                    required
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="company" className="text-sm font-medium">
                      Company{" "}
                      <span className="text-muted-foreground font-normal">
                        (optional)
                      </span>
                    </label>
                    <Input
                      id="company"
                      type="text"
                      placeholder="e.g., Tech Corp"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      maxLength={200}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="location" className="text-sm font-medium">
                      Location{" "}
                      <span className="text-muted-foreground font-normal">
                        (optional)
                      </span>
                    </label>
                    <Input
                      id="location"
                      type="text"
                      placeholder="e.g., San Francisco, CA"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      maxLength={200}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="description" className="text-sm font-medium">
                    Job Description
                  </label>
                  <textarea
                    id="description"
                    className="flex min-h-[200px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Paste the full job description here..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    minLength={MIN_DESCRIPTION_LENGTH}
                    required
                    autoFocus
                  />
                  <p className="text-xs text-muted-foreground">
                    Include requirements, responsibilities, and any other
                    relevant details (at least {MIN_DESCRIPTION_LENGTH}{" "}
                    characters)
                  </p>
                </div>
              </>
            )}

            <Button
              type={isGuest ? "button" : "submit"}
              className="w-full"
              disabled={isLoading}
              onClick={
                isGuest ? () => guard("analyse a job posting") : undefined
              }
            >
              {isLoading ? "Analyzing..." : "Analyze with AI"}
            </Button>

            {mode === "manual" && (
              <Button
                type="button"
                variant="ghost"
                className="w-full"
                disabled={isLoading}
                onClick={switchToUrlMode}
              >
                <ArrowLeft className="h-4 w-4" />
                Try a different URL
              </Button>
            )}

            {error && (
              <div className="p-3 rounded-md bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                <p className="text-sm text-red-600 dark:text-red-400">
                  {error}
                </p>
              </div>
            )}
          </form>
        </CardContent>
      </Card>

      <LoginPromptDialog {...dialogProps} />
    </>
  );
}
