"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Briefcase,
  MapPin,
  Calendar,
  TrendingUp,
  ExternalLink,
  MessageSquare,
  Trash2,
} from "lucide-react";
import type { Job, ApplicationStatus } from "@/types";
import Link from "next/link";

interface JobCardProps {
  job: Job;
  onStatusChange: (jobId: string, status: ApplicationStatus) => void;
  onDelete: (jobId: string) => void;
  onNotesClick: (jobId: string) => void;
}

export default function JobCard({
  job,
  onStatusChange,
  onDelete,
  onNotesClick,
}: JobCardProps) {
  const [status, setStatus] = useState(job.applicationStatus);

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus as ApplicationStatus);
    onStatusChange(job.id, newStatus as ApplicationStatus);
  };

  const getStatusColor = (status: ApplicationStatus) => {
    switch (status) {
      case "Saved":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "Applied":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
      case "Interview Scheduled":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "Rejected":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      case "Offer Received":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1">
            <CardTitle className="text-xl mb-2">{job.title}</CardTitle>
            <CardDescription className="flex flex-col gap-2">
              <span className="flex items-center gap-2">
                <Briefcase className="h-4 w-4" />
                {job.company}
              </span>
              <span className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                {job.location}
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Posted: {new Date(job.postedDate).toLocaleDateString()}
              </span>
            </CardDescription>
          </div>
          <div className="flex flex-col items-end gap-2">
            {job.aiAnalysis && (
              <div className="flex items-center gap-2 bg-green-50 dark:bg-green-900/20 px-3 py-1 rounded-full">
                <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />
                <span className="text-sm font-semibold text-green-700 dark:text-green-300">
                  {job.aiAnalysis.skillMatchPercentage}% Match
                </span>
              </div>
            )}
            <div className="flex gap-2">
              <Badge variant="outline">{job.jobType}</Badge>
              <Badge variant="outline">{job.workMode}</Badge>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* AI Analysis Summary */}
          {job.aiAnalysis && (
            <div className="p-4 bg-muted rounded-lg space-y-3">
              <h4 className="font-semibold text-sm">AI Analysis</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium mb-1 text-green-700 dark:text-green-400">
                    Strengths:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    {job.aiAnalysis.strengths
                      .slice(0, 3)
                      .map((strength, idx) => (
                        <li key={idx}>{strength}</li>
                      ))}
                  </ul>
                </div>
                <div>
                  <p className="font-medium mb-1 text-orange-700 dark:text-orange-400">
                    Areas to improve:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    {job.aiAnalysis.weaknesses
                      .slice(0, 3)
                      .map((weakness, idx) => (
                        <li key={idx}>{weakness}</li>
                      ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Status and Actions */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex-1 min-w-[200px]">
              <label className="text-sm font-medium mb-2 block">
                Application Status
              </label>
              <Select value={status} onValueChange={handleStatusChange}>
                <SelectTrigger className={getStatusColor(status)}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Saved">Saved</SelectItem>
                  <SelectItem value="Applied">Applied</SelectItem>
                  <SelectItem value="Interview Scheduled">
                    Interview Scheduled
                  </SelectItem>
                  <SelectItem value="Rejected">Rejected</SelectItem>
                  <SelectItem value="Offer Received">Offer Received</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2 flex-wrap">
              {job.url && (
                <Button variant="outline" size="sm" asChild>
                  <Link
                    href={job.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Job
                  </Link>
                </Button>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={() => onNotesClick(job.id)}
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Notes
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onDelete(job.id)}
                className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Notes Preview */}
          {job.notes && (
            <div className="p-3 bg-muted rounded text-sm">
              <p className="font-medium mb-1">Notes:</p>
              <p className="text-muted-foreground line-clamp-2">{job.notes}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
