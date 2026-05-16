import AddJobForm from "@/components/AddJobForm";
import { Sparkles } from "lucide-react";

export default function AddJobPage() {
  return (
    <div className="container mx-auto py-8 px-4 max-w-2xl">
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-widest mb-3">
          <Sparkles className="h-3.5 w-3.5" />
          AI Analysis
        </div>
        <h1 className="text-2xl font-bold mb-1.5">Analyse a Job Posting</h1>
        <p className="text-muted-foreground text-sm">
          Paste any job URL and get instant AI analysis — match score, skill gaps, resume feedback, and an outreach email.
        </p>
      </div>
      <AddJobForm />
    </div>
  );
}
