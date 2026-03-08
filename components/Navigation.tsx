import Link from "next/link";
import { headers } from "next/headers";
import { Button } from "@/components/ui/button";
import { redirect, RedirectType } from "next/navigation";
import { handleAuthLogout } from "@/lib/authHandler";
// import { ThemeSwitcher } from "./theme-switcher";
import { Sparkles } from "lucide-react";
import { NavLinks } from "./NavLinks";

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
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {!isAuthenticated && (
            <Link href="/" className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <span className="font-bold text-lg">AI Job Assistant</span>
            </Link>
          )}

          <div className="flex items-center gap-4 absolute right-4">
            {isAuthenticated ? (
              <>
                {/* <Link href="/dashboard">
                  <Button variant="ghost" className="gap-2">
                    <LayoutDashboard className="h-4 w-4" />
                    Dashboard
                  </Button>
                </Link> */}
                <NavLinks />
                {/* <ThemeSwitcher /> */}
                <Button variant="outline" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                {/* <ThemeSwitcher /> */}
                {/* <Link href="/auth/login">
                  <Button variant="ghost">Login</Button>
                </Link> */}
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
