import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative py-24 px-4 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto max-w-5xl text-center space-y-6">
        <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 px-4 py-2 rounded-full">
          <Sparkles className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
            AI-Powered Job Search
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          Find Your Dream Job
          <br />
          <span className="text-blue-600 dark:text-blue-400">
            With AI Assistance
          </span>
        </h1>

        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Smarter search. Better matches. Faster results.
        </p>

        <div className="flex gap-4 justify-center pt-4">
          <Button size="lg" asChild>
            <Link href="/auth/signup">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>

          <Button size="lg" variant="outline" asChild>
            <Link href="/auth/login">Sign In</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}