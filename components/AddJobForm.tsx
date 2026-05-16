"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { apiRequest } from "@/lib/api";
import { Link2, Sparkles, AlertCircle } from "lucide-react";

export default function AddJobForm() {
  const router = useRouter();
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiRequest("job-match/analyze-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobUrl: url }),
      });

      if (response.success && response.data?._id) {
        router.push(`/dashboard/job-match/${response.data._id}`);
      } else {
        setError(response.message || "Failed to analyze job. Please try again.");
      }
    } catch {
      setError("An error occurred while analyzing the job. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
          <Link2 className="h-5 w-5 text-primary" />
        </div>
        <div>
          <p className="font-semibold">Paste a job URL</p>
          <p className="text-sm text-muted-foreground">Works with LinkedIn, Indeed, Glassdoor, and any job board</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          id="url"
          type="url"
          placeholder="https://www.linkedin.com/jobs/view/…"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
          disabled={isLoading}
          className="h-12 rounded-xl text-base"
        />

        <Button
          type="submit"
          className="w-full h-12 text-base rounded-xl font-semibold"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <div className="h-4 w-4 rounded-full border-2 border-primary-foreground border-t-transparent animate-spin mr-2" />
              Analysing with AI…
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4 mr-2" />
              Analyse with AI
            </>
          )}
        </Button>
      </form>

      {error && (
        <div className="flex items-start gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400">
          <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      {isLoading && (
        <div className="rounded-xl bg-primary/5 border border-primary/10 p-4 text-sm text-muted-foreground text-center">
          <Sparkles className="h-4 w-4 inline mr-1.5 text-primary animate-pulse" />
          AI is reading the job posting and matching it to your profile…
        </div>
      )}
    </div>
  );
}
