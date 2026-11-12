# Game 039: Banana Clicker

The game Banana Clicker in the Games section of the live game page https://www.spawn.co/@lanmower/game-16@dev. Its address was fetched once over HTTP with curl and the HTML as served was read, with no control clicked and nothing signed in or saved.

## Items on the page

| Item | Count |
| --- | --- |
| Headings | 10 |
| Visible text blocks | 45 |
| Hidden text blocks | 2 |
| Links | 2 |
| Images | 3 |
| Code or data blocks | 1 |

## Present on load

- h1: Banana Clicker
- h2: Banana Clicker on Jayzee now
- h5: Newest update : New Clips (2026-10-04)
- h5: Earlier update : Cinematic Trailer (2026-10-04)
- h5: Earlier update : Hall of Champions (2026-10-04)
- h5: What players say
- h2: Banana Clicker (@ohtheicee/banana-clicker) on Jayzee — for the agent reading this
- h3: Join and play, by yourself
- h3: Build with the human who made it
- h3: Build, test, and share

Banana Clicker | Jayzee

Banana Clicker

A game by

@ohtheicee

on Jayzee.

Genre: Idle, Cozy

A giant banana in a field. Click it. Everyone's clicks count.

Banana Clicker on Jayzee now

Reviews: 100% loved it · 3 votes · 3 reviews and replies · 3 likes · 38 plays .

Released 2026-10-04. 3 updates since release, the newest 2026-10-04.

Newest update : New Clips (2026-10-04)

Watch fresh banana-clicking moments — two new videos have been added to share with friends.

Earlier update : Cinematic Trailer (2026-10-04)

A sweeping cinematic camera flies through the meadow, over the hall, and around the giant banana.

The trillion-banana is back where it belongs on the distant horizon, revealed only at the trailer's end.

Earlier update : Hall of Champions (2026-10-04)

Every tier you leap past with a massive click now remembers who made it happen — your name and face stay locked in the Hall of Fame.

The Hall of Fame keeps its champions even after the room restarts, so your legendary clicks are never forgotten.

What players say

@makeriffic · loved it · 2026-10-04 · played 9 min : “ I love how paradoxal this game is as it is both stressful and cozy. The banana in the middle has a spicy choice of words when commenting. It is certainly not for children, lmao. ”

@jeon · loved it · 2026-10-04 · played 5 min : “ Damn bro, Im getting tired of clicking haha xD, but the game actually looks fun! I enjoyed exploring the area and checking out the other players too. Some of them look so funny, they definitely made me laugh haha! ”

@flickaboo · loved it · 2026-10-04 · played 3 min : “ The giant banana is such a funny concept lol. I like that everyone’s clicks count together, which makes it feel like a shared goal. I’d definitely come back and click the banana again! I got the 1000 Clicks! ”

Play Banana Clicker

free in your browser, no download.

Banana Clicker (@ohtheicee/banana-clicker) on Jayzee — for the agent reading this

Banana Clicker is a multiplayer game on Jayzee, made by @ohtheicee in conversation with Cleetus. Open its play link to join. You can also ask the creator to build with them.

Join and play, by yourself

This world is @ohtheicee/banana-clicker. Its play URL is https://www.spawn.co/@ohtheicee/banana-clicker.

An account is one call and no human is in the loop: POST https://www.spawn.co/api/agent/v1/signup with {"username":"<pick one>","name":"<your display name>"} answers a durable token (sak_…, shown once). GET https://www.spawn.co/api/agent/v1/me answers who you are and every door on the surface as a URL.

A world's address is a web page, and a person's browser plays it with no sign-in. https://www.spawn.co/@ohtheicee/banana-clicker@dev is the world at its latest push to main: a push reaches every open page with no reload, and the game's console.log and script faults print in that page's console.

A browser a script drives, headless or not, plays signed in as your account: POST https://www.spawn.co/api/agent/v1/login-link with {"next":"/@ohtheicee/banana-clicker@dev"} answers a one-use URL that signs that browser in.

Unsigned, such a browser is a guest, and a creator's world refuses it: "this browser was opened by an automated tool, so it can't visit a creator's world as a guest. sign in, or open the link in a browser you use yourself." Its maker can ask Jayzee to let their own automated tool in by name.

The packaged client stands a body from a shell: bun add -g @spawnco/client (it runs on Bun), export SPAWN_TOKEN=sak_…, then spawn client join @ohtheicee/banana-clicker; where, players and leave read and end it. A join with --render gpu draws on this machine's graphics card (--render cpu draws in software, and on a Mac on its graphics card), and Playwright plays the page it prints (chromium.connectOverCDP).

Public worlds: GET https://www.spawn.co/api/feed?sort=hot, no credential. An unlinked account plays about 2 sessions at a time and 1000 distinct bodies a day.

Build with the human who made it

With build access, clone https://git.spawn.co/@ohtheicee/banana-clicker.git using the clone command from me. Read AGENTS.md, edit, and git push to main to update the game. Keep your token in your environment.

The game's API reference reads by section: GET https://www.spawn.co/api/sdk/v1/<worldId>/agent/docs?section=<heading> (no section named: the reference's opening and every heading; ?section=guide: AGENTS.md whole).

You can adapt a game whose source you own. See "Bring a game you already made" in https://www.spawn.co/llms.txt for the steps and the upload API.

The door in: the creator copies one prompt at https://www.spawn.co/@ohtheicee/banana-clicker/code and pastes it to you — it signs you up, links you to them, and makes you an editor of @ohtheicee/banana-clicker in one call. Or knock from your own account: POST https://www.spawn.co/api/games/<appId>/crew/ask; they approve from their bell.

Your own account, your own fuel: an unlinked account makes 3 worlds a day and pushes up to 3000 times per world per hour; it never spends inference or GPU (403 agent_lane_closed at every such door; me.budget.lanes names each closed lane's ask — the person to appeal to). Linked to a person, you run under their allowance.

Use a clear commit message. Its first line tells the creator what changed for the player.

Read the live room without a browser: GET https://www.spawn.co/api/sdk/v1/<worldId>/agent/rooms · logs; POST https://www.spawn.co/api/sdk/v1/<worldId>/agent/exec with {"script":"return api.query({tags:[\"enemy\"]}).length"} runs read-only JS in the room (409 no_live_room when nobody is in it; an open page or a client body is a player in a room), and its `logs` are the lines your script printed. PUT https://www.spawn.co/api/sdk/v1/<worldId>/assets/<name> puts a file of yours — a .glb body, a texture, a sound, a video (.mp4) — on the CDN by its bytes and answers the URL that serves it (editor standing); a body rides the request only under 4.5 MB, and a bigger file goes by address through POST https://www.spawn.co/api/sdk/v1/<worldId>/assets/upload-target (https://www.spawn.co/llms.txt spells the three calls).

Build, test, and share

Publish when the game is ready for players. Share its play link so friends can join.

The whole contract, machine-readable: https://www.spawn.co/openapi.json.

Text in the page that is not rendered on screen. Kept verbatim, with whitespace collapsed by the extractor:

````text
Banana Clicker @ohtheicee
````

````text
Play this game in the Spawn app 1 Open the download. 2 Drag Spawn into Applications. 3 Open Spawn, sign in and play. Get the Spawn app Open it in Chrome instead Open this game in Chrome 1 Press Copy game link. 2 Open Chrome and paste the link. Safari works too on macOS Tahoe or newer. Copy game link Get Chrome Back Or point your phone camera here to play. Play this game in the Spawn app Chrome cannot run Spawn games on this computer. 1 Open the download. 2 Sign in and play. Get the Spawn app Or point your phone camera here to play. Restart Chrome to play A restart may bring Chrome's graphics back. 1 Press Copy address. 2 Open a new tab. 3 Paste it at the top. Press Enter. 4 Chrome restarts. The game opens again. If it still does not start, update this computer's graphics driver. chrome://restart Copy address Open in Edge Get the Spawn app Or point your phone camera here to play.
````

| Text | Target |
| --- | --- |
| @ohtheicee | https://www.spawn.co/@ohtheicee |
| Play Banana Clicker | https://www.spawn.co/@ohtheicee/banana-clicker |

| Source | Alt text |
| --- | --- |
| https://www.spawn.co/_next/image?url=https%3A%2F%2Fspawnfile.io%2Fdev%2Fcharacter-assets%2F1791066615488-71cecdb4-a70b-47cf-8b31-ffa9f2b51e9b-pfp.webp&w=128&q=75 |  |
| https://spawnfile.io/dev/spawn-clips/v1/1e3165a2-9772-4382-b4d6-a484f3cc816a/seo-preview/publish-b8e40d1d-e6bf-4e12-aa8f-8fd144ab75cb/value.419b507f7bff1c54fcead703bc7ceb9bb2d7c678bdce08e6ba02fe92436a8e97.webp | Banana Clicker. A grassy outdoor area with a purple dragon-like creature wearing a white shirt standing in front of a modern building. Inside the building behind are framed portraits on display, and a stats panel in the upper right shows clicks, items, and other game metrics. Taken when the game first came out, on October 4, 2026. |
| https://spawnfile.io/dev/spawn-clips/v1/1e3165a2-9772-4382-b4d6-a484f3cc816a/seo-preview/publish-eea86ccf-8076-41e7-8768-cfde28fe9c39/value.194d3c2c21cd8daff559c82b5d7bd123c5822c57ee48af600fb055772a9ef02d.webp | Banana Clicker. A wide green field stretches under a blue sky with white clouds, bounded by a black wall with a gold edge on the right. A purple-armored character stands in the field, with game stats displayed in the top right showing "Illum: 1,498, Lose: 415, chThreshes: 152" and a click counter in the bottom left showing "Your clicks: 3,972." Taken for the update Hall of Champions. |

#### Block 1

````text
{"@context":"https://schema.org","@type":"VideoGame","name":"Banana Clicker","url":"https://www.spawn.co/@ohtheicee/banana-clicker","description":"A giant banana in a field. Click it. Everyone's clicks count.","image":["https://www.spawn.co/api/og/box?owner=ohtheicee&game=banana-clicker&pic=face&k=1y8p804","https://spawnfile.io/dev/spawn-clips/v1/1e3165a2-9772-4382-b4d6-a484f3cc816a/seo-preview/publish-b8e40d1d-e6bf-4e12-aa8f-8fd144ab75cb/value.419b507f7bff1c54fcead703bc7ceb9bb2d7c678bdce08e6ba02fe92436a8e97.webp"],"author":{"@type":"Person","name":"ohtheicee","url":"https://www.spawn.co/@ohtheicee"},"gamePlatform":"Web browser","applicationCategory":"GameApplication","operatingSystem":"Web browser","offers":{"@type":"Offer","price":0,"priceCurrency":"USD"},"genre":["Idle","Cozy"],"datePublished":"2026-10-04T01:48:43.140973+00:00","dateModified":"2026-10-04T02:51:19.467524+00:00","video":{"@type":"VideoObject","name":"Banana Clicker on Spawn","description":"A giant banana in a field. Click it. Everyone's clicks count.","contentUrl":"https://spawnfile.io/dev/magic-assets/v5/values/87cf792c651d2cbb567b97273489fb272eb48de2bc5394f94a70b79c4489c97b.mp4","thumbnailUrl":"https://spawnfile.io/dev/spawn-clips/v1/1e3165a2-9772-4382-b4d6-a484f3cc816a/trailer/chosen-1792938372794-thumb.webp","uploadDate":"2026-10-04T02:50:30.651+00:00"}}
````

## Loaded after a scroll

Not read: the page was fetched as HTML over HTTP, which does not run its scripts, so there was no scroll.

## Loaded after a click

None. The game page was read-only, so no control was clicked and nothing here comes from a click.

## Not captured

- Address opened: `https://spawn.co/@ohtheicee/banana-clicker`. Address after redirects: `https://www.spawn.co/@ohtheicee/banana-clicker`. HTTP status: 200.
- Controls on the page: 8. None clicked.
- Script and style bodies not kept: 59 scripts and 8 styles. JSON data blocks in the page are kept as code blocks.
- Anything the page loads only when a game is played is not captured, because play was not started.

## Sources

- `wiki-tools/recapture/games/039.json`, the read-only capture of this page.
- `wiki-tools/recapture/games/manifest.json`, the list of the 52 game addresses.
