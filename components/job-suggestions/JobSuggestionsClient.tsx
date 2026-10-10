"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { AlertCircle, RefreshCw, SearchX, UserCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { refreshJobSuggestions } from "@/app/job-suggestions/actions";
import type { JobSuggestionsResult } from "@/types";
import JobSuggestionCard from "./JobSuggestionCard";
import JobSuggestionsSkeleton from "./JobSuggestionsSkeleton";

interface JobSuggestionsClientProps {
  initialResult: JobSuggestionsResult | null;
  initialError: string | null;
}

const isHttpUrl = (url: string) => /^https?:\/\//i.test(url);

export default function JobSuggestionsClient({
  initialResult,
  initialError,
}: JobSuggestionsClientProps) {
  const router = useRouter();
  const [result, setResult] = useState(initialResult);
  const [isRefreshing, startRefresh] = useTransition();
  const [isRetrying, startRetry] = useTransition();

  const handleRefresh = () => {
    startRefresh(async () => {
      const { result: next, error } = await refreshJobSuggestions();
      if (next) {
        setResult(next);
        toast.success("Suggestions refreshed with the latest openings");
      } else {
        toast.error(error ?? "Could not refresh suggestions");
      }
    });
  };

  const handleRetry = () => {
    startRetry(() => router.refresh());
  };

  if (!result) {
    return (
      <Card className="border-destructive/30">
        <CardContent className="space-y-4 px-4 py-10 text-center sm:px-6">
          <AlertCircle className="mx-auto h-10 w-10 text-destructive" />
          <div className="space-y-1">
            <h3 className="text-lg font-semibold">
              We couldn&apos;t load your job suggestions
            </h3>
            <p className="mx-auto max-w-md text-sm text-muted-foreground">
              {initialError ?? "Something went wrong. Please try again."}
            </p>
          </div>
          <div className="mx-auto flex max-w-xs flex-col gap-2 sm:max-w-none sm:flex-row sm:justify-center">
            <Button onClick={handleRetry} disabled={isRetrying}>
              <RefreshCw
                className={isRetrying ? "h-4 w-4 animate-spin" : "h-4 w-4"}
              />
              {isRetrying ? "Trying again…" : "Try again"}
            </Button>
            <Button variant="outline" asChild>
              <Link href="/profile">
                <UserCircle className="h-4 w-4" />
                Review your profile
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const suggestions = result.suggestions.filter((s) => isHttpUrl(s.url));

  return (
    <div className="space-y-6">
      {/* Refresh sits above the search summary on phones (full width), and
          to its right from sm up. */}
      <div className="flex flex-col-reverse gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 space-y-2">
          {result.queries.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
              <span className="mr-0.5">Searched for</span>
              {result.queries.map((query) => (
                <Badge
                  key={query}
                  variant="secondary"
                  className="max-w-full truncate font-normal"
                  title={query}
                >
                  {query}
                </Badge>
              ))}
            </div>
          )}
          <p className="text-xs leading-relaxed text-muted-foreground">
            Updated{" "}
            <time dateTime={result.generatedAt} suppressHydrationWarning>
              {new Date(result.generatedAt).toLocaleString(undefined, {
                dateStyle: "medium",
                timeStyle: "short",
              })}
            </time>
            <span className="hidden sm:inline">
              {" · "}
              Listings come from the original job sites — always confirm
              details there before applying.
            </span>
          </p>
        </div>
        <Button
          variant="outline"
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="sm:shrink-0"
        >
          <RefreshCw
            className={isRefreshing ? "h-4 w-4 animate-spin" : "h-4 w-4"}
          />
          {isRefreshing ? "Searching…" : "Find new openings"}
        </Button>
      </div>

      {!result.rankedByAI && suggestions.length > 0 && (
        <p className="rounded-lg border bg-muted/40 px-3 py-2 text-xs text-muted-foreground sm:text-sm">
          Match scores are unavailable right now, so these openings are shown
          in search order. Try refreshing in a few minutes.
        </p>
      )}

      {isRefreshing ? (
        <JobSuggestionsSkeleton />
      ) : suggestions.length === 0 ? (
        <Card>
          <CardContent className="space-y-3 px-4 py-12 text-center sm:px-6">
            <SearchX className="mx-auto h-10 w-10 text-muted-foreground" />
            <h3 className="text-lg font-semibold">
              No matching openings found right now
            </h3>
            <p className="mx-auto max-w-md text-sm leading-relaxed text-muted-foreground">
              Try adding more desired roles or preferred locations to your{" "}
              <Link
                href="/profile"
                className="text-foreground underline underline-offset-4 hover:text-primary"
              >
                profile
              </Link>
              , or check back later — new jobs are posted every day.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {suggestions.map((suggestion) => (
            <JobSuggestionCard key={suggestion.url} suggestion={suggestion} />
          ))}
        </div>
      )}
    </div>
  );
}
