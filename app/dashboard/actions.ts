"use server";

import { revalidatePath } from "next/cache";
import type { Job, ApplicationStatus } from "@/types";

// Mock data for demonstration
const mockJobs: Job[] = [
  {
    id: "1",
    title: "Senior Full Stack Developer",
    company: "Tech Corp",
    location: "San Francisco, CA",
    jobType: "Full Time",
    workMode: "Remote",
    description: "Looking for an experienced full stack developer...",
    requirements: ["React", "Node.js", "TypeScript", "PostgreSQL"],
    url: "https://example.com/job1",
    postedDate: new Date("2024-10-20"),
    applicationStatus: "Applied",
    aiAnalysis: {
      skillMatchPercentage: 85,
      strengths: [
        "Strong React experience",
        "TypeScript proficiency",
        "Full stack capabilities",
      ],
      weaknesses: ["Limited PostgreSQL experience", "No DevOps background"],
      analyzedAt: new Date("2024-10-21"),
    },
    notes: "Great company culture, applied on Oct 21st",
    appliedDate: new Date("2024-10-21"),
  },
  {
    id: "2",
    title: "Frontend Engineer",
    company: "Startup Inc",
    location: "New York, NY",
    jobType: "Full Time",
    workMode: "Hybrid",
    description: "Join our growing team...",
    requirements: ["React", "CSS", "JavaScript"],
    postedDate: new Date("2024-10-25"),
    applicationStatus: "Saved",
    aiAnalysis: {
      skillMatchPercentage: 92,
      strengths: [
        "Perfect React match",
        "Strong CSS skills",
        "Modern JavaScript",
      ],
      weaknesses: ["Could improve testing skills"],
      analyzedAt: new Date("2024-10-26"),
    },
  },
  {
    id: "3",
    title: "Software Engineering Intern",
    company: "Big Tech Company",
    location: "Seattle, WA",
    jobType: "Internship",
    workMode: "On-site",
    description: "Summer internship program...",
    requirements: ["Python", "Data Structures", "Algorithms"],
    postedDate: new Date("2024-10-28"),
    applicationStatus: "Interview Scheduled",
    aiAnalysis: {
      skillMatchPercentage: 78,
      strengths: ["Good Python knowledge", "Strong algorithmic thinking"],
      weaknesses: [
        "Limited industry experience",
        "No system design background",
      ],
      analyzedAt: new Date("2024-10-29"),
    },
    notes: "Interview scheduled for Nov 5th at 2 PM",
  },
];

// Fetch all jobs for the authenticated user
export async function getUserJobs(): Promise<Job[]> {
  // TODO: Fetch from database based on authenticated user
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100));

  return mockJobs;
}

// Update job application status
export async function updateJobStatus(
  jobId: string,
  status: ApplicationStatus
) {
  try {
    // TODO: Update in database
    console.log("Updating job status:", jobId, status);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    revalidatePath("/dashboard");

    return { success: true, message: "Job status updated successfully" };
  } catch (error) {
    console.error("Error updating job status:", error);
    return { success: false, message: "Failed to update job status" };
  }
}

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

// Update job notes
export async function updateJobNotes(jobId: string, notes: string) {
  try {
    // TODO: Update in database
    console.log("Updating job notes:", jobId, notes);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    revalidatePath("/dashboard");

    return { success: true, message: "Notes updated successfully" };
  } catch (error) {
    console.error("Error updating notes:", error);
    return { success: false, message: "Failed to update notes" };
  }
}
