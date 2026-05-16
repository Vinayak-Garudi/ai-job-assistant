"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BrainCircuit,
  UserCircle,
  TrendingUp,
  FileText,
  Sparkles,
  Sun,
  Moon,
  Link2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useSidebar } from "./SidebarContext";
import { useTheme } from "@/components/theme-provider";

const navLinks = [
  { href: "/dashboard", label: "Dashboard", Icon: LayoutDashboard },
  { href: "/job-specific-details", label: "Job-Specific Details", Icon: Sparkles },
  { href: "/jobs/add", label: "Analyse Job", Icon: BrainCircuit },
  { href: "/linkedin-recommendation", label: "LinkedIn Profile", Icon: Link2 },
  { href: "/resume-recommendation", label: "Resume", Icon: FileText },
  { href: "/salary-estimate", label: "Salary Estimate", Icon: TrendingUp },
  { href: "/profile", label: "Profile", Icon: UserCircle },
];

export function SidebarClient() {
  const { open, toggle } = useSidebar();
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm"
          onClick={toggle}
        />
      )}

      <aside
        style={{ transform: open ? "translateX(0)" : "translateX(-100%)" }}
        className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 z-40 flex flex-col overflow-y-auto border-r border-border bg-sidebar shadow-2xl transition-transform duration-300 ease-in-out"
      >
        {/* Nav links */}
        <nav className="flex-1 p-3 space-y-0.5">
          {navLinks.map(({ href, label, Icon }) => {
            const active = pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                onClick={toggle}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150",
                  active
                    ? "bg-primary/10 text-primary dark:bg-primary/15"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                <Icon
                  className={cn(
                    "h-4 w-4 shrink-0 transition-colors",
                    active ? "text-primary" : "text-muted-foreground",
                  )}
                />
                {label}
                {active && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Theme toggle */}
        <div className="p-3 border-t border-border">
          <button
            onClick={toggleTheme}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-all cursor-pointer"
            aria-label="Toggle theme"
          >
            {theme === "light" ? (
              <Moon className="h-4 w-4" />
            ) : (
              <Sun className="h-4 w-4" />
            )}
            {theme === "light" ? "Dark mode" : "Light mode"}
          </button>
        </div>
      </aside>
    </>
  );
}
