# jayzee witness input directories and their sha256 checks

## How it works

The witness tree holds three kinds of input, each with its own check. None of them is an edited copy: each was copied byte for byte from a probe output, and each is named or listed by the sha256 of its bytes, so a changed input is detected.

| Input | Location (old name: spawn) | Count | Check |
|---|---|---|---|
| Content-addressed text inputs | /workspace/spawn/maps/witness/text-visible-307-inputs/ (old name: spawn) | 38 .bin files, 6773647 bytes in total | Each file's sha256 equals its file name. Checked by text-visible-307-derive-durable.mjs (`hashMismatches`). |
| Sha manifest for the 307 derivation | /workspace/spawn/maps/witness/text-visible-307-inputs.sha256.txt (old name: spawn) | 67 lines, 38 unique hashes | Lists each contributing path with its sha256 and `keyMatches`. Checked by re-hashing the files. |
| Sampled manifests | /workspace/spawn/maps/witness/manifest-sample40/ (old name: spawn) | 40 .bin files, picked by pick.json from 2580 distinct manifests | Each file is named by its manifest hash from the scan (not by the sha256 of its bytes). Checked by manifest-check.mjs (chain and ordering). |

The three scanned manifests in the witness root (mf-bdabcf5a-scanned.bin, mf-gm-manhattan-scanned.bin, mf-gta-earth-scanned.bin) are a fourth input group. They are read by manifest-chain.mjs and manifest-hashmatch.mjs. Their names carry the world prefix and the scanned tag, and they are not named by their sha256.

### 1. text-visible-307-inputs/ (38 files)

- What it is: the 38 unique contents of the text files that held the 307 text-visible `world.assets/<xx>/...yaml` keys. Each file is named `<sha256 of its bytes>.bin`, so a file's name is its own check. The directory is the durable input for the 307 count (see [maps-witness.md](maps-witness.md), script 6).
- Sha256 check: all 38 files were re-hashed for this wiki. Each computed sha256 matched its file name, with 0 mismatches. The durable script reports `inputFiles:38, hashMismatches:0`.
- Key content: the directory yields 307 distinct keys, of which 298 carry a value sha (`~2fcdn~2fvalue.<sha>.<ext>.yaml`) and 9 are named without a sha (`~2fcdn~2f<name>.<ext>.yaml`). It has 614 `~2f` occurrences and no `~3a` or `~7e`.
- Sizes: the 38 files are 6773647 bytes in total. The largest is 886220 bytes and the smallest is 347 bytes. The record gives the total as 6.6 MB.
- Some inputs are the same bytes as sampled manifests: the sha file lists 01a450bdc013b081b6cb93406885b9e3bff63cc8b44f755a2358db3967fb9ced for manifest-sample40/15b5aa7ff5b54123140b8c4eb8b304558f56f30efe08337b9a11f3502822d850.bin, and the three scanned manifests also have their sha256 among the 38 input names.

### 2. text-visible-307-inputs.sha256.txt (67 lines)

- What it is: the record of how the 38 inputs were collected. Each line is three fields: the sha256 of the file, the path it was found at, and `keyMatches=N` (the number of key matches in that file).
- Structure: 67 lines, 3 fields each. There are 38 distinct sha256 values, so some contents were found at more than one path. The `keyMatches` values sum to 739.
- Paths: the rows point at ephemeral trees and at the durable tree. Counts by directory:
  - /tmp/spawn-probe/wide (old name: spawn): 21
  - /workspace/spawn/maps/witness/manifest-sample40 (old name: spawn): 21
  - /workspace/spawn/maps/witness (old name: spawn): 3
  - /tmp/spawn-probe/scan-<world> directories (old name: spawn): 14 (4 scan-41cd…, 4 scan-bdabcf5a…, 3 scan-26f64424…, 3 scan-4e709464…)
  - /tmp/spawn-probe/ (old name: spawn) (6 rows), /tmp/spawn-probe/ext (1), /tmp/spawn-probe/vals (1): 8 in total
- Sha256 check: the rows under /tmp/spawn-probe (old name: spawn) (43 rows) cannot be re-hashed now because the tree is ephemeral. The 24 rows under /workspace/spawn/maps/witness/ (old name: spawn) (3 scanned manifests and 21 sample files) were re-hashed for this wiki, and all 24 match their listed sha256.
- Relationship to the inputs directory: the 38 unique sha256 values in the list are exactly the 38 file names in text-visible-307-inputs/ (set equality checked for this wiki).

### 3. text-visible-307-keys.txt (307 lines)

The list of the 307 key names, one per line, with no duplicates (checked). Each name begins with `~2fcdn~2f`. The key set is the output of the durable derivation, and text-key-census.mjs over the inputs directory returns the same 307.

### 4. manifest-sample40/ (40 files)

- What it is: 40 manifest files picked from the 2580 distinct manifests. pick.json records `distinct: 2580` and lists 40 entries, each with `m` (the manifest hash, which is also the file name) and `u` (a world uuid, dashed).
- Sha256 check: the file names are manifest ids from the scan, not the sha256 of the bytes. Re-hashing for this wiki gives 40 of 40 names that do not equal their content sha256, so no content check applies to this directory. The chain and ordering check is done by manifest-check.mjs: all 40 files pass (chain ends at EOF, frames ordered against the sheet, every body hash in the sheet).
- Sizes: the 40 files total 6950059 bytes. Hash counts per manifest range from 3 to 421.
- The sample is the input of the manifest-check run. The pick.json file is the record of the pick.

### 5. The scanned manifests (witness root)

- mf-bdabcf5a-scanned.bin: 645995 bytes, 274 sheet hashes, for world bdabcf5a (Need for Spawn).
- mf-gm-manhattan-scanned.bin: 513116 bytes, 69 sheet hashes, for world 41cd4649 (GTA Manhattan). Its size matches the response of `GET /manifests/5a526ee6…` recorded in the learning record (513116 bytes); the bytes themselves were not compared, and the file's own sha256 is 38a87c836d57c7ce19c78b9828cab3b3f1ae68754d58741fd3c3a23574821abc.
- mf-gta-earth-scanned.bin: 186349 bytes, 80 sheet hashes, for world 4e709464 (GTA Earth).

Each file's frame chain ends exactly at EOF, and each frame body hashes to a sheet entry (manifest-chain.mjs and manifest-hashmatch.mjs, see [maps-witness.md](maps-witness.md)).

## Decisions

- Name each content-addressed input by its own sha256, so the file name is the check. Evidence: text-visible-307-derive-durable.mjs computes sha256 of each file and compares it to `<sha>.bin`, and the run gives hashMismatches 0.
- Keep the collection record (the sha256 list with paths) even though most paths are ephemeral. Evidence: the record says the completeness of the 67 contributing paths "rests on" the ephemeral scan recorded in this file.
- Keep the sample of 40 manifests with pick.json. Evidence: the record's section 2 counts 2580 manifests, pick.json records distinct 2580 and 40 picks, and the sample is the set the manifest-check script reads.
- Keep the three scanned manifests as inputs for the chain and hash checks, not as content-addressed files. Evidence: their names carry the world and the scanned tag, and the manifest scripts read them by path.

## Open gaps

- The 43 probe paths in text-visible-307-inputs.sha256.txt (old name: spawn) are ephemeral and cannot be re-hashed. Only the 24 witness-tree paths were checked.
- The original 1173-file scope for the 307 count is not preserved; the 38 inputs are the durable reproduction (learning record section 1).
- The record gives 6.6 MB for the inputs; the measured total is 6773647 bytes (about 6.46 MiB).
- The record's statement that the 67 contributing paths are complete rests on an ephemeral mtime-cutoff scan (text-visible-307-derive.mjs, which gives 1154 files here).

## Sources

- /workspace/spawn/maps/witness/text-visible-307-inputs/ (old name: spawn), 38 .bin files
- /workspace/spawn/maps/witness/text-visible-307-inputs.sha256.txt (old name: spawn)
- /workspace/spawn/maps/witness/text-visible-307-keys.txt (old name: spawn)
- /workspace/spawn/maps/witness/manifest-sample40/ (old name: spawn), 40 .bin files, pick.json, manifest-check.mjs
- /workspace/spawn/maps/witness/mf-bdabcf5a-scanned.bin (old name: spawn), mf-gm-manhattan-scanned.bin (old name: spawn), mf-gta-earth-scanned.bin (old name: spawn)
- /workspace/spawn/maps/spawn-learning-record.md (old name: spawn), section 1 and section 2
