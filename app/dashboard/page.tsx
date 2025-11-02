"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import JobSearchFilter from "@/components/JobSearchFilter";
import JobCard from "@/components/JobCard";
import { Plus, Briefcase } from "lucide-react";
import Link from "next/link";
import type { Job, SearchFilters, ApplicationStatus } from "@/types";

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

export default function DashboardPage() {
  const [jobs, setJobs] = useState<Job[]>(mockJobs);
  const [filters, setFilters] = useState<SearchFilters>({ query: "" });

  const handleStatusChange = (jobId: string, status: ApplicationStatus) => {
    setJobs(
      jobs.map((job) =>
        job.id === jobId ? { ...job, applicationStatus: status } : job
      )
    );
  };

  const handleDelete = (jobId: string) => {
    if (confirm("Are you sure you want to delete this job?")) {
      setJobs(jobs.filter((job) => job.id !== jobId));
    }
  };

  const handleNotesClick = (jobId: string) => {
    // TODO: Open notes modal/dialog
    console.log("Open notes for job:", jobId);
  };

  const filteredJobs = jobs.filter((job) => {
    if (
      filters.query &&
      !job.title.toLowerCase().includes(filters.query.toLowerCase()) &&
      !job.company.toLowerCase().includes(filters.query.toLowerCase())
    ) {
      return false;
    }
    if (
      filters.jobType &&
      filters.jobType !== "all" &&
      job.jobType !== filters.jobType
    ) {
      return false;
    }
    if (
      filters.workMode &&
      filters.workMode !== "all" &&
      job.workMode !== filters.workMode
    ) {
      return false;
    }
    if (filters.status && job.applicationStatus !== filters.status) {
      return false;
    }
    if (
      filters.location &&
      !job.location.toLowerCase().includes(filters.location.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const stats = {
    total: jobs.length,
    saved: jobs.filter((j) => j.applicationStatus === "Saved").length,
    applied: jobs.filter((j) => j.applicationStatus === "Applied").length,
    interviews: jobs.filter(
      (j) => j.applicationStatus === "Interview Scheduled"
    ).length,
  };

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Job Dashboard</h1>
          <p className="text-muted-foreground">
            Track and manage your job applications
          </p>
        </div>
        <Button asChild>
          <Link href="/jobs/add">
            <Plus className="h-4 w-4 mr-2" />
            Add New Job
          </Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total Jobs</CardDescription>
            <CardTitle className="text-3xl">{stats.total}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Saved</CardDescription>
            <CardTitle className="text-3xl text-blue-600 dark:text-blue-400">
              {stats.saved}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Applied</CardDescription>
            <CardTitle className="text-3xl text-purple-600 dark:text-purple-400">
              {stats.applied}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Interviews</CardDescription>
            <CardTitle className="text-3xl text-yellow-600 dark:text-yellow-400">
              {stats.interviews}
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="mb-6">
        <JobSearchFilter onFilterChange={setFilters} />
      </div>

      {/* Job List */}
      <div className="space-y-4">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              onStatusChange={handleStatusChange}
              onDelete={handleDelete}
              onNotesClick={handleNotesClick}
            />
          ))
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Briefcase className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No jobs found</h3>
              <p className="text-muted-foreground mb-4">
                {jobs.length === 0
                  ? "Start by adding your first job posting"
                  : "Try adjusting your filters"}
              </p>
              {jobs.length === 0 && (
                <Button asChild>
                  <Link href="/jobs/add">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Your First Job
                  </Link>
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
