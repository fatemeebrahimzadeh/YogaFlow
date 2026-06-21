---
name: yogaflow-project
description: Project-specific workflow for the YogaFlow repository. Use when working in /Users/fatemeebrahimzadeh/Documents/YogaFlow or when the user asks to plan, implement, document, validate, commit, deploy, Dockerize, configure CI/CD, update ADRs/PRD/README/AGENTS.md, or make architecture/UI/business-rule changes for YogaFlow.
---

# YogaFlow Project

## Core Workflow

1. Start from the repo root: `/Users/fatemeebrahimzadeh/Documents/YogaFlow`.
2. Read `AGENTS.md` before changing code. It contains required Next.js and project conventions.
3. For product behavior, read `docs/prd.md` and keep it aligned with the implementation plan.
4. For meaningful project decisions, add or update an ADR in `docs/adr/` with the next numeric prefix. Use ADRs for architecture tools, core libraries, UI system decisions, auth, persistence, deployment, observability, domain/CDN strategy, business-rule structure, and other durable choices.
5. Read existing ADRs before changing an area they cover:
   - `0001-ui-component-system.md` for shadcn/ui-style local components.
   - `0002-dependency-cruiser.md` for dependency boundaries.
   - `0003-ci-cd-and-containerization.md` for CI/CD, Vercel, Docker, and standalone output.

## Policy Sync Rule

When a commit introduces a policy, convention, durable architecture decision, workflow expectation, or future implementation rule that later agents must respect, update this skill in the same logical change group. Keep this skill aligned with `AGENTS.md`, `docs/prd.md`, ADRs, README deployment instructions, and project tooling.

Examples that should update this skill:

- New commit or branching conventions.
- New required validation checks.
- New architecture boundaries or dependency-cruiser rules.
- New UI, data, auth, deployment, observability, CDN, domain, or database policies.
- New source directories that change where app, UI, feature, or shared logic belongs.

## Implementation Guardrails

- Next.js version in this repo may differ from model assumptions. Before changing Next.js APIs, routing, deployment config, fonts, caching, or build behavior, read the relevant local docs in `node_modules/next/dist/docs/`.
- Prefer existing stack choices: Next.js App Router, TypeScript, Tailwind CSS, local shadcn/ui-style components, dependency-cruiser, pnpm, Vercel, and Docker standalone output.
- Keep reusable UI primitives in `src/components/ui`. Keep shared non-UI utilities and business logic in `src/lib`.
- Do not let `src/lib` import `src/app` or `src/components`. Do not let `src/components/ui` import `src/app`. Update `.dependency-cruiser.cjs` only when the architecture intentionally changes.
- Keep `vercel.json`, `Dockerfile`, `compose.yml`, `.github/workflows/ci.yml`, `next.config.ts`, and README deployment docs aligned when changing deployment or CI/CD behavior.
- Keep generated files out of git when they can be recreated, such as `dependency-graph.dot`.

## Validation

Run focused checks for the change. Useful defaults:

```bash
pnpm lint
pnpm arch:check
pnpm build
```

Notes:

- `pnpm build` may need network access because `next/font/google` fetches font files at build time.
- Docker commands require Docker to be installed and running. Use `pnpm docker:build` and `pnpm docker:run` when Docker-related work changes and the environment supports it.
- For UI changes, run the dev server when useful. If port 3000 is occupied, use the port Next selects.

## Commit Rules

When the user asks to commit:

1. Inspect staged and unstaged changes first with `git status --short` and relevant diffs.
2. Split commits by logical change group. Do not combine unrelated edits.
3. Stage files explicitly for each commit. Do not rely on `git add .` unless every changed file belongs to that single group.
4. Leave unrelated changes uncommitted.
5. Use conventional commit messages where practical, e.g. `docs: ...`, `feat: ...`, `chore: ...`, `fix: ...`.
6. If hooks fail because of a known tooling limitation, explain the reason before using `--no-verify`.

## Roadmap Awareness

Future plans already recorded in `docs/prd.md` include UI redesign, branding, monetization, open-source fallback, distribution to other yoga studios, observability, CDN, custom domain/DNS, production/preview environments, CI/CD, and Docker. Keep new work consistent with those roadmap items, and update the PRD when the plan changes.
