# Bevy gaps: game-16 checker, the `world` CLI, the sibling feature matrix, and the game-16 corpus

This note documents four undocumented items in the bevy repository at `/workspace/bevy`: the checker script, the `world` subcommand of `bevy-jayzee`, the sibling `FEATURE_MATRIX.md`, and the local corpus at `/workspace/extra/game-16`. Statements are limited to what was read in the source files and the corpus. Items that could not be confirmed are listed under Open questions.

## 1. The checker: `scripts/check-game16-api.cjs`

### Purpose

The checker is the executable witness for the game-16 API matrix (`GAME16_API_MATRIX.md`). It runs the real binary against the real corpus, and it checks that every `ctx.*` token written in the corpus is available in the runtime.

### Inputs

| Input | Source | Default |
|---|---|---|
| Corpus root | argument 1 | `/workspace/extra/game-16` |
| Binary | argument 2 | `<repo>/target/debug/bevy-jayzee`, where `<repo>` is the parent of the `scripts` directory |
| Places | fixed in the script | `hall` and `main` |
| Tick count | fixed in the script | `120` |

The checker does not build the binary. If the binary is missing, the spawned process fails and the checker records a non-zero or null status for that place.

### What it runs

1. It walks the corpus recursively, skipping any `.git` directory. For each file whose name ends in `.js`, `.yaml`, `.yml`, `.json` or `.md`, it collects every match of the pattern `ctx` followed by one or more dotted identifiers. The result is a set of usage tokens such as `ctx.place.state`.
2. For each place in the fixed list, it runs `bevy-jayzee world <corpus> <place> 120` and reads stdout line by line. It keeps the last line whose `kind` is `game16-report` and the line whose `kind` is `script-stats`. Non-JSON lines are ignored.
3. It builds an allowed set. The top-level names of `ctx` keys reported by the hall place (`ctxKeys` in its report) are added as `ctx.<key>`. A fixed list of about 50 further names is also added, including callback parameter names such as `x`, `y`, `z`, `atlas`, `tile` and `scatter`.
4. A usage token is reported as missing when its first segment after `ctx.` is not in the allowed set.
5. It prints one JSON summary object to stdout, with the key `kind` set to `game16-api-check`, and exits.

### Failure conditions and exit codes

The checker sets its failure flag, and exits with status 1, when any of the following holds for either place:

| Condition | Detail |
|---|---|
| The world run exits with a non-zero status, or the status is null | A null status (for example, when the binary cannot be spawned) counts as a failure. |
| No `game16-report` line was found | The report is missing. |
| `report.errors` is not 0 | Script error count from the world report. |
| `report.missingApiCount` is not 0 | Count of `ctx.*` tokens without a classification. |
| `scriptStats.errors` is not 0 | Error count from the `script-stats` line. |

It also fails when the corpus-wide list of unclassified usage tokens is not empty. Otherwise it exits with status 0.

### What it prints

A single pretty-printed JSON object with these keys: `kind`, `game`, `bin`, `usageCount`, `missingUsage`, `missingUsageCount`, `places` (per place: `exit`, `errors`, `scriptErrors`, `missingApiCount`, `missingApi`, `moduleCount`, `hostVerbs`, `hash`), and `ok`. The `ok` value is the inverse of the failure flag.

### Observations

- The summary does not include the captured stderr of each run, although the script stores it. A failing run therefore shows only its exit status and not the error text.
- The allow list of about 50 fixed names is hard-coded in the script. Any token whose first segment is on that list passes the usage check, whatever its meaning in the runtime. The matrix describes these names as documented callback parameters that are not top-level context keys.
- The check on `missingApi` is made through `missingApiCount`, not through the `missingApi` array itself. The two are equal in the report, so this does not change the outcome.
- The places and tick count are not configurable from the command line.

## 2. The `world` subcommand of `bevy-jayzee`

### Arguments

The argument list is positional. It is read in `/workspace/bevy/src/main.rs`.

| Position | Name | Default when absent | Notes |
|---|---|---|---|
| 1 | `root` (directory) | `.` | Directory holding `world.config.yaml`. |
| 2 | `place` | The `defaultPlace` from `world.config.yaml`, otherwise the first place in name order | Name of a directory under `places/`. |
| 3 | `ticks` | `120` | Parsed as an unsigned integer. A value that does not parse falls back to `120` without an error. |

The usage line printed on an unknown subcommand is `world <dir> [place] [ticks]`. The place argument is therefore optional in the usage text, but a ticks value cannot be given without a place, because ticks is read from position 3 only.

### What it does

`main.rs` calls `world::run(directory, place, ticks)` in `/workspace/bevy/src/world.rs`. That function loads the tree with `WorldTree::load` in `/workspace/bevy/src/tree.rs`, resolves the place name, builds the Bevy app for that place, advances it by the requested number of fixed steps, and writes the reports as JSON lines to stdout. If `run` returns an error, the error text goes to stderr and the process exits with status 1. An unknown subcommand exits with status 2.

### Output

Each line on stdout is a JSON object with a `kind` field. The lines are emitted in this order by `world.rs`:

| Kind | Content |
|---|---|
| `world` | Place name, object, body, behavior, model, scripted, light, collider and compound counts, tick count, and a `hash` in the form `0x` followed by eight hex digits. The hash is a fold over the entity positions and names. |
| `world-camera` | Camera position, only when a row named `camera` exists. |
| `world-bodies` | Up to four sample rows of the form name and position. |
| `world-colliders` | Up to four sample positions of child colliders. |
| `script-stats` | The statistics object from the script runtime, which includes an `errors` count. |
| `globe-report` | Globe state report. |
| `feature-report` | Native feature state, with the `ecs` and `globe` sections merged in. |
| `game16-report` | Report consumed by the checker. Fields are described in `GAME16_API_MATRIX.md`. This line is always last among the reports. |

The script runtime in `/workspace/bevy/src/script/mod.rs` can also write `script-engine-error`, `script-tick-error` and `jayzee-error` lines during the run. These are not listed in the matrix.

### Observations

- The `world` subcommand is the only input the checker uses for its report. The `viewer`, `web`, `gltf-check`, `bench`, `det`, `server` and `client` subcommands are outside this note.
- The argument parser uses the same `number` closure for `bench`, `det` and `world`, so a non-numeric ticks value is silently replaced by the fallback.

## 3. `FEATURE_MATRIX.md` and its relation to the game-16 matrix

`/workspace/bevy/FEATURE_MATRIX.md` is a documentation-row coverage table. Its authoritative source is the set of Markdown files at `/workspace/extra/.local/docs/*.md` together with the decoded HTML renderings under `/workspace/extra/site/docs/*.html`. The file records that the Markdown stubs are empty apart from `00-opening.md`, so the HTML renderings are the working text.

Its scope is 67 in-scope rows. It states that 67 of 67 rows are implemented or verified after the latest increment, and that hosted, account, auth, chat, notification, feed, CDN, metrics and product-naming parts are excluded by the owner. Each row maps a source document to a native module, a verification witness and a status.

The two matrices answer different questions:

| Matrix | Claim | Evidence |
|---|---|---|
| `FEATURE_MATRIX.md` | A documented feature has a native implementation or a documented local subset. | Spec tests and feature audits, including the game-16 hall run listed as one witness. |
| `GAME16_API_MATRIX.md` | Every `ctx.*` token in the game-16 corpus resolves to a real key, a Bevy-backed proxy field, a typed resource or a labelled local shim, and both places run 120 ticks with no script errors. | `game16-report` and the checker. |

`FEATURE_MATRIX.md` itself says that a row can be covered while an executable field is still missing, and that the game-16 matrix is needed to show executable parity. The game-16 matrix is the stronger claim.

## 4. The local corpus at `/workspace/extra/game-16`

### Contents

The corpus is a game project of about 1.4 MB excluding `.git`, with 44 files outside `.git`. It is a git repository whose head is commit `3eb8aeb` ("edited architecture"). At the time of reading, the working tree had many modified files, including `places/hall/config.yaml`, `places/main/config.yaml`, `scripts/architecture.json` and `AGENTS.md`. Results from the checker depend on this working-tree state, not on the commit.

Top-level entries:

| Entry | Role |
|---|---|
| `world.config.yaml` | World-level config. Sets `defaultPlace: main`, the camera template, the player template, inputs, a UI render script and a nametag file. Required by bevy. |
| `places/` | Place directories. Two are present: `hall` and `main`. |
| `scripts/` | JavaScript behaviour files, including the hall scripts (`hall-camera.js`, `hall-floor.js`, `hall-locomotion.js`, `hall-player.js`, `hall-plinths.js`, `hall-policy.js`), a world-level `ui.js`, and large documentation-data modules (`docs-*.js`). It also has `architecture.json`. |
| `templates/` | Camera and player templates referenced from the world config. |
| `ui/` | Nametag and UI sources. |
| `spawn6/`, `.spawn/` | Further project directories not read by bevy as far as this note establishes. |
| `AGENTS.md`, `CLAUDE.md`, `sim.js`, `.gitignore` | Project notes and a stub world program with a `tick` function and a `cadence` of `1s`. |

### The two places

| Place | What is in the directory | What the config sets |
|---|---|---|
| `places/hall` | `config.yaml`, `ui.js`, and `cells/x0z0.scene` (about 49 KB). | Mode `3d`, gravity downward, terrain off, a default spawn point, a `policy` pointing at `scripts/hall-policy.js` for arrival and departure, a custom orbit camera, inputs (jump, two movement axes, zoom), a UI render file, a gradient sky, fixed time of day, sun, hemisphere light and linear fog. The header comments describe it as an animation hall where library clips play on figures. |
| `places/main` | `config.yaml` only, in the listing read here. | Mode `ui`, no gravity, terrain off, a black colour sky, a look script `scripts/look-default.js`, and a default spawn at the origin. The config says the HTML screen is the whole game and the engine draws no 3D graphics. |

### What bevy reads from the corpus

The tree loader in `/workspace/bevy/src/tree.rs` reads:

1. `world.config.yaml` at the root. A missing or unparsable file is an error.
2. Every immediate subdirectory of `places/`, in name order. For each one it reads `config.yaml` when present, and otherwise uses defaults.
3. Every file ending in `.scene` in each place's `cells/` directory, in name order. Each scene file is YAML whose top-level keys are object identifiers. Lines starting with `#` are removed before parsing. An empty scene file yields no objects.
4. An optional `objects.scene` file in each place directory.

Each object without an explicit place is assigned to the place it was loaded from.

Beyond these files, the world config and place config name scripts, templates, UI files and the camera file by relative path. The world run reads those through the script runtime. This note does not establish the exact resolution rule for those paths, and it does not trace each reference.

The checker also reads every `.js`, `.yaml`, `.yml`, `.json` and `.md` file in the corpus, not only the files bevy loads, because its `ctx.*` scan is a text scan of the whole tree.

## Open questions

- The `world` usage text marks `place` as optional, but a ticks value at position 3 cannot be reached without a place at position 2. Whether an explicit empty place argument is accepted was not tested.
- The checker's failure path when the binary is missing was inferred from the spawn logic, not run.
- The place `main` may have more files than the two entries reported by the `ls -la` listing, which showed two filtered entries. The complete contents of `places/main` were not listed.
- How bevy resolves the relative script, template and UI paths in the world and place configs was not traced.
- The `FEATURE_MATRIX.md` figures (67 rows, 67 covered) and the source paths under `/workspace/extra/.local/docs` and `/workspace/extra/site/docs` were taken from the matrix text. The existence of those paths was not checked here.
- The corpus working tree has many uncommitted modifications. Whether the checker passes on the committed head was not tested.
- The `world` output fields for the `world` line were described from the format string. The hash algorithm was not verified against a reference value.
