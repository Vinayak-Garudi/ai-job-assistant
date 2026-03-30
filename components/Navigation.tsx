import Link from "next/link";
import { headers } from "next/headers";
import { Button } from "@/components/ui/button";
import { redirect, RedirectType } from "next/navigation";
import { handleAuthLogout } from "@/lib/authHandler";
import { Sparkles } from "lucide-react";
import { UserMenu } from "./UserMenu";
import { SidebarToggle } from "./sidebar/SidebarToggle";

export default async function Navigation() {
  // Read the header set by proxy.ts — already computed before render, no I/O
  const headerStore = await headers();
  const isAuthenticated = headerStore.get("x-is-authenticated") === "true";

  const handleLogout = async () => {
    "use server";
    await handleAuthLogout();
    redirect("/", RedirectType.replace);
  };

  return (
    <nav
      style={{ width: "100vw" }}
      className="fixed top-0 left-0 right-0 z-50 border-b bg-background"
    >
      <div className="w-full px-6">
        <div className="flex h-16 w-full items-center justify-between">
          <div className="flex items-center gap-1">
            {isAuthenticated && <SidebarToggle />}
            <Link href="/" className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <span className="font-bold text-lg">AI Job Assistant</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <UserMenu onLogout={handleLogout} />
              </>
            ) : (
              <>
                <Link href="/auth/signup">
                  <Button>Get Started</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
