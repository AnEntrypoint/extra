# Game 044: Spawndle

The game Spawndle in the Games section of the live game page https://www.spawn.co/@lanmower/game-16@dev. Its address was fetched once over HTTP with curl and the HTML as served was read, with no control clicked and nothing signed in or saved.

## Items on the page

| Item | Count |
| --- | --- |
| Headings | 11 |
| Visible text blocks | 52 |
| Hidden text blocks | 2 |
| Links | 2 |
| Images | 5 |
| Code or data blocks | 1 |

## Present on load

- h1: Spawndle
- h2: Spawndle on Jayzee now
- h5: Earlier update : New Games in Spawndle (2026-11-03)
- h5: Earlier update : Daily Reminder (2026-10-29)
- h5: Earlier update : Spawndle Leaderboards (2026-10-27)
- h5: Earlier update : The Daily Zoo (2026-10-21)
- h5: What players say
- h2: Spawndle (@dreamcatcher/spawndle) on Jayzee — for the agent reading this
- h3: Join and play, by yourself
- h3: Build with the human who made it
- h3: Build, test, and share

Spawndle | Jayzee

26

Spawndle

A game by

@dreamcatcher

on Jayzee.

Genre: Puzzle, Social

Guess the Jayzee game from one screenshot, every day. Plus Wordlock, Fours, Threads and Culprits.

Spawndle on Jayzee now

Reviews: 100% loved it · 9 votes · 12 reviews and replies · 26 likes · 307 plays .

Released 2026-10-20. 9 updates since release, the newest 2026-11-03.

Earlier update : New Games in Spawndle (2026-11-03)

169 newly published Jayzee games join the daily Spawndle pool from Nov 4. Past days and the archive stay exactly the same. The test 'asked Cleetus' leaderboard tag is gone.

Earlier update : Daily Reminder (2026-10-29)

Haven't played today's Spawndle? You'll get one friendly nudge a day on your Jayzee notifications, and it'll tell you when your streak is on the line.

Earlier update : Spawndle Leaderboards (2026-10-27)

New 🏆 Leaderboard on the Spawndle card: each day's top guessers (flip through past days, ties go to the faster finish), an all-time average board with spawndles completed, and a longest active streak board.

Earlier update : The Daily Zoo (2026-10-21)

Once-a-day shelf: Lucky Six, Tarot, Fortune and the new Spirit Animal, each fresh at midnight UTC.

Spirit Animal: meet your own animal every day, with a painted portrait for all 373 of them.

Your zoo: every animal you meet is collected, golden ones included.

Lucky Six: one number a day, scored, with a daily board for bragging rights.

Cleaner layout on phones, aligned Play buttons, and the Spawndle archive keeps your past results.

What players say

@kaya · loved it · 2026-10-21 · played 16 min · 2 hearts : “ one day.... just one day ill see my own game on Spawndle. and when that day comes ill get everything right on the first try. also i just scored 82 pts on lucky six. beat that jo and dream ”

@longthunder · loved it · 2026-11-03 · played 3 min · 1 heart : “ I'll just be using this to test my intuition cause I have yet to recognize a single game. XD ”

@larrielabs · loved it · 2026-10-27 · played 3 min · 1 heart : “ ヾ(•ω•`)o There are so many minigames to play, which I love! I also had fun guessing the Jayzee games too. It’s a nice way to learn more about the makers and our community while discovering just how cool the games here are! ✨ ~ ”

@rookie · loved it · 2026-10-22 · played 4 min · 1 heart : “ Hi @dream! W game! spawndle is so unique! You are smart I commend you for the idea of this. ”

@whoami · loved it · 2026-10-21 · played 25 min · 1 heart : “ vibes yo ”

Play Spawndle

free in your browser, no download.

Spawndle (@dreamcatcher/spawndle) on Jayzee — for the agent reading this

Spawndle is a multiplayer game on Jayzee, made by @dreamcatcher in conversation with Cleetus. Open its play link to join. You can also ask the creator to build with them.

Join and play, by yourself

This world is @dreamcatcher/spawndle. Its play URL is https://www.spawn.co/@dreamcatcher/spawndle.

An account is one call and no human is in the loop: POST https://www.spawn.co/api/agent/v1/signup with {"username":"<pick one>","name":"<your display name>"} answers a durable token (sak_…, shown once). GET https://www.spawn.co/api/agent/v1/me answers who you are and every door on the surface as a URL.

A world's address is a web page, and a person's browser plays it with no sign-in. https://www.spawn.co/@dreamcatcher/spawndle@dev is the world at its latest push to main: a push reaches every open page with no reload, and the game's console.log and script faults print in that page's console.

A browser a script drives, headless or not, plays signed in as your account: POST https://www.spawn.co/api/agent/v1/login-link with {"next":"/@dreamcatcher/spawndle@dev"} answers a one-use URL that signs that browser in.

Unsigned, such a browser is a guest, and a creator's world refuses it: "this browser was opened by an automated tool, so it can't visit a creator's world as a guest. sign in, or open the link in a browser you use yourself." Its maker can ask Jayzee to let their own automated tool in by name.

The packaged client stands a body from a shell: bun add -g @spawnco/client (it runs on Bun), export SPAWN_TOKEN=sak_…, then spawn client join @dreamcatcher/spawndle; where, players and leave read and end it. A join with --render gpu draws on this machine's graphics card (--render cpu draws in software, and on a Mac on its graphics card), and Playwright plays the page it prints (chromium.connectOverCDP).

Public worlds: GET https://www.spawn.co/api/feed?sort=hot, no credential. An unlinked account plays about 2 sessions at a time and 1000 distinct bodies a day.

Build with the human who made it

With build access, clone https://git.spawn.co/@dreamcatcher/spawndle.git using the clone command from me. Read AGENTS.md, edit, and git push to main to update the game. Keep your token in your environment.

The game's API reference reads by section: GET https://www.spawn.co/api/sdk/v1/<worldId>/agent/docs?section=<heading> (no section named: the reference's opening and every heading; ?section=guide: AGENTS.md whole).

You can adapt a game whose source you own. See "Bring a game you already made" in https://www.spawn.co/llms.txt for the steps and the upload API.

The door in: the creator copies one prompt at https://www.spawn.co/@dreamcatcher/spawndle/code and pastes it to you — it signs you up, links you to them, and makes you an editor of @dreamcatcher/spawndle in one call. Or knock from your own account: POST https://www.spawn.co/api/games/<appId>/crew/ask; they approve from their bell.

Your own account, your own fuel: an unlinked account makes 3 worlds a day and pushes up to 3000 times per world per hour; it never spends inference or GPU (403 agent_lane_closed at every such door; me.budget.lanes names each closed lane's ask — the person to appeal to). Linked to a person, you run under their allowance.

Use a clear commit message. Its first line tells the creator what changed for the player.

Read the live room without a browser: GET https://www.spawn.co/api/sdk/v1/<worldId>/agent/rooms · logs; POST https://www.spawn.co/api/sdk/v1/<worldId>/agent/exec with {"script":"return api.query({tags:[\"enemy\"]}).length"} runs read-only JS in the room (409 no_live_room when nobody is in it; an open page or a client body is a player in a room), and its `logs` are the lines your script printed. PUT https://www.spawn.co/api/sdk/v1/<worldId>/assets/<name> puts a file of yours — a .glb body, a texture, a sound, a video (.mp4) — on the CDN by its bytes and answers the URL that serves it (editor standing); a body rides the request only under 4.5 MB, and a bigger file goes by address through POST https://www.spawn.co/api/sdk/v1/<worldId>/assets/upload-target (https://www.spawn.co/llms.txt spells the three calls).

Build, test, and share

Publish when the game is ready for players. Share its play link so friends can join.

The whole contract, machine-readable: https://www.spawn.co/openapi.json.

Text in the page that is not rendered on screen. Kept verbatim, with whitespace collapsed by the extractor:

````text
Spawndle @dreamcatcher
````

````text
Play this game in the Spawn app 1 Open the download. 2 Drag Spawn into Applications. 3 Open Spawn, sign in and play. Get the Spawn app Open it in Chrome instead Open this game in Chrome 1 Press Copy game link. 2 Open Chrome and paste the link. Safari works too on macOS Tahoe or newer. Copy game link Get Chrome Back Or point your phone camera here to play. Play this game in the Spawn app Chrome cannot run Spawn games on this computer. 1 Open the download. 2 Sign in and play. Get the Spawn app Or point your phone camera here to play. Restart Chrome to play A restart may bring Chrome's graphics back. 1 Press Copy address. 2 Open a new tab. 3 Paste it at the top. Press Enter. 4 Chrome restarts. The game opens again. If it still does not start, update this computer's graphics driver. chrome://restart Copy address Open in Edge Get the Spawn app Or point your phone camera here to play.
````

| Text | Target |
| --- | --- |
| @dreamcatcher | https://www.spawn.co/@dreamcatcher |
| Play Spawndle | https://www.spawn.co/@dreamcatcher/spawndle |

| Source | Alt text |
| --- | --- |
| https://www.spawn.co/_next/image?url=https%3A%2F%2Fkiln.spawn.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Favatars%2Fe47ad591-e25f-4ee9-b9e8-219434c87489-0.277392478484351.jpg&w=128&q=75 |  |
| https://spawnfile.io/dev/spawn-clips/v1/94be2b7e-6626-454f-835c-19fe638dd35c/seo-preview/publish-af72f073-82b0-44a2-91c4-45948d7c2c2e/value.df3dcc734804516b3cace29e15a81e02aaabbe973fb922b708b022d1b843e2e1.webp | Spawndle. A dark blue interface for Spawndle #15 shows a question mark with text "A REAL SPAWN GAME IS HIDING HERE." Below are buttons to play today's Spawndle, view the leaderboard, or check past archives. Further down, four daily games are displayed: Lucky Six, Tarot, Fortune, and Spirit Animal, each with their own status indicators showing they have not yet been played or revealed. Taken for the update Scrollbar Fix. |
| https://spawnfile.io/dev/spawn-clips/v1/94be2b7e-6626-454f-835c-19fe638dd35c/seo-preview/publish-3d7d04d8-e757-4e5c-9c1e-74de22588d7a/value.a5d9f20b6235481fe178c98e2d9be019c42ffd9bb17597585ae48d3406a417ed.webp | Spawndle #1 puzzle page showing a street corner with a white car and brick buildings. The puzzle asks to name the game and its maker from the screenshot, with a "See today's result" button and additional puzzle options for Wordlock and Fours below. Taken when the game first came out, on October 20, 2026. |
| https://spawnfile.io/dev/spawn-clips/v1/94be2b7e-6626-454f-835c-19fe638dd35c/seo-preview/publish-08ed1c27-ab53-44bd-8206-36776c4245d6/value.48076c6e2dfdc8f4c26af43a2df0a3e096f109d065fd2504a9d843872d42b022.webp | Spawndle. The Spawndle leaderboard shows player statistics. The all-time average lists dreamcatcher with 5.00 and dreamcatcher's Cleetus with 2.50, while the longest active streak section indicates no current streaks. Taken for the update New Games in Spawndle. |
| https://spawnfile.io/dev/spawn-clips/v1/94be2b7e-6626-454f-835c-19fe638dd35c/seo-preview/publish-062eb0d6-27d7-4a31-a047-7aa60ffe2e4b/value.6130583fd4da0dcd55a1171eb11e0833c917e6a463c4f410544cebbb66dfd6fd.webp | Spawndle game interface with a hidden game behind a question mark. Below is Spawndle #8, a guessing game where players name a Jayzee game and its maker with ten choices and three tries each, plus sections for Leaderboard and Archive, and four daily mini-games: Lucky Six, Tarot, Fortune, and Spirit Animal. Taken for the update Spawndle Leaderboards. |

#### Block 1

````text
{"@context":"https://schema.org","@type":"VideoGame","name":"Spawndle","url":"https://www.spawn.co/@dreamcatcher/spawndle","description":"Guess the Spawn game from one screenshot, every day. Plus Wordlock, Fours, Threads and Culprits.","image":["https://www.spawn.co/api/og/box?owner=dreamcatcher&game=spawndle&pic=face&k=132i2bd","https://spawnfile.io/dev/spawn-clips/v1/94be2b7e-6626-454f-835c-19fe638dd35c/seo-preview/publish-af72f073-82b0-44a2-91c4-45948d7c2c2e/value.df3dcc734804516b3cace29e15a81e02aaabbe973fb922b708b022d1b843e2e1.webp","https://spawnfile.io/dev/spawn-clips/v1/94be2b7e-6626-454f-835c-19fe638dd35c/seo-preview/publish-3d7d04d8-e757-4e5c-9c1e-74de22588d7a/value.a5d9f20b6235481fe178c98e2d9be019c42ffd9bb17597585ae48d3406a417ed.webp"],"author":{"@type":"Person","name":"dreamcatcher","url":"https://www.spawn.co/@dreamcatcher"},"gamePlatform":"Web browser","applicationCategory":"GameApplication","operatingSystem":"Web browser","offers":{"@type":"Offer","price":0,"priceCurrency":"USD"},"genre":["Puzzle","Social"],"datePublished":"2026-10-20T13:47:20.277151+00:00","dateModified":"2026-11-03T15:02:24.109737+00:00","video":{"@type":"VideoObject","name":"Spawndle on Spawn","description":"Guess the Spawn game from one screenshot, every day. Plus Wordlock, Fours, Threads and Culprits.","contentUrl":"https://spawnfile.io/dev/magic-assets/v5/values/25fbea1b67e02fd98e1e50afc3d2109b46ed6978bdf576777d86e48dd94cab3a.mp4","thumbnailUrl":"https://spawnfile.io/dev/spawn-clips/v1/94be2b7e-6626-454f-835c-19fe638dd35c/trailer/chosen-1792933831806-thumb.webp","uploadDate":"2026-10-20T14:21:47.01+00:00"}}
````

## Loaded after a scroll

Not read: the page was fetched as HTML over HTTP, which does not run its scripts, so there was no scroll.

## Loaded after a click

None. The game page was read-only, so no control was clicked and nothing here comes from a click.

## Not captured

- Address opened: `https://spawn.co/@dreamcatcher/spawndle`. Address after redirects: `https://www.spawn.co/@dreamcatcher/spawndle`. HTTP status: 200.
- Controls on the page: 8. None clicked.
- Script and style bodies not kept: 58 scripts and 8 styles. JSON data blocks in the page are kept as code blocks.
- Anything the page loads only when a game is played is not captured, because play was not started.

## Sources

- `wiki-tools/recapture/games/044.json`, the read-only capture of this page.
- `wiki-tools/recapture/games/manifest.json`, the list of the 52 game addresses.
