# Open gaps in the top-level index, its directories and the browser state

## How it works

This page gathers every gap recorded in the other pages of this wiki, and the gaps found while checking them, for the top-level files of /workspace/index, the directories borick/, discovery/, exhaustive/, extra/, savi/ (old name: savi, now cleetus) and spawn/ (old name: spawn, now jayzee), and the hidden .claude/ and .playwriter/ directories of /workspace/spawn (old name: spawn). Each gap gives its source path. Gaps about the maps/, runs/ and sources/ trees are out of scope and are not listed.

Checks run while preparing this page, all read-only: check-complete-index.mjs passed; check-world-glb-completeness.mjs passed; sha256sum over the four provenance manifests reported OK for every listed file.

## Decisions

- A gap is recorded only when a file or a computed value shows it. Where a summary and a detailed file disagree, both are cited.
- Counts are reported as they appear, and the number that the data supports is given beside them, so a reader can see which is which.
- Gaps caused by missing inputs (the temporary /tmp/spawn-probe (old name: spawn) directory and the cleetus repository) are listed separately from gaps in the index's own outputs.

## Open gaps

Scope and location

- The top-level files named in the brief are in /workspace/index, not in /workspace/spawn (old name: spawn). /workspace/spawn (old name: spawn) holds only maps/, runs/, sources/, .claude/ and .playwriter/. Source: /workspace/spawn (old name: spawn).
- /workspace/spawn/.claude (old name: spawn) is empty (0 files). Source: /workspace/spawn/.claude (old name: spawn).
- /workspace/spawn/.playwriter/browser.pid (old name: spawn) still holds 1801772, but gate.log records that browser stopped at 2026-11-07T19:06:12Z, so the pid file is stale. The port and debug-port files are also left over from the gate. Sources: /workspace/spawn/.playwriter/browser.pid (old name: spawn), /workspace/spawn/.playwriter/gate.log (old name: spawn).
- The browser profile (10,781 files under /workspace/spawn/.playwriter/browser-profile (old name: spawn) was not inspected. It is profile state.

Index outputs and counts

- README.md and INDEX.json give 2,417 GLB rows and 400 worlds with GLB references. The source map has 2,416 data rows and the expanded index counts 399 worlds, so the first figures appear to count the header line. Sources: /workspace/index/README.md, /workspace/index/INDEX.json, /workspace/index/exhaustive/source-glb-urls-all.tsv. The same figures appear in /workspace/index/spawn/README.md (old name: spawn) and /workspace/index/spawn/spawn-index.json (old name: spawn).
- The README.md section "Complete world and direct CDN GLB index" describes the 2,848-world baseline as the content of COMPLETE_INDEX.json, which now holds 21,716 worlds and 5,783 links. Source: /workspace/index/README.md.
- The project-page pass reports 6,604 URLs attempted, but only 1,004 were requested; the other 5,600 were skipped by the wall budget and counted anyway. This figure is repeated in COMPLETE_INDEX.json, COMPLETE_INDEX.md, DISCOVERY.md and README.md. Sources: /workspace/index/discovery/project-page-evidence.json, /workspace/index/COMPLETE_INDEX.json, /workspace/index/discovery/DISCOVERY.md.
- 3,421 direct links have no HTTP status or content type because they were derived from text and never fetched, and six have status 0. Source: /workspace/index/COMPLETE_INDEX.json (links).
- Only 748 of 21,716 worlds have GLB rows. The rest have no GLB evidence, and the index does not say which of them were fully probed. Source: /workspace/index/COMPLETE_INDEX.json (worlds).
- EXTRA_WORLD_INDEX.json, EXTRA_WORLD_INDEX.md, INDEX.json and README.md have no generator in /workspace/index. Sources: /workspace/index/EXTRA_WORLD_INDEX.json, /workspace/index/INDEX.json, /workspace/index/README.md.
- Running build-complete-index.mjs or build-expanded-index.mjs after build-full-surface-index.mjs overwrites COMPLETE_INDEX.json and its companions with an older, smaller version, and no note says so. Sources: /workspace/index/build-complete-index.mjs, /workspace/index/build-expanded-index.mjs.
- build-complete-index.mjs writes direct URLs on the play.jayzee.co host, while the current builders write play.spawn.co. The borick README uses play.jayzee.co too, and the two forms are not reconciled. Sources: /workspace/index/build-complete-index.mjs, /workspace/index/borick/README.md.
- The bucket rule for world.assets/<xx>/ is undetermined: the sha-only and world-identity hypotheses were falsified or at chance. Sources: /workspace/index/README.md (Limits), /workspace/index/INDEX.json (limitations).
- The 2,580-manifest corpus, 11,987 decoded keys and 307 text-visible keys are separate denominators, and the 307 cannot be reproduced from the original 1,173-file input. Sources: /workspace/index/INDEX.json (evidenceExcerpts.spawnLearningRecord), /workspace/index/spawn/spawn-index.json (old name: spawn).
- Other projects' private asset lists are not reachable through the GET endpoints the index holds. Source: /workspace/index/INDEX.json (limitations).

Discovery

- The feed's last non-empty offsets differ between the compact file (3,936 for each sort) and the full file (hot 3,984, top 4,032, recent 4,032). The README.md says 3,936 for all sorts. Whether the feed holds more than 4,800 rows per sort is not known. Sources: /workspace/index/discovery/feed-evidence.json, /workspace/index/discovery/full-feed-evidence.json, /workspace/index/README.md.
- Project-page extraction returned zero app IDs, zero dev session IDs and zero direct GLB links, although the pages hold UUIDs. Source: /workspace/index/discovery/project-page-evidence.json (counts).
- DISCOVERY.json records 8,820 world-store blockers, while its counts give 8,817 unreachable worlds. Source: /workspace/index/discovery/DISCOVERY.json.
- The merged world-store file still holds the first pass's 5,152 blockers after the retry resolved them. Source: /workspace/index/discovery/world-store-evidence.json.
- Fourteen worlds ended in network errors after retries, three returned a head with no manifest hash, and one returned an unreachable manifest. These are unresolved. Source: /workspace/index/discovery/retry-outcomes.json.
- The first world-store pass did not finish, and its unscanned worlds were covered only by the retry pass. Source: /workspace/index/discovery/DISCOVERY.md.
- discover-spawn-worlds.mjs (old name: spawn) hard-codes the play-host feed result (status 404) instead of measuring it. Source: /workspace/index/discover-spawn-worlds.mjs (old name: spawn).
- build-full-surface-index.mjs loads retry-outcomes.json and does not use it. Source: /workspace/index/build-full-surface-index.mjs.
- The runs' logs, exit codes and pids are not hashed in any manifest. Source: /workspace/index/discovery/project-pages-run.log, /workspace/index/discovery/retry-run.log.

Exhaustive and CDN

- cdn-manifest.json holds 35 entries, while README.md, cdn-index.json and worlds-and-glbs.json describe 78 CDN rows. Sources: /workspace/index/exhaustive/cdn-manifest.json, /workspace/index/exhaustive/README.md.
- Three exhaustive manifest entries (cdn/boss.glb, cdn/fountain.glb and cdn/lantern.glb) carry externalTimeoutEvidence in place of redirectStatus, and the cause is not recorded. Source: /workspace/index/exhaustive/cdn-manifest.json.
- The classes field of exhaustive/cdn-manifest.json is null, while extra/cdn-manifest-all.json records 60 generated-stable-after-fetch, 10 real-bytes and 8 generated-on-demand-no-stable-bytes. Sources: /workspace/index/exhaustive/cdn-manifest.json, /workspace/index/extra/cdn-manifest-all.json.
- The eight generated-on-demand assets have no stable bytes, so their hashes cannot be reproduced from the index. Source: /workspace/index/extra/cdn-manifest-all.json.
- verify-v3-technique.mjs and verify-all-manifests-technique.mjs read /tmp/spawn-probe (old name: spawn), which is not preserved, so they cannot be re-run. Sources: /workspace/index/exhaustive/verify-v3-technique.mjs, /workspace/index/exhaustive/verify-all-manifests-technique.mjs.
- The manifest check's result (2,579 of 2,580 reached manifests have matching frame hashes) is recorded only in an INDEX.json excerpt, not in a file in exhaustive/. Source: /workspace/index/INDEX.json (evidenceExcerpts.spawnLearningRecord and saviFindings).
- The cdn-scan JSONL files (16 files, about 3.6 MB) are not covered by any provenance manifest. Source: /workspace/index/exhaustive/cdn-scan.
- The one-shot patch files (.patch-*.cjs) and the discovery run files are not covered by the top-level provenance manifest. Source: /workspace/index/provenance.sha256.txt.
- The cdn-scan data and the feed-projects list live outside the index, in the cleetus repository at /workspace/savi (old name: savi), under its spawn-evidence and spawn-engine directories (old name: spawn), and the index keeps no copy of them. Sources: /workspace/savi/spawn-evidence/data (old name: savi; old name: spawn), /workspace/savi/spawn-engine/data/feed-projects.json (old name: savi; old name: spawn).
- The full manifest run over 2,580 manifests is recorded in data/manifests-all-results.jsonl under the cleetus repository, which the index does not copy. Source: /workspace/savi/spawn-evidence/data (old name: savi; old name: spawn).

Extra and documentation

- The pull index holds 70 results against 68 expected sections. The two extra names are "guide" and "skills", and "skills" returned a 404. Source: /workspace/index/extra/docs-pull-index.json.
- docs/skills.md contains the 404 error body, so the skills list is only in docs/skills.json. Source: /workspace/index/extra/docs/skills.md.
- guide.md has no headings, so its sections cannot be addressed by name. Source: /workspace/index/extra/docs/guide.md.
- docs-pull-index.json and docs-sections.json at the top of extra/ duplicate docs/pull-index.json and docs/sections.json byte for byte. Sources: /workspace/index/extra/docs-pull-index.json, /workspace/index/extra/docs/pull-index.json.
- The cdn-manifest-all.json and the exhaustive manifest cover different sets of CDN names (78 against 35). Source: /workspace/index/extra/cdn-manifest-all.json.

Cleetus directory (old name: savi)

- The endpoint table sample is empty, so the endpoint tables named in the method are not in the index. Source: /workspace/index/savi/savi-index.json. (old name: savi)
- The findings text is kept only as a hash and size. Source: /workspace/index/savi/savi-index.json (old name: savi) (findings).
- The OpenAPI file lists paths only, without methods, parameters or response shapes. Source: /workspace/index/savi/openapi-paths.txt. (old name: savi)
- The resolve-adventure endpoint has an open question: a 410 (gone) response was not reached in 30 probes. Source: /workspace/index/INDEX.json (evidenceExcerpts.saviFindings).
- The name encoder's ':' to '~3a' mapping is witnessed only in one findings file, and the '~' to '~7e' mapping has no witness. Source: /workspace/index/INDEX.json (evidenceExcerpts.saviFindings).
- The live page probe covered one page for 25 s, so the spawnfile and bigspawn host findings rest on one page. Source: /workspace/index/INDEX.json (evidenceExcerpts.saviFindings).

Jayzee directory (old name: spawn)

- Root-world descriptions were captured only for the first 20 worlds, and the rest have no description field. Sources: /workspace/index/spawn/root-worlds.json (old name: spawn), /workspace/index/INDEX.json (evidenceExcerpts.spawnRootMap).
- Root counts drift between reads (one world showed 4 plays earlier and 6 later), and only one root snapshot (2026-11-07) is kept. Sources: /workspace/index/spawn/root-worlds.json (old name: spawn), /workspace/index/INDEX.json.
- The learning record and the maps it describes are in the excluded maps/ tree, not in the jayzee directory. Source: /workspace/spawn/maps (old name: spawn).

Borick

- Four of the five borick projects have no GLB evidence, and the cause is not recorded. Source: /workspace/index/borick/borick-projects.json.
- The borick project list is a snapshot from 2026-11-11T16:10:19Z. Source: /workspace/index/borick/borick-projects.json.

## Sources

- /workspace/index/README.md
- /workspace/index/INDEX.json
- /workspace/index/COMPLETE_INDEX.json
- /workspace/index/COMPLETE_INDEX.md
- /workspace/index/EXTRA_WORLD_INDEX.json
- /workspace/index/build-complete-index.mjs
- /workspace/index/build-expanded-index.mjs
- /workspace/index/build-full-surface-index.mjs
- /workspace/index/discover-spawn-worlds.mjs (old name: spawn)
- /workspace/index/provenance.sha256.txt
- /workspace/index/discovery/DISCOVERY.json
- /workspace/index/discovery/DISCOVERY.md
- /workspace/index/discovery/feed-evidence.json
- /workspace/index/discovery/full-feed-evidence.json
- /workspace/index/discovery/project-page-evidence.json
- /workspace/index/discovery/world-store-evidence.json
- /workspace/index/discovery/retry-outcomes.json
- /workspace/index/discovery/project-pages-run.log
- /workspace/index/discovery/retry-run.log
- /workspace/index/exhaustive/README.md
- /workspace/index/exhaustive/cdn-manifest.json
- /workspace/index/exhaustive/cdn-scan
- /workspace/index/exhaustive/source-glb-urls-all.tsv
- /workspace/index/exhaustive/verify-v3-technique.mjs
- /workspace/index/exhaustive/verify-all-manifests-technique.mjs
- /workspace/index/extra/cdn-manifest-all.json
- /workspace/index/extra/docs-pull-index.json
- /workspace/index/extra/docs/pull-index.json
- /workspace/index/extra/docs/skills.md
- /workspace/index/extra/docs/skills.json
- /workspace/index/extra/docs/guide.md
- /workspace/index/savi/openapi-paths.txt (old name: savi)
- /workspace/index/savi/savi-index.json (old name: savi)
- /workspace/index/spawn/README.md (old name: spawn)
- /workspace/index/spawn/root-worlds.json (old name: spawn)
- /workspace/index/spawn/spawn-index.json (old name: spawn)
- /workspace/index/borick/README.md
- /workspace/index/borick/borick-projects.json
- /workspace/spawn/.claude (old name: spawn)
- /workspace/spawn/.playwriter/browser.pid (old name: spawn)
- /workspace/spawn/.playwriter/gate.log (old name: spawn)
- /workspace/spawn/.playwriter/browser-profile (old name: spawn)
- /workspace/spawn/maps (old name: spawn)
- /workspace/savi/spawn-evidence/data (old name: savi; old name: spawn)
- /workspace/savi/spawn-engine/data/feed-projects.json (old name: savi; old name: spawn)
