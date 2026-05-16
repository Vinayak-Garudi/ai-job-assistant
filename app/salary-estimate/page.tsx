import { Suspense } from "react";
import Link from "next/link";
import { getSalaryEstimate } from "./actions";
import SalaryEstimateLoading from "./loading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Lightbulb, FileText, Calendar, Info } from "lucide-react";

function formatSalary(amount: number, currency: string): string {
  if (currency === "INR") {
    const lpa = amount / 100000;
    return `₹${lpa % 1 === 0 ? lpa.toFixed(0) : lpa.toFixed(1)} LPA`;
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

async function SalaryEstimateData() {
  const { estimate, username } = await getSalaryEstimate();

  if (!estimate) {
    return (
      <Card className="border-dashed">
        <CardContent className="py-14 text-center space-y-3">
          <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center mx-auto">
            <Info className="h-6 w-6 text-muted-foreground" />
          </div>
          <h3 className="font-semibold">No estimate yet</h3>
          <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
            Complete your{" "}
            <Link href="/profile" className="text-primary underline underline-offset-4 hover:no-underline">
              profile
            </Link>{" "}
            with professional details, then re-run the analysis to get a personalised salary range.
          </p>
        </CardContent>
      </Card>
    );
  }

  const { minSalary, maxSalary, currency, rationale, marketInsights, generatedAt } = estimate;
  const minLabel = formatSalary(minSalary, currency);
  const maxLabel = formatSalary(maxSalary, currency);

  return (
    <div className="space-y-5">
      {/* Salary range hero */}
      <Card className="overflow-hidden">
        <div className="h-1 w-full bg-gradient-to-r from-emerald-500 to-teal-500" />
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-base">
            <TrendingUp className="h-4 w-4 text-emerald-500" />
            Estimated Salary Range
          </CardTitle>
          {username && (
            <p className="text-sm text-muted-foreground">Personalised estimate for {username}</p>
          )}
        </CardHeader>
        <CardContent className="space-y-5 pb-6">
          <div className="flex items-center justify-between gap-4">
            <div className="space-y-0.5">
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Minimum</p>
              <p className="text-3xl font-bold">{minLabel}</p>
            </div>
            <Badge variant="outline" className="shrink-0">{currency}</Badge>
            <div className="space-y-0.5 text-right">
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Maximum</p>
              <p className="text-3xl font-bold">{maxLabel}</p>
            </div>
          </div>

          <div className="relative h-2 rounded-full bg-muted overflow-hidden">
            <div className="absolute inset-y-0 left-0 w-full rounded-full bg-gradient-to-r from-emerald-400 to-teal-500" />
          </div>

          <p className="text-xs text-muted-foreground text-center">
            Based on your role, experience level, and location.
          </p>
        </CardContent>
      </Card>

      {/* Market Insights */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-base">
            <Lightbulb className="h-4 w-4 text-amber-500" />
            Market Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed">{marketInsights}</p>
        </CardContent>
      </Card>

      {/* Rationale */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-base">
            <FileText className="h-4 w-4 text-primary" />
            Rationale
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed">{rationale}</p>
        </CardContent>
      </Card>

      {generatedAt && (
        <div className="flex items-center gap-2 text-xs text-muted-foreground px-1">
          <Calendar className="h-3.5 w-3.5" />
          <span>Last updated {formatDate(generatedAt)}</span>
        </div>
      )}
    </div>
  );
}

export default function SalaryEstimatePage() {
  return (
    <div className="container mx-auto py-8 px-4 max-w-3xl">
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-widest mb-3">
          <TrendingUp className="h-3.5 w-3.5" />
          Salary Intelligence
        </div>
        <h1 className="text-2xl font-bold mb-1.5">Salary Estimate</h1>
        <p className="text-sm text-muted-foreground">
          Your personalised salary range, market insights, and rationale based on your profile.
        </p>
      </div>

      <Suspense fallback={<SalaryEstimateLoading />}>
        <SalaryEstimateData />
      </Suspense>
    </div>
  );
}
