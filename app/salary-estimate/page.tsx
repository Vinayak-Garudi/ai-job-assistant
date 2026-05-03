import { Suspense } from "react";
import Link from "next/link";
import { getSalaryEstimate } from "./actions";
import SalaryEstimateLoading from "./loading";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
      <Card>
        <CardContent className="py-12 text-center space-y-3">
          <div className="flex justify-center">
            <Info className="h-10 w-10 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold">No Salary Estimate Yet</h3>
          <p className="text-muted-foreground max-w-md mx-auto text-sm leading-relaxed">
            Your salary estimate hasn&apos;t been generated yet. Please visit
            your{" "}
            <Link href="/profile" className="underline underline-offset-4 text-foreground hover:text-primary">
              Profile
            </Link>{" "}
            and make sure all your professional details are up to date, then
            re-run the analysis to get your personalised salary range.
          </p>
        </CardContent>
      </Card>
    );
  }

  const { minSalary, maxSalary, currency, rationale, marketInsights, generatedAt } = estimate;
  const minLabel = formatSalary(minSalary, currency);
  const maxLabel = formatSalary(maxSalary, currency);

  return (
    <div className="space-y-6">
      {/* Salary Range Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <TrendingUp className="h-5 w-5" />
            Estimated Salary Range
          </CardTitle>
          {username && (
            <CardDescription>
              Personalised estimate for {username} based on your profile
            </CardDescription>
          )}
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="flex items-end justify-between gap-4">
            <div className="space-y-0.5">
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                Minimum
              </p>
              <p className="text-3xl font-bold text-foreground">{minLabel}</p>
            </div>
            <Badge variant="outline" className="mb-1 shrink-0">
              {currency}
            </Badge>
            <div className="space-y-0.5 text-right">
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                Maximum
              </p>
              <p className="text-3xl font-bold text-foreground">{maxLabel}</p>
            </div>
          </div>

          {/* Range bar */}
          <div className="relative h-2 rounded-full bg-muted overflow-hidden">
            <div className="absolute inset-y-0 left-0 w-full rounded-full bg-gradient-to-r from-primary/60 to-primary" />
          </div>

          <p className="text-xs text-muted-foreground text-center">
            This range reflects realistic market compensation for your role and
            experience level.
          </p>
        </CardContent>
      </Card>

      {/* Market Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Lightbulb className="h-5 w-5" />
            Market Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-foreground leading-relaxed">{marketInsights}</p>
        </CardContent>
      </Card>

      {/* Rationale */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <FileText className="h-5 w-5" />
            Rationale
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-foreground leading-relaxed">{rationale}</p>
        </CardContent>
      </Card>

      {/* Generated at */}
      {generatedAt && (
        <div className="flex items-center gap-2 text-xs text-muted-foreground px-1">
          <Calendar className="h-3.5 w-3.5" />
          <span>Last updated on {formatDate(generatedAt)}</span>
        </div>
      )}
    </div>
  );
}

export default function SalaryEstimatePage() {
  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Salary Estimate</h1>
        <p className="text-muted-foreground">
          Your estimated salary range, market insights, and rationale based on
          your experience, skills, and location
        </p>
      </div>

      <Suspense fallback={<SalaryEstimateLoading />}>
        <SalaryEstimateData />
      </Suspense>
    </div>
  );
}
