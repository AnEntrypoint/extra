# jayzee maps directory overview

## How it works

The maps directory (on disk: /workspace/spawn/maps/ (old name: spawn)) holds the read-only evidence and derived lists for the jayzee project's world-store and CDN survey of play.spawn.co worlds. It has two halves: seven top-level files (two prose records and five lists) and a witness/ directory holding the scripts, the byte inputs those scripts read, and the sha256 manifest that checks those inputs. Nothing in maps/ writes to the network; the scripts only read files, and the figures in the prose records were produced by earlier probes that are described in the learning record.

Total: 116 files, in five directories (the root, witness/, witness/encoder-bucket/, witness/manifest-sample40/, witness/text-visible-307-inputs/).

### Top-level files

| File | Size | What it holds | Wiki page |
|---|---|---|---|
| spawn-learning-record.md (old name: spawn) | 17.5 KB | The consolidated learning record: denominators, manifest corpus, key-occurrence counts, escape negatives, the bucket rule, the 410 status, error keys, non-CDN refs, open items and the name decode direction. | [maps-learning-record.md](maps-learning-record.md), [maps-learning-record-part-1.md](maps-learning-record-part-1.md), [maps-learning-record-part-2.md](maps-learning-record-part-2.md) |
| spawn-root-worlds-map.md (old name: spawn) | 28.8 KB | The read-only map of the 74 worlds linked from the root page, the world-store GLB scan notes, the creator profile notes, the public API notes, the CDN scan result and the missing-head reconciliation. | [maps-root-worlds.md](maps-root-worlds.md) |
| glb-urls-all.tsv | 732 KB | 2416 verified GLB rows across 399 worlds: one row per world and GLB sha256, with URL, HTTP status, content type, magic and the pass that verified it. | [maps-glb-urls.md](maps-glb-urls.md) |
| head404-confirmed-worlds.txt | 8.4 KB | 256 world uuids (no dashes) whose world-store head.json returns 404 head_not_found. | [maps-head-status.md](maps-head-status.md) |
| head-present-manifest404-worlds.txt | 99 B | 3 world uuids whose head.json returns 200 with a null manifest. | [maps-head-status.md](maps-head-status.md) |
| open-missing-head-worlds.txt | 8.5 KB | 259 world uuids, the original missing-head list, which over-counts by the 3 head-present worlds. | [maps-head-status.md](maps-head-status.md) |
| unverified-noncdn-refs.tsv | 23.8 KB | 83 non-CDN data references with their retry status, extension and URL. | [maps-noncdn-refs.md](maps-noncdn-refs.md) |

### witness/ directory

The witness/ directory (old name of the tree: spawn, path /workspace/spawn/maps/witness/ (old name: spawn)) holds 26 top-level files, plus three subdirectories.

| Path inside witness/ | Count | What it holds |
|---|---|---|
| manifest-chain.mjs | 1 | Script: walks the length-prefixed frame chain of one manifest file and checks that every frame is JSON and the chain ends at end of file. |
| manifest-hashmatch.mjs | 1 | Script: checks that each frame body or whole frame hashes to a sha256 listed in the manifest sheet. |
| mf-bdabcf5a-scanned.bin, mf-gm-manhattan-scanned.bin, mf-gta-earth-scanned.bin | 3 | The three scanned manifest files (Need for Spawn, GTA Manhattan and GTA Earth worlds) read by the two manifest scripts. |
| ra-0.body ... ra-7.body | 8 | Saved response bodies of resolve-adventure probes: six of the eight are found or not_found JSON bodies (ra-0, ra-3, ra-5 found; ra-1, ra-2, ra-4, ra-6, ra-7 not_found). |
| rb-0.body ... rb-7.body | 8 | Saved response bodies of further resolve-adventure probes: rb-0 and rb-1 "Invalid query" (400), rb-2 to rb-4 "Redirecting..." (307/308 body), rb-5 to rb-7 found JSON. |
| text-key-census.mjs | 1 | Script: counts distinct world.assets keys in every file under the roots given as arguments. |
| text-visible-307-derive.mjs | 1 | Script: the ephemeral derivation of the 307 key set, over files older than an mtime cutoff under the probe tree. |
| text-visible-307-derive-durable.mjs | 1 | Script: the durable derivation of the 307 key set, reading only text-visible-307-inputs/. |
| text-visible-307-inputs.sha256.txt | 1 | The sha256 manifest of the 67 contributing paths (38 unique contents) for the 307 derivation. |
| text-visible-307-keys.txt | 1 | The 307 distinct world.assets key names, one per line. |
| encoder-bucket/ | 3 scripts | Bucket-rule and encoder scripts (see below). |
| manifest-sample40/ | 42 files | 40 manifest .bin files chosen by pick.json, plus manifest-check.mjs and pick.json. |
| text-visible-307-inputs/ | 38 files | 38 content-addressed .bin inputs for the durable 307 derivation (see the witness inputs page). |

Counts check: 7 top-level files, 26 witness top-level files, 3 encoder-bucket scripts, 42 manifest-sample40 files and 38 text-visible-307-inputs files, a total of 116.

### encoder-bucket/

| File | What it does |
|---|---|
| encoder-test.mjs | Collects key names from the probe tree and the witness tree, decodes ~2f and ~3a, re-encodes, and counts round trips. |
| bucket-test.mjs | Tests eight sha-based and name-based hypotheses for the two-hex bucket xx of world.assets/xx/, over distinct (bucket, sha, ext) pairs. |
| bucket-test3.mjs | Tests frame-body, frame-whole, key-text and value-sha hypotheses for the bucket over distinct keys found in decoded frames. |

### manifest-sample40/

Forty manifest .bin files, each named by the sha256 of its manifest, plus pick.json and manifest-check.mjs. pick.json records 2580 distinct manifests and the 40 picked (manifest hash m, world uuid u) pairs. manifest-check.mjs checks the chain and the sheet order of one manifest file.

### text-visible-307-inputs/

Thirty-eight .bin files, each named by its own sha256 (name = sha256 + ".bin"). They are the text-visible inputs for the 307 derivation. See [maps-witness-inputs.md](maps-witness-inputs.md).

## Decisions

- Keep the 116 files in one tree, with inputs next to the scripts that read them, so each script runs from absolute paths without a build step. Evidence: every script takes its input path from argv or from a path relative to its own file (text-visible-307-derive-durable.mjs uses import.meta.url).
- Make the durable 307 derivation read only content-addressed inputs and the ephemeral one read the probe tree, because the probe tree is ephemeral. Evidence: the learning record section 1 says the original 1173-file input is not preserved and the durable copy has 38 inputs with hashMismatches 0.
- Keep the two prose records at the top level and the lists as plain text or TSV so they can be grepped. Evidence: spawn-root-worlds-map.md (old name: spawn) cites glb-urls-all.tsv, and spawn-learning-record.md (old name: spawn) cites the TSV and txt lists by file name.
- Keep the non-matching lists rather than overwrite them. Evidence: spawn-root-worlds-map.md (old name: spawn) says open-missing-head-worlds.txt "is still kept as recorded at the time and is not overwritten".

## Open gaps

- The original 1173-file text input for the 307 count is not preserved in maps/ (learning record section 1).
- The ephemeral derivation scripts depend on /tmp/spawn-probe (old name: spawn), which is not part of maps/ (see maps-witness.md).
- None further for the directory listing itself.

## Sources

- /workspace/spawn/maps/ (old name: spawn)
- /workspace/spawn/maps/spawn-learning-record.md (old name: spawn)
- /workspace/spawn/maps/spawn-root-worlds-map.md (old name: spawn)
- /workspace/spawn/maps/glb-urls-all.tsv (old name: spawn)
- /workspace/spawn/maps/head404-confirmed-worlds.txt (old name: spawn)
- /workspace/spawn/maps/head-present-manifest404-worlds.txt (old name: spawn)
- /workspace/spawn/maps/open-missing-head-worlds.txt (old name: spawn)
- /workspace/spawn/maps/unverified-noncdn-refs.tsv (old name: spawn)
- /workspace/spawn/maps/witness/ (old name: spawn)
