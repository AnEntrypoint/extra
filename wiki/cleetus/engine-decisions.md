# Engine decisions: why the jayzee engine notes are shaped as they are

## How it works

The research behind the jayzee engine (old name: spawn) notes in /workspace/savi/spawn-engine/ (old name: savi) was carried out under a small set of working rules, which are visible in the notes themselves. The engine-overview page at /workspace/extra/wiki/cleetus/engine-overview.md describes each file. This page records the choices those files make and the text that supports each choice. The choices fall into five groups: how the work touched the live system, how claims are labelled, how the public feed was enumerated, how assets and manifests were checked, and how errors were recorded.

## Decisions

### 1. Probe the live system read-only, and write nothing to a world

- Decision: all live access is GET or HEAD, docs-door reads, and reads of the client join log. Nothing is written.
- Evidence: /workspace/savi/spawn-engine/FAULTS.md (old name: savi) line 3 says "Read-only probes only (GET/HEAD, docs doors, the client join log)". /workspace/savi/spawn-engine/ASSETS.md (old name: savi) line 3 says "Nothing here was written to a world." /workspace/savi/spawn-engine/GIT_HOST.md (old name: savi) line 4 says "No POST was sent in this section" and that a tree fetch needs a POST, "which is not a GET door, so no tree was fetched" in the same section.
- Consequence: the git tree and the world manifest are described from logs and discovery answers, not from clone or body reads (MANIFESTS.md section 4 says "clone not run, since it is not a GET door").

### 2. Label every claim with its evidence level

- Decision: each fact carries one of four tags, so that a reader can see whether it was read, taken from documentation, seen once, or inferred.
- Evidence: /workspace/savi/spawn-engine/ASSETS.md (old name: savi) line 3 defines [verified] as "read live with a GET/HEAD, or seen in the live client log" and [documented] as "from the public spec (openapi.json), llms.txt, a docs door section, or a skill door". /workspace/savi/spawn-engine/FAULTS.md (old name: savi) line 3 defines [observed] as "seen once in a log, cause not known". /workspace/savi/spawn-engine/FEED_SCOPE.md (old name: savi) line 26 uses [inferred] for the claim that game-10 is unpublished.
- Consequence: where a mapping was not read from an endpoint, the notes say so, for example the lodpack mapping in ASSETS.md "[inferred from the names and the log, not read from an endpoint]".

### 3. Treat counts from public pages as a floor, not a complete list

- Decision: asset counts taken from public project pages are reported as distinct URLs seen on the page, and the complete asset list is left to the project's tree.
- Evidence: /workspace/savi/spawn-engine/PROJECT_ASSETS.md (old name: savi) line 6 says "Counts are distinct URLs on the page, not the project's full file list". Line 8 says "these counts are a floor. The project's own tree (world.assets/) is the complete list and is not readable with our token".

### 4. Enumerate the public feed by offset, and replace a sample with the full walk

- Decision: the feed is walked with offset stepped by 22, because page= and cursor= are ignored, and the walk stops after two empty pages.
- Evidence: /workspace/savi/spawn-engine/FEED_SCOPE.md (old name: savi) lines 7 to 10 record that offset is "honoured in steps", that page=2 "returned the same 22 rows as page 1", that limit=100 "answers 44 rows (capped)", and that "The walk stepped offset by 22 until two empty pages in a row."
- Decision: the earlier 22-row sample is corrected rather than kept as the whole picture.
- Evidence: /workspace/savi/spawn-engine/PROJECTS.md (old name: savi) line 1 is a correction that the file "covers only the first feed block (22 rows, all engine 6.0.0)". /workspace/savi/spawn-engine/FEED_SCOPE.md (old name: savi) line 16 says the earlier coverage "was a sample, not the feed".
- Decision: the full feed is kept as a data file rather than a summary table.
- Evidence: /workspace/savi/spawn-engine/FEED_SCOPE.md (old name: savi) line 21 says the list is in data/feed-projects.json "3421 records".

### 5. Keep the two data files separate in purpose

- Decision: the feed list (all 3421 projects, feed fields only) and the asset inventory (one row per fetched project page, with each asset URL classified by kind) are separate files.
- Evidence: the schema of /workspace/savi/spawn-engine/data/feed-projects.json (old name: savi) is the feed fields only, and /workspace/savi/spawn-engine/data/feed-asset-inventory.jsonl (old name: savi) rows carry the assets array with url, ext and kind. The inventory note in PROJECT_ASSETS.md (old name: savi) line 1 is a correction that "this inventory covers only the 22 first-block projects", so the inventory was extended beyond the first block in the JSONL file.

### 6. Verify a content address by hashing the bytes

- Decision: a name that claims to be a sha256 is checked by downloading the bytes and hashing them, and an ETag is checked against an md5.
- Evidence: /workspace/savi/spawn-engine/PROJECT_ASSETS.md (old name: savi) lines 45 to 53 give the table "GET then sha256sum" with "Match" yes/no. Lines 57 to 58 state that the character GLB ETag "equals md5sum of the bytes" and "The name does not hash the bytes".
- Consequence: the conclusion that character-assets are timestamp+uuid named while magic assets are sha256 named is drawn from these checks (line 58).

### 7. Uploads are write-once and content-named

- Decision: uploaded assets are named by the sha256 of their bytes, and the server enforces the match.
- Evidence: /workspace/savi/spawn-engine/ASSETS.md (old name: savi) line 7 gives the path value.<sha256>.<ext>, line 8 says "200 'exists' when the same bytes are already carried (write-once)", and line 9 says "a name that does not match is 422 content_mismatch".
- Decision: a large upload goes through a signed temporary path, because the single request is capped at 4.5 MB.
- Evidence: /workspace/savi/spawn-engine/ASSETS.md (old name: savi) line 10 "Body limit 4.5 MB for the whole request; over it 413", and line 11 the three steps through upload-target.

### 8. The client, not the name, is the integrity check for the runtime

- Decision: the notes treat the client manifest SRI values as the integrity check for engine code, and do not treat a prod GLB name as a checksum.
- Evidence: /workspace/savi/spawn-engine/ASSETS.md (old name: savi) line 58 says "The name is not a content hash for prod character GLBs, so a client cannot verify the bytes from the name. The engine runtime is checked by SRI (sha256, base64) from the client manifest." /workspace/savi/spawn-engine/MANIFESTS.md (old name: savi) line 9 onward shows the files map with sha256-<base64> values.

### 9. Read the client manifest together with its hash

- Decision: the no-query manifest pointer is not treated as stable, and every reading is recorded with its target hash.
- Evidence: /workspace/savi/spawn-engine/FAULTS.md (old name: savi) F5 says "Not an error by itself; noted so that the manifest is always read with its hash." /workspace/savi/spawn-engine/MANIFESTS.md (old name: savi) line 35 says the world query "currently returns the newer hash for all 24 worlds".

### 10. Treat the redirect as one pointer, and correct earlier claims

- Decision: the engine manifest redirect is one current pointer shared across engines, and an earlier per-engine claim is retracted.
- Evidence: /workspace/savi/spawn-engine/MANIFESTS.md (old name: savi) line 80 says "So the redirect is one current pointer, not one manifest per engine." Line 82 is "Correction to section 1 above: 'the same for every world on one engine' held only for the 6.0.0 worlds I had".

### 11. Use local fixes that do not touch the service

- Decision: when the client could not start a browser, the fix was local and no Spawn write was made.
- Evidence: /workspace/savi/spawn-engine/FAULTS.md (old name: savi) F2 line 17 is headed "Local fix (no Spawn write)" and describes a Playwright install into the client cache, after which "the third join succeeded".

### 12. Use the public surface, not private trees, for other projects

- Decision: other projects are read only through what is public (the feed and the public pages), because their trees are not reachable with the token used.
- Evidence: /workspace/savi/spawn-engine/GIT_HOST.md (old name: savi) line 34 says "For the 22 feed projects, the tree is not reachable with it (404)." Line 35 says "Public pages and the feed are the only outside view". /workspace/savi/spawn-engine/PROJECTS.md (old name: savi) line 53 says "Other projects' public pages can be read through the feed only."

### 13. Record expected answers so they are not reported as faults

- Decision: expected refusals (405 on a PUT-only path, 403 on other worlds, 403 not_your_kit) are listed separately from faults.
- Evidence: /workspace/savi/spawn-engine/FAULTS.md (old name: savi) section "Not faults (expected, recorded so they are not re-reported)" lists these three answers, each noted as documented.

### 14. Use the engine's own type list as the shape source

- Decision: asset shapes are taken from the engine API type endpoint, one type at a time, and each type is marked as fetched live.
- Evidence: /workspace/savi/spawn-engine/ASSET_SHAPES.md (old name: savi) line 3 says "each type below was fetched live, 200". Line 5 of the same file gives the type count of 308.

### 15. Name the account's own world by the address the git host uses

- Decision: the canonical address for the account's worlds is the owner handle used by the git host and the join log, not the handle the games door returns.
- Evidence: /workspace/savi/spawn-engine/FAULTS.md (old name: savi) F4 line 33 says "The world's real address is under lanmower (git URL and the join log use @lanmower)."

## Open gaps

- The reason the games route returns game: null (F1) is not recorded. Source: /workspace/savi/spawn-engine/FAULTS.md (old name: savi).
- Whether the no-query manifest pointer move was deliberate is not recorded (F5). Source: /workspace/savi/spawn-engine/FAULTS.md (old name: savi).
- The reason a ledger read answered "no head this copy heard carries it" (F3) is not recorded, and no later settle line was found. Source: /workspace/savi/spawn-engine/FAULTS.md (old name: savi).
- No decision is recorded for how the texture ledger is read, because no texture row was seen. Source: /workspace/savi/spawn-engine/ASSETS.md (old name: savi).
- No decision on whether to continue the walk past 3421 projects or the 66 engine versions beyond the sample is recorded. Source: /workspace/savi/spawn-engine/FEED_SCOPE.md (old name: savi).

## Sources

- /workspace/savi/spawn-engine/PROJECTS.md (old name: savi)
- /workspace/savi/spawn-engine/ASSETS.md (old name: savi)
- /workspace/savi/spawn-engine/MANIFESTS.md (old name: savi)
- /workspace/savi/spawn-engine/FAULTS.md (old name: savi)
- /workspace/savi/spawn-engine/PROJECT_ASSETS.md (old name: savi)
- /workspace/savi/spawn-engine/ASSET_SHAPES.md (old name: savi)
- /workspace/savi/spawn-engine/GIT_HOST.md (old name: savi)
- /workspace/savi/spawn-engine/FEED_SCOPE.md (old name: savi)
- /workspace/savi/spawn-engine/data/feed-projects.json (old name: savi)
- /workspace/savi/spawn-engine/data/feed-asset-inventory.jsonl (old name: savi)
