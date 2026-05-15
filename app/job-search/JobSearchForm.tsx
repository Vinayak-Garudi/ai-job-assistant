"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

const JOB_TYPES = ["Full Time", "Part Time", "Contract", "Internship"] as const;
const WORK_MODES = ["Remote", "On-site", "Hybrid"] as const;
const DATE_OPTIONS = [
  { value: "all", label: "Any time" },
  { value: "today", label: "Today" },
  { value: "3days", label: "3 days" },
  { value: "week", label: "This week" },
  { value: "month", label: "This month" },
] as const;

interface Props {
  initialParams: {
    query?: string;
    location?: string;
    jobTypes?: string;
    workModes?: string;
    datePosted?: string;
  };
}

function TogglePill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "px-2.5 py-1 text-xs rounded-full border transition-colors cursor-pointer",
        active
          ? "bg-primary text-primary-foreground border-primary"
          : "border-border text-muted-foreground hover:border-primary hover:text-foreground",
      )}
    >
      {label}
    </button>
  );
}

export default function JobSearchForm({ initialParams }: Props) {
  const router = useRouter();
  const [query, setQuery] = useState(initialParams.query ?? "");
  const [location, setLocation] = useState(initialParams.location ?? "");
  const [jobTypes, setJobTypes] = useState<string[]>(
    initialParams.jobTypes ? initialParams.jobTypes.split(",") : [],
  );
  const [workModes, setWorkModes] = useState<string[]>(
    initialParams.workModes ? initialParams.workModes.split(",") : [],
  );
  const [datePosted, setDatePosted] = useState(
    initialParams.datePosted ?? "month",
  );

  const toggle = (
    value: string,
    list: string[],
    setList: (v: string[]) => void,
  ) =>
    setList(
      list.includes(value) ? list.filter((v) => v !== value) : [...list, value],
    );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams({ tab: "search" });
    if (query.trim()) params.set("query", query.trim());
    if (location.trim()) params.set("location", location.trim());
    if (jobTypes.length) params.set("jobTypes", jobTypes.join(","));
    if (workModes.length) params.set("workModes", workModes.join(","));
    params.set("datePosted", datePosted);
    router.push(`/job-search?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-6">
      <div className="flex flex-col sm:flex-row gap-2">
        <Input
          placeholder="Job title, keywords, or company"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1"
        />
        <Input
          placeholder="Location (optional)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="flex-1 sm:max-w-56"
        />
        <Button type="submit" className="gap-1.5 shrink-0">
          <Search className="h-4 w-4" />
          Search
        </Button>
      </div>

      <div className="flex flex-wrap gap-x-6 gap-y-3">
        <div className="space-y-1.5">
          <p className="text-xs text-muted-foreground">Job type</p>
          <div className="flex flex-wrap gap-1.5">
            {JOB_TYPES.map((t) => (
              <TogglePill
                key={t}
                label={t}
                active={jobTypes.includes(t)}
                onClick={() => toggle(t, jobTypes, setJobTypes)}
              />
            ))}
          </div>
        </div>

        <div className="space-y-1.5">
          <p className="text-xs text-muted-foreground">Work mode</p>
          <div className="flex flex-wrap gap-1.5">
            {WORK_MODES.map((m) => (
              <TogglePill
                key={m}
                label={m}
                active={workModes.includes(m)}
                onClick={() => toggle(m, workModes, setWorkModes)}
              />
            ))}
          </div>
        </div>

        <div className="space-y-1.5">
          <p className="text-xs text-muted-foreground">Date posted</p>
          <div className="flex flex-wrap gap-1.5">
            {DATE_OPTIONS.map((opt) => (
              <TogglePill
                key={opt.value}
                label={opt.label}
                active={datePosted === opt.value}
                onClick={() => setDatePosted(opt.value)}
              />
            ))}
          </div>
        </div>
      </div>
    </form>
  );
}
