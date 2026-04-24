"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { Button } from "@/components/ui/button";
import { navLinks } from "./Header";
import { XIcon, MenuIcon, SunIcon, MoonIcon } from "lucide-react";
import Link from "next/link";
import { useTheme } from "./theme-provider";

export function MobileNav({
  isAuthenticated,
  onLogout,
}: {
  isAuthenticated: boolean;
  onLogout: () => void;
}) {
  const [open, setOpen] = React.useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="md:hidden flex items-center gap-2">
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

      <Button onClick={() => setOpen(!open)} size="icon" variant="outline">
        {open ? (
          <XIcon className="size-4.5" />
        ) : (
          <MenuIcon className="size-4.5" />
        )}
      </Button>

      {open && (
        <div className="absolute top-16 left-0 right-0 p-4 space-y-6 bg-background min-h-screen border-t">
          {!isAuthenticated && (
            <div className="grid gap-2">
              {navLinks.map((link) => (
                <Button key={link.label} asChild variant="ghost">
                  <a href={link.href}>{link.label}</a>
                </Button>
              ))}
            </div>
          )}

          <div className="flex flex-col gap-2 pt-6">
            {isAuthenticated ? (
              <Button onClick={onLogout} variant="outline">
                Logout
              </Button>
            ) : (
              <>
                <Link href="/auth/login">
                  <Button variant="outline" className="w-full">
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth/login">
                  <Button className="w-full">Get Started</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
