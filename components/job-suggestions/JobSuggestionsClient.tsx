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
        <CardContent className="space-y-4 py-10 text-center">
          <AlertCircle className="mx-auto h-10 w-10 text-destructive" />
          <div className="space-y-1">
            <h3 className="text-lg font-semibold">
              We couldn&apos;t load your job suggestions
            </h3>
            <p className="mx-auto max-w-md text-sm text-muted-foreground">
              {initialError ?? "Something went wrong. Please try again."}
            </p>
          </div>
          <div className="flex flex-col justify-center gap-2 sm:flex-row">
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
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-2">
          {result.queries.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              <span>Searched for</span>
              {result.queries.map((query) => (
                <Badge key={query} variant="secondary">
                  {query}
                </Badge>
              ))}
            </div>
          )}
          <p className="text-xs text-muted-foreground">
            Updated{" "}
            <time dateTime={result.generatedAt} suppressHydrationWarning>
              {new Date(result.generatedAt).toLocaleString()}
            </time>
            {" · "}
            Listings come from the original job sites — always confirm details
            there before applying.
          </p>
        </div>
        <Button
          variant="outline"
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="shrink-0"
        >
          <RefreshCw
            className={isRefreshing ? "h-4 w-4 animate-spin" : "h-4 w-4"}
          />
          {isRefreshing ? "Searching…" : "Find new openings"}
        </Button>
      </div>

      {!result.rankedByAI && suggestions.length > 0 && (
        <p className="rounded-lg border bg-muted/40 px-3 py-2 text-sm text-muted-foreground">
          Match scores are unavailable right now, so these openings are shown
          in search order. Try refreshing in a few minutes.
        </p>
      )}

      {isRefreshing ? (
        <JobSuggestionsSkeleton />
      ) : suggestions.length === 0 ? (
        <Card>
          <CardContent className="space-y-3 py-12 text-center">
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
