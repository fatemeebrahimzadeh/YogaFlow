# ADR 0001: UI Component System

## Status

Accepted

## Context

YogaFlow is a Next.js App Router project using TypeScript and Tailwind CSS. The product will become a dashboard-heavy SaaS with forms, tables, attendance workflows, dialogs, navigation, empty states, and eventually a more mature brand system.

The UI package should support fast MVP delivery without forcing the project into a rigid visual style or making future branding difficult.

## Decision

Use shadcn/ui as the project UI component system.

The project will keep UI components as local source files under `src/components/ui`, configured through `components.json`. Shared styling utilities live under `src/lib`. Icons will use `lucide-react`.

## Rationale

- It matches the existing stack: Next.js, React Server Components, TypeScript, Tailwind CSS, and the `@/*` import alias.
- Components are copied into the codebase, so they can be edited for YogaFlow's SaaS workflows and future branding instead of being constrained by a closed component API.
- Radix-backed components provide a stronger accessibility baseline for dialogs, menus, popovers, tabs, selects, and other interaction-heavy UI.
- Tailwind and CSS variables make it straightforward to build a quiet operational dashboard first, then evolve colors, typography, spacing, and brand tokens later.
- It avoids the heavier visual defaults of full component suites such as Material UI, Ant Design, or Chakra UI.

## Consequences

- The team owns the component code after adding it. Updates from upstream are manual and should be intentional.
- We must keep local components consistent; ad hoc one-off styling should be avoided when a shared UI component fits.
- More complex primitives should be added only when needed, using the shadcn/ui CLI or a reviewed manual copy.
- Future branding should update shared tokens and components first, before page-level styling.

## Implementation Notes

- `components.json` defines the shadcn/ui project configuration.
- `src/lib/utils.ts` provides the `cn` helper for class merging.
- `src/components/ui/button.tsx` is the first local UI primitive.
- `src/app/globals.css` contains the initial semantic theme tokens.

## References

- https://ui.shadcn.com/docs/installation/next
- https://ui.shadcn.com/docs/components-json
- https://www.radix-ui.com/primitives/docs/overview/accessibility
- https://tailwindcss.com/docs/installation/framework-guides/nextjs
