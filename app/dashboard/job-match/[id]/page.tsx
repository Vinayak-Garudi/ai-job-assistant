import { notFound } from "next/navigation";
import Link from "next/link";
import { apiRequest } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import type { JobMatch } from "@/types";
import JobMatchDetailClient from "@/components/dashboard/JobMatchDetailClient";

async function getJobMatch(id: string): Promise<JobMatch | null> {
  const response = await apiRequest(`job-match/${id}`);
  if (!response.success || !response.data) return null;
  return response.data;
}

export default async function JobMatchDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const job = await getJobMatch(id);

  if (!job) notFound();

  return (
    <div className="container mx-auto py-8 px-4 max-w-3xl space-y-6">
      <Link href="/dashboard">
        <Button variant="ghost" size="sm" className="gap-1.5 -ml-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Button>
      </Link>

      <JobMatchDetailClient job={job} />
    </div>
  );
}
