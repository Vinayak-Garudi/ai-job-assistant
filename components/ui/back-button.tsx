"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function BackButton() {
  const router = useRouter();
  return (
    <Button
      variant="ghost"
      size="sm"
      className="gap-1.5 -ml-2"
      onClick={() => router.back()}
    >
      <ArrowLeft className="h-4 w-4" />
      Back
    </Button>
  );
}
