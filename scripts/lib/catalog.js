// The catalog the site shows: every premade starter, skill, clip, sound family and tool this world can build with.
export const STARTERS = [
  ["3d", "3D world", "First-person body, mouse look, jump, open sky, placeholder ground and grass.", "Exploration, shooters, adventure, racing, sandbox"],
  ["3d-voxels", "Block world", "Solid voxel field, left click digs, right click places. Biomes, ore and caves come from its generator.", "Survival, crafting, building, mining"],
  ["2d-top", "Top-down 2D", "Drawn pixel hero, tile ground with wang edges, no gravity, solid trees.", "RPGs, farming, zelda-likes, twin-stick"],
  ["2d-side", "Side-scroller", "Drawn hero, platform ground, gravity on, parallax backdrops.", "Platformers, metroidvanias, runners"],
  ["ui-game", "Screen-first", "The screen is HTML, no 3D drawn. Rules run behind buttons. This site runs on it.", "Clickers, card games, idle, quizzes, dashboards"],
];

export const SKILLS = {
  "World & look": [
    ["geometry", "Buildings, creatures, characters, vehicles: anything 3D built in code, rigged with bones."],
    ["heightmap-terrain", "Hills, islands, rivers, coasts, swimming, dug ground."],
    ["voxel-terrain", "Block worlds, dig and place, caves."],
    ["2d-mode", "Side-scrollers and top-down: tiles, drawn sprites, parallax."],
    ["atmosphere", "Sky, sun, fog, clouds, day and night, weather."],
    ["looks", "Colour grade, toon shading, lived-in grime decals, custom shaders."],
    ["trees", "Forests, woods, parks."],
    ["leaf-sprays", "Bushes, hedges, ivy, leaves."],
    ["meadow-grass", "Grass, lawns, tall fields, tufts."],
    ["fx", "Particles and lights: impacts, beams, explosions, fire, rain, auras."],
  ],
  "Play & feel": [
    ["game-feel", "Contact juice: hits, coins, landings, screen shake, hitstop, lasting marks."],
    ["physics", "Ragdolls, limbs on joints, forces."],
    ["bodies", "What passes through what: ghosts, teammates, walking on walls and tiny planets."],
    ["projectiles", "Guns, arrows, fireballs, cannons."],
    ["vehicles", "Cars, trucks, karts, tanks."],
    ["interactive-objects", "Pickups, levers, doors."],
    ["animations", "Playing the 61 humanoid clips, plus custom motion."],
    ["cameras", "First person, third person, top-down, cinematic rigs."],
    ["pointer-raycasting", "Click to place, cursor aim, touch tap and hold."],
    ["jev", "Minds for bosses, NPCs, crowds, shopkeepers and puzzles."],
  ],
  "Screens & sound": [
    ["game-ui", "HUDs, menus, signs, mic and webcam, X posts."],
    ["mobile-controls", "Touch controls, automatic and hand-made."],
    ["audio", "Soundtracks, stems, mixing, voice casts, acoustics, synth voices."],
    ["video", "Trailers, gameplay clips, time-lapses, cutscenes, talking portraits."],
    ["headset", "VR play."],
  ],
  "Multiplayer & systems": [
    ["rooms-and-matchmaking", "Invites, parties, matches, player caps."],
    ["social", "World chat as code: channels, nameplates, earshot, letters between players."],
    ["platform-systems", "Cheat-proof saves, SQL leaderboards, timers, AI text jobs, notifications."],
    ["buyables", "Shops and spoins."],
    ["portals", "Doors to other places or worlds, mirrors, monitors, minimaps."],
    ["player-settings", "Protections and control locks."],
  ],
  "Assets & sharing": [
    ["workshop", "The build bench: headless Blender, renders, bakes and playing your game as a tester."],
    ["weaves", "Helpers that build pieces in parallel: how a crew is briefed and checked."],
    ["uploaded-models", "Your own .glb models or a picture turned into a model: placed, dressed, talking."],
    ["blender-game-assets", "Hero models built in Blender by helpers."],
    ["bring-a-game", "A game made elsewhere, rebuilt Jayzee-native."],
    ["mods", "Install and publish shared mods."],
    ["borrowing", "Reusing other creators' work, credited."],
    ["publish", "Covers, publishing, unpublishing."],
    ["god-mode", "Your own build tools: rigs, brushes, gizmos."],
    ["debugging", "Lag, stutter, freezes, slow loads."],
  ],
};

export const CLIPS = {
  "Locomotion": ["idle", "walk", "run", "sprint", "jump", "fall", "land"],
  "Combat": ["attack", "kick", "throw", "roll", "block", "cast", "hit react", "die"],
  "Body & traversal": ["sit", "sit on floor", "sleep", "swim idle", "swim", "crouch idle", "crouch walk", "climb", "climb wall up", "climb wall down", "drive", "enter car", "exit car"],
  "Social": ["wave", "wave one hand", "wave both hands", "point", "clap", "laugh", "cry", "talk", "cheer", "bow", "salute", "shrug", "thumbs up", "nod yes", "shake no", "angry", "pickup", "victory"],
  "Emotes & dance": ["backflip", "dance", "chicken dance", "locking hip hop", "slide hip hop", "step hip hop", "wave hip hop", "spell casting", "magic spell casting", "sitting cheer", "sitting thumbs up", "sitting laugh", "sitting point", "sitting clap", "sitting talk"],
};

export const FAMILIES = [
  ["lowpoly-cozy", "#e9b872"], ["painterly-fantasy", "#8fb8a8"], ["toon-vibrant", "#ff7a59"],
  ["voxel-bright", "#6cc24a"], ["realistic-gritty", "#7d746a"], ["scifi-neon", "#38e1ff"],
  ["gothic-horror", "#7a3b5e"], ["pixel-bright", "#ffcf3f"], ["pixel-moody", "#4f5d9a"],
];

export const TOOLS = [
  ["Sound by name", "Any effect or music track conjured from a name in a style family."],
  ["Voiced lines", "Characters speak any line, with direction like [sighs] or [whispers]."],
  ["Painted pictures", "Icons, portraits, posters, concept art, textures in seconds."],
  ["Cutouts", "Any picture's subject freed onto a transparent background."],
  ["Seamless textures", "Tiling materials for any surface, by name."],
  ["Blender on hand", "Hero models, bakes and renders built by helpers."],
  ["Web reads", "Live web pages and real map data (roads, rail) pulled into a game."],
  ["AI text jobs", "Built-in language model calls for NPC talk, generated quests, judges."],
];

export const ENGINE = [
  ["Multiplayer from minute one", "Every world is a shared room at a link. Up to 64 together in a place."],
  ["Physics", "Static, dynamic, kinematic and character bodies, joints, triggers, raycasts."],
  ["Pathfinding", "Bodies find their way over terrain and around walls."],
  ["Saves & SQL", "Per-player saves, room state, and a real SQL database across all rooms."],
  ["Places & portals", "Many places in one world, doors between them and to other worlds."],
  ["Phones too", "Touch controls projected from the game's own bindings."],
];

export const GENRES = [
  ["Strongest", ["3D action & adventure", "Multiplayer arenas & party games", "Exploration & atmosphere", "Racing & vehicles", "Survival & building"]],
  ["Very good", ["2D platformers & top-down RPGs", "Clickers, card & board games", "Social hangouts", "NPC-driven story games"]],
];

// Each style family: its painted sample, a music loop and one sound, all made by name.
export const FAMILY_ART = [
[
"lowpoly-cozy",
"/cdn/value.71dea9042755895ccc5228336133f9c2af127e482b26a0edc4da2f22912ff4bd.png",
"/cdn/moodboard-lowpoly-cozy/music-cozy-village-acoustic-guitar-and-glockenspiel-loop.mp3",
"/cdn/moodboard-lowpoly-cozy/sfx-wooden-door-creak-open.mp3"
],
[
"painterly-fantasy",
"/cdn/value.4d9fd6c2fc828f8107d3e4c5cd3836136373749d97d5761d97bb9aeb5c04df0c.png",
"/cdn/moodboard-painterly-fantasy/music-wistful-fantasy-strings-and-harp-loop.mp3",
"/cdn/moodboard-painterly-fantasy/sfx-magic-shimmer-chime.mp3"
],
[
"toon-vibrant",
"/cdn/value.a64f425040e2a64dc36cb5e60ff932fbb8a55251c70455f55110d3dfea31e93f.png",
"/cdn/moodboard-toon-vibrant/music-bouncy-cartoon-marimba-and-brass-loop.mp3",
"/cdn/moodboard-toon-vibrant/sfx-cartoon-boing-jump.mp3"
],
[
"voxel-bright",
"/cdn/value.72a0249f75a2dd5ebcd391251367d8c9b1c9bd686cfbc585b5de6fa1f455dd39.png",
"/cdn/moodboard-voxel-bright/music-cheerful-chiptune-adventure-loop.mp3",
"/cdn/moodboard-voxel-bright/sfx-block-break-crunch.mp3"
],
[
"realistic-gritty",
"/cdn/value.6be8132a26d3cc4e4c28f72760885b5103318d0beaca25366daac3bfc38278fe.png",
"/cdn/moodboard-realistic-gritty/music-tense-cinematic-drums-and-cello-loop.mp3",
"/cdn/moodboard-realistic-gritty/sfx-heavy-boots-on-gravel-footsteps.mp3"
],
[
"scifi-neon",
"/cdn/value.8ef4da258a9b934f20510f67e8128a301b74141b9cb21d9450414dab064d5ada.png",
"/cdn/moodboard-scifi-neon/music-driving-synthwave-arpeggio-loop.mp3",
"/cdn/moodboard-scifi-neon/sfx-laser-blaster-shot.mp3"
],
[
"gothic-horror",
"/cdn/value.bc2dc773ea999b3e0499db4ed695cf0604ddab6154229f661f78cd6203d91906.png",
"/cdn/moodboard-gothic-horror/music-dread-choir-and-low-organ-drone-loop.mp3",
"/cdn/moodboard-gothic-horror/sfx-church-bell-toll-in-fog.mp3"
],
[
"pixel-bright",
"/cdn/value.3bd52ec93d141ba6feef2fef070fa28d8b4574dfd59e0eab450d23fb41aeffa8.png",
"/cdn/moodboard-pixel-bright/music-upbeat-8-bit-platformer-loop.mp3",
"/cdn/moodboard-pixel-bright/sfx-8-bit-coin-pickup.mp3"
],
[
"pixel-moody",
"/cdn/value.eff10a6ce46d2c37a816c2b9b877b2690da771bc33ee0a4b097328dab7a72f3b.png",
"/cdn/moodboard-pixel-moody/music-melancholy-lofi-chiptune-rain-loop.mp3",
"/cdn/moodboard-pixel-moody/sfx-8-bit-door-unlock.mp3"
]
];

// Shared mods in Jayzee's catalog: name, version, what it is, installs, likes.
export const MODS = [["aaa-quality-kit", "2.2.0", "Honest scope: scripts + skills only \u2014 the skills ARE the training; no model, brain, or engine is changed, and the 'mode' brain skills alter zero appearance by themselves.", 1255, 34], ["cleetus-fast-af", "1.2.0", "Batched tool calls, no double-checking, straight answers, one defensible move instead of menus, plus 40 Engine 6 rules: dot writes, stepped numbers, ears over polling, waitUntil proofs, perf and room hygiene. /fastaf audit makes her grade herself.", 335, 13], ["gavi", "1.9.1", "Maximum reasoning comes first (raciocinio-maximo: the investigation budget per request type in numbers, every hypothesis born in the same sentence as the probe that kills it, reading the WHOLE file because this engine links scripts by string and the import...", 225, 19], ["custom-animations", "1.1.0", "Full custom animation system for player characters, NPCs, and enemies. Model-only architecture with semantic profiles, ability systems with animation chaining, interruptible casts, per-spell tuning, conditional idles, prejump anticipation, patrol NPCs, and...", 161, 4], ["awakening", "1.9.0", "High-fidelity rendering for 3D worlds: production PBR lighting, a film-grade post stack (sharpen, AO, sun-lit mist, filmic grade), volumetric clouds, realistic wind-blown grass, 2K PBR ground textures, river-eroded mountains, a procedural forest planner...", 160, 13], ["absolute-cinema", "1.16.0", "A visual cinematic camera toolkit \u2014 place camera nodes, build timelines, and play back smooth blends and hard cuts. A filmmaking studio inside the game engine.", 159, 5], ["ui-builder", "1.0.0", "No description", 159, 1], ["stream-vault", "1.2.0", "Grabs everything your game streams and bakes it at load, so nothing streams in after. One manifest as the directory of record, a /bake command that sweeps the codebase to restock it, and a live recorder that catches anything missed so it never cold-fetches...", 148, 4], ["combat-cookbook", "1.0.0", "Melee, ranged, hitscan, enemy AI, wave jayzeeers, damage zones, and auto-shooter patterns.", 146, 1], ["codex", "1.2.0", "The Codex is a living design document Cleetus keeps for you, in a god-mode tab: thirteen pages-and-tabs across Overview, Features, Lore, Characters, NPCs, Level Design, UI, SFX, VFX, Open Questions, Invariants, Build Order and Notes \u2014 plus a left rail of...", 139, 7], ["atmosphere-kitchen", "1.0.0", "12 ready-to-use atmosphere presets plus day/night cycles, weather transitions, and lighting rules. Copy-paste any mood from sunny day to horror fog to neon night.", 135, 0], ["sound-design-guide", "1.0.0", "Volume mixing, spatial audio, pitch variation, music transitions, genre-specific sound palettes, and voice line patterns.", 116, 0], ["slate", "1.10.1", "Slate \u2014 your game studio, inside your world. Catch an idea before it disappears. Turn a screenshot into a task. Keep your plans, stories, assets and conversations together while you build with Cleetus. Slate is a floating tablet for creators, from the first...", 112, 6], ["animacao-viva", "1.0.0", "Unreal Engine 5's animation toolkit, translated for bodies with NO skeleton \u2014 characters built from primitives, geometry creatures, ships, turrets. State machine with cross-fade, 1D/2D blend spaces, per-region layered animation (run and attack at once),...", 109, 4], ["custom-glb-animations", "1.0.0", "Teaches the Puppet Pattern for using custom uploaded GLB model animations on player characters.", 105, 1], ["materials-database", "3.1.0", "80+ real-world materials with physical, acoustic, mechanical, and visual properties. Universal data layer for any project needing material science.", 101, 1], ["raytraced-lighting", "1.0.0", "Real ray-marched lighting for any world: screen-space traced reflections with a temporal denoiser, traced contact shadows, and a separable bloom. Point a place's atmosphere look at it and floors, walls, metal and water start reflecting the room around them.", 87, 7], ["modeling-studio", "1.4.0", "Turn a sentence or a picture into a clean, high-detail 3D model in your world. Open the \ud83c\udfa8 Studio tab in god mode, or press M (the \ud83c\udfa8 3D studio button) without god mode, describe what you want, add a reference picture, and press Paint or Build 3D: Cleetus...", 84, 14], ["software-devs-playbook", "1.9.0", "No description", 82, 0], ["the-spoin-purse", "1.4.1", "Let players toss spoins to the maker of your world \u2014 donation tip tiers via native buyables (game owner receives, 50% cut) plus a creator links panel (linktree, patreon, your other worlds) edited from a god-mode tab. Ships with a ready-made HUD button +...", 77, 4]];

// Published 6.0 games on Jayzee, by genre: real examples of what gets built here.
export const EXAMPLES = [["3D action & adventure", [["@tuanteku/8-ball-pool-3d", "8-Ball Pool 3D", "tuanteku", 15, "3D 8-ball pool with AI save and resume, friend matches, practice and Five in Eight challenges."], ["@rexgaming_yt/garden-siege-3d", "Garden Siege 3D", "rexgaming_yt", 10, "Peashooters vs the undead: hold the backyard and save the gnome from ten waves of zombies."], ["@ayon/call-of-the-soil-a-bengal-village-adventure", "Call of the Soil: A Bengal Village Adventure", "ayon", 6, "Roam a living Bangladeshi village: chat with neighbours, make friends, ride rickshaws and boats, race on the river, and join festivals. Play in English or Bangla."], ["@tuanteku/whisker-brawl-3d", "Whisker Brawl 3D", "tuanteku", 6, "Pick a scrappy animal, grab absurd loot, and brawl your way through every rival in the arena."], ["@pixelmg_dev/world-adventure-of-pixels", "WORLD ADVENTURE of PIXELS", "pixelmg_dev", 5, "Run, jump, stomp and bonk ? blocks across a pixel world to reach the flag."], ["@match3lover/gemsmith-3d", "GEMSMITH 3D", "match3lover", 5, "Turn the cube, find the match, forge your own puzzles \u2014 a new dimension of GEMSMITH."]]], ["Multiplayer arenas", [["@rexgaming_yt/sky-ring-arena-multiplayer", "Sky Ring Arena Multiplayer", "rexgaming_yt", 0, "First-person sword and shield fights with friends: 1v1 and 2v2. Roll, block, parry, riposte."], ["@chizkeykkk/purrtris-arena", "Purrtris Arena", "chizkeykkk", 17, "Pastel cat-cafe arcade in the clouds: walk up to a cat-eared cabinet and play Purrtris: Marathon, Sprint 40 and Versus."], ["@shadow_ranger_62/elemental-blades-arena-of-ascension", "Elemental Blades: Arena of Ascension", "shadow_ranger_62", 15, "Anime blade & sorcery arena: fight endless waves with your champions, summon rare heroes, and command them on the War Table."], ["@andreamg2tablet/mgtale-battles-multiplayer", "MGTale Battles multiplayer", "andreamg2tablet", 15, "Undertale-style co-op bullet hell: dodge Flowey, Frisk, Chara, Papyrus, Sans, Toriel, Undyne and Asgore together as hearts, then strike back. Plus endless Survival and a Daily Challenge."], ["@andreamg2tablet/mg-sans-battle-multiplayer", "MG Sans Battle multiplayer", "andreamg2tablet", 12, "Undertale-style bullet hell: dodge MG Sans's bones and blasters together, then strike back."], ["@slime/slime-arena", "Slime Arena", "slime", 11, "Be a slime in a glowing neon glass city. Race the Slime City Loop, duel in the colosseum, survive the Mossmoon Ruins, and wear slimeglass skins that shine."]]], ["Racing & vehicles", [["@yunusdiallo/race-to-the-masjid", "Race to the Masjid", "yunusdiallo", 8, "Thobe on, iqama in 55 seconds. Dodge carts and laundry lines down the street and make it to the masjid on time."], ["@metalhorse233/dragon-racing", "Dragon Racing", "metalhorse233", 6, "Fly a drake across the Wyrmcrown Isles: five zones, 28 ring races in Normal and Advanced, zone crowns to earn and 48 hidden glyphs that grow your talent tree."], ["@nickyp/crunch-em-up-derby-racing", "Crunch-em-up Derby Racing", "nickyp", 3, "Figure-8 wreck racing at the Hollis County speedway. Hit hard, roll em, keep moving."], ["@cybershrapnel/mequavian-racing", "Mequavian Racing", "cybershrapnel", 3, "Three Seven Speedway, full scale. Eight laps, one clock, the MEQUAVIS #41."], ["@iiisandman/race-or-die", "Race or Die", "iiisandman", 2, "Ten cars, one floating neon track over a desert city, and a bomb that blows up last place every 30 seconds."], ["@hips/hypertrackmania-x-time-trial-racing", "HyperTrackMania X: Time Trial Racing", "hips", 0, "Arcade time trial racing on 18 tracks: loops, wallrides and jumps. Chase ranked ghosts, top the season leaderboard, earn crates and build your own tracks to share."]]], ["Survival", [["@liiv/survive-ragnarok", "Survive Ragnar\u00f6k", "liiv", 18, "Ragnarok Online meets Vampire Survivors. The old-school MMO you grew up on, rebuilt as a horde survival hunt. Midgard is burning, and the monsters come in waves: hundreds at a time, wave after wave. Step out of Sanctuary"], ["@vovafromttav/survival-at-disaster", "Survival at Disaster", "vovafromttav", 6, "Floods, tornadoes, meteors and acid rain hit the island town. Survive the round."], ["@fracture/building-66", "Building 66", "fracture", 4, "Norilsk, 1994. Seven night shifts in Building 66. Find the fuses, bring the power back, and do not look behind you."], ["@marcelpachole/enfo-s-team-survival", "Enfo's Team Survival", "marcelpachole", 4, "Elves vs the Scourge: up to 5 heroes hold Enfos against waves of undead."], ["@0toxika/spike-s-neon-survival", "Spike's Neon Survival", "0toxika", 4, "A pygmy hedgehog crunches neon worms across ten glowing arenas."], ["@travelingtt/hexagonal-arcology-builder-peak-oil-survival", "Hexagonal Arcology Builder (Peak Oil Survival)", "travelingtt", 3, "Build a hex arkology to 144,000 people before the oil runs out in 2040."]]], ["Platformers", [["@hips/super-smash-jayzee-brawl-ultimate-platform-fighter", "Super Smash Jayzee Brawl: Ultimate Platform Fighter", "hips", 15, "Knock your friends off a stained-glass stage. A fast platform fighter: smash, combo, tech and edgeguard across six stages, online or on the couch."], ["@yujiro/totally-normal-platformer", "Totally Normal Platformer", "yujiro", 3, "A cute little platformer. Nothing here is a trap. Probably."], ["@bigyahu/a-perfectly-normal-platformer", "A Perfectly Normal Platformer", "bigyahu", 0, "You navigate crumbling bridges, dodge incoming artillery, and face a hostile cube in a glitchy world that's falling apart. Every checkpoint, every choice, and every death shapes your path to the end."], ["@chucky/higher", "Higher", "chucky", 79, "Race up disco towers, candy mountains, and alien peaks in this toon-bright climbing arcade. Chase personal bests, unlock epic bean characters, and climb your way to the leaderboard."], ["@tiger/skyfall-rush", "Skyfall Rush", "tiger", 50, "Race across floating anime sky islands that crumble behind you. Dash, shove, and outrun the void."], ["@majid/parkour-rush", "Parkour Rush", "majid", 46, "You're racing against time through dynamic urban environments, vaulting over obstacles and scaling walls to reach the finish. Feel the adrenaline as you master fluid parkour movement and discover the fastest route to vic"]]], ["Horror", [["@lakaplay/cartoon-horror", "Cartoon horror", "lakaplay", 6, "Find 8 film reels in the foggy woods before Cartoon Cat and Cartoon Dog find you."], ["@nova_golem_79/horror-kill", "Horror Kill", "nova_golem_79", 3, "Hold the graveyard fire against waves of horrors crawling out of the moor fog."], ["@rexgaming_yt/the-lindenmann-part-two-horror", "The Lindenmann Part Two (Horror)", "rexgaming_yt", 3, "Part Two. The woods at night, a camcorder, a flashlight, a pistol, and the Lindenmann."], ["@ghost_dragon/ten-days-petsitting-horror", "Ten Days Petsitting (horror)", "ghost_dragon", 2, "Ten days pet-sitting the sweetest pet on the street. Something changes every day."], ["@op_nico/haunted-plushie-game-lingo-pals-horror-stories", "Haunted Plushie game: Lingo Pals Horror Stories", "op_nico", 1, "Learn the Chinese word, pick the right door, or she finds you."], ["@bomb_bo/cerebral-decay", "CEREBRAL DECAY", "bomb_bo", 31, "A fungus hunts your mind. Leave Shelter-09, scavenge the dark, keep your sanity."]]], ["Clickers & idle", [["@00ercruptedsupreme/1-clicker", "1 Clicker", "00ercruptedsupreme", 4, "Click the big 1, catch the golden 1, buy mines and super clickers, top the room."], ["@sharkyrex16/clicker-sim", "Clicker Sim", "sharkyrex16", 4, "click the gem, buy upgrades, rebirth, get stupid rich"], ["@ohtheicee/banana-clicker", "Banana Clicker", "ohtheicee", 3, "A giant banana in a field. Click it. Everyone's clicks count."], ["@0liver/dark-fountain-clicker", "Dark Fountain Clicker", "0liver", 2, "Feed the darkness, open fountains, and face the Roaring Knight and Titan in a Deltarune fan clicker."], ["@longthunder/cubemunity", "Cubemunity", "longthunder", 25, "A cozy community clicker. Break a giant cube together, one layer at a time."]]], ["Social hangouts", [["@binxius/jayzee-hangout", "Jayzee Hangout", "binxius", 2, "A lakeside town to meet up, talk and play: ski, skate, bowl, shoot pool and fire yourself out of a cannon."], ["@chucky/need-for-jayzee", "Need for Jayzee", "chucky", 39, "Build your street car in an underground garage, then run it hot on the night test track."], ["@dreamcatcher/jayzeedle", "Jayzeedle", "dreamcatcher", 26, "Guess the Jayzee game from one screenshot, every day. Plus Wordlock, Fours, Threads and Culprits."], ["@chizkeykkk/cat-haven", "Cat Haven", "chizkeykkk", 25, "A pink house in the clouds with a glass-domed cat yard. Carry the cats, pet them, run the cloud roads."], ["@longthunder/cubemunity", "Cubemunity", "longthunder", 25, "A cozy community clicker. Break a giant cube together, one layer at a time."], ["@ninjacatlive/dojo-city", "DOJO CITY", "ninjacatlive", 23, "Games \u2022 Casino \u2022 Social Hangout. A Ninja Cat World."]]], ["RPG", [["@gamex_feed/eldoria-rpg-120xp", "Eldoria [RPG] 120xp", "gamex_feed", 2, "A top-down pixel RPG: wake in Trade Central, pick a vocation, hunt, loot and level across ten biomes."], ["@causey/ascend-real-life-rpg", "Ascend: Real-Life RPG", "causey", 2, "Every real rep is XP. Level 11 RuneScape-style skills, unlock gear, track sober days, and cash in points for rewards you set."], ["@majid/rpg-fighter", "RPG Fighter", "majid", 1, "Ten RPG heroes, knight to dragoon: pick one and fight best of three in a burning pixel-art keep."], ["@izkimar/escape-from-stranglethorn", "Escape from Stranglethorn", "izkimar", 591, "Nine Human classes. A jungle full of valuables. Make it back to Booby Bay."], ["@izkimar/diablo-survivors", "Diablo Survivors", "izkimar", 177, "Pick your hero at the camp fire, step through the portal, survive the horde."], ["@yisus/aether-legends", "Aether Legends", "yisus", 67, "Invoca h\u00e9roes, forma tu escuadr\u00f3n de seis y rompe al Vac\u00edo con cadenas de Brave Burst."]]]];
