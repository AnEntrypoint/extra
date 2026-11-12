# jayzee GLB URL list (glb-urls-all.tsv)

## How it works

/workspace/spawn/maps/glb-urls-all.tsv (old name: spawn) is the full list of verified GLB (glTF binary) references found across the jayzee feed worlds. It has one row per (world, GLB sha256) pair. The file is 732 KB, with 2417 lines: one header line and 2416 data rows. Every data row was verified: HTTP 200 with content type model/gltf-binary and the first four bytes `glTF`.

### Structure

The file is tab-separated with a header row. Columns, in order:

| Column | Field | Content |
|---|---|---|
| 1 | world_uuid_nodash | World uuid with dashes removed (32 hex characters). |
| 2 | sha256 | The 64-hex sha256 of the GLB value. |
| 3 | url | `https://play.spawn.co/cdn/value.<sha256>.glb` (host verbatim). |
| 4 | file_map_value | The 64-hex sha256 of the world-store file-map value that named this GLB. This is the value in which the `world.assets/<xx>/~2fcdn~2fvalue.<sha256>.glb.yaml` key was found. |
| 5 | http | HTTP status of the check (200 for every row). |
| 6 | content_type | Content type of the check (model/gltf-binary for every row). |
| 7 | magic | First four bytes of the range GET (glTF for every row). |
| 8 | len | Content length in bytes, from the HEAD (or range) response. |
| 9 | how | The pass that verified the row: `scan`, `recheck` or `retry`. |

The first data row, for reference, is world 006bcac5a129417692af751fa22c0a6e, sha 00167a29b1eff422ae0a37e26364514106765d4f7e7548ddacef5c60b81c6106, file-map value aba1e48e8e206f857d1073c2e8be87a2b7d3affb078422e6e5ec1d5e4ffba9bc, length 1904160, how `scan`.

### Counts

| Measure | Value |
|---|---|
| Data rows | 2416 |
| Distinct worlds (column 1) | 399 |
| Distinct GLB sha256 (column 2) | 2355 |
| Rows with http 200 | 2416 (all) |
| Rows with content type model/gltf-binary | 2416 (all) |
| Rows with magic glTF | 2416 (all) |

Counts by source (column 9):

| how | Rows | Worlds that contributed | Meaning |
|---|---|---|---|
| scan | 2393 | 397 worlds (all worlds except ce907192e2dc46ac99a146aa35bd93db and df828aef896b4fdf881f7f69fe04c89c, which have no scan rows) | First-pass result of the CDN scan. |
| recheck | 16 | 4 worlds, each with its recheck rows: 408661ccc53e48de808a0ebf10662e3e (6 recheck rows; the world has 9 rows in total, 3 of them scan), 74d4802faadb4f78a1c7dc318d14ba41 (5 recheck rows; 7 in total, 2 scan), 8702a1639e2e425dbe1289c6b9c930df (4 recheck rows; 35 in total, 31 scan), ce907192e2dc46ac99a146aa35bd93db (1 recheck row, no scan rows) | GLB refs that errored on first pass (status 0 or ECONNRESET), re-checked and returned 200 glTF. |
| retry | 7 | 1 world: df828aef896b4fdf881f7f69fe04c89c (7 rows, no scan rows) | GLB refs resolved on a retry. |

The source record states that 23 refs errored on first pass, 16 of which re-checked as 200 glTF and 7 of which resolved on retry. The 16 recheck rows and 7 retry rows match this, and 16 + 7 = 23.

The per-world row counts above were read from the file for this wiki, and the scan-row counts per world are the difference between the world's total and its recheck or retry rows.

### Counts by world

The number of GLB rows per world, as a histogram over the 399 worlds (how many worlds have exactly n GLB rows):

| GLB rows in a world (n) | Worlds with n rows |
|---|---|
| 1 | 82 |
| 2 | 61 |
| 3 | 43 |
| 4 | 36 |
| 5 | 25 |
| 6 | 21 |
| 7 | 24 |
| 8 | 18 |
| 9 | 12 |
| 10 | 12 |
| 11 | 9 |
| 12 | 6 |
| 13 | 9 |
| 14 | 5 |
| 15 | 6 |
| 16 | 2 |
| 17 | 2 |
| 18 | 2 |
| 19 | 4 |
| 20 | 3 |
| 23 | 4 |
| 24 | 1 |
| 26 | 3 |
| 27 | 3 |
| 28 | 1 |
| 29 | 2 |
| 31 | 1 |
| 35 | 2 |

The histogram sums to 399 worlds and 2416 rows.

The largest worlds by GLB rows:

| World (uuid, no dashes) | GLB rows |
|---|---|
| 4948ad7694f24d438a8f149d16acfb37 | 35 |
| 8702a1639e2e425dbe1289c6b9c930df | 35 |
| 9c9f127f47c04c11bc361358f665d151 | 31 |
| 1221ec35aec044c4863dfd96e4bac56d | 29 |
| 915dae973de045cd8c1d9ee717be91b3 | 29 |
| 38fef5231b9e468394916337b107b106 | 28 |
| 0b9925fa9545471baf21f454ca79f736 | 27 |
| 4387515a2a4d4156b9a2503f488ed5eb | 27 |
| 767e1208d8c44a46a9958850bf032cbc | 27 |
| 98b7b53db25d4a8f9372e8f2c5cb9ced | 26 |

The full per-world table (399 rows) is not reproduced in this page. It is derived from the file with `awk -F'\t' 'NR>1{print $1}' glb-urls-all.tsv | sort | uniq -c | sort -rn`, which gives the same counts as the table above.

### Counts by world and source

The source column is the only per-row source. The per-world source split for the four recheck worlds and the one retry world is in the Counts by source table above.

### How it was derived

1. The world list came from the feed enumeration of www.spawn.co/api/feed (sort hot, top and recent, offsets up to about 2064), a union of 2848 unique worlds and 1002 creators (/tmp/spawn-probe/feed-worlds.json (old name: spawn)).
2. For each feed world, the scanner fetched `play.spawn.co/world-store/git/<uuid-no-dashes>/head.json`, then the manifest, then each value (the method is described in the root-worlds page, [maps-root-worlds.md](maps-root-worlds.md)).
3. Each file-map value was searched with the regex `~2fcdn~2fvalue\.([0-9a-f]{64})\.([a-z0-9]{1,6})\.yaml|cdn\/value\.([0-9a-f]{64})\.([a-z0-9]{1,6})`. Matches were HEAD-checked at `play.spawn.co/cdn/value.<sha>.<ext>`. For glb matches a range GET `bytes=0-3` checked the magic.
4. The scan ran in 16 shards (each with 178 worlds), /tmp/spawn-probe/cdn-scan-*.jsonl (old name: spawn), and wrote one line per check.
5. Worlds with no head.json (259 at scan time; 256 confirmed 404 head_not_found) produced no GLB rows; see [maps-head-status.md](maps-head-status.md).
6. Connection errors on first pass (status 0 or ECONNRESET) were re-checked into cdn-retry.jsonl and glb-recheck.json (old name: spawn), and the verified rows were appended with how = recheck or retry.
7. The 2416 rows that passed (HEAD 200 model/gltf-binary and magic glTF) were written to this TSV.

The record also says about 77 non-GLB refs returned status 0 on first pass and were not re-checked; those refs are outside this file, which lists only GLB rows.

## Decisions

- List only verified GLB rows, one per world and sha, rather than every ref. Evidence: the root-worlds source says the TSV is "one per world and GLB sha" and every row has HTTP 200, model/gltf-binary and glTF.
- Keep the file-map value hash in column 4, so each GLB can be traced to the world-store value that named it. Evidence: the root-worlds GLB chain (GTA Manhattan) names the file-map value `scan-41cd…/4ae4326d….bin` as the source of the `~2fcdn~2fvalue` key.
- Keep the per-row provenance (how) rather than merge the recheck and retry rows. Evidence: the source keeps the 16 recheck and 7 retry rows distinct and says "they are in the TSV with how = recheck or retry".
- Keep the URL host verbatim as the CDN host (play.spawn.co/cdn/), as the confirmed route. Evidence: the root-worlds GLB section confirms HEAD 200 for `play.spawn.co/cdn/value.<sha>.glb`.
- Do not treat the TSV as the full set of model URLs. Evidence: the source says the `/cdn/`-only claim is INFERRED (see the learning record part 2, section 11), and the named-key redirect goes to value-origin.

## Open gaps

- About 77 non-GLB refs returned status 0 on first pass and were not re-checked (source, Non-GLB types paragraph). They are not in this file.
- The claim that every GLB is served only under play.spawn.co/cdn/ is INFERRED (source, model URL naming; learning record part 2, section 11).
- The 2355 unique sha count is the source's figure; the TSV was not re-counted beyond column 2 distinct count, which returns 2355 for this wiki.
- The per-shard row counts in the source (178 worlds per shard) do not map to a column in the TSV, so shard membership cannot be recovered from the file.
- The 16 recheck and 7 retry rows are identified by the how column only; the exact first-pass error of each is not in the file.

## Sources

- /workspace/spawn/maps/glb-urls-all.tsv (old name: spawn)
- /workspace/spawn/maps/spawn-root-worlds-map.md (old name: spawn), section "Full CDN scan result" and "GLB URLs: where they are"
- /workspace/spawn/maps/spawn-learning-record.md (old name: spawn), section 1 (worlds with /cdn/ GLB refs 399) and section 11
- /tmp/spawn-probe/feed-worlds.json (old name: spawn), ephemeral
- /tmp/spawn-probe/cdn-scan-*.jsonl (old name: spawn), cdn-retry.jsonl, glb-recheck.json, ephemeral
