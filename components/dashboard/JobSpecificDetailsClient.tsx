"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  RefreshCw,
  MessageSquare,
  Mail,
  HelpCircle,
  Lightbulb,
  Copy,
  Check,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import { apiRequest } from "@/lib/api";
import type { JobMatch, JobMatchAnalysis } from "@/types";

interface JobSpecificDetailsClientProps {
  job: JobMatch;
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      onClick={handleCopy}
      className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded"
      aria-label="Copy to clipboard"
    >
      {copied ? (
        <Check className="h-3.5 w-3.5 text-green-500" />
      ) : (
        <Copy className="h-3.5 w-3.5" />
      )}
    </button>
  );
}

export default function JobSpecificDetailsClient({
  job,
}: JobSpecificDetailsClientProps) {
  const [analysis, setAnalysis] = useState<JobMatchAnalysis>(job.analysis);
  const [fetchingDetails, setFetchingDetails] = useState(false);
  const id = job._id ?? job.id;

  const hasDetails =
    analysis.jobSpecificMessage ||
    analysis.jobSpecificEmail ||
    (analysis.jobSpecificInterviewQuestions?.length ?? 0) > 0 ||
    (analysis.jobSpecificTips?.length ?? 0) > 0;

  async function handleRegenerate() {
    setFetchingDetails(true);
    try {
      const response = await apiRequest(
        `job-match/get-job-specific-details/${id}`,
        { method: "GET" }
      );
      if (response.success && response.data?.analysis) {
        setAnalysis(response.data.analysis);
        toast.success("Job-specific details regenerated");
      } else {
        toast.error(
          response.message || "Failed to generate details. Please try again."
        );
      }
    } catch {
      toast.error("Failed to generate details. Please try again.");
    } finally {
      setFetchingDetails(false);
    }
  }

  if (!hasDetails) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <Sparkles className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
          <h3 className="text-lg font-semibold mb-2">No Details Yet</h3>
          <p className="text-muted-foreground text-sm max-w-sm mx-auto mb-4">
            Job-specific details haven&apos;t been generated for this job yet.
          </p>
          <Button onClick={handleRegenerate} disabled={fetchingDetails}>
            <Sparkles
              className={`h-4 w-4 mr-2 ${fetchingDetails ? "animate-pulse" : ""}`}
            />
            {fetchingDetails ? "Generating…" : "Generate Details"}
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-purple-500" />
          <h2 className="text-base font-semibold">Job-Specific Details</h2>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="gap-1.5"
          onClick={handleRegenerate}
          disabled={fetchingDetails}
        >
          <RefreshCw
            className={`h-3.5 w-3.5 ${fetchingDetails ? "animate-spin" : ""}`}
          />
          {fetchingDetails ? "Regenerating…" : "Regenerate"}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {analysis.jobSpecificMessage && (
          <Card className="flex flex-col">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-wide text-purple-600 dark:text-purple-400 flex items-center gap-1">
                  <MessageSquare className="h-3.5 w-3.5" /> LinkedIn DM
                </p>
                <CopyButton text={analysis.jobSpecificMessage} />
              </div>
            </CardHeader>
            <CardContent className="flex-1">
              <p className="text-sm leading-relaxed whitespace-pre-wrap">
                {analysis.jobSpecificMessage}
              </p>
            </CardContent>
          </Card>
        )}

        {analysis.jobSpecificEmail && (
          <Card className="flex flex-col">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
                  <Mail className="h-3.5 w-3.5" /> Outreach Email
                </p>
                <CopyButton text={analysis.jobSpecificEmail} />
              </div>
            </CardHeader>
            <CardContent className="flex-1">
              <p className="text-sm leading-relaxed whitespace-pre-wrap">
                {analysis.jobSpecificEmail}
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {(analysis.jobSpecificInterviewQuestions?.length ?? 0) > 0 && (
          <Card>
            <CardHeader className="pb-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-rose-600 dark:text-rose-400 flex items-center gap-1">
                <HelpCircle className="h-3.5 w-3.5" /> Interview Questions
              </p>
            </CardHeader>
            <CardContent>
              <ol className="space-y-2">
                {analysis.jobSpecificInterviewQuestions!.map((q, i) => (
                  <li key={i} className="text-sm flex gap-2.5">
                    <span className="text-rose-500 font-medium shrink-0 w-5 text-right">
                      {i + 1}.
                    </span>
                    <span>{q}</span>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        )}

        {(analysis.jobSpecificTips?.length ?? 0) > 0 && (
          <Card>
            <CardHeader className="pb-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-teal-600 dark:text-teal-400 flex items-center gap-1">
                <Lightbulb className="h-3.5 w-3.5" /> Application Tips
              </p>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {analysis.jobSpecificTips!.map((tip, i) => (
                  <li key={i} className="text-sm flex gap-2">
                    <span className="text-teal-500 shrink-0 mt-0.5">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
