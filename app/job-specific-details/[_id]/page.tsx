import { notFound } from "next/navigation";
import { apiRequest } from "@/lib/api";
import { Badge } from "@/components/ui/badge";
import { Briefcase, MapPin } from "lucide-react";
import BackButton from "@/components/ui/back-button";
import type { JobMatch } from "@/types";
import { getMatchColor, getMatchLabel } from "@/lib/utils";
import JobSpecificDetailsClient from "@/components/dashboard/JobSpecificDetailsClient";

async function getJobMatch(id: string): Promise<JobMatch | null> {
  const response = await apiRequest(`job-match/${id}`);
  if (!response.success || !response.data) return null;
  return response.data;
}

export default async function JobSpecificDetailPage({
  params,
}: {
  params: Promise<{ _id: string }>;
}) {
  const { _id } = await params;
  const job = await getJobMatch(_id);

  if (!job) notFound();

  return (
    <div className="container mx-auto py-8 px-4 max-w-3xl space-y-6">
      <div className="flex items-center gap-3">
        <BackButton />
      </div>

      {/* Job header */}
      <div className="space-y-1">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <h1 className="text-2xl font-bold leading-tight">{job.jobTitle}</h1>
          <Badge className={getMatchColor(job.analysis.matchingPercentage)}>
            {job.analysis.matchingPercentage}% —{" "}
            {getMatchLabel(job.analysis.matchingPercentage)}
          </Badge>
        </div>
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

      <JobSpecificDetailsClient job={job} />
    </div>
  );
}
