# jayzee learning record, part 1 (denominators, corpus, keys, escapes, bucket rule, 410)

## How it works

This page is part 1 of the jayzee learning record. It carries sections 1 to 6 of /workspace/spawn/maps/spawn-learning-record.md (old name: spawn). The record states that every figure is jayzee-reported and scoped to what was reached, and that nothing in it is a universal claim. Each figure names its denominator, and the denominators are kept separate and never merged.

The record's provenance paths under /tmp/spawn-probe (old name: spawn) are ephemeral. Durable copies of the 2580-row results and verify-v3.mjs are in /workspace/savi/spawn-evidence/ (old name: savi) (old name: spawn), at cleetus commit e88b95c.

The witness scripts in /workspace/spawn/maps/witness/ (old name: spawn) were re-run for this wiki on the disk copy. Their outputs are recorded on the witness page, where each figure below that has a script can be checked.

### 1. Denominators (keep separate, never merge)

| Denominator | Value | Meaning | Witness |
|---|---|---|---|
| Text-visible file-map keys | 307 | Distinct `world.assets/<hh>/...yaml` keys found in text files under /tmp/spawn-probe (old name: spawn) and the witness maps. Historical original: `encoder-test.mjs` over 1173 files, `distinctKeys:307`. Not reproducible from the original input, which is not preserved. Durable reproduction: `node witness/text-visible-307-derive-durable.mjs` reads only `witness/text-visible-307-inputs/` (38 content-addressed inputs, 6.6 MB, each file named by its sha256, `hashMismatches:0`) and prints `distinctKeys:307, valueSha:298, namedNoSha:9, tilde2fOccurrences:614, tilde3a:0, tilde7e:0`. The key list `witness/text-visible-307-keys.txt` is the same set. The original 1173-file scope is not reproduced. The completeness of the 67 contributing paths (38 unique contents) rests on an ephemeral mtime-cutoff scan of 1154 files (`witness/text-visible-307-derive.mjs`), recorded in `witness/text-visible-307-inputs.sha256.txt`. | `witness/text-visible-307-keys.txt`, `witness/text-visible-307-derive.mjs` |
| Unique decoded-frame keys | 11987 | Distinct `world.assets/<hh>/...yaml` keys matched in decoded frames of the 2580 manifests | `node reconcile-gap.mjs` gives `kwUniqueAcrossAll:11987` (re-run in audit, same value) |
| Maps-only keys | 288 | Distinct `world.assets/<hh>/...yaml` keys in the maps tree, EXCLUDING `witness/text-visible-307-inputs/` (the 38 inputs of the 307 derivation). Re-run in audit: `{"files":78,"filesWithKeys":25,"distinctKeys":288}`. The earlier figure "77 files" was a file-count of a different scope; the key count 288 held. Running `witness/text-key-census.mjs` over the whole maps tree returns 307, because it includes the inputs, so the exclusion is required. | Inline census over /workspace/spawn/maps (old name: spawn) minus the inputs directory (audit re-run) |
| Manifests | 2580 | World-store manifests reached (manifest hash from /cdn-scan pairs) | Durable: /workspace/savi/spawn-evidence/data/manifests-all-v3-results.jsonl (old name: savi) (old name: spawn), 2580 rows, 2580 unique `m` (re-counted in audit). Ephemeral: /tmp/spawn-probe/v3/results.jsonl (old name: spawn) |
| Worlds with /cdn/ GLB refs | 399 | Worlds with at least one `/cdn/` GLB ref | maps/glb-urls-all.tsv (old name: spawn), 2416 GLB rows, 399 distinct worlds (re-counted in audit) |

Within the 11987: 11679 keys carry a value sha (`~2fcdn~2fvalue.<sha64>.<ext>.yaml`) and 308 are named (`~2fcdn~2f<name>.<ext>.yaml`, no sha). All 11987 start `~2fcdn~2f`. None fall outside `/cdn/`.

### 2. Manifest corpus (2580)

- All 2580 manifests returned HTTP 200 on the scan. Witness: `SUMMARY {total:2580, rows:2580, status200:2580, nonOk:0}` from `verify-all-manifests.mjs` (run verify-magic-b, exit 0). This script is not in maps/; only its summary line is recorded.
- Frames: 229921 in total.
- Chain: every manifest's frame chain ends exactly at EOF (2580/2580). Frame count equals sheet hash count (2580/2580). Frames are ordered against sheet hashes (orderedFrames 229921).
- Decode-before-hash: a frame is decoded only when it begins `1f 8b 08`. There is 1 gzip frame in the whole corpus (manifest `d048ad06…fca`, frame index 2, length 175). Its decoded sha256 equals `sheet.hashes[2]` (`13abafd8…9314`). Witness: `gzipFrames:1, gzipDecodedMatch:1, gzipFail:0, rawMatch:229920`. Scoped to the 2580 reached: 2580/2580 decode-before-hash.
- Sibling passes over all 2580 sheets: raw hash `0016de86…9a132` is found in 0 sheets. Decoded hash `13abafd8…9314` is found only in its own exception sheet.

### 3. Key-occurrence counts and the three `~2f` scopes

- Raw key occurrences: 12259 (sum of `keyCount` over the 2580 rows; equals the sum of `worldAssets`).
- Per-manifest unique key occurrences: 12186. The 73 difference is the same key repeated within one manifest, across 61 manifests (`withinManifestRepeatSum:73`, `negativeDiffs:0`).
- Unique keys across the scope: 11987. The 199 difference from 12186 is cross-manifest duplicates.
- `~2f` scopes. Each key carries exactly two `~2f`:
  - 24518 = 2 × 12259, raw occurrences across all decoded frames (frame-level TILDE regex over every decoded frame).
  - 24372 = 2 × 12186, per-manifest unique key lines.
  - 23974 = 2 × 11987, unique keys.
- Frame-level tilde tokens over all decoded frames: `~2f` 24518, `~3a` 0, `~7e` 0. Other tilde-like tokens (about 89 in total) are not key escapes and are not classified.

### 4. Escape and spawnfile negatives (SCOPED, not universal)

- `~3a`: 0 of 307 text-visible keys; 0 of 11987 unique decoded keys; 0 frame-level tokens in decoded frames of the 2580.
- `~7e`: 0 reached occurrences in text-visible keys; 0 in unique decoded keys; 0 frame-level tokens.
- Bare tilde in keys: 0 at both scopes.
- spawnfile: `manifestsWithSpawnfile:0`, `spawnfileOccurrences:0` across decoded frames of the 2580. Seven candidate key classes, all 0 across 11987 decoded keys: `spawnfile`, `https~3a`, `~3a`, `character-assets`, `savi-reduced`, `fitted`, `prod~2f`.
- These are negatives within the reached scope only. The 307-key census covers text-visible keys only, and the 11987-key scan covers decoded frames of 2580 manifests only.

### 5. Bucket rule for `world.assets/<xx>/`

Status: UNDETERMINED. Both families are falsified, not promoted.

- Sha-only functions falsified: `19b737ea8843…` appears as `…jpeg.yaml` under bucket `87` and as `…jpg.yaml` under bucket `f6`. Ten sha-based and rest-based hypotheses are at chance. Denominator 11679 sha keys, except the two items marked "of 11987" (`sha256(rest)`, `sha256(key)`), which use all 11987 keys. Audit status: NOT re-run as the record's own figures. The counts are record-reported (see the re-run note below). The falsifier was re-witnessed in the audit. Counts: (`sha[0:2]` 47, `sha[-2:]` 53, `sha256(sha)[0:2]` 36, `md5(sha)[0:2]` 49, `sha1(sha)[0:2]` 40, `sha256("value."+sha+"."+ext)[0:2]` 47, `sha256(rest)[0:2]` 51 of 11987, `sha256(key)[0:2]` 55 of 11987, `sha256("/cdn/value."+sha+"."+ext)[0:2]` 50, `sha256("/cdn/value."+sha+"."+ext+".yaml")[0:2]` 44). Chance 1/256 ≈ 0.00391.
- World-identity hypotheses (11857 keys in one world, chance ≈ 46.3 hits): `uuid_nodash[0:2]` 54, `uuid_nodash[-2:]` 30, `sha256(uuid_nodash)[0:2]` 53, `sha256(uuid)[0:2]` 52, `md5(uuid_nodash)[0:2]` 38, `manifest[0:2]` 42, `sha256(manifest)[0:2]` 64 (+2.6σ on one of 15 tests, not promoted), `sha256(uuid_nodash+rest)[0:2]` 54, `sha256(uuid+"/"+rest)[0:2]` 48, `sha256(uuid_nodash+"/"+rest)[0:2]` 47, `sha256(rest+uuid_nodash)[0:2]` 60, `sha256(manifest+rest)[0:2]` 51, and with a sha (n=11552) `sha256(uuid_nodash+sha)[0:2]` 39, `sha256(sha+uuid_nodash)[0:2]` 36, `sha256("/cdn/"+sha+"."+ext)[0:2]` 47.
- Observed: 130 keys appear in 2 to 5 worlds with a single bucket each (the bucket is in the key string, so this only shows that shared content keeps one bucket).
- Re-run note for this wiki: /workspace/spawn/maps/witness/encoder-bucket/bucket-test.mjs (old name: spawn) was run on the disk copy. It walks /tmp/spawn-probe (old name: spawn) and the witness tree, finds 11679 distinct (bucket, sha, ext) pairs across 256 buckets, and returns scores `sha256_of_sha_hex_prefix` 47, `sha256_of_name` 50, `sha256_of_keyname` 54, `sha256_of_sha_bytes` 34, `sha256_of_sha_string` 36, `md5_of_name` 45, `sha1_of_name` 51, `sha256_of_ext` 34. Four record figures reproduce exactly (`sha[0:2]` 47, `sha256(sha)[0:2]` 36, the `/cdn/value.` name hash 50 and the key hash 54 on 11679 pairs, against the record's 55 on 11987). The md5 and sha1 entries do not match the record (45 and 51 against 49 and 40), because the script defines them over the "/cdn/value." name, not over the bare sha. The record's ten-function list is therefore not fully reproduced by any script in the tree.
- /workspace/spawn/maps/witness/encoder-bucket/bucket-test3.mjs (old name: spawn) tests frame-body, frame-whole, key-text and value-sha hypotheses over 279 distinct keys in decoded frames of the sample; all four counts are 0. This is consistent with the bucket being not a function of the frame body or of the key text.

### 6. Gone 410 (OPEN)

- 41 probes, no body-level 410. The total of 41 is record-reported. Durable bodies exist only for the classes of probes 39 to 41 (`witness/ra-*.body`, `witness/rb-*.body`). Probe 41 class: resolve-adventure for a feed world absent from the 74-entry root map (`@maguer/astroimpero-blitz`, from /workspace/savi/spawn-evidence/data/feed-worlds.json (old name: savi) (old name: spawn), not in the root map). Result: status 200, 240 bytes, `type:found`, `worldId 60c01514-…`. Negative, stopped as instructed.
- Probe 39 class: resolve-adventure with a bare world uuid as the address. Result: status 200, 41 bytes, body `{"ok":true,"result":{"type":"not_found"}}`.
- Probe 40 class: resolve-adventure with a percent-encoded address (`%40borickk%2Fgta-earth`, the found adventure from `witness/ra-0.body`). Result: status 200, 225 bytes, body `type:found`, the same as the plain form.
- Earlier resolve-adventure probes returned found, not_found, 400 Invalid query, and 308/307 redirects with body "Redirecting...".

The witness bodies match these descriptions: ra-0, ra-3 and ra-5 are `type:found` for worldId 4e709464-ecfc-408f-980a-c3b5b46b0ee3 (GTA Earth); ra-1, ra-2, ra-4, ra-6 and ra-7 are `type:not_found`; rb-0 and rb-1 are `{"ok":false,"error":"Invalid query"}`; rb-2 to rb-4 are the text "Redirecting..."; rb-5 is `type:found` for Deepfall (worldId 4b37bdd8-06b1-42e4-980a-443e48806c1f); rb-6 and rb-7 are `type:found` for GTA Earth. The 410 status itself is not present in any body, so the 410 status is OPEN.

## Decisions

- Keep the denominators in separate rows and never merge them. Evidence: section 1 of the record lists five denominators (307, 11987, 288, 2580, 399), each with its own witness, and the record says "keep separate, never merge".
- Count the maps-only keys with the inputs excluded. Evidence: the census over the whole maps tree returns 307 (re-run for this wiki: `filesScanned 116, filesWithKeys 63, distinctKeys 307`), while the census over the inputs alone returns 307 (`filesScanned 38, filesWithKeys 38`). The 288 figure needs the exclusion, as the record states.
- Decode a frame only when it begins with the gzip magic. Evidence: the record's section 2 gives the single gzip frame and its match, gzipFail 0.
- Record the bucket rule as UNDETERMINED rather than promote any hypothesis. Evidence: section 5 gives 10 sha hypotheses and 15 world-identity hypotheses, all within chance or flagged +2.6σ on one of 15 tests, and the re-run in this wiki matches only some of them.
- Report 410 as OPEN. Evidence: section 6 records 41 probes with no body-level 410, and the witness bodies contain no 410.

## Open gaps

- The 307 count is not reproducible from the original 1173-file input, which is not preserved (section 1).
- The original 1173-file input and the ephemeral probe tree /tmp/spawn-probe (old name: spawn) are not in maps/.
- Bucket rule: UNDETERMINED. The md5 and sha1 hypotheses in the record do not match the script in the tree (section 5).
- The ten-function list of the bucket rule is not fully reproduced by a script in the tree (section 5).
- Gone 410: OPEN. 41 probes, no body-level 410 (section 6).
- The record's 41-probe total is record-reported; only the bodies of the classes listed above are in the tree.

## Sources

- /workspace/spawn/maps/spawn-learning-record.md (old name: spawn), sections 1 to 6
- /workspace/spawn/maps/witness/text-visible-307-keys.txt (old name: spawn)
- /workspace/spawn/maps/witness/text-visible-307-derive-durable.mjs (old name: spawn)
- /workspace/spawn/maps/witness/text-visible-307-derive.mjs (old name: spawn)
- /workspace/spawn/maps/witness/text-visible-307-inputs.sha256.txt (old name: spawn)
- /workspace/spawn/maps/witness/text-key-census.mjs (old name: spawn)
- /workspace/spawn/maps/witness/encoder-bucket/encoder-test.mjs (old name: spawn)
- /workspace/spawn/maps/witness/encoder-bucket/bucket-test.mjs (old name: spawn)
- /workspace/spawn/maps/witness/encoder-bucket/bucket-test3.mjs (old name: spawn)
- /workspace/spawn/maps/witness/manifest-chain.mjs (old name: spawn)
- /workspace/spawn/maps/witness/manifest-hashmatch.mjs (old name: spawn)
- /workspace/spawn/maps/witness/manifest-sample40/manifest-check.mjs (old name: spawn)
- /workspace/spawn/maps/witness/ra-0.body (old name: spawn) to /workspace/spawn/maps/witness/ra-7.body (old name: spawn)
- /workspace/spawn/maps/witness/rb-0.body (old name: spawn) to /workspace/spawn/maps/witness/rb-7.body (old name: spawn)
- /workspace/spawn/maps/glb-urls-all.tsv (old name: spawn)
- /workspace/savi/spawn-evidence/ (old name: savi) (old name: spawn), data/manifests-all-v3-results.jsonl and data/feed-worlds.json
- /tmp/spawn-probe/ (old name: spawn), ephemeral
