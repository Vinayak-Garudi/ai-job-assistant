# Push — /push (ai-job-assistant)

You ship the current working-tree changes in `ai-job-assistant` as a pull request: branch off `main`, commit, push, and open a PR.

## Optional Argument

$ARGUMENTS

If provided, use it as the short description of the change (drives the branch slug, commit message, and PR title). If empty, derive a concise description yourself from the actual diff.

---

## Context

- **Repo path:** `/Users/vinayak/Documents/codebase/ai-job-assistant`
- **GitHub slug:** `Vinayak-Garudi/ai-job-assistant`
- **Base branch:** `main`

---

## Steps

Work through these in order. Stop and report if any precondition fails.

### 1. Preflight

```bash
cd /Users/vinayak/Documents/codebase/ai-job-assistant
gh auth status            # must be authenticated — abort with instructions if not
git status                # see what will be shipped
```

- If `gh` is not authenticated → stop and tell the user to run `gh auth login`.
- If the working tree is **clean** (nothing staged, unstaged, or untracked) → stop: there is nothing to push.

### 2. Understand the change

```bash
git diff                  # unstaged
git diff --staged         # staged
git status --porcelain    # untracked files
```

Read the actual changes so the branch name, commit message, and PR body describe what really changed. Never commit `.env*`, `.DS_Store`, `node_modules`, or build output — if any are present, exclude them when staging.

### 3. Create the branch off `main`

Build a slug: lowercase, hyphens only, max 40 chars (from `$ARGUMENTS` if given, else from the diff).

```bash
git fetch origin
git stash push -u -m push-skill            # preserve current changes
git checkout main
git pull origin main
git checkout -b feature/<slug>
git stash pop                              # restore changes onto the new branch
```

If `git stash pop` reports conflicts, stop and report them — do not force anything.

> If the user is already on a non-`main` feature branch and explicitly wants to keep it, skip the stash/checkout dance and just commit on the current branch. Default behavior is to branch off fresh `main`.

### 4. Verify before committing

```bash
npm run lint
```

- If lint fails, fix trivial issues and re-run. If it cannot pass, stop and report — do not push broken code.

### 5. Commit

Stage only the relevant files (never the excludes from Step 2), then commit with a Conventional-Commits message:

```bash
git add <specific files>
git commit -m "$(cat <<'EOF'
<type>: <concise description>

<optional body explaining the why>
EOF
)"
```

Use `feat:`, `fix:`, `chore:`, `refactor:`, `docs:`, or `style:` as appropriate.

### 6. Push

```bash
git push -u origin feature/<slug>
```

### 7. Open the PR

```bash
gh pr create \
  --repo Vinayak-Garudi/ai-job-assistant \
  --base main \
  --head feature/<slug> \
  --title "<concise PR title (≤70 chars)>" \
  --body "$(cat <<'EOF'
## Summary
- <bullet 1>
- <bullet 2>

## Test Plan
- [ ] <how to verify — e.g. npm run build-dev, manual browser check>

🤖 Generated with [Claude Code](https://claude.ai/claude-code)
EOF
)"
```

### 8. Report

Output the branch name and the PR URL returned by `gh pr create`.
