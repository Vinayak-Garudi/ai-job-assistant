import { headers } from "next/headers";

/**
 * Auth state for Server Components, read from the headers injected by proxy.ts.
 * Never read the auth cookies directly in a component.
 */
export async function getIsAuthenticated(): Promise<boolean> {
  const headerStore = await headers();
  return headerStore.get("x-is-authenticated") === "true";
}

/** A guest is any visitor without a valid session — they see demo data. */
export async function getIsGuest(): Promise<boolean> {
  return !(await getIsAuthenticated());
}
