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

## Decisions

- Union rather than either source alone. The check script re-derives every direct link from all cdn-scan rows and glb-urls-all.tsv, and the union (2362 links) is the aggregate. Evidence: exhaustive/README.md "The aggregate is the union of all direct CDN GLB links from both sources."
- Baseline and discovery kept as two blocks. The BASELINE of 2848 worlds and 2362 links is preserved, and the discovery numbers are added beside it, so the baseline can be checked without discovery.
- Deterministic rebuild with a checker. The builders (build-complete-index.mjs, build-expanded-index.mjs and build-full-surface-index.mjs) regenerate the outputs, and check-complete-index.mjs and exhaustive/check-world-glb-completeness.mjs validate them offline with no network. Evidence: "Run node /workspace/index/build-complete-index.mjs and node /workspace/index/check-complete-index.mjs after source changes. All outputs remain link-only."
- Magic bytes and HTTP status as the check. A link counts as GLB only with magic glTF evidence, and the 2356 status-200 and 2355 magic-verified figures are reported separately.
- Verify scripts from ephemeral runs. exhaustive/verify-all-manifests-technique.mjs and exhaustive/verify-v3-technique.mjs are kept as the technique used on the manifest set. They write to /tmp/spawn-probe (ephemeral), and their durable outputs are copied as the 2580-row result file.

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
