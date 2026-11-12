# The discovery/ directory

## How it works

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

- The enumeration uses the public feed on the www host, because the play host returned 404 for /api/feed (feed-evidence.json, field requestedPlayFeedHttp). Evidence: the field value 404 and the body "Not Found" recorded in the same file.
- Every candidate world is retried, not only the ones that failed: the retry script covers both the 5,151 worlds the first pass did not reach because of its wall budget and the 4,073 that were unreachable before (retry-outcomes.json counts). Evidence: counts.attempted 9,224, wallBudgetNotAttempted 0.
- Retries are bounded (2 retries, 8 s timeout in the retry pass) and the wall budget is recorded rather than hidden (the first pass wrote a wall_budget_reached blocker). Evidence: the config fields in each JSON.
- Project pages are requested twice per slug, once normal and once with @dev, because some projects publish only the dev page (7 dev-only reachable projects). Evidence: the outcome counts in project-page-evidence.json.
- Feed rows are kept in full only in the full-feed file. The first pass's policy string says "compact evidence only", and the compact feed file keeps world IDs and counts (gameRows) without the games key. Evidence: the policy text and the gameRows count in feed-evidence.json.

## Open gaps

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
