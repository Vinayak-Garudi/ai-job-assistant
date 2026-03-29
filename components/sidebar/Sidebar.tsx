import { headers } from "next/headers";
import { SidebarClient } from "./SidebarClient";

export async function Sidebar() {
  const headerStore = await headers();
  const isAuthenticated = headerStore.get("x-is-authenticated") === "true";

  if (!isAuthenticated) return null;

  return <SidebarClient />;
}
