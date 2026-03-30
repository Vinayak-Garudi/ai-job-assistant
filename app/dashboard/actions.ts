"use server";

import { revalidatePath } from "next/cache";
import type { JobMatch } from "@/types";
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
export interface JobMatchStats {
  totalJobs: number;
  avgMatch: number;
  highMatches: number;
  totalAnalyzed: number;
}

export interface JobMatchesResult {
  jobs: JobMatch[];
  stats: JobMatchStats;
}

export async function getJobMatches(): Promise<JobMatchesResult> {
  const response = await apiRequest("job-match/history");
  if (!response.success || !response.data) {
    return {
      jobs: [],
      stats: { totalJobs: 0, avgMatch: 0, highMatches: 0, totalAnalyzed: 0 },
    };
  }
  return {
    jobs: response.data ?? [],
    stats: response.stats ?? {
      totalJobs: 0,
      avgMatch: 0,
      highMatches: 0,
      totalAnalyzed: 0,
    },
  };
}
