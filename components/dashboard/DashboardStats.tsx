"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Briefcase, FileCheck, Calendar, Award } from "lucide-react";
import type { Job } from "@/types";

interface DashboardStatsProps {
  jobs: Job[];
}

export default function DashboardStats({ jobs }: DashboardStatsProps) {
  const totalJobs = jobs.length;
  const appliedCount = jobs.filter(
    (j) => j.applicationStatus === "Applied"
  ).length;
  const interviewsCount = jobs.filter(
    (j) => j.applicationStatus === "Interview Scheduled"
  ).length;
  const offersCount = jobs.filter(
    (j) => j.applicationStatus === "Offer Received"
  ).length;

  const stats = [
    {
      label: "Total Jobs",
      value: totalJobs,
      icon: Briefcase,
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
    },
    {
      label: "Applied",
      value: appliedCount,
      icon: FileCheck,
      color: "text-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
    },
    {
      label: "Interviews",
      value: interviewsCount,
      icon: Calendar,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
    },
    {
      label: "Offers",
      value: offersCount,
      icon: Award,
      color: "text-green-600",
      bgColor: "bg-green-50 dark:bg-green-900/20",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <Card key={stat.label}>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-3xl font-bold mt-2">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-full ${stat.bgColor}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
