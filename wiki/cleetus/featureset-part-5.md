# Featureset part 5: streams 45 to 55, client/core modules

## How it works

This page covers lines 711 to 819 of docs/FEATURESET.md (old name: savi). It continues [featureset-part-4.md](featureset-part-4.md), which ends in the middle of stream 45, and is followed by [featureset-part-6.md](featureset-part-6.md). The method is the same as the earlier parts: spoint at d5e3860, each line re-read with git show, wc -l totals, and a module counted as covered only when a witness script names it and prints RESULT. Importers, prose in the cleetus docs, and source-text reads are disclosed as not coverage. Rows fed: jayzee row 39 (client rendering), row 40 (editor, hot reload and HUD), and row 59 (client rendering and tools). See [jayzee-gaps.md](jayzee-gaps.md).

### Stream 45 (continued): diagnostics and profiling probes

- client/core/OverdrawProbe.js line 49, createOverdrawProbe({ renderer, scene, camera, readIntervalMs }): 292 lines, 1 export. Imported by client/app.js. No witness.
- client/core/MeshDebug.js line 58, installMeshDebug({ maxTicks }): 155 lines, 1 export. Imported by client/app.js and by one client/hud module. No witness.
- client/core/ColliderDebug.js line 44, createColliderDebug({ scene, frame, cfg }): 108 lines, 1 export. Imported by client/app.js. No witness.
- client/core/FrameMetrics.js line 4, createPerfTracker(): 233 lines, 5 exports. Imported by client/app.js. No witness. This is the explicit per-file mention for the held module. The phrase "the frame metrics" in docs/JAYZEE-GAPS.md row 59 is prose and is not the coverage; this entry is.

The six modules of stream 45 have no witness script at d5e3860.

### Stream 46: scheduling, yield, load gate and band modules

The six modules total 335 lines (161, 99, 13, 38, 15 and 9). cleetus's docs have no hits for StreamingScheduler, PlacementScheduler, macrotaskYield, TileExtent or drawBands. modelLoadGate is the exception and is covered below.

- client/core/StreamingScheduler.js line 4, scoreRequest(features): 161 lines, 3 exports. Imported by client/app.js and client/core/CacheRevalidationSweep.js. No witness.
- client/core/PlacementScheduler.js line 13, resolveCameraPose(camera, out): 99 lines, 3 exports. Imported by client/app.js and client/core/RenderGraph.nodes.js. No witness.
- client/core/macrotaskYield.js line 1, macrotaskYield(): 13 lines, 1 export. Imported by client/core/Grass.js, client/core/Rocks.js, client/core/Vegetation.js and client/dev/HmrRuntime.js. No witness import. scripts/lib/verify-doc-claims.mjs names it inside a claim string about the Grass prewarm at line 521. That is docs-claim text, not a witness, and is not coverage.
- client/core/modelLoadGate.js line 10, prefetchModel(url, load): 38 lines, 3 exports, the third being runModelLoadGate at line 20. Imported by client/EntityLoader.js and client/app.js. Witnessed by three behavioural scripts, each importing it and printing RESULT: scripts/model-gate-failure-witness.mjs, scripts/model-load-gate-witness.mjs and scripts/singleplayer-model-gate-witness.mjs. These were checked directly at d5e3860. The importer-only hit at docs/FEATURESET.md line 568 (stream 33, modelLoadErrors) cites modelLoadGate.js as an importer of src/shared/modelLoadErrors.js, and is not coverage for modelLoadGate.
- client/core/TileExtent.js line 4, commitTileExtent(where, heightFn, sampleXZ, bounds, minY, maxY, padM): 15 lines, 1 export. Imported by client/core/Grass.js, Rocks.js and Vegetation.js. No witness.
- client/core/drawBands.js line 1, WATER_TRANSPARENT_DRAW_BAND = -1: 9 lines, 9 exports. Imported by client/core/Weather.js. No witness.

Five of the six have no witness. modelLoadGate has three behavioural witnesses. The git grep hit for macrotaskYield is the claim string above.

### Stream 47: touch and keybinding input

The four modules total 497 lines (286, 35, 46 and 130). cleetus's docs, gaps and scripts have no word hits for TouchDraft, TouchSurfaceSpec or keybindings. MobileControls has one importer-only mention in the stream 27 section (docs/FEATURESET.md line 410), which is not coverage.

- client/core/MobileControls.js line 7, class MobileControls: 286 lines, 2 exports. Imported by client/app.js. No witness.
- client/core/TouchDraft.js line 4, touchDraftFromBindings(bindings, layout, responsive): 35 lines, 1 export. Imported by client/core/MobileControls.js. No witness.
- client/core/TouchSurfaceSpec.js line 1, TouchSurfaceSpecError: 46 lines, 4 exports. No importer in src, client, apps, packages, scripts, bin or edge. No witness.
- client/core/keybindings.js line 1, DEFAULT_KEY_BINDINGS (frozen): 130 lines, 5 exports. No importer. No witness.

All four have no witness.

### Stream 48: client boot, connection and loading state

The four modules total 423 lines (158, 148, 94 and 23). cleetus has no word hits for ClientMachine, ConnectionStatus, LoadingMachine or PreviewReload.

- client/core/ClientMachine.js line 4, clientMachine = createMachine({...}): 158 lines, 2 exports. Imported by client/app.js. No witness import. scripts/lib/verify-doc-claims.mjs names it inside a claim string at line 489, which says TOGGLE_EDITOR is sent in client/app.js. That is docs-claim text and is not coverage.
- client/core/ConnectionStatus.js line 56, createConnectionStatus(): 148 lines, 1 export. Imported by client/app.js. No witness.
- client/core/LoadingMachine.js line 7, notModelFailure({ context }): 94 lines, 8 exports. Imported by client/app.js. Witnessed by two behavioural scripts, each importing it and printing RESULT: scripts/force-ready-model-failure-witness.mjs and scripts/loading-machine-model-failure-witness.mjs. Both were checked at d5e3860 with an import regex and a RESULT check.
- client/core/PreviewReload.js line 4, startPreviewReload({...}): 23 lines, 1 export. Imported by client/app.js. No witness.

Only LoadingMachine is witnessed.

### Stream 49: relocation, transform lerp and floating origin

The three relocation and lerp modules total 301 lines (100, 85 and 116), plus FloatingOrigin.js. cleetus's docs have no hits for RelocationSearch, RelocationSettle or TransformLerp. The relocation family appears only at docs/FEATURESET.md line 562 (stream 33, bookmarks), which names client/core/Relocation.js as an importer of src/shared/bookmarks.js and is not coverage for these two modules.

- client/core/RelocationSearch.js line 90, searchBookmark(kind, ctx): 100 lines, 1 export. Imported by client/core/Relocation.js. No witness.
- client/core/RelocationSettle.js line 45, whenSettled({ idleFrames, ... }): 85 lines, 1 export. Imported by client/core/Relocation.js. No witness.
- client/core/TransformLerp.js line 3, STRIDE = 17: 116 lines, 5 exports. Imported by client/core/SceneGraph.js. No witness.
- client/core/FloatingOrigin.js line 3, REBASE_THRESHOLD_M = 8000: 61 lines, 2 exports. Imported by client/app.js. No witness. This is the explicit per-file mention that releases the hold on FloatingOrigin.js. The phrase "floating origin" in docs/JAYZEE-GAPS.md row 39 (line 72) is prose and is not coverage. scripts/lib/verify-doc-claims.mjs names the rebase claim at line 462, but imports nothing from the module, so it is not a witness.

### Stream 50: decal, cache sweep, exact patch frame and multi viewport

The four modules total 400 lines (104, 131, 93 and 72). cleetus has no hits for DecalSystem, ExactPatchFrame or MultiViewport. CacheRevalidationSweep appears only in the stream 46 section, as an importer of StreamingScheduler.js.

- client/core/DecalSystem.js line 10, createDecalSystem(scene, THREE): 104 lines, 1 export. Imported by client/app.js. No witness.
- client/core/CacheRevalidationSweep.js line 12, createCacheRevalidationSweep(opts): 131 lines, 2 exports. Imported by client/app.js. No witness.
- client/core/ExactPatchFrame.js line 47, createExactPatchFrame(frame): 93 lines, 1 export. Imported by client/core/Grass.js, Rocks.js and Vegetation.js. Behavioural witnesses: scripts/grass-seam-card-witness.mjs and scripts/shared-lattice-surface-witness.mjs. Each loads the module with await import(href('client/core/ExactPatchFrame.js')) and prints RESULT twice. Both were checked at d5e3860.
- client/core/MultiViewport.js line 9, createMultiViewport(renderer, scene): 72 lines, 1 export. Imported by client/app.js. No witness.

### Stream 51: expression, tree texture, replay, grid, shadow and editor kit

The seven modules total 347 lines (67, 112, 75, 35, 51, 1 and 6). These names appear in the concept prose of docs/JAYZEE-GAPS.md rows 39 and 59, which is not per-file coverage. Each module has its own entry here.

- client/core/ExpressionCodes.js line 1, EXPR_NEUTRAL = 0: 67 lines, 15 exports. Imported by client/app.js. No witness.
- client/core/TreeTextureBudget.js line 2, TREE_TEXTURE_SOURCE_PX = 1024: 112 lines, 14 exports. Imported by client/core/Vegetation.js and VegetationBuild.js. No witness.
- client/core/ReplayBuffer.js line 1, createReplayBuffer({...}): 75 lines, 2 exports. Imported by client/app.js. No witness.
- client/core/GroundNodeGrid.js line 9, createGroundNodeGrid(sampleExact): 35 lines, 1 export. Imported by client/core/Weather.js. No witness.
- client/core/CascadeShadowSelectTSL.js line 4, installCascadeShadowSelectTSL(cascadeLights, splitExtents): 51 lines, 3 exports. Imported by client/core/ShadowPipeline.js. No witness.
- client/core/ShadowLayers.js line 1, SHADOW_CASTER_ONLY_LAYER = 30: 1 line, 1 export. Imported by client/core/ShadowPipeline.js and client/core/WebGPULodInstancer.js. scripts/.veg-lod-stream-control.mjs imports it through an absolute file:///C:/dev/spoint/ path and prints no RESULT line, so it is not a witness. No witness.
- client/core/EditorKit.js line 1, editorKit = import('game-editor-kit'): 6 lines, 1 export. Imported by client/app.js and client/editor/EditorShell.js. No witness.

### Stream 52: dev tools, scene graph, spectator, debug log, frame capture and sculpt overlay

The six modules total 454 lines (50, 158, 90, 37, 13 and 106). cleetus's docs and scripts name DevToolsIntegration, SceneGraph and SculptOverlay only in lines that are not coverage.

- client/core/DevToolsIntegration.js line 7, installDevTools(renderer, scene, networkClient): 50 lines, 1 export. Imported by client/app.js. No witness. The importer-only citation in the stream 45 section names it as an importer of PerformanceProfiler.js, which is not coverage.
- client/core/SceneGraph.js line 5, createSceneGraph(scene, floatingOrigin): 158 lines, 1 export. Imported by client/app.js. scripts/netcode-conditioner-harness.mjs loads it dynamically, but that script prints no RESULT line, so it is not a witness. No witness. The importer-only citation in the stream 49 section names it as the importer of TransformLerp.js, which is not coverage.
- client/core/SpectatorMode.js line 1, createSpectatorMode({...}): 90 lines, 1 export. Imported by client/app.js. No witness.
- client/core/debug-log.js line 26, dbg(namespace): 37 lines, 1 export. Imported by client/app.js, Grass.js, Rocks.js, SceneOcclusion.js, TerrainBackdrop.js, VegImpostorTier.js, Vegetation.js and VegetationBuild.js. client/core/RenderControls.js names the path as a readAt string at line 346, which is not an import and not coverage. No witness.
- client/core/frameCapture.js line 1, captureHudFreeFrame({...}): 13 lines, 1 export. No importer. git grep -lw captureHudFreeFrame finds only the module, so the export is unreferenced. No witness.
- client/core/SculptOverlay.js line 7, createSculptOverlay(terrainBackdrop): 106 lines, 1 export. Imported by client/app.js. No witness.

### Stream 53: worker render protocol, time of day and world panels

The three modules total 348 lines (78, 140 and 130). cleetus has no word hits for these basenames.

- client/core/WorkerRenderProtocol.js line 1, WORKER_MESSAGE (frozen): 78 lines, 14 exports. Imported by client/workers/OffscreenRenderWorker.js as a namespace import. No witness.
- client/core/TimeOfDay.js line 52, createTimeOfDay(sun, ambient, opts): 140 lines, 1 export. Imported by client/app.js. No witness. Its state is read through the globals window.__timeOfDay and window.__timeOfDayApi. scripts/tsl-parity/bodies.mjs drives window.__timeOfDayApi, which makes it a consumer of the global. That is not a per-file mention of the module.
- client/core/WorldPanels.js line 83, createWorldPanels(THREE, scene): 130 lines, 2 exports (WorldPanelError and createWorldPanels). Imported by client/AppModuleSystem.js. No witness.

### Stream 54: fluid surface, mapspinner feasibility probe and static instance store

The three modules total 613 lines (237, 195 and 181). cleetus has no word hits for FluidSurface, MapspinnerWebGPUFeasibility or StaticInstanceStore.

- client/core/FluidSurface.js line 10, sampleScalarField(positions, count, minX, minZ, maxX, maxZ, smoothingRadius, cellSize): 237 lines, 4 exports (sampleScalarField, marchingSquares, findBoundaryEdges and buildFluidSurfaceMesh). Imported by client/EntityLoaderMeshBuild.js, which takes buildFluidSurfaceMesh. No witness.
- client/core/MapspinnerWebGPUFeasibility.js line 154, runFeasibilityProbe(): 195 lines, 1 export. No importer and no scripts/ reference. No witness.
- client/core/StaticInstanceStore.js line 8, createStaticInstanceStore(opts): 181 lines, 1 export. Imported by client/EntityLoader.js. No witness.

### Stream 55: three VDRS, terrain backdrop and scene setup

The three modules total 1035 lines (259, 310 and 466). cleetus names each only as an importer of other modules, which is not coverage.

- client/core/ThreeVdrs.js line 80, class ThreeVdrs: 259 lines, 4 exports (ThreeVdrs, createThreeVdrsController, THREE_VDRS_WEBGPU_UNSUPPORTED and installThreeVdrs). Imported by client/app.js. No witness. The importer-only citation in the stream 44 section names it as an importer of ProgramReadiness.js, which is not coverage.
- client/core/TerrainBackdrop.js line 35, createTerrainBackdrop(renderer, scene, cfg): 310 lines, 2 exports (prewarmMapspinnerPlanetModules and createTerrainBackdrop). Imported by client/app.js. No witness. scripts/lib/verify-doc-claims.mjs names the module only in line-keyed claim maps; it is a doc-claim checker, not a behavioural witness. The importer-only citations in the stream 33 and 37 sections are not coverage either.
- client/core/SceneSetup.js line 14, createScene(): 466 lines, 21 export statements. Imported by client/app.js. scripts/three-loader-error-witness.mjs reads client/core/SceneSetup.js as source text at its line 15 and prints RESULT. That is a source-text witness of the file's text, not a runtime witness of its behaviour. The importer-only citations in the stream 33, 36, 37 and 44 sections are not coverage.

## Decisions

- Prose in the jayzee rows (for example "the frame metrics" and "floating origin") is treated as family-level, and each file gets its own entry so that coverage is per file.
- A source-text read (three-loader-error-witness on SceneSetup.js) is disclosed as a text witness and is not counted as a runtime witness.
- A dynamic load that prints no RESULT line (netcode-conditioner-harness on SceneGraph) is not counted as a witness, because the check rule requires a RESULT line.
- Importer citations are repeatedly declared "not coverage" so that a module cited only as an importer is not counted as covered.

## Open gaps

- Stream 45: OverdrawProbe, MeshDebug, ColliderDebug and FrameMetrics have no witness.
- Stream 46: five of six modules have no witness; modelLoadGate is witnessed by three scripts.
- Stream 47: all four touch and keybinding modules have no witness; TouchSurfaceSpec and keybindings have no importer.
- Stream 48: three of four boot and state modules have no witness; ClientMachine is named only by a claim string.
- Stream 49: RelocationSearch, RelocationSettle, TransformLerp and FloatingOrigin have no witness.
- Stream 50: DecalSystem, CacheRevalidationSweep and MultiViewport have no witness; ExactPatchFrame has two.
- Stream 51: all seven modules have no witness; ShadowLayers is named by a non-witness script that uses an absolute Windows path.
- Stream 52: all six modules have no witness; frameCapture.js is unreferenced in the tree.
- Stream 53: all three modules have no witness.
- Stream 54: FluidSurface, MapspinnerWebGPUFeasibility and StaticInstanceStore have no witness; the feasibility probe has no importer.
- Stream 55: ThreeVdrs and TerrainBackdrop have no witness; SceneSetup has only a source-text witness.

## Sources

- /workspace/savi/docs/FEATURESET.md (old name: savi), lines 711 to 819
- /workspace/savi/docs/JAYZEE-GAPS.md (old name: savi), rows 39 and 59 and line 72
- /workspace/spoint/client/core/OverdrawProbe.js
- /workspace/spoint/client/core/MeshDebug.js
- /workspace/spoint/client/core/ColliderDebug.js
- /workspace/spoint/client/core/FrameMetrics.js
- /workspace/spoint/client/core/StreamingScheduler.js
- /workspace/spoint/client/core/PlacementScheduler.js
- /workspace/spoint/client/core/macrotaskYield.js
- /workspace/spoint/client/core/modelLoadGate.js
- /workspace/spoint/client/core/TileExtent.js
- /workspace/spoint/client/core/drawBands.js
- /workspace/spoint/client/core/MobileControls.js
- /workspace/spoint/client/core/TouchDraft.js
- /workspace/spoint/client/core/TouchSurfaceSpec.js
- /workspace/spoint/client/core/keybindings.js
- /workspace/spoint/client/core/ClientMachine.js
- /workspace/spoint/client/core/ConnectionStatus.js
- /workspace/spoint/client/core/LoadingMachine.js
- /workspace/spoint/client/core/PreviewReload.js
- /workspace/spoint/client/core/RelocationSearch.js
- /workspace/spoint/client/core/RelocationSettle.js
- /workspace/spoint/client/core/TransformLerp.js
- /workspace/spoint/client/core/FloatingOrigin.js
- /workspace/spoint/client/core/DecalSystem.js
- /workspace/spoint/client/core/CacheRevalidationSweep.js
- /workspace/spoint/client/core/ExactPatchFrame.js
- /workspace/spoint/client/core/MultiViewport.js
- /workspace/spoint/client/core/ExpressionCodes.js
- /workspace/spoint/client/core/TreeTextureBudget.js
- /workspace/spoint/client/core/ReplayBuffer.js
- /workspace/spoint/client/core/GroundNodeGrid.js
- /workspace/spoint/client/core/CascadeShadowSelectTSL.js
- /workspace/spoint/client/core/ShadowLayers.js
- /workspace/spoint/client/core/EditorKit.js
- /workspace/spoint/client/core/DevToolsIntegration.js
- /workspace/spoint/client/core/SceneGraph.js
- /workspace/spoint/client/core/SpectatorMode.js
- /workspace/spoint/client/core/debug-log.js
- /workspace/spoint/client/core/frameCapture.js
- /workspace/spoint/client/core/SculptOverlay.js
- /workspace/spoint/client/core/WorkerRenderProtocol.js
- /workspace/spoint/client/core/TimeOfDay.js
- /workspace/spoint/client/core/WorldPanels.js
- /workspace/spoint/client/core/FluidSurface.js
- /workspace/spoint/client/core/MapspinnerWebGPUFeasibility.js
- /workspace/spoint/client/core/StaticInstanceStore.js
- /workspace/spoint/client/core/ThreeVdrs.js
- /workspace/spoint/client/core/TerrainBackdrop.js
- /workspace/spoint/client/core/SceneSetup.js
- /workspace/spoint/scripts/model-gate-failure-witness.mjs
- /workspace/spoint/scripts/model-load-gate-witness.mjs
- /workspace/spoint/scripts/singleplayer-model-gate-witness.mjs
- /workspace/spoint/scripts/force-ready-model-failure-witness.mjs
- /workspace/spoint/scripts/loading-machine-model-failure-witness.mjs
- /workspace/spoint/scripts/grass-seam-card-witness.mjs
- /workspace/spoint/scripts/shared-lattice-surface-witness.mjs
- /workspace/spoint/scripts/three-loader-error-witness.mjs
- /workspace/spoint/scripts/netcode-conditioner-harness.mjs
- /workspace/spoint/scripts/lib/verify-doc-claims.mjs
- /workspace/spoint/scripts/tsl-parity/bodies.mjs
