"use server";

import { apiRequest } from "@/lib/api";
import type { IdealLinkedInProfile } from "@/types";

export async function getLinkedInProfile(): Promise<{
  profile: IdealLinkedInProfile | null;
  username: string;
}> {
  const response = await apiRequest("auth/profile", {
    method: "GET",
  });

  if (response.success && response.data) {
    return {
      profile: response.data.idealLinkedInProfile ?? null,
      username: response.data.basicInfo?.username ?? "",
    };
  }

  return { profile: null, username: "" };
}
