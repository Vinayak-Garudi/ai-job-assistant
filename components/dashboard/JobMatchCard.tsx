import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Briefcase, MapPin, ArrowUpRight } from "lucide-react";
import type { JobMatch } from "@/types";
import JobMatchDeleteButton from "./JobMatchDeleteButton";
import { getMatchLabel } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface JobMatchCardProps {
  job: JobMatch;
  onDelete: () => void;
}

function MatchRing({ pct }: { pct: number }) {
  const color =
    pct >= 80
      ? "text-emerald-500"
      : pct >= 60
        ? "text-amber-500"
        : "text-red-500";

  return (
    <div className={cn("text-right shrink-0", color)}>
      <p className="text-xl font-bold leading-none">{pct}%</p>
      <p className="text-[10px] font-medium mt-0.5 opacity-80">{getMatchLabel(pct)}</p>
    </div>
  );
}

export default function JobMatchCard({ job, onDelete }: JobMatchCardProps) {
  const { analysis } = job;
  const id = job._id ?? job.id;
  const matchPct = analysis.matchingPercentage;

  const leftBorder =
    matchPct >= 80
      ? "border-l-emerald-500"
      : matchPct >= 60
        ? "border-l-amber-500"
        : "border-l-red-500";

  return (
    <div className="group relative">
      <Link href={`/dashboard/job-match/${id}`} className="block">
        <Card
          className={cn(
            "border-l-4 hover:shadow-lg hover:shadow-primary/5 transition-all duration-200 cursor-pointer",
            leftBorder,
          )}
        >
          <CardContent className="p-4 sm:p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <div className="flex items-start gap-2">
                  <h3 className="font-semibold text-base leading-tight group-hover:text-primary transition-colors truncate">
                    {job.jobTitle}
                  </h3>
                  <ArrowUpRight className="h-3.5 w-3.5 shrink-0 mt-0.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1.5 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Briefcase className="h-3.5 w-3.5 shrink-0" />
                    {job.company}
                  </span>
                  {job.location && (
                    <span className="flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 shrink-0" />
                      {job.location}
                    </span>
                  )}
                </div>
                {job.shortDescription && (
                  <p className="text-xs text-muted-foreground mt-2 line-clamp-1">
                    {job.shortDescription}
                  </p>
                )}
              </div>
              <MatchRing pct={matchPct} />
            </div>
          </CardContent>
        </Card>
      </Link>
      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity z-10">
        <JobMatchDeleteButton id={id} onDelete={onDelete} />
      </div>
    </div>
  );
}
