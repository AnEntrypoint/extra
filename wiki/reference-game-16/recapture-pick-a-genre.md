# Game page section: Pick A Genre: text not in the capture

The Pick a genre section of the toolbox, read on load, after a scroll, and after a click on each control that does not change state. Only text, headings, links, images and code that the first capture does not hold are listed.

## Items not in the capture

| Item | Count |
| --- | --- |
| Headings | 9 |
| Visible text blocks | 700 |
| Hidden text blocks | 0 |
| Links | 0 |
| Images | 0 |
| Code or data blocks | 155 |

## Present on load, not in the capture

None found on load.

## Loaded after a scroll, not in the capture

None found after the scroll.

## Loaded after a click, not in the capture

### After clicking "read →"

- H3: What it is here
- H3: Which starter and why
- H3: Skills it leans on
- H3: Animations it uses
- H3: Style families that suit it
- H3: Multiplayer shape
- H3: Games already made on Jayzee like it
- H3: What makes it hard
- H3: A taste of the code

← all genres

What it is here

A 3D action-adventure on Jayzee is a body you steer through a real place: hills from a heightmap, buildings built in code, enemies that notice you and come. You run, jump, roll and swing; things you hit squash, flash and drop; the camera kicks once on a hard blow and the world freezes for a heartbeat. The engine already carries the hard parts (physics, a walking character body, 61 humanoid animation clips, multiplayer by default), so the work is the adventure itself: where the player goes, what stands in the way, and how good it feels to win a fight. Think a short quest through a valley, a wave defence in a backyard, or a dungeon crawl with friends.

The player arrives at the jayzee point, sees the goal on the horizon (a tower, a lit gate, a glowing shrine) and gets one line of HUD text telling them what to do.

They walk out with WASD and the mouse, jump, and meet the first easy enemy within thirty seconds.

A fight: attack, block or roll, take a hit, land the finishing blow. The enemy dies with a burst, a sound and a damage number.

A reward: a pickup, a key, a new ability, a door that opens.

A harder stretch: more enemies, a hazard, a climb.

A boss or a final room, then a victory beat and a choice: go again, or carry on to the next area.

Which starter and why

3d ("3D world": first-person body, mouse look, jump, open sky, placeholder ground and grass). It is listed for exploration, shooters, adventure, racing and sandbox, and it is the right base here: the body, the camera, the jump and the gravity (-24 in the 3D starter) are already wired. You reshape it into third person with the cameras skill if you want to see your hero, and you replace the placeholder ground with real terrain. The block-world starter (3d-voxels) only suits an adventure where digging is the point.

Skills it leans on

cameras: first person, third person over the shoulder, or a fixed cinematic rig. Most action games want third person so the swing reads.

animations: plays the humanoid clips on your body and on enemies, by channel and weight, so an attack can play over a run.

game-feel: the difference between a hit and a tap. Squash on the struck thing, a burst from the contact point, one cameraPunch or screenShake, a tiny hitstop. A coin gets a chime and a "+1", never a camera kick.

projectiles: guns, arrows, fireballs. The shot is visible from muzzle to mark, the gun kicks and settles.

jev: minds for bosses and NPCs: patrol, notice, chase, telegraph an attack.

fx: sparks, slashes, explosions, fire and the light that rides them, within the particle budgets.

heightmap-terrain and geometry: the valley, the ruins, the gate, the creatures, all built in code.

interactive-objects: pickups, levers, doors and chests.

physics: ragdolls on a death, forces for a knockback.

Animations it uses

From the library: idle, walk, run, sprint, jump, fall, land for movement; attack, kick, throw, roll, block, cast, hit react and die for combat; climb, climb wall up, pickup for traversal and loot; victory, cheer and thumbs up for the win. Each plays from a file named after its id, like cdn/clip-attack.glb, on a named channel of the body:

cdn/clip-attack.glb

ctx.self.anim.main = { clip: "cdn/clip-run-loop.glb", loop: true, weight: 1 }; ctx.self.anim.swing = { clip: "cdn/clip-attack.glb", loop: false, weight: 1 }; // over the run

Style families that suit it

painterly-fantasy: soft greens and stone for a quest through old lands; the sound family carries swords and spells.

toon-vibrant: bright, punchy, readable at a glance; hits feel cartoon-big.

realistic-gritty: muted browns for a grounded survival-action or a war story.

scifi-neon: glowing blades and blasters, a city at night.

lowpoly-cozy: for a gentle adventure where fights are light and the world is the reward.

Multiplayer shape

Every Jayzee world is multiplayer by default: one room, main, that holds nearly unlimited players, and friends arrive by Jayzee's own invite. For co-op adventure that is often all you need: four friends in the same valley. If you want a dungeon run just for a party, a place with instance: party opens a private copy for the players standing at the door, and persistence: ephemeral lets it vanish when the last one leaves. A hit is judged on the striker's machine (target.state.hp -= d), so swings feel instant for whoever swings. If you want a solo story, set engine.networking.mode to singleplayer and no one else joins. Enemies are not bots filling seats; they are NPCs one manager script steps together.

instance: party

persistence: ephemeral

target.state.hp -= d

engine.networking.mode

The touch layout builds itself from your inputs: a stick from axes literally named moveX and moveZ, drag-to-look from lookX/lookY, and every key or mouse action becomes a chip, capped at four, ranked jump first. So declare jump, attack, block and roll and you have a playable phone layout. For aiming, the mobile-controls skill puts the aim on the fire chip itself: hold to aim, release to fire. Keep the verbs to four; a fifth one drops off the phone.

moveX

moveZ

Games already made on Jayzee like it

Whisker Brawl 3D (spawn.co/@tuanteku/whisker-brawl-3d): Pick a scrappy animal, grab absurd loot and brawl through every rival in the arena.

spawn.co/@tuanteku/whisker-brawl-3d

Garden Siege 3D (spawn.co/@rexgaming_yt/garden-siege-3d): Peashooters vs the undead: hold the backyard against ten waves of zombies.

spawn.co/@rexgaming_yt/garden-siege-3d

Call of the Soil (spawn.co/@ayon/call-of-the-soil-a-bengal-village-adventure): Roam a living Bangladeshi village, chat with neighbours, ride rickshaws and boats.

spawn.co/@ayon/call-of-the-soil-a-bengal-village-adventure

WORLD ADVENTURE of PIXELS (spawn.co/@pixelmg_dev/world-adventure-of-pixels): Run, jump, stomp and bonk blocks across a pixel world to reach the flag.

spawn.co/@pixelmg_dev/world-adventure-of-pixels

Escape from Stranglethorn (spawn.co/@izkimar/escape-from-stranglethorn): Nine classes, a jungle full of valuables, make it back alive (591 likes).

spawn.co/@izkimar/escape-from-stranglethorn

One session can stand up a whole small adventure:

The place: one valley from the heightmap-terrain skill, a path marked through it, trees and grass scattered, a ruined gate at the far end. Morning light from the atmosphere skill.

The hero: the 3d starter's body in third person, with an attack action on the left mouse and a roll on shift.

The hero

The enemies: one template (say a goblin, built as one scripted geometry with bones) placed in three camps. One manager script moves them all: idle, notice within 18 m, run at you, swing.

The enemies

Win and lose: clear the three camps and the gate opens to a boss; the boss falls and a victory banner plays. Your hp in player.state.hp; at zero you respawn at the last camp you cleared.

Win and lose

player.state.hp

HUD: an hp bar, the camps left, a one-line objective, all in ui.js reading the player's state.

Sound: a looping music bed, a swing whoosh, a meaty hit, a death grunt, a fanfare, named from one family, e.g. /cdn/moodboard-painterly-fantasy/sfx-sword-hit.mp3.

/cdn/moodboard-painterly-fantasy/sfx-sword-hit.mp3

Effects: a slash on each swing, a burst and a damage number on each hit, a short hitstop, a shockwave and a slowMo when the boss dies.

What makes it hard

Feel is the game. A fight with no squash, no hitstop and no sound reads as two capsules touching. Budget time for the game-feel pass.

Feel is the game.

Enemies need minds. Chasing in a straight line looks dumb next to a wall; findPath from builtin/nav gives them a real path, and a telegraph (a wind-up before a swing) makes them fair.

Enemies need minds.

Content is expensive. Every area, enemy and boss is built. Start with one valley and three enemy types, not a world map.

Content is expensive.

Phones. Four verbs fit on the screen, so design combat around four.

Performance. Dozens of enemies each running their own script cost frames; one manager stepping them all is the pattern the engine expects.

Performance.

A taste of the code

A sword swing on the player's own body: it plays the attack clip, finds enemies a step ahead, and lands the hit on the striker's machine with the full contact deck. attack must be declared under inputs.actions in world.config.yaml (for example attack: { mouse: "left" }).

inputs.actions

attack: { mouse: "left" }

// scripts/sword.js: rides the player's body beside the starter's movement import { add, rotate } from "builtin/vec3"; export function onInput(ctx, input) { if (!input.pressed.attack) return; ctx.self.anim.swing = { clip: "cdn/clip-attack.glb", loop: false, weight: 1 }; const ahead = add(ctx.self.feetPosition, rotate(ctx.self.rotation, { x: 0, y: 1, z: -1.5 })); for (const foe of ctx.query({ tags: ["enemy"], center: ahead, radius: 1.5 })) { foe.state.hp -= 2; // stepped in place, never assigned ctx.emit("damageNumber", { position: foe.feetPosition, value: 2 }); ctx.emit("squash", { target: foe.id, intensity: 0.3, duration: 0.15 }); ctx.emit("hitstop", { duration: 0.06 }); } }

The enemy's own update reads hp <= 0 and sets dead = true once, plays die, and drops its loot.

hp <= 0

dead = true

Want this one? Tell me and I'll start building it.

#### Block 1

````text
cdn/clip-attack.glb
````

#### Block 2

````text
ctx.self.anim.main = { clip: "cdn/clip-run-loop.glb", loop: true, weight: 1 };
ctx.self.anim.swing = { clip: "cdn/clip-attack.glb", loop: false, weight: 1 }; // over the run
````

#### Block 3

````text
instance: party
````

#### Block 4

````text
persistence: ephemeral
````

#### Block 5

````text
target.state.hp -= d
````

#### Block 6

````text
engine.networking.mode
````

#### Block 7

````text
moveX
````

#### Block 8

````text
moveZ
````

#### Block 9

````text
spawn.co/@tuanteku/whisker-brawl-3d
````

#### Block 10

````text
spawn.co/@rexgaming_yt/garden-siege-3d
````

#### Block 11

````text
spawn.co/@ayon/call-of-the-soil-a-bengal-village-adventure
````

#### Block 12

````text
spawn.co/@pixelmg_dev/world-adventure-of-pixels
````

#### Block 13

````text
spawn.co/@izkimar/escape-from-stranglethorn
````

#### Block 14

````text
player.state.hp
````

#### Block 15

````text
/cdn/moodboard-painterly-fantasy/sfx-sword-hit.mp3
````

#### Block 16

````text
inputs.actions
````

#### Block 17

````text
attack: { mouse: "left" }
````

#### Block 18

````text
// scripts/sword.js: rides the player's body beside the starter's movement
import { add, rotate } from "builtin/vec3";

export function onInput(ctx, input) {
  if (!input.pressed.attack) return;
  ctx.self.anim.swing = { clip: "cdn/clip-attack.glb", loop: false, weight: 1 };
  const ahead = add(ctx.self.feetPosition, rotate(ctx.self.rotation, { x: 0, y: 1, z: -1.5 }));
  for (const foe of ctx.query({ tags: ["enemy"], center: ahead, radius: 1.5 })) {
    foe.state.hp -= 2; // stepped in place, never assigned
    ctx.emit("damageNumber", { position: foe.feetPosition, value: 2 });
    ctx.emit("squash", { target: foe.id, intensity: 0.3, duration: 0.15 });
    ctx.emit("hitstop", { duration: 0.06 });
  }
}
````

#### Block 19

````text
hp <= 0
````

#### Block 20

````text
dead = true
````


### After clicking "read → Multiplayer arenas & party games Friends in one arena: rounds, a referee, a winner lit up at the end. Jayzee's rooms, invites and shared clock carry the networking; you build the rules and the fun."

An arena or party game is a short, loud round with other people: a sword duel on a floating ring, a dodge-the-bullets co-op fight, a free-for-all brawl, a silly minigame where the last one standing wins. On Jayzee every world is already multiplayer: friends arrive by Jayzee's invite or a portal, everyone in the room shares one clock (ctx.now() is the same on every machine), and a referee program, sim.js, runs the match on Jayzee's server once two people share the room. What you build is the arena, the rules of a round, and the moment at the end when the winner is lit up and everyone laughs.

A player arrives in the room and sees the arena and who else is here.

Enough players are present (or the creator's minimum is met), and a countdown starts with the world in view.

The round plays: fight, dodge, grab, score. Each hit, knock-out or point is felt and shown.

Someone wins, or a team, or the clock runs out. The referee writes the phase as ending and every screen plays the same moment: the winner highlighted, a burst at their feet, a slow-motion beat.

ending

Scores update, maybe a leaderboard row, and the next round starts by itself after a few seconds.

3d for anything with bodies in a space: duels, brawls, tag, king of the hill. It brings the walking body, jump and camera. 2d-side if you want a platform fighter where knocking people off the stage is the point. ui-game ("Screen-first", the starter this site runs on) for party games that are all buttons: quizzes, drawing guesses, card rounds. Pick by what players do with their hands.

rooms-and-matchmaking: the heart of it. One room (main) holds nearly unlimited players; routing with maxPlayers caps a room; a place with instance: party opens a private arena copy for whoever stands at the door. No lobby, no room code, no match list: Jayzee's invite and share buttons do that (ctx.emit("openInvite", {})).

ctx.emit("openInvite", {})

game-feel: the end of a round is the longest beat; hits get squash, burst, one camera kick; points get a chime and a "+1".

projectiles: blasters, arrows, thrown objects, bullet-hell patterns.

physics and bodies: knockback forces, ragdolls, and who passes through whom (teammates, ghosts).

game-ui: the scoreboard, the countdown, the round banner.

platform-systems: SQL leaderboards that span every room, timers, cheat-proof saves.

social: chat channels, team nameplates, earshot.

fx: auras, impacts, the confetti on a win.

Combat clips carry the fighting: attack, kick, block, roll, throw, cast, hit react, die. Movement uses idle, run, sprint, jump, fall, land. Party games live on the social and emote rows: victory, cheer, dance, chicken dance, backflip, thumbs up, clap, laugh, angry, shrug, and the hip hop dances (locking hip hop, slide hip hop, step hip hop, wave hip hop) for a winner's podium.

toon-vibrant: the default party look; bright, loud, every player readable at a glance.

scifi-neon: arenas at night, glowing blades, a glass colosseum.

pixel-bright: retro arcade and bullet-hell energy.

voxel-bright: blocky brawls and building battles.

painterly-fantasy: sword-and-sorcery duels on a floating ring.

How many: duels are 2, team fights 4 (2v2) or 10, free-for-all brawls 8 to 20. Cap the room with routing: { script, maxPlayers } in world.config.yaml; the cap counts player bodies only.

routing: { script, maxPlayers }

Rooms: the default single main room suits a drop-in party; your pickRoom can use mostFullWithSpace from builtin/room-routing to fill rooms before opening new ones. For private matches, a +arena place with instance: party gives each group its own copy, and ctx.cross(ctx.self, "+arena") takes the group there.

+arena

ctx.cross(ctx.self, "+arena")

One referee: sim.js reads what changed in players (ctx.changed("place.players.*.state.hp")) and writes ctx.place.state (phase, round, winner). Behaviors write their own state; only the referee writes the match.

One referee

ctx.changed("place.players.*.state.hp")

ctx.place.state

Bots filling seats: a human against bots is still multiplayer. An empty seat can be a bot body driven by the same script players use, with its input coming from a little mind (the jev skill) instead of a hand. Start rounds with bots when one person is in, so the arena never reads empty.

Bots filling seats

The automatic layout puts a stick under the left thumb (from moveX/moveZ) and up to four action chips under the right, jump first. A fighting game lives within four: attack, block, roll, jump. A shooter puts the aim on the fire chip: hold to aim, release to fire. Party games built on ui-game are buttons already and play perfectly on a phone; make them big.

Sky Ring Arena Multiplayer (spawn.co/@rexgaming_yt/sky-ring-arena-multiplayer): first-person sword and shield fights, 1v1 and 2v2, with roll, block, parry and riposte.

spawn.co/@rexgaming_yt/sky-ring-arena-multiplayer

Slime Arena (spawn.co/@slime/slime-arena): be a slime in a neon glass city; race the loop, duel in the colosseum.

spawn.co/@slime/slime-arena

MGTale Battles multiplayer (spawn.co/@andreamg2tablet/mgtale-battles-multiplayer): Undertale-style co-op bullet hell against a cast of bosses.

spawn.co/@andreamg2tablet/mgtale-battles-multiplayer

Elemental Blades: Arena of Ascension (spawn.co/@shadow_ranger_62/elemental-blades-arena-of-ascension): anime blade and sorcery arena, endless waves, summonable heroes.

spawn.co/@shadow_ranger_62/elemental-blades-arena-of-ascension

Purrtris Arena (spawn.co/@chizkeykkk/purrtris-arena): a pastel cat-cafe in the clouds with arcade cabinets to play together.

spawn.co/@chizkeykkk/purrtris-arena

Super Smash Jayzee Brawl (spawn.co/@hips/super-smash-spawn-brawl-ultimate-platform-fighter): knock friends off a stained-glass stage.

spawn.co/@hips/super-smash-spawn-brawl-ultimate-platform-fighter

The place: one round arena, about 30 m across, on a floating island or in a glowing pit, with a fall-off edge (worldBounds.bottom catches fallers and onOutOfBounds turns a fall into a knock-out).

The loop: sim.js with phases waiting, countdown, fight, ending. Two or more players (or one player and a bot) start a 3-second countdown; last one standing wins; six seconds later the next round.

Win and lose: hp 10 per round; a hit takes 2; a fall is out. The winner gets a point in player.state.wins and, if you like, a row in an SQL leaderboard.

player.state.wins

HUD: the phase banner, the countdown in big numbers, each player's hp and wins, all read from ctx.place.state and the player rows in ui.js.

Sound: one punchy music loop with ctx.music.play(ref, { fade }), a countdown beep, a hit, a knock-out, a crowd cheer for the winner.

ctx.music.play(ref, { fade })

Effects: hit sparks and damage numbers, a shockwave on a knock-out, and the win beat: highlightSet on the winner, an fx burst at their feet, one slowMo.

It needs people. A two-player game with one player is no game. Plan bots or a solo mode from day one.

It needs people.

Fairness across the network. Hits are judged on the striker's machine, which feels great to the striker; a parry or dodge is judged on the target's machine through its ears.hurt. Design around that split rather than fighting it.

Fairness across the network.

ears.hurt

One writer per fact. Two scripts both deciding the round leads to ping-pong. The referee owns the match.

One writer per fact.

Round-transition bugs. A death vignette or a frozen body left over from the last round welds onto the next. Reset every per-round value on every path into a new round.

Round-transition bugs.

Balance. The first weapon you make will be too strong. Play it with friends early.

Balance.

The referee: a last-one-standing round in sim.js, reading players and writing the place's state that every HUD draws.

// sim.js: the referee, on Jayzee's server once two share the room export const cadence = "250ms"; export function tick(ctx) { const s = ctx.place.state, players = ctx.place.players; if (s.phase !== "fight") { if (players.length >= 2 && ctx.now() > (s.nextAt ?? 0)) { s.round = (s.round ?? 0) + 1; s.phase = "fight"; s.winner = null; } return; } const alive = players.filter((p) => p.state.round === s.round && (p.state.hp ?? 10) > 0); if (alive.length <= 1) { s.phase = "ending"; s.winner = alive[0]?.id ?? null; s.nextAt = ctx.now() + 6000; } }

Each player's own behavior sees a new round number, resets its own hp to 10 and writes state.round: behaviors write their own state, the referee only reads it.

hp

state.round

#### Block 1

````text
ending
````

#### Block 2

````text
ctx.emit("openInvite", {})
````

#### Block 3

````text
routing: { script, maxPlayers }
````

#### Block 4

````text
+arena
````

#### Block 5

````text
ctx.cross(ctx.self, "+arena")
````

#### Block 6

````text
ctx.changed("place.players.*.state.hp")
````

#### Block 7

````text
ctx.place.state
````

#### Block 8

````text
spawn.co/@rexgaming_yt/sky-ring-arena-multiplayer
````

#### Block 9

````text
spawn.co/@slime/slime-arena
````

#### Block 10

````text
spawn.co/@andreamg2tablet/mgtale-battles-multiplayer
````

#### Block 11

````text
spawn.co/@shadow_ranger_62/elemental-blades-arena-of-ascension
````

#### Block 12

````text
spawn.co/@chizkeykkk/purrtris-arena
````

#### Block 13

````text
spawn.co/@hips/super-smash-spawn-brawl-ultimate-platform-fighter
````

#### Block 14

````text
player.state.wins
````

#### Block 15

````text
ctx.music.play(ref, { fade })
````

#### Block 16

````text
ears.hurt
````

#### Block 17

````text
// sim.js: the referee, on Spawn's server once two share the room
export const cadence = "250ms";
export function tick(ctx) {
  const s = ctx.place.state, players = ctx.place.players;
  if (s.phase !== "fight") {
    if (players.length >= 2 && ctx.now() > (s.nextAt ?? 0)) {
      s.round = (s.round ?? 0) + 1; s.phase = "fight"; s.winner = null;
    }
    return;
  }
  const alive = players.filter((p) => p.state.round === s.round && (p.state.hp ?? 10) > 0);
  if (alive.length <= 1) { s.phase = "ending"; s.winner = alive[0]?.id ?? null; s.nextAt = ctx.now() + 6000; }
}
````

#### Block 18

````text
hp
````

#### Block 19

````text
state.round
````


### After clicking "read → Exploration & atmosphere A place worth wandering: light, weather, sound and secrets. The world is the game, and Jayzee's sky, terrain, trees and grass make it beautiful from the first hour."

An exploration game is a place you want to stand in. A valley at golden hour, a fog-soaked forest, an island that turns blue at night, a cliff with a lighthouse you can see from everywhere. There may be no enemy at all: the player's reward is the next view, a hidden shrine, a note left in a ruin, the moment the sun drops and the lanterns come on. On Jayzee this is one of the strongest genres, because the engine already draws a procedural sky that lights the world from the hour, a day and night cycle with no script, real terrain with rivers and coasts you can swim in, and forests, hedges and meadows grown by their own skills. You spend your time on composition and secrets, not on plumbing.

The player arrives looking at something: a landmark framed on the horizon by defaultSpawnRotation.

They walk toward it, and on the way the land offers a fork: a path, a glint off the trail, a sound from the trees.

Each discovery (a shrine, a view point, a collectible, a character) gives a soft reward: a chime, a journal entry, a counter going up.

The day turns. What they saw at noon looks different at dusk; something only appears at night.

A final place, reachable once enough is found, closes the story; or there is no end, and the world simply keeps rewarding a return visit.

3d ("3D world": first-person body, mouse look, jump, open sky, placeholder ground and grass). Exploration is the first thing it is listed for. First person suits quiet wandering and horror-tinged walks; switch to third person (the cameras skill) if the character is part of the charm. 2d-top suits a pixel-art exploration in the zelda-like tradition, and 3d-voxels suits exploring caves and generated biomes.

atmosphere: sky, sun, fog, clouds, day and night, weather. The sun is fixed to the clock: on the horizon at 6 and 18, 65 degrees high at noon; 17.5 is golden hour; from about 18.45 the moon takes over. A turning day is two numbers, never a script.

looks: the colour grade, toon shading, grime decals and custom shaders that give the place its signature.

heightmap-terrain: hills, islands, rivers, coasts, swimming. Marks like sea, lake, river, path and flatten shape the ground.

trees, leaf-sprays, meadow-grass: forests, hedges, ivy, tall fields; the green that makes a place feel alive.

audio: a quiet ambient bed (gain around 0.15), wind, birds, water, a music cue on a discovery.

fx: fireflies, falling leaves, rain, mist, a campfire with its own flickering light.

geometry: the ruins, bridges, towers and lighthouses that become landmarks.

interactive-objects and portals: collectibles, doors, and doors to other places.

Movement is most of it: idle, walk, run, sprint, jump, fall, land, plus swim idle and swim for water, climb, climb wall up, climb wall down for cliffs, crouch idle and crouch walk for tight places. Quiet moments use sit, sit on floor and sleep (a bench at a view point, a campfire). NPCs met on the road use wave, talk, point, nod yes, shake no. A found treasure takes pickup.

painterly-fantasy: soft light, stone and moss; a storybook to walk through.

lowpoly-cozy: warm, simple, calm; perfect for a gentle walk with friends.

realistic-gritty: weathered and lonely; a wasteland or a northern coast.

gothic-horror: fog, dusk, something watching from the trees.

pixel-moody: blue-violet nights for a 2D top-down wander.

Exploration is lovely with a friend and fine alone. The default single main room lets anyone drop in and wander together, and Jayzee's own chat, voice and nameplates are already there. Progress like "places found" belongs in player.state, which is the player's own save and follows them across rooms. The weather and hour belong to the place, so everyone in a room sees the same dusk. There are no seats to fill; NPCs who live in the world (a fisherman, a guide) are the company when nobody else is on.

The automatic layout is ideal here: a move stick under the left thumb from moveX/moveZ, drag anywhere to look (from lookX/lookY), and a jump chip. If there is one more verb (interact, photo, lantern), it becomes a second chip. Keep it to two or three; an exploration game should never feel like a cockpit. Atmosphere scales by ctx.quality, so the phone sees the same place with lighter effects.

There is no exploration shelf in the catalog yet; these are the closest wanderable worlds:

Call of the Soil: A Bengal Village Adventure (spawn.co/@ayon/call-of-the-soil-a-bengal-village-adventure): roam a living village, chat with neighbours, ride rickshaws and boats.

Escape from Stranglethorn (spawn.co/@izkimar/escape-from-stranglethorn): a jungle full of valuables, and the long road back to Booby Bay.

Cat Haven (spawn.co/@chizkeykkk/cat-haven): a pink house in the clouds with a glass-domed cat yard and a cloud road to run.

spawn.co/@chizkeykkk/cat-haven

Jayzee Hangout (spawn.co/@binxius/spawn-hangout): a lakeside town to meet up and play.

spawn.co/@binxius/spawn-hangout

Dragon Racing (spawn.co/@metalhorse233/dragon-racing): fly a drake across the Wyrmcrown Isles, five zones to see from the air.

spawn.co/@metalhorse233/dragon-racing

Cartoon horror (spawn.co/@lakaplay/cartoon-horror): find 8 film reels in the foggy woods; exploration with something hunting you.

spawn.co/@lakaplay/cartoon-horror

The place: one island or valley, about 400 m across, from the heightmap-terrain skill: a coast with a sea mark you can swim in, a river, a hill. Forest on one side, meadow on the other, a path between.

Landmarks: three built pieces visible from far away (a lighthouse, a broken bridge, a stone circle) and five small secrets (a shrine in the woods, a cave mouth, a bench with a view).

Landmarks

The loop: find the secrets; each one ticks a counter in player.state.found. All five light the lighthouse, which is the ending.

player.state.found

The day: a turning day with atmosphere.cycle, about twenty minutes long, so a visit sees a dusk. The stone circle glows only at night.

The day

atmosphere.cycle

HUD: almost nothing. A small "3 / 5" in a corner and a one-line toast on a discovery. No minimap unless you want one (the portals skill does minimaps).

Sound: an ambient bed of wind and sea, birds by day and crickets by night, a soft chime on each find, one music swell at the lighthouse.

Effects: fireflies in the meadow at dusk, mist on the river, a glow and a light over each found shrine.

Empty is easy, interesting is hard. A huge world with nothing in it is a walk. Smaller and denser beats bigger.

Empty is easy, interesting is hard.

Guiding without arrows. Use light, landmarks and paths to pull the eye; a lamp or a bright window says "come here" better than a marker.

Guiding without arrows.

Night must stay readable. A night keeps its blacks, but what matters gets a lamp, a window or the moon.

Night must stay readable.

Performance. Grass, trees, fog and particles all cost frames, most of all on phones. Effects step down by ctx.quality; keep particle counts inside the fx budgets.

No obvious goal. Some players want one. A counter of secrets and an ending give them one without spoiling the wander.

No obvious goal.

The two signature moves: a day that turns by itself, and a secret that remembers you found it. The day is pure config:

# places/main/config.yaml: a turning day, no script atmosphere: timeOfDay: 17 cycle: { periodMs: 1200000, epoch: 0 }

A secret is an invisible trigger box with physics: { body: "static", collider: "box", trigger: true } and this behavior:

physics: { body: "static", collider: "box", trigger: true }

// scripts/secret.js: one behavior for every secret; state.name tells them apart export function onTriggerEnter(ctx, other) { const p = ctx.place.players.find((row) => row.id === other.id); if (!p) return; const found = p.state.found ?? [], name = ctx.self.state.name; if (found.includes(name)) return; p.state.found = [...found, name]; // the player's own save ctx.emit("milestone", { step: found.length + 1, name }, { audience: { player: p.id } }); ctx.emit("playSound", { clip: "/cdn/moodboard-painterly-fantasy/sfx-discovery-chime.mp3", position: ctx.self.feetPosition, volume: 0.6 }); }

#### Block 1

````text
spawn.co/@chizkeykkk/cat-haven
````

#### Block 2

````text
spawn.co/@binxius/spawn-hangout
````

#### Block 3

````text
spawn.co/@metalhorse233/dragon-racing
````

#### Block 4

````text
spawn.co/@lakaplay/cartoon-horror
````

#### Block 5

````text
player.state.found
````

#### Block 6

````text
atmosphere.cycle
````

#### Block 7

````text
# places/main/config.yaml: a turning day, no script
atmosphere:
  timeOfDay: 17
  cycle: { periodMs: 1200000, epoch: 0 }
````

#### Block 8

````text
physics: { body: "static", collider: "box", trigger: true }
````

#### Block 9

````text
// scripts/secret.js: one behavior for every secret; state.name tells them apart
export function onTriggerEnter(ctx, other) {
  const p = ctx.place.players.find((row) => row.id === other.id);
  if (!p) return;
  const found = p.state.found ?? [], name = ctx.self.state.name;
  if (found.includes(name)) return;
  p.state.found = [...found, name]; // the player's own save
  ctx.emit("milestone", { step: found.length + 1, name }, { audience: { player: p.id } });
  ctx.emit("playSound", { clip: "/cdn/moodboard-painterly-fantasy/sfx-discovery-chime.mp3", position: ctx.self.feetPosition, volume: 0.6 });
}
````


### After clicking "Racing & vehicles"

A racing game on Jayzee is a vehicle that feels like a vehicle: it leans into corners, lands heavy off a jump, drifts when you push it, and the engine note climbs with the revs. The engine's rule is simple and important: every vehicle (kart, car, truck, motorcycle, tank, ship, plane, helicopter) is one dynamic hull the player sits in. Held forces push it; the engine adds gravity, collisions, slopes, landings and pushes. A walking character body with a hand-written speed slides like a toy, so racing is built the physical way from the start. Around that hull you build a track, checkpoints, rivals and a clock: a street sprint, a figure-8 wreck derby, a ring race on dragon-back, a time trial with ghosts.

The player arrives at the grid and is seated in a car (the game sets controller = player.id on the hull).

controller = player.id

A countdown runs with the world in view; pressing gas is how a racer joins.

The race: hold gas, steer, brake into corners, pass checkpoints in order. Laps count in the hull's state.

Collisions, jumps and hazards (a bomb, a wall, a rival) push things around.

The finish: a time, a place, a results screen; the referee resets to the grid.

Again: a better line, a better time, a leaderboard row.

3d ("3D world"), which lists racing among its uses: it brings the 3D place, the gravity (-24 in the 3D starter, which every vehicle force reads) and a camera you swap for a chase rig while driving. You add the hull from the vehicles skill. For a top-down micro-machines racer, 2d-top works too, but the physical feel lives in 3D.

vehicles: the core. A car is a ray per wheel with a spring and damper, grip that peaks and clamps, steering that fades with speed, wheels as hub children that steer by yaw and spin by pitch. An arcade kart is the same hull with a box collider and friction: 0. Planes, helicopters, boats, tanks and two-wheelers each have their own recipe. The skill also builds a procedural engine voice: exhaust pulses through pipes, not a tone.

friction: 0

cameras: the chase camera whose yaw follows the hull.

heightmap-terrain: real ground to race over, with road and flatten marks.

geometry: the car body as one scripted shell with an interior, and the track pieces.

audio: the engine voice, tyre squeal, impact sounds from contact.impulse, music.

contact.impulse

fx: dust and smoke past peak grip, sparks on a scrape, boost flames.

mobile-controls: a wheel under the left thumb, pedals under the right.

platform-systems: leaderboards for best laps across every room, cheat-proof saves.

game-feel: the landing thump, the screen shake on a crash, the win beat at the line.

Vehicles carry the motion, but the driver is a humanoid: enter car, drive and exit car are in the library for exactly this. Hands go on the wheel's grips (bones.LeftHand.reach = { object: <grip-l id> }). Around the race, victory, cheer, thumbs up and dance for the podium, idle and walk in the pits.

bones.LeftHand.reach = { object: <grip-l id> }

toon-vibrant: arcade karts, loud colours, cartoon crashes.

scifi-neon: floating neon tracks at night, glowing barriers, synth music.

realistic-gritty: a muddy speedway, a derby of dented sedans.

lowpoly-cozy: a gentle countryside drive or a delivery game.

painterly-fantasy: dragon races, boats between islands.

How many: 4 to 10 racers is a good grid; a time trial is one player against ghosts.

Rooms: one main room for a drop-in track; or a place with instance: party so a group gets a private race copy.

The referee: one sim.js runs grid, countdown, race, results. Laps are checkpoints in order, kept in each hull's state. A racer who never pressed gas since the grid sits the race out, past every hazard.

The referee

Bots filling seats: rivals are the same hull and the same script, with gas and steer from a racing-line driver instead of onInput. The racing line is data: the driver follows it and progress is measured along it. So a solo player still gets a full grid, and a human taking a seat simply replaces a bot.

Who simulates: a mounted hull simulates on its driver's machine, so your own car always feels instant.

The mobile-controls skill describes the driving layout exactly: a steering pad in the left zone (pads: [{ x: steer, mode: absolute, zone: left, label: STEER }]), a big GAS button and a BRAKE button on the right bound to axes, and an exit chip. Switching from feet to driving swaps the whole layout the moment the door closes, using a surface selector. The look-drag turns off while driving (look: false) so the chase camera holds.

pads: [{ x: steer, mode: absolute, zone: left, label: STEER }]

look: false

Race to the Masjid (spawn.co/@yunusdiallo/race-to-the-masjid): 55 seconds to dodge carts and laundry lines down the street.

spawn.co/@yunusdiallo/race-to-the-masjid

Dragon Racing (spawn.co/@metalhorse233/dragon-racing): fly a drake across five zones, 28 ring races, Normal and Advanced.

Crunch-em-up Derby Racing (spawn.co/@nickyp/crunch-em-up-derby-racing): figure-8 wreck racing at a county speedway.

spawn.co/@nickyp/crunch-em-up-derby-racing

Mequavian Racing (spawn.co/@cybershrapnel/mequavian-racing): a full-scale speedway, eight laps, one clock.

spawn.co/@cybershrapnel/mequavian-racing

Race or Die (spawn.co/@iiisandman/race-or-die): ten cars on a floating neon track and a bomb that blows up last place every 30 seconds.

spawn.co/@iiisandman/race-or-die

HyperTrackMania X (spawn.co/@hips/hypertrackmania-x-time-trial-racing): 18 arcade tracks with loops, wallrides, jumps and ranked ghosts.

spawn.co/@hips/hypertrackmania-x-time-trial-racing

The place: one closed circuit about 1 km around, laid as a road over heightmap terrain with a gentle hill and a jump, collider barriers along the edges, a grid and a finish arch.

The car: one arcade kart (the simpler recipe: box hull, friction: 0, held force along the nose), with a body from the geometry skill, spinning wheels, headlights, brake lights that change when you brake, and the procedural engine voice.

The car

The loop: sim.js with grid, countdown, race (3 laps), results. Eight checkpoints in order; a missed one does not count the lap.

Rivals: five bot karts on the racing line, so the grid is full alone.

Rivals

Win and lose: finishing position and total time; best lap saved to an SQL leaderboard.

HUD: speed, lap 2/3, position 3rd/6, the countdown big in the centre, read from player.controlling.state while driving.

player.controlling.state

Sound: engine voice, squeal past peak grip, a hit sound scaled by contact.impulse, a countdown beep, a race music track.

Effects: dust behind the wheels, sparks on wall scrapes, a burst and slowMo beat at the finish line.

Handling is a craft. Grip, steering lock, weight and suspension take many test drives. Start from the skill's numbers and change one at a time.

Handling is a craft.

Bot drivers. A racing line that cuts corners or gets stuck on a wall breaks the race. Test the line at speed.

Bot drivers.

Fast things and the network. A hull jumping more than 2 m in a tick warps (interpolation: { teleportThreshold }); very fast vehicles need care.

Fast things and the network.

interpolation: { teleportThreshold }

Tracks are big. A good circuit is many pieces: road, barriers, scenery, landmarks to read the next corner by.

Tracks are big.

Phones. Steering by touch is less precise; arcade handling forgives more than simulation.

An arcade kart: the hull hears its driver's keys and holds two forces, a push along the nose and a turn. Keys go in session memory; only real intent changes go in state.

// scripts/kart.js on the hull: physics { body: "dynamic", collider: "box", mass: 300, friction: 0 } import { rotate } from "builtin/vec3"; export function onInput(ctx, input) { ctx.self.session.gas = input.axes.moveZ ?? 0; ctx.self.session.steer = -(input.axes.moveX ?? 0); // yaw is +left: steer = -moveX } export function update(ctx, dt) { const nose = rotate(ctx.self.rotation, { x: 0, y: 0, z: -1 }); const push = 4000 * (ctx.self.session.gas ?? 0); ctx.self.forces.drive = { force: { x: nose.x * push, y: 0, z: nose.z * push } }; ctx.self.forces.turn = { torque: { x: 0, y: 1500 * (ctx.self.session.steer ?? 0), z: 0 } }; }

Mounting is one line from the rider's side: hull.controller = player.id; setting it to null hands the player back their feet.

hull.controller = player.id

#### Block 1

````text
controller = player.id
````

#### Block 2

````text
friction: 0
````

#### Block 3

````text
contact.impulse
````

#### Block 4

````text
bones.LeftHand.reach = { object: <grip-l id> }
````

#### Block 5

````text
pads: [{ x: steer, mode: absolute, zone: left, label: STEER }]
````

#### Block 6

````text
look: false
````

#### Block 7

````text
spawn.co/@yunusdiallo/race-to-the-masjid
````

#### Block 8

````text
spawn.co/@nickyp/crunch-em-up-derby-racing
````

#### Block 9

````text
spawn.co/@cybershrapnel/mequavian-racing
````

#### Block 10

````text
spawn.co/@iiisandman/race-or-die
````

#### Block 11

````text
spawn.co/@hips/hypertrackmania-x-time-trial-racing
````

#### Block 12

````text
player.controlling.state
````

#### Block 13

````text
interpolation: { teleportThreshold }
````

#### Block 14

````text
// scripts/kart.js on the hull: physics { body: "dynamic", collider: "box", mass: 300, friction: 0 }
import { rotate } from "builtin/vec3";

export function onInput(ctx, input) {
  ctx.self.session.gas = input.axes.moveZ ?? 0;
  ctx.self.session.steer = -(input.axes.moveX ?? 0); // yaw is +left: steer = -moveX
}

export function update(ctx, dt) {
  const nose = rotate(ctx.self.rotation, { x: 0, y: 0, z: -1 });
  const push = 4000 * (ctx.self.session.gas ?? 0);
  ctx.self.forces.drive = { force: { x: nose.x * push, y: 0, z: nose.z * push } };
  ctx.self.forces.turn = { torque: { x: 0, y: 1500 * (ctx.self.session.steer ?? 0), z: 0 } };
}
````

#### Block 15

````text
hull.controller = player.id
````


### After clicking "Survival & building"

A survival and building game is about making a place yours while the world tries to take it back. You dig and gather, you build a shelter, you keep warm and fed, and when night comes or the disaster hits, what you built is what saves you. On Jayzee the block world comes ready: a solid voxel field where left click digs and right click places, with biomes, ore and caves from its generator. The engine also brings a day and night cycle with no script, persistent state for what players own, and SQL for saves that span rooms. You add the pressure (hunger, cold, waves, storms) and the reasons to build (walls, light, crafting stations). The genre also stretches to wave survival without building (hold the fort against hordes) and to city or colony builders where the threat is a clock.

The player arrives with nothing at the edge of a generated land, in daylight.

They gather: dig stone, chop wood, find ore in bands underground.

They build: a shelter, a campfire, a wall, a light, a crafting bench.

Pressure rises: warmth or hunger drains, the sun sets, a wave or a storm comes.

They survive the night, or they don't and respawn, keeping some of what they made.

Each new day is longer reach: deeper caves, better tools, bigger bases, harder nights. Progress persists.

3d-voxels ("Block world": solid voxel field, left click digs, right click places; listed for survival, crafting, building, mining). Building is already the core verb, so the first session goes straight to the survival layer. For wave survival without digging (hold a graveyard, a backyard, a fortress) choose 3d with heightmap terrain. For a city or colony builder played from above, 3d with a top-down camera, or ui-game for a pure numbers builder.

voxel-terrain: the block world itself. A block world is a volume before it is a skin: caves you stand inside, ore in 3D bands, an island with a stone belly. ctx.place.voxels[x][y][z] reads and writes blocks by integer cell; = "stone" places one, = null breaks it. Block scripts can react to ticks, neighbours and interaction.

ctx.place.voxels[x][y][z]

= "stone"

atmosphere: the day and night that drive the danger. Full light runs about 6.75 to 17.25; the moon owns the scene from about 18.9.

jev: minds for the things that come at night: notice, chase, attack walls.

interactive-objects: pickups, chests, doors and levers.

pointer-raycasting: click to place, cursor aim, touch tap and hold for building.

platform-systems: cheat-proof saves, timers, leaderboards (longest survived).

fx: campfires with their own light, torches, rain, sparks from a pickaxe.

game-ui: the hotbar, the warmth and hunger bars, the crafting menu.

buyables: an optional shop for cosmetics.

Work and travel: idle, walk, run, sprint, jump, fall, land, crouch idle, crouch walk, climb, swim. Gathering and building: attack for a pickaxe or axe swing, pickup for collecting, throw. Danger: block, roll, hit react, die. Rest: sit, sit on floor, sleep by the fire. A survived night: cheer or victory.

voxel-bright: the natural fit for a block world: sunny, readable, friendly.

lowpoly-cozy: gentle survival, farming and homesteading.

realistic-gritty: a harsh winter, a wasteland, scarcity you can feel.

gothic-horror: nights that are truly frightening.

scifi-neon: a colony on a hostile planet.

Survival is great co-op. The default main room holds everyone, and every room is a whole game of its own: its blocks and buildings are that room's. What a player owns (inventory, progression, prizes) lives in player.state, their own save that follows them across rooms, or in SQL when it must be cheat-proof. For a server feel, cap rooms with routing: { maxPlayers }; for a private base for a group, a place with instance: party and persistence: session or a solo copy with persistence: persistent that keeps a player's own world as they left it. Night waves can scale with ctx.place.playerCount. There are no seats to fill; the threats are NPCs one manager script steps together.

routing: { maxPlayers }

persistence: session

persistence: persistent

ctx.place.playerCount

Move stick from moveX/moveZ, drag to look, and up to four chips: jump, dig, place, and one more (eat, open inventory). The pointer-raycasting skill covers tap and hold, so a tap can place and a hold can dig. Keep the hotbar in ui.js large enough to hit with a thumb, at the top or side so it clears the stick.

Survive Ragnarok (spawn.co/@liiv/survive-ragnarok): Ragnarok Online meets Vampire Survivors; an old-school MMO as a horde survival.

Survive Ragnarok

spawn.co/@liiv/survive-ragnarok

Survival at Disaster (spawn.co/@vovafromttav/survival-at-disaster): floods, tornadoes, meteors and acid rain hit the island town; survive the round.

spawn.co/@vovafromttav/survival-at-disaster

Building 66 (spawn.co/@fracture/building-66): seven night shifts; find the fuses, bring the power back.

spawn.co/@fracture/building-66

Enfo's Team Survival (spawn.co/@marcelpachole/enfo-s-team-survival): up to 5 heroes hold Enfos against waves of undead.

spawn.co/@marcelpachole/enfo-s-team-survival

Spike's Neon Survival (spawn.co/@0toxika/spike-s-neon-survival): a pygmy hedgehog crunches neon worms across ten glowing arenas.

spawn.co/@0toxika/spike-s-neon-survival

Hexagonal Arcology Builder (spawn.co/@travelingtt/hexagonal-arcology-builder-peak-oil-survival): build a hex arcology to 144,000 people before the oil runs out.

spawn.co/@travelingtt/hexagonal-arcology-builder-peak-oil-survival

The place: the 3d-voxels starter's generated land, with its seed picked for a good jayzee: a meadow by a forest, a cliff with a cave mouth, ore bands below.

The loop: a twenty-minute day with atmosphere.cycle. By day, gather and build. At dusk a warning; at night, creatures come from the dark and go for the player and their walls.

Survival stats: warmth drains slowly by day and fast at night, and refills by a campfire. At zero, health drains. Death respawns you at your bed with your blocks, losing what you carried.

Survival stats

Building: digging fills a small inventory by block type; placing spends it. A campfire and a torch are craftable from wood.

Win and lose: no final win; the score is nights survived, in a leaderboard. A milestone at nights 1, 3 and 7.

HUD: warmth and health bars, a hotbar of five block types with counts, the night counter, a clock showing time to dusk.

Sound: a calm day loop, a darker night loop crossfaded with ctx.music.play(ref, { fade }), dig and place sounds per material, the crackle of fire, a growl in the dark.

Effects: a campfire with flame, embers, smoke and one light whose brightness follows the flame; block-break dust; a red edge (the player's vignette) when warmth is gone.

Saves and fairness. What a player owns must survive leaving and must not be easy to fake. Inventory in player.state is simple; SQL is cheat-proof. Decide early.

Saves and fairness.

Shared worlds get messy. In a shared room one player can dig through another's base. Decide on protection (claims, a party copy) before it happens.

Shared worlds get messy.

Pacing. Too gentle is boring; too hard on night one and players leave. Make the first night survivable by anyone who built anything.

Pacing.

Write budget. A stat that changes every frame must not be written to state every frame; ration writes to a few a second.

Write budget.

Performance. Big voxel worlds, many creatures and many lights cost frames. One manager for creatures; lights only where they matter.

The heart of survival: a warmth stat that drains with the night and refills by a fire. It runs once a second on the player's body and writes only when the rounded value changes.

// scripts/warmth.js: rides the player's body export const updateSchedule = { every: { seconds: 1 } }; export function update(ctx) { const hour = ctx.place.atmosphere.timeOfDay; const night = hour > 19 || hour < 6; const fire = ctx.query({ tags: ["campfire"], radius: 6 }).length > 0; const w = ctx.self.state.warmth ?? 100; const next = Math.max(0, Math.min(100, w + (fire ? 5 : night ? -2 : -0.5))); if (Math.round(next) !== Math.round(w)) ctx.self.state.warmth = next; ctx.self.vignette = next < 20 ? 0.3 : 0; // derived each tick, never left on }

Placing a campfire block is one write: ctx.place.voxels[x][y][z] = "campfire", where campfire is a material you define in the place's terrain materials.

ctx.place.voxels[x][y][z] = "campfire"

#### Block 1

````text
ctx.place.voxels[x][y][z]
````

#### Block 2

````text
= "stone"
````

#### Block 3

````text
routing: { maxPlayers }
````

#### Block 4

````text
persistence: session
````

#### Block 5

````text
persistence: persistent
````

#### Block 6

````text
ctx.place.playerCount
````

#### Block 7

````text
spawn.co/@liiv/survive-ragnarok
````

#### Block 8

````text
spawn.co/@vovafromttav/survival-at-disaster
````

#### Block 9

````text
spawn.co/@fracture/building-66
````

#### Block 10

````text
spawn.co/@marcelpachole/enfo-s-team-survival
````

#### Block 11

````text
spawn.co/@0toxika/spike-s-neon-survival
````

#### Block 12

````text
spawn.co/@travelingtt/hexagonal-arcology-builder-peak-oil-survival
````

#### Block 13

````text
// scripts/warmth.js: rides the player's body
export const updateSchedule = { every: { seconds: 1 } };

export function update(ctx) {
  const hour = ctx.place.atmosphere.timeOfDay;
  const night = hour > 19 || hour < 6;
  const fire = ctx.query({ tags: ["campfire"], radius: 6 }).length > 0;
  const w = ctx.self.state.warmth ?? 100;
  const next = Math.max(0, Math.min(100, w + (fire ? 5 : night ? -2 : -0.5)));
  if (Math.round(next) !== Math.round(w)) ctx.self.state.warmth = next;
  ctx.self.vignette = next < 20 ? 0.3 : 0; // derived each tick, never left on
}
````

#### Block 14

````text
ctx.place.voxels[x][y][z] = "campfire"
````


### After clicking "read → 2D platformers & top-down RPGs Side-scrollers with jumps and parallax, top-down adventures with tiles, quests and loot: drawn heroes, fast loading and great on phones."

A 2D game on Jayzee is still a real place with depth behind it, drawn flat. A side-scroller (2d-side) has gravity, a hero that runs and jumps across a band of solid ground, and painted backdrops that slide past at their own speed. A top-down game (2d-top) has no gravity at all: the hero walks across tile ground in eight directions, bumps into trees and rocks at their feet, and the world reads like a map you live in. Every pixel is drawn in code: the tiles, the hero's walk cycle, the slime that hops toward you, the sky strip behind it all. That gives the genre its charm here: one palette, one pixel size, one light direction across everything, so the whole screen reads as one drawing that plays. And because a 2D place is just a place in a world, it can sit next to 3D places and players can walk between them.

For a platformer:

The player lands at the start of a level, the hero idling on solid ground with the backdrop behind.

They run right, jump gaps, climb onto platforms, and grab coins that chime and float a little "+1".

Hazards and enemies push back: a spike, a pit, a slime on patrol. Touching one costs a life or sends them to the last checkpoint.

They reach the flag or door at the end; the level lights up, a time and coin count shows on a plate, and the next level opens.

Between runs they chase a better time on a board everyone in the game can see.

For a top-down RPG:

The player wakes in a town square drawn in tiles, with a few people to talk to.

They take a task (bring three mushrooms, clear the cave), walk out past the fence into wilder ground.

They fight or avoid creatures, pick up loot into a bag, and gain experience.

They come back, hand the task in, level up, buy better gear, and go further out.

Their bag, level and gold are saved on their own player record, so tomorrow they pick up where they left off, in any room.

There are two starters, and you pick by the camera you want:

2d-side (Side-scroller): a drawn hero, platform ground, gravity on, parallax backdrops. This is the start for platformers, metroidvanias and runners.

2d-top (Top-down 2D): a drawn pixel hero, tile ground with wang edges (the corner tiles that make grass blend into sand), no gravity, solid trees. This is the start for RPGs, farming games, zelda-likes and twin-stick shooters.

Either one is the first call on a young world: jayzee starter 2d-top or jayzee starter 2d-side. It sets the place's mode and gravity, draws a player sprite (scripts/tex-hero.js, with its ?facing= poses), sets up the camera rig and draws a ground. You reshape from there instead of building movement and a camera from nothing.

jayzee starter 2d-top

jayzee starter 2d-side

scripts/tex-hero.js

?facing=

If you want stairs and cliffs a character can walk up and down while it still looks like pixel art, that needs a 3D place with the pixel-art camera instead (the cameras skill and engine.graphics.perfectPixelArt).

engine.graphics.perfectPixelArt

2d-mode: the heart of it. Tiles (tileAt, solidTiles, painting a cell for everyone with ctx.place.tiles[x][y] = id), drawn sprites, animation atlases, parallax strips, and the collision rules for each mode.

tileAt

solidTiles

cameras: the 2D rig and its numbers (orthoSize, heightOffset, distance), and pixelSnap so pixels stay crisp while the camera follows.

heightOffset

game-feel: what makes a coin feel good (a pitch-stepped chime, a sparkle, a floating "+1", no hitstop) and what makes a hit feel heavy (a short hitstop of 0.02 to 0.04 seconds, a squash, one screen shake).

fx: dust when you land, sparkles on a coin, embers from a torch, all drawn as sprites in the same pixel style.

interactive-objects: chests, levers, doors, pressure plates and pickups.

jev: minds for enemies and townsfolk, so a boss picks whom to chase and shopkeepers go about their errands.

platform-systems: the player's saved bag, gold and level in player.state, and an all-time best-time board in SQL.

game-ui: a crisp HUD in the pixel face (Jersey 10 or Geist Pixel Square), hearts and coin counts as vectors.

Jersey 10

Geist Pixel Square

audio: a chiptune loop and named sound effects.

mobile-controls: the touch stick and buttons.

Mostly none from the humanoid library, and that is the point: a 2D hero's motion is drawn frame by frame in its own texture script with ctx.atlas({ frameSize, animations: { idle: 2, walk: 4 }, fps, draw(g, f) }), and played by name, ctx.self.anim.locomotion = { clip: "walk", weight: 1 }. You decide the frames: idle, walk, jump, hurt, attack.

ctx.atlas({ frameSize, animations: { idle: 2, walk: 4 }, fps, draw(g, f) })

ctx.self.anim.locomotion = { clip: "walk", weight: 1 }

The library's clip names are still the right shopping list for what your drawn frames should cover, because they are the moves players expect: idle, walk, run, jump, fall, land for movement; attack, roll, hit react, die for a fight; climb for ladders; pickup for loot; victory at the flag. If a 2D place sits beside a 3D place in the same world, a player who hops into the 3D place wears the avatar there and those library clips play on it for real.

pixel-bright: the natural fit for a platformer. Its sample music is an upbeat 8-bit platformer loop and its sample sound is an 8-bit coin pickup. Bright, readable, fun.

pixel-moody: for a quieter RPG, a rainy town, a melancholy dungeon. Its sample music is a melancholy lofi chiptune with rain, and its sound is an 8-bit door unlock.

voxel-bright: a cheerful chiptune adventure loop and a block-break crunch, good for a chunky, colourful top-down world.

painterly-fantasy: if you would rather paint the art than draw it in pixels (the 2d-mode skill allows painted sprites when you ask for finished painted pieces), its wistful strings and harp suit a storybook RPG.

Every Jayzee world is a shared room from the first minute, and that includes 2D. Up to 64 players can stand in a place at once, and the main room holds nearly unlimited players.

A platformer usually works best as many people running the same course at the same time: everyone sees each other's heroes, but each runs alone, and the shared part is the board and the bragging.

A top-down RPG is naturally social: a town square full of other players, parties heading into the same cave. A party is a ready-made team (player.party).

player.party

When a dungeon or boss fight should belong to one group, a place can open a private copy per party or per player (instance: party or instance: solo in that place's config).

instance: solo

Ground a player changes for everyone (a dug tile, a farm plot) reads from world.state, so it is shared by everyone in that room.

Enemies fill the world when other players don't: they are just entities with a behavior, and for dozens of them one manager script steps them all.

Phones get controls automatically from your game's own inputs. The stick appears only for axes named exactly moveX and moveZ (or moveY in 2D), so keep those names. Every action becomes a round button (a chip of 56 or 48 px), up to four of them, with jump ranked first.

moveY

Platformer: stick under the left thumb, a big jump button under the right, maybe an attack chip beside it.

Runner: you can drop the stick entirely and make the whole screen the button: orientation: portrait, sticks: [], gestures: { tap: jump, hold: slide }.

orientation: portrait

sticks: []

gestures: { tap: jump, hold: slide }

Top-down RPG: stick on the left, attack and interact chips on the right. The interact chip carries the action's own word, INTERACT.

Keep HUD plates clear of the right edge where Jayzee's rail sits, and make them fit a 390 px wide phone.

spawn.co/@gamex_feed/eldoria-rpg-120xp, Eldoria [RPG] 120xp: a top-down pixel RPG where you wake in Trade Central, pick a vocation, hunt, loot and level across ten biomes.

spawn.co/@gamex_feed/eldoria-rpg-120xp

spawn.co/@majid/rpg-fighter, RPG Fighter: ten RPG heroes, knight to dragoon; pick one and fight best of three in a burning pixel-art keep.

spawn.co/@majid/rpg-fighter

spawn.co/@pixelmg_dev/world-adventure-of-pixels, WORLD ADVENTURE of PIXELS: run, jump, stomp and bonk ? blocks across a pixel world to reach the flag.

spawn.co/@yujiro/totally-normal-platformer, Totally Normal Platformer: a cute little platformer where nothing is a trap. Probably.

spawn.co/@yujiro/totally-normal-platformer

spawn.co/@chucky/higher, Higher: race up disco towers, candy mountains and alien peaks in a toon-bright climbing arcade with a leaderboard.

spawn.co/@chucky/higher

spawn.co/@izkimar/diablo-survivors, Diablo Survivors: pick your hero at the camp fire, step through the portal, survive the horde.

spawn.co/@izkimar/diablo-survivors

One session can stand up a complete, playable first level. For a platformer it looks like this:

Place: jayzee starter 2d-side, then a tile ground of about 60 tiles across with a surface band, three or four floating platforms, two pits, and a parallax sky strip behind (sprite.parallax: [0.25, 1], repeatX: true).

sprite.parallax: [0.25, 1]

repeatX: true

Hero: the starter's drawn hero, given idle, walk and jump frames in its atlas (hero frames are 32 by 40 texels in top-down, 56 by 64 in side view).

Loop: run, jump, collect twelve coins, reach the flag.

Win and lose: falling into a pit returns you to the last checkpoint flag; reaching the end flag is the win, played as a moment first (a burst of sparkles, a sting of music, your time large on screen) and then a plate with your time, your coins and a button to go again.

HUD: coins top-left and the run clock top-right, each on a small plate in the pixel face, the clock big.

Sound: a pixel-bright music loop through ctx.music.play, a coin chime that steps up in pitch with each coin in a row, a jump boing, a thud on landing.

ctx.music.play

Effects: a little dust puff at the feet on landing, a sparkle on each coin, a burst at the flag.

Saved: your best time in player.state, and the top ten times on a board.

For a top-down RPG the first session is a village of about 40 by 30 tiles with grass, paths and water edges, a fence with a gate, three townsfolk with a line each, a field outside with four slimes, a quest to clear them, and a bag and gold counter that save.

Art consistency is everything. One palette, one texel density (the starter ground is 32 texels a metre), one light direction. A box floor under pixel sprites, a stretched sprite, or one hand-drawn character next to one painted one breaks the illusion immediately.

Art consistency is everything.

Every facing is drawn. A top-down hero has up to eight facings and each is its own drawn pose (never a mirror flip), times every animation. Plan a small set and grow it.

Every facing is drawn.

Collision rules are opposite in the two modes. In top-down, world objects are solid and collide at their feet (a tree trunk blocks, its canopy doesn't); in side view, background dressing is not solid and only the playable band is. Mixing them up gives invisible walls or ghost platforms.

Collision rules are opposite in the two modes.

Gravity is yours in side view. The controller adds none: every body's script bends its own vertical speed each tick, or it floats.

Gravity is yours in side view.

Platformer feel is fiddly. Jump height, how fast you fall, how much control you have in the air: these numbers decide whether the game feels good, and they take tuning by playing.

Platformer feel is fiddly.

Content is the real work in an RPG. Movement and combat are a session; quests, items, maps and dialogue are weeks.

Content is the real work in an RPG.

The signature mechanic of a side-scroller is the run and jump. The engine adds no gravity in 2d-side, so the hero's own script reads the input, bends its vertical speed every tick, and picks which drawn animation plays:

// scripts/hero.js: on the player in a 2d-side place; its sprite's atlas has idle, walk and jump const GRAVITY = -30, RUN = 6, JUMP = 11; export function onInput(ctx, input) { ctx.self.session.run = input.axes.moveX ?? 0; if (input.pressed.jump && ctx.self.grounded) ctx.self.session.jump = true; } export function update(ctx, dt) { const s = ctx.self.session, v = ctx.self.velocity; let vy = v.y + GRAVITY * dt; // gravity is ours to add if (s.jump) { vy = JUMP; s.jump = false; } ctx.self.velocity = { x: (s.run ?? 0) * RUN, y: vy, z: 0 }; const clip = !ctx.self.grounded ? "jump" : s.run ? "walk" : "idle"; ctx.self.anim.locomotion = { clip, weight: 1 }; }

And a top-down world changes its ground for everyone with one line: ctx.place.tiles[x][y] = id paints a tile, = 0 carves it, and delete returns it to whatever the ground generator says.

#### Block 1

````text
spawn starter 2d-top
````

#### Block 2

````text
spawn starter 2d-side
````

#### Block 3

````text
scripts/tex-hero.js
````

#### Block 4

````text
?facing=
````

#### Block 5

````text
engine.graphics.perfectPixelArt
````

#### Block 6

````text
tileAt
````

#### Block 7

````text
solidTiles
````

#### Block 8

````text
heightOffset
````

#### Block 9

````text
Jersey 10
````

#### Block 10

````text
Geist Pixel Square
````

#### Block 11

````text
ctx.atlas({ frameSize, animations: { idle: 2, walk: 4 }, fps, draw(g, f) })
````

#### Block 12

````text
ctx.self.anim.locomotion = { clip: "walk", weight: 1 }
````

#### Block 13

````text
player.party
````

#### Block 14

````text
instance: solo
````

#### Block 15

````text
moveY
````

#### Block 16

````text
orientation: portrait
````

#### Block 17

````text
sticks: []
````

#### Block 18

````text
gestures: { tap: jump, hold: slide }
````

#### Block 19

````text
spawn.co/@gamex_feed/eldoria-rpg-120xp
````

#### Block 20

````text
spawn.co/@majid/rpg-fighter
````

#### Block 21

````text
spawn.co/@yujiro/totally-normal-platformer
````

#### Block 22

````text
spawn.co/@chucky/higher
````

#### Block 23

````text
spawn.co/@izkimar/diablo-survivors
````

#### Block 24

````text
sprite.parallax: [0.25, 1]
````

#### Block 25

````text
repeatX: true
````

#### Block 26

````text
ctx.music.play
````

#### Block 27

````text
// scripts/hero.js: on the player in a 2d-side place; its sprite's atlas has idle, walk and jump
const GRAVITY = -30, RUN = 6, JUMP = 11;

export function onInput(ctx, input) {
  ctx.self.session.run = input.axes.moveX ?? 0;
  if (input.pressed.jump && ctx.self.grounded) ctx.self.session.jump = true;
}

export function update(ctx, dt) {
  const s = ctx.self.session, v = ctx.self.velocity;
  let vy = v.y + GRAVITY * dt;            // gravity is ours to add
  if (s.jump) { vy = JUMP; s.jump = false; }
  ctx.self.velocity = { x: (s.run ?? 0) * RUN, y: vy, z: 0 };
  const clip = !ctx.self.grounded ? "jump" : s.run ? "walk" : "idle";
  ctx.self.anim.locomotion = { clip, weight: 1 };
}
````


### After clicking "Clickers, card & board games"

These are the games where the rules matter more than the running around: tap the big thing and watch the number climb, play a hand of cards against three friends, move pieces on a board, guess today's puzzle. On Jayzee most of them run screen-first: the whole game is a web page made of buttons, numbers and cards, with no 3D drawn at all, and the rules run quietly behind the buttons. This very site runs that way. It means fast loading, crisp text, and a game that feels at home on a phone. What makes them special here is that they are shared from the first minute: a clicker can be one giant number everyone in the room pushes up together, a card table fills with real people at a link, and the board of best scores spans every room the game has ever had.

For a clicker or idle game:

The player arrives to one big thing to tap and a number at zero.

Each tap adds to the number, with a little pop and a chime.

The number buys upgrades: more per tap, then helpers that earn on their own.

Upgrades get expensive faster than income grows, so the player keeps choosing what to buy next.

Eventually they "rebirth": start over with a permanent bonus, and climb faster.

Their total sits on a board, and in a shared clicker, everyone's taps count toward one goal for the room.

For a card or board game:

Players gather at a table (a seat, or a table that fills when enough people arrive).

The game deals: each player sees only their own hand.

Turns go round: play a card, move a piece, roll, draw. The game checks what is legal.

Someone wins the hand or the game; it is shown to everyone, then the table offers another round.

For a daily puzzle or quiz:

One puzzle a day, the same for everyone.

The player guesses, the game marks each guess.

They solve it (or run out of tries), see their streak, and share it.

ui-game (Screen-first): the screen is HTML, no 3D drawn, rules run behind buttons. It is built for clickers, card games, idle games, quizzes and dashboards. A place in mode: ui opens with no 3D graphics at all; the whole game is what ui.js returns, re-drawn whenever what it reads changes.

mode: ui

When the cards or pieces should be real objects on a table you can lean over (a pool table, a chess board, a gem cube you turn), choose 3d instead: the game becomes a 3D place with a camera over the board, and clicks on pieces come from the pointer-raycasting skill. 8-Ball Pool 3D and GEMSMITH 3D below are built that way. A simple rule: if the thing the player touches is a number or a card, screen-first; if it is a ball or a piece that moves, 3D.

game-ui: the whole game lives here. HUD plates, menus, cards, shop dialogs (data-modal), the font (engine.ui.theme.font: Jersey 10 or Geist Pixel Square), and the rule that buttons send actions with sendAction(name, payload).

data-modal

engine.ui.theme.font

sendAction(name, payload)

platform-systems: saves (coins, upgrades and streaks in player.state, seeded once with ??=), cheat-proof keys (platformState: ["gold"] so no player's machine can write them), SQL leaderboards across every room, timers (ctx.after, and engine.crons for something every few minutes), and secret hands (a row with visibility: "owner" under a player reaches only that player's screen; visibility: "platform" for a deck nobody sees).

platformState: ["gold"]

engine.crons

visibility: "owner"

visibility: "platform"

rooms-and-matchmaking: tables of a fixed size (routing.maxPlayers), private copies of a place per group (instance: party), and Jayzee's own Invite button (ctx.emit("openInvite", {})).

routing.maxPlayers

jev: computer opponents that weigh their options and answer in odds, so a bot player bluffs some of the time instead of always playing the same card.

game-feel: a tap is a coin-weight contact: a pitch-stepped chime, a sparkle, a floating "+1", never a hitstop.

buyables: a shop that sells with spoins, Jayzee's currency, if the game wants real purchases.

audio: a soft music loop and the click, flip, shuffle and win sounds, conjured by name.

pointer-raycasting: clicking or tapping pieces when the board is 3D.

mobile-controls: mostly not needed for screen-first (your buttons are the controls), but the rules about the rail and thumb reach still apply.

A screen-first game draws no bodies, so it uses no clips: its motion is CSS (a number that kicks bigger when it changes, a card that slides into place). If you build the table in 3D with players seated around it, the sitting clips are made for exactly this: sit, sitting clap, sitting cheer, sitting thumbs up, sitting laugh, sitting point and sitting talk, plus victory, cheer, shrug and angry for the end of a hand. A body parented to a seat sits by itself.

toon-vibrant: bouncy cartoon marimba and brass, a cartoon boing: perfect for a silly clicker where everything pops.

pixel-bright: an 8-bit coin pickup is the sound of a clicker. Bright and arcade.

lowpoly-cozy: acoustic guitar and glockenspiel for a calm idle game or a cosy card table.

scifi-neon: a driving synthwave loop for a sleek dashboard or a neon casino.

gothic-horror: a low organ drone for a dark tarot table or a haunted board game.

Shared clicker: everyone is in one room and one number belongs to the room (ctx.world.state). Many hands add to it at once, so the engine's rule applies: a number two machines change at once is stepped in place (+= 1), never assigned, so no tap overwrites another. Each player's own coins stay in their player.state.

Shared clicker

+= 1

Leaderboard: the board that spans every room is SQL, written at an event (a rebirth, the end of a run), never every tick. A board can also show on Jayzee's own game page through leaderboards in world.config.yaml.

world.config.yaml

Card table: a table of four is a room or a copy of a place. Set routing.maxPlayers and the door fills rooms of that size and opens the next one; no lobby, no room codes (Jayzee has none). A friend arrives through Jayzee's invite.

Card table

Bots filling seats: an empty seat is a bot row. Give it simulatedBy: "platform" so it runs on Jayzee's machine rather than any player's, and let it pick its move with jev:decide, sampling the odds with ctx.random() so it plays like a person, not a robot.

simulatedBy: "platform"

Secrets: the deal happens on Jayzee's machine. Hands are rows under each player with visibility: "owner"; the deck is visibility: "platform". Anything else can be read by others, so a secret never rides an ordinary row.

Referee: sim.js judges claims several hands make at once: whose turn it is, who won, the last seat.

Screen-first games are some of the best phone games on Jayzee because the controls are simply your buttons. Make them big, put the main one where a thumb rests (bottom centre for the big tap target), and let rows of upgrade plates flex-wrap so they fit a 390 px wide screen, none narrower than its one-line label. A panel taller than about 640 px scrolls. Keep plates clear of the right edge where Jayzee's rail sits (the HUD uses var(--spawn-chrome-reservation-right-inset) to keep its distance). Tap haptics are a ctx.emit("haptic", { kind: "light" }) from the action's handler (the Jayzee app buzzes; a phone browser doesn't).

flex-wrap

var(--spawn-chrome-reservation-right-inset)

ctx.emit("haptic", { kind: "light" })

spawn.co/@longthunder/cubemunity, Cubemunity: a cosy community clicker; break a giant cube together, one layer at a time.

spawn.co/@longthunder/cubemunity

spawn.co/@ohtheicee/banana-clicker, Banana Clicker: a giant banana in a field. Click it. Everyone's clicks count.

spawn.co/@ohtheicee/banana-clicker

spawn.co/@sharkyrex16/clicker-sim, Clicker Sim: click the gem, buy upgrades, rebirth, get stupid rich.

spawn.co/@sharkyrex16/clicker-sim

spawn.co/@00ercruptedsupreme/1-clicker, 1 Clicker: click the big 1, catch the golden 1, buy mines and super clickers, top the room.

spawn.co/@00ercruptedsupreme/1-clicker

spawn.co/@dreamcatcher/spawndle, Spawndle: guess the Jayzee game from one screenshot, every day, plus Wordlock, Fours, Threads and Culprits.

spawn.co/@dreamcatcher/spawndle

spawn.co/@tuanteku/8-ball-pool-3d, 8-Ball Pool 3D: 3D 8-ball pool with AI save and resume, friend matches, practice and challenges.

spawn.co/@tuanteku/8-ball-pool-3d

A first session stands up a complete shared clicker:

Place: the ui-game starter, mode: ui, one page.

Loop: one big button in the middle (a painted picture of the thing you tap). Each tap adds to your coins and to the room's shared total. Three upgrades on plates down the side: more per tap, an auto-earner, a multiplier, each price rising after each buy.

Goal and ending: a room goal (break the cube at one million taps). When the shared total crosses it, the referee writes the phase, everyone sees the same moment (a big burst, a sting, the top tapper's name across the screen for a few seconds), then the goal resets one tier higher.

Goal and ending

HUD: your coins big at the top, coins per second smaller beneath, the room's progress bar across the top, the top ten tappers on a plate.

Sound: one soft music loop, a tap pop whose pitch steps up while you tap fast, a cash register on a buy, a fanfare at the goal.

Effects: the button squashes on each tap, a "+1" floats up from the press, the coin number kicks bigger when it changes.

Saved: coins and upgrades in player.state, protected with platformState; best totals in SQL.

platformState

For a card game, the first session is one table of four with a dealt hand, legal-move checking, a turn indicator, a bot in every empty seat and a winner shown at the end of the hand.

Balance is the game. A clicker lives or dies on its numbers: how fast prices rise against income. Expect to tune by playing for longer than you spent building.

Balance is the game.

Cheating. Anything a player's own machine writes can be faked. Coins and upgrades belong in platformState, and a board should accept results judged on Jayzee's side.

Cheating.

Secrets leak if put in the wrong place. A card hand on an ordinary row or an ordinary emit can reach other players. Hands go on owner rows, dealt by the platform.

Secrets leak if put in the wrong place.

Turn games need one referee. Two machines deciding whose turn it is at the same moment cause fights; sim.js decides.

Turn games need one referee.

Empty tables. A four-player card game with one player is no game; plan bots from day one.

Empty tables.

No title screen. A start screen empties the room and costs players; the game opens straight onto the playable table or button.

No title screen.

The signature mechanic of a shared clicker: a button on the page sends an action, the player's own script pays them and adds a step to the room's total, stepping it rather than assigning it so simultaneous taps never overwrite each other.

// world.config.yaml declares the action: inputs: { actions: { tap: {} } } // ui.js: the big button export default (ctx, player) => ` <div class="plate">COINS ${player.state.coins ?? 0}</div> <div class="plate">ROOM ${ctx.world.state.taps?.total ?? 0}</div> <button onclick="sendAction('tap')">TAP</button>`; // scripts/player.js: the tapper's own body export function onInput(ctx, input) { if (!input.pressed.tap) return; const s = ctx.self.state; s.coins = (s.coins ?? 0) + (s.perTap ?? 1); ctx.world.state.taps ??= { total: 0 }; ctx.world.state.taps.total += 1; // stepped, never assigned }

#### Block 1

````text
mode: ui
````

#### Block 2

````text
data-modal
````

#### Block 3

````text
engine.ui.theme.font
````

#### Block 4

````text
sendAction(name, payload)
````

#### Block 5

````text
platformState: ["gold"]
````

#### Block 6

````text
engine.crons
````

#### Block 7

````text
visibility: "owner"
````

#### Block 8

````text
visibility: "platform"
````

#### Block 9

````text
routing.maxPlayers
````

#### Block 10

````text
+= 1
````

#### Block 11

````text
world.config.yaml
````

#### Block 12

````text
simulatedBy: "platform"
````

#### Block 13

````text
flex-wrap
````

#### Block 14

````text
var(--spawn-chrome-reservation-right-inset)
````

#### Block 15

````text
ctx.emit("haptic", { kind: "light" })
````

#### Block 16

````text
spawn.co/@longthunder/cubemunity
````

#### Block 17

````text
spawn.co/@ohtheicee/banana-clicker
````

#### Block 18

````text
spawn.co/@sharkyrex16/clicker-sim
````

#### Block 19

````text
spawn.co/@00ercruptedsupreme/1-clicker
````

#### Block 20

````text
spawn.co/@dreamcatcher/spawndle
````

#### Block 21

````text
spawn.co/@tuanteku/8-ball-pool-3d
````

#### Block 22

````text
platformState
````

#### Block 23

````text
// world.config.yaml declares the action: inputs: { actions: { tap: {} } }

// ui.js: the big button
export default (ctx, player) => `
  <div class="plate">COINS ${player.state.coins ?? 0}</div>
  <div class="plate">ROOM ${ctx.world.state.taps?.total ?? 0}</div>
  <button onclick="sendAction('tap')">TAP</button>`;

// scripts/player.js: the tapper's own body
export function onInput(ctx, input) {
  if (!input.pressed.tap) return;
  const s = ctx.self.state;
  s.coins = (s.coins ?? 0) + (s.perTap ?? 1);
  ctx.world.state.taps ??= { total: 0 };
  ctx.world.state.taps.total += 1;          // stepped, never assigned
}
````


### After clicking "read → Social hangouts Places people come to be together: a plaza, café or club with seats, emotes, voice and chat already built in. The fun is the other people."

A hangout is a place people come to be together: a plaza, a café, a beach club, a rooftop at night, a cat-filled house. There is no score to beat. The fun is the other people: walking up to someone, waving, sitting down on the same bench, dancing on the same floor, talking. Jayzee is unusually good at this, because the hardest parts of a social game already come built in: the chat (say, whispers, party, guild), voice that gets louder as you walk closer, nametags over every head, parties and friends, and one shared room that people arrive into by link. Your job is the place and the things to do in it: somewhere beautiful to stand, seats to sit in, emotes to show off, small toys and games that make strangers laugh together.

things to do in it

A player arrives into a lively spot with other people already in view (never a menu).

They walk around, see nametags, hear voices nearby, read the chat.

They do something visible: wave, dance, sit on a bench, ride the swing, pick up a ball and throw it.

Someone answers: waves back, joins the dance, sits beside them, starts talking.

Little activities give a reason to stay: a karaoke stage, a photo spot, a mini-game in the corner, a pet to feed, a room to decorate.

They leave with a friend or a party, and come back because the place feels like theirs (a saved outfit, a home, a level next to their name).

3d (3D world): a body, mouse look, jump, open sky. A hangout wants bodies with clips, seats, emotes and a camera that shows you and your friends, so the 3D starter is the natural home; swap the first-person view for a third-person orbit (the way this site's Animation Hall does) so you can see yourself dance.

A cosy pixel hangout (a café or a town square drawn from above) uses 2d-top (Top-down 2D): no gravity, a tile ground, drawn heroes, and sprites that sort by depth so people stand in front of or behind each other. It loads fast and looks great on phones, at the cost of the full-body emotes.

social: the centre of the genre. Your own scripts/chat.js adds channels (a zone scope so only people in the same room of the club read each other, or a voice: true scope for a private booth), sets what the nametag shows (export const character = "name", plus up to four profile rows such as a level), hears chat lines with onSay for /commands, and speaks as the world with ctx.emit("say", { text, scope }). Parties and guilds are Jayzee's own: partyAdd, guildAdd.

scripts/chat.js

voice: true

export const character = "name"

profile

ctx.emit("say", { text, scope })

animations: emotes. Any clip plays on a channel over the walk (ctx.self.anim.gesture), with a spine mask so the legs keep walking; a body parented to a seat sits by itself.

ctx.self.anim.gesture

rooms-and-matchmaking: the main room holds almost everyone, there is no lobby and no room code; friends come by Jayzee's invite (ctx.emit("openInvite", {})) or share (openShare). A private apartment is a place with instance: party (or solo) and persistence: persistent so the decorations stay.

interactive-objects: seats, doors, swings, things you can pick up and hand to someone.

atmosphere and looks: the vibe is the product. A sunset, string lights, fog over the water, a warm colour grade.

audio: a quiet music bed, ambient beds (waves, café clatter), and ctx.music.play for one shared jukebox everyone hears.

game-ui: an emote wheel, a small "now playing" plate, plates that follow a thing (data-world-anchor).

data-world-anchor

platform-systems: player saves (outfit, home layout, coins), and gentle cosmetics for sale with buyables.

mobile-controls: a stick and a few chips, including the emote button.

This genre uses more of the library than any other. From Social: wave, wave one hand, wave both hands, point, clap, laugh, cry, talk, cheer, bow, salute, shrug, thumbs up, nod yes, shake no, angry, pickup and victory. From Emotes & dance: dance, chicken dance, locking hip hop, slide hip hop, step hip hop, wave hip hop and backflip, plus the seated set (sitting cheer, sitting thumbs up, sitting laugh, sitting point, sitting clap, sitting talk) for when people are on benches. From Body & traversal: sit, sit on floor and sleep for lounging, swim idle and swim for a pool or beach, drive, enter car and exit car if cars cruise the boulevard. And the Locomotion set (idle, walk, run, jump, fall, land) underneath everything. You can watch every one of these on a figure in this site's Animation Hall.

lowpoly-cozy: the default hangout feel. Acoustic guitar, glockenspiel, soft footsteps on wood. A café, a cabin, a village green.

toon-vibrant: bright and bouncy, for a party plaza or a goofy playground.

scifi-neon: driving synthwave for a night club, a rooftop city, a neon arcade.

pixel-bright: chiptune for a cheerful top-down town square.

painterly-fantasy: a fairy glade or a floating island tea house, with harp and strings.

One big room. A hangout is the case Jayzee's main room was made for: nearly unlimited people in one place. If a busy hangout wants smaller, cosier rooms, routing.maxPlayers caps each room and the door opens the next one, filling the fullest room that still has space so people find people.

One big room.

No bots needed in seats, but an empty hangout is sad: the first visitor should find life. Ambient NPCs (a barista, a DJ, cats wandering) and a world that moves on its own (music, water, lights) fill the space until people come.

No bots needed in seats

Homes and private rooms are copies of a place per party or per player (instance: party | solo), kept with persistence: persistent.

Homes and private rooms

instance: party | solo

Voice and chat are Jayzee's: spatial voice over earshot, and a ring on the talking head (player.talking) your nametag or HUD can read.

player.talking

Saved per player: player.state follows a player into every room and through portals, so their outfit and home go with them.

Saved per player

The phone layout comes from your inputs: axes named moveX and moveZ give a thumb stick on the left, and each action becomes a round chip on the right, at most four, the first one biggest. For a hangout that is: jump, emote (opens the emote wheel), interact (sit, pick up) and maybe a camera button. Make emote-wheel buttons large, keep plates clear of Jayzee's rail on the right edge, and remember Jayzee's own chat and mic buttons already live on the screen: never stack your HUD over them.

spawn.co/@binxius/spawn-hangout, Jayzee Hangout: a lakeside town to meet up, talk and play: ski, skate, bowl, shoot pool and fire yourself out of a cannon.

spawn.co/@chizkeykkk/cat-haven, Cat Haven: a pink house in the clouds with a glass-domed cat yard. Carry the cats, pet them, run the cloud roads.

spawn.co/@ninjacatlive/dojo-city, DOJO CITY: games, a casino and a social hangout in a Ninja Cat world.

spawn.co/@ninjacatlive/dojo-city

spawn.co/@chucky/need-for-spawn, Need for Jayzee: build your street car in an underground garage, then run it hot on the night test track.

spawn.co/@chucky/need-for-spawn

spawn.co/@longthunder/cubemunity, Cubemunity: a cozy community clicker; break a giant cube together, one layer at a time.

A first session stands up a small, beautiful plaza people want to stay in:

Place: the 3d starter with a third-person orbit camera, terrain flattened into a round plaza about 40 m across: a fountain in the middle, benches around it, string lights, a small stage to one side. Golden-hour sky and a warm grade.

Loop: walk, emote, sit. An emote wheel with eight clips (wave, dance, clap, cheer, laugh, bow, thumbs up, chicken dance). Every bench seat is a seat object: walk up, press interact, sit; sitting emotes swap to the seated set.

A toy: one shared activity, a ball anyone can kick into the fountain, or a stage where whoever stands on it gets a spotlight and the crowd's cheer clip plays.

A toy

No win or lose: instead, little recognitions. A "hangouts visited" counter, a title under your name after an hour here (a profile row), confetti when ten people dance at once.

No win or lose

HUD: almost nothing. A small plate with how many people are here, the emote wheel button, the now-playing song.

Sound: a quiet music bed for everyone, the fountain's water as a spatial bed (gain about 0.15), soft footsteps, a sparkle on each emote.

Effects: fireflies or drifting petals near the lights, a burst of confetti at the stage, the fountain's spray.

Chat: a scripts/chat.js with a zone scope so the café corner and the stage each have their own talk.

The empty room. A hangout with one person in it is a walk in a park. Ambient life, sound and NPCs carry it until real crowds arrive; invites matter more here than anywhere.

The empty room.

Reasons to come back. Without saved progress (homes, outfits, titles), people visit once. Plan one thing that grows.

Reasons to come back.

Performance with many bodies. Forty animated avatars, lights and particles on a phone is real cost; keep effects light and lights few.

Performance with many bodies.

Safety. Anything players type or draw is visible to strangers. Jayzee's chat and moderation carry this; a game never relays one player's words to another by its own route, and never builds its own sign-up, friend code or player ID.

Safety.

It's design, not code. The hard part is making a place feel alive: light, sound, density of small details. Budget more time on looking and tuning than on scripting.

It's design, not code.

An emote: a button sends an action, and the player's own body plays a library clip on a gesture channel over the walk. Weight 4 beats the idle, and the spine mask leaves the legs to keep walking.

// world.config.yaml: inputs: { actions: { emote: {} } } // ui.js: <button onclick="sendAction('emote', { clip: 'dance-loop' })">DANCE</button> // scripts/player.js const EMOTES = ["wave-loop", "dance-loop", "clap-loop", "cheer-loop", "bow", "thumbs-up"]; export function onInput(ctx, input) { if (!input.pressed.emote) return; const clip = input.actionData.emote?.clip; if (!EMOTES.includes(clip)) return; ctx.self.anim.gesture = { clip: `cdn/clip-${clip}.glb`, weight: 4, duration: 3, mask: { from: "Spine" }, }; }

#### Block 1

````text
scripts/chat.js
````

#### Block 2

````text
voice: true
````

#### Block 3

````text
export const character = "name"
````

#### Block 4

````text
profile
````

#### Block 5

````text
ctx.emit("say", { text, scope })
````

#### Block 6

````text
ctx.self.anim.gesture
````

#### Block 7

````text
data-world-anchor
````

#### Block 8

````text
instance: party | solo
````

#### Block 9

````text
player.talking
````

#### Block 10

````text
spawn.co/@ninjacatlive/dojo-city
````

#### Block 11

````text
spawn.co/@chucky/need-for-spawn
````

#### Block 12

````text
// world.config.yaml: inputs: { actions: { emote: {} } }
// ui.js: <button onclick="sendAction('emote', { clip: 'dance-loop' })">DANCE</button>

// scripts/player.js
const EMOTES = ["wave-loop", "dance-loop", "clap-loop", "cheer-loop", "bow", "thumbs-up"];
export function onInput(ctx, input) {
  if (!input.pressed.emote) return;
  const clip = input.actionData.emote?.clip;
  if (!EMOTES.includes(clip)) return;
  ctx.self.anim.gesture = {
    clip: `cdn/clip-${clip}.glb`,
    weight: 4,
    duration: 3,
    mask: { from: "Spine" },
  };
}
````


### After clicking "read → NPC-driven story games Stories carried by characters who answer what players say, remember each player, and decide with a mind of their own, chapter by chapter."

A story game is carried by the people in it: a village where every neighbour remembers you, a haunted house where the pet you are minding changes a little more every day, a shift at a factory where a voice on the radio tells you what to do next. On Jayzee these characters can be far more than a list of lines. The engine ships language-model jobs, so an NPC can actually answer what a player types, keep a memory of that player, and stay in character from a short description you write. It also ships jev, a "mind" for characters that weighs a few options and picks one with odds, so a shopkeeper haggles and a guard grows suspicious. The game around them is yours: the place, the days or chapters, the choices that matter, and the ending. Think of it as writing a play where the actors can improvise, and your script decides what scenes happen and when.

The player arrives somewhere with a clear first person to meet (a figure waving at the gate, a note on the door).

They walk up; a prompt appears ("Talk"); they press interact.

A dialog card opens: the character greets them, and the player picks a reply or types their own.

The conversation gives them something: a task, a clue, an item, a feeling about the character.

They go out and act on it: find the thing, visit the next person, choose a door.

The world remembers. The next character knows what happened, a flag changes what is possible, a day passes.

Chapter by chapter (or day by day) the story builds to an ending, and the choices made decide which one they get.

3d (3D world) is the usual choice: characters with bodies and faces, a village or house you walk through, a camera that can frame a conversation. Story games love atmosphere, and the 3D starter gives you sky, fog and light to set the mood. Call of the Soil and Building 66 below are built this way.

2d-top (Top-down 2D) suits a cosy pixel story in the spirit of classic RPG villages: drawn characters, tile houses, dialog boxes at the bottom of the screen. Cheap to make look good and lovely on phones.

ui-game (Screen-first) works for pure text adventures, visual novels and interrogation games where the story is all cards, choices and portraits, with no walking at all.

platform-systems: the AI text jobs. llm:chat is a character that talks: you give it a system description, the player's message, and a conversationId that IS its memory, written as "npc:" + npcId + ":" + playerId so each player gets their own relationship. It answers in r.data.text, and can stream word by word with onPart. llm:generate with a schema returns structured data (a quest, a verdict, a mood), and llm:clear makes a character forget. Each answer takes seconds, so set state.loading from the moment of asking to the reply. This skill also covers saves (story flags in player.state) and timers (ctx.after).

conversationId

"npc:" + npcId + ":" + playerId

r.data.text

schema

state.loading

jev: minds for NPCs. ctx.job("jev:decide", { state, questions }) asks a choice question with instructions and criteria, and answers with odds you sample with ctx.random(), so a character's decisions vary like a person's. Asked at moments, never every tick.

ctx.job("jev:decide", { state, questions })

interactive-objects: the Talk button. You declare an interact action, the player's script finds the nearest interactable within 3 m and sends it a press; the NPC's ear answers. The prompt itself is your UI, anchored over the character.

interactable

game-ui: the dialog card (data-modal, so it owns the screen and frees the cursor), choices as buttons that sendAction, a quest log, a plate that follows a character with data-world-anchor.

social: characters can also hear the chat. An ears.say on an NPC rings for lines spoken within earshot, so a shopkeeper answers "buy". And the world can speak with ctx.emit("say", …).

ears.say

ctx.emit("say", …)

animations: characters that talk with their hands, nod, shake their heads, point the way, and a walking gait for NPCs that move (humanoid-locomotion.js beside their own behavior).

humanoid-locomotion.js

audio: voiced lines conjured from words, one voice identity per character, a mood soundtrack that crossfades as chapters turn and ducks under a voice line.

atmosphere and looks: time of day as storytelling, fog for dread, a warm grade for home.

cameras: a camera that turns to frame the speaker during a conversation.

From Social: talk (the backbone of every conversation), nod yes, shake no, point, wave, shrug, laugh, cry, angry, bow, salute, clap, cheer, thumbs up, and pickup for handing over an item. From Body & traversal: sit and sit on floor for a character at a table or a campfire, sleep for the night scenes, and crouch idle / crouch walk for sneaking in a horror story. From Locomotion: idle, walk and run for characters going about their day. From Combat: hit react and die, if the story turns dangerous. The seated set (sitting talk, sitting laugh, sitting point, sitting clap) is perfect for conversations at a table.

painterly-fantasy: harp, strings and soft woodwinds for a village tale or a fairy story.

lowpoly-cozy: acoustic, gentle, homely: a farm life story, a neighbourhood, a slice of life.

gothic-horror: low organ drones and creaks for the haunted house or the night shift.

realistic-gritty: grounded and heavy for a mystery, a crime story or a survival drama.

pixel-moody: melancholy chiptune for a small, sad, beautiful pixel story.

Story games are often best played alone or with one or two friends, because a story has one pace.

Solo or party copies: a place with instance: solo (or party) gives each player or group their own copy of the house or village, so their choices do not collide with strangers'. persistence: session or persistent decides how long that copy lives.

Solo or party copies

Memory per player: player.state holds the story flags (met the baker, found the key, day 4) and follows the player into every room. Because conversationId includes the player's id, the same character keeps a separate memory for each person.

Memory per player

Shared towns: a living village everyone shares (like Call of the Soil) works too. Then the NPCs belong to the room, and each conversation is still private by its conversation id.

Shared towns

NPCs fill the world: there are no seats to fill; your characters ARE the company. Run important NPC minds on Jayzee's machine (simulatedBy: "platform") so they do not depend on which player is nearby.

NPCs fill the world

A story game needs very little: the movement stick from axes named moveX/moveZ, and an interact action, which a phone shows as a chip carrying its word, INTERACT. Dialog choices are big buttons stacked at the bottom of the screen, easy for thumbs. Typing a free reply works through the phone's keyboard, but always offer two or three ready-made replies so nobody has to type. Keep the dialog card clear of Jayzee's rail on the right edge.

spawn.co/@ayon/call-of-the-soil-a-bengal-village-adventure, Call of the Soil: A Bengal Village Adventure: roam a living Bangladeshi village, chat with neighbours, make friends, ride rickshaws and boats, race on the river and join festivals, in English or Bangla.

spawn.co/@ghost_dragon/ten-days-petsitting-horror, Ten Days Petsitting (horror): ten days pet-sitting the sweetest pet on the street. Something changes every day.

spawn.co/@ghost_dragon/ten-days-petsitting-horror

spawn.co/@fracture/building-66, Building 66: Norilsk, 1994. Seven night shifts. Find the fuses, bring the power back, and do not look behind you.

spawn.co/@op_nico/haunted-plushie-game-lingo-pals-horror-stories, Haunted Plushie game: Lingo Pals Horror Stories: learn the Chinese word, pick the right door, or she finds you.

spawn.co/@op_nico/haunted-plushie-game-lingo-pals-horror-stories

spawn.co/@lakaplay/cartoon-horror, Cartoon horror: find 8 film reels in the foggy woods before Cartoon Cat and Cartoon Dog find you.

A first session stands up one small, complete chapter:

Place: the 3d starter shaped into a tiny village square at dusk: three houses, a well, lamps glowing, a path leading out.

Cast: three characters, each a body with a name plate and a short written personality: a baker who knows everything, a worried mother whose child is missing, and an old man by the well who speaks in riddles. Each runs llm:chat with its own system description and a list of facts it knows.

Loop: walk up, the "Talk" prompt appears, press interact, a dialog card opens. Two ready replies and a box to type your own. The characters drop clues; the player follows them to the child's hidden spot (a glowing object to find).

Win and lose: finding the child before nightfall (a 10-minute timer, the sky darkening as it runs) ends the chapter happily; night falling first ends it with the mother's sad goodbye. Both endings save a flag that chapter two would read.

HUD: a small quest line in the corner ("Find Mira before dark"), the clock as a sun sinking along a bar, and the dialog card.

Sound: a gentle evening music loop, crickets as an ambient bed, a soft chime when a clue is learned, the voice of each character conjured from their words.

Effects: fireflies by the well, the found object pulsing with a highlight, a warm glow when the child is found.

Saved: story flags and what each character told the player in player.state.

AI characters wander. A language model will happily make things up. Give each character a tight system description, the facts it is allowed to know, and let your script, not the model, decide what changes in the world. Use llm:generate with a schema when you need a clean yes/no ("did the player convince her?").

AI characters wander.

Waiting. Each answer takes seconds. Show a thinking state, stream the words with onPart, and never freeze the player while waiting.

Waiting.

Limits per player. Language model calls are rationed, so ask at moments that matter (when a player speaks), never on a timer or every tick.

Limits per player.

Branching grows fast. Every choice doubles the paths. Keep the big choices few and the small reactions many.

Branching grows fast.

Pacing. A story that is all talking is a book. Mix conversation with moving, finding, and small scares or triumphs.

Safety. Players type anything. Jayzee's text:check job exists for checking text, and a character's description should keep it gently in its role.

A character that answers in its own voice and remembers each player: the player presses interact near it, the NPC's ear hears the press, and it asks llm:chat with a conversation id that is unique to that NPC and that player. The reply lands in the player's state, where the dialog card reads it.

// scripts/npc.js: on the baker (tags: ["interactable"], state: { name: "Ada" }) const SYSTEM = "You are Ada, the village baker. Warm, nosy, talks in short lines. " + "You saw Mira, a small girl, walk toward the old mill at noon. Never mention anything else you weren't told."; export const ears = { press: (ctx, { by }) => { const player = ctx.getObject(by); if (!player) return; player.state.talk = { with: ctx.self.id, loading: true, text: "" }; ctx.job("llm:chat", { conversationId: "npc:" + ctx.self.id + ":" + player.id, system: SYSTEM, message: player.state.said ?? "Hello!", model: "fast", }, (r) => { player.state.talk = { with: ctx.self.id, loading: false, text: r.ok ? r.data.text : "Ada smiles and goes back to her dough." }; }); }, };

The player's own script sends the press: on input.pressed.interact it finds the nearest interactable within 3 m and calls ctx.emit("press", { by: ctx.self.id }, { to: nearest.id }). The dialog card in ui.js shows player.state.talk.text, or a "..." while loading is true.

input.pressed.interact

ctx.emit("press", { by: ctx.self.id }, { to: nearest.id })

player.state.talk.text

#### Block 1

````text
conversationId
````

#### Block 2

````text
"npc:" + npcId + ":" + playerId
````

#### Block 3

````text
r.data.text
````

#### Block 4

````text
schema
````

#### Block 5

````text
state.loading
````

#### Block 6

````text
ctx.job("jev:decide", { state, questions })
````

#### Block 7

````text
interactable
````

#### Block 8

````text
ears.say
````

#### Block 9

````text
ctx.emit("say", …)
````

#### Block 10

````text
humanoid-locomotion.js
````

#### Block 11

````text
spawn.co/@ghost_dragon/ten-days-petsitting-horror
````

#### Block 12

````text
spawn.co/@op_nico/haunted-plushie-game-lingo-pals-horror-stories
````

#### Block 13

````text
// scripts/npc.js: on the baker (tags: ["interactable"], state: { name: "Ada" })
const SYSTEM = "You are Ada, the village baker. Warm, nosy, talks in short lines. " +
  "You saw Mira, a small girl, walk toward the old mill at noon. Never mention anything else you weren't told.";

export const ears = {
  press: (ctx, { by }) => {
    const player = ctx.getObject(by);
    if (!player) return;
    player.state.talk = { with: ctx.self.id, loading: true, text: "" };
    ctx.job("llm:chat", {
      conversationId: "npc:" + ctx.self.id + ":" + player.id,
      system: SYSTEM,
      message: player.state.said ?? "Hello!",
      model: "fast",
    }, (r) => {
      player.state.talk = { with: ctx.self.id, loading: false,
        text: r.ok ? r.data.text : "Ada smiles and goes back to her dough." };
    });
  },
};
````

#### Block 14

````text
input.pressed.interact
````

#### Block 15

````text
ctx.emit("press", { by: ctx.self.id }, { to: nearest.id })
````

#### Block 16

````text
player.state.talk.text
````


## Not captured

Controls clicked: 20 of 20 planned controls in this section, out of 0 candidates found after the load and the scroll.
Controls not clicked by policy: 8. Their labels name an action that changes state or sends something, so they were left alone: "read → 3D action & adventure A body in a 3D world with a sword, a gun or a spell, a place worth crossing and something in the way. Jayzee's strongest genre: start from 3d, add combat and juice."; "A body in a 3D world with a sword, a gun or a spell, a place worth crossing and something in the way. Jayzee's strongest genre: start from 3d, add combat and juice."; "read → Racing & vehicles Cars, karts, boats, planes, dragons: a dynamic hull you sit in, pushed by real forces. Add a track, checkpoints and a referee and you have a race."; "Cars, karts, boats, planes, dragons: a dynamic hull you sit in, pushed by real forces. Add a track, checkpoints and a referee and you have a race."; "read → Survival & building Gather, build, hold out through the night. Jayzee's block world digs and places out of the box; add hunger, a night that bites and a base worth defending."; "Gather, build, hold out through the night. Jayzee's block world digs and places out of the box; add hunger, a night that bites and a base worth defending."; "read → Clickers, card & board games Screen-first games where the rules matter most: tap the number up, play a hand, move a piece, solve today's puzzle, together with the room."; "Screen-first games where the rules matter most: tap the number up, play a hand, move a piece, solve today's puzzle, together with the room.".
Controls that could not be found again after a retry: 0. Errors: 0.

Clicks made: 20. Clicks that brought up content not in the swept state: 20. The rest brought up nothing new.


## Sources

- `wiki-tools/recapture/states/toolbox/11-initial.json`
- `wiki-tools/recapture/states/toolbox/11-swept.json`
- `wiki-tools/recapture/states/toolbox/11-c001.json`
- `wiki-tools/recapture/states/toolbox/11-c002.json`
- `wiki-tools/recapture/states/toolbox/11-c003.json`
- `wiki-tools/recapture/states/toolbox/11-c004.json`
- `wiki-tools/recapture/states/toolbox/11-c005.json`
- `wiki-tools/recapture/states/toolbox/11-c006.json`
- `wiki-tools/recapture/states/toolbox/11-c007.json`
- `wiki-tools/recapture/states/toolbox/11-c008.json`
- `wiki-tools/recapture/states/toolbox/11-c009.json`
- `wiki-tools/recapture/states/toolbox/11-c010.json`
- `wiki-tools/recapture/states/toolbox/11-c011.json`
- `wiki-tools/recapture/states/toolbox/11-c012.json`
- `wiki-tools/recapture/states/toolbox/11-c013.json`
- `wiki-tools/recapture/states/toolbox/11-c014.json`
- `wiki-tools/recapture/states/toolbox/11-c015.json`
- `wiki-tools/recapture/states/toolbox/11-c016.json`
- `wiki-tools/recapture/states/toolbox/11-c017.json`
- `wiki-tools/recapture/states/toolbox/11-c018.json`
- `wiki-tools/recapture/states/toolbox/11-c019.json`
- `wiki-tools/recapture/states/toolbox/11-c020.json`
- `wiki-tools/recapture/states/toolbox/summary-11.json`
