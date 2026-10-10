import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface DemoDataBannerProps {
  /** What signing up gets them on this page, e.g. "a resume rewritten for the roles you want". */
  feature?: string;
  /** First-touch copy for the page a visitor lands on. */
  welcome?: boolean;
  className?: string;
}

// Guests explore without being told the content is an example; that reveal
// only happens in LoginPromptDialog when they try to act.
export default function DemoDataBanner({
  feature = "AI career tools built around your own experience",
  welcome = false,
  className,
}: DemoDataBannerProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-2 rounded-lg border bg-muted/40 px-3 py-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4",
        className,
      )}
    >
      <p className="flex items-start gap-2 text-sm text-muted-foreground sm:items-center">
        <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-primary sm:mt-0" />
        <span>
          <span className="font-medium text-foreground">
            {welcome
              ? "Know how well you fit a job before you apply."
              : `Get ${feature}.`}
          </span>{" "}
          {welcome
            ? "Paste any posting and get a match score, strengths, and gaps in seconds."
            : "Free to start — takes about a minute."}
        </span>
      </p>
      <div className="flex shrink-0 items-center gap-1 self-end sm:self-auto">
        <Button size="sm" variant="ghost" asChild>
          <Link href="/auth/login">Log in</Link>
        </Button>
        <Button size="sm" asChild>
          <Link href="/auth/signup">
            Get started free
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
