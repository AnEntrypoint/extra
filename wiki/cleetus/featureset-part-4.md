# Featureset part 4: streams 35 to 45, client/core rendering modules

## How it works

This page covers lines 591 to 710 of docs/FEATURESET.md (old name: savi). It continues [featureset-part-3.md](featureset-part-3.md). The streams cover client/core rendering modules of spoint (read-only at d5e3860), which have no mention in cleetus's docs or scripts. Each line gives the path and line of the first export, re-read through git show d5e3860. Line counts are wc -l. Export counts are the ^export lines. A module counts as covered only when a witness script names it and prints a RESULT line. An importer that is itself a module, or a script that only reads source text, is disclosed as an importer and is not coverage. The spoint rows these streams feed are jayzee row 39 (client rendering, shadows, post-fx and grass), row 40 (editor, hot reload and HUD) and row 59 (client rendering and tools). See [jayzee-gaps.md](jayzee-gaps.md).

Later pages are [featureset-part-5.md](featureset-part-5.md) and [featureset-part-6.md](featureset-part-6.md) for lines 711 onward.

### Stream 35: client/core grass family

The four modules total 832 lines and 44 export lines. cleetus's docs name none of the four basenames outside this stream. The grass mentions in cleetus's docs are family-level (docs/JAYZEE-GAPS.md row 39) or other files.

- client/core/GrassClump.js line 38, makeClumpAlphaTexture(): 100 lines, 2 exports. Imported by client/core/Grass.js and client/core/GrassMaterial.js. No witness.
- client/core/GrassMaterial.js line 14, MAX_BENDERS = 8: 323 lines, 15 exports. Imported by client/core/Grass.js and client/core/GrassTSL.js. No witness.
- client/core/GrassTSL.js line 17, a re-export of MAX_BENDERS, MAX_DECALS, UNUSED_BENDER_SLOT_XZ and makeWind: 226 lines, 3 exports. Imported by client/core/Grass.js. No witness.
- client/core/GrassWindField.js line 3, GRASS_WIND_FIELD_CELLS = 64: 183 lines, 24 exports. Imported by client/core/GrassMaterial.js. Witnessed by scripts/grass-wind-field-seam-witness.mjs, the only witnessed module in this family.

No witness exists for GrassClump, GrassMaterial or GrassTSL.

### Stream 36: client/core environment tint and weather

The eight modules total 682 lines. cleetus's docs have no word hits for these basenames, for wetness, underwater or weather material.

- client/core/WeatherGpu.js line 3, makeSeedAttributes(capacity, fillSeed): 44 lines, 5 exports. Imported by client/core/Weather.js. No witness.
- client/core/WeatherMaterials.js line 3, makeStreakGeo(): 206 lines, 8 exports. Imported by client/core/Weather.js. No witness.
- client/core/WeatherMaterialsTSL.js line 11, makeRainMaterialTSL(): 99 lines, 4 exports. Imported by client/core/Weather.js. No witness.
- client/core/WetnessTint.js line 6, installWetnessTint(): 63 lines, 3 exports. Imported by client/app.js, client/core/SSR.js and client/core/SSRWebGPU.js. No witness.
- client/core/WetnessTintTSL.js line 6, wetnessUniform: 39 lines, 4 exports. Imported by client/ModelPoolAdapter.js. No witness.
- client/core/UnderwaterTint.js line 11, SEA_SURFACE_GLSL: 99 lines, 4 exports. Imported by client/core/SSR.js and client/core/SceneSetup.js. No witness.
- client/core/UnderwaterTintTSL.js line 10, seaUniform: 62 lines, 5 exports. Imported by client/ModelPoolAdapter.js. No witness.
- client/core/PostFxLook.js line 1, PostFxLookError: 70 lines, 5 exports. No importer in code. Witnessed by scripts/postfx-graph-structure-witness.mjs, scripts/postfx-look-witness.mjs and scripts/postfx-render-graph-witness.mjs, the only witnessed module in this stream.

### Stream 37: culling, occlusion and terrain occlusion

This stream covers four modules and two held files, OcclusionPolicy and OcclusionQueryBudget. Those two were held before this stream and are accepted as covered by this per-file entry, rather than by the family-level prose in docs/JAYZEE-GAPS.md row 39. None of the six has a witness script.

- client/core/CullingHub.js line 1, createCullingHub(): 25 lines, 1 export. Imported by client/app.js.
- client/core/TerrainOcclusion.js line 6, createTerrainOcclusion(gl, opts): 228 lines, 1 export. Imported by client/core/TerrainBackdrop.js.
- client/core/WebGPUCullingHubIntegration.js line 34, runVegetationScalePerfAB({ counts, ... }): 193 lines, 2 exports. Imported by client/app.js.
- client/core/WebGPUCullingProbe.js line 1, probeWebGPU(): 176 lines, 3 exports. Imported by client/core/SceneSetup.js and client/core/WebGPUCullingHubIntegration.js.
- client/core/OcclusionPolicy.js line 1, createOcclusionPolicy(config): 110 lines, 1 export. Imported by client/core/SceneOcclusion.js and client/core/TerrainOcclusion.js.
- client/core/OcclusionQueryBudget.js line 1, createOcclusionQueryBudget(opts): 79 lines, 1 export. Imported by client/app.js.

The four modules total 622 lines and the two held files total 189, so the stream is 811 lines. SceneOcclusion.js is covered by its own citation earlier in docs/FEATURESET.md and is not part of this stream.

### Stream 38: bloom and FSR1

The four modules total 790 lines. cleetus's docs have no hits for Bloom, BloomWebGPU, FSR1, FSR1WebGPU, bloom, FSR or fsr1. The upscal substring appears only in scripts/openapi.json, which is unrelated.

- client/core/Bloom.js line 55, class Bloom: 247 lines, 4 exports. Imported by client/app.js. No witness.
- client/core/BloomWebGPU.js line 38, class BloomWebGPU: 155 lines, 1 export. Imported by client/app.js. No witness.
- client/core/FSR1.js line 65, class FSR1: 241 lines, 4 exports. Imported by client/app.js. No witness.
- client/core/FSR1WebGPU.js line 52, class FSR1WebGPU: 147 lines, 1 export. Imported by client/app.js. No witness.

### Stream 39: SSAO and SSR

The four modules total 1175 lines. cleetus's docs have no word hits for SSAO, SSAOWebGPU, SSR, SSRWebGPU, ssao, ambient occlusion, screen-space or reflection. Substring hits of ssr inside other words are not module mentions.

- client/core/SSAO.js line 113, class SSAO: 289 lines, 4 exports. Imported by client/app.js. No witness.
- client/core/SSAOWebGPU.js line 81, class SSAOWebGPU: 194 lines, 1 export. Imported by client/app.js. No witness.
- client/core/SSR.js line 114, class SSR: 361 lines, 4 exports. Imported by client/app.js. No witness.
- client/core/SSRWebGPU.js line 127, class SSRWebGPU: 331 lines, 1 export. Imported by client/app.js. No witness.

### Stream 40: player LOD and vertex animation texture

The five modules total 807 lines. cleetus's docs have no word hits for these basenames, PlayerLOD, VAT, vertex animation or animation texture.

- client/core/PlayerLOD.js line 6, PLAYER_LOD_FULL_COUNT = 30: 248 lines, 10 exports. Imported by client/app.js. No witness.
- client/core/PlayerLODTSL.js line 5, createDotMaterialTSL(matrixNode): 21 lines, 1 export. Imported by client/core/PlayerLOD.js. No witness.
- client/core/PlayerVAT.js line 7, a re-export of bakeVAT and bakeVATMultiClip: 301 lines, 5 exports. Imported by client/app.js. No witness.
- client/core/PlayerVATBake.js line 62, bakeVAT(skinnedMesh, mixerRoot, clip, opts): 155 lines, 2 exports. Imported by client/core/PlayerVAT.js and client/core/PlayerVATTSL.js. No witness.
- client/core/PlayerVATTSL.js line 6, a re-export of bakeVAT and bakeVATMultiClip: 82 lines, 2 exports. Imported by client/core/PlayerVAT.js. No witness.

### Stream 41: rocks and vegetation shading

The four modules total 496 lines. cleetus's docs have no hits for Rocks, RocksTSL, VegetationTSL or VegetationAmbientTSL. The substring rock in docs/JAYZEE-GAPS.md is RockPhysics, a different module.

- client/core/Rocks.js line 83, createRocks(opts): 342 lines, 1 export. Imported by client/app.js. Its only script mention is scripts/rock-model-exclusion-witness.mjs, which reads client/core/Rocks.js as source text and does not import it. That is a source-text witness, not an import witness, and it is disclosed as such.
- client/core/RocksTSL.js line 22, applyRockTextureTSL(material): 39 lines, 2 exports. Imported by client/core/Rocks.js. No witness.
- client/core/VegetationTSL.js line 3, makeWindUniformsTSL(): 35 lines, 5 exports. Imported by client/core/Vegetation.js. No witness.
- client/core/VegetationAmbientTSL.js line 10, vegAmbientUniforms: 80 lines, 3 exports. Imported by client/core/Vegetation.js. No witness.

### Stream 42: vegetation core, build and impostor tier

The three modules total 1731 lines: client/core/Vegetation.js (917), client/core/VegetationBuild.js (581) and client/core/VegImpostorTier.js (233).

- client/core/Vegetation.js line 55, createVegetation(opts): 917 lines, 1 export. Imported by client/app.js and apps/world/_shared/worldDefParse.js (the second through a string readBy reference). cleetus names it in docs/FEATURESET.md line 344, where it is an importer of one atlas module only. That is importer-only, so it is not coverage of this module. Three scripts name it: scripts/lib/verify-doc-claims.mjs, scripts/lint/comment-lint.mjs (a lint scope) and scripts/rock-model-exclusion-witness.mjs (a source-text read). None is recorded as a behavioural witness.
- client/core/VegetationBuild.js line 110, treeTextureHalveRefusals(): 581 lines, 5 exports. Imported by client/core/Vegetation.js. No witness.
- client/core/VegImpostorTier.js line 10, IMPOSTOR_DISSOLVE_FADE_BAND_M = 3.0: 233 lines, 5 exports. Imported by client/core/Vegetation.js and client/core/VegetationBuild.js. No witness.

No witness exists for VegetationBuild or VegImpostorTier.

### Stream 43: WebGPU instancing pair

The two modules total 1247 lines: client/core/WebGPULodInstancer.js (970) and client/core/WebGPUInstancing.js (277). cleetus's docs have no hits for either basename, WebGPU instancing or instancing.

- client/core/WebGPULodInstancer.js line 7, LOD_REEVAL_MOVE_M = 0.5: 970 lines, 2 exports. Imported by client/core/Vegetation.js (stream 42) and scripts/.veg-lod-mismatch-probe.mjs. Three scripts name it: scripts/.veg-lod-mismatch-probe.mjs, scripts/.veg-lod-path-probe.mjs and scripts/.veg-lod-stream-control.mjs. None of the three prints a RESULT line, so none is a witness under the check rule (exit 0 plus RESULT: PASS). The stream-control script defines its own copy of the instancer and does not import this module, so it exercises a copy, not the module.
- client/core/WebGPUInstancing.js line 8, isWebGPUInstancingSupported(renderer): 277 lines, 5 exports. Imported by nine client/core modules already cited in streams 35, 36, 40 and 42: Grass.js, GrassTSL.js, PlayerLOD.js, PlayerLODTSL.js, PlayerVAT.js, PlayerVATTSL.js, VegImpostorTier.js, Weather.js and WeatherMaterialsTSL.js. Those are importer-only citations and are not coverage. No witness.

### Stream 44: render graph and program readiness

The three modules total 789 lines: client/core/RenderGraph.js (273), client/core/RenderGraph.nodes.js (234) and client/core/ProgramReadiness.js (282). cleetus's docs have no hits for the basenames, render graph, rendergraph, render node or program readiness. The word readiness appears in unrelated PR and terrain text.

- client/core/RenderGraph.js line 1, createRenderGraph(nodes, opts): 273 lines, 1 export. Imported by client/app.js. Witnessed by two behavioural scripts, scripts/postfx-graph-structure-witness.mjs and scripts/postfx-render-graph-witness.mjs, which import it and print RESULT.
- client/core/RenderGraph.nodes.js line 29, buildRenderSectionNodes(): 234 lines, 1 export. Imported by client/app.js. No witness.
- client/core/ProgramReadiness.js line 3, renderDeferringUnreadyPrograms(renderer, scene, camera): 282 lines, 8 exports. Imported by client/app.js, Grass.js, PlacementScheduler.js, RenderGraph.nodes.js, Rocks.js, SSAO.js, SSR.js, SceneSetup.js, ThreeVdrs.js and Vegetation.js. Most of those are cited in streams 35, 39, 41 and 42 and are importer-only, so they are not coverage. Witnessed by scripts/program-readiness-render-witness.mjs, which imports the module and prints RESULT. scripts/lint/comment-lint.mjs also names it, as a lint scope, which is not a behavioural witness.

### Stream 45: diagnostics and profiling probes

The five modules total 1135 lines. cleetus's docs have no hits for the basenames, profiler, overdraw, runtime stats, collider debug or debug overlay outside this stream.

- client/core/PerformanceProfiler.js line 8, createPerformanceProfiler(renderer, scene): 395 lines, 1 export. Imported by client/core/DevToolsIntegration.js, an unsent client/core module. client/app.js does not import it. No witness.
- client/core/RuntimeStats.js line 52, createRuntimeStats(): 185 lines, 2 exports. Imported by client/app.js. No witness.

The remaining three modules of stream 45 are listed at lines 711 onward, in [featureset-part-5.md](featureset-part-5.md).

## Decisions

- A module is covered only when a witness script names it and prints RESULT, which is the check rule the stream uses (exit 0 with RESULT: PASS). Importers and source-text reads are disclosed and not counted.
- Held files (OcclusionPolicy, OcclusionQueryBudget) are accepted as covered by a per-file entry, because the family-level prose was judged too loose.
- Two scripts that import a copy rather than the module (the veg-lod stream control) are not counted as exercising the module.
- Each stream gives wc -l totals so a reader can verify size, and states which exports were counted.

## Open gaps

- Stream 35: GrassClump, GrassMaterial and GrassTSL have no witness; GrassWindField has one.
- Stream 36: seven of eight tint and weather modules have no witness; PostFxLook has three.
- Stream 37: all six culling and occlusion modules have no witness.
- Stream 38: all four bloom and FSR1 modules have no witness.
- Stream 39: all four SSAO and SSR modules have no witness.
- Stream 40: all five player LOD and VAT modules have no witness.
- Stream 41: RocksTSL, VegetationTSL and VegetationAmbientTSL have no witness; Rocks.js is read as source text only.
- Stream 42: VegetationBuild and VegImpostorTier have no witness; Vegetation.js (917 lines) has no behavioural witness.
- Stream 43: WebGPULodInstancer has three probe scripts and no behavioural witness, since none prints RESULT; WebGPUInstancing has none.
- Stream 44: RenderGraph.nodes has no witness.
- Stream 45: PerformanceProfiler and RuntimeStats have no witness.

## Sources

- /workspace/savi/docs/FEATURESET.md (old name: savi), lines 591 to 710
- /workspace/savi/docs/JAYZEE-GAPS.md (old name: savi)
- /workspace/savi/docs/FEATURESET.md (old name: savi), line 344 (the Vegetation.js atlas importer mention)
- /workspace/spoint/client/core/GrassClump.js
- /workspace/spoint/client/core/GrassMaterial.js
- /workspace/spoint/client/core/GrassTSL.js
- /workspace/spoint/client/core/GrassWindField.js
- /workspace/spoint/client/core/WeatherGpu.js
- /workspace/spoint/client/core/WeatherMaterials.js
- /workspace/spoint/client/core/WeatherMaterialsTSL.js
- /workspace/spoint/client/core/WetnessTint.js
- /workspace/spoint/client/core/WetnessTintTSL.js
- /workspace/spoint/client/core/UnderwaterTint.js
- /workspace/spoint/client/core/UnderwaterTintTSL.js
- /workspace/spoint/client/core/PostFxLook.js
- /workspace/spoint/client/core/CullingHub.js
- /workspace/spoint/client/core/TerrainOcclusion.js
- /workspace/spoint/client/core/WebGPUCullingHubIntegration.js
- /workspace/spoint/client/core/WebGPUCullingProbe.js
- /workspace/spoint/client/core/OcclusionPolicy.js
- /workspace/spoint/client/core/OcclusionQueryBudget.js
- /workspace/spoint/client/core/Bloom.js
- /workspace/spoint/client/core/BloomWebGPU.js
- /workspace/spoint/client/core/FSR1.js
- /workspace/spoint/client/core/FSR1WebGPU.js
- /workspace/spoint/client/core/SSAO.js
- /workspace/spoint/client/core/SSAOWebGPU.js
- /workspace/spoint/client/core/SSR.js
- /workspace/spoint/client/core/SSRWebGPU.js
- /workspace/spoint/client/core/PlayerLOD.js
- /workspace/spoint/client/core/PlayerLODTSL.js
- /workspace/spoint/client/core/PlayerVAT.js
- /workspace/spoint/client/core/PlayerVATBake.js
- /workspace/spoint/client/core/PlayerVATTSL.js
- /workspace/spoint/client/core/Rocks.js
- /workspace/spoint/client/core/RocksTSL.js
- /workspace/spoint/client/core/VegetationTSL.js
- /workspace/spoint/client/core/VegetationAmbientTSL.js
- /workspace/spoint/client/core/Vegetation.js
- /workspace/spoint/client/core/VegetationBuild.js
- /workspace/spoint/client/core/VegImpostorTier.js
- /workspace/spoint/client/core/WebGPULodInstancer.js
- /workspace/spoint/client/core/WebGPUInstancing.js
- /workspace/spoint/client/core/RenderGraph.js
- /workspace/spoint/client/core/RenderGraph.nodes.js
- /workspace/spoint/client/core/ProgramReadiness.js
- /workspace/spoint/client/core/PerformanceProfiler.js
- /workspace/spoint/client/core/RuntimeStats.js
- /workspace/spoint/scripts/rock-model-exclusion-witness.mjs
- /workspace/spoint/scripts/postfx-graph-structure-witness.mjs
- /workspace/spoint/scripts/program-readiness-render-witness.mjs
- /workspace/spoint/scripts/grass-wind-field-seam-witness.mjs
- /workspace/spoint/scripts/postfx-look-witness.mjs
- /workspace/spoint/scripts/postfx-render-graph-witness.mjs
