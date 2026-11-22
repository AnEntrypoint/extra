# Bevy gaps against the extra documentation

This folder lists the engine features that the extra documentation describes and that bevy, at commit `d4c407c` in `/workspace/bevy`, does not implement or implements only in part. Bevy was read only, never edited. Checked on 2026-11-22.

## Files

- [missing.tsv](missing.tsv): one row per missing or partial feature. Columns: `id`, `area`, `feature`, `documented_in` (wiki path and line, then other places that document the same feature), `bevy_status` (`missing` or `partial`), `evidence` (the bevy path read, or `absent: searched <what>`), `size` (S, M or L), `depends_on`, `bevy_matrix_row` (the `n` of the row in `/workspace/bevy/docs/parity-matrix.tsv`, or `none`).
- [checker-cli-and-corpus.md](checker-cli-and-corpus.md): the game-16 checker, the `world` subcommand and `FEATURE_MATRIX.md`.
- [ctx-and-terrain.md](ctx-and-terrain.md): the ctx shims, `ctx.self.anim` and terrain height.
- [host-bridge-and-report.md](host-bridge-and-report.md): `__make`, `__host` and the `game16-report` record.

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

144 documented features were checked and found implemented, each with a bevy path and line. By area: scripting 68, physics 17, terrain 16, world-format 7, rendering 6, objects 5, netcode 4, gameplay 3, camera 3, animation 2, platform 2, economy 2, ui 2, tooling 2, input 1, player 1, effects 1, services 1, audio 1. For the ctx and builtin names in `wiki/index` this check is at name level: the name is handled in bevy, and its behaviour was not compared with the hosted engine.

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

## Not checked

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
