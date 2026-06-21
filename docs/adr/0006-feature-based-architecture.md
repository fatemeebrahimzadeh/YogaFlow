# ADR 0006: Feature-Based Architecture

## Status

Accepted

## Context

YogaFlow is expected to grow into workflows for students, class groups, courses, payments, attendance, renewals, dashboards, and student self-service. Organizing all product code by technical layer would make these workflows harder to evolve independently.

Next.js App Router still owns routing through `src/app`, but product behavior should be grouped around business capabilities.

## Decision

Use feature-based architecture for product modules.

Keep route files in `src/app` thin. Routes should compose feature entry points and handle App Router concerns such as layouts, metadata, route params, and loading/error boundaries.

Place feature code under `src/features/<feature-name>/`. Each feature should expose its public API through `src/features/<feature-name>/index.ts`.

Keep shared UI primitives in `src/components/ui` and shared non-UI utilities or reusable business helpers in `src/lib`.

## Rationale

- Feature folders keep related UI, logic, data access, and future tests close to the business workflow they support.
- Thin route files reduce coupling between Next.js routing conventions and product behavior.
- Feature public entry points make imports explicit and reduce accidental deep coupling.
- Dependency-cruiser can enforce core boundaries as the app grows.

## Consequences

- Features must not import from `src/app`.
- Features must not import sibling features directly. Promote shared behavior to `src/lib` or create an explicit shared module after review.
- `src/lib` must remain shared and must not import app, UI, or feature modules.
- App-specific pages and orchestration stay outside future DLS packages.
- Dependency-cruiser rules must be updated if the feature structure intentionally changes.

## Implementation Notes

- `src/features/dashboard` is the first feature module.
- `src/app/page.tsx` now composes the dashboard feature instead of owning dashboard UI.
- `.dependency-cruiser.cjs` enforces route, feature, shared UI, and shared lib boundaries.
