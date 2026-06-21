# ADR 0007: Test Strategy

## Status

Accepted

## Context

YogaFlow is moving toward feature-based architecture. The project needs fast feedback for feature UI and business rules without depending only on full Next.js builds or manual browser checks.

## Decision

Use Vitest as the default test runner.

Use React Testing Library and jest-dom matchers for component tests. Use `jsdom` for browser-like component rendering in unit tests.

Keep tests close to the code they validate, using `*.test.ts` or `*.test.tsx` next to feature, component, or library files.

Run `pnpm test` in CI after lint and architecture checks and before the production build.

## Rationale

- Vitest is fast and works well with TypeScript, React, and Vite-style test configuration.
- React Testing Library encourages tests around user-visible behavior instead of component internals.
- Co-located tests keep feature behavior easy to find and maintain.
- Running tests before `pnpm build` catches feature regressions earlier in CI.

## Consequences

- Tests should avoid coupling to implementation details such as private component state or exact DOM structure.
- Feature business rules should get focused unit tests as they are introduced.
- End-to-end tests are not part of this decision yet; add a separate ADR when browser workflows need coverage.

## Implementation Notes

- `vitest.config.ts` configures `jsdom`, the `@/*` alias, and setup files.
- `vitest.setup.ts` installs jest-dom matchers.
- `src/features/dashboard/ui/dashboard-home.test.tsx` is the first component test.
- `pnpm test` runs the suite once; `pnpm test:watch` runs Vitest in watch mode.
