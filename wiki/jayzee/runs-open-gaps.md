# Runs open gaps and failures

## How it works

This page lists every open item and every failure that the runs recorded. Open items come from the gaps array of each run's end event (log.jsonl). Failures come from the event kinds refusal, error, abandoned, job-killed, job-stuck, recovery, and from mcp-server events with state failed or down, and from runs with no end event. Each item is followed by the run ids that recorded it. Where the same open item was repeated in later runs, the first run is named and the later runs are named after it. Items that a later run closed are marked closed with the closing run.

Counts. The end events hold 259 gap entries in total. The failures are 8 refusal events, 2 abandoned actions, 2 recovery events, 1 error event, 1 job-stuck event, 25 job-killed events, and 20 runs with no end event.

## Decisions

Open items are left open where the runs needed an owner decision. The decisions are recorded with their evidence in [runs-findings.md](runs-findings.md), so this page only names the items and the runs. Where a run recorded that an item was closed, it is listed as closed and not as open.

## Open gaps

### 1. Runs with no end event (20)

No finished witness exists for these runs, so their results are unknown.

- Stopped by gm or gm-new (MCP server state down): 2026-11-05-10-26-24-a5f31e, 2026-11-05-13-30-29-28796a, 2026-11-05-14-12-01-e87823, 2026-11-05-14-22-29-0298e7, 2026-11-05-15-25-01-0dcb90, 2026-11-06-05-07-44-9c31cc, 2026-11-06-09-05-33-107f30, 2026-11-06-12-23-54-ade8e7, 2026-11-06-12-24-03-0875da, 2026-11-06-13-38-26-709b2c, 2026-11-06-13-38-49-51c3ae, 2026-11-06-13-38-57-4afae0.
- MCP playwriter server failed with exit code 137: 2026-11-05-15-24-55-4f2e2c, 2026-11-06-09-05-56-56196d.
- Stopped by the supervisor or a run end: 2026-11-05-13-29-54-d28f33 (uiprev job killed at run end), 2026-11-07-05-12-23-7fdba4 and 2026-11-07-16-49-56-bcd0db (supervisor ended stdin).
- Last event was an action or result with no end: 2026-11-05-06-58-25-6b9460 (live check, last action next_context), 2026-11-05-14-31-36-7e3ce4 (last result run_code).
- Tool skipped: 2026-11-06-14-05-48-3c5ab3 (reset verb denied by the server entry).

### 2. Failures recorded as events

- Refusals (run has ended, or the connection was bound to another run): 2026-11-05-11-42-39-43bdec, 2026-11-05-11-57-26-592b7f, 2026-11-05-12-00-32-c43ebc, 2026-11-06-13-42-53-6be8d3, 2026-11-07-10-29-34-65fd6f, 2026-11-07-16-29-26-d06f81, 2026-11-05-21-23-49-f64575 (refused: the connection belongs to this run and not to the cleetus connection), 2703944-18033865 (run had ended).
- Abandoned action because the worker restarted: 2026-11-05-14-22-29-0298e7 (with a recovery event), 2026-11-05-16-46-46-0c62d1 (with a recovery event).
- Error: 2703944-18033865, method not found: server/discover.
- Job stuck: 2026-11-07-15-54-24-06f9e6 (job manifests-all made no progress; the monitor killed it once; resumed from results.jsonl).
- Job killed, cancelled: 2026-11-05-11-57-26-592b7f, 2026-11-05-11-59-29-d1448b, 2026-11-05-12-01-10-20b78f, 2026-11-05-13-30-29-28796a, 2026-11-05-15-26-41-6747b8, 2026-11-05-16-05-09-737327, 2026-11-05-20-11-30-482eca, 2026-11-05-21-57-09-0bb7d7, 2026-11-07-16-05-29-c89008.
- Job killed, timeout: 2026-11-05-16-05-09-737327, 2026-11-05-20-11-30-482eca, 2026-11-05-21-57-09-0bb7d7, 2026-11-07-15-54-24-06f9e6, 2026-11-07-16-05-29-c89008, 2026-11-07-16-29-26-d06f81, 2026-11-07-16-49-56-bcd0db.
- Job killed, run ended: 2026-11-05-13-29-54-d28f33.
- The gm worker died with code 139 on an alternation grep: 2026-11-05-16-46-46-0c62d1. The grep at root /workspace also ran for 96.9 s before the fix. Fix verified in 2026-11-05-17-41-04-a8dfe5, with a reinstall in 2026-11-05-18-19-25-5805da.
- The gm connection dropped and was reconnected via /mcp: 2026-11-05-11-38-30-87b1e7.
- A child context overwrote the parent task: 2026-11-05-21-23-49-f64575 (fixed, see the 2026-11-05-22-48-51-b8043c check).
- A truncated write cut ENGINE.md to 19,947 bytes and was recovered from the transcript: 2026-11-05-15-26-41-6747b8 (recovered, 51,557 bytes).
- Install of the runtime stalled at 0 percent of 120 MiB and the CPU eye died with a missing Chromium: 2026-11-05-21-57-09-0bb7d7 (the override was documented).

### 3. Hook order in the live room (open unless noted)

The live room ran world 303, which did not load pushed probe rows. Hook order was measured only in a preview room.

- Not verified in the live room: 2026-11-05-05-16-22-51f490, 2026-11-05-05-25-32-076881, 2026-11-05-05-28-41-892daf, 2026-11-05-06-29-58-3c13e6, 2026-11-05-11-06-51-2ebf3f, 2026-11-05-11-17-38-203a78, 2026-11-05-11-24-10-a91327, 2026-11-05-11-31-49-ace498, 2026-11-05-11-38-30-87b1e7, 2026-11-05-11-42-39-43bdec, 2026-11-05-11-43-22-63a7e3, 2026-11-05-11-44-21-5d831a, 2026-11-05-11-56-12-f0fdef, 2026-11-04-23-15-52-66680b, 2026-11-05-00-32-20-fbba08.
- Not yet measured in any room, from the runs with the most detail: the order of ears.press, onTriggerEnter and onInput (2026-11-05-15-26-41-6747b8, 2026-11-05-19-06-05-a8d170), and the ordering timing beyond one dynamic box (2026-11-05-15-26-41-6747b8).
- Hook run order across hooks is not stated in the engine clone: 2026-11-04-20-43-01-2d070a.
- lateUpdate order was taken from the kernel catalog and not from a live probe: 2026-11-05-19-06-05-a8d170.
- The onInput catalog wording conflicts with a live observation: 2026-11-05-19-06-05-a8d170.
- A placed probe row did not load and the cause was not found; a cached cell copy is a possibility: 2026-11-05-11-17-38-203a78. The room may still hold cached copies until the next boot: 2026-11-05-11-17-38-203a78.
- A "deployed behaviour module" was needed, which is a push to the live world, and was not sent without owner approval: 2026-11-05-05-16-22-51f490, 2026-11-05-05-25-32-076881, 2026-11-05-11-06-51-2ebf3f.
- A placed probe row with a fresh join was proposed as the next approach: 2026-11-05-05-28-41-892daf.
- The mechanism of ears.press, onTriggerEnter and onInput ordering and of ctx.destroy force and ctx.sleep was not probed: 2026-11-05-00-32-20-fbba08, 2026-11-05-15-26-41-6747b8.
- Live checks sampled one room boot each and no multi-player behaviour was tested: 2026-11-05-06-29-58-3c13e6.

### 4. ctx.commit semantics

- Not probed (writes the world tree, owner approval needed): 2026-11-04-23-15-52-66680b, 2026-11-05-00-32-20-fbba08, 2026-11-05-11-06-51-2ebf3f, 2026-11-05-11-17-38-203a78, 2026-11-05-11-24-10-a91327, 2026-11-05-11-31-49-ace498, 2026-11-05-11-38-30-87b1e7, 2026-11-05-11-42-39-43bdec, 2026-11-05-11-43-22-63a7e3, 2026-11-05-11-44-21-5d831a.
- Probed only as a no-op; a write probe was not run: 2026-11-05-11-57-26-592b7f. A write probe was then run in a preview room and recorded as worldMutated true: 2026-11-05-11-59-29-d1448b. Write semantics beyond one placed object are not recorded.

### 5. Physics step rate and collision order

- Not measured or not probed: 2026-11-05-00-32-20-fbba08, 2026-11-05-11-06-51-2ebf3f, 2026-11-05-11-17-38-203a78, 2026-11-05-11-24-10-a91327, 2026-11-05-11-31-49-ace498, 2026-11-05-11-38-30-87b1e7, 2026-11-05-11-42-39-43bdec, 2026-11-05-11-43-22-63a7e3, 2026-11-05-11-44-21-5d831a.
- Collision order measured with one dynamic box only; step rate from the sim-health line, not a per-tick sample: 2026-11-05-11-57-26-592b7f. Collision timing beyond one box remains unmeasured: 2026-11-05-15-26-41-6747b8. A second dynamic shape was not sampled: 2026-11-05-19-06-05-a8d170.
- Physics step rate and collision order were recorded again as unmeasured in the same blocker: 2026-11-05-11-56-12-f0fdef.

### 6. Arrival budgets and signage

- Arrival budgets for main (489 KB) and workshop (574 KB) remained flagged: 2026-11-05-05-28-41-892daf, 2026-11-05-06-29-58-3c13e6, 2026-11-05-11-24-10-a91327, 2026-11-05-11-31-49-ace498, 2026-11-05-11-38-30-87b1e7, 2026-11-05-11-42-39-43bdec, 2026-11-05-11-43-22-63a7e3, 2026-11-05-11-44-21-5d831a, 2026-11-05-11-56-12-f0fdef, 2026-11-05-11-57-26-592b7f, 2026-11-05-11-59-29-d1448b, 2026-11-05-12-00-32-c43ebc, 2026-11-05-12-01-10-20b78f, 2026-11-05-12-45-09-71f539, 2026-11-05-13-14-47-f90635 (workshop 495 KB after the test).
- The budget fix cannot be measured in a preview, only by a push verdict: 2026-11-05-12-01-10-20b78f.
- The engine's arrival set is not visible from the repo, so the boot-fetch membership is unknown: 2026-11-05-11-44-21-5d831a. Moving a file to import() is a design choice for the owner: 2026-11-05-11-42-39-43bdec.
- Signage markup: 164,748 bytes of spawn-area signage were stripped under the 450 KB limit in 2026-11-05-16-05-09-737327 through 2026-11-05-19-06-05-a8d170 and the cc67d25 recovery path is recorded in world-usage.md. The later full restoration (2026-11-05-20-11-30-482eca) brought the advisory warning back, and the trade-off was recorded as deliberate. Whether to remove or keep the restored signage is the owner's decision.
- The restored signage was verified by line counts and push verdicts only, not by a rendered visual check: 2026-11-05-19-06-05-a8d170. A preview-room visual check is needed: 2026-11-05-12-00-32-c43ebc.
- The published page was still downloading at 130 s in a cold headless browser because the newest engine workers were not downloadable; a cached engine made a room boot in 8 s: 2026-11-05-20-11-30-482eca.
- Published world is on @dev; the live world has not been republished, which needs owner approval: 2026-11-05-19-06-05-a8d170.

### 7. World data and terrain (owner decisions)

- Terrain chunk (0,0,-5) fault and cone77-0 hold: recorded for the owner in 2026-11-05-00-32-20-fbba08; the pregenerate fix was pushed in 2026-11-05-05-28-41-892daf and the hold no longer appeared after it.
- Items not changed, awaiting owner decision: fr61-figure absolute URL, x2-turntable duplicate (not reproduced in x0z-2), w7match portal link "+", w12 ids, state keys with no writer: 2026-11-05-05-16-22-51f490, 2026-11-05-05-25-32-076881, 2026-11-05-05-28-41-892daf. The x1z-2 plinth ids named in the notes were not found in the file: 2026-11-05-05-28-41-892daf.
- Null child keys in x5-rails and x0z0.scene: listed as open in 2026-11-05-05-16-22-51f490 and 2026-11-05-05-25-32-076881, and dropped in 2026-11-05-05-28-41-892daf (x5-rails pregenerate and x0z0.scene -3 null keys).
- ex/chime.js and ex/marmot.js tree-state writes still in place, no verified replacement: 2026-11-05-05-25-32-076881, 2026-11-05-05-28-41-892daf. Owner decision open: 2026-11-05-05-25-32-076881.
- Workshop state.sent, shots and last: writer not located in 2026-11-05-06-29-58-3c13e6 and 2026-11-05-11-24-10-a91327; the writers were found in 2026-11-05-11-31-49-ace498, so this item is closed there.
- Remote name difference (game-6.git and the-savi-gallery.git) and the commit of the reference: 2026-11-05-05-25-32-076881.
- Reference notes under /workspace/savi/.spawn/reference (old name: savi) still name the old reference paths: 2026-11-05-05-16-22-51f490 (rewritten in 2026-11-05-05-25-32-076881).

### 8. Reference set and engine docs

- Reference untracked and uncommitted; no commit or push of the game repo from this work: 2026-11-04-16-36-00-a12151, 2026-11-04-17-24-41-1039b7.
- gm-new AGENTS.md and DESIGN.md not updated with the gm friction: 2026-11-04-16-36-00-a12151. The gm-new change was not made: 2026-11-04-17-24-41-1039b7, 2026-11-04-17-25-58-a95c9b.
- Guide digest not regenerated; AGENTS-current.md used as a copy: 2026-11-04-16-36-00-a12151.
- Served Tome, skills and guide copies not re-fetched after pulls: 2026-11-04-16-36-00-a12151, 2026-11-04-17-24-41-1039b7, 2026-11-04-18-21-48-2f6104, 2749708-18562434, 65786-694246. The Tome was not re-split into sections: 2026-11-04-17-25-58-a95c9b. Skill text was not diffed: 2026-11-04-17-25-58-a95c9b.
- Engine pin sha in agent-interface.md is stale: 2026-11-04-18-21-48-2f6104, 2749708-18562434, 65786-694246.
- The reference copy of skills/heightmap-terrain.md is stale: 65786-694246.
- Untracked keys.py and probe.sh in the engine clone of unknown origin, read but not run: 2026-11-04-20-43-01-2d070a. Left alone: 2749708-18562434.
- The engine clone has no kernel source; internals are documented behaviour, not verified code: 2026-11-04-20-43-01-2d070a, 2026-11-04-23-15-52-66680b, 2026-11-05-15-26-41-6747b8. The kernel source was later found in the headless room host log: 2026-11-05-16-05-09-737327.
- Many named types (Vec3Like, Quat, SqlAPI, ObjectAPI) not defined in the clone; defaults missing for PrimitiveSpec, AtmosphereDef, InputActionDef, tween, noise, voxels, vec3 and ObjectPropertiesSpec: 2026-11-04-20-43-01-2d070a.
- Known conflicts: the ui.js hook shape differs from the game-ui skill; textureScale default differs (2.5 in skills-a, 1 in api-b); ctx.self.state is typed two ways: 2026-11-04-20-43-01-2d070a.
- The heading coverage check was a text match, not a check of every item: 2026-11-04-20-43-01-2d070a.
- Minified client bundles searched by pattern only, not read in full: 2026-11-04-23-15-52-66680b.
- Engine docs repo keeps shipping pin-only commits and the notes must be refreshed each time: 2026-11-05-20-11-30-482eca, 2026-11-05-21-23-49-f64575, 2026-11-05-21-57-09-0bb7d7, 2026-11-05-22-24-01-50a57a, 2026-11-05-22-48-51-b8043c, 2026-11-05-23-11-17-63af29, 2026-11-06-04-25-52-090cfe (item 7 of that run is continuous maintenance).
- The default value of findPath's budget? option is not stated in api-reference.md: 2026-11-05-21-23-49-f64575.
- The runtime worker cache is under /tmp and is ephemeral; a cleared cache must download the worker again: 2026-11-05-16-05-09-737327, 2026-11-05-16-46-46-0c62d1, 2026-11-05-16-59-33-cc6077, 2026-11-05-17-21-50-5c2b99, 2026-11-05-17-27-00-801a13, 2026-11-05-17-30-51-952cb6, 2026-11-05-17-41-04-a8dfe5, 2026-11-05-18-19-25-5805da, 2026-11-05-18-53-51-ca16ef, 2026-11-05-18-58-26-42eddb, 2026-11-05-19-06-05-a8d170 (no further action).
- The tree of the 2703944-18033865 Tome: full text of each Tome section not read, only the opening and headings: 2703944-18033865. spawn events, numbers, mod and bring were not run beyond their help line: 2703944-18033865. Push to main not attempted and no display-name change made: 2703944-18033865.

### 9. Mantle, dispatcher and GPU telemetry

- Mantle WASM contact-cache kernel implementation is not public; only the error string and the phase and counter names exist: 2026-11-05-21-23-49-f64575, 2026-11-05-21-57-09-0bb7d7. The kernel names were documented from the export section; the implementation was not decompiled: 2026-11-05-22-24-01-50a57a.
- The fully decompiled minified JS hook dispatcher: still open in 2026-11-05-21-23-49-f64575, 2026-11-05-21-57-09-0bb7d7, 2026-11-05-22-24-01-50a57a, 2026-11-05-22-48-51-b8043c (module-level indirection, build-specific). Closed for the binding core in 2026-11-05-23-11-17-63af29; the surrounding per-tick scheduling functions remain minified, a deliberate scope boundary. Also open in 2026-11-05-20-11-30-482eca (durable copy at /workspace/savi/.spawn/kernel (old name: savi) makes it possible without a room boot).
- Per-pass GPU attribution not measured: 2026-11-05-21-23-49-f64575 (no renderer, gpu.status unsupported, scene counts 0), 2026-11-05-21-57-09-0bb7d7 (CPU eye unmeasured), 2026-11-05-22-24-01-50a57a (needs a GPU client with timestamp queries), 2026-11-05-22-48-51-b8043c (warming with 0 passes on the GPU eye), 2026-11-05-23-11-17-63af29 (same). Recorded as a documented negative in 2026-11-05-21-57-09-0bb7d7 and 2026-11-05-22-48-51-b8043c, and cited as sections 14 and 15 of the physics document in 2026-11-06-04-25-52-090cfe.
- Per-tick scheduling functions and per-pass GPU timings remain runtime-only: 2026-11-06-04-25-52-090cfe.
- Netcode, lag compensation, compression, interest management and systems optimisation: the engine docs had zero hits for these terms, so no documentation exists for them: 2026-11-06-04-25-52-090cfe.
- video:generate documented but not invoked (it produces a paid clip) in 2026-11-05-15-26-41-6747b8, 2026-11-05-16-05-09-737327, 2026-11-05-16-46-46-0c62d1, 2026-11-05-16-59-33-cc6077, 2026-11-05-17-21-50-5c2b99, 2026-11-05-17-27-00-801a13, 2026-11-05-17-30-51-952cb6, 2026-11-05-17-41-04-a8dfe5, 2026-11-05-18-19-25-5805da, 2026-11-05-18-53-51-ca16ef, 2026-11-05-18-58-26-42eddb, 2026-11-05-19-06-05-a8d170. In 2026-11-05-20-11-30-482eca it was invoked and returned fuel_empty, so no clip exists; retry in about 8 hours.
- Lower-level items: ctx.destroy force semantics, ears.press ordering, collision timing beyond one dynamic box: 2026-11-05-15-26-41-6747b8.

### 10. gm harness and release items

- Friction item 1 (slash-command argument truncation) is a host-side bug and still open; the host must restart before the untracked default of gm.grep is live in this session: 2026-11-04-17-45-09-c952ce. The Node reference src/search.mjs still has the tracked-only default: 2026-11-04-17-45-09-c952ce.
- gm friction message to the gm session (msg_id ff890f12-e573-40e7-ad7a-76f2cb6b8d17) unread with no reply, with follow-ups b5c64b4f and d79eb2f0: 2026-11-05-11-42-39-43bdec through 2026-11-05-13-14-47-f90635 (answered with status only in later runs).
- No reply from the gm session to the friction message: 2026-11-05-11-06-51-2ebf3f, 2026-11-05-11-24-10-a91327, 2026-11-05-11-31-49-ace498, 2026-11-05-11-38-30-87b1e7.
- gm release publish and manual install for fix 5d9e835 were owned by the gm session; the local binary stayed at 409087f-77 at that point: 2026-11-05-16-05-09-737327. The installed gm was later 05a9ccf-96 and then 1592376-dev: 2026-11-05-18-19-25-5805da, 2026-11-05-19-06-05-a8d170.
- gm grep fix b12685c pushed but not installed until a later reinstall: 2026-11-05-17-30-51-952cb6. gm --version still reported dev and build info awaited: 2026-11-05-17-41-04-a8dfe5.
- gm CI for 1592376 still finishing: 2026-11-05-18-19-25-5805da, 2026-11-05-18-53-51-ca16ef. gm CI for 05a9ccf still running: 2026-11-05-18-58-26-42eddb, 2026-11-05-19-06-05-a8d170.
- gm's child_context task and step fix and its three other in-flight fixes (relay flake, gm.verbs error data, grep alternation) were owned by the gm session: 2026-11-05-21-57-09-0bb7d7, 2026-11-05-22-24-01-50a57a, 2026-11-05-22-48-51-b8043c, 2026-11-05-23-11-17-63af29.
- gm grep fix verified with grepMs 303 and 296; the second grep did not crash: 2026-11-05-17-41-04-a8dfe5. Restated in later runs as no open friction on the connection: 2026-11-05-18-19-25-5805da.
- Job monitor killed a manifests job once with no stdout progress, and the job was resumed from results.jsonl: 2026-11-07-15-54-24-06f9e6. Friction sent to orchestrate.
- The playwriter browser: MCP server stopped or exited in 2026-11-05-10-26-24-a5f31e, 2026-11-05-13-30-29-28796a, 2026-11-05-14-12-01-e87823, 2026-11-05-15-24-55-4f2e2c (exit 137), 2026-11-05-15-25-01-0dcb90, 2026-11-06-05-07-44-9c31cc, 2026-11-06-09-05-33-107f30, 2026-11-06-09-05-56-56196d (exit 137), 2026-11-06-12-23-54-ade8e7, 2026-11-06-12-24-03-0875da, 2026-11-06-13-38-26-709b2c, 2026-11-06-13-38-49-51c3ae, 2026-11-06-13-38-57-4afae0. The playwriter retry was not confirmed in these runs.
- Owner decision open on keep or revert of settings.json: 2026-11-06-18-40-51-44f772. settings.json unchanged in 2026-11-06-22-52-01-1b6867 onward, with 29 realm modules unchanged.

### 11. Prop-warehouse route

- Stage 1 blocked: the key-to-CDN name decoding rule for the ~2f escapes was not proven from the saved realm modules: 2026-11-06-19-45-23-393f92. Later closed by live capture for value.* names in 2026-11-06-20-05-59-49f2dd.
- No watch POSTs, resolve POSTs or asset GETs were made in 2026-11-06-19-45-23-393f92. The cdn/watch POST was sent once in 2026-11-06-13-59-17-57fe48 and its outcome was not recorded.
- The full 2858 pathPages entries were not available from the listing (3 entries): 2026-11-06-13-59-17-57fe48, 2026-11-06-18-40-51-44f772. The 2858 paths were later retrieved through the values endpoint in 2026-11-06-19-22-08-04ca3f.
- Only one start click made; no direct prop asset URLs appeared: 2026-11-06-18-40-51-44f772. The 362 observed v4 client URLs and the 626-URL set were held and not fetched: 2026-11-06-18-40-51-44f772.
- Bounded downloads blocked by cuimp GET timeouts (0 files, 3 failed): 2026-11-06-20-05-59-49f2dd. A more reliable transport or a longer timeout was needed: 2026-11-06-20-05-59-49f2dd.
- Final counts unavailable because the curl script timed out at 300000 ms before its final writes; 138 partial files verified, SOURCE-URLS.txt empty, no guessed URLs substituted: 2026-11-06-20-36-06-35b012. Closed by the retry and verification in 2026-11-06-22-45-00-ca2f81 and 2026-11-06-22-52-01-1b6867.
- Six names failed in the full pass: 2026-11-06-22-38-12-6d4705. All six retried successfully in 2026-11-06-22-45-00-ca2f81 (failed 0 at the end).
- 271 keys unmatched to a CDN name, out of 2858 keys (2587 derived): 2026-11-06-22-52-01-1b6867 and later. The witnesses record the count but do not say why those keys have no CDN name.

### 12. Public spawn.co mapping and manifest census (jayzee read-only items)

- Descriptions of Deepfall and Piccolo vs Xenomorph were not read and the page body text was nearly empty: 2026-11-07-05-37-18-b31dc9. The rest of The Savi Gallery page beyond 2,900 characters was not captured: 2026-11-07-05-37-18-b31dc9.
- The spawn.co desktop-app and browser-setup prompts were not followed: 2026-11-07-10-29-34-65fd6f. Piccolo vs Xenomorph's embedded video object and the nine JavaScript chunks were listed but not executed: 2026-11-07-10-29-34-65fd6f.
- Piccolo and Deepfall metadata came from the earlier browser run, not the later one: 2026-11-07-10-31-27-48064a.
- Chunk JavaScript was keyword-scanned only; the spatial index format and model URL inference were not established: 2026-11-07-10-41-32-040293, 2026-11-07-10-47-49-ed3ae8 (spatial scheme inferred from field names).
- Whether the CLI can infer model URLs was tested only with one public GET of head.json: 2026-11-07-10-41-32-040293. Model URL inference was inferred from the regex and not tested end to end: 2026-11-07-10-47-49-ed3ae8.
- The 'Set up my browser instead' button was not confirmed as the entry point; the play route was used: 2026-11-07-10-41-32-040293. The Savi Gallery play route showed no iframe, so its entry was not confirmed: 2026-11-07-10-46-47-aaf121.
- Other lanmower worlds, the shelf and the root (about 40 creator worlds outside the lanmower scope) were not mapped, pending an owner decision: 2026-11-07-10-41-32-040293, 2026-11-07-10-46-47-aaf121, 2026-11-07-10-47-49-ed3ae8.
- spawnfile.io asset URLs were not listed in full and not downloaded, per the owner's instruction: 2026-11-07-10-46-47-aaf121.
- World-store fields not tied to the local stores: 2026-11-07-10-47-49-ed3ae8.
- Unpromoted items, not established from the witnesses: spawnfile key path (elided), bucket rule (undetermined), name encoder, resolve redirect and gone bodies, manifest frames, /cdn/-only host (inferred), spawnfile.io bytes (unconfirmed), 2 non-CDN references (open): 2026-11-07-10-49-42-a2cf05, 2026-11-07-15-17-09-c9cb34, 2026-11-07-15-18-02-28bd9a, 2026-11-07-15-54-24-06f9e6 (gone 410, /cdn/-only, spawnfile.io bytes and key path, bucket rule, and ':' and '~' encoder cases remain open with reasons in FINDINGS.md).
- The 410 gone response was not reached: 2026-11-07-15-42-35-e70c74, 2026-11-07-15-44-55-5681d7, 2026-11-07-15-45-12-c8e58a.
- Manifest frame structure witnessed on 3 manifests, then on 43 of 2580 by sample, not corpus-wide: 2026-11-07-15-42-35-e70c74, 2026-11-07-15-45-12-c8e58a. Frame-to-hash mapping is body-sha membership, ordering not checked: 2026-11-07-15-42-35-e70c74. Head drift for 41cd4649 (manifest 3fa9a434 returns 404) not measured across the sample: 2026-11-07-15-42-35-e70c74, 2026-11-07-15-45-12-c8e58a.
- One exception frame (non-JSON binary frame 2, 175 bytes) in manifest d048ad06 was not interpreted: 2026-11-07-15-54-24-06f9e6.
- Name encoder: ':' and '~' cases unwitnessed in the probes; ':' was seen only in FAULTS.md: 2026-11-07-15-49-54-4ffac8, 2026-11-07-15-51-19-ee1da9. Bucket rule hypotheses not exhaustive; the world-uuid check used only 16 keys: 2026-11-07-15-49-54-4ffac8.
- Spawnfile key elided middle not recoverable and no candidate key returned model bytes after four bounded probes: 2026-11-07-15-51-19-ee1da9.
- Gone 410 and head drift were measured on a sample only: 2026-11-07-15-45-12-c8e58a.
- Copies of manifests and bodies are provenance under /workspace/spawn/maps/witness (old name: spawn) and are not in any git repo: 2026-11-07-15-44-55-5681d7.

### 13. cleetus coordination and register

- Owner-team assignments were sent to cleetus and receipt not received; not treated as approval: 2026-11-07-10-49-42-a2cf05, 2026-11-07-15-17-09-c9cb34, 2026-11-07-15-23-04-220c7d.
- OPEN-027 remained HELD-OWNER with no owner decision: 2026-11-07-10-49-42-a2cf05, 2026-11-07-15-17-09-c9cb34, 2026-11-07-15-18-02-28bd9a, 2026-11-07-15-23-04-220c7d, 2026-11-07-15-24-38-94375c, 2026-11-07-15-26-06-939f9d. The owner-tag decision was closed as no-write in 2026-11-07-15-27-53-05f9fa.
- cleetus commit a4bc3c4 (open-items register) not pushed; push is cleetus's decision and then the orchestrate instruction: 2026-11-07-15-23-04-220c7d, 2026-11-07-15-24-38-94375c. Commit 053393c not yet pushed: 2026-11-07-15-26-06-939f9d.
- cleetus has not documented the scoped probe observation: 2026-11-07-15-17-09-c9cb34. The cleetus acknowledgement of the owner-tag decision was not received: 2026-11-07-15-26-06-939f9d.
- Relabel commit 5676d47 verified by stat and the validator only; the full diff was not re-read: 2026-11-07-15-27-53-05f9fa.

### 14. Counts that were not reproduced

- The 308 live-type figure needs an authenticated GET; no credentials were used: 2026-11-07-15-39-38-1412f4.
- The Tome bucket figure of 74 in the reference README is not reproduced by a stated rule (75 files measured, 73 .md): 2026-11-07-15-39-38-1412f4.
- Builtin owner 23 is not reproducible locally (OPEN-028 stays UNVERIFIED): 2026-11-07-15-39-38-1412f4.

### 15. Standby and read-only items with no open work

- No open PRD or question rows, no background jobs and no pending events were recorded in the standby runs: 2026-11-06-23-06-59-ff952b through 2026-11-07-04-48-29-efdfc0. The git status check was not possible for the primary working directory because it is not a git repository: 2026-11-07-03-16-17-d6bffb, 2026-11-07-03-26-49-fd2a93.
- Three cross-session delivery notices were not delivered because they repeated earlier messages; treated as unsent and not resent: 2026-11-07-05-12-23-7fdba4.
- The read-only verification of the prop-warehouse download checks were repeated with no new result: 2026-11-06-23-03-48-471b96 through 2026-11-07-01-04-58-1d48f0.

## Sources

- /workspace/spawn/runs/<run id>/log.jsonl (old name: spawn), end events (gaps and witness), refusal, error, abandoned, job-killed, job-stuck, recovery and mcp-server events
- /workspace/spawn/runs/<run id>/pending.jsonl (old name: spawn), pending job and job-killed events
- /workspace/spawn/runs/<run id>/jobs/ (old name: spawn), job state and output for the killed or timed-out jobs
- /workspace/savi/.spawn/kernel (old name: savi), named as the durable worker copy
- /workspace/spawn/maps/witness (old name: spawn), named as the provenance folder

See also: [runs-overview.md](runs-overview.md), [runs-timeline.md](runs-timeline.md), [runs-findings.md](runs-findings.md).
