# Discovery evidence

## How it works

The discovery pass re-enumerated the public Jayzee world surface and kept the evidence for each step in the discovery/ directory of the index, /workspace/index/discovery. It ran over the public hosts https://www.spawn.co (the web and feed host, old name in the host string kept verbatim) and https://play.spawn.co (the world-store host). Every request was public and unauthenticated, and the pass kept compact HTTP evidence and derived URLs only. Its policy line in DISCOVERY.json says "Compact HTTP evidence and derived URLs only; no GLB/content bytes copied, no secrets, no authenticated URLs."

The pass has five steps. Each step has a generator script at the index root and an evidence file in discovery/.

1. Compact feed walk. Script discover-spawn-worlds.mjs (old name in the file name: spawn). The feed is read with sorts hot, top and recent, limit 48 per page, offsets up to 4800, two retries and a timeout of 10000 ms. Result file discovery/feed-evidence.json (schema index.discovery.feed.v1): 255 pages, 12400 world ids, and last non-empty offsets hot 3936, top 3936 and recent 3936. The requested play-host feed URL https://play.spawn.co/api/feed?sort=hot&limit=48&offset=0 returned HTTP 404 with body "Not Found", so the feed is read from https://www.spawn.co/api/feed. Blockers are the empty page boundaries at offset 4032 for each sort.
2. Full feed re-enumeration. Script reenumerate-full-feed.mjs. Result file discovery/full-feed-evidence.json (schema index.discovery.full-feed.v1): 288 pages, 11853 rows, 3951 distinct published projects and world ids, 1262 owners, with full row metadata kept. Last non-empty offsets were hot 3984, top 4032 and recent 4032. Three blockers, one per sort, each "two empty pages in a row" at the batch 4032 to 4560. The stop rule is emptyPagesToStop 2 and maxOffset 4800.
3. World-store probes. Scripts scan-discovery-worlds.mjs (first pass, wall budget 900000 ms, timeout 5000 ms, one retry, concurrency 24) and retry-all-remaining-worlds.mjs (retry pass, wall budget 1800000 ms, timeout 8000 ms, two retries, concurrency 32). Evidence files discovery/world-store-evidence.json (schema index.discovery.world-store.v2) and discovery/retry-outcomes.json (schema index.discovery.retry-outcomes.v1). In the first pass 4416 worlds were scanned, 348 were reachable and 5151 were left unscanned when the wall budget was reached. The retry attempted 9224 worlds, with 5151 unscanned and 4073 previously unreachable. Combined, 9567 candidate worlds were scanned, 750 were reachable, 8817 were unreachable and 3421 derived GLB links were new. Outcomes by category: head_not_found_json 8799 (HTTP 404 on head.json), network_error 14 (head status 0), head_manifest_missing 3, reachable_scanned 407 and manifest_unreachable 1. Value requests totalled 52488, of which 52478 returned HTTP 200. No rate limits were recorded.
4. Project pages. Script probe-project-pages.mjs. Result file discovery/project-page-evidence.json (schema index.discovery.project-pages.v1). Normal and @dev project pages were attempted for 6604 URLs, with concurrency 16 and a wall budget of 1500000 ms. 959 returned HTTP 200. 476 published projects were reachable, 7 dev-only projects were reachable, and 5645 URL records were unreachable. Extraction found 10912 UUIDs, 399 git URLs, 2174 CDN URLs, 6140 spawnfile.io URLs and 2102 CDN refs or hashes, and 0 literal direct GLB URLs, 0 app ids and 0 dev session ids.
5. Totals. DISCOVERY.json (schema index.discovery.report.v2) and DISCOVERY.md combine the steps. The baseline is 2848 worlds and 2362 direct GLB URLs. The expanded totals are 21716 unique world UUIDs and 5783 direct CDN GLB URLs. The root README says ALL_WORLD_GLB_LINKS.tsv has 27499 data rows.

The run files discovery/project-pages-run.log, discovery/retry-run.log, discovery/project-pages-run.exit and discovery/retry-run.exit record the two runs. Both logs say PASS. Both exit files hold 0. The pid files hold 2592096 (project pages) and 2532466 (retry).

## Decisions

- Public, unauthenticated reads only. The DISCOVERY policy says "no secrets, no authenticated URLs." Private pages are not fetched.
- Wall budgets set per step. The world-store first pass has a wall budget of 900000 ms, the retry 1800000 ms and the project-page pass 1500000 ms, so that a run ends with a recorded outcome for every candidate it reached. The retry records wallBudgetNotAttempted 0, which the README reads as "all remaining worlds attempted."
- Retry of the unscanned and unreachable. The first world-store pass left 5151 worlds unscanned at the budget, and the retry covered those plus the 4073 previously unreachable. The README states "every remaining world was retried."
- Feed host recorded as a correction. The README says "Public feed host correction: https://www.spawn.co/api/feed works; https://play.spawn.co/api/feed returns HTTP 404," and the feed evidence confirms it.
- Separate denominators. The compact feed (12400 world ids), the full feed (3951 projects), the world-store candidates (9567) and the project-page URLs (6604) are reported separately, as the README requires.
- Derived links only. Direct GLB URLs are derived from manifests and CDN refs (3421 new). The index does not fetch GLB bytes.

## Open gaps

- The compact feed run (255 pages) and the full re-enumeration (288 pages) disagree on page count and last offsets, and both are kept. The index does not say which is the authoritative enumeration.
- Both feed walks stop at an empty batch at offset 4032 and 4560. Whether any project lies beyond the maxOffset of 4800 is not known.
- The world-store totals do not reconcile by a small amount. The first pass had 348 reachable worlds and the retry reported 407 newly reachable, which sums to 755, while the combined total is 750. The retry records 343 prior successes preserved, so five earlier reachable results are not accounted for in the evidence.
- 8817 worlds are unreachable, and 8799 of them answer HTTP 404 on head.json. The index does not say whether these are unpublished, deleted or not yet propagated.
- 14 worlds returned network errors (head status 0). Their outcome is recorded, but no retry result is given.
- project-page-evidence.json holds 1004 outcome rows, while 6604 URLs were attempted and 5645 unreachable are reported. The per-URL rows for the rest are not in the file, so the unreachable total is a summary.
- Project-page extraction found 0 app ids, 0 dev session ids and 0 direct GLB URLs. The index does not explain whether the pages do not carry these or whether the extractor missed them.
- The discovery run was bounded by wall time, so the first pass left worlds unscanned. The retry covered them, but the counts depend on run time.
- The compact feed evidence file is named discovery/feed-evidence.json and the full re-enumeration file discovery/full-feed-evidence.json. Their policies differ (compact evidence against full row metadata), and the index keeps both without a merge.
- DISCOVERY.json lists the feed blockers, but the report does not say what was done with them.

## Sources

- /workspace/index/discovery/DISCOVERY.json
- /workspace/index/discovery/DISCOVERY.md
- /workspace/index/discovery/feed-evidence.json
- /workspace/index/discovery/full-feed-evidence.json
- /workspace/index/discovery/project-page-evidence.json
- /workspace/index/discovery/world-store-evidence.json
- /workspace/index/discovery/retry-outcomes.json
- /workspace/index/discovery/project-pages-run.log
- /workspace/index/discovery/project-pages-run.exit
- /workspace/index/discovery/project-pages-run.pid
- /workspace/index/discovery/retry-run.log
- /workspace/index/discovery/retry-run.exit
- /workspace/index/discovery/retry-run.pid
- /workspace/index/discover-spawn-worlds.mjs (old name: spawn)
- /workspace/index/scan-discovery-worlds.mjs
- /workspace/index/reenumerate-full-feed.mjs
- /workspace/index/probe-project-pages.mjs
- /workspace/index/retry-all-remaining-worlds.mjs
- /workspace/index/README.md
