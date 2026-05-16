"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Briefcase,
  MapPin,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  FileText,
  RefreshCw,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import { apiRequest } from "@/lib/api";
import type { JobMatch, JobMatchAnalysis } from "@/types";
import { getMatchLabel } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface JobMatchDetailClientProps {
  job: JobMatch;
}

function MatchBadge({ pct }: { pct: number }) {
  const colorClass =
    pct >= 80
      ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
      : pct >= 60
        ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20"
        : "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20";

  return (
    <div className={cn("inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-sm font-semibold", colorClass)}>
      <span className="text-lg font-bold">{pct}%</span>
      <span className="text-xs opacity-80">{getMatchLabel(pct)}</span>
    </div>
  );
}

export default function JobMatchDetailClient({ job }: JobMatchDetailClientProps) {
  const [analysis, setAnalysis] = useState<JobMatchAnalysis>(job.analysis);
  const [reanalyzing, setReanalyzing] = useState(false);
  const [fetchingDetails, setFetchingDetails] = useState(false);
  const id = job._id ?? job.id;

  const hasJobSpecificDetails =
    analysis.jobSpecificMessage ||
    analysis.jobSpecificEmail ||
    (analysis.jobSpecificInterviewQuestions?.length ?? 0) > 0 ||
    (analysis.jobSpecificTips?.length ?? 0) > 0;

  async function handleReanalyze() {
    setReanalyzing(true);
    try {
      const response = await apiRequest(`job-match/${id}/reanalyze`, { method: "POST" });
      if (response.success && response.data?.analysis) {
        setAnalysis(response.data.analysis);
        toast.success("Reanalysis complete");
      } else {
        toast.error(response.message || "Reanalysis failed. Please try again.");
      }
    } catch {
      toast.error("Reanalysis failed. Please try again.");
    } finally {
      setReanalyzing(false);
    }
  }

  async function handleGetJobSpecificDetails() {
    setFetchingDetails(true);
    try {
      const response = await apiRequest(`job-match/get-job-specific-details/${id}`, { method: "GET" });
      if (response.success && response.data?.analysis) {
        setAnalysis(response.data.analysis);
        toast.success("Job-specific details generated");
      } else {
        toast.error(response.message || "Failed to generate details. Please try again.");
      }
    } catch {
      toast.error("Failed to generate details. Please try again.");
    } finally {
      setFetchingDetails(false);
    }
  }

  return (
    <div className="space-y-5">
      {/* Header card */}
      <Card className="overflow-hidden">
        <div className="h-1 w-full bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500" />
        <CardContent className="p-5 sm:p-6 space-y-4">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="min-w-0">
              <h1 className="text-xl sm:text-2xl font-bold leading-tight mb-1.5">
                {job.jobTitle}
              </h1>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Briefcase className="h-3.5 w-3.5 shrink-0" />
                  {job.company}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 shrink-0" />
                  {job.location}
                </span>
              </div>
            </div>
            <MatchBadge pct={analysis.matchingPercentage} />
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              className="rounded-lg gap-1.5"
              onClick={handleReanalyze}
              disabled={reanalyzing}
            >
              <RefreshCw className={cn("h-3.5 w-3.5", reanalyzing && "animate-spin")} />
              {reanalyzing ? "Analysing…" : "Reanalyse"}
            </Button>

            {!hasJobSpecificDetails ? (
              <Button
                variant="outline"
                size="sm"
                className="rounded-lg gap-1.5"
                onClick={handleGetJobSpecificDetails}
                disabled={fetchingDetails}
              >
                <Sparkles className={cn("h-3.5 w-3.5", fetchingDetails && "animate-pulse")} />
                {fetchingDetails ? "Generating…" : "Get Job Details"}
              </Button>
            ) : (
              <Button variant="outline" size="sm" className="rounded-lg gap-1.5" asChild>
                <Link href={`/job-specific-details/${id}`}>
                  <Sparkles className="h-3.5 w-3.5" />
                  View Job Details
                </Link>
              </Button>
            )}

            <Button variant="outline" size="sm" className="rounded-lg gap-1.5" asChild>
              <a href={job.jobUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-3.5 w-3.5" />
                View Job
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Strengths & Areas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card className="border-emerald-500/20">
          <CardHeader className="pb-2 pt-4 px-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5" /> Strengths
            </p>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <ul className="space-y-2">
              {analysis.strengths.map((s, i) => (
                <li key={i} className="text-sm flex gap-2">
                  <span className="text-emerald-500 shrink-0 mt-0.5">•</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="border-amber-500/20">
          <CardHeader className="pb-2 pt-4 px-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
              <AlertTriangle className="h-3.5 w-3.5" /> Areas to Improve
            </p>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <ul className="space-y-2">
              {analysis.areasToImprove.map((a, i) => (
                <li key={i} className="text-sm flex gap-2">
                  <span className="text-amber-500 shrink-0 mt-0.5">•</span>
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Resume Feedback */}
      <Card className="border-primary/20">
        <CardHeader className="pb-2 pt-4 px-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary flex items-center gap-1.5">
            <FileText className="h-3.5 w-3.5" /> Resume Feedback
          </p>
        </CardHeader>
        <CardContent className="px-4 pb-4">
          <ul className="space-y-2">
            {analysis.resumeFeedback.map((f, i) => (
              <li key={i} className="text-sm flex gap-2">
                <span className="text-primary shrink-0 mt-0.5">•</span>
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Detailed Analysis */}
      <Card>
        <CardHeader className="pb-2 pt-4 px-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Detailed Analysis
          </p>
        </CardHeader>
        <CardContent className="px-4 pb-4">
          <p className="text-sm text-muted-foreground leading-relaxed">
            {analysis.detailedAnalysis}
          </p>
        </CardContent>
      </Card>

      <p className="text-xs text-muted-foreground text-center pb-2">
        Analysed{" "}
        {new Date(analysis.analyzedAt).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })}
      </p>
    </div>
  );
}
