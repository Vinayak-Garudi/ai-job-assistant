"use server";

import { apiRequest } from "@/lib/api";
import type { JobSearchResult } from "@/types";

export async function getRecommendedJobs(params: {
  datePosted?: string;
  page?: number;
  limit?: number;
} = {}): Promise<{ result: JobSearchResult | null; error: string | null }> {
  const queryParams: Record<string, string> = {};
  if (params.datePosted) queryParams.datePosted = params.datePosted;
  if (params.page) queryParams.page = String(params.page);
  if (params.limit) queryParams.limit = String(params.limit);

  const response = await apiRequest("job-search/recommended", {
    method: "GET",
    params: queryParams,
  });

  if (!response.success) {
    return { result: null, error: response.message };
  }
  return { result: (response.data as JobSearchResult) ?? null, error: null };
}

export async function searchJobs(params: {
  query?: string;
  location?: string;
  jobTypes?: string;
  workModes?: string;
  datePosted?: string;
  page?: number;
} = {}): Promise<{ result: JobSearchResult | null; error: string | null }> {
  const queryParams: Record<string, string> = {};
  if (params.query) queryParams.query = params.query;
  if (params.location) queryParams.location = params.location;
  if (params.jobTypes) queryParams.jobTypes = params.jobTypes;
  if (params.workModes) queryParams.workModes = params.workModes;
  if (params.datePosted) queryParams.datePosted = params.datePosted;
  if (params.page) queryParams.page = String(params.page);

  const response = await apiRequest("job-search/search", {
    method: "GET",
    params: queryParams,
  });

  if (!response.success) {
    return { result: null, error: response.message };
  }
  return { result: (response.data as JobSearchResult) ?? null, error: null };
}
