# jayzee maps open gaps

## How it works

This page collects every open gap recorded in the jayzee maps directory (/workspace/spawn/maps/ (old name: spawn)) and in the wiki pages written for it. Each gap is listed once, with its status as the source gives it and the source it comes from. A gap is either OPEN (a question with no answer yet), INFERRED or UNCONFIRMED (a claim without a direct witness), UNDETERMINED (a hypothesis that failed or was not tested), or a plain gap in the evidence (a file, count or re-run missing from the tree). Where the source says a gap is resolved, it is not listed.

The gaps are grouped by the subject they affect.

### Gap register

#### Denominators and counts

| Gap | Status | Source |
|---|---|---|
| The 307 text-visible key count cannot be reproduced from the original 1173-file input, which is not preserved. The durable reproduction uses 38 inputs. | Open (evidence gap) | spawn-learning-record.md (old name: spawn), section 1; [maps-learning-record-part-1.md](maps-learning-record-part-1.md) |
| The 1154-file completeness scope for the 307 count depends on an ephemeral mtime cutoff under /tmp/spawn-probe (old name: spawn). | Open (evidence gap) | spawn-learning-record.md (old name: spawn), section 1; witness/text-visible-307-derive.mjs (old name: spawn) |
| The maps-only key count of 288 needs an inline census with the inputs excluded; no script in the tree produces it. | Open (evidence gap) | spawn-learning-record.md (old name: spawn), section 1 |
| encoder-test.mjs gives 307 in the record and 11987 distinct keys on the present probe tree. Its output depends on the tree it reads. | Open (reproducibility) | witness/encoder-bucket/encoder-test.mjs (old name: spawn); [maps-witness.md](maps-witness.md) |
| The record's 2580-manifest summary (verify-all-manifests.mjs), the key count by reconcile-gap.mjs and the file dt/keys-unique.txt are cited but not in the maps tree. | Open (evidence gap) | spawn-learning-record.md (old name: spawn), sections 1 to 2, 10 |
| The 77 first-pass status 0 refs are unverified and were not re-checked. | Open (unverified) | spawn-root-worlds-map.md (old name: spawn), "Non-GLB types"; [maps-root-worlds.md](maps-root-worlds.md) |
| The 38 creator profile pages are not mapped; the root link list gave 37 handles, and the count should be recounted if the root changes. | Open (not mapped) | spawn-root-worlds-map.md (old name: spawn), "Not mapped" and "Creator profiles" |
| Descriptions and version counts for worlds 21 to 74 are not captured. | Open (not mapped) | spawn-root-worlds-map.md (old name: spawn), "Not mapped" |
| Counts on the root map drift between reads (for example deepfall 4 plays earlier, 6 later). | Recorded (no fix) | spawn-root-worlds-map.md (old name: spawn), introduction |
| The first_pass_status column of unverified-noncdn-refs.tsv (old name: spawn) is 0 for all 83 rows, while the record says 81 resolved with first-pass status 200. | Open (evidence gap) | unverified-noncdn-refs.tsv (old name: spawn); [maps-noncdn-refs.md](maps-noncdn-refs.md) |
| The record's title says "2 OPEN" for non-CDN refs; after the mp4 was confirmed, section 8 explicitly leaves one OPEN row (the ttf 401). The second open item is not named. | Open (record ambiguity) | spawn-learning-record.md (old name: spawn), section 8 |
| The record's non-CDN class total of 82 200s counts the timed-out mp4 as a HEAD 200; the file counts it as a timeout. | Recorded (explained) | spawn-learning-record.md (old name: spawn), section 11; [maps-noncdn-refs.md](maps-noncdn-refs.md) |

#### Bucket rule and encoder

| Gap | Status | Source |
|---|---|---|
| The bucket rule for world.assets/<xx>/ is UNDETERMINED. Every sha-based and world-identity hypothesis tested is at chance or not promoted. | UNDETERMINED | spawn-learning-record.md (old name: spawn), section 5; [maps-learning-record-part-1.md](maps-learning-record-part-1.md) |
| The record's md5 and sha1 bucket hypotheses (49 and 40) do not match bucket-test.mjs (45 and 51), and the record says its ten functions were not re-run. | Open (evidence gap) | spawn-learning-record.md (old name: spawn), section 5; witness/encoder-bucket/bucket-test.mjs (old name: spawn) |
| The bucket-test3 hypotheses (frame body, whole frame, key text, value sha) give 0 matches over 279 keys. The record does not cite this. | Recorded (not in the record) | witness/encoder-bucket/bucket-test3.mjs (old name: spawn) |
| The encoder for `~` to `~7e` is unwitnessed in data (encode code and a jayzee fixture only). | Open (unwitnessed) | spawn-learning-record.md (old name: spawn), sections 4 and 9 |
| The encoder for `:` to `~3a` is witnessed only in the elided FAULTS F3 text. | Open (elided source) | spawn-learning-record.md (old name: spawn), section 9 |
| No `~3a` or `~7e` occurrences were found in the reached scope; this is a scoped negative only. | Scoped (not universal) | spawn-learning-record.md (old name: spawn), section 4 |
| The name decode and encode of the 11987 keys reproduces (11987 of 11987), but `dt/keys-unique.txt`, the file it ran over, is not in the tree. | Open (evidence gap) | spawn-learning-record.md (old name: spawn), section 10 |

#### Gone 410 and error keys

| Gap | Status | Source |
|---|---|---|
| No body-level 410 has been seen in 41 probes. The 41 total is record-reported; the tree holds bodies only for the ra and rb classes. | OPEN | spawn-learning-record.md (old name: spawn), section 6; witness/ra-*.body (old name: spawn), witness/rb-*.body (old name: spawn) |
| The condition that selects the drifted-head `unknown_world_store_key` case (world 41cd4649…, head naming manifest 3fa9a434…) is not known. The case is not reproduced; the manifest now returns 200. | OPEN | spawn-learning-record.md (old name: spawn), section 7 |
| The saved bodies of the drifted-head case (/tmp/spawn-probe/r-8244be9f.bin (old name: spawn), /tmp/spawn-probe/mf-gta-earth-head.bin (old name: spawn)) hold only the error text, so the selecting condition cannot be characterised. | OPEN (ephemeral evidence) | spawn-learning-record.md (old name: spawn), section 7 |
| The `value_not_found` condition is tested for two absent hashes only; it is not a rule for all absent hashes. | Scoped (not universal) | spawn-learning-record.md (old name: spawn), section 7 |
| The `head_not_found` count of 256 was not re-counted; 3 were sampled. | Open (not re-counted) | spawn-learning-record.md (old name: spawn), section 7; [maps-head-status.md](maps-head-status.md) |
| The earlier all-zero-world timeout (15 s) is not reproduced; the audit returned 404 head_not_found. | Superseded | spawn-learning-record.md (old name: spawn), section 7 |
| Head drift on GTA Earth (manifest d0d3c548… in the earlier scan, 73f860a9… in a later read, b0d8aa7e… in the audit read) is a set of observations on one world, not a rule. | Scoped (not universal) | spawn-learning-record.md (old name: spawn), section 7; spawn-root-worlds-map.md (old name: spawn), "World-store contents" |

#### Non-CDN refs

| Gap | Status | Source |
|---|---|---|
| The ttf row with sha d5558cd4… (world c355fcf8468745feb0b2ba8254aa4dee) returns 401 application/json on retry. It is recorded as is and not bypassed. | OPEN | unverified-noncdn-refs.tsv (old name: spawn); spawn-learning-record.md (old name: spawn), section 8; [maps-noncdn-refs.md](maps-noncdn-refs.md) |
| The 401 is described as a credentialed-looking refusal; its cause is not established. | Open | spawn-learning-record.md (old name: spawn), section 11 |
| The mp4 row (world b185f36d…) was confirmed by a full ranged download and sha256 for that one fetch only. | Scoped (one fetch) | spawn-learning-record.md (old name: spawn), section 8 |
| Only the mp4 non-CDN object was downloaded in full; the other 80 resolved rows were checked by one retry request each. | Open (evidence scope) | unverified-noncdn-refs.tsv (old name: spawn) |

#### CDN, GLB and spawnfile

| Gap | Status | Source |
|---|---|---|
| The claim that every GLB and asset is served only under play.spawn.co/cdn/ is INFERRED. Named keys reach their bytes through a 302 to value-origin. | INFERRED (weakened) | spawn-learning-record.md (old name: spawn), sections 9 and 11; spawn-root-worlds-map.md (old name: spawn), "Model URL naming" |
| spawnfile.io model bytes are UNCONFIRMED. The leaf name `<unix-ms>-savi-reduced-fitted.glb` is elided in cleetus FAULTS F3 and was not guessed. | UNCONFIRMED | spawn-learning-record.md (old name: spawn), section 9; spawn-root-worlds-map.md (old name: spawn), "Spawnfile-family scan" |
| The spawnfile.io family is absent from all 2848 feed worlds the scanner reached (0 refs). | Recorded | spawn-root-worlds-map.md (old name: spawn), "Spawnfile-family scan" |
| The spawnfile.io asset URLs for other creators' worlds are not mapped. | Open (not mapped) | spawn-root-worlds-map.md (old name: spawn), "Not mapped" |
| The 9 named keys of the text-visible set are a subset of the 308 decoded named keys; the relation is not promoted. | Scoped | spawn-learning-record.md (old name: spawn), section 9 |
| The GLB first-pass errors (23 refs) were re-checked (16 recheck and 7 retry rows); the first-pass error of each row is not in the TSV. | Open (evidence scope) | [maps-glb-urls.md](maps-glb-urls.md); spawn-root-worlds-map.md (old name: spawn), "Full CDN scan result" |
| The per-shard counts of the 16-shard scan do not map to a column in glb-urls-all.tsv (old name: spawn), so shard membership cannot be recovered. | Open (evidence gap) | spawn-root-worlds-map.md (old name: spawn), "Full CDN scan result"; [maps-glb-urls.md](maps-glb-urls.md) |
| The chunk decodes O3, A3, l9, cA, the default cell name CvB, and the LOD format 1.3.0 meaning were not decoded. | Open (not decoded) | spawn-root-worlds-map.md (old name: spawn), "Spatial storage" and "Cell paths" |
| The world-store to local-store tie (pinWorld and pinNames) has no byte-level check. | INFERRED | spawn-root-worlds-map.md (old name: spawn), "Spatial storage" |
| The chunk-derived cell caps (LRU) are inferred, not confirmed by a live run. | INFERRED | spawn-root-worlds-map.md (old name: spawn), "Reading (inferred)" |
| The public API routes listed (openapi.json, llms.txt) are not all used; the credentialed routes were not used. | Scoped (not used) | spawn-root-worlds-map.md (old name: spawn), "Public API routes" |
| The root snapshot is dated 2026-11-07; the feed enumeration (2848 worlds) and the root map (74 worlds) are different sets. | Recorded (scope) | spawn-root-worlds-map.md (old name: spawn), introduction and "Feed enumeration" |

#### Head status

| Gap | Status | Source |
|---|---|---|
| The original 259 missing-head list over-counts by 3 head-present worlds; the true missing-head family is 256. The 259 list is kept, not overwritten. | Corrected (kept as recorded) | open-missing-head-worlds.txt (old name: spawn); [maps-head-status.md](maps-head-status.md) |
| The three head-present worlds have no named manifest, so no manifest-level status is recorded. | Open | head-present-manifest404-worlds.txt (old name: spawn); [maps-head-status.md](maps-head-status.md) |
| World 9f7b1a067caa46e2b2c1c7dceb48bc2b had head status 0 on first pass and 200 on re-check; it is in no list. | Recorded | spawn-root-worlds-map.md (old name: spawn), "Spawnfile-family scan" |

#### Witness inputs and scripts

| Gap | Status | Source |
|---|---|---|
| The 43 probe-tree rows of the 307 input sha list are ephemeral and cannot be re-hashed. | Open (ephemeral) | witness/text-visible-307-inputs.sha256.txt (old name: spawn); [maps-witness-inputs.md](maps-witness-inputs.md) |
| The manifest-sample40 file names are manifest ids, not content sha256 values, so the sample has no content-hash check. | Open (evidence gap) | witness/manifest-sample40/ (old name: spawn); [maps-witness-inputs.md](maps-witness-inputs.md) |
| The record gives 6.6 MB for the 38 inputs; the measured total is 6773647 bytes. | Recorded (rounding) | spawn-learning-record.md (old name: spawn), section 1; [maps-witness-inputs.md](maps-witness-inputs.md) |
| text-visible-307-derive.mjs (old name: spawn) and encoder-test.mjs, bucket-test.mjs and bucket-test3.mjs read /tmp/spawn-probe (old name: spawn), which is not in maps/. | Open (ephemeral dependency) | [maps-witness.md](maps-witness.md) |
| The probe scripts cited by the record (/tmp/spawn-probe/probe-cdn-named.mjs (old name: spawn), scan-cdn.mjs, scan-spawnfile.mjs, worldscan.sh, scan-fast.mjs, scan-urls.mjs, enum-feed.log, the chunk files) are not in the maps tree. | Open (ephemeral) | spawn-learning-record.md (old name: spawn), sections 8 to 11; spawn-root-worlds-map.md (old name: spawn) |

#### Overview and layout

| Gap | Status | Source |
|---|---|---|
| The maps tree does not contain the durable copies of the 2580-row results; they are in /workspace/savi/spawn-evidence/ (old name: savi) (old name: spawn), outside maps/. | Recorded (outside scope) | spawn-learning-record.md (old name: spawn), introduction |
| The probes of the ra and rb classes (eight bodies each) are the only saved resolve-adventure bodies; the other probe bodies are not saved. | Open (evidence scope) | [maps-overview.md](maps-overview.md); witness/ra-*.body (old name: spawn), witness/rb-*.body (old name: spawn) |

## Decisions

- List each gap once, under the subject it affects. Evidence: the same gaps appear in more than one source section (for example the 410 status appears in section 6 and again in the section 9 list), so each is listed here with its source sections.
- Keep the source's status words (OPEN, INFERRED, UNCONFIRMED, UNDETERMINED, SUPERSEDED) as written. Evidence: the record uses these words in sections 5, 6, 7, 8, 9 and 11.
- List gaps that the wiki found while checking, marked as such. Evidence: the first_pass_status column mismatch, the sha256 check of the sample names, and the bucket md5 and sha1 mismatch were found by re-running the scripts for this wiki and are marked "evidence gap".

## Open gaps

- The tables above are the complete list of gaps gathered from the maps sources and the wiki pages written for them. Each row carries the status the source gives.
- No gap is listed here without a source path.

## Sources

- /workspace/spawn/maps/spawn-learning-record.md (old name: spawn)
- /workspace/spawn/maps/spawn-root-worlds-map.md (old name: spawn)
- /workspace/spawn/maps/glb-urls-all.tsv (old name: spawn)
- /workspace/spawn/maps/head404-confirmed-worlds.txt (old name: spawn)
- /workspace/spawn/maps/head-present-manifest404-worlds.txt (old name: spawn)
- /workspace/spawn/maps/open-missing-head-worlds.txt (old name: spawn)
- /workspace/spawn/maps/unverified-noncdn-refs.tsv (old name: spawn)
- /workspace/spawn/maps/witness/ (old name: spawn), including encoder-bucket/ and manifest-sample40/
