# Runs timeline

## How it works

Every run directory under /workspace/spawn/runs (old name: spawn) is listed below in creation order. The date and time are createdAt from task.json, in UTC. The outcome is taken from the run's own files: for a run with an end event it is the finished witness in that event (log.jsonl), and for a run without one it is the last event in log.jsonl. Outcomes are one line each, and every figure in them comes from the run's log. Full witnesses and gaps are in [runs-open-gaps.md](runs-open-gaps.md), and decisions are grouped by theme in [runs-findings.md](runs-findings.md).

The table holds 138 rows: 118 runs that finished with a witness and 20 runs with no end event. Three folders with no date prefix (2703944-18033865, 2749708-18562434 and 65786-694246) are placed by their createdAt time.

| Run | Date | Time (UTC) | Outcome |
|---|---|---|---|
| 2703944-18033865 | 2026-11-04 | 16:21:01 | Logged in to the game-6 world as claude_haiku_55 linked to lanmower, documented the agent interface, and pushed nothing. |
| 2026-11-04-16-36-00-a12151 | 2026-11-04 | 16:36:00 | Wrote the game-6 reference files (CHANGELOG, LESSONS, agent-interface, COVERAGE, guide copy) under .spawn/reference, untracked and uncommitted. |
| 2026-11-04-17-24-41-1039b7 | 2026-11-04 | 17:24:41 | Verified the reference files on disk and sent five gm friction items to the gm session; the world name and commit were left to the owner. |
| 2026-11-04-17-25-58-a95c9b | 2026-11-04 | 17:25:58 | Confirmed game-6 is clean at b405304, the world is the-savi-gallery, and re-fetched the Tome; the gm session had not replied. |
| 2026-11-04-17-45-09-c952ce | 2026-11-04 | 17:45:09 | Applied the LESSONS and CHANGELOG replacements; gm items 2 to 4 were fixed upstream and item 1 (slash-command argument truncation) stayed open as a host bug. |
| 2749708-18562434 | 2026-11-04 | 17:49:06 | Fast-forwarded game-6 from b405304 to 89c518f and the engine clone to fa39cd6; updated CHANGELOG and committed nothing. |
| 2026-11-04-18-21-48-2f6104 | 2026-11-04 | 18:21:48 | Fast-forwarded game-6 to a18be87 and the engine to 141b4bf; the engine pin sha in agent-interface.md is stale. |
| 65786-694246 | 2026-11-04 | 20:37:35 | Fast-forwarded game-6 to 0698ecd and the engine to 05a6272 (pin sha changed); committed nothing. |
| 2026-11-04-20-43-01-2d070a | 2026-11-04 | 20:43:01 | Documented the engine reference (ENGINE.md, api-a, api-b, skills, world-usage) and a heading coverage check: 68 source headings, none missing. |
| 2026-11-04-23-15-52-66680b | 2026-11-04 | 23:15:52 | Searched the installed client and its cached bundles for hook internals and wrote the engine reference; no kernel source was found locally. |
| 2026-11-05-00-32-20-fbba08 | 2026-11-05 | 00:32:20 | Read-only live probe of the world (1502 entities, gravity -24), joined and left cleanly; an SQL statement was refused and a terrain fault was recorded. |
| 2026-11-05-05-16-22-51f490 | 2026-11-05 | 05:16:22 | Live spawn and destroy probe succeeded (object found, then gone, destroyedCount 1); two earlier attempts failed on wrong spec keys. |
| 2026-11-05-05-25-32-076881 | 2026-11-05 | 05:25:32 | Rewrote 11 cleetus files from the old reference path to the new one and added a live-facts section to ENGINE.md; nothing pushed. |
| 2026-11-05-05-28-41-892daf | 2026-11-05 | 05:28:41 | Pushed the terrain pregenerate fix to main (0d7f8bc); the spawn-area hold no longer appeared; the hook-order probe row did not load. |
| 2026-11-05-06-29-58-3c13e6 | 2026-11-05 | 06:29:58 | Pushed plinth, chime and marmot fixes to main (c5b3fc1, 194b4b4); "deviated by a local write" lines fell from present to 0. |
| 2026-11-05-06-58-25-6b9460 | 2026-11-05 | 06:58:25 | No end event; the run stopped during a live check after a next_context action. |
| 2026-11-05-10-26-24-a5f31e | 2026-11-05 | 10:26:24 | No end event; the MCP playwriter server was stopped by gm-new before any work was logged. |
| 2026-11-05-11-06-51-2ebf3f | 2026-11-05 | 11:06:51 | Probes 7 and 8 read-only (76 world assets, terrain height 0, spawn visible then gone); documentation appended and the body left the world. |
| 2026-11-05-11-17-38-203a78 | 2026-11-05 | 11:17:38 | Pushed a probe module and placed row (6b44544); the room did not load it, so both were reverted (f34590c) and the hook order stayed unverified. |
| 2026-11-05-11-24-10-a91327 | 2026-11-05 | 11:24:10 | Health check: remote and local main both at f34590c, clean tree, no live client sessions. |
| 2026-11-05-11-31-49-ace498 | 2026-11-05 | 11:31:49 | Traced the state.sent, shots and last writers to ears.press, postman.js, ping-bell.js, toast.js and in-data-uievent.js; the workshop writer question was closed. |
| 2026-11-05-11-38-30-87b1e7 | 2026-11-05 | 11:38:30 | Third hook-order probe: the row was pushed (c78c66e) but the room still ran world 303 without it, and the probe was reverted. |
| 2026-11-05-11-42-39-43bdec | 2026-11-05 | 11:42:39 | Physics probe with an exec-spawned box that stayed at y=40 (no fall, so no step rate); the next call was refused because the run had ended. |
| 2026-11-05-11-43-22-63a7e3 | 2026-11-05 | 11:43:22 | Pushed a placed dynamic row (6919c01) to test physics; the room still ran world 303, so the row was reverted. |
| 2026-11-05-11-44-21-5d831a | 2026-11-05 | 11:44:21 | Arrival-budget check: scripts/ex/ws is 247 KB in 65 files; no file was moved and the choice was left to the owner. |
| 2026-11-05-11-56-12-f0fdef | 2026-11-05 | 11:56:12 | No-op ctx.commit probe ran with no change (owner approved); moved ws-engine-rows.json to data/ (fcae8cd); the budget warnings stayed at 489 KB and 574 KB. |
| 2026-11-05-11-57-26-592b7f | 2026-11-05 | 11:57:26 | Preview room (no push) recorded the hook order onSpawn, update-first, onCollide; a later call was refused because the run had ended. |
| 2026-11-05-11-59-29-d1448b | 2026-11-05 | 11:59:29 | ctx.commit write probe in a preview room changed one cell object (worldMutated true); the job was stopped and the results were appended to the reference. |
| 2026-11-05-12-00-32-c43ebc | 2026-11-05 | 12:00:32 | Measured the spawn-area cells (main x0z-1 130 KB, workshop x0z-1 185 KB) and decided not to restructure the inline HUD and signage markup this round. |
| 2026-11-05-12-01-10-20b78f | 2026-11-05 | 12:01:10 | Preview room budget probe showed no budget warning; the warning appears only in push verdicts, so it cannot be measured in a preview. |
| 2026-11-05-12-45-09-71f539 | 2026-11-05 | 12:45:09 | State check: game-6 clean at fcae8cd and matching origin; recorded that no restructure is done to pass the advisory. |
| 2026-11-05-13-14-47-f90635 | 2026-11-05 | 13:14:47 | Stripping the ui/vector lines from the workshop cell dropped the workshop to 495 KB (main unchanged at 489 KB); the test push was reverted (cc67d25). |
| 2026-11-05-13-29-54-d28f33 | 2026-11-05 | 13:29:54 | No end event; the uiprev job was killed when the run ended. |
| 2026-11-05-13-30-29-28796a | 2026-11-05 | 13:30:29 | No end event; a job was cancelled and the MCP server was stopped by gm-new. |
| 2026-11-05-14-12-01-e87823 | 2026-11-05 | 14:12:01 | No end event; the tool list changed during the run and the MCP server was stopped by gm-new. |
| 2026-11-05-14-22-29-0298e7 | 2026-11-05 | 14:22:29 | No end event; a run_code action was abandoned because the worker restarted, a recovery was logged, and the MCP server was stopped. |
| 2026-11-05-14-31-36-7e3ce4 | 2026-11-05 | 14:31:36 | No end event; the last logged event is a run_code result and the run has no finish. |
| 2026-11-05-15-24-55-4f2e2c | 2026-11-05 | 15:24:55 | No end event; the MCP playwriter server failed with exit code 137. |
| 2026-11-05-15-25-01-0dcb90 | 2026-11-05 | 15:25:01 | No end event; the MCP server was stopped by gm. |
| 2026-11-05-15-26-41-6747b8 | 2026-11-05 | 15:26:41 | Fast-forwarded the engine docs by 96 commits to fb764b7, recovered a truncated ENGINE.md, and verified the docs; the 77425d2 budget fix had removed the spawn-area signage from the live world. |
| 2026-11-05-15-52-20-948285 | 2026-11-05 | 15:52:20 | Listing check: game-6 clean at 77425d2, no live sessions, no open PRD rows. |
| 2026-11-05-16-05-09-737327 | 2026-11-05 | 16:05:09 | Found the kernel source in the headless room host log (runtime worker SRI-verified, 13,770 lines) and counted hook registrations; the run finished in 3 steps. |
| 2026-11-05-16-46-46-0c62d1 | 2026-11-05 | 16:46:46 | Checked the gm build (dev) and the background reply; a grep alternation pattern crashed the gm worker with code 139 and the run recovered. |
| 2026-11-05-16-59-33-cc6077 | 2026-11-05 | 16:59:33 | Found 7 new engine docs commits upstream, merged them to fb764b7, and noted the partyCancel addition to ActPayloads. |
| 2026-11-05-17-21-50-5c2b99 | 2026-11-05 | 17:21:50 | Runtime worker check confirmed partyCancel in the worker; the engine and game remotes had moved again. |
| 2026-11-05-17-27-00-801a13 | 2026-11-05 | 17:27:00 | Re-read the gm skill to clear a rules notice; verified game-6 at 02ee9f1 and the engine docs at 80552d3. |
| 2026-11-05-17-30-51-952cb6 | 2026-11-05 | 17:30:51 | The local gm binary did not yet contain the grep budget fix (b12685c); a timed root grep took 42 s. |
| 2026-11-05-17-41-04-a8dfe5 | 2026-11-05 | 17:41:04 | Confirmed the gm grep fix: root grep runs in about 300 ms with no crash, and the scan budget stops at about 4,000 files. |
| 2026-11-05-18-19-25-5805da | 2026-11-05 | 18:19:25 | gm final reinstall verified (1592376-dev); run_shell output condensation confirmed on a 400-line command. |
| 2026-11-05-18-53-51-ca16ef | 2026-11-05 | 18:53:51 | Merged new engine docs (819f547, engine 6.0.0, pin a4da5ab0) fast-forward and verified the references. |
| 2026-11-05-18-58-26-42eddb | 2026-11-05 | 18:58:26 | gm CI for 1592376 reported green; merged engine docs 1a19114 and built a reusable pin-doc updater script. |
| 2026-11-05-19-06-05-a8d170 | 2026-11-05 | 19:06:05 | Listing check: engine docs at 1a19114, game-6 clean at 02ee9f1, gm 05a9ccf-96 installed, no open gm rows. |
| 2026-11-05-20-11-30-482eca | 2026-11-05 | 20:11:30 | Restored the signage (4 cells from cc67d25) and published the world (spec_version 508); every world-tree lever to clear the arrival warning failed, so the warning returned. |
| 2026-11-05-21-23-49-f64575 | 2026-11-05 | 21:23:49 | Physics and optimisation research over the runtime worker (983 code calls); wrote the new physics and optimisation sections, and GPU pass attribution stayed unmeasured. |
| 2026-11-05-21-57-09-0bb7d7 | 2026-11-05 | 21:57:09 | Tried to close the GPU telemetry gap: the CPU eye failed (missing Chromium), so the gap was recorded as a documented negative with an override path. |
| 2026-11-05-22-24-01-50a57a | 2026-11-05 | 22:24:01 | Found 18 Mantle WASM builds and 39 mantle_* kernel exports in the engine cache; documented the dispatcher as partly decompiled. |
| 2026-11-05-22-48-51-b8043c | 2026-11-05 | 22:48:51 | Verified the gm child_context fix (child consumed no step, parent task intact); GPU-rendered probe ran but per-pass timings were still warming. |
| 2026-11-05-23-11-17-63af29 | 2026-11-05 | 23:11:17 | Decompiled the dispatcher binding core from the durable worker copy (section 15), closing the last dispatcher gap for build 2792ef38. |
| 2026-11-06-04-25-52-090cfe | 2026-11-06 | 04:25:52 | Committed the AGENTS.md routing note (b5be09a, author lanmower); the netcode, lag compensation and compression inventory found no hits in the engine docs. |
| 2026-11-06-05-07-44-9c31cc | 2026-11-06 | 05:07:44 | No end event; the adversarial verification of 15 parked claims was stopped when the MCP server was stopped by gm. |
| 2026-11-06-09-05-33-107f30 | 2026-11-06 | 09:05:33 | No end event; the MCP server was stopped by gm. |
| 2026-11-06-09-05-56-56196d | 2026-11-06 | 09:05:56 | No end event; the MCP playwriter server exited with code 137. |
| 2026-11-06-09-06-05-564118 | 2026-11-06 | 09:06:05 | Pushed gate commit 7550e7b to origin/main after the app-contract check passed (34 modules, 6 fixtures); a negative test confirmed the gate fails on a bad fixture. |
| 2026-11-06-12-23-54-ade8e7 | 2026-11-06 | 12:23:54 | No end event; the MCP server was stopped by gm. |
| 2026-11-06-12-24-03-0875da | 2026-11-06 | 12:24:03 | No end event; the browser capture of the prop-warehouse requests and a search for WIRE_UNITS_PER_METER were started, and the MCP server was stopped by gm. |
| 2026-11-06-13-38-26-709b2c | 2026-11-06 | 13:38:26 | No end event; the playwriter retry did not run because the MCP server was stopped by gm. |
| 2026-11-06-13-38-49-51c3ae | 2026-11-06 | 13:38:49 | No end event; the MCP server was stopped by gm. |
| 2026-11-06-13-38-57-4afae0 | 2026-11-06 | 13:38:57 | No end event; the playwriter retry after the gm restart did not start because the MCP server was stopped by gm. |
| 2026-11-06-13-42-53-6be8d3 | 2026-11-06 | 13:42:53 | Relaunched the browser gate with PLAYWRITER_NO_SANDBOX=1 and loaded the prop-warehouse page: 3411 requests, 873 unique URLs; no captured URL matched the 2858 listed paths, and no asset was downloaded. |
| 2026-11-06-13-46-36-4bcc47 | 2026-11-06 | 13:46:36 | Read-only analysis of the cdn/resolve call from local files: it returns landed names, not URLs; no request was made, so the resolved count is 0. |
| 2026-11-06-13-56-00-e9d0b4 | 2026-11-06 | 13:56:00 | Stage 1 stopped after one resolve POST with 3 names returned empty addresses; batch cap 512 and cacheVersion v7 were confirmed from the saved modules. |
| 2026-11-06-13-59-17-57fe48 | 2026-11-06 | 13:59:17 | Fetched the boot listing (pathCount 2858 but only 3 entries) and sent one watch POST with 3 keys; the outcome was not recorded and the name form was not confirmed. |
| 2026-11-06-14-05-48-3c5ab3 | 2026-11-06 | 14:05:48 | No end event; the playwriter reset verb was skipped because the server entry denies it. |
| 2026-11-06-18-40-51-44f772 | 2026-11-06 | 18:40:51 | Passive capture of the prop-warehouse world (one start click): 362 v4 client URLs observed, no prop asset URLs, and the 626-URL set was held. |
| 2026-11-06-19-22-08-04ca3f | 2026-11-06 | 19:22:08 | Replayed the observed POST /world-store/values endpoint: 2858 unique paths retrieved (552 landed, 0 mismatches, reachedTarget true). |
| 2026-11-06-19-45-23-393f92 | 2026-11-06 | 19:45:23 | Stage 1 blocked: the key-to-CDN-name decoding rule for the ~2f escapes could not be proven from local evidence, so stages 2 and 3 did not start. |
| 2026-11-06-20-05-59-49f2dd | 2026-11-06 | 20:05:59 | Live playwriter capture proved the name rule for value.* names; the cuimp download attempts timed out (0 files fetched, 3 failed). |
| 2026-11-06-20-34-39-971dba | 2026-11-06 | 20:34:39 | Re-read the gm skill once to clear a rules notice; no further work. |
| 2026-11-06-20-36-06-35b012 | 2026-11-06 | 20:36:06 | The full 2587-name curl replay timed out at 300 s; 138 partial files were verified and final counts were not written. |
| 2026-11-06-20-54-33-b065ca | 2026-11-06 | 20:54:33 | Prepared a read-only verifier script (not run) with no network calls. |
| 2026-11-06-21-19-56-f353d2 | 2026-11-06 | 21:19:56 | Prepared a read-only single-name retry-list script (not run); at that point 900 of 2587 names were processed, 761 downloaded, 1 failed. |
| 2026-11-06-22-38-12-6d4705 | 2026-11-06 | 22:38:12 | Ran the verifier once after the background job: 2581 verified, 6 failed, 0 never landed; a retry list was built. |
| 2026-11-06-22-45-00-ca2f81 | 2026-11-06 | 22:45:00 | Fixed the retry list to all 6 failed names and retried them in one bounded curl pass; all 6 succeeded. |
| 2026-11-06-22-52-01-1b6867 | 2026-11-06 | 22:52:01 | Four-source count check: 2587 derived, fetched and SHA-verified, 0 failed, 271 unmatched keys, no network calls, no edits. |
| 2026-11-06-22-59-28-bd52e9 | 2026-11-06 | 22:59:28 | Final read-only check: 2587 SHA256SUMS lines, 2587 OK, 0 bad; status reported to orchestrate. |
| 2026-11-06-23-03-48-471b96 | 2026-11-06 | 23:03:48 | Repeated the final read-only check: 2587 of 2587 OK. |
| 2026-11-06-23-06-59-ff952b | 2026-11-06 | 23:06:59 | Repeated the final read-only check: 2587 of 2587 OK, no edits. |
| 2026-11-06-23-10-16-8996bc | 2026-11-06 | 23:10:16 | Summary and PROVENANCE counts match: 2587 derived and fetched, 138 reused, 2449 downloaded, 0 failed. |
| 2026-11-06-23-15-47-17c5e8 | 2026-11-06 | 23:15:47 | Confirmed PROVENANCE failed files 0 and SHA256SUMS 2587 lines. |
| 2026-11-06-23-27-00-745d7c | 2026-11-06 | 23:27:00 | Same check: failed 0, 2587 lines; standing by. |
| 2026-11-06-23-36-14-ce2454 | 2026-11-06 | 23:36:14 | Same check: failed 0, 2587 lines; standing by. |
| 2026-11-06-23-40-50-e6074d | 2026-11-06 | 23:40:50 | Same check: failed 0, 2587 lines; standing by. |
| 2026-11-06-23-49-21-2f380c | 2026-11-06 | 23:49:21 | Same check: failed 0, 2587 lines; standing by. |
| 2026-11-06-23-56-01-be0a13 | 2026-11-06 | 23:56:01 | Same check: failed 0, 2587 lines; standing by. |
| 2026-11-07-00-07-19-0e059e | 2026-11-07 | 00:07:19 | Same check: failed 0, 2587 lines; standing by. |
| 2026-11-07-00-16-01-e000c0 | 2026-11-07 | 00:16:01 | Same check: failed 0, 2587 lines; standing by. |
| 2026-11-07-00-51-58-771c84 | 2026-11-07 | 00:51:58 | Same check; ranked remaining work sent to orchestrate. |
| 2026-11-07-00-55-00-f50e78 | 2026-11-07 | 00:55:00 | Same check; status sent; standing by. |
| 2026-11-07-01-04-58-1d48f0 | 2026-11-07 | 01:04:58 | Same check; status sent; standing by. |
| 2026-11-07-01-16-47-84be2a | 2026-11-07 | 01:16:47 | Silent standby adopted: no pending events, no open rows, no new upstream commit, CI run, issue or PR. |
| 2026-11-07-01-59-39-381048 | 2026-11-07 | 01:59:39 | Silent standby: no new upstream events. |
| 2026-11-07-02-07-48-199140 | 2026-11-07 | 02:07:48 | Silent standby: no new upstream events. |
| 2026-11-07-02-15-33-169a1f | 2026-11-07 | 02:15:33 | Silent standby: no new upstream events. |
| 2026-11-07-02-26-20-33f7ba | 2026-11-07 | 02:26:20 | Silent standby: no new upstream events. |
| 2026-11-07-02-35-52-e07d85 | 2026-11-07 | 02:35:52 | Silent standby: no new upstream events and no drift in the own remote. |
| 2026-11-07-02-46-12-afdb89 | 2026-11-07 | 02:46:12 | Silent standby: no new upstream events and no drift. |
| 2026-11-07-02-56-10-c17c2a | 2026-11-07 | 02:56:10 | Silent standby: no new upstream events and no drift. |
| 2026-11-07-03-06-34-777148 | 2026-11-07 | 03:06:34 | Silent standby: no new upstream events and no drift. |
| 2026-11-07-03-16-17-d6bffb | 2026-11-07 | 03:16:17 | Silent standby; the git status check reported not a git repository for the primary working directory, with nothing else changed. |
| 2026-11-07-03-26-49-fd2a93 | 2026-11-07 | 03:26:49 | Silent standby: no new upstream events and no drift. |
| 2026-11-07-03-40-36-25a64c | 2026-11-07 | 03:40:36 | Read-only GitHub CLI survey found 38 local repositories and no new upstream events; silent standby. |
| 2026-11-07-04-16-05-2a91cf | 2026-11-07 | 04:16:05 | Sent the finished, open and blocked report for the read-only item; silent standby adopted. |
| 2026-11-07-04-38-23-3938a7 | 2026-11-07 | 04:38:23 | Silent standby with a 30-minute Monitor watch armed; no routine reply sent. |
| 2026-11-07-04-48-29-efdfc0 | 2026-11-07 | 04:48:29 | Sent the finished, open and blocked report; silent standby with a Monitor watch armed. |
| 2026-11-07-05-12-23-7fdba4 | 2026-11-07 | 05:12:23 | No end event; the supervisor ended stdin; three dropped cross-session delivery notices were treated as unsent and not resent. |
| 2026-11-07-05-37-18-b31dc9 | 2026-11-07 | 05:37:18 | Read the spawn.co pages for The Savi Gallery, Deepfall and Piccolo vs Xenomorph in the browser (read-only) and sent the findings to orchestrate and cleetus. |
| 2026-11-07-10-29-34-65fd6f | 2026-11-07 | 10:29:34 | Read the Deepfall and Piccolo vs Xenomorph pages: titles, descriptions, JSON-LD genre and dates, review counts; a later call was refused because the run had ended. |
| 2026-11-07-10-31-27-48064a | 2026-11-07 | 10:31:27 | Produced a ranked table of the three spawn.co worlds with a witness for each value. |
| 2026-11-07-10-41-32-040293 | 2026-11-07 | 10:41:32 | Mapped lanmower's worlds: the session page loaded 680 requests, and the head.json for the world showed seq 103 and version 92. |
| 2026-11-07-10-46-47-aaf121 | 2026-11-07 | 10:46:47 | Confirmed the Piccolo vs Xenomorph play iframe; the Savi Gallery play route showed no iframe after 12 seconds. |
| 2026-11-07-10-47-49-ed3ae8 | 2026-11-07 | 10:47:49 | Decoded three public chunks: the UI grid constant, the cellPages logic, the allowed hosts list and the value and magic-asset regexes. |
| 2026-11-07-10-49-42-a2cf05 | 2026-11-07 | 10:49:42 | Non-CDN reference check: 81 of 83 rows returned 200; cleetus open-items check passed with 28 items and 46 cited paths. |
| 2026-11-07-15-17-09-c9cb34 | 2026-11-07 | 15:17:09 | Sent the scoped probe observation to cleetus as one page (30 requests, 29 unique, no GLB-like URLs). |
| 2026-11-07-15-18-02-28bd9a | 2026-11-07 | 15:18:02 | Re-verified the witness line counts (256, 3, 84 and 2417 lines); no change since the last cycle. |
| 2026-11-07-15-23-04-220c7d | 2026-11-07 | 15:23:04 | cleetus local commit a4bc3c4 added the open-items register and validator (268 insertions); the owner-team mapping was sent; not pushed. |
| 2026-11-07-15-24-38-94375c | 2026-11-07 | 15:24:38 | Confirmed the jayzee directory is not a git repository and that cleetus has one local commit, a4bc3c4, not yet pushed. |
| 2026-11-07-15-26-06-939f9d | 2026-11-07 | 15:26:06 | cleetus commit 053393c removed /tmp citations from the open-items register (8 lines changed); not pushed. |
| 2026-11-07-15-27-53-05f9fa | 2026-11-07 | 15:27:53 | cleetus commit 5676d47 relabelled /tmp citations as ephemeral witness pointers; verified by stat and validator (28 items, 46 paths, PASS). |
| 2026-11-07-15-39-38-1412f4 | 2026-11-07 | 15:39:38 | Counted the cleetus catalog (70 rows, 17 exercised, 53 documented) and the reference figures; the live type count of 308 needs an authenticated call and was not reproduced. |
| 2026-11-07-15-42-35-e70c74 | 2026-11-07 | 15:42:35 | resolve-adventure probes (12 queries: found or not_found with HTTP 200, empty or missing address with HTTP 400) and manifest frame checks on 3 manifests; bodies kept in /tmp. |
| 2026-11-07-15-44-55-5681d7 | 2026-11-07 | 15:44:55 | Copied three manifest bodies, both checkers and 16 resolve bodies to a durable witness folder; re-ran the checks on the copies (81 frames, exact end). |
| 2026-11-07-15-45-12-c8e58a | 2026-11-07 | 15:45:12 | Sampled 40 of 2580 distinct manifests: all 40 returned 200 and the frame structure held for all 40 (2961 frames equal 2961 hashes). |
| 2026-11-07-15-49-54-4ffac8 | 2026-11-07 | 15:49:54 | Name encoder witnessed on 307 keys (/ encoded as ~2f); the bucket-rule hypotheses were all negative. |
| 2026-11-07-15-51-19-ee1da9 | 2026-11-07 | 15:51:19 | Reconstructed a spawnfile key with its middle elided; four bounded probes returned no model bytes, so no full key was formed. |
| 2026-11-07-15-54-24-06f9e6 | 2026-11-07 | 15:54:24 | Verified all 2580 distinct manifests: all HTTP 200, 229,921 frames equal hashes, 566,376,956 bytes; one exception manifest had a non-JSON frame. |
| 2026-11-07-16-05-29-c89008 | 2026-11-07 | 16:05:29 | Gzip census over the 2580 manifests: 1 gzip frame, decoded and matched; no raw mismatches. |
| 2026-11-07-16-29-26-d06f81 | 2026-11-07 | 16:29:26 | Decoded-frame token scan: 11,987 unique world-asset keys (11,679 cdn-value-sha, 308 cdn-named); no spawnfile or ~3a keys. |
| 2026-11-07-16-49-56-bcd0db | 2026-11-07 | 16:49:56 | No end event; the supervisor ended stdin after a timeout job was killed. |

## Decisions

The outcome for each run is the witness its own end event recorded, so no outcome is inferred across runs. Where a run's outcome records a choice (for example a push that was reverted, a route that was held for the owner, or a standby), that choice is set out with its evidence in [runs-findings.md](runs-findings.md). A run that has no end event is listed with its last logged event, not with an assumed result.

## Open gaps

The 20 runs with no end event are listed in section 1 of [runs-open-gaps.md](runs-open-gaps.md). Each open item that a finished run's witness recorded is listed there, under its theme, with its run id.

## Sources

- /workspace/spawn/runs/<run id>/log.jsonl (old name: spawn), last end event and last event of each run
- /workspace/spawn/runs/<run id>/task.json (old name: spawn), createdAt for the date and time
- /workspace/spawn/runs/<run id>/successor (old name: spawn), chain order where present

See also: [runs-overview.md](runs-overview.md), [runs-findings.md](runs-findings.md), [runs-open-gaps.md](runs-open-gaps.md).
