import Link from "next/link";
import { Card, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, MapPin } from "lucide-react";
import type { JobMatch } from "@/types";
import JobMatchDeleteButton from "./JobMatchDeleteButton";
import { getMatchColor, getMatchLabel } from "@/lib/utils";

interface JobMatchCardProps {
  job: JobMatch;
  onDelete: () => void;
}

export default function JobMatchCard({ job, onDelete }: JobMatchCardProps) {
  const { analysis } = job;
  const id = job._id ?? job.id;

  return (
    <Link href={`/dashboard/job-match/${id}`} className="block">
      <Card className="hover:shadow-md transition-shadow cursor-pointer">
        <CardHeader>
          <h3 className="text-lg font-semibold leading-tight mb-1">
            {job.jobTitle}
          </h3>
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
          <div className="flex items-center justify-between shrink-0">
            <Badge className={getMatchColor(analysis.matchingPercentage)}>
              {analysis.matchingPercentage}% —{" "}
              {getMatchLabel(analysis.matchingPercentage)}
            </Badge>
            <JobMatchDeleteButton id={id} onDelete={onDelete} />
          </div>
        </CardHeader>
      </Card>
    </Link>
  );
}
