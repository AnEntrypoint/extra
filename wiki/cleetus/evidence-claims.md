# Evidence claims

## How it works

Each row below is one claim that the jayzee-side evidence supports. For each claim the page gives the denominator (the total the claim is measured against), the witness (the exact file, and the line or record where it can be seen), and what was re-checked for this page. The files are described in [evidence-overview.md](evidence-overview.md). Three denominators are kept apart on purpose: 2848 feed worlds, 2580 distinct manifests, and 399 worlds with a /cdn/ GLB. Percentages are given against the stated denominator only.

Re-check status uses three labels. "Recomputed" means the number was computed from the data or witness files in this directory during this task. "Reproduced on copies" means a probe script was run with its roots pointed at the copies here. "Not checkable" means the witness is not in the directory.

### Denominators

| Denominator | Value | Witness |
| --- | --- | --- |
| Feed worlds | 2848 distinct world ids | /workspace/savi/spawn-evidence/data/feed-worlds.json (old name: savi) (old name: spawn), 2848 objects, Recomputed |
| Records in the cdn scan | 2848, in 16 shards | /workspace/savi/spawn-evidence/data/cdn-scan-0.jsonl (old name: savi) (old name: spawn) to cdn-scan-15.jsonl, Recomputed |
| Distinct manifests | 2580 | Distinct manifest values in data/cdn-scan-*.jsonl, Recomputed |
| GLB references | 2416 rows | /workspace/savi/spawn-evidence/maps/glb-urls-all.tsv (old name: savi) (old name: spawn), lines 2 to 2417, Recomputed |
| Non-CDN references | 83 rows | /workspace/savi/spawn-evidence/maps/unverified-noncdn-refs.tsv (old name: savi) (old name: spawn), lines 2 to 84, Recomputed |

### Claims

#### 1. The /cdn/ GLB family covers 399 feed worlds

- Claim: 399 worlds have at least one GLB reference under /cdn/ that answered HEAD 200 with type model/gltf-binary and glTF magic. The claim is a lower bound for /cdn/ only.
- Denominator: 2848 feed worlds, so 399 is 14.0 percent.
- Witness: /workspace/savi/spawn-evidence/maps/glb-urls-all.tsv (old name: savi) (old name: spawn), column world_uuid_nodash, lines 2 to 2417. Also /workspace/savi/spawn-evidence/maps/spawn-root-worlds-map.md (old name: savi) (old name: spawn), section "Full CDN scan result", line 207. Also /workspace/savi/spawn-evidence/FINDINGS.md (old name: savi) (old name: spawn), line 6.
- Re-check: Recomputed. 399 distinct world_uuid_nodash values, all rows have http 200.

#### 2. There are 2416 verified GLB references, with 2355 distinct sha256 values

- Claim: 2416 GLB references across 399 worlds. 2355 are distinct sha256 values.
- Denominator: 2416 GLB references (the 2416 rows of the file). Distinct hashes: 2355, so 61 hashes are shared between rows.
- Witness: /workspace/savi/spawn-evidence/maps/glb-urls-all.tsv (old name: savi) (old name: spawn), columns sha256 and how. The how column splits the rows into 2393 scan rows, 16 recheck rows and 7 retry rows.
- Re-check: Recomputed. Also /workspace/savi/spawn-evidence/FINDINGS.md (old name: savi) (old name: spawn), line 6.

#### 3. No spawnfile-family reference exists in the 2848 feed worlds

- Claim: 0 spawnfile-family refs (0 worlds, 0 URLs) across the scanned feed worlds.
- Denominator: 2848 feed worlds.
- Witness: /workspace/savi/spawn-evidence/FINDINGS.md (old name: savi) (old name: spawn), line 7. /workspace/savi/spawn-evidence/maps/spawn-root-worlds-map.md (old name: savi) (old name: spawn), section "Spawnfile-family scan and missing-head reconciliation", line 221 onward. Scanner: /workspace/savi/spawn-evidence/probe-scripts/scan-spawnfile.mjs (old name: savi) (old name: spawn).
- Re-check: Denominator recomputed (2848 entries in feed-worlds.json). The scanner output (the sf directory and spawnfile-scan files) is not in the directory, so the zero count is Not checkable.

#### 4. 256 feed worlds have no head.json

- Claim: 256 worlds return 404 head_not_found for world-store/git/<uuid>/head.json.
- Denominator: 2848 feed worlds, so 9.0 percent.
- Witness: /workspace/savi/spawn-evidence/maps/head404-confirmed-worlds.txt (old name: savi) (old name: spawn), 256 lines. The scan records for these worlds are in /workspace/savi/spawn-evidence/data/cdn-scan-0.jsonl (old name: savi) (old name: spawn) to cdn-scan-15.jsonl, where they carry stage manifest-parse (see claim 5). Also FINDINGS.md line 8 and map section "Spawnfile-family scan", the 256 paragraph.
- Re-check: Recomputed. 256 distinct lines. The 256 are a subset of the 259 open-missing list (open-missing-head-worlds.txt, 259 lines), and the set of 259 rows labelled manifest-parse in the cdn scan equals the 259 list exactly. The 404 response itself is Not checkable (no saved head body for these worlds).

#### 5. 259 feed worlds were labelled manifest-parse by the cdn scan

- Claim: 259 worlds are the open-missing list. 256 have a head 404, and 3 have a head 200 with a manifest 404.
- Denominator: 2848 feed worlds, so 9.1 percent.
- Witness: /workspace/savi/spawn-evidence/data/cdn-scan-0.jsonl (old name: savi) (old name: spawn) to cdn-scan-15.jsonl, records with stage manifest-parse (259 records). /workspace/savi/spawn-evidence/maps/open-missing-head-worlds.txt (old name: savi) (old name: spawn), 259 lines. /workspace/savi/spawn-evidence/maps/head-present-manifest404-worlds.txt (old name: savi) (old name: spawn), 3 lines (5db79de6dae84ceca2ddb9b9a0e216d9, fd80e9d941624c2fbc48fc89193a7417, ffb0a8fbdca948a5933be7bd62fb44b5).
- Re-check: Recomputed. The 259 cdn records and the 259 list are identical sets. The 3 manifest-404 worlds are a subset of the 259. The status 404 of the manifest is Not checkable.

#### 6. Nine worlds had network errors on the first cdn-scan pass

- Claim: 9 worlds had status 0 (head 6, manifest 3) and were re-run.
- Denominator: 2848 feed worlds.
- Witness: records with stage head and status 0 (6) and stage manifest and status 0 (3) in /workspace/savi/spawn-evidence/data/cdn-scan-0.jsonl (old name: savi) (old name: spawn) to cdn-scan-15.jsonl. Map section "Full CDN scan result", line 210.
- Re-check: Recomputed (9 records). The re-run results are not in the directory, so the claim that all nine resolved is Not checkable. These nine are not in the 2580 manifest set.

#### 7. 2580 distinct manifests were reached from the feed worlds

- Claim: 2580 distinct manifest ids, one per world with a parsed manifest.
- Denominator: 2848 feed worlds, so 90.6 percent. Note that this is the manifest-verification denominator, not the world denominator.
- Witness: /workspace/savi/spawn-evidence/data/cdn-scan-0.jsonl (old name: savi) (old name: spawn) to cdn-scan-15.jsonl (2580 records with a manifest field and no stage). /workspace/savi/spawn-evidence/FINDINGS.md (old name: savi) (old name: spawn), line 9.
- Re-check: Recomputed. 2580 distinct manifest values, 2580 distinct world values.

#### 8. Every distinct manifest answered HTTP 200 on verification

- Claim: 2580 of 2580 manifests returned 200. There were no non-200 results and no network errors.
- Denominator: 2580 distinct manifests.
- Witness: /workspace/savi/spawn-evidence/data/manifests-all-results.jsonl (old name: savi) (old name: spawn), 2580 lines, status field. The v3 run repeats it: /workspace/savi/spawn-evidence/data/manifests-all-v3-results.jsonl (old name: savi) (old name: spawn), 2580 lines, status 200 on each.
- Re-check: Recomputed for both files.

#### 9. The manifests hold 229921 sheet hashes and 229921 frames, 566376956 bytes

- Claim: totals over all 2580 manifests.
- Denominator: 2580 manifests. Per manifest, the frame count equals the hash count in 2580 of 2580 cases.
- Witness: /workspace/savi/spawn-evidence/data/manifests-all-results.jsonl (old name: savi) (old name: spawn), fields hashes, frames, bytes. /workspace/savi/spawn-evidence/FINDINGS.md (old name: savi) (old name: spawn), line 34.
- Re-check: Recomputed. hashes 229921, frames 229921, bytes 566376956. The v3 file gives frames 229921 and sheetHashes 229921 with framesEqualHashes 2580.

#### 10. The frame chain ends exactly at end of file for every manifest

- Claim: the u32 length chain for each manifest ends exactly at the file end, with no overrun or trailing bytes.
- Denominator: 2580 manifests.
- Witness: /workspace/savi/spawn-evidence/data/manifests-all-results.jsonl (old name: savi) (old name: spawn), field chainEndsAtEOF, true on 2580 rows, bad null on 2580 rows. /workspace/savi/spawn-evidence/data/manifests-all-v3-results.jsonl (old name: savi) (old name: spawn), field eof, true on 2580 rows.
- Re-check: Recomputed for both files.

#### 11. Frame i hashes to sheet entry i, in 2580 of 2580 manifests (after the gzip rule)

- Claim, v1: 229920 of 229921 frames match their sheet entry in order and are members of the sheet. The one exception is manifest d048ad06 (claim 12).
- Claim, v3: 229920 frames match their sheet entry raw, 1 frame matches after gunzip, 0 raw failures, 0 gzip failures. Every manifest passes.
- Denominator: 229921 frames across 2580 manifests. Percentage per frame: 100 percent under the v3 rule, 99.9996 percent under the v1 rule.
- Witness: /workspace/savi/spawn-evidence/data/manifests-all-results.jsonl (old name: savi) (old name: spawn), fields ordered and inSet, summed 229920 each. /workspace/savi/spawn-evidence/data/manifests-all-v3-results.jsonl (old name: savi) (old name: spawn), fields rawMatch (sum 229920), gzipDecodedMatch (sum 1), rawFail and gzipFail (sum 0 each). Procedure: /workspace/savi/spawn-evidence/probe-scripts/verify-v3.mjs (old name: savi) (old name: spawn), census function.
- Re-check: Recomputed for both files.

#### 12. Manifest d048ad06 has a gzip-compressed frame 2 that is the expected hash after gunzip

- Claim: the manifest has 3 sheet hashes and 3 frames. Frames 0 and 1 are JSON and match. Frame 2 is 175 bytes beginning with the gzip magic 1f8b08 and is not JSON. Under the v1 rule the frame fails the order and membership tests. Under the v3 rule, gunzip of frame 2 gives the sheet hash 13abafd82723caeb078177b84ab6e1f7e8d03057bd32d8b9442655cae55f9314.
- Denominator: 2580 manifests, so 1 of 2580 (0.04 percent), and 1 of 229921 frames.
- Witness: the raw body /workspace/savi/spawn-evidence/data/exception-d048ad06.bin (old name: savi) (old name: spawn), 5804 bytes, frame 2 at byte offset 5625 of length 175. Manifest-chain output for the file is reproduced by /workspace/savi/spawn-evidence/probe-scripts/manifest-chain.mjs (old name: savi) (old name: spawn). The v1 record is line 2101 of /workspace/savi/spawn-evidence/data/manifests-all-results.jsonl (old name: savi) (old name: spawn). The v3 record is line 2098 of /workspace/savi/spawn-evidence/data/manifests-all-v3-results.jsonl (old name: savi) (old name: spawn), with gzipFrames 1, gzipDecodedMatch 1, hitDec true. The FINDINGS description is at /workspace/savi/spawn-evidence/FINDINGS.md (old name: savi) (old name: spawn), line 35.
- Re-check: Recomputed. The v1 and v3 rows and the chain values agree with this description. FINDINGS.md has not been updated with the v3 result and still reads "not interpreted" (see Open gaps).

#### 13. Sample of 40 manifests: frames equal hashes and every frame is in order

- Claim: for the 40 sampled manifests, 2961 sheet hashes equal 2961 frames, every chain ends at EOF, and every frame is ordered and a member of its sheet.
- Denominator: 40 sampled manifests, out of 2580 distinct manifests, so 1.6 percent. The sample is every 64th manifest in sorted order (pick.json).
- Witness: /workspace/savi/spawn-evidence/maps/witness/manifest-sample40/ (old name: savi) (old name: spawn), 40 .bin files. /workspace/savi/spawn-evidence/data/pick.json (old name: savi) (old name: spawn), 40 entries.
- Re-check: Recomputed. The 40 file names are identical to the 40 manifest values in pick.json. manifest-check.mjs over the 40 files gives hashes 2961, frames 2961, chainEndsAtEOF 40, ordered 2961, inSet 2961. Total bytes 6950059.

#### 14. Three witness manifests pass the same chain checks

- Claim: mf-bdabcf5a-scanned.bin (274 hashes), mf-gm-manhattan-scanned.bin (69 hashes) and mf-gta-earth-scanned.bin (80 hashes) each pass the chain check with frames equal to hashes.
- Denominator: each manifest on its own (one file each). Not a corpus claim.
- Witness: /workspace/savi/spawn-evidence/maps/witness/mf-bdabcf5a-scanned.bin (old name: savi) (old name: spawn), /workspace/savi/spawn-evidence/maps/witness/mf-gm-manhattan-scanned.bin (old name: savi) (old name: spawn), /workspace/savi/spawn-evidence/maps/witness/mf-gta-earth-scanned.bin (old name: savi) (old name: spawn).
- Re-check: Recomputed with manifest-check.mjs. The manifest ids of these files are not stated in the directory.

#### 15. resolve-adventure returns 200 JSON for found and not_found

- Claim: GET /api/resolve-adventure?address= returns 200 JSON with result.type found or not_found. An empty or missing address returns 400 with {"ok":false,"error":"Invalid query"}. A trailing slash returns 308 to the bare route. http returns 308 to https. The apex host returns 307 to www. The redirect responses have the body "Redirecting...".
- Denominator: the claim cites 30 probes (FINDINGS.md line 26 and the list in line 13). Eight ra bodies and eight rb bodies are saved here, so 16 saved responses.
- Witness: /workspace/savi/spawn-evidence/maps/witness/ra-0.body (old name: savi) (old name: spawn) (found), ra-1.body (not_found), ra-2.body (not_found). /workspace/savi/spawn-evidence/maps/witness/rb-0.body (old name: savi) (old name: spawn) (400 Invalid query), rb-2.body, rb-3.body and rb-4.body (Redirecting...), rb-5.body (found, Deepfall). The source of the 200, 308 and 307 status codes is FINDINGS.md line 13.
- Re-check: Body content Recomputed for the files named above. The status codes are Not checkable from the saved bodies, because the bodies carry no status.

#### 16. resolve-adventure 410 (gone) was not reached

- Claim: no 410 response in 30 probes. OPEN.
- Denominator: 30 probes (the claim's own count).
- Witness: /workspace/savi/spawn-evidence/FINDINGS.md (old name: savi) (old name: spawn), line 26. No probe log is in the directory.
- Re-check: Not checkable.

#### 17. Name encoder: slash is written as ~2f in file-map keys

- Claim: on 307 distinct world.assets keys, encode(decode(key)) equals key, and the only escape present is ~2f.
- Denominator: 307 claimed distinct keys. Re-run on the copies gives 288 distinct keys, so 288 of the 307 claimed keys are reproducible here. The other 19 keys come from /tmp sources that are not copied.
- Witness: /workspace/savi/spawn-evidence/probe-scripts/encoder-test.mjs (old name: savi) (old name: spawn), and its copy at /workspace/savi/spawn-evidence/maps/witness/encoder-bucket/encoder-test.mjs (old name: savi) (old name: spawn). Keys appear in the copies only as text inside /workspace/savi/spawn-evidence/maps/spawn-root-worlds-map.md (old name: savi) (old name: spawn), section "GLB URLs". FINDINGS.md line 14 states the claim.
- Re-check: Reproduced on copies. 288 distinct keys, 288 round-trip, escape counts ~2f 576 and no other escape. The 307 figure is Not checkable.

#### 18. Colon and tilde encodings

- Claim: colon is written as ~3a only in the cleetus FAULTS file (outside this scope). The tilde is written as ~7e with no witness. OPEN.
- Denominator: 288 keys reproduced on copies, none containing ~3a or ~7e.
- Witness: /workspace/savi/spawn-evidence/FINDINGS.md (old name: savi) (old name: spawn), line 28 (open list). The re-run output in claim 17 shows no ~3a or ~7e.
- Re-check: Reproduced on copies (no occurrence). The FAULTS witness is outside this scope and is Not checkable here.

#### 19. Bucket xx rule is undetermined (negative results)

- Claim: 298 distinct (xx, sha256, ext) pairs across 135 buckets. Eight candidate hash rules each match 0 to 2 pairs, at about chance. Frame-level tests over 279 keys match 0 times on frame body, whole frame, key text and value bytes. World-uuid prefix matches 0 of 16.
- Denominator: 298 pairs (claimed). Re-run on the copies gives 279 distinct pairs in 127 buckets. Frame-level tests over the 279 keys give 0 matches on all four tests.
- Witness: /workspace/savi/spawn-evidence/probe-scripts/bucket-test.mjs (old name: savi) (old name: spawn), /workspace/savi/spawn-evidence/probe-scripts/bucket-test3.mjs (old name: savi) (old name: spawn), /workspace/savi/spawn-evidence/probe-scripts/bucket-test2.mjs (old name: savi) (old name: spawn) for the world-uuid check. FINDINGS.md lines 19 and 27.
- Re-check: Reproduced on copies for the eight hypotheses (scores 0 to 2) and for the frame-level test (279 keys, 0 matches). The 298 and 135 counts and the world-uuid check (0 of 16) are Not checkable, because bucket-test2.mjs reads the /tmp sources.

#### 20. Non-CDN references: 81 of 83 answer 200 on retry

- Claim: 83 non-CDN refs, 81 HEAD 200 on retry, 1 ttf 401, 1 mp4 connect timeout.
- Denominator: 83 rows, from 21 worlds.
- Witness: /workspace/savi/spawn-evidence/maps/unverified-noncdn-refs.tsv (old name: savi) (old name: spawn), columns retry_status and retry_type. The 401 row is line 22 (font/ttf, retry_status 401). The timeout row is line 37 (mp4, err:UND_ERR_CONNECT_TIMEOUT). The 200 rows are the remaining 81: audio/mpeg 11, font/ttf 1, image/gif 2, image/jpeg 15, image/png 31, image/webp 4, model/gltf-binary 6, video/mp4 11. FINDINGS.md line 29.
- Re-check: Recomputed. Counts match exactly: 81, 1, 1 and 21 worlds.

#### 21. Identifier note OPEN-013

- Claim: the two non-CDN rows at lines 22 and 37 appear under two identifiers (world_uuid_nodash and sha256) and that this is not a discrepancy.
- Denominator: 2 rows named in the claim, out of 83.
- Witness: /workspace/savi/spawn-evidence/maps/unverified-noncdn-refs.tsv (old name: savi) (old name: spawn), lines 22 and 37. FINDINGS.md line 15.
- Re-check: Recomputed. Both rows are present with the stated values.

#### 22. Creator count and feed-world count

- Claim: 2848 unique feed worlds, from three sorts (hot, top, recent), and 1002 distinct creators.
- Denominator: 2848 feed worlds.
- Witness: /workspace/savi/spawn-evidence/data/feed-worlds.json (old name: savi) (old name: spawn). Enumeration: /workspace/savi/spawn-evidence/probe-scripts/enum-feed.mjs (old name: savi) (old name: spawn). Map section "Creator profiles" line 113 and the union paragraph at line 142.
- Re-check: Recomputed. 2848 distinct world values and 1002 distinct creator values.

#### 23. Head drift in one world

- Claim: world 41cd46499614484ca9261ce32e257e22 head.json names manifest 3fa9a434, which returned 404 unknown_world_store_key on the first pass and 200 on recheck. The key reproduces for a misspelled resource name under the same world (head.jsn 404 with 35 bytes) and not for the real head.json. One case observed.
- Denominator: 1 world.
- Witness: /workspace/savi/spawn-evidence/FINDINGS.md (old name: savi) (old name: spawn), line 30. No saved body in the directory for the first-pass 404.
- Re-check: Not checkable. The id 3fa9a434 does not occur in data/manifests-all-results.jsonl or data/manifests-all-v3-results.jsonl. The witness file mf-gm-manhattan-scanned.bin is 513116 bytes, the same size FINDINGS.md gives for 3fa9a434, but its identity is not stated.

#### 24. Live page probe found 30 matched requests

- Claim: on one live play page (lanmower/deepfall) for 25 seconds, 30 requests matched the spawnfile or bigspawn hosts (play.bigspawn.net, www.spawn.co, rqr3rdr46-playco.spawnfile.io, and blob: URLs under it). The glbLike list was empty.
- Denominator: 30 matched requests on one page.
- Witness: /workspace/savi/spawn-evidence/FINDINGS.md (old name: savi) (old name: spawn), line 16. No capture file is in the directory.
- Re-check: Not checkable.

#### 25. Frame-level bucket test and chunk witnesses are negative or reference-only

- Claim: the bucket rule is undetermined (claim 19). The store-name table and the pin-world rule are read from a minified chunk.
- Denominator: the map sections cite the chunk. The chunk copy is /workspace/savi/spawn-evidence/probe-scripts/chunk-c.mjs (old name: savi) (old name: spawn), 118 lines.
- Witness: /workspace/savi/spawn-evidence/maps/spawn-root-worlds-map.md (old name: savi) (old name: spawn), sections "World-store to local-store tie" (line 160) and the store-name table (line 154).
- Re-check: Not checkable as to the mapping. The chunk is present but no probe reads it.

## Decisions

- The denominator for every manifest-level claim is the 2580 distinct manifests reached from the feed worlds, and the feed-world denominator is 2848 (the snapshot of three feed sorts). Both are stated in the Denominators section and reused by each claim.
- Claim 12 uses the gzip-aware v3 verification, which supersedes the first-pass manifest check for manifest d048ad06 and resolves the one exception. The older FINDINGS.md wording is kept as a witnessed prior state, not as the final result.
- Probes that could not be replayed from data alone (resolve-adventure 410, live page capture, head drift) are recorded as unverified rather than inferred to be true.
- Witness bodies in maps/witness/ are kept as the evidence for individual claims; claims without a saved body are marked as having no witness.

## Open gaps

- Claims 13 and 14 cover 40 and 3 manifests. Nothing in the directory covers the remaining manifests beyond the full verification files, which are summaries of hashes and chains only. Source: /workspace/savi/spawn-evidence/data/manifests-all-v3-results.jsonl (old name: savi) (old name: spawn).
- FINDINGS.md still reports the corpus as "2579 of 2580 fully match", and still calls the exception not interpreted, while the v3 output resolves it (claim 12). Source: /workspace/savi/spawn-evidence/FINDINGS.md (old name: savi) (old name: spawn), lines 34 to 36.
- The nine network-error worlds (claim 6) are missing from the 2580 set, and their re-run results are not in the directory. Source: /workspace/savi/spawn-evidence/data/cdn-scan-0.jsonl (old name: savi) (old name: spawn) to cdn-scan-15.jsonl.
- The 259 manifest-parse rows do not carry the head status, so they cannot show whether the 404 was a head or a manifest error without re-reading the map. Source: /workspace/savi/spawn-evidence/probe-scripts/scan-cdn.mjs (old name: savi) (old name: spawn).
- 19 of the 307 encoder keys (claim 17) and the 298 bucket pairs (claim 19) need /tmp sources that are not copied. Source: /workspace/savi/spawn-evidence/probe-scripts/encoder-test.mjs (old name: savi) (old name: spawn).
- The 30 resolve-adventure probes (claims 15 and 16) have 16 saved bodies and no probe log. The 410 response was not reached. Source: /workspace/savi/spawn-evidence/FINDINGS.md (old name: savi) (old name: spawn), line 26.
- The spawnfile key path is ELIDED in the cleetus FAULTS file (FAULTS F3), which is outside this scope. The spawnfile.io response bytes are unconfirmed, and the /cdn/-only host claim is inferred. Source: /workspace/savi/spawn-evidence/FINDINGS.md (old name: savi) (old name: spawn), lines 23 to 25.
- The /cdn/-only host claim (every GLB served only from play.spawn.co/cdn/) is inferred and has no negative probe here. Source: /workspace/savi/spawn-evidence/FINDINGS.md (old name: savi) (old name: spawn), line 25.
- The live page probe (claim 24) has no capture file. Source: /workspace/savi/spawn-evidence/FINDINGS.md (old name: savi) (old name: spawn), line 16.
- The head drift case (claim 23) has no saved first-pass body, and the manifest id 3fa9a434 is not in the data. Source: /workspace/savi/spawn-evidence/FINDINGS.md (old name: savi) (old name: spawn), line 30.
- The status codes for the redirect rules in claim 15 are not in the saved bodies. Source: /workspace/savi/spawn-evidence/maps/witness/rb-2.body (old name: savi) (old name: spawn).

## Sources

- /workspace/savi/spawn-evidence/FINDINGS.md (old name: savi) (old name: spawn)
- /workspace/savi/spawn-evidence/README.md (old name: savi) (old name: spawn)
- /workspace/savi/spawn-evidence/maps/spawn-root-worlds-map.md (old name: savi) (old name: spawn)
- /workspace/savi/spawn-evidence/maps/glb-urls-all.tsv (old name: savi) (old name: spawn)
- /workspace/savi/spawn-evidence/maps/head404-confirmed-worlds.txt (old name: savi) (old name: spawn)
- /workspace/savi/spawn-evidence/maps/head-present-manifest404-worlds.txt (old name: savi) (old name: spawn)
- /workspace/savi/spawn-evidence/maps/open-missing-head-worlds.txt (old name: savi) (old name: spawn)
- /workspace/savi/spawn-evidence/maps/unverified-noncdn-refs.tsv (old name: savi) (old name: spawn)
- /workspace/savi/spawn-evidence/maps/witness/mf-bdabcf5a-scanned.bin (old name: savi) (old name: spawn)
- /workspace/savi/spawn-evidence/maps/witness/mf-gm-manhattan-scanned.bin (old name: savi) (old name: spawn)
- /workspace/savi/spawn-evidence/maps/witness/mf-gta-earth-scanned.bin (old name: savi) (old name: spawn)
- /workspace/savi/spawn-evidence/maps/witness/manifest-sample40/ (old name: savi) (old name: spawn)
- /workspace/savi/spawn-evidence/maps/witness/ra-0.body (old name: savi) (old name: spawn)
- /workspace/savi/spawn-evidence/maps/witness/ra-1.body (old name: savi) (old name: spawn)
- /workspace/savi/spawn-evidence/maps/witness/ra-2.body (old name: savi) (old name: spawn)
- /workspace/savi/spawn-evidence/maps/witness/rb-0.body (old name: savi) (old name: spawn)
- /workspace/savi/spawn-evidence/maps/witness/rb-2.body (old name: savi) (old name: spawn)
- /workspace/savi/spawn-evidence/maps/witness/rb-3.body (old name: savi) (old name: spawn)
- /workspace/savi/spawn-evidence/maps/witness/rb-4.body (old name: savi) (old name: spawn)
- /workspace/savi/spawn-evidence/maps/witness/rb-5.body (old name: savi) (old name: spawn)
- /workspace/savi/spawn-evidence/maps/witness/encoder-bucket/encoder-test.mjs (old name: savi) (old name: spawn)
- /workspace/savi/spawn-evidence/maps/witness/encoder-bucket/bucket-test.mjs (old name: savi) (old name: spawn)
- /workspace/savi/spawn-evidence/maps/witness/encoder-bucket/bucket-test3.mjs (old name: savi) (old name: spawn)
- /workspace/savi/spawn-evidence/probe-scripts/enum-feed.mjs (old name: savi) (old name: spawn)
- /workspace/savi/spawn-evidence/probe-scripts/scan-cdn.mjs (old name: savi) (old name: spawn)
- /workspace/savi/spawn-evidence/probe-scripts/scan-spawnfile.mjs (old name: savi) (old name: spawn)
- /workspace/savi/spawn-evidence/probe-scripts/manifest-chain.mjs (old name: savi) (old name: spawn)
- /workspace/savi/spawn-evidence/probe-scripts/manifest-check.mjs (old name: savi) (old name: spawn)
- /workspace/savi/spawn-evidence/probe-scripts/verify-v3.mjs (old name: savi) (old name: spawn)
- /workspace/savi/spawn-evidence/probe-scripts/verify-all-manifests.mjs (old name: savi) (old name: spawn)
- /workspace/savi/spawn-evidence/probe-scripts/encoder-test.mjs (old name: savi) (old name: spawn)
- /workspace/savi/spawn-evidence/probe-scripts/bucket-test.mjs (old name: savi) (old name: spawn)
- /workspace/savi/spawn-evidence/probe-scripts/bucket-test2.mjs (old name: savi) (old name: spawn)
- /workspace/savi/spawn-evidence/probe-scripts/bucket-test3.mjs (old name: savi) (old name: spawn)
- /workspace/savi/spawn-evidence/probe-scripts/chunk-c.mjs (old name: savi) (old name: spawn)
- /workspace/savi/spawn-evidence/data/cdn-scan-0.jsonl (old name: savi) (old name: spawn)
- /workspace/savi/spawn-evidence/data/cdn-scan-15.jsonl (old name: savi) (old name: spawn)
- /workspace/savi/spawn-evidence/data/feed-worlds.json (old name: savi) (old name: spawn)
- /workspace/savi/spawn-evidence/data/pick.json (old name: savi) (old name: spawn)
- /workspace/savi/spawn-evidence/data/manifests-all-results.jsonl (old name: savi) (old name: spawn)
- /workspace/savi/spawn-evidence/data/manifests-all-v3-results.jsonl (old name: savi) (old name: spawn)
- /workspace/savi/spawn-evidence/data/exception-d048ad06.bin (old name: savi) (old name: spawn)
