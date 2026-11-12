# Netcode

## How it works

Two documents cover the netcode of the upstream platform, which is spoint (the read-only sibling at /workspace/spoint). gaps/netcode-optimization-gaps.md is the survey: a read-only pass over spoint at origin/main a85e9d8, with every claim cited as path and line. Each compression and lag-compensation claim is marked verified (read from the code, with the line cited) or unverified (not run or not located). docs/NETCODE-BRIEF-FOR-JAYZEE.md is the brief that turns the owner's decisions on that survey into work for jayzee (old name: spawn). cleetus documents spoint and instructs jayzee. It changes neither spoint nor jayzee and runs neither.

### The survey (gaps/netcode-optimization-gaps.md)

Section 1, coverage of src/netcode. The doc scan covered AGENTS.md, README.md, SKILL.md, docs/*.md (23 files) and plan/*.md. A module counts as documented when its file name appears in one of them. There are 35 modules in src/netcode, 11 named in some doc, and 24 named in none. The table gives each undocumented module with its exports and what the code shows, for example CollisionTileStreamer.js (streams collision tiles around a player), EventLog.js (append-only event log), Hitscan.js (server-side hit resolution, capsule hitbox centerHeight 0.9, radiusSq 0.36, height 1.8), InputGuard.js (rate-limits and clamps client input), LockstepChecksum.js, LockstepGameLoop.js and LockstepInputTransport.js, NetcodeProfile.js (profile selection), OutlierDetector.js (flags suspicious hit patterns), PeerSimSession.js and peerLoops.js (simulated peers for testing), ReplayFile.js, ReplayRecorder.js and ReplayPlayer.js (the replay format), RewindSpatialIndex.js (REWIND_SLOP 10, DEFAULT_REWIND_CELL_SIZE 16), RollbackGameLoop.js, RollbackInputTransport.js and RollbackLoop.js, SnapshotBinFormat.js and SnapshotPacker.js (binary snapshot format and packer), TeleportHold.js, TickSystemBase.js, WorkerBridgeProxy.js and controlFrame.js. The survey notes that nothing in the docs explains the control-frame prefixes, the replay file format, or how the three loops relate to the three netcode profiles beyond the headings of docs/netcode.md.

Section 2, lag compensation (src/netcode/LagCompensator.js and Hitscan.js). The history ring holds HISTORY_CAPACITY = 256 samples per player (line 3), and writes past capacity overwrite the oldest sample (lines 74 to 80). historyWindow is in milliseconds, and windowTicks = round(historyWindow * tickRate / 1000) (line 51). The default window is 1000 ms (line 38), which is 60 ticks at 60 Hz (line 4). The environment variable SPOINT_LAG_HISTORY_WINDOW sets the window (line 15) and appears in no doc. A reported tick more than FUTURE_TOLERANCE_TICKS = 1 ahead of the current tick is rejected (line 97). A reported tick older than the window is clamped to the oldest allowed tick (lines 98 to 99). Rewinds are rate-limited by a token bucket per shooter, capacity 10 and refill 20 per second (lines 6 to 7 and 105 to 106). validateShotOrigin allows a client origin up to 2 m from the shooter by default (lines 8 and 138). Samples between two ticks are blended with nlerpQuat (lines 23 and 131).

The survey also records a finding verified by running (/tmp/lag-overflow/run.mjs, an ephemeral probe). With 300 samples at 60 Hz:

- Window 4000 ms (240 ticks): the ring is not full (242 samples). A rewind to tick 0 is clamped to 59, the clamp counter rises by 1, and the returned sample is the stored tick 58.
- Window 5000 ms (300 ticks): the ring is full (256 samples), with the oldest stored tick at 44. A rewind to tick 0 resolves to 0, the clamp counter does not rise, and rewindAtTick returns the tick 44 sample. The overflow is silent.
- Window 4267 ms (256 ticks): the ring is full with the oldest stored tick at 44. The clamp target is 43 and the counter rises by 1, but the returned sample is tick 44, one tick off the clamp target.
- rewindAtTick returns the requested tick in its tick field, not the stored sample's tick, so the position shows the stored sample while the tick reports the request.

Undocumented items: the drift limit, the rewind bucket, the future tolerance and the environment override.

Section 3, compression and wire format (src/netcode/SnapshotBinFormat.js and SnapshotEncoder.js). BIN_RECORD_BYTES = 29 (line 4) and PLAYER_BIN_RECORD_BYTES = 22 (line 78). packQuat is smallest-three: the largest component is a 2-bit index, the other three are 10-bit fields scaled by QSCALE = 511 * sqrt(2) (line 2), in a 32-bit word (lines 106 to 120, and line 21). Position is clamped to a signed 32-bit wire range (POS_I32_MAX, lines 5 and 18), velocity to i16 (line 17), and scale to u16 (lines 6 and 19). A non-finite or out-of-range value throws RangeError (lines 12 to 14). The reduced tier, PLAYER_TIER_REDUCED = 1 (line 40), has pose fields (REDUCED_POSE_FIELDS) and a height-absent flag (REDUCED_HEIGHT_ABSENT). Pitch is quantised to one byte over [-pi/2, pi/2] and yaw to one byte over a full turn, packed into one 16-bit field (SnapshotEncoder.js lines 24 to 27). The self block carries the viewer's own input sequence, input depth, ground normal and wall planes (SnapshotEncoder.js lines 30 to 39). snapshotHead probes the live packer once per type and memoises it for the process, so it is valid only while WIRE_STRUCTURES in src/protocol/msgpack.js is fixed (header comment in SnapshotPacker.js). Player records are packed once and copied into each viewer's bytes (the same header).

WIRE_UNITS_PER_METER is defined at src/netcode/SnapshotBinFormat.js line 1 as 100. Its uses (lines 5 to 9, 13, 50, 51, 64, 66 and 101) are all in that one file. The survey notes that a gm grep over the whole spoint root returned no matches and so was unreliable; the per-directory searches are the valid ones.

Wire record sizes were checked by running (/tmp/wire-layout/check.mjs, ephemeral): BIN_RECORD_BYTES 29, PLAYER_BIN_RECORD_BYTES 22, and both pack functions allocate the stated lengths. The result is PASS, five wire-layout assertions.

The documentation coverage check: docs/performance-optimization.md Part 9 mentions unoptimised snapshots, and Part 6 Example 4 mentions snapshot compression for 20 or more players, but no doc gives the bit layouts or byte budgets.

Section 4, systems optimization. docs/performance-optimization.md covers frame budget, profiling, physics pooling, LOD and snapshot size for creators, and docs/performance.md holds measured findings for one terrain case. Not documented: the per-player history ring and its 256-sample cap; SnapshotPacker's per-type memo and the rule that it is valid only while wire structures are fixed; the CollisionTileStreamer ring sizes (COLLISION_TILE_RING, COLLISION_TILE_FORGET_RING); the RewindSpatialIndex cell size (16) and slop (10); and the worker bridge (WorkerBridgeProxy.js) and tick base (TickSystemBase.js).

Section 5, subagent concurrency. Spoint's docs have no mention of subagent concurrency (zero hits for subagent and maxInflight). The survey notes that gm's served skill and run events report maxInflight 8 by default, and that a body which runs past its budget becomes a background run. Neither is written in spoint. The concurrency rules live in gm, not in spoint.

Section 6, open items for the owner. Five questions were put to the owner: whether docs/netcode.md gets a section for the 24 modules or a generated index is enough; whether to size the ring from the window or clamp the window to 255 ticks; whether to document the wire scale; whether the wire layouts belong in a doc or only in code comments; and whether to document the gm concurrency defaults in spoint or link to gm.

### The brief (docs/NETCODE-BRIEF-FOR-JAYZEE.md)

The owner decided the five items on 2026-11-08, recorded as OPEN-024 in [open-items.md](open-items.md). The brief records the decisions:

- Adopted J1 (owner item 2), sized from the window: the rewind ring capacity is windowTicks + 1, not a fixed 256, so the 1000 ms default still gives 61 slots at 60 Hz. rewindAtTick returns the stored sample's tick in its tick field. A clamp increments the clamp counter in every case where the requested tick is older than the oldest stored tick (spoint lines 98 to 99). Witness: a test drives 300 samples at 60 Hz with a 5000 ms window, rewinds to tick 0, and asserts the clamp counter rises by 1 and the returned sample tick equals the oldest stored tick. A second case at 4267 ms asserts the returned sample tick equals the clamp target.
- Adopted J2 (owner items 3 and 4), wire layouts in a doc: jayzee writes docs/netcode-wire.md and states as prose WIRE_UNITS_PER_METER = 100, BIN_RECORD_BYTES = 29, PLAYER_BIN_RECORD_BYTES = 22, packQuat as smallest-three with QSCALE, the reduced tier, and the self block. Witness: a test packs one bin record and one player record and asserts the lengths 29 and 22, and a script asserts every constant in J2 appears in docs/netcode-wire.md.
- Adopted J3 (owner item 1), generated module index: docs/netcode-modules.md is generated from src/netcode with one row per module, its exports and a one-line purpose. Witness: the script prints modules N documented N with equal numbers, and fails if any of the 24 named modules is missing.
- Dropped: owner item 5 (document gm maxInflight 8) is not a jayzee change, because the default is a gm run setting. If the owner wants it documented, it belongs in gm.

The brief explains each change with its spoint reference. The reason for J1 is the spoint run in section 2 of the survey, where a 5000 ms window overflowed the 256-sample ring silently and a 4267 ms window clamped to tick 43 but returned the tick 44 sample. The brief rejects clamping the window to 255 ticks, because that changes the window the caller configured. The reason for J2 is the owner's comment rule: layouts go in the doc and the constants stay in code. Jayzee reports each item as built or open with its witness output, and cleetus records a brief item in OPEN-024 only when jayzee reports it. OPEN-024 stays OPEN until then.

## Decisions

- Document spoint and instruct jayzee, rather than change spoint or jayzee directly (brief header). cleetus does not run either tree.
- Size the rewind ring from the configured window, not clamp the window to 255 ticks, so the window the caller configured is kept (J1 rationale).
- Put wire layouts in a prose doc (docs/netcode-wire.md) and keep the constants in code, because the owner's comment rule forbids comment prose (J2 rationale).
- Generate the module index from src/netcode rather than hand-write it, so it does not drift (J3 rationale).
- Drop the gm maxInflight item for jayzee, because the default belongs to gm (owner item 5).
- Keep the spoint behaviours that jayzee found weaker documented as findings, and mark them verified or unverified, with the evidence cited.

## Open gaps

- OPEN-024 (OPEN): jayzee has not yet reported the witnesses for J1, J2 and J3. Owner item 5 is dropped for jayzee and has no owner record in cleetus beyond the drop.
- The lag overflow was verified by an ephemeral probe in /tmp, which is not a committed source; the claim stands as recorded.
- The crowd-dot decode bug in spoint (cx above 0 with cz below 0), recorded under jayzee row 17, is kept and pinned in jayzee, not fixed.
- The environment override SPOINT_LAG_HISTORY_WINDOW and the drift limit are undocumented in spoint.
- The 24 modules are not documented in spoint. The owner question (a section in docs/netcode.md or a generated index) is answered in favour of the generated index in J3.
- The gm concurrency defaults (maxInflight 8) are not documented in spoint and are dropped for jayzee.

## Sources

- /workspace/savi/gaps/netcode-optimization-gaps.md (old name: savi)
- /workspace/savi/docs/NETCODE-BRIEF-FOR-JAYZEE.md (old name: savi)
- /workspace/savi/docs/OPEN-ITEMS.md (old name: savi)
- /workspace/savi/docs/JAYZEE-GAPS.md (old name: savi)
- /workspace/spoint/src/netcode/LagCompensator.js
- /workspace/spoint/src/netcode/Hitscan.js
- /workspace/spoint/src/netcode/SnapshotBinFormat.js
- /workspace/spoint/src/netcode/SnapshotEncoder.js
- /workspace/spoint/src/netcode/SnapshotPacker.js
- /workspace/spoint/src/netcode/RewindSpatialIndex.js
- /workspace/spoint/src/netcode/TickSystemBase.js
- /workspace/spoint/src/netcode/PeerSimSession.js
- /workspace/spoint/src/netcode/peerLoops.js
- /workspace/spoint/src/protocol/msgpack.js
- /workspace/spoint/docs/performance-optimization.md
- /workspace/spoint/docs/performance.md
- /workspace/spoint/src/sdk/WorkerEntry.js
- /workspace/spoint/src/sdk/Relocation.js
- /workspace/jayzee/docs/netcode-wire.md (to be written by jayzee)
- /workspace/jayzee/docs/netcode-modules.md (to be generated by jayzee)
