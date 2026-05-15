import { Suspense } from "react";
import Link from "next/link";
import { getRecommendedJobs, searchJobs } from "./actions";
import JobSearchForm from "./JobSearchForm";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertCircle,
  Briefcase,
  Clock,
  ExternalLink,
  MapPin,
  Search,
  Sparkles,
  Star,
  Wifi,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { JobSearchItem } from "@/types";

const DATE_OPTIONS = [
  { value: "all", label: "Any time" },
  { value: "today", label: "Today" },
  { value: "3days", label: "3 days" },
  { value: "week", label: "This week" },
  { value: "month", label: "This month" },
] as const;

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatSalary(salary: JobSearchItem["salary"]): string | null {
  if (!salary) return null;
  const fmt = (n: number | null) =>
    n != null
      ? new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: salary.currency,
          maximumFractionDigits: 0,
        }).format(n)
      : null;
  const min = fmt(salary.min);
  const max = fmt(salary.max);
  if (min && max) return `${min} – ${max}`;
  if (min) return `From ${min}`;
  if (max) return `Up to ${max}`;
  return null;
}

function formatPostedAt(postedAt: string | null): string | null {
  if (!postedAt) return null;
  const diffDays = Math.floor(
    (Date.now() - new Date(postedAt).getTime()) / 86_400_000,
  );
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays}d ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
  return `${Math.floor(diffDays / 30)}mo ago`;
}

// ── Job Card ──────────────────────────────────────────────────────────────────

function JobCard({
  job,
  showScore = false,
}: {
  job: JobSearchItem;
  showScore?: boolean;
}) {
  const salaryLabel = formatSalary(job.salary);
  const postedLabel = formatPostedAt(job.postedAt);
  const employmentLabel = job.employmentType?.replace(/_/g, " ");

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 min-w-0 flex-1">
            {job.companyLogo ? (
              <img
                src={job.companyLogo}
                alt={job.company}
                className="h-9 w-9 rounded object-contain bg-muted p-0.5 shrink-0"
              />
            ) : (
              <div className="h-9 w-9 rounded bg-muted flex items-center justify-center text-sm font-semibold text-muted-foreground shrink-0">
                {job.company.charAt(0).toUpperCase()}
              </div>
            )}
            <div className="min-w-0">
              <h3 className="font-semibold text-base leading-tight">
                {job.jobTitle}
              </h3>
              <div className="mt-1 text-sm text-muted-foreground">
                {job.companyWebsite ? (
                  <Link
                    href={job.companyWebsite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="truncate block hover:text-foreground hover:underline"
                  >
                    {job.company}
                  </Link>
                ) : (
                  <span className="truncate block">{job.company}</span>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1.5 shrink-0">
            {showScore && job.relevanceScore > 0 && (
              <span className="flex items-center gap-1 text-xs font-medium text-amber-600 dark:text-amber-400">
                <Star className="h-3.5 w-3.5 fill-current" />
                {job.relevanceScore}%
              </span>
            )}
            {job.jobUrl && (
              <Link
                href={job.jobUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
              >
                Apply
                <ExternalLink className="h-3 w-3" />
              </Link>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0 space-y-3">
        <div className="flex flex-wrap gap-1.5">
          <Badge variant="secondary" className="text-xs gap-1">
            <MapPin className="h-3 w-3" />
            {job.location}
          </Badge>
          {job.isRemote && (
            <Badge variant="secondary" className="text-xs gap-1">
              <Wifi className="h-3 w-3" />
              Remote
            </Badge>
          )}
          {employmentLabel && (
            <Badge variant="outline" className="text-xs capitalize">
              {employmentLabel.toLowerCase()}
            </Badge>
          )}
          {salaryLabel && (
            <Badge variant="outline" className="text-xs">
              {salaryLabel}
              {job.salary?.period ? `/${job.salary.period}` : ""}
            </Badge>
          )}
        </div>

        {job.jobDescription && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {job.jobDescription}
          </p>
        )}

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{job.source}</span>
          {postedLabel && (
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {postedLabel}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

// ── States ────────────────────────────────────────────────────────────────────

function EmptyState({ message }: { message: string }) {
  return (
    <Card>
      <CardContent className="py-12 text-center">
        <Briefcase className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
        <h3 className="text-lg font-semibold mb-2">No jobs found</h3>
        <p className="text-sm text-muted-foreground max-w-sm mx-auto">
          {message}
        </p>
      </CardContent>
    </Card>
  );
}

function ErrorState({ message }: { message: string }) {
  return (
    <Card>
      <CardContent className="py-12 text-center">
        <AlertCircle className="h-10 w-10 mx-auto mb-4 text-destructive" />
        <h3 className="text-lg font-semibold mb-2">Something went wrong</h3>
        <p className="text-sm text-muted-foreground max-w-sm mx-auto">
          {message}
        </p>
      </CardContent>
    </Card>
  );
}

function JobListSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <Card key={i}>
          <CardHeader className="pb-3">
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <Skeleton className="h-4 w-52" />
                <Skeleton className="h-3 w-36" />
              </div>
              <Skeleton className="h-5 w-14" />
            </div>
          </CardHeader>
          <CardContent className="pt-0 space-y-3">
            <div className="flex gap-2">
              <Skeleton className="h-5 w-28 rounded-full" />
              <Skeleton className="h-5 w-16 rounded-full" />
            </div>
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-3/4" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

// ── Pagination ────────────────────────────────────────────────────────────────

function JobPagination({
  page,
  count,
  limit,
  baseParams,
}: {
  page: number;
  count: number;
  limit: number;
  baseParams: Record<string, string>;
}) {
  const hasPrev = page > 1;
  const hasNext = count >= limit;
  if (!hasPrev && !hasNext) return null;

  const buildHref = (p: number) =>
    `/job-search?${new URLSearchParams({ ...baseParams, page: String(p) }).toString()}`;

  return (
    <div className="flex items-center justify-between mt-6">
      {hasPrev ? (
        <Link href={buildHref(page - 1)}>
          <Button variant="outline" size="sm">
            Previous
          </Button>
        </Link>
      ) : (
        <Button variant="outline" size="sm" disabled>
          Previous
        </Button>
      )}
      <span className="text-sm text-muted-foreground">Page {page}</span>
      {hasNext ? (
        <Link href={buildHref(page + 1)}>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </Link>
      ) : (
        <Button variant="outline" size="sm" disabled>
          Next
        </Button>
      )}
    </div>
  );
}

// ── Data sections ─────────────────────────────────────────────────────────────

async function RecommendedResults({
  datePosted,
  page,
}: {
  datePosted: string;
  page: number;
}) {
  const { result, error } = await getRecommendedJobs({ datePosted, page });

  if (error) return <ErrorState message={error} />;
  if (!result || result.jobs.length === 0) {
    return (
      <EmptyState message="No recommended jobs found. Make sure your profile has desired roles, skills, and location filled in." />
    );
  }

  return (
    <>
      <p className="text-sm text-muted-foreground mb-4">
        Searching for{" "}
        <span className="font-medium text-foreground">
          &ldquo;{result.query}&rdquo;
        </span>
        {result.location && (
          <>
            {" "}in{" "}
            <span className="font-medium text-foreground">
              {result.location}
            </span>
          </>
        )}{" "}
        · {result.jobs.length} jobs matched to your profile
      </p>
      <div className="space-y-4">
        {result.jobs.map((job, idx) => (
          <JobCard key={job.jobId ?? idx} job={job} showScore />
        ))}
      </div>
      <JobPagination
        page={page}
        count={result.pagination.count}
        limit={result.pagination.limit}
        baseParams={{ tab: "recommended", datePosted }}
      />
    </>
  );
}

async function SearchResults({
  query,
  location,
  jobTypes,
  workModes,
  datePosted,
  page,
}: {
  query: string;
  location: string;
  jobTypes: string;
  workModes: string;
  datePosted: string;
  page: number;
}) {
  const { result, error } = await searchJobs({
    query: query || undefined,
    location: location || undefined,
    jobTypes: jobTypes || undefined,
    workModes: workModes || undefined,
    datePosted,
    page,
  });

  if (error) return <ErrorState message={error} />;
  if (!result || result.jobs.length === 0) {
    return (
      <EmptyState message="No jobs found. Try different keywords, location, or filters." />
    );
  }

  const subtitle = result.query
    ? `Results for "${result.query}"${result.location ? ` in ${result.location}` : ""}`
    : "Showing jobs based on your profile";

  return (
    <>
      <p className="text-sm text-muted-foreground mb-4">
        {subtitle} — {result.jobs.length} results
      </p>
      <div className="space-y-4">
        {result.jobs.map((job, idx) => (
          <JobCard key={job.jobId ?? idx} job={job} />
        ))}
      </div>
      <JobPagination
        page={page}
        count={result.pagination.count}
        limit={result.pagination.limit}
        baseParams={{
          tab: "search",
          ...(query && { query }),
          ...(location && { location }),
          ...(jobTypes && { jobTypes }),
          ...(workModes && { workModes }),
          datePosted,
        }}
      />
    </>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

type PageSearchParams = {
  tab?: string;
  query?: string;
  location?: string;
  jobTypes?: string;
  workModes?: string;
  datePosted?: string;
  page?: string;
};

export default async function JobSearchPage({
  searchParams,
}: {
  searchParams: Promise<PageSearchParams>;
}) {
  const params = await searchParams;
  const tab = params.tab === "search" ? "search" : "recommended";
  const page = Math.max(1, parseInt(params.page ?? "1", 10) || 1);
  const datePosted =
    params.datePosted ?? (tab === "recommended" ? "week" : "month");

  const tabLink = (active: boolean) =>
    cn(
      "flex items-center gap-1.5 px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors",
      active
        ? "border-primary text-primary"
        : "border-transparent text-muted-foreground hover:text-foreground",
    );

  return (
    <div className="container mx-auto py-8 px-4 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Job Search</h1>
        <p className="text-muted-foreground">
          Discover jobs tailored to your profile or search with custom filters
        </p>
      </div>

      {/* Tab navigation */}
      <div className="flex border-b border-border mb-6">
        <Link
          href="/job-search?tab=recommended"
          className={tabLink(tab === "recommended")}
        >
          <Sparkles className="h-4 w-4" />
          Recommended
        </Link>
        <Link
          href="/job-search?tab=search"
          className={tabLink(tab === "search")}
        >
          <Search className="h-4 w-4" />
          Search
        </Link>
      </div>

      {tab === "recommended" ? (
        <>
          <div className="flex flex-wrap gap-1.5 mb-6">
            {DATE_OPTIONS.map((opt) => (
              <Link
                key={opt.value}
                href={`/job-search?tab=recommended&datePosted=${opt.value}`}
                className={cn(
                  "px-2.5 py-1 text-xs rounded-full border transition-colors",
                  datePosted === opt.value
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border text-muted-foreground hover:border-primary hover:text-foreground",
                )}
              >
                {opt.label}
              </Link>
            ))}
          </div>
          <Suspense
            key={`rec-p${page}-d${datePosted}`}
            fallback={<JobListSkeleton />}
          >
            <RecommendedResults datePosted={datePosted} page={page} />
          </Suspense>
        </>
      ) : (
        <>
          <JobSearchForm
            initialParams={{
              query: params.query,
              location: params.location,
              jobTypes: params.jobTypes,
              workModes: params.workModes,
              datePosted: params.datePosted,
            }}
          />
          <Suspense
            key={`srch-p${page}-q${params.query}-l${params.location}-jt${params.jobTypes}-wm${params.workModes}-d${datePosted}`}
            fallback={<JobListSkeleton />}
          >
            <SearchResults
              query={params.query ?? ""}
              location={params.location ?? ""}
              jobTypes={params.jobTypes ?? ""}
              workModes={params.workModes ?? ""}
              datePosted={datePosted}
              page={page}
            />
          </Suspense>
        </>
      )}
    </div>
  );
}
