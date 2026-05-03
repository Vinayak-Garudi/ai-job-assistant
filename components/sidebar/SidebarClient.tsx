"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BrainCircuit,
  UserCircle,
  Linkedin,
  TrendingUp,
  FileText,
  Sun,
  Moon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useSidebar } from "./SidebarContext";
import { useTheme } from "@/components/theme-provider";

const navLinks = [
  { href: "/dashboard", label: "Dashboard", Icon: LayoutDashboard },
  { href: "/jobs/add", label: "Analyse Job", Icon: BrainCircuit },
  {
    href: "/linkedin-recommendation",
    label: "LinkedIn Profile",
    Icon: Linkedin,
  },
  {
    href: "/resume-recommendation",
    label: "Resume",
    Icon: FileText,
  },
  {
    href: "/salary-estimate",
    label: "Salary Estimate",
    Icon: TrendingUp,
  },
  { href: "/profile", label: "Profile", Icon: UserCircle },
];

export function SidebarClient() {
  const { open, toggle } = useSidebar();
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      {/* Overlay */}
      {open && (
        <div className="fixed inset-0 z-30 bg-black/40" onClick={toggle} />
      )}

      <aside
        style={{
          transform: open ? "translateX(0)" : "translateX(-100%)",
        }}
        className="fixed overflow-y-auto left-0 top-16 h-[calc(100vh-4rem)] w-64 border-r border-border bg-white dark:bg-zinc-900 shadow-lg z-40 transition-transform duration-300 ease-in-out flex flex-col"
      >
        <nav className="p-3 flex flex-col gap-1 flex-1">
          {navLinks.map(({ href, label, Icon }) => (
            <Link
              key={href}
              href={href}
              onClick={toggle}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                "hover:bg-muted",
                pathname.startsWith(href)
                  ? "bg-muted text-foreground"
                  : "text-muted-foreground",
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}
        </nav>

        {/* Theme toggle — fixed to bottom of sidebar */}
        <div className="p-3 border-t border-border">
          <button
            onClick={toggleTheme}
            className="flex items-center gap-3 w-full px-3 py-2 rounded-md text-sm font-medium text-muted-foreground bg-muted hover:text-foreground transition-colors cursor-pointer"
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
