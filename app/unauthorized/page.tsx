import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShieldOff, ArrowLeft } from "lucide-react";

export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-[calc(100vh-64px)] flex-col items-center justify-center p-8 text-center">
      <div className="w-16 h-16 rounded-2xl bg-red-500/10 flex items-center justify-center mb-6">
        <ShieldOff className="h-8 w-8 text-red-500" />
      </div>
      <h1 className="text-3xl font-bold mb-3">Access Denied</h1>
      <p className="text-muted-foreground max-w-sm mb-8">
        You don&apos;t have permission to view this page. Sign in with the right account to continue.
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
