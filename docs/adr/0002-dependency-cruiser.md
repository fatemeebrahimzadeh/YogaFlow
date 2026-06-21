# ADR 0002: Dependency Boundary Checks

## Status

Accepted

## Context

YogaFlow is expected to grow from a small Next.js app into a SaaS product with dashboard pages, reusable UI components, shared business rules, and feature modules for students, class groups, courses, payments, attendance, and renewals.

As the codebase grows, import boundaries can drift. Common failure modes include shared business logic importing UI code, reusable UI components depending on route-level code, feature modules creating circular dependencies, and production code accidentally relying on development-only packages.

## Decision

Use `dependency-cruiser` for lightweight architecture checks.

The project will keep dependency rules in `.dependency-cruiser.cjs` and expose them through package scripts:

- `pnpm arch:check` validates import boundaries.
- `pnpm arch:graph` generates a local dependency graph as `dependency-graph.dot`.

The generated graph is ignored by git because it can be recreated at any time.

## Initial Rules

- Disallow circular imports.
- Disallow unresolved imports.
- Disallow imports from packages missing in `package.json`.
- Disallow production `src` code importing development dependencies.
- Disallow `src/lib` importing `src/app` or `src/components`.
- Disallow `src/components/ui` importing `src/app`.
- Warn about orphaned `src` files, with exceptions for Next.js app entry files.

## Rationale

- The tool gives early feedback before architecture problems become expensive to unwind.
- Rules are explicit, local, and easy to tune as feature folders are added.
- It fits the current TypeScript and path-alias setup.
- It is useful in CI/CD without needing to run the full app.
- The initial rule set is intentionally small to avoid noisy failures while the product shape is still forming.

## Consequences

- New folders may require updates to `.dependency-cruiser.cjs`.
- Some legitimate entry points may need orphan-rule exceptions.
- The project gains another dev dependency and CI check.
- Architecture rules should evolve with ADRs when they encode a meaningful project decision.

## References

- https://github.com/sverweij/dependency-cruiser
