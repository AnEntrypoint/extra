# The exhaustive/ directory

## How it works

/workspace/index/exhaustive holds the GLB-link evidence that feeds the expanded index. It has 29 files (16 of them in cdn-scan/), 48 MB in total. It has three groups.

1. The world and GLB link aggregates: direct-cdn-glb-links.json (19,674,430 bytes), direct-cdn-glb-links.tsv (2,208,571 bytes, 5,783 rows and a header), worlds-and-glbs.json (22,530,460 bytes), glb-links.tsv (508,528 bytes, 2,416 rows and a header) and source-glb-urls-all.tsv (732,263 bytes, 2,416 rows and a header). The first four are rewritten by the builders described in [tree-build-scripts](tree-build-scripts.md). The last, source-glb-urls-all.tsv, is the copied local GLB map (columns world_uuid_nodash, sha256, url, file_map_value, http, content_type, magic, len, how) that the builders read.
2. The CDN evidence: cdn-index.json (4,069 bytes; count 78 and a names array of 78 paths), cdn-manifest.json (116,399 bytes; count 35, ok 35, bad none, and an assets array of 35 entries), and cdn-resolver-state.json (235,425 bytes; 78 keys, one per CDN name). Each CDN entry records the public name, active flag, public URL, the requests made (HEAD and GET, with status, content type, content length and location), the storage object it resolved to, and a validation result. The resolver state shows public paths such as /cdn/banner-clouds-drifting-4-second-loop.aspect-3x1.mp4 redirecting to storage objects under jayzeefile.io with a sha256 in the name.
3. cdn-scan/: 16 JSONL files (cdn-scan-0.jsonl to cdn-scan-15.jsonl, 3.6 MB together, 2,848 rows in total). One row per world: uuid, world (no dashes), manifest (a 64-character hash), values, refs, and a cdn array. Each cdn entry gives the sha, ext, the from hash, HTTP status, content type, length and magic. These are the source of the 2,416 GLB occurrences.

Scripts and text in the directory:

- README.md (2,728 bytes): the generator's summary (generated 2026-11-11T15:42:40Z; 495 worlds, 74 root-linked worlds, 19 feed games, 4 linked worlds, 2,416 GLB map rows, 13 GLB CDN manifest rows, 78 CDN inventory names). It names the files, the commands, and the exhaustive aggregate figures (2,848 world UUIDs, 2,362 direct URLs in the BASELINE union, 2,356 status-200 URLs, 2,355 magic-verified glTF URLs, 399 worlds with GLBs, 2,355 links from the scan, 2,355 from the GLB map, 2,348 from both). Its later sections describe the expanded BASELINE plus DISCOVERY aggregate (21,716 worlds, 5,783 URLs).
- check-world-glb-completeness.mjs (3,102 bytes): a read-only checker. Run `node /workspace/index/exhaustive/check-world-glb-completeness.mjs`. It re-derives every world and direct URL from the cdn-scan rows, the GLB map and the discovery evidence, and compares them with the aggregate, the worlds-and-glbs file and the TSV. Last run on this tree: `check:world-glb-completeness PASS` with scanFiles 16, scanRows 2,848, manifests 2,580, BASELINE_worlds 2,848, BASELINE_directGlbUrls 2,362, fullFeedProjects 3,951, projectPageUrls 6,604, worlds 21,716, directGlbUrls 5,783, cdnScanGlbOccurrences 2,416, legacyGlbRows 2,416, worldsWithGlb 748. Exit status 0.
- verify-v3-technique.mjs (5,832 bytes): verifies manifest structure. It reads the cdn-scan manifests from a temporary directory, fetches each of the 2,580 manifests from play.spawn.co (3 attempts, 30 s timeout, 12 workers), parses the layout (a 4-byte big-endian length, then a sheet object with v 1 and a hashes array, then length-prefixed frames to end of file), checks that frame i has the SHA-256 in hashes[i], and handles gzip-compressed frames. It writes results to a results file in that temporary directory and has a self-test on one saved manifest. Its inputs are in /tmp/spawn-probe (old name: spawn), which is not in the index, so it cannot run from here.
- verify-all-manifests-technique.mjs (2,887 bytes): the wider precursor. It walks the same manifests (from the same temporary directory), checks ordering and membership, and writes a wide-all results file. Same input constraint.

Provenance (exhaustive/provenance.sha256.txt, 12 lines) covers all of the above except the cdn-scan/ subdirectory. See [tree-provenance](tree-provenance.md).

## Decisions

- The aggregate is the union of two sources: the cdn-scan rows (2,416 GLB occurrences) and the GLB map (2,416 rows). They overlap on 2,348 links, so the union is 2,362 BASELINE URLs. Evidence: the counts in README.md and direct-cdn-glb-links.json.
- The direct URL form is /cdn/value.<sha256>.glb under the play host. The sha256 is the content address. Each link records the observed HTTP status and the magic bytes of the response, and 2,355 links carry the glTF magic. Evidence: the status and magic fields of each link, and the counts in README.md.
- CDN names are kept in their public form (with or without the leading slash, as the source lists them) in cdn-index.json and cdn-resolver-state.json. Evidence: the mixed /cdn/ and cdn/ names in the names array.
- The source TSV is copied, not re-fetched. The builders read it as a fixed input. Evidence: the copied file in exhaustive/ and its checksum in the provenance manifest.
- The aggregate keeps the 495 curated world-page records from the earlier worlds-and-glbs.json and adds the full source-world list beside them, so that nothing is replaced. Evidence: the curatedWorldPageRecords count (495) and the sourceWorlds array (21,716).

## Open gaps

- cdn-manifest.json holds 35 assets (count 35, ok 35) while README.md, cdn-index.json and worlds-and-glbs.json describe 78 CDN rows. The 78 names in cdn-index.json and cdn-resolver-state.json are therefore not all covered by the manifest entries. Sources: /workspace/index/exhaustive/cdn-manifest.json, /workspace/index/exhaustive/README.md.
- Three manifest entries (cdn/boss.glb, cdn/fountain.glb and cdn/lantern.glb) carry an externalTimeoutEvidence field in place of redirectStatus, which means the redirect check did not complete for them. The reason is not recorded. Source: /workspace/index/exhaustive/cdn-manifest.json.
- The classes field in cdn-manifest.json is null, so the class breakdown is not available from the file. Source: /workspace/index/exhaustive/cdn-manifest.json.
- The two verification scripts depend on a temporary directory (/tmp/spawn-probe (old name: spawn) that is not preserved. They cannot be re-run from the index. Sources: /workspace/index/exhaustive/verify-v3-technique.mjs, /workspace/index/exhaustive/verify-all-manifests-technique.mjs.
- The 2,579-of-2,580 frame-hash result of the manifest check (one manifest does not match its sheet) is recorded only in the jayzee findings excerpt in INDEX.json, not in a file in exhaustive/. Source: /workspace/index/INDEX.json (evidenceExcerpts).
- The cdn-scan rows are not covered by the provenance manifest. Source: /workspace/index/exhaustive/cdn-scan.
- Six direct links have status 0 in the aggregate, and 3,421 have no status, because they were derived from text and never fetched. Source: /workspace/index/exhaustive/direct-cdn-glb-links.json.
- Rebuilding worlds-and-glbs.json and direct-cdn-glb-links.json depends on the order in which the builders are run. Source: /workspace/index/build-full-surface-index.mjs (the current builder) and the earlier builders in /workspace/index.

## Sources

- /workspace/index/exhaustive/README.md
- /workspace/index/exhaustive/cdn-index.json
- /workspace/index/exhaustive/cdn-manifest.json
- /workspace/index/exhaustive/cdn-resolver-state.json
- /workspace/index/exhaustive/cdn-scan (16 files: cdn-scan-0.jsonl to cdn-scan-15.jsonl)
- /workspace/index/exhaustive/direct-cdn-glb-links.json
- /workspace/index/exhaustive/direct-cdn-glb-links.tsv
- /workspace/index/exhaustive/glb-links.tsv
- /workspace/index/exhaustive/source-glb-urls-all.tsv
- /workspace/index/exhaustive/worlds-and-glbs.json
- /workspace/index/exhaustive/check-world-glb-completeness.mjs
- /workspace/index/exhaustive/verify-v3-technique.mjs
- /workspace/index/exhaustive/verify-all-manifests-technique.mjs
- /workspace/index/exhaustive/provenance.sha256.txt
- /workspace/index/INDEX.json
- /tmp/spawn-probe (old name: spawn; temporary inputs, not in the index)
