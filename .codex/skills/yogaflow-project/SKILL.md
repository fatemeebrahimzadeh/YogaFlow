---
name: yogaflow-project
description: Project-specific workflow for the YogaFlow repository. Use when working in /Users/fatemeebrahimzadeh/Documents/YogaFlow or when planning, implementing, validating, documenting, committing, deploying, or changing architecture, UI, product behavior, CI/CD, Docker, ADRs, PRD, README, AGENTS.md, or repo-local skills for YogaFlow.
---

# YogaFlow Project

## Start Here

1. Work from `/Users/fatemeebrahimzadeh/Documents/YogaFlow`.
2. Read `AGENTS.md` first; it contains always-on repo rules.
3. For product behavior, read and maintain `docs/prd.md`.
4. For durable decisions, read existing ADRs in `docs/adr/` and add the next numbered ADR when needed.
5. For Next.js behavior, read the relevant local docs under `node_modules/next/dist/docs/` before coding.

## Skill Sync Rule

Update this skill only when a change creates guidance future implementations must remember.

Good reasons to update it:

- New commit, PR, branching, validation, or release policy.
- New architecture boundaries or dependency-cruiser rules.
- New required project checks.
- New durable UI, data, auth, deployment, observability, CDN, domain, database, or feature-structure policy.
- New source layout that changes where app, UI, feature, or shared code belongs.

Do not copy full PRD, README, or ADR content here. Link to canonical docs and keep this file a concise workflow guide.

## Current Project Policies

- UI primitives live in `src/components/ui`; shared non-UI utilities and business logic live in `src/lib`.
- Product modules use feature-based architecture under `src/features/<feature-name>` with public exports from each feature `index.ts`.
- A future `packages/dls` package is planned only when multi-app, white-label branding, or sport-specific theme reuse justifies extraction.
- `src/lib` must not import `src/app`, `src/components`, or `src/features`; `src/components/ui` must not import `src/app` or `src/features`.
- Features must not import `src/app` or sibling features directly; share cross-feature code through `src/lib` or an approved shared module.
- Dashboard MVP business rules currently live as pure feature-local functions under `src/features/dashboard/domain.ts`; keep tests aligned there until another feature needs shared rules.
- Keep deployment files aligned when deployment behavior changes: `vercel.json`, `Dockerfile`, `compose.yml`, `.github/workflows/ci.yml`, `next.config.ts`, README, and relevant ADRs.
- `package.json` pins pnpm through `packageManager`; keep CI and Docker package-manager behavior aligned when changing it.
- Generated artifacts such as `dependency-graph.dot` should stay out of git.
- Use pull requests for project changes; `master` is the production branch; `CI / Verify` should pass before merge; Vercel previews PRs and deploys production from `master`.
- Use Vitest for unit/component tests. Co-locate `*.test.ts` and `*.test.tsx` near the code they validate.

## Validation

Run checks that match the change. Defaults:

```bash
pnpm lint
pnpm arch:check
pnpm test
pnpm build
```

Notes:

- `pnpm build` may need network access because `next/font/google` fetches font files at build time.
- For Docker changes, run `pnpm docker:build` when Docker is available.
- For UI changes, run the dev server when useful.

## Commit Workflow

When asked to commit:

1. Inspect staged and unstaged changes first.
2. Split commits by logical change group.
3. Stage files explicitly for each group.
4. Leave unrelated changes uncommitted.
5. Use conventional commit messages where practical.
6. Explain hook failures before using `--no-verify`.
