# Provenance manifests

## How it works

The index records the hash of its files in four manifests. Each manifest is a plain text file with one line per file, in the form "<sha256 hex>  <path>", with two spaces between the hash and the path. The path is relative to the directory that holds the manifest. The manifests are:

- /workspace/index/provenance.sha256.txt, the root manifest, with 31 entries. It covers README.md, the savi/ and spawn/ summaries and their JSON, INDEX.json, EXTRA_WORLD_INDEX.json and .md, COMPLETE_INDEX.json and .md, ALL_WORLD_GLB_LINKS.tsv, the root build, check, discovery and retry scripts, the discovery/ report and evidence JSON files, and borick/README.md and borick/borick-projects.json. Its paths include savi/savi-index.json and spawn/spawn-index.json, whose names keep the old names on disk.
- /workspace/index/extra/provenance.sha256.txt, with 82 entries. It covers the 71 documentation markdown files in extra/docs/, the JSON companions extra/docs/opening.json, sections.json, skills.json and pull-index.json, extra/docs-pull-index.json and extra/docs-sections.json, extra/cdn-inventory.json, extra/cdn-manifest-all.json, extra/feed.json, extra/linked-worlds.json and extra/worlds.json. Duplicate files share a hash: docs-sections.json and docs/sections.json (2ac4d360acdbc0fe0c0c66816ed18b91a4844537726ba79c0f8c0b68551fa2fc) and docs-pull-index.json and docs/pull-index.json (c9a88bd1b81377c1c546942326b852fcb642fe5fb927a036c79d2b46d4f03b1d).
- /workspace/index/exhaustive/provenance.sha256.txt, with 12 entries. It covers the README, the three scripts check-world-glb-completeness.mjs, verify-all-manifests-technique.mjs and verify-v3-technique.mjs, cdn-index.json, cdn-manifest.json, cdn-resolver-state.json, glb-links.tsv, source-glb-urls-all.tsv, direct-cdn-glb-links.json and .tsv, and worlds-and-glbs.json.
- /workspace/index/borick/provenance.sha256.txt, with 2 entries: README.md and borick-projects.json.

To verify, change into the directory that holds the manifest and run sha256sum with the check flag, for example cd /workspace/index && sha256sum -c provenance.sha256.txt. Each path is checked against the file on disk. The same check is run by the validator check-complete-index.mjs, which fails on a stale provenance hash. The verification run for this wiki (read-only, sha256sum -c) reported all 127 entries as OK: 31 in the root manifest, 82 in the extra manifest, 12 in the exhaustive manifest and 2 in the borick manifest.

The manifests hash the index's own copies of files. They do not hash the source trees that the generators read. The source trees are /workspace/spawn (old name: spawn) and /workspace/savi (old name: savi), and the index does not contain them. The spawn-index.json fileHashes map gives 120 hashes of files in the jayzee source tree (maps/, sources/ and maps/witness/), and the savi-index.json docs list gives path, byte count and sha256 for 17 cleetus docs. Those hashes cannot be checked from inside the index.

## Decisions

- A manifest per directory. Each directory with its own files carries its own manifest, so the paths in each manifest are relative to that directory and the check runs from there.
- Hash of the copy, not the source. The manifests cover the index's copies, so the index can prove its own contents without the peer trees.
- Evidence summaries hashed, not copied. The GLB and content bytes are not in the index, so their evidence is kept as hashes and manifests (see the README's "Link-only" line).
- Hashes of ephemeral evidence recorded in the source manifest. The jayzee learning record hash (b1936b51e2a9621082c9f68416f7980336dac1c57eb4507c2403b2533147a1b0) and the cleetus FINDINGS hash (4e64f372d60d8537ed6b91b2068ddaa09118d5eeec19c7956d47a50d9798dc04) are recorded in the pass JSON files and README files (spawn/README.md and savi/README.md, and the learning record hash in spawn/spawn-index.json), so a reader can tell whether a summary matches the evidence it cites.
- The patch scripts were not hashed. The nine .patch-*.cjs files rewrote the build and check scripts in place. The manifests hash the rewritten scripts, so the state before the patch is not recorded.

## Open gaps

- Thirty-five files are not in any manifest: the nine hidden patch scripts (.patch-checkers.cjs, .patch-discovery.cjs, .patch-full-surface-build.cjs, .patch-full-surface-build2.cjs, .patch-full-surface-build3.cjs, .patch-full-surface-build4.cjs, .patch-retry.cjs, .patch-top-checker.cjs and .patch-top-checker2.cjs), the six run files in discovery/ (project-pages-run.log, project-pages-run.exit, project-pages-run.pid, retry-run.log, retry-run.exit and retry-run.pid), the sixteen JSONL files in exhaustive/cdn-scan/ (cdn-scan-0.jsonl to cdn-scan-15.jsonl, 2848 rows in total), and the four manifests themselves.
- The root manifest does not list the exhaustive/ or extra/ directories; they are covered only by their own manifests. Readers who check only the root manifest will miss 94 files.
- The run pid files record process ids (2592096 and 2532466) that do not identify a live process and are not verifiable.
- The hashes for spawn/spawn-index.json and savi/savi-index.json fileHashes and docs cannot be checked inside the index, because their source files are outside it.
- The ephemeral /tmp/spawn-probe paths named in the learning record are not in any manifest and are not reachable after the run.
- The manifests say nothing about when each file was last changed. The index's generation stamps (2026-11-11 and 2026-11-12 runs) are recorded only in the JSON files.

## Sources

- /workspace/index/provenance.sha256.txt
- /workspace/index/extra/provenance.sha256.txt
- /workspace/index/exhaustive/provenance.sha256.txt
- /workspace/index/borick/provenance.sha256.txt
- /workspace/index/check-complete-index.mjs
- /workspace/index/exhaustive/check-world-glb-completeness.mjs
- /workspace/index/spawn/spawn-index.json (old name: spawn, fileHashes and learningRecord)
- /workspace/index/savi/savi-index.json (old name: savi, docs list)
- /workspace/index/INDEX.json (evidenceExcerpts, learning record hash)
- /workspace/index/discovery/project-pages-run.pid
- /workspace/index/discovery/retry-run.pid
- /workspace/index/discovery/project-pages-run.exit
- /workspace/index/discovery/retry-run.exit
- /workspace/index/discovery/project-pages-run.log
- /workspace/index/discovery/retry-run.log
- /workspace/index/.patch-checkers.cjs
- /workspace/index/.patch-discovery.cjs
- /workspace/index/.patch-full-surface-build.cjs
- /workspace/index/.patch-full-surface-build2.cjs
- /workspace/index/.patch-full-surface-build3.cjs
- /workspace/index/.patch-full-surface-build4.cjs
- /workspace/index/.patch-retry.cjs
- /workspace/index/.patch-top-checker.cjs
- /workspace/index/.patch-top-checker2.cjs
- /workspace/index/exhaustive/cdn-scan/cdn-scan-0.jsonl to /workspace/index/exhaustive/cdn-scan/cdn-scan-15.jsonl
