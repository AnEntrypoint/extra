# Site overview (built manual output)

## How it works

The published site lives in `/workspace/savi/site/` (old name: savi). It is the built output of the manual. Its contents are produced by `/workspace/savi/scripts/build-manual.mjs` (old name: savi), which is run from the repository root as `node scripts/build-manual.mjs .` (also the `build` npm script in `/workspace/savi/package.json` (old name: savi)). The script generates every file under `site/`; nothing under `site/` is hand-written. The build script deletes and recreates `site/` on each run.

The check script is `/workspace/savi/scripts/check-manual.mjs` (old name: savi), run as `node scripts/check-manual.mjs .` (also the `check` npm script, which chains `check-ideal-coverage.mjs` after it). `/workspace/savi/scripts/verify-publish.mjs` (old name: savi) is a separate post-publish check that queries GitHub Actions through `gh` for a successful `publish.yml` run at HEAD.

Generation steps, as the build script implements them:

1. Resolve the repository root from `process.argv[2]` and set `site` to `<root>/site`.
2. Read commit metadata with read-only git calls: `rev-parse HEAD` (fallback `NO_COMMIT`), `branch --show-current` (fallback `DETACHED`), and `log --date=short --pretty=format:%h TAB %ad TAB %s` (all commits, no limit). Git failures are swallowed and produce empty values.
3. Walk the root recursively in sorted order (`localeCompare`). Skipped directories: `.git`, `.playwriter`, `runs`, `site`, `node_modules`, `sources`. Skipped path prefixes (withheld): `.spawn/reference/http/raw/` (old name: spawn), `spawn-evidence/data/` (old name: spawn), and `spawn-evidence/maps/witness/` (old name: spawn).
4. For each remaining file, read the bytes and compute its SHA-256. A file is text when it contains no NUL byte. Text files get a line count (a trailing newline is not counted as a line). Binary files get a 16-byte-per-row hex dump with an ASCII column as their body.
5. Each file gets a `page` name: the lowercase hex encoding of its UTF-8 relative path, plus `.html`.
6. Delete `site/` and recreate `site/raw/`, `site/files/`, and an empty `site/.nojekyll`.
7. Write `site/style.css`.
8. For every file: copy the original bytes to `site/raw/` (with the mapping that renames a `.github` segment to `_github`), and write a page `site/files/<hex>.html` containing an H1 with the path, a meta strip (bytes, lines, TEXT or BINARY, HEX), links to INDEX and RAW, an inline `<img>` only for binary PNG, JPG, JPEG, GIF, or WEBP files, and a `<pre>` block with the escaped body.
9. Group the files by top-level directory (root files go under `(root)`) and write `site/index.html`.
10. Write `site/404.html`.
11. Write `site/manifest.json` (2-space JSON plus trailing newline).
12. Print a one-line JSON summary to stdout.

The CI workflow `/workspace/savi/.github/workflows/publish.yml` (old name: savi) runs on every `push` and on `workflow_dispatch`. Its build job checks out with full history, sets up Node 20, runs the build, runs the check, configures Pages, and uploads `site` with hidden files included via `upload-pages-artifact@v3`. A separate deploy job (`deploy-pages@v5`) runs only when `github.ref` is `refs/heads/main`. So `site/` is produced by `build-manual.mjs` in CI, and it is gitignored (`site/` appears in `/workspace/savi/.gitignore` (old name: savi)).

What `check-manual.mjs` verifies against `site/`:

- Every manifest file exists in the source tree, has a raw copy whose SHA-256 matches, has a page, and is linked from `index.html`.
- No file under `.spawn/reference/http/raw/` (old name: spawn), `sources/`, or `WITHHELD.json` is published.
- For text files, the text inside the `<pre>` block of each page decodes exactly to the source file.
- Every `href` and `src` in every HTML file under `site/` that is relative (not `http`, `https`, `mailto`, `data`, `//`, or `/`) resolves to an existing file.
- `site/.nojekyll` exists, and the workflow file contains the expected markers.
- `manifest.textCount + manifest.binaryCount` equals `manifest.files.length`.
- The manifest commit equals the checkout HEAD, if git is available.
- `ENDPOINTS.md` matches `buildEndpointsPage` output from `/workspace/savi/scripts/endpoints.mjs` (old name: savi).

### Site contents

#### index.html

- `<header>`: H1 `Savi Manual` (legacy name, see gaps), then a meta strip with COMMIT (7-character short hash), BRANCH, FILES (660), and BYTES (40054988), then links `#files`, `#history`, and `manifest.json`.
- `<main>` section `<h2 id="files">FILES</h2>`, then one `<h2>` per top-level group, each followed by a `<ul>` of `<li>` rows: a link to `files/<hex>.html`, the path as link text, and the byte count on the right. Group headings and counts, in sorted order:
  - `.github / 1 FILES`: 1 file
  - `(root) / 5 FILES`: 5 files
  - `.spawn / 600 FILES`: 600 files (old name: spawn)
  - `docs / 6 FILES`: 6 files
  - `gaps / 2 FILES`: 2 files
  - `scripts / 9 FILES`: 9 files
  - `spawn-engine / 10 FILES`: 10 files (old name: spawn)
  - `spawn-evidence / 27 FILES`: 27 files (old name: spawn)
- `<h2 id="history">HISTORY</h2>` then a table with columns DATE, COMMIT, SUBJECT, one row per commit: 104 rows, newest first (5a30f94, 2026-11-08) to oldest (53a7eeb, 2026-11-06).
- The grep count of `<li>` is 660 and of `<tr>` is 105 (the 104 history rows plus the header row).
- The index has no table of contents or sidebar. Navigation is the anchor links in the header, the per-file INDEX back-link, and the RAW link on each file page. The footer reads `SAVI MANUAL / <short hash> / REBUILT ON EVERY PUSH TO MAIN` (legacy name in literal text).
- Stylesheet link is `style.css`, and the file page stylesheet is `../style.css`.

#### manifest.json

Top-level keys, in order: `site`, `commit`, `branch`, `sourceCount`, `textCount`, `binaryCount`, `sourceBytes`, `files`, `history`.

- `site`: the literal string `Savi Manual` (legacy name).
- `commit`: full HEAD SHA `5a30f94d6c57cd02e40b5ee6ad68ce03df77d155`.
- `branch`: `main`.
- `sourceCount`: 660 files.
- `textCount`: 654 text files.
- `binaryCount`: 6 binary files.
- `sourceBytes`: 40054988 total bytes of the published source files.
- `files`: array of 660 objects. Each object has keys `path` (relative path), `bytes`, `lines` (0 for binary), `sha256` (hex digest of the original bytes), `text` (boolean), and `page` (hex-encoded path plus `.html`).
- `history`: array of 104 objects. Each has `hash` (short hash), `date` (YYYY-MM-DD), and `subject` (commit subject line).

Per-top-level counts in `files` match the index groups above. Largest entries: `.spawn/kernel/engine-client-runtime-worker.2792ef38e4f49eacedf6dd47091dc173fd2cd665de3b1cf1395654985e29b510.mjs` (old name: spawn), 28968772 bytes, and `spawn-engine/data/feed-asset-inventory.jsonl` (old name: spawn), 4722405 bytes. The `.spawn/reference/` subtree has 563 manifest entries and `.spawn/engine/` has 29 (old name: spawn, both).

#### style.css

A 1.7 KB stylesheet (listed as 1.7K by the filesystem) written by the build script from a fixed array of CSS lines, joined with newlines and a trailing newline. Rules set a monospace font at 15px, black ink on white paper with inverted hover and focus states, 8px ink borders for `header` and `footer`, uppercase H1 and H2 with a 4px top border on H2, list rows with a bottom rule, a bordered table, bordered `<pre>` blocks with `pre-wrap`, flex `.meta` chips, `.links` buttons, and a `img.direct` block for inline images. A `@media (prefers-color-scheme: dark)` block swaps the ink and paper colours.

#### 404.html

Title `Not found | Savi Manual` (legacy name in literal text). Body: H1 `Not found`, a link to `index.html` labelled INDEX, and the sentence `This path is not in the manual.` It uses the same shell and stylesheet as the other pages. Its footer shows the build commit short hash. It is written as a static page; no script in the build or check sources links to it.

#### .nojekyll

Zero-byte file, created empty by the build script. Its purpose is to make GitHub Pages serve the site without Jekyll processing, so that dot-prefixed paths and the `files/` and `raw/` trees are served as stored. `check-manual.mjs` fails the build if it is missing.

#### raw/

Byte-for-byte copies of every published source file, at the same relative path, with `.github` renamed to `_github`. Total: 660 files (equal to `sourceCount`).

Top-level layout and file counts:

- `raw/.spawn/` (old name: spawn): 600 files. Inside it: `reference/` 563, `engine/` 29, `kernel/` 2, `visual/` 5, and `agent-interface.md` 1 file.
- `raw/spawn-evidence/` (old name: spawn): 27 files.
- `raw/spawn-engine/` (old name: spawn): 10 files.
- `raw/scripts/`: 9 files.
- `raw/docs/`: 6 files.
- `raw/gaps/`: 2 files.
- `raw/_github/`: 1 file (`workflows/publish.yml`).
- Root files: `raw/.gitignore`, `raw/ENDPOINTS.md`, `raw/manual-worklist.json`, `raw/package.json`, `raw/README.md`.

#### files/

One HTML page per source file, named `<hex>.html`, where the hex string is the UTF-8 bytes of the relative path. Example: `.gitignore` is `2e67697469676e6f7265.html` (hex of `.gitignore`), and `.github/workflows/publish.yml` is `2e6769746875622f776f726b666c6f77732f7075626c6973682e796d6c.html`. Total: 660 pages.

Each page wraps one file: an H1 with the path, a meta strip (bytes, lines, TEXT or BINARY, HEX), INDEX and RAW links, optional inline image, and a `<pre>` block with the HTML-escaped body (the file's exact text for text files, a hex dump for binary files). Its footer carries the commit short hash.

#### HTML file total

There are 662 `.html` files under `site/`: 660 in `files/`, plus `index.html` and `404.html`. The full `site/` tree has 1325 files: 662 HTML, 660 raw copies, plus `style.css`, `.nojekyll`, and `manifest.json`.

#### Binary blobs under site/ (listed with size, not read)

Sizes are the bytes of the raw copies under `/workspace/savi/site/raw/` (old name: savi):

- `.spawn/kernel/mantle-core.cedc1a4a242dce3143f075fe3dc65da79c6a1cf425cbd16db602450be8fd3ec7.wasm` (old name: spawn): 470407 bytes
- `.spawn/visual/spawn-dev-2.png` (old name: spawn): 781850 bytes
- `.spawn/visual/spawn-dev.png` (old name: spawn): 70128 bytes
- `.spawn/visual/spawn-published-2.png` (old name: spawn): 65947 bytes
- `.spawn/visual/spawn-published-3.png` (old name: spawn): 62098 bytes
- `.spawn/visual/spawn-published.png` (old name: spawn): 65971 bytes

Only the five PNG files get an inline `<img>` on their page. The WASM file shows a hex dump only.

## Decisions

- The entire site is generated, not authored. Editing a file under `site/` has no lasting effect; the next build replaces it.
- Every file is published as a page and as a raw copy. Text is shown escaped inside `<pre>` rather than rendered as Markdown, so each file is displayed exactly as stored.
- Page file names are hex-encoded paths, which avoids any filesystem or URL escaping problem for paths with dots, slashes, or unicode. Raw files keep their real directory structure, so the raw tree is browsable by path.
- `.github` is renamed to `_github` in the raw tree only. Page names, the manifest, and the index keep the true path. The script does not state a reason for the rename; the `.nojekyll` file is written alongside it, so the site is served without Jekyll processing.
- Withheld content (reference HTTP raw captures, evidence data, and witness maps) is excluded at build time, and the check script fails if any excluded path appears in the manifest.
- Binary files are never decoded. Their pages carry a hex dump, and only raster image types are shown inline.
- Pages are styled as a monochrome, uppercase, bordered layout with light and dark color schemes through `prefers-color-scheme`.

## Open gaps

- The title and footer strings are hard-coded in the build script as `Savi Manual` and `SAVI MANUAL` (old name: savi, in `/workspace/savi/scripts/build-manual.mjs` (old name: savi)). The published site therefore still carries the legacy project name in every page title and footer.
- `check-manual.mjs` excludes `WITHHELD.json`, but `build-manual.mjs` never writes such a file and no such entry is in the manifest. The exclusion is a dead rule. Source: `/workspace/savi/scripts/check-manual.mjs` (old name: savi).
- The build runs on every push to any branch, but the footer text says "REBUILT ON EVERY PUSH TO MAIN". The deploy is gated on `main`, so non-main pushes build and check but do not publish. Source: `/workspace/savi/.github/workflows/publish.yml` (old name: savi).
- `check-manual.mjs` does not verify `style.css`, `404.html`, or the content of the `index.html` history table, and does not check that binary hex dumps match their bytes. Source: `/workspace/savi/scripts/check-manual.mjs` (old name: savi).
- `verify-publish.mjs` requires `gh` and a GitHub-side run, so it is not part of the CI pipeline and cannot run offline. Source: `/workspace/savi/scripts/verify-publish.mjs` (old name: savi).
- The git history in the manifest and index is taken from the full log with no limit, so the history table grows with every commit. No cap or pagination is recorded in the sources.
- `404.html` contains only an INDEX link and no manifest or raw link, and nothing in the build or check scripts configures how a host serves it. Source: `/workspace/savi/scripts/build-manual.mjs` (old name: savi).

## Sources

- /workspace/savi/site/ (old name: savi)
- /workspace/savi/site/index.html (old name: savi)
- /workspace/savi/site/manifest.json (old name: savi)
- /workspace/savi/site/style.css (old name: savi)
- /workspace/savi/site/404.html (old name: savi)
- /workspace/savi/site/.nojekyll (old name: savi)
- /workspace/savi/site/raw/ (old name: savi)
- /workspace/savi/site/files/ (old name: savi)
- /workspace/savi/scripts/build-manual.mjs (old name: savi)
- /workspace/savi/scripts/check-manual.mjs (old name: savi)
- /workspace/savi/scripts/verify-publish.mjs (old name: savi)
- /workspace/savi/scripts/endpoints.mjs (old name: savi)
- /workspace/savi/package.json (old name: savi)
- /workspace/savi/.github/workflows/publish.yml (old name: savi)
- /workspace/savi/.gitignore (old name: savi)
