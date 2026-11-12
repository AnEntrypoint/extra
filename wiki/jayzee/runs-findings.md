# Runs findings and decisions

## How it works

The findings below are the results and decisions that the runs recorded in their end witnesses, grouped by theme. Each item gives the run id that recorded it, and the evidence is the witness text or the event named with it. Run ids are as in /workspace/spawn/runs (old name: spawn). Live-world names are kept verbatim: the world address @lanmower/the-savi-gallery and its room main are the world the runs probed. The sister project is cleetus (old name: savi) and its paths are cited in full where they appear.

## Decisions

### Game repository and reference set

- The reference set for the game repository game-6 was written under .spawn/reference in the game checkout and kept untracked, excluded through .git/info/exclude, with no commit or push. Runs 2026-11-04-16-36-00-a12151, 2026-11-04-17-25-58-a95c9b (git check-ignore output), 2026-11-04-17-24-41-1039b7.
- Nothing was committed or pushed in the first reference runs until the owner decided. The witnesses say "Nothing committed or pushed". Runs 2026-11-04-16-36-00-a12151, 2026-11-04-17-24-41-1039b7, 2026-11-04-17-45-09-c952ce, 2026-11-04-18-21-48-2f6104, 2749708-18562434, 65786-694246.
- The world identity was confirmed from the agent API: GET /api/agent/v1/me returned the world the-savi-gallery at address @lanmower/the-savi-gallery with worldId 26f64424-cc19-43af-a9c3-666e4559bb05. Run 2026-11-04-17-25-58-a95c9b. The earlier open question about the world name was recorded in 2026-11-04-17-24-41-1039b7.
- The owner's instruction to document the agentic interface was taken as the task for 2703944-18033865. The user answered "start by documenting our entire agentic interface", and the run did not push to main.
- Fast-forward pulls of the game and engine repositories were done as read-only sync steps with the local work left untouched. Runs 2026-11-04-18-21-48-2f6104 (game to a18be87, engine to 141b4bf, gm-new edits by another session left alone), 2749708-18562434 (game to 89c518f), 65786-694246 (game to 0698ecd, engine to 05a6272).
- Commit by the lanmower author only, with no trailers: the AGENTS.md routing note was committed as b5be09a with author lanmower. Run 2026-11-06-04-25-52-090cfe. The gate commit 7550e7b on origin/main was also made under the lanmower author. Run 2026-11-06-09-06-05-564118.

### Live-world probes

- Probing is read-only by default, and writes were gated on owner approval. Runs 2026-11-05-00-32-20-fbba08 (read-only probes except join and leave), 2026-11-05-11-06-51-2ebf3f ("pushing is on hold"), 2026-11-05-11-42-39-43bdec (ctx.commit "needs the owner's approval").
- The owner approved the no-op ctx.commit probe, which returned changesApplied false and worldMutated false. Run 2026-11-05-11-56-12-f0fdef.
- A ctx.commit write probe was run only in a preview room with no push. It returned changesApplied true and worldMutated true on a placed object in places/main/cells/x0z0.scene. Run 2026-11-05-11-59-29-d1448b.
- A spawn and destroy probe in the live room succeeded: the spawned object was found, then not found after destroy, with destroyedCount 1. Run 2026-11-05-05-16-22-51f490. Probe 7 and 8 results were appended to live-probe-results.md. Run 2026-11-05-11-06-51-2ebf3f.
- Hook order (onSpawn, update, onCollide, ears.press, onTriggerEnter, onInput) could not be verified in the live room, because the live room ran world 303 and did not load pushed probe rows. Runs 2026-11-05-05-28-41-892daf, 2026-11-05-06-29-58-3c13e6, 2026-11-05-11-17-38-203a78, 2026-11-05-11-38-30-87b1e7, 2026-11-05-11-43-22-63a7e3. The same order was measured in a preview room that boots the pushed version: onSpawn, update-first, onCollide avenue, onCollide terrain stream. Run 2026-11-05-11-57-26-592b7f. The preview rule is that it runs with no push.
- Physics: an exec-spawned box stayed at y=40 and did not fall, so a placed dynamic row is needed to measure a step rate. Run 2026-11-05-11-42-39-43bdec. Collision order was then measured with one dynamic box on the avenue and terrain stream in the preview. Run 2026-11-05-11-57-26-592b7f (step rate taken from the sim-health 33.3 ms line).
- Spawn-area terrain fault: chunk (0,0,-5) was not collidable and the cone77-0 hold was live; the fix was to pregenerate the main terrain and drop null child keys in x5-rails. Pushed as 0d7f8bc. Runs 2026-11-05-00-32-20-fbba08 (fault recorded for owner), 2026-11-05-05-28-41-892daf (fix pushed, no hold line after push).
- Pushed content fixes to the world: plinth code examples now name fr54-gantry, fr55-torso and fr61-grip; the w7match link became "+main#w7-165-door"; x4-chime and s5-marmot rows got simulatedBy platform (c5b3fc1, 194b4b4). Run 2026-11-05-06-29-58-3c13e6.
- Probe rows that were pushed for testing were reverted to restore the tree: 6b44544 reverted at f34590c (run 2026-11-05-11-17-38-203a78), c78c66e removed from main (run 2026-11-05-11-38-30-87b1e7), 6919c01 reverted (run 2026-11-05-11-43-22-63a7e3).

### Arrival budget and signage

- The push verdict reported budget.arrival.exceeded for main (489 KB) and workshop (574 KB). Runs 2026-11-05-05-28-41-892daf, 2026-11-05-11-38-30-87b1e7.
- The ws-engine-rows.json file was moved to data/ and pushed as fcae8cd, but the total did not change, because the largest values are spawn-area cells that cannot move to import(). Run 2026-11-05-11-56-12-f0fdef.
- A decision was made not to restructure the spawn-area cells in that round, because moving inline HUD and signage markup changes how the world draws, and needs a preview visual check first. Runs 2026-11-05-11-59-29-d1448b, 2026-11-05-12-00-32-c43ebc, 2026-11-05-12-45-09-71f539 ("no restructure in this round").
- An experiment stripped the ui/vector lines from the workshop cell and pushed it (a6b072f). Workshop fell to 495 KB and main stayed at 489 KB, so the markup alone was not enough. The revert was pushed as cc67d25. Run 2026-11-05-13-14-47-f90635.
- The budget fix commit 77425d2 removed spawn-area HUD and signage markup from the live world (164,748 bytes). Run 2026-11-05-15-26-41-6747b8.
- Later decision: the signage was restored from cc67d25 (4 cells), and the advisory returned at main 489 KB and workshop 574 KB. Every world-tree lever tested failed: a far cell count, no PlaceDef budget key in api-reference.md, import() cannot carry 164 KB of static hook and geometry exports, and minification saved 721 bytes (0.3 percent). The published world was accepted with spec_version 508. Run 2026-11-05-20-11-30-482eca. The earlier record that the markup stayed stripped is in 2026-11-05-16-05-09-737327 through 2026-11-05-19-06-05-a8d170, and was superseded by this run.
- The budget signal appears only in push verdicts, not in preview rooms, so a fix could not be measured without a push. Run 2026-11-05-12-01-10-20b78f.

### Engine knowledge base and pins

- The engine docs were kept as a documented reference (ENGINE.md, api-a, api-b, skills, world-usage, live-probe-results.md, internals-sources.md) under .spawn/reference/engine-deep in the game checkout and as cleetus notes. Runs 2026-11-04-20-43-01-2d070a, 2026-11-05-05-25-32-076881, 2026-11-05-11-06-51-2ebf3f.
- The engine docs clone tracks only docs; its kernel source was not available. Kernel behaviour was taken from the runtime worker copy and from live probes. Runs 2026-11-04-23-15-52-66680b, 2026-11-05-15-26-41-6747b8, 2026-11-05-16-05-09-737327.
- Upstream engine docs were merged fast-forward at each pin change, and the pin sha in engine.yaml was tracked: fb764b7 (run 2026-11-05-15-26-41-6747b8, 96 commits), 4134071 with partyCancel (2026-11-05-16-59-33-cc6077), 80552d3 (2026-11-05-17-21-50-5c2b99 and 2026-11-05-17-27-00-801a13), 819f547 (2026-11-05-18-53-51-ca16ef), 1a19114 (2026-11-05-18-58-26-42eddb, 2026-11-05-19-06-05-a8d170).
- A reusable script /workspace/savi/.spawn/update-engine-pin.py (old name: savi; absent from this workspace on 2026-11-12) was built to refresh the pin documents. It first added duplicate README rows on repeat runs, which were fixed. Run 2026-11-05-18-58-26-42eddb.
- Pin-only commits from the engine docs repo are treated as a scripted refresh, not as new findings. Runs 2026-11-05-20-11-30-482eca, 2026-11-05-21-23-49-f64575, 2026-11-06-04-25-52-090cfe.

### Physics, optimisation and runtime internals

- A physics and optimisation section was written after an inventory of undocumented items: broadphase, narrowphase, warm start, sleep islands, GJK, CCD, manifests and persistent pairs had no public doc. Run 2026-11-05-21-23-49-f64575.
- Live facts measured: place gravity {0,-24,0}, damping 0, tickBase 30, timeScale 1, worldBounds bottom -20, measured tick rate 30. Run 2026-11-05-21-23-49-f64575.
- The Mantle WASM contact kernels exist in the engine cache: 18 mantle-core builds across 5 sizes, each exporting 39 mantle_* kernels and the 10 mantle_solver_* functions. Run 2026-11-05-22-24-01-50a57a.
- The dispatcher binding core was decompiled from the durable worker copy at /workspace/savi/.spawn/kernel (old name: savi). When a behaviour defines lateUpdate but not update, the binder sets update to a no-op function. Run 2026-11-05-23-11-17-63af29.
- GPU pass attribution was recorded as a documented negative: the CPU eye reports gpu.status unsupported (no timestamp-query), and the GPU eye stays warming with 0 passes, while frame and GPU timings, tier, health and the tick-shed governor are measured. A working override was documented: SPAWN_CLIENT_CHROMIUM_PATH. Runs 2026-11-05-21-57-09-0bb7d7, 2026-11-05-22-48-51-b8043c, 2026-11-05-23-11-17-63af29.
- The netcode, lag compensation, compression and systems optimisation inventory found zero hits in the engine docs for these terms, so they were recorded as undocumented. Run 2026-11-06-04-25-52-090cfe.
- The kernel source was found in the headless room host log: runtime worker downloaded and SRI-verified, 28,979,030 bytes, 13,770 lines, with counts onSpawn 246, onTriggerEnter 30, onCollide 28, ears 669. Run 2026-11-05-16-05-09-737327.

### gm tool and harness findings

- Five friction items were sent to the gm session; items 2, 3 and 4 were fixed upstream (0cc8958, 2706397, b60a646, 691fa75) and item 1 (slash-command argument truncation) was recorded as a host-side bug. Runs 2026-11-04-17-24-41-1039b7, 2026-11-04-17-45-09-c952ce.
- The gm worker crashed with exit code 139 on an alternation-heavy grep at root /workspace. The fix b12685c was pushed and then installed; the grep then ran in about 300 ms with a scan budget of about 4,000 files. Runs 2026-11-05-16-46-46-0c62d1, 2026-11-05-17-30-51-952cb6, 2026-11-05-17-41-04-a8dfe5.
- gm final reinstall verified as 1592376-dev, and gm CI for it was reported green. Runs 2026-11-05-18-19-25-5805da, 2026-11-05-18-58-26-42eddb.
- A child context overwrote the parent task and consumed parent steps; the fix was verified: a child call returns role child and the parent's next call keeps the task and stepsLeft 48. Runs 2026-11-05-21-23-49-f64575 (bug), 2026-11-05-22-48-51-b8043c (fixed, installed as 2d41445-119).
- A closed run refuses calls, and the next run must be opened with next_context. Runs 2026-11-05-11-42-39-43bdec, 2026-11-05-11-57-26-592b7f, 2026-11-07-10-29-34-65fd6f.
- Rules notices were cleared by reading the gm skill rather than by more work. The notices were rule 2 (run_code called before the first next_context) and rule 3 (finish called with no call in its step). Runs 2026-11-05-14-22-29-0298e7 (rule 2), 2026-11-05-17-27-00-801a13 (rule 3, cleared by reading skill://gm/SKILL.md), 2026-11-06-20-34-39-971dba (cleared with no further work).

### Prop-warehouse asset download (owner-gated)

- Each download stage was gated by owner approval, and the owner confirmed the route via dev-orchestrator. Runs 2026-11-06-13-42-53-6be8d3 (owner-approved gate relaunch), 2026-11-06-13-56-00-e9d0b4 (owner confirmed), 2026-11-06-13-59-17-57fe48 (orchestrator decisions: one boot GET, one watch POST, asset GETs held).
- The browser gate was relaunched with PLAYWRITER_NO_SANDBOX=1 and the prop-warehouse page loaded: 3411 requests, 873 unique URLs, 637 to play.bigspawn.net. Run 2026-11-06-13-42-53-6be8d3.
- The cdn/resolve call returns landed names, not URLs, and the cache version is v7 with batch cap 512. Runs 2026-11-06-13-46-36-4bcc47, 2026-11-06-13-56-00-e9d0b4.
- The 2858 listed paths were fully retrieved by replaying the observed POST /world-store/values endpoint: 2858 unique paths, 552 landed, 0 mismatches. Run 2026-11-06-19-22-08-04ca3f.
- The owner's correction: saved captures and realm modules are input data only, not the source of truth for the ~2f rule. Live playwriter capture was used to prove the name rule for value.* names. Run 2026-11-06-20-05-59-49f2dd.
- Download route: cuimp for the HTTP transport with playwriter for live discovery; the cuimp GET calls timed out, so the route moved to curl with concurrency 8. Runs 2026-11-06-20-05-59-49f2dd, 2026-11-06-20-36-06-35b012.
- Result: 2587 names derived, 6 batches of resolve, 2587 addresses returned, 2587 files fetched (138 reused, 2449 downloaded), 0 failed, 0 never landed, 271 keys unmatched, and every SHA256SUMS line verified OK. Runs 2026-11-06-22-45-00-ca2f81 (six retries in one bounded pass), 2026-11-06-22-52-01-1b6867, 2026-11-06-23-10-16-8996bc.

### Spawn.co public world mapping and manifests

- Public pages of The Savi Gallery, Deepfall and Piccolo vs Xenomorph were read in the browser, read-only. The Savi Gallery has 508 versions over 1 day, 66 percent loved it from 3 votes, and was released 2026-11-04. Deepfall has 50 versions over 1 hour and a newest update "Deeper Like Noita (2026-11-04)". Piccolo vs Xenomorph has 36 versions in under an hour. Runs 2026-11-07-05-37-18-b31dc9, 2026-11-07-10-29-34-65fd6f, 2026-11-07-10-31-27-48064a.
- Read-only rule: no writes to cleetus, no pushes, no comments and no credentials. Runs 2026-11-07-10-41-32-040293 onward.
- Three public chunks were decoded: the UI grid constant kzD cellPx 16, the cellPages logic, the allowed hosts bigspawn.net, spawnfile.io and spawn.co, and the chat door. Run 2026-11-07-10-47-49-ed3ae8.
- Corpus of world manifests: 2580 distinct manifests, all HTTP 200, 229,921 frames equal to hashes, 566,376,956 bytes, every chain ends at end of file. One manifest d048ad06 had a non-JSON binary frame 2. Run 2026-11-07-15-54-24-06f9e6.
- One gzip frame was found in the corpus and decoded to a match. Run 2026-11-07-16-05-29-c89008.
- Decoded-frame scan: 11,987 unique world-asset keys (11,679 cdn-value-sha, 308 cdn-named); no spawnfile keys and no ~3a or ~7e escapes. Run 2026-11-07-16-29-26-d06f81.
- Name encoder: the ~2f escape for / was witnessed on 307 keys, with encode(decode(key)) equal to key for all 307; ~3a was seen only in cleetus FAULTS.md; ~7e has no witness. Run 2026-11-07-15-49-54-4ffac8.
- Bucket rule: eight name and sha hypotheses plus four frame-level hypotheses were all negative. Run 2026-11-07-15-49-54-4ffac8.
- Resolve-adventure behaviour: an address that resolves returns 200 found with an appId, an unknown address returns 200 not_found, and an empty or missing address returns 400 Invalid query. Run 2026-11-07-15-42-35-e70c74.
- Manifest copies were kept as durable provenance under /workspace/spawn/maps/witness (old name: spawn) and maps/witness/manifest-sample40. Runs 2026-11-07-15-44-55-5681d7, 2026-11-07-15-45-12-c8e58a.

### cleetus coordination (open items register)

- cleetus gained an open-items register and validator: docs/OPEN-ITEMS.md with 28 items and 46 cited workspace paths, and scripts/check-open-items.mjs. Commits a4bc3c4 (local, not pushed by jayzee), 053393c (removed /tmp citations), 5676d47 (relabelled them). Runs 2026-11-07-10-49-42-a2cf05, 2026-11-07-15-23-04-220c7d, 2026-11-07-15-26-06-939f9d, 2026-11-07-15-27-53-05f9fa.
- Owner-team assignments were sent to cleetus and to orchestrate, but receipt was not treated as approval. Runs 2026-11-07-10-49-42-a2cf05, 2026-11-07-15-23-04-220c7d.
- OPEN-027 stayed HELD-OWNER and the owner-tag decision was closed as no-write. Runs 2026-11-07-15-27-53-05f9fa.

### Standby

- Runs 2026-11-06-22-59-28-bd52e9 to 2026-11-07-01-04-58-1d48f0 repeated the read-only verification of the 2587 files and reported status to orchestrate. Runs 2026-11-07-01-16-47-84be2a to 2026-11-07-04-48-29-efdfc0 were a silent standby: no routine reply was sent unless an upstream commit, CI run, issue or PR appeared, and none was recorded in those runs.

## Open gaps

The open items that the decisions above leave unresolved are listed with their run ids in [runs-open-gaps.md](runs-open-gaps.md).

## Sources

- /workspace/spawn/runs/<run id>/log.jsonl (old name: spawn), end events and the witness and gaps fields
- /workspace/spawn/runs/<run id>/task.json (old name: spawn), task settings
- /workspace/savi/.spawn/update-engine-pin.py (old name: savi; absent from this workspace on 2026-11-12), named in 2026-11-05-18-58-26-42eddb
- /workspace/savi/.spawn/kernel (old name: savi), named in 2026-11-05-23-11-17-63af29
- /workspace/savi/.spawn/reference/engine-deep/live-probe-results.md (old name: savi), named in 2026-11-05-11-06-51-2ebf3f
- /workspace/spawn/maps/witness (old name: spawn), named in 2026-11-07-15-44-55-5681d7

See also: [runs-overview.md](runs-overview.md), [runs-timeline.md](runs-timeline.md), [runs-open-gaps.md](runs-open-gaps.md).
