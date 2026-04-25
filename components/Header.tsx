"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useScroll } from "@/hooks/use-scroll";
import { Button } from "@/components/ui/button";
import { Sparkles, SunIcon, MoonIcon } from "lucide-react";
import { MobileNav } from "./MobileNav";
import { SidebarToggle } from "./sidebar/SidebarToggle";
import { UserMenu } from "./UserMenu";
import { useTheme } from "./theme-provider";

export const navLinks = [
  { label: "Features", href: "#" },
  { label: "Pricing", href: "#" },
  { label: "About", href: "#" },
];

export default function Header({
  isAuthenticated,
  onLogout,
}: {
  isAuthenticated: boolean;
  onLogout: () => void;
}) {
  const scrolled = useScroll(10);
  const { theme, toggleTheme } = useTheme();

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 mx-auto w-full max-w-6xl",
        "border-b border-transparent transition-all",
        {
          "bg-background/95 backdrop-blur-md border-border shadow-sm": scrolled,
        },
      )}
    >
      <nav className="flex h-16 items-center justify-between px-6">
        {/* Left */}
        <div className="flex items-center gap-3">
          {isAuthenticated && <SidebarToggle />}

          <Link href="/" className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <span className="font-semibold">AI Job Assistant</span>
          </Link>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-2">
          {!isAuthenticated && (
            <div className="flex items-center gap-1">
              {navLinks.map((link) => (
                <Button key={link.label} asChild size="sm" variant="ghost">
                  <a href={link.href}>{link.label}</a>
                </Button>
              ))}
            </div>
          )}

          {/* Theme Toggle */}
          <Button
            size="icon-sm"
            variant="ghost"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="text-muted-foreground hover:text-foreground"
          >
            {theme === "dark" ? (
              <SunIcon className="size-4" />
            ) : (
              <MoonIcon className="size-4" />
            )}
          </Button>

          {isAuthenticated ? (
            <UserMenu onLogout={onLogout} />
          ) : (
            <>
              <Link href="/auth/login">
                <Button size="sm" variant="outline">
                  Sign In
                </Button>
              </Link>
              <Link href="/auth/login">
                <Button size="sm">Get Started</Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile */}
        <MobileNav isAuthenticated={isAuthenticated} onLogout={onLogout} />
      </nav>
    </header>
  );
}
