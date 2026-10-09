import Link from "next/link";
import {
  ArrowRight,
  Compass,
  ExternalLink,
  Gauge,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const benefits = [
  {
    Icon: Gauge,
    title: "Ranked by fit",
    description:
      "Every opening is scored against your skills, experience, and preferred locations — with a one-line reason why it suits you.",
    accent: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-100 dark:bg-blue-900/30",
  },
  {
    Icon: ExternalLink,
    title: "Straight to the listing",
    description:
      "Each suggestion links to the real posting on LinkedIn, Indeed, Naukri, or the company's careers page, so you can apply in one click.",
    accent: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-100 dark:bg-emerald-900/30",
  },
  {
    Icon: RefreshCw,
    title: "Always current",
    description:
      "We search recent postings for the roles you want and refresh whenever you ask.",
    accent: "text-indigo-600 dark:text-indigo-400",
    bg: "bg-indigo-100 dark:bg-indigo-900/30",
  },
];

export default function GuestJobSuggestionsPrompt() {
  return (
    <div className="space-y-6">
      <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 dark:border-blue-900/60 dark:from-blue-950/40 dark:to-indigo-950/30">
        <CardContent className="flex flex-col items-center gap-5 px-6 py-12 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/50">
            <Compass className="h-7 w-7 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">
              Let the right jobs find you
            </h2>
            <p className="mx-auto max-w-lg text-muted-foreground">
              Tell us the roles you want and where you&apos;d like to work, and
              we&apos;ll search today&apos;s openings across the web and pick
              the ones that fit you best. Creating a free account takes about a
              minute.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="/auth/signup">
                Get my job suggestions
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/auth/login">I already have an account</Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {benefits.map(({ Icon, title, description, accent, bg }) => (
          <Card key={title}>
            <CardHeader>
              <div
                className={`mb-2 flex h-10 w-10 items-center justify-center rounded-lg ${bg}`}
              >
                <Icon className={`h-5 w-5 ${accent}`} />
              </div>
              <CardTitle className="text-base">{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
