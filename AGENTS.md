# AGENTS.md — Coding Agent Instructions

This file provides guidance for AI coding agents working in this repository.

---

## Project Overview

Personal portfolio/resume website built with **Next.js 15** (App Router, static export),
**React 19**, **TypeScript 5**, **Tailwind CSS v4**, and **shadcn/ui**. Deployed to GitHub
Pages via `./out` static export.

---

## Commands

### Development
```bash
npm run dev       # Start local dev server (http://localhost:3000)
npm run build     # Production build → ./out (static export)
npm run start     # Serve production build locally
npm run lint      # Run ESLint via Next.js built-in defaults
```

### No test framework is installed
There are no tests in this project. Do not attempt to run `npm test`. If adding tests,
Vitest is the recommended choice for this stack.

### Running a single lint check
```bash
npx next lint --file app/ClientPage.tsx   # Lint a specific file
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router, `output: "export"`) |
| Language | TypeScript 5 (strict mode) |
| UI | React 19 + shadcn/ui (new-york style) |
| Styling | Tailwind CSS v4 (CSS-based config, no `tailwind.config.*`) |
| Primitives | Radix UI (full suite) |
| Icons | Lucide React |
| Variants | class-variance-authority (`cva`) |
| Utilities | clsx + tailwind-merge via `cn()` in `lib/utils.ts` |
| Forms | react-hook-form + zod |
| Node | v18 (see `.nvmrc`) |

---

## Repository Structure

```
app/
  ClientPage.tsx    # "use client" — all page sections defined here
  globals.css       # Tailwind v4 + OKLCH CSS custom property theme
  layout.tsx        # Root layout, Geist font, metadata
  page.tsx          # Server component shell (imports ClientPage)
  typedef.ts        # Shared TypeScript interfaces (e.g. SocialItem)
components/
  theme-provider.tsx
  ui/               # ~50 shadcn/ui generated components
data/
  resume.ts         # All resume content + metadataForResume export
hooks/
  use-mobile.ts
  use-toast.ts
lib/
  utils.ts          # cn() helper
public/
  images/
```

---

## Code Style

### TypeScript
- **All source files are `.ts` / `.tsx`** — do not add `.js` files.
- `strict: true` is enabled in `tsconfig.json`. Write type-safe code even though
  `ignoreBuildErrors: true` in `next.config.mjs` masks build-time errors.
- Prefer **interfaces** over type aliases for object shapes.
- Use **`import type`** for type-only imports.
- Use **`as const`** on static data objects (see `data/resume.ts`).
- Use **union types** for discriminated unions.

### Formatting
- **2-space indentation** — no tabs.
- **No semicolons** in application code (`app/`, `data/`, `hooks/`, `lib/`).
  shadcn/ui-generated components in `components/ui/` may have semicolons; leave
  those files as-is.
- **Double quotes** for strings in application code. Single quotes are acceptable
  only in `'use client'` / `'use server'` directives.
- **Trailing commas** in multi-line arrays, objects, and import lists.
- No Prettier config is present; follow the patterns in existing files manually.

### Imports
Order imports in this sequence, separated by blank lines:

```ts
// 1. React / Next.js framework
import * as React from "react"
import type { Metadata } from "next"

// 2. Third-party libraries
import { Github } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"

// 3. Internal aliases (@/...) — types before values
import type { SocialItem } from "@/app/typedef"
import { resume } from "@/data/resume"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

// 4. Relative imports (./...)
import ClientPage from "./ClientPage"
```

### Naming Conventions

| Entity | Convention | Example |
|---|---|---|
| Component files | PascalCase | `ClientPage.tsx` |
| Hook files | kebab-case | `use-toast.ts` |
| Utility files | camelCase | `utils.ts` |
| React components | PascalCase | `SocialButton`, `HeaderNav` |
| Hooks | `use` prefix, camelCase | `useToast`, `useIsMobile` |
| Variables / constants | camelCase | `resume`, `buttonVariants` |
| Types / Interfaces | PascalCase | `SocialItem`, `ToasterToast` |
| CSS variables | kebab-case | `--muted-foreground` |
| `data-*` attributes | kebab-case | `data-slot="button"` |

### Component Patterns
- Use **functional components exclusively** — no class components.
- The `app/page.tsx` → `app/ClientPage.tsx` pattern separates server and client
  boundaries. Keep `page.tsx` as a thin server shell.
- Local section components (`Hero`, `Experience`, `Skills`, etc.) live **inside
  `ClientPage.tsx`** as non-exported functions. Keep them co-located unless a
  component needs reuse.
- shadcn/ui components use `React.forwardRef` + `displayName`. Follow this pattern
  when adding to `components/ui/`.
- Use `React.ComponentProps<"element">` for HTML element prop types (not
  `HTMLElementAttributes`).
- Use `asChild` via Radix `Slot` for polymorphic components.
- Destructure props inline in the function signature.

### Styling
- Use **Tailwind utility classes** exclusively — no inline `style` props except for
  dynamic CSS custom properties.
- Tailwind v4 is configured entirely in `app/globals.css` via `@theme inline { ... }`.
  Do **not** create a `tailwind.config.*` file.
- Use `cn()` from `lib/utils.ts` for conditional/merged class names.
- Use `cva()` for variant-based components.
- Theme tokens are OKLCH-based CSS custom properties; extend them inside the `@theme`
  block in `globals.css`.

### Error Handling
- Use `.then().catch()` chaining for Promises in event handlers:
  ```ts
  navigator.clipboard.writeText(text)
    .catch(err => { console.error("Failed to copy:", err); toast({ variant: "destructive" }) })
  ```
- Use empty `try {} catch {}` only for non-critical, fire-and-forget operations
  (e.g., localStorage access that should never crash the page).
- Use null-coalescing/optional chaining for data that may be absent:
  `resume.experience ?? []`
- Return `null` early from components when required data is missing.

---

## Content & Data

All resume content lives in **`data/resume.ts`** — this is the single source of truth.
To update any displayed text, skills, experience, or social links, edit only that file.

The `metadataForResume` export in `data/resume.ts` feeds Next.js `<head>` metadata in
`app/layout.tsx`.

---

## Deployment

- Push to `main` → GitHub Actions runs `npm ci && npm run build` → deploys `./out` to
  GitHub Pages.
- The site is served at the custom domain in `CNAME` (`anirudhmv.in`).
- **Do not delete `CNAME`** or add a `.nojekyll` file conflict.
- The build uses `output: "export"` in `next.config.mjs` — all pages must be
  statically renderable. Avoid `getServerSideProps`, server actions, or API routes.

---

## Key Constraints

- **No API routes** — this is a fully static export.
- **No test framework** — don't add test files without also wiring up a runner.
- **ESLint errors are not blocking** (`ignoreDuringBuilds: true`), but write clean code.
- **TypeScript errors are not blocking** (`ignoreBuildErrors: true`), but maintain type
  safety anyway.
- **Node 18** is required (see `.nvmrc`). Use `nvm use` before running commands.
