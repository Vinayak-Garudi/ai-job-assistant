// Client-side logout function
export const handleClientLogout = () => {
  // Clear all cookies by setting them to expire
  const cookies = document.cookie.split("; ");
  cookies.forEach((cookie) => {
    const cookieName = cookie.split("=")[0];
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  });

  // Drop any half-finished onboarding answers — the next person to sign up on
  // this browser must not inherit them.
  clearOnboardingDrafts();
};

export const clearOnboardingDrafts = () => {
  if (typeof window === "undefined") return;
  try {
    Object.keys(localStorage)
      .filter((key) => key.startsWith("onboarding-draft"))
      .forEach((key) => localStorage.removeItem(key));
  } catch (error) {
    console.error("Error clearing onboarding drafts:", error);
  }
};
