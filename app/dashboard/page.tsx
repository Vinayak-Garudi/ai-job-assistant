import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { getUserJobs } from "./actions";
import DashboardStats from "@/components/dashboard/DashboardStats";
import JobListClient from "@/components/dashboard/JobListClient";

export default async function DashboardPage() {
  const jobs = await getUserJobs();

  return (
    <div className="container mx-auto py-8 px-4 space-y-8">
      {/* Header */}
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
            Add New Job
          </Link>
        </Button>
      </div>

      {/* Stats */}
      <DashboardStats jobs={jobs} />

      {/* Job List with Filters */}
      <JobListClient initialJobs={jobs} />
    </div>
  );
}
