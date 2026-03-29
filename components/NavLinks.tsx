"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function NavLinks() {
  const pathname = usePathname();

  const isActive = (href: string) => pathname.startsWith(href);

  return (
    <Link href="/dashboard">
      <Button
        variant="ghost"
        className={cn("gap-2", isActive("/dashboard") && "font-bold underline")}
      >
        Dashboard
      </Button>
    </Link>
  );
}
