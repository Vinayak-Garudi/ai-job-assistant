"use client";

import { cn } from "@/lib/utils";
import React from "react";
// import { Portal, PortalBackdrop } from "@/components/ui/portal";
import { Button } from "@/components/ui/button";
import { navLinks } from "./Header";
import { XIcon, MenuIcon } from "lucide-react";
import Link from "next/link";

export function MobileNav({
  isAuthenticated,
  onLogout,
}: {
  isAuthenticated: boolean;
  onLogout: () => void;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="md:hidden">
      <Button onClick={() => setOpen(!open)} size="icon" variant="outline">
        {open ? (
          <XIcon className="size-4.5" />
        ) : (
          <MenuIcon className="size-4.5" />
        )}
      </Button>

      {open && (
        // <Portal className="top-16">
        //   <PortalBackdrop />
        <div className="p-4 space-y-6 bg-background min-h-screen">
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
                <Link href="/auth/signup">
                  <Button className="w-full">Get Started</Button>
                </Link>
              </>
            )}
          </div>
        </div>
        // </Portal>
      )}
    </div>
  );
}
