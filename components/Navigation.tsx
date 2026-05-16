import Link from "next/link";
import { headers } from "next/headers";
import { Button } from "@/components/ui/button";
import { redirect, RedirectType } from "next/navigation";
import { handleAuthLogout } from "@/lib/authHandler";
import { Sparkles } from "lucide-react";
import { UserMenu } from "./UserMenu";
import { SidebarToggle } from "./sidebar/SidebarToggle";

export default async function Navigation() {
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
      className="fixed top-0 left-0 right-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl"
    >
      <div className="w-full px-4 sm:px-6">
        <div className="flex h-16 w-full items-center justify-between">
          <div className="flex items-center gap-1">
            {isAuthenticated && <SidebarToggle />}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-sm group-hover:shadow-violet-500/30 transition-shadow">
                <Sparkles className="h-3.5 w-3.5 text-white" />
              </div>
              <span className="font-bold text-base bg-gradient-to-r from-violet-600 to-purple-600 dark:from-violet-400 dark:to-purple-400 bg-clip-text text-transparent">
                AI Job Assistant
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <UserMenu onLogout={handleLogout} />
            ) : (
              <Button size="sm" className="bg-violet-600 hover:bg-violet-500 text-white border-0 shadow-sm" asChild>
                <Link href="/auth/signup">Get Started</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
