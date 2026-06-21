# ADR 0003: CI/CD and Containerization

## Status

Accepted

## Context

YogaFlow is deployed on Vercel and should keep that as the primary production path while the MVP is being validated. The project also needs a Docker setup for production-like local runs and future portability to self-hosted or container-based platforms.

The project already uses Next.js, pnpm, Biome, and dependency-cruiser. Any CI/CD setup should run the same checks developers run locally and should not introduce a separate deployment path that conflicts with Vercel.

## Decision

Use Vercel for production and preview deployments, backed by Git-based deploys.

Use GitHub Actions as the quality gate for pull requests and pushes to `master`. The workflow runs:

- `pnpm install --frozen-lockfile`
- `pnpm lint`
- `pnpm arch:check`
- `pnpm build`
- Docker image build validation

Use Docker for production-like local runs and future self-hosting. Enable Next.js `output: "standalone"` so the Docker runtime image contains only traced production files, static assets, and the minimal Next server.

## Rationale

- Vercel is the lowest-friction deployment target for the current Next.js app and already provides production and preview deployments.
- GitHub Actions gives explicit, reviewable checks before code reaches production.
- `output: "standalone"` follows the Next.js self-hosting guidance for smaller Docker images.
- Docker keeps the app portable if later business requirements require non-Vercel hosting.
- Keeping Vercel and Docker separate avoids forcing Vercel to use a container path it does not need.

## Consequences

- `pnpm build` needs network access while the app uses `next/font/google`, because Google font files are fetched at build time and then self-hosted by Next.js.
- Docker builds also need network access during dependency installation and font fetching.
- Future database work should extend `compose.yml` with PostgreSQL and add migration checks to CI.
- If the app later uses Server Actions across multiple container instances, deployment configuration must include consistent encryption and deployment identifiers.

## Implementation Notes

- `.github/workflows/ci.yml` defines the CI workflow.
- `vercel.json` keeps Vercel project settings explicit.
- `Dockerfile` builds the standalone production image.
- `compose.yml` runs the production image locally.
- `.dockerignore` keeps build context small.
- `dependency-graph.dot` remains ignored because it is generated.

## References

- Next.js local docs: `node_modules/next/dist/docs/01-app/01-getting-started/17-deploying.md`
- Next.js local docs: `node_modules/next/dist/docs/01-app/02-guides/self-hosting.md`
- Next.js local docs: `node_modules/next/dist/docs/01-app/03-api-reference/05-config/01-next-config-js/output.md`
