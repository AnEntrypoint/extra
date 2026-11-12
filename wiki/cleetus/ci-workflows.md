# CI workflows and npm scripts

## How it works

The only workflow is `/workspace/savi/.github/workflows/publish.yml` (old name: savi). Its `name` is `publish-manual`. It rebuilds the static manual, checks the generated site, and deploys it to GitHub Pages. The published URL is https://anentrypoint.github.io/savi/ (stated in `/workspace/savi/README.md`, old name: savi).

### Triggers

- `push:` with no branch or tag filter, so every push to any branch starts the workflow.
- `workflow_dispatch:` for a manual run from the Actions tab.

### Permissions

Set at workflow level, so every job inherits them:

- `contents: read`
- `pages: write`
- `id-token: write`

### Concurrency

- Group `pages`, `cancel-in-progress: false`. Runs that share the group queue behind each other and an in-flight deployment is never cancelled.

### Job `build`

Runs on `ubuntu-latest`. Steps in order:

1. `checkout`, `actions/checkout@v4`, with `fetch-depth: 0`. The full history is fetched because `scripts/build-manual.mjs` reads the commit hash, branch and log through `git` (`rev-parse`, `branch --show-current`, `log`). Without full history the manifest history would be incomplete.
2. `setup-node`, `actions/setup-node@v4`, Node 20. No `npm ci` step exists, because `/workspace/savi/package.json` (old name: savi) declares no dependencies and the scripts are plain `node` invocations.
3. `build`: `node scripts/build-manual.mjs .`
4. `check`: `node scripts/check-manual.mjs .`
5. `configure-pages`, `actions/configure-pages@v5`, with `enablement: true`, which asks Pages to be enabled for the repository if it is not.
6. `upload-pages-artifact`, `actions/upload-pages-artifact@v3`, with `path: site` and `include-hidden-files: true`. The hidden flag is needed because the build writes `site/.nojekyll`, which stops GitHub Pages running Jekyll.

### Job `deploy`

- `if: github.ref == 'refs/heads/main'`, so only a push to `main`, or a manual dispatch whose selected ref is `main`, deploys.
- `needs: build`.
- `environment` named `github-pages`, with `url: ${{ steps.deployment.outputs.page_url }}`.
- Runs on `ubuntu-latest`. One step, `deploy-pages` (id `deployment`), uses `actions/deploy-pages@v5`.

### What the build script does (`scripts/build-manual.mjs`, old name: savi)

Called as `node scripts/build-manual.mjs .`, the script:

- Resolves the root and sets `site` to `<root>/site`. Excluded directory names: `.git`, `.playwriter`, `runs`, `site`, `node_modules`, `sources`. Withheld path prefixes: `.spawn/reference/http/raw/`, `spawn-evidence/data/`, `spawn-evidence/maps/witness/`. Note that the walk uses the working tree (`readdir`), not `git ls-files`.
- Walks the tree, sorted by name, and reads every remaining file. A file is text when it has no NUL byte. For text files the page shows the exact content; for binary files it shows a 16-byte-per-line hex dump with an ASCII column. Line count, byte count and SHA-256 are recorded for every file.
- Deletes and recreates `site/`, then writes `site/raw/` (a byte-exact copy of each file, with the top-level `.github` directory renamed to `_github`), `site/files/` (one HTML page per file, named by the hex of its relative path plus `.html`), `site/style.css`, `site/index.html` (file list grouped by top-level directory, plus the git history table), `site/404.html`, `site/manifest.json` (per-file path, bytes, lines, hash, text flag, page name, and the history), and an empty `site/.nojekyll`.
- Embeds an `<img>` for image files (`.png`, `.jpg`, `.jpeg`, `.gif`, `.webp`) that are binary.
- Prints one JSON line with commit, branch, file count, bytes, text count and binary count.

### What the check script does (`scripts/check-manual.mjs`, old name: savi)

Called as `node scripts/check-manual.mjs .`, the script reads `site/manifest.json` and `site/index.html` and collects failures:

- For every manifest entry: the source file must exist, the raw copy must exist and match the recorded SHA-256, the file page must exist, the index must link to the page, and for text files the text inside `<pre>` must decode to exactly the source. It also fails if any file under `.spawn/reference/http/raw/`, `sources/`, or a path named `WITHHELD.json` appears in the manifest.
- Walks every HTML file under `site/` and checks every relative `href` and `src` target resolves on disk. Absolute, `http(s)`, `mailto`, `data`, and protocol-relative targets are skipped.
- Requires `site/.nojekyll`.
- Greps `.github/workflows/publish.yml` for markers: `push:`, `workflow_dispatch:`, the build and check commands, `configure-pages@v5`, `upload-pages-artifact@v3`, `deploy-pages@v5`.
- Requires the manifest kind counts (text plus binary) to equal the file count.
- If `git rev-parse HEAD` succeeds, requires the manifest commit to equal HEAD.
- Requires `/workspace/savi/ENDPOINTS.md` (old name: savi) to equal the output of `buildEndpointsPage` in `scripts/endpoints.mjs` (old name: savi), which is imported directly.
- Prints one JSON result line and sets exit code 1 on any failure. The first 20 failure messages are listed.

### The endpoints generator (`scripts/endpoints.mjs`, old name: savi)

Used by `check-manual.mjs` and by `npm run endpoints`. It scans text files for strings beginning `/api/`, normalises them (trailing punctuation removed, UUIDs replaced with `{id}`, rejected when braces are unbalanced or contain `<`/`>`), and classifies each against the paths in `scripts/openapi.json` (old name: savi) as `listed`, `per-game`, `partial` or `absent`. It writes `ENDPOINTS.md`. Directories `scripts`, `spawn-evidence`, `.git`, `.playwriter`, `runs`, `site`, `node_modules` and `sources` are skipped, and so is `.spawn/reference/http/raw/`. At the time of this review, `buildEndpointsPage` output matched the committed `ENDPOINTS.md`.

### npm scripts (`/workspace/savi/package.json`, old name: savi)

The package is `private`, `type: module`, with no dependencies. Its scripts and their relation to CI:

| Script | Command | In CI |
| --- | --- | --- |
| `build` | `node scripts/build-manual.mjs .` | Same as the `build` step. |
| `check` | `node scripts/check-manual.mjs . && node scripts/check-ideal-coverage.mjs` | Only the first half runs in CI (the `check` step). |
| `check:ideal-coverage` | `node scripts/check-ideal-coverage.mjs` | No. |
| `check:ideal-witnesses` | `node scripts/check-ideal-witnesses.mjs` | No. |
| `endpoints` | `node scripts/endpoints.mjs .` | No. Only the file's output is compared, by `check-manual.mjs`. |
| `verify` | `node scripts/verify-publish.mjs .` | No. |
| `check:featureset` | `node scripts/check-featureset.mjs` | No. |

Other scripts in `/workspace/savi/scripts/` (old name: savi) not named in `package.json`: `check-open-items.mjs`.

What the non-CI scripts do:

- `scripts/check-ideal-coverage.mjs` (old name: savi) reads `docs/JAYZEE-GAPS.md` in the checkout (old name: savi) and requires every numbered row to be named as `row <id>` in `../jayzee/docs/IDEAL.md`, a file in the sibling jayzee checkout.
- `scripts/check-ideal-witnesses.mjs` (old name: savi) reads the same sibling file, and for each `partial` row requires a `scripts/*.mjs` witness path that exists under the jayzee checkout.
- `scripts/check-featureset.mjs` (old name: savi) checks `docs/FEATURESET.md`, `docs/JAYZEE-GAPS.md` and `docs/OPEN-ITEMS.md` against the `.spawn/reference` tree and the hard-coded path `/workspace/jayzee`, and against files under `spawn-evidence/`.
- `scripts/verify-publish.mjs` (old name: savi) runs `gh run list --workflow publish.yml --branch main --limit 20`, finds the run whose `headSha` equals `git rev-parse HEAD`, and passes only if that run is completed with conclusion `success`.
- `scripts/check-open-items.mjs` (old name: savi) parses `docs/OPEN-ITEMS.md` for `### OPEN-nnn` headings, checks ids are unique and statuses are in the allowed set (`OPEN`, `RESOLVED`, `INFERRED`, `UNVERIFIED`, `BEHAVIOUR`, `DIFFERENT-DATASET`, `HELD-OWNER`).

## Decisions

- Build and check run as plain `node` commands rather than `npm run`, so the workflow has no npm install step. This follows from the absence of dependencies in `package.json` (old name: savi).
- `fetch-depth: 0` is set because the build reads git history for the commit, branch and history table.
- The check step compares the manifest commit to HEAD and the ENDPOINTS.md file to its generator output, so a built site and its checked-in endpoint page must match the checkout exactly.
- `cancel-in-progress: false` on the `pages` group means a queued deployment waits instead of being cancelled, so a newer run cannot abort a deployment in progress.
- Deployment is gated on `refs/heads/main`. Other branches build and check but never deploy.
- Hidden files are included in the Pages artifact so that `.nojekyll` reaches the site.
- Withheld content is excluded in the build script (`withheldPrefixes`, `excludedDirs`) and rejected by the check script's excluded list, so a withheld file that reached the manifest would fail CI.
- `scripts/check-manual.mjs` imports the endpoints generator, so an out-of-date `ENDPOINTS.md` fails the CI check even though CI never runs `npm run endpoints`.

## Open gaps

- The CI check step runs only `check-manual.mjs`, not the full `npm run check`. `check-ideal-coverage.mjs` is absent from CI. Source: `/workspace/savi/.github/workflows/publish.yml` (old name: savi) and `/workspace/savi/package.json` (old name: savi).
- `check-ideal-coverage.mjs` and `check-ideal-witnesses.mjs` depend on `../jayzee/docs/IDEAL.md`, a sibling checkout that does not exist in a CI runner. Adding them to CI would fail. Source: `/workspace/savi/scripts/check-ideal-coverage.mjs` (old name: savi) and `/workspace/savi/scripts/check-ideal-witnesses.mjs` (old name: savi).
- `check-featureset.mjs` hard-codes `/workspace/jayzee`. Source: `/workspace/savi/scripts/check-featureset.mjs` (old name: savi).
- `npm run endpoints` is not run in CI, while the README instructs running it before `npm run check`. CI relies on a checked-in `ENDPOINTS.md` being current. Source: `/workspace/savi/README.md` (old name: savi) and `/workspace/savi/.github/workflows/publish.yml` (old name: savi).
- The README says "Every push to main runs" the workflow. The trigger is `push:` without a branch filter, so every branch build runs. Source: `/workspace/savi/README.md` (old name: savi) and `/workspace/savi/.github/workflows/publish.yml` (old name: savi).
- The README says "Every committed file is shown". The build walks the working tree, not `git ls-files`, so an uncommitted, non-ignored file would also be published. Source: `/workspace/savi/scripts/build-manual.mjs` (old name: savi).
- `spawn-evidence/data/` and `spawn-evidence/maps/witness/` are withheld by the build, but they are not in `/workspace/savi/.gitignore` (old name: savi). They are tracked in git (114 tracked files under `spawn-evidence/`). The check script's excluded list does not name them. Source: `/workspace/savi/scripts/build-manual.mjs` (old name: savi) and `/workspace/savi/scripts/check-manual.mjs` (old name: savi).
- `.DS_Store` is gitignored, but the build walks the disk and does not apply `.gitignore`, so a local `.DS_Store` would be published as a hex dump. Source: `/workspace/savi/.gitignore` (old name: savi) and `/workspace/savi/scripts/build-manual.mjs` (old name: savi).
- `.claude/` is not excluded by the build. It is empty today. Source: `/workspace/savi/scripts/build-manual.mjs` (old name: savi).
- `scripts/check-open-items.mjs` is not listed in `package.json` and is not run in CI. Source: `/workspace/savi/package.json` (old name: savi).
- The rationale for the concurrency settings, the deploy gate, and the exclusions is not recorded in the sources. Source: `/workspace/savi/.github/workflows/publish.yml` (old name: savi).

## Sources

- /workspace/savi/.github/workflows/publish.yml (old name: savi)
- /workspace/savi/package.json (old name: savi)
- /workspace/savi/README.md (old name: savi)
- /workspace/savi/.gitignore (old name: savi)
- /workspace/savi/ENDPOINTS.md (old name: savi)
- /workspace/savi/scripts/build-manual.mjs (old name: savi)
- /workspace/savi/scripts/check-manual.mjs (old name: savi)
- /workspace/savi/scripts/endpoints.mjs (old name: savi)
- /workspace/savi/scripts/check-ideal-coverage.mjs (old name: savi)
- /workspace/savi/scripts/check-ideal-witnesses.mjs (old name: savi)
- /workspace/savi/scripts/check-featureset.mjs (old name: savi)
- /workspace/savi/scripts/check-open-items.mjs (old name: savi)
- /workspace/savi/scripts/verify-publish.mjs (old name: savi)
- /workspace/savi/scripts/openapi.json (old name: savi)

Related page: [State and tooling](state-and-tooling.md)
