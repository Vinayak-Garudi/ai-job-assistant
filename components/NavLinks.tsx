"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import { cn } from "@/lib/utils";

export function NavLinks() {
  const pathname = usePathname();

  const isActive = (href: string) => pathname.startsWith(href);

  return (
    <>
      <Link href="/dashboard">
        <Button
          variant="ghost"
          className={cn(
            "gap-2",
            isActive("/dashboard") && "font-bold underline",
          )}
        >
          Dashboard
        </Button>
      </Link>
      <Link href="/profile">
        <Button
          variant="ghost"
          className={cn("gap-2", isActive("/profile") && "font-bold underline")}
        >
          <User className="h-4 w-4" />
          Profile
        </Button>
      </Link>
    </>
  );
}
