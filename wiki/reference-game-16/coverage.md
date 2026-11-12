# Capture coverage: game page

## How it works

The capture was taken with the playwriter setup inside gm, on the live page https://www.spawn.co/@lanmower/game-16@dev. The host document holds the page sections (headline, byline, the agent notes and the play entry). The toolbox content is in the child frame of the play session, `tome-ui`. The toolbox navigation has twelve entries, and each one was clicked in turn. After each click the frame was read: its full text, headings, anchors, images, and code or data blocks.

Each captured section is one page in this folder. Text is in document order. Headings are marked as headings, and every link, image and code block is listed.

## Decisions

- The reference's sections are kept as separate pages, one per navigation entry, because the reference navigates between them with its own pill nav. The wiki uses the same split.
- Renames are applied to prose and headings. Hostnames, URLs, package names and the `spawn client` command are kept verbatim, because they are published identifiers that do not change.
- Capture files are kept outside the wiki, in `wiki-tools/capture/`, unchanged, so the rename can be checked against them.

## Open gaps

- The first capture read each section once, after a 1.2 second wait. What the recapture found outside it is listed on the recapture pages: [Recapture index](recapture-index.md).
- The `Reference` section is 124 thousand characters with 73 code blocks. It is captured in full, but the wiki copy is long.
- The play frame of the game itself is a canvas with no text, so the live world is not captured as text: [Play frame](recapture-play-frame.md).
- Controls whose labels name a state-changing action were not clicked. Each section's recapture page lists them under Not captured.

## Sources

- `capture/host.json` and `capture/00-overview.json` to `capture/11-pick-a-genre.json` in `wiki-tools/capture/`.

## Totals

| Section | Characters | Headings | Links | Images | Code or data blocks |
| --- | --- | --- | --- | --- | --- |
| host | 19 | 6 | 1 | 2 | 0 |
| overview | 434 | 1 | 19 | 0 | 0 |
| starters | 1090 | 6 | 18 | 0 | 0 |
| skills | 3186 | 6 | 54 | 0 | 0 |
| animations | 966 | 6 | 14 | 0 | 0 |
| sound-art | 1338 | 20 | 32 | 9 | 0 |
| workshop | 2353 | 11 | 23 | 0 | 0 |
| engine | 3083 | 18 | 30 | 0 | 0 |
| reference | 124086 | 70 | 13 | 0 | 73 |
| shapes | 1608 | 1 | 102 | 0 | 0 |
| mods | 5002 | 1 | 13 | 0 | 0 |
| games | 8771 | 63 | 66 | 0 | 0 |
| pick-a-genre | 2106 | 12 | 22 | 0 | 0 |
| Total of toolbox sections | 154023 | 215 | 406 | 9 | 73 |
