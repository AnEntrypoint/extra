# Open items register

## How it works

docs/OPEN-ITEMS.md (old name: savi) is the register of questions about the cleetus documentation and about the upstream data it describes. Each item is a level-three heading "### OPEN-NNN", numbered sequentially from OPEN-001 to OPEN-030, and each has a Claim, a Status, Source paths, a Witness line (command output or file paths), and sometimes a Resolution, Observation or Detail. Tagged items carry "Tag: required-in-jayzee", which marks the owner's parity directive: naming parity is not required, but feature support for everything jayzee (old name: spawn) is learning is non-negotiable.

The status vocabulary is OPEN, RESOLVED, INFERRED, UNVERIFIED, BEHAVIOUR, DIFFERENT-DATASET and HELD-OWNER. HELD-OWNER means awaiting an owner decision, and is never a resolved status. RESOLVED means answered with a cited witness and no cleetus work left, and it is never set while an owner decision or work outside cleetus remains. scripts/check-open-items.mjs enforces this vocabulary, the numbering, the presence of a witness and source paths, the existence of every /workspace path cited, and the commit ids in Resolution lines.

The register states the directive sources as /workspace/jayzee/docs/PARITY.md, and an ephemeral pointer /tmp/spoint-parity/INVENTORY.md that is provenance only and not a source. The .spawn/engine tree and the .spawn/reference references are read-only snapshots.

Items are grouped below by the status they carry at the time of writing.

### Register

- OPEN-001, RESOLVED. The 62 in the ENDPOINTS.md header is the spec path count, and 63 is a sum of named buckets (39, 21, 3). The two measure different things. The header matches what `npm run endpoints` writes, and the regenerated file is byte-identical. Only 42 of the 62 spec paths are named verbatim. Resolution: commit 09332d3 records the counting error; check-featureset gained an explicit no-status failure.
- OPEN-002, DIFFERENT-DATASET. 305 API type names in api-types.md and 308 in ASSET_SHAPES.md come from different fetches and scopes (witness api-types=305 asset-shapes=308).
- OPEN-003, OPEN, required in jayzee. The 93 endpoints (39 published, 21 per-game or per-id, 3 disabled, 30 not in spec) must be supported as an endpoint surface, not by name (witness openapi=62 listed=63 total=93 headings=4 39/21/3/30).
- OPEN-004, BEHAVIOUR, required in jayzee. FAULTS F1: GET /api/games/{appId} answers 200 with game null for every app id. This is documented behaviour and not a contradiction with ENDPOINTS.md listing the path. Do not resolve by deleting either.
- OPEN-005, DIFFERENT-DATASET, required in jayzee. The cleetus FEED_SCOPE.md figure (3421 projects, 66 engine versions, offset step 22) and the jayzee three-sort union (2848 worlds, 1002 creators) are different datasets. A live re-run on 2026-11-08 gave 3567 distinct projects and 66 engine versions for the plain feed walk (3890 rows), and 3567 worlds and 1164 creators for the three-sort union with limit 48. The feed has grown.
- OPEN-006, OPEN, required in jayzee. 2416 verified /cdn/ GLB refs across 399 worlds with 2355 unique sha256 values are a lower bound for the /cdn/ family only. No live value-level re-run was made: a full walk would be about nine million requests at the measured 1 to 2 s each.
- OPEN-007, INFERRED, required in jayzee. The spawnfile-family scan covered 16 of 16 shards and 2848 worlds with 0 refs, 0 worlds and 0 unique URLs. It is scoped to that set and is not a proof of universal absence. No re-run on 2026-11-08.
- OPEN-008, INFERRED, required in jayzee. "All GLBs served only from play.spawn.co/cdn/" is not witnessed. Scoped observations over 308 named keys with .yaml stripped: 304 return 302 to a value-origin path not under /cdn/, and after bounded retry every redirect target returns 200 model/gltf-binary on HEAD, with glTF magic on a 4-byte range GET. Controls: keys with .yaml kept return 401 (10 of 10); value-sha controls return 200 directly (20 of 20). This strengthens the named-key redirect claim and does not confirm a /cdn/-only rule.
- OPEN-009, UNVERIFIED, required in jayzee. spawnfile.io model bytes are unconfirmed until a HEAD proof exists. The 2848-world scan found 0 spawnfile-family refs. One live page filtered on /spawnfile|bigspawn/ (30 requests, 29 unique, glbLike empty) is recorded as a scoped observation, reported by jayzee's peer, not re-run by cleetus.
- OPEN-010, OPEN, required in jayzee. The full spawnfile key path is elided. FAULTS F3 shows world.assets/3d/https~3a~2f~2fspawnfile.io~2f...-savi-reduced-fitted.glb.yaml with no complete example. Bounded probes of the path prefix returned 200 text/html with length 0 for the host root, and 404 text/plain for the /prod/ and /prod/character-assets prefixes. No model bytes were reached, and the leaf was not guessed.
- OPEN-011, BEHAVIOUR, required in jayzee. The correct head-404 count is 256. The older list of 259 over-counts by three head-present, manifest-404 worlds (5db79de6dae84ceca2ddb9b9a0e216d9, fd80e9d941624c2fbc48fc89193a7417, ffb0a8fbdca948a5933be7bd62fb44b5). The 259 list is kept as recorded. On 2026-11-08, all 256 recorded head-404 worlds still returned 404; the three head-present worlds now return head 200, so the manifest 404 is not reproduced. The other 299 head-404 worlds were added to the feed after the 2848-world scan (head.json is 404 for 555 of 3567 worlds).
- OPEN-012, BEHAVIOUR, required in jayzee. Head status 0 for world 9f7b1a067caa46e2b2c1c7dceb48bc2b was transient: re-check HEAD 200, and the 2026-11-08 run returned head 200 and manifest 200. No world in the 3567 sweep returned status 0. The three head-present worlds return head 200 with "manifest":null and "seq":0.
- OPEN-013, OPEN, required in jayzee. Of the non-CDN refs, 83 first-seen status 0, 81 resolved HEAD 200 on retry, and 2 stayed open: a ttf that returns 401 (a credentialed-looking refusal, not bypassed), and an mp4 connection timeout. The mp4 was later fetched in full for one object (46469835 bytes, sha256 matching, first bytes ftyp isom), which does not extend to other objects. The 2026-11-08 re-run by HEAD: 82 return 200 and the credentialed ttf returns 401 (application/json). The mp4 no longer times out. Only the ttf 401 remains open.
- OPEN-014, UNVERIFIED. The owner-reported 84 first-seen status 0 and 82 resolved on retry are not verified. The surviving TSV has 83 zero-status rows and 81 retry-200 rows, and the 2026-11-08 run over 83 data rows gave 82 at 200 and one 401.
- OPEN-015, UNVERIFIED, required in jayzee. The world.assets/<xx>/ bucket rule is undetermined after 74 tested pairs, and no hypothesis is promoted. A local re-run over 11679 pairs in 1265 files found that the best hypothesis matched 54 pairs, and none is promoted.
- OPEN-016, UNVERIFIED, required in jayzee. The name encoder, the resolve redirect and gone bodies, manifest frames after the sheet, and the ledger bucket rule remain open or unverified. Lag token-bucket constants REWIND_BUCKET_CAPACITY=10 and REWIND_REFILL_PER_SEC=20 are confirmed in spoint src/netcode/LagCompensator.js lines 6 and 7. Manifest frames after the sheet are witnessed for 3 manifests (69/69, 80/80, 274/274) and for a 40-manifest sample (43 of 43 in total), which is a sample and not a corpus rule. Resolve redirects (308/307) and the 400 body are witnessed. A 410 gone response was not reached in 30 probes.
- OPEN-017, BEHAVIOUR, required in jayzee. With reorder above zero, 1011 of 2000 spoint transport-sim payloads arrived before minimum latency, so the minimum-latency gate runs with reorder off. A re-run of the jayzee simulated transport on every reorder preset found 0 or 1 early delivery per run. The 1011 figure is not reproduced by cleetus.
- OPEN-018, OPEN. site/manifest.json was generated at 501c76e while HEAD was 6c39a16, and the engine-deep README wrongly said cleetus is not a git repository (it is main, origin AnEntrypoint/savi). Resolution: commit c398faf corrects the README and regenerates site/. The check at c398faf gave ok true, 626 sources, 620 text, 6 binary, 628 pages, 2513 links and no failures. Status is unchanged at OPEN.
- OPEN-019, BEHAVIOUR, required in jayzee. CHARTEST-est-s1-3 is a confirmed REAL gap at spoint src/terrain/PlanetFrame.js installGroundSource line 348: a placement-only, prototype-linked install changes the shared base frame's groundSource.
- OPEN-020, OPEN, required in jayzee. Other confirmed real gaps: WADLER-relocation-probegroundy; GAP-bundle-freshness, with two package.json refs to the absent scripts/bundle-freshness-witness.mjs; GAP-fire-kernel-witness; MSG.DELTA_UPDATE declared but never sent or handled; the AppRuntime trimesh failure that is logged with the collider dropped; and port 3002 shared by three world definitions.
- OPEN-021, OPEN, required in jayzee. The spoint PRD matrix has 103 rows in .gm/prd.yml (fixed 34, refuted 28, retired 26, open 15). The 15 open rows are classified STALE 11, DOC-ONLY 2 and REAL 2. There are 76 tracked verdict paths and none untracked, and no row numbered 2 to 4.
- OPEN-022, UNVERIFIED, required in jayzee. The 13 unchecked claims of the spoint gap report remain open, and the 47 checked claims are explicitly not independently verified (total 60, implemented 47). The 13 unchecked items are: terrain mark vocabulary and world-def wiring; named terrain field paint with PLAYER and CREATOR layers; decoration item layers and graphics-tier reach; rigged-model ragdoll activation; vibe pattern core and transport; PostFX look DSL and render-graph operators; private preview room and separate publish; browser readiness, fault and chat contract; declarative world tree and state scopes; shared spec parse boundary for all ctx.define* factories; surfacing the tick drop counter; SES availability preflight with distinct reason codes; and a fail-loud asset loading gate for model errors.
- OPEN-023, RESOLVED. Of the five open items in .spawn/reference/COVERAGE.md, all five are answered (witness: coverage gaps=26 open-items=5 owner-improvements=5). Item 3, the shallow CLI reference, is answered by the owner: the shared help text is the reference for client and mod verbs, and the regeneration changed no bytes. Item 5, the engine clone omission, is answered by the owner: .spawn/engine/api-reference.md is canonical, and the reference copy was regenerated from it. update-engine-pin.py was deleted, along with its guard, the npm script sync-spec, and the --sync path of scripts/endpoints.mjs. The engine.yaml sha256 field stays the release pin b5d10e37..., recorded as a reference value and not verified against upstream. The INDEX previously recorded a hash that matched neither the file nor engine.yaml; it now records the release pin.
- OPEN-024, OPEN. Five netcode owner improvements were decided on 2026-11-08. Items 1 to 4 are briefed to jayzee in docs/NETCODE-BRIEF-FOR-JAYZEE.md as J1 (size the lag ring from the window), J2 (wire layouts in docs/netcode-wire.md) and J3 (generated module index). Item 5 (document gm maxInflight 8) is dropped for jayzee, because it is the gm run default. Status stays OPEN until jayzee reports the brief witnesses. See [netcode.md](netcode.md).
- OPEN-025, HELD-OWNER. Spoint-side decisions remain with the owner: the GAP-bundle-freshness fix choice, the 11 STALE PRD rows, spoint PRD items 2 to 4, four lost verdict files, and the Wave C model browser (held-owner spoint=5 jayzee=2 external=3 total=10).
- OPEN-026, HELD-OWNER. Jayzee-side decisions remain with the owner: the jayzee license and visibility, and the four node:test suite deletions proposed by jayzee (current suites 3, owner deletions 4).
- OPEN-027, HELD-OWNER. External decisions remain with the owner: the fx-19 push target, the txiki.js shim-layer port, and the Studio and text-job CDP Hunyuan session. The gm work row was closed by commit 03183ad, and its closure pointer is /workspace/gm/closes/prd-mw698vaf1e27.txt.
- OPEN-028, UNVERIFIED, required in jayzee. The owner directive says 23 builtin modules. The local corpus reproduces 21 builtin names, matching 21 builtin-*.md sections and 21 builtin table rows. block-shape appears in four reference files with no section or table row, so it is not a module. The owner's 23 is not reproducible locally.
- OPEN-029, OPEN, required in jayzee. value_not_found is reproduced for two absent 64-hex hashes (all zeros and all f's): values and manifests both return 404 with the error body. A scoped observation of two absent hashes, not a rule. Reproduced again on 2026-11-08.
- OPEN-030, OPEN, required in jayzee. The drifted-head case for world 41cd4649... stays open. On 2026-11-07 its head named manifest 3fa9a434..., which returned 200 with 513116 bytes. On 2026-11-08 head.json returns 4650 bytes and names manifest d49dac2b... with 3fa9a434... as its sheet field. The 404 unknown_world_store_key is not reproduced for that manifest. The misspelled head.jsn returns the 404, and head.json is the control (200, 1673 bytes on 2026-11-07).

### Required feature support

Tag: required-in-jayzee. Jayzee must support the jayzee boot chain (head.json, then manifests/<hash>, then values/<sha>); file-map key escapes ~2f and ~3a; /cdn/value.<sha>.<ext> content-addressed GLBs with sha256, glTF magic and HEAD 200 model/gltf-binary; 16-shard HEAD and Range probing with retry and idempotent aggregation; tolerance of 256 missing heads and transient ECONNRESET; bounded-offset feed enumeration with per-sort duplicates; address to worldId, appId and creator resolution; creator profiles with no direct GLB URLs, because models resolve from world state; world-store JSON values for scene, placement, terrain and UI, versus binary assets on /cdn/; local store names and derivedGeometry shards:16; LOD format 1.3.0; and the 93 endpoints, 23 served skills, 68 Tome headings and 23 builtin modules. OPEN-028 records the builtin count delta.

### Jayzee learnings witnessed in FEATURESET

The register also lists learnings witnessed in docs/FEATURESET.md (old name: savi) with exact commands:

- Spawnfile-family scan: 16 of 16 shards, 2848 worlds, 0 refs (OPEN-007).
- /cdn/ GLB family: 2416 verified refs across 399 worlds and 2355 unique sha256, each HEAD 200 model/gltf-binary with glTF magic. A lower bound for that family only (OPEN-006).
- Missing heads: 256 is the correct count (OPEN-011, OPEN-012).
- Non-CDN refs: 83 first-seen status 0, 81 resolved, 2 open (OPEN-013, OPEN-014).
- Endpoints: 93 = 39 + 21 + 3 + 30. HTTP doors: 70 = 17 exercised + 53 documented, reproduced in FEATURESET.
- API types: 305 type files in .spawn/reference/cli/types/, plus three underscore meta files (308 files). The live 308 claim needs a Bearer token and is UNVERIFIED (OPEN-002).
- Tome: 68 distinct headings across 69 index rows, with "World Queries" appearing twice. 21 local builtin modules against the owner's 23 (OPEN-028).
- The reference index total of 208 is not reproduced: the tome bucket measures 75 files (73 .md), so the total is 207 or 209 depending on the rule (UNVERIFIED).
- Jayzee PARITY rows 6 to 10, 32 and 33 at commit 17ce428 are documented with durable spoint paths and line numbers in docs/FEATURESET.md, section "Stream 11". Their closure status is not verified here.

## Decisions

- Every item carries a status and a witness, so no claim is held without evidence. The vocabulary distinguishes BEHAVIOUR (observed and kept) from RESOLVED (answered, with no work left), and HELD-OWNER (awaiting an owner decision).
- Numbers are kept as recorded. OPEN-011 keeps the older 259 list beside the corrected 256, and OPEN-014 keeps the owner's 84 and 82 beside the TSV's counts, so no earlier figure is overwritten.
- Re-runs are dated. The 2026-11-08 live re-runs are recorded beside the 2026-11-07 witnesses, and where a re-run disagrees (OPEN-005, OPEN-011, OPEN-012, OPEN-030) the item keeps both and says which one is current.
- Scope is kept explicit: a scan of a set is not a proof of universal absence (OPEN-007), and a sample is not a rule (OPEN-016).
- Owner decisions are recorded but not marked resolved while work outside cleetus remains (OPEN-023 and OPEN-024 show the rule).

## Open gaps

The register itself lists the following items as open (status OPEN, UNVERIFIED, INFERRED, HELD-OWNER or BEHAVIOUR awaiting follow-up):

- OPEN-003: jayzee must support the endpoint surface (required in jayzee).
- OPEN-006: the value-level walk of /cdn/ GLB refs was not run, so 2416, 399 and 2355 remain a lower bound.
- OPEN-007: the spawnfile-family absence is scoped, not universal.
- OPEN-008: the /cdn/-only claim is INFERRED.
- OPEN-009: spawnfile.io bytes are UNVERIFIED pending a HEAD proof.
- OPEN-010: the spawnfile key path is elided in FAULTS F3.
- OPEN-013: the credentialed ttf 401 remains open and is not bypassed.
- OPEN-014: the owner's 84 and 82 are unverified.
- OPEN-015: the world.assets/<xx>/ bucket rule is undetermined.
- OPEN-016: the name encoder, resolve gone bodies (410), manifest frames beyond the sample, and the ledger bucket rule are open.
- OPEN-018: the site commit lag and README correction are recorded but the status stays OPEN.
- OPEN-020: the other confirmed real gaps in spoint (listed above) are open.
- OPEN-021: the 15 open PRD rows (STALE 11, DOC-ONLY 2, REAL 2) are open.
- OPEN-022: the 13 unchecked gap-report claims are open.
- OPEN-024: the netcode briefs J1 to J3 stay open until jayzee reports witnesses.
- OPEN-025, OPEN-026, OPEN-027: HELD-OWNER decisions, with the owner.
- OPEN-028: the owner's 23 builtin modules are not reproducible locally.
- OPEN-029: value_not_found is reproduced for two hashes only.
- OPEN-030: the drifted head case is not reproduced.
- The reference total of 208 is UNVERIFIED (207 or 209 depending on the rule).
- Jayzee PARITY rows 6 to 10, 32 and 33: closure not verified in this register.

## Sources

- /workspace/savi/docs/OPEN-ITEMS.md (old name: savi)
- /workspace/savi/scripts/check-open-items.mjs (old name: savi)
- /workspace/savi/docs/NETCODE-BRIEF-FOR-JAYZEE.md (old name: savi)
- /workspace/savi/docs/PARITY-INPUTS.md (old name: savi)
- /workspace/savi/gaps/netcode-optimization-gaps.md (old name: savi)
- /workspace/savi/spawn-engine/FAULTS.md (old name: cleetus, old name: spawn)
- /workspace/savi/spawn-engine/FEED_SCOPE.md (old name: cleetus, old name: spawn)
- /workspace/savi/spawn-engine/ASSETS.md (old name: cleetus, old name: spawn)
- /workspace/savi/.spawn/reference/COVERAGE.md (old name: cleetus, old name: spawn)
- /workspace/savi/.spawn/reference/http/api-types.md (old name: cleetus, old name: spawn)
- /workspace/savi/spawn-engine/ASSET_SHAPES.md (old name: cleetus, old name: spawn)
- /workspace/savi/.spawn/reference/engine-deep/api-b.md (old name: cleetus, old name: spawn)
- /workspace/savi/.spawn/reference/engine/api-reference.md (old name: cleetus, old name: spawn)
- /workspace/savi/.spawn/reference/engine-deep/README.md (old name: cleetus, old name: spawn)
- /workspace/savi/site/manifest.json (old name: savi)
- /workspace/savi/docs/FEATURESET.md (old name: savi)
- /workspace/savi/ENDPOINTS.md (old name: savi)
- /workspace/savi/scripts/openapi.json (old name: savi)
- /workspace/savi/scripts/endpoints.mjs (old name: savi)
- /workspace/jayzee/docs/PARITY.md
- /workspace/spoint/src/netcode/LagCompensator.js
- /workspace/spoint/src/terrain/PlanetFrame.js
- /workspace/spoint/.gm/prd.yml
- /workspace/spoint/.gm/witness-out/spawn-feature-gap.md
- /workspace/spoint/src/transport/NetworkSimTransport.js
- /workspace/gm/closes/prd-mw698vaf1e27.txt
- /workspace/spawn/maps/spawn-root-worlds-map.md (old name: spawn)
- /workspace/spawn/maps/glb-urls-all.tsv (old name: spawn)
- /workspace/spawn/maps/head404-confirmed-worlds.txt (old name: spawn)
- /workspace/spawn/maps/head-present-manifest404-worlds.txt (old name: spawn)
- /workspace/spawn/maps/open-missing-head-worlds.txt (old name: spawn)
- /workspace/spawn/maps/unverified-noncdn-refs.tsv (old name: spawn)
- /workspace/spawn/maps/spawn-learning-record.md (old name: spawn)
