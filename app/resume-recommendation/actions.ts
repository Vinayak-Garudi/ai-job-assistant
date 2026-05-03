"use server";

import { apiRequest } from "@/lib/api";
import type { IdealResume } from "@/types";

export async function getResumeRecommendation(): Promise<{
  resume: IdealResume | null;
  username: string;
}> {
  const response = await apiRequest("auth/profile", {
    method: "GET",
  });

  if (response.success && response.data) {
    return {
      resume: response.data.idealResume ?? null,
      username: response.data.basicInfo?.username ?? "",
    };
  }

  return { resume: null, username: "" };
}
