import { Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function JobSuggestionsSkeleton() {
  return (
    <div className="space-y-4" aria-busy="true" aria-live="polite">
      <div className="flex items-start gap-3 rounded-lg border border-blue-200 bg-blue-50 px-3 py-3 text-sm sm:px-4 dark:border-blue-900/60 dark:bg-blue-950/30">
        <Loader2 className="mt-0.5 h-4 w-4 shrink-0 animate-spin text-blue-600 dark:text-blue-400" />
        <div>
          <p className="font-medium text-foreground">
            Searching job boards for openings that fit your profile…
          </p>
          <p className="text-muted-foreground">
            We check LinkedIn, Indeed, Naukri, company career sites and more,
            then rank each opening against your skills. This can take up to a
            minute.
          </p>
        </div>
      </div>

      {Array.from({ length: 3 }).map((_, i) => (
        <Card key={i} className="gap-0 p-4 sm:p-6">
          <div className="flex flex-col-reverse items-start gap-2 sm:flex-row sm:justify-between sm:gap-4">
            <Skeleton className="h-5 w-3/4 sm:w-2/3" />
            <Skeleton className="h-5 w-28 rounded-full" />
          </div>
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-4 w-24" />
          </div>
          <div className="mt-4 space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
          <div className="mt-4 flex flex-col gap-3 border-t pt-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex gap-2">
              <Skeleton className="h-5 w-20 rounded-full" />
              <Skeleton className="h-5 w-16 rounded-full" />
            </div>
            <Skeleton className="h-9 sm:w-40" />
          </div>
        </Card>
      ))}
    </div>
  );
}
