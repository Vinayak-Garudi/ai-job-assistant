# UI/UX Guidelines

Extracted from `instructions.md`. These are the UI/UX-specific principles and patterns for this project.

---

## 1. UI Component Library (Shadcn/ui)

- **Always refer to**: [Shadcn/ui Documentation](https://ui.shadcn.com/docs) before implementing any UI component
- **Installation**: Use `npx shadcn@latest add [component-name]` to add new components
- **Already installed**: Button, Card, Input, Select, Switch, Tooltip, Popover, Badge, Skeleton, Sonner
- **Base components**: Located in `components/ui/` — do not modify directly unless customizing for the project
- **Custom wrappers**: Place extended/wrapped versions in `components/custom/` (`Button`, `Card`, `Input`, `SearchableSelect`, `Switch`)
- **Never build custom UI** for something Shadcn already provides

---

## 2. Component Architecture

### File Organization

```
components/
  ├── ui/                   # Shadcn base components (Badge, Button, Card, etc.)
  ├── custom/               # Wrapped/extended shadcn components
  ├── auth/                 # LoginForm, SignupForm (client components)
  ├── dashboard/            # DashboardStats, JobListClient, JobMatchCard, etc.
  ├── profile/              # BasicInfoEditor, SkillsEditor, ProfileForm, etc.
  ├── Navigation.tsx        # Async Server Component — top nav bar
  ├── NavLinks.tsx          # "use client" — active link highlighting via usePathname
  └── UserMenu.tsx          # "use client" — user avatar dropdown (Popover-based)
```

### Client Component Minimization

- Extract only the interactive parts into `"use client"` components
- Pass server-fetched data as props — do not re-fetch on the client if avoidable
- Example: `<JobListClient initialJobs={jobs} />` receives data from a server component

---

## 3. Styling

- **Tailwind CSS v4**: Sole styling solution — no inline styles, no CSS modules
- **Conditional classes**: Always use `cn()` from `lib/utils.ts` (combines `clsx` + `tailwind-merge`)
  ```tsx
  import { cn } from "@/lib/utils";
  className={cn("base-class", condition && "conditional-class")}
  ```
- **Dark mode**: All UI must work in both light and dark themes — use Tailwind's `dark:` variants
- **Theme management**: Handled by `next-themes` via `ThemeProvider` in `app/layout.tsx`
- **Responsive design**: Mobile-first — use Tailwind breakpoints (`sm:`, `md:`, `lg:`, etc.)
- **Never use inline styles**: Always use Tailwind utility classes

---

## 4. Loading & Skeleton States

- **Route-level loading**: Create `loading.tsx` alongside `page.tsx` (e.g., `app/dashboard/loading.tsx`)
- **Inline loading**: Use `<Suspense fallback={<Skeleton />}>` for streaming within a page
- **Skeleton components**: Use `components/ui/skeleton.tsx` (Shadcn) for placeholder shapes
- **Streaming pattern** (dashboard example):

  ```tsx
  // page.tsx
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

  The page shell renders immediately; data streams in asynchronously.

---

## 5. Toast Notifications

- **Library**: `sonner` — import `toast` from `"sonner"`
- **Toaster placement**: Already mounted in `app/layout.tsx` via `<Toaster />`
- **Auto-triggered on API error**: `apiRequest()` automatically calls `toast.error()` on failure — no need to add manually for API calls
- Use `toast.success()` for confirmations after successful mutations

---

## 6. Navigation UI

- **Top nav**: `Navigation.tsx` (Server Component) — reads auth headers to render conditionally
- **Nav links**: `NavLinks.tsx` (`"use client"`) — uses `usePathname()` for active state styling
- **User menu**: `UserMenu.tsx` (`"use client"`) — Popover-based dropdown with Profile + Logout
- **Authenticated nav**: Dashboard link (NavLinks) + user icon with dropdown (UserMenu)
- **Unauthenticated nav**: "Get Started" button linking to `/auth/signup`

---

## 7. Accessibility & Semantic HTML

- Use semantic HTML elements (`<nav>`, `<main>`, `<section>`, `<article>`, `<header>`, etc.)
- Add `aria-label` / `aria-labelledby` for interactive elements without visible text labels
- Use `<span className="sr-only">` for screen-reader-only labels (e.g., icon-only buttons)
- Shadcn components are Radix-based and accessible out of the box — prefer them over custom implementations

---

## 8. UI Do's and Don'ts

#### Do's

✅ Check Shadcn/ui docs before building any UI component  
✅ Use `cn()` for all conditional class logic  
✅ Support both light and dark themes with Tailwind `dark:` variants  
✅ Add skeleton/loading states for every data-fetching route or component  
✅ Use `<Suspense>` for streaming data into page shells  
✅ Keep client components small — only wrap interactive parts  
✅ Use Lucide React icons (already installed, consistent with Shadcn)  
✅ Use `sr-only` spans for accessibility on icon-only buttons  
✅ Design mobile-first, then scale up with breakpoints

#### Don'ts

❌ Don't use `'use client'` on entire pages — extract only interactive parts  
❌ Don't build custom UI for things Shadcn already provides  
❌ Don't use inline styles — use Tailwind classes  
❌ Don't skip loading states  
❌ Don't ignore dark mode — always add `dark:` variants  
❌ Don't hardcode colors — use Tailwind theme tokens (`bg-muted`, `text-foreground`, etc.)

---

## 9. Common UI Patterns

### Icon-only Button with Accessible Label

```tsx
<Button
  variant="ghost"
  size="icon"
  className="rounded-full bg-muted hover:bg-muted/80"
>
  <User className="h-5 w-5" />
  <span className="sr-only">Account menu</span>
</Button>
```

### Popover Dropdown Menu

```tsx
<Popover open={open} onOpenChange={setOpen}>
  <PopoverTrigger asChild>
    <Button variant="ghost" size="icon">
      ...
    </Button>
  </PopoverTrigger>
  <PopoverContent align="end" className="w-40 p-1">
    <Link href="/profile" onClick={() => setOpen(false)}>
      <Button variant="ghost" className="w-full justify-start gap-2 text-sm">
        <UserCircle className="h-4 w-4" />
        Profile
      </Button>
    </Link>
  </PopoverContent>
</Popover>
```

### Active Link Styling

```tsx
"use client";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const isActive = (href: string) => pathname.startsWith(href);

<Button
  variant="ghost"
  className={cn("gap-2", isActive("/dashboard") && "font-bold underline")}
>
  Dashboard
</Button>;
```

### Skeleton Loading State

```tsx
// app/dashboard/loading.tsx
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <Skeleton key={i} className="h-24 w-full rounded-lg" />
      ))}
    </div>
  );
}
```

### Using Shadcn Components

```tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

// Extend in components/custom/ if needed
```

---

## Additional Resources

- [Shadcn/ui LLM Reference](https://ui.shadcn.com/llms.txt)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Lucide React Icons](https://lucide.dev/icons/)
- [Radix UI Primitives](https://www.radix-ui.com/primitives)
