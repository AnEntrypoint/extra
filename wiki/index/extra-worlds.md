# extra world lists and feeds

## How it works

The extra/ directory of the index holds the world lists that the public extra site uses. The extra site builds its world grid from extra/worlds.json and links to the converted documentation pages. The index keeps four world-list files and a summary.

- /workspace/index/extra/worlds.json: an array of 74 root-linked world rows. Each row has n, path, status, title, genre, published, modified, reviews, update and preview. All 74 rows have status 200. The preview field is a path of the form assets/mirror/<sha256>.png, and all 74 rows carry one. Of the 74 rows, 31 have update "none".
- /workspace/index/extra/feed.json: {"ok":true,"games":[...]} with 19 feed games. Each game row carries id, app_id, custom_thumbnail_url, og_image_url, back_art_url, inside_spread_url, box_copy, genre_tags, ai_genre_tags, like_count, play_count, comment_count, posted_at, last_published_at, works_on_desktop, works_on_mobile, mobile_playable, a nested games object (name, adventure_name, world_id, engine_version, min_age) and a nested profiles object. All 19 games report engine_version 6.0.0. Play counts run from 205 to 91008. The highest play counts are 91008 (Escape from Stranglethorn), 59468 (Dust 2 DM), 23860 (UNDERGROUND WARFARE), 21823 (Shogun's Fate) and 12728 (Shoguns Return).
- /workspace/index/extra/linked-worlds.json: {"linked":true,"worlds":[...]} with 4 linked worlds, each with appId, worldId, name, address, playUrl, git URL, engine (semver 6.0.0, era 6.0) and standing "editor". The four are game-16 (address @lanmower/game-16), game-10 (@lanmower/game-10), the-cleetus-gallery and wonschweppidytime.
- /workspace/index/EXTRA_WORLD_INDEX.json and EXTRA_WORLD_INDEX.md: the summary, generated 2026-11-11T15:40:24.458Z. Counts are rootWorldRows 74, feedGames 19, linkedWorlds 4 and docPages 71. Its sources block names extra/worlds.json for root rows, extra/feed.json for the feed, extra/linked-worlds.json for linked worlds and extra/docs/ for doc pages. Its method note says the extra-generated world feed, root-linked rows, linked world metadata, CDN inventory and manifests and extracted docs were copied into the durable index.

The root rows in extra/worlds.json and the root rows in /workspace/index/spawn/root-worlds.json (old name: spawn) are the same 74 worlds in the same order. They differ in fourteen fields, all in path and title, on seven rows. The extra copy uses the new names. Row 13 path /@devcat/world-of-jayzeecraft-2 (copy in spawn/root-worlds.json, old name: spawn: /@devcat/world-of-spawncraft-2), row 26 /@chucky/need-for-jayzee (copy in spawn/root-worlds.json, old name: spawn: need-for-spawn), row 27 /@kevin/jayzee-turismo (copy in spawn/root-worlds.json, old name: spawn: spawn-turismo), row 32 /@izkimar/league-of-jayzee (copy in spawn/root-worlds.json, old name: spawn: league-of-spawn), row 38 /@lanmower/the-cleetus-gallery (copy in spawn/root-worlds.json, old name: spawn: /@lanmower/the-savi-gallery, where savi is an old name), row 53 /@csplay/jayzee-strike-global-mission (copy in spawn/root-worlds.json, old name: spawn: spawn-strike-global-mission) and row 61 /@xenos/counter-jayzee-global-offensive (copy in spawn/root-worlds.json, old name: spawn: counter-spawn-global-offensive). The titles follow the same changes.

## Decisions

- The extra copies are the public-facing lists. The EXTRA_WORLD_INDEX method note says the extra site "uses worlds.json for its public world-grid recreation", so the extra copy is the one the site renders.
- Names rewritten for the extra copy. The extra copy uses jayzee and cleetus in the path and title of the seven rows listed above. The copy under spawn/ (old name: spawn) keeps the on-disk names. The discrepancy is recorded rather than reconciled, so the two lists are not byte-identical.
- Each extra file has its own hash. extra/provenance.sha256.txt lists extra/worlds.json (sha256 838b83ef23ceffceac4f86f99f45f094ce4865f8a28efc46ae3cf862f5aa510c), extra/feed.json (9c7e3e3e2ed5099a1ce185d194b0857e930617fa76e3afac55ece26e6e953faf) and extra/linked-worlds.json (284c36f43720d3eeb86c75ddc903b05966749a86f5f8849f40244213d7f13429). All verify.
- Root rows kept as a list, not a map. The root-linked map is kept with its counts and its own denominator, separate from the 19-game feed and the 4 linked worlds, as the README requires.

## Open gaps

- Seven root-row paths and titles differ between extra/worlds.json and spawn/root-worlds.json (old name: spawn), as listed above. The index does not say which copy matches the live site.
- Descriptions exist only for worlds 1 to 20 in the browser-read map. The extra rows have no description field.
- Play and like counts drift between reads. The map notes that @lanmower/deepfall showed 4 plays earlier and 6 plays later.
- The feed has 19 games here, while the discovery feed evidence holds 3951 published projects. These are separate denominators and are not reconciled in extra/.
- The feed and linked-worlds files have no capture date of their own. Only the EXTRA_WORLD_INDEX generation stamp (2026-11-11T15:40:24.458Z) dates them.
- The extra copies of the feed and linked-worlds rows point at hosts under jayzeefile.io and jayzee.co. The index does not verify these URLs.

## Sources

- /workspace/index/extra/worlds.json
- /workspace/index/extra/feed.json
- /workspace/index/extra/linked-worlds.json
- /workspace/index/EXTRA_WORLD_INDEX.json
- /workspace/index/EXTRA_WORLD_INDEX.md
- /workspace/index/extra/provenance.sha256.txt
- /workspace/index/spawn/root-worlds.json (old name: spawn)
- /workspace/index/spawn/spawn-index.json (old name: spawn, the rootWorlds array)
- /workspace/index/savi/savi-index.json (old name: savi, not used for worlds, referenced for the savi-side denominators only)
