import { Suspense } from "react";
import Link from "next/link";
import { getJobMatches, searchJobMatches } from "./actions";
import DashboardStats from "@/components/dashboard/DashboardStats";
import JobListClient from "@/components/dashboard/JobListClient";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

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
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <CardContent className="p-5 space-y-3">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-8 w-14" />
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="space-y-3 mt-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i} className="border-l-4 border-l-muted">
            <CardContent className="p-5">
              <div className="flex justify-between items-start gap-4">
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-5 w-56" />
                  <Skeleton className="h-4 w-36" />
                </div>
                <Skeleton className="h-8 w-12" />
              </div>
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
    <div className="container mx-auto py-8 px-4 max-w-5xl space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Track and manage your job applications
          </p>
        </div>
        <Button asChild className="shrink-0">
          <Link href="/jobs/add">
            <Plus className="h-4 w-4 mr-1.5" />
            Analyse Job
          </Link>
        </Button>
      </div>

      <Suspense key={`${page}-${query}`} fallback={<DashboardDataSkeleton />}>
        <DashboardData page={page} query={query} />
      </Suspense>
    </div>
  );
}
