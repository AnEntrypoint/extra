# CDN inventory and manifests

## How it works

Two families of CDN records sit in the index. The first is the world-file CDN family, built from the Jayzee world tree and its documentation. It is recorded as a name inventory (extra/cdn-inventory.json), a manifest of what each name resolves to (extra/cdn-manifest-all.json) and a second, older manifest with the same names (exhaustive/cdn-manifest.json, exhaustive/cdn-index.json and exhaustive/cdn-resolver-state.json). The second family is the GLB link inventory, which lists direct CDN GLB URLs found in world manifests and world-store probes. Those files are in exhaustive/ and at the index root.

### Name inventory: extra/cdn-inventory.json

The file has count 78 and names, an array of 78 entries. Each entry is a name and the sources that cite it. Names are paths such as /cdn/moodboard-gothic-horror/sfx-church-bell-toll-in-fog.mp3 or /cdn/model-knight.glb. Forty-three names have no leading slash, for example cdn/boss.glb, cdn/clip-run-loop.glb, cdn/coin.mp3 and cdn/x.png. The names come from twelve source files in the world tree: scripts/lib/docs-skills.js, scripts/lib/catalog.js, scripts/lib/docs-genres-a.js, scripts/lib/docs-engine-a.js, scripts/lib/docs-engine-b.js, scripts/lib/docs-api.js, scripts/lib/docs-shapes.js, scripts/lib/docs-starters.js, scripts/hall-floor.js, scripts/hall-policy.js, AGENTS.md and places/hall/cells/x0z0.scene. The source list is the set of files that cite the names, and a name cited twice in one file is listed twice. Every one of the 78 names appears in the manifest.

The names fall into families. Twenty-one are moodboard names, /cdn/moodboard-<genre>/<file>, with genres gothic-horror, lowpoly-cozy, painterly-fantasy, pixel-bright, pixel-moody, pixel, realistic-gritty, scifi-neon, toon-vibrant and voxel-bright. Nine are content-addressed values, value.<sha256>.png. One is /cdn/vibe-samples/manifest.json. The rest are plain names such as /cdn/banner-clouds-drifting-4-second-loop.aspect-3x1.mp4, /cdn/model-knight.glb, /cdn/neutral-default-avatar.glb, /cdn/sfx-bell.mp3 and /cdn/moodboard-pixel/sprite-fox.png.

### Manifest: extra/cdn-manifest-all.json

The manifest has count 78, ok 70, bad 0, uniqueNames 78 and originalScannedRows 78. Each asset row holds name, active, url, requests, class, file, bytes, sha256, declaredSha256, validation, headStatus, getStatus, redirectStatus (75 rows; 3 rows undefined), and externalTimeoutEvidence (3 rows). The url is the name on https://www.jayzee.co, for example https://www.jayzee.co/cdn/banner-clouds-drifting-4-second-loop.aspect-3x1.mp4. The requests array shows the chain. The banner example issues a HEAD to https://jayzeefile.io/dev/magic-assets/v5/values/<sha256>.mp4, which answers 200 video/mp4 with Content-Length 421434, Cache-Control "public, max-age=31536000, immutable" and an ETag.

The class counts are generated-stable-after-fetch 60, real-bytes 10 and generated-on-demand-no-stable-bytes 8. Validation counts are ok 70, generated-placeholder-response 3 and empty 5. Head status is 200 for 74 rows and 0 for 4. Get status is 200 for 72 rows and 0 for 6. Active is true for 75 rows and false for 3.

The ten real-bytes rows are nine value.<sha256>.png files, each between about 1.04 MB and 1.56 MB, and /cdn/vibe-samples/manifest.json, 417645 bytes. The eight generated-on-demand rows are /cdn/boss.glb, /cdn/coin.mp3, /cdn/fountain.glb, /cdn/lantern.glb, /cdn/model-red-fox.glb, /cdn/texture-grass.png, /cdn/texture-marble-white-veined.png and /cdn/texture-terrain-grass-realistic-albedo-summer-exploration.png. Three of these (boss.glb, fountain.glb and lantern.glb) are inactive with a generated placeholder response and a 0 head status. The other five answer HEAD with 200 and an empty body.

### Older manifest: exhaustive/cdn-manifest.json, exhaustive/cdn-index.json, exhaustive/cdn-resolver-state.json

exhaustive/cdn-index.json holds count 78 and names. exhaustive/cdn-resolver-state.json is keyed by the same 78 names. exhaustive/cdn-manifest.json holds count 35, ok 35, an assets array and a classes block. Its name list is a subset of the 78 in extra/cdn-manifest-all.json. The exhaustive README says CDN manifest rows are 78 and GLB CDN manifest rows are 13, which does not match the 35 in the file itself (see Open gaps).

### GLB link inventory

- exhaustive/glb-links.tsv: 2416 data rows (2417 lines with header). Columns world_uuid_nodash, sha256, cdn_url, bytes and http. Each row is a world-to-GLB reference from the legacy scan.
- exhaustive/source-glb-urls-all.tsv: 2416 data rows (2417 lines). Columns world_uuid_nodash, sha256, url, file_map_value, http, content_type, magic, len and how. The first row's how field is scan. Its content type is model/gltf-binary and its magic is glTF.
- exhaustive/direct-cdn-glb-links.tsv: 5783 data rows (5784 lines). Columns sha256, direct_cdn_url, status, content_type, bytes, magic, world_count, manifest_count, provenance and sources. The URL pattern is https://play.spawn.co/cdn/value.<sha256>.glb (old name in the host string is verbatim; the host is kept as the source wrote it). exhaustive/direct-cdn-glb-links.json carries the same links with a counts block (scanFiles 16, scanRows 2848, uniqueManifestHashes 2580, uniqueWorldUuids 21716, directGlbUrls 5783, glbMagicVerified 2355, worldsWithGlb 748, status200GlbUrls 2356).
- ALL_WORLD_GLB_LINKS.tsv at the index root: 27499 data rows, columns record_type, key, value, world_uuid_nodash, sha256, glb_rows, world_count, origin and sources. Each row is one world (record_type world) or one direct CDN GLB URL.
- exhaustive/worlds-and-glbs.json, schema spawn.worlds-and-glbs.v4, counts include cdnAssets, cdnGlbAssets, unattachedGlbRows 2415 and directCdnGlbUrls 2362.
- borick/borick-projects.json: five projects, each with its world id, app id, scan rows, manifests, values and refs. Seven direct GLB links are for the First Date project (play.jayzee.co/cdn/value.<sha256>.glb). The other four (GTA Earth, Fruit Jar, Aelorien Elf Village and Wisp Village) have no GLB links.

## Decisions

- Name and manifest kept as separate records. The inventory lists what is cited, and the manifest lists what answered. The two lists share the 78 names, so each name can be followed through.
- Classes assigned from evidence. Each asset is put in one class from its requests and validation: stable after fetch, real bytes, or generated on demand with no stable bytes. The class is the index's classification, and the evidence fields are kept beside it.
- Link-only for GLBs and images. The exhaustive README says "No GLB, image, audio, or video bytes were copied into /workspace/index by this generator." Hashes, status and magic bytes are the evidence kept.
- Counts kept per denominator. The GLB inventories report 2416 legacy rows, 2362 unique direct GLB URLs in the baseline, 5783 after discovery, and 748 worlds with GLBs. Each is labelled with its scope.
- Immutability noted from headers. The banner example's Cache-Control header is kept as evidence that the CDN copy is immutable once fetched.

## Open gaps

- The exhaustive README says CDN manifest rows are 78 and GLB CDN manifest rows are 13. The file exhaustive/cdn-manifest.json holds 35 assets (count 35, ok 35), so the README figures and the file do not agree.
- Eight names are generated on demand with no stable bytes, and three of them are inactive with a placeholder response. Their final contents are not recorded.
- Five names return an empty body on HEAD, and their validation is empty.
- Forty-three names have no leading slash, so they are not in the same path form as the others. The index does not say whether both forms resolve to the same CDN object.
- Four asset rows have headStatus 0 and six have getStatus 0. The index does not record the network error behind each.
- Three rows have externalTimeoutEvidence, and the index records only that a timeout was seen.
- The GLB count for worlds disagrees across files: 399 (the legacy scan), 400 (spawn/spawn-index.json, old name: spawn), 748 (exhaustive/direct-cdn-glb-links.json and COMPLETE_INDEX.md). The index keeps all three with their scopes.
- Direct GLB links were not fetched in the index. Status and magic evidence come from the earlier scans.
- The exhaustive/worlds-and-glbs.json sources block names files outside the index, such as /workspace/extra/site/worlds.json and /workspace/extra/.local/cdn/manifest-all.json, which are not in /workspace/index.

## Sources

- /workspace/index/extra/cdn-inventory.json
- /workspace/index/extra/cdn-manifest-all.json
- /workspace/index/exhaustive/cdn-index.json
- /workspace/index/exhaustive/cdn-manifest.json
- /workspace/index/exhaustive/cdn-resolver-state.json
- /workspace/index/exhaustive/glb-links.tsv
- /workspace/index/exhaustive/source-glb-urls-all.tsv
- /workspace/index/exhaustive/direct-cdn-glb-links.tsv
- /workspace/index/exhaustive/direct-cdn-glb-links.json
- /workspace/index/exhaustive/worlds-and-glbs.json
- /workspace/index/exhaustive/README.md
- /workspace/index/exhaustive/check-world-glb-completeness.mjs
- /workspace/index/exhaustive/cdn-scan/ (cdn-scan-0.jsonl to cdn-scan-15.jsonl)
- /workspace/index/ALL_WORLD_GLB_LINKS.tsv
- /workspace/index/COMPLETE_INDEX.json
- /workspace/index/COMPLETE_INDEX.md
- /workspace/index/borick/borick-projects.json
- /workspace/index/borick/README.md
- /workspace/index/spawn/spawn-index.json (old name: spawn)
