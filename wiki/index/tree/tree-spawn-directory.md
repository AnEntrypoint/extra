# The jayzee/ directory (old name: spawn)

## How it works

/workspace/index/spawn (old name: spawn) is the index output of the first agent pass. That pass read the jayzee-side evidence under /workspace/spawn (old name: spawn), meaning the maps/, runs/ and sources/ trees, which are covered elsewhere, and wrote a compact record of what those contain. The directory has three files, 72 KB in total.

Files:

- README.md (301 bytes): the pass summary. Its title in the file uses the pass's old name, "Spawn indexing pass". Scope: local /workspace/spawn (old name: spawn) evidence only. It reports 74 root-linked world rows, 2,417 GLB URL rows, 400 worlds with GLB references, 3 source index rows, a learning-record hash (b1936b51e2a9621082c9f68416f7980336dac1c57eb4507c2403b2533147a1b0) and generation at 2026-11-11T13:53:40.184Z.
- root-worlds.json (21,777 bytes): an array of 74 world rows with n, path, status (all 200), title, genre, published, modified, reviews and update. The rows carry no preview field (the extra index's worlds.json does). The first row is the world at /@deepseacultist/operation-iron-veil. The rows come from the read of the jayzee root page taken on 2026-11-07, and the counts in the reviews text drift between reads.
- spawn-index.json (old name: spawn) (42,331 bytes): the pass record. Keys: agent, generatedAt, scope, rootWorldRows (74), rootWorlds (the same 74 rows), glbRows (2,417), glbWorldCount (400), sourceIndexRows (3), sourceUrls (3), learningRecord (17,813 bytes and its hash), fileHashes (120 entries, each a path under maps/ with its hash), counts (relevantFiles 120), and method (read the root-linked world map, the GLB URL map, the learning record and the source URL index, then derive counts and content hashes locally).

The learning record is not in this directory. Its denominators are reproduced in INDEX.json (evidenceExcerpts.spawnLearningRecord) and they are kept separate, because they count different things:

| Denominator | Value | What it counts |
|---|---|---|
| Text-visible file-map keys | 307 | Distinct world.assets keys in text files of the witness set (38 content-addressed inputs). The original 1,173-file scan is not reproduced. |
| Unique decoded-frame keys | 11,987 | Distinct world.assets keys in the decoded frames of the 2,580 manifests. |
| Maps-only keys | 288 | Distinct keys in the maps tree, excluding the 38 witness inputs. |
| Manifests | 2,580 | World-store manifests reached from the cdn-scan pairs. |
| Worlds with /cdn/ GLB references | 399 | Worlds with at least one /cdn/ GLB reference in maps/glb-urls-all.tsv (2,416 rows). |

The fileHashes block gives the hashes of the 120 files that the pass read under maps/, so that the excluded tree can be checked against this record. The same 74 root rows are copied into the extra index (see [tree-indexes](tree-indexes.md)), while the expanded index counts GLB links on its own denominators.

## Decisions

- Each figure names its denominator and the figures are not merged. The learning record lists the five denominators above, and the README and INDEX.json repeat that instruction. Evidence: the denominators table in the INDEX.json excerpt.
- Root-world rows are kept as read from the browser, including reviews and update text, so the record shows what the page said at the time. The counts can drift between reads, and the drift is recorded rather than reconciled (the excerpt's example is one world that showed 4 plays and later 6). Evidence: the spawnRootMap excerpt in INDEX.json.
- Descriptions were captured only for the first 20 root worlds, and the rest have no description field, which is recorded in the same excerpt. Evidence: the excerpt's note on descriptions.
- Hashes stand in for content where the content is large or excluded. Evidence: the fileHashes block and the learning-record hash.

## Open gaps

- The README and spawn-index.json (old name: spawn) report 2,417 GLB URL rows and 400 worlds with GLB references. The source GLB map has 2,416 data rows and the learning record counts 399 worlds, so the first figures appear to count the header line. Sources: /workspace/index/spawn/README.md (old name: spawn), /workspace/index/spawn/spawn-index.json (old name: spawn), /workspace/index/exhaustive/source-glb-urls-all.tsv.
- Descriptions are missing for root worlds 21 to 74. Source: /workspace/index/spawn/root-worlds.json (old name: spawn) (no description field), and the INDEX.json excerpt.
- The learning record and the maps it describes are in the excluded maps/ tree, not in this directory. The 307-key denominator cannot be reproduced from the original input, which is not preserved. Sources: /workspace/spawn/maps (old name: spawn), /workspace/index/INDEX.json.
- The root-world read of 2026-11-07 is the only root snapshot. Later root counts are not in this directory. Source: /workspace/index/spawn/root-worlds.json. (old name: spawn)
- The run log referenced by the root-world map (a log.jsonl under /workspace/spawn/runs (old name: spawn) is in the excluded runs/ tree. Source: /workspace/index/INDEX.json excerpt.

## Sources

- /workspace/index/spawn/README.md (old name: spawn)
- /workspace/index/spawn/root-worlds.json (old name: spawn)
- /workspace/index/spawn/spawn-index.json (old name: spawn)
- /workspace/index/INDEX.json
- /workspace/index/provenance.sha256.txt
- /workspace/index/exhaustive/source-glb-urls-all.tsv
- /workspace/spawn/maps (old name: spawn), excluded from this wiki, referenced by fileHashes
- /workspace/spawn/runs (old name: spawn), excluded from this wiki, referenced by the root-world map run ID
