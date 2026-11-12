# The cleetus/ directory (old name: savi)

## How it works

/workspace/index/savi (old name: savi) is the index output of the second agent pass. That pass was run over the cleetus repository at /workspace/savi (old name: savi), which is read-only here. The directory is the cleetus pass's own output and holds three files, 16 KB in total. It describes the public API surface, the documentation the cleetus repository holds, and the source URL index, and it counts them. Nothing is copied from the repository beyond counts, paths and hashes.

Files:

- README.md (279 bytes): the pass summary. Its title in the file uses the pass's old name, "Savi indexing pass". Scope: local /workspace/savi (old name: savi) evidence only. It reports 17 docs indexed, 95 source index rows, 64 unique source URLs, 62 OpenAPI paths, a findings hash (4e64f372d60d8537ed6b91b2068ddaa09118d5eeec19c7956d47a50d9798dc04), and generation at 2026-11-11T13:53:40.261Z.
- openapi-paths.txt (1,629 bytes, 62 lines): one API path per line, all starting /api/. Grouped by first segments: agent/v1 (15 paths: access, api, chat/dm, chat/inbox, chat/room, games, link-request, login-link, me, me/numbers, pfp/{username}, signup, token, token/revoke, worlds), sdk/v1/{variantId} (14 paths: agent/db, agent/docs, agent/exec, agent/health, agent/logs, agent/report, agent/rooms, agent/skills/{skillId}, assets/upload-target, assets/{name}, game-specs, game-specs/latest, game-specs/validate, studio-chat/notify), games/{appId} (7 paths, including comments, crew/ask, crew/invites, folio, folio/zip and publish), character (7 paths: convert, equip, equip-model, generate, jobs/{jobId}, picture, reset), social (9 paths: friends, hidden, me, met, personas, places, relation, report, who), notifications (4 paths), invites (2), and one each of feed, player/heartbeat, resolve-adventure and session/grant/agent. The groups sum to 62.
- savi-index.json (old name: savi) (5,324 bytes): the pass record. Keys: agent (the pass name), generatedAt, scope, docs (17 entries, each with path, bytes and sha256), sourceIndexRows (95), sourceUrls (64), openapiPaths (62), openapiPathList (the 62 paths), endpointTableSample (empty), findings (bytes and sha256 of the findings text) and method (the one-sentence description: read the engine docs, findings, source URL index, OpenAPI paths and endpoint tables, then derive local counts and hashes).

The 17 docs indexed are: spawn-engine/ASSETS.md (old name: spawn), spawn-engine/ASSET_SHAPES.md (old name: spawn), spawn-engine/FAULTS.md (old name: spawn), spawn-engine/FEED_SCOPE.md (old name: spawn), spawn-engine/GIT_HOST.md (old name: spawn), spawn-engine/MANIFESTS.md (old name: spawn), spawn-engine/PROJECTS.md (old name: spawn), spawn-engine/PROJECT_ASSETS.md (old name: spawn), spawn-evidence/FINDINGS.md (old name: spawn), spawn-evidence/README.md (old name: spawn), spawn-evidence/maps/spawn-root-worlds-map.md (old name: spawn), docs/FEATURESET.md, docs/JAYZEE-GAPS.md, docs/NETCODE-BRIEF-FOR-JAYZEE.md, docs/OPEN-ITEMS.md, docs/PARITY-BRIEF-FOR-JAYZEE.md and docs/PARITY-INPUTS.md. Their paths are relative to the cleetus repository. Each path that contains the older names carries those names as written in the repository.

INDEX.json records that the cleetus pass correlated public feed metadata, OpenAPI paths, docs, endpoint tables and source URL IDs with the jayzee pass (see [tree-spawn-directory](tree-spawn-directory.md)). The expanded-index scripts do not read this directory; they read the cdn-scan data in the cleetus repository (see [tree-exhaustive](tree-exhaustive.md)). The INDEX.json evidenceExcerpts block holds two notes written for cleetus: a jayzee-side findings note and a feed-projects note, in which all 22 projects of the first feed block report engine 6.0.0.

## Decisions

- The cleetus pass records hashes of each source document instead of copying it, so that a document can be checked against the repository without copying its text. Evidence: the sha256 field of each docs entry in savi-index.json.
- The OpenAPI surface is kept as a flat list of paths, not as schemas, because the pass was asked for counts and hashes only. Evidence: the method sentence in savi-index.json (old name: savi) and the one-path-per-line file.
- The pass is scoped to the local repository. Its scope string says "local evidence only", so no network request is part of the record. Evidence: the scope field of savi-index.json.

## Open gaps

- The endpoint table sample is empty (endpointTableSample has length 0), so the endpoint tables the method names are not in the index. Source: /workspace/index/savi/savi-index.json. (old name: savi)
- The findings text itself is not in this directory. Only its hash and size are kept, so the findings can only be checked against the repository. Source: /workspace/index/savi/savi-index.json (old name: savi) (findings).
- The documentation list points into the cleetus repository (for example spawn-evidence/maps/spawn-root-worlds-map.md (old name: spawn), and the index does not copy those documents. Source: /workspace/index/savi/savi-index.json (old name: savi) (docs).
- The OpenAPI file records paths only. It does not record methods, parameters or response shapes, so the surface cannot be compared with a schema from this directory. Source: /workspace/index/savi/openapi-paths.txt. (old name: savi)

## Sources

- /workspace/index/savi/README.md (old name: savi)
- /workspace/index/savi/openapi-paths.txt (old name: savi)
- /workspace/index/savi/savi-index.json (old name: savi)
- /workspace/index/INDEX.json
- /workspace/index/provenance.sha256.txt
- /workspace/savi (old name: savi), read-only; the docs listed in savi-index.json (old name: savi) under spawn-engine (old name: spawn)/, spawn-evidence (old name: spawn)/ and docs/ (old name: savi; old name: spawn for the spawn-engine and spawn-evidence paths)
