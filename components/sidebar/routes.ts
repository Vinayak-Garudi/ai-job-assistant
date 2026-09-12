/** Routes with no app chrome — the marketing page, auth, and onboarding. */
const CHROME_FREE_PREFIXES = ["/auth", "/onboarding"];

export function shouldShowSidebar(pathname: string): boolean {
  if (pathname === "/") return false;
  return !CHROME_FREE_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}
