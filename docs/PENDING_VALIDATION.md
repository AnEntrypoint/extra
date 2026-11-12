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
