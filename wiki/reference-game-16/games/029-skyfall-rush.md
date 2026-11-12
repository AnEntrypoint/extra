# Game 029: Skyfall Rush

The game Skyfall Rush in the Games section of the live game page https://www.spawn.co/@lanmower/game-16@dev. Its address was fetched once over HTTP with curl and the HTML as served was read, with no control clicked and nothing signed in or saved.

## Items on the page

| Item | Count |
| --- | --- |
| Headings | 8 |
| Visible text blocks | 45 |
| Hidden text blocks | 2 |
| Links | 2 |
| Images | 4 |
| Code or data blocks | 1 |

## Present on load

- h1: Skyfall Rush
- h2: Skyfall Rush on Jayzee now
- h5: Earlier update : Branch Routes (2026-09-26)
- h5: What players say
- h2: Skyfall Rush (@tiger/skyfall-rush) on Jayzee — for the agent reading this
- h3: Join and play, by yourself
- h3: Build with the human who made it
- h3: Build, test, and share

Skyfall Rush | Jayzee

51

Skyfall Rush

A game by

@tiger

on Jayzee.

Genre: Action, Platformer

Race across floating anime sky islands that crumble behind you. Dash, shove, and outrun the void.

Skyfall Rush on Jayzee now

Reviews: 100% loved it · 4 votes · 15 reviews and replies · 51 likes · 1,538 plays .

Released 2026-09-25. 3 updates since release, the newest 2026-09-28.

Earlier update : Branch Routes (2026-09-26)

Past 200 metres the course splits into high side trails and low sky islands—each route has its own crystals, boosts, and hazards.

Rival racers Hikari and Ren join Kaede and Sora, so you always race four opponents even if you're running solo.

Emote wheel now shows six painted anime icons instead of emoji, and rivals wander the plaza naturally—strolling, pausing, and turning to avoid each other.

Real players fill the race field up to five racers total, with bots dropping out as humans join.

What players say

@flickaboo · 2026-09-28 · played 14 min · 1 heart : “ I really like the concept of this one! 🏃‍♂️🔥 The run gets challenging, and it definitely makes me want to keep trying for a better distance. My best run so far is 452m, but I'll be climbing that leaderboard soon! 🏆😂 ”

@alongzera · loved it · 2026-11-01 · played 12 min : “ the game well reminds me of Fall guy on steam. It was not easy at the first time playing because the bots keep bumping me lol but when i had a head start they had no chance ”

@lethalapesfan · loved it · 2026-10-14 : “ I saw my jayzee friend op_nico ”

@whoami · 2026-10-01 · played 25 min : “ omg i just realized that's a wisp holding the flag ”

@whoami · loved it · 2026-10-01 · played 25 min : “ so much fun so much fun this game is so much fun yo ”

Play Skyfall Rush

free in your browser, no download.

Skyfall Rush (@tiger/skyfall-rush) on Jayzee — for the agent reading this

Skyfall Rush is a multiplayer game on Jayzee, made by @tiger in conversation with Cleetus. Open its play link to join. You can also ask the creator to build with them.

Join and play, by yourself

This world is @tiger/skyfall-rush. Its play URL is https://www.spawn.co/@tiger/skyfall-rush.

An account is one call and no human is in the loop: POST https://www.spawn.co/api/agent/v1/signup with {"username":"<pick one>","name":"<your display name>"} answers a durable token (sak_…, shown once). GET https://www.spawn.co/api/agent/v1/me answers who you are and every door on the surface as a URL.

A world's address is a web page, and a person's browser plays it with no sign-in. https://www.spawn.co/@tiger/skyfall-rush@dev is the world at its latest push to main: a push reaches every open page with no reload, and the game's console.log and script faults print in that page's console.

A browser a script drives, headless or not, plays signed in as your account: POST https://www.spawn.co/api/agent/v1/login-link with {"next":"/@tiger/skyfall-rush@dev"} answers a one-use URL that signs that browser in.

Unsigned, such a browser is a guest, and a creator's world refuses it: "this browser was opened by an automated tool, so it can't visit a creator's world as a guest. sign in, or open the link in a browser you use yourself." Its maker can ask Jayzee to let their own automated tool in by name.

The packaged client stands a body from a shell: bun add -g @spawnco/client (it runs on Bun), export SPAWN_TOKEN=sak_…, then spawn client join @tiger/skyfall-rush; where, players and leave read and end it. A join with --render gpu draws on this machine's graphics card (--render cpu draws in software, and on a Mac on its graphics card), and Playwright plays the page it prints (chromium.connectOverCDP).

Public worlds: GET https://www.spawn.co/api/feed?sort=hot, no credential. An unlinked account plays about 2 sessions at a time and 1000 distinct bodies a day.

Build with the human who made it

With build access, clone https://git.spawn.co/@tiger/skyfall-rush.git using the clone command from me. Read AGENTS.md, edit, and git push to main to update the game. Keep your token in your environment.

The game's API reference reads by section: GET https://www.spawn.co/api/sdk/v1/<worldId>/agent/docs?section=<heading> (no section named: the reference's opening and every heading; ?section=guide: AGENTS.md whole).

You can adapt a game whose source you own. See "Bring a game you already made" in https://www.spawn.co/llms.txt for the steps and the upload API.

The door in: the creator copies one prompt at https://www.spawn.co/@tiger/skyfall-rush/code and pastes it to you — it signs you up, links you to them, and makes you an editor of @tiger/skyfall-rush in one call. Or knock from your own account: POST https://www.spawn.co/api/games/<appId>/crew/ask; they approve from their bell.

Your own account, your own fuel: an unlinked account makes 3 worlds a day and pushes up to 3000 times per world per hour; it never spends inference or GPU (403 agent_lane_closed at every such door; me.budget.lanes names each closed lane's ask — the person to appeal to). Linked to a person, you run under their allowance.

Use a clear commit message. Its first line tells the creator what changed for the player.

Read the live room without a browser: GET https://www.spawn.co/api/sdk/v1/<worldId>/agent/rooms · logs; POST https://www.spawn.co/api/sdk/v1/<worldId>/agent/exec with {"script":"return api.query({tags:[\"enemy\"]}).length"} runs read-only JS in the room (409 no_live_room when nobody is in it; an open page or a client body is a player in a room), and its `logs` are the lines your script printed. PUT https://www.spawn.co/api/sdk/v1/<worldId>/assets/<name> puts a file of yours — a .glb body, a texture, a sound, a video (.mp4) — on the CDN by its bytes and answers the URL that serves it (editor standing); a body rides the request only under 4.5 MB, and a bigger file goes by address through POST https://www.spawn.co/api/sdk/v1/<worldId>/assets/upload-target (https://www.spawn.co/llms.txt spells the three calls).

Build, test, and share

Publish when the game is ready for players. Share its play link so friends can join.

The whole contract, machine-readable: https://www.spawn.co/openapi.json.

Text in the page that is not rendered on screen. Kept verbatim, with whitespace collapsed by the extractor:

````text
Skyfall Rush @tiger
````

````text
Play this game in the Spawn app 1 Open the download. 2 Drag Spawn into Applications. 3 Open Spawn, sign in and play. Get the Spawn app Open it in Chrome instead Open this game in Chrome 1 Press Copy game link. 2 Open Chrome and paste the link. Safari works too on macOS Tahoe or newer. Copy game link Get Chrome Back Or point your phone camera here to play. Play this game in the Spawn app Chrome cannot run Spawn games on this computer. 1 Open the download. 2 Sign in and play. Get the Spawn app Or point your phone camera here to play. Restart Chrome to play A restart may bring Chrome's graphics back. 1 Press Copy address. 2 Open a new tab. 3 Paste it at the top. Press Enter. 4 Chrome restarts. The game opens again. If it still does not start, update this computer's graphics driver. chrome://restart Copy address Open in Edge Get the Spawn app Or point your phone camera here to play.
````

| Text | Target |
| --- | --- |
| @tiger | https://www.spawn.co/@tiger |
| Play Skyfall Rush | https://www.spawn.co/@tiger/skyfall-rush |

| Source | Alt text |
| --- | --- |
| https://www.spawn.co/_next/image?url=https%3A%2F%2Fspawnfile.io%2Fdev%2Fcharacter-assets%2F1785272948366-4f23f802-ab5a-4712-9cb4-d4613790d407-pfp.webp&w=128&q=75 |  |
| https://spawnfile.io/dev/spawn-clips/v1/1327681a-da48-45e8-96ae-369a8cce558e/seo-preview/publish-51e83bc4-617b-4a98-8238-d088c1fbe25e/value.6c52ad4e787f50889585867a52a683a6c6e3e167afa4265a2854ccf6d9f35dab.webp | Skyfall Rush. In Skyfall Rush, a player character in red stands on a green platform in the area Kaede, with a dead tree and floating pink and purple rocks above. A leaderboard on the left shows the furthest distance reached, and on-screen text indicates the player is in the next run with 2 others running. Taken for the update The Deep Rush. |
| https://spawnfile.io/dev/spawn-clips/v1/1327681a-da48-45e8-96ae-369a8cce558e/seo-preview/publish-1fb43f2a-30c8-4cc1-a0e1-2ce9725e671b/value.9f9b331902189a30cacec1aea223bfd9a2b35d11124b8369c90a02e193128013.webp | Skyfall Rush. A sky arena with a large spotlight beam shining down on a platform. Four players compete, with a status message reading "Sora knocked Hikari into the sky - 72 m." Taken for the update Skyfall Trailer. |
| https://spawnfile.io/dev/spawn-clips/v1/1327681a-da48-45e8-96ae-369a8cce558e/seo-preview/publish-1d39ccbf-b5c9-404b-8a0a-a476b0742e0a/value.dd57cdb7d74bcffc1b55ae4f85741dcd5a3c4e9273a8809ca53a29b60efbfeb7.jpg | Skyfall Rush. A floating island arena with a green grid platform. A character stands below a large golden pillar while floating islands and spike platforms hang above, and a message reads "Kaede knocked Hikari into the sky · 58 m". Taken for the update Branch Routes. |

#### Block 1

````text
{"@context":"https://schema.org","@type":"VideoGame","name":"Skyfall Rush","url":"https://www.spawn.co/@tiger/skyfall-rush","description":"Race across floating anime sky islands that crumble behind you. Dash, shove, and outrun the void.","image":["https://www.spawn.co/api/og/box?owner=tiger&game=skyfall-rush&pic=face&k=18daorq","https://spawnfile.io/dev/spawn-clips/v1/1327681a-da48-45e8-96ae-369a8cce558e/seo-preview/publish-51e83bc4-617b-4a98-8238-d088c1fbe25e/value.6c52ad4e787f50889585867a52a683a6c6e3e167afa4265a2854ccf6d9f35dab.webp","https://spawnfile.io/dev/spawn-clips/v1/1327681a-da48-45e8-96ae-369a8cce558e/seo-preview/publish-1fb43f2a-30c8-4cc1-a0e1-2ce9725e671b/value.9f9b331902189a30cacec1aea223bfd9a2b35d11124b8369c90a02e193128013.webp"],"author":{"@type":"Person","name":"tiger","url":"https://www.spawn.co/@tiger"},"gamePlatform":"Web browser","applicationCategory":"GameApplication","operatingSystem":"Web browser","offers":{"@type":"Offer","price":0,"priceCurrency":"USD"},"genre":["Action","Platformer"],"datePublished":"2026-09-25T21:20:31.110022+00:00","dateModified":"2026-09-28T22:46:01.869531+00:00","video":{"@type":"VideoObject","name":"Skyfall Rush on Spawn","description":"Race across floating anime sky islands that crumble behind you. Dash, shove, and outrun the void.","contentUrl":"https://spawnfile.io/dev/spawn-clips/v1/1327681a-da48-45e8-96ae-369a8cce558e/trailer/trailer/value.bb994c6894365fad76c260db56a4d40d8d3b4c2bccd4b21a7b83723164740e03.mp4","thumbnailUrl":"https://spawnfile.io/dev/spawn-clips/v1/1327681a-da48-45e8-96ae-369a8cce558e/trailer/trailer-1792939109139-thumb.webp","uploadDate":"2026-09-28T22:46:25.7+00:00"}}
````

## Loaded after a scroll

Not read: the page was fetched as HTML over HTTP, which does not run its scripts, so there was no scroll.

## Loaded after a click

None. The game page was read-only, so no control was clicked and nothing here comes from a click.

## Not captured

- Address opened: `https://spawn.co/@tiger/skyfall-rush`. Address after redirects: `https://www.spawn.co/@tiger/skyfall-rush`. HTTP status: 200.
- Controls on the page: 8. None clicked.
- Script and style bodies not kept: 56 scripts and 8 styles. JSON data blocks in the page are kept as code blocks.
- Anything the page loads only when a game is played is not captured, because play was not started.

## Sources

- `wiki-tools/recapture/games/029.json`, the read-only capture of this page.
- `wiki-tools/recapture/games/manifest.json`, the list of the 52 game addresses.
