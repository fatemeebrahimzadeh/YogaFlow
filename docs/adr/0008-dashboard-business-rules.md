# ADR 0008: Dashboard Business Rules

## Status

Accepted

## Context

The MVP dashboard needs to show today's class groups, students waiting for attendance, saved and burned absences, remaining sessions, and renewal warnings. Persistence and authentication are not implemented yet, but the PRD business rules need a stable home before database models are introduced.

## Decision

Keep the first dashboard business rules as pure TypeScript functions inside the dashboard feature module.

Use feature-local domain types and calculation helpers for class schedules, attendance consumption, remaining sessions, saved sessions, burned sessions, and renewal warnings. Use seed data only as a temporary data source for the read-only MVP dashboard.

## Rationale

- Pure functions keep the PRD rules testable without a database or API boundary.
- Feature-local types match the current feature-based architecture and avoid premature shared abstractions.
- The seed data can be replaced by persistence later while preserving the calculation contract.
- The dashboard route can stay thin and compose the feature entry point.

## Consequences

- Dashboard behavior changes should update the feature-local domain tests.
- Shared cross-feature business rules should move to `src/lib` only after another feature needs the same logic.
- When persistence is added, the repository/API layer should adapt database records into these domain shapes or deliberately replace them with a documented model.
- Seed data must not become the long-term source of truth.

## Implementation Notes

- `src/features/dashboard/domain.ts` defines the MVP dashboard model and calculation helpers.
- `src/features/dashboard/data.ts` contains temporary seed data.
- `src/features/dashboard/domain.test.ts` validates the PRD attendance and renewal rules.
- The MVP renewal warning threshold is 3 remaining sessions, as documented in `docs/prd.md`.
