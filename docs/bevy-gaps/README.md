# Bevy gaps against the extra documentation

This folder lists the engine features that the extra documentation describes and that bevy, at commit `d4c407c` in `/workspace/bevy`, does not implement or implements only in part. Bevy was read only, never edited. Checked on 2026-11-22.

## Files

- [missing.tsv](missing.tsv): one row per missing or partial feature. Columns: `id`, `area`, `feature`, `documented_in` (wiki path and line, then other places that document the same feature), `bevy_status` (`missing` or `partial`), `evidence` (the bevy path read, or `absent: searched <what>`), `size` (S, M or L), `depends_on`, `bevy_matrix_row` (the `n` of the row in `/workspace/bevy/docs/parity-matrix.tsv`, or `none`).
- [checker-cli-and-corpus.md](checker-cli-and-corpus.md): the game-16 checker, the `world` subcommand and `FEATURE_MATRIX.md`.
- [ctx-and-terrain.md](ctx-and-terrain.md): the ctx shims, `ctx.self.anim` and terrain height.
- [host-bridge-and-report.md](host-bridge-and-report.md): `__make`, `__host` and the `game16-report` record.

## Re-check on 2026-11-23: all 269 rows read against bevy source

Every row was re-verified by reading the cited file and searching for the symbol in bevy at `origin/main` (`270be5a`), not by the matrix text. The result is [missing-recheck-2026-11-23.tsv](missing-recheck-2026-11-23.tsv); `missing.tsv` itself is unchanged. Each row has a status, a file and line, the basis, what is still missing, whether the 2026-11-22 evidence was wrong, any new gap, and whether the code is compiled into the binary.

| Result | Rows |
|---|---|
| closed | 2 (gap-130 grass, gap-238 PlanetFrame; both were implemented before the list was written) |
| test-only port | 16: the logic exists but sits in a `#[cfg(test)]` module, so the binary does not contain it |
| partly closed | 55 |
| still open | 196 |
| evidence wrong on 2026-11-22 | 46 (17 in the first re-check, 29 in this one) |
| rows with a new sub-gap | 21 |

Bevy's planet stage 4 closed none of the 269 rows. The 46 wrong rows came from two causes: matrix cause text that named removed code (`src/vegetation.rs`, `sync_chunks`), and searches that used one naming style only (snake_case or camelCase).

### Test-only modules

`src/main.rs` declares 42 modules with `#[cfg(test)] mod`, including `character`, `camera_rig`, `hitscan`, `flight_model`, `fire_terrain`, `game_rules`, `hud`, `hud_overlay`, `terrain_marks`, `field_paint`, `brush_stroke`, `chart_anchor`, `chart_reanchor_service`, `world_name`, `terrain_config` and `baked_field_load`. They compile in `cargo test` only. `camera_rig`, `flight_model` and `fire_terrain` have no caller outside their own tests. A row whose only implemented part is in such a module is marked `test-only port` and counts as open. The same applies to the list of 144 implemented features below: 10 of them cite only test-only modules (for example the character controller, hitscan and the flight model), so they are implemented in tests, not in the game.

### Corrected counts per stage

Stages as in `specs/bevy-extra-gaps.md`. Open means not closed. Points weigh a row as S 1, M 3, L 8.

| Stage | Areas | Rows | Closed | Test-only port | Partly closed | Still open | Open rows by size (S/M/L) | Points |
|---|---|---|---|---|---|---|---|---|
| 1 | scripting, world-format, objects, player, input, camera | 51 | 0 | 2 | 5 | 44 | 24/16/11 | 160 |
| 2 | physics, terrain, animation, gameplay | 50 | 1 | 8 | 13 | 28 | 17/19/13 | 178 |
| 3 | rendering, assets, audio | 82 | 1 | 3 | 19 | 59 | 47/23/11 | 204 |
| 4 | netcode | 31 | 0 | 1 | 7 | 23 | 11/12/8 | 111 |
| 5 | ui, editor, tooling, content, ai, xr | 19 | 0 | 1 | 2 | 16 | 7/7/5 | 68 |
| 6 | services, social, economy, identity, platform | 36 | 0 | 1 | 9 | 26 | 15/14/7 | 113 |
| All | | 269 | 2 | 16 | 55 | 196 | 121/91/55 | 834 |

### What unblocks the most open rows

Counted from `depends_on` over the 267 open rows. The column is free text, and 74 rows record no prerequisite, so these counts are a guide and not a proof.

| Prerequisite | Open rows that name it |
|---|---|
| Rendering pipeline (render graph, materials, sky, LOD, impostors) | 68 |
| Netcode (lightyear, snapshots, rooms, prediction) | 54 |
| Scripting host (`src/script`; prelude shims that return a fixed value) | 26 |
| Physics (avian, joints, character controller) | 8 |
| Terrain and planet frame | 5 |
| Identity, accounts, hosted services | 5 |
| Skeletal animation, audio playback, camera rig and input | 4 each |
| World format (spec, tree, place config) | 3 |

### Proposed stage order for bevy

0. **Wire the 16 test-only ports** into the binary (13 modules, 3 S, 6 M and 4 L, see [stage0-wiring.tsv](stage0-wiring.tsv); the code and its tests exist): game_rules, character, hitscan, fire_terrain, fire_stage_map, baked_field_load, world_name, terrain_mesh_surface, terrain_grid_sample, hud, hud_overlay, chart_reanchor_service and camera_rig, the modules named in the 16 `test-only port` rows of the TSV. It turns code bevy already has into rows the game can reach, and several later rows depend on it. 16 rows, about 53 points.
1. **Script surface (stage 1, 51 rows, 160 points).** It stays first: games load against it, the scripting-host prerequisite names 26 open rows, and it includes the `onSpawn` hook (S). Take its 24 S rows first.
2. **Rendering, assets and audio (stage 3, 81 open rows, 204 points).** It moves ahead of simulation because the rendering prerequisite is named by 68 open rows, including object, camera and atmosphere rows that stage 1 can only parse without it. Rows the planet parity spec already delivers are closed against that work.
3. **Simulation (stage 2, 49 open rows, 178 points).** Physics, terrain, animation and gameplay; the character controller from step 0 is its base.
4. **Netcode (stage 4, 31 rows, 111 points).** `src/server.rs` (76 lines) and `src/client.rs` (172) are a lightyear demo; 54 open rows name netcode as a prerequisite, so it is large and late.
5. **Interface and tools (stage 5, 19 rows, 68 points).**
6. **Services and platform (stage 6, 36 rows, 113 points).** Hosted features are decided one by one: built locally, built against a stub, or out of scope with the owner line cited.

The order differs from the spec in two places: a new step 0, and stage 3 before stage 2. Both are proposals for the dispatcher to decide.

## Stage 0: wiring the test-only ports

[stage0-wiring.tsv](stage0-wiring.tsv) is the work list for stage 0, read from bevy `origin/main` (`270be5a`). The 16 test-only rows resolve to 13 modules, because some rows cite two modules and some modules serve several rows; the `gap_rows` column lists them and all 16 appear. Each row gives the wave, the module, the exact `#[cfg(test)]` line in `src/main.rs` (the attribute line; the `mod` line is the next one), what wiring needs, the modules that must be un-gated with it, what it conflicts with in the binary, the dead-code risk, and a size.

| Wave | Modules | Size |
|---|---|---|
| 1 | hud, terrain_grid_sample, world_name | S, S, S |
| 2 | baked_field_load, camera_rig, fire_terrain, game_rules, hitscan, hud_overlay | M each |
| 3 | character, chart_reanchor_service, fire_stage_map, terrain_mesh_surface | L each |

Findings that apply to every module:

- Removing the attribute at `src/main.rs` is not enough. Each file declares an inner `mod tests` with no `#[cfg(test)]`, and several use `crate::testkit`, which is test-only (`src/main.rs:119-121`). Each inner test module needs its own gate, or the build breaks.
- There is no lint gate (no `[lints]` table in `Cargo.toml`, no `#![deny]`, no `-D warnings` in `.cargo`, `scripts` or `.github`). Un-gating gives unused-code warnings until something calls the module.
- No module has a caller in the binary yet. Un-gating alone delivers nothing: each needs a plugin, systems or a host op, and the `conflicts` column names the code it would sit beside.
- Modules outside the 16 are prerequisites: `lattice_surface` (for baked_field_load), `canonical_json` (for world_name), `chart_transfer` and `character` (for chart_reanchor_service), and a gate on `js_round` in `src/js_math.rs` (for terrain_grid_sample). `character` is one of the 16 and also a prerequisite of another.
- Four modules have no real implementation behind their interface in the binary: `character` needs a production avian shape-cast (only a test scene implements `CharacterSpace`), `fire_stage_map` needs real `FireKernel` and `FireLattice` (only test stubs), `hud_overlay` needs a producer of `HudInputs`, and `terrain_mesh_surface` has no consumer and uses `Rc`, so it cannot be a bevy `Resource` as written.
- Existing code in the binary that overlaps: `update_grounding` (`src/runtime.rs:282`) against `character`; three camera drivers (`src/runtime.rs:390`, `src/viewer.rs:367`, `src/globe.rs:469`) against `camera_rig`; the avian ray query (`src/script/mod.rs:1745`) against `hitscan`; the viewer text overlay (`src/viewer.rs:348`) against `hud`; `sample_field` (`src/planet_lod/collider.rs:58`) against `terrain_grid_sample`; `FloatingOrigin::rebase` (`src/planet_lod/origin.rs:23`) against `chart_reanchor_service`.

Sizes are 3 S, 6 M and 4 L (3 + 18 + 32 = 53 points at S 1, M 3, L 8), more than the 16 points estimated on 2026-11-23, because each module needs more than an un-gate.

## Re-check against origin/main c394fb9 (2026-11-23)

Bevy pushed 12 commits after `270be5a`: planet stage 4 timing (frame-time witness, idle sampling) and stage 5 pose captures (`src/planet_poses.rs`, `src/bench_host.rs`, the default launch in `src/main.rs`). Stage 0 is not yet in the binary: all 13 `#[cfg(test)] mod` lines in `src/main.rs` are unchanged.

The file-set scan found 16 rows that cite a changed file. Each was read against the code at `c394fb9`: [recheck-c394fb9.tsv](recheck-c394fb9.tsv). **No row changed status.** The new code is benchmark and census tooling, not script API, so the 16 rows stay as they were. Four rows cited lines that moved and are corrected in [missing-recheck-2026-11-23.tsv](missing-recheck-2026-11-23.tsv): gap-148 (the `settled` helper, now `bench_planet.rs:245`), gap-195 and gap-204 (the teleport clearance constant, now `planet_poses.rs:7`), and gap-240 (`FloatingOrigin` at `origin.rs:7`).

Stage 4 and stage 5 rows in the spec that these commits describe (timing, census poses, default launch) are not gap rows, so no row is closed by them. The spec's stage 4 is netcode and was untouched.

## What was compared

- Extra documentation: `wiki/README.md`, `wiki/toc.md`, every page in `wiki/jayzee`, `wiki/cleetus`, `wiki/index` and `wiki/reference-game-16`, the three notes above and `docs/PENDING_VALIDATION.md`.
- Bevy: `src`, `docs/PARITY_MATRIX.md`, `docs/parity-matrix.tsv`, `docs/RANKED_MISSING.tsv`, `docs/REMAINING_PARITY.md`, `docs/AGENT-INTERFACE.md`, the `docs/planet-*.md` files, `FEATURE_MATRIX.md` and `GAME16_API_MATRIX.md`.
- A gap that bevy already lists in `parity-matrix.tsv` carries that row id in `bevy_matrix_row` and is listed once. 169 of the 269 rows have a matrix row. Each matrix row id is owned by one row, the most specific feature that cites it. 24 coarser rows whose matrix ids were all owned elsewhere, and 7 rows that repeated a feature from another page, were folded in: their wiki references are kept in `documented_in`.
- Features that bevy marks `not applicable` in its matrix, or that `FEATURE_MATRIX.md` excludes by owner scope (hosted services, accounts, auth), are not listed as missing. They are named in the unchecked section below.

## Is game-16 in the list

The game-16 repository is not a source of rows, and the `wiki/reference-game-16` pages are. The reason:

- The `wiki/reference-game-16` pages are the captured engine reference documentation (starters, skills, engine, reference, shapes and the per-game pages). They document the engine API, so their features are compared, and they produce most of the ctx-level rows.
- The game-16 repository is one game, held for the owner because its remote is `git.spawn.co`. Bevy already runs it with `scripts/check-game16-api.cjs`, and that check reports 0 missing APIs. A game is not a feature list, so its files are not read for rows.
- Two game-16 facts do appear, because the documentation states them as engine behaviour: the `onSpawn` hook, which bevy calls only as `onJayzee` (`src/script/mod.rs:2800`, 0 matches for `onSpawn` in `src`), and the checker allowlist `game16_dynamic_paths` (`src/script/mod.rs:2543`), which counts names such as `groundY`, `slope`, `crossing` and `purchase` as present while this list finds them unimplemented. The checker result of 0 missing APIs therefore does not show those names work.

## Counts per area

Total: 269 rows, 194 missing and 75 partial. Sizes: 123 S, 91 M and 55 L.

| Area | Rows | Missing | Partial | S | M | L | With a matrix row |
|---|---|---|---|---|---|---|---|
| rendering | 66 | 54 | 12 | 41 | 17 | 8 | 51 |
| netcode | 31 | 26 | 5 | 11 | 12 | 8 | 28 |
| services | 25 | 21 | 4 | 13 | 7 | 5 | 23 |
| scripting | 23 | 8 | 15 | 11 | 5 | 7 | 10 |
| terrain | 17 | 10 | 7 | 7 | 8 | 2 | 10 |
| physics | 15 | 10 | 5 | 7 | 5 | 3 | 11 |
| assets | 13 | 10 | 3 | 7 | 5 | 1 | 10 |
| world-format | 12 | 7 | 5 | 6 | 3 | 3 | 2 |
| gameplay | 11 | 9 | 2 | 2 | 3 | 6 | 8 |
| objects | 10 | 8 | 2 | 2 | 7 | 1 | 0 |
| animation | 7 | 4 | 3 | 2 | 3 | 2 | 3 |
| tooling | 6 | 6 | 0 | 2 | 3 | 1 | 2 |
| ui | 6 | 6 | 0 | 4 | 2 | 0 | 2 |
| social | 5 | 4 | 1 | 2 | 1 | 2 | 1 |
| editor | 4 | 2 | 2 | 1 | 2 | 1 | 3 |
| audio | 3 | 2 | 1 | 0 | 1 | 2 | 0 |
| platform | 3 | 1 | 2 | 0 | 3 | 0 | 1 |
| player | 3 | 3 | 0 | 3 | 0 | 0 | 0 |
| camera | 2 | 1 | 1 | 1 | 1 | 0 | 1 |
| economy | 2 | 0 | 2 | 0 | 2 | 0 | 0 |
| ai | 1 | 1 | 0 | 0 | 0 | 1 | 1 |
| content | 1 | 0 | 1 | 0 | 0 | 1 | 1 |
| identity | 1 | 0 | 1 | 0 | 1 | 0 | 0 |
| input | 1 | 0 | 1 | 1 | 0 | 0 | 1 |
| xr | 1 | 1 | 0 | 0 | 0 | 1 | 0 |

## Documented features that bevy does implement

144 documented features were checked and found implemented, each with a bevy path and line. 10 of them cite only test-only modules (see the re-check section). By area: scripting 68, physics 17, terrain 16, world-format 7, rendering 6, objects 5, netcode 4, gameplay 3, camera 3, animation 2, platform 2, economy 2, ui 2, tooling 2, input 1, player 1, effects 1, services 1, audio 1. For the ctx and builtin names in `wiki/index` this check is at name level: the name is handled in bevy, and its behaviour was not compared with the hosted engine.

## Areas that unblock the most others

Counted from `depends_on` in `missing.tsv`:

1. Rendering pipeline: about 60 rows depend on it (bevy render pipeline, the native renderer in `src/render`, the render graph). Place atmosphere, materials, shader nodes, postfx and most primitive kinds sit behind it.
2. Netcode: about 50 rows depend on it (netcode in general, lightyear in `Cargo.toml:15`, the snapshot and wire protocol in matrix rows 499 to 520, rooms and interest management).
3. Scripting host (`src/script`): 14 rows. Most partial rows here are prelude shims that return a fixed value, so the host verbs behind them are the work.
4. Audio playback: no audio plays in bevy. Every sound, music, acoustics and `onSoundEnd` row depends on it.
5. Skeletal animation: there is no `AnimationPlayer`, so clip playback, mixer channels and bone or morph introspection wait on it.
6. Player identity and the planet frame: 4 and 3 rows.

## Other findings

- Bevy's matrix row 88 records the custom camera kind as present, but `src/camera_rig.rs:121` returns `custom-not-ported`. The gap is listed under camera.
- `src/spec.rs` parses sprite, room, jiggle, wisp, boxart, attachment, scatter, template, overrides, interpolation, visibleTo and collider2d, and nothing else in `src` uses them.
- The empty place argument fix has landed: `src/world.rs:72` returns `the place argument is empty; name a place or leave it out`. It is no longer a gap.

## Answered from bevy source (2026-11-24)

These questions from the unchecked list were answered by reading bevy at `origin/main` (`c394fb9`). Each answer names what was read; where only a name was found, the answer says so.

- **Builtin modules, 21 served against the owner's 23.** Bevy's prelude defines 23 builtin namespaces (`src/script/prelude.js`, the `__builtins.<name> =` assignments: authoring, ballistics, env, fx, globe, lighting, nav, noise, path, physics, planet, postfx, room_routing, spherical, spline, terrain, three, tsl, tween, vec, vibe, voxels, water). That matches the owner count of 23 by name. The 21 in the wiki is the jayzee-side served count. Bodies were not compared, and `tsl` and `postfx` are shims.
- **Replay file, magic v2 byte layout.** Bevy has no `.spointreplay` code: `git grep` for the file, magic and version finds only brush-stroke and biome-stroke replays (`src/brush_stroke.rs:64,97`). The "12 PASS" witness belongs to the jayzee build, not bevy. Still missing.
- **Replication scope and audience.** Bevy replicates with `Replicate::to_clients(NetworkTarget::All)` and `PredictionTarget::to_clients(NetworkTarget::All)` (`src/server.rs:29,45,46`). The scope wording itself is still unchecked, because the jayzee learnings 30 to 37 are in neither repo.
- **Postfx and vibe output.** Postfx builtins build descriptors (`src/script/prelude.js:1235`, `{ __postfx: ... }`), and `__postfx` appears in no Rust file, so no renderer applies them. Vibe has state and a snapshot (`src/features.rs:15,72,123,361`), and nothing in `src` plays audio.
- **ctx.crossing and ctx.device.hold.** The documented crossing rule (`wiki/reference-game-16/recapture-skills.md:1288`) is that an item enters another world only if its `admits()` decides, using the arrival place's policy, the world root's, or `visitorsCarry`. Bevy has none of `admits`, `visitorsCarry` or `returnDoor` (`git grep`: 0 hits). `ctx.crossing` is not defined on the ctx object; only `enterPlace` and cross move within a world (`src/script/mod.rs:2113,2188`). `ctx.device.hold` has no definition in the prelude. Both are still open.
- **Weather and clouds in the planet sky.** No `cloud`, `weather`, rain or snow symbol in `src/planet_sky`. Absent.
- **Trees, leaf sprays and meadow grass.** Grass and trees exist (`src/planet_veg/grass.rs`, `tree.rs`). No `meadow`, `leafSpray` or spray symbol in `src`. The documented leaf-spray and meadow API is absent; the grass and tree modules are present.
- **Player folder files** (`player.jsui`, `player.jsscripts`, `player.ymlscripts`, `player.jstemplates`). No loader for these names in `src` (`git grep`: 0 hits in `src/tree.rs` and `src/spec.rs`). Absent.
- **API reference sections 34 to 37.** Section 34 (ctx.player on a camera rig alone): no symbol joins player and camera rig in `src`, so absent. Section 36 (ctx.self.state compat spellings): a keyed proxy and whole-object replace are in the prelude (`src/script/prelude.js:216,254`), so present. Section 37 (ctx.self.feetPosition and rotation, read and write): read at `src/script/mod.rs:629,633`, written at `mod.rs:759,781`, so present. Section 35 (ctx.place and ctx.world on every behavior ctx): `world:state` is defined (`prelude.js:136`) but the ctx.place spine was not traced fully, so not decided.
- **API reference section 45 (parenting).** `ctx.self.parent` is read at `src/script/prelude.js:220` and `attach(entity, parent, offset)` at `prelude.js:1404`. The example itself was not compared.

Still unchecked after this pass: the path resolution of relative script, template and UI paths in world and place configs (no resolver was found by grep, so it needs reading `src/tree.rs`); the migrateWorldAnchors question; the replication scope wording; and the skill bodies, which the docs door returned as 404.

## Not checked (after the 2026-11-24 pass)

These were not decided, so they are not listed as missing:

- wiki/cleetus/featureset-part-2.md:117 Stream 24: client editor modules: checked, not a gap. Every matching bevy matrix row (609, 617, 611) is marked not applicable, so bevy scopes it out (browser-only or hosted).
- wiki/cleetus/featureset-part-3.md:160 Stream 34: top-level bin boot and tooling scripts: checked, not a gap. Every matching bevy matrix row (964, 965, 966, 967, 968, 969, 970, 458) is marked not applicable, so bevy scopes it out (browser-only or hosted).
- wiki/cleetus/featureset-part-4.md:46 Stream 38: bloom and FSR1: checked, not a gap. Every matching bevy matrix row (760, 761, 777, 778) is marked not applicable, so bevy scopes it out (browser-only or hosted).
- wiki/cleetus/featureset-part-3.md:72 migrateWorldAnchors: a world_anchor term appears in src/ui_html.rs and src/viewer.rs, but no row cites the migrator, so whether it is the same per-file migration was not decided.
- wiki/cleetus/featureset-part-2.md:48 src/game/index.js: an index module; whether it carries behaviour beyond re-exports was not read in spoint, so it is not classed.
- wiki/cleetus/featureset-part-1.md:13 cleetus documented-surface counts (93 endpoints, 70 HTTP doors, 305 API types, 21 builtins, 23 skills): these are corpus counts, not engine features; endpoint-level comparison is out of this slice.
- wiki/cleetus/jayzee-gaps.md:162 builtin modules (21 served against the owner's 23): bevy resolves `builtin/` imports at src/script/mod.rs:3831, but the count and bodies of bevy's builtins were not compared with the 21 or 23 documented ones.
- wiki/cleetus/jayzee-gaps.md:160 served skills (23) and :164 reference total (563 files): these are reference-document counts of the hosted platform, not engine behaviour; no bevy counterpart was looked for.
- wiki/cleetus/jayzee-gaps.md:118 replay file magic v2 byte layout: listed as missing with the replay row, but the exact byte layout was not compared since bevy has no replay code at all.
- wiki/cleetus/jayzee-gaps.md:68 replication scope and audience: the row's own text says the scope wording is unchecked against learnings 30 to 37; not checked against bevy's lightyear NetworkTarget::All (src/server.rs:29) beyond that.
- wiki/cleetus/endpoints.md (93 hosted HTTP endpoints) and open-items.md:76 OPEN-003: hosted platform API, excluded by bevy's owner scope (FEATURE_MATRIX.md line 3 excludes hosted, account, auth services); not listed as missing.
- edge/cf-do Durable Object files, bin/ boot scripts, XR (client/xr), editor shell, PeerHostUI, llmJobs, scaffold, NostrAuthServer, ServerPresence, AgentAuthoringAPI, WebGPU instancing and render graph modules: bevy's docs/parity-matrix.tsv marks every matching row `not applicable`, so they are excluded, not missing (rows listed in excluded-cleetus-b.tsv).
- morluto-ci-findings.md TypeScript paths (src/domain/javascript/*, src/application/*): CI findings of another repository, no engine feature.
- Hosted making tools: Blender hero models (page-02-skills.md:250), painted pictures (page-04-sound-art.md:102), sound and voice generation where the filename is the prompt (page-05-workshop.md:72), video and trailers (page-02-skills.md:198), wisps and weaves (page-05-workshop.md:54). These are hosted generation services, not engine runtime; bevy has no such services (absent: searched video, blender, wisp in src), but the bevy feature matrix excludes hosted services by owner scope, so they are not listed as missing.
- Style families (page-04-sound-art.md:52): an art and audio asset catalogue, not an engine feature.
- World files, versions and undo of a whole world (page-05-workshop.md:102): a hosted versioning service; only field-paint undo was checked (implemented).
- Atmosphere sky, sun, clouds, day and night, weather (page-02-skills.md:80): the planet_sky subsystem is large; only fog colour was checked. Weather and clouds not checked.
- Trees, leaf sprays and meadow grass (page-02-skills.md:76): bevy has planet_veg; whether it matches the documented skill API was not checked.
- Player folder files player.jsui, player.jsscripts, player.ymlscripts, player.jstemplates (recapture-starters.md:37): seen only as file names in starter listings; loader behaviour not checked against src/tree.rs.
- ctx.crossing and ctx.device.hold (recapture-skills.md:6407, 1288): the documented semantics were not read in full.
- builtin/postfx and builtin/vibe: the export lists exist (src/script/mod.rs:3907) and prelude builds the values. Whether a renderer applies postfx or a player hears vibe output was not traced beyond the audio row, which finds no audio playback in src.
- The 52 per-game pages in games/: read only as a source of ctx names. Every ctx name they use that is not in page-07-reference.md was checked: atlas, bone, canvas, falloff (scripted-primitive ctx), groundY, groundNormal, slope, sway (scatter ctx), strokeStartValue (brush ctx), rejectedRooms, requestedRoomId, instance, crossing. They are folded into the rows for scripted primitives, scatter, brushes, room routing, instances and onCross. No per-game content is listed.
- page-09-mods and recapture-mods: mods are third-party kits of scripts and skills that run on the engine API. They are not engine features, so they are not compared.
- page-10-games, page-11-pick-a-genre, recapture-pick-a-genre, recapture-games: game listings and genre guides. Content, not engine features.
- page-host, recapture-host, recapture-play-frame, recapture-index, recapture-reference: the hosted game page, play frame and page index. Hosted-platform surfaces, outside an engine comparison.
- Hosted platform services in recapture-engine (invites and share sheet, matchmaking UI, parties, guilds, publishing, Jayzee's page boards): platform services that the bevy owner excluded from its FEATURE_MATRIX. Not compared, so not listed as missing. Leaderboards and platformState are listed because the API reference documents them as world features.
- Performance claims (500 m simulation radius, 60 fps on phones, portal views drawn only when seen): behaviour claims that need a run to check. Not checked.
- Named types section of page-07-reference.md (lines 948 to 3170): checked only through the fields of ObjectPropertiesSpec, PrimitiveSpec, AtmosphereDef, TerrainDef, Inputs and ObjectSpec. The other named types were not compared field by field.
- recapture-engine areas Making art, sound & models; Publishing, players & social; Performance & scale: read for headings only.
- Note for the dispatcher: bevy's game-16 API check counts the names in game16_dynamic_paths (src/script/mod.rs:2543-2546) as present. That list includes groundY, groundNormal, slope, sway, strokeStartValue, crossing, instance, portal, purchase, rooms and scatter, which this slice finds unimplemented. So missingApiCount 0 does not show that these work.
- Method: each documented member name was token-searched in /workspace/bevy/src (rs and js). A hit proves the name is handled somewhere, not that its documented behaviour matches. Rows in implemented-misc.tsv are at that level; behaviour parity was not run.
- wiki/index/extra-docs.md:207 to 225 and the builtin rows: export lists were read, the numeric results were not compared with the hosted engine.
- Sections 34 to 37 (compat spellings, ctx.player on a camera rig, the behavior ctx spine) and 45 (parenting example) at wiki/index/extra-docs.md:147-161 and 191: not probed separately.
- wiki/index/extra-docs.md:289 guide.md and the 23 skills in skills.json: the skill bodies were not captured (404), so the skill features cannot be checked.
- docs/bevy-gaps/checker-cli-and-corpus.md:155: how bevy resolves relative script, template and UI paths in world and place configs was not traced.
- ctx.anim as a plain alias (docs/bevy-gaps/ctx-and-terrain.md:116): the wiki documents ctx.self.anim, which bevy has; whether ctx.anim was meant is not documented, so it is not a gap row.
- wiki/jayzee/* and wiki/index/{cdn-inventory,discovery,exhaustive-index,open-gaps,overview,provenance,savi-index,spawn-index,extra-worlds}.md and wiki/index/tree/*: capture, survey and provenance records. Apart from CDN names and the world-store format (rows in rows-misc.tsv), they document no engine feature.
- wiki/README.md and wiki/toc.md: index pages, no features.
