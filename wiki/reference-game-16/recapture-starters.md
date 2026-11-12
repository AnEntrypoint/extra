# Game page section: Starters: text not in the capture

The Starters section of the toolbox, read on load, after a scroll, and after a click on each control that does not change state. Only text, headings, links, images and code that the first capture does not hold are listed.

## Items not in the capture

| Item | Count |
| --- | --- |
| Headings | 6 |
| Visible text blocks | 54 |
| Hidden text blocks | 0 |
| Links | 0 |
| Images | 0 |
| Code or data blocks | 5 |

## Present on load, not in the capture

None found on load.

## Loaded after a scroll, not in the capture

None found after the scroll.

## Loaded after a click, not in the capture

### After clicking "files →"

- H2: 3D world 3d
- H3: scripts/player.js

← all starters

3D world 3d

First-person body, mouse look, jump, open sky, placeholder ground and grass. 20 files. Pick one to read it.

places/main/cells/objects.sceneplaces/main/config.yamlscripts/arrival.jsscripts/camera.jsscripts/flat-starter-terrain.jsscripts/grass-look.jsscripts/grass.jsscripts/humanoid-locomotion.jsscripts/lib/data/camera.ymlscripts/lib/data/player.ymlscripts/lib/data/world.ymlscripts/lighting.jsscripts/look-default.jsscripts/player.jsscripts/ui.jssim.jstemplates/camera.jstemplates/player.jsui/nametag.jsworld.config.yaml

places/main/cells/objects.scene

places/main/config.yaml

scripts/arrival.js

scripts/camera.js

scripts/flat-starter-terrain.js

scripts/grass-look.js

scripts/grass.js

scripts/humanoid-locomotion.js

scripts/lib/data/camera.yml

scripts/lib/data/player.yml

scripts/lib/data/world.yml

scripts/lighting.js

scripts/look-default.js

scripts/player.js

scripts/ui.js

templates/camera.js

templates/player.js

ui/nametag.js

world.config.yaml

// The player's own movement: WASD relative to the camera's aim, jump, gravity: on the // character controller. A body is three writes: feetPosition puts it there, velocity asks the // controller to take it there (held until the next write: it slides, steps and grounds), forces // push until null. Numbers live in lib/data/player.yml; gravity is the PLACE's // (places/<p>/config.yaml gravity:), so a district that declares its own pulls on you the // moment you step in. The body arrives dressed by the join: the template's model, else the card's // avatar, and its own file carries Idle, Walk, Run, Sprint, Jump; any other clip is an address on a // mixer channel (anim.sit = "cdn/clip-sit-loop.glb": →animations). import PLAYER from './lib/data/player.yml' // The keys' intent is this machine's alone: onInput writes it, update() reads it, nobody else does: // and a value written to state rides the wire and the save on every tick it changes (the intent turns // with the camera, so a running player would send a row a tick). ctx.self.session is this body's own // scratch on this machine, never on the wire, gone with the body. Every script the body wears shares // that one object, so this script keeps its intent under its own file name, where no other script's // key lands. function walkOf(ctx) { return (ctx.self.session['player.js'] ??= {}) } export function onInput(ctx, input) { const facingSin = input.axes.aimYawSin ?? 0 const facingCos = input.axes.aimYawCos ?? 1 const moveX = input.axes.moveX ?? 0 const moveZ = input.axes.moveZ ?? 0 const mag = Math.hypot(moveX, moveZ) const nx = mag > 1 ? moveX / mag : moveX const nz = mag > 1 ? moveZ / mag : moveZ // Where the keys point, at walking speed: the INTENT update() eases the body toward every tick. // Written as intent, never straight into velocity: a key is a level (full or nothing) and a body // that jumps to 6 m/s the tick a key lands overshoots every tap; the ease makes a tap a nudge. walkOf(ctx).moveIntent = { x: (facingCos * nx - facingSin * nz) * PLAYER.walkSpeed, z: -(facingSin * nx + facingCos * nz) * PLAYER.walkSpeed, } // The jump is your y; x and z stay what the body did last tick (y reads 0 on the ground). // A seated body does not jump: the seat carries it, and a held y would lift it off the seat. if (input.pressed.jump && ctx.self.grounded && !ctx.self.parent) { const v = ctx.self.velocity ctx.self.velocity = { x: v.x, y: PLAYER.jumpSpeed, z: v.z } } } export function update(ctx, dt) { // Seated (attached to a hull, a mount): the seat carries the body: the legs rest. if (ctx.self.parent) return // What the body did last tick; y reads 0 on the ground. const v = ctx.self.velocity // The stride: ease the ground velocity toward the keys' intent: acceleration while the keys point // the way the body already moves, deceleration back to rest when none is down or the keys reverse // (both m/s², lib/data/player.yml). One capped step per tick, so a held key reaches walkSpeed in // walkSpeed / acceleration seconds and a release stops in walkSpeed / deceleration; a body stopped // by a wall reads 0 and pushes again from there. const intent = walkOf(ctx).moveIntent ?? { x: 0, z: 0 } const along = intent.x * v.x + intent.z * v.z > 0 || (v.x === 0 && v.z === 0 && (intent.x !== 0 || intent.z !== 0)) const step = (along ? PLAYER.acceleration : PLAYER.deceleration) * dt const dx = intent.x - v.x const dz = intent.z - v.z const gap = Math.hypot(dx, dz) const k = gap > step ? step / gap : 1 const vx = v.x + dx * k const vz = v.z + dz * k // Gravity is yours: the held velocity walks the body; bend its y every tick. ctx.self.velocity = { x: vx, y: v.y + ctx.place.gravity.y * dt, z: vz } // Standing on the ground with no word to walk: nothing changes until something moves the body or a key // is pressed: both wake this update (a row of the body written, or onInput running). if (ctx.self.grounded && vx === 0 && vz === 0 && intent.x === 0 && intent.z === 0) ctx.sleep() }

#### Block 1

````text
// The player's own movement: WASD relative to the camera's aim, jump, gravity: on the
// character controller. A body is three writes: feetPosition puts it there, velocity asks the
// controller to take it there (held until the next write: it slides, steps and grounds), forces
// push until null. Numbers live in lib/data/player.yml; gravity is the PLACE's
// (places/<p>/config.yaml gravity:), so a district that declares its own pulls on you the
// moment you step in. The body arrives dressed by the join: the template's model, else the card's
// avatar, and its own file carries Idle, Walk, Run, Sprint, Jump; any other clip is an address on a
// mixer channel (anim.sit = "cdn/clip-sit-loop.glb": →animations).
import PLAYER from './lib/data/player.yml'

// The keys' intent is this machine's alone: onInput writes it, update() reads it, nobody else does:
// and a value written to state rides the wire and the save on every tick it changes (the intent turns
// with the camera, so a running player would send a row a tick). ctx.self.session is this body's own
// scratch on this machine, never on the wire, gone with the body. Every script the body wears shares
// that one object, so this script keeps its intent under its own file name, where no other script's
// key lands.
function walkOf(ctx) {
  return (ctx.self.session['player.js'] ??= {})
}

export function onInput(ctx, input) {
  const facingSin = input.axes.aimYawSin ?? 0
  const facingCos = input.axes.aimYawCos ?? 1

  const moveX = input.axes.moveX ?? 0
  const moveZ = input.axes.moveZ ?? 0
  const mag = Math.hypot(moveX, moveZ)
  const nx = mag > 1 ? moveX / mag : moveX
  const nz = mag > 1 ? moveZ / mag : moveZ

  // Where the keys point, at walking speed: the INTENT update() eases the body toward every tick.
  // Written as intent, never straight into velocity: a key is a level (full or nothing) and a body
  // that jumps to 6 m/s the tick a key lands overshoots every tap; the ease makes a tap a nudge.
  walkOf(ctx).moveIntent = {
    x: (facingCos * nx - facingSin * nz) * PLAYER.walkSpeed,
    z: -(facingSin * nx + facingCos * nz) * PLAYER.walkSpeed,
  }

  // The jump is your y; x and z stay what the body did last tick (y reads 0 on the ground).
  // A seated body does not jump: the seat carries it, and a held y would lift it off the seat.
  if (input.pressed.jump && ctx.self.grounded && !ctx.self.parent) {
    const v = ctx.self.velocity
    ctx.self.velocity = { x: v.x, y: PLAYER.jumpSpeed, z: v.z }
  }
}

export function update(ctx, dt) {
  // Seated (attached to a hull, a mount): the seat carries the body: the legs rest.
  if (ctx.self.parent) return
  // What the body did last tick; y reads 0 on the ground.
  const v = ctx.self.velocity
  // The stride: ease the ground velocity toward the keys' intent: acceleration while the keys point
  // the way the body already moves, deceleration back to rest when none is down or the keys reverse
  // (both m/s², lib/data/player.yml). One capped step per tick, so a held key reaches walkSpeed in
  // walkSpeed / acceleration seconds and a release stops in walkSpeed / deceleration; a body stopped
  // by a wall reads 0 and pushes again from there.
  const intent = walkOf(ctx).moveIntent ?? { x: 0, z: 0 }
  const along = intent.x * v.x + intent.z * v.z > 0 || (v.x === 0 && v.z === 0 && (intent.x !== 0 || intent.z !== 0))
  const step = (along ? PLAYER.acceleration : PLAYER.deceleration) * dt
  const dx = intent.x - v.x
  const dz = intent.z - v.z
  const gap = Math.hypot(dx, dz)
  const k = gap > step ? step / gap : 1
  const vx = v.x + dx * k
  const vz = v.z + dz * k
  // Gravity is yours: the held velocity walks the body; bend its y every tick.
  ctx.self.velocity = { x: vx, y: v.y + ctx.place.gravity.y * dt, z: vz }
  // Standing on the ground with no word to walk: nothing changes until something moves the body or a key
  // is pressed: both wake this update (a row of the body written, or onInput running).
  if (ctx.self.grounded && vx === 0 && vz === 0 && intent.x === 0 && intent.z === 0) ctx.sleep()
}

````


### After clicking "3d-voxels"

- H2: Block world 3d-voxels

Block world 3d-voxels

Solid voxel field, left click digs, right click places. Biomes, ore and caves come from its generator. 19 files. Pick one to read it.

places/main/cells/objects.sceneplaces/main/config.yamlscripts/arrival.jsscripts/camera.jsscripts/dig.jsscripts/humanoid-locomotion.jsscripts/lib/data/camera.ymlscripts/lib/data/dig.ymlscripts/lib/data/player.ymlscripts/lib/data/world.ymlscripts/look-default.jsscripts/player.jsscripts/ui.jsscripts/voxel-terrain.jssim.jstemplates/camera.jstemplates/player.jsui/nametag.jsworld.config.yaml

scripts/dig.js

scripts/lib/data/dig.yml

scripts/voxel-terrain.js

// The player's own movement: WASD relative to the camera's aim, jump, gravity: on the // character controller. A body is three writes: feetPosition puts it there, velocity asks the // controller to take it there (held until the next write: it slides, steps and grounds), forces // push until null. Numbers live in lib/data/player.yml; gravity is the PLACE's // (places/<p>/config.yaml gravity:), so a district that declares its own pulls on you the // moment you step in. The body arrives dressed by the join: the template's model, else the card's // avatar, and its own file carries Idle, Walk, Run, Sprint, Jump; any other clip is an address on a // mixer channel (anim.sit = "cdn/clip-sit-loop.glb": →animations). import PLAYER from './lib/data/player.yml' // The keys' intent is this machine's alone: onInput writes it, update() reads it, nobody else does: // and a value written to state rides the wire and the save on every tick it changes (the intent turns // with the camera, so a running player would send a row a tick). ctx.self.session is this body's own // scratch on this machine, never on the wire, gone with the body. Every script the body wears shares // that one object, so this script keeps its intent under its own file name, where no other script's // key lands. function walkOf(ctx) { return (ctx.self.session['player.js'] ??= {}) } export function onInput(ctx, input) { const facingSin = input.axes.aimYawSin ?? 0 const facingCos = input.axes.aimYawCos ?? 1 const moveX = input.axes.moveX ?? 0 const moveZ = input.axes.moveZ ?? 0 const mag = Math.hypot(moveX, moveZ) const nx = mag > 1 ? moveX / mag : moveX const nz = mag > 1 ? moveZ / mag : moveZ // Where the keys point, at walking speed: the INTENT update() eases the body toward every tick. // Written as intent, never straight into velocity: a key is a level (full or nothing) and a body // that jumps to 6 m/s the tick a key lands overshoots every tap; the ease makes a tap a nudge. walkOf(ctx).moveIntent = { x: (facingCos * nx - facingSin * nz) * PLAYER.walkSpeed, z: -(facingSin * nx + facingCos * nz) * PLAYER.walkSpeed, } // The jump is your y; x and z stay what the body did last tick (y reads 0 on the ground). // A seated body does not jump: the seat carries it, and a held y would lift it off the seat. if (input.pressed.jump && ctx.self.grounded && !ctx.self.parent) { const v = ctx.self.velocity ctx.self.velocity = { x: v.x, y: PLAYER.jumpSpeed, z: v.z } } } export function update(ctx, dt) { // Seated (attached to a hull, a mount): the seat carries the body: the legs rest. if (ctx.self.parent) return // What the body did last tick; y reads 0 on the ground. const v = ctx.self.velocity // The stride: ease the ground velocity toward the keys' intent: acceleration while the keys point // the way the body already moves, deceleration back to rest when none is down or the keys reverse // (both m/s², lib/data/player.yml). One capped step per tick, so a held key reaches walkSpeed in // walkSpeed / acceleration seconds and a release stops in walkSpeed / deceleration; a body stopped // by a wall reads 0 and pushes again from there. const intent = walkOf(ctx).moveIntent ?? { x: 0, z: 0 } const along = intent.x * v.x + intent.z * v.z > 0 || (v.x === 0 && v.z === 0 && (intent.x !== 0 || intent.z !== 0)) const step = (along ? PLAYER.acceleration : PLAYER.deceleration) * dt const dx = intent.x - v.x const dz = intent.z - v.z const gap = Math.hypot(dx, dz) const k = gap > step ? step / gap : 1 const vx = v.x + dx * k const vz = v.z + dz * k // Gravity is yours: the held velocity walks the body; bend its y every tick. ctx.self.velocity = { x: vx, y: v.y + ctx.place.gravity.y * dt, z: vz } }

#### Block 1

````text
// The player's own movement: WASD relative to the camera's aim, jump, gravity: on the
// character controller. A body is three writes: feetPosition puts it there, velocity asks the
// controller to take it there (held until the next write: it slides, steps and grounds), forces
// push until null. Numbers live in lib/data/player.yml; gravity is the PLACE's
// (places/<p>/config.yaml gravity:), so a district that declares its own pulls on you the
// moment you step in. The body arrives dressed by the join: the template's model, else the card's
// avatar, and its own file carries Idle, Walk, Run, Sprint, Jump; any other clip is an address on a
// mixer channel (anim.sit = "cdn/clip-sit-loop.glb": →animations).
import PLAYER from './lib/data/player.yml'

// The keys' intent is this machine's alone: onInput writes it, update() reads it, nobody else does:
// and a value written to state rides the wire and the save on every tick it changes (the intent turns
// with the camera, so a running player would send a row a tick). ctx.self.session is this body's own
// scratch on this machine, never on the wire, gone with the body. Every script the body wears shares
// that one object, so this script keeps its intent under its own file name, where no other script's
// key lands.
function walkOf(ctx) {
  return (ctx.self.session['player.js'] ??= {})
}

export function onInput(ctx, input) {
  const facingSin = input.axes.aimYawSin ?? 0
  const facingCos = input.axes.aimYawCos ?? 1

  const moveX = input.axes.moveX ?? 0
  const moveZ = input.axes.moveZ ?? 0
  const mag = Math.hypot(moveX, moveZ)
  const nx = mag > 1 ? moveX / mag : moveX
  const nz = mag > 1 ? moveZ / mag : moveZ

  // Where the keys point, at walking speed: the INTENT update() eases the body toward every tick.
  // Written as intent, never straight into velocity: a key is a level (full or nothing) and a body
  // that jumps to 6 m/s the tick a key lands overshoots every tap; the ease makes a tap a nudge.
  walkOf(ctx).moveIntent = {
    x: (facingCos * nx - facingSin * nz) * PLAYER.walkSpeed,
    z: -(facingSin * nx + facingCos * nz) * PLAYER.walkSpeed,
  }

  // The jump is your y; x and z stay what the body did last tick (y reads 0 on the ground).
  // A seated body does not jump: the seat carries it, and a held y would lift it off the seat.
  if (input.pressed.jump && ctx.self.grounded && !ctx.self.parent) {
    const v = ctx.self.velocity
    ctx.self.velocity = { x: v.x, y: PLAYER.jumpSpeed, z: v.z }
  }
}

export function update(ctx, dt) {
  // Seated (attached to a hull, a mount): the seat carries the body: the legs rest.
  if (ctx.self.parent) return
  // What the body did last tick; y reads 0 on the ground.
  const v = ctx.self.velocity
  // The stride: ease the ground velocity toward the keys' intent: acceleration while the keys point
  // the way the body already moves, deceleration back to rest when none is down or the keys reverse
  // (both m/s², lib/data/player.yml). One capped step per tick, so a held key reaches walkSpeed in
  // walkSpeed / acceleration seconds and a release stops in walkSpeed / deceleration; a body stopped
  // by a wall reads 0 and pushes again from there.
  const intent = walkOf(ctx).moveIntent ?? { x: 0, z: 0 }
  const along = intent.x * v.x + intent.z * v.z > 0 || (v.x === 0 && v.z === 0 && (intent.x !== 0 || intent.z !== 0))
  const step = (along ? PLAYER.acceleration : PLAYER.deceleration) * dt
  const dx = intent.x - v.x
  const dz = intent.z - v.z
  const gap = Math.hypot(dx, dz)
  const k = gap > step ? step / gap : 1
  const vx = v.x + dx * k
  const vz = v.z + dz * k
  // Gravity is yours: the held velocity walks the body; bend its y every tick.
  ctx.self.velocity = { x: vx, y: v.y + ctx.place.gravity.y * dt, z: vz }
}

````


### After clicking "2d-top"

- H2: Top-down 2D 2d-top

Top-down 2D 2d-top

Drawn pixel hero, tile ground with wang edges, no gravity, solid trees. 19 files. Pick one to read it.

places/main/cells/objects.sceneplaces/main/config.yamlscripts/arrival.jsscripts/camera.jsscripts/ground.jsscripts/lib/data/camera.ymlscripts/lib/data/player.ymlscripts/look-default.jsscripts/player.jsscripts/tex-hero.jsscripts/tex-tree.jsscripts/tileset-ground.jsscripts/ui.jssim.jstemplates/camera.jstemplates/player.jstemplates/tree.jsui/nametag.jsworld.config.yaml

scripts/ground.js

scripts/tex-hero.js

scripts/tex-tree.js

scripts/tileset-ground.js

templates/tree.js

// 2D top-down starter player: WASD moves on the ground plane: up-input is up-screen, // which is -Z. The engine pins characters to the ground in 2d-top: no gravity, no vy, no // jump in this register. The body's velocity is a held write: the controller walks it. // Facing is a ?facing= param on the hero's texture script across the CLOSED 8-token vocabulary // (the bare ref IS the down pose; scripts/tex-hero.js draws every pose), picked from what // actually moved the character this tick; the sprite animates through mixer channels derived // from state, playing the clips the script's atlas declares (idle, walk): a sprite that never // turns or never animates runs without errors, only motion shows it. Full grammar: 2d-mode skill. // A body given another picture keeps it: the figure is drawn only while the sprite wears scripts/tex-hero.js (wearsFigure). import PLAYER from './lib/data/player.yml'; var SPRITE = 'scripts/tex-hero.js'; var FACES = { down: SPRITE, 'down-right': SPRITE + '?facing=down-right', right: SPRITE + '?facing=right', 'up-right': SPRITE + '?facing=up-right', up: SPRITE + '?facing=up', 'up-left': SPRITE + '?facing=up-left', left: SPRITE + '?facing=left', 'down-left': SPRITE + '?facing=down-left', }; // Octant order matches atan2(vx, vz): 0 = +Z = down-screen, then counter-clockwise. var OCTANTS = ['down', 'down-right', 'right', 'up-right', 'up', 'up-left', 'left', 'down-left']; export function facingFrom(vx, vz, last) { if (Math.hypot(vx, vz) < 0.5) return last; // speed deadzone: idle keeps the last facing var octant = Math.round(Math.atan2(vx, vz) / (Math.PI / 4)); return OCTANTS[(octant + 8) % 8]; } export function onInput(ctx, input) { var s = ctx.self.state; var moveX = input.axes.moveX || 0; var moveZ = input.axes.moveZ || 0; var mag = Math.hypot(moveX, moveZ); var nx = mag > 1 ? moveX / mag : moveX; var nz = mag > 1 ? moveZ / mag : moveZ; ctx.self.velocity = { x: nx * PLAYER.walkSpeed, y: 0, z: -nz * PLAYER.walkSpeed }; // up-input moves up-screen = -Z } export function update(ctx, dt) { var s = ctx.self.state; // The body's velocity: the word onInput gave it this tick, else what it did last tick. var v = ctx.self.velocity; var vx = v.x; var vz = v.z; // Motion carries direction: feed the bucketer whatever moved the character this tick. var facing = facingFrom(vx, vz, s.facing || 'down'); if (wearsFigure(ctx)) { ctx.self.sprite.texture = FACES[facing]; // Derive channels from state EVERY tick: identical channel writes are free, and // state is the truth that survives a room restart and a place reload. var walking = Math.hypot(vx, vz) > 0.5; ctx.self.anim.idle = { clip: 'idle', loop: 'loop', weight: 0.5, blendIn: 0.2 }; ctx.self.anim.locomotion = { clip: 'walk', loop: 'loop', weight: walking ? 1.5 : 0, blendIn: 0.1 }; } s.facing = facing; } function wearsFigure(ctx) { var sprite = ctx.self.sprite; return !!sprite && String(sprite.texture).indexOf(SPRITE) === 0; }

#### Block 1

````text
// 2D top-down starter player: WASD moves on the ground plane: up-input is up-screen,
// which is -Z. The engine pins characters to the ground in 2d-top: no gravity, no vy, no
// jump in this register. The body's velocity is a held write: the controller walks it.
// Facing is a ?facing= param on the hero's texture script across the CLOSED 8-token vocabulary
// (the bare ref IS the down pose; scripts/tex-hero.js draws every pose), picked from what
// actually moved the character this tick; the sprite animates through mixer channels derived
// from state, playing the clips the script's atlas declares (idle, walk): a sprite that never
// turns or never animates runs without errors, only motion shows it. Full grammar: 2d-mode skill.
// A body given another picture keeps it: the figure is drawn only while the sprite wears scripts/tex-hero.js (wearsFigure).
import PLAYER from './lib/data/player.yml';

var SPRITE = 'scripts/tex-hero.js';
var FACES = {
  down: SPRITE,
  'down-right': SPRITE + '?facing=down-right',
  right: SPRITE + '?facing=right',
  'up-right': SPRITE + '?facing=up-right',
  up: SPRITE + '?facing=up',
  'up-left': SPRITE + '?facing=up-left',
  left: SPRITE + '?facing=left',
  'down-left': SPRITE + '?facing=down-left',
};

// Octant order matches atan2(vx, vz): 0 = +Z = down-screen, then counter-clockwise.
var OCTANTS = ['down', 'down-right', 'right', 'up-right', 'up', 'up-left', 'left', 'down-left'];

export function facingFrom(vx, vz, last) {
  if (Math.hypot(vx, vz) < 0.5) return last; // speed deadzone: idle keeps the last facing
  var octant = Math.round(Math.atan2(vx, vz) / (Math.PI / 4));
  return OCTANTS[(octant + 8) % 8];
}

export function onInput(ctx, input) {
  var s = ctx.self.state;
  var moveX = input.axes.moveX || 0;
  var moveZ = input.axes.moveZ || 0;
  var mag = Math.hypot(moveX, moveZ);
  var nx = mag > 1 ? moveX / mag : moveX;
  var nz = mag > 1 ? moveZ / mag : moveZ;
  ctx.self.velocity = { x: nx * PLAYER.walkSpeed, y: 0, z: -nz * PLAYER.walkSpeed }; // up-input moves up-screen = -Z
}

export function update(ctx, dt) {
  var s = ctx.self.state;
  // The body's velocity: the word onInput gave it this tick, else what it did last tick.
  var v = ctx.self.velocity;
  var vx = v.x;
  var vz = v.z;

  // Motion carries direction: feed the bucketer whatever moved the character this tick.
  var facing = facingFrom(vx, vz, s.facing || 'down');
  if (wearsFigure(ctx)) {
    ctx.self.sprite.texture = FACES[facing];
    // Derive channels from state EVERY tick: identical channel writes are free, and
    // state is the truth that survives a room restart and a place reload.
    var walking = Math.hypot(vx, vz) > 0.5;
    ctx.self.anim.idle = { clip: 'idle', loop: 'loop', weight: 0.5, blendIn: 0.2 };
    ctx.self.anim.locomotion = { clip: 'walk', loop: 'loop', weight: walking ? 1.5 : 0, blendIn: 0.1 };
  }

  s.facing = facing;
}

function wearsFigure(ctx) {
  var sprite = ctx.self.sprite;
  return !!sprite && String(sprite.texture).indexOf(SPRITE) === 0;
}

````


### After clicking "2d-side"

- H2: Side-scroller 2d-side

Side-scroller 2d-side

Drawn hero, platform ground, gravity on, parallax backdrops. 22 files. Pick one to read it.

places/main/cells/objects.sceneplaces/main/config.yamlscripts/arrival.jsscripts/camera.jsscripts/ground.jsscripts/lib/color.jsscripts/lib/data/meadow.ymlscripts/lib/data/player.ymlscripts/look-default.jsscripts/player.jsscripts/tex-hero.jsscripts/tex-meadow.jsscripts/tex-sky.jsscripts/tex-soil.jsscripts/tileset-ground.jsscripts/ui.jssim.jstemplates/camera.jstemplates/player.jstemplates/sprite.jsui/nametag.jsworld.config.yaml

scripts/lib/color.js

scripts/lib/data/meadow.yml

scripts/tex-meadow.js

scripts/tex-sky.js

scripts/tex-soil.js

templates/sprite.js

// 2D side-scroller starter player: A/D run, space jump. The body's velocity is a held write: // the controller walks it and NEVER adds gravity: this script bends vy by hand every update. // Facing is a ?facing= param on the hero's texture script (scripts/tex-hero.js draws the figure // turned each way: real art, never flipX). The sprite animates through mixer channels derived from // THIS tick's state, playing the clips the hero's atlas declares (idle, walk, jump, turn). // Only idle runs on a clock. Every other pose is ONE frame of a clip, held (speed 0, time names it): // walk: the body's place along X picks the frame, one every STRIDE px (the hero's art states it), // so the planted foot stays where it landed at any walkSpeed. // jump: the clip runs crouch, launch, rise, apex, fall, land, dip, recover, two frames a pose. The crouch is // timed (crouchTime in lib/data/player.yml; 0 jumps at once), the air follows the body's vertical speed at // any jump height, the landing is timed from the tick the feet touch (a running landing is shorter). // turn: the old side round to the front and on to the new side, seven frames in TURN ms. // The blob on the ground is the template's `shadow` child (templates/player.js): it rides the body along X and update holds it on // the ground. A template without the child has no blob, and a script without this block leaves the blob at the feet. // The hero wears the hour's light: update gives sprite.tint the meadow's light colour (lib/data/meadow.yml). // A body given another picture keeps it: the figure is drawn only while the sprite wears scripts/tex-hero.js (wearsFigure). // Tighter feel (coyote time, jump buffering, apex hang) is the creator's script over this one. import PLAYER from './lib/data/player.yml'; import M from './lib/data/meadow.yml'; import { raycast } from 'builtin/physics'; import { PX, STRIDE, FPS, WALK, JUMP } from './tex-hero.js'; // the hero's own numbers: another hero states its own var SPRITE = 'scripts/tex-hero.js'; var FACES = { '1': SPRITE + '?facing=right', '-1': SPRITE + '?facing=left', }; var IDLE_FPS = 12; // the idle clip's pace, frames a second var TURN = 150; // ms a turn takes var DOWN = { x: 0, y: -1, z: 0 }; // Jump authored as height: derive speed/gravity, never guess them as literals. var JUMP_SPEED = (2 * PLAYER.jumpHeight) / PLAYER.timeToApex; var GRAVITY = (-2 * PLAYER.jumpHeight) / (PLAYER.timeToApex * PLAYER.timeToApex); export function onInput(ctx, input) { var s = ctx.self.state; var moveX = input.axes.moveX || 0; var dir = moveX > 0.01 ? 1 : moveX < -0.01 ? -1 : s.facingDir || 1; if (dir !== (s.facingDir || 1)) s.turnAt = ctx.now(); s.facingDir = dir; // The jump starts with the crouch: update pushes off when crouchTime has passed. if (input.held.jump && ctx.self.grounded && !s.crouchAt) s.crouchAt = ctx.now(); ctx.self.velocity = { x: moveX * PLAYER.walkSpeed, y: ctx.self.velocity.y, z: 0 }; // z stays 0: the player lives on one Z plane } function hold(clip, frame, weight) { return { clip: clip, loop: 'loop', speed: 0, time: (frame + 0.5) / FPS, weight: weight }; } export function update(ctx, dt) { var s = ctx.self.state; var now = ctx.now(); var feet = ctx.self.feetPosition; // Gravity is yours: the held velocity walks the body; bend its y every tick. On the ground y reads 0. var v = ctx.self.velocity; var vx = v.x; var vy = v.y + GRAVITY * dt; if (s.crouchAt && now - s.crouchAt >= PLAYER.crouchTime * 1000) { vy = JUMP_SPEED; // the push off: the jump is your y s.crouchAt = 0; } ctx.self.velocity = { x: vx, y: vy, z: 0 }; var inAir = !ctx.self.grounded || vy > 0; var running = Math.abs(vx) > 0.1; if (!inAir && s.air) { s.landAt = now; s.landRun = running; } if (!s.air !== !inAir) s.air = inAir; // Derive channels from state EVERY tick: identical channel writes are free, and // state is the truth that survives a room restart and a place reload. var facingDir = s.facingDir || 1; if (wearsFigure(ctx)) drawHero(ctx, s, now, feet, facingDir, running, inAir, vy); // The blob stays on the ground: under a jump a ray finds the ground below, and the blob shrinks with height. var shadow = ctx.getObject(ctx.self.id + '/shadow'); // the template's child, one per body if (!shadow) return; var ground = feet.y; if (inAir) { var hit = raycast(ctx, feet, DOWN, { distance: 12, bodies: 'static', physicsOnly: true }); ground = hit ? hit.position.y : s.groundY === undefined ? feet.y : s.groundY; } else if (s.groundY !== ground) s.groundY = ground; // The step that walks the body by its velocity runs after this update, so the blob hangs at the height the feet reach this // step, not the height they had: an offset from the old feet floats the blob a step above the ground on the way up. var height = Math.max(0, feet.y + vy * dt - ground); var px = height * PX; var art = SPRITE + '?part=shadow&size=' + (px < 4 ? 0 : px < 18 ? 1 : px < 36 ? 2 : 3); if (shadow.feetPosition.y !== -height) shadow.feetPosition = { x: 0, y: -height, z: 0 }; if (shadow.sprite.texture !== art) shadow.sprite.texture = art; } function wearsFigure(ctx) { var sprite = ctx.self.sprite; return !!sprite && String(sprite.texture).indexOf(SPRITE) === 0; } // The figure of scripts/tex-hero.js: its facing art, the meadow's light, and its poses held frame by frame. function drawHero(ctx, s, now, feet, facingDir, running, inAir, vy) { var turned = s.turnAt ? now - s.turnAt : TURN; // ms since the body turned round var landed = s.landAt ? (now - s.landAt) / 1000 : 1; // seconds since the feet touched var rise = vy / JUMP_SPEED; // Where the body is in the jump, counted in poses: 1 crouch, 2 launch, 3 rise, 4 apex, 5 fall, 6 land, 7 dip, 8 recover; 0 for none. var pose = 0; var landing = s.landRun ? 0.12 : 0.21; // seconds a landing takes if (s.crouchAt) pose = now - s.crouchAt < PLAYER.crouchTime * 500 ? 0.5 : 1; else if (inAir) pose = Math.max(2, Math.min(5, 4 - rise / 0.55)); else if (landed < landing) pose = 6 + (landed / landing) * 2.5; var jump = pose ? Math.min(JUMP - 1, Math.round((pose - 0.5) * 2)) : -1; // the frame of the jump clip to hold, -1 for none var stride = Math.floor((facingDir * feet.x * PX) / STRIDE); // walk frames travelled from x = 0, counted the way the body faces var step = ((stride % WALK) + WALK) % WALK; var turning = Math.min(6, Math.floor((turned / TURN) * 7)); // seven steps: 0 to 2 the old side, 3 the front, 4 to 6 the new side ctx.self.sprite.texture = FACES[String(turned < TURN && turning < 3 ? -facingDir : facingDir)]; if (ctx.self.sprite.tint !== M.light) ctx.self.sprite.tint = M.light; ctx.self.anim.idle = { clip: 'idle', loop: 'loop', speed: IDLE_FPS / FPS, weight: 0.5 }; ctx.self.anim.locomotion = hold('walk', step, running && !inAir ? 1.5 : 0); ctx.self.anim.turn = hold('turn', turning < 4 ? turning : 6 - turning, turned < TURN ? 1.75 : 0); ctx.self.anim.air = hold('jump', jump < 0 ? JUMP - 1 : jump, jump < 0 ? 0 : 2); }

#### Block 1

````text
// 2D side-scroller starter player: A/D run, space jump. The body's velocity is a held write:
// the controller walks it and NEVER adds gravity: this script bends vy by hand every update.
// Facing is a ?facing= param on the hero's texture script (scripts/tex-hero.js draws the figure
// turned each way: real art, never flipX). The sprite animates through mixer channels derived from
// THIS tick's state, playing the clips the hero's atlas declares (idle, walk, jump, turn).
// Only idle runs on a clock. Every other pose is ONE frame of a clip, held (speed 0, time names it):
//   walk: the body's place along X picks the frame, one every STRIDE px (the hero's art states it),
//     so the planted foot stays where it landed at any walkSpeed.
//   jump: the clip runs crouch, launch, rise, apex, fall, land, dip, recover, two frames a pose. The crouch is
//     timed (crouchTime in lib/data/player.yml; 0 jumps at once), the air follows the body's vertical speed at
//     any jump height, the landing is timed from the tick the feet touch (a running landing is shorter).
//   turn: the old side round to the front and on to the new side, seven frames in TURN ms.
// The blob on the ground is the template's `shadow` child (templates/player.js): it rides the body along X and update holds it on
// the ground. A template without the child has no blob, and a script without this block leaves the blob at the feet.
// The hero wears the hour's light: update gives sprite.tint the meadow's light colour (lib/data/meadow.yml).
// A body given another picture keeps it: the figure is drawn only while the sprite wears scripts/tex-hero.js (wearsFigure).
// Tighter feel (coyote time, jump buffering, apex hang) is the creator's script over this one.
import PLAYER from './lib/data/player.yml';
import M from './lib/data/meadow.yml';
import { raycast } from 'builtin/physics';
import { PX, STRIDE, FPS, WALK, JUMP } from './tex-hero.js'; // the hero's own numbers: another hero states its own

var SPRITE = 'scripts/tex-hero.js';
var FACES = {
  '1': SPRITE + '?facing=right',
  '-1': SPRITE + '?facing=left',
};
var IDLE_FPS = 12; // the idle clip's pace, frames a second
var TURN = 150; // ms a turn takes
var DOWN = { x: 0, y: -1, z: 0 };

// Jump authored as height: derive speed/gravity, never guess them as literals.
var JUMP_SPEED = (2 * PLAYER.jumpHeight) / PLAYER.timeToApex;
var GRAVITY = (-2 * PLAYER.jumpHeight) / (PLAYER.timeToApex * PLAYER.timeToApex);

export function onInput(ctx, input) {
  var s = ctx.self.state;
  var moveX = input.axes.moveX || 0;
  var dir = moveX > 0.01 ? 1 : moveX < -0.01 ? -1 : s.facingDir || 1;
  if (dir !== (s.facingDir || 1)) s.turnAt = ctx.now();
  s.facingDir = dir;
  // The jump starts with the crouch: update pushes off when crouchTime has passed.
  if (input.held.jump && ctx.self.grounded && !s.crouchAt) s.crouchAt = ctx.now();
  ctx.self.velocity = { x: moveX * PLAYER.walkSpeed, y: ctx.self.velocity.y, z: 0 }; // z stays 0: the player lives on one Z plane
}

function hold(clip, frame, weight) {
  return { clip: clip, loop: 'loop', speed: 0, time: (frame + 0.5) / FPS, weight: weight };
}

export function update(ctx, dt) {
  var s = ctx.self.state;
  var now = ctx.now();
  var feet = ctx.self.feetPosition;
  // Gravity is yours: the held velocity walks the body; bend its y every tick. On the ground y reads 0.
  var v = ctx.self.velocity;
  var vx = v.x;
  var vy = v.y + GRAVITY * dt;
  if (s.crouchAt && now - s.crouchAt >= PLAYER.crouchTime * 1000) {
    vy = JUMP_SPEED; // the push off: the jump is your y
    s.crouchAt = 0;
  }
  ctx.self.velocity = { x: vx, y: vy, z: 0 };

  var inAir = !ctx.self.grounded || vy > 0;
  var running = Math.abs(vx) > 0.1;
  if (!inAir && s.air) {
    s.landAt = now;
    s.landRun = running;
  }
  if (!s.air !== !inAir) s.air = inAir;

  // Derive channels from state EVERY tick: identical channel writes are free, and
  // state is the truth that survives a room restart and a place reload.
  var facingDir = s.facingDir || 1;
  if (wearsFigure(ctx)) drawHero(ctx, s, now, feet, facingDir, running, inAir, vy);

  // The blob stays on the ground: under a jump a ray finds the ground below, and the blob shrinks with height.
  var shadow = ctx.getObject(ctx.self.id + '/shadow'); // the template's child, one per body
  if (!shadow) return;
  var ground = feet.y;
  if (inAir) {
    var hit = raycast(ctx, feet, DOWN, { distance: 12, bodies: 'static', physicsOnly: true });
    ground = hit ? hit.position.y : s.groundY === undefined ? feet.y : s.groundY;
  } else if (s.groundY !== ground) s.groundY = ground;
  // The step that walks the body by its velocity runs after this update, so the blob hangs at the height the feet reach this
  // step, not the height they had: an offset from the old feet floats the blob a step above the ground on the way up.
  var height = Math.max(0, feet.y + vy * dt - ground);
  var px = height * PX;
  var art = SPRITE + '?part=shadow&size=' + (px < 4 ? 0 : px < 18 ? 1 : px < 36 ? 2 : 3);
  if (shadow.feetPosition.y !== -height) shadow.feetPosition = { x: 0, y: -height, z: 0 };
  if (shadow.sprite.texture !== art) shadow.sprite.texture = art;
}

function wearsFigure(ctx) {
  var sprite = ctx.self.sprite;
  return !!sprite && String(sprite.texture).indexOf(SPRITE) === 0;
}

// The figure of scripts/tex-hero.js: its facing art, the meadow's light, and its poses held frame by frame.
function drawHero(ctx, s, now, feet, facingDir, running, inAir, vy) {
  var turned = s.turnAt ? now - s.turnAt : TURN; // ms since the body turned round
  var landed = s.landAt ? (now - s.landAt) / 1000 : 1; // seconds since the feet touched
  var rise = vy / JUMP_SPEED;
  // Where the body is in the jump, counted in poses: 1 crouch, 2 launch, 3 rise, 4 apex, 5 fall, 6 land, 7 dip, 8 recover; 0 for none.
  var pose = 0;
  var landing = s.landRun ? 0.12 : 0.21; // seconds a landing takes
  if (s.crouchAt) pose = now - s.crouchAt < PLAYER.crouchTime * 500 ? 0.5 : 1;
  else if (inAir) pose = Math.max(2, Math.min(5, 4 - rise / 0.55));
  else if (landed < landing) pose = 6 + (landed / landing) * 2.5;
  var jump = pose ? Math.min(JUMP - 1, Math.round((pose - 0.5) * 2)) : -1; // the frame of the jump clip to hold, -1 for none
  var stride = Math.floor((facingDir * feet.x * PX) / STRIDE); // walk frames travelled from x = 0, counted the way the body faces
  var step = ((stride % WALK) + WALK) % WALK;
  var turning = Math.min(6, Math.floor((turned / TURN) * 7)); // seven steps: 0 to 2 the old side, 3 the front, 4 to 6 the new side
  ctx.self.sprite.texture = FACES[String(turned < TURN && turning < 3 ? -facingDir : facingDir)];
  if (ctx.self.sprite.tint !== M.light) ctx.self.sprite.tint = M.light;
  ctx.self.anim.idle = { clip: 'idle', loop: 'loop', speed: IDLE_FPS / FPS, weight: 0.5 };
  ctx.self.anim.locomotion = hold('walk', step, running && !inAir ? 1.5 : 0);
  ctx.self.anim.turn = hold('turn', turning < 4 ? turning : 6 - turning, turned < TURN ? 1.75 : 0);
  ctx.self.anim.air = hold('jump', jump < 0 ? JUMP - 1 : jump, jump < 0 ? 0 : 2);
}

````


### After clicking "ui-game"

- H2: Screen-first ui-game

Screen-first ui-game

The screen is HTML, no 3D drawn. Rules run behind buttons. This site runs on it. 9 files. Pick one to read it.

places/main/config.yamlscripts/look-default.jsscripts/player.jsscripts/ui.jssim.jstemplates/camera.jstemplates/player.jsui/nametag.jsworld.config.yaml

// UI game starter player: no avatar, no movement: this behavior is the game's rules behind // the screen, run by the engine for each player in the room they share. Nothing is handled // yet; the loop, when the game arrives: a UI button calls sendAction('name', payload) inline // in its onclick (declare name: {} in inputs.actions, never bind mouse: "left" for UI); it // lands here as input.pressed.name with the payload on input.actionData.name; state written // here renders on the next ui.js pass via player.state: e.g. ctx.self.state.title = 'round 2'. // A thing the rules put on the field (a unit, a card in play, a ball) is an engine row // (ctx.spawn), stepped here or by sim.js, and drawn in a 3d, 2d-top or 2d-side place. // Game-ui skill. export function onInput(ctx, input) { // No rules yet: the game's first action handler lands here. }

#### Block 1

````text
// UI game starter player: no avatar, no movement: this behavior is the game's rules behind
// the screen, run by the engine for each player in the room they share. Nothing is handled
// yet; the loop, when the game arrives: a UI button calls sendAction('name', payload) inline
// in its onclick (declare name: {} in inputs.actions, never bind mouse: "left" for UI); it
// lands here as input.pressed.name with the payload on input.actionData.name; state written
// here renders on the next ui.js pass via player.state: e.g. ctx.self.state.title = 'round 2'.
// A thing the rules put on the field (a unit, a card in play, a ball) is an engine row
// (ctx.spawn), stepped here or by sim.js, and drawn in a 3d, 2d-top or 2d-side place.
// Game-ui skill.
export function onInput(ctx, input) {
  // No rules yet: the game's first action handler lands here.
}

````


## Not captured

Controls clicked: 22 of 22 planned controls in this section, out of 36 candidates found after the load and the scroll.
Controls not clicked by policy: 0. Their labels name an action that changes state or sends something, so they were left alone: none.
Controls that could not be found again after a retry: 0. Errors: 0.

Clicks made: 22. Clicks that brought up content not in the swept state: 22. The rest brought up nothing new.


## Sources

- `wiki-tools/recapture/states/toolbox/01-initial.json`
- `wiki-tools/recapture/states/toolbox/01-swept.json`
- `wiki-tools/recapture/states/toolbox/01-c001.json`
- `wiki-tools/recapture/states/toolbox/01-c002.json`
- `wiki-tools/recapture/states/toolbox/01-c003.json`
- `wiki-tools/recapture/states/toolbox/01-c004.json`
- `wiki-tools/recapture/states/toolbox/01-c005.json`
- `wiki-tools/recapture/states/toolbox/01-c006.json`
- `wiki-tools/recapture/states/toolbox/01-c007.json`
- `wiki-tools/recapture/states/toolbox/01-c008.json`
- `wiki-tools/recapture/states/toolbox/01-c009.json`
- `wiki-tools/recapture/states/toolbox/01-c010.json`
- `wiki-tools/recapture/states/toolbox/01-c011.json`
- `wiki-tools/recapture/states/toolbox/01-c012.json`
- `wiki-tools/recapture/states/toolbox/01-c013.json`
- `wiki-tools/recapture/states/toolbox/01-c014.json`
- `wiki-tools/recapture/states/toolbox/01-c015.json`
- `wiki-tools/recapture/states/toolbox/01-c016.json`
- `wiki-tools/recapture/states/toolbox/01-c017.json`
- `wiki-tools/recapture/states/toolbox/01-c018.json`
- `wiki-tools/recapture/states/toolbox/01-c019.json`
- `wiki-tools/recapture/states/toolbox/01-c020.json`
- `wiki-tools/recapture/states/toolbox/01-c021.json`
- `wiki-tools/recapture/states/toolbox/01-c022.json`
- `wiki-tools/recapture/states/toolbox/summary-01.json`
