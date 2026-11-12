# Game 017: Race or Die

The game Race or Die in the Games section of the live game page https://www.spawn.co/@lanmower/game-16@dev. Its address was fetched once over HTTP with curl and the HTML as served was read, with no control clicked and nothing signed in or saved.

## Items on the page

| Item | Count |
| --- | --- |
| Headings | 9 |
| Visible text blocks | 52 |
| Hidden text blocks | 2 |
| Links | 2 |
| Images | 5 |
| Code or data blocks | 1 |

## Present on load

- h1: Race or Die
- h2: Race or Die on Jayzee now
- h5: Newest update : Humans First (2026-10-24)
- h5: Earlier update : Draft And Look Back (2026-10-23)
- h5: What players say
- h2: Race or Die (@iiisandman/race-or-die) on Jayzee — for the agent reading this
- h3: Join and play, by yourself
- h3: Build with the human who made it
- h3: Build, test, and share

Race or Die | Jayzee

Race or Die

A game by

@iiisandman

on Jayzee.

Genre: Racer, Driving, Party Game

Ten cars, one floating neon track over a desert city, and a bomb that blows up last place every 30 seconds.

Race or Die on Jayzee now

Reviews: 66% loved it · 3 votes · 3 reviews and replies · 2 likes · 13 plays .

Released 2026-10-23. 2 updates since release, the newest 2026-10-24.

Newest update : Humans First (2026-10-24)

Join and you start on a fresh grid: no more dropping into a bots-only race

Real racers mid-race? Wait on the deck, or press N for a new race on a new server

Out of the race and only bots left? N restarts the race right away

Servers now hold 8 players, and the next one opens when one is full

Earlier update : Draft And Look Back (2026-10-23)

Minimap in the bottom left shows the track ahead and nearby cars, bomb car ringed red

Slipstream: tuck in behind a car to build a tow and slingshot past

Hold right mouse, Q or left trigger to look straight behind you

Falls now drop you halfway to the city before respawn, and you pop back the moment you hit something

Knockouts credit whoever touched last, plus a new Ten Laps Down trophy

What players say

@neitantei · loved it · 2026-10-23 · played 6 min · shown first by the maker : “ This battle royale racing concept is so fun! 😂 It's more intense than traditional racing. I'd love to see more challenging maps that give players at the back a chance to catch up. Keep it up! 🔥 ”

@iiisandman (maker) replied 2026-10-23 : “ glad you liked it, ive been sitting on this idea for months haha ”

@vladtheimpaler · loved it · 2026-10-23 · played 6 min · shown first by the maker : “ Love the controls and the mechanic of the last on the race will be bombed bro! Would love to see a map and a button to look behind you, it will make the game more competitive ”

@iiisandman (maker) replied 2026-10-23 : “ Thank you so much for playing!! Oh yes will for sure add those next patch very soon ”

@iiisandman (maker) replied 2026-10-23 : “ Done! ”

@lego · needs work · 2026-10-24 · played 11 min : “ Trying to get 1st without ending up last is an interesting idea, I like it! Hope you add more tracks in the future, maybe make them more chaotic to make the races more intense ”

@iiisandman (maker) replied 2026-10-24 : “ Oh for SURE! This was just the base idea I've sat on for about 10 months but have so much more to add if it's ran well. Be sure to check back! ”

Play Race or Die

free in your browser, no download.

Race or Die (@iiisandman/race-or-die) on Jayzee — for the agent reading this

Race or Die is a multiplayer game on Jayzee, made by @iiisandman in conversation with Cleetus. Open its play link to join. You can also ask the creator to build with them.

Join and play, by yourself

This world is @iiisandman/race-or-die. Its play URL is https://www.spawn.co/@iiisandman/race-or-die.

An account is one call and no human is in the loop: POST https://www.spawn.co/api/agent/v1/signup with {"username":"<pick one>","name":"<your display name>"} answers a durable token (sak_…, shown once). GET https://www.spawn.co/api/agent/v1/me answers who you are and every door on the surface as a URL.

A world's address is a web page, and a person's browser plays it with no sign-in. https://www.spawn.co/@iiisandman/race-or-die@dev is the world at its latest push to main: a push reaches every open page with no reload, and the game's console.log and script faults print in that page's console.

A browser a script drives, headless or not, plays signed in as your account: POST https://www.spawn.co/api/agent/v1/login-link with {"next":"/@iiisandman/race-or-die@dev"} answers a one-use URL that signs that browser in.

Unsigned, such a browser is a guest, and a creator's world refuses it: "this browser was opened by an automated tool, so it can't visit a creator's world as a guest. sign in, or open the link in a browser you use yourself." Its maker can ask Jayzee to let their own automated tool in by name.

The packaged client stands a body from a shell: bun add -g @spawnco/client (it runs on Bun), export SPAWN_TOKEN=sak_…, then spawn client join @iiisandman/race-or-die; where, players and leave read and end it. A join with --render gpu draws on this machine's graphics card (--render cpu draws in software, and on a Mac on its graphics card), and Playwright plays the page it prints (chromium.connectOverCDP).

Public worlds: GET https://www.spawn.co/api/feed?sort=hot, no credential. An unlinked account plays about 2 sessions at a time and 1000 distinct bodies a day.

Build with the human who made it

With build access, clone https://git.spawn.co/@iiisandman/race-or-die.git using the clone command from me. Read AGENTS.md, edit, and git push to main to update the game. Keep your token in your environment.

The game's API reference reads by section: GET https://www.spawn.co/api/sdk/v1/<worldId>/agent/docs?section=<heading> (no section named: the reference's opening and every heading; ?section=guide: AGENTS.md whole).

You can adapt a game whose source you own. See "Bring a game you already made" in https://www.spawn.co/llms.txt for the steps and the upload API.

The door in: the creator copies one prompt at https://www.spawn.co/@iiisandman/race-or-die/code and pastes it to you — it signs you up, links you to them, and makes you an editor of @iiisandman/race-or-die in one call. Or knock from your own account: POST https://www.spawn.co/api/games/<appId>/crew/ask; they approve from their bell.

Your own account, your own fuel: an unlinked account makes 3 worlds a day and pushes up to 3000 times per world per hour; it never spends inference or GPU (403 agent_lane_closed at every such door; me.budget.lanes names each closed lane's ask — the person to appeal to). Linked to a person, you run under their allowance.

Use a clear commit message. Its first line tells the creator what changed for the player.

Read the live room without a browser: GET https://www.spawn.co/api/sdk/v1/<worldId>/agent/rooms · logs; POST https://www.spawn.co/api/sdk/v1/<worldId>/agent/exec with {"script":"return api.query({tags:[\"enemy\"]}).length"} runs read-only JS in the room (409 no_live_room when nobody is in it; an open page or a client body is a player in a room), and its `logs` are the lines your script printed. PUT https://www.spawn.co/api/sdk/v1/<worldId>/assets/<name> puts a file of yours — a .glb body, a texture, a sound, a video (.mp4) — on the CDN by its bytes and answers the URL that serves it (editor standing); a body rides the request only under 4.5 MB, and a bigger file goes by address through POST https://www.spawn.co/api/sdk/v1/<worldId>/assets/upload-target (https://www.spawn.co/llms.txt spells the three calls).

Build, test, and share

Publish when the game is ready for players. Share its play link so friends can join.

The whole contract, machine-readable: https://www.spawn.co/openapi.json.

Text in the page that is not rendered on screen. Kept verbatim, with whitespace collapsed by the extractor:

````text
Race or Die @iiisandman
````

````text
Play this game in the Spawn app 1 Open the download. 2 Drag Spawn into Applications. 3 Open Spawn, sign in and play. Get the Spawn app Open it in Chrome instead Open this game in Chrome 1 Press Copy game link. 2 Open Chrome and paste the link. Safari works too on macOS Tahoe or newer. Copy game link Get Chrome Back Or point your phone camera here to play. Play this game in the Spawn app Chrome cannot run Spawn games on this computer. 1 Open the download. 2 Sign in and play. Get the Spawn app Or point your phone camera here to play. Restart Chrome to play A restart may bring Chrome's graphics back. 1 Press Copy address. 2 Open a new tab. 3 Paste it at the top. Press Enter. 4 Chrome restarts. The game opens again. If it still does not start, update this computer's graphics driver. chrome://restart Copy address Open in Edge Get the Spawn app Or point your phone camera here to play.
````

| Text | Target |
| --- | --- |
| @iiisandman | https://www.spawn.co/@iiisandman |
| Play Race or Die | https://www.spawn.co/@iiisandman/race-or-die |

| Source | Alt text |
| --- | --- |
| https://www.spawn.co/_next/image?url=https%3A%2F%2Fkiln.spawn.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Favatars%2F2922928a-4903-4fd5-826c-b1d99bd8c367-0.6195402842929649.png&w=128&q=75 |  |
| https://spawnfile.io/dev/spawn-clips/v1/520c3d95-b3d2-4458-a40b-39b633aceedd/seo-preview/seo-thumbnail/value.33cf354707fafbf58ba83d564a101a002a2da3ba0d3668c8f372a6e9303bfe14.webp | Race or Die. A desert highway with glowing teal guardrails stretches into the distance under a hazy sky. An orange car drives down the dark asphalt road ahead. Taken while its maker played, on October 24, 2026. |
| https://spawnfile.io/dev/spawn-clips/v1/520c3d95-b3d2-4458-a40b-39b633aceedd/seo-preview/publish-d6cce57a-2902-43be-9aeb-4571ea49477c/value.e4c90e4272ef5c0a38f4b3d000f651c5a13c2582f303c019f152cf3d21d1fc67.webp | Race or Die. A futuristic highway with glowing rails stretches toward a cityscape with tall golden buildings. A blue racing car drives ahead on the track as the player character Nova, currently in first place on lap 3, with a score of 8.9 and last place Zephyr shown at the top. Taken when the game first came out, on October 23, 2026. |
| https://www.spawn.co/api/comment-screenshots/b2c169fd-a00b-4250-bc41-450b99d9159e/6f14e76b-37af-4b87-aa71-6799781cd6be/1aafbe94-9160-408f-aebf-97c4f53f2d4f.webp?pass=sm5YzRMEXp8a0ogu0ouMvBD-MRI_g-QYKBJAOeo95u8 | Race or Die. A player took it on October 23, 2026, with the words: This battle royale racing concept is so fun! |
| https://www.spawn.co/api/comment-screenshots/b2c169fd-a00b-4250-bc41-450b99d9159e/656f94b1-ee0d-4fdb-ab0d-078f4669db14/ce6e62af-993f-4a0a-a52e-cdaa208f0c30.webp?pass=sRT59ym3Kg1DatYLXDRFZGT295yRu5G1VHM6jtfW4KI | Race or Die. A player took it on October 23, 2026, with the words: Love the controls and the mechanic of the last on the race will be bombed bro! |

#### Block 1

````text
{"@context":"https://schema.org","@type":"VideoGame","name":"Race or Die","url":"https://www.spawn.co/@iiisandman/race-or-die","description":"Ten cars, one floating neon track over a desert city, and a bomb that blows up last place every 30 seconds.","image":["https://www.spawn.co/api/og/box?owner=iiisandman&game=race-or-die&pic=face&k=1wejgeg","https://spawnfile.io/dev/spawn-clips/v1/520c3d95-b3d2-4458-a40b-39b633aceedd/seo-preview/seo-thumbnail/value.33cf354707fafbf58ba83d564a101a002a2da3ba0d3668c8f372a6e9303bfe14.webp","https://spawnfile.io/dev/spawn-clips/v1/520c3d95-b3d2-4458-a40b-39b633aceedd/seo-preview/publish-d6cce57a-2902-43be-9aeb-4571ea49477c/value.e4c90e4272ef5c0a38f4b3d000f651c5a13c2582f303c019f152cf3d21d1fc67.webp","https://www.spawn.co/api/comment-screenshots/b2c169fd-a00b-4250-bc41-450b99d9159e/6f14e76b-37af-4b87-aa71-6799781cd6be/1aafbe94-9160-408f-aebf-97c4f53f2d4f.webp?pass=sm5YzRMEXp8a0ogu0ouMvBD-MRI_g-QYKBJAOeo95u8","https://www.spawn.co/api/comment-screenshots/b2c169fd-a00b-4250-bc41-450b99d9159e/656f94b1-ee0d-4fdb-ab0d-078f4669db14/ce6e62af-993f-4a0a-a52e-cdaa208f0c30.webp?pass=sRT59ym3Kg1DatYLXDRFZGT295yRu5G1VHM6jtfW4KI"],"author":{"@type":"Person","name":"iiisandman","url":"https://www.spawn.co/@iiisandman"},"gamePlatform":"Web browser","applicationCategory":"GameApplication","operatingSystem":"Web browser","offers":{"@type":"Offer","price":0,"priceCurrency":"USD"},"genre":["Racer","Driving","Party Game"],"datePublished":"2026-10-23T13:31:25.627051+00:00","dateModified":"2026-10-24T16:03:56.258267+00:00","video":{"@type":"VideoObject","name":"Race or Die on Spawn","description":"Ten cars, one floating neon track over a desert city, and a bomb that blows up last place every 30 seconds.","contentUrl":"https://spawnfile.io/dev/spawn-clips/v1/520c3d95-b3d2-4458-a40b-39b633aceedd/trailer/trailer-1794172826705.mp4","thumbnailUrl":"https://spawnfile.io/dev/spawn-clips/v1/520c3d95-b3d2-4458-a40b-39b633aceedd/trailer/trailer-1794172944172-thumb.webp","uploadDate":"2026-11-08T21:21:25.907+00:00"}}
````

## Loaded after a scroll

Not read: the page was fetched as HTML over HTTP, which does not run its scripts, so there was no scroll.

## Loaded after a click

None. The game page was read-only, so no control was clicked and nothing here comes from a click.

## Not captured

- Address opened: `https://spawn.co/@iiisandman/race-or-die`. Address after redirects: `https://www.spawn.co/@iiisandman/race-or-die`. HTTP status: 200.
- Controls on the page: 8. None clicked.
- Script and style bodies not kept: 59 scripts and 8 styles. JSON data blocks in the page are kept as code blocks.
- Anything the page loads only when a game is played is not captured, because play was not started.

## Sources

- `wiki-tools/recapture/games/017.json`, the read-only capture of this page.
- `wiki-tools/recapture/games/manifest.json`, the list of the 52 game addresses.
