# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Agent Workflow

For every implementation task in this repo, follow this agent pipeline:

1. **Developer** — invoke the `/ai-job-assistant-developer` skill with the task description. The developer agent implements the feature or fix.
2. **Tester** — after implementation, invoke the `/ai-job-assistant-tester` skill with the same task description. The tester audits correctness, runs lint/build, checks edge cases, and produces a test report.
3. **Reviewer** — invoke the `/ai-job-assistant-reviewer` skill when the change is non-trivial (new feature, refactor, or architectural change), or when the tester flags issues. Skip for one-line fixes that pass lint and build cleanly.

Always run developer → tester in sequence. Run reviewer when warranted. Do not skip the tester step.

## Commands

```bash
npm run dev              # Start dev server (uses .env.local)
npm run build-dev        # Build with .env.development
npm run build-prod       # Build with .env.production
npm run start-dev        # Serve build with .env.development
npm run start-prod       # Serve build with .env.production
npm run lint             # Run ESLint
```

There is no test suite. `NEXT_PUBLIC_API_URL` must be set in `.env.local` for API calls to work.

## Architecture

**Next.js 16 App Router, React 19, TypeScript strict mode.**

Default to Server Components. Use `'use client'` only for event handlers, hooks, or browser APIs — never on whole pages.

### Middleware (`proxy.ts`, not `middleware.ts`)

The middleware entry point is `proxy.ts`. It runs on all routes and:
1. Reads `user-token` (JWT) and `user-role` cookies from the request
2. Injects `x-is-authenticated` and `x-user-role` response headers
3. Redirects authenticated users away from `/` and `/auth/*` to `/dashboard`
4. Enforces role-based access, redirecting to `/unauthorized` on failure

**To add a protected route**, update the `protectedRoutes` object at the top of `proxy.ts`.

### Auth State in Components

Never call `cookies()` in components to read auth state. Read the proxy-injected headers instead:

```tsx
import { headers } from "next/headers";
const headerStore = await headers();
const isAuthenticated = headerStore.get("x-is-authenticated") === "true";
const userRole = headerStore.get("x-user-role");
```

Auth cookies (`user-token`, `user-role`) are set by the backend — never set them client-side.

### API Layer (`lib/api.ts`)

All HTTP calls go through `apiRequest()` — never use `fetch` directly. It is isomorphic (works in Server Components, Server Actions, and Client Components).

- Automatically attaches `Authorization: Bearer <token>` from cookies (server: `next/headers`, client: `document.cookie`)
- All requests use `cache: "no-store"`
- On 401: triggers logout and redirects to `/` (client) or `/auth/login` (server)
- On error: returns `{ data: null, message, success: false }` and calls `toast.error()` on the client

```ts
const { data, message, success } = await apiRequest("endpoint/path");
await apiRequest("endpoint", { method: "POST", body: { key: "value" } });
await apiRequest("endpoint", { params: { page: "1" } });
await apiRequest("upload", { method: "POST", body: formData }); // FormData: Content-Type omitted automatically
```

### Server Actions

Co-locate in `actions.ts` next to the route. Always call `revalidatePath()` after mutations.

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

### Data Fetching Pattern (Suspense Streaming)

Wrap async inner components in `<Suspense>` so the page shell renders immediately:

```tsx
// app/dashboard/page.tsx
async function DashboardData() {
  const { data } = await getJobMatches();
  return <JobListClient initialJobs={data.jobs} />;
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<DashboardDataSkeleton />}>
      <DashboardData />
    </Suspense>
  );
}
```

Client components receive server-fetched data as props (the `initialData` pattern) — don't re-fetch on the client.

### UI

- **Shadcn/ui** (Radix-based): installed components live in `components/ui/`. Add new ones via `npx shadcn@latest add [component-name]`. Check [Shadcn docs](https://ui.shadcn.com/docs) before building any custom UI.
- **Tailwind CSS v4**: sole styling solution. Use `cn()` from `lib/utils.ts` for conditional classes. All components must support dark mode via `dark:` variants.
- **Icons**: Lucide React (consistent with Shadcn).
- **Toasts**: `sonner` — `apiRequest` triggers `toast.error()` automatically; add `toast.success()` after successful mutations.
- **Loading states**: create `loading.tsx` alongside `page.tsx` for route-level skeletons; use inline `<Suspense>` for sub-page streaming.

### Key Files

| File | Purpose |
|------|---------|
| `proxy.ts` | Middleware: auth header injection + route protection |
| `lib/api.ts` | Isomorphic API wrapper — single source for all HTTP calls |
| `lib/authHandler.ts` | Server-only logout (deletes cookies via `next/headers`) |
| `lib/authHandlerClient.ts` | Client-only logout (expires cookies via `document.cookie`) |
| `lib/localStorage.ts` | Guarded `localStorage` helpers (window check included) |
| `types/index.ts` | All shared TypeScript interfaces (`JobMatch`, `UserProfile`, `JobMatchAnalysis`, etc.) |

### Logout

- **Server Action**: use `handleAuthLogout()` from `lib/authHandler.ts`, then `redirect("/", RedirectType.replace)`
- **Client (automatic)**: `lib/api.ts` calls `handleClientLogout()` from `lib/authHandlerClient.ts` on 401
