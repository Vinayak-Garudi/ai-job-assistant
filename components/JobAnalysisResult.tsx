"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface JobAnalysisResultProps {
  analysis: {
    matchingPercentage: number;
    strengths: string[];
    areasToImprove: string[];
    detailedAnalysis: string;
    analyzedAt: string;
  };
  jobUrl: string;
}

export default function JobAnalysisResult({
  analysis,
  jobUrl,
}: JobAnalysisResultProps) {
  const getMatchColor = (percentage: number) => {
    if (percentage >= 80) return "bg-green-500";
    if (percentage >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getMatchLabel = (percentage: number) => {
    if (percentage >= 80) return "Excellent Match";
    if (percentage >= 60) return "Good Match";
    return "Needs Improvement";
  };

  return (
    <div className="space-y-6 mt-8">
      {/* Match Score Card */}
      <Card>
        <CardHeader>
          <CardTitle>Match Analysis</CardTitle>
          <CardDescription>
            AI-powered analysis of your profile match with this job
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-4">
            {/* <div className="relative">
              <svg className="transform -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  className="text-gray-200 dark:text-gray-700"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 56}`}
                  strokeDashoffset={`${
                    2 * Math.PI * 56 * (1 - analysis.matchingPercentage / 100)
                  }`}
                  className={getMatchColor(analysis.matchingPercentage)}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-bold">
                  {analysis.matchingPercentage}%
                </span>
              </div>
            </div> */}
            <div>
              <p className="text-sm text-muted-foreground">
                {getMatchLabel(analysis.matchingPercentage)}:{" "}
                {analysis.matchingPercentage}%
              </p>
              <p className="text-sm text-muted-foreground">
                Analyzed on{" "}
                {new Date(analysis.analyzedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
              <a
                href={jobUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-500 hover:underline mt-1 inline-block"
              >
                View Job Posting →
              </a>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Strengths Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-green-500">✓</span>
            Your Strengths
          </CardTitle>
          <CardDescription>
            Areas where your profile aligns well with the job requirements
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {analysis.strengths.map((strength, index) => (
              <li key={index} className="flex gap-3">
                <span className="text-green-500 mt-1">●</span>
                <span className="flex-1">{strength}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Areas to Improve Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-orange-500">⚠</span>
            Areas to Improve
          </CardTitle>
          <CardDescription>
            Skills or experiences you could develop to strengthen your candidacy
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {analysis.areasToImprove.map((area, index) => (
              <li key={index} className="flex gap-3">
                <span className="text-orange-500 mt-1">●</span>
                <span className="flex-1">{area}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Detailed Analysis Card */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Analysis</CardTitle>
          <CardDescription>
            Comprehensive AI assessment of your profile match
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed whitespace-pre-wrap">
            {analysis.detailedAnalysis}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
