# Featureset part 1: cleetus counts, spoint surface, and the relayed streams

## How it works

docs/FEATURESET.md (old name: savi) is the durable featureset for the jayzee to spoint parity work. It holds cleetus's documented surface and jayzee's learnings. The file is 1288 lines and about 216 KB, so this wiki splits it across nine pages: this part 1 (lines 1 to 130), [featureset-part-2.md](featureset-part-2.md) (lines 131 to 360), [featureset-part-3.md](featureset-part-3.md) (lines 361 to 590), [featureset-part-4.md](featureset-part-4.md) (lines 591 to 710), [featureset-part-5.md](featureset-part-5.md) (lines 711 to 819), [featureset-part-6.md](featureset-part-6.md) (lines 820 to 928), [featureset-part-7.md](featureset-part-7.md) (lines 929 to 1048), [featureset-part-8.md](featureset-part-8.md) (lines 1049 to 1163) and [featureset-part-9.md](featureset-part-9.md) (lines 1164 to 1288). Every figure in the file is one of three things:

- REPRODUCED: re-run in the checkout with the command shown, and the output matches.
- MATCHES RELAY: the relay figure is confirmed by a stated arithmetic sum or by the source's own text, with the command shown.
- UNVERIFIED: not reproduced by a command in the file. The reason is given.

Ephemeral provenance such as /tmp/spoint-parity/ and /tmp/spawn-probe/ is never a source. The file states the parity relationship as jayzee to spoint, plus cleetus's documented surface and jayzee's learnings. Naming parity is not required. Feature parity is required, and the feature-support contract lives in docs/OPEN-ITEMS.md under "Required feature support".

### Documented featureset of cleetus (lines 13 to 53)

The sources are ENDPOINTS.md, scripts/openapi.json, .spawn/reference/http/CATALOG.md, .spawn/reference/http/api-types.md, jayzee-engine/ASSET_SHAPES.md, jayzee-engine/FEED_SCOPE.md, jayzee-engine/PROJECT_ASSETS.md, jayzee-engine/ASSETS.md, jayzee-engine/FAULTS.md, .spawn/reference/README.md, .spawn/reference/COVERAGE.md, .spawn/reference/tome/INDEX.md, .spawn/reference/skills/INDEX.md, .spawn/reference/engine-deep/, gaps/netcode-optimization-gaps.md, gaps/morluto-rea-pr-9234-ci-findings.md, scripts/build-manual.mjs, scripts/check-manual.mjs and .github/workflows/publish.yml. The count witnesses were run in /workspace/savi at HEAD 992b328 (an earlier head than the current 5a30f94):

| Figure | Output | Status |
|---|---|---|
| Endpoints 93 = 39 + 21 + 3 + 30 | section headings of ENDPOINTS.md | REPRODUCED |
| HTTP doors 70 = 17 exercised + 53 documented | CATALOG.md rows, with 66 rows carrying an HTTP verb and 4 without (delete, play.attach, git, openapi) | REPRODUCED (CATALOG sha256 1af9ca96...a982c). An earlier draft's 56 was wrong. |
| HTTP doors without a method | delete, play.attach, git, openapi, all part of the 53 | REPRODUCED |
| API types 305 | 308 files in cli/types/, 305 matching the list, 3 meta files (_list, _missing, _names) | REPRODUCED for 305 |
| cli/types/ holds 308 files | 305 type files plus _list.txt, _missing.txt and _names.txt | REPRODUCED |
| ASSET_SHAPES "names 308 types [verified]" | live GET /api/agent/v1/api needs a Bearer token; none was used | UNVERIFIED |
| Tome 68 distinct headings | 69 rows; World Queries appears twice | REPRODUCED |
| Tome 69 section files | 69 | REPRODUCED |
| Builtin modules 21 | 21 builtin- sections; the owner's 23 is not reproducible locally (OPEN-028) | REPRODUCED |
| Served skills 23 | 23 rows in skills/INDEX.md | REPRODUCED |
| Skills directory 47 entries | 23 .json, 24 .md (one is INDEX.md) | REPRODUCED |
| Skills INDEX byte column | signed differences against the .md files: +1 for 21 rows, -12 for cameras, +27 for heightmap-terrain | REPRODUCED. The +1 fits a trailing newline, but the generator is not in the tree, so that reason is UNVERIFIED. The column is stale for cameras and heightmap-terrain. |
| Skills JSON content bytes | difference 0 for all 23 against the .md bodies | REPRODUCED by cleetus; jayzee did not check the bodies |
| Engine docs 27 | 27 files under engine/ | REPRODUCED |
| CLI top-level 39 | 39 files | REPRODUCED |
| HTTP 18 indexed plus 33 raw | 18 non-raw files, 33 raw | REPRODUCED |
| Reference index total 208 | sum of the README's job figures (tome 74, skills 47, engine 27, cli 39, http 18, guide 3) | UNVERIFIED. The tome tree has 75 files (73 .md), so the sum is 207 or 209. The guide tree has 5 files, not 3. |
| Feed 3,421 projects, 66 engine versions | the text states it; the walk was not re-run | UNVERIFIED for the walk |
| Assets 395 | the text states it; the URL walk was not re-run | UNVERIFIED for the count and the 4 families |
| me.doors 60 keys | the local Bearer body holds 42 keys | UNVERIFIED as 60 |
| Reference README "208 files" as a tree count | 563 files, of which 180 are .md | UNVERIFIED as a tree count |
| ENDPOINTS header "62 paths" against sections summing to 63 | none | UNVERIFIED here, and not a contradiction (OPEN-001) |

Other cleetus facts recorded in the section: the 93 endpoints reconcile, with the header and section counts measuring different things (spec paths against named endpoints). The site directory is gitignored (.gitignore line 2), and git ls-files site counts zero. The completeness contract is described in [manual-build.md](manual-build.md). The netcode gaps and the PR 9234 findings are described in [netcode.md](netcode.md) and [morluto-ci-findings.md](morluto-ci-findings.md).

### Spoint surface, read-only at d5e3860 (lines 55 to 87)

The section records the spoint counts reproduced with git and ls: 2,233 commits (git rev-list --count HEAD), 2,293 tracked files, 0 status lines, 103 PRD rows in .gm/prd.yml (fixed 34, refuted 28, retired 26, open 15), 142 files in work/rows/, 13 files in apps/world/ (the .js set), 16 entries in apps/maps/, 20 .md pages in docs/ (22 files in all), 193 top-level entries in scripts/. The relay's 31 built-in placed apps is not in the tree: src/stdlib-apps has 29 entries. The witness scripts number 115 witness*.mjs directly in scripts/, while a recursive basename match gives 7. The harness*.mjs count is 0 repo-wide and 6 under scripts/ using the contains form. The verdict files number 78 in total, of which 76 are under .gm/witness-out and 2 under scripts/lib.

The surface families are listed as: Protocol (src/protocol/MessageTypes.js with WIRE_PROTOCOL_VERSION 5 and opcodes 0x01 to 0xc7, msgpack.js WIRE_STRUCTURES, InputCodec.js, ComponentSchema.js, CursorEventStream.js, EventEmitter.js); Netcode (SnapshotBinFormat.js, SnapshotEncoder, SnapshotPacker, NetworkState, ReplayFile with magic spointreplay v2, LagCompensator, Hitscan, RewindSpatialIndex, the anticheat and lockstep modules, the Rollback and Lockstep loops, PeerSimSession, NetcodeProfile, ReplayRecorder and Player, TickSystem, PlayerManager, PhysicsIntegration, CollisionSystem); Client (PredictionEngine, ReconciliationEngine, SnapshotProcessor and Timeline, PredictionChart, interpolation, ClockSync, ChartEpochSync, ReconnectManager, TransportMigrationTrigger); Transport (WebSocket, WebTransport and QUIC datagrams, Wireweave and WebRTC, worker postMessage, NetworkSimTransport, TransformRing); Sharding (Cluster*, Region*, ClusterHandoff, ShardingRefusal); SDK and server (ServerAPI, AgentAuthoringAPI, StaticHandler, DevHmr, RoomOrchestratorHttp, RoomDirectory and its helpers, ServerPresence and Identity, NostrAuthServer, cronSchedule, llmJobs, UploadHandler, MinimapBake, WorldPersistence, PrefabLibrary and Spawner, SceneImport and TiledImport, WorldLocator); Physics (the Jolt World wrapper, CharacterManager, ShapeBuilder, StaticTileIndex, FlightModel, VehiclePhysics, Draco and Meshopt decompressors); Terrain (21 or more files including PlanetFrame, ChartReanchor*, CaveSDF, CavePatches, client/core/CaveMeshes, GrassPlacementLod, BiomeOverride, ClimateCache); Packages (mapspinner, streaming-gltf with EP_progressive_lod schemas, ecs, spoint-core as a Rust scaffold); Game systems (AbilityTree, QuestSystem, ProgressionSystem, StatsSystem, EventChainManager), src/animation/ and src/pathfinding/; Client surfaces (client/editor, client/hud, client/xr, client/core with WebGPU and WebGL postFX and the shadow, cascade and quality governors, client/landing); Edge, deploy and shell (edge/cf-do, src-tauri, bin, scripts). The .gm/witness-out/spawn-feature-gap.md file is the 60-claim gap report with 47 implemented and 13 remaining, and the 47 are not independently verified.

### Jayzee parity rows and Tier B (lines 89 to 95)

These are read from git show HEAD:docs/PARITY.md at jayzee 17ce428. Row 13 (lockstep loop) cites spoint src/netcode/LockstepGameLoop.js and src/netcode/LockstepTickSystem.js, both present. Row 36 (telemetry) cites jayzee learnings 46 and 65 to 66 and src/sdk/Metrics.js, which is present. Closure of both is peer-reported and not verified here. "Tier B" is not a defined classification in any durable repo. It is jayzee's internal plan shorthand (Tier A pure logic against Tier B Jolt-bound code), from an ephemeral plan file. Its status is UNVERIFIED as a label. The Jolt-bound surfaces are named by path: src/physics/World.js, src/physics/CharacterManager.js, src/physics/VehiclePhysics.js and src/physics/joltLimits.js.

### Documentation streams relayed from the spoint peer (lines 97 to 105)

The durable equivalents are the /workspace paths and /workspace/spoint/.gm/witness-out/. Streams 1 to 6 are the inventory artifacts (INVENTORY.md, FAMILIES.md with 19 families and 107 paths, GAPS.md, prd-matrix.json, parity-crossmap.json), which live in /tmp/spoint-parity/ and are provenance only. The check-refs gap is two package.json references to an absent scripts/bundle-freshness-witness.mjs. Stream 7 confirms CHARTEST-est-s1-3 as REAL at src/terrain/PlanetFrame.js installGroundSource line 348; src/netcode/LagCompensator.js lines 6 and 7 hold REWIND_BUCKET_CAPACITY = 10 and REWIND_REFILL_PER_SEC = 20; and src/netcode/InputGuard.js line 2 refills at 90 per second. Stream 8 covers the 13 unchecked claims and the Wave C refinement, with delivery documents .gm/WAVE_C_COMPLETION_SUMMARY.md and .gm/MODEL_BROWSER_DELIVERY.md whose implementation is unverified. Stream 9 covers the sandbox and static-serving surface: SES fails closed with SandboxUnavailableError at src/sdk/SESCompartmentEvaluator.js line 81; the timing-safe compare is at src/sdk/authCompare.js line 10; COEP require-corp is at src/sdk/StaticHandler.js line 108; path containment is at src/sdk/StaticHandler.js line 149. Stream 10 is the final cross-map counts, peer-reported, with the PRD counts reproduced above.

### Stream 11: jayzee PARITY rows 6 to 10, 32 and 33 at 17ce428 (lines 107 to 117)

Each line is a spoint witness at d5e3860, re-verifiable with git -C /workspace/spoint show d5e3860:<path>.

- Row 6 (physics kernel: sleep, CCD, persistent contacts, warm start): src/physics/World.js lines 91 and 92 set mTimeBeforeSleep 0.25 and mPointVelocitySleepThreshold 0.05. Line 127 sets the linear-cast motion quality from opts.linearCast, the only CCD path. Lines 310 and 311 hold SetMotionQuality and line 557 reads GetMotionQuality. Line 167 sets OnContactPersisted to a no-op, so persistent contacts are observed but not used. git grep finds no warmstart in src/physics or src/shared, so spoint has no explicit warm-start setting.
- Row 7 (joints, springs, axis locks, friction and restitution): src/physics/joltLimits.js line 6 holds DEFAULT_JOLT_LIMITS (maxBodies 10240, maxBodyPairs 65536, maxContactConstraints 10240), with the byte constants on lines 1 to 6 and JoltLimitsError at line 10. This is the Jolt-bound limits surface, which jayzee does not port. src/physics/constraintLimits.js and src/physics/jointMap.js are 57 lines each. jayzee's port is src/motion-pure/constraintLimits.js.
- Row 8 (character controller): src/physics/CharacterManager.js line 6 sets DEFAULT_MAX_SLOPE_ANGLE_RAD = 0.7854, which is 45 degrees and not 60, and line 26 uses it as the default maxSlopeAngle. src/shared/characterStep.js line 4 sets MIN_WALKABLE_NORMAL_Y = 0.5 (a 60-degree normal-Y floor), and line 11 gates walkability on it. CharacterManager.js is 285 lines and Jolt-bound, so it is not ported.
- Row 9 (queries): src/physics/World.js line 794 dispatches raycast, and line 832 defines raycast(origin, direction, maxDistance = 1000, excludeBodyId = null). Lines 811 to 813 build the broad-phase, body and shape filters, and line 867 checks this._dormant.pendingCount. No separate overlap method was found in src/physics/World.js, so overlap is NOT FOUND for this path.
- Row 10 (vehicles): src/physics/VehiclePhysics.js line 32 exports installVehiclePhysics(PhysicsWorld), and lines 42 to 55 use the Jolt vehicle constraint and wheel settings. src/physics/FlightModel.js line 25 exports flightForces and line 12 rotateByQuat. The ported flight model is jayzee src/motion-pure/flightModel.js.
- Row 32 (apps runtime and hook order): src/apps/AppRuntime.js line 430 is _startTrimeshBuild; line 438 calls colliderBuildError and line 440 sets entity.collider to null. This is the GAP-trimesh-failure-propagation path, which is spoint-owned and held. Lines 36 to 39 define colliderBuildError (err.name = 'ColliderBuildError'). Lines 339 to 344 bind the update list: line 340 binds s.update when it is a function, and line 344 binds api.tick for behaviours. onInput is in client/AppModuleSystem.js line 136 and in apps/*/index.js. git grep finds no tracked onSpawn or lateUpdate in src, apps or client, so those two hooks are not in tracked code.
- Row 33 (scripting limits): src/sdk/SESCompartmentEvaluator.js line 71 sets _maxStepsPerTick = opts.maxStepsPerTick ?? 1000000. Lines 122 to 129 hold the __sandboxSteps counter, __sandboxMaxSteps and __checkBudget, which throws "[Sandbox] CPU budget exceeded". _wrapSource (lines 135 to 143) injects no budget call, and the only matches for __checkBudget and __sandboxSteps are the definitions. The step cap is defined but never incremented in tracked code. No 32 MiB memory cap and no 5 s kill were found in tracked src, apps or sdk. This conflicts with jayzee's row 33, which records those as built in jayzee (see [jayzee-gaps.md](jayzee-gaps.md)).

### jayzee's final scan corrections (lines 119 to 129)

These are scoped to the scanned sets and cite the jayzee-side maps under /workspace/spawn/maps/ (old name: spawn). The probe output at /tmp/spawn-probe/sf/ is ephemeral. The results are: the full spawnfile-family scan covered 16 of 16 shards, 2,848 worlds, with 0 refs, 0 worlds and 0 unique URLs (OPEN-007, INFERRED). The /cdn/ family has 2,416 verified GLB refs across 399 worlds and 2,355 unique sha256, each HEAD 200 model/gltf-binary with glTF magic, a lower bound for that family only (OPEN-006). Missing heads total 256, all inside the earlier 259 list, which over-counts by three head-present missing-manifest worlds (5db79de6dae84ceca2ddb9b9a0e216d9, fd80e9d941624c2fbc48fc89193a7417, ffb0a8fbdca948a5933be7bd62fb44b5); the original list is kept (OPEN-011). The head status 0 for world 9f7b1a067caa46e2b2c1c7dceb48bc2b was transient, with HEAD 200 on re-check, and manifest 404 for three worlds did not reproduce (OPEN-012). Non-CDN refs: 83 first-seen status 0, 81 resolved to HEAD 200 on retry, 2 open, a ttf 401 credentialed and an mp4 connection timeout (OPEN-013, OPEN-014). Still open: the full spawnfile key path is elided in jayzee-engine/FAULTS.md F3; spawnfile.io bytes are unconfirmed; "all GLBs on /cdn/" is inferred; the world.assets/<xx>/ bucket rule is undetermined after 74 tested pairs; the name encoder is decode-only; resolve redirect and gone bodies, and manifest frames after the sheet, are not captured (OPEN-008, OPEN-010, OPEN-015, OPEN-016). One live lanmower/deepfall page, filtered on /spawnfile|bigspawn/, hit rqr3rdr46-playco.spawnfile.io, blob: URLs and play.bigspawn.net with glbLike empty over 30 requests; this is one page and does not contradict the 0 refs over 2,848 worlds (OPEN-009, UNVERIFIED).

## Decisions

- Each figure is tagged REPRODUCED, MATCHES RELAY or UNVERIFIED, with the command that produced it. This is why a 56 and a 60 that appeared earlier are corrected in the file rather than silently replaced.
- The tome top-level count of 5 was withdrawn as unsupported, because INDEX.md states no top-level count. The guide index links 3 entries while the tree holds 5 files, and that mismatch is recorded as UNVERIFIED rather than corrected.
- Spoint figures are re-verified against the read-only commit d5e3860, so they are reproducible from git even as the working tree moves.
- A relayed figure that the tree contradicts is recorded as contradicted: 45 degrees against jayzee's 60 for row 8, no tracked step-cap increment for row 33, and 29 built-in apps against the relay's 31.
- The spawnfile and CDN findings are kept as scoped observations, and the file says a scan of a set is not proof of universal absence.

## Open gaps

- The reference total of 208 is UNVERIFIED: the tree measures 207 or 209 depending on the rule.
- The 3,421 feed walk and the 395 asset URLs are UNVERIFIED (the text says them but the walks were not re-run).
- me.doors 60 is UNVERIFIED: the local body holds 42 keys.
- The ASSET_SHAPES claim of 308 types needs a Bearer token and is UNVERIFIED.
- The Skills INDEX byte column is stale for cameras and heightmap-terrain, and the +1 reason is UNVERIFIED.
- Row 33 scripting limits: the step cap is defined but not incremented in tracked spoint code, and the 32 MiB and 5 s limits are not found in tracked spoint code.
- Row 8: the spoint default slope is 45 degrees, not the 60 degree floor the jayzee row describes.
- Rows 13 and 36 closure is peer-reported and not verified.
- The overlap query in spoint is NOT FOUND for row 9.
- The 13 unchecked spoint gap claims and the Wave C model browser are unverified.
- The spawnfile.io bytes, the full key path, and the /cdn/-only claim are open (OPEN-008, OPEN-009, OPEN-010).

## Sources

- /workspace/savi/docs/FEATURESET.md (old name: savi), lines 1 to 130
- /workspace/savi/ENDPOINTS.md (old name: savi)
- /workspace/savi/scripts/openapi.json (old name: savi)
- /workspace/savi/.spawn/reference/http/CATALOG.md (old name: cleetus, old name: spawn)
- /workspace/savi/.spawn/reference/http/api-types.md (old name: cleetus, old name: spawn)
- /workspace/savi/.spawn/reference/COVERAGE.md (old name: cleetus, old name: spawn)
- /workspace/savi/.spawn/reference/tome/INDEX.md (old name: cleetus, old name: spawn)
- /workspace/savi/.spawn/reference/skills/INDEX.md (old name: cleetus, old name: spawn)
- /workspace/savi/spawn-engine/FAULTS.md (old name: cleetus, old name: spawn)
- /workspace/savi/spawn-engine/FEED_SCOPE.md (old name: cleetus, old name: spawn)
- /workspace/savi/spawn-engine/PROJECT_ASSETS.md (old name: cleetus, old name: spawn)
- /workspace/savi/spawn-engine/ASSET_SHAPES.md (old name: cleetus, old name: spawn)
- /workspace/savi/gaps/netcode-optimization-gaps.md (old name: savi)
- /workspace/savi/gaps/morluto-rea-pr-9234-ci-findings.md (old name: savi)
- /workspace/savi/docs/PARITY-INPUTS.md (old name: savi)
- /workspace/savi/docs/OPEN-ITEMS.md (old name: savi)
- /workspace/spoint/src/physics/World.js
- /workspace/spoint/src/physics/joltLimits.js
- /workspace/spoint/src/physics/CharacterManager.js
- /workspace/spoint/src/physics/VehiclePhysics.js
- /workspace/spoint/src/physics/FlightModel.js
- /workspace/spoint/src/shared/characterStep.js
- /workspace/spoint/src/apps/AppRuntime.js
- /workspace/spoint/src/sdk/SESCompartmentEvaluator.js
- /workspace/spoint/src/sdk/authCompare.js
- /workspace/spoint/src/sdk/StaticHandler.js
- /workspace/spoint/src/netcode/InputGuard.js
- /workspace/spoint/.gm/prd.yml
- /workspace/spoint/.gm/witness-out/spawn-feature-gap.md
- /workspace/jayzee/docs/PARITY.md
- /workspace/spawn/maps/spawn-root-worlds-map.md (old name: spawn)
- /workspace/spawn/maps/glb-urls-all.tsv (old name: spawn)
- /workspace/spawn/maps/head404-confirmed-worlds.txt (old name: spawn)
- /workspace/spawn/maps/head-present-manifest404-worlds.txt (old name: spawn)
- /workspace/spawn/maps/unverified-noncdn-refs.tsv (old name: spawn)
