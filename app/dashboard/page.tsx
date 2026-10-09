import { Suspense } from "react";
import { getJobMatches } from "./actions";
import JobListClient from "@/components/dashboard/JobListClient";
import DemoDataBanner from "@/components/guest/DemoDataBanner";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getIsGuest } from "@/lib/authState";
import { DEMO_JOB_MATCHES_RESULT } from "@/lib/demoData";

async function DashboardData({ page }: { page: number }) {
  const { jobs, pagination } = await getJobMatches(page);

  return <JobListClient initialJobs={jobs} pagination={pagination} />;
}

function DemoDashboardData() {
  const { jobs, pagination } = DEMO_JOB_MATCHES_RESULT;

  return <JobListClient initialJobs={jobs} pagination={pagination} isGuest />;
}

function DashboardDataSkeleton() {
  return (
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
  );
}

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const page = Math.max(1, parseInt(params.page || "1", 10) || 1);
  const isGuest = await getIsGuest();

  return (
    <div className="container mx-auto py-8 px-4 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Job Dashboard</h1>
          <p className="text-muted-foreground">
            {isGuest
              ? "See how AI Job Assistant scores your fit for every role you apply to"
              : "Track and manage your job applications"}
          </p>
        </div>
      </div>

      {isGuest ? (
        <>
          <DemoDataBanner welcome />
          <DemoDashboardData />
        </>
      ) : (
        <Suspense key={page} fallback={<DashboardDataSkeleton />}>
          <DashboardData page={page} />
        </Suspense>
      )}
    </div>
  );
}
