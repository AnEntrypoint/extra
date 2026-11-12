# Featureset part 7: improvement candidates from streams 43 to 58

## How it works

This page covers lines 929 to 1048 of docs/FEATURESET.md (old name: savi). It continues [featureset-part-6.md](featureset-part-6.md), and the last part is [featureset-part-8.md](featureset-part-8.md). The lines are grep-based candidates from spoint at d5e3860. The file says each one is a candidate, not a verified defect, and not a behaviour jayzee must reproduce. Each entry gives a path and line, with the code fragment that matched. Entries marked NEEDING A CHECK were not verified in what they do. Entries marked conforming show the rule being followed, and are not defects. The rule cited throughout is the AGENTS.md rule of spoint (refusals carry codes, no sentinel for absence, no silent default). The corresponding jayzee rows are in [jayzee-gaps.md](jayzee-gaps.md).

### Streams 43 and 44: instancing, render graph and program readiness

- client/core/WebGPULodInstancer.js line 139 (hysteresis from a finite option, else 0), and lines 140 and 141 (shadowDistance with -1 as the no-shadow value): a non-finite option takes a default, and the -1 sentinel stands for no shadow without a refusal.
- client/core/WebGPULodInstancer.js line 296: -1 is the sentinel for absence.
- client/core/WebGPUInstancing.js line 14: a prose Error with no code at a refusal boundary.
- client/core/RenderGraph.js line 22 (a missing target name falls back to the key): a silent default.
- client/core/RenderGraph.js line 151: a prose TypeError when a hook is not a function. A null hook clears the profiler.
- client/core/RenderGraph.js line 227 (a node that throws is caught and _nodeThrew runs): NEEDING A CHECK on what _nodeThrew reports.
- client/core/RenderGraph.nodes.js line 39 (a zero stands in for an absent render distance): this breaks the no-sentinel-for-absence rule in AGENTS.md.
- client/core/RenderGraph.nodes.js line 56 (planet radius falls back to 63600): a silent literal default.
- client/core/RenderGraph.nodes.js line 170 (threeVdrsScale of stored 0 becomes 1.0): a stored zero is replaced.
- client/core/ProgramReadiness.js line 5: writes deferredProgramDraws onto the renderer when absent.
- client/core/ProgramReadiness.js lines 93 and 206: default-on flags, so an absent window global enables the path.
- client/core/ProgramReadiness.js lines 18, 114 and 242 (catch blocks): NEEDING A CHECK on what each block does with the error.

### Stream 45: profilers and probes

- client/core/PerformanceProfiler.js lines 167 and 170: a missing texture size or vertex count counts as 0, so memory is undercounted without a flag.
- client/core/PerformanceProfiler.js lines 179 to 181: an absent counter becomes 0, so a zero reading cannot be told from no data.
- client/core/PerformanceProfiler.js line 57: a literal devicePixelRatio default of 1.
- client/core/RuntimeStats.js line 76: a missing round-trip time becomes 0 ms, which is also a valid reading. The file proposes a distinct missing marker. Lines 82 to 87 use the same || 0 for counters.
- client/core/OverdrawProbe.js line 219: a swallowed write to RenderControls.
- client/core/OverdrawProbe.js line 283: setViewCeiling ignores an invalid ceiling with no refusal.
- client/core/ColliderDebug.js line 49: a literal extent of 256 for an invalid extent, the same shape as colliderLattice.js. The resolution line uses the same literal form.
- client/core/ColliderDebug.js line 75: a magic -1000 stands in for an absent height.
- client/core/MeshDebug.js lines 51 and 94: display-only absence sentinels, listed for completeness.

### Stream 46: scheduling and load gates

- client/core/StreamingScheduler.js line 5: a non-finite or negative distance becomes Infinity, so the request ranks as the farthest rather than being refused.
- client/core/StreamingScheduler.js line 6: an invalid screen size takes a literal 1.
- client/core/StreamingScheduler.js line 8: an invalid gameplay boost becomes 0.
- client/core/StreamingScheduler.js line 134 (an empty catch around rec.run): NEEDING A CHECK, not a defect verdict.
- client/core/modelLoadGate.js is a conforming example. It refuses bad input with coded refusals at lines 11, 22 and 23: model-prefetch-url-invalid, model-gate-hooks-invalid and model-gate-failure-hook-invalid.
- Observation, not a finding: .gm/pool/pool.log line 1625 records a PASS of 38 of 38 for ClientCorePlayerVATBake, and no tracked script names PlayerVATBake at d5e3860. The same log names scripts/decal-system-witness.mjs, scripts/SculptOverlay-witness.mjs and scripts/DebugLog-witness.mjs, and none is tracked at d5e3860. The log records provenance and is not a witness, so this discrepancy stays OPEN.

### Streams 48 and 49: client state and relocation

- client/core/ClientMachine.js line 138: an absent spectator returns null, a sentinel for absence.
- client/core/ConnectionStatus.js line 135: a non-finite RTT takes the not-ok branch silently. Needs a check against the RTT display.
- client/core/LoadingMachine.js line 33: a missing reasonCode becomes a prose label, so the failure is reported but its cause is lost.
- client/core/LoadingMachine.js line 39: a missing count is read as zero pending entities. NEEDING A CHECK.
- client/core/PreviewReload.js line 14: null is the first-build sentinel.
- client/core/RelocationSearch.js line 28: NaN is the absence value for a non-finite y. NEEDING A CHECK against the no-NaN-for-absence rule.
- client/core/RelocationSettle.js line 21: an absent count becomes 0, and the two deferred field names fall back silently.
- client/core/RelocationSettle.js line 48: a refusal with no code (whenSettled with no connected client).
- client/core/RelocationSettle.js line 61: a non-finite height turns into false silently.
- client/core/TransformLerp.js line 19: a non-finite target rotation drops the update with no report.

### Streams 50 to 53: decals, sweeps, viewports, shadows, dev tools and panels

- client/core/DecalSystem.js line 64: a missing origin or target is a silent no-op.
- client/core/CacheRevalidationSweep.js lines 14 and 15: an invalid option falls back to a literal default with no refusal.
- client/core/ExactPatchFrame.js line 11: zero is a sentinel for an absent anchor height.
- client/core/MultiViewport.js line 17: silent literal defaults for camera options. Line 34 returns null for an unknown pane.
- client/core/ExactPatchFrame.js line 75 is a conforming example: it throws a named NoGroundHeightError for missing ground, as AGENTS.md asks.
- client/core/GroundNodeGrid.js line 7: a sentinel height NO_GROUND_Y for a non-finite sample. NEEDING A CHECK against the sentinel rule.
- client/core/ExpressionCodes.js line 47: a missing manager returns neutral with no signal.
- client/core/ExpressionCodes.js line 51: getValue failures are dropped, and a zero reading is replaced by 0.
- client/core/ReplayBuffer.js line 3: a prose Error, not a refusal code.
- client/core/CascadeShadowSelectTSL.js lines 9 and 45: silent zero defaults for missing split extents.
- client/core/EditorKit.js line 4: the import failure is logged with no refusal code.
- client/core/TreeTextureBudget.js line 33 is a conforming example: it throws a coded TreeTextureBudgetError.
- client/core/SceneGraph.js line 22: a literal feetOffset default of 0.91.
- client/core/SceneGraph.js line 155: an empty function setLocalPlayer. NEEDING A CHECK. The call at client/app.js line 1236 has not been run to confirm it is a no-op.
- client/core/SculptOverlay.js line 44: a literal SCULPT_RES default of 256. Line 63 returns false with no reason code. Line 98 moves a non-finite centre to the origin.
- client/core/debug-log.js line 11 (a catch on the query decode): NEEDING A CHECK.
- client/core/DevToolsIntegration.js line 23: an unknown draw-call count becomes a GPU estimate of 0 with no signal.
- client/core/frameCapture.js line 8: an error whose message is a code string, not a coded error class.
- client/core/TimeOfDay.js line 53: an invalid dayLengthSec takes a literal 600 with no refusal. Line 54 defaults the start fraction to 0.3, and line 58 the tilt to 23 degrees.
- client/core/TimeOfDay.js line 92: a consumer callback's error is swallowed with no log.
- client/core/TimeOfDay.js line 121: a non-finite fraction is ignored silently.
- client/core/WorkerRenderProtocol.js line 67: the one place the module refuses in prose, for an undeclared refusal code. Minor.
- client/core/WorldPanels.js line 73: the 2d context is not checked for null, and line 59 uses it directly.

### Streams 54 to 56: fluid, static instances, terrain, three VDRS, scene setup and edge

- client/core/MapspinnerWebGPUFeasibility.js line 150: the rationale prose hard-codes 613 gl call sites across 5 files. Spoint's own measurement at d5e3860 gives 821 call sites, which is not verified here. A stale-prose issue.
- client/core/StaticInstanceStore.js line 55: an empty catch around the BVH build. A failure leaves the bucket with no BVH and no signal.
- client/core/StaticInstanceStore.js line 60: re-adding an existing entity is a silent no-op, and a new transform is not applied.
- client/core/StaticInstanceStore.js line 9: a literal initialCapacity default of 1024.
- client/core/StaticInstanceStore.js lines 82, 94, 105 and 120: sentinels for absence (false, null, -1) with no refusal code.
- client/core/FluidSurface.js line 135: a silent zero for each origin component.
- client/core/FluidSurface.js lines 142 and 146: null sentinels.
- client/core/TerrainBackdrop.js line 30: a promise swallow on the planet TSL import. Silent catches also sit at lines 210, 272 and 300. NEEDING A CHECK.
- client/core/TerrainBackdrop.js line 42: a literal planet radius of 6360000.
- client/core/TerrainBackdrop.js line 185: a silent epoch of 0 for an absent chartEpoch.
- client/core/ThreeVdrs.js line 169: a zero or NaN scale becomes 1.0, and the 0.3 floor is a literal.
- client/core/ThreeVdrs.js line 248: a prose reason string in place of a code.
- client/core/ThreeVdrs.js line 240: a window global is written. The tracked-tree search found no reader of __threeVdrsScale or __threeVdrsState. NEEDING A CHECK: a write-only mirror, not confirmed as a silent no-op knob.
- client/core/SceneSetup.js line 18: a default written into a window global (__fogFar 200). Line 323 uses a literal fogFar default and passes a present but invalid value through unvalidated.
- client/core/SceneSetup.js line 69: probeWebGL2 returns false with no log.
- client/core/SceneSetup.js line 312: MeshoptDecoder.useWorkers failure is warn-only.
- client/core/SceneSetup.js line 164 is a conforming example: it throws an Error with code NO_WEBGL2.
- edge/cf-do/jolt-edge-init.js line 12: WebAssembly.instantiate has no rejection handler, so the init promise never settles if instantiate fails. NEEDING A CHECK: read from source, not run under workerd.
- edge/cf-do/spoint-do.js line 63: the socket is accepted before _ensureCtx is awaited, so a rejection leaves the socket unclosed. NEEDING A CHECK.
- edge/cf-do/spoint-do.js lines 32 and 37: both are silent (a false return, and a close inside an empty catch).
- edge/cf-do/accept-request.js lines 4 and 5: the probe room binding and key (SPOINT_GAME_ROOM and probe-room) stay a silent production fallback when the environment value is absent.
- edge/cf-do/accept-request.js lines 32, 43 and 51: prose reason strings with no reason code.
- edge/cf-do/do-client-probe.mjs line 52: if the probe's own player is missing, it falls back to the first record, which may belong to another player. A silent default inside a manual probe.

### Streams 57 and 58: sdk world, rooms and agent routes

- src/sdk/WorldLocator.js line 27: an empty name silently means the default world.
- src/sdk/WorldLocator.js lines 30 and 37: an absent world reaches an empty definition with no refusal. NEEDING A CHECK on whether any caller reaches the empty path.
- src/sdk/WorldLocator.js line 38: an absent default export is silently {}.
- src/sdk/RoomPick.js lines 22 and 23: a requested room that is not open is ignored silently.
- src/sdk/RoomHealth.js line 42: zero stands in for no ticks.
- src/sdk/SceneImport.js lines 8 and 15: an absent position or rotation becomes the origin or the identity with no refusal. Line 37 is a literal scale default. Line 38: a non-object state silently becomes {}.
- src/sdk/TiledImport.js line 70: the map width is passed through unvalidated.
- src/sdk/scaffold.js line 44: a remote package is fetched at run time with no version pin and no confirmation (bunx skills add of a package from the AnEntrypoint organisation). A supply-chain observation for review, not a verdict.
- src/sdk/scaffold.js line 20: NEEDING A CHECK on whether ENGINE_DIR_IMPORT covers every engine directory.
- src/sdk/RoomRouting.js line 46: two field names (requestedRoomId and requested) are accepted silently.
- src/sdk/AgentAuthoringAPI.js lines 53 and 54: the agent token is read from SPOINT_AGENT_TOKEN, and if the token is unset the check is skipped, so the /agent/ routes run unauthenticated. This is a SECURITY CANDIDATE. It was run live against spoint's handler at d5e3860 on a loopback HTTP listener. With the token unset, a POST to /agent/destroy-entity with no header reaches the route and returns 404 no such entity, and GET /agent/apps returns 200. With the token set, no header or a wrong header returns 403, and the right header passes. The full ServerAPI dispatch was not booted, so the /agent/ prefix guard and the 0.0.0.0 bind remain read from source only.

## Decisions

- Each candidate is a grep match, labelled as such, so a reader can tell a suspicion from a verified defect. The file's labels are kept: NEEDING A CHECK, conforming example, and candidate.
- The rule behind most entries is the AGENTS.md rule that refusals carry a code and absence is not signalled by a sentinel. Conforming examples are cited beside the candidates to show the rule is applied in places.
- The security candidate on the agent routes was tested live on a loopback listener, not only read from source, and the file records what was not tested (the full dispatch and the bind).
- Cleetus records these as improvement opportunities for jayzee and does not change spoint.

## Open gaps

- Stream 43 to 44: WebGPULodInstancer sentinels and the render graph error paths are candidates; the _nodeThrew reporting and the ProgramReadiness catch blocks need a check.
- Stream 45: the zero-for-missing RTT and counters are candidates; the missing-marker proposal is not implemented.
- Stream 46: the empty catch in StreamingScheduler and the .gm/pool/pool.log discrepancy (PlayerVATBake, decal-system, SculptOverlay and DebugLog witnesses not tracked) remain OPEN.
- Stream 48 and 49: the RelocationSearch NaN absence and the LoadingMachine count default need a check.
- Stream 50 to 53: the empty setLocalPlayer function, the debug-log catch and the GroundNodeGrid sentinel need a check.
- Stream 54 to 56: the TerrainBackdrop silent catches, the ThreeVdrs window mirror, the edge instantiate rejection and the accept-before-await order need a check.
- Stream 57 and 58: the unauthenticated /agent/ routes when SPOINT_AGENT_TOKEN is unset are a SECURITY CANDIDATE; the full dispatch and the 0.0.0.0 bind were not tested live. The scaffold remote package fetch has no version pin.
- The grep candidates are unverified. None is recorded as a defect until checked.

## Sources

- /workspace/savi/docs/FEATURESET.md (old name: savi), lines 929 to 1048
- /workspace/spoint/.gm/pool/pool.log (read at d5e3860, provenance only)
- /workspace/spoint/client/core/WebGPULodInstancer.js
- /workspace/spoint/client/core/WebGPUInstancing.js
- /workspace/spoint/client/core/RenderGraph.js
- /workspace/spoint/client/core/RenderGraph.nodes.js
- /workspace/spoint/client/core/ProgramReadiness.js
- /workspace/spoint/client/core/PerformanceProfiler.js
- /workspace/spoint/client/core/RuntimeStats.js
- /workspace/spoint/client/core/OverdrawProbe.js
- /workspace/spoint/client/core/ColliderDebug.js
- /workspace/spoint/client/core/MeshDebug.js
- /workspace/spoint/client/core/StreamingScheduler.js
- /workspace/spoint/client/core/modelLoadGate.js
- /workspace/spoint/client/core/ClientMachine.js
- /workspace/spoint/client/core/ConnectionStatus.js
- /workspace/spoint/client/core/LoadingMachine.js
- /workspace/spoint/client/core/PreviewReload.js
- /workspace/spoint/client/core/RelocationSearch.js
- /workspace/spoint/client/core/RelocationSettle.js
- /workspace/spoint/client/core/TransformLerp.js
- /workspace/spoint/client/core/DecalSystem.js
- /workspace/spoint/client/core/CacheRevalidationSweep.js
- /workspace/spoint/client/core/ExactPatchFrame.js
- /workspace/spoint/client/core/MultiViewport.js
- /workspace/spoint/client/core/GroundNodeGrid.js
- /workspace/spoint/client/core/ExpressionCodes.js
- /workspace/spoint/client/core/ReplayBuffer.js
- /workspace/spoint/client/core/CascadeShadowSelectTSL.js
- /workspace/spoint/client/core/EditorKit.js
- /workspace/spoint/client/core/TreeTextureBudget.js
- /workspace/spoint/client/core/SceneGraph.js
- /workspace/spoint/client/core/SculptOverlay.js
- /workspace/spoint/client/core/debug-log.js
- /workspace/spoint/client/core/DevToolsIntegration.js
- /workspace/spoint/client/core/frameCapture.js
- /workspace/spoint/client/core/TimeOfDay.js
- /workspace/spoint/client/core/WorkerRenderProtocol.js
- /workspace/spoint/client/core/WorldPanels.js
- /workspace/spoint/client/core/MapspinnerWebGPUFeasibility.js
- /workspace/spoint/client/core/StaticInstanceStore.js
- /workspace/spoint/client/core/FluidSurface.js
- /workspace/spoint/client/core/TerrainBackdrop.js
- /workspace/spoint/client/core/ThreeVdrs.js
- /workspace/spoint/client/core/SceneSetup.js
- /workspace/spoint/edge/cf-do/jolt-edge-init.js
- /workspace/spoint/edge/cf-do/spoint-do.js
- /workspace/spoint/edge/cf-do/accept-request.js
- /workspace/spoint/edge/cf-do/do-client-probe.mjs
- /workspace/spoint/src/sdk/WorldLocator.js
- /workspace/spoint/src/sdk/RoomPick.js
- /workspace/spoint/src/sdk/RoomHealth.js
- /workspace/spoint/src/sdk/SceneImport.js
- /workspace/spoint/src/sdk/TiledImport.js
- /workspace/spoint/src/sdk/scaffold.js
- /workspace/spoint/src/sdk/RoomRouting.js
- /workspace/spoint/src/sdk/AgentAuthoringAPI.js
