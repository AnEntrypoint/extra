# Build, check and discovery scripts, and the patch files

## How it works

/workspace/index holds nine Node ES-module scripts (.mjs) at top level, eight of them active tools and one of them a validator, plus nine one-shot patch scripts (.patch-*.cjs). The three .mjs scripts in exhaustive/ are described in [exhaustive-index](../exhaustive-index.md). All scripts are run with node and take no arguments. They read saved evidence from disk, and the discovery scripts also call the public jayzee HTTP endpoints. They write only under /workspace/index. Their inputs in the cleetus repository (old name: savi) are read-only peer sources, and the index does not copy them.

The dependency chain, from the scripts' own inputs and outputs:

1. discover-spawn-worlds.mjs (old name: spawn) reads the public feed on www.spawn.co, and the baseline list of worlds and links, then writes discovery/feed-evidence.json, discovery/world-store-evidence.json and discovery/DISCOVERY.json.
2. scan-discovery-worlds.mjs reads discovery/feed-evidence.json and writes a compacted feed-evidence.json, the world-store evidence, DISCOVERY.json and DISCOVERY.md, under a 900,000 ms wall budget.
3. reenumerate-full-feed.mjs reads the live feed with full row metadata and writes discovery/full-feed-evidence.json.
4. probe-project-pages.mjs reads discovery/full-feed-evidence.json and a local feed list, and writes discovery/project-page-evidence.json.
5. retry-all-remaining-worlds.mjs reads the feed and world-store evidence and writes discovery/retry-outcomes.json, then overwrites discovery/world-store-evidence.json with the merged result.
6. build-complete-index.mjs (earliest, BASELINE only), then build-expanded-index.mjs (BASELINE plus DISCOVERY), then build-full-surface-index.mjs (latest, adds the full feed and project pages) each write the exhaustive aggregates, COMPLETE_INDEX.json, COMPLETE_INDEX.md and ALL_WORLD_GLB_LINKS.tsv. Only the last one is correct for the current data.
7. check-complete-index.mjs validates everything offline and prints one PASS line.

Each script, with its inputs, outputs, run command and decisions:

**build-complete-index.mjs** (BASELINE builder). Reads the cdn-scan JSONL files under /workspace/savi/spawn-evidence/data (old name: savi, and old name: spawn), and /workspace/index/exhaustive/source-glb-urls-all.tsv. Writes exhaustive/direct-cdn-glb-links.json and .tsv, rewrites exhaustive/worlds-and-glbs.json, writes COMPLETE_INDEX.json (schema index.complete-world-glb-links.v1), COMPLETE_INDEX.md and ALL_WORLD_GLB_LINKS.tsv. Run: `node /workspace/index/build-complete-index.mjs`. Prints a PASS line with worlds, directGlbUrls and tsvRows. Decisions: a GLB is a cdn entry with ext "glb" whose sha is 64 hex characters (anything else throws); the direct URL is built on the play.jayzee.co host with the legacy play.spawn.co host kept beside it, which is the reverse of the later builders. Superseded: running it after the expanded builders overwrites them with the 2,848-world content.

**build-expanded-index.mjs** (BASELINE plus DISCOVERY). Reads the same cdn-scan and TSV inputs, plus discovery/feed-evidence.json, discovery/world-store-evidence.json, discovery/DISCOVERY.json and exhaustive/worlds-and-glbs.json. Writes the same outputs as above, with an origin column added to ALL_WORLD_GLB_LINKS.tsv (schema versions bumped to v2 and v3). Run: `node /workspace/index/build-expanded-index.mjs`. Decisions: each world carries an origin (BASELINE, DISCOVERY, or BASELINE+DISCOVERY); direct URLs use the play.spawn.co host; discovery links are added from the world-store evidence's links array. Superseded by the full-surface builder because it has no project-page or published-feed metadata.

**build-full-surface-index.mjs** (current builder). Reads the cdn-scan and TSV inputs, plus discovery/full-feed-evidence.json, discovery/world-store-evidence.json, discovery/DISCOVERY.json, discovery/project-page-evidence.json, and discovery/retry-outcomes.json (the last is loaded into a variable the rest of the script does not use). Writes exhaustive/direct-cdn-glb-links.json (schema v3), exhaustive/direct-cdn-glb-links.tsv, exhaustive/worlds-and-glbs.json (v4), COMPLETE_INDEX.json (index.complete-world-glb-links.v3), COMPLETE_INDEX.md and ALL_WORLD_GLB_LINKS.tsv. Run: `node /workspace/index/build-full-surface-index.mjs`. Decisions: published feed metadata (owner, name, address, engine, plays, likes) is attached to each world; the feed's sort and offset values are kept as source tags with the prefixes feed-sort, feed-offset and feed-url; project-page GLB-capable hashes are kept only when the extension is glb, gltf or yaml; git URLs are listed once in extractedUrlInventory and are not fanned out to every world (this was the outcome of patches build3 and build4); the discovery summary is compacted into counts, blocker totals and a blockerBreakdown object. Its last run is the one the checker confirms.

**check-complete-index.mjs** (validator). Reads the cdn-scan inputs, the feed, full-feed, world-store, project-page and retry evidence, COMPLETE_INDEX.json, exhaustive/direct-cdn-glb-links.json, exhaustive/worlds-and-glbs.json, ALL_WORLD_GLB_LINKS.tsv, exhaustive/direct-cdn-glb-links.tsv, and the four provenance files (top level, exhaustive, borick, extra). Writes nothing. Run: `node /workspace/index/check-complete-index.mjs`. Last result on this tree: `check:complete-index PASS` with scanFiles 16, scanRows 2,848, uniqueManifestHashes 2,580, uniqueWorldUuids 21,716, directGlbUrls 5,783, newWorlds 18,868, newGlbLinks 3,421, fullFeedProjects 3,951, projectPageUrlsAttempted 6,604, projectPageHttp200 959, projectPageUnreachable 5,645, tsvRows 27,499, exit 0. Checks: the full feed has 288 pages, 11,853 rows, 3,951 projects and 1,262 owners; the project-page counts match; the retry attempted 9,224 with zero not attempted; every world and URL from the derivation is present in each surface and in both TSV files; each listed provenance hash matches its file; no binary extension exists under /workspace/index. Decision: validation is offline and re-derives sets from saved evidence, so no network is needed.

**discover-spawn-worlds.mjs (old name: spawn)** (old name: spawn; first discovery pass). Reads the public feed on https://www.spawn.co/api/feed for sorts hot, top and recent (limit 48, offsets up to 4800, 2 retries, 10 s timeout), the cdn-scan JSONL under /workspace/savi/spawn-evidence/data (old name: savi, and old name: spawn), and exhaustive/direct-cdn-glb-links.json. Calls the world-store on play.spawn.co: head.json, the manifest, and each value. Writes discovery/feed-evidence.json, discovery/world-store-evidence.json and discovery/DISCOVERY.json. Run: `node /workspace/index/discover-spawn-worlds.mjs (old name: spawn)` (old name: spawn). Decisions: pages stop after two empty pages in a row or after 101 pages per sort; value bodies are read only to extract references (the regular expressions for the ~2fcdn~2fvalue and cdn/value patterns) and are not retained; the requested play-host feed URL is recorded with status 404 as a constant, not a measurement. Superseded by the later passes for the feed (www host only).

**scan-discovery-worlds.mjs** (world-store scan). Reads discovery/feed-evidence.json, the cdn-scan JSONL and the baseline aggregate. Writes discovery/world-store-evidence.json, rewrites discovery/feed-evidence.json without its game rows (keeping gameRows as a count), and writes discovery/DISCOVERY.json and discovery/DISCOVERY.md. Run: `node /workspace/index/scan-discovery-worlds.mjs`. Configuration: timeout 5 s, one retry, concurrency 24, wall budget 900,000 ms. Decisions: candidates are feed world IDs that are not in the baseline; a world whose scan starts after the budget is recorded as not_scanned_due_to_wall_budget (5,151 such blockers in this tree); the per-world result keeps HTTP evidence and derived GLB links only.

**reenumerate-full-feed.mjs** (full feed). No local input. Calls https://www.spawn.co/api/feed for the three sorts, 48 rows per page, offsets 0 to 4800, 12 pages in parallel, two empty pages end a sort, 101 pages maximum per sort. Writes discovery/full-feed-evidence.json. Run: `node /workspace/index/reenumerate-full-feed.mjs`. Decisions: the raw row is kept beside the normalised project (owner, name, address, engine, plays, likes); projects are unique on app_id plus world_id; each project records every sort and offset it appeared in. Result on this tree: 288 pages, 11,853 rows, 3,951 projects, 1,262 owners.

**probe-project-pages.mjs** (project pages). Reads discovery/full-feed-evidence.json and the local feed list at /workspace/savi/spawn-engine/data/feed-projects.json (old name: savi, and old name: spawn). Requests https://www.spawn.co/@owner/slug and the same with @dev appended, for up to three slug candidates per project. Writes discovery/project-page-evidence.json. Run: `node /workspace/index/probe-project-pages.mjs`. Decisions: slug candidates come from the address or name, normalised; extraction records UUIDs, dev session IDs, git URLs, CDN URLs, spawnfile.io URLs, GLB-capable hashes and direct GLB links; the wall budget is 1,500,000 ms. Limitation, recorded in the output: the URL counter is incremented before the budget check, so 5,600 URLs that were never requested are still counted in urlsAttempted (6,604). Only 1,004 were requested.

**retry-all-remaining-worlds.mjs** (retry). Reads discovery/feed-evidence.json, discovery/world-store-evidence.json and discovery/DISCOVERY.json. Writes discovery/retry-outcomes.json and overwrites discovery/world-store-evidence.json with a merged v2 record. Run: `node /workspace/index/retry-all-remaining-worlds.mjs`. Configuration: timeout 8 s, two retries, concurrency 32, wall budget 1,800,000 ms. Decisions: the candidate set is the union of worlds not attempted because of the budget and worlds that were unreachable before (head status not 200, or a wall_budget, head_unreachable or head_manifest_missing error); the retry result replaces the earlier per-world result, and earlier successes outside the set are kept (343 preserved). Result: 9,224 attempted (5,151 unscanned plus 4,073 previously unreachable); 407 newly reachable scanned worlds; 8,799 head_not_found_json; 14 network errors; 3 head_manifest_missing; 1 manifest_unreachable; no rate limits; zero not attempted.

**Patch files.** Each .cjs file reads one script, replaces fixed strings and writes it back. None is imported by a script. For the patches whose target strings were checked by grep (discover-spawn-worlds.mjs (old name: spawn), build-full-surface-index.mjs, retry-all-remaining-worlds.mjs, check-complete-index.mjs), the removed strings are absent and the added strings are present, so the patches have been applied. Re-running them is not needed.

- .patch-discovery.cjs: removes the line containing the text "short page" from discover-spawn-worlds.mjs (old name: spawn). Throws if the line is absent.
- .patch-retry.cjs: builds the retry candidate union, removes the progress output, adds unscannedRetried and priorUnreachableRetried to the counts.
- .patch-checkers.cjs: adds retry, merged reachable and per-world coverage assertions to check-complete-index.mjs and exhaustive/check-world-glb-completeness.mjs, and adds retry-outcomes.json and retry-all-remaining-worlds.mjs to the provenance list checks.
- .patch-top-checker.cjs and .patch-top-checker2.cjs: fix how a SHA-256 is extracted from a direct link in check-complete-index.mjs. The second version replaces the helper line by line.
- .patch-full-surface-build.cjs: replaces the full-feed and project-page summaries in build-full-surface-index.mjs with a compact form and prefixes source tags.
- .patch-full-surface-build2.cjs: adds the compact discovery block, blocker totals and blockerBreakdown.
- .patch-full-surface-build3.cjs: removes the global git URL fan-out and adds extractedUrlInventory.
- .patch-full-surface-build4.cjs: repeats the build3 change by line filtering, because the first attempt's string did not match.

## Decisions

- Each stage writes its own evidence file so that later stages can re-derive the output without the network (check-complete-index.mjs, exhaustive/check-world-glb-completeness.mjs). Evidence: the checkers read only local files.
- Fetches are bounded by retries, timeouts and wall budgets, and every skipped item is recorded rather than dropped (scan-discovery-worlds.mjs blockers, retry-all-remaining-worlds.mjs categories). Evidence: retry-outcomes.json has zero wallBudgetNotAttempted.
- The latest builder replaces the earlier ones instead of editing them, and the patch files record the edits as separate one-shot changes (.patch-full-surface-build*.cjs). Evidence: the file names and the patch contents.
- Values are read only for reference extraction; no GLB, texture or audio body is kept (every discovery script's policy string says so).

## Open gaps

- The one-shot patches have no record of when they were run; the only evidence is that their effects are present in the current scripts. Source: /workspace/index/.patch-*.cjs.
- discover-spawn-worlds.mjs (old name: spawn) hard-codes the play-host feed result (status 404) rather than measuring it. Source: /workspace/index/discover-spawn-worlds.mjs (old name: spawn).
- probe-project-pages.mjs counts URLs that were skipped by the wall budget as attempted. Source: /workspace/index/probe-project-pages.mjs and /workspace/index/discovery/project-page-evidence.json.
- build-full-surface-index.mjs loads retry-outcomes.json without using it. Source: /workspace/index/build-full-surface-index.mjs.
- Three of the builders (build-complete-index.mjs, build-expanded-index.mjs and the current one) write the same output paths. Only the current one is safe to run; no script or note says so. Source: the three builder files.
- The inputs under /workspace/savi/spawn-evidence/data (old name: savi; old name: spawn) and /workspace/savi/spawn-engine/data (old name: savi, and old name: spawn) are outside /workspace/index, and no copy is kept in the index. Rebuilding requires the cleetus repository to be present. Sources: the constants at the top of each builder.

## Sources

- /workspace/index/build-complete-index.mjs
- /workspace/index/build-expanded-index.mjs
- /workspace/index/build-full-surface-index.mjs
- /workspace/index/check-complete-index.mjs
- /workspace/index/discover-spawn-worlds.mjs (old name: spawn)
- /workspace/index/scan-discovery-worlds.mjs
- /workspace/index/reenumerate-full-feed.mjs
- /workspace/index/probe-project-pages.mjs
- /workspace/index/retry-all-remaining-worlds.mjs
- /workspace/index/.patch-discovery.cjs
- /workspace/index/.patch-retry.cjs
- /workspace/index/.patch-checkers.cjs
- /workspace/index/.patch-top-checker.cjs
- /workspace/index/.patch-top-checker2.cjs
- /workspace/index/.patch-full-surface-build.cjs
- /workspace/index/.patch-full-surface-build2.cjs
- /workspace/index/.patch-full-surface-build3.cjs
- /workspace/index/.patch-full-surface-build4.cjs
- /workspace/index/discovery/feed-evidence.json
- /workspace/index/discovery/full-feed-evidence.json
- /workspace/index/discovery/world-store-evidence.json
- /workspace/index/discovery/project-page-evidence.json
- /workspace/index/discovery/retry-outcomes.json
- /workspace/index/discovery/DISCOVERY.json
- /workspace/index/discovery/DISCOVERY.md
- /workspace/index/exhaustive/direct-cdn-glb-links.json
- /workspace/index/exhaustive/worlds-and-glbs.json
- /workspace/savi/spawn-evidence/data (old name: savi; old name: spawn)
- /workspace/savi/spawn-engine/data/feed-projects.json (old name: savi; old name: spawn)
