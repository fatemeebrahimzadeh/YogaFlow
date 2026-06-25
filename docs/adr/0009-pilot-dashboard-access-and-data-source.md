# ADR 0009: Pilot Dashboard Access and Data Source

## Status

Accepted

## Context

The first usable YogaFlow version needs to be shared with a coach before full authentication, CRUD screens, and database persistence are implemented. The dashboard contains student names, phone numbers, payment amounts, attendance history, saved sessions, burned sessions, and renewal status, so it should not be publicly readable.

The existing dashboard feature already calculates the PRD business rules from typed seed data. Replacing that read-only dashboard with a full data-entry system is the next larger milestone, but the product can be validated sooner if the coach can use a protected dashboard backed by one manually editable source file.

## Decision

Use a temporary pilot access gate on the root page.

The gate requires the `YOGAFLOW_PILOT_PASSWORD` environment variable. When the password is submitted correctly, a server action stores an HTTP-only access cookie derived from the configured password for one week. The dashboard page remains server-rendered and reads the cookie through Next.js request-time APIs.

Use `src/features/dashboard/data.ts` as the temporary manually edited pilot data source for students, class groups, courses, payments, and attendance until CRUD and database persistence are introduced.

## Rationale

- A password gate is enough to prevent casual public access during the pilot without introducing a full authentication provider too early.
- HTTP-only derived-token cookies are more appropriate than exposing a plain access flag to client-side JavaScript.
- Keeping pilot data in a typed TypeScript module preserves the current tested dashboard calculation contract.
- The approach keeps route files thin: `src/app/page.tsx` composes the dashboard and pilot access features.

## Consequences

- This is not the final trainer authentication system from the PRD.
- Anyone with the shared password can access the pilot dashboard until the cookie expires or the password changes.
- Real coach data must be edited directly in `src/features/dashboard/data.ts` until CRUD exists.
- Future database work should replace the manual data file with persistence and add migration checks to CI.
- Future auth work should replace this gate with proper trainer accounts, sessions, password reset, and authorization.

## Implementation Notes

- `src/features/pilot-access` owns the password verification, signed access cookie, sign-in panel, and sign-out action.
- `src/features/dashboard/data.ts` exports `dashboardPilotData`, including the manual data source note and last updated date.
- The dashboard displays a pilot banner, the data update date, and saved-session follow-up actions.
