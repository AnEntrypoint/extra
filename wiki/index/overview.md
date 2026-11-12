# Overview of the index project

## How it works

The index project lives at /workspace/index. It is a durable, link-only record of how the jayzee agent and the cleetus agent found Jayzee worlds and what is inside them. Its root README.md states the purpose as a durable combined index of how the two agents have been finding worlds and what is inside worlds. Its own rule is that no GLB, image, audio, video or other world content bytes are copied in. Only references, URLs, hashes, HTTP evidence and paths are kept.

The root file INDEX.json (schema workspace.spawn-content-index/v1, old name: spawn) is the machine-readable summary. Its generatedAt is 2026-11-11T13:54:27.702Z. It records the two agent passes, their counts, the method notes, limitations and five evidence excerpts. That generation predates the later discovery pass, so its counts are the pre-discovery numbers.

The index is built by Node scripts in the root and checked by offline validators. The build and check scripts read a peer evidence directory at /workspace/savi/spawn-evidence/data (old name: savi, and the spawn-evidence part of the name is an old name too), and the discovery scripts read public hosts over HTTP. The generators write into /workspace/index/exhaustive and /workspace/index/discovery. The validator check-complete-index.mjs re-derives the union of worlds and links and fails on stale provenance hashes or copied content bytes.

Every file is hashed in a provenance manifest. Four manifests exist: the root provenance.sha256.txt (31 entries), extra/provenance.sha256.txt (82 entries), exhaustive/provenance.sha256.txt (12 entries) and borick/provenance.sha256.txt (2 entries). All of them verify with sha256sum -c. See provenance.md.

The directory layout, with every subdirectory and what it holds:

- Root files: README.md (the content index, with generation stamp and sections), INDEX.json (the combined summary), provenance.sha256.txt, COMPLETE_INDEX.json and COMPLETE_INDEX.md (the complete world and direct CDN GLB index, 21716 unique world UUIDs and 5783 direct CDN GLB URLs), ALL_WORLD_GLB_LINKS.tsv (27499 data rows, one per world and one per direct CDN GLB URL), EXTRA_WORLD_INDEX.json and EXTRA_WORLD_INDEX.md (counts for the extra/ world lists: 74 root-linked rows, 19 feed games, 4 linked worlds, 71 documentation pages).
- spawn/ (old name: spawn): spawn-index.json (the jayzee pass output, with the root-linked world rows, GLB counts and file hashes), root-worlds.json (the 74 root-linked world rows), README.md. The on-disk path is spawn/ and its name is an old name. The project is jayzee.
- savi/ (old name: savi): savi-index.json (the cleetus pass output, with 17 docs listed by path, byte size and sha256, and 62 OpenAPI paths), openapi-paths.txt (the same 62 paths, one per line), README.md. The project is cleetus.
- extra/: the world lists and feeds and the documentation copy. worlds.json (74 root-linked rows with a preview path), feed.json (19 feed games), linked-worlds.json (4 linked worlds), cdn-inventory.json (78 CDN names with their source files), cdn-manifest-all.json (78 CDN manifest rows with classes), docs/ (71 markdown files plus JSON wrappers, see extra-docs.md), docs-pull-index.json, docs-sections.json, provenance.sha256.txt. Inside docs/ there are also sections.json, pull-index.json, skills.json, skills.md, opening.json and guide.md.
- discovery/: the live discovery evidence. DISCOVERY.json and DISCOVERY.md (the report), feed-evidence.json (compact feed pass), full-feed-evidence.json (full re-enumeration), project-page-evidence.json (normal and @dev project pages), world-store-evidence.json (world-store probes), retry-outcomes.json (per-world retry outcomes for 9224 worlds), and the run files project-pages-run.log, project-pages-run.exit, project-pages-run.pid, retry-run.log, retry-run.exit and retry-run.pid.
- exhaustive/: the exhaustive link-only aggregate. worlds-and-glbs.json, direct-cdn-glb-links.json and .tsv, glb-links.tsv, source-glb-urls-all.tsv, cdn-index.json, cdn-manifest.json, cdn-resolver-state.json, the cdn-scan/ directory with 16 JSONL files (cdn-scan-0.jsonl to cdn-scan-15.jsonl, 2848 rows in total), the checker check-world-glb-completeness.mjs, the technique scripts verify-all-manifests-technique.mjs and verify-v3-technique.mjs, README.md and provenance.sha256.txt.
- borick/: the project index for the five Borick projects. borick-projects.json (5 projects, 7 direct GLB links), README.md and provenance.sha256.txt.
- Root scripts: build-complete-index.mjs, build-expanded-index.mjs, build-full-surface-index.mjs, check-complete-index.mjs, discover-spawn-worlds.mjs (old name in the file name: spawn), scan-discovery-worlds.mjs, retry-all-remaining-worlds.mjs, reenumerate-full-feed.mjs and probe-project-pages.mjs. Nine hidden patch scripts, .patch-checkers.cjs, .patch-discovery.cjs, .patch-full-surface-build.cjs, .patch-full-surface-build2.cjs, .patch-full-surface-build3.cjs, .patch-full-surface-build4.cjs, .patch-retry.cjs, .patch-top-checker.cjs and .patch-top-checker2.cjs, each rewrote one of the scripts in place.

The wiki pages are: [jayzee index](spawn-index.md) (the jayzee pass), [cleetus index](savi-index.md) (the cleetus pass), [extra world lists and feeds](extra-worlds.md), [extra docs](extra-docs.md), [CDN inventory and manifests](cdn-inventory.md), [discovery evidence](discovery.md), [exhaustive world and GLB index](exhaustive-index.md), [provenance manifests](provenance.md) and [open gaps](open-gaps.md). This page is the entry point.

## Decisions

- Link-only storage. The README and the complete index say that no GLB or content bytes are copied into /workspace/index. The GLB and direct CDN links are kept as strings with hashes and HTTP evidence. Evidence: the README line "Link-only: no GLB or other content bytes are copied into /workspace/index."
- Denominators are kept separate and never merged. The README says the root-linked world map and the feed are separate denominators, and that the 2580 manifests, 11987 decoded keys and 307 text-visible keys must not be merged. Evidence: README "Limits / open questions" and INDEX.json method notes.
- Two agent passes, scoped as bounded passes. INDEX.json records the jayzee pass as "bounded local pass complete" and the cleetus pass the same way. Counts are reported as reached, not as universal totals.
- Discovery extended the baseline. The README section "Expanded BASELINE + DISCOVERY index" keeps the captured 2848 worlds and 2362 direct GLB URLs as BASELINE and adds the discovery pass on top. Expanded totals are 21716 unique UUIDs and 5783 direct CDN GLB URLs.
- Host correction. The feed works on https://www.spawn.co/api/feed and returns HTTP 404 on https://play.spawn.co/api/feed. The README records this correction.
- Naming. The directories, script names and some field names keep their old names on disk (old name: spawn, old name: savi). Prose and titles use jayzee and cleetus. Extra copies under extra/ were rewritten with the new names, which leaves a mismatch with the source copies (see extra-worlds.md).

## Open gaps

- The README "Files" list and the INDEX.json outputs list do not name the extra/, discovery/, exhaustive/ or borick/ directories or the root scripts. They are documented here only.
- INDEX.json and spawn/spawn-index.json predate the discovery pass, so their counts (for example 2417 GLB rows and 400 worlds with GLB refs) do not match the later exhaustive counts. See open-gaps.md.
- The scripts read /workspace/savi/spawn-evidence/data, which is outside /workspace/index, so the index does not rebuild on its own.
- Several evidence sources were written to ephemeral /tmp/spawn-probe paths.

## Sources

- /workspace/index/README.md
- /workspace/index/INDEX.json
- /workspace/index/provenance.sha256.txt
- /workspace/index/COMPLETE_INDEX.json
- /workspace/index/COMPLETE_INDEX.md
- /workspace/index/ALL_WORLD_GLB_LINKS.tsv
- /workspace/index/EXTRA_WORLD_INDEX.json
- /workspace/index/EXTRA_WORLD_INDEX.md
- /workspace/index/spawn/README.md (old name: spawn)
- /workspace/index/spawn/spawn-index.json (old name: spawn)
- /workspace/index/spawn/root-worlds.json (old name: spawn)
- /workspace/index/savi/README.md (old name: savi)
- /workspace/index/savi/savi-index.json (old name: savi)
- /workspace/index/savi/openapi-paths.txt (old name: savi)
- /workspace/index/extra/ (all files, see extra-worlds.md, extra-docs.md and cdn-inventory.md)
- /workspace/index/discovery/DISCOVERY.md
- /workspace/index/discovery/DISCOVERY.json
- /workspace/index/exhaustive/README.md
- /workspace/index/borick/README.md
- /workspace/index/build-complete-index.mjs
- /workspace/index/build-expanded-index.mjs
- /workspace/index/build-full-surface-index.mjs
- /workspace/index/check-complete-index.mjs
- /workspace/index/discover-spawn-worlds.mjs (old name: spawn)
- /workspace/index/scan-discovery-worlds.mjs
- /workspace/index/retry-all-remaining-worlds.mjs
- /workspace/index/reenumerate-full-feed.mjs
- /workspace/index/probe-project-pages.mjs
- /workspace/index/.patch-checkers.cjs
- /workspace/index/.patch-discovery.cjs
- /workspace/index/.patch-full-surface-build.cjs
- /workspace/index/.patch-full-surface-build2.cjs
- /workspace/index/.patch-full-surface-build3.cjs
- /workspace/index/.patch-full-surface-build4.cjs
- /workspace/index/.patch-retry.cjs
- /workspace/index/.patch-top-checker.cjs
- /workspace/index/.patch-top-checker2.cjs
