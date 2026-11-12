# cleetus index

## How it works

The cleetus pass is the index of the cleetus agent's local evidence. Its on-disk directory is /workspace/index/savi (old name: savi). The pass writes three files: /workspace/index/savi/savi-index.json (old name: savi), /workspace/index/savi/openapi-paths.txt (old name: savi) and /workspace/index/savi/README.md (old name: savi). The pass reads only the cleetus evidence tree at /workspace/savi (old name: savi) and is recorded as "bounded local pass complete" in INDEX.json. Its scope is recorded as "/workspace/savi local evidence only". Generation stamp: 2026-11-11T13:53:40.261Z. The findings file it summarises has sha256 4e64f372d60d8537ed6b91b2068ddaa09118d5eeec19c7956d47a50d9798dc04 and 6094 bytes.

The pass counts 112 local files considered, 17 docs indexed, 95 source index rows, 64 unique source URLs and 62 OpenAPI paths.

Docs indexed (path as recorded, relative to the cleetus tree, with bytes and sha256). Every path below sits under /workspace/savi (old name: savi).

- spawn-engine/ASSETS.md (old name: spawn for the directory), 5401 bytes, sha256 6a0377b19c19bc5934c7842d221fe8565553a20d945aa39cff80c64b7678a6fe
- spawn-engine/ASSET_SHAPES.md (old name: spawn), 5038 bytes, sha256 b8b6b2d29152d7b381b243e571a8df71e8fca03208eedf2c5337fe7e34ed86fb
- spawn-engine/FAULTS.md (old name: spawn), 4437 bytes, sha256 b241b6ccbff81c325ece8fabf0544c9ccd318ba8c3a69a032b82a3272539d75b
- spawn-engine/FEED_SCOPE.md (old name: spawn), 1626 bytes, sha256 34cdd6a7806e9ee06d3f6459ab9b3742bbd06754e3391e5e698480e91b109d35
- spawn-engine/GIT_HOST.md (old name: spawn), 2550 bytes, sha256 33ced1bfe079004142a2253386a5474b8da1909a8ae0a3faefe2e9f9b93ebdde
- spawn-engine/MANIFESTS.md (old name: spawn), 5729 bytes, sha256 3f7b378fc102afabe27d82649a7ab45da9c33bc40bc4e366b0e724a00cb21cbf
- spawn-engine/PROJECTS.md (old name: spawn), 5037 bytes, sha256 32daefde79826a75242e8bf0ee7fb475130486b0960cf284431a298fd2283546
- spawn-engine/PROJECT_ASSETS.md (old name: spawn), 4730 bytes, sha256 8f7bc1920a1339f01e2b0ee9fd2c1b3fbfdfe341c656e74fb2673a0af35354c4
- spawn-evidence/FINDINGS.md (old name: spawn), 6094 bytes, sha256 4e64f372d60d8537ed6b91b2068ddaa09118d5eeec19c7956d47a50d9798dc04
- spawn-evidence/README.md (old name: spawn), 1157 bytes, sha256 ae6ccde6ae143ac6f6b9f8d61da0d298229646e61f46af7b05b48dadb9d69ab0
- spawn-evidence/maps/spawn-root-worlds-map.md (old name: spawn), 30169 bytes, sha256 aa6246ae81e8f8a619ce5b06fb692fd5da3484dcd8ba11759f6981708434e74a
- docs/FEATURESET.md, 215983 bytes, sha256 49c2c18cc752595adfa28605f22b102dc8a28e3bde99e0ae2bf758b968807fed
- docs/JAYZEE-GAPS.md, 39417 bytes, sha256 2818461b83c312fa65a723e78b3a72d88684d84493ce555024ce27530108f780
- docs/NETCODE-BRIEF-FOR-JAYZEE.md, 4577 bytes, sha256 03da0194a0591d34e0b0a5c25a9e3f67b87ce09d71914a568626435113c4ed36
- docs/OPEN-ITEMS.md, 35554 bytes, sha256 33fdebe6c243bb8674e8609926966740dbd9e768df0b820ea3d48003994f33fb
- docs/PARITY-BRIEF-FOR-JAYZEE.md, 1430 bytes, sha256 af7fc0901878a07432646ced75900c9bf5459443de9ac42265d11869cb74178f
- docs/PARITY-INPUTS.md, 11760 bytes, sha256 d0d339cdef1893813ab664652dca8d3cc7fda50f655eac553417357703e54e9b

The 17 docs total 380689 bytes. Only the path, size and hash of each doc are kept in the index. The text of these docs is not in /workspace/index.

The OpenAPI list in openapi-paths.txt and in savi-index.json (openapiPathList) has 62 paths, one per line, and the two copies match. Grouped by prefix: /api/agent/v1 has 15 paths, /api/sdk/v1 has 14 paths (the variantId routes for agent db, docs, exec, health, logs, report, rooms, skills, assets, game-specs and studio-chat), /api/social has 9 paths, /api/games/{appId} has 7 paths, /api/character has 7 paths (convert, equip, equip-model, generate, jobs/{jobId}, picture and reset), /api/notifications has 4 paths, /api/invites has 2 paths, and there is one path each for /api/feed, /api/player/heartbeat, /api/resolve-adventure and /api/session/grant/agent.

The findings excerpt in INDEX.json (saviFindings) and the project excerpt (saviProjects) are jayzee-side notes written for this pass. They say that resolve-adventure returns 200 JSON for found and not_found, returns 400 {"ok":false,"error":"Invalid query"} for an empty or missing address, and redirects a trailing slash with 308, http with 308 and the apex host with 307. Each redirect body is "Redirecting...". The feed excerpt says the public feed has 3421 projects across 66 engine versions, and the first feed block of 22 projects is all engine 6.0.0.

## Decisions

- Scope limited to local cleetus evidence. The savi README and the scope field of savi-index.json say "local /workspace/savi evidence only" and "/workspace/savi local docs/endpoints/evidence/sources".
- Docs kept by hash, not by text. Each doc is recorded with bytes and sha256 so that a later reader can check the copy they hold. The method note says the pass read the engine docs, evidence findings, source URL index, OpenAPI paths and endpoint tables, and derived counts and hashes.
- OpenAPI paths kept twice. openapi-paths.txt and openapiPathList carry the same 62 paths, so the path list can be read without parsing JSON.
- Feed correction recorded. The feed excerpt says a first block of 22 rows is not the whole feed. The correction points to FEED_SCOPE.md and data/feed-projects.json for the full list of 3421 projects.
- Denominators kept separate. INDEX.json and the README keep the 64 unique source URLs, the 95 source index rows and the 62 OpenAPI paths as separate counts.

## Open gaps

- The endpoint tables were not captured. endpointTableSample is an empty array in savi-index.json, although the method note says endpoint tables were read.
- The text of the 17 docs is not in the index. Only paths, byte counts and hashes are kept. The docs/FEATURESET.md file, at 215983 bytes, is the largest.
- The feed correction points to /workspace/savi/spawn-engine/FEED_SCOPE.md (old name: savi, and spawn-engine is an old name) and to data/feed-projects.json, which are not in the index. The saviProjects excerpt covers only the first block.
- Resolve-adventure returned no 410 (gone) answer in 30 probes. The findings mark this OPEN.
- Identifier OPEN-013: the two non-CDN references appear under two identifiers (the world_uuid_nodash column and the sha256 column of maps/unverified-noncdn-refs.tsv, lines 22 and 37). The findings call this not a discrepancy.
- Name encoder: the only escape witnessed is ~2f. ':' to '~3a' is witnessed only in the cleetus FAULTS.md (spawnfile key), and '~' to '~7e' has no witness.
- The docs/OPEN-ITEMS.md and docs/JAYZEE-GAPS.md files are indexed by hash only, so their open items are not reproduced here. Their own content is the place to read them.

## Sources

- /workspace/index/savi/README.md (old name: savi)
- /workspace/index/savi/savi-index.json (old name: savi)
- /workspace/index/savi/openapi-paths.txt (old name: savi)
- /workspace/index/INDEX.json (saviFindings and saviProjects excerpts, savi counts)
- /workspace/index/README.md (Savi sections)
- /workspace/savi/spawn-engine/ASSETS.md (old name: savi; spawn-engine is an old name)
- /workspace/savi/spawn-engine/ASSET_SHAPES.md (old name: savi; spawn-engine is an old name)
- /workspace/savi/spawn-engine/FAULTS.md (old name: savi; spawn-engine is an old name)
- /workspace/savi/spawn-engine/FEED_SCOPE.md (old name: savi; spawn-engine is an old name)
- /workspace/savi/spawn-engine/GIT_HOST.md (old name: savi; spawn-engine is an old name)
- /workspace/savi/spawn-engine/MANIFESTS.md (old name: savi; spawn-engine is an old name)
- /workspace/savi/spawn-engine/PROJECTS.md (old name: savi; spawn-engine is an old name)
- /workspace/savi/spawn-engine/PROJECT_ASSETS.md (old name: savi; spawn-engine is an old name)
- /workspace/savi/spawn-evidence/FINDINGS.md (old name: savi; spawn-evidence is an old name)
- /workspace/savi/spawn-evidence/README.md (old name: savi; spawn-evidence is an old name)
- /workspace/savi/spawn-evidence/maps/spawn-root-worlds-map.md (old name: savi; spawn-evidence is an old name)
- /workspace/savi/docs/FEATURESET.md (old name: savi)
- /workspace/savi/docs/JAYZEE-GAPS.md (old name: savi)
- /workspace/savi/docs/NETCODE-BRIEF-FOR-JAYZEE.md (old name: savi)
- /workspace/savi/docs/OPEN-ITEMS.md (old name: savi)
- /workspace/savi/docs/PARITY-BRIEF-FOR-JAYZEE.md (old name: savi)
- /workspace/savi/docs/PARITY-INPUTS.md (old name: savi)
