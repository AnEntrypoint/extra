# Endpoints

## How it works

ENDPOINTS.md (old name: savi) is the endpoint status page of cleetus. It is generated, not written by hand. scripts/endpoints.mjs (old name: savi) reads the paths of scripts/openapi.json (old name: savi), walks the text files of the repository, finds every string that starts with /api/, and sorts each named endpoint into one of four groups by comparing it with the spec. The page header states the rule: regenerate with `node scripts/endpoints.mjs .`, and do not edit by hand.

The spec is OpenAPI 3.1.0, titled "jayzee agent API" version 1.0.0, with 62 paths. It has the components securitySchemes, schemas, responses and parameters. The spec is the published one in the sense of the page: the "Listed in the published spec" group means the path appears in scripts/openapi.json.

Running `node scripts/endpoints.mjs .` writes ENDPOINTS.md and prints the count of named endpoints. The check verify step in scripts/check-manual.mjs (old name: savi) re-runs buildEndpointsPage and fails if the committed ENDPOINTS.md differs, so an out of date endpoint page fails the check.

### The classification

- A named endpoint that matches a spec path exactly is listed. If it contains a { placeholder, it is counted as per-game instead.
- A named endpoint that matches a spec path only as a prefix of its children (the path is not in the spec, but spec paths begin with it) is partial, meaning disabled or partial with its children listed.
- Any other named endpoint is absent from the published spec.
- The regex used for placeholders treats each {name} segment as one path segment. UUIDs in the text are replaced by {id} before comparison.
- Files in .git, .playwriter, runs, site, node_modules, sources, scripts and jayzee-evidence are skipped, and so is ENDPOINTS.md itself. Files under .spawn/reference/http/raw/ are skipped. Binary files (containing a NUL byte) are skipped.

### The page as it stands

The header line gives 62 spec paths and 93 named endpoints. The four group headings give 39 listed, 21 per-game or per-id, 3 partial and 30 absent. The published groups add up to 63, and the per-game group is 21. OPEN-001 in docs/OPEN-ITEMS.md (old name: savi) records that the 62 is the spec path count and the 63 is a sum of named buckets, so the header and the sections measure different things. The header already matches what the script writes.

### Every endpoint, by group

Listed in the published spec (39):

- /api/agent/v1/access
- /api/agent/v1/api
- /api/agent/v1/chat/dm
- /api/agent/v1/chat/inbox
- /api/agent/v1/chat/room
- /api/agent/v1/games
- /api/agent/v1/link-request
- /api/agent/v1/login-link
- /api/agent/v1/me
- /api/agent/v1/me/numbers
- /api/agent/v1/signup
- /api/agent/v1/token
- /api/agent/v1/token/revoke
- /api/agent/v1/worlds
- /api/character/convert
- /api/character/equip
- /api/character/equip-model
- /api/character/generate
- /api/character/picture
- /api/character/reset
- /api/feed
- /api/invites
- /api/notifications
- /api/notifications/read
- /api/notifications/stream
- /api/player/heartbeat
- /api/resolve-adventure
- /api/sdk/v1/W/agent/docs
- /api/sdk/v1/W/agent/health
- /api/session/grant/agent
- /api/social/friends
- /api/social/hidden
- /api/social/me
- /api/social/met
- /api/social/personas
- /api/social/places
- /api/social/relation
- /api/social/report
- /api/social/who

Listed with a per-game or per-world id (21). The page's heading says the per-game behaviour was observed on one bearer-authenticated read (games-folio.bearer.body), and was not confirmed unauthenticated:

- /api/games/{appId}
- /api/games/{appId}/comments
- /api/games/{appId}/crew/ask
- /api/games/{appId}/folio
- /api/games/{appId}/publish
- /api/games/{id}
- /api/games/{id}/comments
- /api/games/{id}/folio
- /api/games/{id}/publish
- /api/invites/{id}/accept
- /api/sdk/v1/{W}/agent/docs
- /api/sdk/v1/{id}/agent/docs
- /api/sdk/v1/{id}/agent/health
- /api/sdk/v1/{id}/agent/logs
- /api/sdk/v1/{id}/agent/rooms
- /api/sdk/v1/{worldId}/agent/docs
- /api/sdk/v1/{worldId}/agent/health
- /api/sdk/v1/{worldId}/agent/logs
- /api/sdk/v1/{worldId}/agent/rooms
- /api/sdk/v1/{worldId}/assets/{name}
- /api/sdk/v1/{world_id}/agent/docs

Listed but disabled or partial, with its children listed (3):

- /api/character
- /api/games
- /api/social

Not in the published spec (30):

- /api/.well-known/jwks.json
- /api/account/delete
- /api/animate
- /api/chat-pictures
- /api/client/manifest
- /api/commit-lane
- /api/flags/savi-per-player
- /api/game-db-forward
- /api/game-stat
- /api/games/{appId}/manifest
- /api/me/player-settings
- /api/media
- /api/object-api
- /api/player-atmosphere
- /api/published-room-save
- /api/read-options
- /api/relay/replay-clip
- /api/revert-terrain-edits
- /api/sdk/v1/W/agent/manifest
- /api/sdk/v1/{W}/agent/manifest
- /api/sdk/v1/{W}/manifest
- /api/sdk/v1/{world_id}/agent/manifest
- /api/session/crossing
- /api/session/grant/agent/join-report
- /api/session/purchase
- /api/session/realm-save
- /api/sql-door
- /api/state-rails
- /api/store-door
- /api/tree-ops-recorder

The per-game and per-world placeholders appear in several spellings ({appId}, {id}, {W}, {worldId}, {world_id}), and the same route can occur under more than one placeholder name. The page keeps each spelling as written.

### Status of each group

- listed: the path is in the published spec. The manual's own text names it, and the spec describes it.
- per-game: the path is in the spec only with a placeholder id. Per-game behaviour was observed on one authenticated read; it is not confirmed for unauthenticated calls.
- partial: the path itself is disabled or partial; its children are listed separately.
- absent: the manual names the path but the published spec does not describe it. These are the manual-only endpoints.

The known behaviour of one listed game path is recorded in docs/OPEN-ITEMS.md as OPEN-004 (FAULTS F1, GET /api/games/{appId} answers 200 with game null). That is recorded as BEHAVIOUR, not a contradiction, and must not be resolved by deleting either side.

### scripts/endpoints.mjs

The script exports loadSpecPaths, normalize, namedEndpoints, classify and buildEndpointsPage. Its own command line writes ENDPOINTS.md in the root given and prints a JSON line with the count of named endpoints and the file written. normalize strips trailing punctuation, replaces UUIDs with {id}, and drops any string with unbalanced braces, angle brackets, or fewer than six characters.

## Decisions

- Endpoints are counted from the text of the repository, not from the spec alone, because the manual names endpoints the spec does not contain. The 30 absent entries are that set.
- The page is generated and checked by scripts/check-manual.mjs, so the committed text is always the generated text (the check compares the committed file to buildEndpointsPage).
- Per-game paths are a separate group rather than being counted as listed, because only one authenticated read was witnessed.
- The 93 total is the owner requirement in docs/PARITY-INPUTS.md (old name: savi). The sources treat the figure as the documented featureset count. Jayzee's row 41 is recorded as built, with the 93 described as 39 published, 21 per-game, 30 manual-only and 3 disabled (docs/JAYZEE-GAPS.md).
- The spec was regenerated and the sync path removed. OPEN-023 records that the --sync path of scripts/endpoints.mjs, which fetched the jayzee OpenAPI spec, is removed, and that the npm script sync-spec is removed too. Only a local read of scripts/openapi.json remains.

## Open gaps

- OPEN-003 (docs/OPEN-ITEMS.md, old name: savi): the 93 endpoints (39, 21, 3, 30) must be supported by jayzee as an endpoint surface, not by name. Status OPEN, required in jayzee.
- OPEN-001: resolved. Only 42 of the 62 spec paths are named verbatim in the manual (witness in OPEN-001).
- OPEN-004: BEHAVIOUR, not a contradiction (see above).
- Per-game behaviour on unauthenticated calls is not confirmed (the group heading, from games-folio.bearer.body).
- The 30 absent endpoints have no spec description in scripts/openapi.json.

## Sources

- /workspace/savi/ENDPOINTS.md (old name: savi)
- /workspace/savi/scripts/endpoints.mjs (old name: savi)
- /workspace/savi/scripts/openapi.json (old name: savi)
- /workspace/savi/scripts/check-manual.mjs (old name: savi)
- /workspace/savi/docs/OPEN-ITEMS.md (old name: savi)
- /workspace/savi/docs/PARITY-INPUTS.md (old name: savi)
- /workspace/savi/docs/JAYZEE-GAPS.md (old name: savi)
- /workspace/savi/spawn-engine/FAULTS.md (old name: cleetus, old name: spawn)
