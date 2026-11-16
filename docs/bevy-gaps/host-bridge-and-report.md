# Host bridge (__make, __host) and the game16-report record

Scope: the JavaScript prelude host bridge and the Rust report code in the bevy checkout at /workspace/bevy. Source files cited below:

- /workspace/bevy/src/script/prelude.js
- /workspace/bevy/src/script/mod.rs
- /workspace/bevy/src/world.rs
- /workspace/bevy/src/globe.rs
- /workspace/bevy/scripts/check-game16-api.cjs

## 1. The host bridge layers

Three layers are involved, and the report counts only one of them.

| Layer | Where | Role |
|---|---|---|
| Rust bridge globals (`__get_json`, `__set_json`, `__has`, `__keys_json`, `__del`, `__children_json`, and the others listed in `install_bridge_names`) | installed in Rust, listed in `install_bridge_names()` in /workspace/bevy/src/script/mod.rs | Raw globals the prelude calls. Not counted in `hostCalls`. Each appears in the report as `bridge.<name>` in `hostVerbs` and `provenance`. |
| `globalThis.__host(op, json)` | Rust dispatcher `host_op` in /workspace/bevy/src/script/mod.rs | Feature verbs (raycast, physicsWorldStep, globeInfo, fileRead, and so on). Each is routed to a Rust handler by name. |
| `__host` (JS wrapper) | /workspace/bevy/src/script/prelude.js, top of file | Wraps the raw `globalThis.__host`. Before every non-`apiCall` op it first sends `globalThis.__host('apiCall', {op})`, then sends the real op and parses the returned text as JSON (empty text yields `undefined`). |

## 2. `__make(path)` (prelude.js)

`__make` is defined at /workspace/bevy/src/script/prelude.js around line 129. It is a path-keyed factory that returns a JavaScript `Proxy` over a remote state store. It does not perform feature calls itself.

- The `path` argument is a namespaced string such as `world`, `camera`, `place:<name>:state`, `fields:<name>`, `state:<id>`, `session:<id>`, `anim:<id>`, `view:<id>`, or `obj:<id>`. The `__make` callers in the prelude are the source of these names.
- `get` on the proxy reads through `__get_json(path, key)`, `set` writes through `__set_json(path, key, json)`, `deleteProperty` calls `__del`, `has` calls `__has`, and `ownKeys` calls `__keys_json`. These are the Rust bridge globals in section 1, not `__host` ops, so they are not added to `hostCalls`.
- Some `get` branches return other `__make` proxies (for example `world.state` returns `__make('world:state')`, `world.camera` returns `__make('camera')`, `world.ui` returns a local object synchronised with `__set_json`). A few branches call `__host` directly. Examples in the code are `cameraJson` for `world.camera` reads of `forward`, `fov`, `aspect`, and `insetRight`, and `setJoint` and `setRagdoll` for object joint and ragdoll writes.
- `__make_ctx(selfId, placeName)` at around line 1222 builds the per-object `ctx` for script handlers from `__make` proxies (`obj:`, `place:`, `world`, `session:`). Its top-level keys are the `ctxKeys` that the report reads (section 4).

I read only the `world`, `camera`, `fields:` branches and the call sites listed above. The remaining branches of `__make` were not read in full, so this section does not claim to list every path.

## 3. `__host(op, payload)` call counting

- The Rust side counts calls in `host_op` (/workspace/bevy/src/script/mod.rs, around line 1355). When `op == "apiCall"`, the payload's `op` name is incremented in `host_calls` (a `BTreeMap<String, u64>`), and the first sighting records a provenance string from `host_provenance(name)` into `api_provenance`. The `apiCall` branch returns an empty string and does no other work.
- The JS wrapper sends `apiCall` once per feature call, before the real op. So `hostCalls[op]` is the number of times the prelude invoked `__host` for `op`, including calls that later returned `undefined` or failed. It counts invocations, not successful results.
- Ops reached through `globalThis.__host` without the JS wrapper are not counted. Checked on 2026-11-16: no code does that. In `/workspace/bevy/src` the only `globalThis.__host` references are the two lines of the wrapper (`prelude.js` 17 and 18), and no game-16 script calls it. The wrapper is the only path, and it always sends `apiCall` first.
- `host_provenance(op)` (/workspace/bevy/src/script/mod.rs, around line 2396) maps an op name to one of these labels: `Bevy ECS world query/state`, `native FeatureState`, `typed Bevy ECS resource`, `Bevy ECS spherical procedural world`, `local filesystem shim` (fileRead, fileWrite, fileDelete, fileList), `deterministic local shim` (commit, now), or `prelude local shim` for anything not listed.

## 4. The `game16-report` record

### 4.1 Emission

`world.rs` (/workspace/bevy/src/world.rs, around lines 891 to 918) runs `ticks` world steps for a place and prints several JSON lines to stdout. Before the list below, it prints `world-camera` (only when a row named `camera` exists), `world`, `world-bodies` and `world-colliders`. Between the first and second items below it prints `globe-report`, with a `globe` entry. The lines in the list are:

1. `{"kind":"script-stats", ...}` from `crate::script::stats()`. Its `errors` value is passed on as the script error count.
2. `{"kind":"feature-report", "features": ...}`. This is a different record. Its `features` object is the `FeatureState` report with an `ecs` entry (from `crate::features_ecs::entity_report`) and a `globe` entry added to it.
3. `{"kind":"game16-report", "report": ...}` from `crate::script::game16_report(root, place, ticks, script_errors, hash)`. Here `hash` is formatted as `0x%08x`.

The check script reads only the `game16-report` and `script-stats` lines (section 5).

### 4.2 Fields

`game16_report` (/workspace/bevy/src/script/mod.rs, around line 2558) builds the record. It calls `api_report()` (around line 2408) and `game16_api_paths(root)` (around line 2515) and combines them.

| Field | Meaning | How it is computed |
|---|---|---|
| `root` | Game directory that was scanned. | The `root` argument, displayed as a string. |
| `place` | Place name run for this record. | The `place` argument. |
| `ticks` | Number of world steps run. | The `ticks` argument. The check script passes `120`. |
| `errors` | Script error count for the run. | The `errors` argument, which comes from `script-stats.errors` in `world.rs`. It is not the `errors` value that `api_report` builds. |
| `hash` | Hash of the run state, shown as hex. | Formatted in `world.rs` as `0x` plus 8 hex digits. |
| `ctxPaths` | Number of distinct `ctx.` access paths found in the game source. | Size of the set returned by `game16_api_paths`. |
| `missingApi` | Sorted list of `ctx.` paths whose top-level key the runtime does not provide. | Set of paths from `game16_api_paths` whose first segment after `ctx.` is not in `ctxKeys` and not in `game16_dynamic_paths()`. |
| `missingApiCount` | Length of `missingApi`. | Count of the set above. |
| `modules` | Names of script modules that loaded. | `api_report().modules`, from the host script table where the entry is present. |
| `moduleCount` | Number of entries in `modules`. | Length of that array. |
| `hostVerbs` | Names of host verbs known to the run. | Sorted union of the keys of `host_calls` (feature verbs actually invoked) and the static `bridge.<name>` entries from `install_bridge_names()`. This is a set of names; it does not carry counts. |
| `hostCalls` | Invocation counts per feature verb. | `api_report().hostCalls`, the `host_calls` map from section 3. Verbs never invoked do not appear here, though they can appear in `hostVerbs` if they are bridge names. |
| `ctxKeys` | Top-level keys of the `ctx` object the runtime builds. | `prelude_ctx_keys()` in mod.rs. It reads the text of `prelude.js` after `const ctx = {` in `function __make_ctx`, up to the first `  };` line, takes each line's key (up to `:` or `,`), and keeps keys made only of letters, digits, `_` and `$`. This is parsed from source text, not read from the live object. |
| `provenance` | Map from a name to the mechanism that serves it. | Built in `api_report`. It starts from the `api_provenance` map (host verb name to `host_provenance` label), then adds `ctx.<key>` for each ctx key with `ctx_provenance(key)`, then `bridge.<name>` with the label `rquickjs global bridge`, then the entries from `crate::globe::provenance()` (globe.rs, around line 512). Existing entries are not overwritten. |
| `ecs` | Count of provenance entries whose label contains the text `Bevy ECS`. | Computed in `game16_report` by counting `provenance` values that contain `Bevy ECS`. This is a count, not a list. It is unrelated to the `ecs` entry inside the `feature-report` record. |
| `globe` | Globe summary. | `GlobeWorld::default().report(&GlobeSummary::default())`. The value is built from defaults in `game16_report`, not from the running world. |

### 4.3 How `missingApi` is determined

`game16_api_paths(root)` walks every file under `root` (skipping `.git` directories). It reads only files with extensions `js`, `yaml`, `yml`, `json` and `md`. On each line it finds every occurrence of `ctx.` and reads the following run of letters, digits, `_`, `$` and `.`. A trailing `.` is removed. Matches are stored in a sorted set, so the same path is counted once.

A path is reported missing when it starts with `ctx.`, its first segment is absent from `ctxKeys`, and that segment is absent from `game16_dynamic_paths()` (mod.rs, around line 2593). The dynamic list covers names the runtime resolves in ways the prelude key scan cannot see, such as room, terrain and sprite field names.

### 4.4 Relation to the check script

`check-game16-api.cjs` (/workspace/bevy/scripts/check-game16-api.cjs) runs `bin world <game> <place> 120` for each place and reads the `game16-report` and `script-stats` lines. It fails when any place has a non-zero exit, a missing report, `report.errors !== 0`, `report.missingApiCount !== 0`, `scriptStats.errors !== 0`, or `missingUsage` is non-empty. It also builds its own `usage` set and compares it with the `ctxKeys` from the `hall` place plus its own hard-coded list. The summary it prints includes per-place `errors`, `scriptErrors`, `missingApiCount`, `missingApi`, `moduleCount`, `hostVerbs` and `hash`. It omits `hostCalls`, `provenance` and `ecs`.

## 5. Flags and unclear points

- Two dynamic-name lists disagree. `game16_dynamic_paths()` in mod.rs includes `slice`, `terrainBackdrop`, `vegetation` and `getTerrainNormal`, which the check script's list does not. The check script also includes `day` and `field`, which the Rust list lacks. The code does not say whether the two lists are meant to match. The two checks can therefore give different answers for the same game.
- `game16_report` uses the `errors` argument for its `errors` field, while `api_report()` also returns an `errors` value taken from `host.errors`. The report does not use the latter. The purpose of that field in `api_report` is not stated in the code.
- `hostCalls` counts invocations, not results, and it depends on the JS wrapper emitting `apiCall`. Checked on 2026-11-16: no code path calls `globalThis.__host` except the wrapper (see section 3).
- The `ecs` field in `game16-report` is a count of provenance labels, while the `ecs` field in `feature-report` comes from `entity_report`. The two names are easy to confuse. The code does not state which one a reader should use.
- `globe` in `game16-report` is built from default values, so it does not describe the globe state of the run. This is what the code does, but it is not obvious from the field name.
- `ctxKeys` is parsed from prelude source text by line scanning. A key written across lines, or a key placed outside the `const ctx = {` block, would be missed. No such case was found in the read code.
- `provenance` labels for keys not matched in `ctx_provenance` or `host_provenance` fall back to `prelude local shim`. Those labels are a default and do not confirm the mechanism.
- The branches of `__make` that were not read in full are listed in section 2 as unverified.
