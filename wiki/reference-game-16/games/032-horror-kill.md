# Game 032: Horror Kill

The game Horror Kill in the Games section of the live game page https://www.spawn.co/@lanmower/game-16@dev. Its address was fetched once over HTTP with curl and the HTML as served was read, with no control clicked and nothing signed in or saved.

## Items on the page

| Item | Count |
| --- | --- |
| Headings | 9 |
| Visible text blocks | 44 |
| Hidden text blocks | 2 |
| Links | 2 |
| Images | 4 |
| Code or data blocks | 1 |

## Present on load

- h1: Horror Kill
- h2: Horror Kill on Jayzee now
- h5: Newest update : Dodge Window (2026-10-05)
- h5: Earlier update : V1 Movement (2026-10-05)
- h5: What players say
- h2: Horror Kill (@nova_golem_79/horror-kill) on Jayzee — for the agent reading this
- h3: Join and play, by yourself
- h3: Build with the human who made it
- h3: Build, test, and share

Horror Kill | Jayzee

Horror Kill

A game by

@nova_golem_79

on Jayzee.

Genre: Horror, Shooter

Hold the graveyard fire against waves of horrors crawling out of the moor fog.

Horror Kill on Jayzee now

Reviews: 66% loved it · 3 votes · 3 reviews and replies · 3 likes · 10 plays .

Released 2026-10-04. 2 updates since release, the newest 2026-10-05.

Newest update : Dodge Window (2026-10-05)

You can now dodge through monster attacks during dashes and slides — time it right and you'll slip past their bite unscathed.

Earlier update : V1 Movement (2026-10-05)

Move like the machine itself—dash at full speed, wall-jump three times, slam the ground and bounce back up, all with stamina that drains and recharges.

Slide to lock your direction while keeping some sideways control, and chain it with jumps and dashes to break physics and keep your momentum.

Switch between first-person Normal view and a fixed third-person Clash camera that faces down a lane, perfect for platforming sections.

You'll always respawn after dying, even if you rejoin mid-death.

What players say

@neitantei · loved it · 2026-10-06 · played 54 min : “ I was scared of the monsters at first, but the fast movement made it so fun! 😂 Unlimited ammo is a nice touch, and I’m glad I figured out Siren Head’s weakness and survived all 5 waves! ”

@alongzera · loved it · 2026-10-04 · played 4 min : “ flashlight is not that useful when it gets dark as it doesnt really light up the place ”

@yujiro · needs work · 2026-10-04 · played 9 min : “ This game feels a little creepy, but the monsters look more like walking pictures. Adding animations to their movements and actions would make them feel more alive and a lot scarier. ”

Play Horror Kill

free in your browser, no download.

Horror Kill (@nova_golem_79/horror-kill) on Jayzee — for the agent reading this

Horror Kill is a multiplayer game on Jayzee, made by @nova_golem_79 in conversation with Cleetus. Open its play link to join. You can also ask the creator to build with them.

Join and play, by yourself

This world is @nova_golem_79/horror-kill. Its play URL is https://www.spawn.co/@nova_golem_79/horror-kill.

An account is one call and no human is in the loop: POST https://www.spawn.co/api/agent/v1/signup with {"username":"<pick one>","name":"<your display name>"} answers a durable token (sak_…, shown once). GET https://www.spawn.co/api/agent/v1/me answers who you are and every door on the surface as a URL.

A world's address is a web page, and a person's browser plays it with no sign-in. https://www.spawn.co/@nova_golem_79/horror-kill@dev is the world at its latest push to main: a push reaches every open page with no reload, and the game's console.log and script faults print in that page's console.

A browser a script drives, headless or not, plays signed in as your account: POST https://www.spawn.co/api/agent/v1/login-link with {"next":"/@nova_golem_79/horror-kill@dev"} answers a one-use URL that signs that browser in.

Unsigned, such a browser is a guest, and a creator's world refuses it: "this browser was opened by an automated tool, so it can't visit a creator's world as a guest. sign in, or open the link in a browser you use yourself." Its maker can ask Jayzee to let their own automated tool in by name.

The packaged client stands a body from a shell: bun add -g @spawnco/client (it runs on Bun), export SPAWN_TOKEN=sak_…, then spawn client join @nova_golem_79/horror-kill; where, players and leave read and end it. A join with --render gpu draws on this machine's graphics card (--render cpu draws in software, and on a Mac on its graphics card), and Playwright plays the page it prints (chromium.connectOverCDP).

Public worlds: GET https://www.spawn.co/api/feed?sort=hot, no credential. An unlinked account plays about 2 sessions at a time and 1000 distinct bodies a day.

Build with the human who made it

With build access, clone https://git.spawn.co/@nova_golem_79/horror-kill.git using the clone command from me. Read AGENTS.md, edit, and git push to main to update the game. Keep your token in your environment.

The game's API reference reads by section: GET https://www.spawn.co/api/sdk/v1/<worldId>/agent/docs?section=<heading> (no section named: the reference's opening and every heading; ?section=guide: AGENTS.md whole).

You can adapt a game whose source you own. See "Bring a game you already made" in https://www.spawn.co/llms.txt for the steps and the upload API.

The door in: the creator copies one prompt at https://www.spawn.co/@nova_golem_79/horror-kill/code and pastes it to you — it signs you up, links you to them, and makes you an editor of @nova_golem_79/horror-kill in one call. Or knock from your own account: POST https://www.spawn.co/api/games/<appId>/crew/ask; they approve from their bell.

Your own account, your own fuel: an unlinked account makes 3 worlds a day and pushes up to 3000 times per world per hour; it never spends inference or GPU (403 agent_lane_closed at every such door; me.budget.lanes names each closed lane's ask — the person to appeal to). Linked to a person, you run under their allowance.

Use a clear commit message. Its first line tells the creator what changed for the player.

Read the live room without a browser: GET https://www.spawn.co/api/sdk/v1/<worldId>/agent/rooms · logs; POST https://www.spawn.co/api/sdk/v1/<worldId>/agent/exec with {"script":"return api.query({tags:[\"enemy\"]}).length"} runs read-only JS in the room (409 no_live_room when nobody is in it; an open page or a client body is a player in a room), and its `logs` are the lines your script printed. PUT https://www.spawn.co/api/sdk/v1/<worldId>/assets/<name> puts a file of yours — a .glb body, a texture, a sound, a video (.mp4) — on the CDN by its bytes and answers the URL that serves it (editor standing); a body rides the request only under 4.5 MB, and a bigger file goes by address through POST https://www.spawn.co/api/sdk/v1/<worldId>/assets/upload-target (https://www.spawn.co/llms.txt spells the three calls).

Build, test, and share

Publish when the game is ready for players. Share its play link so friends can join.

The whole contract, machine-readable: https://www.spawn.co/openapi.json.

Text in the page that is not rendered on screen. Kept verbatim, with whitespace collapsed by the extractor:

````text
Horror Kill @nova_golem_79
````

````text
Play this game in the Spawn app 1 Open the download. 2 Drag Spawn into Applications. 3 Open Spawn, sign in and play. Get the Spawn app Open it in Chrome instead Open this game in Chrome 1 Press Copy game link. 2 Open Chrome and paste the link. Safari works too on macOS Tahoe or newer. Copy game link Get Chrome Back Or point your phone camera here to play. Play this game in the Spawn app Chrome cannot run Spawn games on this computer. 1 Open the download. 2 Sign in and play. Get the Spawn app Or point your phone camera here to play. Restart Chrome to play A restart may bring Chrome's graphics back. 1 Press Copy address. 2 Open a new tab. 3 Paste it at the top. Press Enter. 4 Chrome restarts. The game opens again. If it still does not start, update this computer's graphics driver. chrome://restart Copy address Open in Edge Get the Spawn app Or point your phone camera here to play.
````

| Text | Target |
| --- | --- |
| @nova_golem_79 | https://www.spawn.co/@nova_golem_79 |
| Play Horror Kill | https://www.spawn.co/@nova_golem_79/horror-kill |

| Source | Alt text |
| --- | --- |
| https://www.spawn.co/_next/image?url=https%3A%2F%2Fspawnfile.io%2Fdev%2Fcharacter-assets%2F1791103663268-e2cdff1d-cff7-42b7-8054-855b5fabc5a7-pfp.webp&w=128&q=75 |  |
| https://spawnfile.io/dev/spawn-clips/v1/55cf748a-1ac5-4fc4-a1c5-71aab550bbea/seo-preview/publish-441c505c-f9db-451b-97c9-7a22a41cd9fa/value.7e95eefb939fe97585592b5da9bb1423bba5ccf0b7fd2cfe200aacfc24e8ce32.webp | Horror Kill. A dark outdoor scene in fog during wave 2 of 5. A player character holds a glowing weapon while aiming at shadowy enemies in the distance. Taken for the update Dodge Window. |
| https://spawnfile.io/dev/spawn-clips/v1/55cf748a-1ac5-4fc4-a1c5-71aab550bbea/seo-preview/publish-e44c9504-2b33-4e69-8d57-54f6c3926fc4/value.baa03895ef29dfaafc419a70b55d695c8a5dd7a63828241f23d2c45055172415.webp | Horror Kill. A foggy graveyard at night with gravestones and a wooden fence. Bright explosions light up the left side of the scene, and the HUD shows Wave 2 of 5, Health 18, and Rounds 15. Taken when the game first came out, on October 4, 2026. |
| https://spawnfile.io/dev/spawn-clips/v1/55cf748a-1ac5-4fc4-a1c5-71aab550bbea/seo-preview/publish-6ad3ec78-5f46-4a58-ac86-5d02fc3a1a3c/value.ac371ef1bf4d2880d78e8cd248fead81a23d58262c7a19c3096ab17e34954f6b.webp | Horror Kill. A dark outdoor area at night with a campfire burning in the distance. The player holds a rifle in the foreground, with glowing eyes visible in the fog beyond the fire during Wave 1 of 5, with 4 enemies in the fog. Taken for the update V1 Movement. |

#### Block 1

````text
{"@context":"https://schema.org","@type":"VideoGame","name":"Horror Kill","url":"https://www.spawn.co/@nova_golem_79/horror-kill","description":"Hold the graveyard fire against waves of horrors crawling out of the moor fog.","image":["https://www.spawn.co/api/og/box?owner=nova_golem_79&game=horror-kill&pic=face&k=d6crsa","https://spawnfile.io/dev/spawn-clips/v1/55cf748a-1ac5-4fc4-a1c5-71aab550bbea/seo-preview/publish-441c505c-f9db-451b-97c9-7a22a41cd9fa/value.7e95eefb939fe97585592b5da9bb1423bba5ccf0b7fd2cfe200aacfc24e8ce32.webp","https://spawnfile.io/dev/spawn-clips/v1/55cf748a-1ac5-4fc4-a1c5-71aab550bbea/seo-preview/publish-e44c9504-2b33-4e69-8d57-54f6c3926fc4/value.baa03895ef29dfaafc419a70b55d695c8a5dd7a63828241f23d2c45055172415.webp"],"author":{"@type":"Person","name":"nova_golem_79","url":"https://www.spawn.co/@nova_golem_79"},"gamePlatform":"Web browser","applicationCategory":"GameApplication","operatingSystem":"Web browser","offers":{"@type":"Offer","price":0,"priceCurrency":"USD"},"genre":["Horror","Shooter"],"datePublished":"2026-10-04T08:47:47.963047+00:00","dateModified":"2026-10-05T07:27:56.120574+00:00"}
````

## Loaded after a scroll

Not read: the page was fetched as HTML over HTTP, which does not run its scripts, so there was no scroll.

## Loaded after a click

None. The game page was read-only, so no control was clicked and nothing here comes from a click.

## Not captured

- Address opened: `https://spawn.co/@nova_golem_79/horror-kill`. Address after redirects: `https://www.spawn.co/@nova_golem_79/horror-kill`. HTTP status: 200.
- Controls on the page: 8. None clicked.
- Script and style bodies not kept: 58 scripts and 8 styles. JSON data blocks in the page are kept as code blocks.
- Anything the page loads only when a game is played is not captured, because play was not started.

## Sources

- `wiki-tools/recapture/games/032.json`, the read-only capture of this page.
- `wiki-tools/recapture/games/manifest.json`, the list of the 52 game addresses.
