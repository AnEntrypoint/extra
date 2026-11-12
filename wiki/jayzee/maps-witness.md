# jayzee witness scripts

## How it works

The witness scripts in /workspace/spawn/maps/witness/ (old name: spawn) are the checks behind the jayzee learning record. Each script is a small Node.js ES module (.mjs) that reads files and prints one JSON line to stdout. None of them writes, none calls the network, and each takes its input path from argv or from a path relative to its own file. Nine scripts are in the tree:

| Script | Directory |
|---|---|
| manifest-chain.mjs | witness/ |
| manifest-hashmatch.mjs | witness/ |
| text-key-census.mjs | witness/ |
| text-visible-307-derive.mjs | witness/ |
| text-visible-307-derive-durable.mjs | witness/ |
| manifest-check.mjs | witness/manifest-sample40/ |
| encoder-test.mjs | witness/encoder-bucket/ |
| bucket-test.mjs | witness/encoder-bucket/ |
| bucket-test3.mjs | witness/encoder-bucket/ |

Run them with `node <absolute path to script> <args>`. Node on this machine does not accept the `-I` flag, so the scripts were run without it. Their imports are node: built-ins only, so no package install is needed.

The results below were produced for this wiki by running each script on the disk copy. Where a script reads /tmp/spawn-probe (old name: spawn), the result depends on that ephemeral tree being present.

### 1. manifest-chain.mjs

- What it does: reads a manifest file, walks its frames (each frame is a big-endian uint32 length followed by a body), parses each body as JSON, and records the first four and last two frames.
- Inputs: one manifest file path in argv[2], for example witness/mf-gta-earth-scanned.bin (old name: spawn).
- Output: one JSON line `{bytes, frames, chainEnd, exactEnd, allJson, first, last}`.
- Expected result, as run for this wiki:
  - mf-bdabcf5a-scanned.bin: bytes 645995, frames 275, chainEnd 645995, exactEnd true, allJson true.
  - mf-gm-manhattan-scanned.bin: bytes 513116, frames 70, chainEnd 513116, exactEnd true, allJson true.
  - mf-gta-earth-scanned.bin: bytes 186349, frames 81, chainEnd 186349, exactEnd true, allJson true.

The first frame of each file is a JSON object with keys `v` and `hashes`, which is the manifest sheet.

### 2. manifest-hashmatch.mjs

- What it does: reads the sheet (the first frame, a uint32 length then JSON with `hashes`), then for each following frame computes the sha256 of its body and of its whole length-prefixed bytes, and counts how many are listed in the sheet.
- Inputs: one manifest file path in argv[2].
- Output: one JSON line `{sheetHashes, frames, bodyHits, frameHits, sample, sheetFirst}`.
- Expected result, as run for this wiki:
  - mf-bdabcf5a-scanned.bin: sheetHashes 274, frames 274, bodyHits 274, frameHits 0.
  - mf-gm-manhattan-scanned.bin: sheetHashes 69, frames 69, bodyHits 69, frameHits 0.
  - mf-gta-earth-scanned.bin: sheetHashes 80, frames 80, bodyHits 80, frameHits 0.

So the sheet lists the sha256 of the frame body, not of the whole frame.

### 3. manifest-sample40/manifest-check.mjs

- What it does: for one manifest file, checks that the frame chain ends exactly at end of file, that the i-th frame body hashes to the i-th sheet hash (ordered), and that every body hash is in the sheet set.
- Inputs: one manifest file path in argv[2]. Used across the 40 files in manifest-sample40/, which are listed in pick.json.
- Output: one JSON line `{bytes, hashes, frames, chainEndsAtEOF, ordered, inSet}`.
- Expected result, as run for this wiki on 15b5aa7ff5b54123140b8c4eb8b304558f56f30efe08337b9a11f3502822d850.bin: bytes 169229, hashes 105, frames 105, chainEndsAtEOF true, ordered 105, inSet 105.
- Run over all 40 .bin files in manifest-sample40/: 40 rows, 40 with chainEndsAtEOF true and ordered and inSet equal to hashes and frames equal to hashes. The hash counts range from 3 to 421, and the total bytes are 6950059.

### 4. text-key-census.mjs

- What it does: walks every file under the roots given on the command line (depth up to 6), reads each as latin1 text, and collects distinct key names that match `world.assets/<2 hex>/<name>.yaml`.
- Inputs: one or more root directories in argv.
- Output: one JSON line `{roots, filesScanned, filesWithKeys, distinctKeys}`.
- Expected result, as run for this wiki:
  - Root witness/text-visible-307-inputs: filesScanned 38, filesWithKeys 38, distinctKeys 307.
  - Root /workspace/spawn/maps (old name: spawn): filesScanned 116, filesWithKeys 63, distinctKeys 307.

The second run includes the inputs, so the maps-only figure of 288 in the learning record requires excluding the inputs directory. The script has no exclusion option; the record's 288 is from an inline census of 78 files that excluded the inputs (see [maps-learning-record-part-1.md](maps-learning-record-part-1.md), section 1).

### 5. text-visible-307-derive.mjs

- What it does: walks /tmp/spawn-probe (old name: spawn) and the witness directory, keeps files whose mtime is not newer than the mtime of /tmp/spawn-probe/encoder-test.mjs (old name: spawn), and collects the same key regex.
- Inputs: none in argv. It depends on the ephemeral /tmp/spawn-probe tree and its encoder-test.mjs mtime.
- Output: one JSON line `{filesNotNewerThanScript, distinctKeys}`.
- Expected result, as run for this wiki: filesNotNewerThanScript 1154, distinctKeys 307.

This script is the ephemeral derivation. It cannot be re-run once /tmp/spawn-probe is gone. The 1154 files are the completeness scope of the 307 count, and the record says this scope is not preserved.

### 6. text-visible-307-derive-durable.mjs

- What it does: reads every .bin file in witness/text-visible-307-inputs/, computes its sha256 and compares it with its file name (`<sha256>.bin`), counts mismatches, collects the same key regex over each file as latin1, and counts the derived classes.
- Inputs: the directory witness/text-visible-307-inputs/ beside the script (found from import.meta.url), 38 .bin files.
- Output: one JSON line `{inputFiles, hashMismatches, distinctKeys, valueSha, namedNoSha, tilde2fOccurrences, tilde3a, tilde7e}`.
- Expected result, as run for this wiki: inputFiles 38, hashMismatches 0, distinctKeys 307, valueSha 298, namedNoSha 9, tilde2fOccurrences 614, tilde3a 0, tilde7e 0.

This is the durable reproduction of the 307 count, and it does not depend on /tmp.

### 7. encoder-bucket/encoder-test.mjs

- What it does: walks /tmp/spawn-probe (old name: spawn) and the witness directory (depth up to 4, files under 3 MB), collects distinct key names, counts `~xx` escapes, decodes `~2f` to `/` and `~3a` to `:`, re-encodes, and counts the round trips. It also reports the characters in the keys that are not alphanumeric or in `._/:~-`.
- Inputs: none in argv; /tmp/spawn-probe (old name: spawn) and the witness directory.
- Output: one JSON line `{distinctKeys, escapes, roundTripEncodeOfDecode, fails, nonAlnumCharsInKeys, sample}`.
- Expected result as run for this wiki: distinctKeys 11987, escapes `{"~2f":23974}`, roundTripEncodeOfDecode 11987, fails [], nonAlnumCharsInKeys [].

The record cites the same script with 307 keys (historical scope). This run on the present /tmp/spawn-probe tree gives 11987 distinct keys, the figure of the record's section 10, so the script's output depends on which tree it reads.

### 8. encoder-bucket/bucket-test.mjs

- What it does: walks the same roots as encoder-test.mjs, finds distinct (bucket xx, sha64, ext) triples from `world.assets/xx/~2fcdn~2fvalue.<sha64>.<ext>.yaml`, and tests eight hashes of sha and name against xx.
- Inputs: none in argv; /tmp/spawn-probe (old name: spawn) and the witness directory.
- Output: one JSON line `{files, distinctPairs, distinctBuckets, scores, sampleRows}`.
- Expected result as run for this wiki: files 1265, distinctPairs 11679, distinctBuckets 256, scores `sha256_of_sha_hex_prefix` 47, `sha256_of_name` 50, `sha256_of_keyname` 54, `sha256_of_sha_bytes` 34, `sha256_of_sha_string` 36, `md5_of_name` 45, `sha1_of_name` 51, `sha256_of_ext` 34.

Chance for 11679 pairs over 256 buckets is about 45.6 per hypothesis. None of the scores is large enough to promote a rule, which is consistent with the record's UNDETERMINED status. Some of the record's figures match these scores exactly and some do not (see [maps-learning-record-part-1.md](maps-learning-record-part-1.md), section 5).

### 9. encoder-bucket/bucket-test3.mjs

- What it does: for each .bin file in three directories (/tmp/spawn-probe/wide (old name: spawn), manifest-sample40/, and the witness directory), walks the decoded frames, and for each distinct key tests whether the frame body sha, the whole-frame sha, the key text sha or the value sha begins with the bucket xx.
- Inputs: the .bin files of those three directories.
- Output: one JSON line `{distinctKeysInFrames, matches}`.
- Expected result as run for this wiki: distinctKeysInFrames 279, and matches frameBody 0, frameWhole 0, keyText 0, valueSha 0.

Zero matches on all four tests means none of these four functions gives the bucket. The script's directory /tmp/spawn-probe/wide (old name: spawn) is ephemeral.

## How the scripts relate

- The durable 307 derivation (script 6) reads only the content-addressed inputs and is the reproduction the record names.
- The ephemeral 307 derivation (script 5) reads the probe tree and gives the completeness scope (1154 files).
- The manifest scripts (1, 2, 3) check the frame chain and sheet order of the manifest corpus. Their inputs are the copies in witness/ and witness/manifest-sample40/.
- The encoder and bucket scripts (7, 8, 9) read the probe tree and the witness tree, so their numbers depend on what is present under /tmp/spawn-probe (old name: spawn).

## Decisions

- Keep each script as a standalone .mjs with no package dependency, so each can be re-run with plain node. Evidence: all nine scripts import only node: built-ins.
- Keep a durable script beside an ephemeral one for the 307 count. Evidence: the record section 1 says the historical 307 figure is "NOT reproducible from the original input" and the durable script "reads only witness/text-visible-307-inputs/".
- Keep the bucket hypotheses as scored tests, not promoted rules. Evidence: bucket-test.mjs prints chance-level scores and the record marks the bucket rule UNDETERMINED.
- Verify the inputs by sha256 (script 6) before use. Evidence: script 6 counts hashMismatches, and the run gives 0.

## Open gaps

- The encoder and bucket scripts (7, 8, 9) and the ephemeral derivation (5) depend on /tmp/spawn-probe (old name: spawn), which is not in maps/. Their outputs differ with the tree they read (encoder-test.mjs gives 11987 here and 307 in the record).
- The record's bucket functions md5 and sha1 (49 and 40) do not match bucket-test.mjs (45 and 51), and the record says its ten functions were not re-run (see maps-learning-record-part-1.md).
- The record cites reconcile-gap.mjs (kwUniqueAcrossAll 11987) and verify-all-manifests.mjs (SUMMARY 2580 rows) and dt/keys-unique.txt; these are not in the maps tree, so they are not witnessed here.
- Script 5 cannot be re-run once /tmp/spawn-probe is removed.

## Sources

- /workspace/spawn/maps/witness/manifest-chain.mjs (old name: spawn)
- /workspace/spawn/maps/witness/manifest-hashmatch.mjs (old name: spawn)
- /workspace/spawn/maps/witness/manifest-sample40/manifest-check.mjs (old name: spawn)
- /workspace/spawn/maps/witness/manifest-sample40/pick.json (old name: spawn)
- /workspace/spawn/maps/witness/text-key-census.mjs (old name: spawn)
- /workspace/spawn/maps/witness/text-visible-307-derive.mjs (old name: spawn)
- /workspace/spawn/maps/witness/text-visible-307-derive-durable.mjs (old name: spawn)
- /workspace/spawn/maps/witness/encoder-bucket/encoder-test.mjs (old name: spawn)
- /workspace/spawn/maps/witness/encoder-bucket/bucket-test.mjs (old name: spawn)
- /workspace/spawn/maps/witness/encoder-bucket/bucket-test3.mjs (old name: spawn)
- /tmp/spawn-probe/ (old name: spawn), ephemeral
