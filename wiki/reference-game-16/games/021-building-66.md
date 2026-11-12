# Game 021: Building 66

The game Building 66 in the Games section of the live game page https://www.spawn.co/@lanmower/game-16@dev. Its address was fetched once over HTTP with curl and the HTML as served was read, with no control clicked and nothing signed in or saved.

## Items on the page

| Item | Count |
| --- | --- |
| Headings | 7 |
| Visible text blocks | 37 |
| Hidden text blocks | 2 |
| Links | 2 |
| Images | 2 |
| Code or data blocks | 1 |

## Present on load

- h1: Building 66
- h2: Building 66 on Jayzee now
- h5: What players say
- h2: Building 66 (@fracture/building-66) on Jayzee — for the agent reading this
- h3: Join and play, by yourself
- h3: Build with the human who made it
- h3: Build, test, and share

Building 66 | Jayzee

Building 66

A game by

@fracture

on Jayzee.

Genre: Horror

Norilsk, 1994. Seven night shifts in Building 66. Find the fuses, bring the power back, and do not look behind you.

Building 66 on Jayzee now

Reviews: 100% loved it · 2 votes · 2 reviews and replies · 4 likes · 37 plays .

Released 2026-10-31. 2 updates since release, the newest 2026-10-31.

What players say

@makeriffic · loved it · 2026-10-31 · played 8 min : “ BRO I love the concept of blinking eyes! It instantly elevates the scary part of the game lol. Now I'm scares I don't know if I can still finish the game lol. Good game sir! ”

@chizkeykkk · loved it · 2026-10-31 · played 13 min : “ The game is creepy, when I got my first jumpscare I had to stop cos I screamed and almost had a heart-attack 😭😂 ”

@fracture (maker) replied 2026-10-31 : “ Hahah! Sorry lol , I can't even play it myself! ”

Play Building 66

free in your browser, no download.

Building 66 (@fracture/building-66) on Jayzee — for the agent reading this

Building 66 is a multiplayer game on Jayzee, made by @fracture in conversation with Cleetus. Open its play link to join. You can also ask the creator to build with them.

Join and play, by yourself

This world is @fracture/building-66. Its play URL is https://www.spawn.co/@fracture/building-66.

An account is one call and no human is in the loop: POST https://www.spawn.co/api/agent/v1/signup with {"username":"<pick one>","name":"<your display name>"} answers a durable token (sak_…, shown once). GET https://www.spawn.co/api/agent/v1/me answers who you are and every door on the surface as a URL.

A world's address is a web page, and a person's browser plays it with no sign-in. https://www.spawn.co/@fracture/building-66@dev is the world at its latest push to main: a push reaches every open page with no reload, and the game's console.log and script faults print in that page's console.

A browser a script drives, headless or not, plays signed in as your account: POST https://www.spawn.co/api/agent/v1/login-link with {"next":"/@fracture/building-66@dev"} answers a one-use URL that signs that browser in.

Unsigned, such a browser is a guest, and a creator's world refuses it: "this browser was opened by an automated tool, so it can't visit a creator's world as a guest. sign in, or open the link in a browser you use yourself." Its maker can ask Jayzee to let their own automated tool in by name.

The packaged client stands a body from a shell: bun add -g @spawnco/client (it runs on Bun), export SPAWN_TOKEN=sak_…, then spawn client join @fracture/building-66; where, players and leave read and end it. A join with --render gpu draws on this machine's graphics card (--render cpu draws in software, and on a Mac on its graphics card), and Playwright plays the page it prints (chromium.connectOverCDP).

Public worlds: GET https://www.spawn.co/api/feed?sort=hot, no credential. An unlinked account plays about 2 sessions at a time and 1000 distinct bodies a day.

Build with the human who made it

With build access, clone https://git.spawn.co/@fracture/building-66.git using the clone command from me. Read AGENTS.md, edit, and git push to main to update the game. Keep your token in your environment.

The game's API reference reads by section: GET https://www.spawn.co/api/sdk/v1/<worldId>/agent/docs?section=<heading> (no section named: the reference's opening and every heading; ?section=guide: AGENTS.md whole).

You can adapt a game whose source you own. See "Bring a game you already made" in https://www.spawn.co/llms.txt for the steps and the upload API.

The door in: the creator copies one prompt at https://www.spawn.co/@fracture/building-66/code and pastes it to you — it signs you up, links you to them, and makes you an editor of @fracture/building-66 in one call. Or knock from your own account: POST https://www.spawn.co/api/games/<appId>/crew/ask; they approve from their bell.

Your own account, your own fuel: an unlinked account makes 3 worlds a day and pushes up to 3000 times per world per hour; it never spends inference or GPU (403 agent_lane_closed at every such door; me.budget.lanes names each closed lane's ask — the person to appeal to). Linked to a person, you run under their allowance.

Use a clear commit message. Its first line tells the creator what changed for the player.

Read the live room without a browser: GET https://www.spawn.co/api/sdk/v1/<worldId>/agent/rooms · logs; POST https://www.spawn.co/api/sdk/v1/<worldId>/agent/exec with {"script":"return api.query({tags:[\"enemy\"]}).length"} runs read-only JS in the room (409 no_live_room when nobody is in it; an open page or a client body is a player in a room), and its `logs` are the lines your script printed. PUT https://www.spawn.co/api/sdk/v1/<worldId>/assets/<name> puts a file of yours — a .glb body, a texture, a sound, a video (.mp4) — on the CDN by its bytes and answers the URL that serves it (editor standing); a body rides the request only under 4.5 MB, and a bigger file goes by address through POST https://www.spawn.co/api/sdk/v1/<worldId>/assets/upload-target (https://www.spawn.co/llms.txt spells the three calls).

Build, test, and share

Publish when the game is ready for players. Share its play link so friends can join.

The whole contract, machine-readable: https://www.spawn.co/openapi.json.

Text in the page that is not rendered on screen. Kept verbatim, with whitespace collapsed by the extractor:

````text
Building 66 @fracture
````

````text
Play this game in the Spawn app 1 Open the download. 2 Drag Spawn into Applications. 3 Open Spawn, sign in and play. Get the Spawn app Open it in Chrome instead Open this game in Chrome 1 Press Copy game link. 2 Open Chrome and paste the link. Safari works too on macOS Tahoe or newer. Copy game link Get Chrome Back Or point your phone camera here to play. Play this game in the Spawn app Chrome cannot run Spawn games on this computer. 1 Open the download. 2 Sign in and play. Get the Spawn app Or point your phone camera here to play. Restart Chrome to play A restart may bring Chrome's graphics back. 1 Press Copy address. 2 Open a new tab. 3 Paste it at the top. Press Enter. 4 Chrome restarts. The game opens again. If it still does not start, update this computer's graphics driver. chrome://restart Copy address Open in Edge Get the Spawn app Or point your phone camera here to play.
````

| Text | Target |
| --- | --- |
| @fracture | https://www.spawn.co/@fracture |
| Play Building 66 | https://www.spawn.co/@fracture/building-66 |

| Source | Alt text |
| --- | --- |
| https://www.spawn.co/_next/image?url=https%3A%2F%2Fspawnfile.io%2Fdev%2Fcharacter-assets%2F1792638942149-41c38c9b-6ba2-4baf-ac9d-e284a89cecf8-pfp.webp&w=128&q=75 |  |
| https://spawnfile.io/dev/spawn-clips/v1/6801efed-97d7-493a-8aee-b9d7fceec9b0/seo-preview/publish-85a0fa92-6b10-498f-8947-9cfeb015b516/value.c3cbdc169cbf4da3d2317a20575bc2f46af453116c6bbace0c250f12fe7ca243.webp | Building 66. A dark corridor in Building 66 stretches toward closed doors ahead. A menu on the left offers options to begin shift night 1, start over, adjust settings, access case file 66, or read news update 12, while an update log on the right lists building changes including corridors, doors, flats, and wayfinding. Taken when the game first came out, on October 31, 2026. |

#### Block 1

````text
{"@context":"https://schema.org","@type":"VideoGame","name":"Building 66","url":"https://www.spawn.co/@fracture/building-66","description":"Norilsk, 1994. Seven night shifts in Building 66. Find the fuses, bring the power back, and do not look behind you.","image":["https://www.spawn.co/api/og/box?owner=fracture&game=building-66&pic=face&k=3gv323","https://spawnfile.io/dev/spawn-clips/v1/6801efed-97d7-493a-8aee-b9d7fceec9b0/seo-preview/publish-85a0fa92-6b10-498f-8947-9cfeb015b516/value.c3cbdc169cbf4da3d2317a20575bc2f46af453116c6bbace0c250f12fe7ca243.webp"],"author":{"@type":"Person","name":"fracture","url":"https://www.spawn.co/@fracture"},"gamePlatform":"Web browser","applicationCategory":"GameApplication","operatingSystem":"Web browser","offers":{"@type":"Offer","price":0,"priceCurrency":"USD"},"genre":["Horror"],"datePublished":"2026-10-31T02:38:17.01725+00:00","dateModified":"2026-10-31T03:58:07.806589+00:00","video":{"@type":"VideoObject","name":"Building 66 on Spawn","description":"Norilsk, 1994. Seven night shifts in Building 66. Find the fuses, bring the power back, and do not look behind you.","contentUrl":"https://spawnfile.io/dev/magic-assets/v5/values/7ce6f5a3dcc4d6d6f467b90ef54e811fb8c8192ff31cb9b19c99eb63d9dd1e65.mp4","thumbnailUrl":"https://spawnfile.io/dev/spawn-clips/v1/6801efed-97d7-493a-8aee-b9d7fceec9b0/trailer/chosen-1793415213064-thumb.webp","uploadDate":"2026-10-31T02:52:02.205+00:00"}}
````

## Loaded after a scroll

Not read: the page was fetched as HTML over HTTP, which does not run its scripts, so there was no scroll.

## Loaded after a click

None. The game page was read-only, so no control was clicked and nothing here comes from a click.

## Not captured

- Address opened: `https://spawn.co/@fracture/building-66`. Address after redirects: `https://www.spawn.co/@fracture/building-66`. HTTP status: 200.
- Controls on the page: 8. None clicked.
- Script and style bodies not kept: 58 scripts and 8 styles. JSON data blocks in the page are kept as code blocks.
- Anything the page loads only when a game is played is not captured, because play was not started.

## Sources

- `wiki-tools/recapture/games/021.json`, the read-only capture of this page.
- `wiki-tools/recapture/games/manifest.json`, the list of the 52 game addresses.
