# Recapture index: what the game page holds outside the first capture

The live game page https://www.spawn.co/@lanmower/game-16@dev was captured again with the playwriter setup inside gm, on 2026-11-12. The first capture read the twelve toolbox sections once, after a 1.2 second wait. This recapture reads the host document, the play frame and each toolbox section on load, after a scroll, and after a click on each control that does not change state. Each page below lists what the first capture does not hold, as text, headings, links, images and code, with the rename rules applied to prose.

## Items not in the capture, by page

| Page | On load | After a scroll | After a click | Clicks that brought new content |
| --- | --- | --- | --- | --- |
| recapture-host.md | 2 | 0 | 0 | 0 |
| recapture-play-frame.md | 0 | 0 | 0 | 0 |
| recapture-overview.md | 0 | 0 | 0 | 0 |
| recapture-starters.md | 0 | 0 | 65 | 5 |
| recapture-skills.md | 0 | 0 | 2136 | 41 |
| recapture-animations.md | 0 | 0 | 0 | 0 |
| recapture-sound-art.md | 0 | 0 | 2 | 1 |
| recapture-workshop.md | 0 | 0 | 793 | 10 |
| recapture-engine.md | 0 | 0 | 2099 | 17 |
| recapture-reference.md | 0 | 0 | 0 | 0 |
| recapture-shapes.md | 0 | 0 | 328 | 87 |
| recapture-mods.md | 0 | 0 | 0 | 0 |
| recapture-pick-a-genre.md | 0 | 0 | 0 | 0 |

## Not captured, and why

- Controls whose labels name a state-changing action (play, join, install, like, follow, reply, post, send, sign in, save, delete, publish, create, submit, buy, share, copy, token, invite, remove, add, fork, star, subscribe, download, remix, report, upload, connect, pay, purchase) were not clicked. Each section page lists its own. A click on them would act on the live world or on the account, so the policy is to leave them unclicked.
- The game world in the play frame is drawn by the engine and has no text in the page, so only the frame chrome and any text in the DOM is captured.
- One control was clicked before the travel verbs were added to the skip list: the arrow link Walk into the animation hall in Animations. The click appears to have detached the toolbox frame, which was gone on the next check. The page was reloaded and the sections were read again from the reloaded page. A live check on 2026-11-12, on a fresh load without a second click, found the control as an anchor with no href and an inline click handler that sends a hall action, so a click sends that action instead of following a link. The play session world id and address match the first baseline, so the page did not move to another world. The hall action itself is not visible on the page, because the play frame is a canvas, so its effect on the server was not verified.
- The 148 Games entries were each clicked once. None brought up anything in the toolbox frame that the swept state did not already hold. Each game page was fetched once over HTTP, read-only, in the games pass: see recapture-games.md.
- Hidden text (inline scripts, styles and the schema.org data on the host) is captured as text that is not rendered on screen.

## Sources

- `wiki-tools/recapture/states/`, the raw states of this recapture, read by `wiki-tools/gen-recapture.mjs`.
- `wiki-tools/capture/`, the first capture, which these pages compare against and which is unchanged.
