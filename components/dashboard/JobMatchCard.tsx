import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
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
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start gap-4">
            <div className="flex-1 min-w-0">
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
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Badge className={getMatchColor(analysis.matchingPercentage)}>
                {analysis.matchingPercentage}% —{" "}
                {getMatchLabel(analysis.matchingPercentage)}
              </Badge>
              <JobMatchDeleteButton id={id} onDelete={onDelete} />
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {job.shortDescription}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
