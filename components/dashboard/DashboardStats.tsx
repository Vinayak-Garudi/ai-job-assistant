import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Star } from "lucide-react";
import type { JobMatchStats } from "@/types";

interface DashboardStatsProps {
  stats: JobMatchStats;
}

export default function DashboardStats({ stats }: DashboardStatsProps) {
  const { totalJobs, avgMatch, highMatches } = stats;

  const statCards = [
    {
      label: "High Matches",
      value: `${highMatches} / ${totalJobs}`,
      icon: Star,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
    },
    {
      label: "Avg Match Score",
      value: `${avgMatch.toFixed(1)}%`,
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards.map((stat) => (
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
