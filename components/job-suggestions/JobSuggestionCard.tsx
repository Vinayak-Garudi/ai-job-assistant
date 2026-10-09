import {
  BadgeCheck,
  Briefcase,
  ExternalLink,
  MapPin,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getMatchColor, getMatchLabel } from "@/lib/utils";
import type { JobSuggestion } from "@/types";

export default function JobSuggestionCard({
  suggestion,
}: {
  suggestion: JobSuggestion;
}) {
  const {
    title,
    company,
    location,
    url,
    source,
    snippet,
    workMode,
    employmentType,
    matchScore,
    matchReason,
    verified,
  } = suggestion;
  const sourceName = source.name || "the job site";
  const tags = [workMode, employmentType].filter(Boolean);

  return (
    <Card className="transition-shadow hover:shadow-md">
      <CardHeader className="space-y-2">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0 space-y-1">
            <h3 className="text-lg font-semibold leading-tight">{title}</h3>
            <div className="flex flex-wrap gap-x-3 gap-y-1 text-sm text-muted-foreground">
              {company && (
                <span className="flex items-center gap-1.5">
                  <Briefcase className="h-3.5 w-3.5 shrink-0" />
                  {company}
                </span>
              )}
              {location && (
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 shrink-0" />
                  {location}
                </span>
              )}
            </div>
          </div>
          {matchScore !== null && (
            <Badge className={getMatchColor(matchScore)}>
              {matchScore}% — {getMatchLabel(matchScore)}
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {matchReason && (
          <p className="flex items-start gap-2 text-sm text-foreground">
            <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <span>{matchReason}</span>
          </p>
        )}
        {snippet && (
          <p className="line-clamp-3 text-sm text-muted-foreground">
            {snippet}
          </p>
        )}

        <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline">{sourceName}</Badge>
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
            {verified && (
              <span className="flex items-center gap-1 text-xs text-green-700 dark:text-green-400">
                <BadgeCheck className="h-3.5 w-3.5" />
                Checked: open listing
              </span>
            )}
          </div>
          <Button asChild className="w-full sm:w-auto">
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${title} on ${sourceName} (opens in a new tab)`}
            >
              View on {sourceName}
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
