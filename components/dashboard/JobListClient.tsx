"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ChevronLeft, ChevronRight, X, BrainCircuit, Plus } from "lucide-react";
import type { JobMatch, Pagination } from "@/types";
import JobMatchCard from "./JobMatchCard";
import { getJobMatches, searchJobMatches } from "@/app/dashboard/actions";

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

  const goToPage = (page: number) => fetchJobs(query, page);
  const clearSearch = () => {
    setQuery("");
    fetchJobs("", 1);
  };

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by title, company, or location…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 pr-10 h-11 rounded-xl"
        />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        )}
        {isLoading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 rounded-full border-2 border-primary border-t-transparent animate-spin" />
        )}
      </div>

      {/* Job list or empty state */}
      {jobs.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-muted/30 py-14 text-center space-y-4">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto">
            <BrainCircuit className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="font-semibold">
              {query ? "No results found" : "No jobs yet"}
            </p>
            <p className="text-sm text-muted-foreground mt-1 max-w-xs mx-auto">
              {query
                ? `No jobs match "${query}". Try a different search term.`
                : "Paste a job URL and get instant AI analysis — match score, gaps, and an outreach email."}
            </p>
          </div>
          {!query && (
            <Button asChild size="sm">
              <Link href="/jobs/add">
                <Plus className="h-4 w-4 mr-1.5" />
                Analyse your first job
              </Link>
            </Button>
          )}
        </div>
      ) : (
        <div className="space-y-3">
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

      {/* Pagination */}
      {pagination.pages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            disabled={pagination.page <= 1}
            onClick={() => goToPage(pagination.page - 1)}
            className="rounded-lg"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Prev
          </Button>
          <span className="text-sm text-muted-foreground px-3">
            {pagination.page} / {pagination.pages}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={pagination.page >= pagination.pages}
            onClick={() => goToPage(pagination.page + 1)}
            className="rounded-lg"
          >
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      )}
    </div>
  );
}
