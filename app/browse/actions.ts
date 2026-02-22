"use server";

import { TennisEquipment } from "@/types";

interface EquipmentFilters {
  category?: string;
  condition?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
}

export async function loadMoreEquipment(
  filters: EquipmentFilters,
  page: number,
): Promise<{ items: TennisEquipment[]; hasMore: boolean }> {
  // TODO: Implement equipment loading with pagination
  return { items: [], hasMore: false };
}
