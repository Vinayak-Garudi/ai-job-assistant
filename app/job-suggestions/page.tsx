import { Suspense } from "react";
import { getJobSuggestions } from "./actions";
import JobSuggestionsLoading from "./loading";
import JobSuggestionsClient from "@/components/job-suggestions/JobSuggestionsClient";
import GuestJobSuggestionsPrompt from "@/components/job-suggestions/GuestJobSuggestionsPrompt";
import { getIsGuest } from "@/lib/authState";

async function JobSuggestionsData() {
  const { result, error } = await getJobSuggestions();

  return (
    <JobSuggestionsClient
      key={result?.generatedAt ?? "error"}
      initialResult={result}
      initialError={error}
    />
  );
}

export default async function JobSuggestionsPage() {
  const isGuest = await getIsGuest();

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">Job Suggestions</h1>
        <p className="text-muted-foreground">
          Current openings picked for your skills, experience, and preferences
          — each one links straight to the original listing so you can apply.
        </p>
      </div>

      {isGuest ? (
        <GuestJobSuggestionsPrompt />
      ) : (
        <Suspense fallback={<JobSuggestionsLoading />}>
          <JobSuggestionsData />
        </Suspense>
      )}
    </div>
  );
}
