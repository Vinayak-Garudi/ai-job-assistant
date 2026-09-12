import Link from "next/link";
import {
  ArrowRight,
  BrainCircuit,
  FileText,
  LucideLinkedin,
  TrendingUp,
  UserCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const unlocks = [
  {
    Icon: BrainCircuit,
    title: "AI job matching",
    description:
      "Every job you paste in is scored against your real skills, experience, and preferences — with strengths and gaps spelled out.",
    accent: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-100 dark:bg-blue-900/30",
  },
  {
    Icon: FileText,
    title: "Your ideal resume",
    description:
      "A rewritten resume built from your profile, with bullets tuned to the roles you actually want.",
    accent: "text-indigo-600 dark:text-indigo-400",
    bg: "bg-indigo-100 dark:bg-indigo-900/30",
  },
  {
    Icon: LucideLinkedin,
    title: "LinkedIn recommendations",
    description:
      "Headline, About section, and experience entries drafted to match how recruiters search for your role.",
    accent: "text-sky-600 dark:text-sky-400",
    bg: "bg-sky-100 dark:bg-sky-900/30",
  },
  {
    Icon: TrendingUp,
    title: "Salary estimate",
    description:
      "A realistic compensation range for your experience and location, with the reasoning behind it.",
    accent: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-100 dark:bg-emerald-900/30",
  },
];

export default function GuestProfilePrompt() {
  return (
    <div className="space-y-6">
      <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 dark:border-blue-900/60 dark:from-blue-950/40 dark:to-indigo-950/30">
        <CardContent className="flex flex-col items-center gap-5 px-6 py-12 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/50">
            <UserCircle className="h-7 w-7 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">Your profile lives here</h2>
            <p className="mx-auto max-w-lg text-muted-foreground">
              Everything else in the app is powered by this one page. Create a
              free account and we&apos;ll walk you through it step by step —
              about a minute, and you can skip anything you&apos;re not sure
              about yet.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="/auth/signup">
                Create your profile
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/auth/login">I already have an account</Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {unlocks.map(({ Icon, title, description, accent, bg }) => (
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

      <p className="text-center text-sm text-muted-foreground">
        Just looking around?{" "}
        <Link
          href="/dashboard"
          className="text-foreground underline underline-offset-4 hover:text-primary"
        >
          Keep exploring the sample data
        </Link>{" "}
        — no account needed.
      </p>
    </div>
  );
}
