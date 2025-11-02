"use client";

import JobCardClient from "./JobCardClient";
import JobSearchFilter from "@/components/JobSearchFilter";
import type { Job, SearchFilters } from "@/types";
import { useState } from "react";

interface JobListClientProps {
  initialJobs: Job[];
}

export default function JobListClient({ initialJobs }: JobListClientProps) {
  const [filteredJobs, setFilteredJobs] = useState<Job[]>(initialJobs);

  const handleFilterChange = (filters: SearchFilters) => {
    const filtered = initialJobs.filter((job) => {
      if (
        filters.query &&
        !job.title.toLowerCase().includes(filters.query.toLowerCase()) &&
        !job.company.toLowerCase().includes(filters.query.toLowerCase())
      ) {
        return false;
      }

      if (filters.jobType && job.jobType !== filters.jobType) {
        return false;
      }

      if (filters.workMode && job.workMode !== filters.workMode) {
        return false;
      }

      if (filters.status && job.applicationStatus !== filters.status) {
        return false;
      }

      if (
        filters.location &&
        !job.location.toLowerCase().includes(filters.location.toLowerCase())
      ) {
        return false;
      }

      return true;
    });

    setFilteredJobs(filtered);
  };

  return (
    <>
      <JobSearchFilter onFilterChange={handleFilterChange} />

      <div className="grid grid-cols-1 gap-6">
        {filteredJobs.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <p className="text-lg">No jobs found matching your filters.</p>
            <p className="text-sm mt-2">
              Try adjusting your search criteria or add new jobs.
            </p>
          </div>
        ) : (
          filteredJobs.map((job) => <JobCardClient key={job.id} job={job} />)
        )}
      </div>
    </>
  );
}
