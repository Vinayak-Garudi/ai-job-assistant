"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { apiRequest } from "@/lib/api";
import JobAnalysisResult from "./JobAnalysisResult";

interface AnalysisData {
  matchingPercentage: number;
  strengths: string[];
  areasToImprove: string[];
  detailedAnalysis: string;
  analyzedAt: string;
}

export default function AddJobForm() {
  const [mode, setMode] = useState<"url" | "manual">("url");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [analysisResult, setAnalysisResult] = useState<AnalysisData | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);

    console.log("Submitting job with mode:", mode, url);
    if (mode === "url") {
      try {
        // Handle URL submission
        console.log("Job URL:", url);

        const response = await apiRequest("job-match/analyze-url", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ jobUrl: url }),
        });
        console.log("API Response:", response);

        if (response.success && response.data?.analysis) {
          setAnalysisResult(response.data.analysis);
        } else {
          setError(
            response.message || "Failed to analyze job. Please try again.",
          );
        }
      } catch (err) {
        console.error("Error analyzing job:", err);
        setError(
          "An error occurred while analyzing the job. Please try again.",
        );
      } finally {
        setIsLoading(false);
      }
    } else {
      // Handle manual submission
      console.log("Job Details:", {
        title,
        company,
        location,
        description,
      });
      setIsLoading(false);
    }
    // Reset form
    // setUrl("");
    // setDescription("");
    // setTitle("");
    // setCompany("");
    // setLocation("");
  };

  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Enter Job Details</CardTitle>
          <CardDescription>Add a job by URL</CardDescription>
        </CardHeader>
        <CardContent>
          {/* <div className="flex gap-2 mb-6">
          <Button
            type="button"
            variant={mode === "url" ? "default" : "outline"}
            onClick={() => setMode("url")}
            className="flex-1"
          >
            From URL
          </Button>
          <Button
            type="button"
            variant={mode === "manual" ? "default" : "outline"}
            onClick={() => setMode("manual")}
            className="flex-1"
          >
            Manual Entry
          </Button>
        </div> */}

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "url" ? (
              <div className="space-y-2">
                <label htmlFor="url" className="text-sm font-medium">
                  Job Posting URL
                </label>
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
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="company" className="text-sm font-medium">
                    Company
                  </label>
                  <Input
                    id="company"
                    type="text"
                    placeholder="e.g., Tech Corp"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="location" className="text-sm font-medium">
                    Location
                  </label>
                  <Input
                    id="location"
                    type="text"
                    placeholder="e.g., San Francisco, CA"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                  />
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
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Include requirements, responsibilities, and any other
                    relevant details
                  </p>
                </div>
              </>
            )}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Analyzing..." : "Analyze with AI"}
            </Button>

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

      {analysisResult && (
        <JobAnalysisResult analysis={analysisResult} jobUrl={url} />
      )}
    </>
  );
}
