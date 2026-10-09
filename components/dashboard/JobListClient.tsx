"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { JobMatch, Pagination } from "@/types";
import JobMatchCard from "./JobMatchCard";
import { getJobMatches } from "@/app/dashboard/actions";
import {
  LoginPromptDialog,
  useLoginPrompt,
} from "@/components/guest/LoginPromptDialog";

interface JobListClientProps {
  initialJobs: JobMatch[];
  pagination: Pagination;
  isGuest?: boolean;
}

export default function JobListClient({
  initialJobs,
  pagination: initialPagination,
  isGuest = false,
}: JobListClientProps) {
  const [jobs, setJobs] = useState(initialJobs);
  const [pagination, setPagination] = useState(initialPagination);
  const { guard, dialogProps } = useLoginPrompt(isGuest);

  const goToPage = async (page: number) => {
    if (!guard("browse all of your job matches")) return;
    const result = await getJobMatches(page);
    setJobs(result.jobs);
    setPagination(result.pagination);
    window.history.replaceState(
      null,
      "",
      page > 1 ? `/dashboard?page=${page}` : "/dashboard",
    );
  };

  return (
    <div className="space-y-4">
      {jobs.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <p className="text-lg">No jobs found.</p>
          <p className="text-sm mt-2">Analyse a job to get started.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {jobs.map((job) => (
            <JobMatchCard
              key={job.id || job._id}
              job={job}
              isGuest={isGuest}
              onDelete={() =>
                setJobs((prev) =>
                  prev.filter((j) => (j._id ?? j.id) !== (job._id ?? job.id)),
                )
              }
            />
          ))}
        </div>
      )}

      {pagination.pages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-4">
          <Button
            variant="outline"
            size="sm"
            disabled={pagination.page <= 1}
            onClick={() => goToPage(pagination.page - 1)}
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          <span className="text-sm text-muted-foreground px-2">
            Page {pagination.page} of {pagination.pages}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={pagination.page >= pagination.pages}
            onClick={() => goToPage(pagination.page + 1)}
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}

      <LoginPromptDialog {...dialogProps} />
    </div>
  );
}
