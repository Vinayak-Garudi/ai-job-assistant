// Navigation.tsx (SERVER)
import { headers } from "next/headers";
import { redirect, RedirectType } from "next/navigation";
import { handleAuthLogout } from "@/lib/authHandler";
import Header from "./Header";

export default async function Navigation() {
  const headerStore = await headers();
  const isAuthenticated = headerStore.get("x-is-authenticated") === "true";

  const handleLogout = async () => {
    "use server";
    await handleAuthLogout();
    redirect("/", RedirectType.replace);
  };

  return <Header isAuthenticated={isAuthenticated} onLogout={handleLogout} />;
}
