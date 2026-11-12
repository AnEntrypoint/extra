# The extra/ directory

## How it works

/workspace/index/extra is a copy of the data behind the extra site: the public world grid, the feed, the linked worlds, the CDN inventory and manifest, and a mirror of the jayzee game API documentation for one world (the world at the address @lanmower/game-16, app ID 1e04de61-4225-4d57-8a79-b8e9bcef1c6e, engine 6.0.0). It has 83 files totalling 776 KB. The index describes it as a copy into the durable index, and no script in /workspace/index writes it.

Root files (8):

| File | Size | Contents |
|---|---|---|
| worlds.json | 29,269 B | Array of 74 root-linked worlds. Each row has n, path, status (all 200), title, genre, published, modified, reviews, update and preview (a mirrored image path). The public world grid is recreated from this file. |
| feed.json | 33,539 B | Object with ok true and 19 games. Each game carries id, app_id, art URLs, box_copy, genre tags, like_count, play_count, comment_count, posted_at, last_published_at, platform flags, games and profiles. Profile fields include a username and an avatar URL, which are reproduced as received. |
| linked-worlds.json | 1,454 B | Object with linked true and four worlds (appId, worldId, name, address, playUrl, git URL, engine record with semver 6.0.0 and era 6.0, and standing "editor"). |
| cdn-inventory.json | 14,568 B | Count 78 and a names array of 78 CDN paths (some with a leading slash and some without). |
| cdn-manifest-all.json | 243,424 B | Count 78, ok 70, bad 0, uniqueNames 78, originalScannedRows 78. The classes field counts 60 generated-stable-after-fetch, 10 real-bytes and 8 generated-on-demand-no-stable-bytes. Each asset carries name, active, url, requests, class, file, bytes, sha256, declaredSha256, validation, headStatus, getStatus and redirectStatus. |
| docs-pull-index.json | 9,079 B | Pull record for the documentation: worldId 02e941af-9db1-4d86-b1fa-f7bca802c4b1, expectedSections 68, 70 results (each with section, exit, curl status line and bytes). All exits are 0. 69 results are HTTP 200 and one (section "skills") is HTTP 404 with a section_not_found body. |
| docs-sections.json | 1,394 B | Array of the 68 documentation section titles, starting "Jayzee game API", then "Identity" and "State". |
| provenance.sha256.txt | 7,421 B, 82 lines | Hashes of every file above except itself. |

docs-pull-index.json and docs/pull-index.json are byte-identical (the same for docs-sections.json and docs/sections.json), so the copy at the top level is a duplicate.

docs/ (75 files):

- 00-opening.md (2,316 B) is plain Markdown with the H1 "Jayzee game API" and the orientation text for the API (coordinates, hooks, runtime edits, the builtin modules).
- 01-spawn-game-api.md (old name: spawn) through 68-builtin-postfx.md (69 numbered files in total, including 00) hold one documentation section each. Files sampled (01, 02 and 68) are JSON wrappers with appId, engineVersion, era, playUrl, gitUrl, codeUrl, specVersion, guide and tomeApi; the tomeApi field holds the Markdown of the section. The sections run from Identity through the builtin modules (physics, tween, spline, math, vec3, easing, nav, path, ballistics, room-routing, terrain, noise, voxels, vibe, fx, tsl, three, lighting, water, env and postfx). The largest is 47-named-types-full.md (64,399 B).
- guide.md (17,332 B) is the world's editing guide as prose, with no Markdown headings.
- opening.json (7,517 B) carries the appId, engineVersion 6.0.0, era 6.0, playUrl, gitUrl, codeUrl, specVersion 0, a short guide field (90 characters), tomeApi (the opening section, 2,316 characters), a sections count of 68 and a skills count of 23.
- sections.json and pull-index.json: the same content as the top-level copies (see above).
- skills.json (2,958 B): 23 entries of id, name and description (for example jayzee-engine, 2d-mode, buyables, cameras, fx, game-ui, geometry, heightmap-terrain, interactive-objects).
- skills.md (1,917 B): the 404 body returned when the skills section was requested as a documentation section. It is an error, not the skills list. The list is in skills.json.

Counts: 83 files in extra/ (8 at the root, 75 in docs/). 82 files are hashed by the manifest.

## Decisions

- The documentation is stored in the response form the docs door returns (JSON with the Markdown inside), so that the section name, world ID and HTTP status stay with the text. Evidence: the JSON wrappers and the pull index's curl lines.
- The extra site uses worlds.json for its public grid and links to converted HTML pages. Evidence: the EXTRA_WORLD_INDEX.json method text and the file list.
- Duplicate copies at the top level were kept beside the docs copies rather than replaced. Evidence: byte-identical pairs (docs-pull-index.json and docs/pull-index.json, docs-sections.json and docs/sections.json).
- Profile data from the feed is kept as received. The index does not add or change any personal field.

## Open gaps

- The pull index holds 70 results against 68 expected sections. The two extra names are "guide" and "skills", and "skills" returned a 404. Sources: /workspace/index/extra/docs-pull-index.json, /workspace/index/extra/docs-sections.json.
- docs/skills.md stores an error body under a skills name, so the skills text is only in skills.json. Source: /workspace/index/extra/docs/skills.md.
- The cdn-manifest-all.json has 78 entries but the exhaustive manifest has 35. All 35 exhaustive names appear in the 78, so the exhaustive manifest is a subset. Sources: /workspace/index/extra/cdn-manifest-all.json, /workspace/index/exhaustive/cdn-manifest.json.
- Eight CDN assets are generated on demand with no stable bytes, so their hashes are not reproducible from the index. Source: /workspace/index/extra/cdn-manifest-all.json (class generated-on-demand-no-stable-bytes).
- The guide.md file has no headings, so its sections cannot be addressed by name. Source: /workspace/index/extra/docs/guide.md.
- The EXTRA_WORLD_INDEX method says the files were copied from generated outputs, but the generator is not in the index. Source: /workspace/index/EXTRA_WORLD_INDEX.json.

## Sources

- /workspace/index/extra/worlds.json
- /workspace/index/extra/feed.json
- /workspace/index/extra/linked-worlds.json
- /workspace/index/extra/cdn-inventory.json
- /workspace/index/extra/cdn-manifest-all.json
- /workspace/index/extra/docs-pull-index.json
- /workspace/index/extra/docs-sections.json
- /workspace/index/extra/provenance.sha256.txt
- /workspace/index/extra/docs/00-opening.md
- /workspace/index/extra/docs/01-spawn-game-api.md (old name: spawn)
- /workspace/index/extra/docs/02-identity.md
- /workspace/index/extra/docs/47-named-types-full.md
- /workspace/index/extra/docs/68-builtin-postfx.md
- /workspace/index/extra/docs/guide.md
- /workspace/index/extra/docs/opening.json
- /workspace/index/extra/docs/pull-index.json
- /workspace/index/extra/docs/sections.json
- /workspace/index/extra/docs/skills.json
- /workspace/index/extra/docs/skills.md
- /workspace/index/EXTRA_WORLD_INDEX.json
- /workspace/index/exhaustive/cdn-manifest.json
