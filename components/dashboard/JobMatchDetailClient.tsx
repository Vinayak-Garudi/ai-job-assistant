"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Briefcase,
  MapPin,
  ExternalLink,
  CheckCircle,
  AlertCircle,
  FileText,
  RefreshCw,
} from "lucide-react";
import { toast } from "sonner";
import { apiRequest } from "@/lib/api";
import type { JobMatch, JobMatchAnalysis } from "@/types";

function getMatchColor(percentage: number) {
  if (percentage >= 80)
    return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
  if (percentage >= 60)
    return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
  return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
}

function getMatchLabel(percentage: number) {
  if (percentage >= 80) return "Excellent Match";
  if (percentage >= 60) return "Good Match";
  return "Needs Work";
}

interface JobMatchDetailClientProps {
  job: JobMatch;
}

export default function JobMatchDetailClient({
  job,
}: JobMatchDetailClientProps) {
  const [analysis, setAnalysis] = useState<JobMatchAnalysis>(job.analysis);
  const [reanalyzing, setReanalyzing] = useState(false);
  const id = job._id ?? job.id;

  async function handleReanalyze() {
    setReanalyzing(true);
    try {
      const response = await apiRequest(`job-match/${id}/reanalyze`, {
        method: "POST",
      });
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

  return (
    <>
      {/* Header card */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start gap-4">
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl font-bold leading-tight mb-2">
                {job.jobTitle}
              </h1>
              <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
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
            <div className="flex items-center gap-2 shrink-0 flex-wrap justify-end">
              <Badge className={getMatchColor(analysis.matchingPercentage)}>
                {analysis.matchingPercentage}% —{" "}
                {getMatchLabel(analysis.matchingPercentage)}
              </Badge>
              <Button
                variant="outline"
                size="sm"
                className="gap-1.5"
                onClick={handleReanalyze}
                disabled={reanalyzing}
              >
                <RefreshCw
                  className={`h-3.5 w-3.5 ${reanalyzing ? "animate-spin" : ""}`}
                />
                {reanalyzing ? "Analyzing…" : "Reanalyze"}
              </Button>
              <a
                href={job.jobUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View job posting"
              >
                <Button variant="outline" size="sm" className="gap-1.5">
                  <ExternalLink className="h-3.5 w-3.5" />
                  View Job
                </Button>
              </a>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            {job.shortDescription}
          </p>
        </CardContent>
      </Card>

      {/* Strengths & Areas to Improve */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-green-600 dark:text-green-400 flex items-center gap-1">
              <CheckCircle className="h-3.5 w-3.5" /> Strengths
            </p>
          </CardHeader>
          <CardContent>
            <ul className="space-y-1.5">
              {analysis.strengths.map((s, i) => (
                <li key={i} className="text-sm flex gap-2">
                  <span className="text-green-500 shrink-0 mt-0.5">•</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-amber-600 dark:text-amber-400 flex items-center gap-1">
              <AlertCircle className="h-3.5 w-3.5" /> Areas to Improve
            </p>
          </CardHeader>
          <CardContent>
            <ul className="space-y-1.5">
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
      <Card>
        <CardHeader className="pb-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400 flex items-center gap-1">
            <FileText className="h-3.5 w-3.5" /> Resume Feedback
          </p>
        </CardHeader>
        <CardContent>
          <ul className="space-y-1.5">
            {analysis.resumeFeedback.map((f, i) => (
              <li key={i} className="text-sm flex gap-2">
                <span className="text-blue-500 shrink-0 mt-0.5">•</span>
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Detailed Analysis */}
      <Card>
        <CardHeader className="pb-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Detailed Analysis
          </p>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {analysis.detailedAnalysis}
          </p>
        </CardContent>
      </Card>

      {/* Footer */}
      <p className="text-xs text-muted-foreground text-center">
        Analyzed{" "}
        {new Date(analysis.analyzedAt).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })}
      </p>
    </>
  );
}
