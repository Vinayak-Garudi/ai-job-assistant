# Project Instructions & Guidelines

## Development Philosophy

This is a **Next.js 16.1.6** project (React 19.2.4) using the App Router with a strong emphasis on Server-Side Rendering (SSR) and Server Components.

## Tech Stack

| Tool            | Version                                       |
| --------------- | --------------------------------------------- |
| Next.js         | 16.1.6                                        |
| React           | 19.2.4                                        |
| TypeScript      | ^5                                            |
| Tailwind CSS    | ^4                                            |
| Shadcn/ui       | (Radix-based, components in `components/ui/`) |
| Lucide React    | ^0.544.0                                      |
| next-themes     | ^0.4.6                                        |
| sonner (toasts) | ^2.0.7                                        |

---

## Core Principles

### 1. Server-First Approach

- **Default to Server Components**: All components should be Server Components unless client-side interactivity is absolutely required
- **Minimize Client Components**: Only use `'use client'` directive when necessary for:
  - Event handlers (onClick, onChange, etc.)
  - React hooks (useState, useEffect, etc.)
  - Browser APIs (localStorage, window, etc.)
  - `usePathname`, `useRouter`, or any other Next.js client hooks
- **Client Component Strategy**: When client-side logic is needed, create small, isolated client components and compose them within server components
- **Never wrap unnecessarily**: Avoid wrapping entire pages or large components with `'use client'` — extract only the interactive parts

### 2. UI Component Library

#### Shadcn/ui Reference

- **Always refer to**: [Shadcn/ui Documentation](https://ui.shadcn.com/docs) before implementing any UI components
- **Installation**: Use `npx shadcn@latest add [component-name]` to add new components
- **Available Components**: Already installed — Button, Card, Input, Select, Switch, Tooltip, Popover, Badge, Skeleton, Sonner
- **Customization**: Components are copied into your project and can be customized in `components/ui/`
- **Custom Wrappers**: Use `components/custom/` for wrapped/extended versions of shadcn components (`Button`, `Card`, `Input`, `SearchableSelect`, `Switch`)

### 3. Component Architecture

#### File Organization

```
app/                        # App Router pages (Server Components by default)
  layout.tsx                # Root layout — ThemeProvider + Navigation + Toaster
  page.tsx                  # Landing page (force-static)
  dashboard/
    page.tsx                # Suspense streaming — inner async component + skeleton fallback
    actions.ts              # "use server" — getJobMatches(), deleteJobMatch(), etc.
  profile/
    actions.ts              # "use server" — getUserProfile(), saveProfile()
  admin/sell/actions.ts     # "use server" stub
  browse/actions.ts         # "use server" stub
  auth/login/ & signup/     # Auth pages
  unauthorized/             # Shown when role check fails
components/
  ├── ui/                   # Shadcn base components
  ├── custom/               # Wrapped/extended components
  ├── auth/                 # LoginForm, SignupForm (client components)
  ├── dashboard/            # DashboardStats, JobListClient, JobMatchCard, etc.
  ├── profile/              # BasicInfoEditor, SkillsEditor, etc.
  ├── Navigation.tsx        # Async Server Component — reads x-is-authenticated header
  └── NavLinks.tsx          # "use client" — usePathname for active link highlighting
lib/
  api.ts                    # Universal fetch wrapper (SSR + CSR, auto Bearer token)
  authHandler.ts            # Server-only: cookie deletion via next/headers
  authHandlerClient.ts      # Client-only: cookie deletion via document.cookie
  localStorage.ts           # Guarded getItem/setItem/removeItem (window check)
  utils.ts                  # cn() utility (clsx + tailwind-merge)
types/
  index.ts                  # All shared TypeScript interfaces
proxy.ts                    # Next.js middleware (route protection + auth header injection)
```

#### Component Patterns

- **Server Components**:
  - Fetch data directly with async/await
  - No `'use client'` directive
  - Can import and use client components
  - Read auth state from request headers (NOT cookies directly — use the proxy header pattern)
- **Client Components**:
  - Start with `'use client'`
  - Handle interactivity, hooks, browser APIs
  - Keep as small as possible
  - Receive server-fetched data as props (e.g., `initialJobs: JobMatch[]`)
  - Cannot import server components

### 4. Proxy / Middleware Setup (`proxy.ts`)

The project uses `proxy.ts` (not `middleware.ts`) as the Next.js middleware entry point. It runs on all routes (`/:path*`) and performs:

1. **Reads cookies** from the request: `user-token` (JWT) and `user-role` (`"guest"` | `"user"` | `"admin"`)
2. **Injects response headers**:
   - `x-is-authenticated`: `"true"` or `"false"` — based on presence of `user-token`
   - `x-user-role`: the raw role string
3. **Redirects authenticated users** away from `/`, `/auth/*` → `/dashboard`
4. **Enforces role-based access**:
   - `/admin` — admin only
   - `/dashboard`, `/profile`, `/jobs` — admin + user
   - Unauthorized → `/unauthorized`

```ts
// proxy.ts (middleware)
export function proxy(request: NextRequest) {
  const userRole = request.cookies.get("user-role")?.value || "guest";
  const userToken = request.cookies.get("user-token")?.value;
  const response = NextResponse.next();
  response.headers.set("x-is-authenticated", userToken ? "true" : "false");
  response.headers.set("x-user-role", userRole);
  // ... redirect / role check logic
  return response;
}
```

**Adding new protected routes**: Update the `protectedRoutes` object at the top of `proxy.ts`.

### 5. Authentication & Cookie Strategy

Cookies are **set by the backend** after login and read by the middleware. Never set auth cookies on the client side.

| Cookie       | Purpose                                                            |
| ------------ | ------------------------------------------------------------------ |
| `user-token` | JWT Bearer token — attached automatically to all API requests      |
| `user-role`  | Role string (`guest`, `user`, `admin`) — used for route protection |

#### Auth State Propagation Pattern (IMPORTANT)

**Do NOT call `cookies()` in components/pages to check auth state.** Instead, read the headers set by the proxy:

```tsx
// ✅ Correct — read header injected by proxy (no I/O, no async cookies())
import { headers } from "next/headers";

const headerStore = await headers();
const isAuthenticated = headerStore.get("x-is-authenticated") === "true";
const userRole = headerStore.get("x-user-role");
```

#### Server-Side Logout

Use `handleAuthLogout()` from `lib/authHandler.ts` in a `"use server"` action. It deletes all cookies via `next/headers`:

```ts
import { handleAuthLogout } from "@/lib/authHandler";

const handleLogout = async () => {
  "use server";
  await handleAuthLogout();
  redirect("/", RedirectType.replace);
};
```

#### Client-Side Logout (on 401)

`lib/api.ts` automatically calls `handleClientLogout()` from `lib/authHandlerClient.ts` when a 401 is received. This expires all cookies via `document.cookie`.

### 6. API Layer (`lib/api.ts`)

All API calls go through `apiRequest()`. It is isomorphic — works in both Server Components/Actions and Client Components.

```ts
import { apiRequest } from "@/lib/api";

// GET
const { data, message, success } = await apiRequest("endpoint/path");

// POST with body
const result = await apiRequest("endpoint", {
  method: "POST",
  body: { key: "value" },
});

// With query params
const result = await apiRequest("endpoint", { params: { page: 1, limit: 10 } });

// File upload (FormData — Content-Type skipped automatically)
const result = await apiRequest("upload", { method: "POST", body: formData });
```

**How `apiRequest` attaches the token:**

- **Server-side** (`typeof window === "undefined"`): dynamically imports `next/headers`, calls `cookies()`, reads `user-token`
- **Client-side**: parses `document.cookie` for `user-token`
- Sets `Authorization: Bearer <token>` header on every request
- All requests use `cache: "no-store"` — no stale data
- On **401**: calls `handleClientLogout()` + redirects to `/` (client-side only)
- On **error**: returns `{ data: null, message, success: false }` and shows `toast.error()`

**Base URL**: `process.env.NEXT_PUBLIC_API_URL` (set in `.env.local`)

### 7. Server Actions Pattern

Place server actions in `actions.ts` files co-located with their route:

```ts
// app/dashboard/actions.ts
"use server";

import { apiRequest } from "@/lib/api";
import { revalidatePath } from "next/cache";

export async function deleteJobMatch(id: string) {
  const { success } = await apiRequest(`job-match/${id}`, { method: "DELETE" });
  if (success) revalidatePath("/dashboard");
}
```

- Always `revalidatePath()` after mutations that affect the current page
- Do NOT manually read cookies in server actions — `apiRequest` handles token attachment automatically
- For inline server actions (e.g., form actions in Server Components), use `"use server"` inside the function body

### 8. Data Fetching with Suspense Streaming

Use the nested async component + Suspense pattern for pages with server-fetched data:

```tsx
// app/dashboard/page.tsx
import { Suspense } from "react";
import DashboardDataSkeleton from "./loading"; // or inline skeleton

async function DashboardData() {
  const { data } = await getJobMatches(); // server action
  return <JobListClient initialJobs={data.jobs} />;
}

export default function DashboardPage() {
  return (
    <div>
      <h1>Dashboard</h1>
      <Suspense fallback={<DashboardDataSkeleton />}>
        <DashboardData />
      </Suspense>
    </div>
  );
}
```

This allows the page shell to render immediately while data streams in.

### 9. Routing & Navigation

- **App Router**: All routes in `app/` directory
- **Dynamic Routes**: Use `[param]` folders (e.g., `app/dashboard/job-match/[id]/page.tsx`)
- **Navigation**: Use Next.js `<Link>` component for client-side navigation
- **Active Links**: Use `usePathname()` in a `'use client'` component (see `NavLinks.tsx`)
- **Unauthorized**: Redirect to `/unauthorized` when role check fails

### 10. Styling

- **Tailwind CSS v4**: Primary styling solution
- **Class Utilities**: Use `cn()` utility from `lib/utils.ts` for conditional classes
- **Dark Mode**: Support both light and dark themes using Tailwind's dark mode (managed by `next-themes`)
- **Responsive**: Mobile-first approach with Tailwind breakpoints

### 11. TypeScript

- **Strict Mode**: Enabled — no implicit `any`
- **Path Alias**: `@/*` maps to the project root
- **Type Definitions**: Store all shared interfaces in `types/index.ts`
- **Prop Types**: Always define interfaces for component props
- **Avoid `any`**: Use proper types or `unknown` when type is unclear
- **Key types**: `Job`, `JobMatch`, `JobAnalysis`, `UserProfile`, `ApplicationStatus`, `SearchFilters`

### 12. Performance Optimization

- **Code Splitting**: Leverage automatic code splitting with App Router
- **Suspense Streaming**: Use nested async components with `<Suspense>` for data-heavy pages
- **Static Pages**: Use `export const dynamic = "force-static"` for fully static pages (e.g., landing page)
- **Image Optimization**: Use Next.js `<Image>` component when possible
- **No Stale Data**: All API calls use `cache: "no-store"`

### 13. Error Handling

- **Error Boundaries**: Use `error.tsx` files for error handling
- **Not Found**: `not-found.tsx` exists at the root for 404 pages
- **Loading States**: Use `loading.tsx` for loading UI (e.g., `app/dashboard/loading.tsx`, `app/jobs/add/loading.tsx`)
- **Toast Notifications**: Use `sonner` via `import { toast } from "sonner"` — `apiRequest` automatically calls `toast.error()` on failure
- **Form Validation**: Validate on both client and server

### 14. Best Practices

#### Do's

✅ Keep Server Components as the default  
✅ Use Server Actions for mutations — always `revalidatePath()` after mutations  
✅ Refer to Shadcn/ui docs before creating custom UI  
✅ Extract interactive parts into small client components  
✅ Pass server-fetched data as props to client components (`initialData` pattern)  
✅ Read auth state from proxy-injected headers (`x-is-authenticated`, `x-user-role`)  
✅ Use `apiRequest()` for all HTTP calls — never use `fetch` directly  
✅ Use proper TypeScript types  
✅ Handle errors gracefully  
✅ Add loading states with `loading.tsx` or inline `<Suspense>` skeletons  
✅ Make components accessible  
✅ Use semantic HTML  
✅ Test responsive design  
✅ Check `lib/` folder for existing utility functions before writing new ones

#### Don'ts

❌ Don't use `'use client'` on entire pages  
❌ Don't create custom UI components without checking Shadcn first  
❌ Don't call `cookies()` in components to check auth state — use proxy headers  
❌ Don't manually attach `Authorization` headers in server actions — `apiRequest` does it  
❌ Don't set `user-token` or `user-role` cookies from the client  
❌ Don't nest client components unnecessarily  
❌ Don't use inline styles (use Tailwind)  
❌ Don't ignore TypeScript errors  
❌ Don't forget to handle loading/error states  
❌ Don't use `any` type  
❌ Don't forget to validate user input  
❌ Don't expose sensitive data to the client

### 15. Code Review Checklist

Before considering any task complete:

- [ ] Is this a Server Component unless interactivity is required?
- [ ] Have I checked Shadcn/ui for existing components?
- [ ] Have I checked `lib/` folder for existing utility functions?
- [ ] Are client components as small as possible?
- [ ] Are all props properly typed in `types/index.ts` or local interfaces?
- [ ] Is error handling implemented (toast + graceful fallback)?
- [ ] Does it work in both light and dark mode?
- [ ] Is it responsive across devices?
- [ ] Are there any console errors/warnings?
- [ ] Did I `revalidatePath()` after any mutation?
- [ ] Am I reading auth state from headers (not cookies) in components?

### 16. Common Patterns

#### Server Component with Client Child (initialData pattern)

```tsx
// app/dashboard/page.tsx (Server Component)
import { Suspense } from "react";
import JobListClient from "@/components/dashboard/JobListClient";
import { getJobMatches } from "./actions";

async function DashboardData() {
  const { data } = await getJobMatches();
  return <JobListClient initialJobs={data.jobs} />;
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<Skeleton />}>
      <DashboardData />
    </Suspense>
  );
}
```

#### Client Component with initialData

```tsx
// components/dashboard/JobListClient.tsx
"use client";

export default function JobListClient({
  initialJobs,
}: {
  initialJobs: JobMatch[];
}) {
  const [jobs, setJobs] = useState(initialJobs);
  // local filtering, optimistic updates, etc.
}
```

#### Server Action (co-located)

```ts
// app/dashboard/actions.ts
"use server";

import { apiRequest } from "@/lib/api";
import { revalidatePath } from "next/cache";

export async function deleteJobMatch(id: string) {
  await apiRequest(`job-match/${id}`, { method: "DELETE" });
  revalidatePath("/dashboard");
}
```

#### Inline Server Action (in Server Component)

```tsx
// Navigation.tsx (Server Component)
import { handleAuthLogout } from "@/lib/authHandler";
import { redirect, RedirectType } from "next/navigation";

export default async function Navigation() {
  const handleLogout = async () => {
    "use server";
    await handleAuthLogout();
    redirect("/", RedirectType.replace);
  };

  return <Button onClick={handleLogout}>Logout</Button>;
}
```

#### Reading Auth State in a Server Component

```tsx
import { headers } from "next/headers";

export default async function Page() {
  const headerStore = await headers();
  const isAuthenticated = headerStore.get("x-is-authenticated") === "true";
  const userRole = headerStore.get("x-user-role");
  // ...
}
```

#### Using Shadcn Components

```tsx
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// Use as-is or extend in components/custom/
```

---

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Shadcn/ui Documentation](https://ui.shadcn.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Server Components](https://react.dev/reference/react/use-client)

---

**Remember**: When in doubt, keep it server-side, check Shadcn/ui first, and use `apiRequest()` for all HTTP calls!
