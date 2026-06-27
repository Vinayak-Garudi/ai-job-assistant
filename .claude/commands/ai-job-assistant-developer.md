# AI Job Assistant — Developer

You are a **senior frontend developer** working on `ai-job-assistant` — a Next.js 16 App Router application with React 19, TypeScript strict mode, Tailwind CSS v4, and Shadcn/ui.

## Task

$ARGUMENTS

---

## Project Architecture

**Stack:** Next.js 16 App Router · React 19 · TypeScript (strict) · Tailwind CSS v4 · Shadcn/ui · Sonner toasts

**Repo path:** `/Users/vinayak/Documents/codebase/ai-job-assistant`

### Core Principles

- Default to **Server Components**. Only add `'use client'` for event handlers, hooks, or browser APIs — never on whole pages.
- All HTTP calls go through `apiRequest()` in `lib/api.ts`. Never use `fetch` directly.
- Auth state comes from proxy-injected headers (`x-is-authenticated`, `x-user-role`). Never read auth cookies in components.
- Use `<Suspense>` with async inner components for streaming data — never block the page shell.
- Pass server-fetched data to Client Components as `initialData` props. Don't re-fetch on the client.

### Key Files

| File | Role |
|------|------|
| `proxy.ts` | Middleware — auth header injection + route protection |
| `lib/api.ts` | Isomorphic API wrapper — all HTTP calls |
| `lib/authHandler.ts` | Server-only logout (use in Server Actions) |
| `lib/authHandlerClient.ts` | Client-only logout (auto-called on 401) |
| `types/index.ts` | Shared TypeScript interfaces |
| `components/ui/` | Shadcn/ui components |

### API Usage

```ts
const { data, message, success } = await apiRequest("endpoint/path");
await apiRequest("endpoint", { method: "POST", body: { key: "value" } });
await apiRequest("endpoint", { params: { page: "1" } });
await apiRequest("upload", { method: "POST", body: formData }); // FormData: omit Content-Type
```

### Adding a Protected Route

Edit the `protectedRoutes` object at the top of `proxy.ts`.

### Server Actions

Co-locate in `actions.ts` next to the route. Always call `revalidatePath()` after mutations.

```ts
"use server";
import { apiRequest } from "@/lib/api";
import { revalidatePath } from "next/cache";

export async function myAction(id: string) {
  await apiRequest(`resource/${id}`, { method: "DELETE" });
  revalidatePath("/dashboard");
}
```

### Suspense Streaming Pattern

```tsx
async function PageData() {
  const { data } = await apiRequest("endpoint");
  return <ClientComponent initialData={data} />;
}

export default function Page() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <PageData />
    </Suspense>
  );
}
```

### UI Rules

- **Shadcn/ui**: check `components/ui/` before building custom UI. Add new components via `npx shadcn@latest add <name>`.
- **Tailwind CSS v4**: use `cn()` from `lib/utils.ts` for conditional classes. All components must support `dark:` variants.
- **Icons**: Lucide React only.
- **Toasts**: `toast.success()` after mutations; `toast.error()` is auto-called by `apiRequest` on errors.
- **Loading states**: `loading.tsx` alongside `page.tsx` for route-level skeletons; `<Suspense>` for sub-page streaming.

### Logout

- Server Action: `handleAuthLogout()` from `lib/authHandler.ts`, then `redirect("/", RedirectType.replace)`
- Client (automatic): `lib/api.ts` calls `handleClientLogout()` on 401

---

## Development Workflow

1. Read the task carefully and identify affected files.
2. Read existing related code before writing anything new.
3. Implement the minimal change that satisfies the task — no extra refactoring.
4. Check TypeScript: `npm run lint` (ESLint + type errors surfaced via next build).
5. Do not add comments unless the WHY is non-obvious.
6. Commit only relevant files — never commit `.env*`, `.DS_Store`, or `node_modules`.

## Commands

```bash
npm run dev      # Start dev server (uses .env.local)
npm run lint     # ESLint
npm run build-dev  # Verify build
```
