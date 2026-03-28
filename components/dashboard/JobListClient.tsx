"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import type { JobMatch } from "@/types";
import JobMatchCard from "./JobMatchCard";

interface JobListClientProps {
  initialJobs: JobMatch[];
}

export default function JobListClient({ initialJobs }: JobListClientProps) {
  const [jobs, setJobs] = useState(initialJobs);
  const [query, setQuery] = useState("");

  const filteredJobs = jobs.filter((job) => {
    if (!query) return true;
    const q = query.toLowerCase();
    return (
      job.jobTitle.toLowerCase().includes(q) ||
      job.company.toLowerCase().includes(q) ||
      job.location.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by title, company, or location..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {filteredJobs.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <p className="text-lg">No jobs found.</p>
          <p className="text-sm mt-2">
            {query
              ? "Try a different search term."
              : "Analyse a job to get started."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredJobs.map((job) => (
            <JobMatchCard
              key={job.id || job._id}
              job={job}
              onDelete={() =>
                setJobs((prev) =>
                  prev.filter((j) => (j._id ?? j.id) !== (job._id ?? job.id)),
                )
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}
