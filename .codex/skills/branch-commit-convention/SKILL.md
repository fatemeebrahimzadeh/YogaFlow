---
name: branch-commit-convention
description: YogaFlow branch naming and commit message workflow. Use when creating, naming, switching, or advising on git branches; when preparing, splitting, staging, writing, amending, or reviewing commits; when asked to commit YogaFlow work; or when checking whether branch and commit history follows project conventions.
---

# Branch And Commit Convention

## Overview

Apply YogaFlow's pull-request workflow, branch naming, and conventional commit rules. Keep commits reviewable, release-friendly, and separated from unrelated user work.

## Branches

- Start branches from `master`; `master` is the production branch.
- Do not commit directly to `master` unless the user explicitly asks for an emergency or release action.
- Use pull requests for project changes.
- For Codex-created branches, use:

```text
codex/<type>/<short-kebab-topic>
```

Use the commit type that best matches the work as `<type>`:

- `feat` for user-visible features
- `fix` for bug fixes
- `docs` for documentation-only changes
- `test` for test-only or test-infra changes
- `refactor` for behavior-preserving code changes
- `chore` for maintenance, tooling, generated metadata, and releases
- `build` for build system or dependency behavior
- `ci` for GitHub Actions or CI/CD behavior

Examples:

```text
codex/feat/course-renewal-warning
codex/fix/attendance-counts
codex/docs/branch-commit-convention
codex/chore/update-release-workflow
```

Keep the topic short, lowercase, hyphenated, and tied to the user request. If the user requests a branch name, honor it unless it conflicts with `master` safety or repo policy.

## Commit Workflow

When asked to commit:

1. Inspect staged and unstaged changes before staging.
2. Identify unrelated or pre-existing user changes and leave them uncommitted.
3. Split commits by logical change group.
4. Stage files explicitly for each commit.
5. Write a Conventional Commit message that passes `@commitlint/config-conventional`.
6. Explain hook failures before using `--no-verify`; use bypasses only when explicitly justified.

Do not combine unrelated product, docs, tooling, formatting, and release changes just because they are present in the worktree.

## Commit Messages

Use:

```text
<type>(<optional-scope>): <imperative summary>
```

Rules:

- Keep the summary concise, lowercase after the type when natural, and imperative: `add`, `fix`, `record`, `update`.
- Prefer scopes for recognizable areas such as `dashboard`, `ui`, `ci`, `release`, `deps`, `docs`, or a feature name.
- Use `chore(release): <version>` for standard-version release commits.
- Use `!` and a body with `BREAKING CHANGE:` only for intentional breaking changes.
- Add a body when the reason, migration note, or tradeoff would not be obvious from the diff.

Examples:

```text
feat(dashboard): add renewal warning states
fix(attendance): count burned sessions for no-shows
docs: record branch and commit convention
test(dashboard): cover remaining-session calculation
chore(release): 0.1.4
```

## Validation

For commit-message checks, use commitlint through the existing Husky hook or run:

```bash
pnpm exec commitlint --edit <commit-message-file>
```

For code changes, also run the YogaFlow validation checks that match the change, usually `pnpm lint`, `pnpm arch:check`, `pnpm test`, and `pnpm build`.
