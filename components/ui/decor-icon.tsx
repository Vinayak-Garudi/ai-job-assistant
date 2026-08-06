import { cn } from "@/lib/utils";
import type React from "react";

type Position = "top-left" | "top-right" | "bottom-left" | "bottom-right";

const positionClasses: Record<Position, string> = {
  "top-left": "-top-3 -left-3",
  "top-right": "-top-3 -right-3",
  "bottom-left": "-bottom-3 -left-3",
  "bottom-right": "-bottom-3 -right-3",
};

export function DecorIcon({
  position,
  className,
  ...props
}: React.ComponentProps<"svg"> & { position: Position }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={cn(
        "pointer-events-none absolute size-6 text-border",
        positionClasses[position],
        className,
      )}
      {...props}
    >
      <path d="M12 2v20M2 12h20" />
    </svg>
  );
}
