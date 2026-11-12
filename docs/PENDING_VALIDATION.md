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
