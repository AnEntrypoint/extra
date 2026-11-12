# State and tooling

## How it works

This page covers the local state and tooling directories in the cleetus checkout at `/workspace/savi` (old name: savi): `.spawn/` (old name: spawn), `.claude/`, `.playwriter/`, and the ignore rules in `/workspace/savi/.gitignore` (old name: savi). Publication rules are defined in `/workspace/savi/scripts/build-manual.mjs` (old name: savi) and described by `/workspace/savi/README.md` (old name: savi). The build publishes every file it walks except the excluded directory names and withheld path prefixes listed below.

### `.spawn/` (old name: savi, old name: spawn)

Holds reference material about the jayzee platform (old name: spawn) and the agent's view of it. Five entries:

- `agent-interface.md` (11.1K) (old name: savi, old name: spawn), at `/workspace/savi/.spawn/agent-interface.md` (old name: savi, old name: spawn). A note written from the point of view of an agent account linked to the lanmower owner. It describes the agent identity, the world it edits, the git host, the budget and lanes, and where the access token is kept (a token file outside the repository). The token itself is not in the file and is not reproduced here.
- `engine/` (29 files). The engine documentation set: `README.md`, `api-reference.md`, `engine.yaml`, `skills.md`, `probe.sh`, `keys.py`, and `skills/` with 23 Markdown files (for example `physics.md`, `voxel-terrain.md`, `rooms-and-matchmaking.md`, `spawn-engine.md`). `keys.py` and `probe.sh` are scripts; their contents were not read for this page.
- `kernel/` (2 binaries):
  - `engine-client-runtime-worker.2792ef38e4f49eacedf6dd47091dc173fd2cd665de3b1cf1395654985e29b510.mjs`, 28,968,772 bytes. A JavaScript module (about 29 MB), not read.
  - `mantle-core.cedc1a4a242dce3143f075fe3dc65da79c6a1cf425cbd16db602450be8fd3ec7.wasm`, 470,407 bytes. A WebAssembly binary, not read.
- `reference/` (596 files on disk, 563 tracked by git, 33 ignored). A mirror of the platform documentation, organised as:
  - `cli/`: 347 files, the command-line help pages, API type pages (`api-*.txt`), client and mod command pages, and `INDEX.md`.
  - `tome/`: 75 files, including a `sections/` subdirectory.
  - `skills/`: 47 files, with `INDEX.md`.
  - `engine/`: 27 files.
  - `engine-deep/`: 40 files, including a `probes/` subdirectory.
  - `guide/`: 5 files.
  - `http/`: 51 files, of which 33 are under `http/raw/` and 18 are elsewhere in `http/`. The 33 raw files are the ignored and withheld set.
  - Four further files sit directly in `reference/`.
- `visual/` (5 binaries, all PNG):
  - `spawn-dev.png`, 70,128 bytes.
  - `spawn-dev-2.png`, 781,850 bytes.
  - `spawn-published.png`, 65,971 bytes.
  - `spawn-published-2.png`, 65,947 bytes.
  - `spawn-published-3.png`, 62,098 bytes.
  - Paths are `/workspace/savi/.spawn/visual/...` (old name: savi, old name: spawn). These PNGs are not read; the build embeds them as inline images and also writes a hex dump of each.

Publication status of `.spawn/`:

- `.spawn/reference/http/raw/` is withheld by the build (`withheldPrefixes`), excluded by the check script, skipped by the endpoints scanner, and gitignored.
- Everything else under `.spawn/` is published. The build does not exclude `.spawn/engine/`, `kernel/`, `visual/`, or the rest of `reference/`. This includes the 29 MB `.mjs` module, which is text and so is published as full text, and the two `kernel` and five `visual` binaries, which are published as hex dumps (the PNGs also appear as inline images).

### `.claude/`

`/workspace/savi/.claude/` (old name: savi) is an empty directory. `ls -la` shows only `.` and `..`, so there are no hidden files. Git does not track empty directories, and the build walks files only, so nothing from this directory is published today. The build does not exclude `.claude/` by name, so any file added there later would be published.

### `.playwriter/`

Local browser-automation state, created by the browser setup. It is excluded by name from the build (`excludedDirs`) and gitignored. Contents:

- `port`: contains `9734`. The port the playwriter gate listens on.
- `debug-port`: contains `10234`. The remote debugging port of the browser the gate starts.
- `gate.log`: lifecycle log, entries from 2026-11-06 to 2026-11-11. Each gate start states the port, debug port and an idle timeout of 300000 ms (5 minutes). Browser starts record the process id and the profile path. Exits read "no leases, browser stopped", meaning the gate shuts the browser down when no client holds a lease.
- `browser.log`: stderr from the Chromium processes started by the gate, four starts on 2026-11-06 and 2026-11-11. Repeated lines report "No usable sandbox" (the Linux user-namespace sandbox is unavailable), which the log attributes to the zygote host.
- `browser-profile/`: the Chromium user-data directory. It holds four regular files, about 16 MB in total, and a set of profile subdirectories (including `BrowserMetrics/`). Its contents are browser profile state and are not reproduced here.

The sources do not state why the profile and logs are excluded. Browser profile state is local to the machine, and that is the reason inferred from the directory's contents.

### `/workspace/savi/.gitignore` (old name: savi)

Each rule, what it excludes, and how it relates to the build and README:

| Rule | What it excludes | Why it is kept out of publication |
| --- | --- | --- |
| `node_modules/` | Installed npm packages. The directory does not exist today. | `package.json` declares no dependencies. The build excludes the directory name `node_modules`. The README says "No npm packages are required." |
| `site/` | The generated site. | It is build output. The build deletes and recreates `site/`, and excludes the directory name `site` from the walk. |
| `.playwriter/` | Local browser state (see above). | Excluded by name in the build. It is not part of the repository content. |
| `runs/` | A `runs/` directory with 31 entries. Its contents were not read. | Excluded by name in the build. The sources do not state the purpose of `runs/`. |
| `.spawn/engine/.git/` | Git metadata of a nested engine repository. It is not present on disk. | The build excludes any directory named `.git`. |
| `.spawn/reference/http/raw/` | 33 raw HTTP captures. | Withheld by the build (`withheldPrefixes`), refused by the check script's excluded list, and skipped by `endpoints.mjs`. The sources do not state the reason. |
| `.DS_Store` | macOS Finder metadata. | Not git content. The build does not exclude it, so a local copy would be published. |
| `sources/` | 69 files (`.txt`) of source material. | Excluded by name in the build, excluded by prefix in the check script, and skipped by `endpoints.mjs`. The sources do not state the reason. |

Cross-check against the build and README:

- The README says "Some files are not published and are left out of the build." It does not list them. The build and check scripts are the authoritative list.
- The build excludes `.git`, `.playwriter`, `runs`, `site`, `node_modules`, and `sources` by directory name, and withholds three path prefixes: `.spawn/reference/http/raw/`, `spawn-evidence/data/`, and `spawn-evidence/maps/witness/`.
- `spawn-evidence/` is a top-level directory with 114 files. It is tracked by git (114 tracked files under that prefix). Its `data/` (21 files) and `maps/witness/` (23 files) subtrees are withheld by the build, but `.gitignore` does not list them. This means they are committed, not ignored, and still withheld from the site. The remaining `spawn-evidence/` files (`FINDINGS.md`, `README.md`, `maps/` top-level files such as `spawn-root-worlds-map.md` and `glb-urls-all.tsv`, and `probe-scripts/`) are published.
- The check script's excluded list names `.spawn/reference/http/raw/`, `sources/`, and `WITHHELD.json`. The file `WITHHELD.json` does not exist, and the check does not name `spawn-evidence/data/` or `spawn-evidence/maps/witness/`, so the check would not catch those prefixes leaking.
- The README says "Every committed file is shown as exact text, or as a hex dump when binary". That is true only for files that are not withheld. The build walks the working tree and does not read `.gitignore`.

Summary of what is excluded from publication and why:

- Not published: `.git`, `.playwriter/`, `runs/`, `site/`, `node_modules/`, `sources/`, `.spawn/reference/http/raw/`, `spawn-evidence/data/`, `spawn-evidence/maps/witness/`. Each of these is either generated, local state, or withheld content per the build script.
- Gitignored rules that do not stop publication: `.DS_Store`, if a copy exists on disk, is published because the build does not apply `.gitignore`.
- Published although not gitignored: `.spawn/engine/`, `.spawn/kernel/`, `.spawn/visual/`, the rest of `.spawn/reference/`, `spawn-evidence/` (excluding the two withheld subtrees), `.claude/` if populated, and all scripts and documentation outside the excluded set.

## Decisions

- The playwriter gate keeps the browser idle timeout at 300000 ms and shuts the browser down when no leases remain. This is visible in `/workspace/savi/.playwriter/gate.log` (old name: savi) and is the observed behaviour.
- Browser profile, logs and port files live inside the checkout under `.playwriter/`, not elsewhere on the machine, and are excluded from both git and the build by name.
- The build withholds three path prefixes by explicit list, and the check script repeats one of them (`.spawn/reference/http/raw/`) in its own list. The gitignore rule for `.spawn/reference/http/raw/` matches the build.
- The engine's nested git metadata is ignored by path (`.spawn/engine/.git/`) and also by the build's directory-name exclusion of `.git`.
- The reference material under `.spawn/reference/` is committed (563 of 596 files are tracked) and only its `http/raw/` subtree is ignored, so the rest of the reference set is published.

## Open gaps

- The reasons for withholding `.spawn/reference/http/raw/`, `spawn-evidence/data/`, `spawn-evidence/maps/witness/`, and `sources/` are not recorded in the sources. Source: `/workspace/savi/scripts/build-manual.mjs` (old name: savi) and `/workspace/savi/.gitignore` (old name: savi).
- `spawn-evidence/data/` and `spawn-evidence/maps/witness/` are withheld by the build but not gitignored, and they are tracked in git. Source: `/workspace/savi/.gitignore` (old name: savi) and `/workspace/savi/scripts/build-manual.mjs` (old name: savi).
- The check script's excluded list names `WITHHELD.json`, which does not exist, and does not name `spawn-evidence/` withheld prefixes. Source: `/workspace/savi/scripts/check-manual.mjs` (old name: savi).
- `.spawn/engine/keys.py` and `.spawn/engine/probe.sh` are published as text. Their contents were not read, so their sensitivity is unknown. Source: `/workspace/savi/.spawn/engine/` (old name: savi, old name: spawn).
- The `runs/` directory (31 entries) is gitignored and excluded from the build, and its purpose is not recorded in the sources. Source: `/workspace/savi/.gitignore` (old name: savi).
- The `kernel/` module (28,968,772 bytes) and the five PNGs under `visual/` are published by the build (text and hex dump respectively), which the README does not mention. Source: `/workspace/savi/scripts/build-manual.mjs` (old name: savi) and `/workspace/savi/README.md` (old name: savi).
- The purpose of the `.DS_Store` rule is not recorded in the sources. The build does not apply it. Source: `/workspace/savi/.gitignore` (old name: savi).
- The `.claude/` directory is not excluded by the build, and the sources do not say whether it is meant to hold anything. Source: `/workspace/savi/scripts/build-manual.mjs` (old name: savi).
- `browser.log` reports "No usable sandbox" on each Chromium start, and the sources do not record a resolution. Source: `/workspace/savi/.playwriter/browser.log` (old name: savi).

## Sources

- /workspace/savi/.spawn/agent-interface.md (old name: savi, old name: spawn)
- /workspace/savi/.spawn/engine/ (old name: savi, old name: spawn)
- /workspace/savi/.spawn/kernel/engine-client-runtime-worker.2792ef38e4f49eacedf6dd47091dc173fd2cd665de3b1cf1395654985e29b510.mjs (old name: savi, old name: spawn)
- /workspace/savi/.spawn/kernel/mantle-core.cedc1a4a242dce3143f075fe3dc65da79c6a1cf425cbd16db602450be8fd3ec7.wasm (old name: savi, old name: spawn)
- /workspace/savi/.spawn/reference/ (old name: savi, old name: spawn)
- /workspace/savi/.spawn/reference/http/raw/ (old name: savi, old name: spawn)
- /workspace/savi/.spawn/visual/ (old name: savi, old name: spawn)
- /workspace/savi/.claude/ (old name: savi)
- /workspace/savi/.playwriter/port (old name: savi)
- /workspace/savi/.playwriter/debug-port (old name: savi)
- /workspace/savi/.playwriter/gate.log (old name: savi)
- /workspace/savi/.playwriter/browser.log (old name: savi)
- /workspace/savi/.playwriter/browser-profile/ (old name: savi)
- /workspace/savi/.gitignore (old name: savi)
- /workspace/savi/README.md (old name: savi)
- /workspace/savi/scripts/build-manual.mjs (old name: savi)
- /workspace/savi/scripts/check-manual.mjs (old name: savi)
- /workspace/savi/scripts/endpoints.mjs (old name: savi)
- /workspace/savi/spawn-evidence/ (old name: savi, old name: spawn)
- /workspace/savi/sources/ (old name: savi)
- /workspace/savi/runs/ (old name: savi)

Related page: [CI workflows](ci-workflows.md)
