"use client";

import { useState } from "react";
import Link from "next/link";
import { User, LogOut, UserCircle } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

interface UserMenuProps {
  onLogout: () => Promise<void>;
}

export function UserMenu({ onLogout }: UserMenuProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full bg-muted hover:bg-muted/80"
        >
          <User className="h-5 w-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-40 p-1">
        <Link href="/profile" onClick={() => setOpen(false)}>
          <Button
            variant="ghost"
            className="w-full justify-start gap-2 text-sm"
          >
            <UserCircle className="h-4 w-4" />
            Profile
          </Button>
        </Link>
        <form action={onLogout}>
          <Button
            type="submit"
            variant="ghost"
            className="w-full justify-start gap-2 text-sm text-red-600 hover:text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  );
}
