import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Routes that require a session. Guests are sent to the login page.
// Every other route is browsable by guests, who see static demo data.
const authOnlyRoutes: Record<string, string[]> = {
  "/admin": ["admin"],
  "/onboarding": ["admin", "user"],
};

export function proxy(request: NextRequest) {
  // Get the pathname from the URL
  const path = request.nextUrl.pathname;

  // Read cookies directly from the request object — no async/await needed
  const userRole = request.cookies.get("user-role")?.value || "guest";
  const userToken = request.cookies.get("user-token")?.value;

  // Build the response first so we can attach headers
  const response = NextResponse.next();

  // ✅ Forward auth state as readable headers to avoid await cookies() in components
  response.headers.set("x-is-authenticated", userToken ? "true" : "false");
  response.headers.set("x-user-role", userRole);

  // Redirect authenticated users away from auth pages to dashboard
  if (userRole !== "guest" && (path.includes("auth") || path === "/")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  const matchedRoute = Object.keys(authOnlyRoutes).find((route) =>
    path.startsWith(route),
  );

  if (matchedRoute) {
    const allowedRoles = authOnlyRoutes[matchedRoute];

    if (!allowedRoles.includes(userRole)) {
      // Guests have no session at all — send them to log in rather than to a
      // dead end. A signed-in user with the wrong role is genuinely forbidden.
      const destination = userToken ? "/unauthorized" : "/auth/login";
      return NextResponse.redirect(new URL(destination, request.url));
    }
  }

  // Return response with the auth headers attached
  return response;
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    // Add routes that should be protected
    // "/admin/:path*",
    // "/dashboard/:path*",
    // "/auth/:path*",
    "/:path*",
    // Add more routes as needed
  ],
};
