"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, BrainCircuit } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSidebar } from "./SidebarContext";

const navLinks = [
  { href: "/dashboard", label: "Dashboard", Icon: LayoutDashboard },
  { href: "/jobs/add", label: "Analyse Job", Icon: BrainCircuit },
];

export function SidebarClient() {
  const { open } = useSidebar();
  const pathname = usePathname();

  return (
    <aside
      style={{
        transform: open ? "translateX(0)" : "translateX(-100%)",
        paddingTop: "80px",
        height: "100vh",
        overflowY: "auto",
      }}
      className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 border-r border-border bg-white dark:bg-zinc-900 shadow-lg z-40 transition-transform duration-300 ease-in-out"
    >
      <nav className="p-3 flex flex-col gap-1">
        {navLinks.map(({ href, label, Icon }) => (
          <Link
            key={href}
            href={href}
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
    </aside>
  );
}
