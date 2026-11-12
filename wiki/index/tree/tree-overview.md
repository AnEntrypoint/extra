# Top-level layout of the jayzee tree

## How it works

The top level of /workspace/spawn (old name: spawn) holds five entries: maps/, runs/ and sources/ (covered by other pages), plus .claude/ (empty, 0 files) and .playwriter/ (runtime state of a browser gate, 10,786 files, 643 MB). The files and directories the brief lists as in scope are physically in /workspace/index, which is the durable combined index. Its passes read evidence from /workspace/spawn (old name: spawn) and from the cleetus repository at /workspace/savi (old name: savi), and write only to /workspace/index. Everything described below is therefore under /workspace/index unless marked otherwise.

Top-level files in /workspace/index:

| Entry | Size and count | What it holds |
|---|---|---|
| README.md | 5,424 bytes | Human-readable content index: purpose, agent passes, how worlds are found and how contents are found, content addressing, limits, file list, and the complete-index and expanded-index sections. See [tree-indexes](tree-indexes.md). |
| COMPLETE_INDEX.md | 1,813 bytes | Metric table for the expanded world and GLB index (21,716 worlds, 5,783 direct CDN GLB URLs). |
| COMPLETE_INDEX.json | 21,183,063 bytes | Machine-readable expanded index: top-level keys schema, generatedAt, ok, purpose, policy, counts, sources, baseline, discovery, extractedUrlInventory, worlds (21,716 rows), links (5,783 rows). |
| EXTRA_WORLD_INDEX.md | 320 bytes | Summary of the extra index: 74 root-linked world rows, 19 feed games, 4 linked worlds, 71 extracted documentation pages. |
| EXTRA_WORLD_INDEX.json | 2,097 bytes | Machine-readable form of the same extra index, with a docTitles list and the source paths it was built from. |
| INDEX.json | 11,245 bytes | Combined index of the two earlier agent passes (jayzee pass and cleetus pass), with methods, counts, outputs and evidence excerpts. |
| provenance.sha256.txt | 2,790 bytes, 31 lines | SHA-256 manifest for the top-level files, the agent output directories and the scripts. See [tree-provenance](tree-provenance.md). |
| ALL_WORLD_GLB_LINKS.tsv | 6,796,908 bytes, 27,500 lines (1 header, 27,499 data rows) | Line-oriented list: 21,716 world records followed by 5,783 direct CDN GLB link records. See [tree-indexes](tree-indexes.md). |
| 9 .mjs scripts | about 82 KB together | Build, check, discovery and retry scripts. See [tree-build-scripts](tree-build-scripts.md). |
| 9 .patch-*.cjs files | 9 files, about 12 KB together | One-shot string patches that were applied to scripts in this directory. See [tree-build-scripts](tree-build-scripts.md). |

Directories in /workspace/index in scope:

| Directory | Files | Size | What it holds | Page |
|---|---|---|---|---|
| borick/ | 3 | 24 KB | Five-project index for one creator (borickk), with a README, a JSON record and a provenance file. | [tree-borick](tree-borick.md) |
| discovery/ | 13 | 109 MB | Public feed, world-store, project-page and retry evidence, plus run logs, exit codes and pids. | [tree-discovery](tree-discovery.md) |
| exhaustive/ | 29 (16 of them in cdn-scan/) | 48 MB | Direct CDN GLB aggregate, GLB map, CDN manifests, the cdn-scan JSONL rows, three verification scripts, a README and a provenance file. | [tree-exhaustive](tree-exhaustive.md) |
| extra/ | 83 | 776 KB | Documentation mirror of the jayzee game API (75 files in docs/), CDN inventory and manifest, root-world list, feed, linked worlds. | [tree-extra](tree-extra.md) |
| savi/ (old name: savi, now cleetus) | 3 | 16 KB | Cleetus pass: README, OpenAPI path list and the savi-index JSON. | [tree-savi-directory](tree-savi-directory.md) |
| spawn/ (old name: spawn, now jayzee) | 3 | 72 KB | Jayzee pass: README, root-world list and spawn-index JSON. | [tree-spawn-directory](tree-spawn-directory.md) |

Hidden entries in /workspace/spawn (old name: spawn) in scope: .claude/ (empty) and .playwriter/. The .playwriter/ directory holds port, debug-port and browser.pid files, gate.log (3.4 KB, lifecycle events for an idle-stopping browser gate on port 9562 with debug port 10062), browser.log (58 KB, Chromium stderr), and browser-profile/ (10,781 files of Chromium user data). The browser-profile/ tree is profile state and was not read beyond its listing. Nothing in the index references .playwriter/ content.

## Decisions

- The index is link-only. No GLB, texture or audio bytes are stored. The checker check-complete-index.mjs fails if any file with a .glb, .bin, .png, .jpg, .webp, .mp4, .zip or .gz extension appears under /workspace/index. Evidence: the check script, and the policy string repeated in every aggregate.
- Counts from different denominators are kept apart (README.md): 2,580 manifests, 11,987 decoded manifest keys and 307 text-visible keys are never merged.
- Outputs are written in place to /workspace/index and inputs are read from /workspace/savi/spawn-evidence/data (old name: savi, and old name: spawn for the spawn-evidence part) and from /workspace/index/exhaustive/source-glb-urls-all.tsv. Evidence: the constants at the top of each script.
- The hidden .patch-*.cjs files were used instead of editing scripts by hand. Each one replaces a fixed string; the current scripts already contain the replacements (verified by grep for the removed and added strings).

## Open gaps

- The brief names /workspace/spawn (old name: spawn) as the home of the top-level files. The files are actually in /workspace/index. /workspace/spawn (old name: spawn) holds only maps/, runs/, sources/, .claude/ and .playwriter/. Source: /workspace/spawn (old name: spawn) directory listing.
- The .playwriter/ browser profile (10,781 files) is runtime state and was not inspected. Source: /workspace/spawn/.playwriter (old name: spawn).
- /workspace/index/README.md still has a section titled "Complete world and direct CDN GLB index" that gives the baseline numbers (2,848 worlds and 2,362 links). The current COMPLETE_INDEX.json holds 21,716 worlds and 5,783 links. Source: /workspace/index/README.md.

## Sources

- /workspace/index/README.md
- /workspace/index/COMPLETE_INDEX.md
- /workspace/index/COMPLETE_INDEX.json
- /workspace/index/EXTRA_WORLD_INDEX.md
- /workspace/index/EXTRA_WORLD_INDEX.json
- /workspace/index/INDEX.json
- /workspace/index/provenance.sha256.txt
- /workspace/index/ALL_WORLD_GLB_LINKS.tsv
- /workspace/index/borick
- /workspace/index/discovery
- /workspace/index/exhaustive
- /workspace/index/extra
- /workspace/index/savi (old name: savi)
- /workspace/index/spawn (old name: spawn)
- /workspace/spawn/.claude (old name: spawn)
- /workspace/spawn/.playwriter (old name: spawn)
- /workspace/spawn/.playwriter/gate.log (old name: spawn)
- /workspace/spawn/.playwriter/browser.log (old name: spawn)
- /workspace/spawn/.playwriter/port (old name: spawn)
- /workspace/spawn/.playwriter/debug-port (old name: spawn)
- /workspace/spawn/.playwriter/browser.pid (old name: spawn)
- /workspace/index/check-complete-index.mjs
