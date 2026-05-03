"use server";

import { apiRequest } from "@/lib/api";
import type { SalaryEstimate } from "@/types";

export async function getSalaryEstimate(): Promise<{
  estimate: SalaryEstimate | null;
  username: string;
}> {
  const response = await apiRequest("auth/profile", {
    method: "GET",
  });

  if (response.success && response.data) {
    return {
      estimate: response.data.salaryEstimate ?? null,
      username: response.data.basicInfo?.username ?? "",
    };
  }

  return { estimate: null, username: "" };
}
