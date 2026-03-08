import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { getUserJobs } from "./actions";
import DashboardStats from "@/components/dashboard/DashboardStats";
import JobListClient from "@/components/dashboard/JobListClient";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

async function DashboardData() {
  const jobs = await getUserJobs();
  return (
    <>
      <DashboardStats jobs={jobs} />
      <JobListClient initialJobs={jobs} />
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

export default function DashboardPage() {
  return (
    <div className="container mx-auto py-8 px-4 space-y-8">
      {/* Header — renders immediately */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Job Dashboard</h1>
          <p className="text-muted-foreground">
            Track and manage your job applications
          </p>
        </div>
        <Button asChild>
          <Link href="/jobs/add">
            <Plus className="h-4 w-4 mr-2" />
            Analyse New Job
          </Link>
        </Button>
      </div>

      {/* Data streams in via Suspense */}
      <Suspense fallback={<DashboardDataSkeleton />}>
        <DashboardData />
      </Suspense>
    </div>
  );
}
