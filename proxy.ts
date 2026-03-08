import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define your protected routes and their required roles
const protectedRoutes = {
  "/admin": ["admin"],
  "/dashboard": ["admin", "user"],
  "/profile": ["admin", "user"],
  "/jobs": ["admin", "user"],
  // Add more routes and their allowed roles as needed
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
    return NextResponse.redirect(new URL("/jobs/add", request.url));
  }

  // Check if the current path is protected
  const isProtectedRoute = Object.keys(protectedRoutes).some((route) =>
    path.startsWith(route),
  );

  if (isProtectedRoute) {
    // Find which protected route matches the current path
    const matchedRoute = Object.keys(protectedRoutes).find((route) =>
      path.startsWith(route),
    );

    if (matchedRoute) {
      const allowedRoles =
        protectedRoutes[matchedRoute as keyof typeof protectedRoutes];

      // Check if the user's role is allowed
      if (!allowedRoles.includes(userRole)) {
        // Redirect to login or unauthorized page
        return NextResponse.redirect(new URL("/unauthorized", request.url));
      }
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
