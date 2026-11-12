# Pending validation: wiki site

## Reference target

Visual and structural target: https://www.spawn.co/@lanmower/game-16@dev (the game page "Untitled game", by @lanmower). It was browsed with the playwriter setup inside gm (`gm.playwriter_execute`), not another browser tool. Screenshot kept at `/workspace/extra/wiki-tools/reference-spawn-game-16.png`.

Note: the top-level page is a host shell. Its visible content (the "toolbox" UI) is rendered in the child frame `https://r2q1uee90-playco.spawnfile.io/v4/client/pool/tome-ui/authored-realm-kept-7122d4dfa1d3ae64.html`. Its styles were read from that frame. The host shell's own DOM has no styled content, only the play session frame and the early plate script.

### What the reference shows

Layout and structure:

- A sticky white top bar, 64px tall, with a bottom border. It holds a two-tone wordmark on the left and a row of pill navigation items next to it.
- The active pill is tinted blue (`#eaf0ff`) with blue text. Inactive pills are muted grey text. Pills use an 8px radius, 6px by 8px padding and 13.5px weight 500.
- Main content sits in a centred column of about 976px, with a large eyebrow pill above the heading.
- The eyebrow is a 12px weight 600 blue label on a tinted background with a fully rounded radius (999px) and 2px by 10px padding.
- The heading is 42px, weight 400, line height about 1.15, in near-black `#16181d`.
- The lead paragraph is 18px, muted `#5d6470`, line height 1.6.
- A row of four stat cards: white background, thin light border, rounded corners, a large 36px bold blue number, and a 14.5px muted label.
- Two buttons: a primary solid blue button (`#3b6ef5`, white 15px weight 600 text, 8px radius, 10px by 18px padding) and a secondary white button with a 1px light border and dark text.
- A footer band separated by a light top border, with muted 14px text.
- A floating vertical dock of icon tiles on the right edge (not reproduced in the wiki: it belongs to the game shell, not to documentation).

Typography:

- Body and headings use `Inter, "Helvetica Neue", Arial, sans-serif`. The host shell also declares "Spawn Pixel Page" for game chrome, which the wiki does not use.
- Body text 16px, line height 1.6, colour `rgb(93,100,112)` for muted text and `rgb(22,24,29)` for strong text.

Colour tokens (read from computed style):

| Token | Value |
|---|---|
| Accent | `#3b6ef5` (rgb 59,110,245) |
| Accent tint | `#eaf0ff` (rgb 234,240,255) |
| Foreground | `#16181d` (rgb 22,24,29) |
| Muted | `#5d6470` (rgb 93,100,112) |
| Border | `#e3e6eb` / `#e3e6eb` (1px) |
| Page background | `#f6f7f9` (light grey) |
| Card background | `#ffffff` |

## How the wiki matches it

Changes made in `/workspace/extra/wiki-tools/build.mjs` (the stylesheet and page shell):

| Reference element | Wiki implementation |
|---|---|
| Sticky white top bar, 64px, bottom border | `.topbar` sticky, 64px high, white, `1px` bottom border |
| Two-tone wordmark | `.brand`: "wi" in ink and "ki" in accent blue, 20px bold |
| Pill navigation with tinted active item | `.pills` links for each project (index, cleetus, jayzee), with `.active` tinted blue for the current project |
| Centred column with eyebrow | `.layout` centred at 1040px; `main` at most 780px; `.eyebrow` pill with the project name above every title |
| 42px regular heading | `h1` 42px weight 400, line height 1.15 |
| 18px lead paragraph | first paragraph of each page at 18px, line height 1.6 |
| Typography and colours | `Inter` stack, `#16181d` ink, `#5d6470` muted, `#3b6ef5` accent, `#f6f7f9` background |
| Rounded cards and tables | tables and code blocks in white cards with `12px` radius and light border |
| Buttons and pills at 8px radius | sidebar links and pill items at 8px radius |
| Footer band with muted text | `footer.foot` with a top border and muted 14px text |
| Responsive | under 760px the sidebar stacks above the content |

Not matched, on purpose:

- The floating right-hand dock and the play-session chrome belong to the game shell. A wiki does not need them.
- The stat-card row and the two call-to-action buttons are game-specific. The wiki's structure is a page with a sidebar, so the wiki uses the sidebar and the table of contents in their place.
- The "Spawn Pixel Page" display font is not used. The reference uses it for game chrome only.

## Renames kept

The reference page is about a game on the Spawn host, so the host name `spawn.co` is part of the reference URL and is kept verbatim. Inside the wiki, the project names stay cleetus (old name savi) and jayzee (old name spawn), and `index` stays `index`.

## Content capture of the reference page

Captured with the playwriter setup inside gm (`gm.playwriter_execute`). Raw captures are in `/workspace/extra/wiki-tools/capture/` (verbatim, before renames):

- `host.json`: the host document (headline, byline, agent notes, play entry, six headings, the two images and one link).
- `00-overview.json` to `11-pick-a-genre.json`: the twelve toolbox navigation sections, each reached by clicking its entry in the `tome-ui` frame.

The wiki copies are generated by `/workspace/extra/wiki-tools/gen-reference.mjs` into `/workspace/extra/wiki/reference-game-16/`:

| Page | Source capture | Coverage |
|---|---|---|
| `page-host.md` | `host.json` | host text, 6 headings, 19 paragraph blocks, 1 link, 2 images |
| `page-00-overview.md` to `page-11-pick-a-genre.md` | one JSON per navigation section | full text in order, headings, every anchor, every image, every code or data block |
| `coverage.md` | all captures | per-section counts and totals |
| `download-process.md` | live API responses (see below) | the download steps and their results |

Coverage by count, from the capture (tabs only, host separate):

- Navigation sections captured: 12 of 12 (Overview, Starters, Skills, Animations, Sound & Art, Workshop, Engine, Reference, Shapes, Mods, Games, Pick a genre).
- Headings, links, images and code or data blocks are counted per page in `coverage.md`; the Reference section alone holds 70 headings and 73 code or data blocks.
- The toolbox navigation's own labels (`toolbox`, the four stat cards, and the two buttons) are in the host capture's text and in the `Overview` page.

Renames applied in the wiki copy:

- `Savi` becomes `Cleetus` and `savi` becomes `cleetus` in prose.
- `Spawn` becomes `Jayzee` and `spawn` becomes `jayzee` in prose and headings.
- Kept verbatim: hostnames and URLs (`www.spawn.co`, `play.spawn.co`, `git.spawn.co`, `spawnfile.io`), the package `@spawnco/client`, the command `spawn client`, identifiers in code blocks (for example `ctx.spawn`, `defaultSpawnPoint`), and the game name `Spawndle`. Code blocks are not renamed, because they are copied source.
- Two prose lines show a leftover `Spawn` inside code comments in the Reference section (`// the memory Spawn uses`, `// The games this player saved on Spawn`). They are code, so they are kept.

Limits of this capture:

- Each section was read once, after a 1.2 second wait. Text that appears only after a later scroll or click inside a section is not in the capture.
- The live world in the play frame (the engine's rendering) is not captured as text. Only the toolbox UI around it is.

## Download process for the repo and the site

Run on this machine. Secrets are not written anywhere; the token stays in `~/.spawn/token` and the invite code is shown here as a placeholder.

| Step | Endpoint or command | Result (no secrets) |
|---|---|---|
| Client | `bun add -g @spawnco/client` | installed; the `spawn` binary lives in `/config/.bun/bin` |
| Link | `spawn login --invite <invite code>` (no `--username`) | existing account `claude_haiku_55` linked to `lanmower`; `created: false`, `token: null`; `world: @lanmower/game-16`, `role: editor` |
| Identity | `GET https://www.spawn.co/api/agent/v1/me`, bearer from `~/.spawn/token` | HTTP 200; `linked: true`, `linkedTo: lanmower`; worlds `game-16` (editor), `game-10`, `the-savi-gallery`, `wonschweppidytime`; engine `6.0.0` |
| Resolve | `GET https://www.spawn.co/api/resolve-adventure?address=@lanmower/game-16` | HTTP 200; `type: found`; `appId 1e04de61-4225-4d57-8a79-b8e9bcef1c6e`; `worldId 02e941af-9db1-4d86-b1fa-f7bca802c4b1` |
| Docs | `GET https://www.spawn.co/api/sdk/v1/<worldId>/agent/docs` | HTTP 200; opening, `engineVersion 6.0.0`, 68 section headings |
| Clone | the `clone` line from `/me` | already present as `/workspace/extra/game-16` on `main`; origin `https://git.spawn.co/@lanmower/game-16.git`; `git ls-remote origin` returns `main` at `3eb8aeb` |
| Site | `GET https://www.spawn.co/@lanmower/game-16@dev` | HTTP 200, `text/html; charset=utf-8` |

Not run: `spawn client join` (no body joins the world) and the publish door (`POST /api/games/<appId>/publish`).

Open for this download:

- `/workspace/extra/game-16` has two uncommitted changes, `.gitignore` and `.spawn/engine.yaml`. They were left as they are.
- The site returns 200 and HTML; its rendering was checked by the playwriter capture, not by a fresh render of the download.

## Pending checks

- Build the site and confirm it renders (`node /workspace/extra/wiki-tools/build.mjs`).
- Run the link checker once (`node /workspace/extra/wiki-tools/check-links.mjs`), expecting `broken: 0`.
- Open `/workspace/extra/wiki-site/index.html` in the playwriter browser and compare it with the reference screenshot.

## Duplicate pages merged

The two near-duplicate pairs were merged by section (How it works, Decisions, Open gaps, Sources), keeping every paragraph from both:

- `wiki/index/discovery.md` now holds the former `discovery.md` and `tree/tree-discovery.md`. The `tree/` copy was deleted.
- `wiki/index/exhaustive-index.md` now holds the former `exhaustive-index.md` and `tree/tree-exhaustive.md`. The `tree/` copy was deleted.
- Links were repointed: `index/tree/*` links to `../discovery.md` and `../exhaustive-index.md`; the merged exhaustive page links to `tree/tree-build-scripts.md` and `tree/tree-provenance.md`.
- Merged text: 16,463 bytes for discovery (from 16,547 bytes across the two pages, less their duplicate headings), and 16,737 bytes for exhaustive.

## Build and link check

- Build: `node wiki-tools/build.mjs wiki wiki-site`, output `built 83 pages into wiki-site`, wall time 0.157 s.
- Link check: `node wiki-tools/check-links.mjs wiki-site`, output `pages: 83  internal links checked: 7655  broken: 0`, exit 0, wall time 0.144 s.
- The first check after the merge reported two broken links (`exhaustive-index.html` to `tree-build-scripts.html` and `tree-provenance.html`), because the merged page moved up one directory. They were fixed to `tree/…`, and the build and check were run again. The green result above is from that second run.

## Remote

- `origin` is `https://github.com/AnEntrypoint/extra.git`, the remote the owner named.
- Branch `main` is pushed once, after the build and link check were green.

## Pages in the wiki (Phase A)

Each page below is in `wiki/` and listed in `wiki/toc.md`.

- [CDN inventory and manifests](`index/cdn-inventory.md`)
- [Discovery evidence](`index/discovery.md`)
- [Exhaustive world and GLB index](`index/exhaustive-index.md`)
- [extra docs: the Jayzee game API reference copy](`index/extra-docs.md`)
- [extra world lists and feeds](`index/extra-worlds.md`)
- [Open gaps in the index](`index/open-gaps.md`)
- [Overview of the index project](`index/overview.md`)
- [Provenance manifests](`index/provenance.md`)
- [cleetus index](`index/savi-index.md`)
- [jayzee index](`index/spawn-index.md`)
- [The borick/ directory](`index/tree/tree-borick.md`)
- [Build, check and discovery scripts, and the patch files](`index/tree/tree-build-scripts.md`)
- [The extra/ directory](`index/tree/tree-extra.md`)
- [The index files: COMPLETE_INDEX, EXTRA_WORLD_INDEX and INDEX](`index/tree/tree-indexes.md`)
- [Open gaps in the top-level index, its directories and the browser state](`index/tree/tree-open-gaps.md`)
- [Top-level layout of the jayzee tree](`index/tree/tree-overview.md`)
- [provenance.sha256.txt and the other provenance manifests](`index/tree/tree-provenance.md`)
- [The cleetus/ directory (`old name: savi)](index/tree/tree-savi-directory.md`)
- [The jayzee/ directory (`old name: spawn)](index/tree/tree-spawn-directory.md`)
- [CI workflows and npm scripts](`cleetus/ci-workflows.md`)
- [The docs folder](`cleetus/docs-folder.md`)
- [Endpoints](`cleetus/endpoints.md`)
- [Engine decisions: why the jayzee engine notes are shaped as they are](`cleetus/engine-decisions.md`)
- [Engine overview: the jayzee engine notes (`cleetus workspace)](cleetus/engine-overview.md`)
- [Evidence claims](`cleetus/evidence-claims.md`)
- [Evidence overview](`cleetus/evidence-overview.md`)
- [Featureset part 1: cleetus counts, spoint surface, and the relayed streams](`cleetus/featureset-part-1.md`)
- [Featureset part 2: streams 12 to 25 and the src/sdk modules](`cleetus/featureset-part-2.md`)
- [Featureset part 3: streams 26 to 34](`cleetus/featureset-part-3.md`)
- [Featureset part 4: streams 35 to 45, client/core rendering modules](`cleetus/featureset-part-4.md`)
- [Featureset part 5: streams 45 to 55, client/core modules](`cleetus/featureset-part-5.md`)
- [Featureset part 6: streams 56 to 58 and the improvement opportunities](`cleetus/featureset-part-6.md`)
- [Featureset part 7: improvement candidates from streams 43 to 58](`cleetus/featureset-part-7.md`)
- [Featureset part 8: agent and room candidates, session store, bake pins, learning record and terrain](`cleetus/featureset-part-8.md`)
- [FEATURESET part 9: render, editor, HUD, XR, packages, static serving and server surface](`cleetus/featureset-part-9.md`)
- [Jayzee implementation gaps](`cleetus/jayzee-gaps.md`)
- [Manual build and check](`cleetus/manual-build.md`)
- [Manual worklist](`cleetus/manual-worklist.md`)
- [Morluto rea PR 9234 CI findings](`cleetus/morluto-ci-findings.md`)
- [Netcode](`cleetus/netcode.md`)
- [Open gaps across the cleetus repository](`cleetus/open-gaps.md`)
- [Open items register](`cleetus/open-items.md`)
- [Overview of cleetus](`cleetus/overview.md`)
- [Parity](`cleetus/parity.md`)
- [Runs overview](`cleetus/runs-overview.md`)
- [Site overview (`built manual output)](cleetus/site-overview.md`)
- [Sources overview](`cleetus/sources-overview.md`)
- [State and tooling](`cleetus/state-and-tooling.md`)
- [jayzee GLB URL list (`glb-urls-all.tsv)](jayzee/maps-glb-urls.md`)
- [jayzee world head status lists](`jayzee/maps-head-status.md`)
- [jayzee learning record](`jayzee/maps-learning-record.md`)
- [jayzee learning record, part 1 (`denominators, corpus, keys, escapes, bucket rule, 410)](jayzee/maps-learning-record-part-1.md`)
- [jayzee learning record, part 2 (`error keys, non-CDN refs, open items, name decode, /cdn/ attempt)](jayzee/maps-learning-record-part-2.md`)
- [jayzee non-CDN data references (`unverified-noncdn-refs.tsv)](jayzee/maps-noncdn-refs.md`)
- [jayzee maps open gaps](`jayzee/maps-open-gaps.md`)
- [jayzee maps directory overview](`jayzee/maps-overview.md`)
- [jayzee root-linked worlds map](`jayzee/maps-root-worlds.md`)
- [jayzee witness input directories and their sha256 checks](`jayzee/maps-witness-inputs.md`)
- [jayzee witness scripts](`jayzee/maps-witness.md`)
- [Runs findings and decisions](`jayzee/runs-findings.md`)
- [Runs open gaps and failures](`jayzee/runs-open-gaps.md`)
- [Runs overview](`jayzee/runs-overview.md`)
- [Runs timeline](`jayzee/runs-timeline.md`)
- [Sources captures](`jayzee/sources-captures.md`)
- [Sources index](`jayzee/sources-index.md`)
- [Sources overview](`jayzee/sources-overview.md`)
- [Capture coverage: game page](`reference-game-16/coverage.md`)
- [Download process: from the join instructions to a working site](`reference-game-16/download-process.md`)
- [Game page section: Overview](`reference-game-16/page-00-overview.md`)
- [Game page section: Starters](`reference-game-16/page-01-starters.md`)
- [Game page section: Skills](`reference-game-16/page-02-skills.md`)
- [Game page section: Animations](`reference-game-16/page-03-animations.md`)
- [Game page section: Sound Art](`reference-game-16/page-04-sound-art.md`)
- [Game page section: Workshop](`reference-game-16/page-05-workshop.md`)
- [Game page section: Engine](`reference-game-16/page-06-engine.md`)
- [Game page section: Reference](`reference-game-16/page-07-reference.md`)
- [Game page section: Shapes](`reference-game-16/page-08-shapes.md`)
- [Game page section: Mods](`reference-game-16/page-09-mods.md`)
- [Game page section: Games](`reference-game-16/page-10-games.md`)
- [Game page section: Pick A Genre](`reference-game-16/page-11-pick-a-genre.md`)
- [Host page: Untitled game (`@lanmower/game-16)](reference-game-16/page-host.md`)
- [README](wiki/README.md) and [table of contents](wiki/toc.md) are the two pages not listed above; the build counts them, so 81 + 2 = 83.

## Push

- `git push -u origin main` to `https://github.com/AnEntrypoint/extra.git`, run once after the build and the link check were green.
- Result: `[new branch] main -> main`, `branch 'main' set up to track 'origin/main'`, exit 0.
- Wall time: 4.183 s.
- Remote `main` after the push: `a91291e0050a03bb4545afcb38de987433caedc3` (matches the local commit).
- This record is committed locally only, after the push, so the push itself was not repeated.


## Recapture of the game page (2026-11-12)

The live page https://www.spawn.co/@lanmower/game-16@dev was captured again with the playwriter setup inside gm. It looks for what the first capture (`wiki-tools/capture/`, unchanged) does not hold: the host document, the play frame, content loaded after a scroll, and content loaded after a click inside each toolbox section. Raw states are in `wiki-tools/recapture/states/`. The pages are generated by `wiki-tools/gen-recapture.mjs`, with the rename rules in `wiki-tools/rename.mjs`, which `wiki-tools/gen-reference.mjs` now imports as well.

### Changes

- New pages in `wiki/reference-game-16/`: `recapture-index.md`, `recapture-host.md`, `recapture-play-frame.md`, and one `recapture-<section>.md` for each of the twelve toolbox sections. Fifteen entries are added to `wiki/toc.md` under reference-game-16.
- `wiki/reference-game-16/coverage.md` (generated by `gen-reference.mjs`): the open-gap list now points to the recapture pages and states the skipped controls.
- `wiki-tools/rename.mjs` (new): the rename rules, moved out of `gen-reference.mjs` unchanged. `wiki-tools/gen-recapture.mjs` (new). `wiki-tools/gen-reference.mjs` imports the shared rules; its other pages regenerate byte-identical.
- `wiki-site/` rebuilt once, 98 pages.

### Witnesses

- Build: `node wiki-tools/build.mjs wiki wiki-site` printed `built 98 pages into wiki-site`.
- Link check: `node wiki-tools/check-links.mjs wiki-site` printed `pages: 98  internal links checked: 10477  broken: 0`, exit 0.
- Capture files unchanged: `git status -- wiki-tools/capture` is empty.
- Secrets: a scan of the files this change touches (wiki/, wiki-site/, wiki-tools/, the run's captures and logs) found no `sak_` token, no invite-code value, and no token, key or secret field with a value. Exception: the untracked `site/docs/wiki/raw/sources/` files (68 files, not committed) hold saved GitHub page embeds with token-valued fields. They predate this change and were left as found.

### Not captured, and why

- 38 controls were not clicked, because their labels name an action that changes state or sends something (play, join, install, like, sign in, and similar). Each section page lists its own under Not captured.
- The play frame is a canvas with no text in the DOM, so the live world cannot be captured as text.
- The 148 Games entries were each clicked once. None brought up anything in the toolbox frame that the swept state did not already hold. A game's own page was not opened.
- One click, on the arrow link Walk into the animation hall in Animations, was made before the travel verbs were added to the skip list. The toolbox frame was gone on the next check, and the page was reloaded. What that click did in the live world was not verified.
- Hidden text (inline script, style, and the schema.org data on the host) is captured as text, with whitespace collapsed by the extractor.


## Token removal and walk-control check (2026-11-12, second pass)

This pass closes the two open items of the earlier REPORT: the Spawn token and invite values in the workspace, and the live state after the walk-control click. Phase A is the edit and the local commit. Phase B (wiki-site rebuild, link check, push) is recorded at the end of this section once it has run.

### Changes

- Redacted the play-frame grant query values frameGrant and heldClaim in wiki-tools/recapture/states/play/load.json, wiki/jayzee/sources-captures.md and wiki/jayzee/sources-index.md. Keys and all other text are unchanged.
- wiki-tools/gen-recapture.mjs: adds WALK_NOTE, written on the Animations page under Not captured, and replaces the index sentence about the walk click with the live-check result.
- Regenerated wiki/reference-game-16/recapture-animations.md (one new paragraph) and wiki/reference-game-16/recapture-index.md (the walk-click sentence). No other generated page changed.
- Redacted the same grant values in untracked run files: runs/2026-11-12-12-38-01-c6fa69/recapture/frames/all-frames.json and runs/2026-11-12-13-28-26-57c23e/log.jsonl. The log edit keeps each value's length, so byte offsets stay the same.
- Redacted the same grant values in one gitignored Chromium cache entry under .playwriter/browser-profile, keeping its length.
- Phase B rebuilds wiki-site/jayzee/sources-captures.html and sources-index.html, which carry the same grant values in the committed copy.
- Not changed: the saved GitHub page embeds in the untracked site/docs/wiki/raw/sources/ files (authenticity_token fields). They are GitHub form tokens, not Spawn values, and were left as found.

### Spawn token and invite search

- Scope: every file under /workspace/extra, tracked and untracked, read with binary-safe grep and a Node scan. Patterns: sak_ tokens, Bearer values, token, key, secret, invite and grant fields with a value, and the frameGrant and heldClaim query values.
- No sak_ token, Bearer value or invite code exists in any file.
- .local/api-me.json, .local/api/me.json and .local/drift/me.body hold doors.token and doors.invites as endpoint URLs, and doors.invite_accept as a template with a placeholder. These are public endpoints, not credentials, so they were left as they are. .local/api/invites.meta.json has redacted set to true. .local/api/invites.json is an empty list.
- The grant values are the only Spawn credentials found. They were in tracked files and in the untracked run files and cache listed above.
- Git history still holds them: commits d78bf0b, 5ba0be6 and 5025920 (5025920 is on origin/main). Removing them from history needs a rewrite and a force push, which were not done.
- Correction: the secrets scan in the first pass did not look for query-string grants. It reported no token-valued fields in wiki/, wiki-tools/ and the run files, and that was wrong for these files. The earlier open-gap bullet about the walk click is superseded by the check below.

### Walk control, live check

- Method: a fresh load of https://www.spawn.co/@lanmower/game-16@dev through a playwriter CLI session. The control was read with DOM queries and a CDP listener lookup. It was not clicked. The Animations tab was clicked once to open its section.
- The control is an anchor with the text "Walk into the animation hall", an inline handler sendAction('hall') and no href. CDP reports one click listener, the inline handler.
- So a click sends a hall action to the world. It does not follow a link.
- The play session after a fresh load is the same world as the first baseline (same world path and same address parameter). The page did not move to another world.
- What the hall action does on the server is not visible on the page, because the play frame is a canvas. Its effect on the server is not verified.
- The one effect recorded at the time of the earlier click was the toolbox frame detaching. A fresh load shows the toolbox again. So the click did change something on the page at that time; it did not change nothing.

### Witnesses

- Live probe: toolboxFound true; one A element with onclick sendAction('hall') and href null; one click listener; cdpError null.
- Redaction: 30 grant values replaced across the files above. The verification scan found no grant value left in any file. Its only other hits are the grep patterns in the run log's own tool-call records.
- Generator: node wiki-tools/gen-recapture.mjs printed pages 14. Besides the redacted files, git status shows only the two regenerated recapture pages.


### Phase B

- Build: node wiki-tools/build.mjs wiki wiki-site printed "built 98 pages into wiki-site", exit 0.
- Link check: node wiki-tools/check-links.mjs printed "pages: 98  internal links checked: 10477  broken: 0", exit 0.
- Rebuilt pages with changes: wiki-site/jayzee/sources-captures.html and sources-index.html (grant values replaced), and wiki-site/reference-game-16/recapture-animations.html and recapture-index.html (walk note).
- Processes stopped by PID: 3605443 (playwriter gate started by this session's run c6fa69; it no longer listened on port 9611) and its child 3605459. Both were gone after a plain kill. Not touched: 2791557 and 2791574 (jayzee project gate), 929361 and 929382 (another gm session), 307851 (playwriter-ws-server). No browser from this pass was left running.
- Grant check after the rebuild: 30 placeholders. The only other matches are grep patterns in the tool-call records of this run's log (events 261 to 269).
- The push of origin main is recorded in the run report, not here, because this record is committed before the push.


## GitHub form tokens and session cookie values removed (2026-11-12, third pass)

Phase A is the edit and the local commit. The rebuild, link check and push are recorded in the run report.

### Changes

- Untracked site/docs/wiki/files, site/docs/wiki/raw/sources and site/docs/wiki/raw-data/sources (18 files): the value of every hidden authenticity_token input was emptied, 216 values in all (18864 characters). The input elements and all other content are kept. The site/ tree is untracked, so these edits are in no commit.
- Browser profile .playwriter/browser-profile/Default/Cookies (gitignored, not in any commit): six session cookie rows for www.spawn.co, .kiln.spawn.co and play.spawn.co had encrypted values. The values were emptied and the rows kept. Then VACUUM ran with secure_delete on, so no old ciphertext is left in the file: 20480 bytes after VACUUM, zero v10 or v11 prefixes.
- docs/PENDING_VALIDATION.md: this section.

### Search

- Patterns: authenticity_token, csrf-token and upload_token followed by a value of 40 or more token characters; the session cookie names followed by a value of 16 or more characters; an invite key followed by a separator and a value of 40 or more characters; sak_ tokens; Bearer values.
- Whole workspace, tracked and untracked, excluding .git: 0 files match. Tracked files: 0 match.
- Node check of every authenticity_token value attribute in the workspace: 216 attributes, 0 non-empty.
- The run logs name these keys in task text and tool output, with no values.
- Git history: four commits hold GitHub authenticity_token values: 31463f6, c3abe99, d0c93b1 and 2bbbca0. d0c93b1 is on origin/main. Removing them needs a history rewrite and a force push, which were not done; that is a decision for the user.
- Correction to the second pass of this section: its invite check was loose. A hyphenated game-text slug in wiki-site/reference-game-16/recapture-pick-a-genre.html matched it. The invite pattern now requires a key and a separator, and that slug no longer matches.

### gm playwriter gate

- gm playwriter_execute could not reach its gate on port 9611 (connect ECONNREFUSED; the executor kept a stale browser endpoint). The live check of the walk control was run through the playwriter CLI session instead (playwriter-project session, then -s 4 -e), as in the second pass. The stale gate from run c6fa69 was stopped by PID.


## Untracked entries and token check after the reboot (2026-11-12, reboot pass)

Starting state: local main at 40bec3f, equal to origin/main. No tracked file was modified. The six entries were untracked top-level paths: .gitignore, .local/, game-16/, runs/, scripts/ and site/.

### Decision for each entry

- site/: saved GitHub page captures and assets. The token scrub of this session (216 authenticity_token values emptied, 18 files) was made here. The directory is untracked by design, so the scrub is in no commit.
- .local/: capture output, drift reports, logs and engine files. Untracked by design. The API captures in it hold no token value (see the grep below).
- runs/: the gm run records of this session. Untracked by design.
- game-16/: a nested git repository with its own .git. It is not part of this repository.
- scripts/: check-extraction-complete.py and check-extraction-drift.py, extraction tooling. Not committed in this pass; committing it is an owner decision.
- .gitignore: one line, .playwriter/, which keeps the browser profile and its cookie store out of git. Left untracked; committing it is an owner decision.

Nothing was committed for the six entries, because none of the planned changes is in a tracked file. The wiki changes were committed earlier (b948a02 and f8454c8).

### Token check

- Grep over the working tree, tracked and untracked, excluding .git, with the patterns in runs/2026-11-12-16-08-34-698b36/token-patterns.txt: GitHub authenticity_token, csrf-token and upload_token values of 40 or more characters; named session cookies with a value of 16 or more characters; frame grant values; invite keys with a value of 40 or more characters; sak_ tokens; Bearer values. Result: 0 files.
- The grep was checked against a synthetic positive line before the run, and it matched.
- Git history is not changed by this pass. Four old commits (31463f6, c3abe99, d0c93b1 and 2bbbca0) still hold GitHub authenticity_token values, and d0c93b1 is on origin/main. History removal stays with the owner.
