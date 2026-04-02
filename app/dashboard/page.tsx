import { Suspense } from "react";
import { getJobMatches, searchJobMatches } from "./actions";
import DashboardStats from "@/components/dashboard/DashboardStats";
import JobListClient from "@/components/dashboard/JobListClient";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

async function DashboardData({ page, query }: { page: number; query: string }) {
  const { jobs, stats, pagination } = query
    ? await searchJobMatches(query, page)
    : await getJobMatches(page);

  return (
    <>
      <DashboardStats stats={stats} />
      <JobListClient
        initialJobs={jobs}
        pagination={pagination}
        initialQuery={query}
      />
    </>
  );
}

function DashboardDataSkeleton() {
  return (
    <>
      {/* Stats skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <Skeleton className="h-4 w-24" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-12" />
            </CardContent>
          </Card>
        ))}
      </div>
      {/* Job list skeleton */}
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-5 w-56" />
              <Skeleton className="h-4 w-36" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; q?: string }>;
}) {
  const params = await searchParams;
  const page = Math.max(1, parseInt(params.page || "1", 10) || 1);
  const query = params.q?.trim() || "";

  return (
    <div className="container mx-auto py-8 px-4 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Job Dashboard</h1>
          <p className="text-muted-foreground">
            Track and manage your job applications
          </p>
        </div>
      </div>

      <Suspense key={`${page}-${query}`} fallback={<DashboardDataSkeleton />}>
        <DashboardData page={page} query={query} />
      </Suspense>
    </div>
  );
}
