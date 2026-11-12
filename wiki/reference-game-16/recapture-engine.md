# Game page section: Engine: text not in the capture

The Engine section of the toolbox, read on load, after a scroll, and after a click on each control that does not change state. Only text, headings, links, images and code that the first capture does not hold are listed.

## Items not in the capture

| Item | Count |
| --- | --- |
| Headings | 26 |
| Visible text blocks | 1551 |
| Hidden text blocks | 0 |
| Links | 0 |
| Images | 0 |
| Code or data blocks | 522 |

## Present on load, not in the capture

None found on load.

## Loaded after a scroll, not in the capture

None found after the scroll.

## Loaded after a click, not in the capture

### After clicking "read → Multiplayer & rooms Every Jayzee world is multiplayer out of the box: rooms, the 64-player place view, who simulates what, and how a referee keeps a match fair."

- H3: What you get
- H3: What the instructions look like
- H3: What it means for a game
- H3: Related skills

← the engine

Every Jayzee world is online from the first second. You do not set up servers, write netcode, or build a lobby: Jayzee carries every player's movement and every shared number between machines for you. What you design is the game that happens inside the room.

What you get

A room everyone shares. By default a world is multiplayer: friends arrive by link, by Jayzee's invite, through a portal, or with their party. The default room is called main, and a room holds nearly unlimited players.

A room everyone shares.

Invites and sharing are already built. Your game never mints its own invite links or room codes. A button in your game just asks Jayzee to open its own invite or share sheet.

Invites and sharing are already built.

Rooms that remember. Each room keeps what happened in it: its world state, its clock, its random numbers. Come back tomorrow and the room is as you left it (unless you choose otherwise).

Rooms that remember.

Automatic matchmaking for sized matches. Say "rooms of 8" and the door fills a room to 8, then opens the next one. That one number is the whole matchmaker.

Automatic matchmaking for sized matches.

Copies of a place per group. A dungeon or arena can open a private copy for one player or for one party, and throw it away when they leave.

Copies of a place per group.

Singleplayer if you want it. Flip one setting and nobody else ever joins; each save is its own little world.

Singleplayer if you want it.

Networking mode. world.config.yaml holds engine.networking.mode: "multiplayer" (the default, one room everyone shares) or "singleplayer" (no one else joins). A human playing against bots is still multiplayer; singleplayer is a deliberate choice.

Networking mode.

world.config.yaml

engine.networking.mode

Rooms. A room is a whole game of its own. ctx.world.state and every object belong to the room; player.state belongs to the player and follows them into every room. You read the room's name with ctx.getRoomId() (it answers "main", "room-2" and so on).

Rooms.

"main"

"room-2"

Who is here. ctx.place.players lists the players in the current place, up to 64 at once (there is no cap on how many can be in a place; the list shows 64). ctx.world.players lists every place in the room, also 64 at once. ctx.world.playerCount counts this room, and ctx.world.onlineCount counts every room of the game. Each player row carries displayName, userId (the durable id, starting pa_), portraitUrl, isLocal, isEditor, and Jayzee's own party and guild facts.

Who is here.

pa_

Routing. Room choice is the routing block: { script, maxPlayers, persistence }, plus alwaysOn.

Routing.

{ script, maxPlayers, persistence }

maxPlayers is one cap for every room of the game, enforced at the door. Unset, every body is admitted. The door counts bodies; Cleetus's helper body and a wisp's never take a slot.

script points at a file exporting pickRoom(ctx), which runs at each join and returns a room name (lowercase letters, digits, _ and -, up to 64 characters). It is for a placement rule the door cannot guess, like a region or a mode, never a lobby. It receives ctx.player (with region, such as weur or enam), ctx.rooms, ctx.requestedRoomId and ctx.rejectedRooms.

_

weur

enam

ctx.rooms

ctx.requestedRoomId

ctx.rejectedRooms

builtin/room-routing gives you ready helpers: firstOpenRoom, mostFullWithSpace, nextRoomName and roomFor.

persistence decides how long a room remembers: "persistent" (the default) keeps its state for good, "session" until it has stood empty a while, "ephemeral" only while anyone is in it.

The referee. Shared rules live in sim.js (the world's) or places/<p>/sim.js (one place's). Its tick(ctx) runs at 30 Hz on one machine per room: in a room of one, that player's window; once two share it, Jayzee's server. Your own builder body counts as none. export const cadence = "1s" slows it down. The sim reads what changed with ctx.changed(glob) and writes the rows everyone reads, like ctx.place.state.

The referee.

places/<p>/sim.js

tick(ctx)

export const cadence = "1s"

ctx.place.state

Where a hit is decided. A hit is judged on the striker's machine (target.state.hp -= d); a parry or a dodge on the target's, in its ears. A number two machines change at once (hp, a score) is stepped in place with -= or +=, never assigned.

Where a hit is decided.

target.state.hp -= d

-=

+=

Spectators. player.spectating = true hides an eliminated player's body from every eye; they keep their slot and watch.

Spectators.

player.spectating = true

Instances. A place config can say instance: party (a copy for the group at the door) or instance: solo (a copy per player), with persistence: ephemeral to drop the copy with its last player, session to keep it ten minutes after it empties, or persistent to keep a solo copy for its player.

Instances.

instance: party

instance: solo

persistence: ephemeral

What the instructions look like

A room cap with a placement rule, from the rooms skill:

// scripts/routing.js; world.config.yaml: routing: { script: scripts/routing.js, maxPlayers: 20 } import { mostFullWithSpace, nextRoomName } from "builtin/room-routing"; export async function pickRoom(ctx) { const requested = ctx.requestedRoomId; if (requested && !ctx.rejectedRooms.includes(requested)) return requested; return mostFullWithSpace(ctx) ?? nextRoomName(ctx.rooms, ctx.rejectedRooms); }

Just capping rooms needs no script at all:

routing: maxPlayers: 8

Invite and share buttons hand off to Jayzee's own:

ctx.emit("openInvite", {}); ctx.emit("openShare", {});

A referee that notices a fallen player, in the shape the docs use:

// places/main/sim.js export const cadence = "250ms"; export function tick(ctx) { const s = ctx.place.state; for (const c of ctx.changed("place.players.*.state.hp")) if ((c.value ?? 10) <= 0 && !s.fallen) s.fallen = c.path.split(".")[2]; }

A private arena copy per party, entered from the player's own script:

# places/arena/config.yaml instance: party persistence: ephemeral

const out = ctx.cross(ctx.self, "+arena"); if (!out.crossed) ctx.emit("uiEvent", { name: "refused", payload: { message: "Couldn't open the arena: try again" } });

What it means for a game

Don't build a lobby, room browser or room code. Jayzee's invite, portals and parties already bring friends together. Your game's job is the match inside the room: sides (a party is a ready-made team via player.party), rounds, ready-up, countdown, scoreboard, and the referee.

Don't build a lobby, room browser or room code.

player.party

One writer per fact. Match phase, roster and score have one owner, usually the sim or a single match-manager object. Two referees fixing the same number fight each other.

One writer per fact.

The 64-row view. ctx.place.players shows 64 players at a time. A huge social space works; just don't design a mechanic that needs to loop over every single player in a crowd of hundreds.

The 64-row view.

The sim is 30 Hz, a round trip late. Things that must feel instant (your own jump, your own swing) live in behaviors on the player's machine. The sim referees outcomes: who won, what wave it is.

The sim is 30 Hz, a round trip late.

Things only tick near people. Scripts, physics and timers run within about 500 m of a player. Something that must advance for everyone, wherever they stand, belongs in sim.js.

Things only tick near people.

Edits reach every room. When you edit the world in the builder, every room boots from that one tree. A behavior's jayzee and destroy only touch its own room.

Edits reach every room.

Player progress travels; room state stays. Prizes, inventory and levels go in player.state (it persists from any room). Live scores and leftover monsters are the room's.

Player progress travels; room state stays.

A world can keep going while nobody's on. routing.alwaysOn: true makes Jayzee visit the room every 15 minutes for 24 hours after the last player leaves, run what was owed (timers, sim ticks with the whole gap in ctx.gapMs), save and leave. Good for farms that grow overnight or a shop that restocks.

A world can keep going while nobody's on.

routing.alwaysOn: true

No custom netcode. Jayzee has no server-authoritative movement or custom networking code; even a fighting game's rollback rides on Jayzee's own multiplayer. Coins a cheater must not edit go in platformState (see the State page).

No custom netcode.

platformState

Seen by everyone, everywhere. A world boss, its health bar, or a shrinking zone circle every player must see uses audience: "all" on its row.

Seen by everyone, everywhere.

audience: "all"

Real games that lean on rooms: Sky Ring Arena Multiplayer (@rexgaming_yt/sky-ring-arena-multiplayer, 1v1 and 2v2 sword fights), Super Smash Jayzee Brawl (@hips/super-smash-spawn-brawl-ultimate-platform-fighter, online or on the couch), Cubemunity (@longthunder/cubemunity, a whole room breaking one cube together) and Banana Clicker (@ohtheicee/banana-clicker, where everyone's clicks count).

@rexgaming_yt/sky-ring-arena-multiplayer

@hips/super-smash-spawn-brawl-ultimate-platform-fighter

@longthunder/cubemunity

@ohtheicee/banana-clicker

Related skills

rooms-and-matchmaking: routing, pickRoom, instances, spectating, always-on worlds.

social: parties, guilds, chat as code, and invites from your own panel.

portals: moving players between places and worlds.

platform-systems: SQL that spans rooms, protected platformState.

game-ui: map or mode picks as pads and doorways, scoreboards in ui.js.

next: Places & portals →

#### Block 1

````text
world.config.yaml
````

#### Block 2

````text
engine.networking.mode
````

#### Block 3

````text
"main"
````

#### Block 4

````text
"room-2"
````

#### Block 5

````text
pa_
````

#### Block 6

````text
{ script, maxPlayers, persistence }
````

#### Block 7

````text
_
````

#### Block 8

````text
weur
````

#### Block 9

````text
enam
````

#### Block 10

````text
ctx.rooms
````

#### Block 11

````text
ctx.requestedRoomId
````

#### Block 12

````text
ctx.rejectedRooms
````

#### Block 13

````text
places/<p>/sim.js
````

#### Block 14

````text
tick(ctx)
````

#### Block 15

````text
export const cadence = "1s"
````

#### Block 16

````text
ctx.place.state
````

#### Block 17

````text
target.state.hp -= d
````

#### Block 18

````text
-=
````

#### Block 19

````text
+=
````

#### Block 20

````text
player.spectating = true
````

#### Block 21

````text
instance: party
````

#### Block 22

````text
instance: solo
````

#### Block 23

````text
persistence: ephemeral
````

#### Block 24

````text
// scripts/routing.js; world.config.yaml: routing: { script: scripts/routing.js, maxPlayers: 20 }
import { mostFullWithSpace, nextRoomName } from "builtin/room-routing";
export async function pickRoom(ctx) {
  const requested = ctx.requestedRoomId;
  if (requested && !ctx.rejectedRooms.includes(requested)) return requested;
  return mostFullWithSpace(ctx) ?? nextRoomName(ctx.rooms, ctx.rejectedRooms);
}
````

#### Block 25

````text
routing:
  maxPlayers: 8
````

#### Block 26

````text
ctx.emit("openInvite", {});
ctx.emit("openShare", {});
````

#### Block 27

````text
// places/main/sim.js
export const cadence = "250ms";
export function tick(ctx) {
  const s = ctx.place.state;
  for (const c of ctx.changed("place.players.*.state.hp"))
    if ((c.value ?? 10) <= 0 && !s.fallen) s.fallen = c.path.split(".")[2];
}
````

#### Block 28

````text
# places/arena/config.yaml
instance: party
persistence: ephemeral
````

#### Block 29

````text
const out = ctx.cross(ctx.self, "+arena");
if (!out.crossed) ctx.emit("uiEvent", { name: "refused", payload: { message: "Couldn't open the arena: try again" } });
````

#### Block 30

````text
player.party
````

#### Block 31

````text
routing.alwaysOn: true
````

#### Block 32

````text
platformState
````

#### Block 33

````text
audience: "all"
````

#### Block 34

````text
@rexgaming_yt/sky-ring-arena-multiplayer
````

#### Block 35

````text
@hips/super-smash-spawn-brawl-ultimate-platform-fighter
````

#### Block 36

````text
@longthunder/cubemunity
````

#### Block 37

````text
@ohtheicee/banana-clicker
````


### After clicking "read → Places & portals A world is one game with many places: a town, a dungeon, an arena. Doors between them, instanced copies, and portals to other creators' worlds."

A world can be one field, or a town, a dungeon under it, a rooftop arena and a dream level, each its own space with its own sky, gravity and rules. Jayzee calls each of those spaces a place, and the doors between them (and to other people's games) are portals.

Several spaces in one game. Each place has its own ground, sky, light, gravity, camera, controls, HUD and even its own form: one can be 3D while another is a flat 2D side-scroller or a UI-only page.

Several spaces in one game.

Doors that show where they lead. A portal's glass shows the far place live inside it, with that place's light spilling onto your ground. You walk through and step out of the matching gate on the other side, facing forward.

Doors that show where they lead.

Doors to other games. A portal can lead to another creator's world by its address, like @ress/cathedral +main. Jayzee handles the trip, what you carry, and a return rift.

Doors to other games.

@ress/cathedral +main

Door rules. A place can decide who gets in, what happens when someone arrives, and what happens when they leave.

Door rules.

Private copies. A place can open a fresh copy per player or per party (see Multiplayer & rooms).

Private copies.

This very site is an example: places/main is a UI-only page (the catalog you are reading), and places/hall is a bright 3D Animation Hall. Its arrival rule dresses your body with a walk and a camera; leaving strips it back to the page.

places/main

places/hall

Files. A place is a folder: places/<p>/config.yaml holds its settings, places/<p>/cells/x<cx>z<cz>.scene holds what stands in it, and it can have its own places/<p>/sim.js (its referee) and places/<p>/ui.js (its HUD). world.config.yaml names the defaultPlace players start in.

Files.

places/<p>/config.yaml

places/<p>/cells/x<cx>z<cz>.scene

places/<p>/ui.js

A place's settings (all readable and writable as ctx.place.<path> or ctx.world.places.<p>):

A place's settings

ctx.place.<path>

mode: "3d", "2d-side", "2d-top" or "ui"; each has its own physics. A ui place draws no 3D at all: the HTML screen is the whole game.

terrain: kind "heightmap", "voxel" or "off" (see Terrain & ground).

"voxel"

"off"

atmosphere: sky, sun, ambient light, fog, clouds, stars, moon, timeOfDay (0 to 24), a day/night cycle, a look (the whole-screen grade), wind.

gravity: a vector, for example { x: 0, y: -9.81, z: 0 }.

{ x: 0, y: -9.81, z: 0 }

defaultSpawnPoint and defaultSpawnRotation: where and which way a player first stands.

policy: { admits, onArrive, onLeave }, scripts that guard and greet.

{ admits, onArrive, onLeave }

worldBounds.bottom: a fall floor; false turns it off.

persistence and instance: copies per player or party.

camera, inputs, ui, material, lighting: as the world's, laid over it for this place.

Making and removing places at runtime. ctx.world.places.<p> = { mode, terrain, atmosphere, objects, … } adds a place; delete ctx.world.places.<p> removes it. ctx.world.defaultPlace = 'lobby' changes the starting place.

Making and removing places at runtime.

Moving between places: cross. ctx.cross(entity, address) moves an entity. Addresses look like:

Moving between places: cross.

ctx.cross(entity, address)

"+cellar": the place named cellar in this world.

"+cellar"

"+cellar#gate-west": that place, stepping out of the gate called gate-west.

"+cellar#gate-west"

gate-west

"@ress/cathedral +main": another creator's world and its place.

"@ress/cathedral +main"

It answers { crossed: true }, { crossed: "departing", link } (in progress, which still counts as yes), or { crossed: false, verdict } with a code, message and retriable. The entity's .place tells you where it now stands. A door is simply an object that calls cross(); its hooks onCross(ctx, other, outcome) and onRefuse(ctx, other, verdict) hear how it went.

{ crossed: true }

{ crossed: "departing", link }

{ crossed: false, verdict }

cross()

onCross(ctx, other, outcome)

onRefuse(ctx, other, verdict)

Door rules. admits(ctx, entity) returns true, false, or { deny | redirect | gate }. onArrive(ctx, entity) and onLeave(ctx, entity) run on join and departure. These three are policy hooks, run by the place, not by an object.

admits(ctx, entity)

{ deny | redirect | gate }

onArrive(ctx, entity)

onLeave(ctx, entity)

Portal glass. A portal's face wears material.view: { link, spill, sound, oneWay }: the far place seen through it, spill lighting your ground. Presets come as script: "engine/portal-<name>": glass, water, ember, ink, veil, mirror-break, pixel, stained-glass, static, starfield, aurora, honeycomb, oil-slick. The same view can be a mirror (camera: "mirror") or a placed camera like a security monitor or a top-down map.

Portal glass.

material.view: { link, spill, sound, oneWay }

script: "engine/portal-<name>"

camera: "mirror"

The portal skill's gate: a trigger arch that crosses whoever walks in.

// jayzee: { id: "gate-east", tags: ["portal"], behavior: "scripts/gate.js", // state: { link: "+cellar#gate-west" }, rotation: 90, // primitive: { kind: "arch", width: 2.6, height: 3.4, depth: 0.3 }, // physics: { body: "static", trigger: true }, // material: { kind: "scripted", script: "engine/portal-ember", // view: { link: "+cellar#gate-west", spill: 2, sound: 1 } } } export function onTriggerEnter(ctx, other) { ctx.cross(other, ctx.self.state.link); } export function onCross(ctx, other) { ctx.emit("playSound", { clip: "cdn/gate-chime.mp3", position: ctx.self.worldFeetPosition }); } export function onRefuse(ctx, other, verdict) { ctx.emit("uiEvent", { name: "refused", payload: { message: verdict.message } }); }

A place config, like this site's Animation Hall (trimmed):

# places/hall/config.yaml mode: 3d gravity: { x: 0, y: -9.81, z: 0 } terrain: kind: "off" defaultSpawnPoint: { x: 0, y: 0.2, z: 6 } policy: onArrive: scripts/hall-policy.js onLeave: scripts/hall-policy.js ui: render: places/hall/ui.js

A door rule that lets the host in and caps a copy at 8, from the rooms skill:

export function admits(ctx, e) { return e.id === ctx.place.owner || ctx.place.players.length < 8; }

A button press that crosses without a physical door:

export function onInput(ctx, input) { if (input.pressed["enter-arena"]) ctx.cross(ctx.self, "+arena"); }

Split by feel, not by size. A place is the right tool when the space changes how the game feels: a new sky, new gravity, a different camera or a 2D minigame inside a 3D world. A big open map can stay one place; things only tick within about 500 m of a player anyway.

Split by feel, not by size.

feels

Gates come in pairs. Each gate names the other in its link (#exit on both) and faces the way you walk out (a gate faces −Z at rotation: 0). A link that names only the place with no gate linking back drops you at the place's arrival or jayzee: a cut, not a doorway.

Gates come in pairs.

#exit

rotation: 0

A door within your world needs its own way back. Arriving from another world opens a return rift for 30 seconds (shaped by returnDoor on the arrival place); a door inside your own world opens none, so build the return gate.

A door within your world needs its own way back.

What you carry. Held and worn things come through doors within your world. Into another world, that world's admits() decides; a refused item is never lost and waits in player.pocket until a world admits it.

What you carry.

admits()

player.pocket

Your save travels too. player.state rides the door. At arrival the host world's save of you wins for every key it holds.

Your save travels too.

Visiting scripts are fenced. A behavior travelling into another world runs under that world's foreign: { faculties: [...] } ceiling.

Visiting scripts are fenced.

foreign: { faculties: [...] }

Views cost only when seen. A portal's live view draws only while a player sees its face, smaller and rarer on a weak device.

Views cost only when seen.

Loading between places is yours to dress. Jayzee covers a join until players stand; a transition between areas belongs to your game.

Loading between places is yours to dress.

Portals in real games: Diablo Survivors (@izkimar/diablo-survivors: pick your hero at the camp fire, step through the portal) and Jayzee Hangout (@binxius/spawn-hangout, a lakeside town of activities).

@izkimar/diablo-survivors

@binxius/spawn-hangout

portals: gates, glass presets, mirrors and cameras, carrying things between worlds.

rooms-and-matchmaking: instance copies and per-place door rules.

2d-mode: places in 2d-side and 2d-top form.

atmosphere and looks: each place's sky, light and grade.

game-ui: a per-place HUD.

next: Terrain & ground →

#### Block 1

````text
@ress/cathedral +main
````

#### Block 2

````text
places/main
````

#### Block 3

````text
places/hall
````

#### Block 4

````text
places/<p>/config.yaml
````

#### Block 5

````text
places/<p>/cells/x<cx>z<cz>.scene
````

#### Block 6

````text
places/<p>/ui.js
````

#### Block 7

````text
ctx.place.<path>
````

#### Block 8

````text
"voxel"
````

#### Block 9

````text
"off"
````

#### Block 10

````text
{ x: 0, y: -9.81, z: 0 }
````

#### Block 11

````text
{ admits, onArrive, onLeave }
````

#### Block 12

````text
ctx.cross(entity, address)
````

#### Block 13

````text
"+cellar"
````

#### Block 14

````text
"+cellar#gate-west"
````

#### Block 15

````text
gate-west
````

#### Block 16

````text
"@ress/cathedral +main"
````

#### Block 17

````text
{ crossed: true }
````

#### Block 18

````text
{ crossed: "departing", link }
````

#### Block 19

````text
{ crossed: false, verdict }
````

#### Block 20

````text
cross()
````

#### Block 21

````text
onCross(ctx, other, outcome)
````

#### Block 22

````text
onRefuse(ctx, other, verdict)
````

#### Block 23

````text
admits(ctx, entity)
````

#### Block 24

````text
{ deny | redirect | gate }
````

#### Block 25

````text
onArrive(ctx, entity)
````

#### Block 26

````text
onLeave(ctx, entity)
````

#### Block 27

````text
material.view: { link, spill, sound, oneWay }
````

#### Block 28

````text
script: "engine/portal-<name>"
````

#### Block 29

````text
camera: "mirror"
````

#### Block 30

````text
// spawn: { id: "gate-east", tags: ["portal"], behavior: "scripts/gate.js",
//   state: { link: "+cellar#gate-west" }, rotation: 90,
//   primitive: { kind: "arch", width: 2.6, height: 3.4, depth: 0.3 },
//   physics: { body: "static", trigger: true },
//   material: { kind: "scripted", script: "engine/portal-ember",
//               view: { link: "+cellar#gate-west", spill: 2, sound: 1 } } }
export function onTriggerEnter(ctx, other) {
  ctx.cross(other, ctx.self.state.link);
}
export function onCross(ctx, other) {
  ctx.emit("playSound", { clip: "cdn/gate-chime.mp3", position: ctx.self.worldFeetPosition });
}
export function onRefuse(ctx, other, verdict) {
  ctx.emit("uiEvent", { name: "refused", payload: { message: verdict.message } });
}
````

#### Block 31

````text
# places/hall/config.yaml
mode: 3d
gravity: { x: 0, y: -9.81, z: 0 }
terrain:
  kind: "off"
defaultSpawnPoint: { x: 0, y: 0.2, z: 6 }
policy:
  onArrive: scripts/hall-policy.js
  onLeave: scripts/hall-policy.js
ui:
  render: places/hall/ui.js
````

#### Block 32

````text
export function admits(ctx, e) {
  return e.id === ctx.place.owner || ctx.place.players.length < 8;
}
````

#### Block 33

````text
export function onInput(ctx, input) {
  if (input.pressed["enter-arena"]) ctx.cross(ctx.self, "+arena");
}
````

#### Block 34

````text
#exit
````

#### Block 35

````text
rotation: 0
````

#### Block 36

````text
admits()
````

#### Block 37

````text
player.pocket
````

#### Block 38

````text
foreign: { faculties: [...] }
````

#### Block 39

````text
@izkimar/diablo-survivors
````

#### Block 40

````text
@binxius/spawn-hangout
````


### After clicking "read → Terrain & ground Rolling heightmap hills, diggable voxel blocks, or no terrain at all: the ground, its materials, and the seas, lakes, rivers and paths marked on it."

The ground is the first thing a player reads. Jayzee gives every place one of three kinds of ground: rolling heightmap landscape (hills, coasts, rivers), a voxel block world players can dig and build in, or no terrain at all, where your own objects are the floor.

Endless natural landscape. Heightmap ground streams in around players as far as their device can draw, with textured materials (grass, sand, rock, snow) blending into each other.

Endless natural landscape.

Water that is real. A sea, a lake or a river is a level you can swim in, not a painted plane.

Water that is real.

Paths and roads that shape the ground. A path mark grades a walkable trail; a road lays a surface along a spline; a flatten mark levels a building site.

Paths and roads that shape the ground.

Grass, flowers and cover that grow only where a chosen material dominates.

Grass, flowers and cover

Digging and sculpting while you play. Players can dig, raise or paint the ground in their room, and you can paint it as the creator.

Digging and sculpting while you play.

Block worlds. Voxel ground has caves you stand inside, ore bands, lava, crystal, and every block can be placed or broken, landing that tick for every player.

Block worlds.

Or no ground. kind: "off" and your floors, decks and platforms are the world: a space station, a sky island, a studio like this site's Animation Hall.

Or no ground.

kind: "off"

Terrain lives in the place's config under terrain, and is read and written live as ctx.place.terrain.

ctx.place.terrain

kind is "heightmap", "voxel" or "off" (there are also tilemaps for 2D places, written as ctx.place.tiles[x][y]).

Heightmap ground is described by:

Heightmap ground

generator: a script of yours exporting heightAt(ctx) (how high the ground is at ctx.x, ctx.z) and materialAt(ctx) (which material it wears, as weights like { rock: 0.3, grass: 0.7 }). materialAt also receives worldHeight, slope (0.29 is 45 degrees) and normal.

heightAt(ctx)

ctx.x, ctx.z

materialAt(ctx)

{ rock: 0.3, grass: 0.7 }

worldHeight

seed: a number or string that varies the noise.

materials: a list of { id, albedo, tint, textureScale, pbr, … }. Ground wears PBR textures from the CDN by default, named like cdn/texture-terrain-sand-realistic-albedo.png; textureScale is metres per tile (default 2.5).

{ id, albedo, tint, textureScale, pbr, … }

cdn/texture-terrain-sand-realistic-albedo.png

verticalRange: { min, max }.

marks: everything with an edge, and they override the generator. Kinds are sea (with a level), lake (at, radius, level, depth), river (points, width, depth), path (points, width, grade), road (points or spline, width), flatten, and clear-scatter.

decorations: cover layers (density is items per square metre) bound to materials by bindings.

decorations

bindings

material: one scripted material that shades all the ground.

Voxel ground uses a materialAt(ctx) that answers per 3D point (ctx.x, ctx.y, ctx.z in metres) with a material id or "air". Each material in terrain.materials has a color or tones, can be emissive, can be a liquid (liquidKind: "lava"), and can be non-solid. You read or change a single block with ctx.place.voxels[x][y][z]: assign "stone" to place it, null to break it. voxels.fill lands a whole box at once. terrain.meshing.style: "smooth" rounds the blocks into smooth ground.

Voxel ground

ctx.x

ctx.y

ctx.z

"air"

terrain.materials

tones

liquidKind: "lava"

ctx.place.voxels[x][y][z]

"stone"

voxels.fill

terrain.meshing.style: "smooth"

Reading the ground from scripts. ctx.place.terrain.heightAt(x, z) and .materialAt(x, z) answer the ground under any column, for any terrain kind (objects excluded; null means none). ctx.getTerrainNormal(x, z) gives the slope's direction, and ctx.getWaterLevelAt(x, z) the water surface, or null where dry. A body knows ctx.self.liquid.in and ctx.self.liquid.level.

Reading the ground from scripts.

ctx.place.terrain.heightAt(x, z)

.materialAt(x, z)

ctx.getTerrainNormal(x, z)

ctx.getWaterLevelAt(x, z)

Placing on the ground. Any object can stand on the terrain with feetPosition: { x, z, y: { terrain: 0 } }, or hover above it with { terrain: 0.5 }.

Placing on the ground.

feetPosition: { x, z, y: { terrain: 0 } }

{ terrain: 0.5 }

Live digging and painting. terrain.stroke(field, { center, radius, fn }) sculpts, digs or paints. A stroke from a game hook lands on the room's player layer; a creator's brush or a persisted edit lands on the creator layer that publishing keeps. delete ctx.place.terrain.runtimeEdits drops everything players dug.

Live digging and painting.

terrain.stroke(field, { center, radius, fn })

delete ctx.place.terrain.runtimeEdits

A heightmap place, in its config:

terrain: kind: heightmap seed: 7 generator: scripts/terrain.js materials: - id: sand albedo: cdn/texture-terrain-sand-realistic-albedo.png tint: oklch(0.82 0.06 80) textureScale: 2 marks: sea: { kind: sea, level: 0, floorMaterial: sand }

The landform, trimmed from the heightmap skill: an island rising out of a southern sea, sand on the shore, rock on the steep parts.

// scripts/terrain.js import { shore } from "builtin/terrain"; const clamp01 = (v) => Math.min(1, Math.max(0, v)); export function heightAt(ctx) { const { x, z, noise, seedOffset } = ctx; const r = Math.hypot(x, z), far = clamp01(r / 1500) ** 2; const land = far * (220 + 55 * noise.fbm2({ x, z, frequency: 1 / 900, octaves: 2, seed: seedOffset(0) })); const toSea = clamp01((z - 60) / 120); return shore((20 + land * clamp01(r / 30 - 1)) * (1 - toSea) - 14 * toSea, 0); } export function materialAt(ctx) { const { worldHeight, slope } = ctx; if (worldHeight < 1.8) return { sand: 1 }; const rock = clamp01((slope - 0.25) * 4); return { rock, grass: 1 - rock }; }

A voxel world's materials answer per block, trimmed from the voxel skill:

export function materialAt({ x, y, z, noise, seedOffset }) { const hill = 28 + noise.fbm2({ x, z, frequency: 1 / 90, octaves: 4, seed: seedOffset(0) }) * 12; if (y > hill) return "air"; const depth = hill - y; if (depth < 1) return "grass"; if (depth < 4) return "dirt"; return "stone"; }

Breaking and placing a block from a script:

ctx.place.voxels[x][y][z] = null; // break: air ctx.place.voxels[x][y][z] = "stone"; // place a block

Pick the ground by the verb. Explore, race, fly, farm: heightmap. Mine, build, survive the night in a dug shelter: voxel. Arena, studio, obstacle course, interior: off, with built floors.

Pick the ground by the verb.

heightAt runs a lot. About 17,000 times per 80 m chunk, so it must be plain arithmetic. A track or river is a mark, never a loop over points inside heightAt.

heightAt runs a lot.

Keep the jayzee level and the coast gentle. The skill's bar: a wide sand apron and wadeable shallows, never a razor line or a cliff into a pool.

Keep the jayzee level and the coast gentle.

Walking stops past 45 degrees. A trail up a mountain should be a path mark with grade: true.

Walking stops past 45 degrees.

grade: true

Water is swimmable everywhere it stands. A sea fills wherever heightAt is below its level; a lake fills your basin or digs a 2 m bowl; a river runs downhill along its points. A plain kind: "water" material on a shape is only a picture: nothing swims in it.

Water is swimmable everywhere it stands.

Digs are the room's. What players dig persists in their room (the player layer), separate from the ground you authored.

Digs are the room's.

Block edits are instant and shared. Each voxel click lands that tick for every player. Walls and rooms are a few fills, not loops over every cell.

Block edits are instant and shared.

Light caves from inside. A voxel cave can't see the sky; lava, crystal and lanterns light it.

Light caves from inside.

Detail follows the device. How far fine ground reaches depends on each viewer's graphics tier; phones stream the near bands.

Detail follows the device.

Real games built on the ground: Survival at Disaster (@vovafromttav/survival-at-disaster, floods and tornadoes over an island town), Race to the Masjid (@yunusdiallo/race-to-the-masjid, a street run) and Higher (@chucky/higher, climbing towers and peaks).

@vovafromttav/survival-at-disaster

@yunusdiallo/race-to-the-masjid

@chucky/higher

heightmap-terrain: landforms, materials, sea/lake/river marks, paths and roads, cover, digging.

voxel-terrain: block worlds, materials, caves, live building.

meadow-grass, trees, leaf-sprays: what grows on the ground.

atmosphere: sky, sun and fog over it.

2d-mode: tile ground for 2D places.

next: Objects, shapes & templates →

#### Block 1

````text
kind: "off"
````

#### Block 2

````text
ctx.place.terrain
````

#### Block 3

````text
heightAt(ctx)
````

#### Block 4

````text
ctx.x, ctx.z
````

#### Block 5

````text
materialAt(ctx)
````

#### Block 6

````text
{ rock: 0.3, grass: 0.7 }
````

#### Block 7

````text
worldHeight
````

#### Block 8

````text
{ id, albedo, tint, textureScale, pbr, … }
````

#### Block 9

````text
cdn/texture-terrain-sand-realistic-albedo.png
````

#### Block 10

````text
decorations
````

#### Block 11

````text
bindings
````

#### Block 12

````text
ctx.x
````

#### Block 13

````text
ctx.y
````

#### Block 14

````text
ctx.z
````

#### Block 15

````text
"air"
````

#### Block 16

````text
terrain.materials
````

#### Block 17

````text
tones
````

#### Block 18

````text
liquidKind: "lava"
````

#### Block 19

````text
ctx.place.voxels[x][y][z]
````

#### Block 20

````text
"stone"
````

#### Block 21

````text
voxels.fill
````

#### Block 22

````text
terrain.meshing.style: "smooth"
````

#### Block 23

````text
ctx.place.terrain.heightAt(x, z)
````

#### Block 24

````text
.materialAt(x, z)
````

#### Block 25

````text
ctx.getTerrainNormal(x, z)
````

#### Block 26

````text
ctx.getWaterLevelAt(x, z)
````

#### Block 27

````text
feetPosition: { x, z, y: { terrain: 0 } }
````

#### Block 28

````text
{ terrain: 0.5 }
````

#### Block 29

````text
terrain.stroke(field, { center, radius, fn })
````

#### Block 30

````text
delete ctx.place.terrain.runtimeEdits
````

#### Block 31

````text
terrain:
  kind: heightmap
  seed: 7
  generator: scripts/terrain.js
  materials:
    - id: sand
      albedo: cdn/texture-terrain-sand-realistic-albedo.png
      tint: oklch(0.82 0.06 80)
      textureScale: 2
  marks:
    sea: { kind: sea, level: 0, floorMaterial: sand }
````

#### Block 32

````text
// scripts/terrain.js
import { shore } from "builtin/terrain";
const clamp01 = (v) => Math.min(1, Math.max(0, v));
export function heightAt(ctx) {
  const { x, z, noise, seedOffset } = ctx;
  const r = Math.hypot(x, z), far = clamp01(r / 1500) ** 2;
  const land = far * (220 + 55 * noise.fbm2({ x, z, frequency: 1 / 900, octaves: 2, seed: seedOffset(0) }));
  const toSea = clamp01((z - 60) / 120);
  return shore((20 + land * clamp01(r / 30 - 1)) * (1 - toSea) - 14 * toSea, 0);
}
export function materialAt(ctx) {
  const { worldHeight, slope } = ctx;
  if (worldHeight < 1.8) return { sand: 1 };
  const rock = clamp01((slope - 0.25) * 4);
  return { rock, grass: 1 - rock };
}
````

#### Block 33

````text
export function materialAt({ x, y, z, noise, seedOffset }) {
  const hill = 28 + noise.fbm2({ x, z, frequency: 1 / 90, octaves: 4, seed: seedOffset(0) }) * 12;
  if (y > hill) return "air";
  const depth = hill - y;
  if (depth < 1) return "grass";
  if (depth < 4) return "dirt";
  return "stone";
}
````

#### Block 34

````text
ctx.place.voxels[x][y][z] = null;     // break: air
ctx.place.voxels[x][y][z] = "stone";  // place a block
````

#### Block 35

````text
grade: true
````

#### Block 36

````text
@vovafromttav/survival-at-disaster
````

#### Block 37

````text
@yunusdiallo/race-to-the-masjid
````

#### Block 38

````text
@chucky/higher
````


### After clicking "read → Objects, shapes & templates Everything you see is an object: built-in shapes, scripted geometry, models, lights, signs, children and templates that stamp out fifty goblins from one."

Everything a player sees or touches in a Jayzee world is an object: a tree, a door, a coin, a monster, a road, a floating sign, the player's own body. An object is a small description (a "spec") of what it looks like, where it stands, whether it is solid, and which script brings it to life. Learn the spec and you can read every scene in Jayzee.

One description for everything. Shape, model, material, light, sound, particle effect, sign, rail, scattered forest: all are fields on the same kind of object.

One description for everything.

Built-in shapes. Boxes, spheres, cylinders, capsules, cones, rings, arches, pyramids, lathes, extrusions, tubes and more, each with real sizes in metres.

Built-in shapes.

Scripted geometry for finished things. A cottage, a car body or a creature is one script that writes its own mesh and its own collider: bevelled edges, textured faces, a real doorway you can walk through.

Scripted geometry for finished things.

Models. A Blender build by a wisp, or a creator's uploaded .glb.

Hierarchies. A lamp post with its lamp, a ship with its cannons: children ride their parent.

Hierarchies.

Templates. Define a goblin once and stamp out fifty, each with its own overrides.

Templates.

Scatter. Trees, rocks and grass spread over an area by weight and variation, as one object.

Scatter.

Where objects live. Placed objects are rows in places/<p>/cells/x<cx>z<cz>.scene, keyed by id (the placement id is the entity id). At runtime ctx.spawn(spec) creates one and returns its id; ctx.destroy(id) removes it, along with whatever it spawned.

Where objects live.

The main fields (from the object reference):

The main fields

id, tags: names. Tags are how scripts find things with ctx.query({ tags }).

ctx.query({ tags })

feetPosition: the bottom centre, in metres. { x, z } puts it on the ground; { x, z, y: { terrain: 0.5 } } floats it 0.5 m above.

{ x, z, y: { terrain: 0.5 } }

rotation: degrees, as { yaw, pitch, roll } or a single yaw number, or { lookAt }.

{ lookAt }

scale, pivot ("feet" by default; what rotation turns about), visible, castShadow, receiveShadow, visibleRange.

primitive: a built-in shape like { kind: "box", width, height, depth }, or { kind: "scripted", script, params, seed }.

{ kind: "box", width, height, depth }

{ kind: "scripted", script, params, seed }

model: a /cdn/value.<sha>.glb asset, optionally { id, offset, forward, materials }.

/cdn/value.<sha>.glb

{ id, offset, forward, materials }

material: three.js standard-material names (color, roughness, metalness…), plus texture (a cdn/texture-<what>.png), repeat, wrap, dissolve. Also { kind: "water" } and { kind: "scripted", script }.

cdn/texture-<what>.png

{ kind: "water" }

{ kind: "scripted", script }

physics: whether and how it's solid (see Physics & collision).

light: point, spot, rect, directional, ambient or hemisphere, with color, intensity, distance.

audio: a looping or one-shot sound attached to the object.

fx: a particle effect riding the object.

ui: an HTML panel stuck to one of its faces, reading its state live with {{ }}.

{{ }}

vector: an SVG drawn in the world, for signs and icons.

sprite, spline (roads, pipes, fences, rails, coasters), scatter, wisp, boxart.

state: any JSON, read by its script as ctx.self.state.*.

behavior: one script or a list of scripts.

lifetime: seconds, then it is destroyed. audience: "near", "all" or "local". scope: "session" dies when its spawner leaves.

Built-in primitive kinds include box, cube, sphere, cylinder, capsule (radius, halfHeight), plane, circle, cone, torus, torusKnot, ring, tube, lathe, extrude, pyramid, frustum, ellipsoid, superellipsoid, hollowCylinder, hemisphere, arch, archway, and the platonic solids (tetrahedron, octahedron, icosahedron, dodecahedron).

Built-in primitive kinds

Scripted geometry. primitive: { kind: "scripted", script } names a file exporting geometry(ctx), which emits the mesh, and collider(ctx), the shell a body touches. ctx.albedo("cdn/texture-limewash-plaster.png") textures what follows; ctx.lod lets far views drop trim. The same script, params and seed make one shared mesh, however many objects name it. This site's Animation Hall floor (scripts/hall-floor.js) and plinths (scripts/hall-plinths.js) are built this way.

Scripted geometry.

primitive: { kind: "scripted", script }

collider(ctx)

ctx.albedo("cdn/texture-limewash-plaster.png")

ctx.lod

scripts/hall-floor.js

scripts/hall-plinths.js

Parenting. parent: <id> puts an object at the parent's origin, and its feetPosition, rotation, scale and pivot are then local to the parent. Under a parent, a spawned id becomes <parent>/<id>. parent: null frees it where it stands. attachment: { bone | socket | part } rides a rigged model's bone.

Parenting.

parent: <id>

<parent>/<id>

parent: null

attachment: { bone | socket | part }

Templates. A template is a module in templates/<t>.js exporting a named spec. A row points at it with template: "templates/<t>.js#<name>" plus overrides. This world's own player is one: templates/player.js#player.

templates/<t>.js

template: "templates/<t>.js#<name>"

templates/player.js#player

A placed lamp post with a lamp as its child (the child's position is local):

ctx.spawn({ id: "pole-0", feetPosition: { x: 4, z: 2 }, primitive: { kind: "cylinder", radiusTop: 0.08, radiusBottom: 0.1, height: 3 }, physics: "static", children: [ { feetPosition: { x: 0, y: 3, z: 0 }, primitive: { kind: "sphere", radius: 0.25 }, light: { kind: "point", color: "oklch(0.9 0.1 80)", intensity: 2, distance: 12 } } ] });

A template, and a row that uses it:

// templates/player.js (this world's own) export const player = { behavior: ["scripts/player.js"], feetPosition: { x: 0, y: 0, z: 0 }, state: {}, tags: ["player"] };

ctx.spawn({ template: "templates/wolf.js#wolf", feetPosition: { x: 12, z: 0, y: { terrain: 0 } }, state: { home: { x: 12, y: 0, z: 0 } } });

A sign panel on a box's front face, reading its own state live:

{ primitive: { kind: "box", width: 1.2, height: 0.6, depth: 0.1 }, state: { score: 0 }, ui: '<div face="front" emissive class="p-3 bg-black text-cyan-300">SCORE {{ state.score | pad 6 }}</div>' }

A forest in one object:

{ feetPosition: { x: 0, z: 0 }, scatter: { bounds: { shape: "circle", radius: 40 }, count: 120, templates: [ { weight: 3, template: "templates/pine.js#pine" }, { weight: 1, template: "templates/rock.js#rock" } ], variation: { scale: [0.8, 1.3], yaw: [0, 360] } } }

A box is a sketch. The geometry skill's bar: a finished building has a footing, thick walls, a real doorway, a pitched roof, glass and a lit hearth; a flat panel or a box stack is a placeholder.

A box is a sketch.

Human scale. A body is a 1.9 × 0.7 m capsule with its eye at 1.6 m. Doors are 1.1 to 1.3 m wide and 2.2 to 2.4 m tall, ceilings 2.7 to 3.5 m, rooms at least 4 m, stairs 0.18 m rise on a 0.28 m tread.

Human scale.

Variants cost a data row. The second enemy is a template override or a state change, not a new script. One behavior read across many objects, varied by state, is the Jayzee way.

Variants cost a data row.

Crowds are one object. Dozens of fish or birds are one instanced mesh; thousands in one object are an instance set (ctx.instances).

Crowds are one object.

ctx.instances

Things far away rest. Phones freeze "near" objects past about 400 m; use audience: "all" for something every player must see live, like a world boss.

Things far away rest.

Rotations are degrees; −Z is forward, +Y is up. A child's feetPosition is always local to its parent.

Rotations are degrees; −Z is forward, +Y is up.

Moving parts are their own objects. A door leaf on a hinge is a separate kinematic or dynamic object carrying the joint.

Moving parts are their own objects.

Games full of crafted objects: Cat Haven (@chizkeykkk/cat-haven, a pink house in the clouds with a glass-domed cat yard), Purrtris Arena (@chizkeykkk/purrtris-arena, cat-eared arcade cabinets) and 8-Ball Pool 3D (@tuanteku/8-ball-pool-3d).

@chizkeykkk/cat-haven

@chizkeykkk/purrtris-arena

@tuanteku/8-ball-pool-3d

geometry: scripted meshes, colliders, textures, levels of detail.

uploaded-models and blender-game-assets: bringing in or building models.

interactive-objects: doors, switches, pickups.

trees, leaf-sprays, meadow-grass: scatter and plants.

fx: particles riding objects.

animations: rigged models and clips.

next: Physics & collision →

#### Block 1

````text
ctx.query({ tags })
````

#### Block 2

````text
{ x, z, y: { terrain: 0.5 } }
````

#### Block 3

````text
{ lookAt }
````

#### Block 4

````text
{ kind: "box", width, height, depth }
````

#### Block 5

````text
{ kind: "scripted", script, params, seed }
````

#### Block 6

````text
/cdn/value.<sha>.glb
````

#### Block 7

````text
{ id, offset, forward, materials }
````

#### Block 8

````text
cdn/texture-<what>.png
````

#### Block 9

````text
{ kind: "water" }
````

#### Block 10

````text
{ kind: "scripted", script }
````

#### Block 11

````text
{{ }}
````

#### Block 12

````text
primitive: { kind: "scripted", script }
````

#### Block 13

````text
collider(ctx)
````

#### Block 14

````text
ctx.albedo("cdn/texture-limewash-plaster.png")
````

#### Block 15

````text
ctx.lod
````

#### Block 16

````text
scripts/hall-floor.js
````

#### Block 17

````text
scripts/hall-plinths.js
````

#### Block 18

````text
parent: <id>
````

#### Block 19

````text
<parent>/<id>
````

#### Block 20

````text
parent: null
````

#### Block 21

````text
attachment: { bone | socket | part }
````

#### Block 22

````text
templates/<t>.js
````

#### Block 23

````text
template: "templates/<t>.js#<name>"
````

#### Block 24

````text
templates/player.js#player
````

#### Block 25

````text
ctx.spawn({
  id: "pole-0",
  feetPosition: { x: 4, z: 2 },
  primitive: { kind: "cylinder", radiusTop: 0.08, radiusBottom: 0.1, height: 3 },
  physics: "static",
  children: [
    { feetPosition: { x: 0, y: 3, z: 0 }, primitive: { kind: "sphere", radius: 0.25 },
      light: { kind: "point", color: "oklch(0.9 0.1 80)", intensity: 2, distance: 12 } }
  ]
});
````

#### Block 26

````text
// templates/player.js (this world's own)
export const player = { behavior: ["scripts/player.js"], feetPosition: { x: 0, y: 0, z: 0 }, state: {}, tags: ["player"] };
````

#### Block 27

````text
ctx.spawn({ template: "templates/wolf.js#wolf",
  feetPosition: { x: 12, z: 0, y: { terrain: 0 } },
  state: { home: { x: 12, y: 0, z: 0 } } });
````

#### Block 28

````text
{ primitive: { kind: "box", width: 1.2, height: 0.6, depth: 0.1 },
  state: { score: 0 },
  ui: '<div face="front" emissive class="p-3 bg-black text-cyan-300">SCORE {{ state.score | pad 6 }}</div>' }
````

#### Block 29

````text
{ feetPosition: { x: 0, z: 0 },
  scatter: { bounds: { shape: "circle", radius: 40 }, count: 120,
    templates: [ { weight: 3, template: "templates/pine.js#pine" }, { weight: 1, template: "templates/rock.js#rock" } ],
    variation: { scale: [0.8, 1.3], yaw: [0, 360] } } }
````

#### Block 30

````text
ctx.instances
````

#### Block 31

````text
@chizkeykkk/cat-haven
````

#### Block 32

````text
@chizkeykkk/purrtris-arena
````

#### Block 33

````text
@tuanteku/8-ball-pool-3d
````


### After clicking "read → Physics & collision Static walls, tumbling crates, moving lifts, walking characters, trigger zones, pass-through teams, raycasts, joints and ragdolls."

Physics is what makes a world push back: crates that tumble, balls that bounce, walls you can't walk through, triggers that notice when you step on a pressure plate. In Jayzee it is a few fields on an object and a few hooks in its script.

Solid things for free. Mark an object static and players stand on it and bump into it. Leave physics out and it is pure decoration you can walk through.

Solid things for free.

Things that fall and roll. dynamic bodies have mass, friction and bounce, take forces and impulses, and tumble realistically.

Things that fall and roll.

Things you move by script. kinematic bodies (lifts, moving platforms, swinging blades) go exactly where you say, and a character standing on one rides it.

Things you move by script.

Walking bodies. character is the body for anything that walks: it climbs steps, stands on slopes, and knows when it is on the ground or touching a wall.

Walking bodies.

Trigger zones. An invisible volume that notices who enters and leaves, for checkpoints, pickups and portals.

Trigger zones.

Who passes through whom. One table decides that teammates walk through each other while enemies block, or that ghosts drift through each other but stop at walls.

Who passes through whom.

Joints and ragdolls. Hinges, limbs and motors; a whole body going limp.

Water. Bodies float, swim or sink by density in terrain water and liquid volumes.

The physics field on an object is either a word or a full description:

The physics field

"none" or omitted: no collider.

"static": a fixed solid.

"dynamic": a moving body the simulation pushes around.

"kinematic": moved by your script, pushes others.

"character": for what walks.

Or { body, collider, mass, density, friction, restitution, trigger, lockedAxes, gravityScale, linearDamping, angularDamping, layer, … }.

{ body, collider, mass, density, friction, restitution, trigger, lockedAxes, gravityScale, linearDamping, angularDamping, layer, … }

collider is "auto", "box", "sphere", "capsule", "cylinder" or "mesh". density is in kg per cubic metre and sets mass by size; with it, a thing floats or sinks in water. lockedAxes freezes movement or spin on chosen axes ("x", "y", "z", "rotX", "rotY", "rotZ"). A character body also has options like autostep, maxSlopeClimbAngle, snapToGroundDistance and its own up.

Moving things (on any handle):

Moving things

velocity: metres per second. On a character it holds until rewritten, and there is no automatic gravity: your script adds ctx.place.gravity.y * dt to velocity.y each tick, or it floats. A jump sets y.

no automatic gravity

ctx.place.gravity.y * dt

velocity.y

angularVelocity: spin.

forces.<key> = { force, position, torque }: a named force in newtons held until you set it to null; an off-centre position adds spin.

forces.<key> = { force, position, torque }

The impulse act: ctx.emit("impulse", { target, impulse, position, angularImpulse }) for a one-time kick.

ctx.emit("impulse", { target, impulse, position, angularImpulse })

Reading contact. ctx.self.grounded, ctx.self.touching.wallLeft / .wallRight / .ceiling, ctx.self.overlapping, and in water ctx.self.liquid.in and .level.

Reading contact.

.level

Hooks a behavior can export:

onCollide(ctx, other, contact): contact.position, .normal (absent when unmeasured) and .impulse.

contact.position

.normal

.impulse

onTriggerEnter(ctx, other) and onTriggerExit(ctx, other): for trigger: true bodies. They run on the other's machine, so a player is hit as he sees it.

onTriggerEnter(ctx, other)

onTriggerExit(ctx, other)

trigger: true

onLiquidEnter / onLiquidExit.

onOutOfBounds(ctx, event): fell below the place's worldBounds.bottom. Return false to handle it yourself; otherwise it respawns where placed or at jayzee.

onOutOfBounds(ctx, event)

Pass-through table. ctx.world.passThrough (or passThrough: in world.config.yaml) pairs layer names that pass through each other. Every pair collides until the table pairs them. "player" is the layer of every character that names none, and it is paired with itself: players pass through each other by default.

Pass-through table.

Queries. builtin/physics gives raycast (a line test with tags and filters), getInputRay (the pointer's ray), overlapPoint, overlapSegment and traverseCheck. builtin/nav gives findPath for a walkable route.

Joints and ragdolls. ctx.self.joints[id] = { to, type, … } joins two bodies, with .motor = { velocity, maxForce } and .limits. ctx.self.ragdoll = {…} goes limp; = null releases it.

Compound things. A static or kinematic child's collider joins its root's, so one tree of parts is one body.

Compound things.

A pressure plate: an invisible trigger that knows who stepped on it.

// jayzee: { primitive: { kind: "box", width: 2, height: 0.2, depth: 2 }, // physics: { body: "static", trigger: true }, behavior: "scripts/plate.js" } export function onTriggerEnter(ctx, other) { ctx.self.state.pressed = true; } export function onTriggerExit(ctx, other) { ctx.self.state.pressed = false; }

A character's walk and jump, with gravity added by hand:

export function update(ctx, dt) { const v = ctx.self.velocity; ctx.self.velocity = { x: v.x, y: v.y + ctx.place.gravity.y * dt, z: v.z }; } export function onInput(ctx, input) { if (input.pressed.jump && ctx.self.grounded) ctx.self.velocity = { ...ctx.self.velocity, y: 10 }; }

Teams, from the bodies skill: friends pass, enemies block, ghosts drift through each other.

ctx.world.passThrough = { ghost: ["ghost"], red: ["red"], blue: ["blue"] }; ctx.spawn({ tags: ["ghost"], primitive: { kind: "sphere", radius: 0.5 }, feetPosition: { x: 0, y: 1, z: -6 }, physics: { body: "dynamic", layer: "ghost" } });

A line-of-sight check:

import { raycast } from "builtin/physics"; const hit = raycast(ctx, eye, dir, { distance: 50, excludeTags: ["glass"] }); if (hit) ctx.log("saw", hit.id, "at", hit.distance);

Gravity on a character is yours. It makes custom feel easy (floaty moon jumps, wall runs, a planet you walk around) but means the walk script owns falling. The starters already do it.

Gravity on a character is yours.

Triggers, not layers, for pickups. A pair that passes through never touches, so it fires no trigger. A coin or zone uses trigger: true.

Triggers, not layers, for pickups.

Decide what is solid to what. The bodies skill's bar: a crowd that jams on itself, or a guard you can walk through, reads as a bug.

Decide what is solid to what.

Hits are judged by the striker. A sword swing or bullet hit is decided on the attacker's machine; a parry or dodge on the target's.

Hits are judged by the striker.

Physics only runs near players. Within about 500 m of someone; farther bodies hold and resume on approach. Loose dynamic bodies that fall out of bounds stay put.

Physics only runs near players.

Scale multiplies colliders. A capsule 2 m tall on a body scaled 8.9 collides 17.8 m tall.

Scale multiplies colliders.

Each place has its own gravity and physics form. gravity is a place setting, and 2D places run their own 2D physics.

Each place has its own gravity and physics form.

Any up you like. physics: { body: "character", up: [x, y, z] } lets a body walk on walls, ceilings, or around a small planet.

Any up you like.

physics: { body: "character", up: [x, y, z] }

Physics-heavy games: 8-Ball Pool 3D (@tuanteku/8-ball-pool-3d), Crunch-em-up Derby Racing (@nickyp/crunch-em-up-derby-racing, figure-8 wreck racing) and Super Smash Jayzee Brawl (@hips/super-smash-spawn-brawl-ultimate-platform-fighter, knocking friends off the stage).

@nickyp/crunch-em-up-derby-racing

physics: joints, limbs and ragdolls.

bodies: pass-through layers, teams, a body's own up.

projectiles: bullets, arrows, thrown things.

vehicles: cars, boats and riders.

pointer-raycasting: clicking things in the world.

next: Scripts, hooks & the sim →

#### Block 1

````text
{ body, collider, mass, density, friction, restitution, trigger, lockedAxes, gravityScale, linearDamping, angularDamping, layer, … }
````

#### Block 2

````text
ctx.place.gravity.y * dt
````

#### Block 3

````text
velocity.y
````

#### Block 4

````text
forces.<key> = { force, position, torque }
````

#### Block 5

````text
ctx.emit("impulse", { target, impulse, position, angularImpulse })
````

#### Block 6

````text
.level
````

#### Block 7

````text
contact.position
````

#### Block 8

````text
.normal
````

#### Block 9

````text
.impulse
````

#### Block 10

````text
onTriggerEnter(ctx, other)
````

#### Block 11

````text
onTriggerExit(ctx, other)
````

#### Block 12

````text
trigger: true
````

#### Block 13

````text
onOutOfBounds(ctx, event)
````

#### Block 14

````text
// spawn: { primitive: { kind: "box", width: 2, height: 0.2, depth: 2 },
//          physics: { body: "static", trigger: true }, behavior: "scripts/plate.js" }
export function onTriggerEnter(ctx, other) {
  ctx.self.state.pressed = true;
}
export function onTriggerExit(ctx, other) {
  ctx.self.state.pressed = false;
}
````

#### Block 15

````text
export function update(ctx, dt) {
  const v = ctx.self.velocity;
  ctx.self.velocity = { x: v.x, y: v.y + ctx.place.gravity.y * dt, z: v.z };
}
export function onInput(ctx, input) {
  if (input.pressed.jump && ctx.self.grounded) ctx.self.velocity = { ...ctx.self.velocity, y: 10 };
}
````

#### Block 16

````text
ctx.world.passThrough = { ghost: ["ghost"], red: ["red"], blue: ["blue"] };
ctx.spawn({ tags: ["ghost"], primitive: { kind: "sphere", radius: 0.5 },
  feetPosition: { x: 0, y: 1, z: -6 }, physics: { body: "dynamic", layer: "ghost" } });
````

#### Block 17

````text
import { raycast } from "builtin/physics";
const hit = raycast(ctx, eye, dir, { distance: 50, excludeTags: ["glass"] });
if (hit) ctx.log("saw", hit.id, "at", hit.distance);
````

#### Block 18

````text
physics: { body: "character", up: [x, y, z] }
````

#### Block 19

````text
@nickyp/crunch-em-up-derby-racing
````


### After clicking "read → Scripts, hooks & the sim How a game's rules are written: behaviors, the hooks the engine calls, events, timers, and sim.js, the 30 Hz referee."

A Jayzee game's rules are small JavaScript files. You don't write a game loop, a server, or networking code: you write short functions with agreed names ("hooks"), and the engine calls them at the right moment, on the right machine. A coin's script says what happens when someone touches it; a door's says what happens when it's pressed; one referee script, sim.js, keeps the score.

Behaviors. A script attached to an object that brings it to life: a spinning coin, a patrolling guard, a door that opens.

Behaviors.

Hooks. Named functions the engine calls for you: when the object spawns, every tick, when a player presses a key, when something bumps into it, when someone walks into a zone.

Hooks.

A referee. sim.js (for the whole world) and places/<p>/sim.js (for one place) run the match: waves, timers, scores, who won.

A referee.

Events. Things can shout to each other by name with ctx.emit, and listen with ears.

Events.

Timers that survive a restart. ctx.after(seconds, "exportName", payload) instead of setTimeout.

Timers that survive a restart.

ctx.after(seconds, "exportName", payload)

setTimeout

Shared randomness and time. ctx.random() and ctx.now() agree on every machine, so every player sees the same dice roll.

Shared randomness and time.

A standard library. Raycasts, tweens, splines, pathfinding, vector math and easing curves, imported from builtin/....

A standard library.

builtin/...

A HUD. ui.js turns state into HTML for the screen.

A HUD.

Where scripts live.

scripts/<name>.js: a behavior, named on an object's behavior field (one script or a list).

scripts/<name>.js

sim.js and places/<p>/sim.js: the place's or world's program; export function tick(ctx) runs at 30 Hz on one machine per room. export const cadence = "1s" slows it.

export function tick(ctx)

ui.js / places/<p>/ui.js: export default function(ctx, player) returns HTML.

export default function(ctx, player)

scripts/lib/.js and scripts/lib/data/.yml: helpers and tables of tuned numbers.

scripts/lib/.js

.js

and scripts/lib/data/

scripts/lib/data/

.yml

jobs/<id>.js: heavier work off the game loop, including fetch(url) to read the web.

jobs/<id>.js

fetch(url)

The hooks a behavior file can export:

onSpawn(ctx): once, when it spawns.

update(ctx, dt): every tick (or as updateSchedule declares).

onInput(ctx, input): the player's own body, or whatever they control. input.axes.<name> runs -1 to 1; input.held, .pressed, .released hold actions; input.actionData.<action> carries a sendAction payload.

onInput(ctx, input)

input.axes.<name>

input.held

.released

input.actionData.<action>

onCollide(ctx, other, contact), onTriggerEnter(ctx, other), onTriggerExit(ctx, other).

onControlBegin(ctx, player) (return false to refuse) and onControlEnd: someone takes or leaves the wheel.

onControlBegin(ctx, player)

onCross, onRefuse: a portal crossing went through or was refused.

onOutOfBounds(ctx, event): fell off the world.

ears: export const ears = { "<name>": (ctx, payload) => … }, handlers for named events.

export const ears = { "<name>": (ctx, payload) => … }

editor and visual: tools for building mode.

An event goes to the entity's own handler, else the place's sim.js, else the world's.

Place hooks. admits(ctx, entity), onArrive(ctx, entity) and onLeave(ctx, entity) live in a place's policy scripts and decide who comes in and what happens when they do. This site's Animation Hall uses scripts/hall-policy.js to give an arriving visitor a walking body.

Place hooks.

scripts/hall-policy.js

The ctx. Every hook gets ctx: ctx.self (this object), ctx.place (players, objects, state, terrain), ctx.world (state, players, mode), plus the verbs jayzee, destroy, getObject, query, cross, emit and on. Writing is just assignment: ctx.self.state.hp = 3 is the write.

The ctx.

ctx.self.state.hp = 3

Inputs are declared in config: inputs.axes.<name>: { keys: "a/d" } and inputs.actions.<name>: { keys: ["e"], mouse: "left" }. Declare every action onInput reads, including ones a button sends with sendAction(name). This very site works that way: a link calls sendAction('nav', { page }), and scripts/player.js's onInput stores the page in player.state.

inputs.axes.<name>: { keys: "a/d" }

inputs.actions.<name>: { keys: ["e"], mouse: "left" }

sendAction(name)

sendAction('nav', { page })

scripts/player.js

Pacing. export const updateSchedule = { every: N } runs update only every N ticks (with dt scaled to match). ctx.sleep(s) inside update rests until time passes or something changes. A few NPCs can each keep a behavior; dozens or more are one manager script stepping all their rows.

Pacing.

export const updateSchedule = { every: N }

ctx.sleep(s)

The referee pattern. Behaviors write their own state. sim.js reads what changed with ctx.changed("place.players.*.state.hp") and writes the rows everyone reads, like ctx.place.state.wave or ctx.place.state.winner.

The referee pattern.

ctx.changed("place.players.*.state.hp")

ctx.place.state.wave

ctx.place.state.winner

A coin that spins forever and pays out once:

// scripts/coin.js import { animate } from "builtin/tween"; export function onSpawn(ctx) { animate(ctx, ctx.self, { "rotation.yaw": "+=360" }, { duration: 2, loop: true, easing: "linear" }); } export function onTriggerEnter(ctx, other) { if (!other.tags.includes("player")) return; other.state.coins = (other.state.coins ?? 0) + 1; ctx.emit("playSound", { clip: "cdn/coin.mp3", position: ctx.self.feetPosition }); ctx.destroy(ctx.self.id); }

A key press read in onInput (the action declared in config first):

inputs: actions: interact: { keys: ["e"] }

export function onInput(ctx, input) { if (input.pressed.interact) ctx.emit("door:toggle", {}, { to: "door-1" }); }

The referee, from the docs' example, spawning waves and noticing who fell:

// places/main/sim.js export const cadence = "250ms"; export function tick(ctx) { const s = ctx.place.state; for (const c of ctx.changed("place.players.*.state.hp")) if ((c.value ?? 10) <= 0 && !s.fallen) s.fallen = c.path.split(".")[2]; if (!s.fallen && ctx.now() - (s.waveAt ?? 0) > 20000) { s.wave = (s.wave ?? 0) + 1; s.waveAt = ctx.now(); ctx.spawn({ template: "templates/wolf.js#wolf", feetPosition: { x: 12, z: 0, y: { terrain: 0 } } }); } }

A timer that survives a restart:

export function onTriggerEnter(ctx, other) { ctx.self.visible = false; ctx.after(30, "respawn"); } export function respawn(ctx) { ctx.self.visible = true; }

No server to write. The same scripts run on whichever machine simulates the thing. sim.js runs on a player's window when alone, and on Jayzee's server once two players share the room.

No server to write.

The world ticks near people. Scripts, physics and timers run within about 500 m of a player; farther things hold and resume when someone approaches. A rule that must advance for everyone, wherever they stand, belongs in sim.js.

The world ticks near people.

30 Hz referee, a round trip late. sim.js hears about things a moment after they happen, so instant reactions (a hit, a jump) live in behaviors, and the referee confirms the result.

30 Hz referee, a round trip late.

Never Math.random or Date.now in game logic. Use ctx.random() and ctx.now() so every machine agrees. A clock time a player reads is a Date.

Never Math.random or Date.now in game logic.

Math.random

Date.now

Never setTimeout. Use ctx.after, which rides the object as data and survives a restart.

Never setTimeout.

Numbers belong in tables. The docs' rule: every tuned number lives in a data file such as scripts/lib/data/*.yml, so balancing the game never means touching code.

Numbers belong in tables.

scripts/lib/data/*.yml

The second enemy is a data row. One behavior varied by state covers a whole bestiary.

The second enemy is a data row.

Debug with ctx.log. Its output is read back with getLogs.

Debug with ctx.log.

getLogs

Games show what scripts do at scale: Garden Siege 3D (@rexgaming_yt/garden-siege-3d) runs ten waves of zombies against your peashooters, and Elemental Blades: Arena of Ascension (@shadow_ranger_62/elemental-blades-arena-of-ascension) runs endless waves against your champions.

@rexgaming_yt/garden-siege-3d

@shadow_ranger_62/elemental-blades-arena-of-ascension

animations: playing clips from scripts.

cameras: camera scripts and rigs.

projectiles: bullets and thrown things fired from a hook.

debugging: reading logs and finding what broke.

platform-systems: saves, SQL, jobs, crons.

fx: effects you emit from a hook.

next: State, saves & SQL →

#### Block 1

````text
ctx.after(seconds, "exportName", payload)
````

#### Block 2

````text
setTimeout
````

#### Block 3

````text
builtin/...
````

#### Block 4

````text
scripts/<name>.js
````

#### Block 5

````text
export function tick(ctx)
````

#### Block 6

````text
export default function(ctx, player)
````

#### Block 7

````text
scripts/lib/.js
````

#### Block 8

````text
scripts/lib/data/
````

#### Block 9

````text
.yml
````

#### Block 10

````text
jobs/<id>.js
````

#### Block 11

````text
fetch(url)
````

#### Block 12

````text
onInput(ctx, input)
````

#### Block 13

````text
input.axes.<name>
````

#### Block 14

````text
input.held
````

#### Block 15

````text
.released
````

#### Block 16

````text
input.actionData.<action>
````

#### Block 17

````text
onControlBegin(ctx, player)
````

#### Block 18

````text
export const ears = { "<name>": (ctx, payload) => … }
````

#### Block 19

````text
scripts/hall-policy.js
````

#### Block 20

````text
ctx.self.state.hp = 3
````

#### Block 21

````text
inputs.axes.<name>: { keys: "a/d" }
````

#### Block 22

````text
inputs.actions.<name>: { keys: ["e"], mouse: "left" }
````

#### Block 23

````text
sendAction(name)
````

#### Block 24

````text
sendAction('nav', { page })
````

#### Block 25

````text
scripts/player.js
````

#### Block 26

````text
export const updateSchedule = { every: N }
````

#### Block 27

````text
ctx.sleep(s)
````

#### Block 28

````text
ctx.changed("place.players.*.state.hp")
````

#### Block 29

````text
ctx.place.state.wave
````

#### Block 30

````text
ctx.place.state.winner
````

#### Block 31

````text
// scripts/coin.js
import { animate } from "builtin/tween";
export function onSpawn(ctx) {
  animate(ctx, ctx.self, { "rotation.yaw": "+=360" }, { duration: 2, loop: true, easing: "linear" });
}
export function onTriggerEnter(ctx, other) {
  if (!other.tags.includes("player")) return;
  other.state.coins = (other.state.coins ?? 0) + 1;
  ctx.emit("playSound", { clip: "cdn/coin.mp3", position: ctx.self.feetPosition });
  ctx.destroy(ctx.self.id);
}
````

#### Block 32

````text
inputs:
  actions:
    interact: { keys: ["e"] }
````

#### Block 33

````text
export function onInput(ctx, input) {
  if (input.pressed.interact) ctx.emit("door:toggle", {}, { to: "door-1" });
}
````

#### Block 34

````text
// places/main/sim.js
export const cadence = "250ms";
export function tick(ctx) {
  const s = ctx.place.state;
  for (const c of ctx.changed("place.players.*.state.hp"))
    if ((c.value ?? 10) <= 0 && !s.fallen) s.fallen = c.path.split(".")[2];
  if (!s.fallen && ctx.now() - (s.waveAt ?? 0) > 20000) {
    s.wave = (s.wave ?? 0) + 1; s.waveAt = ctx.now();
    ctx.spawn({ template: "templates/wolf.js#wolf", feetPosition: { x: 12, z: 0, y: { terrain: 0 } } });
  }
}
````

#### Block 35

````text
export function onTriggerEnter(ctx, other) {
  ctx.self.visible = false;
  ctx.after(30, "respawn");
}
export function respawn(ctx) { ctx.self.visible = true; }
````

#### Block 36

````text
Math.random
````

#### Block 37

````text
Date.now
````

#### Block 38

````text
scripts/lib/data/*.yml
````

#### Block 39

````text
getLogs
````

#### Block 40

````text
@rexgaming_yt/garden-siege-3d
````

#### Block 41

````text
@shadow_ranger_62/elemental-blades-arena-of-ascension
````


### After clicking "State, saves & SQL"

A game has to remember things: how many coins you have, which door is open, who is winning this round, the best score anyone ever set. Jayzee gives you a handful of places to keep memory, each with a different life span, and choosing the right one is most of the work of saving a game. There is no "save" button to write: a write is the save.

The player's own save. player.state follows a player everywhere: one per world, mode and save slot, the same in every room, and it even rides a portal. Coins, inventory, XP and unlocks go here.

The player's own save.

The room's memory. world.state is shared by every place in a room; place.state is one place's. The match, the wave, the leaderboard on the wall.

The room's memory.

place.state

Each thing's memory. Every object has its own state: a chest knows it's been opened, a door knows it's locked.

Each thing's memory.

Scratch space. ctx.session and ctx.self.session hold working numbers that don't need saving.

Scratch space.

A real database. ctx.sql is a SQL database for the whole world, across every room: all-time leaderboards, gifts between players.

A real database.

Cheat-proofing. platformState keys only the game's trusted machines may write.

Cheat-proofing.

Jayzee's game page boards. Named leaderboards show players' numbers on the game's page.

Jayzee's game page boards.

A dot is the write. ctx.self.state.hp = 3 saves. player.state.coins += 1 saves. One tick's writes (no await between them) save as one piece. A behavior saves only through state or ctx.commit, never by hand.

A dot is the write.

player.state.coins += 1

The layers, from the API reference:

player.state: the player's save. Back on every rejoin, over the player template. Seed it once with ??=, never with =, which throws the save away.

ctx.self.state on any object: that thing's, in this room.

ctx.place.state and ctx.world.state: the room's. They load whole on every machine.

ctx.session.*: this machine's scratch; a reconnect keeps it, a page reload empties it.

ctx.self.session.*: the same on one object; gone with it.

SQL: the only memory that spans rooms.

A room is a whole game of its own: in singleplayer each save is its own room, so world and object state belong to that save. Only player.state and SQL cross between rooms.

Every change goes to other machines. So a whole record is written when it changes, or a few times a second, never every tick. What a tick works out (an eased number, a countdown) stays in a variable or ctx.self.session.

Every change goes to other machines.

Two hands, one number. A number two machines change at once (a boss's hp, a shared score) is stepped in place, boss.state.hp -= d, never assigned. In sim.js, export const scopes = { "world.state.taps.*": { merge: "counter" } } makes many simultaneous += n writes land as deltas.

Two hands, one number.

boss.state.hp -= d

export const scopes = { "world.state.taps.*": { merge: "counter" } }

+= n

SQL. ` await ctx.sql… is a tagged template: ${v} binds a value safely, @caller names the player the call acts for, and semicolons join statements into one transaction. It answers { rows, changes, lastInsertRowid }. A scripts/db.js exporting migrate(sql)` creates tables before the first statement. Dev and live are two databases: the schema carries to live, the rows do not. Limits: at most 100 parameters a statement and 5 SELECTs joined by UNION.

SQL.

await ctx.sql

is a tagged template:

binds a value safely,

names the player the call acts for, and semicolons join statements into one transaction. It answers

exporting

When SQL runs. At an event, never per tick: onArrive / onLeave, a player's behavior, a cron, a run script, db.js. A HUD renders state, never SQL: read the board into world.state and show that.

When SQL runs.

db.js

Cheat-proof keys. platformState: ["gold", "inventory"] on the player template means no player's machine may write those keys in a multiplayer world.

Cheat-proof keys.

platformState: ["gold", "inventory"]

Fresh start. "Reset my progress" is player.state = {} on their row; the next join stamps the template again.

Fresh start.

player.state = {}

A chest pickup, from the platform-systems skill: the bag lives on the player's row.

export function onTriggerEnter(ctx, player) { if (!player.tags.includes("player")) return; player.state.bag ??= {}; player.state.bag[ctx.self.state.item] = (player.state.bag[ctx.self.state.item] ?? 0) + 1; ctx.destroy(ctx.self.id); }

Seeding a save once, then reading it:

export function update(ctx, dt) { ctx.self.state.run ??= { coins: 0, level: 1 }; }

An all-time leaderboard in SQL:

// scripts/db.js export async function migrate(sql) { await sql`CREATE TABLE IF NOT EXISTS best (user_id TEXT PRIMARY KEY, name TEXT, score INTEGER NOT NULL)`; await sql`CREATE INDEX IF NOT EXISTS best_score ON best (score)`; }

// at the match's end await ctx.sql`INSERT INTO best VALUES (@caller, ${name}, ${score}) ON CONFLICT (user_id) DO UPDATE SET name = excluded.name, score = MAX(score, excluded.score)`; // the board, kept in state for the HUD ctx.world.state.allTime = (await ctx.sql`SELECT name, score FROM best ORDER BY score DESC LIMIT 10`).rows;

Many hands tapping one counter:

// sim.js export const scopes = { "world.state.taps.*": { merge: "counter" } };

Progress is free. Anything in player.state is back when the player returns, in any room, with no save code. This site itself keeps the page you are reading in player.state.page.

Progress is free.

player.state.page

Rooms forget each other. Two rooms are two separate games; a castle built in one is not in the other. Shared history across rooms means SQL.

Rooms forget each other.

Keep writes calm. A position that moves every frame is the engine's job; state is for facts that change: a score, a phase, a door.

Keep writes calm.

Big state costs everyone. world.state and place.state load whole on every machine, so keep them small; history that grows forever belongs in SQL with running totals read back.

Big state costs everyone.

Money checks itself in SQL. Guard a spend with WHERE coins >= ${amount} AND ${amount} > 0, and credit only when the debit's changes says it landed.

Money checks itself in SQL.

WHERE coins >= ${amount} AND ${amount} > 0

onLeave saves are best effort. Keep onLeave one fast call, and write important things at the moment they happen.

onLeave saves are best effort.

Player names are Jayzee's. A player is their Jayzee self; key durable rows on userId, never on a made-up account.

Player names are Jayzee's.

Games built around remembering: Banana Clicker (@ohtheicee/banana-clicker) counts everyone's clicks on one giant banana, and Spawndle (@dreamcatcher/spawndle) serves a new puzzle every day.

@dreamcatcher/spawndle

platform-systems: player saves, SQL, crons, jobs, platform state.

buyables: things players buy.

rooms-and-matchmaking: which room a player lands in.

social: chat, parties, guilds.

next: HUD & screens →

#### Block 1

````text
place.state
````

#### Block 2

````text
player.state.coins += 1
````

#### Block 3

````text
boss.state.hp -= d
````

#### Block 4

````text
export const scopes = { "world.state.taps.*": { merge: "counter" } }
````

#### Block 5

````text
+= n
````

#### Block 6

````text
 await ctx.sql
````

#### Block 7

````text
 is a tagged template: 
````

#### Block 8

````text
 binds a value safely, 
````

#### Block 9

````text
 names the player the call acts for, and semicolons join statements into one transaction. It answers 
````

#### Block 10

````text
 exporting 
````

#### Block 11

````text
db.js
````

#### Block 12

````text
platformState: ["gold", "inventory"]
````

#### Block 13

````text
player.state = {}
````

#### Block 14

````text
export function onTriggerEnter(ctx, player) {
  if (!player.tags.includes("player")) return;
  player.state.bag ??= {};
  player.state.bag[ctx.self.state.item] = (player.state.bag[ctx.self.state.item] ?? 0) + 1;
  ctx.destroy(ctx.self.id);
}
````

#### Block 15

````text
export function update(ctx, dt) {
  ctx.self.state.run ??= { coins: 0, level: 1 };
}
````

#### Block 16

````text
// scripts/db.js
export async function migrate(sql) {
  await sql`CREATE TABLE IF NOT EXISTS best (user_id TEXT PRIMARY KEY, name TEXT, score INTEGER NOT NULL)`;
  await sql`CREATE INDEX IF NOT EXISTS best_score ON best (score)`;
}
````

#### Block 17

````text
// at the match's end
await ctx.sql`INSERT INTO best VALUES (@caller, ${name}, ${score})
  ON CONFLICT (user_id) DO UPDATE SET name = excluded.name, score = MAX(score, excluded.score)`;
// the board, kept in state for the HUD
ctx.world.state.allTime = (await ctx.sql`SELECT name, score FROM best ORDER BY score DESC LIMIT 10`).rows;
````

#### Block 18

````text
// sim.js
export const scopes = { "world.state.taps.*": { merge: "counter" } };
````

#### Block 19

````text
player.state.page
````

#### Block 20

````text
WHERE coins >= ${amount} AND ${amount} > 0
````

#### Block 21

````text
@dreamcatcher/spawndle
````


### After clicking "HUD & screens"

Everything a player reads on top of the game, the score in the corner, a health number, a shop window, a results card, is drawn by one file: ui.js. It is plain web-page markup (HTML, with Tailwind classes available) that the engine paints over the 3D view. You do not build a separate menu system or a widget toolkit; you write a small function that returns the HTML for "what this player should see right now", and the engine keeps it current.

There are three more ways to put words and panels in front of a player, and each fits a different job:

The HUD (ui.js, or a per-place places/<p>/ui.js): flat on the screen, like a heads-up display.

A panel on a thing: the ui field on any object puts an HTML plate on one face of it, a scoreboard on a wall, a button on an arcade cabinet.

A panel on a thing

A plate that follows a thing: HUD HTML with data-world-anchor="<id>" rides above a body, like a name plate or a quest marker.

A plate that follows a thing

data-world-anchor="<id>"

Vector signs: the vector field draws an SVG (paths, shapes, <text>) right in the world.

Vector signs

<text>

A game can also be nothing but a screen. This very site is one: its place runs in mode: ui, where the engine draws no 3D at all and the HTML is the whole game. A card game, a quiz, a daily puzzle like @dreamcatcher/spawndle can live entirely there.

mode: ui

ui.js exports one default function. The engine calls it with ctx and the player whenever anything it reads changes, at most about 30 times a second, and swaps the result into the page. You never "update the label": you write state (player.state.score += 1) and the HUD that reads it repaints on its own.

player.state.score += 1

The render reads player.state. for the player's own numbers, ctx.place.state. for the match (wave, timer, winner), and ctx.world.state.* for the whole room.

for the player's own numbers, ctx.place.state.

ctx.place.state.

ctx.world.state.*

player.controlling?.state is the state of whatever the player drives (a kart, a mech), so a speedometer reads the vehicle, not the person.

player.controlling?.state

Buttons talk back with sendAction(name, payload). That arrives in the player's behavior as onInput, where input.actionData.<name> holds the payload. Every action a button sends must be declared under inputs.actions in world.config.yaml.

sendAction(name, payload)

input.actionData.<name>

inputs.actions

Nodes are matched by id between renders. A kept id keeps its running CSS animation; a new id (or a changed inline animation) replays it. That is how a score "kicks" every time it changes: give the number an id that includes its value.

If the render throws an error, the HUD goes blank until a render succeeds again, so guard missing values with ?? 0.

?? 0

Panels on objects use the ui field: HTML at 1 px = 1 mm, placed on a face (face="front|back|left|right|top|bottom"), with {{ state.x }} reading the object's own state live and filters like pad 6, fixed 2, upper. A <button id="start"> on it rings ctx.on("ui:start", …) on that object.

face="front|back|left|right|top|bottom"

{{ state.x }}

pad 6

fixed 2

<button id="start">

ctx.on("ui:start", …)

The page side of ui.js has a few more verbs worth knowing:

sendAxis(name, value) feeds an analog axis from on-screen controls.

sendAxis(name, value)

openLink(url) opens discord.gg or spawn.co links (confirmed, at most 3 a minute); other URLs become copyable text.

openLink(url)

onMount(container, player) / onDestroy(container) let a HUD run its own code once, for example listening with window.spawn.on("event", …) for each ctx.emit("uiEvent", { name, payload }).

onMount(container, player)

onDestroy(container)

window.spawn.on("event", …)

ctx.emit("uiEvent", { name, payload })

ctx.worldToScreen(position) gives screen x/y for a point in the world.

ctx.worldToScreen(position)

window.spawn.view.captureFrame(...) takes a screenshot of the game without the HUD, for a photo mode.

window.spawn.view.captureFrame(...)

document.documentElement.requestFullscreen() on a press fills the screen (computers and Android; never on an iPhone).

A HUD with a big speed number and a score that pops when it changes:

export default function (ctx, player) { const s = player.controlling?.state ?? player.state; return `<div id="hud" class="fixed inset-0 pointer-events-none"> <div class="absolute left-6 bottom-6 plate"> <div class="lbl">SPEED</div><div class="num">${Math.round(s.speed ?? 0)}</div> </div> <div class="absolute top-6 right-24 plate"> <div class="lbl">SCORE</div> <div id="s${s.score ?? 0}" class="num" style="animation:kick .15s">${s.score ?? 0}</div> </div> </div>`; }

A button that sends an action, and the player script that hears it:

// ui.js `<button onclick="sendAction('rest')">rest</button>` // the player's behavior export function onInput(ctx, input) { if (input.pressed.rest) ctx.self.state.hp = 10; }

A scoreboard panel on the front face of a box in the world, reading its own state:

ui: '<div face="front" emissive class="p-3 bg-black text-cyan-300">SCORE {{ state.score | pad 6 }}<button id="start" disabled="{{ state.running }}">START</button></div>'

A name plate that floats over a body, written in the HUD:

`<div data-world-anchor="${boss.id}" data-anchor-offset="0 2.5 0" class="plate">BOSS</div>`

The engine's own UI guide is opinionated, and its rules come from real play:

Show only what the player needs this second. The main readout big (roughly 40 to 56 px at 1080p), a second number smaller below, each on a small plate, every plate 24 px from the edge. No pale words floating straight on the scene: put a plate or an outline under them.

Show only what the player needs this second.

Teach controls with a fading hint in the first seconds, and name actions by their labels (actions.<name>.label), never by key, because players can rebind keys in Jayzee's settings.

Teach controls with a fading hint

actions.<name>.label

Jayzee already does arrival, identity and voice. The play press starts sound and takes the mouse, a player's name and face are their Jayzee profile, voice chat is Jayzee's. So a game builds no click-to-start screen, no nickname box, no login and no microphone button.

Jayzee already does arrival, identity and voice.

No start screen by default. A title screen or lobby empties the room: people arrive and see a menu instead of the world and its players. A level pick works better as a pad or doorway to stand on, a character pick as a station to walk to.

No start screen by default.

The rail is Jayzee's. A block of Jayzee controls sits centered on the right edge on every device; never cover it. CSS variables such as var(--spawn-chrome-reservation-right-inset, 50px) tell you how much room to leave.

The rail is Jayzee's.

var(--spawn-chrome-reservation-right-inset, 50px)

Modal windows (a shop, a bag, a story card) carry data-modal: the cursor frees while shown and relocks after, and only one owns the screen at a time.

Modal windows

data-modal

Pause is ctx.place.timeScale = 0, which holds every body, timer and effect.

Pause

ctx.place.timeScale = 0

Phones: plates must fit a 390 px wide screen, wrap side by side, and respect the notch insets var(--spawn-safe-area-top) and friends. Touch buttons own the bottom-right corner and the joystick owns bottom-left.

var(--spawn-safe-area-top)

No graphics or volume menus. Quality, sound and key bindings live in Jayzee's own Settings; a HUD may carry one mute at most.

No graphics or volume menus.

Fonts come from engine.ui.theme.font in world.config.yaml (this world uses Geist Pixel Square), or an uploaded open-licence font.

Fonts

engine.ui.theme.font

Icons are painted pictures, one per icon, shown with an <img> at the slot's size.

Icons are painted pictures

<img>

A later screen (results, shop) is best written into every render with hidden until it is needed, so the engine has it ready before play. And secret information, a player's hand of cards for instance, belongs in that player's own rows, which the platform-systems guide covers.

Some published games to look at for HUD ideas: @chucky/higher (personal bests and a leaderboard on a climbing arcade), @dreamcatcher/spawndle (a daily puzzle that is almost all screen), and @longthunder/cubemunity (a shared clicker whose numbers everyone moves).

game-ui: the HUD rules, theming, modal windows, anchored plates, the page-side API.

mobile-controls: how the HUD shares the screen with touch buttons.

2d-mode: games drawn flat, and signs as vectors.

game-feel: making a win or loss a moment in the world before the number shows.

platform-systems: secret per-player data, saves and the database behind a leaderboard.

player-settings: what Jayzee's Settings already own, so your HUD does not copy them.

next: Sound & music →

#### Block 1

````text
data-world-anchor="<id>"
````

#### Block 2

````text
<text>
````

#### Block 3

````text
mode: ui
````

#### Block 4

````text
player.state.score += 1
````

#### Block 5

````text
ctx.place.state.
````

#### Block 6

````text
ctx.world.state.*
````

#### Block 7

````text
player.controlling?.state
````

#### Block 8

````text
sendAction(name, payload)
````

#### Block 9

````text
input.actionData.<name>
````

#### Block 10

````text
inputs.actions
````

#### Block 11

````text
?? 0
````

#### Block 12

````text
face="front|back|left|right|top|bottom"
````

#### Block 13

````text
{{ state.x }}
````

#### Block 14

````text
pad 6
````

#### Block 15

````text
fixed 2
````

#### Block 16

````text
<button id="start">
````

#### Block 17

````text
ctx.on("ui:start", …)
````

#### Block 18

````text
sendAxis(name, value)
````

#### Block 19

````text
openLink(url)
````

#### Block 20

````text
onMount(container, player)
````

#### Block 21

````text
onDestroy(container)
````

#### Block 22

````text
window.spawn.on("event", …)
````

#### Block 23

````text
ctx.emit("uiEvent", { name, payload })
````

#### Block 24

````text
ctx.worldToScreen(position)
````

#### Block 25

````text
window.spawn.view.captureFrame(...)
````

#### Block 26

````text
export default function (ctx, player) {
  const s = player.controlling?.state ?? player.state;
  return `<div id="hud" class="fixed inset-0 pointer-events-none">
    <div class="absolute left-6 bottom-6 plate">
      <div class="lbl">SPEED</div><div class="num">${Math.round(s.speed ?? 0)}</div>
    </div>
    <div class="absolute top-6 right-24 plate">
      <div class="lbl">SCORE</div>
      <div id="s${s.score ?? 0}" class="num" style="animation:kick .15s">${s.score ?? 0}</div>
    </div>
  </div>`;
}
````

#### Block 27

````text
// ui.js
`<button onclick="sendAction('rest')">rest</button>`

// the player's behavior
export function onInput(ctx, input) {
  if (input.pressed.rest) ctx.self.state.hp = 10;
}
````

#### Block 28

````text
ui: '<div face="front" emissive class="p-3 bg-black text-cyan-300">SCORE {{ state.score | pad 6 }}<button id="start" disabled="{{ state.running }}">START</button></div>'
````

#### Block 29

````text
`<div data-world-anchor="${boss.id}" data-anchor-offset="0 2.5 0" class="plate">BOSS</div>`
````

#### Block 30

````text
actions.<name>.label
````

#### Block 31

````text
var(--spawn-chrome-reservation-right-inset, 50px)
````

#### Block 32

````text
data-modal
````

#### Block 33

````text
ctx.place.timeScale = 0
````

#### Block 34

````text
var(--spawn-safe-area-top)
````

#### Block 35

````text
engine.ui.theme.font
````

#### Block 36

````text
<img>
````


### After clicking "read → Sound & music Sounds named into being, spatial audio on objects, one-shot playSound, and the shared jukebox for music: how a game is heard."

- H3: Naming a sound

A Jayzee game has three kinds of sound, and each one has its own simple verb:

Music: one jukebox the whole room hears together. You tell it which track should be playing and how long to fade, and the engine crossfades, keeps it running through resets and edits, and keeps every machine in step.

World sound: a sword hit, a footstep, a door creak. These play at a point in the world, loud up close and silent far away, either as a one-shot or as a looping source placed on an object (a crackling fire, a radio, a smithy).

Program voices: for the rare game that synthesises sound itself, a beat machine, an engine whine, a sidechained mix. Most games never need this.

Program voices

You do not hunt for sound files. In Jayzee a sound is named into being: the file name describes the sound, and the engine makes it the first time anyone asks for it. cdn/sfx-sword-blade-thwack-into-straw-stuffed-burlap-dummy.mp3 is a real address that produces that sound. Your own uploads (mp3, wav, flac, ogg) work exactly the same way once they have a /cdn/ address.

cdn/sfx-sword-blade-thwack-into-straw-stuffed-burlap-dummy.mp3

/cdn/

Music lives on ctx.music:

ctx.music.play(ref, { fade, loop, layer, volume }): fade is in seconds. Playing the same clip again does not restart it; playing a different one crossfades (0.8 s by default). loop: false plays once. layer lets you stack parallel stems.

ctx.music.play(ref, { fade, loop, layer, volume })

loop: false

ctx.music.stop({ fade, layer }) stops one layer or everything.

ctx.music.stop({ fade, layer })

ctx.music.duck(gain, { duration }) dips all music, for example under a spoken line (0.2 s attack, 0.3 s release).

ctx.music.duck(gain, { duration })

ctx.music.now() tells you what is playing and where, the same on every machine.

ctx.music.now()

There is no playlist: a game that wants one crosses to the next track when ctx.music.now().since nears the track's length (ctx.world.assets[ref]?.duration).

ctx.music.now().since

ctx.world.assets[ref]?.duration

World sound is either an act or a field:

ctx.emit("playSound", { clip, position, volume, pitch, refDistance, maxDistance, bus, mode, follow }) plays a one-shot. Full volume out to refDistance, silent at maxDistance. mode: "overlap" stacks copies (gunshots); mode: "restart" replaces this object's playing copy (a cry). follow keeps the sound riding a moving thing, like footsteps. With no position, only the player whose hook fired hears it. It returns a sound id that stopSound takes.

ctx.emit("playSound", { clip, position, volume, pitch, refDistance, maxDistance, bus, mode, follow })

mode: "overlap"

mode: "restart"

An audio: field on an object, { clip, gain, pitch, loop, spatial, maxDistance, bus }, plays for as long as the object exists. Changing its gain, pitch or position changes the voice in place, so you can ramp it every tick safely. This row also has a transport: time seeks, paused pauses for everyone, loopStart/loopEnd loop a section, and listeners restricts who hears it (a car radio only its riders hear).

{ clip, gain, pitch, loop, spatial, maxDistance, bus }

listeners

spatial: false makes a row play across the whole place.

spatial: false

The mix: every sound goes to a bus: Master, Music, SFX, UI, Ambience, Voice, Footsteps. world.config.yaml sets audio: { gains: {...}, maxVoices: 32, cullBeyond: 200 }, the game's mix under each player's own dials, and a limiter rides the top. player.gains adjusts the mix for one player.

The mix

Footsteps

audio: { gains: {...}, maxVoices: 32, cullBeyond: 200 }

player.gains

Room sound: ctx.place.acoustics.reverb (0 to 1) gives a place its echo tail; far spatial voices lose their highs before their volume. ctx.place.listenerEntity moves the "ear" onto an entity (by default it is the camera).

Room sound

ctx.place.acoustics.reverb

ctx.place.listenerEntity

Music you can see: audioLevel and audioSpectrum(x) from builtin/tsl give a material or screen look the loudness and frequency bands the player is hearing, so a dance floor can pulse on the beat.

Music you can see

Naming a sound

The file name is the prompt, so describe what a microphone would hear:

Effects: cdn/sfx-<what physically happens>.mp3, e.g. cdn/sfx-sword-blade-thwack-into-straw-stuffed-burlap-dummy.mp3.

cdn/sfx-<what physically happens>.mp3

A loop ends in -loop, and the engine levels its seam.

-loop

Tracks: cdn/music-<mood genre instrument words>-loop.mp3, e.g. cdn/music-calm-fingerpicked-guitar-meadow-loop.mp3.

cdn/music-<mood genre instrument words>-loop.mp3

cdn/music-calm-fingerpicked-guitar-meadow-loop.mp3

Songs with your own lyrics: cdn/music-<mood genre voice words>.mp3?lyrics=... sings them word for word.

cdn/music-<mood genre voice words>.mp3?lyrics=...

Voice lines: cdn/voice-<throat words>[-<emotion>]-saying-<the line>.mp3. Keep one "throat" description per character (say voice-gravel-voiced-old-soldier-…) so all their lines sound like the same person.

cdn/voice-<throat words>[-<emotion>]-saying-<the line>.mp3

voice-gravel-voiced-old-soldier-…

Two warnings from the docs: words like low, warm, soft, muted, hum render as a band that erases the highs, which can mean silence on a phone speaker; and a name, once served, keeps its first sound forever, so a changed sound needs a new file name (-2, -v3).

low, warm, soft, muted, hum

-2

-v3

This site's sample buttons play from the shared style families: lowpoly-cozy, painterly-fantasy, toon-vibrant, voxel-bright, realistic-gritty, scifi-neon, gothic-horror, pixel-bright and pixel-moody, addressed as /cdn/moodboard-<family>/<category>-<name>.mp3.

/cdn/moodboard-<family>/<category>-<name>.mp3

Mood music driven by the game's state, with the engine doing the crossfades:

// places/main/sim.js const TRACKS = { day: "cdn/music-calm-fingerpicked-guitar-meadow-loop.mp3", fight: "cdn/music-driving-taiko-drums-guitar-riff-loop.mp3", }; export function tick(ctx) { const mood = ctx.place.state.mood ?? "day"; ctx.music.play(TRACKS[mood], { fade: mood === "fight" ? 0.6 : 2.5, volume: 0.7 }); }

A hit sound at the place it happened:

ctx.emit("playSound", { clip: "cdn/sfx-sword-blade-thwack-into-straw-stuffed-burlap-dummy.mp3", position: hit, maxDistance: 30, });

A campfire that crackles where it stands, quietly:

{ feetPosition: { x: 4, z: 0, y: { terrain: 0 } }, audio: { clip: "cdn/sfx-campfire-crackle-loop.mp3", loop: true, gain: 0.2, maxDistance: 20 } }

A radio that plays an intro once, then loops the chorus, with a pause everyone hears:

radio.audio = { clip, loop: true, loopStart: 32, loopEnd: 48 }; radio.audio.paused = true; // stops on every ear

A place should sound like itself. One real soundtrack, crossfaded when the mood changes and ducked under voice lines; each action sounding at its own point; a quiet ambience bed (about gain: 0.15) under it. Looping sources add up, so a smithy loop sits around 0.2 with maxDistance where it leaves sight.

A place should sound like itself.

gain: 0.15

Volume belongs to the player. Jayzee's Settings gear has the volume sliders (everything, game, music, voice). A game may carry one mute toggle, never its own volume slider or sound settings page, because it would stack a second dial under Jayzee's. If something is too loud, the fix is one row's gain, maxDistance or bus.

Volume belongs to the player.

Voices are capped at maxVoices (32 by default) and culled beyond cullBeyond (200 m by default); priority decides who keeps a voice when the cap is hit.

Voices are capped

maxVoices

cullBeyond

A voice line's timing comes from the engine: onPlaying names a hook that runs when the line is first heard (the place to show a caption and duck music) and onSoundEnd tells you when it finished. Never guess a line's length with a timer.

A voice line's timing

Looping one-shots must be stopped with stopSound when their source dies; keep the handle.

Looping one-shots must be stopped

Sound only starts after the player's press, which Jayzee's own play button already provides, so no "click to enable sound" screen is needed.

Sound only starts after the player's press

For inspiration, horror games such as @fracture/building-66 and @lakaplay/cartoon-horror lean hard on positioned sound and silence, while @binxius/spawn-hangout layers ambience across a lakeside town.

@fracture/building-66

@lakaplay/cartoon-horror

audio: music, playSound, audio rows, buses, naming sounds, voice lines.

vehicles: engine synthesis for cars and boats.

looks: drawing with audioLevel / audioSpectrum.

game-ui: the one mute a HUD may carry and the page's own audio graph (audio.bus).

audio.bus

player-settings: the volume dials Jayzee already gives every player.

next: Light, sky, looks & effects →

#### Block 1

````text
cdn/sfx-sword-blade-thwack-into-straw-stuffed-burlap-dummy.mp3
````

#### Block 2

````text
/cdn/
````

#### Block 3

````text
ctx.music.play(ref, { fade, loop, layer, volume })
````

#### Block 4

````text
loop: false
````

#### Block 5

````text
ctx.music.stop({ fade, layer })
````

#### Block 6

````text
ctx.music.duck(gain, { duration })
````

#### Block 7

````text
ctx.music.now()
````

#### Block 8

````text
ctx.music.now().since
````

#### Block 9

````text
ctx.world.assets[ref]?.duration
````

#### Block 10

````text
ctx.emit("playSound", { clip, position, volume, pitch, refDistance, maxDistance, bus, mode, follow })
````

#### Block 11

````text
mode: "overlap"
````

#### Block 12

````text
mode: "restart"
````

#### Block 13

````text
{ clip, gain, pitch, loop, spatial, maxDistance, bus }
````

#### Block 14

````text
listeners
````

#### Block 15

````text
spatial: false
````

#### Block 16

````text
Footsteps
````

#### Block 17

````text
audio: { gains: {...}, maxVoices: 32, cullBeyond: 200 }
````

#### Block 18

````text
player.gains
````

#### Block 19

````text
ctx.place.acoustics.reverb
````

#### Block 20

````text
ctx.place.listenerEntity
````

#### Block 21

````text
cdn/sfx-<what physically happens>.mp3
````

#### Block 22

````text
-loop
````

#### Block 23

````text
cdn/music-<mood genre instrument words>-loop.mp3
````

#### Block 24

````text
cdn/music-calm-fingerpicked-guitar-meadow-loop.mp3
````

#### Block 25

````text
cdn/music-<mood genre voice words>.mp3?lyrics=...
````

#### Block 26

````text
cdn/voice-<throat words>[-<emotion>]-saying-<the line>.mp3
````

#### Block 27

````text
voice-gravel-voiced-old-soldier-…
````

#### Block 28

````text
-2
````

#### Block 29

````text
-v3
````

#### Block 30

````text
/cdn/moodboard-<family>/<category>-<name>.mp3
````

#### Block 31

````text
// places/main/sim.js
const TRACKS = {
  day:   "cdn/music-calm-fingerpicked-guitar-meadow-loop.mp3",
  fight: "cdn/music-driving-taiko-drums-guitar-riff-loop.mp3",
};
export function tick(ctx) {
  const mood = ctx.place.state.mood ?? "day";
  ctx.music.play(TRACKS[mood], { fade: mood === "fight" ? 0.6 : 2.5, volume: 0.7 });
}
````

#### Block 32

````text
ctx.emit("playSound", {
  clip: "cdn/sfx-sword-blade-thwack-into-straw-stuffed-burlap-dummy.mp3",
  position: hit, maxDistance: 30,
});
````

#### Block 33

````text
{ feetPosition: { x: 4, z: 0, y: { terrain: 0 } },
  audio: { clip: "cdn/sfx-campfire-crackle-loop.mp3", loop: true, gain: 0.2, maxDistance: 20 } }
````

#### Block 34

````text
radio.audio = { clip, loop: true, loopStart: 32, loopEnd: 48 };
radio.audio.paused = true;   // stops on every ear
````

#### Block 35

````text
gain: 0.15
````

#### Block 36

````text
maxVoices
````

#### Block 37

````text
cullBeyond
````

#### Block 38

````text
@fracture/building-66
````

#### Block 39

````text
@lakaplay/cartoon-horror
````

#### Block 40

````text
audio.bus
````


### After clicking "read → Light, sky, looks & effects Sky, sun, fog and time of day, lights on objects, whole-screen looks, and the particle effects grammar for fire, dust and impacts."

- H4: Sky and the hour

How a Jayzee world looks comes from four layers, each set in a few lines rather than painted by hand:

Atmosphere: the sky, the hour, sun and moon, clouds, fog, wind, wet ground and rain. It lives in each place's atmosphere: settings and lights the whole world.

Lights: lamps, torches, spotlights and flashlights placed on objects with the light field.

The look: a "film stock" pass over the finished picture: exposure, colour grade, vignette, grain, bloom, even outlines or a 1-bit dither. It is one small script.

Effects (fx): particles, sparks, smoke, rain, ribbons and trails, plus quick screen moments like flashes, shakes and shockwaves.

Effects (fx)

Together they let a world go from a cold bright morning to a storm at dusk with a handful of numbers.

Sky and the hour

atmosphere.sky picks the sky: a procedural realistic or rayleigh sky lights the world from timeOfDay, while a flat color or gradient sky draws no sun (this site's main place uses a plain colour sky). The sun's day is fixed: on the horizon at 6 and 18, 65 degrees high at noon. Full light runs roughly 6.75 to 17.25; 17 is a low warm sun, 17.5 golden hour, and from about 18.45 the moon takes over. So a sunset is an hour between 17 and 18, never 19.

atmosphere.sky

A turning day is two numbers, atmosphere.cycle = { periodMs, epoch }, never a script. cycle: { frozen: 10 } holds the hour (the Animation Hall uses exactly that). Optional bands make some hours last longer, such as a slow golden hour and a quick night.

atmosphere.cycle = { periodMs, epoch }

cycle: { frozen: 10 }

Other atmosphere keys: clouds (density, altitude, thickness, speed, opacity, color), fog (linear near/far, plus fog.height for mist that lies in valleys), moon (phase, size, intensity), stars, wind (direction, speed, shared by grass, canopies and particles), wet (darkens the ground and pools water) and rain. A player can be given their own sky layer with player.atmosphere.<key>, for a curse or a bedtime that only they see.

fog.height

player.atmosphere.<key>

A light field on an object is { kind, color, intensity, distance, angle, penumbra, aim, shadow }, with kinds point, spot, rect, directional, ambient and hemisphere. Intensity is measured in sun units at 1 m: noon is about 1.5, a lamp 1 to 3. A flashlight is simply a spot riding the camera (feetPosition: { attach: "camera" }, aim: "forward"), with nothing to update per frame.

{ kind, color, intensity, distance, angle, penumbra, aim, shadow }

feetPosition: { attach: "camera" }

aim: "forward"

atmosphere.look: { script, params } points at a file that exports look(ctx). It receives the finished, tone-mapped frame (ctx.scene) and returns it graded, using verbs from builtin/postfx such as grade, vignette and grain. Changing a look's params every frame is free; editing the script recompiles it once. A world can also replace the shading model itself with scripts/lighting.js (lighting(surface, lights, ctx)) for toon bands or hatching.

atmosphere.look: { script, params }

look(ctx)

scripts/lighting.js

lighting(surface, lights, ctx)

An effect is a small program in the fx grammar: one pop line per population of particles, each with a rate or burst, a lifetime, velocity, size, colour and a sink (sprite, mesh, rib for ribbons, light). You play it three ways:

rib

ctx.emit("fx", { position, script, params }) for a one-off (a hit, an explosion).

ctx.emit("fx", { position, script, params })

fx: { script, params } on an object plays at its feet and follows it (a torch, dust under paws).

fx: { script, params }

A file scripts/effects/x.fx.js exporting effect(ctx) for reusable or code-heavy effects.

scripts/effects/x.fx.js

Built-in sprite textures include soft-disc, smoke-puff, ember, mote, flame-wisp, leaf, droplet, snowflake, petal, stalk, chip, grain, splinter and shard.

soft-disc

smoke-puff

ember

mote

flame-wisp

droplet

snowflake

petal

stalk

chip

splinter

shard

The engine also gives instant screen moments as acts: screenShake, screenFlash, shockwave, slash, hitstop, cameraPunch, slowMo, flash, squash, highlightSet, and decal for marks left on surfaces.

A day that turns every ten real minutes, starting at 10:30:

const period = 600_000; place.atmosphere.cycle = { periodMs: period, epoch: now() - period * (10.5 / 24) };

A storm: low dark racing clouds, wind, closer fog, wet ground:

const a = place.atmosphere; a.clouds = { enabled: true, density: 0.82, opacity: 0.9, altitude: 380, thickness: 450, speed: 3, color: "#4b525c" }; a.wind = { direction: 250, speed: 12 }; a.fog = { kind: "linear", near: 40, far: 260 }; a.wet = 0.85;

A look: slightly warmer, a soft vignette and fine grain:

import { grade, grain, vignette } from "builtin/postfx"; export function look(ctx) { const c = grade(ctx.scene, { exposure: 1.05, saturation: 1.1, temperature: 0.1, haze: 0.06 }); return grain(vignette(c, ctx.param("vignette", 0.25)), 0.05); }

Straw flying off a training dummy where the sword lands:

ctx.emit("fx", { position: hit.position, params: { normal: hit.normal }, script: `fx pop straw burst=18..30 life=.8..1.5 v=<%normal|0,1,0>*(2.5..5)+sdir()*(.6..1.6) size=.08..0.16 acc=grav()+drag(1.2) col=oklch(.86 .10 88) a=1>.75:1>0 sz=$size floor=stick r=sprite(stalk,alpha,velocity,.02)` });

Mood is cheap to change. Hour, clouds, fog and wind are settings, so a game can shift from calm to storm by writing a few keys, and a weather object tagged weather can be cleared with one query.

Mood is cheap to change.

A look grades, it never relights. A dark room needs more or brighter lights, not a brighter look; more ambient or exposure only washes walls flat. A night keeps its blacks, with lamps, windows or the moon for what must be seen.

A look grades, it never relights.

Bloom is for lights. bloomThreshold stays at 1 so lit walls and faces don't glow; bloomStrength only when glow is wanted.

Bloom is for lights.

Good effects are several cheap layers with jobs: a core, a payoff chained off it (on=@pop), an accent and one light, with randomised rates and sizes so nothing looks cloned. An impact should be the material that was hit: straw, wood chips, stone grit or metal sparks, each with its own flight.

Good effects are several cheap layers with jobs

on=@pop

Effects pay their frame cost. A beam is a few long cards, a glow is one light or an emissive surface, particles are for what moves. Tens of thousands of particles alive is working scale for the engine, but counts and sizes should branch on the viewer's tier (ctx.quality) so phones draw fewer; lifetimes stay the same for everyone.

Effects pay their frame cost.

No graphics menu. The engine steps detail down per device on its own; looks and effects branch on ctx.quality / ctx.device.quality (low, medium, high, ultra). Expensive passes like walk-through mist run only on high and ultra.

No graphics menu.

ctx.device.quality

Screen flashes stay gentle: lightning is a faint screenFlash (intensity at most 0.15) seconds apart.

Screen flashes stay gentle

This world's own art direction file (scripts/lib/data/aesthetic.yml) is an example of a look written as data: an hour, cloud and fog settings, a palette and a grade.

scripts/lib/data/aesthetic.yml

atmosphere: sky, hour, day cycle, clouds, fog, wind, weather.

looks: the look pass, grading, outlines, custom lighting models, decals.

fx: particle programs, textures, ribbons, impacts, tier branches.

game-feel: shakes, flashes, hitstop and the moments that sell a hit.

meadow-grass, trees, leaf-sprays: living scenery that moves with the wind.

video: video playing on surfaces.

next: Cameras →

#### Block 1

````text
atmosphere.sky
````

#### Block 2

````text
atmosphere.cycle = { periodMs, epoch }
````

#### Block 3

````text
cycle: { frozen: 10 }
````

#### Block 4

````text
fog.height
````

#### Block 5

````text
player.atmosphere.<key>
````

#### Block 6

````text
{ kind, color, intensity, distance, angle, penumbra, aim, shadow }
````

#### Block 7

````text
feetPosition: { attach: "camera" }
````

#### Block 8

````text
aim: "forward"
````

#### Block 9

````text
atmosphere.look: { script, params }
````

#### Block 10

````text
look(ctx)
````

#### Block 11

````text
scripts/lighting.js
````

#### Block 12

````text
lighting(surface, lights, ctx)
````

#### Block 13

````text
rib
````

#### Block 14

````text
ctx.emit("fx", { position, script, params })
````

#### Block 15

````text
fx: { script, params }
````

#### Block 16

````text
scripts/effects/x.fx.js
````

#### Block 17

````text
soft-disc
````

#### Block 18

````text
smoke-puff
````

#### Block 19

````text
ember
````

#### Block 20

````text
mote
````

#### Block 21

````text
flame-wisp
````

#### Block 22

````text
droplet
````

#### Block 23

````text
snowflake
````

#### Block 24

````text
petal
````

#### Block 25

````text
stalk
````

#### Block 26

````text
chip
````

#### Block 27

````text
splinter
````

#### Block 28

````text
shard
````

#### Block 29

````text
const period = 600_000;
place.atmosphere.cycle = { periodMs: period, epoch: now() - period * (10.5 / 24) };
````

#### Block 30

````text
const a = place.atmosphere;
a.clouds = { enabled: true, density: 0.82, opacity: 0.9, altitude: 380, thickness: 450, speed: 3, color: "#4b525c" };
a.wind = { direction: 250, speed: 12 };
a.fog = { kind: "linear", near: 40, far: 260 };
a.wet = 0.85;
````

#### Block 31

````text
import { grade, grain, vignette } from "builtin/postfx";
export function look(ctx) {
  const c = grade(ctx.scene, { exposure: 1.05, saturation: 1.1, temperature: 0.1, haze: 0.06 });
  return grain(vignette(c, ctx.param("vignette", 0.25)), 0.05);
}
````

#### Block 32

````text
ctx.emit("fx", { position: hit.position, params: { normal: hit.normal }, script: `fx
pop straw burst=18..30 life=.8..1.5 v=<%normal|0,1,0>*(2.5..5)+sdir()*(.6..1.6) size=.08..0.16
  acc=grav()+drag(1.2) col=oklch(.86 .10 88) a=1>.75:1>0 sz=$size floor=stick r=sprite(stalk,alpha,velocity,.02)` });
````

#### Block 33

````text
on=@pop
````

#### Block 34

````text
ctx.device.quality
````

#### Block 35

````text
scripts/lib/data/aesthetic.yml
````


### After clicking "read → Cameras A camera is a script: third-person orbits, first-person, top-down and cinematic shots, and how the camera reads the player's look."

In Jayzee the camera is not a fixed setting you pick from a list. It is a small script, a "rig", that decides each tick where the eye stands and where it looks. That sounds like work, but every starter ships one, and the common shapes are well-trodden:

First person: the eye in the head, the body hidden.

Third-person orbit: the mouse swings the view around the player, and the engine pulls the camera in when a wall gets between you and the eye.

Chase: behind a car, boat or mount, easing after its heading.

Isometric and top-down: an orthographic view from above at an angle, for tactics, farms and builders.

Isometric and top-down

2D: side-on or top-down for 2d-side and 2d-top places, with pixel snapping.

Cutscene cameras: a machine's own picture with ctx.view.camera, no player behind it.

Cutscene cameras

The Animation Hall in this very world is a live example: a third-person orbit with wheel zoom, its numbers kept in scripts/lib/data/hall-camera.yml.

scripts/lib/data/hall-camera.yml

The world picks its camera in world.config.yaml with camera: templates/camera.js#camera, and a place may override it in its own config (the hall does). The camera definition carries kind: "custom", a behavior script, orientation, pointerLock, sensitivity, fov and starting state.

camera: templates/camera.js#camera

The rig script has two hooks: onInput(ctx, input) and update(ctx, dt), once a tick. Inside it, ctx.self is the camera:

ctx.self.target is what it follows (the vehicle's hull while driving).

ctx.self.view.yaw / .pitch is where the mouse is looking, in radians.

ctx.self.view.yaw

.pitch

ctx.self.feetPosition and ctx.self.rotation place the eye; rotation can be { lookAt: p, include: ["yaw", "pitch"] }.

{ lookAt: p, include: ["yaw", "pitch"] }

.hideLocalPlayer, .pointerLock, .fov, .clip, .orientation can be changed live.

.fov

.clip

ctx.world.camera.aspect is the screen's width over height, below 1 on an upright phone, and .insetRight is the share covered by Jayzee's rail.

ctx.world.camera.aspect

.insetRight

There are two orientation modes:

{ source: "look" } with pointerLock: true is the engine's live orbit. You set the arm with state: heightOffset (1.8 by default), lateralOffset (0, or to the side for over-the-shoulder), desiredDist (6) and lookOffsetY (1.5). The engine casts the arm against walls, crates and ground for you (never against characters). Things the arm passes through can be faded for this player with ctx.player.faded = { [id]: 0.35 }.

{ source: "look" } with pointerLock: true

{ source: "look" }

pointerLock: true

heightOffset

lateralOffset

desiredDist

lookOffsetY

ctx.player.faded = { [id]: 0.35 }

{ source: "script" } with pointerLock: false means the rig writes the whole pose itself, and mouse motion arrives as input.axes.lookX / lookY. This is the mode for iso, top-down and 2D.

{ source: "script" } with pointerLock: false

{ source: "script" }

pointerLock: false

input.axes.lookX

Cameras come in layers. player.camera.pointerLock = false changes one field for one player; player.camera = {...} swaps one player's whole camera (a vehicle does this when boarded); player.camera = null is a hard cut back; ctx.world.camera changes everyone's for good.

player.camera.pointerLock = false

player.camera = {...}

player.camera = null

The engine provides axes for the rig: lookX, lookY, aimYawSin, aimYawCos, aimPitchN. Zoom is an axis you declare: zoomIn: { mouse: wheelY } under inputs.axes, which also feeds pinch on phones.

zoomIn: { mouse: wheelY }

inputs.axes

The default camera template a fresh 3D world gets:

export const camera = { behavior: ["scripts/camera.js"], kind: "custom", orientation: { source: "look" }, sensitivity: 3, state: { pitch: 0, yaw: 0 }, };

The hall's place config, giving its arriving players a third-person orbit:

camera: behavior: - scripts/hall-camera.js kind: custom orientation: source: look pointerLock: true sensitivity: 3 state: pitch: -0.25 yaw: 0

A car hands its driver a chase camera when they take the wheel, and takes it back after:

export function onControlBegin(ctx, player) { player.camera = { kind: "custom", behavior: ["scripts/chase-camera.js"], orientation: { source: "look" }, pointerLock: true }; } export function onControlEnd(ctx, player) { player.camera = null; }

Inside a chase rig, the arm is just three state numbers each tick:

s.heightOffset = 3.7; s.desiredDist = 7; s.lookOffsetY = 1.4; ctx.self.rotation = { lookAt: { x: f.x, y: f.y + 1.4, z: f.z }, include: ["yaw", "pitch"] };

Pick the camera from the game's feel. The docs' own taste notes: low and close behind a runner so the ground streaks; high over a kart so the road reads; back and high behind a horse so the valley reads; in at once at a doorway and out slowly once a room opens. A platformer camera leads the run and never shows the void past the edge. A great camera is never noticed.

Pick the camera from the game's feel.

Distances have a feel. For a chase rig, 5 to 6 m is tight and kinetic, 8 planted, 11 to 14 wide and cinematic. Keep the arm at most half the narrowest space walked: in a 4 m tunnel, desiredDist 2 or less, or first person.

Distances have a feel.

Modes are one script. Chase, hood and cockpit views toggle through state.mode in one rig, never by swapping scripts.

Modes are one script.

state.mode

Phones are tall. ctx.world.camera.aspect drops below 1 upright; fov spans the short edge, so wide views widen the rig on a tall screen. Keep the player to the left of Jayzee's rail using .insetRight.

Phones are tall.

Sensitivity: the camera's sensitivity is multiplied by the player's own look setting; 1.5 to 2 feels deliberate, 3 matches the default, under 1 feels broken.

Iso views: orthographic projection, yaw 0.785, pitch 0.615, distance twice orthoSize, the wheel moving state.orthoSize. Top-down 3D is pitch -90 at about 15 m height.

Iso views

state.orthoSize

Don't hijack the cursor. Never use { source: "script" } with pointerLock: false on a driven vehicle; boarding would free the cursor and kill the look.

Don't hijack the cursor.

Smooth what moves at tick rate. State lands at the tick rate, so a rig eases toward a goal (x += (goal - x) * (1 - exp(-rate * dt)), 5 to 12 per second).

Smooth what moves at tick rate.

x += (goal - x) * (1 - exp(-rate * dt))

Racing games such as @hips/hypertrackmania-x-time-trial-racing and @metalhorse233/dragon-racing live or die on their chase rigs; @rexgaming_yt/sky-ring-arena-multiplayer is first person.

@hips/hypertrackmania-x-time-trial-racing

@metalhorse233/dragon-racing

cameras: every rig shape, the look contract, chase, first person, iso, 2D.

vehicles: handing a camera to a driver.

projectiles: held items, aiming down sights, bob, sway and recoil in first person.

2d-mode: the side and top-down cameras and parallax.

pointer-raycasting: clicking things through the camera.

game-feel: camera punches and shakes.

next: Controls, phones & devices →

#### Block 1

````text
scripts/lib/data/hall-camera.yml
````

#### Block 2

````text
camera: templates/camera.js#camera
````

#### Block 3

````text
ctx.self.view.yaw
````

#### Block 4

````text
.pitch
````

#### Block 5

````text
{ lookAt: p, include: ["yaw", "pitch"] }
````

#### Block 6

````text
.fov
````

#### Block 7

````text
.clip
````

#### Block 8

````text
ctx.world.camera.aspect
````

#### Block 9

````text
.insetRight
````

#### Block 10

````text
{ source: "look" }
````

#### Block 11

````text
pointerLock: true
````

#### Block 12

````text
heightOffset
````

#### Block 13

````text
lateralOffset
````

#### Block 14

````text
desiredDist
````

#### Block 15

````text
lookOffsetY
````

#### Block 16

````text
ctx.player.faded = { [id]: 0.35 }
````

#### Block 17

````text
{ source: "script" }
````

#### Block 18

````text
pointerLock: false
````

#### Block 19

````text
input.axes.lookX
````

#### Block 20

````text
player.camera.pointerLock = false
````

#### Block 21

````text
player.camera = {...}
````

#### Block 22

````text
player.camera = null
````

#### Block 23

````text
zoomIn: { mouse: wheelY }
````

#### Block 24

````text
inputs.axes
````

#### Block 25

````text
export const camera = {
  behavior: ["scripts/camera.js"], kind: "custom",
  orientation: { source: "look" }, sensitivity: 3,
  state: { pitch: 0, yaw: 0 },
};
````

#### Block 26

````text
camera:
  behavior:
    - scripts/hall-camera.js
  kind: custom
  orientation:
    source: look
  pointerLock: true
  sensitivity: 3
  state:
    pitch: -0.25
    yaw: 0
````

#### Block 27

````text
export function onControlBegin(ctx, player) {
  player.camera = { kind: "custom", behavior: ["scripts/chase-camera.js"],
                    orientation: { source: "look" }, pointerLock: true };
}
export function onControlEnd(ctx, player) { player.camera = null; }
````

#### Block 28

````text
s.heightOffset = 3.7; s.desiredDist = 7; s.lookOffsetY = 1.4;
ctx.self.rotation = { lookAt: { x: f.x, y: f.y + 1.4, z: f.z }, include: ["yaw", "pitch"] };
````

#### Block 29

````text
state.mode
````

#### Block 30

````text
state.orthoSize
````

#### Block 31

````text
x += (goal - x) * (1 - exp(-rate * dt))
````

#### Block 32

````text
@hips/hypertrackmania-x-time-trial-racing
````

#### Block 33

````text
@metalhorse233/dragon-racing
````


### After clicking "read → Controls, phones & devices Declaring axes and actions, reading them in onInput, and how phones, gamepads and headsets get controls without extra work."

- H4: Phones and tablets

You describe your game's controls once, by name: "moveX", "moveZ", "jump", "fire". Each name is bound to keys, mouse buttons and gamepad buttons, and the same names drive a phone's touch controls. Your game's code never asks "was the W key pressed?"; it asks "how far is moveZ pushed?" and "was jump pressed this tick?". That one decision buys you:

Keyboard and mouse, with any key, mouse button or wheel.

Keyboard and mouse

Gamepads, sticks, triggers and buttons, read as one combined controller.

Phones and tablets, with a joystick and buttons drawn for you from your declared controls at zero effort, or a layout you design yourself.

Phones and tablets

Headsets: in a headset world, both tracked hands as axes and their buttons as a standard pad.

Rebinding for free: players change keys and pad buttons in Jayzee's own Settings, and your game keeps working because it only ever spoke names.

Rebinding for free

Controls are declared under inputs in world.config.yaml (and a place can declare its own, as the Animation Hall does):

Axes (inputs.axes.<name>) are numbers from -1 to 1: { keys: "a/d" } reads -1 for A and +1 for D. An axis can also come from mouse (deltaX, deltaY, wheelY, wheelX) or a gamepad stick or trigger (leftStickX, rightStickY, Gamepad:LT), with an optional deadzone.

inputs.axes.<name>

{ keys: "a/d" }

Actions (inputs.actions.<name>) are buttons: keys, mouse (left, right, middle, mouse4, mouse5, wheelUp, wheelDown), gamepad (a, b, x, y, lb, rb, lt, rt, start, dpadUp and so on), plus modifiers, activeOn (keydown, hold, keyup) and touch hints such as label, slot and gesture.

inputs.actions.<name>

Every action the HUD sends with sendAction must also be declared, even with no keys (this site declares nav, hall, site and sample as empty actions).

A behavior receives them in onInput(ctx, input):

input.axes.<name> from -1 to 1.

input.held.<action>, input.pressed.<action>, input.released.<action>.

input.held.<action>

input.pressed.<action>

input.released.<action>

input.actionData.<action> holds a sendAction payload, or a touch drag's { x, y, magnitude }.

{ x, y, magnitude }

Input goes to the player's own body, or to whatever they control: setting a car's controller to a player id routes their input to the car's script.

Two keys are off limits: Tab is reserved, and V is Jayzee's push-to-talk unless the creator asks for it. Escape frees the cursor and closes chat.

Every game gets a draft touch layout projected from its inputs: a stick from axes literally named moveX/moveZ (moveY in 2D), drag-to-look from lookX/lookY, pinch-zoom from a wheel axis, and up to 4 chips for actions, ranked by authored slot, then common verbs (jump first), then declaration order. A fifth verb is dropped loudly. Rename the move axes and the stick vanishes.

draft

moveX

moveZ

moveY

To design the controls yourself, write inputs.touch.surfaces.<name>: complete layouts with sticks (at most 2, one per zone, floating or fixed), buttons (by action or held axis, size: primary | secondary, slot 1 to 4, an icon), pads (a steering wheel or touchpad look), and gestures (tap, hold). inputs.touch.active names a tiny selector script that picks which surface a player sees right now, so climbing into a car swaps to pedals the moment the door closes. inputs.touch.style dresses the parts in your game's own colours. ctx.resolveControls() shows the draft and every dropped control with the reason.

inputs.touch.surfaces.<name>

sticks

size: primary | secondary

pads

gestures

inputs.touch.active

inputs.touch.style

ctx.resolveControls()

The 3D starter's controls, the same ones the Animation Hall uses:

inputs: actions: jump: keys: - space axes: moveX: keys: a/d moveZ: keys: s/w zoomIn: mouse: wheelY

Reading them in a behavior:

export function onInput(ctx, input) { const x = input.axes.moveX ?? 0, z = input.axes.moveZ ?? 0; if (input.pressed.jump && ctx.self.grounded) ctx.self.velocity = { ...ctx.self.velocity, y: 10 }; }

A shooter on foot that becomes a car when driving, as touch surfaces:

inputs: touch: surfaces: default: sticks: [{ x: moveX, y: moveZ }] buttons: - { action: fire, drag: { x: aimX, y: aimY }, slot: 1, size: primary, icon: "🎯" } - { action: dodge, slot: 2 } driving: sticks: [] look: false pads: [{ x: steer, mode: absolute, zone: left, label: STEER }] buttons: - { axis: throttle, label: GAS, slot: 1, size: primary } - { axis: brake, label: BRAKE, slot: 2 } active: scripts/controls.js

And the selector, which reads live state so late joiners and reconnects land on the right layout:

// scripts/controls.js export default (ctx) => (ctx.player.state.driving ? "driving" : "default");

Design for two thumbs. The docs' bar: a phone player never hunts for a control. The stick sits under the thumb that landed, the verb that matters sits big at the other thumb's resting arc, and aiming is hold-drag-release on the fire chip itself. Chips are 56 or 48 px, and controls keep clear of the platform's rail on the right edge.

Design for two thumbs.

Four buttons is the comfortable phone limit for a draft. A game with more verbs designs a surface, or adds a "more" button that flips a state flag the selector reads.

Four buttons is the comfortable phone limit

Desktop and phone share code. Because a stick and WASD both write moveX, behavior code cannot tell them apart; a car reads axes.steer || axes.moveX and works everywhere.

Desktop and phone share code.

axes.steer || axes.moveX

Players own their keys. Rebinding lives in Jayzee's Settings › look › keys; a game never builds its own rebind screen, and a HUD button can open that page with ctx.emit("openSettings", { page: "keys" }). Show controls by their labels, which follow rebinds, never by key names.

Players own their keys.

ctx.emit("openSettings", { page: "keys" })

Look sensitivity and invert-Y are the player's. A creator can switch off the player's override with engine.playerSettings.caps.controls.lookSensitivity only when it breaks the design, such as a cutscene camera.

Look sensitivity and invert-Y

engine.playerSettings.caps.controls.lookSensitivity

Accessibility is one-way. A creator can pre-enable reduceFlashing or reduceMotion for a strobe-heavy game, never disable them; shakes and blinks should read player.reduceMotion / player.reduceFlashing and stand down.

Accessibility is one-way.

player.reduceMotion

player.reduceFlashing

Gamepads read as one in behaviors; only ui.js can tell controllers apart (navigator.getGamepads()), which matters for couch multiplayer like @hips/super-smash-spawn-brawl-ultimate-platform-fighter.

Gamepads read as one

Headsets: a world's link opens flat in a headset's browser. In a headset world the head moves the camera and each hand is eight axes (handLeftX/Y/Z, its rotation, handLeftTracked, and the same for handRight), with triggers as lt/rt and grips as lb/rb.

handLeftX/Y/Z

handLeftTracked

handRight

Phone tilt arrives on the HUD page as devicemotion once the player allows it, and the HUD passes it on with sendAxis.

Phone tilt

devicemotion

sendAxis

A hotbar scroll is two actions, wheelUp and wheelDown, one pulse per notch, never the wheelY axis.

A hotbar scroll

mobile-controls: the draft, designed surfaces, selectors, styling.

player-settings: what players own (keys, sensitivity, accessibility) and the few creator caps.

cameras: look axes, zoom, pointer lock.

pointer-raycasting: clicking and tapping things in the world.

headset: hands and buttons in VR.

vehicles: handing controls to a car or boat.

game-ui: on-screen buttons that sendAction.

next: Characters & animation →

#### Block 1

````text
inputs.axes.<name>
````

#### Block 2

````text
{ keys: "a/d" }
````

#### Block 3

````text
inputs.actions.<name>
````

#### Block 4

````text
input.held.<action>
````

#### Block 5

````text
input.pressed.<action>
````

#### Block 6

````text
input.released.<action>
````

#### Block 7

````text
{ x, y, magnitude }
````

#### Block 8

````text
moveX
````

#### Block 9

````text
moveZ
````

#### Block 10

````text
moveY
````

#### Block 11

````text
inputs.touch.surfaces.<name>
````

#### Block 12

````text
sticks
````

#### Block 13

````text
size: primary | secondary
````

#### Block 14

````text
pads
````

#### Block 15

````text
gestures
````

#### Block 16

````text
inputs.touch.active
````

#### Block 17

````text
inputs.touch.style
````

#### Block 18

````text
ctx.resolveControls()
````

#### Block 19

````text
inputs:
  actions:
    jump:
      keys:
        - space
  axes:
    moveX:
      keys: a/d
    moveZ:
      keys: s/w
    zoomIn:
      mouse: wheelY
````

#### Block 20

````text
export function onInput(ctx, input) {
  const x = input.axes.moveX ?? 0, z = input.axes.moveZ ?? 0;
  if (input.pressed.jump && ctx.self.grounded) ctx.self.velocity = { ...ctx.self.velocity, y: 10 };
}
````

#### Block 21

````text
inputs:
  touch:
    surfaces:
      default:
        sticks: [{ x: moveX, y: moveZ }]
        buttons:
          - { action: fire, drag: { x: aimX, y: aimY }, slot: 1, size: primary, icon: "🎯" }
          - { action: dodge, slot: 2 }
      driving:
        sticks: []
        look: false
        pads: [{ x: steer, mode: absolute, zone: left, label: STEER }]
        buttons:
          - { axis: throttle, label: GAS, slot: 1, size: primary }
          - { axis: brake, label: BRAKE, slot: 2 }
    active: scripts/controls.js
````

#### Block 22

````text
// scripts/controls.js
export default (ctx) => (ctx.player.state.driving ? "driving" : "default");
````

#### Block 23

````text
axes.steer || axes.moveX
````

#### Block 24

````text
ctx.emit("openSettings", { page: "keys" })
````

#### Block 25

````text
engine.playerSettings.caps.controls.lookSensitivity
````

#### Block 26

````text
player.reduceMotion
````

#### Block 27

````text
player.reduceFlashing
````

#### Block 28

````text
handLeftX/Y/Z
````

#### Block 29

````text
handLeftTracked
````

#### Block 30

````text
handRight
````

#### Block 31

````text
devicemotion
````

#### Block 32

````text
sendAxis
````


### After clicking "read → Characters & animation Player bodies, avatars, the 61-clip humanoid library, animation channels, and scripted creatures with their own skeletons."

- H4: Channels play clips
- H4: One writer for the gait, one for the pose
- H4: Bones and IK
- H4: Built creatures
- H4: Bodies and who passes through whom

Every Jayzee world comes with a ready human body for each player and a library of motion to put on it. Out of the box you have:

A player body that walks, runs, sprints and jumps, with its gait picked from its real speed so the feet don't slide. Players wear /cdn/neutral-default-avatar.glb unless your game dresses them otherwise.

A player body

/cdn/neutral-default-avatar.glb

A clip library: around sixty humanoid clips (this site's Animation Hall plays every one of them on its own figure). Idle, walk, run, sprint, crouch, swim, climb, drive, sit, sleep, combat moves, emotes, dances, and a woman's-body set.

A clip library

Layers of motion: a wave on the upper body while the legs keep walking; a cheer that plays for three seconds and hands back to the idle.

Layers of motion

Hands that reach things: inverse kinematics (IK) that holds a hand on a crate, a ledge, a wheel, over any clip.

Hands that reach things

Your own clips: an animation file you bring is fitted to every body's rest pose with one command.

Creatures you build: a creature or character Cleetus makes is one scripted geometry with its own skeleton, its bones posed by name.

Creatures you build

Bodies that collide on purpose: one table decides who walks through whom (teammates pass, enemies block, ghosts drift through each other).

Bodies that collide on purpose

Channels play clips

A body's anim is a set of named channels. Each channel plays one clip: ctx.self.anim.<channel> = { clip, weight, loop, mask, blend }, and null stops it. Clips are addressed as cdn/clip-<words>.glb. Bare names play only the body's five built-ins: Idle, Walk, Run, Sprint, Jump.

ctx.self.anim.<channel> = { clip, weight, loop, mask, blend }

cdn/clip-<words>.glb

A name ending in -loop cycles; any other plays once, then .finished reads true and the gait resumes.

.finished

clampWhenFinished: true holds the last frame, so a death stays down.

clampWhenFinished: true

Weight decides who wins a bone: a gesture at weight 4 beats the idle's 1.

A mask limits a clip to part of the body: mask: { from: "Spine" } puts a wave on the torso and arms and leaves hips and legs to the walk.

mask

mask: { from: "Spine" }

Library clips play at once; a clip loads on its first play.

One writer for the gait, one for the pose

The walking cycle has exactly one writer on each body: the locomotion script (scripts/humanoid-locomotion.js in the docs; this site's hall uses its own copy, scripts/hall-locomotion.js). Your guard or player script only steers velocity and yaw; the gait picks Walk, Run or Idle from the pace. Other systems that want to change the pose (a climb, a slide) ask through state (ctx.self.state.climb = { ledge }, then null) rather than writing animation themselves. A pose that replaces the gait (sit, sleep, swim) stands the gait down first, and a body parented to a seat sits by itself.

scripts/humanoid-locomotion.js

scripts/hall-locomotion.js

ctx.self.state.climb = { ledge }

Bones and IK

ctx.self.bones.<Bone>.pitch (degrees) poses a bone directly, for example leaning an aim on bones.Spine.pitch.

ctx.self.bones.<Bone>.pitch

bones.Spine.pitch

ctx.self.bones.RightHand.reach = { object: "crate", offset: { x: 0.2, y: 0.4, z: 0 } } holds the hand on a thing over any clip; { to, pole } bends the elbow toward the pole; .aim turns a bone's front toward a target; null lets go.

ctx.self.bones.RightHand.reach = { object: "crate", offset: { x: 0.2, y: 0.4, z: 0 } }

{ to, pole }

.aim

A foot lock pins a planted foot. A thing seated in a fist closes the hand on it.

Built creatures

A creature Cleetus builds is a primitive: { kind: "scripted", script } whose file exports geometry(ctx) and a skeleton() (bone → { parent, pivot }). ctx.bone("jaw") weights the faces that follow it, and the pose is self.bones.jaw.pitch. A clip on such a body is written inline: self.anim.chew = { clip: { duration: 0.6, tracks: { jaw: { pitch: [0, -20, 0] } } } }.

skeleton()

{ parent, pivot }

ctx.bone("jaw")

self.bones.jaw.pitch

self.anim.chew = { clip: { duration: 0.6, tracks: { jaw: { pitch: [0, -20, 0] } } } }

Bodies and who passes through whom

A walking body has physics: "character". Which kinds of body pass through which is one table on the world, passThrough. Every pair collides until the table pairs their layers. Every character that names no layer is on the "player" layer, which is paired with itself, so players and NPCs walk through each other by default. A boss that names its own layer becomes a wall no player walks through. A character can even stand on its own up for walking on walls, ceilings or a small planet.

physics: "character"

A gesture on the upper body, for three seconds, while the legs keep walking:

ctx.self.anim.gesture = { clip: "cdn/clip-cheer-loop.glb", weight: 4, duration: 3, mask: { from: "Spine" } };

An NPC that walks with the shared gait, steered by its own script:

ctx.spawn({ physics: "character", model: "/cdn/neutral-default-avatar.glb", behavior: ["scripts/guard.js", "scripts/humanoid-locomotion.js"], });

A hand held on a crate whatever clip is playing:

ctx.self.bones.RightHand.reach = { object: "crate", offset: { x: 0.2, y: 0.4, z: 0 } }; // later: let go ctx.self.bones.RightHand.reach = null;

Teams in one table: friends pass, enemies block.

ctx.world.passThrough = { ghost: ["ghost"], red: ["red"], blue: ["blue"] }; ctx.spawn({ tags: ["boss"], feetPosition: { x: 0, y: 0, z: -12 }, physics: { body: "character", layer: "boss" } });

Bringing your own clip from a file:

jayzee clip import dance.fbx --name "my victory dance" --loop

Emotes, combat and social games are nearly free. The library already covers attack, kick, throw, block, hit-react, die, cast, bow, salute, wave, clap, laugh, cry, cheer, five hip-hop dances, sitting versions of several, and car entry and exit. Walk into the Animation Hall from the Motion page to see each one.

Emotes, combat and social games are nearly free.

Feet don't skate. Because the gait reads the body's speed and plays each clip at the matching rate, you can change walkSpeed (the hall uses 6 m/s) and the legs follow.

Feet don't skate.

walkSpeed

Layer, don't replace. A sword swing on the upper body over a running gait is one masked channel; you never need a "run-and-swing" clip.

Layer, don't replace.

One-shots resolve themselves. A die or hit-react plays once and reports .finished; a looping clip runs until you set the channel to null.

One-shots resolve themselves.

hit-react

Collisions are a design decision. Default: players and NPCs pass through each other, which keeps crowds and doorways from jamming. If a guard should block you, give it a layer. A pickup or zone is a trigger: true, never a layer pairing.

Collisions are a design decision.

Imported clips work on every body only when their rest pose matches; Blender keys copied between rigs need matching rest poses.

Imported clips work on every body

A hero character or creature can be a Blender build with its own rig and clips; a quick one is a scripted geometry with a few bones and inline clips.

A hero character or creature

Published games that lean on this: @hips/super-smash-spawn-brawl-ultimate-platform-fighter (fighting moves), @binxius/spawn-hangout (social emotes), @izkimar/escape-from-stranglethorn (an RPG cast of characters).

@izkimar/escape-from-stranglethorn

animations: channels, weights, masks, IK, clip import.

bodies: collision layers, passThrough, a body's own up.

geometry: scripted creatures with skeleton() and ctx.bone.

ctx.bone

blender-game-assets: rigged hero characters and creatures.

uploaded-models: using a model someone hands you, held items, fists.

physics: character bodies, forces, velocity.

vehicles: sitting, driving, entering and exiting.

next: NPC minds & AI jobs →

#### Block 1

````text
/cdn/neutral-default-avatar.glb
````

#### Block 2

````text
ctx.self.anim.<channel> = { clip, weight, loop, mask, blend }
````

#### Block 3

````text
cdn/clip-<words>.glb
````

#### Block 4

````text
.finished
````

#### Block 5

````text
clampWhenFinished: true
````

#### Block 6

````text
mask: { from: "Spine" }
````

#### Block 7

````text
scripts/humanoid-locomotion.js
````

#### Block 8

````text
scripts/hall-locomotion.js
````

#### Block 9

````text
ctx.self.state.climb = { ledge }
````

#### Block 10

````text
ctx.self.bones.<Bone>.pitch
````

#### Block 11

````text
bones.Spine.pitch
````

#### Block 12

````text
ctx.self.bones.RightHand.reach = { object: "crate", offset: { x: 0.2, y: 0.4, z: 0 } }
````

#### Block 13

````text
{ to, pole }
````

#### Block 14

````text
.aim
````

#### Block 15

````text
skeleton()
````

#### Block 16

````text
{ parent, pivot }
````

#### Block 17

````text
ctx.bone("jaw")
````

#### Block 18

````text
self.bones.jaw.pitch
````

#### Block 19

````text
self.anim.chew = { clip: { duration: 0.6, tracks: { jaw: { pitch: [0, -20, 0] } } } }
````

#### Block 20

````text
physics: "character"
````

#### Block 21

````text
ctx.self.anim.gesture = { clip: "cdn/clip-cheer-loop.glb", weight: 4, duration: 3, mask: { from: "Spine" } };
````

#### Block 22

````text
ctx.spawn({
  physics: "character",
  model: "/cdn/neutral-default-avatar.glb",
  behavior: ["scripts/guard.js", "scripts/humanoid-locomotion.js"],
});
````

#### Block 23

````text
ctx.self.bones.RightHand.reach = { object: "crate", offset: { x: 0.2, y: 0.4, z: 0 } };
// later: let go
ctx.self.bones.RightHand.reach = null;
````

#### Block 24

````text
ctx.world.passThrough = { ghost: ["ghost"], red: ["red"], blue: ["blue"] };
ctx.spawn({ tags: ["boss"], feetPosition: { x: 0, y: 0, z: -12 }, physics: { body: "character", layer: "boss" } });
````

#### Block 25

````text
spawn clip import dance.fbx --name "my victory dance" --loop
````

#### Block 26

````text
walkSpeed
````

#### Block 27

````text
hit-react
````

#### Block 28

````text
@izkimar/escape-from-stranglethorn
````

#### Block 29

````text
ctx.bone
````


### After clicking "read → NPC minds & AI jobs How NPCs think: one manager stepping a crowd, hearing noise, pathfinding, and off-loop jobs that call AI text models."

- H4: Behaviors and the update loop
- H4: Pathfinding and hearing
- H4: Jobs: work off the game loop
- H4: jev:decide, the probability pipe
- H4: llm:chat, the talking character

Characters in a Jayzee game can think in three ways, and you can mix them:

Plain rules. A guard chases the nearest player inside 18 metres, a wolf roams near home, a turret fires when something is in range. Fast, free, and runs every tick.

Plain rules.

A mind that decides in odds (jev:decide). You hand it a few facts (distances, counts, its last moves) and a typed question ("buy, browse or leave?"), and in about half a second it answers with probabilities. Forty shoppers each sampling those odds spread like a real crowd instead of acting like clones.

A mind that decides in odds

A character that talks (llm:chat). A shopkeeper, a quest-giver or a rival who reads what the player types, remembers the conversation, can look at a picture, and answers in their own voice. llm:generate returns structured data instead of prose: a quest, an item, a riddle.

A character that talks

Around them sit helpers: walking paths over any ground (findPath), a shared ear for noises (noise), timers that survive a restart (ctx.after), and jobs that run work off the game loop.

Behaviors and the update loop

An NPC is an object with a behavior script. Its update(ctx, dt) runs every tick near players, and its hooks fire on events (onCollide, onTriggerEnter, ears). It writes its own velocity, its own state, and its animation.

A few NPCs each keep a behavior, and each can ctx.sleep() alone when there's nothing to do.

A few NPCs

ctx.sleep()

Dozens and up are one manager's update() stepping every row of a query({ tags: ["wolf"] }): one script, one census of players a tick, one velocity write per wolf.

Dozens and up

query({ tags: ["wolf"] })

export const updateSchedule = { every: N | { seconds } } slows a mind down to the rate it actually needs.

export const updateSchedule = { every: N | { seconds } }

A march that must continue while nobody watches is an animate over feetPosition.x / .z, run on the room's clock, so it stands where its route says when a player comes near.

feetPosition.x

.z

Pathfinding and hearing

findPath(ctx, from, to, opts) from builtin/nav returns { points, ok, partial }: feet positions over colliders and terrain as they stand. ok: false means a cut-off path that ends at the nearest reachable spot; partial: true means the search isn't done yet, so ask again next tick.

findPath(ctx, from, to, opts)

{ points, ok, partial }

Noise is the ear every NPC shares: a gun does emit("noise", { position, radius, kind }, { audience: { nearby: position, radius } }), and an NPC's ears.noise keeps { ...position, at: ctx.now() } for a few seconds to investigate.

emit("noise", { position, radius, kind }, { audience: { nearby: position, radius } })

ears.noise

{ ...position, at: ctx.now() }

Jobs: work off the game loop

ctx.job(jobId, args, callback) asks for work and calls back with r = { ok, data, error }; a job never throws. The engine's built-in jobs are llm:chat, llm:generate, llm:clear, jev:decide, mail:send, chat:send, chat:history, player:token, player:names, text:check, image:generate, image:segment and video:generate. Instead of a callback you can name an export (ctx.job("jev:decide", args, "decided")): that export fires where the entity simulates, even through a restart, while a plain callback lives only as long as its hook. Your own jobs live in jobs/<id>.js, exporting run(job, args); they can fetch(url) the web.

ctx.job(jobId, args, callback)

r = { ok, data, error }

ctx.job("jev:decide", args, "decided")

run(job, args)

jev:decide, the probability pipe

Questions come in three types: boolean returns { probability }; choice returns { choice, probabilities } with the options as the keys of criteria; score returns a number over ordered steps like ["sour", "flat", "glad"].

{ probability }

{ choice, probabilities }

criteria

["sour", "flat", "glad"]

Act by sampling with ctx.random(), never by always taking the top answer.

Act by sampling

Memory is your state: keep the last few { at, act } in state.recent and hand them back next time.

Memory is your state

{ at, act }

state.recent

Ask once per decision on the mind's own clock, never per tick, and none while ctx.place.players is empty.

once per decision on the mind's own clock

llm:chat, the talking character

ctx.job("llm:chat", { conversationId, system, message, media, maxHistory, model }, (r) => …) answers r.data.text. conversationId is the memory: "npc:" + npcId + ":" + playerId gives each player their own thread with each NPC. maxHistory defaults to 20. model is "fast" or "smart" (slower, stronger), or an OpenRouter id (20 asks a player an hour). A fourth argument { onPart } streams the words as they come. media passes a picture for that turn alone. llm:clear forgets. Seconds pass between ask and answer, so set state.loading from submit to callback and show it.

ctx.job("llm:chat", { conversationId, system, message, media, maxHistory, model }, (r) => …)

r.data.text

conversationId

"npc:" + npcId + ":" + playerId

maxHistory

"fast"

"smart"

{ onPart }

media

state.loading

A shopper that decides every four to six seconds, from the jev skill:

export function update(ctx) { const s = ctx.self.state; if (!ctx.place.players.length || ctx.now() < (s.nextAt ?? 0)) return; s.nextAt = ctx.now() + 4000 + ctx.random() * 2000; ctx.job("jev:decide", { state: { gold: s.gold, recent: s.recent ?? [] }, questions: { act: { type: "choice", instructions: "What does this shopper do next?", criteria: { buy: "pays and takes it", browse: "looks at another item", leave: "walks off" } } }, }, "decided"); } export function decided(ctx, r) { if (!r.ok) return; // keep the last plan, ask next cycle const act = r.data.answers.act; let roll = ctx.random(), pick = act.choice; for (const [option, p] of Object.entries(act.probabilities)) if ((roll -= p) <= 0) { pick = option; break; } ctx.self.state.plan = pick; }

A villager who talks back, one thread per player:

ctx.job("llm:chat", { conversationId: "npc:" + ctx.self.id + ":" + player.id, system: "You are Mira, the ferry keeper. Short, dry, kind.", message: words, model: "fast", }, (r) => { if (r.ok) ctx.self.state.reply = r.data.text; });

A path to the goal, asked again while the search reads the ground:

import { findPath } from "builtin/nav"; const path = findPath(ctx, ctx.self.feetPosition, goal); if (path.partial) return; // ask next tick ctx.self.state.route = path.points;

Rules first, minds on top. Movement, chasing and attacking are plain code every tick; a jev or llm ask decides the intent every few seconds. The docs are firm: one ask per decision, never per tick.

Rules first, minds on top.

intent

Minds cost money, rules don't. jev:decide is metered to the world like llm:chat (a 768 px picture counts as four plain asks). Asking only while players are present keeps it sane.

Minds cost money, rules don't.

Talking characters take seconds. Design for the wait: a "thinking" bubble, or streamed words with onPart.

Talking characters take seconds.

Things only think near people. Scripts, physics and timers run within about 500 m of a player; farther NPCs hold and resume on approach. A boss or a bot director that must think with nobody nearby is a row with simulatedBy: "platform", which runs on Jayzee's machine.

Things only think near people.

simulatedBy: "platform"

Who runs the NPC matters. A hit is judged on the striker's machine (target.state.hp -= d), and the match referee lives in sim.js, ticking at 30 Hz.

Who runs the NPC matters.

Player words read by others (a pet's name, a sign) go through text:check first.

Player words read by others

Crowds are one manager, not a script each. The doc's own example moves a whole wolf pack from one invisible object.

Crowds are one manager

Published games with living characters: @ayon/call-of-the-soil-a-bengal-village-adventure (villagers you talk to), @liiv/survive-ragnarok (hundreds of monsters), @izkimar/diablo-survivors (swarms), @fracture/building-66 (a horror stalker).

@ayon/call-of-the-soil-a-bengal-village-adventure

@liiv/survive-ragnarok

jev: the probability pipe in full: question types, sampling, memory.

platform-systems: llm:chat, llm:generate, text:check, crons, simulatedBy: "platform", SQL.

animations: the gait an NPC walks with.

bodies: whether NPCs block players or pass through.

projectiles: enemies that shoot.

debugging: reading a mind's logs with getLogs.

next: Making art, sound & models →

#### Block 1

````text
ctx.sleep()
````

#### Block 2

````text
query({ tags: ["wolf"] })
````

#### Block 3

````text
export const updateSchedule = { every: N | { seconds } }
````

#### Block 4

````text
feetPosition.x
````

#### Block 5

````text
.z
````

#### Block 6

````text
findPath(ctx, from, to, opts)
````

#### Block 7

````text
{ points, ok, partial }
````

#### Block 8

````text
emit("noise", { position, radius, kind }, { audience: { nearby: position, radius } })
````

#### Block 9

````text
ears.noise
````

#### Block 10

````text
{ ...position, at: ctx.now() }
````

#### Block 11

````text
ctx.job(jobId, args, callback)
````

#### Block 12

````text
r = { ok, data, error }
````

#### Block 13

````text
ctx.job("jev:decide", args, "decided")
````

#### Block 14

````text
run(job, args)
````

#### Block 15

````text
{ probability }
````

#### Block 16

````text
{ choice, probabilities }
````

#### Block 17

````text
criteria
````

#### Block 18

````text
["sour", "flat", "glad"]
````

#### Block 19

````text
{ at, act }
````

#### Block 20

````text
state.recent
````

#### Block 21

````text
ctx.job("llm:chat", { conversationId, system, message, media, maxHistory, model }, (r) => …)
````

#### Block 22

````text
r.data.text
````

#### Block 23

````text
conversationId
````

#### Block 24

````text
"npc:" + npcId + ":" + playerId
````

#### Block 25

````text
maxHistory
````

#### Block 26

````text
"fast"
````

#### Block 27

````text
"smart"
````

#### Block 28

````text
{ onPart }
````

#### Block 29

````text
media
````

#### Block 30

````text
state.loading
````

#### Block 31

````text
export function update(ctx) {
  const s = ctx.self.state;
  if (!ctx.place.players.length || ctx.now() < (s.nextAt ?? 0)) return;
  s.nextAt = ctx.now() + 4000 + ctx.random() * 2000;
  ctx.job("jev:decide", {
    state: { gold: s.gold, recent: s.recent ?? [] },
    questions: { act: { type: "choice", instructions: "What does this shopper do next?",
      criteria: { buy: "pays and takes it", browse: "looks at another item", leave: "walks off" } } },
  }, "decided");
}
export function decided(ctx, r) {
  if (!r.ok) return; // keep the last plan, ask next cycle
  const act = r.data.answers.act;
  let roll = ctx.random(), pick = act.choice;
  for (const [option, p] of Object.entries(act.probabilities)) if ((roll -= p) <= 0) { pick = option; break; }
  ctx.self.state.plan = pick;
}
````

#### Block 32

````text
ctx.job("llm:chat", {
  conversationId: "npc:" + ctx.self.id + ":" + player.id,
  system: "You are Mira, the ferry keeper. Short, dry, kind.",
  message: words,
  model: "fast",
}, (r) => { if (r.ok) ctx.self.state.reply = r.data.text; });
````

#### Block 33

````text
import { findPath } from "builtin/nav";
const path = findPath(ctx, ctx.self.feetPosition, goal);
if (path.partial) return; // ask next tick
ctx.self.state.route = path.points;
````

#### Block 34

````text
simulatedBy: "platform"
````

#### Block 35

````text
@ayon/call-of-the-soil-a-bengal-village-adventure
````

#### Block 36

````text
@liiv/survive-ragnarok
````


### After clicking "read → Making art, sound & models Where everything seen and heard comes from: scripted geometry, Blender models, painted pictures, seamless textures, uploads and named sounds."

- H4: Sound: the filename is the prompt
- H4: Textures and materials
- H4: Shapes: scripted geometry vs. models

In a Jayzee world, almost nothing has to be found or bought. Art, sound and models are made to order, by name, by Cleetus and her helper wisps, and land in the world as addresses that start with /cdn/ (or cdn/). Your toolbox:

cdn/

Sound by name. Any effect, ambience loop or music track conjured from its filename, in a shared style family.

Sound by name.

Voiced lines. A character speaks any line you write.

Voiced lines.

Painted pictures. Icons, portraits, posters, concept art, painted in seconds.

Painted pictures.

Cutouts. A picture's subject freed onto a transparent background.

Cutouts.

Seamless textures. Tiling materials for any surface, by name: cdn/texture-<what>.png.

Seamless textures.

Scripted geometry. Buildings, props, vehicles and creatures written as code that emits the mesh, textured and with their own colliders.

Blender on hand. Hero models, damage, bakes and renders built by helpers on a real Blender bench and exported as .glb.

Blender on hand.

Your own files. A model, sound or picture you upload becomes a /cdn/value.<sha>.<ext> address that any object can wear.

Your own files.

/cdn/value.<sha>.<ext>

Pictures players make. image:generate paints one picture per player per game from their own words, at run time.

Pictures players make.

The nine style families are the shared palette for sound and look: lowpoly-cozy, painterly-fantasy, toon-vibrant, voxel-bright, realistic-gritty, scifi-neon, gothic-horror, pixel-bright and pixel-moody. The Sounds page of this site lets you hear samples from each.

Sound: the filename is the prompt

Every word of a sound's name is rendered into the sound, so you name what a microphone would hear: cdn/sfx-sword-blade-thwack-into-straw-stuffed-burlap-dummy.mp3. A name ending -loop loops (the bake levels its seam). A track is cdn/music-<mood, genre, instrument words>-loop.mp3. A voice line is spoken by a speaker and played on the Voice bus. Words like low, warm, soft, muted or hum act as a band that removes everything above them, which can make a sound silent on a phone speaker, so use them carefully. A name, once made, keeps its first sound forever: a changed sound needs a new filename (-2, -v3).

cdn/music-<mood, genre, instrument words>-loop.mp3

Textures and materials

A seamless texture is cdn/texture-<subject>.png, made by its name. On an object it goes in material.texture, with color as a tint and repeat / wrap for tiling. Inside scripted geometry, ctx.albedo("cdn/texture-limewash-plaster.png") paints every face that follows until ctx.albedo(null). Terrain takes cdn/texture-terrain-<what>.png per material. A picture drawn at run time is a tex script, scripts/tex-<name>.js?<params>, which 2D worlds use for every sprite and tile.

cdn/texture-<subject>.png

material.texture

ctx.albedo(null)

cdn/texture-terrain-<what>.png

tex

scripts/tex-<name>.js?<params>

Shapes: scripted geometry vs. models

Scripted geometry (primitive: { kind: "scripted", script }) is the default for anything built: the script exports geometry(ctx) and its own collider(). Every creature or character Cleetus builds herself is one, with a skeleton() when it moves. This site's Animation Hall floor (scripts/hall-floor.js) and plinths (scripts/hall-plinths.js) are scripted geometry.

A Blender model is for a hero piece or an organic form: a script builds it, renders a proof to look at, exports a .glb, and jayzee upload puts it in the world. The docs' triangle budget: most things a game shows are under 20k triangles each; a finished game plays about half a million in frame; a heavy scene one to two million.

A Blender model

jayzee upload

An uploaded model arrives with a spec sheet message: its true height, footprint, clips and bones. Its material slots, named for their surfaces in Blender, each take their own texture. A creator's own picture can be cooked into a mesh (model: "cdn/value.<sha>.png.glb"); ?static cooks an unrigged statue in the picture's pose. A humanoid comes rigged with Idle, Walk, Run, Sprint and Jump; a rig the platform knows (Mixamo, Jayzee's, Meshy, UE mannequin, Auto-Rig Pro, Unity humanoid) plays every library clip.

An uploaded model

model: "cdn/value.<sha>.png.glb"

?static

A conjured texture on a box, tiled:

ctx.spawn({ primitive: { kind: "box", width: 4, height: 0.2, depth: 4 }, material: { texture: "cdn/texture-limewash-plaster.png", color: "oklch(0.9 0.02 80)", repeat: [4, 4] }, feetPosition: { x: 0, z: 0, y: { terrain: 0 } }, });

An uploaded fountain, each material slot dressed, a lantern in its socket:

jayzee({ id: "fountain", feetPosition: { x: 12, z: -4 }, physics: "static", layout: { box: { min: { y: 0 }, max: { y: 2.6 } } }, model: { id: "cdn/fountain.glb", materials: { marble: { texture: "cdn/texture-marble-white-veined.png", roughness: 0.3 }, brass: { texture: "cdn/texture-brass-brushed.png", metalness: 1, roughness: 0.4 } } }, children: [{ id: "fountain-lamp", attachment: { socket: "lamp_top" }, model: "cdn/lantern.glb" }] });

Two named tracks crossfaded on the jukebox, from the audio skill:

const TRACKS = { day: "cdn/music-calm-fingerpicked-guitar-meadow-loop.mp3", fight: "cdn/music-driving-taiko-drums-guitar-riff-loop.mp3" }; ctx.music.play(TRACKS.fight, { fade: 2 });

A player paints their own banner at run time:

ctx.job("image:generate", { prompt: words, width: 1024, height: 1024 }, (r) => { if (r.ok) player.state.banner = r.data.url; // keep it: the next ask answers paint_spent });

Pick a family early. One style family for sound and look keeps a game coherent; this world's own look file (scripts/lib/data/aesthetic.yml) is "blue ice" until you name a theme.

Pick a family early.

Each new name is a purchase. A fresh filename is made once against the game's budget, one per kind. Ten coloured gems are one gem model and a tint, not ten models; a label is text on a sign, not a new picture.

Each new name is a purchase.

Names are forever. Change a sound by adding a version to its name.

Names are forever.

Built beats boxes. A grey box is a sketch; a finished thing is scripted geometry with textured faces, cut trims and placed lights, or a Blender model with named slots.

Built beats boxes.

Mind the triangles. Keep ordinary props under 20k each so a full scene stays near half a million in frame, which is what keeps phones at 60 fps.

Mind the triangles.

Players' pictures are limited. image:generate paints one picture per player per game; store the url in player.state.

Players' pictures are limited.

Video comes from video:generate (5 to 15 seconds, taking minutes, so ask it from a cron), and an .mp4 plays as any screen's texture.

2D worlds draw in code. Sprites, tiles and backdrops are tex scripts unless you hand over finished art.

2D worlds draw in code.

Games showing what made-to-order art can look like: @lakaplay/cartoon-horror (a toon horror look), @metalhorse233/dragon-racing (creatures), @fracture/building-66 (gritty interiors).

geometry: scripted shapes, ctx.albedo, colliders, skeletons.

ctx.albedo

blender-game-assets and workshop: the Blender bench and its budgets.

uploaded-models: dressing a model you bring: slots, sockets, size, clips.

audio: naming sounds and tracks, buses, the jukebox.

trees and leaf-sprays: foliage.

2d-mode: art drawn in code.

video: generated and placed clips.

next: Publishing, players & social →

#### Block 1

````text
cdn/
````

#### Block 2

````text
/cdn/value.<sha>.<ext>
````

#### Block 3

````text
cdn/music-<mood, genre, instrument words>-loop.mp3
````

#### Block 4

````text
cdn/texture-<subject>.png
````

#### Block 5

````text
material.texture
````

#### Block 6

````text
ctx.albedo(null)
````

#### Block 7

````text
cdn/texture-terrain-<what>.png
````

#### Block 8

````text
tex
````

#### Block 9

````text
scripts/tex-<name>.js?<params>
````

#### Block 10

````text
spawn upload
````

#### Block 11

````text
model: "cdn/value.<sha>.png.glb"
````

#### Block 12

````text
?static
````

#### Block 13

````text
ctx.spawn({
  primitive: { kind: "box", width: 4, height: 0.2, depth: 4 },
  material: { texture: "cdn/texture-limewash-plaster.png", color: "oklch(0.9 0.02 80)", repeat: [4, 4] },
  feetPosition: { x: 0, z: 0, y: { terrain: 0 } },
});
````

#### Block 14

````text
spawn({ id: "fountain", feetPosition: { x: 12, z: -4 }, physics: "static",
  layout: { box: { min: { y: 0 }, max: { y: 2.6 } } },
  model: { id: "cdn/fountain.glb", materials: {
    marble: { texture: "cdn/texture-marble-white-veined.png", roughness: 0.3 },
    brass: { texture: "cdn/texture-brass-brushed.png", metalness: 1, roughness: 0.4 } } },
  children: [{ id: "fountain-lamp", attachment: { socket: "lamp_top" }, model: "cdn/lantern.glb" }] });
````

#### Block 15

````text
const TRACKS = { day: "cdn/music-calm-fingerpicked-guitar-meadow-loop.mp3",
                 fight: "cdn/music-driving-taiko-drums-guitar-riff-loop.mp3" };
ctx.music.play(TRACKS.fight, { fade: 2 });
````

#### Block 16

````text
ctx.job("image:generate", { prompt: words, width: 1024, height: 1024 }, (r) => {
  if (r.ok) player.state.banner = r.data.url; // keep it: the next ask answers paint_spent
});
````

#### Block 17

````text
ctx.albedo
````


### After clicking "read → Publishing, players & social Posting a game, rooms and matchmaking, singleplayer vs multiplayer, saves, parties, guilds and what Jayzee handles for every player."

- H4: Who players are
- H4: Saving

Jayzee is a place where people play, not only build, and much of what a multiplayer game usually needs comes with the platform instead of the game:

Publishing with covers. Saying "publish it" prints four cover pictures to pick from; the pick publishes the game with that box art, and a publish films a new player's arrival as its trailer unless you set one.

Publishing with covers.

Updates with notes. A live game gets updates with a name and notes players read, and its box stays.

Updates with notes.

One room everyone shares. Multiplayer is the default (engine.networking.mode: "multiplayer"): friends arrive by a link, an invite, a portal or a party walking through together. Singleplayer is a choice you make.

One room everyone shares.

engine.networking.mode: "multiplayer"

Chat and voice. Jayzee draws the chat (say, whispers, party, guild, messages) and runs voice chat, spatial within earshot. Your game can add its own channels as rules.

Chat and voice.

Parties and guilds. A party is a ready-made team (player.party); guilds are Jayzee's (player.guild).

Parties and guilds.

player.guild

Saves that follow the player. player.state is each player's own save for the world, the same in every room.

Saves that follow the player.

A database. ctx.sql for things that span rooms: leaderboards, shops, ledgers.

A database.

Achievements and leaderboards that show on Jayzee's game page.

Achievements and leaderboards

Notifications. ctx.notifyDm rings a player's Jayzee bell and phone for the moments worth coming back for.

Mods. A character or piece made for other people's worlds is published as a mod.

For an unreleased world, the steps are: check the scripts, write the achievements (a world.config.yaml achievements key, each a trophy), run jayzee publish propose_covers, and while four covers print, finish its controls for a gamepad and a phone. The creator's pick publishes. A live world gets jayzee publish publish_update with the name and notes players read. A game made for computers only can say so with jayzee publish declare_platforms. Unpublishing takes the box off the shelf; the play link still plays the last publish. Players get no file export, only what the game gives them: a prize, a save, the play link.

achievements

jayzee publish propose_covers

jayzee publish publish_update

jayzee publish declare_platforms

A room is a whole game of its own. The door picks it: main is the one room nearly every game needs, and it holds nearly unlimited players. When a match has a size, routing.maxPlayers is the whole matchmaker: the door fills rooms of that size and opens the next. A routing.script with pickRoom(ctx) is for a rule the door can't guess (a region, a mode). Each room has its own world.state, clock and random seed; routing.persistence is "persistent" (the default), "session" or "ephemeral". A place can be copied per group or per player with instance: party or instance: solo, for an arena or a private dungeon.

routing.maxPlayers

routing.script

routing.persistence

So a game builds no lobby, no room code, no match list or queue, and no invite link: its Invite and Share buttons open Jayzee's, ctx.emit("openInvite", {}) and ctx.emit("openShare", {}). What the game owns is the match inside its room: sides, rounds, a ready-up and countdown, the referee in sim.js, spectating, and a scoreboard.

no lobby, no room code, no match list or queue, and no invite link

ctx.emit("openInvite", {})

ctx.emit("openShare", {})

Who players are

A player row carries displayName, userId (durable, starting pa_), portraitUrl, party, guild and their pets in wisps. A player is a guest until they sign in, and in a game a person is always their Jayzee self, shown and found by Jayzee name and face. A game never adds its own accounts, passwords or player codes.

Saving

player.state: the player's own save, one per world, mode and save slot; it travels through portals.

world.state: this room's, shared by every place in it.

ctx.sql: one database per world and mode, spanning rooms; run at events (arrive, leave, a press, a cron), never per tick. platformState: ["gold", "inventory"] on the player template makes those keys cheat-proof, written by no player's machine.

Dev and live are two databases: the schema carries over, rows don't.

chat: scripts/chat.js in world.config.yaml names a file whose scopes are your game's channels: in says who sees the channel, post who may write, slow the seconds between lines, voice: true makes it a voice room too. A game hears a line as onSay(ctx, line) and speaks with ctx.emit("say", { text, scope }). Words players write that others read go through text:check first.

chat: scripts/chat.js

scopes

voice: true

onSay(ctx, line)

ctx.emit("say", { text, scope })

A trade channel only level 10 players may post in, and a nametag that shows a character name:

// scripts/chat.js export const scopes = { trade: { in: (ctx, p) => true, post: (ctx, p) => p.state.level >= 10, slow: 10, waits: true }, zone: { in: (ctx, p) => p.state.zone === ctx.self.state.zone }, }; export const character = "name"; export const profile = ["level", "class"];

Rooms of 20, the whole matchmaker:

# world.config.yaml routing: maxPlayers: 20

A private arena copy per party, gone when the last player leaves:

A cheat-safe purchase in SQL, the money checked in the same statement:

const r = await ctx.sql`UPDATE wallets SET coins = coins - ${price} WHERE player = @caller AND coins >= ${price} AND ${price} > 0`; if (r.changes) { /* paid: hand over the item */ }

The room is never empty by design. Everyone who opens your link lands together in main unless you route them; that is what makes shared games like @longthunder/cubemunity feel alive.

The room is never empty by design.

Numbers to know. ctx.place.players and ctx.world.players list up to 64 players at once (no cap on a place itself). The world's sim.js ticks at 30 Hz on one machine per room: a lone player's own window, or Jayzee's server once two share it.

Numbers to know.

Don't rebuild the platform. No custom lobby, rebind menu, volume slider, chat box or login. Use Jayzee's invite, share, chat, voice and settings, and spend your time on the game.

Don't rebuild the platform.

A title or menu before play costs players. A click before the world shows makes the room read empty; a match starts on ready or countdown with the world in view.

A title or menu before play costs players.

Saves are decided per key. Progress in player.state, the room's run in world.state, anything across rooms (high scores, an economy) in ctx.sql.

Saves are decided per key.

Notifications are rationed. A world sends a player at most 5 a UTC day, held through their night, and players can mute it.

Notifications are rationed.

Leaderboards come cheap. A player's best in player.state, named under leaderboards in world.config.yaml, shows on Jayzee's game page; see @hips/hypertrackmania-x-time-trial-racing and @chucky/higher.

Leaderboards come cheap.

Moderation is Jayzee's, plus whatever your game adds by userId (a report button, a log, a ban).

Moderation is Jayzee's,

publish: covers, updates, platforms, unpublishing.

rooms-and-matchmaking: rooms, maxPlayers, pickRoom, instances, persistence.

social: chat scopes, nametags, parties, guilds, mail.

platform-systems: SQL, cheat-proof state, crons, notifications, platform-run rows.

portals: doors between worlds and places.

mods: publishing pieces for other worlds.

next: Performance & scale →

#### Block 1

````text
engine.networking.mode: "multiplayer"
````

#### Block 2

````text
player.guild
````

#### Block 3

````text
achievements
````

#### Block 4

````text
spawn publish propose_covers
````

#### Block 5

````text
spawn publish publish_update
````

#### Block 6

````text
spawn publish declare_platforms
````

#### Block 7

````text
routing.maxPlayers
````

#### Block 8

````text
routing.script
````

#### Block 9

````text
routing.persistence
````

#### Block 10

````text
ctx.emit("openInvite", {})
````

#### Block 11

````text
ctx.emit("openShare", {})
````

#### Block 12

````text
chat: scripts/chat.js
````

#### Block 13

````text
scopes
````

#### Block 14

````text
voice: true
````

#### Block 15

````text
onSay(ctx, line)
````

#### Block 16

````text
ctx.emit("say", { text, scope })
````

#### Block 17

````text
// scripts/chat.js
export const scopes = {
  trade: { in: (ctx, p) => true, post: (ctx, p) => p.state.level >= 10, slow: 10, waits: true },
  zone: { in: (ctx, p) => p.state.zone === ctx.self.state.zone },
};
export const character = "name";
export const profile = ["level", "class"];
````

#### Block 18

````text
# world.config.yaml
routing:
  maxPlayers: 20
````

#### Block 19

````text
const r = await ctx.sql`UPDATE wallets SET coins = coins - ${price} WHERE player = @caller AND coins >= ${price} AND ${price} > 0`;
if (r.changes) { /* paid: hand over the item */ }
````


### After clicking "read → Performance & scale Holding 60fps on phones: what the engine does for you, where your scripts cost, the 500 m simulation radius, and how to measure."

- H4: Where the work runs
- H4: What travels over the network
- H4: Counting players
- H4: What the picture costs

A Jayzee game is meant to play smoothly on ordinary computers and phones, and the engine does much of the work itself:

Automatic detail. The engine culls what's off screen, batches similar things, sleeps idle objects, and picks detail by distance (ctx.lod, visibleRange).

Automatic detail.

Self-governing frames. When a screen falls behind, the engine sheds work on that device: it can draw the world at a smaller renderScale and lower the picture, and it says so on that screen's frame line.

Self-governing frames.

A simulation that runs only near people. Scripts, physics and timers run within about 500 m of a player; farther things hold and pick up again when someone comes close.

A simulation that runs only near people.

Quality tiers per viewer. Each machine has a ctx.quality of "low", "medium", "high" or "ultra", and effects and looks step down by it.

Quality tiers per viewer.

Measuring tools. jayzee perf prints a table of where time goes, and ctx.view gives live numbers from each screen: fps, drawCalls, triangles, cpuMs, gpuMs, scriptMs, physicsMs, fxMs, memory and network bytes.

Measuring tools.

jayzee perf

What's left to you is what you build: how many triangles, how much script work each tick, how many state writes travel over the network.

Where the work runs

Behaviors run update(ctx, dt) every tick on the machine that simulates their object. export const updateSchedule = { every: N | { seconds } } runs one less often, and ctx.sleep() parks it until it moves, changes, or a hook runs.

The referee (sim.js, places/<p>/sim.js) ticks at 30 Hz on one machine per room: a lone player's own window, or Jayzee's server once two share it. export const cadence = "1s" slows it.

The referee

Jobs (jobs/<id>.js) run off the game loop entirely, for heavy or slow work.

Objects default to audience: "near": frozen past about 400 m on phones. "all" keeps one live everywhere, which costs more.

audience: "near"

400 m

Rows with simulatedBy: "platform" run on Jayzee's machine even with nobody near.

Rows with simulatedBy: "platform"

What travels over the network

Every write to player.state, world.state or an entity's state goes to other machines. The docs' rule: a whole record goes on change or at a few Hz, never per tick. Something worked out each tick (an eased number, a time since a stamp) stays in a local variable or ctx.self.session. ctx.view.netInBytes / netOutBytes show each machine's traffic per second.

never per tick

ctx.view.netInBytes

Counting players

ctx.place.players and ctx.world.players list up to 64 players at once; a place itself has no cap. Past 64 players, ctx.changed rows can arrive late but never get lost. A room holds nearly unlimited players, and routing.maxPlayers splits them into rooms of a set size when a match needs it.

What the picture costs

The anchors the docs give for triangles: most things a game shows are under 20k each, a finished game plays about half a million in frame, and a heavy scene one to two million. ctx.view.triangles and drawCalls (shadow maps included) read one screen's last frame. Thin parts (straw, rails) narrower than a pixel at distance draw as crawling dots; the cure is fewer, wider parts hidden past a few metres. A heightmap's heightAt runs about 17k times per 80 m chunk, so any loop inside it is the world's cost.

under 20k

half a million

one to two million

ctx.view.triangles

17k times per 80 m chunk

A manager stepping a whole pack in one script, instead of one script per wolf:

export function update(ctx, dt) { const players = ctx.place.players; // one census read a tick for the pack for (const w of ctx.query({ tags: ["wolf"] })) { // pick prey from players, then one velocity write per wolf w.velocity = { x: 0, y: w.velocity.y + ctx.place.gravity.y * dt, z: 0 }; } }

A slow referee and a mind that thinks a few times a second:

// sim.js export const cadence = "250ms"; // scripts/turret.js export const updateSchedule = { every: { seconds: 0.25 } };

Effects that scale per viewer, from the fx grammar (a ? branch picks a count by quality or device):

fx pop dust rate=?mobile:10|18 on=disc(.3) life=.6..1 v=up(.8..1.5) size=.2..0.35

Warming art before a moment the game sees coming, so it doesn't pop in:

ctx.emit("preload", { refs: ["cdn/boss.glb"] });

Reading one screen's live numbers:

const v = ctx.view; ctx.log(v.fps, v.drawCalls, v.triangles, v.scriptMs, v.physicsMs);

Performance outranks features. A world is meant to hold its frame on phones; the cheaper version of an effect that keeps the game smooth beats the beautiful one that stutters.

Performance outranks features.

Crowds are one manager. The docs' pattern for dozens of NPCs and up is a single update() stepping every row. In jayzee perf, a row like enemy.js update 6.3 ×47 means 47 bodies each paying for their own look: a query, a raycast or a findPath every tick. Look a few times a second, or do one pass in sim.js that writes each body's state.target, and keep only the walking per tick.

Crowds are one manager.

enemy.js update 6.3 ×47

state.target

Don't loop over every player per candidate. Ask query({ center, radius }) instead.

Don't loop over every player per candidate.

query({ center, radius })

State writes are network traffic. Write on change, never per tick; a score bumped every frame is a firehose.

State writes are network traffic.

Big worlds are fine. Because only the area within about 500 m of someone ticks, a large map costs mostly what's near players. A march that must continue unseen is an animate on the room's clock, not a ticking script.

Big worlds are fine.

No graphics menu, no device checks. The engine and ctx.quality handle devices; a game never adds its own quality toggle. A creator who wants to see the high tier sets it in their own Settings.

No graphics menu, no device checks.

No loading screens. Jayzee covers the join; a game doesn't add a bar or a splash that hides loading. Pop-in at a known moment is warmed with preload.

No loading screens.

Speed complaints start with a measurement. jayzee perf (with --script, --frame, --room live) names the heaviest script, frame pass or model; the top row is the place to fix.

Speed complaints start with a measurement.

--script

--frame

--room live

Script errors don't stop the game. A hook that throws keeps running and is counted in behaviorHealth.broken; only an endless loop marks a hook inert.

Script errors don't stop the game.

behaviorHealth.broken

Games that run big: @liiv/survive-ragnarok (hundreds of monsters), @izkimar/diablo-survivors (swarms), @rexgaming_yt/sky-ring-arena-multiplayer (a shared arena).

debugging: jayzee perf, logs, behavior health, pixel provenance.

fx: particle and light budgets, quality branches.

looks: whole-screen passes and their cost.

geometry and blender-game-assets: triangle budgets.

heightmap-terrain: generator cost.

rooms-and-matchmaking: room sizes.

platform-systems: jobs, crons, platform-run rows.

#### Block 1

````text
spawn perf
````

#### Block 2

````text
audience: "near"
````

#### Block 3

````text
ctx.view.netInBytes
````

#### Block 4

````text
ctx.view.triangles
````

#### Block 5

````text
export function update(ctx, dt) {
  const players = ctx.place.players; // one census read a tick for the pack
  for (const w of ctx.query({ tags: ["wolf"] })) {
    // pick prey from players, then one velocity write per wolf
    w.velocity = { x: 0, y: w.velocity.y + ctx.place.gravity.y * dt, z: 0 };
  }
}
````

#### Block 6

````text
// sim.js
export const cadence = "250ms";

// scripts/turret.js
export const updateSchedule = { every: { seconds: 0.25 } };
````

#### Block 7

````text
fx
pop dust rate=?mobile:10|18 on=disc(.3) life=.6..1 v=up(.8..1.5) size=.2..0.35
````

#### Block 8

````text
ctx.emit("preload", { refs: ["cdn/boss.glb"] });
````

#### Block 9

````text
const v = ctx.view;
ctx.log(v.fps, v.drawCalls, v.triangles, v.scriptMs, v.physicsMs);
````

#### Block 10

````text
enemy.js update 6.3 ×47
````

#### Block 11

````text
state.target
````

#### Block 12

````text
query({ center, radius })
````

#### Block 13

````text
--script
````

#### Block 14

````text
--frame
````

#### Block 15

````text
--room live
````

#### Block 16

````text
behaviorHealth.broken
````


## Not captured

Controls clicked: 48 of 48 planned controls in this section, out of 0 candidates found after the load and the scroll.
Controls not clicked by policy: 4. Their labels name an action that changes state or sends something, so they were left alone: "read → State, saves & SQL Where a game remembers things: the player's own save, room and object state, scratch space, and a world-wide SQL database for all-time boards."; "Where a game remembers things: the player's own save, room and object state, scratch space, and a world-wide SQL database for all-time boards."; "read → HUD & screens How the screen over the game works: ui.js returns HTML each time state moves, buttons send actions, and panels can hang on objects in the world."; "How the screen over the game works: ui.js returns HTML each time state moves, buttons send actions, and panels can hang on objects in the world.".
Controls that could not be found again after a retry: 0. Errors: 0.

Clicks made: 48. Clicks that brought up content not in the swept state: 48. The rest brought up nothing new.


## Sources

- `wiki-tools/recapture/states/toolbox/06-initial.json`
- `wiki-tools/recapture/states/toolbox/06-swept.json`
- `wiki-tools/recapture/states/toolbox/06-c001.json`
- `wiki-tools/recapture/states/toolbox/06-c002.json`
- `wiki-tools/recapture/states/toolbox/06-c003.json`
- `wiki-tools/recapture/states/toolbox/06-c004.json`
- `wiki-tools/recapture/states/toolbox/06-c005.json`
- `wiki-tools/recapture/states/toolbox/06-c006.json`
- `wiki-tools/recapture/states/toolbox/06-c007.json`
- `wiki-tools/recapture/states/toolbox/06-c008.json`
- `wiki-tools/recapture/states/toolbox/06-c009.json`
- `wiki-tools/recapture/states/toolbox/06-c010.json`
- `wiki-tools/recapture/states/toolbox/06-c011.json`
- `wiki-tools/recapture/states/toolbox/06-c012.json`
- `wiki-tools/recapture/states/toolbox/06-c013.json`
- `wiki-tools/recapture/states/toolbox/06-c014.json`
- `wiki-tools/recapture/states/toolbox/06-c015.json`
- `wiki-tools/recapture/states/toolbox/06-c016.json`
- `wiki-tools/recapture/states/toolbox/06-c017.json`
- `wiki-tools/recapture/states/toolbox/06-c018.json`
- `wiki-tools/recapture/states/toolbox/06-c019.json`
- `wiki-tools/recapture/states/toolbox/06-c020.json`
- `wiki-tools/recapture/states/toolbox/06-c021.json`
- `wiki-tools/recapture/states/toolbox/06-c022.json`
- `wiki-tools/recapture/states/toolbox/06-c023.json`
- `wiki-tools/recapture/states/toolbox/06-c024.json`
- `wiki-tools/recapture/states/toolbox/06-c025.json`
- `wiki-tools/recapture/states/toolbox/06-c026.json`
- `wiki-tools/recapture/states/toolbox/06-c027.json`
- `wiki-tools/recapture/states/toolbox/06-c028.json`
- `wiki-tools/recapture/states/toolbox/06-c029.json`
- `wiki-tools/recapture/states/toolbox/06-c030.json`
- `wiki-tools/recapture/states/toolbox/06-c031.json`
- `wiki-tools/recapture/states/toolbox/06-c032.json`
- `wiki-tools/recapture/states/toolbox/06-c033.json`
- `wiki-tools/recapture/states/toolbox/06-c034.json`
- `wiki-tools/recapture/states/toolbox/06-c035.json`
- `wiki-tools/recapture/states/toolbox/06-c036.json`
- `wiki-tools/recapture/states/toolbox/06-c037.json`
- `wiki-tools/recapture/states/toolbox/06-c038.json`
- `wiki-tools/recapture/states/toolbox/06-c039.json`
- `wiki-tools/recapture/states/toolbox/06-c040.json`
- `wiki-tools/recapture/states/toolbox/06-c041.json`
- `wiki-tools/recapture/states/toolbox/06-c042.json`
- `wiki-tools/recapture/states/toolbox/06-c043.json`
- `wiki-tools/recapture/states/toolbox/06-c044.json`
- `wiki-tools/recapture/states/toolbox/06-c045.json`
- `wiki-tools/recapture/states/toolbox/06-c046.json`
- `wiki-tools/recapture/states/toolbox/06-c047.json`
- `wiki-tools/recapture/states/toolbox/06-c048.json`
- `wiki-tools/recapture/states/toolbox/summary-06.json`
