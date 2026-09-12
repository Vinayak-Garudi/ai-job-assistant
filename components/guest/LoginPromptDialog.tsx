"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface LoginPromptDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** The action the guest tried to take, e.g. "analyse a job". */
  feature?: string;
}

export function LoginPromptDialog({
  open,
  onOpenChange,
  feature,
}: LoginPromptDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="mb-1 flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/40">
            <Lock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <DialogTitle>
            {feature ? `Sign in to ${feature}` : "Sign in to continue"}
          </DialogTitle>
          <DialogDescription>
            You&apos;re browsing sample data. Create a free account to work with
            your own jobs, resume, and AI analysis — it takes about a minute.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex-col sm:flex-row sm:justify-start">
          <Button asChild>
            <Link href="/auth/signup">Sign up free</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/auth/login">Log in</Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

/**
 * Wires up a single login prompt for a client component.
 *
 * `guard` returns false and opens the dialog when the visitor is a guest, so
 * callers can early-return before touching the API:
 *
 *   if (!guard("delete a job")) return;
 */
export function useLoginPrompt(isGuest: boolean) {
  const [open, setOpen] = useState(false);
  const [feature, setFeature] = useState<string | undefined>(undefined);

  const prompt = useCallback((action?: string) => {
    setFeature(action);
    setOpen(true);
  }, []);

  const guard = useCallback(
    (action?: string) => {
      if (isGuest) {
        prompt(action);
        return false;
      }
      return true;
    },
    [isGuest, prompt],
  );

  return {
    prompt,
    guard,
    dialogProps: { open, onOpenChange: setOpen, feature },
  };
}
