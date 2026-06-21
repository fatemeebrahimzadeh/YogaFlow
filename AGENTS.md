<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:product-context -->
# Product Context

Before planning or implementing product behavior, read `docs/prd.md`. It is the source of truth for the Yoga Studio Management SaaS MVP, including users, class groups, courses, attendance statuses, saved/burned sessions, remaining-session calculations, renewal warnings, and future roadmap.
<!-- END:product-context -->

<!-- BEGIN:project-conventions -->
# Project Conventions

- Record meaningful project decisions as ADRs in `docs/adr/` using the next numeric prefix, for example `0003-some-decision.md`. Add or update an ADR when introducing architecture tools, core libraries, data-access patterns, deployment strategy, authentication, persistence, UI systems, or business-rule structure.
- For product behavior, keep `docs/prd.md` aligned with the implementation plan.
- For dependency boundaries, keep `.dependency-cruiser.cjs` aligned with the current folder structure and run `pnpm arch:check` after changing imports or architecture rules.
- Useful checks before finishing code changes: `pnpm lint`, `pnpm arch:check`, and `pnpm build`. `pnpm build` may need network access because `next/font/google` fetches fonts during build.
- The UI system is documented in `docs/adr/0001-ui-component-system.md`. Prefer local UI primitives under `src/components/ui` and shared non-UI utilities under `src/lib`.
- Product modules use feature-based architecture under `src/features/<feature-name>` with public exports from each feature `index.ts`. Keep `src/app` route files thin and use them to compose feature entry points.
- When asked to commit, inspect staged and unstaged changes first. Split commits by logical change group, stage only the files for each group explicitly, and leave unrelated changes uncommitted.
<!-- END:project-conventions -->
