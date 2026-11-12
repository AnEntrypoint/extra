# Featureset part 3: streams 26 to 34

## How it works

This page covers lines 361 to 590 of docs/FEATURESET.md (old name: savi). It continues [featureset-part-2.md](featureset-part-2.md) and is followed by [featureset-part-4.md](featureset-part-4.md). Every stream is a read-only survey of spoint at d5e3860. Each citation is path and line, with the snippet found there, re-read through git show d5e3860 before the section was written. The survey narrows the tracked files of a directory by removing those already covered by another stream, and then records the remainder. Negatives are recorded as the grep that produced them. Nothing was written into spoint. The gate scripts/check-featureset.mjs (old name: savi) repeats the scans for these streams.

The sections on this page are the src/behaviours, src/apps, ServerBoot and StaticCache, chartState migrators, client HUD, procgen, effects, physics, shared, and bin modules. Their rows are in [jayzee-gaps.md](jayzee-gaps.md) (rows 19, 23, 24, 26, 32, 39, 40, 51, 53, 54, 55 and 57).

### Stream 26: src/behaviours modules with no cleetus mention

The survey took the 35 tracked src/behaviours/*.js files, removed 5 fire-named files (stream 23), removed 11 with a case-sensitive basename hit in cleetus's docs or gaps, and kept 19 files totalling 2210 lines and 46 export lines.

- buoyancy.js line 3, defineBuoyancy(spec, appCtx): imported by src/apps/AppContext.js; witnessed by scripts/define-spec-coverage-witness.mjs.
- cameraRig.js line 129, defineCameraRig: imported by src/apps/AppContext.js; no witness script.
- checkpoint.js line 3, defineCheckpoint(spec, appCtx): imported by src/apps/AppBehaviours.js and src/apps/AppContext.js; witnessed by scripts/checkpoint-nested-radius-witness.mjs and scripts/define-spec-coverage-witness.mjs.
- decisionPipe.js line 1, DecisionPipeError: imported only by src/behaviours/decisionRuntime.js, so no witness of its own.
- decisionRuntime.js line 9, createDecisionRuntime: no code importer; witnessed by scripts/decision-runtime-witness.mjs.
- destructibleSpec.js line 3, validateDestructibleSpec: imported by src/behaviours/destructible.js; no witness script.
- fluid3d.js line 25, createFluid3DBody: imported by src/apps/AppContext.js; no witness script.
- game-fsm.js line 12, GameFSMError: imported by apps/_lib/game-fsm.js, src/animation/AnimationController.js, src/apps/AppContext.js and src/behaviours/README.md; no witness script.
- gamemode.js line 1, defineGameMode: imported by apps/_lib/gamemode.js and src/apps/AppContext.js; no witness script.
- pickup.js line 3, definePickup: imported by src/apps/AppBehaviours.js and src/apps/AppContext.js; witnessed by scripts/define-spec-boundary-witness.mjs.
- projectile.js line 3, sweepProjectile(raycast, from, velocity, dt): 18 lines; no code importer by exact path; no witness script.
- projectileGravity.js line 9, stepProjectile: no code importer; witnessed by a behaviour witness script.
- shrinking-zone.js line 51, defineShrinkingZone: imported by apps/_lib/shrinking-zone.js and src/apps/AppContext.js; no witness script.
- specBoundary.js line 39, parseDefineSpec(name, spec, schema): imported by src/apps/AppContext.js, three scripts/define-spec-* witnesses and eight behaviour files (buoyancy, checkpoint, combat, health, path, pickup, teams, weapon).
- steering.js line 52, defineSteering: imported by apps/_lib/steering.js, src/apps/AppBehaviours.js and src/apps/AppContext.js; no witness script.
- teams.js line 4, COLORBLIND_SAFE_PALETTE: imported by apps/_lib/teams.js, scripts/define-spec-boundary-witness.mjs, src/apps/AppBehaviours.js and src/apps/AppContext.js.
- trade.js line 49, settleTrade: imported only by scripts/two-sided-trade-witness.mjs.
- voxels.js line 208, createVoxelPart: imported only by scripts/voxels-witness.mjs.
- weapon.js line 6, defineWeapon: imported by apps/_lib/weapon.js, scripts/define-spec-boundary-witness.mjs and src/apps/AppContext.js.

Negatives: no exact-path importer for projectile.js; no cleetus docs or scripts name the 19 modules by basename. The word hits trade and voxels in openapi.json descriptions are incidental. JAYZEE-GAPS.md row 53 names buoyancy, fluid, destructible core and health as family-level status, not these files.

### Stream 27: src/apps modules with no cleetus mention

The survey took the 23 tracked src/apps/*.js files and removed four with a case-sensitive cleetus basename hit (AppContext, AppRuntime, Progression and Ragdoll), leaving 19 files totalling 2545 lines and 54 export lines. Importers were re-derived with exact-path git grep -lE and match spoint's list.

- AccountState.js line 6, AccountStateError: imported by src/apps/AppRuntime.js; no witness script.
- AppBehaviours.js line 9, BEHAVIOUR_FACTORIES (frozen): imported by AppRuntime.js; no witness script.
- AppGameplay.js line 21, MAX_FOOTPRINT_INTRUSION_M = 0.15: imported by client/app.js, client/editor/sdk-typings.generated.d.ts, AccountState.js and AppContext.js; no witness script.
- AppLoader.js line 29, class AppLoader: imported by src/sdk/WorkerEntry.js and src/sdk/server.js; witnessed by scripts/app-loader-refusal-witness.mjs.
- AppPhysics.js line 13, parseInteractable(config): imported by AppContext.js, AppRuntime.js and AppRuntimePhysics.js; no witness script.
- AppRuntimePhysics.js line 5, mixinPhysics(runtime): imported by AppRuntime.js; no witness script.
- AppRuntimeState.js line 33, a re-export list (containedAssetPath, tagAppState, untagAppState and others): imported by AppRuntime.js; no witness script.
- AppRuntimeStaticMotion.js line 4, captureTransform(xf, e): imported by AppRuntime.js, AppRuntimeTick.js and src/static/BakeCodeVersion.js (importer only).
- AppRuntimeTick.js line 11, mixinTick(runtime): imported by AppRuntime.js and src/static/BakeCodeVersion.js (importer only); no witness script.
- AppSeats.js line 1, SeatError: imported by AppRuntime.js; no witness script.
- ComponentPool.js line 10, createComponentPool(spec): imported by apps/_lib/ComponentPool.js, src/behaviours/health.js, src/behaviours/steering.js and src/sdk/scaffold.js; no witness script.
- CustomVersion.js line 1, installCustomVersion(entity): imported by AppRuntime.js; no witness script.
- EcsEntityMap.js line 7, createEcsEntityMap: imported by AppRuntime.js and src/static/BakeCodeVersion.js (importer only); no witness script.
- EventBus.js line 1, class EventBus: imported by AppRuntime.js, src/sdk/WorkerEntry.js and src/sdk/server.js; no witness script.
- HotReloadQueue.js line 3, class HotReloadQueue: imported by AppRuntime.js; no witness script.
- SurfaceSelector.js line 3, parseSurfaceSelector(spec): imported by client/core/MobileControls.js; no witness script.
- SurfaceSelectorRuntime.js line 7, createSurfaceSelectorRuntime({ labels, maxSwapsPerSecond = 4, now }): imported by scripts/touch-selector-channels-witness.mjs, which is its witness.
- appImports.js line 1, ENGINE_ALIASES (frozen): imported by client/BrowserServer.js, src/apps/AppLoader.js, src/apps/appsManifest.js, scripts/check-app-imports.mjs and scripts/static-export.mjs; witnessed by check-app-imports.mjs and static-export.mjs.
- appsManifest.js line 10, resolveAppEntry(name, dirs): imported by src/sdk/ServerBoot.js (importer only), scripts/bundle-apps-manifest.mjs and scripts/static-export.mjs; witnessed by bundle-apps-manifest.mjs and static-export.mjs.

Negatives: no script under scripts/*.mjs or scripts/*.js references the 15 modules with no witness script by path. cleetus's docs and scripts name none of the 19 modules, except AppBehaviours, which appears only as an importer in four stream 26 citations. Directory-level: JAYZEE-GAPS.md line 65 (row 32) is jayzee's family-level status, and docs/FEATURESET.md line 116 names only AppRuntime.js line 430.

### Stream 28: ServerBoot and StaticCache

The two modules total 684 lines: src/sdk/ServerBoot.js (308 lines, 15 exports) and src/sdk/StaticCache.js (376 lines, 18 exports). Stream 18 does not cover them, so they are folded here.

- ServerBoot.js line 16, buildUniquePathList(paths): the first of 15 exports, which also include collectWatchableFiles, CLIENT_ROOT_BUNDLE, CLIENT_ROOT_RAW, clientBundleFreshness, workerBundleFreshness, clientRootState, staticClientRoot, buildStaticDirs, assertNodeModulesLinked, resolveAppsDirs, worldScopedManifestFile, ensureServedAppsManifest, boot and installGracefulShutdown.
- ServerBoot.js line 23, collectWatchableFiles: the watchable file walk. Line 39, CLIENT_ROOT_BUNDLE = 'bundle'. Line 42, clientBundleFreshness(sdkRoot). Line 56, staticClientRoot. Line 75, buildStaticDirs(sdkRoot, project, appsDirs). Line 107, assertNodeModulesLinked. Line 130, ensureServedAppsManifest. Line 166, boot(overrides). Line 291, installGracefulShutdown(server, presence).
- StaticCache.js line 16, compress(raw, encoding): the first of 18 exports, which also include compressAsync, GZIP_EXTENSIONS, MAX_CACHEABLE_BYTES, ByteBudgetLRU, fileCache, transformedCache, contentHashETag, isNodeModulesPath, STATIC_CACHE_DIR, CACHE_REFUSAL, readCacheEntry, pruneStaticCache, getCached, getTransformedCached, prewarmCompression, parseRange and serveRangeable.
- StaticCache.js line 25, GZIP_EXTENSIONS (a Set). Line 27, MAX_CACHEABLE_BYTES = 20 * 1024 * 1024. Line 31, class ByteBudgetLRU. Line 82, contentHashETag(fp, raw, mtime). Line 155, readCacheEntry(fp, encoding, stamp). Line 340, parseRange(rangeHeader, totalSize). Line 361, serveRangeable(req, res, buf, headers).

Importers, by exact-path git grep over src, client, apps, packages, scripts, bin and edge: ServerBoot.js is imported by bin/router-boot.js, src/sdk/server.js, src/sharding/RegionRouter.js and src/sharding/RegionWorkerEntry.js. StaticCache.js is imported only by src/sdk/StaticHandler.js. Neither module has a witness script, and neither is named in cleetus's JAYZEE-GAPS.md, OPEN-ITEMS.md, PARITY-INPUTS.md or scripts.

### chartState per-file migrators (stream 19 addendum)

- src/sdk/chartState/migratePlayers.js line 25, createPlayerMigrator({ playerManager, networkState, lagCompensator, physicsIntegration }): the player migrator factory. The file is 51 lines with one export.
- src/sdk/chartState/migrateWorldAnchors.js line 5, createWorldAnchorMigrator({ ctx, stageLoader }): the world-anchor migrator factory. The file is 27 lines with one export.
- src/sdk/chartState/index.js lines 3 and 5 import each migrator, and are the only importers of either.

Neither migrator has a witness script under scripts/, and neither is imported outside chartState/index.js. No migration is run.

### Stream 29: client HUD modules with no cleetus mention

The survey took the 18 tracked client/hud/*.js files, removed PeerHostUI.js (covered at docs/FEATURESET.md line 561), and kept 17 files totalling 2254 lines and 31 export lines. Each module is listed with its line and importer:

- Chat.js line 21, createChatHUD(uiRoot, getBridge): imported by client/app.js.
- ChatQuickWheel.js line 3, DEFAULT_QUICK_MESSAGES (with a second export): imported by client/app.js.
- EmoteWheel.js line 31, createEmoteWheel(slots): imported by client/app.js and client/hud/ChatQuickWheel.js.
- HudStats.js line 3, publishHudStat(key, value): three exports; imported by client/app.js and client/xr/XRSystem.js.
- MeshDebugPanel.js line 17, createMeshDebugPanel(uiRoot): imported by client/app.js and client/core/RenderControls.js.
- MinimapGlyphs.js line 20, paintChunkGlyphs(ctx, packed, originX, originZ, pxPerMeter, dpr, relief): imported by client/hud/MinimapHUD.js.
- MinimapHUD.js line 28, minimapGridOrigin(centreM, spanM, cells): five exports; imported by client/app.js.
- MinimapModels.js line 36, createModelFootprints(): imported by client/hud/MinimapHUD.js.
- MinimapPlacements.js line 6, GLYPH_STRIDE = 4: four exports; imported by MinimapGlyphs.js and MinimapHUD.js.
- MobileControlsUI.js line 107, createMobileControlsUI(controls, buttons): imported by client/app.js.
- PauseMenu.js line 48, createPauseMenu: imported by client/app.js.
- RenderDebugPanel.js line 3, leafPhrase(leafOffM): four exports; imported by client/app.js and client/core/RenderControls.js.
- SettingsMenu.js line 80, createSettingsMenu: imported by client/app.js.
- VoiceIndicator.js line 43, createVoiceIndicator(uiRoot, getBridge): imported by client/app.js.
- createLoadingScreen.js line 3, createLoadingScreen(loadingManager): imported by client/app.js.
- createLobby.js line 21, createLobby({ world, onClose }): imported by client/app.js.
- ensureStyle.js line 1, ensureStyle(id, css): imported by ten client/hud files, including PeerHostUI.js.

Witnesses: no file in scripts/ names any of the 17. cleetus's docs name none of them; the case-sensitive word Chat has no hit in docs or gaps.

### Stream 30: src/procgen modules with no cleetus mention

The four modules are the whole src/procgen directory, totalling 563 lines and 13 export lines.

- LSystem.js: expandLSystem at line 13 (imported by client/editor/ProcgenPanel.js), interpretTurtle at line 80, generateLSystemTree at line 143, and PRESETS at line 149.
- NoiseTerrain.js: createNoise2D at line 35 (imported by client/editor/ProcgenPanel.js and src/procgen/TextureScript.js), createFbm2D at line 59, generateHeightfield at line 76, and createHeightSampler at line 143.
- TextureScript.js: line 1 imports createFbm2D from NoiseTerrain.js; paintTexture at line 16. No importer outside the directory.
- WFC.js: DIRS (frozen) at line 13, rulesFromSockets at line 40, runWFC at line 64, and runWFCWithRetries at line 166 (imported by client/editor/ProcgenPanel.js, the only consumer outside the directory for LSystem, NoiseTerrain and WFC).

Witnesses: no file in scripts/ names LSystem, NoiseTerrain, TextureScript, WFC or procgen. cleetus's docs and scripts name none of them, and the directory string src/procgen has zero hits. ProcgenPanel appears in cleetus's docs only in this section and in the stream 24 disclosure.

### Stream 31: src/effects modules with no cleetus mention

The directory has two modules totalling 275 lines and four export lines.

- src/effects/DamageEffects.js line 1, createDamageEffects(scene, camera, audioListener, config): the module's only export. It is consumed at runtime through a window global, not an import in the apps tree.
- client/app.js line 17 imports the module; line 1942 publishes it as window.__damageEffects.
- apps/hit-feedback/index.js line 72 reads the global at runtime through an optional chain.
- src/effects/fxProgram.js line 13, FxProgramError; line 79, parseFxProgram(source); line 107, createFxSimulation(program). The module has no importer: a git grep for fxProgram, excluding its own file, finds nothing.

Witnesses: none in scripts/ for DamageEffects or fxProgram. cleetus's docs, gaps and scripts have zero hits for those names, the directory string, or the phrases damage effect and fx program.

### Stream 32: src/physics modules with no cleetus mention

The six modules total 508 lines and 20 export lines.

- DracoDecompressor.js line 3, getDracoDecoder(): imported only by src/physics/GLBLoader.js; no witness. Line 16, decompressDracoMesh(buf, json, prim, binOffset, meshName).
- GLBLoader.js line 5, SKIP_MATS (a Set): the material names the loader skips. The module has six exports and is imported by two src/apps modules, two other src/physics modules, one src/sdk module and scripts/bake-navmesh.mjs. Its only script importer is the bake script, which is a bake and not a witness. Line 48, extractStandardMesh(buf, json, prim, binOffset, meshName).
- GLBMath.js line 1, mat4Identity(), and line 5, mat4TRS(t, r, s), one of five exports. Imported by scripts/bake-navmesh.mjs (a bake, not a witness) and src/physics/GLBLoader.js.
- MeshoptDecompressor.js line 3, getMeshoptDecoder(): imported only by src/physics/GLBLoader.js; no witness. Line 16, extractMeshWithMeshopt(buf, json, prim, binOffset, meshName).
- pivotTransform.js line 10, pivotTransform({ position, pivot, quaternion, scale }): three exports; its only importer is scripts/pivot-riders-witness.mjs, its witness.
- surfaceVelocity.js line 4, beltVelocity({ surfaceVelocity, ... }): two exports; its only importer is scripts/surface-velocity-witness.mjs, its witness.

Witnesses: none for DracoDecompressor or MeshoptDecompressor. pivotTransform and surfaceVelocity have their own witnesses. GLBLoader and GLBMath are imported only by the bake script, which is not a witness.

### Stream 33: src/shared modules with no cleetus mention

Fourteen src/shared modules total 1074 lines. Cleetus's docs and scripts were scanned case-insensitively for the 14 basenames; the only near hit was spawnSurfaceGround in docs/JAYZEE-GAPS.md, a different name in src/sdk/Relocation.js. The 45 src/shared files give this set of 14 once the fire modules, the chart modules and cacheCodeVersions are set aside.

- MinimapBiome.js line 9, biomeColor(height, temp, humidity, seaLevel): 83 lines, 4 exports; imported by one client HUD module, scripts/bake-minimap.mjs and scripts/circumnavigate.mjs. Both scripts are witnesses.
- SpawnSurface.js line 21, columnSurfaces(raycast, x, topY, z): 79 lines, 2 exports; imported by two src/apps modules and src/sdk/Relocation.js. No tracked witness script.
- ballistics.js line 21, elevation(speed, g, distance, rise): 68 lines, 2 exports; imported by scripts/ballistics-lead-witness.mjs, its witness. scripts/check.mjs also names it.
- bookmarks.js line 33, listBookmarks(worldDef, frame, fromBase): 56 lines, 1 export; imported by client/core/Relocation.js. No tracked witness.
- canonicalJSON.js line 8, canonicalJSON(value): 15 lines, 1 export; imported by src/netcode/LockstepGameLoop.js, src/netcode/RollbackGameLoop.js, src/sdk/WorldPersistence.js and src/shared/terrainConfig.js. No tracked witness.
- clusterAssignment.js line 4, CLUSTER_STAY_FACTOR = 1.25: 220 lines, 8 exports; imported by src/sharding/ClusterManager.js and src/shared/clusterConfig.js. No tracked witness.
- colliderLattice.js line 2, COLLIDER_DEFAULT_EXTENT_M = 510: 84 lines, 5 exports; imported by client/core/TerrainBackdrop.js through a dynamic import. Witnessed by scripts/grass-seam-card-witness.mjs and scripts/nearfield-lod-lattice-witness.mjs.
- equipment.js line 1, EQUIP_UNARMED = 0: 46 lines, 12 exports; imported by client/app.js and src/apps/AppRuntime.js. Witnessed by scripts/world-movement-parse-witness.mjs.
- materialSlots.js line 33, parseMaterialSlots(raw): 46 lines, 1 export; imported by src/sdk/EditorHandlers.js. No tracked witness.
- modelLoadErrors.js line 3, modelLoadRefusal(url, cause): 76 lines, 9 exports; imported by client/core/SceneSetup.js, client/core/modelLoadGate.js, src/sdk/EditorHandlers.js and src/sdk/ServerAPI.js. Witnessed by five scripts: entity-loader-refusal-witness.mjs, failed-entity-no-env-done-witness.mjs, placed-model-load-witness.mjs, prefab-load-witness.mjs and three-loader-error-witness.mjs.
- relevanceRadius.js line 1, DEFAULT_RELEVANCE_RADIUS_M = 200: 11 lines, 2 exports; imported by src/sdk/ServerHandlers.js, src/sdk/TickHandler.js, src/sdk/WorkerEntry.js, src/sdk/server.js, src/spatial/Octree.js and src/stage/Stage.js. Witnessed by scripts/cluster-world-harness.mjs, scripts/lib/verify-doc-claims.mjs and scripts/netcode-conditioner-harness.mjs.
- vec3.js line 7, readVec3(value, name): 74 lines, 14 exports; imported by one src/behaviours module, src/interaction/pressRouter.js, src/physics/pivotTransform.js and src/physics/surfaceVelocity.js. Witnessed by scripts/vec3-witness.mjs, scripts/pivot-riders-witness.mjs, scripts/surface-velocity-witness.mjs and a behaviour witness. scripts/check.mjs also names it.
- worldPresets.js line 7, WORLD_PRESETS (frozen: tps, arena, planet, platformer, rts): 56 lines, 2 exports; imported by 12 modules, including client/app.js, src/sdk/MinimapBake.js, src/sdk/ServerAPI.js, src/sdk/WorkerEntry.js, src/sdk/WorldLocator.js and five scripts (bake-heightfield.mjs, bake-minimap.mjs, bake-navmesh.mjs, bundle-apps-manifest.mjs, check-app-imports.mjs and circumnavigate.mjs). The bake and check scripts are the witnesses.
- worldResolve.js line 14, WORLD_NOT_A_PLAIN_OBJECT = 'world-not-a-plain-object': 160 lines, 6 exports; imported by client/app.js, a reload handler in src/sdk, src/sdk/ServerAPI.js and src/sdk/WorkerEntry.js. Witnessed by scripts/world-movement-parse-witness.mjs and scripts/lib/verify-doc-claims.mjs.

No tracked witness script exists for SpawnSurface, bookmarks, canonicalJSON, clusterAssignment or materialSlots; a git grep over scripts/ returns no file for these five.

### Stream 34: top-level bin boot and tooling scripts

The eight top-level bin/*.js files total 1313 lines: create-app.js 97, create-project.js 152, marketplace-install.js 121, marketplace-registry.js 248, room-orchestrator-boot.js 173, room-worker-boot.js 146, router-boot.js 59 and templates.js 317. bin/project-template and bin/project-templates are excluded as template app files.

- create-app.js is named by package.json, by server.js through a dynamic import, and by src/sdk/AgentAuthoringAPI.js. No cleetus hit.
- create-project.js is named by package.json. No cleetus hit.
- room-orchestrator-boot.js is named by package.json. cleetus names RoomOrchestrator only in surface lists.
- room-worker-boot.js is named by no tracked source file, and has no cleetus hit.
- marketplace-install.js and marketplace-registry.js are named by no tracked source file. cleetus has one hit each, in the stream 25 part 2 section, which is an importer mention and not coverage.
- router-boot.js is named by package.json. cleetus has one hit, in the stream 28 section, as an importer of ServerBoot.js.
- templates.js is imported by bin/create-app.js and src/sdk/AgentAuthoringAPI.js. cleetus's only hit is an incidental word in scripts/openapi.json.

Witnesses: git grep over scripts/ returns no file for any of the eight. room-worker-boot has no tracked reference at all, and marketplace-install and marketplace-registry have none in tracked source. These are grep witnesses, not runs.

## Decisions

- Each stream narrows its set by an explicit rule (remove files covered by another stream, remove files with a cleetus basename hit, remove files with a witness), so the scope of each survey is stated and reproducible.
- A module is "covered" only when a witness script names it. Importers that are bake scripts or harnesses are disclosed as importers and not claimed as witnesses (GLBLoader, GLBMath, and the editor's ProcgenPanel).
- Negatives are measured with git grep at the pin, and the section says which grep produced each one.
- Where cleetus's docs mention a module only as an importer or in a directory list, the mention is disclosed, not counted as coverage.
- Line totals are wc -l counts, and where two counts disagree (the editor's 5284 versus 5950 lines), the section says which scope reproduces.

## Open gaps

- Stream 26: projectile.js has no importer and no witness script, and 11 modules have no witness script at all.
- Stream 27: 15 app modules have no witness script; AppRuntime's mixins and the surface selector are exercised only by the scripts that import them.
- Stream 28: ServerBoot and StaticCache have no witness script; StaticCache is imported only by StaticHandler.
- The chartState migrators (migratePlayers.js, migrateWorldAnchors.js) have no witness script.
- Stream 29: 17 HUD modules have no witness script.
- Stream 30: the procgen directory has no witness script; ProcgenPanel is the only consumer.
- Stream 31: fxProgram.js has no importer, and DamageEffects is consumed only through a window global.
- Stream 32: DracoDecompressor and MeshoptDecompressor have no witness script, and GLBLoader and GLBMath are witnessed only by a bake script.
- Stream 33: five shared modules (SpawnSurface, bookmarks, canonicalJSON, clusterAssignment, materialSlots) have no tracked witness.
- Stream 34: room-worker-boot.js has no tracked reference, and marketplace-install.js and marketplace-registry.js have none in tracked source.

## Sources

- /workspace/savi/docs/FEATURESET.md (old name: savi), lines 361 to 590
- /workspace/savi/docs/JAYZEE-GAPS.md (old name: savi)
- /workspace/savi/docs/OPEN-ITEMS.md (old name: savi)
- /workspace/savi/docs/PARITY-INPUTS.md (old name: savi)
- /workspace/savi/scripts/openapi.json (old name: savi)
- /workspace/spoint/src/behaviours/ (the 19 modules of stream 26, read at d5e3860)
- /workspace/spoint/src/apps/ (the 19 modules of stream 27, read at d5e3860)
- /workspace/spoint/src/sdk/ServerBoot.js
- /workspace/spoint/src/sdk/StaticCache.js
- /workspace/spoint/src/sdk/StaticHandler.js
- /workspace/spoint/src/sdk/chartState/index.js
- /workspace/spoint/src/sdk/chartState/migratePlayers.js
- /workspace/spoint/src/sdk/chartState/migrateWorldAnchors.js
- /workspace/spoint/client/hud/ (the 17 modules of stream 29)
- /workspace/spoint/client/app.js
- /workspace/spoint/client/editor/ProcgenPanel.js
- /workspace/spoint/src/procgen/ (LSystem.js, NoiseTerrain.js, TextureScript.js, WFC.js)
- /workspace/spoint/src/effects/DamageEffects.js
- /workspace/spoint/src/effects/fxProgram.js
- /workspace/spoint/apps/hit-feedback/index.js
- /workspace/spoint/src/physics/DracoDecompressor.js
- /workspace/spoint/src/physics/GLBLoader.js
- /workspace/spoint/src/physics/GLBMath.js
- /workspace/spoint/src/physics/MeshoptDecompressor.js
- /workspace/spoint/src/physics/pivotTransform.js
- /workspace/spoint/src/physics/surfaceVelocity.js
- /workspace/spoint/src/shared/ (the 14 modules of stream 33)
- /workspace/spoint/bin/ (the eight top-level boot and tooling scripts of stream 34)
- /workspace/spoint/scripts/check.mjs
