import {
  BadgeCheck,
  Briefcase,
  Clock,
  ExternalLink,
  MapPin,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn, getMatchColor, getMatchLabel } from "@/lib/utils";
import type { JobSuggestion } from "@/types";

/** Search titles often end with the site name, e.g. "Developer - Acme - LinkedIn". */
function cleanTitle(title: string, sourceName: string): string {
  if (!sourceName) return title;
  const escaped = sourceName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const cleaned = title
    .replace(new RegExp(`\\s*[-|–—·]\\s*${escaped}\\s*$`, "i"), "")
    .trim();
  return cleaned || title;
}

const normalizeTag = (tag: string) =>
  tag.toLowerCase().replace(/[\s_-]+/g, " ").trim();

export default function JobSuggestionCard({
  suggestion,
}: {
  suggestion: JobSuggestion;
}) {
  const {
    url,
    source,
    snippet,
    workMode,
    employmentType,
    postedDate,
    matchScore,
    matchReason,
    verified,
  } = suggestion;
  const sourceName = source.name || "the job site";
  const title = cleanTitle(suggestion.title, source.name);
  const company = suggestion.company.trim();
  const location = suggestion.location.trim();
  // workMode and employmentType can repeat each other ("Full time" / "Full-Time").
  const tags = [workMode, employmentType]
    .map((tag) => tag.trim())
    .filter(
      (tag, i, all) =>
        tag &&
        all.findIndex((t) => normalizeTag(t) === normalizeTag(tag)) === i,
    );

  return (
    <Card className="gap-0 p-4 transition-shadow hover:shadow-md sm:p-6">
      {/* Title + score */}
      <div className="flex flex-col-reverse items-start gap-2 sm:flex-row sm:justify-between sm:gap-4">
        <h3 className="min-w-0 break-words text-base font-semibold leading-snug sm:text-lg">
          {title}
        </h3>
        {matchScore !== null && (
          <Badge className={cn("shrink-0", getMatchColor(matchScore))}>
            {matchScore}% — {getMatchLabel(matchScore)}
          </Badge>
        )}
      </div>

      {/* Company / location / posted */}
      {(company || location || postedDate) && (
        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-muted-foreground">
          {company && (
            <span className="inline-flex min-w-0 items-center gap-1.5">
              <Briefcase className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate">{company}</span>
            </span>
          )}
          {location && (
            <span className="inline-flex min-w-0 items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate">{location}</span>
            </span>
          )}
          {postedDate && (
            <span className="inline-flex min-w-0 items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate">{postedDate}</span>
            </span>
          )}
        </div>
      )}

      {matchReason && (
        <p className="mt-4 flex items-start gap-2 rounded-lg bg-primary/5 px-3 py-2 text-sm text-foreground">
          <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
          <span>{matchReason}</span>
        </p>
      )}

      {snippet && (
        <p className="mt-3 line-clamp-4 break-words text-sm leading-relaxed text-muted-foreground sm:line-clamp-3">
          {snippet}
        </p>
      )}

      {/* Footer: tags + CTA. Column on phones (CTA stretches full width),
          one row from sm up with the CTA kept at its natural size. */}
      <div className="mt-4 flex flex-col gap-3 border-t pt-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 flex-wrap items-center gap-2">
          <Badge variant="outline">{sourceName}</Badge>
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
          {verified && (
            <span className="inline-flex items-center gap-1 whitespace-nowrap text-xs text-green-700 dark:text-green-400">
              <BadgeCheck className="h-3.5 w-3.5 shrink-0" />
              Verified open listing
            </span>
          )}
        </div>
        <Button asChild className="sm:shrink-0">
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
    </Card>
  );
}
