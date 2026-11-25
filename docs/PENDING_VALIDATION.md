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


## Ranked remaining work for the extra wiki (2026-11-12, from c6b058b)

Starting state: local main and origin/main at c6b058b, no tracked file modified. The six untracked top-level entries are .gitignore, .local/, game-16/, runs/, scripts/ and site/.

### Reachable now, worked in this pass

1. wiki-site/index.html renders and matches the wiki home reference, wiki-tools/wiki-site-home.png. Source: the Pending checks section above. Witness (Phase B): a playwriter CLI screenshot of the built index, read against the reference.
2. Stale citation of a missing script. wiki/jayzee/runs-findings.md lines 45 and 108 cite /workspace/savi/.spawn/update-engine-pin.py, which is absent from this workspace. Witness (Phase B): the cited-path scan finds that path only on lines marked absent.
3. This ranked list and the status of each item. Witness: the heading in this file.

### Held, not run

4. gh-pages publish. No clearance was found. This file has no clearance, the saved memory directory is empty, and no run log records an approval. The extra repository has no .github workflow. Held until the owner confirms the clearance and its scope.
5. History rewrite and force push that remove token values from pushed commits. Held for the owner, not run. Commits that hold GitHub authenticity_token values: 31463f6, c3abe99, d0c93b1 (on origin/main) and 2bbbca0. Commits that hold session grant values: d78bf0b, 5ba0be6 and 5025920.
6. The six untracked top-level entries stay untracked, by the decision recorded in c6b058b.
7. game-16/ has two uncommitted changes, .gitignore and .spawn/engine.yaml. It is a nested repository with its own .git, outside this repository. Owner decision.
8. Savi and jayzee open items (wiki/cleetus/open-items.md, OPEN-001 to OPEN-030, and wiki/index/open-gaps.md). Their sources are in /workspace/savi and /workspace/jayzee, which are other repositories outside this write scope. Some need live walks; OPEN-006 would take about nine million requests.
9. Games entries: a game's own page was not opened (wiki/reference-game-16/coverage.md). Opening 148 pages needs an owner decision on scope.
10. The play frame is a canvas, so its content cannot be captured as text. Platform limit.
11. The walk control's hall action cannot be seen from the page. The control was not clicked again.
12. 38 state-changing controls were not clicked. Owner policy.

### Phase A changes

- wiki/jayzee/runs-findings.md lines 45 and 108: the cited path /workspace/savi/.spawn/update-engine-pin.py is marked as absent from this workspace on 2026-11-12.
- docs/PENDING_VALIDATION.md: this section.


### Phase B witnesses (2026-11-12, ranked work pass)

- Build: node wiki-tools/build.mjs wiki wiki-site printed "built 98 pages into wiki-site", exit 0, 169 ms. The rebuild changed one generated page, wiki-site/jayzee/runs-findings.html.
- Link check: node wiki-tools/check-links.mjs printed "pages: 98  internal links checked: 10477  broken: 0", exit 0, 145 ms.
- Render, item 1: a playwriter CLI session loaded file:///workspace/extra/wiki-site/index.html. Status 200, title "Project wiki: how this wiki is organised · Wiki", the same first heading, 104 links, 0 broken images, 0 page or console errors. The screenshot matches wiki-tools/wiki-site-home.png in layout and content. The scrollbar thumb is shorter in the new render, so the built page is slightly taller than when the reference was taken.
- Citation, item 2: wiki/jayzee/runs-findings.md has both citations marked absent on 2026-11-12, and the built page carries the same annotation.
- Processes: the CLI session's browser and controller exited when the call ended. A process comparison against a snapshot taken before the call found no new process. Pre-existing processes belonging to other sessions were not touched.

## Games pages, OPEN reflection and the games index (2026-11-12, Phase A of the 25bc03a pass)

### Phase A changes

- 349b3b7, wiki/cleetus/open-items.md: OPEN-022 now carries its tag, required in jayzee, as /workspace/savi/docs/OPEN-ITEMS.md does. Witness (Phase B): a read-only comparison of the 30 statuses and tags in the wiki page against the register prints 30 of 30 ok.
- 9fdaf56, wiki-tools/gen-games.mjs: new generator. It reads wiki-tools/recapture/games/manifest.json and one capture per game (NNN.json), and writes wiki/reference-game-16/games/NNN-slug.md for each of the 148 games and wiki/reference-game-16/recapture-games.md as the index. It stops with an error when the manifest does not list 148 games in order, and when a token-shaped value appears in a page. Witness (Phase B): node wiki-tools/gen-games.mjs prints a JSON line with games 148, and 148 files exist under wiki/reference-game-16/games/.
- 7cf7be4, wiki-tools/gen-recapture.mjs: the Games section is removed from the recapture generator, so it no longer writes the zero-count recapture-games page, and the index sentence about game pages now points at the games pass. Witness (Phase B): node wiki-tools/gen-recapture.mjs runs, and wiki/reference-game-16/recapture-index.md no longer says the game page was not opened.
- 0968612, wiki/toc.md: lists wiki/reference-game-16/recapture-games.md. Witness (Phase B): check-links.mjs reports the entry and its target as present.

### Not committed in game-16

- game-16/.gitignore and game-16/.spawn/engine.yaml are not committed. Both carry a rename of the engine reference from spawn to jayzee: .gitignore changes .spawn/engine/ to .jayzee/engine/, and .spawn/engine.yaml changes the ref host from git.spawn.co to git.jayzee.co. They are not wiki files, so the owner's condition for a local commit inside game-16 is not met. The other 25 modified files in game-16 are not touched. Owner decision needed. game-16 is not pushed.

### Savi and jayzee OPEN items (read-only)

- Read: /workspace/savi/docs/OPEN-ITEMS.md (30 items, OPEN-001 to OPEN-030), and the OPEN references in /workspace/jayzee/docs/PARITY.md and IDEAL.md. Nothing was written into /workspace/savi or /workspace/jayzee.
- Checked by reading: the status and the required-in-jayzee tag of each of the 30 items in wiki/cleetus/open-items.md match the register, after the OPEN-022 tag fix in 349b3b7. Eighteen other wiki pages cite OPEN IDs and agree with the register.

### Phase B (one run, then one push)

1. Discover the 148 game addresses from the Games section of the live game page, read-only in the playwriter CLI session, with no click beyond navigation. Open each game's address once, read-only. Write wiki-tools/recapture/games/manifest.json and wiki-tools/recapture/games/001.json to 148.json.
2. Run node wiki-tools/gen-recapture.mjs, then node wiki-tools/gen-games.mjs.
3. Run node wiki-tools/build.mjs wiki wiki-site once.
4. Run node wiki-tools/check-links.mjs once. Fix each defect and rerun only what failed.
5. Commit the rebuilt wiki-site and the Phase B witness lines to main, as lanmower with no trailer. Publish wiki-site to gh-pages as a fast-forward of origin gh-pages 5ba0be6, and record the gh-pages URL and the commit it publishes. Read the Pages settings with gh api repos/AnEntrypoint/extra/pages, read-only.
6. One push: git push origin main gh-pages. No force push, no history rewrite.

### Still held, not run

- History rewrite and force push that remove token values from pushed commits (see the held list above).
- The six untracked top-level entries stay untracked.
- The 38 state-changing controls stay unclicked.
- No writes into /workspace/savi or /workspace/jayzee.

## Games pages over HTTP, and the gh-pages publish (2026-11-12, Phase B of the 25bc03a pass)

### Browser stop

- The browser crawl of the games stopped after 12 pages: the browser closed during the 13th page. Rerunning one game per playwriter call still failed (46 errors). The owner then asked for HTTP.
- Stopped by PID, with no browser.close() call: the job wrapper 136023, its playwriter session 189909, the Chromium main process 158873 and its helpers, all on the project profile /workspace/extra/.playwriter/browser-profile. No browser call was made after that.
- Not touched, because this pass did not start them: playwriter-ws-server 88264, the gate processes 2531, 21949 and 168964, and the npx processes 9567, 10302 and 10309.

### Games: count, source and method

- The Games section lists 53 cards once its panel is scrolled. They resolve to 52 distinct game addresses. One address appears on two cards, and the manifest keeps the first.
- The figure of 148 in the Phase A lines above was the number of click targets the first recapture made across these 53 cards (wiki-tools/recapture/states/toolbox/summary-10.json, clicked 148). It was not a count of game pages. The wiki covers the 52 pages the section holds.
- Each address comes from the card's onclick, openLink('https://spawn.co/@creator/slug'), read from the page and never clicked.
- Each address was fetched once with curl (HTTP GET, --compressed, a desktop user agent). 52 of 52 returned 200 with a closing html tag. curl-impersonate was not needed, because plain curl was not blocked. The HTML as served was read. Scripts were not run, so the pages have no scroll stage.
- Files: wiki-tools/fetch-games.mjs, wiki-tools/recapture/games/cards.json, manifest.json and 001.json to 052.json. The raw HTML is in /tmp/extra-scratch/html and is not committed. The 12 browser captures from the first run were replaced by the HTTP captures.
- Item 9 of the ranked list above (the game pages were not opened) is resolved by this pass.

### Witnesses

- Fetch: node wiki-tools/fetch-games.mjs printed {"planned":52,"statusCounts":{"200":52},"errorCount":0,"errors":[]}.
- Capture totals over the 52 pages: 2901 text blocks, 541 headings, 104 links, 276 images, 52 code or JSON blocks, 417 controls, 2986 scripts and 416 styles not kept.
- Generate: node wiki-tools/gen-recapture.mjs ran, and node wiki-tools/gen-games.mjs printed {"games":52,"pages":"/workspace/extra/wiki/reference-game-16/games","index":"recapture-games.md"}.
- Build: node wiki-tools/build.mjs wiki wiki-site printed "built 150 pages into wiki-site".
- Link check: node wiki-tools/check-links.mjs printed "pages: 150  internal links checked: 23738  broken: 0".
- Token scan: a node scan of wiki, wiki-site and wiki-tools/recapture/games for the token patterns in the gate found 355 files and 0 with a token-shaped value. Only file names and counts were printed.
- Pick a genre: wiki/reference-game-16/recapture-pick-a-genre.md is identical to 25bc03a (git diff gives 0 lines).

### Fixes made in this pass

- The removal of the Games entry from the section list in 7cf7be4 shifted the index of Pick a genre. Its page then read the Games state files and was emptied. Fixed by b287ebd (the list keeps Games, and the loop skips it), d37b723 (restores the Pick a genre page and its index row), and 3801dda (rebuilds the site).
- gen-games.mjs reads the planned count from the manifest, so the count is 52 and not a fixed 148 (in 428063b).
- Pages that were not scrolled say so. The Not captured list gives the script and style counts and any fetch error (in 428063b).

### Publish

- gh-pages: commit 8273f8b, on top of origin gh-pages 5ba0be6. Its tree is wiki-site with a .nojekyll file added, as the existing tree has. An earlier local commit d82eaae was built before the Pick a genre fix and was never pushed. It is not in the publish.
- Pages settings, read with gh api repos/AnEntrypoint/extra/pages: status built, source branch gh-pages at path /, html_url https://anentrypoint.github.io/extra/, https_enforced true.
- The owner cleared the gh-pages publish in the message of this run. That clearance is recorded here, and it is the clearance item 4 above was waiting for.

### Render check

- No browser render was run in this pass, because the owner asked for no browser where HTTP can answer. The built site is checked by the link check (23738 internal links, 0 broken) and by the token scan above. The earlier render witness, for the 98-page build, is not repeated.

### Commits

- Phase A: 349b3b7, 9fdaf56, 7cf7be4, 0968612, d49989b.
- Phase B: f6d8a87 (fetch and captures), 428063b (generators and table of contents), 710005c (wiki pages), 143787c (site), b287ebd (recapture generator index fix), d37b723 (Pick a genre page restored), 3801dda (site rebuilt), and this record.

### game-16

- Unchanged: .gitignore and .spawn/engine.yaml are not committed, and game-16 is not pushed. Owner decision, as in Phase A.

### Held, not run

- History rewrite and force push: not run.
- The six untracked top-level entries: untouched.
- The 38 state-changing controls: not clicked. The HTTP pass clicked nothing.
- No writes into /workspace/savi or /workspace/jayzee.

## Docs check of the six untracked entries and the bevy-gaps docs (2026-11-16)

Starting state: local main at 35d770e, equal to origin/main (0 ahead, 0 behind after a fetch). `git status --short` listed six untracked top-level entries and no tracked file modified.

### What each entry holds

- `.gitignore`: one line, `.playwriter/`. Untracked. Committing it is an owner decision, as recorded in c6b058b.
- `.local/`: 597 files, 72M. Capture output, drift reports, logs and extraction scripts. Untracked by design (c6b058b).
- `game-16/`: 149 files, 2.7M, of which 44 are tracked. A nested repository with its own `.git` (HEAD 3eb8aeb). It is not part of this repository, and 26 of its tracked files are modified. Owner decision (882ad7b, 2026-11-12 entry 7).
- `runs/`: 755 files, 24M. gm run records. Untracked by design (c6b058b).
- `scripts/`: 2 files, 24K: `check-extraction-complete.py` and `check-extraction-drift.py`. Untracked. Committing them is an owner decision. The drift script reads its token from `~/.jayzee/token` and does not store it.
- `site/`: 2615 files, 71M. Saved page captures and assets. Untracked by design (c6b058b).

### Decision

None of the six entries is committed in this pass. `site/`, `.local/` and `runs/` hold capture and run data, and committing them would publish it. `game-16/` is a nested repository and cannot be added as files. `scripts/` and `.gitignore` remain owner decisions.

### bevy-gaps docs (commit 35d770e)

- `docs/bevy-gaps/checker-cli-and-corpus.md` (158 lines): no change.
- `docs/bevy-gaps/ctx-and-terrain.md` (119 lines): no change.
- `docs/bevy-gaps/host-bridge-and-report.md` (93 lines): no change.

Every repository path the three docs cite exists: `/workspace/bevy/src/main.rs`, `src/tree.rs`, `src/world.rs`, `src/globe.rs`, `src/script/mod.rs`, `src/script/prelude.js`, `scripts/check-game16-api.cjs`, `FEATURE_MATRIX.md`, and `/workspace/extra/game-16`, `.local/docs` and `site/docs`. The `game16-report` name appears in the bevy sources. The bevy repository has five modified tracked files (AGENTS.md, src/features.rs, src/script/mod.rs, src/script/prelude.js, src/world.rs). They are not touched here, and the docs cite some of them.

### Changes in this pass

- `docs/PENDING_VALIDATION.md`: this section added.
- No change to the three bevy-gaps docs.
- No change to the six untracked entries.

## Extra repo decisions: scripts, .gitignore and the game-16 hold (2026-11-16)

Starting state: local main and origin/main at ad51ba8. Untracked top-level entries: `.gitignore`, `.local/`, `game-16/`, `runs/`, `scripts/`, `site/`.

### Changes in this pass

- `.gitignore`: was `.playwriter/`. Now also `.local/`, `site/` and `runs/`, so these are never tracked. This replaces the earlier decision in c6b058b that they stay untracked by design.
- `scripts/check-extraction-complete.py`: now tracked. The module docstring and the section comments were removed; the shebang is kept. No code line changed.
- `scripts/check-extraction-drift.py`: now tracked. The module docstring (lines 2 to 6) and the comment lines were removed; the shebang is kept. No code line changed. Its docstring said the script never mutates upstream. The script sends one POST to `/agent/exec`, so that claim is not kept. See `AGENTS.md`.
- `AGENTS.md`: new, at the repo root. It holds the facts from the drift docstring that the code confirms: where the token comes from, the 0600 header file and its removal, and the POST.
- `docs/PENDING_VALIDATION.md`: this section.

### game-16: held, not committed and not pushed

The 27 modified files in the nested `game-16/` repository are not committed. Their diff is a mechanical rename of spawn to jayzee and of Savi to Cleetus, and it is not safe to land:

- Every added line (152 of 152) contains `jayzee` or `Cleetus`. The rename also reaches code: `export function onSpawn(ctx)` in `scripts/hall-figure.js` is now `onJayzee`, and `defaultSpawnPoint` and `defaultSpawnRotation` are now `defaultJayzeePoint` and `defaultJayzeeRotation`. The engine calls the hook by its old name.
- The text is corrupted in 7 places, where `spawned` became `jayzeeed`: `AGENTS.md`, `scripts/lib/docs-engine-a.js`, `scripts/lib/docs-shapes.js` (3), `scripts/lib/docs-skills.js` and `scripts/lib/docs-workshop-b.js`.
- `spawn6/cut-axis.yaml` and `spawn6/flat-anchor.yaml` now name `jayzee6/` in their text, while the files on disk are still under `spawn6/`.
- `.spawn/engine.yaml` points the engine at `https://git.jayzee.co/engine/6.0.0.git`, not `git.spawn.co`. `.gitignore` now names `.jayzee/engine/`.

Owner decision needed: if the rename is not intended, the 26 files should be reverted. If it is intended, the `spawned` corruption and the hook name must be fixed first, and the file on disk must match the path in the text.

### Phase B witnesses

Recorded in the session report, not here, so that this record can be pushed with the extra commit once.

## game-16 rename fixed forward, not reverted (2026-11-16)

Starting state: game-16 at 3eb8aeb with 27 modified files, all from the `spawn` to `jayzee` and `Savi` to `Cleetus` rename. Extra at 8af1c01.

### Changes in game-16 (commit cea8593, local only, not pushed)

- Method: the 27 files were reset to 3eb8aeb. Then only the brand prose was renamed: `Spawn` to `Jayzee` where it names the platform, and `Savi` to `Cleetus` where it names the agent. Result: 14 files, 73 insertions and 73 deletions. The 13 other files had only identifier, path or endpoint changes, and those are now restored.
- Hook names restored: `onSpawn` in `scripts/hall-figure.js` (was `onJayzee`), and in `AGENTS.md` and the `scripts/lib/docs-*.js` hook examples.
- Identifiers restored: `defaultSpawnPoint` and `defaultSpawnRotation` in `places/hall/config.yaml` and `places/main/config.yaml` (were `defaultJayzeePoint` and `defaultJayzeeRotation`).
- Endpoints restored: `.spawn/engine.yaml` is `https://git.spawn.co/engine/6.0.0.git` again. Every `www.spawn.co` and `spawn.co/@...` URL is back. The `.gitignore` entry is `.spawn/engine/` again.
- Paths and formats restored: the `spawn6/` directory name in the text (was `jayzee6/`), the scene header `# spawn-scene v2 yaml`, the skill id `spawn-engine` and `.spawn/engine/skills/` in `.spawn/skills.md`.
- Environment variables and token paths restored: `SPAWN_TOKEN`, `SPAWN_TOKEN_FILE`, `SPAWN_WORLD_URL`, `~/.spawn/token`.
- Corrupted text repaired, 7 places where `spawned` had become `jayzeeed`: `AGENTS.md` (1), `scripts/lib/docs-engine-a.js` (1), `scripts/lib/docs-shapes.js` (3), `scripts/lib/docs-skills.js` (1), `scripts/lib/docs-workshop-b.js` (1).
- Kept as `Spawn`, not renamed: the real game titles `Spawn Hangout`, `Need for Spawn` and `Super Smash Spawn Brawl`; the user agent `SpawnProbe/<name>` in `AGENTS.md`; the CSS variables `--spawn-*`; all lowercase `spawn`.
- Kept as `Savi`, not renamed: `Savi-verbosity` and `Editor/Savi` in `scripts/lib/docs-shapes.js`, which name a setting and a UI surface.
- Still open: the 14 changed files contain prose comments (for example `scripts/ui.js` line 88, `ui/nametag.js` line 3 and the `scripts/lib/catalog.js` comments). CLAUDE.md says comments are swept when their file is next changed. This pass did not sweep them.

### Hold

- game-16 is not pushed. The endpoint in `.spawn/engine.yaml` is the real one, and pushes reach Spawn.
- Extra is not pushed in this pass.

### Phase B witnesses

Recorded in the session report, not here, so that this record can be pushed with the next extra push.

## game-16: cea8593 rebased onto origin/main 4d03198 (2026-11-16)

Starting state: game-16 main at cea8593, based on 3eb8aeb. origin/main at 4d03198, "refreshed the guide for outside agents", authored by Spawn.

### Changes in this pass

- The fix-forward commit is rebased onto 4d03198. The result is cad7f6e, local only, not pushed.
- Conflicts: only `AGENTS.md`. `.spawn/` had no conflict. The diff of 4d03198 against 3eb8aeb touches `AGENTS.md` only. Its commit message also names CLAUDE.md and `.spawn/`, but neither appears in that diff.
- `AGENTS.md` resolution: the text is taken from 4d03198 (the guide refresh). The brand rule is applied on top: `Spawn` becomes `Jayzee` where it names the platform, and `Savi` becomes `Cleetus` where it names the agent. Lowercase `spawn`, the `spawn.co` URLs, `spawn-world-shown`, `spawn-kernel-frame`, the `spawn preview` command and `SpawnProbe/` are kept.
- Witness for the resolution: reversing the brand rule on the rebased `AGENTS.md` gives 4d03198's `AGENTS.md` byte for byte. 10 lines differ from upstream, and all 10 are brand changes.
- The other 13 files of the commit applied without conflict. The commit now changes 14 files, 72 insertions and 72 deletions. The count was 73 before the rebase, because the upstream rewrite changed the `AGENTS.md` lines.
- Local state: game-16 is ahead of origin/main by 1 commit and behind by 0.

### Hold

- game-16 is not pushed. Its remote is git.spawn.co.

### Phase B witnesses

Recorded in the session report, not here, so that this record can be pushed later with the next extra push.

## Remaining extra work that does not reach Spawn, ranked (2026-11-16)

Checked before ranking:

- The tracked code in extra has no real comments. The only matches are the two shebang lines, and text inside markdown strings in `wiki-tools/gen-reference.mjs` and `wiki-tools/build.mjs`. Invariant 2 needs no sweep here.
- A fresh build of `wiki` into a scratch directory, outside the repo, matches the tracked `wiki-site` file for file. There are 0 differences across 151 files, and the link check reports 23738 internal links with 0 broken.

### Ranking

1. Ignore the nested `game-16/` repository in `.gitignore`, so `git status` in extra is clean. It is a separate repository with its own `.git`, and it is managed there. **Started in this pass.**
2. Compare the `docs/bevy-gaps/` documents with the current bevy tree. The bevy tree has five modified tracked files (AGENTS.md, src/features.rs, src/script/mod.rs, src/script/prelude.js, src/world.rs). This reads `/workspace/bevy` only. **Not started.**
3. Close the entries in the "Ranked remaining work" list above that are already done. Items 1 to 3 are done. Items 4 to 12 are held or need the owner. **Not started.**

Not ranked, because they are held or need an owner decision: the gh-pages publish, the history rewrite, all game-16 pushes, the games scope (148 pages), and the unverified `exec-readonly` POST in `scripts/check-extraction-drift.py`. The last one would need a live call to Spawn to verify.

### Changes in this pass

- `.gitignore`: adds the line `game-16/`.
- `docs/PENDING_VALIDATION.md`: this section.

### Phase B witnesses

Recorded in the session report, not here, so that this record can be pushed once with the commit.

## Ranked-work list: status after the 2026-11-16 pass

Each item of the "Ranked remaining work for the extra wiki" list (2026-11-12, from c6b058b) is closed here, with its evidence, or marked as held for the owner.

| Item | Status | Evidence |
|---|---|---|
| 1. wiki-site/index.html renders | Done | The 2026-11-12 render witness above. Re-checked 2026-11-16: a fresh build of `wiki` matches the tracked `wiki-site` with 0 differences across 151 files, and the link check reports 23738 internal links with 0 broken. |
| 2. Stale citation of `update-engine-pin.py` | Done | `wiki/jayzee/runs-findings.md` lines 45 and 108 carry the "absent from this workspace on 2026-11-12" annotation. |
| 3. This ranked list and its status | Done | This section. |
| 4. gh-pages publish | Done | Cleared by the owner in the 2026-11-12 Phase B run. Published as commit 8273f8b on gh-pages, on top of 5ba0be6. See "Games pages over HTTP, and the gh-pages publish" above. |
| 5. History rewrite and force push | Held for the owner | Not run. Commits that hold token values are listed under item 5 in the 2026-11-12 list. |
| 6. Six untracked top-level entries | Done | Decided on 2026-11-16. `.gitignore` now ignores `.playwriter/`, `.local/`, `site/`, `runs/` and `game-16/`. `scripts/` is tracked as 8af1c01. |
| 7. game-16 uncommitted changes | Held for the owner | The fix-forward is committed in game-16 as cad7f6e, rebased onto 4d03198. It is not pushed, because the remote is git.spawn.co. |
| 8. Savi and jayzee open items | Held for the owner | The sources are in /workspace/savi and /workspace/jayzee, which are outside this write scope. |
| 9. Game pages not opened | Partly done, rest held | 52 game pages were fetched over HTTP on 2026-11-12, with 52 status 200 and 0 errors. The rest of the games pages need an owner decision on scope. |
| 10. Play frame is a canvas | Closed | A platform limit. Nothing to do. |
| 11. Walk control's hall action | Held for the owner | Not clicked, by owner policy. |
| 12. 38 state-changing controls | Held for the owner | Not clicked, by owner policy. |

Items 5, 7, 8, 11 and 12 stay held for the owner. Item 9 has a scope decision open.

## Bevy-gaps docs checked against the bevy tree (2026-11-16)

Read-only check of the three documents in `docs/bevy-gaps/` against `/workspace/bevy` (the working tree, which has uncommitted changes). Each cited line number and symbol was compared with the source. Only claims the source contradicts were changed.

### Changes in `docs/bevy-gaps/checker-cli-and-corpus.md` (3 lines)

- Section 2: `world::run` now says it calls `prepare`, which loads the tree with `WorldTree::load`. Evidence: `src/world.rs` lines 60 and 70 to 71.
- Section 2 table: the `world-camera` row now comes before the `world` row. Evidence: `src/world.rs` prints `world-camera` at line 852.
- Corpus section: the docs path is `scripts/lib/docs-*.js`, not `scripts/docs-*.js`. Evidence: `game-16/scripts/lib/docs-api.js` exists.
- Not changed: the corpus snapshot paragraph (head `3eb8aeb`, modified working tree). It describes game-16, not the bevy tree, and the owner asked for bevy-only reads. Its head is now `cad7f6e`, and that is recorded here, not in the doc.

### Changes in `docs/bevy-gaps/ctx-and-terrain.md` (29 line-number fixes, 4 content fixes)

Line-number fixes, each checked against the source line:

- `prelude.js`: spawnPlayer 1330 to 1336; setInput 1331 to 1337; setAnim 1332 to 1338; ensureScatter and getPixelProvenance are now 1339 and 1340; `__make_ctx` 1224 to 1222; the `getTerrainHeight` shim is 1332; the anim proxy is 218; the `__make_ctx` helper is 1223 and 1209.
- `mod.rs`: spawnPlayer dispatch 1462 to 1466; `spawn_player` 2364 to 2368; `set_input` 1990 to 1994; `set_anim` 1644 to 1648; `setAnim` dispatch 1383 to 1387; `setInput` dispatch 1453 to 1457; classification lines 2394 to 2395 to 2398 to 2399; `readField` dispatch 1424 to 1428; `terrainHeight` dispatch 1425 to 1429; `native_feature_probe` 1502 to 1506; `anim_json` 1634 to 1638; `read_field` 2007 to 2011; `featureProbe` dispatch 1463 to 1467.
- `globe.rs` line 478 (was 468). `runtime.rs` `FieldGrid::height` at lines 133 to 150 (was a claim with no line).

Content fixes:

- `input_map` is described from source: an array keeps each string item as `true`, an object is copied, anything else gives an empty map (`mod.rs` 3981 to 3991). The open point about malformed input is removed.
- `FieldGrid::height` is described from source: bilinear interpolation with clamped coordinates, and 0 when the grid is smaller than 2 by 2 or its heights are short (`runtime.rs` 133 to 150). The open point is removed.
- The `ensureScatter` and `getPixelProvenance` fallbacks are written as the shim writes them: `getPixelProvenance` falls back to `{ x: x ?? 0, y: y ?? 0, source: 'local-shim' }` (`prelude.js` 1340).
- The line about the `input_map` and height open points is removed, since both are now described.

### Changes in `docs/bevy-gaps/host-bridge-and-report.md` (10 lines)

- `__make` is at `prelude.js` line 129, not 131. `__make_ctx` is at line 1222, not 1224.
- `host_op` is at `mod.rs` line 1355, not about 1353. `host_provenance` is at line 2396, not 2392.
- `world.rs` runs `ticks` world steps, not one. The record lines are at `world.rs` 891 to 918, not 886 to 910. Evidence: the loop at lines 62 to 63 and the `report` call at line 65.
- `api_report` is at `mod.rs` 2408 (was 2404). `game16_api_paths` is at 2515 (was 2500). `game16_report` is at 2558 (was 2543). `game16_dynamic_paths` is at 2593 (was 2578).
- The `ctxKeys` description now says the keys are read after `const ctx = {` in `__make_ctx`, up to the first `  };` line, not between `function __make_ctx` and `const ctx = {`.
- The checker failure list now includes a non-empty `missingUsage`. Evidence: `scripts/check-game16-api.cjs` line 57.

### Left as written, not confirmed from source

- Whether any code calls `globalThis.__host` directly, which would skip the `apiCall` count in host-bridge section 3. The doc already says this is unchecked.
- The `world` record list in host-bridge section 4 does not name `world-colliders` or `globe-report`. This is an omission, not a contradiction.
- Whether `ctx.anim` was meant as an alias. `prelude.js` line 218 defines `ctx.self.anim` only.
- The checker doc's Markdown stubs in `.local/docs` are described as empty, but the directory has non-empty files. This is about the extra repo, not the bevy tree, and is recorded here rather than changed.
- Whether `spawn6/` and `.spawn/` are read by bevy, which was not traced.
- The 'black colour sky' wording. The config value is `oklch(0.16 0.01 260)`, which is very dark but not black.

### Phase B witnesses

Recorded in the session report, not here, so that this record can be pushed once with the commit.

## Signal local-run guide (2026-11-16)

### Change

- New file `docs/signal-local-run.md`. It is based on `world/signal-stage/docs/LOCAL-RUN.md`, read in place without changes. It covers the snapshot at `SNAPSHOT_ROOT`, starting the server on port 4173, the playwriter run, the residual `ERR_ABORTED` requests, and what must never reach Spawn.

### Where the request and the evidence differ

- `PLAYWRITER_WEBGPU=1` has no verified effect. It appears in one recorded run command. Neither the installed playwriter package nor the `pw` directory reads it. The guide says so and does not rely on it. The game-16 guide's software-WebGPU Chromium flags are given instead, with the note that playwriter's handling of them was not verified.
- The snapshot is not at the default path in this workspace. A server already answers on port 4173, with 4284 mappings, but its snapshot path was not found within the search. The guide says the path must be set explicitly.
- The world is not 100% local. The 3D view needs WebGL or WebGPU, and the realtime WebSocket fails. The guide says this.

### Held

- Signal-stage is a git repository. Its origin is `https://git.spawn.co/@lanmower/signal-stage.git`. Nothing was pushed to it, and it stays held until the owner says so.
- game-16 stays held (`cad7f6e`).

### Phase B witnesses

Recorded in the session report, not here, so that this record can be pushed once with the commit.

## Row-level record of the bevy-gaps corrections (2026-11-16, commit bc6c927)

Each change to the three bevy-gaps documents, in the order git shows it. The form is [-old-]{+new+}, with a little context on each side. The source for each change is named in the entries above, under the same date.

Phase B checks for these rows: each corrected line number was re-read against its source symbol after the edit (witness in the session report), and the game-16 snapshot paragraph was reverted to its original text.

    `, and large documentation-data modules [-(`docs-*.js`).-]{+(`lib/docs-*.js`).+} It also has `architectur
    les below follows `script/mod.rs` lines [-2394-]{+2398+} to [-2395,-]{+2399,+} wh
    | JS shim | `script/prelude.js` line [-1330:-]{+1336:+} `spawnPlayer: (options)
     ctx object built by `__make_ctx` (line [-1224).-]{+1222).+} |
    er`, dispatched at `script/mod.rs` line [-1462.-]{+1466.+} |
    n spawn_player` in `script/mod.rs` line [-2364.-]{+2368.+} It calls `world::spawn_i
    b as "Bevy ECS world query/state" (line [-2394).-]{+2398).+} |
    | JS shim | `script/prelude.js` line [-1331:-]{+1337:+} `setInput: (options) =>
    ut`, dispatched at `script/mod.rs` line [-1453.-]{+1457.+} |
     `fn set_input` in `script/mod.rs` line [-1990.-]{+1994.+} The `InputState` struct
    b as "Bevy ECS world query/state" (line [-2394).-]{+2398).+} |
     source does not show what-]`input_map` [-does with malformed entries. The reading above is from-]{+(`script/mod.rs` line 3981) keeps only+} the [-code path only.-]{
    | JS shim | `script/prelude.js` line [-1332:-]{+1338:+} `setAnim: (channel, valu
    im`, dispatched at `script/mod.rs` line [-1383.-]{+1387.+} It reads `id`, `channel`
    | `fn set_anim` in `script/mod.rs` line [-1644.-]{+1648.+} It works on the `AnimSta
    y is handled | `script/prelude.js` line [-220-]{+218+} (`if (key === 'anim') re
    | Read path | `script/mod.rs` line [-251-]{+255+} handles the `anim:` pref
    e channel map through `anim_json` (line [-1634).-]{+1638).+} A named key returns that
    | Write path | `script/mod.rs` line [-921,-]{+925,+} the `"anim"` branch of t
    `__make('obj:' + selfId)` (prelude line [-1225).-]{+1223).+} The source does not defi
    | JS shim | `script/prelude.js` line [-1326:-]{+1332:+} `getTerrainHeight: (x, z
    t`, dispatched at `script/mod.rs` lines [-1425-]{+1429+} to [-1435.-]{+1437.+} |
    t as "Bevy ECS world query/state" (line [-2394).-]{+2398).+} |
     The globe version in `prelude.js` line [-1211-]{+1209+} maps to `globeElevation`
    , and `globe.rs` line [-468-]{+478+} handles the `"elevation"
    ld`, dispatched at `script/mod.rs` line [-1424.-]{+1428.+} |
    `fn read_field` in `script/mod.rs` line [-2007.-]{+2011.+} It looks up `TerrainData
    dy here, so the interpolation rule-] is [-not documented on this page.-]{+`FieldGrid::height` in `runtime.rs` line 133. It interpolates bilinearly between the four surrounding grid heights, clamps x and z to the grid, and returns 0 when the grid has fewer than two columns or rows, or fewer heights than cols times rows.+}
    be`, dispatched at `script/mod.rs` line [-1463.-]{+1467.+} |
    _feature_probe` in `script/mod.rs` line [-1502,-]{+1506,+} which calls `FeatureStat
    ifies it as "native FeatureState" (line [-2395).-]{+2399).+} |
    | ctx.ensureScatter(options) | Line [-1333:-]{+1339:+} sends `featureProbe` wit
    | ctx.getPixelProvenance(x, y) | Line [-1334:-]{+1340:+} sends `featureProbe` wit
    enance'`, `x` and `y`. Falls back to `{ [-x, y,-]{+x: x ?? 0, y: y ?? 0,+} source: 'local-shim' }`.
    /bevy/src/script/prelude.js around line [-131.-]{+129.+} It is a path-keyed facto
    amples in the code are `cameraJson` for [-`ctx.camera`-]{+`world.camera`+} reads of `forward`, `fov
    _ctx(selfId, placeName)` at around line [-1224-]{+1222+} builds the per-object `c
    ace/bevy/src/script/mod.rs, around line [-1353).-]{+1355).+} When `op == "apiCall"`,
    ace/bevy/src/script/mod.rs, around line [-2392)-]{+2396)+} maps an op name to one o
    rkspace/bevy/src/world.rs, around lines [-886-]{+891+} to [-910)-]{+918)+} runs
     [-one-]{+`ticks`+} world [-step-]{+steps+} for a place and prints s
    ace/bevy/src/script/mod.rs, around line [-2543)-]{+2558)+} builds the record. It ca
    lls `api_report()` (around line [-2404)-]{+2408)+} and `game16_api_paths(ro
    ot)` (around line [-2500)-]{+2515)+} and combines them.
    d.rs. It reads the text of `prelude.js` [-between `function __make_ctx` and-]{+after+} `const ctx = [-{`,-]{+{`
    6_dynamic_paths()` (mod.rs, around line [-2578).-]{+2593).+} The dynamic list covers
    t !== 0`,[-or-] `scriptStats.errors !== [-0`.-]{+0`, or `missingUsage` is non-empty.+} It also builds its own `

### Phase B witnesses

Recorded in the session report, not here, so that this record can be pushed once with the commit.
## Open questions the tree settles, bevy-gaps (2026-11-16)

Top item of the ranked extra work, after the queue was emptied. Each open question that the tree can answer was answered by a read-only check, and the document now says what was found.

### Changes in `docs/bevy-gaps/checker-cli-and-corpus.md` (5 changes)

- Section 3, the stub claim: the matrix says the Markdown stubs are empty apart from `00-opening.md`. Checked: 71 Markdown files sit in `.local/docs`, the smallest 1526 bytes. The sentence now says the matrix is out of date on this point.
- Section 3 table, `spawn6/` and `.spawn/`: now says no file under `bevy/src` or `bevy/scripts` names either of them.
- Open question, missing binary: the failure path is no longer described as inferred. Run: exit 1, `ok` false, `exit: null` for both places.
- Open question, `places/main`: it holds one file, `config.yaml` (387 bytes).
- Open question, extra paths: `/workspace/extra/.local/docs` and `/workspace/extra/site/docs` both exist (71 Markdown files, and 75 entries). The matrix row names `01-jayzee-game-api.md`, which is not on disk: the file is `01-spawn-game-api.md`. The 67-row figure was not re-counted.

### Changes in `docs/bevy-gaps/host-bridge-and-report.md` (2 changes)

- Section 3: the claim that no op reaches `globalThis.__host` without the wrapper is now checked. The only `globalThis.__host` references in `/workspace/bevy/src` are the wrapper's two lines (`prelude.js` 17 and 18), and no game-16 script calls it.
- Section 4: the open point about direct calls is closed by the same check.

### Still open

- The `ctx.anim` alias intent, which is not in the source.
- The `world-colliders` and `globe-report` record kinds, which the host-bridge document does not list. This is an omission, not a contradiction.
- The `.local/docs` stub text in the matrix, which is about the matrix, not the bevy tree.

### Phase B witnesses

Recorded in the session report, not here, so that this record can be pushed once with the commit.
## Host-bridge record list completed (2026-11-16)

Ranked item 1 of the extra work after the queue was emptied. `docs/bevy-gaps/host-bridge-and-report.md` section 4.1 listed three of the record kinds that `world.rs` prints.

### Change in `docs/bevy-gaps/host-bridge-and-report.md` (1 line)

- Section 4.1: adds the other kinds that `world.rs` prints, in order. Before the list: `world-camera` (only when a row named `camera` exists), `world`, `world-bodies` and `world-colliders`. Between items 1 and 2 of the list: `globe-report`. Evidence: `src/world.rs` lines 852, 857, 877, 892, 911 and the three `println!` calls at 896, 915 and 918.

### Still open, next in the ranking

- The empty place argument for the `world` subcommand, which is a read-only run of the built binary.
- The signal snapshot path. It is blocked: the server that runs on port 4173 has its snapshot path in its environment, and the search for it timed out.

### Phase B witnesses

Recorded in the session report, not here, so that this record can be pushed once with the commit.
## Ranked list after the empty-place pass (2026-11-16)

Items 2 and 3 of the ranked extra work, as they now stand.

| # | Item | Status | Evidence |
|---|---|---|---|
| 2 | Empty place argument to the `world` subcommand | Done, local commit in bevy `0c8e5ec` (not pushed) | Before the change the binary exited 1 with `/workspace/extra/game-16: no place ` and no argument name. After the change, `bevy-jayzee world /workspace/extra/game-16 "" 5` exits 1 and prints `/workspace/extra/game-16: the place argument is empty; name a place or leave it out` on stderr, with no stdout. Named place `hall` still exits 0 with 8 records and a `game16-report`. Omitted place exits 0 with 7 records. |
| 3 | Signal snapshot root | Blocked for the owner | Read from `world/signal-stage/docs/LOCAL-RUN.md`, read-only. The doc names no real path. It gives the placeholder `SNAPSHOT_ROOT=/path/to/snapshot` and the default `.spawn/local/snapshot`, which is absent in the signal-stage tree. The doc needs the real path written into it. The process environment of the port 4173 server was not read. |

### Regression witness for item 2

`node /workspace/bevy/scripts/check-game16-api.cjs` with the rebuilt binary: `ok` true, `usageCount` 317, `missingUsageCount` 0, and for hall and main `exit` 0, `errors` 0, `scriptErrors` 0 and `missingApiCount` 0.

### Held and other open items

- game-16 stays held at `cad7f6e`, since its remote is git.spawn.co.
- The bevy repo has uncommitted changes from other work in `Cargo.toml`, `src/main.rs`, `src/viewer.rs`, `src/viewer_world.rs` and `web/status-main.json`. They were left unstaged. The bevy commit `0c8e5ec` includes only `src/world.rs`. It is not pushed, and no push to the bevy remote was requested.
- The rebuild waited about 18 minutes for a cargo build from another session that held the build directory lock. That build was not interrupted.
- The `ctx.anim` alias intent. The source cannot settle it, so it needs the owner.

### Phase B witnesses

Recorded in the session report, not here, so that this record can be pushed once with the commit.
## Empty-place change handed to bevy's queue (2026-11-16)

Supersedes the status of items 2 and 3 in the ranked list above. The earlier line that called item 2 done is withdrawn: the local commit it cited has been undone, and the change now waits in bevy's queue.

### Changes in this pass

- `docs/patches/bevy-empty-place.patch`: new file. It is the empty-place hunk of `prepare()` in `src/world.rs`, as a patch against bevy `2fa1c14`. It applies cleanly: checked with a temporary index, so bevy's working tree was not touched.
- bevy `0c8e5ec` was undone locally. Its HEAD was reset to `2fa1c14` (mixed reset, no working-tree change), and `src/world.rs` was restored to `2fa1c14`. The commit is no longer on bevy's branch. Its patch is the file above.
- bevy's other uncommitted changes were not touched. Their diff hash before and after the handover is `10be9259c50451ca4ccfc6321d690787d3d7f7347db5af927dc362edbff5a76e`, for `Cargo.toml`, `src/main.rs` and `src/viewer.rs`. `src/viewer_world.rs` is still untracked.
- The bevy build directory was not used after the handover.

### Item 2: open until bevy applies the patch

- Before the change, recorded in this session: `bevy-jayzee world /workspace/extra/game-16 "" 5` exited 1 and wrote `/workspace/extra/game-16: no place ` to stderr. The message does not name the argument.
- The expected witness after bevy applies the patch: the same command exits 1 with `/workspace/extra/game-16: the place argument is empty; name a place or leave it out`. It has not been run, because the binary has to be rebuilt, and that build waits on bevy's queue.
- The regression witness recorded earlier in this session, `ok` true with 317 usage tokens and 0 missing APIs on hall and main, was run on a binary built from the change before the handover. That binary is superseded, and the regression has to be run again after bevy rebuilds.

### Item 3: open until signal records the snapshot path

- signal holds the real snapshot root, and the owner has asked signal to record it in its docs.
- Landed in signal's local repo as commit `7a18a88` ("Give the real snapshot path in the local run doc"). Its `docs/LOCAL-RUN.md` names `SNAPSHOT_ROOT=/workspace/signal` and says the snapshot is that directory. Witnesses: that directory holds `assets/` (14 entries), `raw/` (6) and `state/` (13); HEAD of signal-stage has the real root (1 hit) and the placeholder `/path/to/snapshot` (0 hits).
- Still open: signal's origin is held, so the commit is not on the remote this record is pushed to. Item 3 closes when the owner pushes signal-stage.
- The process environment of the port 4173 server was not read.

### Phase B witnesses

Recorded in the session report, not here, so that this record can be pushed once with the commit.

## Ranked remaining extra work, excluding game-16 (2026-11-16)

Checked before ranking: the reachable queue in the extra repo is empty after this pass. Every item left needs the owner, or a push or build in another repo.

### Ranking

| # | Item | Status | Who unblocks it | Evidence |
|---|---|---|---|---|
| 1 | Signal guide names the snapshot root | Done in this pass (top reachable) | none | `docs/signal-local-run.md` section 1 and the server command now name `/workspace/signal`. Witnesses are in the Phase B record below. |
| 2 | Signal-stage commit `7a18a88` (real snapshot path in `docs/LOCAL-RUN.md`) reaches its origin | Open | owner: signal-stage origin is `git.spawn.co`, and a push lands in the room | Local commit exists (see item 1 evidence). Not pushed. |
| 3 | Bevy empty-place change lands in bevy | Open | bevy's queue: apply `docs/patches/bevy-empty-place.patch` (2fa1c14 base), rebuild, then witness that `bevy-jayzee world <game> "" 5` exits 1 with `the place argument is empty` | Patch applies to `2fa1c14` (checked in the previous pass). Not built here, because bevy's cargo build holds the target directory. |
| 4 | `ctx.anim` alias intent | Open | owner: the source defines no plain `ctx.anim` (zero matches in bevy `src`), and whether an alias was meant is not in the tree | `docs/bevy-gaps/ctx-and-terrain.md` section `ctx.anim` and open points. |
| 5 | Unverified `exec-readonly` POST in `scripts/check-extraction-drift.py` | Open, held | owner: checking it means an authenticated POST to the upstream server, which needs a token and an approved target. `AGENTS.md` records it as unverified. | `AGENTS.md`, section on the drift script. |
| 6 | Games scope (148 pages; 52 fetched on 2026-11-12) | Open, held | owner: scope decision | Ranked-work status table, item 9. |
| 7 | History rewrite to remove token values from older commits | Held | owner: force push | Ranked-work status table, item 5. |
| 8 | Savi and Jayzee open items | Held | owner: the sources are in `/workspace/savi` and `/workspace/jayzee`, outside this write scope | Ranked-work status table, item 8. |
| 9 | Walk control hall action; 38 state-changing controls | Held | owner policy: not clicked | Ranked-work status table, items 11 and 12. |
| 10 | FEATURE_MATRIX 67-row figure | Closed: verified, no doc change | none | Counted in `/workspace/bevy/FEATURE_MATRIX.md`: 68 body rows; 60 `Implemented and verified`, 7 `Local subset implemented`, and 1 `Excluded: online infrastructure`. 60 + 7 = 67 in-scope rows, which matches `docs/bevy-gaps/checker-cli-and-corpus.md` section 3. |
| 11 | game-16 items | Excluded by request | owner | Not ranked here. game-16 stays held. |
| 12 | Host-bridge record list (world-colliders, globe-report) | Done | none | Commit `1ffa733`. |

### Changes in this pass

- `docs/signal-local-run.md`: section 1 status, the server command in section 2 (now with `SNAPSHOT_ROOT=/workspace/signal`, run from `world/signal-stage`), and one line in section 6. The placeholder `/path/to/snapshot` is gone.
- `docs/signal-local-run.md`, second commit: the health reading. A later check returned `{"ok":true,"mappings":4322,"misses":0}`, where the first check returned `{"ok":true,"mappings":4284,"misses":33}`. Section 2 and section 6 now date both readings. The counts changed while the server kept running, so the server may be serving a different capture. The cause was not checked, and it is open.
- `docs/PENDING_VALIDATION.md`: this section.

### Phase B witnesses

Recorded in the session report, not here, so that this record can be pushed once with the commit.

## Bevy gaps against the extra documentation (2026-11-22)

### Changes

- `docs/bevy-gaps/missing.tsv`: new. 269 rows (194 missing, 75 partial), one per documented feature that bevy at `d4c407c` lacks or has in part. 169 rows carry a `docs/parity-matrix.tsv` row id, and each matrix id is owned by one row.
- `docs/bevy-gaps/README.md`: new. Index of the three earlier notes and the TSV, counts per area, 144 documented features checked as implemented, the areas that unblock the most rows, why game-16 is not a source of rows, and the unchecked items.

### Witness

- `node /workspace/tmp/extra/witness.cjs` checks every row: 9 columns, unique id, status `missing` or `partial`, size S, M or L, evidence names a bevy path or says `absent: searched`, every `documented_in` reference resolves to an existing wiki line, every matrix id exists in bevy's `parity-matrix.tsv` and is used once, and every README link resolves.
- Spot checks in bevy: `onSpawn` has 0 matches in `src`; `src/script/mod.rs:2800` calls `onJayzee`; `src/camera_rig.rs:121` returns `custom-not-ported` while matrix row 88 says present; `src/world.rs:72` holds the empty-place message.

### Red check

- The witness failed on the first build with `matrix twice 514`, `516` and `517`: gap-069 and gap-191 both held them. gap-069 now keeps 531 only, and the witness passes.

## Re-check of missing.tsv against bevy 270be5a (2026-11-23)

### Changes

- `docs/bevy-gaps/missing-recheck-2026-11-23.tsv`: new, next to the unchanged `missing.tsv`. All 269 rows with five added columns: `recheck_2026_11_23`, `recheck_basis`, `recheck_evidence`, `still_missing_after_recheck`, `evidence_wrong_at_d4c407c`.
- `docs/bevy-gaps/README.md`: a section on this re-check.

### Result

- Bevy's "stage 4" is planet parity stage 4 (frame-time budgets): 16 commits, 17 source files, no netcode files, no change to `docs/parity-matrix.tsv`. It is not stage 4 of `specs/bevy-extra-gaps.md` (netcode). It closed no row of `missing.tsv`.
- 24 rows were re-checked by reading the code at `origin/main`: 2 closed, 12 partly closed, 10 still open. 245 rows were not re-checked, because no cited file or searched term changed.
- 17 of the 24 had evidence that was already wrong when `missing.tsv` was written at `d4c407c`. Their evidence repeated bevy matrix cause text about `src/vegetation.rs` and `sync_chunks`, removed on 2026-11-21 (77164f7). Both closed rows (gap-130 grass, gap-238 PlanetFrame) were implemented before the list was written.
- Cause: the cleetus and misc slices of the original build used the matrix cause text without re-reading bevy `src` for those rows.

### Witness

- `git diff --name-only d4c407c origin/main` lists 29 files; `src` has 17 and none is under `src/netcode`, `src/server.rs` or `src/client.rs`.
- A scan of every row's cited paths and symbols against `origin/main` found 13 rows naming a file or symbol that no longer exists; all 13 are in the 24 re-checked.
- Per-row evidence is in the new TSV, cited as path:line at `origin/main`.

## All 269 rows re-read against bevy 270be5a (2026-11-23)

### Changes

- `docs/bevy-gaps/missing-recheck-2026-11-23.tsv`: rewritten. 269 rows, 16 columns: the 9 original, then `recheck_2026_11_23`, `file_line`, `basis`, `still_missing`, `evidence_wrong_2026_11_22`, `new_gap` and `compiled_into_binary`.
- `docs/bevy-gaps/README.md`: the re-check section now has the counts, the test-only finding, corrected counts per stage, the prerequisite ranking and a proposed stage order.

### Result

- 2 closed, 16 test-only port, 55 partly closed, 196 still open. 46 rows had wrong evidence on 2026-11-22 (17 first pass, 29 second). 21 rows carry a new sub-gap.
- Method: ten read-only sub-agents, 20 to 25 rows each, each reading the wiki lines of every row and the bevy code at `origin/main`, not the matrix text.
- Finding: 42 modules in `src/main.rs` are `#[cfg(test)] mod`. Rows implemented only there are `test-only port`. 10 of the 144 implemented features in the README cite only such modules.

### Witness

- `awk -F'\t' '{print NF}'` on the TSV prints 16 for all 270 lines. Every id of `missing.tsv` appears once.
- `git show origin/main:src/main.rs` shows the 42 `#[cfg(test)]` module lines; `character`, `camera_rig`, `hitscan`, `flight_model` and `fire_terrain` are among them.

### Limits

- Checks name presence and a read of the code, not behaviour against the hosted engine; none of the code was run.
- A few `documented_in` lines point at neighbouring text in the long cleetus pages; the sub-agents located the feature by searching the file, and noted it in `basis`.
- The ranking by `depends_on` uses free-text prerequisites; 74 rows record none.

## Stage 0 wiring work list (2026-11-23)

### Changes

- `docs/bevy-gaps/stage0-wiring.tsv`: new. 13 module rows (the 16 test-only rows resolve to 13 modules), 13 columns: wave, module, gap_rows, the `#[cfg(test)]` line and text in `src/main.rs`, the mod line, what it is, wiring needed, un-gate chain, conflicts, dead-code risk, size and the reason for it.
- `docs/bevy-gaps/README.md`: a Stage 0 section, and the step 0 line of the proposed order corrected from about 16 points to about 53.

### Witness

- Every `#[cfg(test)]` line was checked against `git show origin/main:src/main.rs`: the line before each `mod` declaration is the attribute. All 16 gap ids appear in the `gap_rows` column. Every row has 13 columns and a size of S, M or L.
- Method: three read-only sub-agents (the memory cap), four to five modules each, reading each file and its tests at `origin/main` `270be5a`.

### Limits

- Nothing was built or run, so the claims about what un-gating breaks come from reading the code. The statement that each inner `mod tests` lacks `#[cfg(test)]` was read in every file; the build failure it implies was not reproduced.
- The earlier estimate of 16 points for stage 0 was wrong; the corrected figure is 53.

## Re-check against bevy c394fb9 (2026-11-23)

### Changes

- `docs/bevy-gaps/recheck-c394fb9.tsv`: new. The 16 rows that cite a file changed in d4c407c..c394fb9. None changed status.
- `docs/bevy-gaps/missing-recheck-2026-11-23.tsv`: citations corrected for gap-148, gap-195, gap-204 and gap-240, where the cited lines moved. Statuses unchanged.
- `docs/bevy-gaps/README.md`: a section on this re-check.

### Witness

- Changed files: `git diff --name-only 270be5a origin/main` lists 16 files; the code ones are `src/main.rs`, `src/planet_poses.rs`, `src/bench_host.rs`, `src/bench_planet.rs` and `src/planet_lod/stream.rs`.
- The script surface has no `whenSettled`, `captureFrame`, teleport op or room-health symbol (`git grep` over `src/script`, `src/spec.rs`, `src/runtime.rs`, `src/viewer*.rs`: 0 hits).
- Corrected lines checked at `origin/main`: `bench_planet.rs:245` is `fn settled`; `planet_poses.rs:7` is `TELEPORT_CLEARANCE_M`; `planet_lod/origin.rs:7` is `FloatingOrigin` and :23 `rebase`.

### Limits

- The 16 rows were judged on the code at c394fb9; the other 253 rows cite no changed file and were not re-read.

## Items 5 and 6 of the ranked list: citations and source-answerable questions (2026-11-24)

### Changes

- `docs/bevy-gaps/missing-recheck-2026-11-23.tsv`: 18 documented_in cells corrected. Twelve featureset-part-7 review bullets now cite the module's own inventory line (gap-117, 120, 121, 123, 125, 126, 128, 129, 133, 134, 135, 136); gap-010, gap-045, gap-066, gap-124 and gap-245 cite the line that describes the feature; gap-118 gains the ctx.groundY line. Rows whose cited line already describes the feature were kept (the GLB rows, the object and scatter fields, the stream headings).
- `docs/bevy-gaps/README.md`: new section "Answered from bevy source (2026-11-24)" with 11 answers, and the remaining unchecked list.

### Witness

- Every documented_in ref in the TSV resolves to an existing wiki or docs line (the three `docs/bevy-gaps/` refs exist); 269 rows, 16 columns.
- Builtin namespaces: 23 `__builtins.<name> =` assignments at origin/main, counted by `git show origin/main:src/script/prelude.js | grep -o`.
- Absences from `git grep` at origin/main: `admits`, `visitorsCarry`, `__postfx` outside the prelude, weather or cloud in `src/planet_sky`, the player folder file names.

### Limits

- Source answers are presence checks by grep plus the lines read. The builtin bodies, the state and parenting examples and the migrateWorldAnchors question were not run or compared in full.
- The documented_in fixes change which line a row cites, not its status.

## Row check 2026-11-24 corrections applied (2026-11-25)

### Changes

- `docs/bevy-gaps/missing-recheck-2026-11-23.tsv`, rows gap-025, gap-148, gap-163 and gap-240, column `file_line`: the citations that bevy's 2026-11-24 row check named as moved. gap-025: `src/globe.rs:478` to `:449` and `src/offscreen.rs:93` to `:100`. gap-148: `src/bench_planet.rs:245` to `src/planet_scene.rs:23` and `:27`. gap-163: `src/planet_veg/trees_render/assets.rs:91-92` added, the `decode_rgba` read through `planet_assets::read`. gap-240: `src/planet_lod/stream.rs:256-262` to `:273`.
- One correction differs from bevy's note. Bevy wrote `stream.rs:276`, which is true at `8359f30`. On `origin/main` (`03e48e2`) the registration is at `:273`, after three later commits. The record uses the line on the tree the witness reads.

### Witness

- Each corrected citation contains its named symbol at `origin/main`: `globe.rs:449` Projection::Perspective, `offscreen.rs:100` Projection::Perspective, `planet_scene.rs:23` fn settled, `:27` fn unsettled, `stream.rs:273` rebase_system, `trees_render/assets.rs:91` fn decode_rgba, `:92` planet_assets::read, `:107` for file in files. All 8 pass.
- The TSV still has 269 rows of 16 columns, and its ids are the ids of `missing.tsv` in order.

### Red check

- The old citations fail the same check: `globe.rs:478`, `offscreen.rs:93`, `bench_planet.rs:245` and `stream.rs:256` no longer contain their symbols at `origin/main`. Each reports no. Red check passed.

### Limits

- These corrections change citations only. No status changed, and bevy has not yet re-read these rows against a new tree.

## Stage-0 design-check corrections, README wording, and two README questions (2026-11-25)

### Changes

- `docs/bevy-gaps/stage0-wiring.tsv`, three cells: T38 (frame_globe_camera at `src/globe.rs:440`, not 469, which is add_census_systems), T46 (vec3 at `src/main.rs:123`, not 118, which is planet_sky) and T50 (height::anchor at `src/height/mod.rs:4`, not 8, which is planet). Source: the stage-0 design check in the spec.
- `docs/bevy-gaps/README.md`: "declares 42 modules" becomes "gates 42 modules" (D1 in the design check): 42 is the gated count.
- `docs/bevy-gaps/README.md`: a section "Answered from bevy source (2026-11-25)" answers the relative path resolution question and the migrateWorldAnchors question, and the unchecked list is trimmed to match.

### Witness

- {"citesPass":13,"citesTotal":13,"failed":[],"tsvRows":13,"tsvCellsOk":true,"staleStage0Citations":[],"declaresLeft":0,"gatesPresent":1}.
- Each named symbol is on its corrected line at `origin/main` (`03e48e2`). The 10 answer citations in the new section pass the same check.

### Red check

- The old citations fail the same check: `globe.rs:469`, `main.rs:118`, `height/mod.rs:8`, and the answer citation `mod.rs:3227` checked against `fn file_path`. Each reports "does not contain". Red check passed.

### Limits

- The path answers rest on the lines read. The `..` observation at `mod.rs:3227` was not run against a real escaping script.

## Scripted-primitive path traversal: witness and patch for bevy (2026-11-25)

### Changes

- docs/patches/bevy-path-guard.patch: new. Two hunks against bevy origin/main (03e48e2). src/script/mod.rs:3227 reads the scripted primitive path through Host::file_path, the function the script file API already uses. The loader at :3852 normalises the import name the way file_path does, refuses a leading ".." or an absolute result, and then joins the root. Valid in-root paths read the same file as before.
- docs/patches/bevy-path-guard-witness.cjs: new, plain script. It builds a fixture world with one in-root file and one outside file, and reads each path the way the Rust code joins it.

### What the witness shows

- Before the fix: a scripted primitive with script "../outside.js" reads the outside file (before.scriptTraversal true). An import named by an absolute path reads it too (before.loaderAbsolute true).
- A relative "../" import from scripts/a.js is clamped by the resolver normalize and does not escape (before.loaderResolvedRelative false). The escape is at the two raw reads, not at the resolver.
- After the fix none of the three escapes. The valid paths scripts/a.js and ./scripts/a.js read the same file before and after.
- Source check: the patched text comes from a temporary index with the patch applied to origin/main. Line 3227 reads file_path(script)? and line 3856 reads root.join(clean). The unpatched lines at 3227 and 3852 are checked first.
- Result: redBeforeFix true, greenAfterFix true, exit 0.

### Not done here

- Bevy code is not edited, and bevy has not built the binary. The witness models the Rust path joins and the guard; it is not a run of the binary. Bevy applies the patch and runs its own build witness before the fix counts as done.
- file_path itself never refuses a ".." path. normalize("", "../x") returns "x", so it clamps the path into the root. The fix depends on that clamp.

### Red check

- The unpatched lines fail the guarded-source check (sourceRed true, and the fixture reads escape). The witness exits 1 if either the before or the after side is wrong.

## Citation drift after bevy 03e48e2 (2026-11-25)

- Scope: bevy changed 67 files between c394fb9 and 03e48e2. 28 cited files changed; 28 cited lines were checked (four rows already corrected against 03e48e2 are excluded).
- Result: 13 cites moved because the cited text moved to a new line, with the same text on both commits; each row gains the new line. 8 cites are unchanged. No cited line changed content, so no row needed reading and no status changed.
- Changed rows: gap-009, 012, 097, 125, 129, 130, 165, 170, 172, 237, 242 and 251 (two cites). Statuses unchanged.
- Witness: docs/bevy-gaps/recheck3-move-witness.cjs. It compares each moved cite pair in the committed table with the cited text at c394fb9 and at 03e48e2, and exits 1 on any mismatch.
- Limit: an exact text match shows the cited line is the same code, not that the row status still holds. A status depends on code outside the cited line, which this check does not read.

## Verdicts for the 12 rows whose cited code moved, and the gap-207 and gap-215 citations (2026-11-25)

### Changes

- docs/bevy-gaps/verdicts-2026-11-25.tsv: new. One row per judged row: status before and after, the file and line read at origin/main, the verdict basis, the citation problem and the action. Twelve rows judged; 0 statuses changed.
- Citations corrected in missing-recheck-2026-11-23.tsv (file_line column): gap-009 (test constant src/glb.rs:561 to src/viewer_world.rs:313-316), gap-012 (rock seed src/planet_veg/rock.rs:46 to the vegetation cull src/planet_veg/gpu/cull.rs:113), gap-125 (test assertion tree.rs:475, inside cfg(test) mod tests at tree.rs:337, to src/planet_veg/context.rs:95-98), gap-130 (test-gated wrapper grass.rs:231 to production grass.rs:235), gap-242 (a bark option, not a terrain option, replaced by an absence grep), gap-251 (census and test constants replaced by an absence grep).
- gap-215 (ServerBoot): documented_in changed from featureset-part-6.md:24, which is a WorldLocator entry, to featureset-part-3.md:66, which documents boot(overrides) and installGracefulShutdown.
- gap-207 (RoomOrchestrator): stated as undocumented. The grep over wiki/ for RoomOrchestrator returns 7 lines; featureset-part-3.md:166 says cleetus names RoomOrchestrator only in surface lists. The row feature text (forks room workers, weighted placement, crash restart, elastic scale) has no wiki line.

### Witness

- docs/bevy-gaps/verdict-witness.cjs: exit 0. 11 judged file lines contain their tokens at origin/main; 0 statuses changed; every documented_in reference is a valid wiki or docs line or an UNDOCUMENTED statement; 269 rows of 16 columns; gap-215 line 66 contains boot(overrides) and installGracefulShutdown.
- docs/bevy-gaps/recheck3-move-witness.cjs: exit 0 after the eight referent rows were excluded from its moved-in-unchanged-file rule, because verdict-witness covers them.

### Red check

- The old citations are test or non-production code: src/glb.rs:561 is a test constant, src/planet_veg/rock.rs:46 is a rock seed, src/planet_veg/tree.rs:475 is inside cfg(test) mod tests (tree.rs:337), src/planet_veg/grass.rs:231 is cfg(test). The red check reports 4 of 4 as wrong or not production.

### Limits

- The verdicts judge the code the row cites and the code around it, not every line that could change a status. The gap-207 feature text has no wiki source, so the row may describe a gap the wiki never documents; the count is held for the owner.

## Item 4 closed: bevy path guard verified on origin/main (2026-11-25)

### Changes

- docs/patches/bevy-path-guard-verify.cjs: new plain-script witness. It checks that origin/main src/script/mod.rs is byte-identical to the patch docs/patches/bevy-path-guard.patch applied to the pre-patch base 03e48e2, checks the red side at 03e48e2 and the green side at origin/main, and reruns the traversal model.
- This ledger entry: item 4 of the ranked list (the scripted-primitive traversal guard) is closed. Bevy pushed the guard at b50dbb7 (Guard the scripted primitive and the module loader against paths outside the world root). Its checkout was not touched here.

### Witness

- origin/main is b50dbb7. origin/main src/script/mod.rs equals the patch applied to 03e48e2: byteIdenticalToPatch true.
- Red at the base 03e48e2: line 3227 reads root.join(script), line 3852 reads root.join(name). A script value of "../outside.js" and an absolute import each read the outside file (before.scriptTraversal true, before.loaderAbsolute true).
- Green at origin/main: line 3227 reads file_path(script)?, line 3856 reads root.join(clean). Neither escape reads the outside file (after both false). Valid in-root paths still read their file (validOk true).
- Exit 0.

### Note on the earlier witness

- docs/patches/bevy-path-guard-witness.cjs applies the patch to origin/main, so it now exits 1: the patch is already upstream. That exit is expected. bevy-path-guard-verify.cjs replaces it for the closed state.

### Red check

- The base 03e48e2 fails the green check (greenOrigin false on that side), and the old unguarded read escapes. Both were shown in the witness.

## Parity assignment for bevy (2026-11-25)

- docs/bevy-gaps/parity-assignment-2026-11-25.md: new ledger entry. Answer: none of the 717 open rows in bevy docs/REMAINING_PARITY.md can be closed with a plain witness. Assigned instead: matrix row 227 (CaveSDF cave volume meshing), which has an intact fixture and whose witness is a cargo test bevy runs in a window.
- docs/bevy-gaps/parity-assignment-witness.cjs: new plain check. It confirms the gap is still open (create_cave_volume and polygonize_cave_volume absent from src/cave_sdf.rs), that row 227 is still candidate-only, that the two cited lines hold, and that the fixture has 3 meshes with the expected fields.
- No file in bevy's checkout was changed.

### Witness

- docs/bevy-gaps/parity-assignment-witness.cjs exit 0 (see the Phase B record below).

## Row 227 closed; no plain-witnessable row assigned next (2026-11-25)

- docs/bevy-gaps/parity-assignment-2026-11-25.md: closure section added. Row 227 closed on origin/main at b204b0e, from commit 162145f, with the check output recorded.
- docs/bevy-gaps/parity-assignment-witness.cjs: rewritten. The old check looked for the spoint names and would miss bevy counterparts. The new check verifies the counterparts, the three tests, the triangle assertion line and the fixture's internal consistency. Exit 0.
- No next row is assigned: no row is witnessable to closure by a plain script.

## Bevy path-guard README wording applied (2026-11-25)

- Applied bevy's handover patch /workspace/tmp/bevy/next/handover/bevy-readme-path-guard.patch to docs/bevy-gaps/README.md. It corrects three stale statements: the scripted primitive read now goes through file_path (src/script/mod.rs:3227, as of b50dbb7); the loader refuses a leading .. or an absolute result before the root join (:3852, :3856); and the 'observation' bullet is marked resolved.
- The patch was read in full before applying. Its two test names exist at bevy origin/main (b204b0e): scripted_primitive_does_not_read_a_traversal_outside_the_root (src/script/mod.rs:4135) and loader_does_not_read_an_absolute_name_outside_the_root (:4144). b50dbb7 is an ancestor of origin. git apply --check passed on b1292b2.
- Witness: docs/bevy-gaps/readme-path-guard-witness.cjs exit 0, 13 checks: the new wording is present, the stale wording is absent, lines 3227 and 3856 match at bevy origin, and both test names are present.
- Bevy's checkout was not touched.

## Citation drift to bevy ad97f77 (2026-11-25)

- Scope: bevy origin/main moved from 03e48e2 to ad97f77 (11 commits, 148 changed files). 256 cites in the table; 55 are in files changed under src, scripts or docs.
- Result: 49 cited lines keep their text; 6 moved to a new line with the same text, each matched uniquely (gap-025, gap-165, gap-173, gap-210, gap-251, gap-255); 0 cited lines changed content. No row needed re-judging on its cited code.
- Not checked: a row whose cited lines are unchanged can still depend on changed code elsewhere in the same file. That dependence is not read here. Vendored files (vendor/) were outside the scope of the table and were not read.
- Witness: docs/bevy-gaps/drift-ad97f77-witness.cjs exit 0: 6 moved pairs, each with the same text at 03e48e2 and at origin/main; 269 rows of 16 columns.

## Symbol-level re-check of absence claims to ad97f77, and the ranked remaining work (2026-11-25)

### Changes

- docs/bevy-gaps/absence-claims-witness.cjs: new plain check. It takes every 'absent: searched' claim in the table (548 unique id and term pairs) and compares each term's count in non-test src at 03e48e2 and at origin/main (ad97f77). It fails on any unexplained growth and checks gap-248's terms directly.

### Result

- 548 absence claims: 1 term grew since 03e48e2, triangles for gap-248. The new match is the cave volume test assertion (src/cave_sdf.rs:462, row 227), not a viewer stats field. It is accepted, and gap-248 stays still open; gpuMs and drawCalls are still absent.
- Present-status claims: their cited lines were checked for text and move by the drift check at 2944d34, so their cited functions still exist at ad97f77.
- Status changes: 0.
- Scope limit: the check compares term counts, so it finds new code that names an absent term. It does not find a behaviour change in code that already existed.

### Ranked remaining work (2026-11-25)

1. Symbol-level re-check of absence claims to ad97f77: done (this entry). Witness: absence-claims-witness.cjs exit 0.
2. Row 227 outcome check: bevy has not updated its matrix row, which still reads candidate-only at ad97f77. Done when the row reads present and the three tests and the triangle assertion still exist. Witness: parity-assignment-witness.cjs, extended. Blocked on bevy's matrix update.
3. Empty-place witness on origin: bevy recorded it at 9ccfec3. Done when the message is in origin src/world.rs and the commit is an ancestor of origin. Witness: grep and merge-base. Ready; waits for bevy's REPORT on its current items.
4. gap-207 row count: held for the owner, with no change to the count.
5. Owner-held: the signal-stage push of 7a18a88 (the room); the game-16 push of cad7f6e (git.spawn.co); the history rewrite that removes token values (a force push); the exec-readonly POST check (needs a token and an approved target); the games scope (148 pages, 52 fetched); the ctx.anim alias intent; the walk-control hall action and the 38 controls; the skill bodies (404); and the 36 stage-6 services decisions.
6. Blocked on other peers: the Savi and Jayzee open items (OPEN-001 to OPEN-030); the builtin body comparison (the jayzee side is not in this workspace); the replication scope wording (the jayzee learnings are in neither repo).
7. Bevy windows: stage 0 wiring of the 16 test-only ports, and stages 1 to 6. These are bevy's implementation.

## Ranked list status (2026-11-25)

| # | Item | Status | Witness |
|---|---|---|---|
| 1 | Symbol-level re-check of absence claims | done, pushed 760dc27 | docs/bevy-gaps/absence-claims-witness.cjs exit 0 |
| 2 | Row 227 outcome check (matrix row reads present) | blocked on bevy: origin matrix row 227 reads candidate-only at origin/main | parity-assignment-witness.cjs, to be extended when bevy updates the row |
| 3 | Empty-place witness on origin | done | docs/bevy-gaps/empty-place-witness.cjs exit 0: guard at src/world.rs:72 on origin; red parent 800513a lacks the message; bevy's recorded run (/workspace/tmp/bevy/empty-place/result.out) shows exit 1, stdout 0 bytes, the exact stderr |
| 4 | gap-207 row count | held for the owner, no change to the count | none |
| 5 | Owner-held: signal push 7a18a88; game-16 push cad7f6e; history rewrite; exec-readonly POST check; games scope; ctx.anim alias; walk-control and 38 controls; skill bodies; 36 stage-6 decisions | held | none |
| 6 | Blocked on other peers: Savi and Jayzee open items; builtin body comparison; replication scope wording | blocked | none |
| 7 | Bevy windows: stage 0 wiring; stages 1 to 6 | bevy's implementation | none |

## Maximal in-place re-judge to ad97f77, ranked item 1 extension (2026-11-25)

- Scope: every hunk in every src or scripts file changed between 03e48e2 and ad97f77 (4 files, 6 hunks). For each hunk the enclosing function was found by brace-level scanning, and each row whose cited line falls inside that function was listed.
- Result: no row cites a changed function. The enclosing functions are polygonizer_matches_spoint_polygonize_cave_sdf (row 227's test), headless_app, module, load, a tsl test, and the new file src/pipeline_budget.rs (no enclosing function). None of them is cited by any row.
- Status changes: 0.
- Witness: docs/bevy-gaps/in-place-change-witness.cjs exit 0.

### Ranked list status (2026-11-25, after this item)

| # | Item | Status | Witness |
|---|---|---|---|
| 1 | Symbol-level re-check and its maximal in-place extension | done, pushed 760dc27 and this entry | absence-claims-witness.cjs; in-place-change-witness.cjs |
| 2 | Row 227 outcome check | blocked on bevy: origin matrix row 227 still reads candidate-only at ad97f77 | none yet |
| 3 | Empty-place witness on origin | done, pushed fa8701f | docs/bevy-gaps/empty-place-witness.cjs |
| 4 | gap-207 row count | held for the owner | none |
| 5 | Owner-held items | held | none |
| 6 | Blocked on other peers | blocked | none |
| 7 | Bevy windows | bevy's implementation | none |

## Ranked list status, re-checked at 980ed25 (2026-11-25)

| # | Item | Status | Witness or reason |
|---|---|---|---|
| 1 | Symbol-level and in-place re-check | done, 760dc27 and 980ed25 | absence-claims-witness.cjs; in-place-change-witness.cjs |
| 2 | Row 227 outcome check | blocked on bevy: origin matrix row 227 still reads candidate-only at ad97f77 | re-checked at 980ed25 |
| 3 | Empty-place witness on origin | done, fa8701f | empty-place-witness.cjs |
| 4 | gap-207 row count | held for the owner | no change to the count |
| 5 | Owner-held items | held | the owner decides each |
| 6 | Blocked on other peers | blocked | /workspace/jayzee and /workspace/savi are other peers' repositories and were not read |
| 7 | Bevy windows | bevy's implementation | none |
| 8 | Proposed, not started: one runner for every plain-script witness, with a planted-failure red check | proposed, needs no owner | to start when the owner asks, since it is not in the ranked list |

No ranked item was runnable without the owner or another peer at 980ed25, so none was run.

## Blocked items driven out (2026-11-25)

### Item 2: row 227 decision, read-only at bevy origin/main ad97f77

- The row is correct and the work is incomplete. The row is not stale.
- spoint src/terrain/CaveSDF.js:113-117 createCaveVolume places a volume at a world anchor through caveVolumeFrom, which sets localToWorld at :104. :119-129 polygonizeCaveVolume maps local mesh positions into world space.
- Bevy src/cave_sdf.rs has polygonize_cave_sdf (145), parse_anchor (245), add_cave_volume (299), volume_json (339) and load_cave_carve_layer (367). It stores the world anchor, and height_delta_at reads it. It has no createCaveVolume, no polygonizeCaveVolume, and no local_to_world or world_to_local (grep of origin/main src).
- Fixture testdata/parity/spoint-cave-sdf.json has meshes sphere, cylinder-y and tunnel-y only, and no world-placed cases. So the row's text 'createCaveVolume and polygonizeCaveVolume are not ported' is accurate.
- Witness: docs/bevy-gaps/row227-outcome-witness.cjs exit 0. It holds the decision: row 227 candidate-only, the counterparts present, no world transform, no world-placed fixture cases. It turns red when bevy closes the gap, which is the signal to update it.
- Bevy-side fix, sent as a prompt in REPORT and not edited here: port createCaveVolume and polygonizeCaveVolume into src/cave_sdf.rs, place each parsed volume at its world anchor and scale by worldRadius as CaveSDF.js:104 does, and polygonize into world-space vertices and indices. Generate world-placed fixture cases from spoint with scripts/gen-cave-sdf.mjs, and assert vertex positions and triangle counts in a cave_sdf test. Then set row 227 to present in docs/parity-matrix.tsv and regenerate the parity docs.

### Item 6: reads of savi and jayzee, read-only

- Savi docs/OPEN-ITEMS.md holds 30 OPEN-NNN items: RESOLVED 2 (001, 023), DIFFERENT-DATASET 2 (002, 005), BEHAVIOUR 5 (004, 011, 012, 017, 019), INFERRED 2 (007, 008), UNVERIFIED 6 (009, 014, 015, 016, 022, 028), OPEN 10 (003, 006, 010, 013, 018, 020, 021, 024, 029, 030), HELD-OWNER 3 (025, 026, 027). Sum 30.
- Savi OPEN-018 is stale. It says site/manifest.json was generated at 501c76e while HEAD is 6c39a16. The manifest now records commit 5a30f94, which is savi HEAD. This is a finding for savi, reported and not edited.
- Replication scope (ranked item 6): still blocked. Savi docs/JAYZEE-GAPS.md:51 says the spawn learnings 30 to 37 are in neither repo. Jayzee docs/PARITY.md:32 and docs/IDEAL.md:35 cite them as owner-decision. Neither repo holds the learnings, so the wording cannot be checked.
- Builtin body comparison (ranked item 6): still blocked. No builtin-body text exists in jayzee docs (grep finds none), so the jayzee side cannot be compared.

### Item 8: witness runner, started and finished

- scripts/run-witnesses.cjs runs every registered witness with at most 4 in parallel, checks each exit code against scripts/witness-manifest.tsv, and fails on an unregistered or missing witness, an unsafe or duplicate manifest path, or an exit mismatch.
- It runs a planted-failure self-test first: 7 cases, each expected to fail or pass as written, against two fixtures outside the repo (green exit 0, red exit 1). The self-test passed 7 of 7.
- Real run: 9 registered witnesses, all exit as expected. Witness: node scripts/run-witnesses.cjs exit 0.
- Retired: docs/bevy-gaps/recheck3-move-witness.cjs was pinned to base c8a0097 and is superseded by drift-ad97f77-witness.cjs. docs/patches/bevy-path-guard-witness.cjs checked for a red state that no longer holds, since bevy applied the patch upstream. bevy-path-guard-verify.cjs covers both states.
- Changed: docs/patches/bevy-path-guard-verify.cjs pinned its byte-identical check to origin/main. origin has moved since b50dbb7, so that check failed though the behaviour was right. The check now compares against the guard commit b50dbb7, and confirms it is an ancestor of origin/main.

### Ranked list status (2026-11-25, after this item)

| # | Item | Status | Witness or reason |
|---|---|---|---|
| 1 | Symbol-level and in-place re-check | done, 760dc27 and 980ed25 | absence-claims-witness.cjs; in-place-change-witness.cjs |
| 2 | Row 227 outcome | decided: the row is correct, the work is incomplete; blocked on bevy's port | row227-outcome-witness.cjs exit 0; bevy prompt in REPORT |
| 3 | Empty-place witness on origin | done, fa8701f | empty-place-witness.cjs |
| 4 | gap-207 row count | held for the owner, no change | none |
| 5 | Owner-held items | held | the owner decides each |
| 6 | Blocked on other peers | savi and jayzee read; replication scope and builtin body still blocked on missing source; savi OPEN-018 stale | reads above |
| 7 | Bevy windows | bevy's implementation | none |
| 8 | Witness runner | done | node scripts/run-witnesses.cjs exit 0; self-test 7 of 7 |

## Item 6 as a witness: cross-peer blocks (2026-11-25)

- docs/peers/cross-peer-blocks-witness.cjs reads savi and jayzee read-only and checks four things. It exits 0 with the facts below.
- Savi register: docs/OPEN-ITEMS.md pinned at savi commit 5a30f94, which is the savi HEAD at the time of this entry. It holds 30 items, numbered in sequence, each with a status from the register vocabulary. Counts: RESOLVED 2, DIFFERENT-DATASET 2, BEHAVIOUR 5, INFERRED 2, UNVERIFIED 6, OPEN 10, HELD-OWNER 3.
- Savi OPEN-018 is stale at the current tree. Its claim is that site/manifest.json was generated at 501c76e while HEAD is 6c39a16. The manifest on disk records commit 5a30f94, which is savi HEAD. The manifest is not tracked in savi HEAD, so the register's claim rests on an untracked file. This is a finding for savi, reported and not edited.
- Replication scope (ranked item 6): still blocked. The witness looks for learning records numbered 30 to 37 (named learning-record-section-30 to -37) in savi and jayzee. The only learning record in either repo is scripts/fixtures/spawn/learning-record-section-7.md, which is section 7 on world-store error keys. The assumption that the numbered records carry this name is stated here, not proven. The witness fails if a record named 30 to 37 appears, which is the unblock signal.
- Builtin body comparison (ranked item 6): still blocked. The witness finds no builtin-body text in jayzee docs at HEAD 9485b74, and fails if any appears.

### Ranked list status (2026-11-25, after this item)

| # | Item | Status | Witness or reason |
|---|---|---|---|
| 1 | Symbol-level and in-place re-check | done, 760dc27 and 980ed25 | absence-claims-witness.cjs; in-place-change-witness.cjs |
| 2 | Row 227 outcome | decided: the row is correct, the work is incomplete; blocked on bevy's port | row227-outcome-witness.cjs exit 0; bevy prompt in REPORT |
| 3 | Empty-place witness on origin | done, fa8701f | empty-place-witness.cjs |
| 4 | gap-207 row count | held for the owner, no change | none |
| 5 | Owner-held items | held | the owner decides each |
| 6 | Blocked on other peers | witnessed: savi register pinned and counted; OPEN-018 stale; replication scope and builtin body still blocked, and the witness says what would unblock them | docs/peers/cross-peer-blocks-witness.cjs exit 0 |
| 7 | Bevy windows | bevy's implementation | none |
| 8 | Witness runner | done, 89a15d3 | node scripts/run-witnesses.cjs |

## Games scope closed at 52 pages (2026-11-25)

- The '148 pages' figure in the owner-held list was a misreading. 148 was the number of click targets the first recapture made across the games cards (wiki-tools/recapture/states/toolbox/summary-10.json, clicked 148), recorded at PENDING_VALIDATION.md:449. It was never a count of game pages.
- The Games section holds 52 game pages. The section's own heading says so (wiki-site/reference-game-16/recapture-games.html: 'Games: the 52 game pages in the Games section'). All 52 were fetched over HTTP on 2026-11-12 with status 200 and no error, and each has a page in wiki/reference-game-16/games/.
- Two count fields were wrong: wiki-tools/recapture/games/cards.json count and manifest.json cardsInSection both read 53. The 53rd value came from a navigation link, 'Host page: Untitled game (@lanmower/game-16)', which is not a card. Both counts are now 52.
- Witness: wiki-tools/games-scope-witness.cjs. Red before the count fix (2 failures, both the count fields). Green after it: 52 cards, 52 captures with matching URLs and status 200, 52 game pages each naming their card address, and the section heading and host link as stated.
- Owner decision: not needed. The scope is the 52 pages the section lists, and all 52 are captured. Nothing was fetched beyond that set.
- Supersedes: the item 9 line at PENDING_VALIDATION.md:640 ('the rest of the games pages need an owner decision on scope') and the owner-held entry for games scope.

### Ranked list status (2026-11-25, after this item)

| # | Item | Status | Witness or reason |
|---|---|---|---|
| 1 | Symbol-level and in-place re-check | done, 760dc27 and 980ed25 | absence-claims-witness.cjs; in-place-change-witness.cjs |
| 2 | Row 227 outcome | decided: the row is correct, the work is incomplete; blocked on bevy's port | row227-outcome-witness.cjs exit 0; bevy prompt in REPORT |
| 3 | Empty-place witness on origin | done, fa8701f | empty-place-witness.cjs |
| 4 | gap-207 row count | held for the owner, no change | none |
| 5 | Owner-held items | held except games scope, which is closed; the rest stay held for the owner | games-scope-witness.cjs (closed) |
| 6 | Cross-peer blocks | witnessed; replication scope and builtin body still blocked on missing sources | cross-peer-blocks-witness.cjs exit 0 |
| 7 | Bevy windows | bevy's implementation | none |
| 8 | Witness runner | done, 89a15d3 | node scripts/run-witnesses.cjs |
| 9 | Games scope (was owner-held) | closed at 52 pages; the 148 figure was click targets | games-scope-witness.cjs exit 0 |

## Skill bodies: held for the owner, with the blocker witnessed (2026-11-25)

- The docs door is the Tome API reference. Its opening is GET https://www.spawn.co/api/sdk/v1/<worldId>/agent/docs with a bearer token (wiki/reference-game-16/download-process.md:24). The section route needs the same token. This check did not re-probe the door, since that would mean handling a credential.
- The 404 for the section named skills is recorded at wiki/index/extra-docs.md:291 (section_not_found, nearest section Camera). It says the skill list is in skills.json and no skill text is stored. The repo's wiki-tools/capture/02-skills.json holds zero entries.
- Held for the owner. The owner supplies the access path for the token, or decides that skill bodies stay out of scope. Nothing here is owner-free.
- Witness: docs/held/skill-bodies-witness.cjs exit 0. It goes red if the 404 record, the bearer-token requirement, or the empty capture changes, which would mean skill text is now held somewhere and this status needs updating.

### Ranked list status (2026-11-25, after this item)

| # | Item | Status | Witness or reason |
|---|---|---|---|
| 1 | Symbol-level and in-place re-check | done, 760dc27 and 980ed25 | absence-claims-witness.cjs; in-place-change-witness.cjs |
| 2 | Row 227 outcome | decided: the row is correct, the work is incomplete; blocked on bevy's port | row227-outcome-witness.cjs exit 0; bevy prompt in REPORT |
| 3 | Empty-place witness on origin | done, fa8701f | empty-place-witness.cjs |
| 4 | gap-207 row count | held for the owner, no change | none |
| 5 | Owner-held items | held: signal push 7a18a88; game-16 push cad7f6e; history rewrite; exec-readonly POST check (needs a token); ctx.anim alias intent; walk-control and 38 controls; skill bodies (docs door needs a bearer token); 36 stage-6 decisions | docs/held/skill-bodies-witness.cjs exit 0 for skill bodies; the rest need the owner's decision or a credential |
| 6 | Cross-peer blocks | witnessed; replication scope and builtin body blocked on missing sources | cross-peer-blocks-witness.cjs exit 0 |
| 7 | Bevy windows | bevy's implementation | none |
| 8 | Witness runner | done, 89a15d3 | node scripts/run-witnesses.cjs |
| 9 | Games scope | closed at 52 pages, 335eedd | games-scope-witness.cjs exit 0 |

No ranked item was runnable without the owner, a credential, or bevy at this point. The next owner-free step would be an architectural one, which the owner has approved in principle: wire node scripts/run-witnesses.cjs into a tracked pre-push hook via core.hooksPath. It is not on the ranked list, so it is not started here.

## Pre-push hook: the witness runner on every push (2026-11-25)

- .githooks/pre-push (mode 100755) runs node scripts/run-witnesses.cjs and exits with its status. The hook is installed in this clone with git config core.hooksPath .githooks; that setting is local and not committed.
- The runner reads its manifest from WITNESS_MANIFEST when set, otherwise from scripts/witness-manifest.tsv. The override exists so a broken manifest can exercise the hook's failure path.
- scripts/hook-witness.cjs checks the hook's mode, shebang, runner call and installation, and runs the hook with a missing manifest. The hook must exit nonzero and name the missing file. It passes.
- The hook needs the sibling checkouts the witnesses read. A clone without /workspace/bevy, /workspace/savi and /workspace/jayzee fails the hook. That is a limit of the workspace, stated here, not a fault of the hook.
- The end-to-end proof is the push that carries this commit: the hook runs the full runner before the push is sent.

### Ranked list status (2026-11-25, after this item)

| # | Item | Status | Witness or reason |
|---|---|---|---|
| 1 | Symbol-level and in-place re-check | done, 760dc27 and 980ed25 | absence-claims-witness.cjs; in-place-change-witness.cjs |
| 2 | Row 227 outcome | decided: the row is correct, the work is incomplete; blocked on bevy's port | row227-outcome-witness.cjs exit 0; bevy prompt in REPORT |
| 3 | Empty-place witness on origin | done, fa8701f | empty-place-witness.cjs |
| 4 | gap-207 row count | held for the owner, no change | none |
| 5 | Owner-held items | held: signal push 7a18a88; game-16 push cad7f6e; history rewrite; exec-readonly POST check (needs a token); ctx.anim alias intent; walk-control and 38 controls; skill bodies (docs door needs a bearer token); 36 stage-6 decisions | docs/held/skill-bodies-witness.cjs exit 0 for skill bodies; the rest need the owner or a credential |
| 6 | Cross-peer blocks | witnessed; replication scope and builtin body blocked on missing sources | cross-peer-blocks-witness.cjs exit 0 |
| 7 | Bevy windows | bevy's implementation | none |
| 8 | Witness runner | done, 89a15d3 | node scripts/run-witnesses.cjs |
| 9 | Games scope | closed at 52 pages, 335eedd | games-scope-witness.cjs exit 0 |
| 10 | Pre-push hook runs the runner | done, this commit | scripts/hook-witness.cjs exit 0; the push of this commit runs the hook |
