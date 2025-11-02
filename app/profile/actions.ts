"use server";

import { revalidatePath } from "next/cache";
import type { UserProfile } from "@/types";

// Mock function to save profile data
// In production, this would save to a database
export async function saveProfile(profile: UserProfile) {
  try {
    // TODO: Save to database
    console.log("Saving profile:", profile);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Revalidate the profile page to show updated data
    revalidatePath("/profile");

    return { success: true, message: "Profile updated successfully" };
  } catch (error) {
    console.error("Error saving profile:", error);
    return { success: false, message: "Failed to save profile" };
  }
}

// Mock function to fetch user profile
// In production, this would fetch from a database
export async function getUserProfile(): Promise<UserProfile> {
  // TODO: Fetch from database based on authenticated user

  // Return mock data for now
  return {
    id: "1",
    basicInfo: {
      username: "johndoe",
      age: 28,
      location: "San Francisco, CA",
      email: "john.doe@example.com",
      profilePic: "",
    },
    professionalInfo: {
      currentTitle: "Senior Software Engineer",
      currentCompany: "Tech Corp",
      experienceYears: 5,
      industry: "Technology",
    },
    otherInfo: {
      skills: ["React", "TypeScript", "Node.js", "Python", "PostgreSQL"],
      hobbiesAndInterests: ["Open Source", "Photography", "Hiking"],
      softSkills: [
        "Leadership",
        "Communication",
        "Problem Solving",
        "Team Collaboration",
      ],
    },
    education: {
      degree: "Bachelor of Science in Computer Science",
      graduationYear: 2019,
      certifications: ["AWS Certified Developer", "Google Cloud Professional"],
      university: "Stanford University",
    },
    documents: {
      resume: {
        url: "/resumes/john-doe-resume.pdf",
        fileName: "john-doe-resume.pdf",
        uploadedAt: new Date("2024-10-01"),
      },
    },
    jobPreferences: {
      jobTypes: ["Full Time", "Contract"],
      workModes: ["Remote", "Hybrid"],
      preferredLocations: ["San Francisco, CA", "New York, NY", "Remote"],
      desiredRoles: [
        "Software Engineer",
        "Senior Software Engineer",
        "Tech Lead",
      ],
    },
  };
}

export async function uploadResume(formData: FormData) {
  try {
    const file = formData.get("resume") as File;

    if (!file) {
      return { success: false, message: "No file provided" };
    }

    // TODO: Upload to storage service (S3, Cloudinary, etc.)
    console.log("Uploading resume:", file.name);

    // Simulate upload
    await new Promise((resolve) => setTimeout(resolve, 1000));

    revalidatePath("/profile");

    return {
      success: true,
      message: "Resume uploaded successfully",
      data: {
        url: `/resumes/${file.name}`,
        fileName: file.name,
        uploadedAt: new Date(),
      },
    };
  } catch (error) {
    console.error("Error uploading resume:", error);
    return { success: false, message: "Failed to upload resume" };
  }
}
