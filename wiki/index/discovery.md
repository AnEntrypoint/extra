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

/workspace/index/discovery holds the live-enumeration evidence that widens the baseline of 2,848 worlds and 2,362 direct GLB URLs. It has 13 files, 109 MB in total. Four are large JSON evidence files (the two largest are full-feed-evidence.json and world-store-evidence.json), two are reports, and seven are run artefacts (logs, exit codes and pids). Every file is link-only: the evidence keeps URLs, HTTP status, content type, byte length, SHA-256 of the response, and derived references, and never the response bodies of GLB or texture files.

Files and what each holds:

| File | Size | Contents |
|---|---|---|
| DISCOVERY.json | 1,129,335 B | Report object (schema string index.discovery.report.v2). Keys: baseline, feed, worldStore, retry, projectPages, published, dev, unreachable, newWorlds (18,868 entries), newGlbLinks (3,421 entries), blockers, policy. |
| DISCOVERY.md | 945 B | Plain-text summary of the same numbers, with pointers to the JSON. |
| feed-evidence.json | 2,456,394 B | Compact feed record from the first feed pass: 255 pages (sorts hot, top and recent, limit 48, offsets 0 to 4,800), 12,400 world IDs, 11,655 game rows counted but not kept, requestedPlayFeedHttp 404, and three blocker entries recording an empty-page boundary per sort. Last non-empty offset 3,936 for each sort. |
| full-feed-evidence.json | 38,333,163 B | Full live feed: 288 pages (all HTTP 200), 11,853 rows kept in full, 3,951 distinct projects (unique on app ID and world ID), 1,262 owners, and per-sort last non-empty offsets hot 3,984, top 4,032 and recent 4,032. Three blockers, each "two empty pages in a row" for one sort. |
| project-page-evidence.json | 11,174,003 B | Normal and @dev project pages: counts (projects 7,372 including the local list, urlsAttempted 6,604, outcomes 1,004, http200 959, published 200 476, dev 200 483, dev-only reachable 7, unreachableUrls 5,645), outcome list (1,004 rows), blockers (5,645 rows), and extracted items (10,912 UUIDs, 399 git URLs, 2,174 CDN URLs, 6,140 spawnfile.io URLs, 2,102 GLB-capable references, 0 direct GLB links, 0 app IDs, 0 dev session IDs). |
| world-store-evidence.json | 36,918,770 B | Per-world world-store results for 9,567 candidate worlds: head.json status, manifest status, value requests (52,488 with 52,478 HTTP 200), CDN references (3,434), 3,421 derived GLB links, and a blockers list of 5,152 entries (one wall_budget_reached and 5,151 not_scanned_due_to_wall_budget). After the retry pass the file is the merged result. Head status counts in the merged file: 754 with HTTP 200, 8,799 with 404, 14 with status 0. |
| retry-outcomes.json | 24,190,105 B | Outcome for each of the 9,224 retried worlds, with categories (reachable_scanned 407, head_not_found_json 8,799, network_error 14, head_manifest_missing 3, manifest_unreachable 1), 343 earlier successes preserved, 1,487 earlier links preserved, and 3,421 combined derived links. |
| project-pages-run.log | 432 B | One line: "project-pages PASS" with the counts object (for example urlsAttempted 6,604, outcomes 1,004, elapsedMs 1,501,118). |
| project-pages-run.exit | 2 B | Exit code 0. |
| project-pages-run.pid | 8 B | Process ID of the run (2592096). |
| retry-run.log | 303 B | One line: "retry-all PASS" with attempted 9,224, the category counts, combined derived links 3,421 and wallBudgetNotAttempted 0. |
| retry-run.exit | 2 B | Exit code 0. |
| retry-run.pid | 8 B | Process ID of the run (2532466). |

Pass timing, from the JSON startedAt fields: the first world-store pass started 2026-11-11T22:26:45Z and ran for about 1,401,998 ms; the retry pass started 2026-11-12T05:30:14Z and ran for about 1,401,760 ms; the project-page pass started 2026-11-12T06:31:55Z and ran for about 1,501,118 ms.

Derived totals: 750 reachable worlds is the count of world-store heads that returned HTTP 200 with no error (343 earlier plus 407 newly reached). The raw head count of 200 is 754, because four worlds returned HTTP 200 for the head file but failed at the manifest step (3 head_manifest_missing and 1 manifest_unreachable). Each unreachable world is recorded with its category. The 8,817 unreachable worlds are 8,799 with a head of 404, 14 network errors, and 4 whose head returned 200 but had no usable manifest (3 without a manifest hash, 1 with an unreachable manifest).

## Decisions

- Public, unauthenticated reads only. The DISCOVERY policy says "no secrets, no authenticated URLs." Private pages are not fetched.
- Wall budgets set per step. The world-store first pass has a wall budget of 900000 ms, the retry 1800000 ms and the project-page pass 1500000 ms, so that a run ends with a recorded outcome for every candidate it reached. The retry records wallBudgetNotAttempted 0, which the README reads as "all remaining worlds attempted."
- Retry of the unscanned and unreachable. The first world-store pass left 5151 worlds unscanned at the budget, and the retry covered those plus the 4073 previously unreachable. The README states "every remaining world was retried."
- Feed host recorded as a correction. The README says "Public feed host correction: https://www.spawn.co/api/feed works; https://play.spawn.co/api/feed returns HTTP 404," and the feed evidence confirms it.
- Separate denominators. The compact feed (12400 world ids), the full feed (3951 projects), the world-store candidates (9567) and the project-page URLs (6604) are reported separately, as the README requires.
- Derived links only. Direct GLB URLs are derived from manifests and CDN refs (3421 new). The index does not fetch GLB bytes.

- The enumeration uses the public feed on the www host, because the play host returned 404 for /api/feed (feed-evidence.json, field requestedPlayFeedHttp). Evidence: the field value 404 and the body "Not Found" recorded in the same file.
- Every candidate world is retried, not only the ones that failed: the retry script covers both the 5,151 worlds the first pass did not reach because of its wall budget and the 4,073 that were unreachable before (retry-outcomes.json counts). Evidence: counts.attempted 9,224, wallBudgetNotAttempted 0.
- Retries are bounded (2 retries, 8 s timeout in the retry pass) and the wall budget is recorded rather than hidden (the first pass wrote a wall_budget_reached blocker). Evidence: the config fields in each JSON.
- Project pages are requested twice per slug, once normal and once with @dev, because some projects publish only the dev page (7 dev-only reachable projects). Evidence: the outcome counts in project-page-evidence.json.
- Feed rows are kept in full only in the full-feed file. The first pass's policy string says "compact evidence only", and the compact feed file keeps world IDs and counts (gameRows) without the games key. Evidence: the policy text and the gameRows count in feed-evidence.json.

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

- The project-page pass says urlsAttempted 6,604, but only 1,004 URLs were requested. The other 5,600 entries are reason wall_budget_not_attempted in the blockers list, so the summary overstates coverage. Sources: /workspace/index/discovery/project-page-evidence.json, /workspace/index/discovery/project-pages-run.log.
- Project-page extraction returned zero app IDs, zero dev session IDs and zero direct GLB links, although the pages contain UUIDs. The extraction for those fields is not yielding data, and nothing in the directory explains why. Source: /workspace/index/discovery/project-page-evidence.json (counts.uniqueAppIds, counts.uniqueDevSessionIds, counts.uniqueDirectGlbUrls).
- The last non-empty feed offsets differ between the compact and full files (3,936 for every sort in the compact file, against 3,984, 4,032 and 4,032 in the full file). Both are bounded by the 4,800 offset ceiling. Whether the feed holds more than 4,800 rows per sort cannot be determined from the evidence. Sources: /workspace/index/discovery/feed-evidence.json, /workspace/index/discovery/full-feed-evidence.json.
- DISCOVERY.json records 8,820 world-store blockers, while its own counts give 8,817 unreachable worlds. The three-world difference is not explained. Source: /workspace/index/discovery/DISCOVERY.json.
- The merged world-store file still holds the first pass's 5,152 blockers after the retry resolved them. Source: /workspace/index/discovery/world-store-evidence.json.
- Fourteen worlds ended in network errors (status 0) after two retries and remain unresolved. Source: /workspace/index/discovery/retry-outcomes.json (category network_error).
- Three worlds returned a head file with no manifest hash, and one returned an unreachable manifest. These are recorded but not investigated. Source: /workspace/index/discovery/retry-outcomes.json.
- The first world-store pass did not finish on its own; its unscanned worlds were only covered by the retry pass. Source: /workspace/index/discovery/DISCOVERY.md.

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
