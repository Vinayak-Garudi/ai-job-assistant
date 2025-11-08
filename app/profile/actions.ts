"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import type { UserProfile } from "@/types";
import { apiRequest } from "@/lib/api";

// Fetch user profile from API
export async function getUserProfile(): Promise<UserProfile | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("user-token")?.value;

    if (!token) {
      console.error("No authentication token found");
      return null;
    }

    const response = await apiRequest("auth/profile", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.success && response.data) {
      // Convert date strings to Date objects if needed
      if (response.data.documents?.resume?.uploadedAt) {
        response.data.documents.resume.uploadedAt = new Date(
          response.data.documents.resume.uploadedAt
        );
      }
      return response.data as UserProfile;
    }

    console.error("Failed to fetch profile:", response.message);
    return null;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return null;
  }
}

// Save profile data to API
export async function saveProfile(profile: UserProfile) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("user-token")?.value;

    if (!token) {
      return { success: false, message: "Authentication required" };
    }

    const response = await apiRequest("auth/profile", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profile),
    });

    if (response.success) {
      // Revalidate the profile page to show updated data
      revalidatePath("/profile");
      return {
        success: true,
        message: response.message || "Profile updated successfully",
      };
    }

    return {
      success: false,
      message: response.message || "Failed to update profile",
    };
  } catch (error) {
    console.error("Error saving profile:", error);
    return { success: false, message: "Failed to save profile" };
  }
}
