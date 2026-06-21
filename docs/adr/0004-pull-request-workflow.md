# ADR 0004: Pull Request Workflow

## Status

Accepted

## Context

YogaFlow uses GitHub Actions as a CI quality gate and Vercel for preview and production deployments. To keep `master` stable, changes should be reviewed through pull requests before they reach production.

## Decision

Use pull requests for project changes.

`master` remains the production branch. Pull requests should receive Vercel Preview Deployments, and pushes or merges to `master` should produce Vercel Production Deployments.

GitHub branch protection should require the `CI / Verify` status check to pass before merging.

## Rationale

- Pull requests create a review point before production deployment.
- GitHub Actions catches lint, architecture, build, and Docker image issues before merge.
- Vercel Preview Deployments make UI and behavior changes inspectable before production.
- Keeping `master` as production keeps deployment behavior simple for the MVP.

## Consequences

- Repository settings in GitHub must enforce branch protection; this cannot be guaranteed by committed files alone.
- Vercel must stay connected to the GitHub repository with preview deployments enabled.
- The pull request template should stay aligned with the checks and policies expected by the project.

## Implementation Notes

- `.github/pull_request_template.md` defines the PR checklist.
- `.github/workflows/ci.yml` defines the `CI / Verify` check.
- `README.md` documents the contribution workflow and required GitHub UI settings.
- `.codex/skills/yogaflow-project/SKILL.md` records this as a future project policy.
