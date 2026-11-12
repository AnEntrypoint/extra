# Parity

## How it works

Two documents set out the parity relationship between cleetus, jayzee (old name: jayzee for the platform), and spoint. docs/PARITY-INPUTS.md (old name: savi) is the record of inputs: the owner's directives, the documented featureset of cleetus, the streams relayed from the spoint peer, and the final scan corrections from the jayzee side. It was compiled by an orchestrator relay of witnessed peer reports on 2026-11-07. The inputs first arrived as peer messages, not files, so the file says each claim must be verified against the cited path before it is folded into the documented featureset. Paths under /tmp/spoint-parity/ and /tmp/spawn-probe/ are ephemeral, and are cited only as provenance. docs/PARITY-BRIEF-FOR-JAYZEE.md (old name: savi) is the brief that tells jayzee which parity rows changed status at a fixed commit.

### The relationship

The parity relationship is jayzee to spoint, plus cleetus's documented featureset and jayzee's learnings. Both jayzee and spoint are unrelated to oscraft. Naming parity is not required and may be idealized, but feature parity is required. The owner directives quoted in the inputs are:

- "ok jayzee has made its initial version, push it all the way to spoint parity and cleetus parity".
- Continuous documentation expansion from spoint, and feature expansion for jayzee to at least support everything jayzee is learning. That expansion is non-negotiable, must be documented by cleetus or in ../savi, must be implemented in jayzee, and must include everything spoint has made.
- jayzee and spoint are each unrelated to oscraft (both stated).
- The fx agent should roll out all the functionality it can observe in its own environment in its repo.

### The documented featureset of cleetus

The inputs list the sources of the featureset, each to be verified: ENDPOINTS.md, scripts/openapi.json, .spawn/reference/http/CATALOG.md, .spawn/reference/http/api-types.md, jayzee-engine/ASSET_SHAPES.md, jayzee-engine/FEED_SCOPE.md, jayzee-engine/PROJECT_ASSETS.md, jayzee-engine/ASSETS.md, jayzee-engine/FAULTS.md, .spawn/reference/README.md, .spawn/reference/tome/INDEX.md, .spawn/reference/skills/INDEX.md, .spawn/reference/engine-deep/, gaps/netcode-optimization-gaps.md, gaps/morluto-rea-pr-9234-ci-findings.md, .spawn/reference/COVERAGE.md, scripts/build-manual.mjs, scripts/check-manual.mjs and .github/workflows/publish.yml. The counts it records are:

- ENDPOINTS.md names 93 endpoints from an OpenAPI 3.1.0 spec with 62 paths: 39 in the published spec, 21 per-game or per-id, 3 disabled, 30 not in the spec. The header says 62 paths while the published sections sum to 63; the 93 total and the four headings reconcile.
- CATALOG.md has 70 HTTP doors: 17 exercised GETs and 53 documented but not exercised. api-types.md has 305 API type names, and ASSET_SHAPES.md says 308. These are different fetches and scopes.
- FEED_SCOPE.md walked 3,421 projects and 66 engine versions with offset steps of 22. PROJECT_ASSETS.md counted 395 distinct asset URLs in 4 URL families.
- Tome: INDEX.md has 68 headings and 69 section files. Skills: 23 served. Builtin modules: the owner directive says 23, and the local corpus enumerates 21 unique builtin names. block-shape appears in four reference files with no section or table row, so it is not a module. OPEN-028 records that the owner's 23 is not reproducible locally.
- reference/README.md indexes 208 files. COVERAGE.md records 26 verbatim job gaps and 5 open items.
- Completeness contract: build-manual.mjs generates site/, check-manual.mjs proves raw sha equality, displayed-text equality, link resolution, .nojekyll, the seven workflow markers, manifest counts and manifest commit equal to HEAD. publish.yml builds and checks on every push and deploys main to Pages. Withheld from publication: .spawn/reference/http/raw/, sources/, runs/, .playwriter/ and site/.
- gaps/netcode-optimization-gaps.md documents 24 undocumented src/netcode modules, a verified silent ring-overflow bug, the wire scale and five owner improvements. gaps/morluto-rea-pr-9234-ci-findings.md records PR 9234 CI findings.

### The spoint featureset

The inputs list the spoint sources read at commit d5e3860 (2,233 commits, 2,293 tracked files, 20 docs pages, 103 PRD rows: fixed 34, refuted 28, retired 26, open 15; 142 files in work/rows/, 76 tracked verdict paths). The families are protocol (MessageTypes.js with WIRE_PROTOCOL_VERSION 5, msgpack.js, InputCodec.js, ComponentSchema.js), netcode, client (PredictionEngine, ReconciliationEngine, SnapshotProcessor and its timeline, ClockSync, ReconnectManager), transport (WebSocket, WebTransport and QUIC, Wireweave and WebRTC, worker postMessage, NetworkSimTransport, TransformRing), sharding (Cluster*, Region*, ClusterHandoff, ShardingRefusal), SDK and server (ServerAPI, AgentAuthoringAPI, StaticHandler, DevHmr, RoomOrchestratorHttp, WorldPersistence and others), physics (Jolt world wrapper, CharacterManager, ShapeBuilder, FlightModel, VehiclePhysics, Draco and Meshopt decompressors), terrain (21 or more files), apps (31 built-in placed apps in src/stdlib-apps/, 12 world definitions in apps/world/, about 40 app demos), packages (mapspinner, streaming-gltf, ecs, spoint-core in Rust), game systems, animation, pathfinding, client editor and HUD, edge and deploy (edge/cf-do, src-tauri, bin, scripts with 193 top-level entries, 115 witness*.mjs and 6 harness*.mjs, and 16 GLB maps in apps/maps/). The .gm/witness-out/spawn-feature-gap.md file is a 60-claim gap report with 47 implemented and 13 remaining; the 47 are not independently verified.

### Streams relayed from the spoint peer

These were peer messages, not files, and their durable equivalents are the /workspace paths above and /workspace/spoint/.gm/witness-out/:

- Streams 1 to 6: the spoint inventory artifacts (INVENTORY.md, FAMILIES.md with 19 families and 107 paths, GAPS.md, prd-matrix.json with 15 of 15 open rows classified STALE 11, DOC-ONLY 2, REAL 2, and five non-PRD real gaps, and parity-crossmap.json). The check-refs gap is two package.json references to an absent scripts/bundle-freshness-witness.mjs.
- Stream 7: CHARTEST-est-s1-3 is confirmed REAL at src/terrain/PlanetFrame.js installGroundSource line 348. src/netcode/LagCompensator.js lines 6 and 7 set REWIND_BUCKET_CAPACITY=10 and REWIND_REFILL_PER_SEC=20, and InputGuard sets 90 per second at line 2.
- Stream 8: the 13 unchecked claims of the spoint gap report, and the Wave C refinement. The delivery docs .gm/WAVE_C_COMPLETION_SUMMARY.md and .gm/MODEL_BROWSER_DELIVERY.md exist, and their implementation is unverified.
- Stream 9: the spoint sandbox and static-serving surface. SES fails closed with SandboxUnavailableError at src/sdk/SESCompartmentEvaluator.js line 81, the timing-safe compare is at src/sdk/authCompare.js line 10, COEP require-corp is at src/sdk/StaticHandler.js line 108, and path containment is at line 149.
- Stream 10: the final cross-map counts at the time, with refreshed witnesses: PRD matrix 15 of 15, check-gaps PASS, chartest GAP-CONFIRMED, check-families 19, 107 and 0, and check-refs exit 1.

### Scan corrections from the jayzee side

The inputs record the final scan corrections made by jayzee (sources under /workspace/spawn/maps/, old name: spawn):

- The full spawnfile-family scan covered 16 of 16 shards, 2,848 worlds, with 0 refs, 0 worlds and 0 unique URLs. This is scoped to the scanned set, not proof of universal absence.
- The /cdn/ family has 2,416 verified GLB refs across 399 worlds, 2,355 unique sha256 values, each returning HEAD 200 model/gltf-binary with glTF magic. 2,416 is a lower bound for that family only.
- Missing heads: head404 total 256, all inside the earlier 259 list. The 259 list over-counts by three head-present, missing-manifest worlds. The correct missing-head count is 256, and the original list is kept as recorded.
- head status 0 for one world was transient: a re-check returned HEAD 200. Manifest 404 for three worlds did not reproduce, because head.json returned 200 for them.
- Non-CDN refs: 83 first-seen status 0, 81 resolved to HEAD 200 on retry, and 2 open (a ttf 401 credentialed, and an mp4 connection timeout). unverified-noncdn-refs.tsv has 84 lines including the header, so 83 data rows.
- Remaining open: the full spawnfile key path is elided in FAULTS F3, spawnfile.io bytes are unconfirmed, "all GLBs on /cdn/" is inferred, the world.assets/<xx>/ bucket rule is undetermined after 74 tested pairs, the name encoder is decode-only, and resolve redirect and gone bodies and manifest frames after the sheet were not all captured.
- The live lanmower/deepfall probe hit spawnfile.io hosts and play.bigspawn.net with an empty glbLike list over 30 requests. That is one page with a filter caveat, not a family scan, and is recorded under OPEN-009 as unverified.

### Feature-support contract already in the register

docs/OPEN-ITEMS.md has a "Required feature support" section that lists the jayzee boot chain, the ~2f and ~3a file-map escapes, the content-addressed /cdn/ GLBs, 16-shard HEAD and Range probing with retry, tolerance of 256 missing heads, bounded-offset feed enumeration, address resolution, creator profiles, world-store values versus binary /cdn/ assets, local store names, derivedGeometry shards:16, LOD 1.3.0, and the 93 endpoints, 23 skills, 68 Tome headings and 23 builtin modules. The PARITY-INPUTS file says to extend that section rather than duplicate it.

### PARITY-BRIEF-FOR-JAYZEE.md

Jayzee re-ranked the six rows of the earlier brief at commit 5fd6628c09384c1059af68839fb80e161f48c163 on origin main. cleetus re-pinned docs/JAYZEE-GAPS.md to that commit. The brief maps each old row to its new number, and takes each status as jayzee reports it. A row is marked built only where jayzee's table names a witness.

| Register row | Jayzee row at 5fd6628 | Status | Title |
|---|---|---|---|
| 1 | 60 | partial | Jayzee feed, resolve, head, ledger keys and CDN names |
| 62 | 61 | built | HTTP door catalog: 70 doors, 17 exercised and 53 documented |
| 63 | 62 | built | Tome API reference index: 68 distinct headings over 69 index rows, 69 section files, and 21 builtin sections |
| 64 | 63 | open | Served skills: 23 served, and 47 directory entries |
| 65 | 64 | open | Builtin modules: 21 served by name, against the owner count of 23 (UNVERIFIED, OPEN-028) |
| 66 | 65 | open | Reference total: 563 tracked files under .spawn/reference, against the README's 208 indexed files |

Rows 61 and 62 are built. The register cites their witnesses: scripts/check-upstream-doors.mjs and scripts/check-upstream-door-dispatch.mjs for row 61, and scripts/check-upstream-tome.mjs and scripts/check-upstream-tome-lookup.mjs for row 62. Row 60 and rows 63 to 65 stay as jayzee reports them. The owner counts of 23 builtins and 208 indexed files remain UNVERIFIED.

## Decisions

- Naming parity is not required; feature parity is. The owner directive is recorded verbatim in the inputs, so the bar is the feature list and not the names.
- Every claim is verified against the cited path before it is folded into the featureset. Peer-relayed claims are recorded as relayed, with the durable path beside them.
- Ephemeral /tmp paths are provenance only, never sources. This keeps the record reproducible from committed paths.
- A brief maps old register rows to jayzee's new rows at one pinned commit, so the statuses cannot drift with the working tree.
- A built status is granted only where jayzee's table names a witness. Otherwise the status is kept as jayzee reports it.
- Figures that disagree are kept side by side with their dates (the 2848 and 3567 feed counts, the 259 and 256 head-404 counts), not overwritten.

## Open gaps

- The 47 checked spoint gap-report claims are not independently verified, and the 13 unchecked ones remain open.
- Rows 65 and 66 of the brief stay open: the 23 builtin modules and the 208 reference total are UNVERIFIED.
- Row 1 (jayzee feed and CDN names) is partial, with the name encoder, ledger bucket rule, redirect and gone bodies, and manifest frames after the sheet open.
- The spawnfile.io bytes and the full spawnfile key path remain unconfirmed, and the "all GLBs on /cdn/" claim is inferred.
- The owner's directive that jayzee implement everything spoint has made remains a requirement, and the held owner decisions in OPEN-025 to OPEN-027 are outside cleetus.
- The inputs state that the scan results are scoped to the scanned sets and are not proofs of universal absence.

## Sources

- /workspace/savi/docs/PARITY-INPUTS.md (old name: savi)
- /workspace/savi/docs/PARITY-BRIEF-FOR-JAYZEE.md (old name: savi)
- /workspace/savi/docs/JAYZEE-GAPS.md (old name: savi)
- /workspace/savi/docs/OPEN-ITEMS.md (old name: savi)
- /workspace/savi/ENDPOINTS.md (old name: savi)
- /workspace/savi/scripts/openapi.json (old name: savi)
- /workspace/savi/.spawn/reference/http/CATALOG.md (old name: cleetus, old name: spawn)
- /workspace/savi/.spawn/reference/http/api-types.md (old name: cleetus, old name: spawn)
- /workspace/savi/spawn-engine/ASSET_SHAPES.md (old name: cleetus, old name: spawn)
- /workspace/savi/spawn-engine/FEED_SCOPE.md (old name: cleetus, old name: spawn)
- /workspace/savi/spawn-engine/PROJECT_ASSETS.md (old name: cleetus, old name: spawn)
- /workspace/savi/spawn-engine/ASSETS.md (old name: cleetus, old name: spawn)
- /workspace/savi/spawn-engine/FAULTS.md (old name: cleetus, old name: spawn)
- /workspace/savi/.spawn/reference/README.md (old name: cleetus, old name: spawn)
- /workspace/savi/.spawn/reference/tome/INDEX.md (old name: cleetus, old name: spawn)
- /workspace/savi/.spawn/reference/skills/INDEX.md (old name: cleetus, old name: spawn)
- /workspace/savi/.spawn/reference/COVERAGE.md (old name: cleetus, old name: spawn)
- /workspace/savi/gaps/netcode-optimization-gaps.md (old name: savi)
- /workspace/savi/gaps/morluto-rea-pr-9234-ci-findings.md (old name: savi)
- /workspace/savi/scripts/build-manual.mjs (old name: savi)
- /workspace/savi/scripts/check-manual.mjs (old name: savi)
- /workspace/savi/.github/workflows/publish.yml (old name: savi)
- /workspace/spoint/.gm/prd.yml
- /workspace/spoint/.gm/witness-out/spawn-feature-gap.md
- /workspace/spoint/src/terrain/PlanetFrame.js
- /workspace/spoint/src/netcode/LagCompensator.js
- /workspace/spoint/src/sdk/SESCompartmentEvaluator.js
- /workspace/spoint/src/sdk/authCompare.js
- /workspace/spoint/src/sdk/StaticHandler.js
- /workspace/spawn/maps/spawn-root-worlds-map.md (old name: spawn)
- /workspace/spawn/maps/glb-urls-all.tsv (old name: spawn)
- /workspace/spawn/maps/unverified-noncdn-refs.tsv (old name: spawn)
- /workspace/jayzee/docs/PARITY.md
