import Link from "next/link";
import { cookies } from "next/headers";
import { Button } from "@/components/ui/button";
import { redirect, RedirectType } from "next/navigation";
import { handleAuthLogout } from "@/lib/authHandler";
import { ThemeSwitcher } from "./theme-switcher";
import { Briefcase, LayoutDashboard, Plus, User } from "lucide-react";

export default async function Navigation() {
  // Check if user is authenticated
  const cookieStore = await cookies();
  const userToken = cookieStore.get("user-token");
  const isAuthenticated = !!userToken?.value;

  const handleLogout = async () => {
    "use server";
    await handleAuthLogout();
    redirect("/", RedirectType.replace);
  };

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🤖</span>
            <span className="font-bold text-lg">AI Job Assistant</span>
          </Link>

          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <Link href="/dashboard">
                  <Button variant="ghost" className="gap-2">
                    <LayoutDashboard className="h-4 w-4" />
                    Dashboard
                  </Button>
                </Link>
                <Link href="/jobs/add">
                  <Button variant="ghost" className="gap-2">
                    <Plus className="h-4 w-4" />
                    Add Job
                  </Button>
                </Link>
                <Link href="/profile">
                  <Button variant="ghost" className="gap-2">
                    <User className="h-4 w-4" />
                    Profile
                  </Button>
                </Link>
                <ThemeSwitcher />
                <Button variant="outline" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <ThemeSwitcher />
                <Link href="/auth/login">
                  <Button variant="ghost">Login</Button>
                </Link>
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
