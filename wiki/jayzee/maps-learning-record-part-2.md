# jayzee learning record, part 2 (error keys, non-CDN refs, open items, name decode, /cdn/ attempt)

## How it works

This page is part 2 of the jayzee learning record. It carries sections 7 to 11 of /workspace/spawn/maps/spawn-learning-record.md (old name: spawn), in the record's order. Part 1 carries sections 1 to 6. The probes listed here are single requests, one class each, against the public world-store and CDN hosts (play.spawn.co, spawnfile.io, www.spawn.co). The record states that a probe result is a scoped observation and not a rule.

### 7. Error keys on world-store (scoped observation)

Re-witnessed in the audit with one GET each (`curl -sS -m 15`, base `https://play.spawn.co/world-store`).

- `value_not_found`, condition: absent hash. `GET /values/<64 zeros>` returns 404 application/json, 27 bytes, `{"error":"value_not_found"}`. `GET /values/<64 f>` returns 404 application/json, 27 bytes, the same body. `GET /manifests/<64 zeros>` returns 404 application/json, 101 bytes, `{"error":"value_not_found","hash":"0000…0"}`. `GET /manifests/<64 f>` returns 404 application/json, 101 bytes, the same shape with the `f` hash echoed. Present controls: `GET /values/3fa9a434…` returns 200 application/octet-stream, 1266 bytes; `GET /manifests/5a526ee6…` returns 200 application/octet-stream, 513116 bytes. Scoped reading: two absent 64-hex hashes return `value_not_found` on both paths, so the key is not specific to the all-zero hash. Two absent hashes were tested; this is not a rule for all absent hashes.
- `unknown_world_store_key`, REPRODUCED once by a path-level probe. Class: a valid 32-hex world uuid with a non-existent resource name. `GET https://play.spawn.co/world-store/git/41cd46499614484ca9261ce32e257e22/head.jsn` returns 404 application/json, 35 bytes, `{"error":"unknown_world_store_key"}`. Its control, the same world with the correct name, `GET …/41cd46499614484ca9261ce32e257e22/head.json`, returns 200 application/json, 1673 bytes, with `"manifest":"3fa9a434…"`. One request each, one class. Scoped reading: a misspelled resource under a known world gives `unknown_world_store_key`. The original cleetus case (drifted head, manifest 3fa9a434…) is still NOT reproduced, so the condition for that case is OPEN. Do not generalise from one request.
- `unknown_world_store_key`, past observation, not reproduced: cleetus recorded one case (world `41cd4649…`, head naming manifest `3fa9a434…`, 404 `unknown_world_store_key`). In the audit, `GET /manifests/3fa9a434…` returned 200 application/octet-stream, 513116 bytes, on two GETs. `GET /git/41cd4649…/head.json` returned 200 with `"manifest":"3fa9a434…"` and `"seq":553`, so the head drift is still there but the 404 is not. The two saved bodies (/tmp/spawn-probe/r-8244be9f.bin (old name: spawn), /tmp/spawn-probe/mf-gta-earth-head.bin (old name: spawn)) hold only the error text and no URL, so the condition that selects this key cannot be characterised. Kept as one past observation.
- Head drift on a second world: `GET /git/4e709464…/head.json` (GTA Earth) returns 200, `"manifest":"b0d8aa7e…"`. The earlier scan used manifest `d0d3c548…`, which still returns 200 (186349 bytes). Scoped to one world; not a rule.
- `head_not_found`: `GET /git/<uuid>/head.json` returns 404 application/json, 26 bytes, `{"error":"head_not_found"}` for `03ebf641…` and `040ed504…` (the first two entries of /workspace/spawn/maps/head404-confirmed-worlds.txt (old name: spawn)) and for the all-zero world `00000000…`. This key was not recorded before. The count of 256 is record-reported and was not re-counted; 3 were sampled.
- The earlier note "all-zero world head.json timed out (15 s)" is superseded. The audit GET returned 404 `head_not_found` (26 bytes). The timeout observation is not reproduced.
- /workspace/spawn/maps/head-present-manifest404-worlds.txt (old name: spawn) (3 worlds): the earlier record described these as head present, manifest 404. All 3 (`5db79de6…`, `fd80e9d9…`, `ffb0a8fb…`) return head.json 200 with `"manifest":null` and `"seq":0`. No manifest is named, so no manifest 404 is produced. The filename is kept for continuity; the description is corrected here.

### 8. Non-CDN refs (2 OPEN, 81 resolved)

- /workspace/spawn/maps/unverified-noncdn-refs.tsv (old name: spawn): 83 data rows. The record says 81 resolved with first-pass status 200. In the TSV itself the `first_pass_status` column is 0 for all 83 rows and the 200 values sit in the `retry_status` column; see maps-noncdn-refs.md for the class table.
- ttf, world `c355fcf8468745feb0b2ba8254aa4dee`, sha `d5558cd4…`: retry status 401. OPEN. Recorded as is, not bypassed. The same world has a second ttf row (sha `39a77b90…`, first pass 200 font/ttf), counted in the 81 200s and in section 11's font/ttf 1. Re-counted in the audit from the TSV: 200 = 81, 401 = 1, UND_ERR_CONNECT_TIMEOUT = 1 (mp4), total 83.
- mp4, world `b185f36d…`, sha `537d6321…`: first pass UND_ERR_CONNECT_TIMEOUT. Bounded retry (one GET, `curl -sS -m 60`, URL `https://play.spawn.co/cdn/value.537d6321e14ca1fec788632ca4dcce598c8c901bdf123681d0119caab7815a2c.mp4`): status 200, type video/mp4, 2350318 bytes received of 46469835 before the 60 s limit, first bytes `ftyp isom`. The connect timeout did not recur. Full body: 12 ranged GETs of 4194304 bytes (last chunk 332491), `curl -r`, 120 s per attempt, resumed with `curl -C`-style offsets for 3 chunks that hit the limit. Concatenated in order: 46469835 bytes (equal to the `content-range` total). sha256 = 537d6321e14ca1fec788632ca4dcce598c8c901bdf123681d0119caab7815a2c, which MATCHES the claimed sha. The mp4 full body and sha are CONFIRMED for this object (scoped to this one fetch). Also HEAD in the /cdn/ probe: 200 video/mp4.

### 9. Still OPEN, with reasons

- `/cdn/`-only: INFERRED. Scanned set only. The /cdn/ probe in section 11 shows named keys reach bytes through a 302 to a different origin path, so the claim is weakened for that family and is not promoted.
- spawnfile.io bytes: UNCONFIRMED. No model bytes in four earlier probes. Bounded HEAD attempt on the FAULTS F3 path prefix (no leaf, so the elided timestamp is not needed): `https://spawnfile.io/` returns 200 text/html; `https://spawnfile.io/prod/` returns 404 text/plain; `https://spawnfile.io/prod/character-assets/` returns 404 text/plain (HEAD); one GET of the same prefix returns 404 text/plain, 10 bytes, body `Not Found\n`. No model bytes. Probe class 2 (GET, F3 prefix with no trailing slash, `https://spawnfile.io/prod/character-assets`) returns 404 text/plain, 10 bytes, body `Not Found\n`. Re-witnessed in the audit with the same status, type, size and bytes (`od -c`: `N o t _ F o u n d \n`). No model bytes; the leaf is still not reached. The leaf `<unix-ms>-savi-reduced-fitted.glb` is elided and was not guessed.
- Spawnfile key path: ELIDED in cleetus FAULTS F3. Scoped negatives in section 4.
- Bucket rule: UNDETERMINED (part 1, section 5).
- Encoder: partial. `/` → `~2f` is witnessed on 307 keys and 11987 keys. `:` → `~3a` is witnessed only in FAULTS F3 text (elided). `~` → `~7e` is unwitnessed in data (encode code and a jayzee fixture only).
- Gone 410: OPEN, 41 probes, no body-level 410 (part 1, section 6).
- Two 404 error keys (section 7): `value_not_found` is reproduced for two absent hashes on two paths. `unknown_world_store_key` is reproduced once for a misspelled resource under a valid world (`head.jsn`), and not reproduced for the original drifted-head case (`3fa9a434…` now returns 200). The condition selecting the drifted-head case is OPEN. No rule is promoted.
- Two non-CDN refs: section 8.
- 9 vs 308 named cdn keys: the 9 are the text-visible subset of the 308 decoded named keys. Not promoted beyond the observation.

### 10. Name decode direction (witnessed)

- Decode `~2f` → `/` and `~3a` → `:` (witnessed on keys; `~3a` only in text sources).
- Encode `/` → `~2f` is witnessed on 307 text-visible keys (`node encoder-test.mjs`, roundTripEncodeOfDecode 307) and on all 11987 decoded keys (round trip `encode(decode(name)) === name`, 11987/11987, fails 0, run over `dt/keys-unique.txt`).
- Re-run for this wiki: /workspace/spawn/maps/witness/encoder-bucket/encoder-test.mjs (old name: spawn) returns `distinctKeys 11987, escapes {"~2f":23974}, roundTripEncodeOfDecode 11987, fails []`. Its inputs are the probe tree and the witness tree, so the 11987 figure reproduces only with /tmp/spawn-probe (old name: spawn) present. The `dt/keys-unique.txt` file named by the record is not in the maps tree.

### 11. /cdn/-only attempt (INFERRED claim, probed, not promoted)

Claim under test: every GLB and asset is served from `https://play.spawn.co/cdn/`. Scope: 308 named `/cdn/` keys (no sha), 20 value-sha controls, 10 named controls with the `.yaml` suffix kept, and the 83 non-CDN data rows from /workspace/spawn/maps/unverified-noncdn-refs.tsv (old name: spawn). Method: HEAD with redirect not followed, 8-way concurrency, 15 s timeout. Script: /tmp/spawn-probe/probe-cdn-named.mjs (old name: spawn), ephemeral; output /tmp/spawn-probe/cdn-named/results.jsonl (old name: spawn). Tally: `{"named-cdn-stripYaml 302":304, "named-cdn-stripYaml error":4, "named-cdn-withYaml-control 401":10, "value-sha-control 200":20, "noncdn-ref 200":82, "noncdn-ref 401":1}`.

- Named keys, `.yaml` stripped (the served form): 304 of 308 return 302. The 302 `location` is `https://play.spawn.co/value-origin/dev/magic-assets/v5/values/<sha64>.glb?_av=raw1`, which is not under `/cdn/`. HEAD of the 304 distinct locations: 302 return 200 model/gltf-binary, and 2 time out (15 s). The 4 first-pass timeouts were retried once: all 4 return 302. Bounded retry of the 2 timed-out targets (HEAD, then GET range 0-3): both HEAD 200 model/gltf-binary, and the range GET returns 206 with bytes `glTF`. Following the redirect for the 4 retried named URLs: all 4 HEAD 200 model/gltf-binary. Across all 308 named keys, every redirect target returns 200 model/gltf-binary on HEAD. Body check: range GET bytes=0-3 on all 308 distinct redirect targets returns 206 model/gltf-binary with magic `glTF` (308/308; 306 in the first pass, 2 first-pass TypeError then 206 on a sequential retry).
- Named keys, `.yaml` kept (the file-map name, not the served form): 10 of 10 return 401 application/json. The file-map key is not a served path.
- Value-sha controls: 20 of 20 return 200 model/gltf-binary directly under `/cdn/value.<sha>.glb`.
- Non-CDN data rows: 82 return 200 (image/png 31, image/jpeg 15, audio/mpeg 11, video/mp4 12, model/gltf-binary 6, image/webp 4, image/gif 2, font/ttf 1). 1 returns 401: the ttf `value.d5558cd4…ttf` (world c355fcf8…), OPEN as a credentialed-looking refusal and not bypassed. The mp4 (world b185f36d…) returns 200 video/mp4 on HEAD.

Result: the `/cdn/` URL answers for named keys, but the bytes are served from `value-origin` through a redirect, so the URL path is not `/cdn/`-only for that family. The `/cdn/`-only claim is still INFERRED and is weakened for named keys. Of the 304 distinct redirect targets, 302 return 200 model/gltf-binary on the first pass and 2 time out. On retry those 2 return 200 model/gltf-binary with magic `glTF`, so the named-key redirect targets are all witnessed as 200 model/gltf-binary on HEAD (the earlier timeouts are no longer open).

## Decisions

- Report error keys as scoped observations, one row per key with its class and its control. Evidence: section 7 gives a control request for each reproduced key (`head.json` 200 against `head.jsn` 404) and says "do not generalise from one request".
- Keep the non-CDN class 401 as OPEN and do not bypass it. Evidence: sections 8 and 11 record the 401 for the ttf `d5558cd4…` as "not bypassed". The record uses the phrase "credentialed-looking refusal".
- Correct, rather than delete, the earlier head-present description. Evidence: section 7 says the filename is kept for continuity and the description is corrected.
- Record the name decode direction as witnessed only where a script or count backs it. Evidence: section 10 gives the round-trip count 11987/11987 and the `~2f` escape count from encoder-test.mjs.
- Keep the /cdn/-only claim as INFERRED. Evidence: section 11 shows the named-key redirect to value-origin, so the claim is not promoted.

## Open gaps

- The condition that selects the drifted-head `unknown_world_store_key` case is OPEN (section 7).
- The 410 status is OPEN (part 1, section 6).
- The ttf sha d5558cd4… returns 401 and is OPEN, not bypassed (section 8).
- spawnfile.io model bytes are UNCONFIRMED (section 9). The leaf name is elided in cleetus FAULTS F3.
- The `~7e` encoding is unwitnessed in data (section 9).
- The `/cdn/`-only claim is INFERRED and weakened for named keys (section 11).
- The probe scripts (/tmp/spawn-probe/probe-cdn-named.mjs (old name: spawn) and the others) and their outputs are ephemeral and are not in maps/.

## Sources

- /workspace/spawn/maps/spawn-learning-record.md (old name: spawn), sections 7 to 11
- /workspace/spawn/maps/head404-confirmed-worlds.txt (old name: spawn)
- /workspace/spawn/maps/head-present-manifest404-worlds.txt (old name: spawn)
- /workspace/spawn/maps/unverified-noncdn-refs.tsv (old name: spawn)
- /workspace/spawn/maps/witness/encoder-bucket/encoder-test.mjs (old name: spawn)
- /tmp/spawn-probe/probe-cdn-named.mjs (old name: spawn), ephemeral
- /tmp/spawn-probe/cdn-named/results.jsonl (old name: spawn), ephemeral
- /tmp/spawn-probe/r-8244be9f.bin (old name: spawn), ephemeral
- /tmp/spawn-probe/mf-gta-earth-head.bin (old name: spawn), ephemeral
