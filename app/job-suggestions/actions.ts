"use server";

import { apiRequest } from "@/lib/api";
import { revalidatePath } from "next/cache";
import type { JobSuggestionsResult } from "@/types";

export interface JobSuggestionsResponse {
  result: JobSuggestionsResult | null;
  error: string | null;
}

export async function getJobSuggestions(): Promise<JobSuggestionsResponse> {
  const response = await apiRequest("job-suggestions", { method: "GET" });

  if (response.success && response.data) {
    return { result: response.data as JobSuggestionsResult, error: null };
  }
  return { result: null, error: response.message };
}

export async function refreshJobSuggestions(): Promise<JobSuggestionsResponse> {
  const response = await apiRequest("job-suggestions/refresh", {
    method: "POST",
  });

  if (response.success && response.data) {
    revalidatePath("/job-suggestions");
    return { result: response.data as JobSuggestionsResult, error: null };
  }
  return { result: null, error: response.message };
}
