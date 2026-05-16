import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-64px)] flex-col items-center justify-center p-8 text-center">
      <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-6">
        <SearchX className="h-8 w-8 text-muted-foreground" />
      </div>
      <p className="text-7xl font-bold text-primary/20 mb-4">404</p>
      <h1 className="text-3xl font-bold mb-3">Page not found</h1>
      <p className="text-muted-foreground max-w-sm mb-8">
        The page you&apos;re looking for doesn&apos;t exist or may have been moved.
      </p>
      <Button asChild>
        <Link href="/">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>
      </Button>
    </div>
  );
}
