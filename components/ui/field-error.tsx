import { cn } from "@/lib/utils";

interface FieldErrorProps {
  id?: string;
  message?: string;
  className?: string;
}

export function FieldError({ id, message, className }: FieldErrorProps) {
  if (!message) return null;

  return (
    <p id={id} className={cn("text-sm text-destructive", className)}>
      {message}
    </p>
  );
}
