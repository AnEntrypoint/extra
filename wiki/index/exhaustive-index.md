# Exhaustive world and GLB index

## How it works

The exhaustive index is the link-only aggregate of every world and direct CDN GLB link the pass could reach. It lives in /workspace/index/exhaustive, and its totals are repeated at the index root in COMPLETE_INDEX.json, COMPLETE_INDEX.md and ALL_WORLD_GLB_LINKS.tsv. Its policy line says "Link-only: no world content or GLB bytes copied into /workspace/index; only references, hashes, HTTP evidence, and paths."

The aggregate is built from three sources, combined as a union:

1. The jayzee cdn-scan technique. Sixteen JSONL files, cdn-scan-0.jsonl to cdn-scan-15.jsonl under /workspace/index/exhaustive/cdn-scan, hold 2848 rows in total. Each row has uuid, world (the id without dashes), manifest (a sha256 of the world manifest), values and refs counts, and a cdn array. Each cdn entry has sha, ext, from, status, type, len and magic. The first row, for world 7451705a-1142-4451-a8e4-d0ac42730131, carries 137 values, 4 refs and GLB entries with status 200 and magic glTF. The source files are read from /workspace/savi/spawn-evidence/data (old name: savi, and the spawn part of the path is an old name too).
2. The legacy glb-urls-all map. The copy is exhaustive/source-glb-urls-all.tsv (2416 rows, with columns world_uuid_nodash, sha256, url, file_map_value, http, content_type, magic, len and how). The legacy map is also summarised as exhaustive/glb-links.tsv (2416 rows, with columns world_uuid_nodash, sha256, cdn_url, bytes and http).
3. The discovery pass, through the expanded and full-surface builders described in discovery.md.

The aggregate writes exhaustive/direct-cdn-glb-links.json (schema spawn.direct-cdn-glb-links.v3, old name in the schema string), exhaustive/direct-cdn-glb-links.tsv (5783 data rows, columns sha256, direct_cdn_url, status, content_type, bytes, magic, world_count, manifest_count, provenance and sources), exhaustive/worlds-and-glbs.json (schema spawn.worlds-and-glbs.v4, with sourceWorlds 2848, directCdnGlbUrls 2362, directCdnGlbLinks 2362, the 495 curated world-page records, the cdnAssets and cdnGlbAssets sections and unattachedGlbRows 2415), and the CDN files described in cdn-inventory.md.

The union figures are reported in exhaustive/README.md and COMPLETE_INDEX.md:

- Scan files 16, scan rows 2848, unique manifest hashes 2580, unique world UUIDs 2848 at the baseline.
- cdn-scan GLB occurrences 2416, legacy glb-urls-all rows 2416.
- Unique direct CDN GLB URLs in the baseline union 2362, of which 2356 returned HTTP 200 and 2355 are magic-verified glTF.
- Links from the cdn-scan 2355, links from glb-urls-all 2355, links from both 2348.
- Worlds with GLBs 399 in the baseline.

After discovery, COMPLETE_INDEX.md gives expanded totals of 21716 unique worlds and 5783 unique direct CDN GLB URLs. New worlds 18868, new GLB links 3421, full-feed projects 3951, published probe HTTP 200 projects 476, dev-only probe HTTP 200 projects 7, project-page URLs attempted 6604 and project-page HTTP 200 959. Extracted from pages: 10912 UUIDs, 399 git URLs, 2174 CDN URLs, 6140 spawnfile.io URLs and 2102 CDN refs or hashes.

The root file COMPLETE_INDEX.json (schema index.complete-world-glb-links.v3, ok true) holds the same figures with a baseline block, a discovery block, an extractedUrlInventory, and worlds and links arrays. ALL_WORLD_GLB_LINKS.tsv has 27499 data rows, one per world (record_type world) and one per direct CDN GLB URL (record_type for the link). Its columns are record_type, key, value, world_uuid_nodash, sha256, glb_rows, world_count, origin and sources.

The borick project set is a per-project application of the same technique. borick/borick-projects.json (schema workspace.borick-project-index/v1) lists five projects: GTA Earth (@borickk/gta-earth), Fruit Jar (@borickk/fruit-jar), Aelorien Elf Village (@borickk/aelorien-elf-village), First Date (@borickk/first-date) and Wisp Village (@borickk/wisp-village). Each has a world id and app id, one scan row, one manifest, and value and ref counts. Only First Date has GLB links, seven in total, each of the form https://play.jayzee.co/cdn/value.<sha256>.glb. The totals are 5 projects, 7 direct GLB links, 7 scan GLB rows and 7 glb-urls-all rows.

/workspace/index/exhaustive holds the GLB-link evidence that feeds the expanded index. It has 29 files (16 of them in cdn-scan/), 48 MB in total. It has three groups.

1. The world and GLB link aggregates: direct-cdn-glb-links.json (19,674,430 bytes), direct-cdn-glb-links.tsv (2,208,571 bytes, 5,783 rows and a header), worlds-and-glbs.json (22,530,460 bytes), glb-links.tsv (508,528 bytes, 2,416 rows and a header) and source-glb-urls-all.tsv (732,263 bytes, 2,416 rows and a header). The first four are rewritten by the builders described in [tree-build-scripts](tree/tree-build-scripts.md). The last, source-glb-urls-all.tsv, is the copied local GLB map (columns world_uuid_nodash, sha256, url, file_map_value, http, content_type, magic, len, how) that the builders read.
2. The CDN evidence: cdn-index.json (4,069 bytes; count 78 and a names array of 78 paths), cdn-manifest.json (116,399 bytes; count 35, ok 35, bad none, and an assets array of 35 entries), and cdn-resolver-state.json (235,425 bytes; 78 keys, one per CDN name). Each CDN entry records the public name, active flag, public URL, the requests made (HEAD and GET, with status, content type, content length and location), the storage object it resolved to, and a validation result. The resolver state shows public paths such as /cdn/banner-clouds-drifting-4-second-loop.aspect-3x1.mp4 redirecting to storage objects under jayzeefile.io with a sha256 in the name.
3. cdn-scan/: 16 JSONL files (cdn-scan-0.jsonl to cdn-scan-15.jsonl, 3.6 MB together, 2,848 rows in total). One row per world: uuid, world (no dashes), manifest (a 64-character hash), values, refs, and a cdn array. Each cdn entry gives the sha, ext, the from hash, HTTP status, content type, length and magic. These are the source of the 2,416 GLB occurrences.

Scripts and text in the directory:

- README.md (2,728 bytes): the generator's summary (generated 2026-11-11T15:42:40Z; 495 worlds, 74 root-linked worlds, 19 feed games, 4 linked worlds, 2,416 GLB map rows, 13 GLB CDN manifest rows, 78 CDN inventory names). It names the files, the commands, and the exhaustive aggregate figures (2,848 world UUIDs, 2,362 direct URLs in the BASELINE union, 2,356 status-200 URLs, 2,355 magic-verified glTF URLs, 399 worlds with GLBs, 2,355 links from the scan, 2,355 from the GLB map, 2,348 from both). Its later sections describe the expanded BASELINE plus DISCOVERY aggregate (21,716 worlds, 5,783 URLs).
- check-world-glb-completeness.mjs (3,102 bytes): a read-only checker. Run `node /workspace/index/exhaustive/check-world-glb-completeness.mjs`. It re-derives every world and direct URL from the cdn-scan rows, the GLB map and the discovery evidence, and compares them with the aggregate, the worlds-and-glbs file and the TSV. Last run on this tree: `check:world-glb-completeness PASS` with scanFiles 16, scanRows 2,848, manifests 2,580, BASELINE_worlds 2,848, BASELINE_directGlbUrls 2,362, fullFeedProjects 3,951, projectPageUrls 6,604, worlds 21,716, directGlbUrls 5,783, cdnScanGlbOccurrences 2,416, legacyGlbRows 2,416, worldsWithGlb 748. Exit status 0.
- verify-v3-technique.mjs (5,832 bytes): verifies manifest structure. It reads the cdn-scan manifests from a temporary directory, fetches each of the 2,580 manifests from play.spawn.co (3 attempts, 30 s timeout, 12 workers), parses the layout (a 4-byte big-endian length, then a sheet object with v 1 and a hashes array, then length-prefixed frames to end of file), checks that frame i has the SHA-256 in hashes[i], and handles gzip-compressed frames. It writes results to a results file in that temporary directory and has a self-test on one saved manifest. Its inputs are in /tmp/spawn-probe (old name: spawn), which is not in the index, so it cannot run from here.
- verify-all-manifests-technique.mjs (2,887 bytes): the wider precursor. It walks the same manifests (from the same temporary directory), checks ordering and membership, and writes a wide-all results file. Same input constraint.

Provenance (exhaustive/provenance.sha256.txt, 12 lines) covers all of the above except the cdn-scan/ subdirectory. See [tree-provenance](tree/tree-provenance.md).

## Decisions

- Union rather than either source alone. The check script re-derives every direct link from all cdn-scan rows and glb-urls-all.tsv, and the union (2362 links) is the aggregate. Evidence: exhaustive/README.md "The aggregate is the union of all direct CDN GLB links from both sources."
- Baseline and discovery kept as two blocks. The BASELINE of 2848 worlds and 2362 links is preserved, and the discovery numbers are added beside it, so the baseline can be checked without discovery.
- Deterministic rebuild with a checker. The builders (build-complete-index.mjs, build-expanded-index.mjs and build-full-surface-index.mjs) regenerate the outputs, and check-complete-index.mjs and exhaustive/check-world-glb-completeness.mjs validate them offline with no network. Evidence: "Run node /workspace/index/build-complete-index.mjs and node /workspace/index/check-complete-index.mjs after source changes. All outputs remain link-only."
- Magic bytes and HTTP status as the check. A link counts as GLB only with magic glTF evidence, and the 2356 status-200 and 2355 magic-verified figures are reported separately.
- Verify scripts from ephemeral runs. exhaustive/verify-all-manifests-technique.mjs and exhaustive/verify-v3-technique.mjs are kept as the technique used on the manifest set. They write to /tmp/spawn-probe (ephemeral), and their durable outputs are copied as the 2580-row result file.

- The aggregate is the union of two sources: the cdn-scan rows (2,416 GLB occurrences) and the GLB map (2,416 rows). They overlap on 2,348 links, so the union is 2,362 BASELINE URLs. Evidence: the counts in README.md and direct-cdn-glb-links.json.
- The direct URL form is /cdn/value.<sha256>.glb under the play host. The sha256 is the content address. Each link records the observed HTTP status and the magic bytes of the response, and 2,355 links carry the glTF magic. Evidence: the status and magic fields of each link, and the counts in README.md.
- CDN names are kept in their public form (with or without the leading slash, as the source lists them) in cdn-index.json and cdn-resolver-state.json. Evidence: the mixed /cdn/ and cdn/ names in the names array.
- The source TSV is copied, not re-fetched. The builders read it as a fixed input. Evidence: the copied file in exhaustive/ and its checksum in the provenance manifest.
- The aggregate keeps the 495 curated world-page records from the earlier worlds-and-glbs.json and adds the full source-world list beside them, so that nothing is replaced. Evidence: the curatedWorldPageRecords count (495) and the sourceWorlds array (21,716).

## Open gaps

- The exhaustive README gives 495 worlds, 74 root-linked, 19 feed games, 4 linked worlds, 2416 GLB map rows, 13 GLB CDN manifest rows, 78 CDN inventory names and 78 CDN manifest rows. The exhaustive/cdn-manifest.json file itself holds 35 assets. The 13 is not reproduced in any file the index keeps.
- The count of worlds with GLBs differs by file: 399 (baseline union), 400 (spawn/spawn-index.json, old name: spawn), and 748 (COMPLETE_INDEX.md, exhaustive/worlds-and-glbs.json and exhaustive/direct-cdn-glb-links.json). The 748 figure is the expanded count, but the baseline 399 and 400 are not reconciled with it.
- The legacy rows report 2416 and the spawn-index.json glbRows reports 2417. The index does not say which row is extra.
- The aggregate's sources block names /workspace/extra/site/worlds.json, /workspace/extra/.local/api/feed.json, /workspace/extra/.local/api/worlds.json, /workspace/spawn/maps/glb-urls-all.tsv, /workspace/extra/.local/cdn/inventory.json and /workspace/extra/.local/cdn/manifest-all.json. Those are outside the index, so the aggregate cannot be rebuilt from the index alone.
- The builders read /workspace/savi/spawn-evidence/data (old name: savi), which is outside the index. The check script needs the same source directory to re-derive the union.
- The verify scripts write to /tmp/spawn-probe, which is ephemeral.
- Direct CDN links are kept with their HTTP and magic evidence from the earlier scans. They were not re-fetched for this wiki.
- The worlds-and-glbs.json policy reads "Link-only aggregate of BASELINE, live full-feed published metadata, world-store probes, and public normal/@dev project pages," but the probes are dated at different times (2026-11-11 and 2026-11-12). The index does not record one capture date for the aggregate.
- The aggregate counts 21716 unique worlds, while the feed compact pass counted 12400 world ids and the full feed 3951 projects. These are separate denominators and are not reconciled.

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
- /workspace/index/exhaustive/worlds-and-glbs.json
- /workspace/index/exhaustive/direct-cdn-glb-links.json
- /workspace/index/exhaustive/direct-cdn-glb-links.tsv
- /workspace/index/exhaustive/glb-links.tsv
- /workspace/index/exhaustive/source-glb-urls-all.tsv
- /workspace/index/exhaustive/cdn-scan/cdn-scan-0.jsonl to /workspace/index/exhaustive/cdn-scan/cdn-scan-15.jsonl
- /workspace/index/exhaustive/check-world-glb-completeness.mjs
- /workspace/index/exhaustive/verify-all-manifests-technique.mjs
- /workspace/index/exhaustive/verify-v3-technique.mjs
- /workspace/index/COMPLETE_INDEX.json
- /workspace/index/COMPLETE_INDEX.md
- /workspace/index/ALL_WORLD_GLB_LINKS.tsv
- /workspace/index/build-complete-index.mjs
- /workspace/index/build-expanded-index.mjs
- /workspace/index/build-full-surface-index.mjs
- /workspace/index/check-complete-index.mjs
- /workspace/index/borick/borick-projects.json
- /workspace/index/borick/README.md
- /workspace/index/spawn/spawn-index.json (old name: spawn)

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
