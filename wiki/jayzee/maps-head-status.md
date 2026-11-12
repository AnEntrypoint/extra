# jayzee world head status lists

## How it works

Three plain-text lists in /workspace/spawn/maps/ (old name: spawn) record the world-store head status of jayzee feed worlds. Each list holds world uuids with the dashes removed (32 lowercase hex characters per line, one per line, LF line endings, no header). The head is the `head.json` document at `https://play.spawn.co/world-store/git/<uuid-no-dashes>/head.json`, which names the manifest of the world. The lists split the worlds by what that request returned.

| File | Lines | Meaning |
|---|---|---|
| /workspace/spawn/maps/head404-confirmed-worlds.txt (old name: spawn) | 256 | Worlds whose head.json returns 404 `{"error":"head_not_found"}` (26 bytes). This is the confirmed missing-head family. |
| /workspace/spawn/maps/head-present-manifest404-worlds.txt (old name: spawn) | 3 | Worlds whose head.json returns 200 with `"manifest":null` and `"seq":0`. Their head is present; no manifest is named. |
| /workspace/spawn/maps/open-missing-head-worlds.txt (old name: spawn) | 259 | The original missing-head list, kept as recorded. It is 256 confirmed missing-head worlds plus the 3 head-present worlds. |

Relations between the lists, checked for this wiki:

- All 256 lines of head404-confirmed-worlds.txt are in open-missing-head-worlds.txt. Lines of the first that are not in the second: 0.
- The lines of open-missing-head-worlds.txt that are not in head404-confirmed-worlds.txt are exactly the three lines of head-present-manifest404-worlds.txt: 5db79de6dae84ceca2ddb9b9a0e216d9, fd80e9d941624c2fbc48fc89193a7417 and ffb0a8fbdca948a5933be7bd62fb44b5.
- The head-present file and the 256 file are disjoint.
- All three files contain only 32-character lowercase hex lines (checked: zero non-matching lines in each).
- open-missing-head-worlds.txt is not in sorted order (its first lines are fb101c6db7ba4ab9af7facff58807b8d, a54ea9c0bd784ecea9af9cdc681162b2 and 8d1f75c7c5e64dc18f2c3549daa5ec3a; `sort -c` reports disorder at line 2). The order of head404-confirmed-worlds.txt was not checked.

The source record names the 256 file as the count to use for missing heads. The 259 file over-counts by the three head-present worlds.

### The 256 missing-head worlds

The first entries are 03ebf64172574b90ba8805e0f8a9b6d5, 040ed50417724f43a19c7c7d501e9dd2 and 04f9b249fd1a4528979370330e4a1d8d. The CDN scan, described in [maps-root-worlds.md](maps-root-worlds.md), logged the 259 worlds with no head.json as `manifest-parse` in its first pass, because the scanner did not check the head status. Its reconciliation found 256 head 404 stage failures (all `head_not_found`), all inside the 259 list.

The all-zero world 00000000… is not in any of the three lists. Its head.json was checked separately and returned 404 `head_not_found` (26 bytes), which is recorded in the learning record part 2 section 7. The world 9f7b1a067caa46e2b2c1c7dceb48bc2b is not in the lists either: its head status was 0 on first pass and 200 on re-check, as recorded in the root-worlds scan.

### The 3 head-present worlds

| World uuid | head.json on re-check | manifest |
|---|---|---|
| 5db79de6dae84ceca2ddb9b9a0e216d9 | 200 with `"manifest":null`, `"seq":0` | none named, so no manifest 404 is produced |
| fd80e9d941624c2fbc48fc89193a7417 | 200 with `"manifest":null`, `"seq":0` | none named |
| ffb0a8fbdca948a5933be7bd62fb44b5 | 200 with `"manifest":null`, `"seq":0` | none named |

The earlier description of these three as "head present, manifest 404" is corrected in the source. The filename head-present-manifest404-worlds.txt is kept for continuity.

## Decisions

- Keep the three lists separate rather than merge them. Evidence: the source says "The 259 list is still kept as recorded at the time and is not overwritten. Use the 256 file for the missing-head count."
- Keep the 259 list and correct it by the 256 and 3 split, rather than edit it. Evidence: the source says "The original 259 list over-counts by these 3."
- Keep the head-present filename although its description is corrected. Evidence: the source says "The filename is kept for continuity; the description is corrected here."
- Use the head.json status, not the manifest status, to define the missing-head family. Evidence: the scanner logged the 259 as `manifest-parse` because it did not check the head status; the reconciliation shows 256 head 404 and 3 manifest-less heads.
- Count the head 404 family as 256 with the same key, `head_not_found`. Evidence: the source records 256 head 404 stage failures, all `head_not_found`, and reconciles them against the 259 list with 0 outside the list.

## Open gaps

- The `head_not_found` count of 256 is the source's count; the source says it was "not re-counted" (3 sampled). The file has 256 lines, which matches the source's stage count.
- The condition for the drifted-head `unknown_world_store_key` case is OPEN (learning record part 2, section 7). It is not a head-list condition.
- The head status of world 9f7b1a067caa46e2b2c1c7dceb48bc2b was 0 on first pass and is not recorded in a list; its status on re-check is 200 (source, spawnfile-family scan).
- The three head-present worlds have no manifest, so no manifest-level status is recorded for them.
- The 77 first-pass status 0 refs are outside these lists and are unverified (source, Non-GLB types).

## Sources

- /workspace/spawn/maps/head404-confirmed-worlds.txt (old name: spawn)
- /workspace/spawn/maps/head-present-manifest404-worlds.txt (old name: spawn)
- /workspace/spawn/maps/open-missing-head-worlds.txt (old name: spawn)
- /workspace/spawn/maps/spawn-root-worlds-map.md (old name: spawn), sections "Full CDN scan result" and "Spawnfile-family scan and missing-head reconciliation"
- /workspace/spawn/maps/spawn-learning-record.md (old name: spawn), section 7 (error keys)
