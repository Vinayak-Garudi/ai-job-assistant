import Link from "next/link";
import { apiRequest } from "@/lib/api";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Briefcase,
  MapPin,
  MessageSquare,
  Mail,
  HelpCircle,
  Lightbulb,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import type { JobMatch } from "@/types";
import { getMatchColor, getMatchLabel } from "@/lib/utils";

async function getJobsWithDetails(): Promise<JobMatch[]> {
  const response = await apiRequest("job-match/job-specific-details-list");
  if (!response.success || !response.data) return [];
  return response.data;
}

export default async function JobSpecificDetailsListPage() {
  const jobs = await getJobsWithDetails();

  return (
    <div className="container mx-auto py-8 px-4 max-w-3xl space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Sparkles className="h-5 w-5 text-purple-500" />
          <h1 className="text-3xl font-bold">Job-Specific Details</h1>
        </div>
        <p className="text-muted-foreground">
          AI-generated outreach messages, emails, interview questions, and tips
          for your job matches.
        </p>
      </div>

      {jobs.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Sparkles className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
            <h3 className="text-lg font-semibold mb-2">No Details Yet</h3>
            <p className="text-muted-foreground text-sm max-w-sm mx-auto mb-4">
              Generate job-specific details from any job match page to see them
              here.
            </p>
            <Link href="/dashboard">
              <Button variant="outline">Go to Dashboard</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {jobs.map((job) => {
            const id = job._id ?? job.id;
            const { analysis } = job;
            const hasMessage = Boolean(analysis.jobSpecificMessage);
            const hasEmail = Boolean(analysis.jobSpecificEmail);
            const hasQuestions =
              (analysis.jobSpecificInterviewQuestions?.length ?? 0) > 0;
            const hasTips = (analysis.jobSpecificTips?.length ?? 0) > 0;

            return (
              <Link key={id} href={`/job-specific-details/${id}`}>
                <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold truncate">{job.jobTitle}</p>
                        <div className="flex flex-wrap gap-3 text-sm text-muted-foreground mt-1">
                          <span className="flex items-center gap-1">
                            <Briefcase className="h-3.5 w-3.5 shrink-0" />
                            {job.company}
                          </span>
                          {job.location && (
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3.5 w-3.5 shrink-0" />
                              {job.location}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <Badge
                          className={getMatchColor(
                            analysis.matchingPercentage
                          )}
                        >
                          {analysis.matchingPercentage}%
                        </Badge>
                        <ArrowRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {hasMessage && (
                        <span className="inline-flex items-center gap-1 text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-2 py-0.5 rounded-full">
                          <MessageSquare className="h-3 w-3" /> LinkedIn DM
                        </span>
                      )}
                      {hasEmail && (
                        <span className="inline-flex items-center gap-1 text-xs bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 px-2 py-0.5 rounded-full">
                          <Mail className="h-3 w-3" /> Email
                        </span>
                      )}
                      {hasQuestions && (
                        <span className="inline-flex items-center gap-1 text-xs bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300 px-2 py-0.5 rounded-full">
                          <HelpCircle className="h-3 w-3" />{" "}
                          {analysis.jobSpecificInterviewQuestions!.length}{" "}
                          Questions
                        </span>
                      )}
                      {hasTips && (
                        <span className="inline-flex items-center gap-1 text-xs bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 px-2 py-0.5 rounded-full">
                          <Lightbulb className="h-3 w-3" />{" "}
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
