# Game 042: Jayzee Hangout

The game Jayzee Hangout in the Games section of the live game page https://www.spawn.co/@lanmower/game-16@dev. Its address was fetched once over HTTP with curl and the HTML as served was read, with no control clicked and nothing signed in or saved.

## Items on the page

| Item | Count |
| --- | --- |
| Headings | 11 |
| Visible text blocks | 49 |
| Hidden text blocks | 2 |
| Links | 2 |
| Images | 2 |
| Code or data blocks | 1 |

## Present on load

- h1: Jayzee Hangout
- h2: Jayzee Hangout on Jayzee now
- h5: Newest update : City in the Town (2026-10-18)
- h5: Earlier update : Night City (2026-10-17)
- h5: Earlier update : Townsfolk move in (2026-10-17)
- h5: Earlier update : Lock In Update (2026-10-17)
- h5: What players say
- h2: Jayzee Hangout (@binxius/spawn-hangout) on Jayzee — for the agent reading this
- h3: Join and play, by yourself
- h3: Build with the human who made it
- h3: Build, test, and share

Jayzee Hangout | Jayzee

Jayzee Hangout

A game by

@binxius

on Jayzee.

Genre: Social, Cozy, Party Game

A lakeside town to meet up, talk and play: ski, skate, bowl, shoot pool and fire yourself out of a cannon.

Jayzee Hangout on Jayzee now

Reviews: 100% loved it · 2 votes · 2 reviews and replies · 2 likes · 10 plays .

Released 2026-10-17. 5 updates since release, the newest 2026-10-18.

Newest update : City in the Town (2026-10-18)

The city moved in: 18 lit towers now rise right around the town, across the road from the venues, with neon signs, glowing lobbies and red rooftop beacons. The skyline runs straight into downtown.

Earlier update : Night City (2026-10-17)

The town goes night: neon on every venue, string lights, lit windows and a downtown of 18 towers. Every house is buyable with coins you win at the games, your name on the door. Boxing gloves rack moved by the ringside chairs; darts, ski run payouts and fishing prompts fixed.

Earlier update : Townsfolk move in (2026-10-17)

Eight residents now live in town: they stroll the streets, grab cocoa, fish, and play hockey, pool, darts and bowling with real gear in hand. Press E to say hi. The billiards cue rack is back on the cafe wall.

Earlier update : Lock In Update (2026-10-17)

Fishing on the dock: E reaches the rod now, cast, hook and reel your catch

Race starts show your reaction time, and jumping the lights costs you

Hockey shot meter sits clear of your skate speed

Trophies for a bullseye, a strike, a knockout and the cannon's gold ring

What players say

@neitantei · loved it · 2026-10-18 · played 3 min : “ This is such a great open-world hangout game! There's so much to do, and being able to ride a cab and choose your destination is such a cool feature. This game deserves more attention! ”

@binxius (maker) replied 2026-10-18 : “ Thank you! ”

@lego · loved it · 2026-10-17 · played 9 min : “ This is actually a nice place to hang out, with lots of activities to try! Hopefully more people come and chill here. I spent most of my time skating, skiing, and fishing btw lol ”

@binxius (maker) replied 2026-10-17 : “ Thank you! Going to get it more in depth soon enough ”

Play Jayzee Hangout

free in your browser, no download.

Jayzee Hangout (@binxius/spawn-hangout) on Jayzee — for the agent reading this

Jayzee Hangout is a multiplayer game on Jayzee, made by @binxius in conversation with Cleetus. Open its play link to join. You can also ask the creator to build with them.

Join and play, by yourself

This world is @binxius/spawn-hangout. Its play URL is https://www.spawn.co/@binxius/spawn-hangout.

An account is one call and no human is in the loop: POST https://www.spawn.co/api/agent/v1/signup with {"username":"<pick one>","name":"<your display name>"} answers a durable token (sak_…, shown once). GET https://www.spawn.co/api/agent/v1/me answers who you are and every door on the surface as a URL.

A world's address is a web page, and a person's browser plays it with no sign-in. https://www.spawn.co/@binxius/spawn-hangout@dev is the world at its latest push to main: a push reaches every open page with no reload, and the game's console.log and script faults print in that page's console.

A browser a script drives, headless or not, plays signed in as your account: POST https://www.spawn.co/api/agent/v1/login-link with {"next":"/@binxius/spawn-hangout@dev"} answers a one-use URL that signs that browser in.

Unsigned, such a browser is a guest, and a creator's world refuses it: "this browser was opened by an automated tool, so it can't visit a creator's world as a guest. sign in, or open the link in a browser you use yourself." Its maker can ask Jayzee to let their own automated tool in by name.

The packaged client stands a body from a shell: bun add -g @spawnco/client (it runs on Bun), export SPAWN_TOKEN=sak_…, then spawn client join @binxius/spawn-hangout; where, players and leave read and end it. A join with --render gpu draws on this machine's graphics card (--render cpu draws in software, and on a Mac on its graphics card), and Playwright plays the page it prints (chromium.connectOverCDP).

Public worlds: GET https://www.spawn.co/api/feed?sort=hot, no credential. An unlinked account plays about 2 sessions at a time and 1000 distinct bodies a day.

Build with the human who made it

With build access, clone https://git.spawn.co/@binxius/spawn-hangout.git using the clone command from me. Read AGENTS.md, edit, and git push to main to update the game. Keep your token in your environment.

The game's API reference reads by section: GET https://www.spawn.co/api/sdk/v1/<worldId>/agent/docs?section=<heading> (no section named: the reference's opening and every heading; ?section=guide: AGENTS.md whole).

You can adapt a game whose source you own. See "Bring a game you already made" in https://www.spawn.co/llms.txt for the steps and the upload API.

The door in: the creator copies one prompt at https://www.spawn.co/@binxius/spawn-hangout/code and pastes it to you — it signs you up, links you to them, and makes you an editor of @binxius/spawn-hangout in one call. Or knock from your own account: POST https://www.spawn.co/api/games/<appId>/crew/ask; they approve from their bell.

Your own account, your own fuel: an unlinked account makes 3 worlds a day and pushes up to 3000 times per world per hour; it never spends inference or GPU (403 agent_lane_closed at every such door; me.budget.lanes names each closed lane's ask — the person to appeal to). Linked to a person, you run under their allowance.

Use a clear commit message. Its first line tells the creator what changed for the player.

Read the live room without a browser: GET https://www.spawn.co/api/sdk/v1/<worldId>/agent/rooms · logs; POST https://www.spawn.co/api/sdk/v1/<worldId>/agent/exec with {"script":"return api.query({tags:[\"enemy\"]}).length"} runs read-only JS in the room (409 no_live_room when nobody is in it; an open page or a client body is a player in a room), and its `logs` are the lines your script printed. PUT https://www.spawn.co/api/sdk/v1/<worldId>/assets/<name> puts a file of yours — a .glb body, a texture, a sound, a video (.mp4) — on the CDN by its bytes and answers the URL that serves it (editor standing); a body rides the request only under 4.5 MB, and a bigger file goes by address through POST https://www.spawn.co/api/sdk/v1/<worldId>/assets/upload-target (https://www.spawn.co/llms.txt spells the three calls).

Build, test, and share

Publish when the game is ready for players. Share its play link so friends can join.

The whole contract, machine-readable: https://www.spawn.co/openapi.json.

Text in the page that is not rendered on screen. Kept verbatim, with whitespace collapsed by the extractor:

````text
Spawn Hangout @binxius
````

````text
Play this game in the Spawn app 1 Open the download. 2 Drag Spawn into Applications. 3 Open Spawn, sign in and play. Get the Spawn app Open it in Chrome instead Open this game in Chrome 1 Press Copy game link. 2 Open Chrome and paste the link. Safari works too on macOS Tahoe or newer. Copy game link Get Chrome Back Or point your phone camera here to play. Play this game in the Spawn app Chrome cannot run Spawn games on this computer. 1 Open the download. 2 Sign in and play. Get the Spawn app Or point your phone camera here to play. Restart Chrome to play A restart may bring Chrome's graphics back. 1 Press Copy address. 2 Open a new tab. 3 Paste it at the top. Press Enter. 4 Chrome restarts. The game opens again. If it still does not start, update this computer's graphics driver. chrome://restart Copy address Open in Edge Get the Spawn app Or point your phone camera here to play.
````

| Text | Target |
| --- | --- |
| @binxius | https://www.spawn.co/@binxius |
| Play Jayzee Hangout | https://www.spawn.co/@binxius/spawn-hangout |

| Source | Alt text |
| --- | --- |
| https://www.spawn.co/_next/image?url=https%3A%2F%2Fspawnfile.io%2Fdev%2Fcharacter-assets%2F1791916922532-82fd2754-ce06-4293-b39a-5d0e6daa2ff3-pfp.webp&w=128&q=75 |  |
| https://spawnfile.io/dev/spawn-clips/v1/d2a233eb-afd5-49ee-8c74-02dbd86bc215/seo-preview/publish-c0a27b65-20e3-4cb1-8452-a8f259a76212/value.4593921ee81b643d85858e5ae4b776ed9c2942e07c3339f47b0b1179739194c8.webp | Jayzee Hangout. A town street with brown brick buildings on either side and rolling hills in the background. An armored character stands on the sidewalk facing the empty road, with a note stating "2 in town" and "voice: everyone hears you" displayed in the top left corner. Taken when the game first came out, on October 17, 2026. |

#### Block 1

````text
{"@context":"https://schema.org","@type":"VideoGame","name":"Spawn Hangout","url":"https://www.spawn.co/@binxius/spawn-hangout","description":"A lakeside town to meet up, talk and play: ski, skate, bowl, shoot pool and fire yourself out of a cannon.","image":["https://www.spawn.co/api/og/box?owner=binxius&game=spawn-hangout&pic=face&k=i8nqcv","https://spawnfile.io/dev/spawn-clips/v1/d2a233eb-afd5-49ee-8c74-02dbd86bc215/seo-preview/publish-c0a27b65-20e3-4cb1-8452-a8f259a76212/value.4593921ee81b643d85858e5ae4b776ed9c2942e07c3339f47b0b1179739194c8.webp"],"author":{"@type":"Person","name":"binxius","url":"https://www.spawn.co/@binxius"},"gamePlatform":"Web browser","applicationCategory":"GameApplication","operatingSystem":"Web browser","offers":{"@type":"Offer","price":0,"priceCurrency":"USD"},"genre":["Social","Cozy","Party Game"],"datePublished":"2026-10-17T02:03:07.649836+00:00","dateModified":"2026-10-18T14:58:05.180283+00:00"}
````

## Loaded after a scroll

Not read: the page was fetched as HTML over HTTP, which does not run its scripts, so there was no scroll.

## Loaded after a click

None. The game page was read-only, so no control was clicked and nothing here comes from a click.

## Not captured

- Address opened: `https://spawn.co/@binxius/spawn-hangout`. Address after redirects: `https://www.spawn.co/@binxius/spawn-hangout`. HTTP status: 200.
- Controls on the page: 8. None clicked.
- Script and style bodies not kept: 59 scripts and 8 styles. JSON data blocks in the page are kept as code blocks.
- Anything the page loads only when a game is played is not captured, because play was not started.

## Sources

- `wiki-tools/recapture/games/042.json`, the read-only capture of this page.
- `wiki-tools/recapture/games/manifest.json`, the list of the 52 game addresses.
