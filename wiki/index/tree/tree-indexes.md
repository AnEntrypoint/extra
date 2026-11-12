# The index files: COMPLETE_INDEX, EXTRA_WORLD_INDEX and INDEX

## How it works

Three top-level index families sit in /workspace/index. They describe the same underlying evidence at different widths.

COMPLETE_INDEX.json (21,183,063 bytes) is the expanded world and direct CDN GLB index. Its top-level keys, in order, are schema, generatedAt, ok, purpose, policy, counts, sources, baseline, discovery, extractedUrlInventory, worlds and links. Its schema string is index.complete-world-glb-links.v3 and generatedAt is recorded as the literal word "deterministic" because the file is rebuilt from saved evidence. Counts (from the file): scanFiles 16, scanRows 2,848, uniqueManifestHashes 2,580, uniqueWorldUuids 21,716, directGlbUrls 5,783, cdnScanGlbOccurrences 2,416, legacyGlbRows 2,416, worldsWithGlb 748, status200GlbUrls 2,356, glbMagicVerified 2,355, fromCdnScan 2,355, fromGlbUrlsAll 2,355, fromBoth 2,348, newWorlds 18,868, newGlbLinks 3,421, fullFeedProjects 3,951, publishedProbeHttp200Projects 476, devOnlyProbeHttp200Projects 7, projectPageUrlsAttempted 6,604 (see the open gaps: only 1,004 were requested), projectPageHttp200 959, projectPageExtractedUuids 10,912, projectPageGlbCapableRefs 2,102, projectPageDirectGlbUrls 0.

The file's arrays: worlds has 21,716 rows with keys worldUuidNodash, worldUuid, manifest, origin, appIds, owner, name, address, engine, plays, likes, scanRows, cdnRows, glbRows, glbSha256s and sources. links has 5,783 rows with keys sha256, directCdnUrl, legacyDirectCdnUrl, ext, status, contentType, bytes, magic, from, worlds, manifests, sources and provenance. The baseline object keeps the first 2,848 worlds and 2,362 direct URLs. The discovery object keeps feed, published, dev, projectPages and the retry breakdown. Summary of the JSON, produced by a node read of the file: origin tallies over worlds are BASELINE 2,848, DISCOVERY_COMPACT_FEED 5,683, DISCOVERY_PROJECT_PAGE 9,234 and DISCOVERY_PUBLISHED_FEED 3,951 (sum 21,716). Link status values are 200 for 2,356 links, 0 for 6 links and null for 3,421 links that were derived from text and never fetched. Link provenance tags are BASELINE 2,362, cdn-scan 2,355, glb-urls-all 2,355, discovery-world-store 1,487 and RETRY_DISCOVERY_WORLD_STORE 1,940. Every directCdnUrl is on the host play.spawn.co under /cdn/value.<sha256>.glb (17,349 occurrences of the play host prefix in the file; 5,783 distinct links).

COMPLETE_INDEX.md (1,813 bytes) is a Markdown rendering of the same counts, with a policy line and a note that the full detail is in the JSON.

ALL_WORLD_GLB_LINKS.tsv (6,796,908 bytes, 27,500 lines) is a flat list. The header has nine columns: record_type, key, value, world_uuid_nodash, sha256, glb_rows, world_count, origin, sources. Its 21,716 rows with record_type "world" carry the world UUID with no dashes in value and world_uuid_nodash, the glb row count, the origin and the source list. Its 5,783 rows with record_type "glb_link" carry the direct CDN URL in value, the joined world list in world_uuid_nodash, the sha256, the world count, the provenance tags and the sources. The file equals the sum of the two JSON world and link lists (27,499 data rows). The check script compares the two sets for equality.

EXTRA_WORLD_INDEX.json (2,097 bytes) and EXTRA_WORLD_INDEX.md (320 bytes) are a small index of the extra site: 74 root-linked world rows (extra/worlds.json), 19 feed games (extra/feed.json, which has ok true and a games array of 19), 4 linked worlds (extra/linked-worlds.json) and 71 extracted documentation pages (extra/docs). The JSON records generatedAt 2026-11-11T15:40:24.458Z, a sources map pointing at those four paths, and a docTitles array of 68 section titles (the same titles as extra/docs/sections.json), while the docPages count of 71 is the number of files in extra/docs/ that are documentation pages. The method string says the index was made by copying the generated feed, root rows, linked-world metadata, CDN inventory, manifests and extracted docs into the durable index. No script in /workspace/index writes this file.

INDEX.json (11,245 bytes) is the combined index. Its top-level keys are schema, generatedAt (2026-11-11T13:54:27.702Z), ok, purpose, scope, agents, methods, counts, outputs and evidenceExcerpts. The agents block holds two passes. The jayzee pass (old name: spawn) reports rootLinkedWorldRows 74, glbUrlRows 2,417, worldsWithGlbRefs 400, sourceIndexRows 3 and relevantFiles 120. The cleetus pass (old name: savi) reports docsIndexed 17, sourceIndexRows 95, uniqueSourceUrls 64, openapiPaths 62 and localFilesConsidered 112. The evidenceExcerpts block contains literal excerpts of the pass outputs (a root map, a learning record, cleetus findings, a project list), which are the only in-file copies of those narratives. The outputs list names README.md, INDEX.json, spawn/spawn-index.json (old name: spawn), spawn/root-worlds.json (old name: spawn), savi/savi-index.json (old name: savi), savi/openapi-paths.txt (old name: savi) and provenance.sha256.txt.

How each is built: COMPLETE_INDEX.json, COMPLETE_INDEX.md and ALL_WORLD_GLB_LINKS.tsv are written last by build-full-surface-index.mjs (the latest builder, reading the saved discovery evidence and the exhaustive aggregate). The earlier builders build-complete-index.mjs and build-expanded-index.mjs write the same three files and would overwrite the expanded content with an older, smaller version if run after it. The output is checked by check-complete-index.mjs. README.md, INDEX.json, EXTRA_WORLD_INDEX.* and the pass outputs were written by agent passes whose generators are not in /workspace/index.

## Decisions

- The complete index is link-only. Its policy string says no GLB or content bytes are copied, and check-complete-index.mjs fails on any binary extension under /workspace/index. Evidence: the policy text in COMPLETE_INDEX.json and the check script.
- The expanded index keeps the 2,848-world baseline separate from discovery. It records origin per world so the two denominators can be told apart (README.md, "Expanded BASELINE + DISCOVERY index"). Evidence: the baseline object in COMPLETE_INDEX.json.
- Hosts follow the observed reachability. The feed is read from www.spawn.co because play.spawn.co/api/feed returned HTTP 404 (discovery/feed-evidence.json, field requestedPlayFeedHttp). World-store and CDN links use play.spawn.co. Evidence: discovery/feed-evidence.json and the URL constants in the build scripts.
- Counts are reported per denominator and never merged (INDEX.json "limitations", README.md "Limits / open questions").
- The old builder (build-complete-index.mjs) emits direct URLs on a play.jayzee.co host, while the later builders emit play.spawn.co. The current COMPLETE_INDEX.json uses play.spawn.co. Evidence: the constants in build-complete-index.mjs and the host counts above.

## Open gaps

- The README.md counts (2,417 GLB rows and 400 worlds with GLB refs, also in INDEX.json) are one row and one world more than the source map supports (2,416 rows and 399 worlds in exhaustive/source-glb-urls-all.tsv and in COMPLETE_INDEX.json). The source TSV has 2,417 lines including its header, which suggests the header was counted. Sources: /workspace/index/README.md, /workspace/index/INDEX.json, /workspace/index/exhaustive/source-glb-urls-all.tsv.
- The top-level README.md section "Complete world and direct CDN GLB index" still describes the 2,848-world and 2,362-link baseline as the content of COMPLETE_INDEX.json. Source: /workspace/index/README.md.
- No script in /workspace/index generates EXTRA_WORLD_INDEX.json, EXTRA_WORLD_INDEX.md, INDEX.json or README.md. Their method text is the only record of how they were built. Sources: /workspace/index/EXTRA_WORLD_INDEX.json, /workspace/index/INDEX.json.
- 3,421 links have a null status and contentType because they were derived from text references in world-store values and were never fetched. Source: /workspace/index/COMPLETE_INDEX.json (links with status null).
- The COMPLETE_INDEX.json project-page figures count 6,604 attempted URLs. Only 1,004 were requested before the wall budget stopped the pass. Source: /workspace/index/COMPLETE_INDEX.json (counts.projectPageUrlsAttempted) and /workspace/index/discovery/project-page-evidence.json.
- The worlds object in COMPLETE_INDEX.json lists 21,716 worlds, but only 748 have GLB rows. The remaining 20,968 worlds have no GLB evidence. This is a coverage fact, not a defect, but the index does not say which worlds were fully probed. Source: /workspace/index/COMPLETE_INDEX.json.

## Sources

- /workspace/index/COMPLETE_INDEX.json
- /workspace/index/COMPLETE_INDEX.md
- /workspace/index/ALL_WORLD_GLB_LINKS.tsv
- /workspace/index/EXTRA_WORLD_INDEX.json
- /workspace/index/EXTRA_WORLD_INDEX.md
- /workspace/index/INDEX.json
- /workspace/index/README.md
- /workspace/index/build-full-surface-index.mjs
- /workspace/index/build-expanded-index.mjs
- /workspace/index/build-complete-index.mjs
- /workspace/index/check-complete-index.mjs
- /workspace/index/exhaustive/source-glb-urls-all.tsv
- /workspace/index/discovery/feed-evidence.json
- /workspace/index/discovery/project-page-evidence.json
- [tree-build-scripts](tree-build-scripts.md) (wiki page)
