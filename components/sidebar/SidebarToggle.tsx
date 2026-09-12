"use client";

import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useSidebar } from "./SidebarContext";
import { shouldShowSidebar } from "./routes";

export function SidebarToggle() {
  const { toggle } = useSidebar();
  const pathname = usePathname();

  if (!shouldShowSidebar(pathname)) return null;

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggle}
      aria-label="Toggle sidebar"
    >
      <Menu className="h-5 w-5" />
    </Button>
  );
}
