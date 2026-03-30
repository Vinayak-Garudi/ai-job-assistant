"use client";

import { ReactNode } from "react";
import { useSidebar } from "./SidebarContext";

interface MainContentProps {
  children: ReactNode;
  isAuthenticated: boolean;
}

export function MainContent({ children, isAuthenticated }: MainContentProps) {
  const { open } = useSidebar();

  return (
    <div
      style={{
        paddingBlockStart: "80px",
        // marginLeft: isAuthenticated && open ? "256px" : "0px",
        transition: "margin-left 300ms ease-in-out",
      }}
    >
      {children}
    </div>
  );
}
