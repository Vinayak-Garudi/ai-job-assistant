"use client";

import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ChevronLeft, ChevronRight, X, Loader2 } from "lucide-react";
import type { JobMatch, Pagination } from "@/types";
import JobMatchCard from "./JobMatchCard";
import {
  getJobMatches,
  searchJobMatches,
} from "@/app/dashboard/actions";

interface JobListClientProps {
  initialJobs: JobMatch[];
  pagination: Pagination;
  initialQuery?: string;
}

export default function JobListClient({
  initialJobs,
  pagination: initialPagination,
  initialQuery = "",
}: JobListClientProps) {
  const [jobs, setJobs] = useState(initialJobs);
  const [pagination, setPagination] = useState(initialPagination);
  const [query, setQuery] = useState(initialQuery);
  const [isLoading, setIsLoading] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fetchJobs = async (searchQuery: string, page: number) => {
    setIsLoading(true);
    try {
      const result = searchQuery.trim()
        ? await searchJobMatches(searchQuery.trim(), page)
        : await getJobMatches(page);
      setJobs(result.jobs);
      setPagination(result.pagination);

      const params = new URLSearchParams();
      if (searchQuery.trim()) params.set("q", searchQuery.trim());
      if (page > 1) params.set("page", String(page));
      const qs = params.toString();
      window.history.replaceState(null, "", `/dashboard${qs ? `?${qs}` : ""}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Debounced search — only fires when user changes the query
  useEffect(() => {
    if (query === initialQuery) return;

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      fetchJobs(query, 1);
    }, 400);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query]);

  const goToPage = (page: number) => {
    fetchJobs(query, page);
  };

  const clearSearch = () => {
    setQuery("");
    fetchJobs("", 1);
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by title, company, or location..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 pr-10"
        />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {jobs.length === 0 ? (
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
          {jobs.map((job) => (
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
    </div>
  );
}
