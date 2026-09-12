import Link from "next/link";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface DemoDataBannerProps {
  /** Names what is being sampled, e.g. "job matches". */
  feature?: string;
  className?: string;
}

export default function DemoDataBanner({
  feature = "sample data",
  className,
}: DemoDataBannerProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 rounded-lg border border-blue-200 bg-blue-50/60 px-4 py-3 sm:flex-row sm:items-center sm:justify-between",
        "dark:border-blue-900/60 dark:bg-blue-950/30",
        className,
      )}
    >
      <div className="flex items-start gap-2.5">
        <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-blue-600 dark:text-blue-400" />
        <p className="text-sm text-blue-900 dark:text-blue-100">
          You&apos;re exploring {feature} from a sample profile.{" "}
          <span className="text-blue-700/80 dark:text-blue-200/80">
            Create a free account to see results built from your own experience.
          </span>
        </p>
      </div>
      <div className="flex shrink-0 gap-2">
        <Button size="sm" asChild>
          <Link href="/auth/signup">Sign up free</Link>
        </Button>
        <Button size="sm" variant="outline" asChild>
          <Link href="/auth/login">Log in</Link>
        </Button>
      </div>
    </div>
  );
}
