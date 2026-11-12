# Featureset part 8: agent and room candidates, session store, bake pins, learning record and terrain

## How it works

This page covers lines 1049 to 1163 of docs/FEATURESET.md (old name: savi). It continues [featureset-part-7.md](featureset-part-7.md) and is followed by [featureset-part-9.md](featureset-part-9.md) for lines 1164 to the end. It holds the rest of the grep candidates from src/sdk (agent authoring, Nostr auth, server presence and room directory), then stream 21 (session store and stage loader), stream 22 (static asset pipeline and bake code-version pins), the jayzee learning record (a file outside cleetus, reported by status), and stream 19 (terrain and chart reanchor).

Citations are path and line in spoint at d5e3860 (read-only), re-read through git show. A candidate is a grep match, not a verified defect. A NEEDING A CHECK label means the behaviour was not verified. The learning-record section is not spoint: it cites /workspace/spawn/maps/spawn-learning-record.md (old name: spawn), a jayzee-side file, and states for each figure whether it was re-derived or only reported. Rows fed here are jayzee rows 20, 22, 34, 50, 51, 52 and 55 (see [jayzee-gaps.md](jayzee-gaps.md)).

### Remaining candidates from streams 57 and 58 (src/sdk agent, Nostr and rooms)

- src/sdk/AgentAuthoringAPI.js line 83: any template error, caught and set to null, is reported as an unknown template.
- src/sdk/AgentAuthoringAPI.js line 122: an invalid or taken id is silently replaced by a generated id.
- src/sdk/AgentAuthoringAPI.js line 125: an invalid position falls back to a default position with no refusal.
- src/sdk/AgentAuthoringAPI.js line 150: a literal default port of 3002.
- src/sdk/AgentAuthoringAPI.js line 170: the error message is echoed to the client.
- src/sdk/NostrAuthServer.js line 21: the challenge nonce falls back to Math.random() when no secure source is available. NEEDING A CHECK on reachability.
- src/sdk/NostrAuthServer.js lines 9 and 44: silent catches.
- src/sdk/NostrAuthServer.js line 60: the pubkey is truncated silently to a maximum length instead of refused.
- src/sdk/NostrAuthServer.js lines 73 and 74: silent defaults for created_at (0) and kind.
- src/sdk/ServerPresence.js line 16: an empty catch on the identity file. NEEDING A CHECK on whether an unparsable identity file is silently replaced with a new key.
- src/sdk/ServerPresence.js line 20: the mkdir failure is ignored, and the identity path is built from the working directory, not the project root.
- src/sdk/ServerPresence.js line 94: a silent offline publish failure.
- src/sdk/ServerPresence.js line 99: heartbeat failures never surface.
- src/sdk/RoomDirectory.js line 8: a prose Error with no reason code. The same holds for the other refusals in that module.
- src/sdk/RoomDirectory.js line 36: an explicit port is checked only against in-flight reservations. NEEDING A CHECK.
- src/sdk/RoomDirectory.js line 44: silent zero default for physicsRadius.
- src/sdk/RoomDirectory.js line 48: the configOverrides spread comes last, so overrides can replace port, worldPath or appsDirs.
- src/sdk/RoomDirectory.js line 88: handle.server.stop() is not inside a try. NEEDING A CHECK on whether a throw leaves a stale handle registered.
- src/sdk/RoomDirectory.js line 111: a zero average tick budget stands in for no ticks yet.

### Stream 21: session store, stage loader and stage

The citations were re-read at d5e3860. src/connection/SessionStore.js has 121 lines and src/stage/Stage.js has 109. cleetus's documents name SessionStore and StageLoader zero times.

- Session store: line 9, class SessionStore. Line 11, this.ttl = options.ttl || 30000. Line 79, the expiry test skips pinned sessions. Line 92, the timer uses the same TTL.
- Two consumers pass their own TTL: src/sdk/WorkerEntry.js line 71 (new SessionStore with ttl 60000, imported at line 5) and src/sdk/server.js line 48 (ttl config.sessionTTL or 60000, imported at line 7).
- Stage loader: src/stage/StageLoader.js line 7, class StageConfigError extends TypeError, with its reason code at line 13. Line 4 imports resolveClusterConfig and declaredWeaponRangeM from src/shared/clusterConfig.js, line 32 calls resolveClusterConfig, and line 46 throws stage-radius-not-cluster-resolved when a radius is declared without enabled clusters. Line 49 is class StageLoader.
- Stage: src/stage/Stage.js line 6 re-exports FLAT_RING_HALF_HEIGHT_M from stageShapes.js, and line 8 is class Stage.

Negatives:
- The silent-default shape: options.ttl || 30000 means an explicit ttl of 0 becomes 30000, and server.js line 48 has the same shape with config.sessionTTL || 60000. Neither cited consumer passes 0. This is a shape, not a verified runtime bug.
- git grep for SessionStore over scripts lists zero files, so no witness names the session store.
- git grep for StageLoader or stage/Stage.js over scripts lists one file, scripts/lib/verify-doc-claims.mjs. No script exercises the loader's throw paths.
- cleetus's docs/FEATURESET.md, docs/PARITY-INPUTS.md and docs/JAYZEE-GAPS.md each contain zero matches for SessionStore and StageLoader.

These are static claims. The session timer and the stage loader are not run.

### Stream 22: static asset pipeline and bake code-version pins

The BAKE_INPUTS_GLB_TRANSFORM list is at lines 25 to 29 of src/static/BakeCodeVersion.js, and the BAKE_TRANSFORMS array has eight records. No pin was recomputed.

Bake code-version pins:
- src/static/BakeCodeVersion.js line 9, bakeCodeVersion(relFiles). Line 10 builds the cache key by joining the paths. Line 13 creates a sha1 hash. Line 16 hashes each relative path, and line 17 hashes the file text with CRLF normalised to LF.
- The GLB transform inputs are five files at lines 25 to 29: ./GLBTransformer.js, ./GLBDraco.js, ./GLBKtx2.js, ./GLBVrmPassthrough.js and ../shared/fnv1a.js. The version is set at line 136 (GLB_TRANSFORM_CODE_VERSION = bakeCodeVersion(BAKE_INPUTS_GLB_TRANSFORM)).
- BAKE_TRANSFORMS starts at line 146. Its first record at line 147 takes its version from inputs, and entries is a separate listing. The pin therefore covers the listed input files, not their import closure.

Modules and exports:
- src/static/GLBDraco.js: hasDraco (line 1), hasMeshopt (line 5), stripDraco (line 60) and compressMeshopt (line 96).
- src/static/GLBKtx2.js: KTX_BIN (line 18, falling back to the first candidate when none exists), ktxAvailable (line 20, which checks existsSync first) and imageToKtx2 (line 40).
- src/static/KTX2Extract.js: extractKtx2Images (line 28), getKtx2Extracted (line 53) and resolveKtx2File (line 92).
- src/static/ProgressiveBake.js: isContainedPath (line 199) and resolveBakedFile (line 205), which give the progressive bake containment.
- src/static/GLBTransformer.js: getCachePath (line 47), getTransformed (line 144), getTransformedHashAsync (line 150), getTransformedAsync (line 157) and prewarmFiles (line 168).
- src/static/FetchManifest.js: buildManifestEntries (line 46) and buildFetchManifest (line 93).
- src/static/GLBVrmPassthrough.js: VRM0Passthrough (line 25) and VRMCVrmPassthrough (line 26).

Negatives:
- git grep over scripts finds FetchManifest in zero files, GLBDraco zero, GLBTransformer zero, GLBVrmPassthrough zero, KTX2Extract zero and ProgressiveBake zero. BakeCodeVersion is named in four files and GLBKtx2 in one.
- cleetus's three documents name each of the eight modules zero times.
- The fallback at src/static/GLBKtx2.js line 18 may point to a path that does not exist. The guard ktxAvailable checks existence first, so nothing is wrong here; it is the fallback shape.

These are static claims. The pins are not recomputed and the KTX2 and Draco tools are not run.

### The jayzee learning record (outside cleetus)

The record is /workspace/spawn/maps/spawn-learning-record.md (old name: spawn). It is a jayzee-side file, not in cleetus. Each figure below carries its status. Re-derived means the cleetus author recomputed it from a file named in the line. Jayzee-reported means the jayzee probe or test was not re-run.

- Manifests and frames, re-derived from jayzee-evidence/data/manifests-all-v3-results.jsonl (the durable copy, read with node over its 2580 lines): 2580 rows, 2580 with status 200, 2580 with eof true, 2580 with framesEqualHashes true, 229921 frames, one gzip frame, one gzip decode match, zero gzip failures, zero raw failures, zero hitRaw and one hitDec.
- Worlds with /cdn/ GLB refs, 399, re-derived from /workspace/spawn/maps/glb-urls-all.tsv (2416 rows, 399 distinct worlds). The file is jayzee-local.
- Unique decoded-frame keys, 11987, re-derived from jayzee's dt/keys.txt in /tmp/spawn-probe. That is ephemeral with no durable copy.
- Text-visible keys, 307, jayzee-reported. The witness jayzee-evidence/maps/witness/encoder-bucket/encoder-test.mjs scans /tmp/spawn-probe and /workspace/spawn/maps/witness. Its re-run today gives distinctKeys 11987, because /tmp/spawn-probe now holds dt/keys-unique.txt. The 307 is therefore not reproduced at the script's current inputs.
- Non-CDN data rows, 83, re-derived as the data-row count of /workspace/spawn/maps/unverified-noncdn-refs.tsv. The first-pass 200 count of 81 is jayzee-reported.
- The /cdn/-only probe, re-derived from /tmp/spawn-probe/cdn-named/results.jsonl (421 rows, ephemeral): named-cdn stripped of .yaml gives 302 for 304 rows and an error for four (the four timeouts were retried to 302). Named-cdn with .yaml gives 401 for ten. Value-sha controls give 200 for 20. Non-CDN rows give 200 for 82 and 401 for one. The 304 redirect targets are 304 distinct value-origin locations. The claim that bytes come only from /cdn/ is weakened for the named family and stays INFERRED.
- Gone 410 (39 probes, no body-level 410), the bucket rule (UNDETERMINED), the error keys, the mp4 retry (200 for a bounded read) and the spawnfile.io bytes (UNCONFIRMED) are jayzee-reported. The network probes and bucket tests were not re-run.

### Stream 19: terrain and chart reanchor

The 24 citations were re-read at d5e3860. Two of spoint's locations were corrected here: client/core/CaveMeshes.js is in client/core, not src/terrain, and the ChartReanchor modules are in src/terrain, not src/sdk/chartState.

Planet frame and surface solve (src/terrain/PlanetFrame.js):
- Line 3, SURFACE_SOLVE_TOLERANCE_M = 1e-4. Line 9, GROUND_MEMO_SLOTS = 4096. Line 27, class SurfaceSolveError extends RangeError. Line 286, groundHeightLocal(x, z, yGuess). Line 291 masks the memo slot with GROUND_MEMO_SLOTS minus one.

Chart anchors and reanchor:
- src/shared/chartAnchor.js line 9, CHART_ANCHORS_PER_FACE = 32. Line 10, CHART_REANCHOR_ANGLE_DEG = 28.
- src/sdk/chartState/index.js line 21, attachServerChartMigrators(ctx, service). Two callers: src/sdk/WorkerEntry.js line 117 and src/sdk/ServerAPI.js line 96.
- chartEpoch occurrences by file (grep -c): ChartReanchorService.js 4, ChartReanchorTerrain.js 4, ColliderStreamer.js 1, FieldLattice.js 1.

Caves, grass and biomes:
- src/terrain/TerrainPhysics.js line 8 imports loadCaveCarveLayer from CaveSDF.js.
- client/core/CaveMeshes.js line 2 imports polygonizeCaveVolume and loadCaveCarveLayer from src/terrain/CaveSDF.js. CaveSDF has these two importers and no others.
- src/terrain/GrassPlacementLod.js line 15, grassBladeReachM(q, law), and line 19, createGrassChunkLod(key, frame, anchorField, worldSeed, law, now, abandoned). Its only importer is client/core/Grass.js line 9.
- src/terrain/BiomeOverride.js line 4, CELL_M = 8; line 24, createBiomeOverride(strokes); line 108, loadBiomeOverride(json). Its importers were not checked, so no claim is made about them.
- src/terrain/CavePatches.js line 22, sdfSphere(wx, wy, wz, cx, cy, cz, r), and line 187, createSphericalCave(heights, width, spacing, cornerX, cornerZ, cx, cy, cz, radius, opts).

Static tile index:
- src/physics/StaticTileIndex.js line 3, STATIC_TILE_M = 16, and line 4, STATIC_TILE_MARGIN_M = 3.
- Its importer is src/physics/World.js line 5, and it is constructed at src/physics/World.js line 222.

Negatives:
- src/terrain/CaveMeshes.js does not exist at d5e3860.
- CavePatches has no importer. git grep for CavePatches over src, client, apps, packages, edge and scripts lists zero files. Its only other mention is .gm/pool/pool.log, outside those paths.
- In scripts, CavePatches, CaveSDF, GrassPlacementLod and StaticTileIndex each match zero files. PlanetFrame matches 10, ChartReanchor 3 and ClimateCache 3.
- git grep for ChartReanchorService or ChartReanchorTerrain over src/sdk/chartState lists zero files. The chartState directory mentions onChartReanchor in migrateEntities.js and ctx.lastChartReanchor in index.js, which are app hooks, not the service modules.

These facts are about spoint. Terrain runtime behaviour is not claimed here, and any runtime question goes to the owner.

## Decisions

- The agent and room candidates keep the rule of the earlier streams: a grep match is a candidate, and a conforming example is named beside it where one exists.
- The session TTL shape is recorded as a silent default with no witness, and is not treated as a runtime bug, because neither consumer passes zero.
- The bake pin is recorded as covering the listed inputs, not the import closure. This is stated as the reason an edit to an unlisted import does not change the pin.
- The jayzee learning record is kept as a separate, dated set of figures, each with its status (re-derived or jayzee-reported), so that cleetus does not restate them as its own verified facts.
- Two spoint locations were corrected in the file (CaveMeshes and the ChartReanchor modules), and the correction is recorded here rather than silently applied.

## Open gaps

- src/sdk/AgentAuthoringAPI.js: the template error and the id fallback are candidates; the position fallback has no refusal.
- src/sdk/NostrAuthServer.js: the Math.random nonce fallback needs a reachability check.
- src/sdk/ServerPresence.js: the empty catch on the identity file needs a check on whether an unparsable file is replaced with a new key; the identity path is relative to the working directory.
- src/sdk/RoomDirectory.js: the port reservation check, and the stop call outside a try, need a check; the configOverrides spread can replace port and paths.
- SessionStore: the ttl default makes an explicit zero into 30000; no consumer passes zero; no witness names the store.
- StageLoader: its throw paths are not exercised by any script.
- BakeCodeVersion: the pin covers the listed inputs, not the import closure.
- The learning record: the 307 text-visible keys do not reproduce at the witness's current inputs; the 11987 count is the current result.
- The /cdn/-only claim stays INFERRED; the spawnfile.io bytes stay UNCONFIRMED; the 410 gone case was not found in the probes.
- Terrain: BiomeOverride's importers were not checked; CavePatches has no importer; ChartReanchor's service modules have no witness in the tree.

## Sources

- /workspace/savi/docs/FEATURESET.md (old name: savi), lines 1049 to 1163
- /workspace/savi/docs/PARITY-INPUTS.md (old name: savi)
- /workspace/savi/docs/JAYZEE-GAPS.md (old name: savi)
- /workspace/spawn/maps/spawn-learning-record.md (old name: spawn), jayzee-side
- /workspace/spawn/maps/glb-urls-all.tsv (old name: spawn)
- /workspace/spawn/maps/unverified-noncdn-refs.tsv (old name: spawn)
- /workspace/spawn/maps/witness/ (old name: spawn), including encoder-bucket/encoder-test.mjs
- /workspace/savi/spawn-evidence/data/manifests-all-v3-results.jsonl (old name: cleetus, old name: spawn)
- /workspace/spoint/src/sdk/AgentAuthoringAPI.js
- /workspace/spoint/src/sdk/NostrAuthServer.js
- /workspace/spoint/src/sdk/ServerPresence.js
- /workspace/spoint/src/sdk/RoomDirectory.js
- /workspace/spoint/src/connection/SessionStore.js
- /workspace/spoint/src/sdk/WorkerEntry.js
- /workspace/spoint/src/sdk/server.js
- /workspace/spoint/src/stage/StageLoader.js
- /workspace/spoint/src/stage/Stage.js
- /workspace/spoint/src/shared/clusterConfig.js
- /workspace/spoint/src/static/BakeCodeVersion.js
- /workspace/spoint/src/static/GLBDraco.js
- /workspace/spoint/src/static/GLBKtx2.js
- /workspace/spoint/src/static/KTX2Extract.js
- /workspace/spoint/src/static/ProgressiveBake.js
- /workspace/spoint/src/static/GLBTransformer.js
- /workspace/spoint/src/static/FetchManifest.js
- /workspace/spoint/src/static/GLBVrmPassthrough.js
- /workspace/spoint/src/terrain/PlanetFrame.js
- /workspace/spoint/src/shared/chartAnchor.js
- /workspace/spoint/src/sdk/chartState/index.js
- /workspace/spoint/src/sdk/chartState/migrateEntities.js
- /workspace/spoint/src/sdk/ServerAPI.js
- /workspace/spoint/src/terrain/TerrainPhysics.js
- /workspace/spoint/src/terrain/CaveSDF.js
- /workspace/spoint/client/core/CaveMeshes.js
- /workspace/spoint/src/terrain/GrassPlacementLod.js
- /workspace/spoint/client/core/Grass.js
- /workspace/spoint/src/terrain/BiomeOverride.js
- /workspace/spoint/src/terrain/CavePatches.js
- /workspace/spoint/src/physics/StaticTileIndex.js
- /workspace/spoint/src/physics/World.js
- /workspace/spoint/src/terrain/ChartReanchorService.js
- /workspace/spoint/src/terrain/ChartReanchorTerrain.js
