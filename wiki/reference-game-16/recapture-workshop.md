# Game page section: Workshop: text not in the capture

The Workshop section of the toolbox, read on load, after a scroll, and after a click on each control that does not change state. Only text, headings, links, images and code that the first capture does not hold are listed.

## Items not in the capture

| Item | Count |
| --- | --- |
| Headings | 9 |
| Visible text blocks | 697 |
| Hidden text blocks | 0 |
| Links | 0 |
| Images | 0 |
| Code or data blocks | 87 |

## Present on load, not in the capture

None found on load.

## Loaded after a scroll, not in the capture

None found after the scroll.

## Loaded after a click, not in the capture

### After clicking "read → The workshop at a glance The making bench behind every build: Blender models, painted pictures, sound and voices, uploaded models, video, playtests and helper wisps, and when each is reached for."

- H3: What it makes
- H3: How a request becomes a result
- H3: What it looks like in a game
- H3: The commands
- H3: Limits and good habits
- H3: Related skills

← the workshop

What it makes

Every game on Jayzee is made of things a player sees, hears and touches: a lantern on a post, a shop icon, the thud of a door, a song that swells at the boss gate, a knight that walks and swings. The workshop is the bench where those things are made. You never have to open it yourself: you describe what you want in chat, and Cleetus (or a wisp, one of her helpers) reaches for the right tool, makes the piece, checks it with an eye, and stands it in your world.

The bench holds a handful of tools, each for a different kind of thing:

Blender builds hero models: a shrine, a ship, a statue, a creature or a character that needs real sculpted shape and its own rig. Each model is one script that can be re-run and edited, so a change is a small edit, not a rebuild from scratch.

Painted pictures come from jayzee paint: icons, posters, portraits, mock screens, wall paintings, and seamless textures for floors and walls.

jayzee paint

Sound, music and voices are named into being. The filename is the prompt: a footstep on wet gravel, a calm guitar loop, a gruff soldier saying a line.

Sound, music and voices

Uploaded models are .glb files you hand over (or ones a wisp exports). They arrive with a spec sheet, then get dressed: textures on each named surface, a lantern in a hand, a cape that moves with the body.

Video makes short scenes from words or a still: a cutscene, a trailer cut from real play, a looping backdrop, a portrait that speaks one line.

Playtests put a real body in your game: Cleetus's own body can join as a player, and Jev can drive the keys while she watches, so a jump that is too tight gets found before your players find it.

Wisps and weaves split a big build into lanes that run at once, each wisp with its own copy of the world.

Wisps and weaves

Files and versions: every save is a commit in your world's history, and one undo reverts one.

Files and versions

How a request becomes a result

You say what you want, in your own words: "a mossy stone well in the village square", "a coin pickup sound", "an icon for the fire spell".

You say what you want

Cleetus picks the tool. A box-like prop or a building a player walks into is usually built as scripted geometry right in the world. An organic or hero shape, a creature, a carved statue, goes to Blender. A flat picture goes to paint. A sound is named. A clip of motion comes from the animation library.

Cleetus picks the tool.

The piece is made and proofed. A model renders a proof picture from several sides before it is exported; a picture is looked at; a sound is placed and heard in context.

The piece is made and proofed.

It is uploaded. Only jayzee upload puts a made file into the world; it prints the asset's address.

It is uploaded.

jayzee upload

It stands in the game, finished. The bar the workshop holds itself to: a delivery arrives finished, never a grey model or a web address in chat. A model stands in the world with its material slots wearing textures; a sprite sheet is cut, tiled and on a sprite; a sound plays from the thing that makes it.

It stands in the game, finished.

One more look, one more fix. What the look shows gets fixed in one more pass. A building a body walks into earns a second round; a small prop does not.

One more look, one more fix.

What it looks like in a game

A cozy farm game: a Blender-built windmill with a sagging sail, textured wood on its planks slot; painted crop icons in the inventory; a soft wind ambience under a fingerpicked guitar track; a farmer who says "Morning! Seeds are on the cart."

planks

A dungeon crawler: a knight model you uploaded, dressed with a cape and a torch in its right fist; a hit sound placed at the exact point of each strike; a short painted poster for each boss.

A racing game: a trailer cut from several shots of real play, each close where the move lands; a crowd roar that sounds as a kart passes.

The commands

These are the bench's verbs. You never need to type them, but seeing them helps you know what to ask for.

jayzee upload <file> [--name <display>] [--full-size] jayzee paint "<what>" --size 1024x1024 jayzee voice "<line with [sighs] tags>" --voice <name> jayzee video "<what happens>" jayzee clip import <file> --name "<words>" [--loop] jayzee see <file…> jayzee ls --assets

A playtest in its own room, so a race it starts is not yours:

spawn client join --tester 1 --room test jayzee jev start "<goal>" jayzee jev stop

Limits and good habits

Name the thing, not the tool. "A cracked marble statue missing a chunk of shoulder" is a better ask than "make a Blender model". The details you name are what ends up in the piece.

Name the thing, not the tool.

Reuse before remaking. Every upload of your world is listed in its assets (ctx.world.assets, or jayzee ls --assets), so an earlier lantern is found by name and placed again, never rebuilt or uploaded twice.

Reuse before remaking.

jayzee ls --assets

A sound's name is permanent. Once a sound name has been made, it keeps its first sound. A changed sound wants a new filename.

A sound's name is permanent.

Perf comes first. The bench budgets triangles: most things a game shows are under 20k each, a finished game plays about half a million in frame, a heavy scene one to two million.

Perf comes first.

Big builds go wide. A large ask splits into wisps working at the same time; ask for the lanes you want if you have a picture of how the work divides.

Big builds go wide.

Play it, not just look at it. A playtest finds what a picture hides: a door too narrow, a jump too long.

Play it, not just look at it.

Volume is Jayzee's. Players set their own volume in Jayzee's settings; a game carries one mute at most, and the mix itself is made in the game's gains.

Volume is Jayzee's.

Related skills

workshop, blender-game-assets, uploaded-models, animations, audio, video, game-ui, weaves, debugging, publish, geometry

next: Blender: hero models →

#### Block 1

````text
spawn paint
````

#### Block 2

````text
spawn upload
````

#### Block 3

````text
planks
````

#### Block 4

````text
spawn upload <file> [--name <display>] [--full-size]
spawn paint "<what>" --size 1024x1024
spawn voice "<line with [sighs] tags>" --voice <name>
spawn video "<what happens>"
spawn clip import <file> --name "<words>" [--loop]
spawn see <file…>
spawn ls --assets
````

#### Block 5

````text
spawn client join --tester 1 --room test
spawn jev start "<goal>"
spawn jev stop
````

#### Block 6

````text
spawn ls --assets
````


### After clicking "read → Blender: hero models Blender builds the pieces that need real shape: a statue with centuries eaten off its rim, a sagging rope bridge, a creature or a rigged character, each from one re-runnable script."

Blender is the bench's sculptor. It makes the pieces that a simple box or a few shapes cannot: organic forms, carved and weathered surfaces, and characters that move on their own skeleton. The bar is that a Blender prop reads as made from the player's feet:

a crate with bitten edges and a web of cracks across one plank,

a statue missing a chunk of shoulder, with centuries eaten off its rim,

a bridge whose cables sag between the posts,

a shrine roof sitting on its walls with no daylight showing at the gable.

It also makes characters: one skin that reads as its art style's character, never a pile of parts. A face and hands with anatomy, armour seated on the shoulders it was fitted to, cloth hanging between the legs, a weapon gripped in the hand, all moving on the character's own rig. A realistic human body starts from a body generator with dials for age, weight, muscle and height; a toon person takes its art style's own road instead.

Most of a world's buildings and simple props are built straight in the world as scripted geometry. Blender is reached for when the piece is a hero, an organic shape, or something with damage and wear that has to be real geometry.

Plan the whole piece first. Its parts and sizes, and its material slots named for the surface each will wear in the game: marble, brass, planks.

Plan the whole piece first.

marble

brass

One script builds it. A model is its script, art/<model>/build.py in your world's files. It runs from source through every edit to the export, whole. A later change edits that same script and re-runs it, never a new script layered over the last export. This is why a Blender model can always be changed: the recipe is kept.

One script builds it.

art/<model>/build.py

Damage and detail are real geometry. Cracks, holes, chipped chunks, worn edges, ropes along an edge and cables that sag are applied as tools on the mesh, so they cast real shadows.

Damage and detail are real geometry.

A proof render. The script renders proof pictures: a three-quarter view, the back and the top, each lit from its own camera's side so a hole in the back cannot hide in shadow. Three 656-pixel views sit side by side in one picture that gets looked at.

A proof render.

Look, fix, re-run. What the proof shows gets fixed in the script, and the script runs again.

Look, fix, re-run.

Export and upload. The model exports as a .glb and jayzee upload puts it in the world.

Export and upload.

Placed and dressed. It stands in your world with a texture on every named slot. A prop is done once placed, not when its still is perfect. A building a body walks into gets a second look-and-fix round once placed.

Placed and dressed.

For a character the order adds steps: a contract first (its height, which way it faces, its triangle budget), the body measured, armour and cloth fitted as their own pieces, a skeleton with standard bone names, the weights proven at an extreme pose (knee bent, arm raised) before any texture, then each clip keyed: Idle, Walk, Run, Attack, Hit, Death. When several characters share a family, one hero is made and approved first, and the others share its pipeline, never one body scaled and recoloured.

A ruined temple in an adventure game: columns with chipped capitals, a fallen lintel cracked through, moss on the low stones. Each column wears a stone texture on its stone slot and the cracks catch the sun.

A ruined temple in an adventure game:

stone

A pirate ship: hull planks, ropes running down from the mast along real edge paths, a sail with slack in it. The ship is the hero piece the player stands beside, so it earns more triangles and its edges read from a metre.

A pirate ship:

A boss creature: an animal mesh rigged by automatic weights, with every clip keyed, idle included, so it never stands like a statue.

A boss creature:

A breakable wall: exported twice, whole and shattered into pieces, so the game swaps one for the other at the blow.

A breakable wall:

The proof loop renders and shows the picture in one go:

blender -b --factory-startup --python-exit-code 1 --python art/<model>/build.py && jayzee see <model>/proof.png

Inside the script, the render and the export:

scene.render.engine = "CYCLES" bpy.ops.export_scene.gltf(filepath=..., export_apply=True)

Applying damage tools to a mesh, by tool name and its settings:

qm.qm_apply(wall, "chunks", selection_attr="dmg") qm.qm_apply(wall, "cracks", Scale=4.0)

The damage tools on hand: cracks (an engraved web), holes (noise gouges), chunks (pieces bitten out), edge_wear, cables (sag between regions), panel_cut, hull_cut, edges_to_ropes, selection_to_box, selection_to_cylinder.

Putting it in the world, then dressing each slot:

jayzee upload <model>.glb

model: { id: "/cdn/value.<sha>.glb", forward: "+z", materials: { stone: { texture: "cdn/texture-<what>.png" } } }

Budget triangles against three anchors. Most things a game shows are under 20k triangles each; a finished game plays about half a million in frame; a heavy scene one to two million. A hero piece the player stands beside earns more.

Budget triangles against three anchors.

Junctions are seated, never touching. Roof slabs sink about 2 cm into the roof's slope; trim, sills and chimneys sit at least 3 cm into their walls; armour plates sit at least 2 cm into their host. Overlap makes gaps impossible; exact contact leaves hairline gaps.

Junctions are seated, never touching.

Name every slot. Each material slot is named for its surface so the game can mount its own texture there. Placeholder grey outside a flat style is unfinished.

Name every slot.

Facing. Blender's front exports facing +Z, so a thing built with a face is placed with forward: "+z".

Facing.

forward: "+z"

Feet at the bottom. Each part's origin sits at its visual bottom centre, because the game stands a thing on its feet. Sinking into the ground is done at placement, never by moving the origin.

Feet at the bottom.

Smooth before export. Weld and smooth-shade first; a flat-shaded export splits every edge into seams that far detail levels cannot simplify.

Smooth before export.

Solid only when asked. A placed model is solid with physics: "static", its collider cooked from the mesh; a walker uses "character".

Solid only when asked.

Lighten once, everywhere. If a model is too heavy, its file is reduced once (a Decimate pass), re-uploaded, and every placement points at the new address; the before and after triangle counts get reported.

Lighten once, everywhere.

Per-face colour jitter reads as a checkerboard, not age. Real wear is geometry or a good texture.

Per-face colour jitter reads as a checkerboard, not age.

Proofs are checked by eye, never by an exit code. Every claim about the model is checked in a rendered still someone looked at.

Proofs are checked by eye, never by an exit code.

blender-game-assets, workshop, uploaded-models, animations, geometry

next: Painting pictures →

#### Block 1

````text
marble
````

#### Block 2

````text
brass
````

#### Block 3

````text
art/<model>/build.py
````

#### Block 4

````text
stone
````

#### Block 5

````text
blender -b --factory-startup --python-exit-code 1 --python art/<model>/build.py && spawn see <model>/proof.png
````

#### Block 6

````text
scene.render.engine = "CYCLES"
bpy.ops.export_scene.gltf(filepath=..., export_apply=True)
````

#### Block 7

````text
qm.qm_apply(wall, "chunks", selection_attr="dmg")
qm.qm_apply(wall, "cracks", Scale=4.0)
````

#### Block 8

````text
spawn upload <model>.glb
````

#### Block 9

````text
model: { id: "/cdn/value.<sha>.glb", forward: "+z", materials: { stone: { texture: "cdn/texture-<what>.png" } } }
````

#### Block 10

````text
forward: "+z"
````


### After clicking "read → Painting pictures Painted pictures in seconds: icons, posters, portraits, mock screens, wall paintings, seamless textures and cutouts, each a picture address the game shows."

- H3: Cutouts: a subject on a see-through background

Painting is the fastest tool on the bench. A sentence goes in, a finished picture comes out in seconds, and the address it prints is the asset itself. It makes:

Icons: an ability, an item, a badge. A game's icons are one set: one frame, one style sentence, one prompt shape, so the sword and the potion look like they came from the same hand.

Posters and wall paintings: a wanted poster in the saloon, a portrait of the old king over the throne, a movie poster on a cinema wall.

Posters and wall paintings

Portraits: a character's face for a dialogue box or a shopkeeper's window.

Mock screens: before a game's interface is built, the finished screen is painted as a mock, so you can see the plan before any code.

Posters for clips: a video scene has no still of its own, so a painted picture is shown as its poster while it loads.

Posters for clips

Seamless textures: pictures that repeat both ways with no seam, for floors, walls, rock and wood. A texture is also named into being by its address, cdn/texture-<what>.png, and worn on a model's slot or a surface.

cdn/texture-<what>.png

Cutouts: a picture with a transparent background, a tree, a sign, a character card, that stands in the world as a flat sprite with clean edges.

You describe the picture: "an icon of a cracked blue crystal", "a weathered wanted poster for a one-eyed bandit".

You describe the picture

The style sentence is fixed once. For a set (all the icons, all the portraits), one frame and one prompt shape keep them matched. A new icon follows the set's sentence.

The style sentence is fixed once.

One paint per picture. An icon is one jayzee paint at 1024 by 1024; a mock screen is painted over a look at the current frame, with your own pictures passed as references.

One paint per picture.

The address is the asset. The printed address goes wherever the picture belongs: an image in the game's screen, a texture on the face that hangs it, a picture shown in chat.

The address is the asset.

It is placed and looked at. An icon is sized to its slot; a poster hangs on the wall that carries it; a texture is checked on the surface it tiles across.

It is placed and looked at.

An RPG inventory: a grid of painted item icons, each its own picture, each sized to its slot, all in one style.

An RPG inventory:

A detective game: painted evidence photos and suspect portraits pinned to a corkboard wall in the 3D office.

A detective game:

A horror house: an oil painting over the fireplace whose subject is a little wrong, hung as a texture on the frame's canvas face.

A horror house:

A forest: cutout sprites of ferns and signposts standing in the world, clipped clean at their edges.

A forest:

A shop screen planned as a mock: the painted screen shows each panel, its words and its place; the real screen is then built to match it, and a before and after are shown.

A shop screen planned as a mock:

An icon, one per picture:

jayzee paint "<what>" --size 1024x1024

A mock screen, painted over the current frame, with more of your pictures as further references:

jayzee paint "<the finished screen: each plate, its words, its place>" --ref <address beside the frame>

Showing a painted picture in the game's screen and in chat:

<img src="/cdn/value.<sha>.png"> ![the mock](<its /cdn/ address>)

A cutout standing in the world as a sprite, clipped at its edge:

sprite: { texture: "/cdn/value.<sha>.png", billboard: "yaw", cutout: true, alphaCutoff: 0.5 }

A texture worn on a model's named slot:

model: { id: "<model address>", materials: { marble: { texture: "cdn/texture-<what>.png", roughness: 0.3 } } }

A game can also paint for its players while they play. The image:generate job paints one picture per player per game from that player's words, 1536 by 1024 when no size is given; transparent gives a cutout and tile an opaque texture that repeats both ways with no seam:

ctx.job("image:generate", { prompt, width, height, transparent, tile }, (r) => { /* r.data.url */ });

And image:segment finds the things a picture shows, giving one black-and-white mask per thing found, white where it is, with its box in the picture's pixels.

One set, one style. Icons that share a frame, a style sentence and a prompt shape read as a set; a mix of styles reads as a pile.

One set, one style.

An uploaded picture's address is exact. It serves at the address upload prints; a size or variant word added to that name serves nothing. Never split an image to dodge a limit.

An uploaded picture's address is exact.

Players get one painted picture each per game. A game that paints for its players keeps the address in the player's own saved state, because the next ask is refused as already spent.

Players get one painted picture each per game.

Pictures shared by players are checked by Jayzee. A player's own picture said in chat is shown from its address, never copied.

Pictures shared by players are checked by Jayzee.

Flat glyphs are drawn, not painted. An icon asked to be flat or hand-drawn is a drawn vector glyph set instead; a painted picture is for everything with depth and texture.

Flat glyphs are drawn, not painted.

Textures belong on named slots. A model's surfaces each take their own texture once each slot is named for its surface; until then it wears the paint baked into the file.

Textures belong on named slots.

In a 2D world every sprite, tile and backdrop is drawn in code unless you hand a picture or ask for finished art.

In a 2D world

Your own picture in 3D. If you want a picture you made turned into a 3D model, it is cooked into a mesh once (see Uploaded & built models), not rebuilt by hand.

Your own picture in 3D.

Cutouts: a subject on a see-through background

jayzee cutout takes any picture, a painted one or one you shared, and lifts its subject out onto a transparent png, printed back by name. It is how a painted character becomes a sprite that stands on the scene with no box around it, how a portrait drops onto a dialogue plate, how an item icon sits cleanly on a slot.

jayzee cutout

When: a painted hero for a menu card, a shop item over a wooden shelf, a creature sprite in a 2D game, a sticker on a sign.

How it goes: paint (or share) the picture, cut it out, then hang the cut-out: <img src> in the HUD, sprite.texture on a billboard, texture on a face.

How it goes:

<img src>

sprite.texture

Tip: a painted subject on a plain background cuts cleanest; jayzee paint --transparent paints straight onto see-through when the cut can be skipped.

Tip:

jayzee paint --transparent

jayzee paint "a brass lantern, three-quarter view, plain background" --name lantern jayzee cutout lantern

game-ui, video, uploaded-models, 2d-mode, workshop

next: Sound, music & voices →

#### Block 1

````text
cdn/texture-<what>.png
````

#### Block 2

````text
spawn paint "<what>" --size 1024x1024
````

#### Block 3

````text
spawn paint "<the finished screen: each plate, its words, its place>" --ref <address beside the frame>
````

#### Block 4

````text
<img src="/cdn/value.<sha>.png">
![the mock](<its /cdn/ address>)
````

#### Block 5

````text
sprite: { texture: "/cdn/value.<sha>.png", billboard: "yaw", cutout: true, alphaCutoff: 0.5 }
````

#### Block 6

````text
model: { id: "<model address>", materials: { marble: { texture: "cdn/texture-<what>.png", roughness: 0.3 } } }
````

#### Block 7

````text
ctx.job("image:generate", { prompt, width, height, transparent, tile }, (r) => { /* r.data.url */ });
````

#### Block 8

````text
spawn cutout
````

#### Block 9

````text
<img src>
````

#### Block 10

````text
sprite.texture
````

#### Block 11

````text
spawn paint --transparent
````

#### Block 12

````text
spawn paint "a brass lantern, three-quarter view, plain background" --name lantern
spawn cutout lantern
````


### After clicking "read → Sound, music & voices Sounds, music tracks, songs and voice lines are named into being: the filename is the prompt. How they are made, placed, mixed and kept from getting too loud."

A place should sound like itself. The workshop makes four kinds of sound, all named into being by their address:

Sound effects: a blade thwacking into a straw dummy, a door creaking on iron hinges, a coin dropping into a tin cup. Named for what a microphone would hear.

Sound effects

Ambience loops: wind, a crowd, rain on a roof. Mastered to whisper under everything else.

Ambience loops

Music tracks: a mood, a genre and instruments, as a loop. Any track or upload can be remade into a variation, and a song can be sung from your own lyrics, word for word.

Voice lines: a character saying a line, in one consistent voice. A performed line can carry acting cues like a sigh.

Your own recordings work too: an uploaded mp3, wav, flac or ogg is itself a track, ready to play.

You say what the sound is. "A heavy wooden door slamming in a stone hall", "a tense taiko battle track", "the blacksmith greets you gruffly".

You say what the sound is.

The name is written as the prompt. Every word of the filename is rendered into the sound, so it names the physics: the materials, the force, the space. A loop ends in -loop so its seam is levelled.

The name is written as the prompt.

-loop

The voice is cast once. A character's throat ("gravel-voiced old soldier") is one constant every line of theirs derives from, so the blacksmith sounds the same in every line.

The voice is cast once.

It is placed where it happens. A hit sounds at the point of the hit; a smithy's loop sits on the smithy; the soundtrack plays on the one jukebox everyone hears.

It is placed where it happens.

It is mixed. Each sound rides a bus (music, effects, ambience, interface, voice, footsteps), and the game's gains balance them under each player's own volume.

It is mixed.

It is heard in context. A first play takes a few seconds to cook; after that it plays at once.

It is heard in context.

There are three planes of sound.

Music is one jukebox for everyone: a calm meadow guitar in the day that crossfades to drums when a fight starts, and ducks under a voice line so the words are heard.

World sound happens at a place: a one-shot when something happens (the hit at its position, the roar as a kart passes), or a placed sound on an object (a fountain, a radio) loud up close and silent past its range. A radio's song can be paused, sought and looped, and heard only by the people in the car.

Program sound is for things words cannot name: live synthesis, a beat machine, an engine note that rises with speed.

Program sound

Examples: a tavern with a crackling fire loop on the hearth, crowd murmur beneath, and a bard's track on the jukebox; a dialogue scene where each line plays from the speaker, a caption appears the moment it is heard, the music ducks, and the next line starts when this one ends.

Placeholders show the shape; the words inside the angle brackets are what you would describe.

A sound effect, a track, and a voice line:

cdn/sfx-<what a microphone would hear>.mp3 cdn/music-<mood-genre-instrument words>-loop.mp3 cdn/voice-<throat words>-<emotion>-saying-<the line>.mp3

A remake of a track or upload adds sound words to its address, and a song sings your lyrics verbatim, line breaks kept:

<track address>.<sound words>-loop.mp3 cdn/music-<mood-genre-voice words>.mp3?lyrics=<your lyrics>

A performed line with acting cues:

jayzee voice "<line with [sighs] tags>" --voice <name>

The jukebox, from the game's program:

ctx.music.play(track, { fade: 2.5, volume: 0.7 }); ctx.music.duck(0.3, { duration: 2 }); ctx.music.stop({ fade: 0.8 });

A one-shot at a position, on the voice bus:

ctx.emit("playSound", { clip: LINE, position, bus: "Voice", onPlaying: "said" });

The game's mix:

audio: { gains: { Master, Music, SFX, UI, Ambience, Voice, Footsteps }, maxVoices: 32, cullBeyond: 200 }

A name keeps its first sound forever. To change a sound, give it a new filename (add -2 or -v3). Each fresh name is a new purchase against the game's budget, so combinations use a few kinds plus the game's own tint: one bear growl at different pitches, not a name per bear.

A name keeps its first sound forever.

Avoid register words. Words like low, warm, soft, muted or hum render as a band that erases everything above it, which can be silence on a phone speaker. Name the physics instead.

Avoid register words.

Ambience whispers. A sourced loop like a smithy sits around 0.2 gain, its range ending where the source leaves sight. Loops add up.

Ambience whispers.

Too loud means one row. "Too loud" is fixed in one sound's gain, its range or its bus, never by turning everything down.

Too loud means one row.

Volume belongs to Jayzee. Each player sets volume in Jayzee's settings. A game may carry one mute toggle; a volume slider or sound page is never built, because it would stack a second dial under Jayzee's. The game's own balance lives in its gains.

Volume belongs to Jayzee.

Child voices. The voice maker mostly refuses a child's voice however it is worded, so a young character is cast as a light, young adult voice instead, and you are told.

Child voices.

Time lines by sound, not guesses. The next voice line starts when the last one ends, not after a guessed length.

Time lines by sound, not guesses.

Stop what you start. Looping one-shots are kept by handle and stopped when their source is gone.

Stop what you start.

Your own songs. Eight uploaded songs are eight addresses, ready to play; nothing more is needed.

Your own songs.

audio, video, vehicles, game-ui, workshop

next: Uploaded & built models →

#### Block 1

````text
-loop
````

#### Block 2

````text
cdn/sfx-<what a microphone would hear>.mp3
cdn/music-<mood-genre-instrument words>-loop.mp3
cdn/voice-<throat words>-<emotion>-saying-<the line>.mp3
````

#### Block 3

````text
<track address>.<sound words>-loop.mp3
cdn/music-<mood-genre-voice words>.mp3?lyrics=<your lyrics>
````

#### Block 4

````text
spawn voice "<line with [sighs] tags>" --voice <name>
````

#### Block 5

````text
ctx.music.play(track, { fade: 2.5, volume: 0.7 });
ctx.music.duck(0.3, { duration: 2 });
ctx.music.stop({ fade: 0.8 });
````

#### Block 6

````text
ctx.emit("playSound", { clip: LINE, position, bus: "Voice", onPlaying: "said" });
````

#### Block 7

````text
audio: { gains: { Master, Music, SFX, UI, Ambience, Voice, Footsteps }, maxVoices: 32, cullBeyond: 200 }
````


### After clicking "Uploaded & built models"

An uploaded model is a 3D file, a .glb, that stands in your game: one you made elsewhere, one you dropped in, or one a wisp built in Blender and exported. When it lands, a message arrives that is the model's spec sheet: its true height, footprint, clips and bones. Then the model is dressed:

textures on its named surfaces: white veined marble on the marble slot, brushed metal on the brass slot;

textures on its named surfaces

things in its hands: a lantern in its right fist, a sword gripped along the hand;

things in its hands

clothes that move: a cape that deforms with the body's rig, one garment per piece;

clothes that move

sockets: a lamp sitting on the fountain's top socket, a muzzle point for a turret's shot;

parts: a broken turret swapped for a new one with no hole in the silhouette, a mesh piece hidden or recoloured by name.

Your own drawing or photo can become a model too: its picture is cooked into a mesh once, and a humanoid comes rigged and ready to walk.

The file arrives. You drop in a .glb, or a picture you want in 3D; a chat picture is downloaded and uploaded so it has an address.

The file arrives.

The spec sheet comes back. Its height and bounds, not the thumbnail, are its in-game size. The message comes once the file is live at world scale.

The spec sheet comes back.

It is placed and sized. A layout box fits it to a height you choose; the collider follows. Facing is checked: a model built facing the other way takes a forward.

It is placed and sized.

Each surface is dressed. Every material slot named for its surface takes its own texture and finish. A slot name that misses lists the real names in the logs.

Each surface is dressed.

Children are attached. A held thing rides a bone, a garment rides the skin, a lamp rides a socket.

Children are attached.

Motion is added. A humanoid comes with Idle, Walk, Run, Sprint and Jump inside it; any other motion is a clip from the animation library, played by address.

Motion is added.

It is looked at in place, checked from the player's feet.

It is looked at in place

A town fountain: marble basin, brass spout, a lantern sitting on its top socket, solid so players walk around it.

A town fountain:

A knight NPC: your uploaded knight walks on its own rig, a cape child deforming as it strides, a torch seated in its left hand.

A knight NPC:

A tank: its turret is a named part, so a destroyed turret is swapped by a new piece that hides the old one as it lands.

A tank:

A statue from your drawing: cooked as one unrigged statue in the drawing's own pose, standing in the square.

A statue from your drawing:

A dancing crowd: each rigged body plays a library dance clip by address on a gesture channel, legs left to the walk.

A dancing crowd:

A fountain, sized to 2.6 m, solid, its slots dressed and a lamp on a socket:

jayzee({ id: "fountain", feetPosition: { x: 12, z: -4 }, physics: "static", layout: { box: { min: { y: 0 }, max: { y: 2.6 } } }, model: { id: "<fountain address>", materials: { marble: { texture: "cdn/texture-<what>.png", roughness: 0.3 }, brass: { texture: "cdn/texture-<what>.png", metalness: 1, roughness: 0.4 } } }, children: [{ id: "fountain-lamp", attachment: { socket: "lamp_top" }, model: "<lantern address>" }] });

A walking character wearing a cape that deforms with its rig:

jayzee({ id: "knight", feetPosition: { x: 4, z: 2 }, physics: "character", model: "<knight address>", children: [{ id: "knight-cape", attachment: { skin: true }, model: "<cape address>" }] });

A held thing on a hand bone, a part hidden by name, and a model that faces the other way:

children: [{ attachment: { bone: "RightHand" }, model: "<lantern address>" }] model: { id: "<address>", parts: { turret: { visible: false } } } model: { id: "<address>", forward: "+z" }

The piece swap, hiding the named part as the new piece lands:

ctx.attach(piece, holder, { attachment: { part: "turret" }, replaces: "turret" });

Your picture as a mesh is its picture address plus .glb, and ?static cooks an unrigged statue:

?static

model: "/cdn/value.<sha>.png.glb"

A library clip on a channel, and a clip file of your own added to the library:

ctx.self.anim.gesture = { clip: "cdn/clip-<words>.glb", weight: 4, duration: 3, mask: { from: "Spine" } };

jayzee clip import <file> --name "<words>" [--loop] jayzee upload <file> [--name <display>] [--full-size]

Size is the spec sheet's. The height and bounds in the message are the in-game size, not how big the thumbnail looked.

Size is the spec sheet's.

Colliders. A character with no collider keeps a 1.9 m capsule of radius 0.35 until it is sized; collider: "capsule" fits it to the model. A box hitbox is an invisible box that never turns, with the model turning on a child.

Colliders.

collider: "capsule"

Name your slots in Blender. Each material slot named for its surface takes its own texture; until then the model wears the paint in its file.

Name your slots in Blender.

Pictures in a .glb serve at 1024 px, at their own size with --full-size when you ask for it.

Pictures in a .glb serve at 1024 px

--full-size

Rigs that play every clip. A humanoid rig with recognisable bone names (Mixamo-style, and rigs from Mixamo, Jayzee, Meshy, the UE mannequin, Auto-Rig Pro and Unity humanoid) gets foot grounding and plays every library clip by address. Any other rig plays its own clips. An unrigged model plays its baked clips but takes no bone attachments or library clips.

Rigs that play every clip.

Clips by name are forgiving. "Walk" finds "Walking"; a missing name plays the idle, and the logs list the real names.

Clips by name are forgiving.

Animals. An animal arrives as one unrigged mesh and is rigged in Blender by automatic weights.

Animals.

One cook per picture. Your picture is cooked into a mesh once, not once a turn; if you say it looks wrong, the same address is used again.

One cook per picture.

Too heavy? If the spec sheet calls it too heavy, its source is fixed, else it is lightened in Blender.

Too heavy?

Garments stay separate. One child per garment, never baked into the body, so outfits can change.

Garments stay separate.

Facing. Models face −Z by default; forward turns the mesh, sockets and parts once, while rotation turns the whole object with its children and colliders.

uploaded-models, blender-game-assets, animations, geometry, workshop

next: Video, trailers & clips →

#### Block 1

````text
spawn({ id: "fountain", feetPosition: { x: 12, z: -4 }, physics: "static",
  layout: { box: { min: { y: 0 }, max: { y: 2.6 } } },
  model: { id: "<fountain address>", materials: {
    marble: { texture: "cdn/texture-<what>.png", roughness: 0.3 },
    brass: { texture: "cdn/texture-<what>.png", metalness: 1, roughness: 0.4 } } },
  children: [{ id: "fountain-lamp", attachment: { socket: "lamp_top" }, model: "<lantern address>" }] });
````

#### Block 2

````text
spawn({ id: "knight", feetPosition: { x: 4, z: 2 }, physics: "character", model: "<knight address>",
  children: [{ id: "knight-cape", attachment: { skin: true }, model: "<cape address>" }] });
````

#### Block 3

````text
children: [{ attachment: { bone: "RightHand" }, model: "<lantern address>" }]
model: { id: "<address>", parts: { turret: { visible: false } } }
model: { id: "<address>", forward: "+z" }
````

#### Block 4

````text
ctx.attach(piece, holder, { attachment: { part: "turret" }, replaces: "turret" });
````

#### Block 5

````text
?static
````

#### Block 6

````text
model: "/cdn/value.<sha>.png.glb"
````

#### Block 7

````text
ctx.self.anim.gesture = { clip: "cdn/clip-<words>.glb", weight: 4, duration: 3, mask: { from: "Spine" } };
````

#### Block 8

````text
spawn clip import <file> --name "<words>" [--loop]
spawn upload <file> [--name <display>] [--full-size]
````

#### Block 9

````text
collider: "capsule"
````

#### Block 10

````text
--full-size
````


### After clicking "Video, trailers & clips"

A film is the right tool only when you ask for one. Anything your world can act out live (a door swinging, a boss roaring, a crowd cheering) is better scripted in the world itself, because it reacts to players and costs nothing to replay. Video is for the moments a live scene cannot be: a trailer of your game, a painted cutscene, a backdrop that drifts forever, a portrait that speaks one line.

There are four kinds of clip, and each takes a different road.

A film of this world. A trailer, a gameplay clip or a walkthrough of your own game, filmed from real play on a machine with a graphics card. Several shots, each close where its move lands.

A film of this world.

A made scene. Something that is not your world (a dragon over a burning city, a letter being sealed) made from a sentence with jayzee video, 5 to 15 seconds long, with its own sound.

A made scene.

A conjured scene. A short clip named by its address: the words in the address describe it, and it is made the first time anyone asks for it. Good for clips under 5 seconds and for loops.

A conjured scene.

A still that sings or speaks. A painted or uploaded portrait whose lips move on the time of a sound you already have: a recorded voice, or one line of a song.

A still that sings or speaks.

Every one of these plays inside a Jayzee world, the one it is made for. The file or its address is handed over only when it is about a Jayzee game, and that includes your game's story and characters.

A trailer of your game:

Your helper takes a graphics machine with jayzee gpu.

jayzee gpu

Each take opens your running game in its own browser as a nameless player. A small script plays that page: walks the player to something the game does and plays the move at its target. A test flag or an autopilot is not play, so the take shows the game as a player meets it.

An optional camera script flies over the take with no HUD, for example behind your player facing the nearest foe, so the hit is framed.

Before cutting, your helper looks at each take's frame sheet. A black or loading frame means wait longer; a camera spinning or stuck inside something means film again.

The takes are joined into one clip and uploaded. You hear what the clip shows and its address.

Offered at hand-over: jayzee publish set_trailer puts it on your game's page and box, where it plays silent and looping.

jayzee publish set_trailer

A made scene: you describe what happens; the helper first looks up any real thing you name (a photo, a dance, a game) rather than trusting memory; jayzee video makes the clip and prints its address; it is placed where you said it plays.

A made scene:

A speaking portrait: a portrait is painted or uploaded, the line is recorded or cut from a vocal, and jayzee video --image with --audio makes the lip-synced clip. A song goes a line at a time, each line its own clip, joined on the song's timing.

A speaking portrait:

jayzee video --image

--audio

The trailer on your game's page. A new visitor sees thirty seconds of real play looping silently on the box, before they ever click. A device set to less motion or less data shows a still with a play button instead.

The trailer on your game's page.

A cutscene at the throne room. The first time a player reaches the crown, a painted king turns and says his line, then hands the screen back. It fires once, with the world still running warm behind it.

A cutscene at the throne room.

A title banner. A wide strip of clouds drifting in a seamless loop across the top of a menu.

A title banner.

A speaking shopkeeper. A portrait in the shop panel that greets the player in your recorded voice, lips on time.

A speaking shopkeeper.

A time-lapse of your build. Several saved versions of your world filmed one after another into one clip, the camera moving on, so players watch the village grow.

A time-lapse of your build.

A record button that lets players capture their own play is not a film at all: it is screen code in your game's interface.

A film of the world, two takes joined and uploaded:

spawn-film 22 take.mp4 spawn-film 22 close.mp4 --camera cam.js ffmpeg -y -i take.mp4 -i close.mp4 -lavfi concat=n=2:a=1 -pix_fmt yuv420p -movflags +faststart trailer.mp4 && jayzee upload trailer.mp4

A time-lapse across saved versions (jayzee versions inspect lists them):

jayzee versions inspect

spawn-film @v1 @v4 @v9 2 lapse.mp4 --camera cam.js

The trailer onto your game's page:

jayzee publish set_trailer --video trailer.mp4

A made scene, and one that starts from a still:

jayzee video "<what happens>" jayzee video "<what happens>" --image <still> --end <still> --seconds 10 --aspect 9x16 jayzee video --show <name>

A still that speaks a sound you have:

jayzee video --image <still> --audio <sound>

From game code, a scene asked for while the game runs, paid from the world's fuel:

await ctx.awaitJob(ctx.job("video:generate", { prompt, seconds, aspect }))

A conjured address is written in plain words. The shapes, with placeholders:

/cdn/<scene words>.mp4 /cdn/<still>.png.<action words>.mp4 /cdn/<still>.png.<who>-saying-<the line>-for-<n>-seconds.aspect-9x16.mp4 /cdn/<backdrop words>-4-second-loop.aspect-3x1.mp4

Lengths. A made scene runs 5 to 15 seconds (5 by default). A conjured clip is made to the nearest of 1 to 15 seconds as its words say (about 6 when unnamed), and a loop at most 9 (2.5 to 6 when unnamed).

Lengths.

Frames. A conjured clip's shape is one of 16x9, 9x16, 1x1, 4x3, 3x4, 3x2, 2x3, 21x9 or 3x1; with no shape named it is 16x9, and a clip from a still keeps the still's shape.

Frames.

Loops are picture only. An action ending in loop is cut to cycle without a seam, but its sound is a separate looping sound effect played by the engine's audio.

Loops are picture only.

Give every clip a poster. A first conjure takes minutes, so a painted still stands in its place until it arrives.

Give every clip a poster.

A short sound gets silence. A speaking clip runs as long as its sound; a sound under 5 seconds is followed by silence.

A short sound gets silence.

A film saves nothing, but the room is real. A flag, key, camera or prop placed for a shoot runs for every player, and the players in the room are real people. The take's player moves by play alone.

A film saves nothing, but the room is real.

Film an update's trailer first. A take of unpublished work goes up with the next publish.

Film an update's trailer first.

Clips you upload are looked at. Every frame of a creator's uploaded clip is checked; one a stranger should not meet stays off the shelf, with the reason said.

Clips you upload are looked at.

Keep the controls clear. A cutscene's clip never covers the screen's control rail.

Keep the controls clear.

video for every road above.

game-ui for where a clip plays: the video panel, the once-only cue that fires a cutscene, and a record button.

publish for putting the trailer on your game's page.

audio for the looping sound under a looping clip and for recorded voices.

workshop for uploads and the bench the films are cut on.

next: Testers, eyes & playtests →

#### Block 1

````text
spawn gpu
````

#### Block 2

````text
spawn publish set_trailer
````

#### Block 3

````text
spawn video --image
````

#### Block 4

````text
--audio
````

#### Block 5

````text
spawn-film 22 take.mp4
spawn-film 22 close.mp4 --camera cam.js
ffmpeg -y -i take.mp4 -i close.mp4 -lavfi concat=n=2:a=1 -pix_fmt yuv420p -movflags +faststart trailer.mp4 && spawn upload trailer.mp4
````

#### Block 6

````text
spawn versions inspect
````

#### Block 7

````text
spawn-film @v1 @v4 @v9 2 lapse.mp4 --camera cam.js
````

#### Block 8

````text
spawn publish set_trailer --video trailer.mp4
````

#### Block 9

````text
spawn video "<what happens>"
spawn video "<what happens>" --image <still> --end <still> --seconds 10 --aspect 9x16
spawn video --show <name>
````

#### Block 10

````text
spawn video --image <still> --audio <sound>
````

#### Block 11

````text
await ctx.awaitJob(ctx.job("video:generate", { prompt, seconds, aspect }))
````

#### Block 12

````text
/cdn/<scene words>.mp4
/cdn/<still>.png.<action words>.mp4
/cdn/<still>.png.<who>-saying-<the line>-for-<n>-seconds.aspect-9x16.mp4
/cdn/<backdrop words>-4-second-loop.aspect-3x1.mp4
````


### After clicking "Testers, eyes & playtests"

A build that only reads right in code is not done. Every piece your helpers make is checked two ways: it is looked at, with a camera that sees exactly what a player would, and it is played, by a body that walks into your game through the same page a player opens. This page explains both, and the playtests you can ask for.

looked at

Looks. Pictures of the live game: a wide contact sheet of a world's first look, one object alone on a plain backdrop, a filmstrip of a motion, the game screen with its interface, or a read of the interface's live parts.

Looks.

A body in your world. Your helper's own body stands in your game. While it plays a page, it counts as a player: the game's player counts and player hooks see it, and you can watch it work.

A body in your world.

Tester players. Extra test players sent into a room of their own, so a test race or a test wave never starts in yours.

Tester players.

Rounds. A real play-through of what you asked for, followed by what it felt like, in your words, what landed and what fell flat. Never an invented score.

A first look. A new world is first seen from four vantages at one instant: from above, at the jayzee point, at a player's eye height, and indoors.

A first look.

The piece, close. A model, a building or a sign is looked at alone and at full size, never only as a speck in a wide shot. What the look shows gets fixed in one more pass.

The piece, close.

Motion. A walk cycle, a door swing or a sword stroke is checked as a burst: several frames over a second or two, laid side by side, so a foot sliding or a stroke landing late shows up.

Play. For a mechanic that misbehaves, or before something lands, the helper joins its body and drives the page: clicks into the view, presses keys, takes a screenshot, looks, adjusts. A round is a loop of act, look, adjust every few hundred milliseconds, never a blind list of key presses.

A tester room. When the test would start something shared (a race, a match, a wave), the tester joins in its own room so your round stays yours.

A tester room.

The verdict. You hear what landed and what did not. A jump too tight for the tester is too tight for your players: that failure is the finding.

The verdict.

A platformer's third jump. The tester tries the gap ten times, lands it twice, and the report says the gap is half a metre too wide, not that the level is fine.

A platformer's third jump.

A phone check. The game screen is looked at as a phone in portrait and in landscape, so a button hiding under a thumb is caught before a player meets it.

A phone check.

A shop panel. The interface's live parts are read: which buttons exist, their text, where they sit, so a price that never updates is found by reading, not guessing.

A shop panel.

A walk cycle. A four-frame burst of a character walking shows the feet planted on each step.

A walk cycle.

A live round with you. You ask to play together; the helper hands its keys and mouse to a fast player model that reads the game ten times a second, and steers it with words while you play beside it.

A live round with you.

Join your body and get the page it plays:

A tester in its own room:

spawn client join --tester 1 --room test

Read your body, step out, come back:

spawn client spawn client leave

A short play script on the body's page, then a look at the result:

import { chromium } from "playwright"; const browser = await chromium.connectOverCDP("http://127.0.0.1:9222"); const page = browser.contexts()[0].pages()[0]; await page.mouse.click(...(await page.evaluate(() => [innerWidth / 2, innerHeight / 2]))); await page.keyboard.press("KeyW", { delay: 1500 }); await page.screenshot({ path: "view.png" }); await browser.close();

jayzee see view.png

A live round driven by Jev, steered by name, read, and stopped:

jayzee jev start "<goal>" jayzee jev say --now "jump onto the bridge" --key "Space=tap at a gap" jayzee jev jayzee jev stop

The kinds of look, as a helper asks them:

target "scene", views ["aerial", "jayzee", "pov", "indoors"] a world's first look target "object", objectId <id> one thing alone, front-right target "scene", burst { frames 4, spanSeconds 1.5 } a motion filmstrip target "player", device "phone", landscape true the game screen on a phone target "ui", verb "text", selector "#shop" the interface's live text

A test body is a real player. While it plays, it is counted in your room and the player hooks see it. A race it starts is a race in your room, which is why tests that start shared things go to their own room.

A test body is a real player.

A click locks the pointer. Coordinates in a play script are screenshot pixels; the game's interface lives in its own frames on the page.

A click locks the pointer.

Bursts span 2 to 6 frames over a quarter of a second to 3 seconds.

Bursts span 2 to 6 frames

Phone presets are 390 by 664 in portrait (756 by 265 in landscape) and a tablet at 834 by 1194; the touch controls mount on them.

Phone presets

Clean up. Test objects are tagged temp when they are made and removed before the helper finishes. Your world is never left mid-wave or mid-race by a test.

Clean up.

Two accounts, not two tabs. One account in two tabs of one room hands the game to the newer tab; real multiplayer tests use two accounts.

Two accounts, not two tabs.

Ask for the round you want. Say what to play ("try the boss with no upgrades") and you get that round played whole, then an honest account of it.

Ask for the round you want.

Check what must survive a restart on a fresh start. Something only spawned by a live script is gone on a restart unless its spawner makes it again.

Check what must survive a restart on a fresh start.

workshop for the body, the page, tester rooms and Jev rounds.

debugging for what a test turns up: errors, slow frames, a thing a player cannot see.

game-ui for the interface a test reads and clicks.

weaves for the play lane: a helper whose whole job is to play.

next: Wisps & weaves →

#### Block 1

````text
spawn client join --tester 1 --room test
````

#### Block 2

````text
spawn client
spawn client leave
````

#### Block 3

````text
import { chromium } from "playwright";
const browser = await chromium.connectOverCDP("http://127.0.0.1:9222");
const page = browser.contexts()[0].pages()[0];
await page.mouse.click(...(await page.evaluate(() => [innerWidth / 2, innerHeight / 2])));
await page.keyboard.press("KeyW", { delay: 1500 });
await page.screenshot({ path: "view.png" });
await browser.close();
````

#### Block 4

````text
spawn see view.png
````

#### Block 5

````text
spawn jev start "<goal>"
spawn jev say --now "jump onto the bridge" --key "Space=tap at a gap"
spawn jev
spawn jev stop
````

#### Block 6

````text
target "scene", views ["aerial", "spawn", "pov", "indoors"]   a world's first look
target "object", objectId <id>                                  one thing alone, front-right
target "scene", burst { frames 4, spanSeconds 1.5 }             a motion filmstrip
target "player", device "phone", landscape true                 the game screen on a phone
target "ui", verb "text", selector "#shop"                      the interface's live text
````


### After clicking "read → Wisps & weaves Wisps are helpers that build pieces of your world at the same time. A weave plans them: a brief each, a lane each, then reviewers, critics and players to check the work."

- H3: Claims: who is working on what

A big build goes faster when many hands work at once. On Jayzee those hands are wisps: helpers that each take one piece of your world, build it in their own copy, and land it in yours. A weave is the plan that sends them out together and brings their work back.

Lanes. Each wisp works one lane: one task, one piece. A lane gets its own clone of the world and the same building tools your main helper has (files, scripts, looks, a shell), plus Tripo for models. Painting pictures, video and voice stay with your main helper.

Lanes.

Blueprint boxes. When a lane starts, a placeholder box stands in the world where its piece will go, under the piece's id. The finished piece replaces it.

Blueprint boxes.

A card you can follow. While a weave runs you see a card: its title, the stage it is in, one line per lane, notes at turning points, and a closing word naming what landed and what did not.

A card you can follow.

Checkers. Lanes of special kinds that do not build new pieces: review, verify, judge, critic, polish, and play.

Checkers.

Plan the whole. Your helper splits your ask into pieces: the tavern, the market, the road between them. Each piece gets a footprint: where it stands and how big it is.

Plan the whole.

Write the briefs. A lane's prompt is its whole brief: the facts it cannot read from the world's files. Shared facts name ONE centre and ONE ground height every lane builds to. Each thing a player can act on carries its verb (E draws water at the well) and the life around it. A building is rooms a body walks into, never a sealed front.

Write the briefs.

Send them out in parallel. All the pieces build at once. A file two lanes both need is one lane's to write; the other imports it after.

Send them out in parallel.

Join the pieces. The paths that connect them are one network and one lane's job, run after the piece lanes return, reading each door's position from the files.

Join the pieces.

Check. A review lane looks at the finished work and mends what it shows; a play lane plays it.

Check.

Report. The weave's word arrives as messages. Your helper reads where you are standing before telling you where things are, because the world moved while you did not.

Report.

If you change your mind mid-build, the change is a steer: running lanes fold it in and queued lanes take it as an addendum. Only a changed plan stops the weave.

A village in one go. Five lanes raise the inn, the smithy, the well, the chapel and the houses round the square at the same time, while a sixth lane waits to lay the roads between their doors.

A village in one go.

A map filled to its edge. On a big map, one lane fills the land between the places with groves, fields and hamlets, so a trip never crosses an empty plain.

A map filled to its edge.

A bar you set. You share screenshots of a game you love. Each round builds and installs its best try, then a critic lane, shown only your bar, scores how close it is and names the biggest gap. The next round starts from that gap, until the critic says ours wins. Under the bar, the best try still stands until a better one does.

A bar you set.

A playtest squad. Play lanes each join as a player; in a multiplayer world each weave's players get their own empty room, so two squads are two weaves.

A playtest squad.

The skeleton of a weave, with one build lane and one checker:

export const meta = { name: "village", description: "raise your village square" }; phase("build the square"); const inn = agent("<the inn's brief>", { label: "raise your inn", footprint: { id: "inn", feetPosition: { x: 0, z: 0 }, size: { width: 12, height: 8, depth: 10 }, place: "main" }, skills: ["geometry"], effort: "medium", }); log("the inn stands"); const verdict = await agent("<what to judge, and the bar>", { agentType: "critic", schema: { type: "object", properties: { winner: { enum: ["ours", "bar"] }, score: { type: "number", maximum: 10 }, biggestGap: { type: "string" } } } });

The building blocks: agent(prompt, opts) for a lane, parallel([...]) to run lanes together, pipeline(items, ...stages) for a chain, phase(title) for a stage on the card, log(text) for a note, and args.

agent(prompt, opts)

parallel([...])

pipeline(items, ...stages)

phase(title)

log(text)

The lane options that matter most:

label a verb phrase in your words: "raise your three stalls" footprint { id, feetPosition, size: { width, height, depth }, place, rotation? }, or null skills skill ids loaded into the lane maxSteps 60 by default referenceImages your picture, so the lane builds to it color the wisp's flame, "#rrggbb" agentType review, verify, judge, critic, polish, play effort low, medium (default) or high

A lane is one task. It ends when it replies, or at its step limit or budget. Nothing holds it open for a verdict: a lane told to wait just spends its steps waiting. A verdict is the next round, a new lane carrying the verdict and the files the last one left.

A lane is one task.

A lane that lands nothing counts as nothing. Words with no world change and no upload come back empty.

A lane that lands nothing counts as nothing.

Effort by kind. Wiring, scripts, interface, fixes and placements run well at low effort. Art that has to read (a model, a texture, a look) takes medium or high.

Effort by kind.

Your brief is yours. When you dictate what a wisp gets (your picture, your sentence, "nothing else"), it is sent as you said it, with nothing added.

Your brief is yours.

One owner per shared thing. A file two lanes need is one lane's to write. A config that turns the ground off is saved by the floor lane after the new floor stands under everyone's feet, never at kickoff.

One owner per shared thing.

Name stages and lanes. Bare-noun labels, one stage and no notes make a build nobody can follow.

Name stages and lanes.

Asking how long. A swarm list says what each lane has landed and holds right now; no finish time is invented.

Asking how long.

Your standing rule. If you have told your helper to always run as many wisps at once as it can, that rule shapes every plan.

Your standing rule.

Claims: who is working on what

When more than one builder (or more than one Cleetus) is in a world, a claim says out loud who has a file, folder or place for now. It is a courtesy, not a lock: the others are told, and nothing stops them.

jayzee claim scripts/castle.js "raising the bridge" takes the file with a reason everyone sees.

jayzee claim scripts/castle.js "raising the bridge"

jayzee who scripts/castle.js (or a folder or place) answers who is working there now.

jayzee who scripts/castle.js

jayzee tell "tiger's cleetus" "leave the bridge to me?" hands one message to another Cleetus in the room.

jayzee tell "tiger's cleetus" "leave the bridge to me?"

Wisps inside one weave avoid each other differently: each lane gets its own footprint (a blueprint box where its piece will stand) and a file belongs to exactly one lane; a lane that needs another's file imports it after that lane returns.

weaves for the whole grammar and its options.

workshop for the bench every lane works on, including play lanes.

blender-game-assets for model lanes and their effort.

debugging for what a verify or review lane checks.

next: World files, versions & undo →

#### Block 1

````text
export const meta = { name: "village", description: "raise your village square" };
phase("build the square");
const inn = agent("<the inn's brief>", {
  label: "raise your inn",
  footprint: { id: "inn", feetPosition: { x: 0, z: 0 }, size: { width: 12, height: 8, depth: 10 }, place: "main" },
  skills: ["geometry"], effort: "medium",
});
log("the inn stands");
const verdict = await agent("<what to judge, and the bar>", { agentType: "critic",
  schema: { type: "object", properties: { winner: { enum: ["ours", "bar"] }, score: { type: "number", maximum: 10 }, biggestGap: { type: "string" } } } });
````

#### Block 2

````text
agent(prompt, opts)
````

#### Block 3

````text
parallel([...])
````

#### Block 4

````text
pipeline(items, ...stages)
````

#### Block 5

````text
phase(title)
````

#### Block 6

````text
log(text)
````

#### Block 7

````text
label            a verb phrase in your words: "raise your three stalls"
footprint        { id, feetPosition, size: { width, height, depth }, place, rotation? }, or null
skills           skill ids loaded into the lane
maxSteps         60 by default
referenceImages  your picture, so the lane builds to it
color            the wisp's flame, "#rrggbb"
agentType        review, verify, judge, critic, polish, play
effort           low, medium (default) or high
````

#### Block 8

````text
spawn claim scripts/castle.js "raising the bridge"
````

#### Block 9

````text
spawn who scripts/castle.js
````

#### Block 10

````text
spawn tell "tiger's savi" "leave the bridge to me?"
````


### After clicking "World files, versions & undo"

Behind every game on Jayzee is a plain folder of files. The places, the things standing in them, the scripts, the interface and the settings are all files, and the world keeps them like a careful notebook: every save becomes a version you can look back at, compare, and undo.

The world as files. The game's settings live in one config file; each place has its own config and its own scene files listing what stands where; behaviors, templates, the interface and data tables are files of their own. Each tuned number lives in one table, so a change is one edit.

The world as files.

Versions. Every save is a commit: one entry in the world's history, with a line in your words saying what changed.

Versions.

A change history per file. For each file, a record of every change to it, and who made it.

A change history per file.

Chat history. Your conversations, kept by day, so "what did we decide about the shop?" has an answer.

Chat history.

A journal. Notes about the game that every helper reads before working on it.

A journal.

You ask for a change. "Make the bridge longer."

You ask for a change.

The helper reads first. It opens the files that touch the bridge, and for a bug, that file's history, before naming any cause.

The helper reads first.

The edit lands as one save. Files that belong together are written in one call, so they save as one version. A world never sits half-changed.

The edit lands as one save.

You get a history line. It reads like you would say it: "the bridge now reaches the far bank."

You get a history line.

If you do not like it, undo. One undo puts that whole save back.

If you do not like it, undo.

If something worked before, the records answer it: the file's history and the chat show when it changed and who changed it. Present before and absent now means something deleted it.

If something worked before,

When you say "perfect, keep it", that is a pin: the version is noted beside the feature, and any later repair restores those exact bytes instead of rebuilding from memory.

A safe experiment. You try a darker night sky for an evening. You do not like it. One undo and the old sky is back exactly.

A safe experiment.

"The boss used to roar." The roar's file history shows a later save removed the sound line. The fix restores it from the version that worked.

"The boss used to roar."

A time-lapse. Several versions of your world filmed into one clip, showing the town growing from a field.

A time-lapse.

A hotfix while you build. Your live game has a broken door, but your draft is mid-way through a new level. The fix goes straight to the live copy's script, and that change alone publishes, leaving the draft alone.

A hotfix while you build.

Two builders at once. One wisp raises the inn while another lays the roads; neither overwrites the other.

Two builders at once.

The world's history, and one version opened up:

jayzee versions jayzee versions inspect

Undo a whole save:

jayzee undo

Search the notes, history and docs:

jayzee grep "<words>"

The folders you will hear named:

world.config.yaml the game's settings places/<p>/config.yaml one place's settings places/<p>/cells/x<cx>z<cz>.scene what stands in the place templates/<t>.js shared definitions scripts/<name>.js behaviors scripts/lib/data/ tuning tables history/changes/<file> each file's change record history/chat/ your chats, by day memory/game/ the game's shared journal

A fix to the live game while the draft holds unfinished work edits the live copy's file directly:

@user/slug@live/scripts/x.js

A behavior that must save its own work does it as one commit, one undo:

ctx.commit("<what changed>", () => { /* the writes */ })

What a live script spawns is not in the files. Enemies, dropped loot or a placed block made while the game runs live in the room, not the folder. Destroying one by hand is temporary: a restart runs its spawner again and it returns. Fix the spawner instead.

What a live script spawns is not in the files.

State is not a file. A player's progress, a room's shared state and a thing's state persist in the game itself; scores across rooms live in the game's database.

State is not a file.

Undo is whole. It puts back one full save, not part of it. That is why files that belong together save together.

Undo is whole.

Repeated fixes stack. A second "fix it" on one thing can mean two attempts now stand side by side. The good habit is to delete the attempts and rebuild it as one.

Repeated fixes stack.

Claims between builders. When several helpers build at once, each piece has a footprint: a placeholder box under the piece's id that the finished piece replaces. A file two builders need belongs to one of them; the other uses it after. A placeholder put in the wrong place blocks that id there.

Claims between builders.

Other hands commit too. The history rows say who made each change, so a surprise is traced, not guessed.

Other hands commit too.

A save another player was touching is judged by the machine that holds it; the records show whether a write landed.

A save another player was touching

Files stay inside Jayzee. Your game cannot be exported as a package; players get only what the game gives them.

Files stay inside Jayzee.

debugging for using history to find what changed and when.

weaves for footprints and file ownership between builders.

publish for live fixes and versions players see.

workshop for model scripts kept in the files and rerun whole.

next: Platform reads →

#### Block 1

````text
spawn versions
spawn versions inspect
````

#### Block 2

````text
spawn undo
````

#### Block 3

````text
spawn grep "<words>"
````

#### Block 4

````text
world.config.yaml                  the game's settings
places/<p>/config.yaml             one place's settings
places/<p>/cells/x<cx>z<cz>.scene  what stands in the place
templates/<t>.js                   shared definitions
scripts/<name>.js                  behaviors
scripts/lib/data/                  tuning tables
history/changes/<file>             each file's change record
history/chat/                      your chats, by day
memory/game/                       the game's shared journal
````

#### Block 5

````text
@user/slug@live/scripts/x.js
````

#### Block 6

````text
ctx.commit("<what changed>", () => { /* the writes */ })
````


### After clicking "Platform reads"

- H3: The launch kit

Your game runs on every player's own device, and a lot can happen there that your build room never shows. Platform reads are the instruments that tell your helper what really happened: what broke on a player's screen, how fast frames drew, what the engine had to give up, and how the published game looks to a newcomer.

Logs. Behavior errors with the file and line, receipts of writes, render faults forwarded from players' devices, and the game's own log lines.

Logs.

A performance table. A verdict on top, then each script's cost, each screen's frame, physics, the network, each player's actions, and the ground builders.

A performance table.

Live frame numbers. Frames per second, draw calls, triangles drawn, milliseconds on the CPU and GPU, memory, and how much the picture was scaled down to stay fast.

Live frame numbers.

Pixel answers. For any spot on screen, which system drew it and what thing it belongs to.

Pixel answers.

Bug reports. A note to Jayzee when the engine itself answers wrong, or when something you need does not exist yet.

Bug reports.

The launch kit. The steps that turn a playable world into a published game: covers, trophies, controls for pad and phone, an optional trailer, then updates with notes players read.

The launch kit.

"It's slow":

The performance table is read before any cause is said, even on a fresh change.

You hear the frame's triangles, what draws most of them, the table's top row, and the fix.

The top row is the fix's address: that script, or that model.

A drawing fix is timed on a graphics machine before anyone says it is faster.

"I can't see the statue" (from a player):

The warnings are read: they carry that player's forwarded render faults, naming the thing and the fix.

Their version stamp shows which version their tab started on.

If their copy got stranded, the answer is simply "refresh".

"Publish it":

Scripts are checked for wallet or chain calls, which hold a publish back until removed.

Achievements are set up as trophies.

Four covers are proposed while full controls for a gamepad and a phone are written.

Your cover pick publishes the game. You get its play link.

Later changes go out as updates, each with a name and notes players read.

A phone that lowers its picture. A busy fight scene on an older phone: the frame line says the engine is reducing work, and the plain-words line says what that screen gave up. Fix the costly effect and the picture rises again.

A phone that lowers its picture.

Sparkles on a fence. Thin rails drawn smaller than a pixel crawl as white dots. The fix is fewer, wider parts hidden past a few metres, not a look setting.

Sparkles on a fence.

A hitch at the boss door. The boss model pops in late. The game warms it ahead by asking for a preload just before the door, instead of spawning it early.

A hitch at the boss door.

Forty-seven enemies. The table's top row is each enemy looking for the player every tick. Looking a few times a second fixes it.

Forty-seven enemies.

A launch. Your game appears on the shelf with the cover you picked and a trailer looping on its box.

A launch.

The performance table and its focused reads:

jayzee perf jayzee perf --frame jayzee perf --script <file> jayzee perf --boot jayzee perf --room live jayzee perf --wait

Logs, from a script in the world:

getLogs({ level: "error" }) getLogs({ level: "warn" })

A player's own device log, and the live frame numbers:

read_client_logs ctx.view.fps ctx.view.triangles ctx.view.drawCalls ctx.view.gpuMs ctx.view.renderScale

What drew a pixel:

await getPixelProvenance({ screen: [x, y], camera: { eye, aim, fov } })

A bug report to Jayzee:

jayzee report_bug --kind fault "<what broke>" jayzee report_bug --kind request "<what you need>"

Publishing and updating:

jayzee publish propose_covers jayzee publish publish_update jayzee publish set_trailer --video trailer.mp4 jayzee publish declare_platforms --platforms '["desktop"]' jayzee mod publish

One sample per call. jayzee perf --wait waits for the next sample; nobody loops it.

One sample per call.

jayzee perf --wait

A room restart wipes the logs, and render faults from devices are best effort: an empty list never proves a player's screen is fine.

A room restart wipes the logs,

The frame is one screen's view. Your world's models can total far more triangles than one frame draws.

The frame is one screen's view.

The game owns its speed. Slow frames come from what was built, and the cure is cutting that, named by its cost.

The game owns its speed.

No graphics menu. The engine lowers the picture per device on its own; looks and effects step down by quality. A game never adds a quality toggle.

No graphics menu.

A broken script keeps running. Its errors are counted and one folded row names the file and line. Only an endless loop stops that hook.

A broken script keeps running.

Report the engine, fix your own. A fault in the game's own script is fixed, not reported.

Report the engine, fix your own.

A frozen body after a rejoin is cured by restarting dev rooms, which you call, or a new room name for a posted game; refreshing does not help.

A frozen body after a rejoin

Publishing. Desktop-only games declare it after the covers. Unpublishing takes the box off the shelf while the play link plays the last publish. Offer to publish as soon as the game turns playable.

No covers of loading. A game adds no loading screen or staged wait before play; a match starts on ready or a countdown with the world in view.

No covers of loading.

No file export. Players get what the game gives: a prize, a save, the play link.

No file export.

The launch kit

Once a game is published, a Launch kit button appears in the top bar next to Publish. It is the kit for getting players: Jayzee gives a new game some plays, but most players come from where you share it.

Launch kit

The link: spawn.co/@you/your-game opens the posted game for anyone; it also plays inside X posts.

The link:

Covers: the game's box art and card pictures, made from real frames of the world (the publish skill makes and swaps them).

Covers:

Where it goes: the communities that already like this kind of game: a Discord, a subreddit, a group chat, a short clip on X.

Where it goes:

Coming back to it: jayzee here reads versions, players, likes and reviews, so you can see what a share brought in. A publish is one step from undone: it can be unpublished.

Coming back to it:

jayzee here

debugging for logs, the performance table, pixels and bug reports.

publish for covers, updates, platforms and mods.

mobile-controls for the phone controls written at launch.

video for the trailer on your game's page.

blender-game-assets for lightening a heavy model the table names.

#### Block 1

````text
spawn perf
spawn perf --frame
spawn perf --script <file>
spawn perf --boot
spawn perf --room live
spawn perf --wait
````

#### Block 2

````text
getLogs({ level: "error" })
getLogs({ level: "warn" })
````

#### Block 3

````text
read_client_logs
ctx.view.fps   ctx.view.triangles   ctx.view.drawCalls   ctx.view.gpuMs   ctx.view.renderScale
````

#### Block 4

````text
await getPixelProvenance({ screen: [x, y], camera: { eye, aim, fov } })
````

#### Block 5

````text
spawn report_bug --kind fault "<what broke>"
spawn report_bug --kind request "<what you need>"
````

#### Block 6

````text
spawn publish propose_covers
spawn publish publish_update
spawn publish set_trailer --video trailer.mp4
spawn publish declare_platforms --platforms '["desktop"]'
spawn mod publish
````

#### Block 7

````text
spawn perf --wait
````

#### Block 8

````text
spawn here
````


## Not captured

Controls clicked: 21 of 21 planned controls in this section, out of 0 candidates found after the load and the scroll.
Controls not clicked by policy: 10. Their labels name an action that changes state or sends something, so they were left alone: "read → Uploaded & built models A .glb you upload or a wisp exports arrives with a spec sheet, then gets fitted and dressed: textures on named slots, a lantern in a fist, a cape that moves, sockets and swappable parts."; "A .glb you upload or a wisp exports arrives with a spec sheet, then gets fitted and dressed: textures on named slots, a lantern in a fist, a cape that moves, sockets and swappable parts."; "read → Video, trailers & clips Trailers filmed from real play, short scenes made from a sentence or a still, looping backdrops and speaking portraits, and where each one plays in your game."; "Trailers filmed from real play, short scenes made from a sentence or a still, looping backdrops and speaking portraits, and where each one plays in your game."; "read → Testers, eyes & playtests How your helpers see and play what they build: camera looks at the world, a body that plays your game in a real browser page, tester players in their own room, and live rounds."; "How your helpers see and play what they build: camera looks at the world, a body that plays your game in a real browser page, tester players in their own room, and live rounds."; "read → World files, versions & undo Your world is a folder of files, and every save is a version. Read the history, film old versions, undo a change whole, and keep several builders from stepping on each other."; "Your world is a folder of files, and every save is a version. Read the history, film old versions, undo a change whole, and keep several builders from stepping on each other."; "read → Platform reads What your helper can read about your game as players meet it: errors and render faults from their devices, frame rate and performance tables, bug reports, and the publish and launch steps."; "What your helper can read about your game as players meet it: errors and render faults from their devices, frame rate and performance tables, bug reports, and the publish and launch steps.".
Controls that could not be found again after a retry: 0. Errors: 0.

Clicks made: 21. Clicks that brought up content not in the swept state: 21. The rest brought up nothing new.


## Sources

- `wiki-tools/recapture/states/toolbox/05-initial.json`
- `wiki-tools/recapture/states/toolbox/05-swept.json`
- `wiki-tools/recapture/states/toolbox/05-c001.json`
- `wiki-tools/recapture/states/toolbox/05-c002.json`
- `wiki-tools/recapture/states/toolbox/05-c003.json`
- `wiki-tools/recapture/states/toolbox/05-c004.json`
- `wiki-tools/recapture/states/toolbox/05-c005.json`
- `wiki-tools/recapture/states/toolbox/05-c006.json`
- `wiki-tools/recapture/states/toolbox/05-c007.json`
- `wiki-tools/recapture/states/toolbox/05-c008.json`
- `wiki-tools/recapture/states/toolbox/05-c009.json`
- `wiki-tools/recapture/states/toolbox/05-c010.json`
- `wiki-tools/recapture/states/toolbox/05-c011.json`
- `wiki-tools/recapture/states/toolbox/05-c012.json`
- `wiki-tools/recapture/states/toolbox/05-c013.json`
- `wiki-tools/recapture/states/toolbox/05-c014.json`
- `wiki-tools/recapture/states/toolbox/05-c015.json`
- `wiki-tools/recapture/states/toolbox/05-c016.json`
- `wiki-tools/recapture/states/toolbox/05-c017.json`
- `wiki-tools/recapture/states/toolbox/05-c018.json`
- `wiki-tools/recapture/states/toolbox/05-c019.json`
- `wiki-tools/recapture/states/toolbox/05-c020.json`
- `wiki-tools/recapture/states/toolbox/05-c021.json`
- `wiki-tools/recapture/states/toolbox/summary-05.json`
