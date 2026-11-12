# jayzee non-CDN data references (unverified-noncdn-refs.tsv)

## How it works

/workspace/spawn/maps/unverified-noncdn-refs.tsv (old name: spawn) lists the data references found in jayzee world file maps that are not GLB values served under `/cdn/value.<sha256>.glb`. The file has 84 lines: one header and 83 data rows. The file name says "unverified" because the first-pass checks were not all successful; the rows were then retried, and each row records its retry outcome.

The rows are the non-CDN data that the CDN survey (see [maps-root-worlds.md](maps-root-worlds.md)) met in the same file maps. They cover images, audio, video, fonts and GLB files that are referenced by a `/cdn/value.<sha256>.<ext>` URL with an extension other than glb (the file-map value names the sha and the extension). The rows were checked with HEAD requests against `https://play.spawn.co/cdn/value.<sha256>.<ext>`.

### Structure

Tab-separated, with a header row. Columns:

| Column | Field | Content |
|---|---|---|
| 1 | world_uuid_nodash | World uuid without dashes. |
| 2 | sha256 | The 64-hex value sha256. |
| 3 | ext | The file extension of the value (png, jpeg, jpg, mp3, mp4, glb, webp, gif, ttf). |
| 4 | file_map_value | The 64-hex sha256 of the file-map value that named this value. |
| 5 | first_pass_status | The first-pass HTTP status. It is 0 for all 83 rows in the file. |
| 6 | retry_status | The retry HTTP status: 200 (81 rows), 401 (1 row), or `err:UND_ERR_CONNECT_TIMEOUT` (1 row). |
| 7 | retry_type | The content type of the retry response (for example image/png), `application/json` for the 401 row, and empty for the timeout row. |
| 8 | url | `https://play.spawn.co/cdn/value.<sha256>.<ext>` (host verbatim). |

The source learning record says "first-pass status 200" for the 81 resolved rows. In this file, the 200 values sit in column 6 (retry_status) and column 5 is 0 for every row. The record's 81 is the retry count. The first-pass status column does not carry 200 for any row, so the file cannot show a first-pass success. This is recorded as an open gap below.

### Classes and status

Counts per extension, from the file (retry status in brackets):

| ext | Rows | Content type on retry | Status (retry) |
|---|---|---|---|
| png | 31 | image/png | 31 × 200 |
| jpeg | 5 | image/jpeg | 5 × 200 |
| jpg | 10 | image/jpeg | 10 × 200 |
| mp3 | 11 | audio/mpeg | 11 × 200 |
| mp4 | 12 | video/mp4 | 11 × 200; 1 × err:UND_ERR_CONNECT_TIMEOUT |
| glb | 6 | model/gltf-binary | 6 × 200 |
| webp | 4 | image/webp | 4 × 200 |
| gif | 2 | image/gif | 2 × 200 |
| ttf | 2 | font/ttf (1 row); application/json (1 row) | 1 × 200; 1 × 401 |
| Total | 83 | | 81 × 200; 1 × 401; 1 × timeout |

jpeg and jpg both map to image/jpeg, so the two rows are one class in content terms (15 rows).

Totals by class in content terms, as the learning record gives them: image/png 31, image/jpeg 15, audio/mpeg 11, video/mp4 12, model/gltf-binary 6, image/webp 4, image/gif 2, font/ttf 1 (200 results), and the 401 row. The record's 82 200s include the mp4 whose connect timeout did not recur on a HEAD; the tsv has 81 200s in column 6 and 1 timeout, and the record counts the timed-out mp4 as 200 on HEAD and 12 for video/mp4.

### Per-world distribution

The 83 rows belong to 21 worlds. The three largest:

| World uuid (no dashes) | Rows |
|---|---|
| 3a6698c3782b44df85b12d5785ebc09d | 17 |
| ce907192e2dc46ac99a146aa35bd93db | 9 |
| b185f36d991f44ed8d0d5e870b287dde | 7 |

The other 18 worlds have fewer rows. The world ce907192e2dc46ac99a146aa35bd93db also appears in the GLB list with one recheck row (see [maps-glb-urls.md](maps-glb-urls.md)).

### Status of each class

- The 81 rows with retry status 200 are RESOLVED: the URL answered with the expected content type. Only the mp4 described below was downloaded in full.
- The mp4 row in world b185f36d991f44ed8d0d5e870b287dde with sha 537d6321e14ca1fec788632ca4dcce598c8c901bdf123681d0119caab7815a2c had a first-pass connect timeout (UND_ERR_CONNECT_TIMEOUT). A bounded retry returned 200 video/mp4, and a full ranged download of 46469835 bytes matched the claimed sha256. The status of this object is CONFIRMED for that one fetch.
- The ttf row in world c355fcf8468745feb0b2ba8254aa4dee with sha d5558cd4… returned 401 application/json on retry. Status: OPEN. It was recorded as is and not bypassed, because a 401 is a credentialed refusal.
- The other ttf row in the same world (sha 39a77b90…) returned 200 font/ttf and is RESOLVED.

Re-count from the file for this wiki: column 6 gives 81 × 200, 1 × 401 and 1 × err. The learning record's totals match this, with its 82 figure including the timed-out mp4 counted on HEAD.

## Decisions

- Keep the 401 row OPEN rather than bypass it. Evidence: the learning record says "OPEN as a credentialed-looking refusal and not bypassed" and the source record section 8 says "Recorded as is, not bypassed."
- Keep the first-pass column even though it is 0 in every row. Evidence: the file header has first_pass_status and the record states the first-pass figures in prose; the mismatch is recorded as an open gap.
- Count the mp4 timeout as a HEAD 200 in the record and as a timeout in the file. Evidence: the record says "The mp4 (world b185f36d…) returns 200 video/mp4 on HEAD" and "UND_ERR_CONNECT_TIMEOUT = 1 (mp4)".
- Confirm the mp4 by a full ranged download and a sha256 comparison, rather than trust HEAD alone. Evidence: the record's section 8 gives 12 ranged GETs, concatenated to 46469835 bytes, sha256 matching the claimed value.
- Keep the file name "unverified" although 81 rows resolved. Evidence: the rows that did not resolve are the 401 and the timeout row, and the record says "2 OPEN, 81 resolved".

## Open gaps

- The first_pass_status column is 0 for all 83 rows, while the learning record says 81 resolved with "first-pass status 200". The file does not carry the first-pass 200s. The source of the first-pass 200 figure is not in the maps tree.
- The ttf row with sha d5558cd4… (world c355fcf8468745feb0b2ba8254aa4dee) returns 401 and is OPEN (learning record part 2, section 8).
- The record states that the 401 is a "credentialed-looking refusal"; the cause is not established.
- The other 80 resolved rows were checked by one retry request each, and the file does not record the request method or the bytes received; only the mp4 was downloaded in full.
- The record's class totals (82 200s) count the timed-out mp4 as a HEAD 200; the file counts it as a timeout.

## Sources

- /workspace/spawn/maps/unverified-noncdn-refs.tsv (old name: spawn)
- /workspace/spawn/maps/spawn-learning-record.md (old name: spawn), sections 8 and 11
- /workspace/spawn/maps/spawn-root-worlds-map.md (old name: spawn), section "Full CDN scan result" (non-GLB types)
