import Link from "next/link";
import { apiRequest } from "@/lib/api";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Briefcase,
  MapPin,
  MessageSquare,
  Mail,
  HelpCircle,
  Lightbulb,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import type { JobMatch } from "@/types";
import { getMatchLabel } from "@/lib/utils";
import { cn } from "@/lib/utils";

async function getJobsWithDetails(): Promise<JobMatch[]> {
  const response = await apiRequest("job-match/job-specific-details-list");
  if (!response.success || !response.data) return [];
  return response.data;
}

export default async function JobSpecificDetailsListPage() {
  const jobs = await getJobsWithDetails();

  return (
    <div className="container mx-auto py-8 px-4 max-w-3xl">
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-widest mb-3">
          <Sparkles className="h-3.5 w-3.5" />
          AI-Generated
        </div>
        <h1 className="text-2xl font-bold mb-1.5">Job-Specific Details</h1>
        <p className="text-sm text-muted-foreground">
          Outreach messages, emails, interview questions, and tips — tailored to each job.
        </p>
      </div>

      {jobs.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="py-14 text-center space-y-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">No details yet</h3>
              <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                Open any job match and click &ldquo;Get Job Details&rdquo; to generate AI-crafted outreach and interview prep.
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/dashboard">Go to Dashboard</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {jobs.map((job) => {
            const id = job._id ?? job.id;
            const { analysis } = job;
            const matchPct = analysis.matchingPercentage;
            const hasMessage = Boolean(analysis.jobSpecificMessage);
            const hasEmail = Boolean(analysis.jobSpecificEmail);
            const hasQuestions = (analysis.jobSpecificInterviewQuestions?.length ?? 0) > 0;
            const hasTips = (analysis.jobSpecificTips?.length ?? 0) > 0;

            const borderColor =
              matchPct >= 80
                ? "border-l-emerald-500"
                : matchPct >= 60
                  ? "border-l-amber-500"
                  : "border-l-red-500";

            const matchColor =
              matchPct >= 80
                ? "text-emerald-600 dark:text-emerald-400"
                : matchPct >= 60
                  ? "text-amber-600 dark:text-amber-400"
                  : "text-red-600 dark:text-red-400";

            return (
              <Link key={id} href={`/job-specific-details/${id}`} className="group block">
                <Card className={cn("border-l-4 hover:shadow-md hover:shadow-primary/5 transition-all duration-200 cursor-pointer", borderColor)}>
                  <CardHeader className="pb-2 pt-4 px-4">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <p className="font-semibold text-sm truncate group-hover:text-primary transition-colors">
                            {job.jobTitle}
                          </p>
                          <ArrowUpRight className="h-3 w-3 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
                        </div>
                        <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground mt-1">
                          <span className="flex items-center gap-1">
                            <Briefcase className="h-3 w-3 shrink-0" />
                            {job.company}
                          </span>
                          {job.location && (
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3 shrink-0" />
                              {job.location}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className={cn("text-right shrink-0", matchColor)}>
                        <p className="text-base font-bold leading-none">{matchPct}%</p>
                        <p className="text-[10px] opacity-80 mt-0.5">{getMatchLabel(matchPct)}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="px-4 pb-4">
                    <div className="flex flex-wrap gap-1.5">
                      {hasMessage && (
                        <span className="inline-flex items-center gap-1 text-xs bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 px-2 py-0.5 rounded-full font-medium">
                          <MessageSquare className="h-3 w-3" /> LinkedIn DM
                        </span>
                      )}
                      {hasEmail && (
                        <span className="inline-flex items-center gap-1 text-xs bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 px-2 py-0.5 rounded-full font-medium">
                          <Mail className="h-3 w-3" /> Email
                        </span>
                      )}
                      {hasQuestions && (
                        <span className="inline-flex items-center gap-1 text-xs bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300 px-2 py-0.5 rounded-full font-medium">
                          <HelpCircle className="h-3 w-3" />
                          {analysis.jobSpecificInterviewQuestions!.length} Questions
                        </span>
                      )}
                      {hasTips && (
                        <span className="inline-flex items-center gap-1 text-xs bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 px-2 py-0.5 rounded-full font-medium">
                          <Lightbulb className="h-3 w-3" />
                          {analysis.jobSpecificTips!.length} Tips
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
