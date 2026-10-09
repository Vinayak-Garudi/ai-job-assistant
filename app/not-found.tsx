import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
      <p className="text-lg text-muted-foreground">
        The page you are looking for does not exist.
      </p>
      <Button asChild className="mt-6">
        <Link href="/dashboard">Go to Dashboard</Link>
      </Button>
    </div>
  );
}
