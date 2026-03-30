"use client";

import { ReactNode } from "react";

interface MainContentProps {
  children: ReactNode;
}

export function MainContent({ children }: MainContentProps) {
  return <div style={{ paddingBlockStart: "60px" }}>{children}</div>;
}
