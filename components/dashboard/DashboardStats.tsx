import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Star, Briefcase, BarChart2 } from "lucide-react";
import type { JobMatchStats } from "@/types";

interface DashboardStatsProps {
  stats: JobMatchStats;
}

export default function DashboardStats({ stats }: DashboardStatsProps) {
  const { totalJobs, avgMatch, highMatches, totalAnalyzed } = stats;

  const statCards = [
    {
      label: "Jobs Tracked",
      value: totalJobs,
      icon: Briefcase,
      gradient: "from-violet-500/10 to-purple-500/10",
      iconClass: "text-violet-500",
      border: "border-violet-500/20",
    },
    {
      label: "Analysed",
      value: totalAnalyzed,
      icon: BarChart2,
      gradient: "from-blue-500/10 to-indigo-500/10",
      iconClass: "text-blue-500",
      border: "border-blue-500/20",
    },
    {
      label: "High Matches",
      value: highMatches,
      icon: Star,
      gradient: "from-amber-500/10 to-orange-500/10",
      iconClass: "text-amber-500",
      border: "border-amber-500/20",
    },
    {
      label: "Avg Match",
      value: `${avgMatch.toFixed(1)}%`,
      icon: TrendingUp,
      gradient: "from-emerald-500/10 to-teal-500/10",
      iconClass: "text-emerald-500",
      border: "border-emerald-500/20",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {statCards.map((stat) => (
        <Card key={stat.label} className={`border ${stat.border} overflow-hidden`}>
          <CardContent className="p-5">
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} pointer-events-none rounded-xl`} />
            <div className="relative">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  {stat.label}
                </p>
                <stat.icon className={`h-4 w-4 ${stat.iconClass}`} />
              </div>
              <p className="text-3xl font-bold">{stat.value}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
