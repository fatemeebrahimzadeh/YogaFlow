# ADR 0009: Public Demo and Private Coach Dashboard

## Status

Accepted

## Context

YogaFlow needs to be understandable to visitors who open the project URL, but the pilot coach dashboard can contain student names, phone numbers, payment details, attendance history, saved sessions, burned sessions, and renewal status.

The product also has a future multi-tenant SaaS goal, so the MVP should avoid mixing public sample data with private coach data in one route or one implicit tenant model.

## Decision

Use the root route `/` for a public read-only dashboard backed by fake demo data.

Use `/coach` for the pilot coach dashboard. The coach route is protected by the temporary `YOGAFLOW_PILOT_PASSWORD` gate and reads from the manually editable private data source in `src/features/dashboard/data.ts`.

Keep the dashboard UI data-driven so both routes render the same dashboard component with different datasets.

## Rationale

- Visitors can inspect the product immediately without seeing private coach information.
- The coach gets a stable private URL during the pilot.
- The root route and coach route create an explicit data boundary before database persistence exists.
- A data-driven dashboard component will be easier to reuse later when tenant-aware data loading replaces TypeScript seed files.

## Consequences

- `/coach` is a pilot access path, not final multi-tenant authentication or authorization.
- The password gate protects against casual public access but should be replaced by proper user accounts and tenant-scoped sessions.
- Real coach data must not be copied into the public demo dataset.
- Future multi-tenant work can replace `/coach` with tenant slugs, custom domains, or authenticated organization context without changing the dashboard presentation contract.
