# FEATURESET part 9: render, editor, HUD, XR, packages, static serving and server surface

## How it works

This part covers FEATURESET.md lines 1164 to 1288, the last part of the file. It holds three groups of facts. Each line gives `path:line` and the snippet as it stood at spoint commit `d5e3860`. The citations were re-read with `git -C /workspace/spoint show d5e3860:<path>` before this part was written, and nothing was written into spoint.

Client render (stream 20), at `d5e3860`:

- Shadows: cascade 0 never renders when the sun does not cast shadows (`client/core/ShadowPipeline.js:19`), which fixes the cascade count (`client/core/ShadowPipeline.js:20`). The forced update is at `client/core/ShadowPipeline.js:152`.
- Shadow cost probe: it reports a per-light-pass backend with split support off (`client/core/ShadowCostProbe.js:139`). Its public entry is `client/core/ShadowCostProbe.js:195` (`installShadowCostProbe`).
- Occlusion: `client/core/SceneOcclusion.js:3` imports `WebGpuHizTier` from `streaming-gltf/webgpu-hiz-tier`. The tier is selected only on a WebGPU renderer (`client/core/SceneOcclusion.js:10`). The package export is `packages/streaming-gltf/package.json:16`, and the class is at `packages/streaming-gltf/src/webgpu-hiz-tier.js:64`.
- Cull freeze: `client/core/CullFreeze.js:4` and `:11` switch instanced and batched meshes to manual cull, and `client/core/CullFreeze.js:14` marks visibility changed.
- Cluster LOD: `packages/streaming-gltf/src/cluster-lod-mesh.js:213` to `:215` allow a cluster LOD mesh to render at most once per frame.
- Progressive LOD: `packages/streaming-gltf/src/model-pool.js:191` reads the `EP_progressive_lod` extension or the local extras key.

XR, editor and HUD:

- Teleport arc bounds use a BVH only above 2000 triangles (`client/xr/XRWidgets.js:11` and `:141`).
- XR pointers are excluded through a user-data flag (`client/xr/XRSystem.js:52`).
- Editor and HUD exports: `client/editor/EditorShell.js:21` (`createEditPanel`), `client/hud/PeerHostUI.js:27` (`createRoomCodeUI`) and `client/hud/PeerHostUI.js:43` (`createPeerHostUI`).

Quality governor and tiers: the frame budget is 16.67 ms (`client/core/QualityGovernor.js:3`). The tier choice is resolved against the creator's maximum (`client/core/QualityTierChoice.js:10`). The presets object is at `client/core/QualityPresets.js:153`.

Packages: the ECS package re-exports `createWorld` and `createQuery` (`packages/ecs/src/index.js:1` and `:2`). The mapspinner package exports `createRenderer` and `createPlanet` (`packages/mapspinner/src/index.js:10` and `:15`). The Rust crate is named `spoint-core` (`packages/spoint-core/Cargo.toml:2`).

Negatives (`git grep`, `git cat-file` or `git ls-tree` at `d5e3860`):

- `client/core/WebGpuHizTier.js` does not exist. A second copy of the class sits in `packages/streaming-gltf/examples/local-progressive/webgpu-hiz-tier.js:10`, which client code does not import.
- The modules `ShadowCostProbe`, `QualityGovernor`, `SceneOcclusion`, `EditorShell` and `PeerHostUI` each match 0 files under `scripts`.
- `packages/spoint-core` has 0 `.js` files. It holds `Cargo.toml`, `Cargo.lock` and `src/lib.rs`.
- `EP_progressive_lod` is read in one file only, `packages/streaming-gltf/src/model-pool.js`.

Static serving and server surface (stream 18), at `d5e3860`, with each line checked against its source. A self-check re-read all 25 snippets and matched 25 of 25.

- Static serving: COEP is `require-corp` (`src/sdk/StaticHandler.js:101`) and is sent with COOP (`src/sdk/StaticHandler.js:108`). A baked path containing `..` is refused (`src/sdk/StaticHandler.js:146`). Files are contained to the served root after realpath resolution (`src/sdk/StaticHandler.js:227`).
- Token comparison: `timingSafeTokenEqual` (`src/sdk/authCompare.js:10`) uses `crypto.timingSafeEqual` on Node (`src/sdk/authCompare.js:2`). A length mismatch still runs a dummy compare before returning false (`src/sdk/authCompare.js:15`).
- The editor token is checked on the upload route (`src/sdk/ServerAPIRoutes.js:48`). That file has three call sites, at lines 48, 57 and 148. The socket message token is checked at `src/sdk/ServerHandlers.js:454`.
- Some routes require a loopback remote address (`src/sdk/ServerAPIRoutes.js:97`). The API sends a wildcard CORS origin (`src/sdk/ServerAPIRoutes.js:137`). The server API entry is `src/sdk/ServerAPI.js:26`.
- Sandbox, upload, minimap, persistence, room orchestration, cron and LLM jobs: the SES preflight is at `src/sdk/SESCompartmentEvaluator.js:34`, and a failed lockdown returns a reason code rather than throwing (`src/sdk/SESCompartmentEvaluator.js:44`). The upload cap is 50 MiB (`src/sdk/UploadHandler.js:6` and `:55`). On-demand minimap bakes are capped at 64 (`src/sdk/MinimapBake.js:10`). The world snapshot format is version 1 (`src/sdk/WorldPersistence.js:8`). The room orchestrator router is at `src/sdk/RoomOrchestratorHttp.js:55`. Cron rejects a non-positive step (`src/sdk/cronSchedule.js:25`). LLM jobs cap messages at 32 and prompts at 8000 characters (`src/sdk/llmJobs.js:12` and `:28`).

Negatives in static serving (`git grep` at `d5e3860`, scoped to `src`): no CSP or HSTS header is set; no `Cross-Origin-Resource-Policy` header is set; the only `Access-Control-Allow-Origin` line is `src/sdk/ServerAPIRoutes.js:137`; none of `UploadHandler.js`, `StaticHandler.js` or `llmJobs.js` contains a rate limit. `timingSafeTokenEqual(` appears 3 times in `ServerAPIRoutes.js`, once in `ServerHandlers.js` and once in `authCompare.js`.

Scoped jayzee decoded-frame token scan (reported by jayzee, aggregates re-derived here): the inputs are jayzee's scan output, which lives only in jayzee's ephemeral directory. Its files are `dt/results.jsonl` (2580 rows) and `dt/keys.txt`. The four denominators are kept separate:

- 307 text-visible keys, reported by jayzee as historical and durable from 38 content-addressed contributor contents. A re-run on 2026-11-07 of `text-visible-307-derive-durable.mjs` in jayzee's `maps/witness` returns 307 distinct keys (298 value keys and 9 named keys). The 38 contents are not proven to be the complete contributor set, and the encoder-test script returns 11987 at the current inputs, so the 307 scope is held open.
- 11987 unique decoded-frame `world.assets` keys. `keys.txt` has 12186 lines, which is 11987 unique keys plus 199 duplicate lines.
- 2580 manifests reached. All returned status 200. 1240 have `world.assets` keys, and 1584 have a `/cdn/` slash.
- 399 worlds with `/cdn/` GLB references. This is the census denominator used elsewhere in FEATURESET and is not compared with the rows above.

Scoped results, decoded-frame scope only: frames 229921, gzip frames 1, decode failures 0. Key occurrences total 12259. Unique keys are 11987, of which 11679 are `~2fcdn~2fvalue.<sha>` and 308 are `~2fcdn~2f<name>` with no sha. Each key carries exactly two `~2f`. `~3a` and `~7e` appear 0 times across unique keys, and no key contains `spawnfile`, `https~3a` or a bare tilde. `spawnfile` occurs 0 times across the decoded frames.

The 73-line gap between 12259 and the per-manifest unique sum 12186 is closed as a witnessed resolution. jayzee's `reconcile-gap.mjs` gives dtRawKeyCountSum 12259, kwPerManifestUniqueSum 12186, withinManifestRepeatSum 73, manifestsWithRepeats 61, negativeDiffs 0, kwUniqueAcrossAll 11987 and missing 0. Cleetus re-derived the arithmetic from `kw/key-world.jsonl` and jayzee's `dt/results.jsonl`. The mechanism, repeats within one manifest in the raw scan, is jayzee's and is not re-derived here.

Scoped jayzee body witnesses: these are body-level witnesses from jayzee. They do not change any OPEN status. Witness copies are at `/workspace/spawn/maps/witness/` (old name: spawn), with the checkers `manifest-chain.mjs` and `manifest-hashmatch.mjs`.

- Three manifests examined in full: the manifest chain is exact to EOF, and each frame body sha256 equals `sheet.hashes[i]`, for 69 of 69, 80 of 80 and 274 of 274 frames.
- A sample of 40 further manifests, taken evenly from 2580 distinct, also matched. Combined, 43 of 43 were reached.
- Corpus result over the 2580 distinct manifests reached: HTTP 200 for 2580, the chain ends at EOF for 2580, frames equal hashes for 2580, parse errors 0. Ordered frame i equals sheet hashes[i] for 2579 of 2580. The exception, `d048ad0665b46944dea920d8daed8dbe85874fb4a9d8809339e88223cd853fca`, has frame 2 gzip-wrapped. Its decoded body matches sheet hashes[2], but the raw gzip bytes do not. Status: EXPLAINED. The sheet hashes decoded content for gzip-wrapped frames, for the 2580 reached only.
- Head drift, a single observed case, UNVERIFIED as a rule: for world `41cd4649…`, head.json (seq 553) names manifest `3fa9a434…`. On 2026-11-07 that manifest returned 200, so the earlier 404 `unknown_world_store_key` is not reproduced. A misspelled resource name under the same world (`head.jsn`) returns 404 with `{"error":"unknown_world_store_key"}`. The condition that selects the drifted-head error is OPEN.
- Head presence: for `5db79de6dae84ceca2ddb9b9a0e216d9`, `fd80e9d941624c2fbc48fc89193a7417` and `ffb0a8fbdca948a5933be7bd62fb44b5`, head returns 200 with `"manifest":null` and `"seq":0`.
- `head_not_found` is witnessed for `03ebf64172574b90ba8805e0f8a9b6d5` and the all-zero id. jayzee also reports `040ed504…` with the same body, which was not re-fetched.
- `value_not_found` is a scoped observation of two absent hashes, not a rule.
- Resolve-adventure is partial. A trailing slash returns 308, and `http://www` returns 308 to https. `https://spawn.co` returns 307 to the www host. Missing or empty addresses return 400. Found and not_found return 200 with `result.type` set. Gone (410) was NOT reached in 22 probes, so the gone half stays OPEN.

Scoped jayzee encoder and bucket witnesses: these are partial and do not close OPEN-010 or OPEN-015. Copies are in `/workspace/spawn/maps/witness/encoder-bucket/` (old name: spawn).

- Encoder `/` to `~2f`: `encoder-test.mjs` gives 307 distinct keys, 614 `~2f` escapes, round trip 307 and no failures. At current inputs the same script returns 11987, so this is scoped to 307.
- Encoder `:` to `~3a` is witnessed only in the FAULTS F3 sample (`spawn-engine/FAULTS.md`), not in the 307. OPEN.
- Encoder `~` to `~7e` is unwitnessed. OPEN.
- Bucket `world.assets/<xx>/`: `bucket-test.mjs` gives 1163 files, 298 distinct (xx, sha) pairs and 135 buckets. The best of 8 hash rules scores 2 matches, which is chance-level, so those rules are NEGATIVE. The rule stays OPEN (OPEN-015). `bucket-test3.mjs` over 279 keys gives 0 matches for `frameBody`, `frameWhole`, `keyText` and `valueSha`, which are NEGATIVE.
- Five reconciled denominators, reported by jayzee and kept separate: 2580 manifests, 399 worlds, 11987 unique decoded keys, 288 maps-only keys and 307 text-visible keys (historical). The set relation is 288 inside 307 inside 11987, with 19 keys in 307 that are not in the 288. The ten sha-based bucket counts in jayzee's audit have no script re-run and are not independently verified.

Jayzee gap register: the per-row implementation gaps are in `docs/JAYZEE-GAPS.md`. Rows 13 and 36 are UNVERIFIED as closed, because jayzee's PARITY.md still says partial at `2db34a0`. Rows 62 to 65 are catalogs and are open.

Feature-support contract: the contract is not duplicated here. It lives in `docs/OPEN-ITEMS.md` under "Required feature support", which is extended with the jayzee learnings from this document.

## Decisions

- The facts in this part are static facts about spoint at `d5e3860`. The GPU and XR runtime behaviour is not exercised, so any runtime question goes to the owner.
- The four denominators (307, 11987, 2580, 399) are kept separate and are never added or merged. The three `~2f` scopes are kept separate in the same way.
- The 73-line gap is recorded as closed, but only for the arithmetic. The mechanism that produces repeats inside one manifest is not claimed.
- Negatives are recorded as scoped to the decoded-frame scope of the 2580 manifests reached. They are not a universal absence.
- Body witnesses for the sample and the corpus do not change any OPEN status.
- Static negatives (no CSP, no HSTS, no CORP, no rate limit) are recorded as facts. They do not change any jayzee row, and jayzee may idealize these parts as the owner's clarification allows.

## Open gaps

- GPU and XR runtime behaviour of shadows, occlusion, Hi-Z and teleport arcs is not exercised. Owner question.
- Whether 307 text-visible keys are the complete contributor set is not proven. The 1173-file original input is not reproduced.
- The condition that selects the drifted-head `unknown_world_store_key` error is OPEN.
- Gone (410) for resolve-adventure is not reached, so the gone half stays OPEN.
- Encoder `:` to `~3a` and `~` to `~7e` are OPEN, with no witness in the 307 keys.
- The bucket rule is OPEN (OPEN-015). The ten sha-based bucket counts are not independently verified.
- The spawnfile key path stays ELIDED, and the bucket rule stays UNDETERMINED.
- The mechanism behind repeats within one manifest in the raw scan is jayzee's and is not re-derived.
- Missing security headers (CSP, HSTS, CORP), wildcard CORS on the API, and absence of rate limits on upload, static and LLM routes are recorded facts without a decision. See the agent-route authentication candidate in featureset-part-7.md.
- Rows 13 and 36 in JAYZEE-GAPS are UNVERIFIED as closed. Rows 62 to 65 are open catalogs.

## Sources

- /workspace/savi/docs/FEATURESET.md lines 1164 to 1288 (old name: savi).
- /workspace/spoint at commit `d5e3860`, read with `git -C /workspace/spoint show d5e3860:<path>`, and `git grep` and `git cat-file` at that commit.
- /workspace/spawn/maps/witness/ and /workspace/spawn/maps/witness/encoder-bucket/ (old name: spawn).
- /workspace/spawn/maps/witness/manifest-sample40/ (old name: spawn).
- /workspace/savi/spawn-evidence/data/manifests-all-results.jsonl and /workspace/savi/spawn-evidence/probe-scripts/verify-v3.mjs (old name: savi).
- /workspace/savi/docs/JAYZEE-GAPS.md and /workspace/savi/docs/OPEN-ITEMS.md (old name: savi).
