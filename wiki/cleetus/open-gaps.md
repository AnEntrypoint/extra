# Open gaps across the cleetus repository

## How it works

This page gathers every open gap recorded in the repository's gaps and docs files into one list. Each entry names its source. The gaps are grouped by source, and each group keeps its own labels. No gap is closed here. A gap listed under one source is not treated as closed by another.

Sources, in the order used below:

- The morluto/rea PR 9234 CI findings (`gaps/morluto-rea-pr-9234-ci-findings.md`).
- The netcode optimization gaps (`gaps/netcode-optimization-gaps.md`) and NETCODE-BRIEF-FOR-JAYZEE.md.
- JAYZEE-GAPS.md, the per-row register.
- OPEN-ITEMS.md, the register OPEN-001 to OPEN-030.
- PARITY-INPUTS.md and PARITY-BRIEF-FOR-JAYZEE.md.
- FEATURESET.md, the grep candidates and the security candidate.
- The manual build and endpoint checks.

## Decisions

- Gaps are listed, not ranked. The owner decides which are required, and the required-in-jayzee tags in JAYZEE-GAPS.md are the only priority the repository records.
- Security candidates are kept as candidates until they are checked. The agent-route candidate is listed with its status and is not counted as a defect.
- The HELD-OWNER items are listed as held. Cleetus does not decide them.

## Open gaps

### morluto/rea PR 9234 CI findings

- Independent review of the rea test output and of the root-cause interpretation is still needed.
- The facts audit did not run. Its retry fork hung and was stopped without a result.
- Owner decision: marking PR 9230 ready for review and re-running its cancelled readiness checks has not been done.
- The cli-boundary failure at `86dfb903` was confirmed only after a rebuild, so the interpretation rests on that rebuilt run.
- The local Node version used for the first runs (v24.22.0) is below rea's required floor. The full results are reported on v24.22.1.
- The rea test output on `32df15f` was not interpreted independently. CI run 42343646562 passed.

### Netcode optimization gaps and NETCODE-BRIEF-FOR-JAYZEE.md

- OPEN-024: jayzee has not reported the witnesses for J1, J2 and J3.
- Owner item 5 is dropped for jayzee and has no owner record beyond the drop.
- The LagCompensator silent overflow at the 5000 ms window is verified only by an ephemeral probe in `/tmp`, which is not a committed source.
- The crowd-dot decode bug in spoint (cx above 0 with cz below 0) is kept and pinned in jayzee under row 17, not fixed.
- The environment override SPOINT_LAG_HISTORY_WINDOW and the drift limit are undocumented in spoint.
- The 24 netcode modules are not documented in spoint. The owner question is answered in favour of the generated index in J3.
- The gm concurrency default (maxInflight 8) is undocumented in spoint and dropped for jayzee.

### JAYZEE-GAPS.md

Every row tagged required-in-jayzee is an open gap. The tagged rows are 1, 7, 8, 9, 10, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 24, 25, 26, 27, 28, 29, 30, 31, 34, 35, 36, 38, 39, 40, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 55, 56, 57, 58, 59, 60, 64 and 65. The per-row detail is in [jayzee-gaps.md](jayzee-gaps.md).

- Row 1 (jayzee feed and CDN names) is partial. The name encoder, the ledger bucket rule, the redirect and gone bodies, and the manifest frames after the sheet remain open.
- Row 8: the spoint default slope is 45 degrees, not the 60 degree floor the jayzee row describes.
- Row 9: the overlap query is NOT FOUND in spoint.
- Rows 13 and 36: closure is peer-reported and UNVERIFIED. Jayzee's PARITY.md still says partial at `2db34a0`.
- Rows 62 to 65 are catalogs and are open.

### OPEN-ITEMS.md

- OPEN-003: jayzee must support the 93 named endpoints as an endpoint surface, not by name.
- OPEN-006: the value-level walk of `/cdn/` GLB refs was not run, so 2416, 399 and 2355 remain a lower bound.
- OPEN-007: the spawnfile-family absence is scoped, not universal.
- OPEN-008: the `/cdn/`-only claim is INFERRED.
- OPEN-009: the spawnfile.io bytes are UNVERIFIED pending a HEAD proof.
- OPEN-010: the spawnfile key path is elided in FAULTS F3.
- OPEN-013: the credentialed ttf 401 remains open and is not bypassed.
- OPEN-014: the owner's 84 and 82 are unverified.
- OPEN-015: the `world.assets/<xx>/` bucket rule is undetermined.
- OPEN-016: the name encoder, the resolve gone bodies (410), the manifest frames beyond the sample and the ledger bucket rule are open.
- OPEN-018: the site commit lag and README correction are recorded, but the status stays OPEN.
- OPEN-020: the other confirmed real gaps in spoint are open.
- OPEN-021: the 15 open PRD rows (STALE 11, DOC-ONLY 2, REAL 2) are open.
- OPEN-022: the 13 unchecked gap-report claims are open.
- OPEN-024: see the netcode section above.
- OPEN-025, OPEN-026 and OPEN-027: HELD-OWNER decisions, held with the owner.
- OPEN-028: the owner's 23 builtin modules are not reproducible locally.
- OPEN-029: value_not_found is reproduced for two hashes only.
- OPEN-030: the drifted head case is not reproduced.
- The reference total of 208 is UNVERIFIED (the tree measures 207 or 209 depending on the rule).
- Jayzee PARITY rows 6 to 10, 32 and 33: closure is not verified in this register.

### PARITY-INPUTS.md and PARITY-BRIEF-FOR-JAYZEE.md

- The 47 checked spoint gap-report claims are not independently verified, and the 13 unchecked ones remain open.
- Rows 65 and 66 of the brief stay open: the 23 builtin modules and the 208 reference total are UNVERIFIED.
- The spawnfile.io bytes, the full spawnfile key path and the "all GLBs on /cdn/" claim remain unconfirmed or INFERRED.
- The owner's directive that jayzee implement everything spoint has made is a requirement. The held owner decisions in OPEN-025 to OPEN-027 are outside cleetus.

### FEATURESET.md

Grep-based candidates from spoint at `d5e3860`. Each is unverified and is not a defect until checked.

- Security candidate (stream 57 and 58): the unauthenticated `/agent/` routes when `SPOINT_AGENT_TOKEN` is unset. The full dispatch and the 0.0.0.0 bind were not tested live. It is recorded as a SECURITY CANDIDATE and needs a live check before any decision.
- Stream 56: all four Durable Object files have no witness, and `do-client-probe.mjs` prints no RESULT line.
- Stream 57: RoomHealth, RoomPick, SceneImport, TiledImport and scaffold have no witness. The scaffold remote package fetch has no version pin.
- Stream 58: NostrAuthServer, ServerPresence and RoomDirectory have no witness. AgentAuthoringAPI has a live witness of read routes only, not the write routes.
- Streams 43 and 44: WebGPULodInstancer sentinels and the render graph error paths need a check.
- Stream 45: the zero-for-missing RTT and counters are candidates, and the missing-marker proposal is not implemented.
- Stream 46: the empty catch in StreamingScheduler and the `.gm/pool/pool.log` discrepancy remain OPEN.
- Streams 48 and 49: the RelocationSearch NaN absence and the LoadingMachine count default need a check.
- Streams 50 to 53: the empty setLocalPlayer function, the debug-log catch and the GroundNodeGrid sentinel need a check.
- Streams 54 to 56: the TerrainBackdrop silent catches, the ThreeVdrs window mirror, the edge instantiate rejection and the accept-before-await order need a check.
- Spoint design items (SessionStore ttl, StatsSystem default, the unused `__checkBudget`, the BakeCodeVersion input list) are recorded, not fixed.
- The LineBasicNodeMaterial linewidth note is OPEN in jayzee's AGENTS.md, and the three-line width claim is unverified.
- The grass density law is duplicated in shader and material code, so the two copies can drift.
- Render, XR and static serving negatives in [featureset-part-9.md](featureset-part-9.md): no CSP, HSTS or CORP header, a wildcard CORS origin on the API, and no rate limit on upload, static or LLM routes. These are recorded facts without a decision.
- Shadows, occlusion, Hi-Z and teleport arcs are not exercised at runtime. Runtime questions go to the owner.

### Manual build and endpoint checks

- The check does not rebuild and diff the site. It verifies sha256 and displayed text against the sources.
- The withheld lists in `build-manual.mjs` and `check-manual.mjs` differ. The check verifies only that the withheld paths are absent from the site.
- `check-open-items.mjs` is not wired into `package.json` or the workflow, so it runs only by hand.
- `verify-publish.mjs` needs the gh CLI and network access. No run is recorded in the sources.
- The two ideal checks depend on `/workspace/jayzee/docs/IDEAL.md`, which is outside this repository.
- The site commit can lag HEAD until the build is rerun (OPEN-018).
- The 30 absent endpoints have no spec description in `scripts/openapi.json`. Per-game behaviour on unauthenticated calls is not confirmed.
- `manual-worklist.json` is not read by any script, so its units are not proven complete.

## Sources

- /workspace/extra/wiki/cleetus/ pages: [morluto-ci-findings.md](morluto-ci-findings.md), [netcode.md](netcode.md), [jayzee-gaps.md](jayzee-gaps.md), [open-items.md](open-items.md), [parity.md](parity.md), [featureset-part-1.md](featureset-part-1.md) to [featureset-part-9.md](featureset-part-9.md), [manual-build.md](manual-build.md), [endpoints.md](endpoints.md), [manual-worklist.md](manual-worklist.md), [overview.md](overview.md).
- /workspace/savi/gaps/morluto-rea-pr-9234-ci-findings.md and /workspace/savi/gaps/netcode-optimization-gaps.md (old name: savi).
- /workspace/savi/docs/JAYZEE-GAPS.md, OPEN-ITEMS.md, PARITY-INPUTS.md, PARITY-BRIEF-FOR-JAYZEE.md, NETCODE-BRIEF-FOR-JAYZEE.md and FEATURESET.md (old name: savi).
