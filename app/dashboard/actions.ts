"use server";

import { revalidatePath } from "next/cache";
import type {
  JobMatch,
  JobMatchStats,
  JobMatchesResult,
  Pagination,
} from "@/types";
import { apiRequest } from "@/lib/api";

// Delete a job
export async function deleteJob(jobId: string) {
  try {
    // TODO: Delete from database
    console.log("Deleting job:", jobId);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    revalidatePath("/dashboard");

    return { success: true, message: "Job deleted successfully" };
  } catch (error) {
    console.error("Error deleting job:", error);
    return { success: false, message: "Failed to delete job" };
  }
}

export async function deleteJobMatch(id: string) {
  const response = await apiRequest(`job-match/${id}`, { method: "DELETE" });
  if (!response.success)
    throw new Error(response.message || "Failed to delete job");
  revalidatePath("/dashboard");
}

// Fetch job match history from the API
export async function getJobMatches(
  page: number = 1,
): Promise<JobMatchesResult> {
  const response = await apiRequest("job-match/history", {
    params: { page: String(page), limit: "10" },
  });
  const defaultPagination: Pagination = { page, limit: 10, total: 0, pages: 0 };
  const defaultStats = {
    totalJobs: 0,
    avgMatch: 0,
    highMatches: 0,
    totalAnalyzed: 0,
  };

  if (!response.success) {
    return { jobs: [], stats: defaultStats, pagination: defaultPagination };
  }
  return {
    jobs: response.items ?? response.data ?? [],
    stats: response.stats ?? defaultStats,
    pagination: response.pagination ?? defaultPagination,
  };
}

// Search job matches via the backend
export async function searchJobMatches(
  query: string,
  page: number = 1,
): Promise<JobMatchesResult> {
  const params: Record<string, string> = {
    page: String(page),
    limit: "10",
    jobTitle: query,
    company: query,
    location: query,
  };
  const response = await apiRequest("job-match/search", { params });
  const defaultPagination: Pagination = { page, limit: 10, total: 0, pages: 0 };
  const defaultStats = {
    totalJobs: 0,
    avgMatch: 0,
    highMatches: 0,
    totalAnalyzed: 0,
  };

  if (!response.success) {
    return { jobs: [], stats: defaultStats, pagination: defaultPagination };
  }
  return {
    jobs: response.items ?? response.data ?? [],
    stats: response.stats ?? defaultStats,
    pagination: response.pagination ?? defaultPagination,
  };
}
