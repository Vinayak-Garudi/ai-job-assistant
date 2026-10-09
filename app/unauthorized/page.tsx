import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-4">Unauthorized Access</h1>
      <p className="text-lg text-muted-foreground">
        You do not have permission to access this page.
      </p>
      <Button asChild className="mt-6">
        <Link href="/dashboard">Go to Dashboard</Link>
      </Button>
    </div>
  );
}
