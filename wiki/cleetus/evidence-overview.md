# Evidence overview

## How it works

The evidence directory /workspace/savi/spawn-evidence (old name: savi) (old name: spawn) holds the durable copies of the jayzee-side read-only probes that back the findings in /workspace/savi/spawn-evidence/FINDINGS.md (old name: savi) (old name: spawn). The probes issue public GET requests against the play.spawn.co world-store and the www.spawn.co feed API, hash what they get back, and write results as JSON lines. Nothing in the directory writes to the remote service. The claims each file supports are listed in [evidence-claims.md](evidence-claims.md).

The file-level README is /workspace/savi/spawn-evidence/README.md (old name: savi) (old name: spawn). It says the scripts still carry their original /tmp/spawn-probe paths. It also names a file data/manifests-all-results.partial.jsonl that is not present in the directory (see Open gaps in this page).

### Top-level files

| Path | Size | Lines or records | What it supports |
| --- | --- | --- | --- |
| /workspace/savi/spawn-evidence/FINDINGS.md (old name: savi) (old name: spawn) | 6094 bytes | 36 lines | The findings list: denominators, witnessed claims, negative results, the OPEN list, and the full manifest verification section. Every claim in evidence-claims.md is stated here first. |
| /workspace/savi/spawn-evidence/README.md (old name: savi) (old name: spawn) | 1157 bytes | 9 lines | Describes the folders. No finding rests on it. |

### maps/

| Path | Size | Lines or records | What it supports |
| --- | --- | --- | --- |
| /workspace/savi/spawn-evidence/maps/spawn-root-worlds-map.md (old name: savi) (old name: spawn) | 30169 bytes | 230 lines | Narrative map of the root-linked worlds. Sections cover the world-store GLB scan, creator profiles, public API routes, world-store contents, spatial storage ties, GLB URL naming, the full CDN scan over 2848 feed worlds, and the spawnfile-family scan with the missing-head reconciliation. Source of the 399-world, 2416-reference and 2355-hash totals, and of the 256 and 259 missing-head counts. |
| /workspace/savi/spawn-evidence/maps/glb-urls-all.tsv (old name: savi) (old name: spawn) | 732263 bytes | 2417 lines (header plus 2416 rows) | One row per GLB reference in a feed world. Columns: world_uuid_nodash, sha256, url, file_map_value, http, content_type, magic, len, how. The how column is scan for 2393 rows, recheck for 16 and retry for 7. Supports the /cdn/ GLB family claim. |
| /workspace/savi/spawn-evidence/maps/head404-confirmed-worlds.txt (old name: savi) (old name: spawn) | 8448 bytes | 256 lines (32-hex world ids) | Worlds whose world-store head.json returned 404 head_not_found. Supports the 256 missing-head claim. |
| /workspace/savi/spawn-evidence/maps/head-present-manifest404-worlds.txt (old name: savi) (old name: spawn) | 99 bytes | 3 lines | Worlds whose head.json returned 200 but whose manifest returned 404. Supports the 3 manifest-404 claim. |
| /workspace/savi/spawn-evidence/maps/open-missing-head-worlds.txt (old name: savi) (old name: spawn) | 8547 bytes | 259 lines | The earlier list of worlds that were missing a head, kept unchanged. It is the union of head404-confirmed-worlds.txt (256) and head-present-manifest404-worlds.txt (3). |
| /workspace/savi/spawn-evidence/maps/unverified-noncdn-refs.tsv (old name: savi) (old name: spawn) | 23779 bytes | 84 lines (header plus 83 rows, 21 worlds) | Non-CDN file references and their first-pass and retry results. Columns: world_uuid_nodash, sha256, ext, file_map_value, first_pass_status, retry_status, retry_type, url. Supports the non-CDN claim and the OPEN-013 identifier note. |

### maps/witness/

| Path | Size | Records | What it supports |
| --- | --- | --- | --- |
| /workspace/savi/spawn-evidence/maps/witness/mf-bdabcf5a-scanned.bin (old name: savi) (old name: spawn) | 645995 bytes | 274 hashes and frames | A raw manifest body. Checked by manifest-check.mjs: chain ends at EOF, every frame is in the sheet, every frame is in order. Supports the manifest-layout claim on one more manifest. |
| /workspace/savi/spawn-evidence/maps/witness/mf-gm-manhattan-scanned.bin (old name: savi) (old name: spawn) | 513116 bytes | 69 hashes and frames | A raw manifest body, same checks as above. Its size equals the size FINDINGS.md gives for manifest 3fa9a434 (head drift case). The file name does not state that manifest id, so the identity is not established. |
| /workspace/savi/spawn-evidence/maps/witness/mf-gta-earth-scanned.bin (old name: savi) (old name: spawn) | 186349 bytes | 80 hashes and frames | A raw manifest body, same checks as above. |
| /workspace/savi/spawn-evidence/maps/witness/manifest-sample40/ (old name: savi) (old name: spawn) | 40 .bin files plus pick.json and manifest-check.mjs | 2961 hashes and frames in total | The 40-manifest sample. File names are manifest ids and match the entries of pick.json one for one. Supports the sample-scoped manifest claim. |
| /workspace/savi/spawn-evidence/maps/witness/manifest-sample40/pick.json (old name: savi) (old name: spawn) | 4669 bytes | 40 entries | Byte-identical to /workspace/savi/spawn-evidence/data/pick.json (old name: savi) (old name: spawn). |
| /workspace/savi/spawn-evidence/maps/witness/manifest-sample40/manifest-check.mjs (old name: savi) (old name: spawn) | 825 bytes | script | Copy of the checker, same as the probe-scripts copy. |
| /workspace/savi/spawn-evidence/maps/witness/manifest-chain.mjs (old name: savi) (old name: spawn) | 818 bytes | script | Byte-identical copy of probe-scripts/manifest-chain.mjs. Walks the frame chain and reports the first and last frames. |
| /workspace/savi/spawn-evidence/maps/witness/manifest-hashmatch.mjs (old name: savi) (old name: spawn) | 941 bytes | script | Byte-identical copy of probe-scripts/manifest-hashmatch.mjs. Counts how many frame bodies, and frame whole-records, hash to a sheet entry. |
| /workspace/savi/spawn-evidence/maps/witness/ra-0.body to ra-7.body (old name: savi) (old name: spawn) | 8 files, 41 to 225 bytes | 8 bodies | Saved responses of GET /api/resolve-adventure?address=. Found bodies (ra-0, ra-3) and not_found bodies (ra-1, ra-2, and the other 41-byte bodies). |
| /workspace/savi/spawn-evidence/maps/witness/rb-0.body to rb-7.body (old name: savi) (old name: spawn) | 8 files, 14 to 225 bytes | 8 bodies | Saved responses for the malformed, redirect and host variants. rb-0 is the 400 Invalid query body. rb-2, rb-3 and rb-4 carry the Redirecting text, and rb-5 is a found body. |
| /workspace/savi/spawn-evidence/maps/witness/encoder-bucket/ (old name: savi) (old name: spawn) | 3 scripts | scripts | Copies of bucket-test.mjs, bucket-test3.mjs and encoder-test.mjs. Byte-identical to the probe-scripts copies. |

### probe-scripts/

All scripts are Node ES modules. Each one reads its input from argv or from a hard-coded path, writes JSON lines to a file named by an environment variable (or a default), and prints a summary to stdout. None writes to the remote service.

| Path (old name: savi) (old name: spawn) | Size | Input | Output | What it checks |
| --- | --- | --- | --- | --- |
| /workspace/savi/spawn-evidence/probe-scripts/enum-feed.mjs (old name: savi) (old name: spawn) | 960 bytes | none (pages the public feed) | feed-worlds.json | Pages the www.spawn.co feed API for three sorts (hot, top, recent) at 48 per page, up to offset 2000. Keeps one entry per world id. Supports the 2848 feed-world denominator. |
| /workspace/savi/spawn-evidence/probe-scripts/scan-cdn.mjs (old name: savi) (old name: spawn) | 2853 bytes | world uuids as argv, env OUT and CONC | cdn-scan-N.jsonl | For each world: GET head.json, read the manifest id, GET the manifest, regex the sheet, GET each value, find cdn/value refs with a 64-hex sha and an extension, HEAD each reference, and for glb ranges the first four bytes for glTF magic. This is the source of the cdn-scan records. |
| /workspace/savi/spawn-evidence/probe-scripts/scan-fast.mjs (old name: savi) (old name: spawn) | 2351 bytes | world uuids as argv | scan-fast.jsonl | Same head and manifest walk, then tags the first four bytes of every value and counts magic tags. Superseded: it found no GLB because it did not follow the file-map references. |
| /workspace/savi/spawn-evidence/probe-scripts/scan-urls.mjs (old name: savi) (old name: spawn) | 2596 bytes | world uuids as argv | scan-urls.jsonl | Same walk, plus a regex for http and https URLs inside non-glTF values. Used to find external references. |
| /workspace/savi/spawn-evidence/probe-scripts/scan-spawnfile.mjs (old name: savi) (old name: spawn) | 2905 bytes | world uuids as argv | spawnfile-scan.jsonl | Walks the same path, matches file-map keys of the form world.assets/xx/https~3a~2f~2f... with a known extension, decodes the name, and HEADs each URL. Source of the zero spawnfile-family result. |
| /workspace/savi/spawn-evidence/probe-scripts/manifest-chain.mjs (old name: savi) (old name: spawn) | 818 bytes | one manifest file | JSON on stdout | Reads the u32 big-endian sheet length, parses the sheet, then reads u32-length frames to the end. Reports the byte count, the frame count (this count includes the sheet as its first element), whether the chain ends exactly at EOF, whether every frame is JSON, and the first and last frame descriptors. |
| /workspace/savi/spawn-evidence/probe-scripts/manifest-check.mjs (old name: savi) (old name: spawn) | 825 bytes | one manifest file | JSON on stdout | Same chain walk, but the frame count excludes the sheet. Reports hashes, frames, chainEndsAtEOF, ordered (frame i sha256 equals hashes[i]) and inSet (frame sha256 is in the sheet). |
| /workspace/savi/spawn-evidence/probe-scripts/manifest-order.mjs (old name: savi) (old name: spawn) | 684 bytes | one manifest file | JSON on stdout | Reports orderedMatch and the first mismatch index. |
| /workspace/savi/spawn-evidence/probe-scripts/manifest-frames.mjs (old name: savi) (old name: spawn) | 787 bytes | one manifest file | JSON on stdout | Finds the sheet by its opening text, reports its top-level keys, and describes the bytes after the sheet (JSON or not) as a hex and text tail. |
| /workspace/savi/spawn-evidence/probe-scripts/manifest-hashmatch.mjs (old name: savi) (old name: spawn) | 941 bytes | one manifest file | JSON on stdout | Counts how many frame bodies and whole frame records hash to a sheet entry. Used for the body-versus-whole-record tests. |
| /workspace/savi/spawn-evidence/probe-scripts/pick-manifests.mjs (old name: savi) (old name: spawn) | 748 bytes | the cdn-scan files under /tmp/spawn-probe | JSON on stdout | Collects distinct manifests with their world ids, sorts them, and takes every 64th one to make 40 picks. Output is data/pick.json. |
| /workspace/savi/spawn-evidence/probe-scripts/verify-all-manifests.mjs (old name: savi) (old name: spawn) | 2887 bytes | the cdn-scan files, env OUT | manifests-all-results.jsonl (resumable) | Fetches every distinct manifest with 12-way concurrency, a 30 second timeout and up to three attempts. Per manifest it records bytes, hashes, frames, chainEndsAtEOF, bad, ordered, inSet and sheetVersion. Resumes from existing results. |
| /workspace/savi/spawn-evidence/probe-scripts/verify-v3.mjs (old name: savi) (old name: spawn) | 5832 bytes | the cdn-scan files and wide-all/results.jsonl under /tmp/spawn-probe | manifests-all-v3-results.jsonl (resumable) | Gzip-aware version of the verification. A self-test on the exception manifest must pass before the run starts. Each frame is checked raw and, when it begins with the gzip magic, after gunzip. Writes per-manifest census rows and prints a summary (gzipFrames, gzipDecodedMatch, rawMatch, rawFail, eof). Refuses to run unless the manifest set has exactly 2580 entries and every one appears in the wide-all results. |
| /workspace/savi/spawn-evidence/probe-scripts/aggregate.mjs (old name: savi) (old name: spawn) | 1310 bytes | feed-scan-, sample-scan- and full-scan- jsonl files in the current directory | aggregate.json, stdout | Merges the scan files by world, counts ok and failed worlds by stage and status, counts GLB-bearing worlds and magic tags. Written for an earlier scanner shape (glb field). |
| /workspace/savi/spawn-evidence/probe-scripts/encoder-test.mjs (old name: savi) (old name: spawn) | 1544 bytes | file-map keys found under two source roots | stdout JSON | Collects distinct world.assets keys, counts percent escapes, and checks that encode(decode(key)) equals key. Decode maps ~2f to slash and ~3a to colon. Encode maps tilde to ~7e, slash to ~2f and colon to ~3a. |
| /workspace/savi/spawn-evidence/probe-scripts/bucket-test.mjs (old name: savi) (old name: spawn) | 2215 bytes | file-map keys under two source roots | stdout JSON | Collects distinct (xx, sha256, ext) triples from the cdn-value key form and scores eight candidate hash rules against the xx bucket. Reports the number of distinct buckets. |
| /workspace/savi/spawn-evidence/probe-scripts/bucket-test2.mjs (old name: savi) (old name: spawn) | 1901 bytes | the same roots | stdout JSON | Adds a check that compares the bucket to the value-hash prefix and to the world-uuid directory prefix. Reports the match counts. |
| /workspace/savi/spawn-evidence/probe-scripts/bucket-test3.mjs (old name: savi) (old name: spawn) | 1518 bytes | .bin manifest directories | stdout JSON | Frame-level test. For each distinct key found in a frame body, tests whether the first byte of sha256 of the frame body, the whole frame record, the key text, or the value bytes equals the bucket. Reports distinctKeysInFrames and the match counts. |
| /workspace/savi/spawn-evidence/probe-scripts/chunk-c.mjs (old name: savi) (old name: spawn) | 271628 bytes, 118 lines | none | none | A minified client chunk copied from the play.spawn.co client pool. It is not a probe. The map refers to it as the source for the store-name table and the pin-world rule. No script in the directory reads it. |

### data/

| Path | Size | Records | What it supports |
| --- | --- | --- | --- |
| /workspace/savi/spawn-evidence/data/cdn-scan-0.jsonl to cdn-scan-15.jsonl (old name: savi) (old name: spawn) | 16 files, 184101 to 356132 bytes each | 2848 records in total, one per feed world | Output of scan-cdn.mjs in 16 shards. Keys: uuid, world, and on success manifest, values, refs and cdn (a list of reference records with sha, ext, status, type, len and magic). Stage tallies over the 2848 records: 2580 with a parsed manifest (no stage field), 259 labelled manifest-parse, 6 head with status 0 and 3 manifest with status 0. Source of the 2580 distinct manifest denominator. |
| /workspace/savi/spawn-evidence/data/feed-worlds.json (old name: savi) (old name: spawn) | 601368 bytes | 2848 objects in one array | Keys: adventure, app, creator, name, sort, world. 2848 distinct world ids and 1002 distinct creators. Source of the feed-world denominator. |
| /workspace/savi/spawn-evidence/data/pick.json (old name: savi) (old name: spawn) | 4669 bytes | one object, distinct 2580, picked 40 | Lists the 40 sampled manifests with their world ids. |
| /workspace/savi/spawn-evidence/data/manifests-all-results.jsonl (old name: savi) (old name: spawn) | 847202 bytes | 2580 lines, one per manifest | Output of verify-all-manifests.mjs. Keys: m, url, status, attempt, bytes, hashes, frames, chainEndsAtEOF, bad, ordered, inSet, sheetVersion. Totals: 229921 hashes and frames, 566376956 bytes, ordered 229920, inSet 229920, every row status 200. The exception manifest is on line 2101. |
| /workspace/savi/spawn-evidence/data/manifests-all-v3-results.jsonl (old name: savi) (old name: spawn) | 730621 bytes | 2580 lines, one per manifest | Output of verify-v3.mjs. Keys: m, status, attempt, bytes, sheetHashes, frames, gzipFrames, gzipDecodedMatch, gzipFail, rawMatch, rawFail, eof, hitRaw, hitDec, framesEqualHashes. Totals: 229921 frames, 1 gzip frame, 1 gzip frame that decodes to its sheet hash, 229920 raw matches, 0 failures, 2580 at EOF. The exception manifest is on line 2098. |
| /workspace/savi/spawn-evidence/data/exception-d048ad06.bin (old name: savi) (old name: spawn) | 5804 bytes | one raw manifest body | The exception manifest d048ad06, kept raw. Its frame 2 is 175 bytes beginning with the gzip magic 1f8b08. |

## Decisions

- The copies were made from the original /tmp/spawn-probe run location, and the README and the map both say the copies are the durable versions. Paths inside the scripts still point at /tmp/spawn-probe or at /workspace/spawn/maps/witness, so the scripts do not run from this directory as they stand. They were run here only through a stdin copy with the roots replaced.
- Scripts are split by purpose: discovery (enum-feed), world walk (scan-*), per-manifest checks (manifest-*), full verification (verify-*), and naming and bucket hypothesis tests (encoder-test, bucket-test*). The data files are the raw outputs and are never edited in place.
- verify-all-manifests.mjs appears to have been superseded by verify-v3.mjs (the v3 script is the later, gzip-aware version; no note in the directory says so). The v3 run decodes gzip frames before comparing hashes, which turns the one exception into a match. Both outputs are kept side by side in data.
- Denominators are kept apart on purpose. 2848 is the feed-world count, 2580 is the manifest count, 399 is the /cdn/ GLB world count, and 256 or 259 is the missing-head count.

## Open gaps

- Data directory: the README names data/manifests-all-results.partial.jsonl. It is not in the directory. Source: /workspace/savi/spawn-evidence/README.md (old name: savi) (old name: spawn).
- Probe inputs under /tmp/spawn-probe (cdn-scan inputs for pick-manifests.mjs and verify-v3.mjs, wide-all/results.jsonl, wide-all/d048.bin, the sf/ spawnfile output, the feed-scan and full-scan files used by aggregate.mjs, and the enumeration log) are not copied. Source: /workspace/savi/spawn-evidence/probe-scripts/verify-v3.mjs (old name: savi) (old name: spawn) (its hard-coded root) and /workspace/savi/spawn-evidence/maps/spawn-root-worlds-map.md (old name: savi) (old name: spawn) (ephemeral notes).
- The cdn-scan stage label manifest-parse is used for 259 worlds whose head returned a 404 error body, because scan-cdn.mjs does not check the status before parsing. The records do not carry the status. Source: /workspace/savi/spawn-evidence/probe-scripts/scan-cdn.mjs (old name: savi) (old name: spawn).
- Nine worlds had a network error in the cdn-scan run (head 6, manifest 3). They are not in the 2580 manifest set. The map says all nine resolved on retry, but no retry output is in the directory. Source: /workspace/savi/spawn-evidence/maps/spawn-root-worlds-map.md (old name: savi) (old name: spawn), section "Totals" under the full CDN scan.
- FINDINGS.md still describes the manifest exception as not interpreted and the corpus as 2579 of 2580, but the v3 output in data resolves it. Source: /workspace/savi/spawn-evidence/FINDINGS.md (old name: savi) (old name: spawn), line 35.
- The 2848 feed worlds are a snapshot of three feed sorts. The map says the enumeration log is ephemeral and has no durable copy. Source: /workspace/savi/spawn-evidence/maps/spawn-root-worlds-map.md (old name: savi) (old name: spawn), line 142.
- The witness .bin files (mf-*.bin) do not record which world or manifest id they came from. Source: /workspace/savi/spawn-evidence/maps/witness/ (old name: savi) (old name: spawn).
- The chunk-c.mjs copy has no probe that consumes it, and no finding names a specific line in it. Source: /workspace/savi/spawn-evidence/probe-scripts/chunk-c.mjs (old name: savi) (old name: spawn).

## Sources

- /workspace/savi/spawn-evidence/README.md (old name: savi) (old name: spawn)
- /workspace/savi/spawn-evidence/FINDINGS.md (old name: savi) (old name: spawn)
- /workspace/savi/spawn-evidence/maps/spawn-root-worlds-map.md (old name: savi) (old name: spawn)
- /workspace/savi/spawn-evidence/maps/glb-urls-all.tsv (old name: savi) (old name: spawn)
- /workspace/savi/spawn-evidence/maps/head404-confirmed-worlds.txt (old name: savi) (old name: spawn)
- /workspace/savi/spawn-evidence/maps/head-present-manifest404-worlds.txt (old name: savi) (old name: spawn)
- /workspace/savi/spawn-evidence/maps/open-missing-head-worlds.txt (old name: savi) (old name: spawn)
- /workspace/savi/spawn-evidence/maps/unverified-noncdn-refs.tsv (old name: savi) (old name: spawn)
- /workspace/savi/spawn-evidence/maps/witness/mf-bdabcf5a-scanned.bin (old name: savi) (old name: spawn)
- /workspace/savi/spawn-evidence/maps/witness/mf-gm-manhattan-scanned.bin (old name: savi) (old name: spawn)
- /workspace/savi/spawn-evidence/maps/witness/mf-gta-earth-scanned.bin (old name: savi) (old name: spawn)
- /workspace/savi/spawn-evidence/maps/witness/manifest-sample40/pick.json (old name: savi) (old name: spawn)
- /workspace/savi/spawn-evidence/maps/witness/manifest-sample40/manifest-check.mjs (old name: savi) (old name: spawn)
- /workspace/savi/spawn-evidence/maps/witness/manifest-chain.mjs (old name: savi) (old name: spawn)
- /workspace/savi/spawn-evidence/maps/witness/manifest-hashmatch.mjs (old name: savi) (old name: spawn)
- /workspace/savi/spawn-evidence/maps/witness/ra-0.body (old name: savi) (old name: spawn)
- /workspace/savi/spawn-evidence/maps/witness/rb-0.body (old name: savi) (old name: spawn)
- /workspace/savi/spawn-evidence/maps/witness/encoder-bucket/encoder-test.mjs (old name: savi) (old name: spawn)
- /workspace/savi/spawn-evidence/probe-scripts/enum-feed.mjs (old name: savi) (old name: spawn)
- /workspace/savi/spawn-evidence/probe-scripts/scan-cdn.mjs (old name: savi) (old name: spawn)
- /workspace/savi/spawn-evidence/probe-scripts/scan-fast.mjs (old name: savi) (old name: spawn)
- /workspace/savi/spawn-evidence/probe-scripts/scan-urls.mjs (old name: savi) (old name: spawn)
- /workspace/savi/spawn-evidence/probe-scripts/scan-spawnfile.mjs (old name: savi) (old name: spawn)
- /workspace/savi/spawn-evidence/probe-scripts/manifest-chain.mjs (old name: savi) (old name: spawn)
- /workspace/savi/spawn-evidence/probe-scripts/manifest-check.mjs (old name: savi) (old name: spawn)
- /workspace/savi/spawn-evidence/probe-scripts/manifest-order.mjs (old name: savi) (old name: spawn)
- /workspace/savi/spawn-evidence/probe-scripts/manifest-frames.mjs (old name: savi) (old name: spawn)
- /workspace/savi/spawn-evidence/probe-scripts/manifest-hashmatch.mjs (old name: savi) (old name: spawn)
- /workspace/savi/spawn-evidence/probe-scripts/pick-manifests.mjs (old name: savi) (old name: spawn)
- /workspace/savi/spawn-evidence/probe-scripts/verify-all-manifests.mjs (old name: savi) (old name: spawn)
- /workspace/savi/spawn-evidence/probe-scripts/verify-v3.mjs (old name: savi) (old name: spawn)
- /workspace/savi/spawn-evidence/probe-scripts/aggregate.mjs (old name: savi) (old name: spawn)
- /workspace/savi/spawn-evidence/probe-scripts/encoder-test.mjs (old name: savi) (old name: spawn)
- /workspace/savi/spawn-evidence/probe-scripts/bucket-test.mjs (old name: savi) (old name: spawn)
- /workspace/savi/spawn-evidence/probe-scripts/bucket-test2.mjs (old name: savi) (old name: spawn)
- /workspace/savi/spawn-evidence/probe-scripts/bucket-test3.mjs (old name: savi) (old name: spawn)
- /workspace/savi/spawn-evidence/probe-scripts/chunk-c.mjs (old name: savi) (old name: spawn)
- /workspace/savi/spawn-evidence/data/cdn-scan-0.jsonl (old name: savi) (old name: spawn)
- /workspace/savi/spawn-evidence/data/feed-worlds.json (old name: savi) (old name: spawn)
- /workspace/savi/spawn-evidence/data/pick.json (old name: savi) (old name: spawn)
- /workspace/savi/spawn-evidence/data/manifests-all-results.jsonl (old name: savi) (old name: spawn)
- /workspace/savi/spawn-evidence/data/manifests-all-v3-results.jsonl (old name: savi) (old name: spawn)
- /workspace/savi/spawn-evidence/data/exception-d048ad06.bin (old name: savi) (old name: spawn)
