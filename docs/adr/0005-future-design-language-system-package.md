# ADR 0005: Future Design Language System Package

## Status

Accepted

## Context

YogaFlow currently uses local shadcn/ui-style primitives under `src/components/ui`, documented in ADR 0001. This is the right level of structure for the MVP because product workflows, branding, and reusable UI patterns are still being discovered.

The roadmap includes branding, sport-specific themes, distribution to other studios, and a possible multi-studio SaaS model. Those needs may eventually require a shared design language system rather than app-local UI primitives.

## Decision

Do not create a DLS package yet.

Keep MVP UI primitives local under `src/components/ui`. Design reusable UI, theme tokens, and styling utilities so they can later move into a workspace package when reuse justifies the package boundary.

If the project grows into multiple apps or white-label studio themes, introduce a package named `packages/dls` for the design language system. Use `packages/ui` only if the package is limited to React UI components.

## Rationale

- Local components keep MVP delivery fast and avoid package build/configuration overhead.
- The current product still needs UI discovery before locking component APIs.
- A DLS package becomes valuable when there are multiple consumers, stable component contracts, shared tokens, sport-specific themes, or white-label branding needs.
- Naming the broader package `dls` leaves room for tokens, themes, typography, spacing, icons, brand rules, and React primitives.

## Consequences

- App-specific screens and workflows should remain in the app, not in the future DLS package.
- Shared primitives should avoid unnecessary coupling to YogaFlow business logic.
- When DLS extraction happens, dependency-cruiser rules, TypeScript config, Tailwind/global CSS handling, CI checks, and documentation must be updated together.
- Until extraction, theme and token work should happen through shared CSS variables and reusable local primitives first.

## Implementation Notes

- Continue using `src/components/ui` for local primitives.
- Continue using `src/lib` for shared non-UI utilities.
- Treat `packages/dls` as a future migration target, not current MVP scope.
- Revisit this ADR when adding another app, Storybook, white-label studio branding, or sport-specific theme presets.
