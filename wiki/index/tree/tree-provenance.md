# provenance.sha256.txt and the other provenance manifests

## How it works

There are four provenance manifests, one per directory that holds generated outputs. Each uses the sha256sum format: one line per file, a 64-character lowercase SHA-256, two spaces, then a path relative to the directory that holds the manifest.

| Manifest | Lines | Covers |
|---|---|---|
| /workspace/index/provenance.sha256.txt | 31 | The top-level README.md, the cleetus pass outputs (openapi-paths.txt and savi-index.json in the savi directory, old name: savi, and its README.md), the jayzee pass outputs (root-worlds.json, spawn-index.json and README.md in the spawn directory, old name: spawn), INDEX.json, EXTRA_WORLD_INDEX.json and .md, COMPLETE_INDEX.json and .md, ALL_WORLD_GLB_LINKS.tsv, the nine top-level .mjs scripts, the seven discovery outputs (DISCOVERY.json and .md, feed-evidence.json, full-feed-evidence.json, project-page-evidence.json, world-store-evidence.json, retry-outcomes.json), and the two borick/ files. |
| /workspace/index/exhaustive/provenance.sha256.txt | 12 | The three exhaustive .mjs scripts, README.md, cdn-index.json, cdn-manifest.json, cdn-resolver-state.json, direct-cdn-glb-links.json and .tsv, glb-links.tsv, source-glb-urls-all.tsv and worlds-and-glbs.json. |
| /workspace/index/borick/provenance.sha256.txt | 2 | README.md and borick-projects.json. |
| /workspace/index/extra/provenance.sha256.txt | 82 | Every file under extra/ except the manifest itself, including all 75 files of extra/docs/ and the root files (cdn-inventory.json, cdn-manifest-all.json, docs-pull-index.json, docs-sections.json, feed.json, linked-worlds.json, worlds.json). |

How to verify. Run sha256sum with the check flag from the directory that holds each manifest, because the paths are relative to it:

    cd /workspace/index && sha256sum -c provenance.sha256.txt
    cd /workspace/index/exhaustive && sha256sum -c provenance.sha256.txt
    cd /workspace/index/borick && sha256sum -c provenance.sha256.txt
    cd /workspace/index/extra && sha256sum -c provenance.sha256.txt

The check-complete-index.mjs script performs the same comparison for the top-level, exhaustive, borick and extra manifests as part of its run, and fails with a "stale provenance" message on any mismatch. It also checks that each of the listed top-level outputs appears in the top-level manifest.

Result on this tree: every line of all four manifests reported OK when run from the directory named above (31, 12, 2 and 82 files respectively, no failures).

## Decisions

- A manifest records the hashes of its outputs at the time it is written, and the checker fails when they drift, so a regenerated output needs a regenerated manifest. Evidence: the stale-provenance check in check-complete-index.mjs.
- The top-level manifest covers the discovery JSON evidence but not the discovery logs, exit codes or pids, which are run artefacts. Evidence: the list of 31 top-level lines, and the discovery listing in [tree-discovery](tree-discovery.md).
- The extra/ and borick/ manifests cover every file except themselves (82 lines for 83 files, and 2 lines for 3 files). The exhaustive/ manifest covers every file except the cdn-scan/ subdirectory. Evidence: the line counts and the listings in the directory pages.
- Hashes are the only integrity record. No signature, timestamp or signing key is recorded.

## Open gaps

- Not covered by any manifest: the nine .patch-*.cjs files at top level, the 16 cdn-scan JSONL files in exhaustive/cdn-scan/ (about 3.6 MB together), the six discovery run files (project-pages-run.log, project-pages-run.exit, project-pages-run.pid, retry-run.log, retry-run.exit, retry-run.pid), and the pids and exit codes. Sources: /workspace/index/exhaustive/cdn-scan, /workspace/index/discovery.
- The manifests do not hash the cdn-scan files they were derived from, which live outside the index under /workspace/savi/spawn-evidence/data (old name: savi, and old name: spawn). The index therefore cannot check its own inputs. Source: /workspace/index/exhaustive/provenance.sha256.txt.
- The manifests themselves are not hashed. Source: /workspace/index/provenance.sha256.txt.
- The top-level manifest lists the discovery world-store evidence, which was rewritten by the retry pass. Its hash is current, but the retry result is not recorded separately from the merged file. Source: /workspace/index/discovery/world-store-evidence.json.

## Sources

- /workspace/index/provenance.sha256.txt
- /workspace/index/exhaustive/provenance.sha256.txt
- /workspace/index/borick/provenance.sha256.txt
- /workspace/index/extra/provenance.sha256.txt
- /workspace/index/check-complete-index.mjs
- /workspace/index/exhaustive/check-world-glb-completeness.mjs
- /workspace/index/discovery/project-pages-run.log
- /workspace/index/discovery/retry-run.log
- /workspace/index/discovery/project-pages-run.exit
- /workspace/index/discovery/retry-run.exit
- /workspace/index/discovery/project-pages-run.pid
- /workspace/index/discovery/retry-run.pid
- /workspace/savi/spawn-evidence/data (old name: savi; old name: spawn)
