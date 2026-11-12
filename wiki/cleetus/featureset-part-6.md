# Featureset part 6: streams 56 to 58 and the improvement opportunities

## How it works

This page covers lines 820 to 928 of docs/FEATURESET.md (old name: savi). It continues [featureset-part-5.md](featureset-part-5.md) and is followed by [featureset-part-7.md](featureset-part-7.md). It has three parts: the edge Cloudflare Durable Object files and two src/sdk groups (streams 56 to 58), a list of improvement opportunities, and a set of grep-based candidates from streams 33 to 44 that the file itself says are not verified defects.

The method is the same as the other parts. Each citation is path and line at spoint d5e3860 (read-only), re-read through git show. Coverage requires a witness script that names the module and prints RESULT. Importers, concept prose, claim strings in scripts/lib/verify-doc-claims.mjs, and source-text reads are disclosed and not counted as coverage.

The owner rule quoted in the file says the documented featureset is a floor. Where spoint's design is weaker, jayzee should build the better version, and matching spoint's behaviour is not the requirement. The items on this page are therefore improvement opportunities for jayzee, not behaviours to reproduce. The relevant jayzee rows are in [jayzee-gaps.md](jayzee-gaps.md) (rows 50, 60 and 39).

### Stream 56: edge Cloudflare Durable Object files

The four files total 272 lines (59, 102, 21 and 90). cleetus has no word hits for accept-request, do-client-probe, jolt-edge-init, spoint-do or SpointGameRoom.

- edge/cf-do/accept-request.js line 29, acceptRoomRequest(request): 59 lines, 3 exports (acceptRoomRequest, acceptEdgeRequest and refuseResponse). Imported by edge/cf-do/spoint-do.js. No witness.
- edge/cf-do/do-client-probe.mjs line 1, an import of the ws package: 102 lines, no exports. A top-level Node script with no importer. It is run by hand against a live Worker and prints a JSON result with an ok field. It prints no RESULT line, so it is not a witness.
- edge/cf-do/jolt-edge-init.js line 8, initJoltForEdge(): 21 lines, 1 export. Imported by edge/cf-do/spoint-do.js. No witness.
- edge/cf-do/spoint-do.js line 41, class SpointGameRoom: 90 lines, 2 exports (the class and the default Worker export at line 73). Imported by no module, as the Worker entry. No witness.

### Stream 57: src/sdk modules with no per-file citation

The seven modules total 356 lines (39, 52, 30, 51, 58, 76 and 50). The citation test uses the full repository path, so a shorthand name in a list is not a citation.

- src/sdk/WorldLocator.js line 7, worldRoots(project, sdkRoot): 39 lines, 5 exports (worldRoots, findWorldFile, readDefaultWorldName, locateWorld and loadWorldModule). Imported by 13 tracked files, including bin/router-boot.js, src/sdk/MinimapBake.js, src/sdk/RoomDirectory.js, src/sdk/ServerBoot.js and bake and harness scripts. Five RESULT-printing scripts import it and call loadWorldModule: scripts/chart-reanchor-wire-harness.mjs, scripts/cluster-world-harness.mjs, scripts/grass-seam-card-witness.mjs, scripts/planet-multiplayer-harness.mjs and scripts/shared-lattice-surface-witness.mjs. The last two load it through href(). All five are behavioural witnesses. So the stream's statement that no witness names this module for behaviour does not hold for WorldLocator. src/static/BakeCodeVersion.js lists it as a bake input, which is not coverage.
- src/sdk/RoomHealth.js line 1, class RoomHealthError: 52 lines, 2 exports (RoomHealthError and createRoomHealth). No importer in the tracked tree. No witness.
- src/sdk/RoomPick.js line 3, class RoomPickError: 30 lines, 2 exports (RoomPickError and selectRoomForJoin). Imported by src/sdk/RoomOrchestrator.js. No witness.
- src/sdk/RoomRouting.js line 22, firstOpenRoom(rooms, options): 51 lines, 4 exports. No importer in src/. scripts/room-routing-witness.mjs imports the exports and prints RESULT, so it is the only behavioural witness.
- src/sdk/SceneImport.js line 28, mapSceneObject(object, kindToTemplate, index): 58 lines, 2 exports (mapSceneObject and mapScene). No importer in the tracked tree. No witness.
- src/sdk/TiledImport.js line 58, importTiledMap(map): 76 lines, 1 export. No importer. No witness.
- src/sdk/scaffold.js line 34, scaffold(): 50 lines, 1 export. No importer. scripts/lib/verify-doc-claims.mjs names it in a claim string and imports nothing from it, so that is not a witness. No witness.

Disclosed, not coverage: the cleetus lists in docs/PARITY-INPUTS.md and docs/FEATURESET.md name these modules as shorthand list items. docs/JAYZEE-GAPS.md row 50 names RoomHealth, RoomPick and RoomRouting in concept-level prose. docs/FEATURESET.md names WorldLocator only as an importer of worldPresets.js.

### Stream 58: server presence, room directory, agent authoring and nostr auth

The four modules total 510 lines (109, 102, 126 and 173). ServerWeather.js is held by spoint and is not in this stream.

- src/sdk/NostrAuthServer.js line 27, createNostrAuthServer({ enableChallenge, challengeTimeoutMs }): 109 lines, 1 export. Imported by src/sdk/ServerHandlers.js. No witness.
- src/sdk/ServerPresence.js line 37, createServerPresence(opts): 102 lines, 1 export. Imported by src/sdk/ServerBoot.js. No witness.
- src/sdk/RoomDirectory.js line 6, class RoomDirectory: 126 lines, 1 export. Imported by bin/room-worker-boot.js and by the src/sdk process worker covered in stream 25 part 2. No witness. The importer-only citation in that section is not coverage.
- src/sdk/AgentAuthoringAPI.js line 51, createAgentAuthoringHandler(): 173 lines, 1 export. Imported by src/sdk/ServerAPI.js and routed for /agent/ paths. scripts/verify-app.mjs calls the read routes /agent/apps and /agent/entities over HTTP against a live server and prints RESULT. That is a live behavioural witness of the read routes only. The module is not imported there, and no tracked witness covers the write routes.

Disclosed, not coverage: docs/PARITY-INPUTS.md, docs/FEATURESET.md and docs/JAYZEE-GAPS.md row 50 list all four as concept-level prose. docs/FEATURESET.md line 580 records that AgentAuthoringAPI.js names create-app.js, a reference from another module that is not coverage of this one.

### Improvement opportunities (not behaviour to match)

The owner rule makes the documented featureset a floor. Each item is spoint's weaker design, recorded for jayzee to build better:

- src/connection/SessionStore.js line 11, this.ttl = options.ttl || 30000: a silent default for the session time-to-live. A missing or zero option falls back to 30000 without a warning.
- src/game/StatsSystem.js line 8, spec.xpPerLevel else 100: a silent experience-per-level default of 100 when the spec does not give a positive number.
- src/sdk/SESCompartmentEvaluator.js line 125, endowments.__checkBudget: the budget check is defined here and has no caller anywhere in the repository at d5e3860, so the step budget is not enforced through it.
- src/static/BakeCodeVersion.js line 147, inputs: BAKE_INPUTS_GLB_TRANSFORM: the GLB transform pin lists a named set of inputs, not the import closure of its entry, so an edit to an unlisted import does not change the pin.

The next items come from streams 33 to 35. They are grep-based candidates, not verified defects, and they are not behaviours jayzee must reproduce:

- src/shared/SpawnSurface.js line 68: a non-finite terrainY silently takes the branch that ignores it. The argument check validates pose[1] but not terrainY.
- src/shared/colliderLattice.js lines 10 and 19: an invalid physics.extent or physics.resolution returns null, which the ?? replaces with a literal default, so no refusal is raised.
- src/shared/MinimapBiome.js line 38: a non-finite height zero-fills the output and returns null, a sentinel for absence.
- bin/room-orchestrator-boot.js line 14 and bin/room-worker-boot.js line 59: numeric environment values are parsed with no finite check, so an invalid value becomes NaN rather than a refusal.
- bin/router-boot.js line 25: a 0 or NaN from the shard cell size becomes undefined without a refusal.
- bin/marketplace-registry.js line 7: PORT has no finite check.
- bin/marketplace-install.js line 17: the registry URL silently defaults to localhost.
- client/core/GrassTSL.js line 33 and client/core/GrassMaterial.js line 152: any falsy density, including 0, silently becomes the default.
- client/core/GrassClump.js lines 73 and 74: an invalid segments or cards value becomes a literal default without a refusal.
- client/core/GrassWindField.js line 137: an invalid reach silently takes the default.
- client/core/GrassMaterial.js line 117: a silent fallback.
- The grass law is held in one place, GRASS_DENSITY from src/terrain/GrassPlacement.js, but the shader-side fade is written in both GrassTSL and GrassMaterial. A change to one side alone can desynchronise them. This is a design candidate.

The next items come from streams 36 to 40, again grep-based candidates:

- client/core/WetnessTint.js line 54 and client/core/WetnessTintTSL.js line 36: an absent or invalid wetness silently becomes 0, a sentinel for absence.
- client/core/UnderwaterTint.js line 89: an invalid planetRadius is skipped silently, which leaves the previous uniform in place.
- client/core/UnderwaterTintTSL.js line 51: a non-finite seaY is a silent no-op.
- client/core/PostFxLook.js line 38: a silent default for an optional exposure field.
- client/core/CullingHub.js lines 15, 17 and 18: a null sentinel, and non-finite values skipped silently.
- client/core/TerrainOcclusion.js lines 8, 9 and 24: silent defaults for absent options. Line 25 drops an invalid setMaxQueriesPerFrame value without a refusal.
- client/core/TerrainOcclusion.js lines 135, 178 and 207: silent literal defaults with || 1.
- client/core/WebGPUCullingHubIntegration.js line 35: an invalid view-projection is silently replaced. Line 93 turns an absent count into 0.
- client/core/WebGPUCullingHubIntegration.js line 141: a failed GPU compute cull is reported on a fail-open path. The file cites AGENTS.md for the rule that a GPU and CPU divergence culls the wrong cells. This is a candidate, not a verified defect.
- client/core/Bloom.js line 100 and client/core/BloomWebGPU.js line 62: a stored 0 for bloomResolutionScale silently becomes 0.5.
- client/core/Bloom.js line 157 and client/core/BloomWebGPU.js line 122: a stored 0 for bloomBlurPasses becomes 1, and a non-finite value is not refused.
- client/core/FSR1.js lines 216 and 217: a literal default for an absent device pixel ratio.
- client/core/Bloom.js line 87 and client/core/FSR1.js line 83: RenderControls values are read straight into uniforms at construction, with no validation at that boundary.
- client/core/SSR.js line 212 and client/core/SSRWebGPU.js line 218: an absent wetness and a zero wetness are not distinguished.
- client/core/SSR.js line 272 and client/core/SSRWebGPU.js line 277: a missing weather reading becomes 0 silently, the same class as WetnessTint.js line 54.
- client/core/SSR.js line 243 and client/core/SSRWebGPU.js line 250: a null sentinel for an absent G-buffer.
- client/core/SSRWebGPU.js line 292: a global read of window.__underwaterTint with a null fallback, not an injected dependency.
- client/core/PlayerLOD.js lines 81 to 83, repeated at lines 135 to 137: literal defaults in two places, so a zero is replaced silently and the two copies can drift.
- client/core/PlayerVAT.js lines 137 and 141: a zero nominalSpeed becomes 4.0. Line 120 derives blendHighSpeed from the same literal.
- client/core/PlayerVAT.js line 202: a failed uniform write is dropped without a report.
- client/core/PlayerVAT.js lines 293 and 295: null is the sentinel for an absent renderer or mesh.
- client/core/PlayerVATBake.js lines 77 and 148: a literal maxTexSize default, and a null sentinel for baked[0].

The next items come from stream 41, grep-based candidates:

- client/core/Rocks.js line 89: a non-finite seed is coerced to 0 silently.
- client/core/Rocks.js lines 92 and 97: a non-finite config value falls back to a literal (renderDistance 320, MAX_INSTANCES 12000), and a zero value is silently replaced.
- client/core/Rocks.js lines 102 and 118: a failed geometry build becomes null or -1 with a console.error, and the build continues.
- client/core/Rocks.js line 276: a non-finite position returns a count of 0.
- client/core/VegetationAmbientTSL.js lines 50, 54 and 61: a silent fallback; muS is set to 1 when elevation is non-finite; the ambient update is skipped silently.
- client/core/VegetationTSL.js line 9: the window.__vegWind global is written to a uniform with no finite check first.

The next items come from stream 42, grep-based candidates:

- client/core/Vegetation.js line 75: a failed load of the ez-tree package skips all vegetation for the session and logs an error. The rest of the client continues. This is a fail-soft choice to weigh.
- client/core/Vegetation.js line 79 and lines through 116: invalid config becomes a literal default at one boundary, with no refusal.
- client/core/Vegetation.js lines 115 and 116: a non-numeric ?vegVariants= URL value falls back silently.
- client/core/Vegetation.js lines 199 and 254: an impostor bake failure falls back to mesh LOD only, with a warning.
- client/core/Vegetation.js line 378: a placement failure is swallowed and the list becomes null.
- client/core/VegetationBuild.js line 90: a decode failure is swallowed, and a size check takes over.
- client/core/VegetationBuild.js lines 493 and 516: silent literal defaults for an absent name or height.
- client/core/VegImpostorTier.js line 91: silent literal defaults for absent options.
- client/core/VegImpostorTier.js lines 147, 158, 185, 222 and 231: addLOD, setUniformAt, removeInstances, setAttributeAt and releaseId are wrapped in try and catch with no report, so a failed write is dropped.
- client/core/Vegetation.js line 262 logs and rethrows a species failure, which is consistent with the AGENTS.md rule, so it is not a candidate.

A documentation improvement opportunity, scoped to one example: cleetus's reference gives new LineBasicNodeMaterial({ color, linewidth: 3 }) at .spawn/reference/engine/api-reference.md line 2201, and .spawn/reference/engine-deep/api-b.md line 309 says linewidth is in CSS pixels at every distance. jayzee's gate at commit 37bd320 accepts the example as written (scripts/check-upstream-builtin-three.mjs line 93), and jayzee keeps this note OPEN in its AGENTS.md. The reviewer's claim that three's public docs give a width of 1 on most WebGL platforms, so Line2NodeMaterial may be needed for every-distance width, is not verified here, because three is not installed in the repository.

The final group, from streams 43 and 44, starts with client/core/WebGPULodInstancer.js line 139 (a non-finite hysteresis option silently takes a default), and lines 140 and 141 (shadowDistance uses -1 as a no-shadow sentinel without a refusal). The items continue on the next page, [featureset-part-7.md](featureset-part-7.md).

## Decisions

- Coverage is per file, with a witness script that names the module and prints RESULT. Importers, prose and claim strings do not count.
- The file treats silent defaults and sentinel values as a class of improvement opportunity, not as defects, and says each is a grep candidate that jayzee need not reproduce.
- The three-line width claim is kept as the reviewer's statement, with the reason it cannot be checked here (three is not installed).
- Routes and read-only behaviour are witnessed by live scripts only where the script calls them (verify-app.mjs reads the read routes, not the write routes).

## Open gaps

- Stream 56: all four Durable Object files have no witness; do-client-probe.mjs prints no RESULT line.
- Stream 57: RoomHealth, RoomPick, SceneImport, TiledImport and scaffold have no witness; RoomRouting has one; WorldLocator has five.
- Stream 58: NostrAuthServer, ServerPresence and RoomDirectory have no witness; AgentAuthoringAPI has a live witness of read routes only, not the write routes.
- The four spoint design items (SessionStore ttl, StatsSystem default, the unused __checkBudget, the BakeCodeVersion input list) are recorded, not fixed.
- The grep candidates above are unverified; each needs a check before it is treated as a defect.
- The LineBasicNodeMaterial linewidth note is OPEN in jayzee's AGENTS.md, and the three-line width claim is unverified.
- The grass density law is duplicated in shader and material code, so the two copies can drift.

## Sources

- /workspace/savi/docs/FEATURESET.md (old name: savi), lines 820 to 928
- /workspace/savi/docs/JAYZEE-GAPS.md (old name: savi), row 50
- /workspace/savi/docs/PARITY-INPUTS.md (old name: savi)
- /workspace/savi/.spawn/reference/engine/api-reference.md (old name: cleetus, old name: spawn), line 2201
- /workspace/savi/.spawn/reference/engine-deep/api-b.md (old name: cleetus, old name: spawn), line 309
- /workspace/spoint/edge/cf-do/accept-request.js
- /workspace/spoint/edge/cf-do/do-client-probe.mjs
- /workspace/spoint/edge/cf-do/jolt-edge-init.js
- /workspace/spoint/edge/cf-do/spoint-do.js
- /workspace/spoint/src/sdk/WorldLocator.js
- /workspace/spoint/src/sdk/RoomHealth.js
- /workspace/spoint/src/sdk/RoomPick.js
- /workspace/spoint/src/sdk/RoomRouting.js
- /workspace/spoint/src/sdk/SceneImport.js
- /workspace/spoint/src/sdk/TiledImport.js
- /workspace/spoint/src/sdk/scaffold.js
- /workspace/spoint/src/sdk/NostrAuthServer.js
- /workspace/spoint/src/sdk/ServerPresence.js
- /workspace/spoint/src/sdk/RoomDirectory.js
- /workspace/spoint/src/sdk/AgentAuthoringAPI.js
- /workspace/spoint/src/sdk/SESCompartmentEvaluator.js
- /workspace/spoint/src/connection/SessionStore.js
- /workspace/spoint/src/game/StatsSystem.js
- /workspace/spoint/src/static/BakeCodeVersion.js
- /workspace/spoint/src/shared/SpawnSurface.js
- /workspace/spoint/src/shared/colliderLattice.js
- /workspace/spoint/src/shared/MinimapBiome.js
- /workspace/spoint/bin/room-orchestrator-boot.js
- /workspace/spoint/bin/room-worker-boot.js
- /workspace/spoint/bin/router-boot.js
- /workspace/spoint/bin/marketplace-registry.js
- /workspace/spoint/bin/marketplace-install.js
- /workspace/spoint/client/core/ (Grass, Wetness, Underwater, PostFx, Culling, Terrain, WebGPU, Bloom, FSR1, SSR, PlayerLOD, PlayerVAT, Rocks, Vegetation, VegetationAmbientTSL, VegetationTSL, VegetationBuild, VegImpostorTier and WebGPULodInstancer modules cited above)
- /workspace/spoint/scripts/room-routing-witness.mjs
- /workspace/spoint/scripts/verify-app.mjs
- /workspace/spoint/scripts/lib/verify-doc-claims.mjs
- /workspace/jayzee/scripts/check-upstream-builtin-three.mjs (jayzee, at jayzee commit 37bd320)
