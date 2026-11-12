# extra docs: the Jayzee game API reference copy

## How it works

The directory /workspace/index/extra/docs holds a copy of the Jayzee game API reference as it was pulled for world 02e941af-9db1-4d86-b1fa-f7bca802c4b1 (the game-16 world). The copy has 71 markdown files: 00-opening.md, 01 to 68 numbered files, guide.md and skills.md. Each numbered file is one section of the reference. Almost all files are JSON wrappers around the section text. The wrapper has the fields appId 1e04de61-4225-4d57-8a79-b8e9bcef1c6e, engineVersion 6.0.0, era 6.0, playUrl https://www.jayzee.co/@lanmower/game-16, gitUrl https://git.jayzee.co/@lanmower/game-16.git, codeUrl https://www.jayzee.co/@lanmower/game-16/code, specVersion 0, guide (null on the section files), tomeApi (the markdown text of the section) and sections (the 68 headings in order). Only 00-opening.md is plain markdown. guide.md and skills.md are also JSON, with the guide text in the guide field and an error body in skills.md. The section text is what each subsection below summarises.

The reference is read by the docs door, a public API: ?section=<heading> answers one section, the list of headings is in sections, and ?section=all answers the whole reference. The guide says the same. The pull log is at extra/docs/pull-index.json (also extra/docs-pull-index.json, identical). It holds worldId 02e941af-9db1-4d86-b1fa-f7bca802c4b1, expectedSections 68, and 70 result rows. Each row records the section name, exit code, curl status, content type and byte count. Sixty-nine rows returned HTTP 200 with application/json. One row returned 404: section "skills", 1915 bytes. The 70 rows are the 68 reference sections plus the guide row and the skills row, so only the skills row failed.

The companion JSON files are in the same directory. sections.json and docs-sections.json are identical, 68 headings. skills.json holds the 23 skill entries (ids jayzee-engine, 2d-mode, buyables, cameras, fx, game-ui, geometry, heightmap-terrain, interactive-objects, jev, leaf-sprays, mobile-controls, physics, platform-systems, player-settings, pointer-raycasting, portals, projectiles, rooms-and-matchmaking, trees, uploaded-models, vehicles and voxel-terrain, each with a name and description). opening.json is the same wrapper as 01 with the skills list added.

### 00-opening.md (Jayzee game API, plain markdown)

Coordinates are in meters, Y up, negative Z forward. Rotations are in degrees unless a field says otherwise. Hook dt is in seconds. ctx.now() is milliseconds on the world clock. Object hooks receive ctx first: onJayzee(ctx), update(ctx, dt), onCollide(ctx, other, contact). ctx.self is the object. ctx.getObject(id) reads another object, ctx.query(selector) selects objects, and assigning a property on a handle changes it. On a 6.0 world, ctx.jayzee(spec) creates an object and ctx.destroy(id) removes it. A behavior path names a module in the world scripts directory, and the named hooks are exported from that module. physics omitted gives no collider, "static" a fixed solid and "dynamic" a moving body. feetPosition is the bottom centre, and flat primitives use their centre. Parent-relative positions and rotations are local to the parent. Runtime behavior edits change the running game, while authored file edits and ctx.commit(message, fn) save to the tree. player.state is saved player data, ctx.world.state is shared within the room and ctx.session is local scratch. Use ctx.now() for deadlines and ctx.random() for randomness. ctx.after(seconds, exportName, payload) calls a named export later. Asset fields hold CDN names or uploaded references, and a reference to a file in the tree must name a file that exists. Functions are imported from builtin/<module>. The page ends with a timer example that sets ctx.self.state.startedAt in onJayzee and computes elapsedSeconds in update.

### 01-spawn-game-api.md (Jayzee game API, JSON wrapper)

This file carries the same text as 00-opening.md, wrapped in the JSON fields listed above, and its sections list has the 68 headings. Its file name keeps the old name spawn on disk.

### 02-identity.md

Use player.userId for saved player records. The player entity id changes on each join. getObject returns null when the object does not exist. player.arrival.request holds { room, query } for the link the player opened. The query comes from the single linkQuery word of the link, so https://jayzee.co/@you/game?linkQuery=tab%3Dshop reads { tab: "shop" }, and no other query word reaches the game. It is read in onArrive(ctx, player). player.arrival.joining is the userId of the person who brought the player by a join or invite, and is absent for other arrivals. Listed members: ctx.self.id, player.userId, entity.objectId, entity.arrival with kind join, rejoin, link or rejayzee, entity.pocket and player.isLocal.

### 03-state.md

Assigning a whole state object replaces it. Assigning a field changes only that field, and deleting a field clears it. Changes through game handles are shared. player.state has no size cap, nests to any depth and loads whole at every join. A list or string is one value that every change sends and saves whole, so a large collection should be a record keyed by id. The page lists ctx.self.state, ctx.state, ctx.self.session, ctx.world (state, camera, inputs, assets, mode "dev" or "live", version, id, address, players, playerCount, onlineCount, date, places, engine, passThrough, routing, ui, player, godMode, creatorTabs, defaultPlace, settling, files), ctx.session, ctx.files.read, write and delete, ctx.view.camera, ctx.quality, ctx.self and ctx.place.

### 04-properties.md

Read and write ctx.self.<prop>. ctx.self.bounds is { min, max, size, center, obb, geometryPending? } or null.

### 05-movement.md

Velocity is in meters per second. The forces object holds named forces until the key is cleared with null. Force is in newtons and torque in newton-metres on world axes. Dynamic bodies accept forces. A character standing on a moving kinematic platform rides it, and its velocity is relative to the platform. Members: grounded, touching.wallLeft and wallRight, touching.ceiling, velocity, angularVelocity, forces.<key>, liquid.in, liquid.level and overlapping.

### 06-terrain.md

Functions: ctx.getWaterLevelAt(x, z, place?), ctx.readField(name, x, z, place?) and ctx.getTerrainNormal(x, z, place?). Field chunks are read and written at ctx.place.fields[name].runtime[chunk] and .authored[chunk], with a grid and cells. A runtime chunk is deleted with delete. ctx.place.fields[name].changes(at) returns { chunks, at }.

### 07-splines.md

Attach an object to a spline with ctx.self.spline = { id, at, orient?, offset? }.

### 08-camera.md

ctx.world.camera, with the live reads forward, fov, aspect and insetRight. aspect is the screen width divided by height. insetRight is the share of the width that the platform rail covers at the right edge, from 0 to 1. ctx.worldToScreen(position) returns { x, y, depth, onScreen } or null. Players have camera set to an object or null, isGodMode and isEditor.

### 09-selection.md

player.selection?.id reads the selection. Assign an entity or id to set it, and null to clear it. The guarded form clears the selection only when it still names the given id, and delete also clears it.

### 10-player.md

<player>.displayName is the only member listed.

### 11-timing.md

ctx.after(seconds, hookExport, payload) returns a timer id, and the callback receives (ctx, payload). ctx.cancel(id) cancels it. ctx.now() returns milliseconds. ctx.getTimers(ownerId?) lists timers with id, ownerId, dueInTicks, dueInSeconds, engineOwned and hook. Timing values are dt, ctx.dtMs, ctx.gapMs and ctx.world.settling.

### 12-jobs.md

Engine jobs: llm:chat, llm:generate, llm:clear, jev:decide, mail:send, chat:send, chat:history, player:token, player:names, text:check, image:generate, image:segment and video:generate. image:generate paints one picture per player per game (args prompt, width, height, transparent, tile; 1536 by 1024 pixels unless set; a tile texture repeats seamlessly). A player's next ask answers paint_spent, so the url is kept in player.state. image:segment finds things in a picture from a prompt and points, and returns one black and white PNG mask per thing found with its box and score. video:generate makes an .mp4 of 5 to 15 seconds from words and an optional first frame. A clip takes minutes, so it is asked from a cron and awaited with ctx.awaitJob(id). The page lists ctx.job(jobId, args, callback or hookExport, options), ctx.awaitJob and ctx.proposePurchase(buyer, itemId). The JobOptions table in named types gives priority (low, normal or high), deadlineMs, dedupeKey, retries and room. A platform job (llm:, image:, jev:) waits at most 800000 ms.

### 13-database.md

ctx.sql is the SqlAPI. Its members are size(), backup(label) and restore(target). The named types give the signatures.

### 14-clock.md

ctx.now().

### 15-the-changed-cursor-sim-js.md

ctx.changed(glob) returns { path, value, prev } for each change matching the glob.

### 16-random.md

ctx.random().

### 17-logging.md

ctx.log, ctx.warn and ctx.error, each taking any number of arguments.

### 18-events.md

ctx.emit(name, payload, options) sends an event, with an optional audience. ctx.on(name, handler, options) subscribes and returns an unsubscribe function. Options are place, to, via, audience, once.

### 19-spec-patches-scripts.md

Writes to ctx.place.atmosphere, ctx.world.player, ctx.world.camera, ctx.world.inputs, ctx.world.ui.render (for example 'scripts/hud.js'), ctx.world.creatorTabs, ctx.world.engine, ctx.world.routing ({ script, maxPlayers } or null), ctx.world.buyables.<id> (name, priceSpoins, minSpoins, imageUrl, description, onPurchase), ctx.world.godMode (enabled, scope, behavior, brushes, movement.flySpeed, movement.sprintMultiplier, movement.verticalSpeed, camera.fov, visuals.disableFog), ctx.world.places.<p> and ctx.world.defaultPlace. A root value replaces and a leaf merges. ctx.resolveControls(surface?) returns the touch surface and diagnostics.

### 20-world-queries.md

ctx.query(opts) returns ids, crossing records or object views, depending on the options (select "ids", scope "crossings" or the default). The query excludes the calling object unless ignoreSelf is false. ctx.place.players lists the place's players. This file repeats the "World Queries" heading and its body twice.

### 21-places.md

ctx.enterPlace(options) or ctx.enterPlace(entityId, options) moves a player or object to a place. Options are place, at ("last", "default" or a position) and createIfMissing. Members: <entity>.place, <player>.place and ctx.place.objects.

### 22-object-access.md

ctx.world.places.<p>, ctx.getRoomId(), ctx.presence(userIds), ctx.world.mode, ctx.getObject(id), <entity>.state, ctx.self.audio.params, ctx.getVibeAudio(id), <entity>.<prop>, ctx.getObjectBoneNames(id), ctx.getObjectMorphTargetNames(id), ctx.getObjectSocket(id, name), <entity>.children, and ctx.place.tiles[x][y] set, cleared or deleted.

### 23-lifecycle.md

ctx.jayzee(spec) and ctx.jayzee(id, spec) create an object and return its id. ctx.destroy(id), ctx.destroy(ids) and ctx.destroy with options { force } remove objects.

### 24-spec-mutation-god-mode.md

ctx.commit(message?, fn) runs fn and saves the change to the tree with an optional message.

### 25-control.md (JSON wrapper, tomeApi holds the Control section)

<entity>.controller can be set to ctx.self.id, to a player id, or to null. ctx.self.controller and ctx.self.controlling read the link.

### 26-trade.md

ctx.trade(mine, { with, for } or null) returns a TradeReceipt. Offered trades return an id, and refused trades return one of unknown-target, not-held, not-mine, same-party or withdrawn.

### 27-joints.md

ctx.self.joints[id] = { to, type, ... }, removed with delete. motor is { velocity, maxForce } and limits is [min, max] or { min, max, stiffness, damping }.

### 28-ragdoll.md

ctx.self.ragdoll = { ... } takes an object, and null releases it.

### 29-hierarchy.md

ctx.self.parent reads the parent. ctx.attach(entity, parent or null, offset?) attaches or detaches, and the offset may carry position, rotation, scale, pivot, attachment and replaces. ctx.sleep(seconds?) pauses a behavior.

### 30-dm-hooks.md

ctx.notifyDm(message, options) and ctx.notifyDmOnce(key, message, options) send a message to the creator. The options carry wake, to, link and a field named cleetus.

### 31-juice.md

A look layer pushed on <player>.look fades in over fade seconds (0.25 by default) to its intensity (0 to 1, default 1), and fades out when it is removed or its duration ends. Other members: <player>.letterbox, <player>.vignette (intensity or { intensity, color }), <player>.effects.<name>, <player>.look.push(script or { look, intensity, duration, fade, priority, params }), <player>.hidden, <player>.atmosphere, ctx.stopFx(id), ctx.pulseFx(id, name, opts), ctx.getFxState(id), <player>.music, <player>.ambience and ctx.music.

### 32-animation-mixer.md

ctx.self.anim.<ch> = { ... } sets an animation channel, and reading it returns the channel.

### 33-self.md

The ctx.self members: id, state, session, feetPosition, rotation, up, frame, target, view (yaw and pitch), pointerLock, fov, clip, orientation, sensitivity, minPitch, maxPitch, pixelSnap, hideLocalPlayer, projection ("perspective" or "orthographic") and layers.

### 34-the-local-player-on-a-camera-rig-alone.md

ctx.player is the local player when the object sits on a camera rig alone.

### 35-the-spine-the-same-members-every-behavior-ctx-carries.md

Every behavior ctx carries ctx.place and ctx.world.

### 36-state-the-compat-spellings-of-ctx-self-state.md

Compatible spellings of ctx.self.state: ctx.self.state, assignment of a whole object, and ctx.self.state.<key> = v.

### 37-properties-the-compat-spellings-of-ctx-self-feetposition-rotation.md

Compatible spellings for ctx.self.feetPosition and ctx.self.rotation, readable and writable.

### 38-behavior-hooks.md

Exports from a behavior module: onJayzee, onDestroy, update(ctx, dt), lateUpdate, onInput(ctx, input), onCollide, onTriggerEnter, onTriggerExit, onCross, onRefuse, onLiquidEnter, onLiquidExit, onSay, onSoundEnd, onOutOfBounds, onControlBegin, onControlEnd, and the editor and visual hooks. onInput reads named axes and actions from the world inputs. pressed and released apply on the transition, and held stays true while the action is held. updateSchedule is a data export, not a hook: every (a count of ticks or { seconds }) and near ({ radius }). update() runs only while a player is near, by default within about 500 m. An object with no position always runs. The schedule replaces a hand-rolled tick gate, and the page says never to keep both. async functions and import() are described: the part before the first await runs in the tick, and a module that only import() names stays out of arrival. An ears example loads a seeder module on match:start.

### 39-objectpropertiesspec-full.md

Full ObjectPropertiesSpec. It covers feetPosition, rotation (degrees, object or quaternion, or lookAt), yaw, scale, visible, shadows, primitive, sprite (texture, size, billboard, blend and more), room, path (tube with points or beziers), layout, material, physics (body kinds none, static, dynamic, kinematic and character; colliders; mass; friction; restitution; character controller fields; capsule height and radius), light (ambient, hemisphere, directional, point, spot, rect), audio (vibe, program or clip), interpolation, pivot, render, visibleRange, layers, visibleTo, vector, jiggle, morph, bones (rotate, offset, reach, aim, ground), wisp, boxart, collider2d, ui, air, press, fx, voice, model, mixer, attachment, spline and scatter. The note on physics.capsule says height and radius are in the object's own metres and scale multiplies them, and height is end to end including caps.

### 40-primitivespec-full.md

PrimitiveSpec kinds: cube, box, sphere, cylinder, capsule, plane, torus, octahedron, tube, cone, ring, tetrahedron, icosahedron, dodecahedron, pyramid, lathe, extrude, circle, torusKnot, frustum, ellipsoid, superellipsoid, hollowCylinder, hemisphere, arch, archway, squareArch, wall, line, custom, scripted and points. PrimitiveBase has materialKey, overrides and sockets. A scripted primitive's collider() may return a heightfield.

### 41-atmospheredef-full.md

atmosphere members: sky (color, gradient, rayleigh, or realistic with model rayleigh or hosek), ground, fog (linear or exp2), sun (rotation, orbit, light and shadow), ambient, hemisphere, environmentIntensity, clouds, stars, moon, wind, wet, rain, timeOfDay (0 to 24), cycle (periodMs and epoch, a frozen hour, or lengthSeconds with anchors) and look (script, filter, toneMapping from aces, neutral, none, linear, reinhard, cineon or agx, params and cube).

### 42-terraindef-heightmap-full.md

terrain kind "heightmap": seed, materials (id, albedo, pbr, tint, normal, roughness, textureScale, metalness, antiTiling, filter, macro), generator script, verticalRange, marks (sea, lake, river, path, road, flatten, clear-scatter and hole, each with its own fields), water (one liquid spec or a list) and material.

### 43-inputs-full.md

Key names are case-insensitive: a letter, a digit (the number row), a name (space, shift, ctrl, alt, enter, escape, backspace, delete, f1 to f12, the arrows) or a KeyboardEvent.code. Tab is reserved. Gamepad triggers are analog axes, Gamepad:LT and Gamepad:RT, from 0 to 1. InputAxisDef takes keys, mouse, gamepad and deadzone. InputActionDef takes keys, mouse, gamepad, modifiers, activeOn ("keydown", "hold" or "keyup"), touch and active. Gamepads are read as one by bindings, and ui.js reads each controller separately.

### 44-objectspec-full.md

ObjectSpec adds id, tags, state, behavior (a script path or a list), parent, children, place, audience ("near", "all" or "local"), visibility ("owner" or "platform"), lifetime and tick { phase "pre" or "post", order } on top of ObjectPropertiesSpec.

### 45-parenting-full.md

One example: ctx.jayzee with parent 'pole-0', a feetPosition of { x: 0, y: 3, z: 0 } and a sphere primitive of radius 0.25.

### 46-ui-rules-full.md

In ui.js, document.documentElement.requestFullscreen() fills the screen with the game, HUD and rail, and document.exitFullscreen() leaves. document.fullscreenEnabled is true on computers and Android phones and never on an iPhone.

### 47-named-types-full.md

The longest section, about 64 KB. It states that a world whose places all have mode "ui" draws nothing and so opens with no 3D graphics. highlightSet width is in pixels of a 1080p picture, defaulting to 2 for outline and about 16 for glow and pulse. It then gives the type tables: ActName and ActPayloads (damageNumber, playSound, stopSound, preload, fx, decal, slash, shockwave, screenShake, screenFlash, hitstop, cameraPunch, slowMo, replay, zoomTo, flash, shake, squash, impulse, highlightSet, highlightClear, outlinePage, uiEvent, haptic, milestone, stat, voxelMarkSet, voxelMarkClear, party and guild actions, openSettings, openAvatarEditor, openInvite and openShare), AnimationKeyframeValue, AssetMetadata, AtmosphereSunState, Audience, BehaviorHealth, BespokeGeometrySpec, CameraDef (custom and legacy), CreatorTabDef, CubicBezierSpec, EngineConfig, EngineInputAxes, EnterPlaceOptions, FieldChunkGrid, FilesAPI, FxState, InputPointer, InputState, InputsDef, JobError, JobOptions, JobResult, JointBreakEvent, JointOptions, JointType, JumpCheckResult, LightSpec, ObjectQueryOptions, ObjectQueryResult, ObjectView, OutOfBoundsEvent, OverlapResult, PlaceDef, PlaceMode ("3d", "2d-side", "2d-top" or "ui"), PlacePersistence ("ephemeral", "session" or "persistent"), PlayerQueryResult, PlayerProfile, PositionSpec, RaycastHit, RaycastVerdict, RoadRoadsideSpec, RotationSpec, RoutingDef, SaidLine, ScatterBounds, ScriptedMaterialSpec, SoundEndEvent, SplineSpec (kinds road, pipe, fence, hedge, powerline, wall, guardrail, handrail, railway, streetlight, stringlight, bannerline, conveyor, canal, curb, stairs, boardwalk, bollard, barrier, zipline, aqueduct, coaster, data-only and scripted), SplineStyle, StandardMaterialSpec, TerrainBrush, TomeCameraState, TradeReceipt, TraverseCheckResult, UIDef, UpdateSchedule, Vec3, ViewAPI (fps, drawCalls, triangles, cpuMs, gpuMs, scriptMs, physicsMs, fxMs, memoryMB, netInBytes and others, all read-only), VoxelCoord, VoxelRaycastHit and WaterMaterialSpec. Some fields carry notes: timeScale on a place (0 stops, 1 normal), latencyMs (read-only ping), the wind wave and swell fields of water, and preload warmups. NotifyDmOptions has a field named cleetus.

### 48-builtin-physics.md

raycast defaults to 200 metres and ignores the caller. overlapPoint and overlapSegment return volumes. traverseCheck returns traversable, reason and detail, with a default step height of 0.3 m. jumpCheck and getInputRay are listed. createWorld(opts) makes a private physics world that moves only on step(dt), and save() and restore(bytes) snapshot it. The page says the world is deterministic on one engine build, so a rollback game can restore a save and step to the present. About 50 moving bodies cost about 1.5 ms on a phone.

### 49-builtin-tween.md

animate(ctx, target, keyframes, opts) with duration and delay in seconds, easing, direction (normal, reverse or alternate) and loop.

### 50-builtin-spline.md

splineLength(ctx, id) returns metres, or 0 for a non-spline id. sampleSpline(ctx, id, at, opts) takes at from 0 to 1 by default, or distance in metres with space "distance". projectToSpline(ctx, id, point, opts) returns the nearest sample.

### 51-builtin-math.md

clamp, clamp01, lerp (for numbers and for OKLCH colour strings), smoothstep, inverseLerp, remap, shortestArc (degrees, in (-180, 180]), stepAngle (smoothing default 0.06 s, 0 turns at once), degToRad and radToDeg.

### 52-builtin-vec3.md

Vector helpers add, sub, scale, dot, length, normalize, distance and cross, and rotation helpers directionFromYawPitch, rotate, rotationFromDirection (default axis -z), rotationFromEuler and eulerFromRotation. Vectors accept {x, y, z} or [x, y, z]. A number as a rotation means yaw. Euler order is yaw, pitch and roll about +Y, +X and +Z. Yaw 0 faces -Z.

### 53-builtin-easing.md

Twenty-four easing functions, each taking t in [0, 1]: linear, easeOutBounce, and in, out and in-out forms of Quad, Cubic, Quart, Quint, Sine, Expo and Circ.

### 54-builtin-nav.md

findPath(ctx, from, to, opts) returns feet positions. ok false means a cut-off path ending at the reachable spot nearest the goal. partial true means the search is still reading the ground and should be asked again on a later tick. An empty list with no partial means no path. maxDrop defaults to 3 m and bodies to all.

### 55-builtin-path.md

createPath(points, opts) with spacing default 2 m and optional closed and smooth. PathHandle has points, closed, length, distance(x, z, within), nearest(x, z, within) and at(arcLength). distance returns Infinity and nearest returns null beyond within. at wraps on a closed path and clamps on an open one.

### 56-builtin-ballistics.md

solveShot(from, to, speed, g, lead) returns { vel, time } or null for an unreachable target, with speed in m/s. elevation(speed, g, distance, rise) returns the low angle in radians or null.

### 57-builtin-room-routing.md

Used only in a routing script that exports pickRoom(ctx). firstOpenRoom, mostFullWithSpace (null when none has space), nextRoomName and roomFor(key), which gives a stable room name for a key.

### 58-builtin-terrain.md

shore(height, level, opts) changes heights near a water level. Defaults: apron 6, berm 0.3, grade 0.06, rejoin 24, shelf 2.2, shelfReach 6, drop 20 and scale 1.

### 59-builtin-noise.md

simplex2, simplex3, fbm2, ridged, billowed2, gradient2, domainWarp2, voronoi2, white2, and makeSeededRng with next, double, int32, uint32 and range.

### 60-builtin-voxels.md

VoxelPart with set, fill, hollowBox, sphere, cylinder, cone, pyramid, torus, line, add, bounds and serialize (version 1 with a palette). Brushes: material(id), checker(a, b), random(ids, weights) and noise(ids, opts).

### 61-builtin-vibe.md

The audio script exports pattern(ctx). ctx.params holds the audio parameters, and tempo is set with setBpm, setCps or setSwing. The default bus is Music. gain runs from 0 to 2, and paused true stops the transport. Sample names are listed at /cdn/vibe-samples/manifest.json. Banks are named as the manifest spells them, with pitched instrument sets, synths (sawtooth, square, sine, triangle), one-shot families and short words (bd, sn, hh, cp, kick, snare, hat, clap, ride, tom, piano, pad, bass, bell, pluck, resolve). An instrument word alone is a silent voice, and an unknown sample raises the vibe.sample.unknown DM. Pattern methods and helpers (note, s, stack, seq, silence, mini, arrange, scale, progression, arp, chord, smoothstep, mapRange) are listed.

### 62-builtin-fx.md

Export effect(ctx) from the effect script, and return fx(...populations). Rate is particles per second, lifetime, delay and window are seconds, size is metres and rotation radians, alpha is 0 to 1. World space is the default and an omitted lifetime does not expire. Effects are emitted with emit("fx", ...), pulsed with ctx.pulseFx, and read with ctx.getFxState. Sinks are sprite, mesh, ribbon and light, with align options for sprites such as "ground". Child populations use when(other.dies) and when(other.lives), and parent(name) reads the parent each tick.

### 63-builtin-tsl.md

Shader time is (ctx.now() / 1000) % 3600 seconds. uv() reads the first UV set and uv(1) to uv(3) read the later sets. audioLevel and audioSpectrum(x) read the sound the player hears, from 0 to 1, with x from 20 Hz at 0 to 20 kHz at 1. objectWorldMatrix(id), objectPosition, objectScale and objectDirection read a thing's interpolated pose on screen, and a thing not drawn reads 0. The page lists the TSL inputs, math and noise functions, structure helpers, compute with instancedArray and atomics (atomicAdd, atomicSub, atomicMax, atomicMin, atomicAnd, atomicOr, atomicXor), and workgroup helpers.

### 64-builtin-three.md

Export material(ctx) from a material script, and return a three.js node material. ctx.param(name, default) is a declared parameter, scaled with .mul() and never JavaScript *. Opacity is 0 to 1, and transparent must be set for alpha. Line rows use LineBasicNodeMaterial or Line2NodeMaterial, where linewidth is in CSS pixels. PointsNodeMaterial draws round unlit points, and a crowd of dots a pixel or two wide should be a points row rather than copies of a tiny mesh. The page lists material constructors, blending, filter and wrap constants, StorageTexture, Storage3DTexture, DataTexture and Data3DTexture, and ctx.params, ctx.texture (including canvas://<id>), ctx.field, ctx.terrain, ctx.tile, ctx.sprite, ctx.view, ctx.portal, ctx.fx and ctx.device (class, quality levels low, medium, high and ultra).

### 65-builtin-lighting.md

Exports: sunDirection, sunRadiance, ambientRadiance, wet, rain, windDirection, windSpeed, windTravel, fogColor(toward), sunVisibility(P), lightsAt(P, { shadow }), lightCount(P), lightRadiance(P, i) and lightPosition(P, i).

### 66-builtin-water.md

Shader helpers for water: waterRippleSlope, waterFoam, waterFoamField, waterFoamFieldLod, waterFoamCoverage, waterTransmittance, waterMedium, waterUnderwaterDistortion, waterRayBoxDistance, waterCaustics, waterCausticsAt, waterCausticsRefracted and waterFresnel.

### 67-builtin-env.md

envAt(ctx, point) returns wind (flow), rain, light, charge, water { depth, flow }, and cloud at a point.

### 68-builtin-postfx.md

A look export returns the final colour and starts from ctx.scene. Colour functions are grade, vignette (defaults roundness 2 and feather 0.45), grain, film, tint, scanlines, dotScreen, chromaticAberration, dof (focusDistance and focusRange in metres, bokehScale in pixels), pixelate and blur (amount 0 to 1). bloom is configured by the look's bloomStrength, bloomRadius and bloomThreshold parameters. Antialiasing is a per-player setting in Settings and is not part of a look.

### guide.md (the world guide, JSON wrapper, guide field)

The guide is the world's AGENTS.md text for the game-16 world. Its main points: the tree is the world, so a push to main reaches every open room with no build and no deploy. The game is three.js in files, with an object as a row of geometry and material fields, a behaviour as a module with update(ctx, dt), and the HUD as HTML in scripts/ui.js. The world tree is laid out as world.config.yaml, places/<place>/config.yaml, places/<place>/cells/x<cx>z<cz>.scene (128 m cells, cx equal to round(x / 128), with the header line "# jayzee-scene v2 yaml <cellKey>"), templates/<name>.js, scripts/**/*.js, sim.js (one copy per room), skills/<name>.md, commands/<name>.md, design.md, source/** and the files AGENTS.md, CLAUDE.md, README.md and .jayzee/ which the room never receives. Art is referenced as a CDN name such as /cdn/model-knight.glb. Own art goes up by bytes through a PUT to /api/sdk/v1/<worldId>/assets/value.<sha256>.<ext> (about 4.5 MB request cap, with a 413 answer above it), or through upload-target and a storage PUT for larger files. A worked example places one cube in places/main/cells/x0z0.scene. The guide gives the eight verbs of ctx and the page rules. A push never publishes: POST /api/games/{appId}/publish publishes. The page section explains the html.jayzee-world-shown class, the data-jayzee-stood attribute, the kernel and game iframes, the WebGPU flags for a headless browser without a GPU, the navigator.webdriver marker and the JayzeeProbe user-agent suffix. It also covers the packaged client (@jayzeeco/client), the jayzee preview command, the rail that belongs to the platform, the commit message rule (the first line lands in the creator's chat) and the door list (agent me, worlds, agent/rooms, agent/logs, agent/exec, agent/docs, login-link and notifications). The guide shows token placeholders only, and no token is recorded here.

### skills.md (a 404 error body)

The docs door answered the section name "skills" with HTTP 404 and JSON: error section_not_found, "No section named \"skills\" in this world's API reference", with the nearest section Camera. The skill list is in skills.json, and no skill text is stored.

## Decisions

- Keep the text of the reference as an exact copy. Each numbered file carries the reference text exactly as the door returned it (in tomeApi), with the same wrapper fields, so a reader can compare it with the live door.
- Pull by section, not as one file. The docs door answers one section per request, so the pull log records each section and the index keeps one file per section. The pull log shows the status and byte count for every section.
- Duplicate pull indexes kept. docs-pull-index.json and docs/pull-index.json are identical, and docs-sections.json and docs/sections.json are identical. The pull index is kept in both places, so each path can be found.
- Guide content kept as text. The guide describes the reference and skills as served over HTTP. The index keeps the text itself and holds no links to live doors.
- Names kept as the source wrote them. Field names such as cleetus in NotifyDmOptions are kept verbatim.

## Open gaps

- The skills section is not in the reference. The docs door returns 404 for it, so the skill text is not captured. skills.json lists 23 ids and descriptions, and no skill body.
- The section 20-world-queries.md repeats its heading and body. The copy is kept as the door returned it.
- The 00-opening.md file and the JSON wrappers hold the same text, so the same reference is stored in two forms.
- The guide says the whole reference is also api-reference.md at the root of the engine repository at git.jayzee.co/engine/6.0.0.git. That repository is not in the index.
- The reference says a section can be read with ?section=all. The index holds one file per section, and no whole-reference file.
- The engine version is 6.0.0 with specVersion 0. The index does not record a later version.

## Sources

- /workspace/index/extra/docs/00-opening.md
- /workspace/index/extra/docs/01-spawn-game-api.md
- /workspace/index/extra/docs/02-identity.md
- /workspace/index/extra/docs/03-state.md
- /workspace/index/extra/docs/04-properties.md
- /workspace/index/extra/docs/05-movement.md
- /workspace/index/extra/docs/06-terrain.md
- /workspace/index/extra/docs/07-splines.md
- /workspace/index/extra/docs/08-camera.md
- /workspace/index/extra/docs/09-selection.md
- /workspace/index/extra/docs/10-player.md
- /workspace/index/extra/docs/11-timing.md
- /workspace/index/extra/docs/12-jobs.md
- /workspace/index/extra/docs/13-database.md
- /workspace/index/extra/docs/14-clock.md
- /workspace/index/extra/docs/15-the-changed-cursor-sim-js.md
- /workspace/index/extra/docs/16-random.md
- /workspace/index/extra/docs/17-logging.md
- /workspace/index/extra/docs/18-events.md
- /workspace/index/extra/docs/19-spec-patches-scripts.md
- /workspace/index/extra/docs/20-world-queries.md
- /workspace/index/extra/docs/21-places.md
- /workspace/index/extra/docs/22-object-access.md
- /workspace/index/extra/docs/23-lifecycle.md
- /workspace/index/extra/docs/24-spec-mutation-god-mode.md
- /workspace/index/extra/docs/25-control.md
- /workspace/index/extra/docs/26-trade.md
- /workspace/index/extra/docs/27-joints.md
- /workspace/index/extra/docs/28-ragdoll.md
- /workspace/index/extra/docs/29-hierarchy.md
- /workspace/index/extra/docs/30-dm-hooks.md
- /workspace/index/extra/docs/31-juice.md
- /workspace/index/extra/docs/32-animation-mixer.md
- /workspace/index/extra/docs/33-self.md
- /workspace/index/extra/docs/34-the-local-player-on-a-camera-rig-alone.md
- /workspace/index/extra/docs/35-the-spine-the-same-members-every-behavior-ctx-carries.md
- /workspace/index/extra/docs/36-state-the-compat-spellings-of-ctx-self-state.md
- /workspace/index/extra/docs/37-properties-the-compat-spellings-of-ctx-self-feetposition-rotation.md
- /workspace/index/extra/docs/38-behavior-hooks.md
- /workspace/index/extra/docs/39-objectpropertiesspec-full.md
- /workspace/index/extra/docs/40-primitivespec-full.md
- /workspace/index/extra/docs/41-atmospheredef-full.md
- /workspace/index/extra/docs/42-terraindef-heightmap-full.md
- /workspace/index/extra/docs/43-inputs-full.md
- /workspace/index/extra/docs/44-objectspec-full.md
- /workspace/index/extra/docs/45-parenting-full.md
- /workspace/index/extra/docs/46-ui-rules-full.md
- /workspace/index/extra/docs/47-named-types-full.md
- /workspace/index/extra/docs/48-builtin-physics.md
- /workspace/index/extra/docs/49-builtin-tween.md
- /workspace/index/extra/docs/50-builtin-spline.md
- /workspace/index/extra/docs/51-builtin-math.md
- /workspace/index/extra/docs/52-builtin-vec3.md
- /workspace/index/extra/docs/53-builtin-easing.md
- /workspace/index/extra/docs/54-builtin-nav.md
- /workspace/index/extra/docs/55-builtin-path.md
- /workspace/index/extra/docs/56-builtin-ballistics.md
- /workspace/index/extra/docs/57-builtin-room-routing.md
- /workspace/index/extra/docs/58-builtin-terrain.md
- /workspace/index/extra/docs/59-builtin-noise.md
- /workspace/index/extra/docs/60-builtin-voxels.md
- /workspace/index/extra/docs/61-builtin-vibe.md
- /workspace/index/extra/docs/62-builtin-fx.md
- /workspace/index/extra/docs/63-builtin-tsl.md
- /workspace/index/extra/docs/64-builtin-three.md
- /workspace/index/extra/docs/65-builtin-lighting.md
- /workspace/index/extra/docs/66-builtin-water.md
- /workspace/index/extra/docs/67-builtin-env.md
- /workspace/index/extra/docs/68-builtin-postfx.md
- /workspace/index/extra/docs/guide.md
- /workspace/index/extra/docs/skills.md
- /workspace/index/extra/docs/skills.json
- /workspace/index/extra/docs/sections.json
- /workspace/index/extra/docs/pull-index.json
- /workspace/index/extra/docs/opening.json
- /workspace/index/extra/docs-pull-index.json
- /workspace/index/extra/docs-sections.json
