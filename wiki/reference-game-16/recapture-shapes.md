# Game page section: Shapes: text not in the capture

The Shapes section of the toolbox, read on load, after a scroll, and after a click on each control that does not change state. Only text, headings, links, images and code that the first capture does not hold are listed.

## Items not in the capture

| Item | Count |
| --- | --- |
| Headings | 0 |
| Visible text blocks | 216 |
| Hidden text blocks | 0 |
| Links | 0 |
| Images | 0 |
| Code or data blocks | 112 |

## Present on load, not in the capture

None found on load.

## Loaded after a scroll, not in the capture

None found after the scroll.

## Loaded after a click, not in the capture

### After clicking "ObjectProperties"

← all shapes

An object's fields (pose, visual appearance, physics, audio) flat on the spec beside id / tags / parent / children / state / behavior / audience / lifetime / scope (the reserved words no field may take), and the same dots on the handle: crate.material.color = "red". A null write clears a field…

crate.material.color = "red"

ObjectProperties = { feetPosition?: PositionSpec // the BOTTOM CENTRE of the shape at rest, never the geometric center; rotation turns the shape about this point (a laid log's axis passes through its feet: spell y: radius to rest it on the ground); a flat kind (plane, circle, ring, torus) and a vector picture have no feet and stand by their CENTRE, three.js's origin, so a pitch lays them flat where they are; a child: LOCAL to its parent; the world point on anything: worldFeetPosition rotation?: RotationSpec // degrees; on a child, local to the parent, read and written; the world turn: worldRotation yaw?: number // degrees; ignored when rotation is set scale?: number | Vec3 // applied after layout fits the raw model; never moves the feet attachment?: ObjectAttachmentSpec | null // with parent: bone ("RightHand") on a rigged parent; skin: true a SKINNED child model that deforms with the parent's rig; socket ("muzzle", "grip") a named point on its model; part ("turret") a piece of a ?parts= model pivot?: PivotSpec // the point of the shape that stays put when it turns: "feet" (default: the feetPosition point, the same point physics pivots on) | "center" | "top" | [u, v, w] of the bounds (v up) | { x, y, z } m: it stays where it stands at rotation 0; every rotation, the authored one too, swings the shape about it; ignored on dynamic bodies visible?: boolean // drawing only: false hides this object and everything parented under it (a child draws only while every ancestor is visible, as in three.js; a child's own word stays its own); colliders, triggers and scripts unaffected render?: boolean // drawing only; false turns off this object's OWN drawing (its primitive, model or sprite) while its collider, scripts and children stay as they are: the collider-only row, a physics hull wearing its visible body as children. `visible: false` hides the subtree; `render: false` hides the row alone visibleRange?: { min?: number; max?: number } | null // straight-line meters from the nearest view (camera, glass or live door) to its feet, not its surface; drawing only: colliders, triggers, raycasts and children unaffected; each device's draw distance scales both edges, except text, vector and ui; each edge holds a 5 % band, then fades (swaps on coarse pixels); null clears visibleInFirstPerson?: boolean | null // true keeps drawn a held item for its wielder, the player body in its own eye (hideLocalPlayer hides none of it), any rigged body the eye is in (its inside where side is "double"); the nearest explicit ancestor wins; null inherits layers?: string[] | null // the drawing layers it is on, by name (three's object.layers): a camera draws it when the camera's `layers` share a name; absent: its nearest ancestor's, else ["default"]; null inherits; [] is drawn by no camera; a light lights a view only while that view's camera draws it (the sun's and the sky's, while the screen's camera does), and a thing casts a shadow only while the screen's camera draws it; colliders, raycasts and scripts never read it visibleTo?: "all" | "editors" // "editors": players never see or meet it; children inherit at jayzee only; give it physics: "none" castShadow?: boolean receiveShadow?: boolean primitive?: PrimitiveSpec spline?: SplineSpec vector?: string // The object's vector picture as SVG markup; crisp at any size and any distance, one string: `<svg viewBox="0 0 160 90" width="8m">…</svg>`. Inside: path, rect, circle, ellipse, line, polyline, polygon; <text> with font-family (serif | sans-serif | display), font-size, font-weight, font-variation-settings ('wght' 700 breathes the variable face); <g> and transform; fill/stroke/stroke-width/opacity/stroke-dasharray; linear and radial gradients from <defs>; filter="drop-shadow(0 0 blur color)" is a glow, an offset a shadow. The root's width/height are METRES (the viewBox keeps the aspect), and the viewBox's CENTRE stands at feetPosition, so half the picture hangs below it (a label on a box: the box's y + height/2); billboard="none" (default: the object's own rotation) | "yaw" | "full". In a 2D place, the root's sortingLayer and sortingOrder sort the picture as a sprite of that layer and order with ySort off. Set them to seat it among the sprites. Several elements in one string are one object with one collider (its box). A write is the picture on the next frame; a tween of the string: animate(ctx, id, { vector: NEXT }, { duration }): cross-fades paired shapes for its seconds. A tag or attribute outside the subset is a named fault on the row and the rest paints. model?: | string | { id: string; offset?: [number, number, number]; forward?: ForwardAxis; animation?: { clip?: string; speed?: number; loop?: "once" | "loop" | "pingpong" }; materials?: Record<string, Omit<StandardMaterialSpec, "time" | "timeAt" | "paused" | "speed"> | ScriptedMaterialSpec>; parts?: Record<string, ModelPartStateSpec> } // the .glb the object wears; a wisp's Blender export or a creator's upload (`/cdn/value.<sha>.glb`); the clips its file carries play by name on a mixer channel and every other clip by address (`mixer.<channel>.clip`); a creature that walks from code is a code rig instead: skeleton() beside geometry(), its clips your data; offset (`[x, y, z]` or `{ x, y?, z }` metres) moves the mesh only, the physics stays put; forward: for a model that stands turned round, the axis it was built to face: `forward: "+z"` turns it half round onto the engine's −Z once, sockets and parts with it (omitted: no turn; a model the platform made already faces −Z, and "+z" on it turns nothing) mixer?: Record< string, { clip: string; weight?: number; duration?: number; speed?: number; loop?: "once" | "loop" | "pingpong"; blendIn?: number; blendOut?: number; direction?: "normal" | "reverse" | "alternate"; mask?: { from: string } | { bones: string[] }; blend?: "normal" | "override" | "additive"; time?: number; timeAt?: number; talking?: true; clampWhenFinished?: true } > | null // animation channels: `{ clip, weight, loop, speed, blend }`; channels share each bone property by weight (`blend: "normal"`, the default: two at weight 1 are half each), and `blend: "override"` lifts the channel above that shared blend so it replaces what its clip touches, whole, by its own weight (a face over a body clip, an aim over a walk); `blend: "additive"` adds its clip's motion since its first frame on top of both, by its weight (a reload over an idle); at runtime write ctx.self.anim.<ch> = { clip, weight, loop } | "clip" | weight | null jiggle?: boolean | JiggleSpecValue | JiggleSpecValue[] | null // spring bones: ears, a tail, hair or a skirt swing and settle on a model's or a skeleton()'s bones, no script; true: joints named like hair, ears, a tail or a skirt spring; amount 0..1 is how much of the body's own movement (its travel and turning) the chains feel: 0 rides along (animation, gravity and colliders still move them), 1 feels all of it; `wind: { force }` bends them in the place's wind; `radius` (metres, the joints' thickness) + `colliders` (spheres/capsules on named bones, this model's or another entity's, the chains never pass through: hair rests on the shoulders); a LIST of such rows gives each chain set its own knobs (`[{ bones: ["Hair_F*"], amount: 0 }, { bones: ["Pony*"], amount: 0.6 }]`); visual only; null removes morph?: MorphSpecValue | null // Shape-key (morph target / blend shape) weights on the model: target name → weight, e.g. `{ Blink: 1 }` or `{ Smile: 0.6, JawOpen: 0.3 }`. Names are the GLB's (Blender shape-key names): `getObjectMorphTargetNames(id)` lists them; a numeric string like "0" addresses a target by index. Targets you name override the playing clip's `weights` track for that target; targets you don't name keep the clip's. Weights are unclamped (1.5 over-drives, -0.5 inverts). `null` hands the whole face back to the clip. Purely presentational. bones?: BonesSpecValue | null // The pose, as state; bone name → `{ pitch, yaw, roll }` in degrees about the bone's own local x / y / z (in that order; a positive pitch tips the bone's own −Z up, as three.js's rotation.x). Each rig sets its bones' axes: a bone's line is the localPosition of the `<entity>.skeleton` row whose parentName is that bone, a turn about that line twists the limb in place, and a turn about either other axis swings it. `{ x, y, z }` is metres along its parent's axes. Both add over whatever clips play: `self.bones.jaw.pitch = -28` drops a jaw hinged at the back (its −Z tip falls) and every screen sees the thing's own write next frame; `animate(ctx, id, { "bones.jaw.pitch": 0 }, { duration: 0.2 })` closes it; a breath, a lean, a wag are curves written here every few ticks. Names are the rig's bones: a scripted geometry's `skeleton()` export, or the GLB's joints (`<entity>.skeleton` lists them); a name the rig lacks does nothing. `{ rotate: [x, y, z], offset: [x, y, z] }` is the same turn and move as triples. `null` hands the rig back to the clips. Applied on each screen after the mixer and before IK. The pose is presentational. To pose another player's body per screen, write its bones from a script on an `audience: "local"` thing, reading shared state; each screen leans that body itself, and only the state is sent. `self.bones.<bone>.reach`: Put a bone at a point: its two parents bend (a hand on a handle, a foot on a rock), and a point past their length leaves the limb straight toward it. The target is a world point { x, y, z } or { object, offset? }, followed every frame: a point written each tick moves smoothly between ticks. A `rotation` on the target sets the bone's turn as `currentWorldRotation` reads it, in the object's frame on an object target. A humanoid's hand turns only as far as a human wrist bends: with no `pole` the elbow swings to reach the turn, and a `pole` keeps the elbow where it puts it as far as a human shoulder turns, past that the elbow swings to where the shoulder and the hand's turn both hold. Long form { to, pole?, weight?, blendIn?, blendOut? }: `pole` is the point the middle joint bends toward (an elbow out, a knee forward); null lets go. `self.bones.<bone>.aim`: Turn a bone so that its front (-Z) points at a point: a head looks, an eye stalk follows, a turret tracks. Same targets as reach, without rotation or pole. `self.bones.<bone>.ground`: 0 to 1: keep a bone on the ground under it. A foot rests on a slope, and the body sinks so that its lowest foot reaches. A foot its clip holds still stays planted while the body moves, and steps to keep up. A grounded ankle stands at its height in the model's rest pose. Any number of feet. A humanoid model's feet have it already (1, read on the blended pose, not per channel), as `LeftFoot` and `RightFoot` whatever its file calls them: 0 on a foot draws it as its clip holds it (a fall, a kneel); null gives it back. `self.bones.<bone>.scale`: Multiply a bone's size as the clips play it, and every bone under it follows (1 = as played): 0 shrinks a limb's skin to its joint (an arm cut off, a head gone), 2 doubles it. `self.bones.<bone>.visibleInFirstPerson`: false hides the bone and every bone under it from its own player's eye while the body draws from inside that eye (`hideLocalPlayer = false`, the eye in the head), as the engine hides the head there: legs and torso in first person under view-model arms. Other players, mirrors and the shadow keep it. Default true. `self.bones.<bone>.mass`: The kilograms the bone weighs when the body ragdolls (`self.ragdoll`), read as it goes limp: `self.bones.Spine.mass = 25` makes a heavy torso that falls first. Every bone without one keeps its share of the body's mass (`physics.mass`, split by each part's thickness), and the body weighs the sum. sprite?: { // a flat image facing the camera: billboard yaw (unset) turns the card to each viewer's camera, none locks it to the entity's rotation (a flat thing: a decal, a poster: edge-on from the side), full also pitches; uvRect picks a sheet region; frames named in events fire onAnimationEvent; castShadow: true throws the card's shadow in its picture's shape (a turning card's shadow turns with it) texture: AssetID size?: [number, number] // World-space [width, height] of the quad. OMIT for pixel sprites: the engine sizes the sprite from the asset's declared world height (its `2d` metadata), so pixel density stays uniform across the scene (64 px per world unit). Set it only to deliberately rescale; authored size always beats the metadata default. pixelsPerUnit?: number // Pixels-per-unit convenience; used only when `size` is omitted. Setting it also opts out of the metadata-driven default size. anchor?: [number, number] // Normalized [u, v] point of the art that sits at the entity's origin (0..1, v up; default [0.5, 0] = bottom-center "feet"). It places the quad relative to `feetPosition`, it is the pivot the sprite rotates around: a bullet spinning about its center wants [0.5, 0.5], a ceiling lantern swinging from its top wants [0.5, 1], a door hinged at an edge wants [0, 0], and the auto-derived collider2d hull is expressed against the same point, so art, pivot, and hitbox always share one origin. tint?: Color // multiplies the art opacity?: number // 0..1, blends in linear light: over a dark background white at 0.05 reads 21% solid, 0.25 reads 65%, 0.5 reads 86% blend?: SpriteBlendMode lit?: boolean // Scene lights shade the sprite (the engine derives a normal map from the art automatically). Default: in a 2D place that has any authored light, world sprites are lit automatically: painted plates (`backdrop-`, `strip-`, `floor-` art and parallax layers) stay unlit because their lighting is in the art, and an explicit true/false always wins. Places without lights render unlit. Alpha/cutout blends only: add/multiply/subtract sprites are themselves light/stain, so `lit` is a documented no-op there. emissive?: number // HDR glow (default 0). Feeds bloom; works lit or unlit. normalStrength?: number // Normal-map relief strength (default 1). 0 = pure distance falloff. billboard?: "none" | "yaw" | "full" upright?: boolean // The sprite never inherits the entity's rotation as in-plane spin; it keeps the base pose (axis-aligned under the camera) however the entity turns: NPC steering, physics, scripts. The lock covers both 2D modes. The collider of a body that is not dynamic stays with the picture too; rotation still drives children and a dynamic body. Characters whose facing is `?facing=` texture swaps want `upright: true`; leave unset for things that should visibly turn (cars, ships, banking projectiles). No effect in 3D places: `billboard` owns rotation inheritance there. flipX?: boolean flipY?: boolean sortingLayer?: number sortingOrder?: number ySort?: boolean alphaCutoff?: number cutout?: boolean // Alpha-tested cutout rendering: discard pixels below 50% alpha and write depth, so heavily overlapping sprites (foliage, crowds, dense beds) resolve per-pixel instead of haloing by draw order. Default on for pixel-inferred art (`pixel-*` names, `?animated=` atlases, `scripts/tex-*.js` refs), off for painterly art, which sorts whole-sprite by distance: set true on a painterly sprite that lives among others, false for soft/glow edges. filter?: "pixel" | "linear" // Texture sampling override. "pixel" samples nearest (crisp pixel art), "linear" samples smooth. Unset defers to the asset's own pixel-ness (moodboard grammar / metadata inference). parallax?: [number, number] // Scroll factors [x, y] of a background picture; the sim never moves it. 1 = fixed in the world (default), 0 = fixed to the camera, between = parallax (far hills ~0.2–0.5, near trees ~0.7). It draws at feet + (1 − factor) × camera: the first factor on x, the second on z in a 2d-top place and on y elsewhere. A `backdrop-` picture in a 2D place whose second factor is not 1 also stays on screen on that axis. repeatX?: boolean // Tile the sprite's texture along X. On camera-attached sprites the quad spans the viewport and the texture scrolls its UV phase (the strip recipe). On plain world sprites this only sets the sampler's wrap: the sprite keeps its own class (lit stays lit, batched stays batched); use `uvRect` width > 1 for the tile count, or pair with `feetPosition: { attach: "camera" }` for an endless band. uvRect?: SpriteUvRect // Normalized texture-space rectangle; UV origin is bottom-left. Inside 0..1 it crops (a still cell of a sheet). Reaching past 0..1 tiles: the sampler wraps on that axis: `{ x: 0, y: 0, width: 4, height: 1 }` repeats the art 4× across the quad, with no lighting or batching side effects. A negative width or height reads the crop mirrored (the sprite-engine mirror); zero is refused. events?: Record<string, Record<number, string>> | null // Frame events, per clip: `events: { run: { 3: 'footfall', 7: 'footfall' } }`: the clip name a mixer channel plays, the frame index (clip-local) that fires the named event exactly when the winning channel's clock shows that frame. The object's behavior receives it as `onAnimationEvent(ctx, { name, animation, frame })`: footsteps, attack hitboxes, emitter bursts that never drift from the art. Set null to remove. Costs nothing on sprites without it. trail?: { interval?: number; life?: number; count?: number; tint?: Color | [Color, Color]; fade?: "alpha" | "shrink" | "both"; blend?: "normal" | "additive" } | null // Afterimage trail, dash ghosts, motion echoes: `trail: { interval: 0.04, life: 0.3, fade: 'both' }`. The engine snapshots the sprite's pose + frame + tint every `interval` seconds and draws the snapshots behind the sprite, fading out over `life` seconds (`fade`: 'alpha' | 'shrink' | 'both'; `tint` recolors the ghosts; `count` caps them). `tint` also takes a `[head, tail]` ramp of two colours lerped per ghost by age. `blend: 'additive'` renders the ghosts add-blended for energy/glow dashes (the sprite itself keeps its own blend). Ghosts are frozen copies: they never animate. Set null to remove. Costs nothing on sprites without it. material?: ScriptedMaterialSpec // A scripted material draws the sprite's pixels: `{ kind: "scripted", script, params }`, the contract an object's material takes; what it reads of the sprite is ctx.sprite (jayzee api builtin/three). The sprite keeps its size, frames, flips, tint, opacity, blend, cutout and sorting; the material's class decides its light, so lit, emissive and normalStrength do nothing. Each distinct params value is its own batch and its own draw. A broken script draws the plain sprite until the next edit. } wisp?: WispSpec | null // a living pixel-wisp burning from its row (voxels in 3D, the pixel grid in 2D); null removes it boxart?: BoxartSpec | null // a game's printed box, cracked open by a player's press into a portal to the game; null removes it collider2d?: { outline: [number, number][] } // Manual 2D collider override. Outline is normalized [0,1] in IMAGE space (x right, y DOWN: the same convention as MCDN hull metadata); ≥3 usable points become a convex polygon collider hugging the sprite art, degenerate outlines fall back to a tight bounding box. When absent, the engine hydrates the hull from the texture's MCDN metadata automatically: authored collider2d always beats the hydrated hull. In a 2D place v = 1 is the sprite's FEET: a tall top-down sprite a walker should bump at its trunk takes a foot band (`[[0.32, 0.86], [0.68, 0.86], [0.68, 1], [0.32, 1]]`); a band higher in the image sits up-screen of the trunk and the walker passes under it. ui?: string | null // A panel painted on this object: your HTML, as ui.js writes it (Tailwind and all), laid out and drawn onto the object's face: culled, lit and occluded with the object, riding its pose with no lag. 1 CSS px = 1 mm. Attributes on the root element place it: face="front|back|left|right|top|bottom" (front is its −Z, the way it faces; top reads upright from the front), at="u v" (0..1 across the face), width="0.32m", offset="0.005m", facing="player" (turns upright toward each viewer: a sign) or facing="screen" (square to the screen, as a sprite: a nameplate, a health bar), emissive (a screen: the panel bypasses the light). Braces read this object's own row live: {{ state.score | pad 6 }} in text, disabled="{{ state.running }}" on an attribute (a boolean keeps or drops it); filters pad N · fixed N · round · upper · lower · default X; the engine re-derives the panel when the state it reads changes, so write state, never repaint. A press on <button id="start"> rings ctx.on("ui:start", (ctx, { by }) => …); an id-less element rings "ui" with { by, tag }. Rewrite the string to change the layout; null clears it. room?: RoomSpec // auto floor + walls around this object: compat; an interior is scripted geometry (geometry skill) layout?: LayoutSpec // fits the raw model into min/max extents before scale; ignored on children material?: MaterialSpec light?: LightSpec audio?: AudioIntentValue // a clip on this object, also a song a game seeks, pauses or draws a bar for (`time`, `paused`, `spatial: false`): the room's on an `audience: "all"` object, one player's with `listeners`; ctx.music.* has no seek or pause (audio skill). `.level`: this machine's loudness of this sound now, 0..1 (0 where not heard; never shared between players); metered only while a script reads it. `.readout`: what its program voice's readout() returns on this machine, undefined until it answers voice?: { gain: number } | null // on a player: how loud the people around hear their voice, gain 0..1 (0 silent for them); null = 1; on anything that is not a player it does nothing. A team voice room keeps its own post (social skill) fx?: FxSpec // an effect script scripts/effects/<name>.fx.js (fx skill) interpolation?: { teleportThreshold: number } | null // null turns off smoothing between ticks physics?: ObjectPhysics // omitted = NO collider (walk-through): anything walked on or into needs one; "character" for what walks; collider "mesh" rides a static or kinematic body, never a dynamic one. Reads back as the object form on every copy: `{ body, collider?, … }`, a string shorthand spelled into it; null where no body is authored. air?: boolean // true: its inside is air. The place's sea and ground water stay out of its convex hull, so a body in it stands dry and an eye in it sees no underwater tint, fog or distortion: a glass dome, a diving bell, a submarine's cabin. A hollow that is not convex is several such things. With `visible: false` it is an air volume of its own shape. A pool or a tank inside it is its own water. press?: PressContactSpec | PressContactSpec[] | null // what leans the ground cover (the blades lean away and spring back in ~1 s): omitted = the body's own contacts: a walker its feet ({ radius: 0.6, strength: 1 }), a dynamic body its whole footprint, a wheeled appliance its hull's footprint and each wheel, a seated walker nothing: the ride presses; { radius, strength? } at the feet, or a list [{ at: [x, y, z], radius, strength?, below? }]: a car hull's four wheel contacts; [] presses nothing; null = the body's own again scatter?: ScatterSpec // a bed of instances over an area (heightmap-terrain skill) blueprint?: { label?: string; category?: string; icon?: string } // a god-mode palette entry }

#### Block 1

````text
crate.material.color = "red"
````

#### Block 2

````text
ObjectProperties = {
  feetPosition?: PositionSpec   // the BOTTOM CENTRE of the shape at rest, never the geometric center; rotation turns the shape about this point (a laid log's axis passes through its feet: spell y: radius to rest it on the ground); a flat kind (plane, circle, ring, torus) and a vector picture have no feet and stand by their CENTRE, three.js's origin, so a pitch lays them flat where they are; a child: LOCAL to its parent; the world point on anything: worldFeetPosition
  rotation?: RotationSpec   // degrees; on a child, local to the parent, read and written; the world turn: worldRotation
  yaw?: number   // degrees; ignored when rotation is set
  scale?: number | Vec3   // applied after layout fits the raw model; never moves the feet
  attachment?: ObjectAttachmentSpec | null   // with parent: bone ("RightHand") on a rigged parent; skin: true a SKINNED child model that deforms with the parent's rig; socket ("muzzle", "grip") a named point on its model; part ("turret") a piece of a ?parts= model
  pivot?: PivotSpec   // the point of the shape that stays put when it turns: "feet" (default: the feetPosition point, the same point physics pivots on) | "center" | "top" | [u, v, w] of the bounds (v up) | { x, y, z } m: it stays where it stands at rotation 0; every rotation, the authored one too, swings the shape about it; ignored on dynamic bodies
  visible?: boolean   // drawing only: false hides this object and everything parented under it (a child draws only while every ancestor is visible, as in three.js; a child's own word stays its own); colliders, triggers and scripts unaffected
  render?: boolean   // drawing only; false turns off this object's OWN drawing (its primitive, model or sprite) while its collider, scripts and children stay as they are: the collider-only row, a physics hull wearing its visible body as children. `visible: false` hides the subtree; `render: false` hides the row alone
  visibleRange?: { min?: number; max?: number } | null   // straight-line meters from the nearest view (camera, glass or live door) to its feet, not its surface; drawing only: colliders, triggers, raycasts and children unaffected; each device's draw distance scales both edges, except text, vector and ui; each edge holds a 5 % band, then fades (swaps on coarse pixels); null clears
  visibleInFirstPerson?: boolean | null   // true keeps drawn a held item for its wielder, the player body in its own eye (hideLocalPlayer hides none of it), any rigged body the eye is in (its inside where side is "double"); the nearest explicit ancestor wins; null inherits
  layers?: string[] | null   // the drawing layers it is on, by name (three's object.layers): a camera draws it when the camera's `layers` share a name; absent: its nearest ancestor's, else ["default"]; null inherits; [] is drawn by no camera; a light lights a view only while that view's camera draws it (the sun's and the sky's, while the screen's camera does), and a thing casts a shadow only while the screen's camera draws it; colliders, raycasts and scripts never read it
  visibleTo?: "all" | "editors"   // "editors": players never see or meet it; children inherit at spawn only; give it physics: "none"
  castShadow?: boolean
  receiveShadow?: boolean
  primitive?: PrimitiveSpec
  spline?: SplineSpec
  vector?: string   // The object's vector picture as SVG markup; crisp at any size and any distance, one string: `<svg viewBox="0 0 160 90" width="8m">…</svg>`. Inside: path, rect, circle, ellipse, line, polyline, polygon; <text> with font-family (serif | sans-serif | display), font-size, font-weight, font-variation-settings ('wght' 700 breathes the variable face); <g> and transform; fill/stroke/stroke-width/opacity/stroke-dasharray; linear and radial gradients from <defs>; filter="drop-shadow(0 0 blur color)" is a glow, an offset a shadow. The root's width/height are METRES (the viewBox keeps the aspect), and the viewBox's CENTRE stands at feetPosition, so half the picture hangs below it (a label on a box: the box's y + height/2); billboard="none" (default: the object's own rotation) | "yaw" | "full". In a 2D place, the root's sortingLayer and sortingOrder sort the picture as a sprite of that layer and order with ySort off. Set them to seat it among the sprites. Several elements in one string are one object with one collider (its box). A write is the picture on the next frame; a tween of the string: animate(ctx, id, { vector: NEXT }, { duration }): cross-fades paired shapes for its seconds. A tag or attribute outside the subset is a named fault on the row and the rest paints.
  model?: | string | { id: string; offset?: [number, number, number]; forward?: ForwardAxis; animation?: { clip?: string; speed?: number; loop?: "once" | "loop" | "pingpong" }; materials?: Record<string, Omit<StandardMaterialSpec, "time" | "timeAt" | "paused" | "speed"> | ScriptedMaterialSpec>; parts?: Record<string, ModelPartStateSpec> }   // the .glb the object wears; a wisp's Blender export or a creator's upload (`/cdn/value.<sha>.glb`); the clips its file carries play by name on a mixer channel and every other clip by address (`mixer.<channel>.clip`); a creature that walks from code is a code rig instead: skeleton() beside geometry(), its clips your data; offset (`[x, y, z]` or `{ x, y?, z }` metres) moves the mesh only, the physics stays put; forward: for a model that stands turned round, the axis it was built to face: `forward: "+z"` turns it half round onto the engine's −Z once, sockets and parts with it (omitted: no turn; a model the platform made already faces −Z, and "+z" on it turns nothing)
  mixer?: Record< string, { clip: string; weight?: number; duration?: number; speed?: number; loop?: "once" | "loop" | "pingpong"; blendIn?: number; blendOut?: number; direction?: "normal" | "reverse" | "alternate"; mask?: { from: string } | { bones: string[] }; blend?: "normal" | "override" | "additive"; time?: number; timeAt?: number; talking?: true; clampWhenFinished?: true } > | null   // animation channels: `{ clip, weight, loop, speed, blend }`; channels share each bone property by weight (`blend: "normal"`, the default: two at weight 1 are half each), and `blend: "override"` lifts the channel above that shared blend so it replaces what its clip touches, whole, by its own weight (a face over a body clip, an aim over a walk); `blend: "additive"` adds its clip's motion since its first frame on top of both, by its weight (a reload over an idle); at runtime write ctx.self.anim.<ch> = { clip, weight, loop } | "clip" | weight | null
  jiggle?: boolean | JiggleSpecValue | JiggleSpecValue[] | null   // spring bones: ears, a tail, hair or a skirt swing and settle on a model's or a skeleton()'s bones, no script; true: joints named like hair, ears, a tail or a skirt spring; amount 0..1 is how much of the body's own movement (its travel and turning) the chains feel: 0 rides along (animation, gravity and colliders still move them), 1 feels all of it; `wind: { force }` bends them in the place's wind; `radius` (metres, the joints' thickness) + `colliders` (spheres/capsules on named bones, this model's or another entity's, the chains never pass through: hair rests on the shoulders); a LIST of such rows gives each chain set its own knobs (`[{ bones: ["Hair_F*"], amount: 0 }, { bones: ["Pony*"], amount: 0.6 }]`); visual only; null removes
  morph?: MorphSpecValue | null   // Shape-key (morph target / blend shape) weights on the model: target name → weight, e.g. `{ Blink: 1 }` or `{ Smile: 0.6, JawOpen: 0.3 }`. Names are the GLB's (Blender shape-key names): `getObjectMorphTargetNames(id)` lists them; a numeric string like "0" addresses a target by index. Targets you name override the playing clip's `weights` track for that target; targets you don't name keep the clip's. Weights are unclamped (1.5 over-drives, -0.5 inverts). `null` hands the whole face back to the clip. Purely presentational.
  bones?: BonesSpecValue | null   // The pose, as state; bone name → `{ pitch, yaw, roll }` in degrees about the bone's own local x / y / z (in that order; a positive pitch tips the bone's own −Z up, as three.js's rotation.x). Each rig sets its bones' axes: a bone's line is the localPosition of the `<entity>.skeleton` row whose parentName is that bone, a turn about that line twists the limb in place, and a turn about either other axis swings it. `{ x, y, z }` is metres along its parent's axes. Both add over whatever clips play: `self.bones.jaw.pitch = -28` drops a jaw hinged at the back (its −Z tip falls) and every screen sees the thing's own write next frame; `animate(ctx, id, { "bones.jaw.pitch": 0 }, { duration: 0.2 })` closes it; a breath, a lean, a wag are curves written here every few ticks. Names are the rig's bones: a scripted geometry's `skeleton()` export, or the GLB's joints (`<entity>.skeleton` lists them); a name the rig lacks does nothing. `{ rotate: [x, y, z], offset: [x, y, z] }` is the same turn and move as triples. `null` hands the rig back to the clips. Applied on each screen after the mixer and before IK. The pose is presentational. To pose another player's body per screen, write its bones from a script on an `audience: "local"` thing, reading shared state; each screen leans that body itself, and only the state is sent. `self.bones.<bone>.reach`: Put a bone at a point: its two parents bend (a hand on a handle, a foot on a rock), and a point past their length leaves the limb straight toward it. The target is a world point { x, y, z } or { object, offset? }, followed every frame: a point written each tick moves smoothly between ticks. A `rotation` on the target sets the bone's turn as `currentWorldRotation` reads it, in the object's frame on an object target. A humanoid's hand turns only as far as a human wrist bends: with no `pole` the elbow swings to reach the turn, and a `pole` keeps the elbow where it puts it as far as a human shoulder turns, past that the elbow swings to where the shoulder and the hand's turn both hold. Long form { to, pole?, weight?, blendIn?, blendOut? }: `pole` is the point the middle joint bends toward (an elbow out, a knee forward); null lets go. `self.bones.<bone>.aim`: Turn a bone so that its front (-Z) points at a point: a head looks, an eye stalk follows, a turret tracks. Same targets as reach, without rotation or pole. `self.bones.<bone>.ground`: 0 to 1: keep a bone on the ground under it. A foot rests on a slope, and the body sinks so that its lowest foot reaches. A foot its clip holds still stays planted while the body moves, and steps to keep up. A grounded ankle stands at its height in the model's rest pose. Any number of feet. A humanoid model's feet have it already (1, read on the blended pose, not per channel), as `LeftFoot` and `RightFoot` whatever its file calls them: 0 on a foot draws it as its clip holds it (a fall, a kneel); null gives it back. `self.bones.<bone>.scale`: Multiply a bone's size as the clips play it, and every bone under it follows (1 = as played): 0 shrinks a limb's skin to its joint (an arm cut off, a head gone), 2 doubles it. `self.bones.<bone>.visibleInFirstPerson`: false hides the bone and every bone under it from its own player's eye while the body draws from inside that eye (`hideLocalPlayer = false`, the eye in the head), as the engine hides the head there: legs and torso in first person under view-model arms. Other players, mirrors and the shadow keep it. Default true. `self.bones.<bone>.mass`: The kilograms the bone weighs when the body ragdolls (`self.ragdoll`), read as it goes limp: `self.bones.Spine.mass = 25` makes a heavy torso that falls first. Every bone without one keeps its share of the body's mass (`physics.mass`, split by each part's thickness), and the body weighs the sum.
  sprite?: {   // a flat image facing the camera: billboard yaw (unset) turns the card to each viewer's camera, none locks it to the entity's rotation (a flat thing: a decal, a poster: edge-on from the side), full also pitches; uvRect picks a sheet region; frames named in events fire onAnimationEvent; castShadow: true throws the card's shadow in its picture's shape (a turning card's shadow turns with it)
    texture: AssetID
    size?: [number, number]   // World-space [width, height] of the quad. OMIT for pixel sprites: the engine sizes the sprite from the asset's declared world height (its `2d` metadata), so pixel density stays uniform across the scene (64 px per world unit). Set it only to deliberately rescale; authored size always beats the metadata default.
    pixelsPerUnit?: number   // Pixels-per-unit convenience; used only when `size` is omitted. Setting it also opts out of the metadata-driven default size.
    anchor?: [number, number]   // Normalized [u, v] point of the art that sits at the entity's origin (0..1, v up; default [0.5, 0] = bottom-center "feet"). It places the quad relative to `feetPosition`, it is the pivot the sprite rotates around: a bullet spinning about its center wants [0.5, 0.5], a ceiling lantern swinging from its top wants [0.5, 1], a door hinged at an edge wants [0, 0], and the auto-derived collider2d hull is expressed against the same point, so art, pivot, and hitbox always share one origin.
    tint?: Color   // multiplies the art
    opacity?: number   // 0..1, blends in linear light: over a dark background white at 0.05 reads 21% solid, 0.25 reads 65%, 0.5 reads 86%
    blend?: SpriteBlendMode
    lit?: boolean   // Scene lights shade the sprite (the engine derives a normal map from the art automatically). Default: in a 2D place that has any authored light, world sprites are lit automatically: painted plates (`backdrop-`, `strip-`, `floor-` art and parallax layers) stay unlit because their lighting is in the art, and an explicit true/false always wins. Places without lights render unlit. Alpha/cutout blends only: add/multiply/subtract sprites are themselves light/stain, so `lit` is a documented no-op there.
    emissive?: number   // HDR glow (default 0). Feeds bloom; works lit or unlit.
    normalStrength?: number   // Normal-map relief strength (default 1). 0 = pure distance falloff.
    billboard?: "none" | "yaw" | "full"
    upright?: boolean   // The sprite never inherits the entity's rotation as in-plane spin; it keeps the base pose (axis-aligned under the camera) however the entity turns: NPC steering, physics, scripts. The lock covers both 2D modes. The collider of a body that is not dynamic stays with the picture too; rotation still drives children and a dynamic body. Characters whose facing is `?facing=` texture swaps want `upright: true`; leave unset for things that should visibly turn (cars, ships, banking projectiles). No effect in 3D places: `billboard` owns rotation inheritance there.
    flipX?: boolean
    flipY?: boolean
    sortingLayer?: number
    sortingOrder?: number
    ySort?: boolean
    alphaCutoff?: number
    cutout?: boolean   // Alpha-tested cutout rendering: discard pixels below 50% alpha and write depth, so heavily overlapping sprites (foliage, crowds, dense beds) resolve per-pixel instead of haloing by draw order. Default on for pixel-inferred art (`pixel-*` names, `?animated=` atlases, `scripts/tex-*.js` refs), off for painterly art, which sorts whole-sprite by distance: set true on a painterly sprite that lives among others, false for soft/glow edges.
    filter?: "pixel" | "linear"   // Texture sampling override. "pixel" samples nearest (crisp pixel art), "linear" samples smooth. Unset defers to the asset's own pixel-ness (moodboard grammar / metadata inference).
    parallax?: [number, number]   // Scroll factors [x, y] of a background picture; the sim never moves it. 1 = fixed in the world (default), 0 = fixed to the camera, between = parallax (far hills ~0.2–0.5, near trees ~0.7). It draws at feet + (1 − factor) × camera: the first factor on x, the second on z in a 2d-top place and on y elsewhere. A `backdrop-` picture in a 2D place whose second factor is not 1 also stays on screen on that axis.
    repeatX?: boolean   // Tile the sprite's texture along X. On camera-attached sprites the quad spans the viewport and the texture scrolls its UV phase (the strip recipe). On plain world sprites this only sets the sampler's wrap: the sprite keeps its own class (lit stays lit, batched stays batched); use `uvRect` width > 1 for the tile count, or pair with `feetPosition: { attach: "camera" }` for an endless band.
    uvRect?: SpriteUvRect   // Normalized texture-space rectangle; UV origin is bottom-left. Inside 0..1 it crops (a still cell of a sheet). Reaching past 0..1 tiles: the sampler wraps on that axis: `{ x: 0, y: 0, width: 4, height: 1 }` repeats the art 4× across the quad, with no lighting or batching side effects. A negative width or height reads the crop mirrored (the sprite-engine mirror); zero is refused.
    events?: Record<string, Record<number, string>> | null   // Frame events, per clip: `events: { run: { 3: 'footfall', 7: 'footfall' } }`: the clip name a mixer channel plays, the frame index (clip-local) that fires the named event exactly when the winning channel's clock shows that frame. The object's behavior receives it as `onAnimationEvent(ctx, { name, animation, frame })`: footsteps, attack hitboxes, emitter bursts that never drift from the art. Set null to remove. Costs nothing on sprites without it.
    trail?: { interval?: number; life?: number; count?: number; tint?: Color | [Color, Color]; fade?: "alpha" | "shrink" | "both"; blend?: "normal" | "additive" } | null   // Afterimage trail, dash ghosts, motion echoes: `trail: { interval: 0.04, life: 0.3, fade: 'both' }`. The engine snapshots the sprite's pose + frame + tint every `interval` seconds and draws the snapshots behind the sprite, fading out over `life` seconds (`fade`: 'alpha' | 'shrink' | 'both'; `tint` recolors the ghosts; `count` caps them). `tint` also takes a `[head, tail]` ramp of two colours lerped per ghost by age. `blend: 'additive'` renders the ghosts add-blended for energy/glow dashes (the sprite itself keeps its own blend). Ghosts are frozen copies: they never animate. Set null to remove. Costs nothing on sprites without it.
    material?: ScriptedMaterialSpec   // A scripted material draws the sprite's pixels: `{ kind: "scripted", script, params }`, the contract an object's material takes; what it reads of the sprite is ctx.sprite (spawn api builtin/three). The sprite keeps its size, frames, flips, tint, opacity, blend, cutout and sorting; the material's class decides its light, so lit, emissive and normalStrength do nothing. Each distinct params value is its own batch and its own draw. A broken script draws the plain sprite until the next edit.
  }
  wisp?: WispSpec | null   // a living pixel-wisp burning from its row (voxels in 3D, the pixel grid in 2D); null removes it
  boxart?: BoxartSpec | null   // a game's printed box, cracked open by a player's press into a portal to the game; null removes it
  collider2d?: { outline: [number, number][] }   // Manual 2D collider override. Outline is normalized [0,1] in IMAGE space (x right, y DOWN: the same convention as MCDN hull metadata); ≥3 usable points become a convex polygon collider hugging the sprite art, degenerate outlines fall back to a tight bounding box. When absent, the engine hydrates the hull from the texture's MCDN metadata automatically: authored collider2d always beats the hydrated hull. In a 2D place v = 1 is the sprite's FEET: a tall top-down sprite a walker should bump at its trunk takes a foot band (`[[0.32, 0.86], [0.68, 0.86], [0.68, 1], [0.32, 1]]`); a band higher in the image sits up-screen of the trunk and the walker passes under it.
  ui?: string | null   // A panel painted on this object: your HTML, as ui.js writes it (Tailwind and all), laid out and drawn onto the object's face: culled, lit and occluded with the object, riding its pose with no lag. 1 CSS px = 1 mm. Attributes on the root element place it: face="front|back|left|right|top|bottom" (front is its −Z, the way it faces; top reads upright from the front), at="u v" (0..1 across the face), width="0.32m", offset="0.005m", facing="player" (turns upright toward each viewer: a sign) or facing="screen" (square to the screen, as a sprite: a nameplate, a health bar), emissive (a screen: the panel bypasses the light). Braces read this object's own row live: {{ state.score | pad 6 }} in text, disabled="{{ state.running }}" on an attribute (a boolean keeps or drops it); filters pad N · fixed N · round · upper · lower · default X; the engine re-derives the panel when the state it reads changes, so write state, never repaint. A press on <button id="start"> rings ctx.on("ui:start", (ctx, { by }) => …); an id-less element rings "ui" with { by, tag }. Rewrite the string to change the layout; null clears it.
  room?: RoomSpec   // auto floor + walls around this object: compat; an interior is scripted geometry (geometry skill)
  layout?: LayoutSpec   // fits the raw model into min/max extents before scale; ignored on children
  material?: MaterialSpec
  light?: LightSpec
  audio?: AudioIntentValue   // a clip on this object, also a song a game seeks, pauses or draws a bar for (`time`, `paused`, `spatial: false`): the room's on an `audience: "all"` object, one player's with `listeners`; ctx.music.* has no seek or pause (audio skill). `.level`: this machine's loudness of this sound now, 0..1 (0 where not heard; never shared between players); metered only while a script reads it. `.readout`: what its program voice's readout() returns on this machine, undefined until it answers
  voice?: { gain: number } | null   // on a player: how loud the people around hear their voice, gain 0..1 (0 silent for them); null = 1; on anything that is not a player it does nothing. A team voice room keeps its own post (social skill)
  fx?: FxSpec   // an effect script scripts/effects/<name>.fx.js (fx skill)
  interpolation?: { teleportThreshold: number } | null   // null turns off smoothing between ticks
  physics?: ObjectPhysics   // omitted = NO collider (walk-through): anything walked on or into needs one; "character" for what walks; collider "mesh" rides a static or kinematic body, never a dynamic one. Reads back as the object form on every copy: `{ body, collider?, … }`, a string shorthand spelled into it; null where no body is authored.
  air?: boolean   // true: its inside is air. The place's sea and ground water stay out of its convex hull, so a body in it stands dry and an eye in it sees no underwater tint, fog or distortion: a glass dome, a diving bell, a submarine's cabin. A hollow that is not convex is several such things. With `visible: false` it is an air volume of its own shape. A pool or a tank inside it is its own water.
  press?: PressContactSpec | PressContactSpec[] | null   // what leans the ground cover (the blades lean away and spring back in ~1 s): omitted = the body's own contacts: a walker its feet ({ radius: 0.6, strength: 1 }), a dynamic body its whole footprint, a wheeled appliance its hull's footprint and each wheel, a seated walker nothing: the ride presses; { radius, strength? } at the feet, or a list [{ at: [x, y, z], radius, strength?, below? }]: a car hull's four wheel contacts; [] presses nothing; null = the body's own again
  scatter?: ScatterSpec   // a bed of instances over an area (heightmap-terrain skill)
  blueprint?: { label?: string; category?: string; icon?: string }   // a god-mode palette entry
}
````


### After clicking "ObjectSpec"

Object specification for api.spawn(spec) Creates a new object in the world: its fields (feetPosition, primitive, material, physics, …) sit flat beside id, tags, state, behavior, children.

ObjectSpec = ObjectProperties & { id?: string // minted when omitted; a placement's id tags?: string[] place?: string // default: the parent's place, else the spawning script's place at that moment (the world's sim.js: the default place unless ctx.place moved it) audience?: ObjectAudience // who sees it: "near" (default: the ring around it) | "all" (everyone in the world, from any place, however far: a global manager, a boss, a stage) | "local" (only this machine) simulatedBy?: PlatformDial // who simulates it, "platform": the row runs only on Jayzee's own machine, never on a player's client, even in a room of one (an economy row, a dealer, a bank); omitted: one machine simulates it as any row. `obj.simulatedBy = "platform"` flips it live and saves it on the row visibility?: ObjectVisibility // who may hear it at all: absent (the default: everyone the audience names) | "owner" (its owner's screen alone, the player whose body carries it or whose session spawned it, plus Jayzee's own machine, the creator and Cleetus: a card hand) | "platform" (Jayzee's own machine, the creator and Cleetus alone: a deck) lifetime?: number // seconds, then destroyed scope?: "session" | "world" // "session": dies when the spawning player leaves; "world" (default) outlives them retention?: ObjectRetention // "none": shared live, never saved; every player in its audience sees it, nothing of it is kept, a player who joins later sees it from its next word, and it leaves when its spawner leaves; omitted (default): kept for the room state?: TomeState behavior?: BehaviorRef // "scripts/x.js" | [...]; at runtime obj.behavior.push("scripts/y.js") attaches children?: ObjectSpec[] // A thing made of pieces is ONE jayzee: light, fx, sound too are its children at local offsets; move the root, the thing moves. A child's id is local to its root (the entity is `<root>/<id>`, so one template's `flame` serves every placement). With `template`: each child here merges onto the template's child of the same id (or, when that child has no id, the same seat, which your id then names), and says only what changes: `{ id: "flame", state: { seed } }` keeps the template flame's sprite, light and behavior; a child the template lacks is added; null or [] = no children parent?: string // "player" on a template root = each player's composed body, stamped per player template?: string // "templates/archway.js#archway": jayzee that template's def; the placement names the template (edit the file, every placement follows) and the fields beside it are this one's overrides overrides?: Record<string, unknown> // with `template`: this placement's pairs in the scene entry's spelling: { "feetPosition": {…}, "state.link": "…", "children.flame.light.intensity": 2, "children.lamp": null } (the fields / state / tags beside it say the same; `children.<id>` reaches one template child by its id, null there removes it) }

#### Block 1

````text
ObjectSpec = ObjectProperties & {
  id?: string   // minted when omitted; a placement's id
  tags?: string[]
  place?: string   // default: the parent's place, else the spawning script's place at that moment (the world's sim.js: the default place unless ctx.place moved it)
  audience?: ObjectAudience   // who sees it: "near" (default: the ring around it) | "all" (everyone in the world, from any place, however far: a global manager, a boss, a stage) | "local" (only this machine)
  simulatedBy?: PlatformDial   // who simulates it, "platform": the row runs only on Spawn's own machine, never on a player's client, even in a room of one (an economy row, a dealer, a bank); omitted: one machine simulates it as any row. `obj.simulatedBy = "platform"` flips it live and saves it on the row
  visibility?: ObjectVisibility   // who may hear it at all: absent (the default: everyone the audience names) | "owner" (its owner's screen alone, the player whose body carries it or whose session spawned it, plus Spawn's own machine, the creator and Savi: a card hand) | "platform" (Spawn's own machine, the creator and Savi alone: a deck)
  lifetime?: number   // seconds, then destroyed
  scope?: "session" | "world"   // "session": dies when the spawning player leaves; "world" (default) outlives them
  retention?: ObjectRetention   // "none": shared live, never saved; every player in its audience sees it, nothing of it is kept, a player who joins later sees it from its next word, and it leaves when its spawner leaves; omitted (default): kept for the room
  state?: TomeState
  behavior?: BehaviorRef   // "scripts/x.js" | [...]; at runtime obj.behavior.push("scripts/y.js") attaches
  children?: ObjectSpec[]   // A thing made of pieces is ONE spawn: light, fx, sound too are its children at local offsets; move the root, the thing moves. A child's id is local to its root (the entity is `<root>/<id>`, so one template's `flame` serves every placement). With `template`: each child here merges onto the template's child of the same id (or, when that child has no id, the same seat, which your id then names), and says only what changes: `{ id: "flame", state: { seed } }` keeps the template flame's sprite, light and behavior; a child the template lacks is added; null or [] = no children
  parent?: string   // "player" on a template root = each player's composed body, stamped per player
  template?: string   // "templates/archway.js#archway": spawn that template's def; the placement names the template (edit the file, every placement follows) and the fields beside it are this one's overrides
  overrides?: Record<string, unknown>   // with `template`: this placement's pairs in the scene entry's spelling: { "feetPosition": {…}, "state.link": "…", "children.flame.light.intensity": 2, "children.lamp": null } (the fields / state / tags beside it say the same; `children.<id>` reaches one template child by its id, null there removes it)
}
````


### After clicking "PrimitiveSpec"

Primitive geometry specification Kinds: cube, box, sphere, cylinder, capsule, plane, torus, octahedron, tube, cone, ring, tetrahedron, icosahedron, dodecahedron, pyramid, lathe, extrude, circle, torusKnot, frustum, ellipsoid, superellipsoid, hollowCylinder, hemisphere, arch, line, custom, scripted,…

PrimitiveSpec = | { kind: "cube"; size?: number; segments?: number } & PrimitiveBase | { kind: "box"; width?: number; height?: number; depth?: number; widthSegments?: number; heightSegments?: number; depthSegments?: number } & PrimitiveBase | { kind: "sphere"; radius?: number; widthSegments?: number; heightSegments?: number; phiStart?: number; phiLength?: number; thetaStart?: number; thetaLength?: number } & PrimitiveBase | { kind: "cylinder"; radiusTop?: number; radiusBottom?: number; height?: number; radialSegments?: number; heightSegments?: number; openEnded?: boolean; thetaStart?: number; thetaLength?: number } & PrimitiveBase | { kind: "capsule"; radius?: number; halfHeight?: number; capSegments?: number; radialSegments?: number } & PrimitiveBase | { kind: "plane"; width?: number; height?: number; widthSegments?: number; heightSegments?: number } & PrimitiveBase // Stands upright (XY, normal +Z) with no rotation, as in three.js; pitch -90 lays it flat on the ground. Drawn on both faces (DoubleSide), lit from either side. In a world converted from 5.x (world.config.yaml `engine.scriptGrammar: "5.x"`) a plane a SCRIPT spawns lies flat with no rotation (face up on XZ, its bottom at the feet, as it lay on 5.x), and there pitch -90 stands it up; a placement row reads the upright frame. | { kind: "torus"; radius?: number; tube?: number; radialSegments?: number; tubularSegments?: number; arc?: number } & PrimitiveBase // Stands upright (XY, hole axis +Z) with no rotation, as in three.js; pitch -90 lays it flat on the ground. In a world converted from 5.x (world.config.yaml `engine.scriptGrammar: "5.x"`) a torus a SCRIPT spawns lies flat with no rotation (its hole axis vertical, its bottom at the feet, as it lay on 5.x), and there pitch -90 stands it up; a placement row reads the upright frame. | { kind: "octahedron"; radius?: number; detail?: number } & PrimitiveBase // The iconic Sims plumbob shape - an octahedron (8-sided diamond crystal) | { kind: "tube"; points: Array<[number, number, number]>; radius?: number; radialSegments?: number; tubularSegments?: number; closed?: boolean; straight?: boolean } & PrimitiveBase // A smooth (Catmull-Rom) OR straight-segment tube following a path of 3D points. Use `straight: true` for hard-corner guide rails (e.g. a closed fence's selection connector): the renderer then builds the geometry from per-segment line curves instead of smoothing through the corner points. | { kind: "cone"; radius?: number; height?: number; radialSegments?: number; heightSegments?: number; openEnded?: boolean; thetaStart?: number; thetaLength?: number } & PrimitiveBase | { kind: "ring"; innerRadius?: number; outerRadius?: number; thetaSegments?: number; phiSegments?: number; thetaStart?: number; thetaLength?: number } & PrimitiveBase // Annulus (a disc with a hole). Stands upright (XY, normal +Z) with no rotation, as in three.js; pitch -90 lays it flat on the ground. Drawn on both faces (DoubleSide), lit from either side. In a world converted from 5.x (world.config.yaml `engine.scriptGrammar: "5.x"`) a ring a SCRIPT spawns lies flat with no rotation (face up on XZ, its bottom at the feet, as it lay on 5.x), and there pitch -90 stands it up; a placement row reads the upright frame. | { kind: "tetrahedron"; radius?: number; detail?: number } & PrimitiveBase // Simplest platonic solid - 4-sided pyramid (crystal/spike shape) | { kind: "icosahedron"; radius?: number; detail?: number } & PrimitiveBase // Very smooth sphere approximation - 20-sided platonic solid | { kind: "dodecahedron"; radius?: number; detail?: number } & PrimitiveBase // 12-sided platonic solid | { kind: "pyramid"; radius?: number; height?: number; segments?: number; width?: number; depth?: number; thetaStart?: number } & PrimitiveBase // Square-base pyramid (different from tetrahedron) Square-base pyramid: `radius` circumscribes the base (`segments` sides, 4 by default), or `width` × `depth` names an axis-aligned rectangular base (a blade tip, a roof), the spelling a box-minded author reaches for. | { kind: "lathe"; points: Array<[number, number]>; segments?: number; phiStart?: number; phiLength?: number } & PrimitiveBase // Rotate a 2D profile around an axis (vases, goblets, bowls) | { kind: "extrude"; shape: Array<[number, number]> | string; holes?: Array<Array<[number, number]>>; depth?: number; bevelEnabled?: boolean; bevelThickness?: number; bevelSize?: number; bevelSegments?: number; curveSegments?: number } & PrimitiveBase // Extrude a 2D outline along Z by `depth` (metres). `shape` is [x, y] points (y up) or SVG path data ("M0 0 L1 0 L1 1 Z": y down as drawn, flipped so the drawing's top is up) whose further subpaths cut holes the way an SVG fill reads them: a subpath inside another is a hole, one inside a hole is solid again. A hole with a point outside the outline is dropped and told once. The outline's box stands centred on x and z with its lowest point at the feet. A ramp rising `h` over a run `w` toward +X is `shape: [[0, 0], [w, 0], [w, h]]`; a roof is `[[-w / 2, 0], [w / 2, 0], [0, h]]`. | { kind: "circle"; radius?: number; segments?: number; thetaStart?: number; thetaLength?: number } & PrimitiveBase // Solid disc (a ring with no hole). Stands upright (XY, normal +Z) with no rotation, as in three.js; pitch -90 lays it flat on the ground. Drawn on both faces (DoubleSide), lit from either side. In a world converted from 5.x (world.config.yaml `engine.scriptGrammar: "5.x"`) a circle a SCRIPT spawns lies flat with no rotation (face up on XZ, its bottom at the feet, as it lay on 5.x), and there pitch -90 stands it up; a placement row reads the upright frame. | { kind: "torusKnot"; radius?: number; tube?: number; radialSegments?: number; tubularSegments?: number; p?: number; q?: number } & PrimitiveBase // Knotted torus shape | { kind: "frustum"; radiusTop?: number; radiusBottom?: number; height?: number; segments?: number } & PrimitiveBase // Truncated pyramid/cone (frustum) | { kind: "ellipsoid"; radiusX?: number; radiusY?: number; radiusZ?: number; widthSegments?: number; heightSegments?: number } & PrimitiveBase // Stretched sphere (ellipsoid) | { kind: "superellipsoid"; a?: number; b?: number; c?: number; n1?: number; n2?: number; segments?: number } & PrimitiveBase // Superellipsoid (rounded box/sphere hybrid) | { kind: "hollowCylinder"; innerRadius?: number; outerRadius?: number; height?: number; radialSegments?: number; openEnded?: boolean } & PrimitiveBase // Cylinder with an inner hole (wells, pipes, turrets, chimneys) | { kind: "hemisphere"; radius?: number; segments?: number; direction?: "up" | "down" } & PrimitiveBase // Half a sphere ("up" = dome/cap, "down" = bowl/cavity) | { kind: "arch"; width?: number; height?: number; depth?: number; segments?: number } & PrimitiveBase // Half-torus arch shape (doorways, bridges, window arches, aqueducts) | { kind: "archway"; width?: number; height?: number; depth?: number; thickness?: number; segments?: number } & PrimitiveBase // Hollow arch frame (gate surrounds, doorway frames, window frames with curved top) | { kind: "squareArch"; width?: number; height?: number; depth?: number; archWidth?: number; archHeight?: number; segments?: number } & PrimitiveBase // Solid rectangular block with semicircular arch cutout at the bottom (castle gate walls) | { kind: "wall"; width: number; height: number; depth: number; holes?: Array<{ x: number; bottomY?: number; y?: number; w: number; h: number }>; facing?: "z" | "x" | "y" } & PrimitiveBase // Rectangular wall with rectangular holes (windows, doors). Single mesh with proper normals. | { kind: "line"; points?: [number, number, number][]; segments?: boolean; count?: number; bounds?: { min: [number, number, number]; max: [number, number, number] } } // Line primitive (three's Line2): a line through `points` (metres in the object's frame), each joined to the next, drawn as wide across the screen as its scripted material's `linewidth` (LineBasicNodeMaterial / Line2NodeMaterial, `jayzee api builtin/three`: CSS pixels, or metres with `worldUnits`), with round ends and joins. `segments: true` joins each pair of points instead (three's LineSegments2). instanceIndex is a segment's number. Points a buffer holds: `count` points and no `points`, each placed by the material's positionNode reading `vertexIndex`, inside `bounds` (the room they stand in, as an instance set's). Unlit; no collider. | { kind: "custom"; geometry: BespokeGeometrySpec; forward?: ForwardAxis; sockets?: PrimitiveSockets } // Custom geometry primitive (bespoke mesh) | { kind: "scripted"; script: ScriptRef; params?: Record<string, unknown>; seed?: number; forward?: ForwardAxis; sockets?: PrimitiveSockets } // Scripted geometry primitive: script exports geometry() and optional collider(); collider() may return a heightfield: an object's ground from a grid of heights (`jayzee api ColliderHeightfield`) | { kind: "points"; count: number; bounds?: { min: [number, number, number]; max: [number, number, number] } } // Points primitive (three's Points): `count` points, drawn by the object's scripted PointsNodeMaterial (`jayzee api builtin/three`): its positionNode places point `instanceIndex` in the object's frame, sizeNode sizes it in CSS pixels, colorNode and opacityNode colour it. `bounds` (min/max, metres in the object's frame) is the room the points stand in: the object is skipped where the eye does not see it, and `.bounds` reads it. // PrimitiveSpec, every kind but "line" | "custom" | "scripted" | "points" sockets?: Record<string, { x: number; y: number; z: number } | [number, number, number] | { position: { x: number; y: number; z: number } | [number, number, number]; direction?: { x: number; y: number; z: number } | [number, number, number] }> // Named points in the shape's own frame (metres from the feet, before scale): a child's `attachment: { socket }` anchor and the socket read's answer. The renderer ignores them. // PrimitiveSpec, kind "pyramid" thetaStart?: number // Internal: the canonical form's base turn (π/4 for a width × depth base so the corners sit on the axes' diagonals). // PrimitiveSpec, kind "lathe" points: Array<[number, number]> // 2D profile points [x, y] where x is distance from axis, y is height // PrimitiveSpec, kind "extrude" shape: Array<[number, number]> | string // outline: [x, y] points (y up) or SVG path data (subpaths = outline + holes) holes?: Array<Array<[number, number]>> // point-list holes cut from the outline, [x, y] (y up) // PrimitiveSpec, kind "torusKnot" p?: number // Knot parameter p q?: number // Knot parameter q // PrimitiveSpec, kind "superellipsoid" a?: number // X-axis radius b?: number // Y-axis radius c?: number // Z-axis radius n1?: number // North-south rounding parameter n2?: number // East-west rounding parameter // PrimitiveSpec, kind "archway" width?: number // outer width of the frame height?: number // outer height of the frame depth?: number // extrusion depth (wall thickness) thickness?: number // frame member thickness // PrimitiveSpec, kind "squareArch" width?: number // total width (default 6) height?: number // total height (default 8) depth?: number // thickness/extrusion (default 1) archWidth?: number // width of the arch opening (default: width * 0.6) archHeight?: number // height of the arch apex (default: archWidth/2 for semicircle) segments?: number // smoothness of arch curve (default 16) // PrimitiveSpec, kind "wall" width: number // span along the wall face depth: number // wall thickness holes?: Array<{ x: number; bottomY?: number; y?: number; w: number; h: number }> // center-x, bottomY, width, height facing?: "z" | "x" | "y" // which axis the face is perpendicular to (default: "z") // PrimitiveSpec, kind "custom" forward?: ForwardAxis // The axis the mesh was modelled to face (default "-z"); the engine turns the geometry to −Z once. A child's `feetPosition` does not turn: it stays in the object's frame, whose front is −Z. sockets?: PrimitiveSockets // Named points in the modelled frame (metres from the feet): a child's `attachment: { socket }` anchor and `getObjectSocket`'s answer. // PrimitiveSpec, kind "scripted" params?: Record<string, unknown> // The script's ctx.params. A param whose value is `{ samples: "/cdn/value.<sha>.png" }` (an uploaded PNG) arrives as its pixels (`jayzee api GeometryContext`); a bare address stays a string. seed?: number // Deterministic seed for ctx.random/noise (default 0). Scatter templates that omit it get a per-instance seed, so scattered instances vary; set it explicitly when every instance should be identical. forward?: ForwardAxis // The axis the script's geometry was modelled to face (default "-z"); the engine turns every emitted vertex, normal, collider point and socket to −Z once, at the derive. A child's `feetPosition` does not turn: it stays in the object's frame, whose front is −Z. // PrimitiveSpec, kind "points" count: number // how many points, one round point a copy (instanceIndex 0 to count − 1), each placed by the object's PointsNodeMaterial (builtin/three): positionNode, sizeNode in CSS pixels

#### Block 1

````text
PrimitiveSpec =
  | { kind: "cube"; size?: number; segments?: number } & PrimitiveBase
  | { kind: "box"; width?: number; height?: number; depth?: number; widthSegments?: number; heightSegments?: number; depthSegments?: number } & PrimitiveBase
  | { kind: "sphere"; radius?: number; widthSegments?: number; heightSegments?: number; phiStart?: number; phiLength?: number; thetaStart?: number; thetaLength?: number } & PrimitiveBase
  | { kind: "cylinder"; radiusTop?: number; radiusBottom?: number; height?: number; radialSegments?: number; heightSegments?: number; openEnded?: boolean; thetaStart?: number; thetaLength?: number } & PrimitiveBase
  | { kind: "capsule"; radius?: number; halfHeight?: number; capSegments?: number; radialSegments?: number } & PrimitiveBase
  | { kind: "plane"; width?: number; height?: number; widthSegments?: number; heightSegments?: number } & PrimitiveBase   // Stands upright (XY, normal +Z) with no rotation, as in three.js; pitch -90 lays it flat on the ground. Drawn on both faces (DoubleSide), lit from either side. In a world converted from 5.x (world.config.yaml `engine.scriptGrammar: "5.x"`) a plane a SCRIPT spawns lies flat with no rotation (face up on XZ, its bottom at the feet, as it lay on 5.x), and there pitch -90 stands it up; a placement row reads the upright frame.
  | { kind: "torus"; radius?: number; tube?: number; radialSegments?: number; tubularSegments?: number; arc?: number } & PrimitiveBase   // Stands upright (XY, hole axis +Z) with no rotation, as in three.js; pitch -90 lays it flat on the ground. In a world converted from 5.x (world.config.yaml `engine.scriptGrammar: "5.x"`) a torus a SCRIPT spawns lies flat with no rotation (its hole axis vertical, its bottom at the feet, as it lay on 5.x), and there pitch -90 stands it up; a placement row reads the upright frame.
  | { kind: "octahedron"; radius?: number; detail?: number } & PrimitiveBase   // The iconic Sims plumbob shape - an octahedron (8-sided diamond crystal)
  | { kind: "tube"; points: Array<[number, number, number]>; radius?: number; radialSegments?: number; tubularSegments?: number; closed?: boolean; straight?: boolean } & PrimitiveBase   // A smooth (Catmull-Rom) OR straight-segment tube following a path of 3D points. Use `straight: true` for hard-corner guide rails (e.g. a closed fence's selection connector): the renderer then builds the geometry from per-segment line curves instead of smoothing through the corner points.
  | { kind: "cone"; radius?: number; height?: number; radialSegments?: number; heightSegments?: number; openEnded?: boolean; thetaStart?: number; thetaLength?: number } & PrimitiveBase
  | { kind: "ring"; innerRadius?: number; outerRadius?: number; thetaSegments?: number; phiSegments?: number; thetaStart?: number; thetaLength?: number } & PrimitiveBase   // Annulus (a disc with a hole). Stands upright (XY, normal +Z) with no rotation, as in three.js; pitch -90 lays it flat on the ground. Drawn on both faces (DoubleSide), lit from either side. In a world converted from 5.x (world.config.yaml `engine.scriptGrammar: "5.x"`) a ring a SCRIPT spawns lies flat with no rotation (face up on XZ, its bottom at the feet, as it lay on 5.x), and there pitch -90 stands it up; a placement row reads the upright frame.
  | { kind: "tetrahedron"; radius?: number; detail?: number } & PrimitiveBase   // Simplest platonic solid - 4-sided pyramid (crystal/spike shape)
  | { kind: "icosahedron"; radius?: number; detail?: number } & PrimitiveBase   // Very smooth sphere approximation - 20-sided platonic solid
  | { kind: "dodecahedron"; radius?: number; detail?: number } & PrimitiveBase   // 12-sided platonic solid
  | { kind: "pyramid"; radius?: number; height?: number; segments?: number; width?: number; depth?: number; thetaStart?: number } & PrimitiveBase   // Square-base pyramid (different from tetrahedron) Square-base pyramid: `radius` circumscribes the base (`segments` sides, 4 by default), or `width` × `depth` names an axis-aligned rectangular base (a blade tip, a roof), the spelling a box-minded author reaches for.
  | { kind: "lathe"; points: Array<[number, number]>; segments?: number; phiStart?: number; phiLength?: number } & PrimitiveBase   // Rotate a 2D profile around an axis (vases, goblets, bowls)
  | { kind: "extrude"; shape: Array<[number, number]> | string; holes?: Array<Array<[number, number]>>; depth?: number; bevelEnabled?: boolean; bevelThickness?: number; bevelSize?: number; bevelSegments?: number; curveSegments?: number } & PrimitiveBase   // Extrude a 2D outline along Z by `depth` (metres). `shape` is [x, y] points (y up) or SVG path data ("M0 0 L1 0 L1 1 Z": y down as drawn, flipped so the drawing's top is up) whose further subpaths cut holes the way an SVG fill reads them: a subpath inside another is a hole, one inside a hole is solid again. A hole with a point outside the outline is dropped and told once. The outline's box stands centred on x and z with its lowest point at the feet. A ramp rising `h` over a run `w` toward +X is `shape: [[0, 0], [w, 0], [w, h]]`; a roof is `[[-w / 2, 0], [w / 2, 0], [0, h]]`.
  | { kind: "circle"; radius?: number; segments?: number; thetaStart?: number; thetaLength?: number } & PrimitiveBase   // Solid disc (a ring with no hole). Stands upright (XY, normal +Z) with no rotation, as in three.js; pitch -90 lays it flat on the ground. Drawn on both faces (DoubleSide), lit from either side. In a world converted from 5.x (world.config.yaml `engine.scriptGrammar: "5.x"`) a circle a SCRIPT spawns lies flat with no rotation (face up on XZ, its bottom at the feet, as it lay on 5.x), and there pitch -90 stands it up; a placement row reads the upright frame.
  | { kind: "torusKnot"; radius?: number; tube?: number; radialSegments?: number; tubularSegments?: number; p?: number; q?: number } & PrimitiveBase   // Knotted torus shape
  | { kind: "frustum"; radiusTop?: number; radiusBottom?: number; height?: number; segments?: number } & PrimitiveBase   // Truncated pyramid/cone (frustum)
  | { kind: "ellipsoid"; radiusX?: number; radiusY?: number; radiusZ?: number; widthSegments?: number; heightSegments?: number } & PrimitiveBase   // Stretched sphere (ellipsoid)
  | { kind: "superellipsoid"; a?: number; b?: number; c?: number; n1?: number; n2?: number; segments?: number } & PrimitiveBase   // Superellipsoid (rounded box/sphere hybrid)
  | { kind: "hollowCylinder"; innerRadius?: number; outerRadius?: number; height?: number; radialSegments?: number; openEnded?: boolean } & PrimitiveBase   // Cylinder with an inner hole (wells, pipes, turrets, chimneys)
  | { kind: "hemisphere"; radius?: number; segments?: number; direction?: "up" | "down" } & PrimitiveBase   // Half a sphere ("up" = dome/cap, "down" = bowl/cavity)
  | { kind: "arch"; width?: number; height?: number; depth?: number; segments?: number } & PrimitiveBase   // Half-torus arch shape (doorways, bridges, window arches, aqueducts)
  | { kind: "archway"; width?: number; height?: number; depth?: number; thickness?: number; segments?: number } & PrimitiveBase   // Hollow arch frame (gate surrounds, doorway frames, window frames with curved top)
  | { kind: "squareArch"; width?: number; height?: number; depth?: number; archWidth?: number; archHeight?: number; segments?: number } & PrimitiveBase   // Solid rectangular block with semicircular arch cutout at the bottom (castle gate walls)
  | { kind: "wall"; width: number; height: number; depth: number; holes?: Array<{ x: number; bottomY?: number; y?: number; w: number; h: number }>; facing?: "z" | "x" | "y" } & PrimitiveBase   // Rectangular wall with rectangular holes (windows, doors). Single mesh with proper normals.
  | { kind: "line"; points?: [number, number, number][]; segments?: boolean; count?: number; bounds?: { min: [number, number, number]; max: [number, number, number] } }   // Line primitive (three's Line2): a line through `points` (metres in the object's frame), each joined to the next, drawn as wide across the screen as its scripted material's `linewidth` (LineBasicNodeMaterial / Line2NodeMaterial, `spawn api builtin/three`: CSS pixels, or metres with `worldUnits`), with round ends and joins. `segments: true` joins each pair of points instead (three's LineSegments2). instanceIndex is a segment's number. Points a buffer holds: `count` points and no `points`, each placed by the material's positionNode reading `vertexIndex`, inside `bounds` (the room they stand in, as an instance set's). Unlit; no collider.
  | { kind: "custom"; geometry: BespokeGeometrySpec; forward?: ForwardAxis; sockets?: PrimitiveSockets }   // Custom geometry primitive (bespoke mesh)
  | { kind: "scripted"; script: ScriptRef; params?: Record<string, unknown>; seed?: number; forward?: ForwardAxis; sockets?: PrimitiveSockets }   // Scripted geometry primitive: script exports geometry() and optional collider(); collider() may return a heightfield: an object's ground from a grid of heights (`spawn api ColliderHeightfield`)
  | { kind: "points"; count: number; bounds?: { min: [number, number, number]; max: [number, number, number] } }   // Points primitive (three's Points): `count` points, drawn by the object's scripted PointsNodeMaterial (`spawn api builtin/three`): its positionNode places point `instanceIndex` in the object's frame, sizeNode sizes it in CSS pixels, colorNode and opacityNode colour it. `bounds` (min/max, metres in the object's frame) is the room the points stand in: the object is skipped where the eye does not see it, and `.bounds` reads it.

// PrimitiveSpec, every kind but "line" | "custom" | "scripted" | "points"
  sockets?: Record<string, { x: number; y: number; z: number } | [number, number, number] | { position: { x: number; y: number; z: number } | [number, number, number]; direction?: { x: number; y: number; z: number } | [number, number, number] }>   // Named points in the shape's own frame (metres from the feet, before scale): a child's `attachment: { socket }` anchor and the socket read's answer. The renderer ignores them.

// PrimitiveSpec, kind "pyramid"
  thetaStart?: number   // Internal: the canonical form's base turn (π/4 for a width × depth base so the corners sit on the axes' diagonals).

// PrimitiveSpec, kind "lathe"
  points: Array<[number, number]>   // 2D profile points [x, y] where x is distance from axis, y is height

// PrimitiveSpec, kind "extrude"
  shape: Array<[number, number]> | string   // outline: [x, y] points (y up) or SVG path data (subpaths = outline + holes)
  holes?: Array<Array<[number, number]>>   // point-list holes cut from the outline, [x, y] (y up)

// PrimitiveSpec, kind "torusKnot"
  p?: number   // Knot parameter p
  q?: number   // Knot parameter q

// PrimitiveSpec, kind "superellipsoid"
  a?: number   // X-axis radius
  b?: number   // Y-axis radius
  c?: number   // Z-axis radius
  n1?: number   // North-south rounding parameter
  n2?: number   // East-west rounding parameter

// PrimitiveSpec, kind "archway"
  width?: number   // outer width of the frame
  height?: number   // outer height of the frame
  depth?: number   // extrusion depth (wall thickness)
  thickness?: number   // frame member thickness

// PrimitiveSpec, kind "squareArch"
  width?: number   // total width (default 6)
  height?: number   // total height (default 8)
  depth?: number   // thickness/extrusion (default 1)
  archWidth?: number   // width of the arch opening (default: width * 0.6)
  archHeight?: number   // height of the arch apex (default: archWidth/2 for semicircle)
  segments?: number   // smoothness of arch curve (default 16)

// PrimitiveSpec, kind "wall"
  width: number   // span along the wall face
  depth: number   // wall thickness
  holes?: Array<{ x: number; bottomY?: number; y?: number; w: number; h: number }>   // center-x, bottomY, width, height
  facing?: "z" | "x" | "y"   // which axis the face is perpendicular to (default: "z")

// PrimitiveSpec, kind "custom"
  forward?: ForwardAxis   // The axis the mesh was modelled to face (default "-z"); the engine turns the geometry to −Z once. A child's `feetPosition` does not turn: it stays in the object's frame, whose front is −Z.
  sockets?: PrimitiveSockets   // Named points in the modelled frame (metres from the feet): a child's `attachment: { socket }` anchor and `getObjectSocket`'s answer.

// PrimitiveSpec, kind "scripted"
  params?: Record<string, unknown>   // The script's ctx.params. A param whose value is `{ samples: "/cdn/value.<sha>.png" }` (an uploaded PNG) arrives as its pixels (`spawn api GeometryContext`); a bare address stays a string.
  seed?: number   // Deterministic seed for ctx.random/noise (default 0). Scatter templates that omit it get a per-instance seed, so scattered instances vary; set it explicitly when every instance should be identical.
  forward?: ForwardAxis   // The axis the script's geometry was modelled to face (default "-z"); the engine turns every emitted vertex, normal, collider point and socket to −Z once, at the derive. A child's `feetPosition` does not turn: it stays in the object's frame, whose front is −Z.

// PrimitiveSpec, kind "points"
  count: number   // how many points, one round point a copy (instanceIndex 0 to count − 1), each placed by the object's PointsNodeMaterial (builtin/three): positionNode, sizeNode in CSS pixels
````


### After clicking "ScriptedPrimitiveSpec"

Scripted geometry primitive: script exports geometry() and optional collider(); collider() may return a heightfield: an object's ground from a grid of heights (jayzee api ColliderHeightfield)

ScriptedPrimitiveSpec = { kind: "scripted" script: ScriptRef params?: Record<string, unknown> // The script's ctx.params. A param whose value is `{ samples: "/cdn/value.<sha>.png" }` (an uploaded PNG) arrives as its pixels (`jayzee api GeometryContext`); a bare address stays a string. seed?: number // Deterministic seed for ctx.random/noise (default 0). Scatter templates that omit it get a per-instance seed, so scattered instances vary; set it explicitly when every instance should be identical. forward?: ForwardAxis // The axis the script's geometry was modelled to face (default "-z"); the engine turns every emitted vertex, normal, collider point and socket to −Z once, at the derive. A child's `feetPosition` does not turn: it stays in the object's frame, whose front is −Z. sockets?: PrimitiveSockets // Named points in the modelled frame (metres from the feet): a child's `attachment: { socket }` anchor and `getObjectSocket`'s answer. }

#### Block 1

````text
ScriptedPrimitiveSpec = {
  kind: "scripted"
  script: ScriptRef
  params?: Record<string, unknown>   // The script's ctx.params. A param whose value is `{ samples: "/cdn/value.<sha>.png" }` (an uploaded PNG) arrives as its pixels (`spawn api GeometryContext`); a bare address stays a string.
  seed?: number   // Deterministic seed for ctx.random/noise (default 0). Scatter templates that omit it get a per-instance seed, so scattered instances vary; set it explicitly when every instance should be identical.
  forward?: ForwardAxis   // The axis the script's geometry was modelled to face (default "-z"); the engine turns every emitted vertex, normal, collider point and socket to −Z once, at the derive. A child's `feetPosition` does not turn: it stays in the object's frame, whose front is −Z.
  sockets?: PrimitiveSockets   // Named points in the modelled frame (metres from the feet): a child's `attachment: { socket }` anchor and `getObjectSocket`'s answer.
}
````


### After clicking "MaterialSpec"

MaterialSpec = | { texture?: string | null; time?: number; timeAt?: number; paused?: boolean; speed?: number; view?: { link: string; oneWay?: boolean; spill?: number; sound?: number } | { camera: ViewCamera; cadence?: string; size?: number } | null; canvas?: string | null; pbr?: boolean | "fal1"; normalMap?: string; roughnessMap?: string; metalnessMap?: string; alphaMap?: string; normalScale?: number; alphaTest?: number; color?: Color; repeat?: [number, number]; textureScale?: number; wrap?: "repeat" | "clamp"; filter?: "pixel" | "linear"; metalness?: number; roughness?: number; opacity?: number; transparent?: boolean; emissive?: Color; emissiveIntensity?: number; emissiveMap?: string; unlit?: boolean; dissolve?: number; side?: "front" | "back" | "double"; vertexColors?: boolean; depthWrite?: boolean; depthTest?: boolean; renderOrder?: number; drawsOver?: string[] | { parts: string[]; strength?: number; angle?: number }; outline?: boolean | { color?: Color; width?: number; warm?: number; lightness?: number } | null; polygonOffset?: boolean; polygonOffsetFactor?: number; polygonOffsetUnits?: number; blending?: "none" | "normal" | "additive" | "subtractive" | "multiply" | "custom"; blendSrc?: BlendFactor; blendDst?: BlendFactor; blendEquation?: BlendEquation; blendSrcAlpha?: BlendFactor; blendDstAlpha?: BlendFactor; blendEquationAlpha?: BlendEquation; premultipliedAlpha?: boolean; colorWrite?: boolean; clippingPlanes?: ClipPlane[] | null; clipIntersection?: boolean; clipShadows?: boolean; overrides?: MaterialOverridesSpec } // Material configuration for primitives and models - color: OKLCH string (e.g., "oklch(0.65 0.25 25)") - texture: CDN path to texture; a video's address plays on the surface, a screen in the world: an .mp4 clip loops from its start, an .m3u8 address plays its live stream. The picture is silent: audio: { clip: <the same address>, spatial: true } on the object plays its sound from the screen - pbr: true derives Patina normal, roughness, and metalness maps from a raster texture - repeat: [u, v]; copies of the picture across the surface (the default fit); under wrap: "repeat" a multiplier on the tiling's density: textures tile at one repeat per world meter on every face of every primitive; 2 = twice as dense. textureScale (meters per tile) is the same dial's older spelling. - wrap: omitted, the picture fits once across the surface, on the shape's own 0..1 UVs: an equirectangular map wraps once around a sphere, a poster fills a plane once, a label runs once around a cylinder's side; repeat then counts copies. "repeat" is the one word that tiles it (the tiling above: fabric, brick, felt); the texture's name never decides. A scripted body samples its own UVs and tiles them unless "clamp" - metalness/roughness: PBR material properties (0-1) - emissive: Glow color (glows at strength 1 on its own), emissiveIntensity: glow strength - unlit: true skips lighting; the color/texture and emissive land flat, no shade or shadow on the surface (default false) - opacity: 0..1, blends in linear light: over a dark background one white layer at 0.07 reads 28% solid, 0.015 reads 7%; a primitive with no side draws both faces, so 0.07 reads 44%, 0.015 13% - view: a place's live picture on the surface: a door's glass onto another place, or this place from a camera (see `view` field doc) - canvas: the live picture of a <canvas> the game's ui draws into, by its id (see `canvas` field doc) | { kind: "water"; underwater?: UnderwaterSpec; color?: Color; opacity?: number; waveIntensity?: number; waveFrequency?: number; waveHeightScale?: number; flowDirection?: [number, number]; flowSpeed?: number; roughness?: number; normalScale?: number; detailNormalStrength?: number; foamColor?: Color; foamStrength?: number; foamScale?: number; contactFoamWidth?: number; shorelineFoamStrength?: number; shorelineFoamSoftness?: number; crestFoamCoverage?: number; crestFoamStrength?: number; causticsEnabled?: boolean; causticStrength?: number; causticScale?: number; depthColorDistance?: number; refractionStrength?: number; swellAmplitude?: number; swellDirection?: [number, number]; surfWidth?: number; wakeSeconds?: number } // Water material configuration; the default water look (a clear turquoise column: the floor seen through it, caustics, a foam line at every shore and around anything standing in it) with these on top - color: OKLCH string (default: "oklch(0.64 0.11 214)") - opacity: 0-1, the murk; how much of the floor the water hides (default: 0.3; 1 is a solid sheet) - waveIntensity: 0-1 (default: 0.15) | { kind: "scripted"; color?: Color; emissive?: Color; emissiveIntensity?: number; metalness?: number; roughness?: number; opacity?: number; transparent?: boolean; alphaTest?: number; side?: "front" | "back" | "double"; depthWrite?: boolean; depthTest?: boolean; renderOrder?: number; polygonOffset?: boolean; polygonOffsetFactor?: number; polygonOffsetUnits?: number; blending?: "none" | "normal" | "additive" | "subtractive" | "multiply" | "custom"; blendSrc?: BlendFactor; blendDst?: BlendFactor; blendEquation?: BlendEquation; blendSrcAlpha?: BlendFactor; blendDstAlpha?: BlendFactor; blendEquationAlpha?: BlendEquation; premultipliedAlpha?: boolean; colorWrite?: boolean; clippingPlanes?: ClipPlane[] | null; clipIntersection?: boolean; clipShadows?: boolean; underwater?: UnderwaterSpec; drawsOver?: string[] | { parts: string[]; strength?: number; angle?: number }; outline?: boolean | { color?: Color; width?: number; warm?: number; lightness?: number } | null; script: ScriptRef; params?: Record<string, number | boolean | string | DrawMaterialParamTable>; view?: { link: string; oneWay?: boolean; spill?: number; sound?: number } | { camera: ViewCamera; cadence?: string; size?: number } | null } // Scripted material; a script you write builds the material at render time - script: path in scripts/ exporting `material(ctx)` that returns a node material (import from "builtin/tsl" for TSL nodes, from "builtin/three" for node material classes) - params: values passed to the script; numbers, booleans and lists are live uniforms via ctx.param(name, default): a change patches with no recompile, save a list's new length or row width and a value the script reads in plain JS. A list of numbers, or of rows of 2 to 4 numbers, is a table that ctx.param(name, list).element(i) reads by row - the standard fields below land on the material the script builds; a node slot the script authors (colorNode, emissiveNode, …) shadows the field under it. The texture fields are the script's: it samples its own with ctx.texture(cdn), and the ui's <canvas id> with ctx.texture("canvas://<id>"). - a positionNode that reads `time` redraws the object's shadow every frame: `m.castShadowPositionNode = positionLocal` casts the shape at rest The whole material(ctx) contract, the ctx inputs, the surface laws, the failure contract: `jayzee api builtin/three` (the material and its ctx) · `jayzee api builtin/tsl` (the nodes). // the member with no kind is StandardMaterialSpec: `jayzee api StandardMaterialSpec` prints its notes // MaterialSpec, kind "water" underwater?: UnderwaterSpec // The bounded underwater view; present by default. enabled:false disables it. waveFrequency?: number // Unitless spatial scale; default 7.3728 for this water material. Higher values make shorter waves; lower values make longer waves. Each wave stays at full strength up to half the sheet's smaller X/Z span, fades from half to one span, and is absent beyond that span. waveHeightScale?: number // Wave height multiplier; 0 makes a flat sheet. flowDirection?: [number, number] // Flow direction in world X/Z on a level sheet. It is normalized. On a face steeper than 60° (a fall, a standing capsule's side) the water runs down the face under gravity whatever this says. flowSpeed?: number // Flow speed control; 0.1 moves foam about 1.2 metres per second. roughness?: number // Surface roughness, 0 to 1. normalScale?: number // Ripple detail scale; larger values make smaller ripples. detailNormalStrength?: number // Ripple normal strength; 0 removes small ripples. foamColor?: Color // Foam color, lit by the scene. foamStrength?: number // Overall foam strength; 0 removes foam on a level sheet. A fall (a face steeper than 60°) is aerated by its flow whatever this says: flowSpeed 0 is a still glass sheet. foamScale?: number // Foam pattern scale; larger values make smaller patches. contactFoamWidth?: number // Contact band width in metres. shorelineFoamStrength?: number // Foam strength at shores and objects. shorelineFoamSoftness?: number // Softness of the shoreline foam edge. crestFoamCoverage?: number // Fraction of wave crests that can foam, 0 to 1. crestFoamStrength?: number // Foam strength on wave crests. causticsEnabled?: boolean // Enable moving light patterns on submerged objects. causticStrength?: number // Strength of the submerged light patterns. causticScale?: number // Scale of the submerged light patterns. depthColorDistance?: number // Distance in metres over which water takes its deep color. refractionStrength?: number // Strength of the surface view distortion; 0 disables it. swellAmplitude?: number // Height of long sea swells in metres; 0 disables them. swellDirection?: [number, number] // Long swell direction in world X/Z. It is normalized. surfWidth?: number // Width of the breaking surf zone in metres. wakeSeconds?: number // How long, in seconds, the wake a body leaves on this water stays in the picture: the drawn rings and foam fade, and are gone this long after the last body nearby stops moving. Unset: the wake this water draws by default. // MaterialSpec, kind "scripted" emissive?: Color // emissiveIntensity scales it alphaTest?: number // three's alphaTest: the alpha cutoff (0..1) under which a texel is cut renderOrder?: number // draw order among transparent things (higher draws later) underwater?: UnderwaterSpec // Underwater view within this surface's own geometry. Omit for an ordinary material. drawsOver?: string[] | { parts: string[]; strength?: number; angle?: number } // a model part: the same word as a standard part's `drawsOver`: the parts of its own character this scripted part shows through when they cover it; the script keeps its shading outline?: boolean | { color?: Color; width?: number; warm?: number; lightness?: number } | null // an ink line around it: true = a 2-pixel line in a darker shade of its own colour, lit as it is lit; width = that many pixels (of a 1080p picture) up close, up to 63 pixels of the picture drawn; color = shown as given, up to 0.9 of white on each channel; with no color, lightness = the shade's share of its surface's lightness (0..1, default 0.58) and warm = how far the shade leans to a warm brown (0..1, default 0); every line thins with distance and fogs as the world does; drawn only around opaque solids view?: { link: string; oneWay?: boolean; spill?: number; sound?: number } | { camera: ViewCamera; cadence?: string; size?: number } | null // A portal glass: the surface is an aperture onto the linked world (the same `view` a standard material takes: `oneWay`, `spill`, `sound` included) and the script reads it with `ctx.view()` / `ctx.portal`: the portals skill's glass (→portals). `view: { camera }` shows this place from a camera, and `cadence` and `size` set its pictures' rate and pixels, as on a standard material.

#### Block 1

````text
MaterialSpec =
  | { texture?: string | null; time?: number; timeAt?: number; paused?: boolean; speed?: number; view?: { link: string; oneWay?: boolean; spill?: number; sound?: number } | { camera: ViewCamera; cadence?: string; size?: number } | null; canvas?: string | null; pbr?: boolean | "fal1"; normalMap?: string; roughnessMap?: string; metalnessMap?: string; alphaMap?: string; normalScale?: number; alphaTest?: number; color?: Color; repeat?: [number, number]; textureScale?: number; wrap?: "repeat" | "clamp"; filter?: "pixel" | "linear"; metalness?: number; roughness?: number; opacity?: number; transparent?: boolean; emissive?: Color; emissiveIntensity?: number; emissiveMap?: string; unlit?: boolean; dissolve?: number; side?: "front" | "back" | "double"; vertexColors?: boolean; depthWrite?: boolean; depthTest?: boolean; renderOrder?: number; drawsOver?: string[] | { parts: string[]; strength?: number; angle?: number }; outline?: boolean | { color?: Color; width?: number; warm?: number; lightness?: number } | null; polygonOffset?: boolean; polygonOffsetFactor?: number; polygonOffsetUnits?: number; blending?: "none" | "normal" | "additive" | "subtractive" | "multiply" | "custom"; blendSrc?: BlendFactor; blendDst?: BlendFactor; blendEquation?: BlendEquation; blendSrcAlpha?: BlendFactor; blendDstAlpha?: BlendFactor; blendEquationAlpha?: BlendEquation; premultipliedAlpha?: boolean; colorWrite?: boolean; clippingPlanes?: ClipPlane[] | null; clipIntersection?: boolean; clipShadows?: boolean; overrides?: MaterialOverridesSpec }   // Material configuration for primitives and models - color: OKLCH string (e.g., "oklch(0.65 0.25 25)") - texture: CDN path to texture; a video's address plays on the surface, a screen in the world: an .mp4 clip loops from its start, an .m3u8 address plays its live stream. The picture is silent: audio: { clip: <the same address>, spatial: true } on the object plays its sound from the screen - pbr: true derives Patina normal, roughness, and metalness maps from a raster texture - repeat: [u, v]; copies of the picture across the surface (the default fit); under wrap: "repeat" a multiplier on the tiling's density: textures tile at one repeat per world meter on every face of every primitive; 2 = twice as dense. textureScale (meters per tile) is the same dial's older spelling. - wrap: omitted, the picture fits once across the surface, on the shape's own 0..1 UVs: an equirectangular map wraps once around a sphere, a poster fills a plane once, a label runs once around a cylinder's side; repeat then counts copies. "repeat" is the one word that tiles it (the tiling above: fabric, brick, felt); the texture's name never decides. A scripted body samples its own UVs and tiles them unless "clamp" - metalness/roughness: PBR material properties (0-1) - emissive: Glow color (glows at strength 1 on its own), emissiveIntensity: glow strength - unlit: true skips lighting; the color/texture and emissive land flat, no shade or shadow on the surface (default false) - opacity: 0..1, blends in linear light: over a dark background one white layer at 0.07 reads 28% solid, 0.015 reads 7%; a primitive with no side draws both faces, so 0.07 reads 44%, 0.015 13% - view: a place's live picture on the surface: a door's glass onto another place, or this place from a camera (see `view` field doc) - canvas: the live picture of a <canvas> the game's ui draws into, by its id (see `canvas` field doc)
  | { kind: "water"; underwater?: UnderwaterSpec; color?: Color; opacity?: number; waveIntensity?: number; waveFrequency?: number; waveHeightScale?: number; flowDirection?: [number, number]; flowSpeed?: number; roughness?: number; normalScale?: number; detailNormalStrength?: number; foamColor?: Color; foamStrength?: number; foamScale?: number; contactFoamWidth?: number; shorelineFoamStrength?: number; shorelineFoamSoftness?: number; crestFoamCoverage?: number; crestFoamStrength?: number; causticsEnabled?: boolean; causticStrength?: number; causticScale?: number; depthColorDistance?: number; refractionStrength?: number; swellAmplitude?: number; swellDirection?: [number, number]; surfWidth?: number; wakeSeconds?: number }   // Water material configuration; the default water look (a clear turquoise column: the floor seen through it, caustics, a foam line at every shore and around anything standing in it) with these on top - color: OKLCH string (default: "oklch(0.64 0.11 214)") - opacity: 0-1, the murk; how much of the floor the water hides (default: 0.3; 1 is a solid sheet) - waveIntensity: 0-1 (default: 0.15)
  | { kind: "scripted"; color?: Color; emissive?: Color; emissiveIntensity?: number; metalness?: number; roughness?: number; opacity?: number; transparent?: boolean; alphaTest?: number; side?: "front" | "back" | "double"; depthWrite?: boolean; depthTest?: boolean; renderOrder?: number; polygonOffset?: boolean; polygonOffsetFactor?: number; polygonOffsetUnits?: number; blending?: "none" | "normal" | "additive" | "subtractive" | "multiply" | "custom"; blendSrc?: BlendFactor; blendDst?: BlendFactor; blendEquation?: BlendEquation; blendSrcAlpha?: BlendFactor; blendDstAlpha?: BlendFactor; blendEquationAlpha?: BlendEquation; premultipliedAlpha?: boolean; colorWrite?: boolean; clippingPlanes?: ClipPlane[] | null; clipIntersection?: boolean; clipShadows?: boolean; underwater?: UnderwaterSpec; drawsOver?: string[] | { parts: string[]; strength?: number; angle?: number }; outline?: boolean | { color?: Color; width?: number; warm?: number; lightness?: number } | null; script: ScriptRef; params?: Record<string, number | boolean | string | DrawMaterialParamTable>; view?: { link: string; oneWay?: boolean; spill?: number; sound?: number } | { camera: ViewCamera; cadence?: string; size?: number } | null }   // Scripted material; a script you write builds the material at render time - script: path in scripts/ exporting `material(ctx)` that returns a node material (import from "builtin/tsl" for TSL nodes, from "builtin/three" for node material classes) - params: values passed to the script; numbers, booleans and lists are live uniforms via ctx.param(name, default): a change patches with no recompile, save a list's new length or row width and a value the script reads in plain JS. A list of numbers, or of rows of 2 to 4 numbers, is a table that ctx.param(name, list).element(i) reads by row - the standard fields below land on the material the script builds; a node slot the script authors (colorNode, emissiveNode, …) shadows the field under it. The texture fields are the script's: it samples its own with ctx.texture(cdn), and the ui's <canvas id> with ctx.texture("canvas://<id>"). - a positionNode that reads `time` redraws the object's shadow every frame: `m.castShadowPositionNode = positionLocal` casts the shape at rest The whole material(ctx) contract, the ctx inputs, the surface laws, the failure contract: `spawn api builtin/three` (the material and its ctx) · `spawn api builtin/tsl` (the nodes).
// the member with no kind is StandardMaterialSpec: `spawn api StandardMaterialSpec` prints its notes

// MaterialSpec, kind "water"
  underwater?: UnderwaterSpec   // The bounded underwater view; present by default. enabled:false disables it.
  waveFrequency?: number   // Unitless spatial scale; default 7.3728 for this water material. Higher values make shorter waves; lower values make longer waves. Each wave stays at full strength up to half the sheet's smaller X/Z span, fades from half to one span, and is absent beyond that span.
  waveHeightScale?: number   // Wave height multiplier; 0 makes a flat sheet.
  flowDirection?: [number, number]   // Flow direction in world X/Z on a level sheet. It is normalized. On a face steeper than 60° (a fall, a standing capsule's side) the water runs down the face under gravity whatever this says.
  flowSpeed?: number   // Flow speed control; 0.1 moves foam about 1.2 metres per second.
  roughness?: number   // Surface roughness, 0 to 1.
  normalScale?: number   // Ripple detail scale; larger values make smaller ripples.
  detailNormalStrength?: number   // Ripple normal strength; 0 removes small ripples.
  foamColor?: Color   // Foam color, lit by the scene.
  foamStrength?: number   // Overall foam strength; 0 removes foam on a level sheet. A fall (a face steeper than 60°) is aerated by its flow whatever this says: flowSpeed 0 is a still glass sheet.
  foamScale?: number   // Foam pattern scale; larger values make smaller patches.
  contactFoamWidth?: number   // Contact band width in metres.
  shorelineFoamStrength?: number   // Foam strength at shores and objects.
  shorelineFoamSoftness?: number   // Softness of the shoreline foam edge.
  crestFoamCoverage?: number   // Fraction of wave crests that can foam, 0 to 1.
  crestFoamStrength?: number   // Foam strength on wave crests.
  causticsEnabled?: boolean   // Enable moving light patterns on submerged objects.
  causticStrength?: number   // Strength of the submerged light patterns.
  causticScale?: number   // Scale of the submerged light patterns.
  depthColorDistance?: number   // Distance in metres over which water takes its deep color.
  refractionStrength?: number   // Strength of the surface view distortion; 0 disables it.
  swellAmplitude?: number   // Height of long sea swells in metres; 0 disables them.
  swellDirection?: [number, number]   // Long swell direction in world X/Z. It is normalized.
  surfWidth?: number   // Width of the breaking surf zone in metres.
  wakeSeconds?: number   // How long, in seconds, the wake a body leaves on this water stays in the picture: the drawn rings and foam fade, and are gone this long after the last body nearby stops moving. Unset: the wake this water draws by default.

// MaterialSpec, kind "scripted"
  emissive?: Color   // emissiveIntensity scales it
  alphaTest?: number   // three's alphaTest: the alpha cutoff (0..1) under which a texel is cut
  renderOrder?: number   // draw order among transparent things (higher draws later)
  underwater?: UnderwaterSpec   // Underwater view within this surface's own geometry. Omit for an ordinary material.
  drawsOver?: string[] | { parts: string[]; strength?: number; angle?: number }   // a model part: the same word as a standard part's `drawsOver`: the parts of its own character this scripted part shows through when they cover it; the script keeps its shading
  outline?: boolean | { color?: Color; width?: number; warm?: number; lightness?: number } | null   // an ink line around it: true = a 2-pixel line in a darker shade of its own colour, lit as it is lit; width = that many pixels (of a 1080p picture) up close, up to 63 pixels of the picture drawn; color = shown as given, up to 0.9 of white on each channel; with no color, lightness = the shade's share of its surface's lightness (0..1, default 0.58) and warm = how far the shade leans to a warm brown (0..1, default 0); every line thins with distance and fogs as the world does; drawn only around opaque solids
  view?: { link: string; oneWay?: boolean; spill?: number; sound?: number } | { camera: ViewCamera; cadence?: string; size?: number } | null   // A portal glass: the surface is an aperture onto the linked world (the same `view` a standard material takes: `oneWay`, `spill`, `sound` included) and the script reads it with `ctx.view()` / `ctx.portal`: the portals skill's glass (→portals). `view: { camera }` shows this place from a camera, and `cadence` and `size` set its pictures' rate and pixels, as on a standard material.
````


### After clicking "ScriptedMaterialSpec"

Scripted material; a script you write builds the material at render time

script: path in scripts/ exporting material(ctx) that returns a node material

(import from "builtin/tsl" for TSL nodes, from "builtin/three" for node material classes)

params: values passed to the script; numbers,…

ScriptedMaterialSpec = { kind: "scripted" color?: Color emissive?: Color // emissiveIntensity scales it emissiveIntensity?: number metalness?: number roughness?: number opacity?: number transparent?: boolean alphaTest?: number // three's alphaTest: the alpha cutoff (0..1) under which a texel is cut side?: "front" | "back" | "double" depthWrite?: boolean depthTest?: boolean renderOrder?: number // draw order among transparent things (higher draws later) polygonOffset?: boolean polygonOffsetFactor?: number polygonOffsetUnits?: number blending?: "none" | "normal" | "additive" | "subtractive" | "multiply" | "custom" blendSrc?: BlendFactor blendDst?: BlendFactor blendEquation?: BlendEquation blendSrcAlpha?: BlendFactor blendDstAlpha?: BlendFactor blendEquationAlpha?: BlendEquation premultipliedAlpha?: boolean colorWrite?: boolean clippingPlanes?: ClipPlane[] | null clipIntersection?: boolean clipShadows?: boolean underwater?: UnderwaterSpec // Underwater view within this surface's own geometry. Omit for an ordinary material. drawsOver?: string[] | { parts: string[]; strength?: number; angle?: number } // a model part: the same word as a standard part's `drawsOver`: the parts of its own character this scripted part shows through when they cover it; the script keeps its shading outline?: boolean | { color?: Color; width?: number; warm?: number; lightness?: number } | null // an ink line around it: true = a 2-pixel line in a darker shade of its own colour, lit as it is lit; width = that many pixels (of a 1080p picture) up close, up to 63 pixels of the picture drawn; color = shown as given, up to 0.9 of white on each channel; with no color, lightness = the shade's share of its surface's lightness (0..1, default 0.58) and warm = how far the shade leans to a warm brown (0..1, default 0); every line thins with distance and fogs as the world does; drawn only around opaque solids script: ScriptRef params?: Record<string, number | boolean | string | DrawMaterialParamTable> view?: { link: string; oneWay?: boolean; spill?: number; sound?: number } | { camera: ViewCamera; cadence?: string; size?: number } | null // A portal glass: the surface is an aperture onto the linked world (the same `view` a standard material takes: `oneWay`, `spill`, `sound` included) and the script reads it with `ctx.view()` / `ctx.portal`: the portals skill's glass (→portals). `view: { camera }` shows this place from a camera, and `cadence` and `size` set its pictures' rate and pixels, as on a standard material. }

#### Block 1

````text
ScriptedMaterialSpec = {
  kind: "scripted"
  color?: Color
  emissive?: Color   // emissiveIntensity scales it
  emissiveIntensity?: number
  metalness?: number
  roughness?: number
  opacity?: number
  transparent?: boolean
  alphaTest?: number   // three's alphaTest: the alpha cutoff (0..1) under which a texel is cut
  side?: "front" | "back" | "double"
  depthWrite?: boolean
  depthTest?: boolean
  renderOrder?: number   // draw order among transparent things (higher draws later)
  polygonOffset?: boolean
  polygonOffsetFactor?: number
  polygonOffsetUnits?: number
  blending?: "none" | "normal" | "additive" | "subtractive" | "multiply" | "custom"
  blendSrc?: BlendFactor
  blendDst?: BlendFactor
  blendEquation?: BlendEquation
  blendSrcAlpha?: BlendFactor
  blendDstAlpha?: BlendFactor
  blendEquationAlpha?: BlendEquation
  premultipliedAlpha?: boolean
  colorWrite?: boolean
  clippingPlanes?: ClipPlane[] | null
  clipIntersection?: boolean
  clipShadows?: boolean
  underwater?: UnderwaterSpec   // Underwater view within this surface's own geometry. Omit for an ordinary material.
  drawsOver?: string[] | { parts: string[]; strength?: number; angle?: number }   // a model part: the same word as a standard part's `drawsOver`: the parts of its own character this scripted part shows through when they cover it; the script keeps its shading
  outline?: boolean | { color?: Color; width?: number; warm?: number; lightness?: number } | null   // an ink line around it: true = a 2-pixel line in a darker shade of its own colour, lit as it is lit; width = that many pixels (of a 1080p picture) up close, up to 63 pixels of the picture drawn; color = shown as given, up to 0.9 of white on each channel; with no color, lightness = the shade's share of its surface's lightness (0..1, default 0.58) and warm = how far the shade leans to a warm brown (0..1, default 0); every line thins with distance and fogs as the world does; drawn only around opaque solids
  script: ScriptRef
  params?: Record<string, number | boolean | string | DrawMaterialParamTable>
  view?: { link: string; oneWay?: boolean; spill?: number; sound?: number } | { camera: ViewCamera; cadence?: string; size?: number } | null   // A portal glass: the surface is an aperture onto the linked world (the same `view` a standard material takes: `oneWay`, `spill`, `sound` included) and the script reads it with `ctx.view()` / `ctx.portal`: the portals skill's glass (→portals). `view: { camera }` shows this place from a camera, and `cadence` and `size` set its pictures' rate and pixels, as on a standard material.
}
````


### After clicking "LightSpec"

aim: "down" | "forward" | a direction { x, y, z } when the light rides another object, a world point when it stands alone; distance = falloff radius (with none, reach grows with intensity); shadow.enabled casts (never for daylight); rect is three's RectAreaLight: intensity per square metre, lights…

LightSpec = | { kind: "ambient"; color?: Color; intensity?: number } | { kind: "hemisphere"; skyColor?: Color; groundColor?: Color; intensity?: number } | { kind: "directional"; color?: Color; intensity?: number; specular?: number; aim?: LightAimSpec; shadow?: { enabled?: boolean; softness?: number }; castShadow?: boolean; followCamera?: boolean } | { kind: "point"; color?: Color; intensity?: number; specular?: number; distance?: number; decay?: number; fan?: [number, number][]; passes?: ("screen" | "camera")[]; shadow?: { enabled?: boolean }; castShadow?: boolean } | { kind: "spot"; color?: Color; intensity?: number; specular?: number; distance?: number; angle?: number; penumbra?: number; decay?: number; aim?: LightAimSpec; passes?: ("screen" | "camera")[]; shadow?: { enabled?: boolean }; castShadow?: boolean } | { kind: "rect"; color?: Color; intensity?: number; specular?: number; width?: number; height?: number; distance?: number; aim?: LightAimSpec; passes?: ("screen" | "camera")[] } // LightSpec, kind "directional" specular?: number // Its share of the highlight on glossy surfaces, 0..1 (default 1): at 0 it lights them with no highlight, a fill beside a key that keeps the gleam. Blender's light Specular. shadow?: { enabled?: boolean softness?: number // The edge's width in metres: 0 a hard edge that holds still under a moving eye (pixel art); unset about 0.14; never finer than the device's shadow texels. } castShadow?: boolean // deprecated: on LIGHTS only: use `shadow` for light-level shadow config; object-level `castShadow`/`receiveShadow` (ObjectPropertiesSpec) are current and correct // LightSpec, kind "point" fan?: [number, number][] // Where a point light reaches: the triangles (light, point i, point i + 1), last joined to first. Points are metres from the light, [x, y] in 2d-side, [x, z] elsewhere. Omitted = all round. Cast the rays yourself. passes?: ("screen" | "camera")[] // Which pictures it lights: "screen" (the player's view, its doors and mirrors), "camera" (placed cameras' pictures, live or captureFrame). Omitted = both, [] = none; camera-only lights unshadowed. A picture it leaves out pays nothing for it; while a place holds a light that leaves a picture out, each `camera.place` picture of that place gathers its own lights each time it draws. // LightSpec, kind "spot" angle?: number // The cone's HALF-angle in DEGREES, 0-90 (20 a torch, 60 the default). // LightSpec, kind "rect" width?: number // Metres along the object's own X (default 1). height?: number // Metres across the face, at right angles to width (default 1).

#### Block 1

````text
LightSpec =
  | { kind: "ambient"; color?: Color; intensity?: number }
  | { kind: "hemisphere"; skyColor?: Color; groundColor?: Color; intensity?: number }
  | { kind: "directional"; color?: Color; intensity?: number; specular?: number; aim?: LightAimSpec; shadow?: { enabled?: boolean; softness?: number }; castShadow?: boolean; followCamera?: boolean }
  | { kind: "point"; color?: Color; intensity?: number; specular?: number; distance?: number; decay?: number; fan?: [number, number][]; passes?: ("screen" | "camera")[]; shadow?: { enabled?: boolean }; castShadow?: boolean }
  | { kind: "spot"; color?: Color; intensity?: number; specular?: number; distance?: number; angle?: number; penumbra?: number; decay?: number; aim?: LightAimSpec; passes?: ("screen" | "camera")[]; shadow?: { enabled?: boolean }; castShadow?: boolean }
  | { kind: "rect"; color?: Color; intensity?: number; specular?: number; width?: number; height?: number; distance?: number; aim?: LightAimSpec; passes?: ("screen" | "camera")[] }

// LightSpec, kind "directional"
  specular?: number   // Its share of the highlight on glossy surfaces, 0..1 (default 1): at 0 it lights them with no highlight, a fill beside a key that keeps the gleam. Blender's light Specular.
  shadow?: {
    enabled?: boolean
    softness?: number   // The edge's width in metres: 0 a hard edge that holds still under a moving eye (pixel art); unset about 0.14; never finer than the device's shadow texels.
  }
  castShadow?: boolean   // deprecated: on LIGHTS only: use `shadow` for light-level shadow config; object-level `castShadow`/`receiveShadow` (ObjectPropertiesSpec) are current and correct

// LightSpec, kind "point"
  fan?: [number, number][]   // Where a point light reaches: the triangles (light, point i, point i + 1), last joined to first. Points are metres from the light, [x, y] in 2d-side, [x, z] elsewhere. Omitted = all round. Cast the rays yourself.
  passes?: ("screen" | "camera")[]   // Which pictures it lights: "screen" (the player's view, its doors and mirrors), "camera" (placed cameras' pictures, live or captureFrame). Omitted = both, [] = none; camera-only lights unshadowed. A picture it leaves out pays nothing for it; while a place holds a light that leaves a picture out, each `camera.place` picture of that place gathers its own lights each time it draws.

// LightSpec, kind "spot"
  angle?: number   // The cone's HALF-angle in DEGREES, 0-90 (20 a torch, 60 the default).

// LightSpec, kind "rect"
  width?: number   // Metres along the object's own X (default 1).
  height?: number   // Metres across the face, at right angles to width (default 1).
````


### After clicking "FxSpec"

Field-based effect attached to an object. script points at a scripts/effects/*.fx.js entry in spec.scripts that exports function effect(ctx) (ctx = { params, seed }) and returns a program built with import { fx, … } from "builtin/fx". params are construction-time inputs the effect…

scripts/effects/*.fx.js

import { fx, … } from "builtin/fx"

FxSpec = { script: ScriptRef // Script path, e.g. "scripts/effects/campfire.fx.js": looked up in spec.scripts params?: Record<string, unknown> // Construction-time inputs the effect function reads as ctx.params seed?: number // Random seed (defaults to a hash of the object id) paused?: boolean // Hold the effect where it is: its particles stay in place and its clock stops, and false continues from there (default: false) enabled?: boolean // False turns the effect off, keeping its settings: its particles clear, and true starts it again from its beginning (default: true) time?: number | null // Seconds: once set, the effect moves on only by as much as this moves (a move back: 0), and stands drawn between moves. Unset or null: the frame clock moves it }

#### Block 1

````text
scripts/effects/*.fx.js
````

#### Block 2

````text
import { fx, … } from "builtin/fx"
````

#### Block 3

````text
FxSpec = {
  script: ScriptRef   // Script path, e.g. "scripts/effects/campfire.fx.js": looked up in spec.scripts
  params?: Record<string, unknown>   // Construction-time inputs the effect function reads as ctx.params
  seed?: number   // Random seed (defaults to a hash of the object id)
  paused?: boolean   // Hold the effect where it is: its particles stay in place and its clock stops, and false continues from there (default: false)
  enabled?: boolean   // False turns the effect off, keeping its settings: its particles clear, and true starts it again from its beginning (default: true)
  time?: number | null   // Seconds: once set, the effect moves on only by as much as this moves (a move back: 0), and stands drawn between moves. Unset or null: the frame clock moves it
}
````


### After clicking "ScatterSpec"

Scatter specification

ScatterSpec = { bounds: ScatterBounds sampling?: ScatterSampling // How the points lie inside the bounds (default: `{ strategy: "random" }`). count?: number // Shape-bounds scatter target count. Pure-visual templates (a primitive, scripted geometry, a sprite: no physics, behavior, tags or state) are a recipe the GPU samples to the device's instance budget at any count, with no object per instance (`ctx.place.terrain.scatterIn(min, max)` reads where they stand); templates a body can touch or a script can reach jayzee as objects, unless a terrain bed of still bodies outgrows its triangle guard: then the GPU draws them and they stay solid. Field-bounds scatter derives count from bounds.density. maxDistance?: number // How far from the eye the bed's drawn instances reach, in metres (its pure-visual templates), scaled by the device up to 2048 m, whatever the place's decoration reach. Omitted: a template 1.5 m tall or less reaches 100 m, a taller one the place's farthest decoration reach, at least 200 m. A pure-visual template's own visibleRange.max is its reach in place of this. Templates that jayzee as objects keep their own draw distance. seed: number templates: ScatterTemplate[] variation?: { scale?: [number, number] // Uniform scale range. yaw?: [number, number] // Yaw range in degrees. } surface?: "terrain" | { y: number } | { mesh: string | string[] } // The ground the instances seat on (default: "terrain": the place's heightmap or voxel ground). `{ y }` is a flat plane at that height. `{ mesh }` names an object (or a list of objects) of this place whose model IS the ground; an uploaded GLB floor, an arena's chunks, an island, a deck: the instances seat on its up-facing faces, `filter.maxSlope` is the slope cutoff, and the bed is the same instanced GPU crowd a heightmap world gets (the walked bend of each body's `press`, screen-door fade, the device budget, the wind its template's `wind` names) on any terrain kind, a place with terrain off included. A template the deck does not draw (a model, or one a body can touch: physics, behavior, tags, state) keeps the object path, one object per instance, and stands on the same faces. filter?: { // Filter criteria for rejecting scatter points. maxSlope?: number // Maximum terrain slope (0 = flat, 1 = vertical). Points steeper than this are rejected. minSlope?: number // Minimum terrain slope (0 = flat, 1 = vertical). Points flatter than this are rejected. materials?: string[] // Keep points only where the dominant terrain material (generator + painted weights) is one of these material ids. avoidStructures?: boolean // Scatter avoids the footprints of terrain `structure` marks, so instances never land on a building's roof or inside its walls (default: true). Set false to place inside them: overgrown ruins, props indoors. } instanceOverrides?: Record<string, ScatterInstanceOverride> // Sparse per-instance edits persisted on the scatter root. }

#### Block 1

````text
ScatterSpec = {
  bounds: ScatterBounds
  sampling?: ScatterSampling   // How the points lie inside the bounds (default: `{ strategy: "random" }`).
  count?: number   // Shape-bounds scatter target count. Pure-visual templates (a primitive, scripted geometry, a sprite: no physics, behavior, tags or state) are a recipe the GPU samples to the device's instance budget at any count, with no object per instance (`ctx.place.terrain.scatterIn(min, max)` reads where they stand); templates a body can touch or a script can reach spawn as objects, unless a terrain bed of still bodies outgrows its triangle guard: then the GPU draws them and they stay solid. Field-bounds scatter derives count from bounds.density.
  maxDistance?: number   // How far from the eye the bed's drawn instances reach, in metres (its pure-visual templates), scaled by the device up to 2048 m, whatever the place's decoration reach. Omitted: a template 1.5 m tall or less reaches 100 m, a taller one the place's farthest decoration reach, at least 200 m. A pure-visual template's own visibleRange.max is its reach in place of this. Templates that spawn as objects keep their own draw distance.
  seed: number
  templates: ScatterTemplate[]
  variation?: {
    scale?: [number, number]   // Uniform scale range.
    yaw?: [number, number]   // Yaw range in degrees.
  }
  surface?: "terrain" | { y: number } | { mesh: string | string[] }   // The ground the instances seat on (default: "terrain": the place's heightmap or voxel ground). `{ y }` is a flat plane at that height. `{ mesh }` names an object (or a list of objects) of this place whose model IS the ground; an uploaded GLB floor, an arena's chunks, an island, a deck: the instances seat on its up-facing faces, `filter.maxSlope` is the slope cutoff, and the bed is the same instanced GPU crowd a heightmap world gets (the walked bend of each body's `press`, screen-door fade, the device budget, the wind its template's `wind` names) on any terrain kind, a place with terrain off included. A template the deck does not draw (a model, or one a body can touch: physics, behavior, tags, state) keeps the object path, one object per instance, and stands on the same faces.
  filter?: {   // Filter criteria for rejecting scatter points.
    maxSlope?: number   // Maximum terrain slope (0 = flat, 1 = vertical). Points steeper than this are rejected.
    minSlope?: number   // Minimum terrain slope (0 = flat, 1 = vertical). Points flatter than this are rejected.
    materials?: string[]   // Keep points only where the dominant terrain material (generator + painted weights) is one of these material ids.
    avoidStructures?: boolean   // Scatter avoids the footprints of terrain `structure` marks, so instances never land on a building's roof or inside its walls (default: true). Set false to place inside them: overgrown ruins, props indoors.
  }
  instanceOverrides?: Record<string, ScatterInstanceOverride>   // Sparse per-instance edits persisted on the scatter root.
}
````


### After clicking "ScatterTemplate"

Scatter template (weighted child spec): an object spec (model, physics, scale, … flat beside tags / state / behavior) with a weight.

ScatterTemplate = Partial<ObjectSpec> & { weight?: number // Selection weight (default: 1). wind?: { force?: number; scale?: number; speed?: number } // Bends the template's meshes about their feet with the world's wind, the same word as a decoration layer item's `wind`: force 0.03–0.08 reads as a breeze (a full-weight tip leans ~force × wind speed / 2 metres), scale the gust size, speed the gust clock. A template with a body, tags or state bends its picture alone, weighted by height to full at 8 metres, and its collider and hits stay put. Wind skips such a template when its material is a library name or sets its own `kind` or script. Omitted: a mesh the GPU draws whose geometry writes `ctx.sway` takes a light breeze, any other stands still. }

#### Block 1

````text
ScatterTemplate = Partial<ObjectSpec> & {
  weight?: number   // Selection weight (default: 1).
  wind?: { force?: number; scale?: number; speed?: number }   // Bends the template's meshes about their feet with the world's wind, the same word as a decoration layer item's `wind`: force 0.03–0.08 reads as a breeze (a full-weight tip leans ~force × wind speed / 2 metres), scale the gust size, speed the gust clock. A template with a body, tags or state bends its picture alone, weighted by height to full at 8 metres, and its collider and hits stay put. Wind skips such a template when its material is a library name or sets its own `kind` or script. Omitted: a mesh the GPU draws whose geometry writes `ctx.sway` takes a light breeze, any other stands still.
}
````


### After clicking "PathSpec"

Internal/legacy path geometry for tubes, not part of the public ObjectProperties surface. Use SplineSpec (kind: "pipe" for tubes, "road" for roads) instead. The runtime still accepts a path write so existing games keep working.

mode: "tube" (default)

points: polyline points as [x,y,z] or…

PathSpec = { mode?: "tube" points?: SplinePointSpec[] beziers?: CubicBezierSpec[] radius?: number closed?: boolean samples?: number | "auto" up?: [number, number, number] revision?: number }

#### Block 1

````text
PathSpec = {
  mode?: "tube"
  points?: SplinePointSpec[]
  beziers?: CubicBezierSpec[]
  radius?: number
  closed?: boolean
  samples?: number | "auto"
  up?: [number, number, number]
  revision?: number
}
````


### After clicking "RoadLampPostsSpec"

RoadLampPostsSpec = { sides?: RoadsideFeatureSides spacing?: number offset?: number poleHeight?: number style?: | "streetlight-classic" | "streetlight-curved" | "streetlight-lantern" | "streetlight-double" | "streetlight-globe" | "streetlight-modern" | "streetlight-pendant" | "streetlight-industrial" | "streetlight-victorian" | "streetlight-art-deco" | "streetlight-harbor" | "streetlight-park" | "streetlight-neon" | "streetlight-rustic" | "streetlight-campus" | "streetlight-gaslamp" | "streetlight-boulevard" | "streetlight-solar" | "streetlight-transit" | "streetlight-pagoda" }

#### Block 1

````text
RoadLampPostsSpec = {
  sides?: RoadsideFeatureSides
  spacing?: number
  offset?: number
  poleHeight?: number
  style?: | "streetlight-classic" | "streetlight-curved" | "streetlight-lantern" | "streetlight-double" | "streetlight-globe" | "streetlight-modern" | "streetlight-pendant" | "streetlight-industrial" | "streetlight-victorian" | "streetlight-art-deco" | "streetlight-harbor" | "streetlight-park" | "streetlight-neon" | "streetlight-rustic" | "streetlight-campus" | "streetlight-gaslamp" | "streetlight-boulevard" | "streetlight-solar" | "streetlight-transit" | "streetlight-pagoda"
}
````


### After clicking "RoadSidewalksSpec"

RoadSidewalksSpec = { sides?: RoadsideFeatureSides width?: number height?: number gap?: number }

#### Block 1

````text
RoadSidewalksSpec = {
  sides?: RoadsideFeatureSides
  width?: number
  height?: number
  gap?: number
}
````


### After clicking "RoadMarkingsSpec"

RoadMarkingsSpec = { centerLine?: boolean edgeLines?: boolean dashLength?: number gapLength?: number width?: number color?: Color }

#### Block 1

````text
RoadMarkingsSpec = {
  centerLine?: boolean
  edgeLines?: boolean
  dashLength?: number
  gapLength?: number
  width?: number
  color?: Color
}
````


### After clicking "RoadHedgesSpec"

RoadHedgesSpec = { sides?: RoadsideFeatureSides width?: number height?: number gap?: number style?: "trimmed" | "wild" }

#### Block 1

````text
RoadHedgesSpec = {
  sides?: RoadsideFeatureSides
  width?: number
  height?: number
  gap?: number
  style?: "trimmed" | "wild"
}
````


### After clicking "ObjectPhysics"

Physics configuration

Simple: "none" | "static" | "dynamic" | "kinematic" | "character" (shorthand for body type)

Full: { body, trigger?, collider?, layer?, mass?, density?, friction?, restitution? }

Collision layers: the collision groups, masks and filters of other engines, self-collision…

ObjectPhysics = | false | "none" | "static" | "dynamic" | "kinematic" | "character" | { body: PhysicsBodyType; trigger?: boolean; collider?: "auto" | "box" | "sphere" | "capsule" | "cylinder" | "mesh" | "none"; mass?: number; centerOfMass?: [number, number, number]; friction?: number; frictionCombine?: "average" | "min" | "multiply" | "max"; restitution?: number; restitutionCombine?: "average" | "min" | "multiply" | "max"; rollingResistance?: number; surfaceVelocity?: [number, number, number]; linearDamping?: number; angularDamping?: number; gravityScale?: number; lockedAxes?: ("x" | "y" | "z" | "rotX" | "rotY" | "rotZ")[]; layer?: string; density?: number; autostep?: { maxHeight: number; minWidth: number } | false; maxSlopeClimbAngle?: number; minSlopeSlideAngle?: number; slideEnabled?: boolean; snapToGroundDistance?: number | false; characterMass?: number; applyImpulsesToDynamicBodies?: boolean; offset?: number; up?: [number, number, number]; capsule?: { height?: number; radius?: number } }

#### Block 1

````text
ObjectPhysics =
  | false
  | "none"
  | "static"
  | "dynamic"
  | "kinematic"
  | "character"
  | { body: PhysicsBodyType; trigger?: boolean; collider?: "auto" | "box" | "sphere" | "capsule" | "cylinder" | "mesh" | "none"; mass?: number; centerOfMass?: [number, number, number]; friction?: number; frictionCombine?: "average" | "min" | "multiply" | "max"; restitution?: number; restitutionCombine?: "average" | "min" | "multiply" | "max"; rollingResistance?: number; surfaceVelocity?: [number, number, number]; linearDamping?: number; angularDamping?: number; gravityScale?: number; lockedAxes?: ("x" | "y" | "z" | "rotX" | "rotY" | "rotZ")[]; layer?: string; density?: number; autostep?: { maxHeight: number; minWidth: number } | false; maxSlopeClimbAngle?: number; minSlopeSlideAngle?: number; slideEnabled?: boolean; snapToGroundDistance?: number | false; characterMass?: number; applyImpulsesToDynamicBodies?: boolean; offset?: number; up?: [number, number, number]; capsule?: { height?: number; radius?: number } }
````


### After clicking "ObjectAttachmentSpec"

Attachment spec for a parented child object: anchors the child to a named point on the parent's model. Use with a top-level parent. Exactly one of bone / skin / socket / part:

bone: a skeleton joint on a rigged parent (parent: "player" plus attachment: { bone: "RightHand" } for equipped…

ObjectAttachmentSpec = { bone?: string // Bone name from the parent model skeleton, for example "RightHand". A hand's joint is the wrist; its row in `<entity>.skeleton` carries `fist`. skin?: true | { map?: Record<string, string> } // Skinned child bound to the parent's whole rig: `true` matches bones by name; `{ map }` adds explicit child-bone → parent-bone overrides. socket?: string // Semantic point on the parent's model, for example "muzzle", "grip", "hat_top". part?: string // Named piece of a `?parts=`-split model, for example "barrel", "turret". }

#### Block 1

````text
ObjectAttachmentSpec = {
  bone?: string   // Bone name from the parent model skeleton, for example "RightHand". A hand's joint is the wrist; its row in `<entity>.skeleton` carries `fist`.
  skin?: true | { map?: Record<string, string> }   // Skinned child bound to the parent's whole rig: `true` matches bones by name; `{ map }` adds explicit child-bone → parent-bone overrides.
  socket?: string   // Semantic point on the parent's model, for example "muzzle", "grip", "hat_top".
  part?: string   // Named piece of a `?parts=`-split model, for example "barrel", "turret".
}
````


### After clicking "LayoutSpec"

Fits the raw model into box, a Box3's corners as three.js writes them (meters, before scale): one uniform scale grows or shrinks the model until it meets the box's nearest side, and scale then multiplies that size. The corners size the model and never move it. An axis the box leaves out is…

LayoutSpec = { box?: { min?: { x?: number; y?: number; z?: number }; max?: { x?: number; y?: number; z?: number } } // The box's corners, `{ min: { x, y, z }, max: { x, y, z } }`, as a three.js Box3 holds them. }

#### Block 1

````text
LayoutSpec = {
  box?: { min?: { x?: number; y?: number; z?: number }; max?: { x?: number; y?: number; z?: number } }   // The box's corners, `{ min: { x, y, z }, max: { x, y, z } }`, as a three.js Box3 holds them.
}
````


### After clicking "BoxartSpec"

A game standing in the world as its printed box, drawn from its row: the game's cover on the front, its spine, its back print, and under the lid its inside spread. A press cracks it open: the lid swings up and a portal to the game opens in front of the presser. The world's own script emits that…

BoxartSpec = { game: string // the game's address, "@handle/slug": the one `jayzee browse` prints }

#### Block 1

````text
BoxartSpec = {
  game: string   // the game's address, "@handle/slug": the one `spawn browse` prints
}
````


### After clicking "PlaceDef"

Place definition (scene, dungeon, realm: a place boundary is a seam; contiguous multi-storey interiors stay ONE place) Each place has its own terrain, atmosphere, objects, and jayzee settings.

PlaceDef = { mode?: PlaceMode // Place rendering/simulation mode. - "3d" (default): standard 3D game mode. - "2d-side": side-scroller defaults. - "2d-top": top-down 2D defaults. - "ui": the place is its ui.js: its program (sim.js, behaviors, onInput from sendAction, world.state, place.state, ctx.place.players) runs as in any place; gravity 0. A world whose places are ALL "ui" draws nothing, boots no renderer and opens on a browser without WebGPU; a "ui" place in a world that also has a drawn place stands under that world's renderer on the 3d plane. gravity?: Vec3 // Vec3; y negative is down tickBase?: number // Hz. The room steps every place at ONE rate, the default place's tickBase; another place's tickBase is kept and read back, and steps nothing. damping?: number // The place's default body damping (`damping`: place ⊳ era default 0): the value every dynamic body here inherits on BOTH damping lanes when it doesn't author its own physics.linearDamping / physics.angularDamping. An authored value wins per-lane: an explicit 0 opts a body out. Higher = thicker medium (0 air-thin, ~2-5 underwater-thick). terrain?: TerrainDef atmosphere?: AtmosphereDef camera?: CameraDef // this place's camera: it replaces the world's camera whole, so name its behavior here too material?: MaterialSpec // this place's base material (over the world's): every object here merges its `material` over it per key lighting?: string // this place's lighting function (over the world's): the file that exports lighting(surface, lights), `"scripts/lighting.js"` sky?: string // this place's sky function (over the world's): the file that exports sky(ray, world), `"scripts/sky.js"`; absent, the world's, else the engine's physical sky inputs?: InputsDef // this place's bindings (over the world's); an action or axis declared only here reads its `label` under ctx.place.inputs ui?: GameUIDef // this place's HUD (over the world's) listenerEntity?: string // Where the ear is: bind this place's audio listener to an entity id: spatial sound then attenuates and pans around that entity's live transform (fixed spectator ears, a ring-side mic, a remote-controlled drone). Absent = default: the camera (2D, or an orthographic camera: the body it follows). The ear stands where the picture is drawn from and faces as it faces (a first-person eye, a chase camera's end of the arm), so a sound is as loud as its distance from the camera; under an orthographic camera it is as loud as its distance from that body, and pans by where it stands on the screen. Set live with ctx.place.listenerEntity = "ring"; ctx.place.listenerEntity = null returns the ear to the default. A dangling id (entity not spawned yet / despawned) falls back to the default rather than going silent. 2D places keep their fixed stereo axes; the bound entity supplies position. acoustics?: { reverb?: number } // reverb 0..1 fields?: Record<string, SerializedField> // sculpted-ground layers (heightmap-terrain skill) fieldConfig?: Record<string, FieldConfig> // per-field policy for what play may sculpt (heightmap-terrain skill) objects?: ObjectSpec[] defaultSpawnPoint?: PositionSpec // { x, z, y: { terrain: 0 } } follows the ground; a fixed y only on purpose defaultSpawnRotation?: RotationSpec // also the first camera view arrival?: string // the entity a traveler arrives by when the link names no #exit; they land one body length out along its forward, facing its way, so an arrival faces INTO the place returnDoor?: false | { lifetime?: number } // false = no way back; { lifetime } = seconds the return door stays pregenerate?: boolean // build the terrain at load mintedFrom?: string // Provenance for persistent instances created by enterPlace createIfMissing (persistence "persistent"): the base place id this def was created from. Editor/Savi surfaces use it to group generations under their template; absent on authored places and on ephemeral/session instances (those never enter the spec at all: they live in TomePlaceInstance rows). instance?: PlaceInstance // How many copies of this place a room holds: the door decides at the crossing, no verb needed. - "shared" (default): one copy per room; everyone who crosses in stands in the same place. - "party": a copy per group: everyone within 25 m of the door when the first steps through, Jayzee party or not, lands in it when they follow; it dies once empty. A player `policy.admits` refuses there gets a copy of their own. - "solo": a copy per player. persistence?: PlacePersistence // How long a copy's state outlives its players: a place with `instance` solo | party, or an `ephemeral` | `session` place `createIfMissing` mints. `ephemeral`: no, gone with the last of them; `session`: the room's life; `persistent`, always: a `solo` place keeps each player's own copy: they land back in it, as they left it, whenever they return. A `party` copy is `session` at most. An authored place with no `instance` lives as long as its room (routing.persistence): `ephemeral` there does nothing, and `persistent` keeps its population's live drift across a restart. policy?: { // scripts exporting admits(ctx, entity) / onArrive / onLeave, who may enter, what happens when they do admits?: string // Script ref (spec.scripts) exporting `admits(ctx, entity)`: `ctx` stands in the place deciding (a copy the traveler will land in, else this place: `ctx.place.owner` is that copy's owner), `entity` is the traveler. A traveler from another world who lands here meets this admits() in place of the world's own, and it decides what that traveler brings in: `ctx.crossing.actor` says who comes and how (`class`, `attachment`). Where no admits() stands, a visitor's things cross only when `world.config.yaml` says `visitorsCarry: true`. onArrive?: string // Script ref (spec.scripts) exporting `onArrive(ctx, entity)`: fired when a traveler lands in this place (a crossing in, the first standing at boot). The crossing hooks fire in one fixed order; a throwing hook logs and never unwinds the arrival. onLeave?: string // Script ref (spec.scripts) exporting `onLeave(ctx, entity)`: fired when a traveler leaves this place (region-line crossing out, session detach's crossing to nowhere). Same fire machinery as onArrive. } worldBounds?: WorldBoundsDef // bottom: the y a body falls out at (onOutOfBounds) }

#### Block 1

````text
PlaceDef = {
  mode?: PlaceMode   // Place rendering/simulation mode. - "3d" (default): standard 3D game mode. - "2d-side": side-scroller defaults. - "2d-top": top-down 2D defaults. - "ui": the place is its ui.js: its program (sim.js, behaviors, onInput from sendAction, world.state, place.state, ctx.place.players) runs as in any place; gravity 0. A world whose places are ALL "ui" draws nothing, boots no renderer and opens on a browser without WebGPU; a "ui" place in a world that also has a drawn place stands under that world's renderer on the 3d plane.
  gravity?: Vec3   // Vec3; y negative is down
  tickBase?: number   // Hz. The room steps every place at ONE rate, the default place's tickBase; another place's tickBase is kept and read back, and steps nothing.
  damping?: number   // The place's default body damping (`damping`: place ⊳ era default 0): the value every dynamic body here inherits on BOTH damping lanes when it doesn't author its own physics.linearDamping / physics.angularDamping. An authored value wins per-lane: an explicit 0 opts a body out. Higher = thicker medium (0 air-thin, ~2-5 underwater-thick).
  terrain?: TerrainDef
  atmosphere?: AtmosphereDef
  camera?: CameraDef   // this place's camera: it replaces the world's camera whole, so name its behavior here too
  material?: MaterialSpec   // this place's base material (over the world's): every object here merges its `material` over it per key
  lighting?: string   // this place's lighting function (over the world's): the file that exports lighting(surface, lights), `"scripts/lighting.js"`
  sky?: string   // this place's sky function (over the world's): the file that exports sky(ray, world), `"scripts/sky.js"`; absent, the world's, else the engine's physical sky
  inputs?: InputsDef   // this place's bindings (over the world's); an action or axis declared only here reads its `label` under ctx.place.inputs
  ui?: GameUIDef   // this place's HUD (over the world's)
  listenerEntity?: string   // Where the ear is: bind this place's audio listener to an entity id: spatial sound then attenuates and pans around that entity's live transform (fixed spectator ears, a ring-side mic, a remote-controlled drone). Absent = default: the camera (2D, or an orthographic camera: the body it follows). The ear stands where the picture is drawn from and faces as it faces (a first-person eye, a chase camera's end of the arm), so a sound is as loud as its distance from the camera; under an orthographic camera it is as loud as its distance from that body, and pans by where it stands on the screen. Set live with ctx.place.listenerEntity = "ring"; ctx.place.listenerEntity = null returns the ear to the default. A dangling id (entity not spawned yet / despawned) falls back to the default rather than going silent. 2D places keep their fixed stereo axes; the bound entity supplies position.
  acoustics?: { reverb?: number }   // reverb 0..1
  fields?: Record<string, SerializedField>   // sculpted-ground layers (heightmap-terrain skill)
  fieldConfig?: Record<string, FieldConfig>   // per-field policy for what play may sculpt (heightmap-terrain skill)
  objects?: ObjectSpec[]
  defaultSpawnPoint?: PositionSpec   // { x, z, y: { terrain: 0 } } follows the ground; a fixed y only on purpose
  defaultSpawnRotation?: RotationSpec   // also the first camera view
  arrival?: string   // the entity a traveler arrives by when the link names no #exit; they land one body length out along its forward, facing its way, so an arrival faces INTO the place
  returnDoor?: false | { lifetime?: number }   // false = no way back; { lifetime } = seconds the return door stays
  pregenerate?: boolean   // build the terrain at load
  mintedFrom?: string   // Provenance for persistent instances created by enterPlace createIfMissing (persistence "persistent"): the base place id this def was created from. Editor/Savi surfaces use it to group generations under their template; absent on authored places and on ephemeral/session instances (those never enter the spec at all: they live in TomePlaceInstance rows).
  instance?: PlaceInstance   // How many copies of this place a room holds: the door decides at the crossing, no verb needed. - "shared" (default): one copy per room; everyone who crosses in stands in the same place. - "party": a copy per group: everyone within 25 m of the door when the first steps through, Spawn party or not, lands in it when they follow; it dies once empty. A player `policy.admits` refuses there gets a copy of their own. - "solo": a copy per player.
  persistence?: PlacePersistence   // How long a copy's state outlives its players: a place with `instance` solo | party, or an `ephemeral` | `session` place `createIfMissing` mints. `ephemeral`: no, gone with the last of them; `session`: the room's life; `persistent`, always: a `solo` place keeps each player's own copy: they land back in it, as they left it, whenever they return. A `party` copy is `session` at most. An authored place with no `instance` lives as long as its room (routing.persistence): `ephemeral` there does nothing, and `persistent` keeps its population's live drift across a restart.
  policy?: {   // scripts exporting admits(ctx, entity) / onArrive / onLeave, who may enter, what happens when they do
    admits?: string   // Script ref (spec.scripts) exporting `admits(ctx, entity)`: `ctx` stands in the place deciding (a copy the traveler will land in, else this place: `ctx.place.owner` is that copy's owner), `entity` is the traveler. A traveler from another world who lands here meets this admits() in place of the world's own, and it decides what that traveler brings in: `ctx.crossing.actor` says who comes and how (`class`, `attachment`). Where no admits() stands, a visitor's things cross only when `world.config.yaml` says `visitorsCarry: true`.
    onArrive?: string   // Script ref (spec.scripts) exporting `onArrive(ctx, entity)`: fired when a traveler lands in this place (a crossing in, the first standing at boot). The crossing hooks fire in one fixed order; a throwing hook logs and never unwinds the arrival.
    onLeave?: string   // Script ref (spec.scripts) exporting `onLeave(ctx, entity)`: fired when a traveler leaves this place (region-line crossing out, session detach's crossing to nowhere). Same fire machinery as onArrive.
  }
  worldBounds?: WorldBoundsDef   // bottom: the y a body falls out at (onOutOfBounds)
}
````


### After clicking "AtmosphereDef"

AtmosphereDef = { sky?: | { kind: "color", color: Color, params?: Record<string, num | bool | [num | [num, ...], ...] | { size: [x, y], data: [num, ...] }> } | { kind: "gradient", horizon: Color, zenith: Color, params?: Record<string, num | bool | [num | [num, ...], ...] | { size: [x, y], data: [num, ...] }> } | { kind: "rayleigh", turbidity?: num, rayleighCoefficient?: num, mieCoefficient?: num, mieDirectionalG?: num, skyColor?: Color, rayleighColor?: Color, mieColor?: Color, groundAlbedo?: Color, horizonTint?: Color, zenithTint?: Color, saturation?: 0-2, sunDiskSize?: num, sunDiskIntensity?: num, params?: Record<string, num | bool | [num | [num, ...], ...] | { size: [x, y], data: [num, ...] }> } // unwritten: turbidity 2, rayleighCoefficient 1, mieCoefficient 0.003, mieDirectionalG 0.8, saturation 1, sunDiskSize 2, sunDiskIntensity 1, no tint, a fixed dark groundAlbedo | { kind: "realistic", model: "rayleigh", turbidity?: num, rayleighCoefficient?: num, mieCoefficient?: num, mieDirectionalG?: num, skyColor?: Color, rayleighColor?: Color, mieColor?: Color, groundAlbedo?: Color, horizonTint?: Color, zenithTint?: Color, saturation?: 0-2, sunDiskSize?: num, sunDiskIntensity?: num, params?: Record<string, num | bool | [num | [num, ...], ...] | { size: [x, y], data: [num, ...] }> } // as kind "rayleigh" | { kind: "realistic", model: "hosek", turbidity?: num, rayleighColor?: Color, mieColor?: Color, groundAlbedo?: Color, horizonTint?: Color, zenithTint?: Color, saturation?: 0-2, sunDiskSize?: num, sunDiskIntensity?: num, params?: Record<string, num | bool | [num | [num, ...], ...] | { size: [x, y], data: [num, ...] }> }, // unwritten: as kind "rayleigh", but groundAlbedo is a dimmed ground from hemisphere.groundColor or the terrain, and sun.light.color (default warm white) tints this sky, where rayleigh's sun is always white ground?: bool, // default true. false = open sky (floating islands): the procedural sky becomes full-sphere atmosphere: haze below the horizon instead of a ground plane fog?: // Height fog: whole at and below base, half as thick every falloff metres higher; a base at a pit or valley floor fills only it and leaves all above clear, and near 0 with a short far is thick within metres (omitted: one fog at every height) | { kind: "linear", color?: Color | null, near: num, far: num, height?: { base?, falloff } } | { kind: "exp2", color?: Color | null, density: num, height?: { base?, falloff } }, sun?: { rotation?: { pitch?, yaw? }, orbit?: { noonYaw?, maxElevation? }, light?: { color?: Color, intensity?: num, shadow?: bool | { enabled?: bool, softness?: num } } }, // pitch = degrees above the horizon (90 overhead; below 0 the sun is under the ground), yaw 0 toward -Z and 180 toward +Z; a running day cycle moves both ambient?: { light?: { color?: Color, intensity?: num } }, hemisphere?: { skyColor?: Color, groundColor?: Color, intensity?: num }, environmentIntensity?: num, clouds?: { enabled?: bool, density?: 0-1, altitude?: num, thickness?: num, speed?: num, color?: Color, opacity?: 0-1, shadow?: 0-1, texture?: "/cdn/value.<sha>.png" }, // density = coverage; altitude = the layer's base in m (default 900); thickness = the layer's depth in m on a rayleigh or realistic sky, 100–1500; unwritten or under 100 = 700; there the layer also shades what lies under it, by the sun or the moon; shadow = how much of that shade reaches the ground (default 1; 0 = the clouds still draw and the ground keeps its light); in your own sky(ray, world) (sky: scripts/sky.js) this layer is world.clouds(): .rgb lit, .a cover, beside world.sun and world.moon (.direction, .disc()) stars?: { enabled?: bool, density?: 0-1, brightness?: 0-2, size?: num, twinkle?: bool, color?: Color, milkyWay?: 0-1 }, // the stars draw when any star setting is written; enabled: false turns them off moon?: { enabled?: bool, phase?: 0-1, size?: num, color?: Color, intensity?: num }, wind?: { direction?, speed? }, wet?: 0-1, rain?: 0-1, timeOfDay?: 0-24, cycle?: { periodMs: num, epoch: num, bands?: [[fromHour, speed], ...] } | { frozen: 0-24 } | { lengthSeconds, startTime?, anchorHour?, anchorTick? }, look?: { script?: "scripts/file.js", filter?: "pixel" | "linear", toneMapping?: "aces" | "neutral" | "none" | "linear" | "reinhard" | "cineon" | "agx", params?: Record<string, num | bool | str>, cube?: { parent: str, eye?: [x, y, z] } }, // filter: when the scene draws smaller than the screen, pixel shows each drawn pixel as one hard block and linear (the default) smooths; a look may hold only its filter }

#### Block 1

````text
AtmosphereDef = {
  sky?:
    | { kind: "color", color: Color, params?: Record<string, num | bool | [num | [num, ...], ...] | { size: [x, y], data: [num, ...] }> }
    | { kind: "gradient", horizon: Color, zenith: Color, params?: Record<string, num | bool | [num | [num, ...], ...] | { size: [x, y], data: [num, ...] }> }
    | { kind: "rayleigh", turbidity?: num, rayleighCoefficient?: num, mieCoefficient?: num, mieDirectionalG?: num, skyColor?: Color, rayleighColor?: Color, mieColor?: Color, groundAlbedo?: Color, horizonTint?: Color, zenithTint?: Color, saturation?: 0-2, sunDiskSize?: num, sunDiskIntensity?: num, params?: Record<string, num | bool | [num | [num, ...], ...] | { size: [x, y], data: [num, ...] }> }   // unwritten: turbidity 2, rayleighCoefficient 1, mieCoefficient 0.003, mieDirectionalG 0.8, saturation 1, sunDiskSize 2, sunDiskIntensity 1, no tint, a fixed dark groundAlbedo
    | { kind: "realistic", model: "rayleigh", turbidity?: num, rayleighCoefficient?: num, mieCoefficient?: num, mieDirectionalG?: num, skyColor?: Color, rayleighColor?: Color, mieColor?: Color, groundAlbedo?: Color, horizonTint?: Color, zenithTint?: Color, saturation?: 0-2, sunDiskSize?: num, sunDiskIntensity?: num, params?: Record<string, num | bool | [num | [num, ...], ...] | { size: [x, y], data: [num, ...] }> }   // as kind "rayleigh"
    | { kind: "realistic", model: "hosek", turbidity?: num, rayleighColor?: Color, mieColor?: Color, groundAlbedo?: Color, horizonTint?: Color, zenithTint?: Color, saturation?: 0-2, sunDiskSize?: num, sunDiskIntensity?: num, params?: Record<string, num | bool | [num | [num, ...], ...] | { size: [x, y], data: [num, ...] }> },   // unwritten: as kind "rayleigh", but groundAlbedo is a dimmed ground from hemisphere.groundColor or the terrain, and sun.light.color (default warm white) tints this sky, where rayleigh's sun is always white
  ground?: bool,   // default true. false = open sky (floating islands): the procedural sky becomes full-sphere atmosphere: haze below the horizon instead of a ground plane
  fog?:   // Height fog: whole at and below base, half as thick every falloff metres higher; a base at a pit or valley floor fills only it and leaves all above clear, and near 0 with a short far is thick within metres (omitted: one fog at every height)
    | { kind: "linear", color?: Color | null, near: num, far: num, height?: { base?, falloff } }
    | { kind: "exp2", color?: Color | null, density: num, height?: { base?, falloff } },
  sun?: { rotation?: { pitch?, yaw? }, orbit?: { noonYaw?, maxElevation? }, light?: { color?: Color, intensity?: num, shadow?: bool | { enabled?: bool, softness?: num } } },   // pitch = degrees above the horizon (90 overhead; below 0 the sun is under the ground), yaw 0 toward -Z and 180 toward +Z; a running day cycle moves both
  ambient?: { light?: { color?: Color, intensity?: num } },
  hemisphere?: { skyColor?: Color, groundColor?: Color, intensity?: num },
  environmentIntensity?: num,
  clouds?: { enabled?: bool, density?: 0-1, altitude?: num, thickness?: num, speed?: num, color?: Color, opacity?: 0-1, shadow?: 0-1, texture?: "/cdn/value.<sha>.png" },   // density = coverage; altitude = the layer's base in m (default 900); thickness = the layer's depth in m on a rayleigh or realistic sky, 100–1500; unwritten or under 100 = 700; there the layer also shades what lies under it, by the sun or the moon; shadow = how much of that shade reaches the ground (default 1; 0 = the clouds still draw and the ground keeps its light); in your own sky(ray, world) (sky: scripts/sky.js) this layer is world.clouds(): .rgb lit, .a cover, beside world.sun and world.moon (.direction, .disc())
  stars?: { enabled?: bool, density?: 0-1, brightness?: 0-2, size?: num, twinkle?: bool, color?: Color, milkyWay?: 0-1 },   // the stars draw when any star setting is written; enabled: false turns them off
  moon?: { enabled?: bool, phase?: 0-1, size?: num, color?: Color, intensity?: num },
  wind?: { direction?, speed? },
  wet?: 0-1,
  rain?: 0-1,
  timeOfDay?: 0-24,
  cycle?: { periodMs: num, epoch: num, bands?: [[fromHour, speed], ...] } | { frozen: 0-24 } | { lengthSeconds, startTime?, anchorHour?, anchorTick? },
  look?: { script?: "scripts/file.js", filter?: "pixel" | "linear", toneMapping?: "aces" | "neutral" | "none" | "linear" | "reinhard" | "cineon" | "agx", params?: Record<string, num | bool | str>, cube?: { parent: str, eye?: [x, y, z] } },   // filter: when the scene draws smaller than the screen, pixel shows each drawn pixel as one hard block and linear (the default) smooths; a look may hold only its filter
}
````


### After clicking "CameraDef"

the camera is a script (behavior); its config angles (state.pitch / yaw) are RADIANS, while a rotation is degrees; where a person looks now is player.camera.rotation, a read

player.camera.rotation

CameraDef = | { kind: "custom"; state?: TomeCameraState; orientation?: CameraOrientationDef; sensitivity?: number = 3; minPitch?: number; maxPitch?: number; pointerLock?: boolean | "drag" | { drag: "left" | "right" | "middle" } | { unadjustedMovement: boolean }; hideLocalPlayer?: boolean } & CameraCommon // Camera definition: a behavior script drives the lens. | { kind?: undefined; state?: TomeCameraState; pointerLock?: boolean | "drag" | { drag: "left" | "right" | "middle" } | { unadjustedMovement: boolean }; hideLocalPlayer?: boolean } & CameraCommon // Backward-compatible legacy camera shape (no kind). Treated as kind: "custom" at runtime. // CameraDef, kind "custom" state?: TomeCameraState // Camera state (yaw, pitch, distance, etc.) orientation?: CameraOrientationDef // Held view-axis ownership. Omitted: the script owns the pose: position and rotation presented exactly, as `{ source: "script" }`; the engine integrates no look and presents no orbit without `{ source: "look" }`. sensitivity?: number = 3 // Look sensitivity of the engine-integrated look, the mouse and a pad's right stick alike; the player's own look speed (Settings › look › speed) multiplies it minPitch?: number // The lowest pitch of the engine-integrated look, in radians (+ looks up): the mouse, the stick and a `state.pitch` write stop here. Default -1.4 (80° down); -Math.PI / 2 looks straight down. maxPitch?: number // The highest pitch of the engine-integrated look, in radians. Default 1.4 (80° up); Math.PI / 2 looks straight up. pointerLock?: boolean | "drag" | { drag: "left" | "right" | "middle" } | { unadjustedMovement: boolean } // Pointer lock. true: always captured (FPS-style mouse look). false: cursor always free. "drag": the cursor stays free at rest and a held mouse button turns the look, so drag-orbit cameras never jam at the screen edge. `{ drag: "left" }` (or "right", "middle"): the same, ridden by that button alone; the other buttons click with the cursor free. `{ unadjustedMovement: true }`: captured like true, with the mouse's raw movement and no OS pointer acceleration where the browser gives it. `{ unadjustedMovement: false }`: captured like true, with the plain movement over a camera that asked for the raw one. hideLocalPlayer?: boolean // Hide the local player's body and its parented objects on their own screen (others still see it). The hidden body still casts its shadow, and a part whose own `visibleInFirstPerson` is true stays drawn, the body itself included. A 2D place ignores this flag (the rig's `ctx.self.hideLocalPlayer` still hides there).

#### Block 1

````text
player.camera.rotation
````

#### Block 2

````text
CameraDef =
  | { kind: "custom"; state?: TomeCameraState; orientation?: CameraOrientationDef; sensitivity?: number = 3; minPitch?: number; maxPitch?: number; pointerLock?: boolean | "drag" | { drag: "left" | "right" | "middle" } | { unadjustedMovement: boolean }; hideLocalPlayer?: boolean } & CameraCommon   // Camera definition: a behavior script drives the lens.
  | { kind?: undefined; state?: TomeCameraState; pointerLock?: boolean | "drag" | { drag: "left" | "right" | "middle" } | { unadjustedMovement: boolean }; hideLocalPlayer?: boolean } & CameraCommon   // Backward-compatible legacy camera shape (no kind). Treated as kind: "custom" at runtime.

// CameraDef, kind "custom"
  state?: TomeCameraState   // Camera state (yaw, pitch, distance, etc.)
  orientation?: CameraOrientationDef   // Held view-axis ownership. Omitted: the script owns the pose: position and rotation presented exactly, as `{ source: "script" }`; the engine integrates no look and presents no orbit without `{ source: "look" }`.
  sensitivity?: number = 3   // Look sensitivity of the engine-integrated look, the mouse and a pad's right stick alike; the player's own look speed (Settings › look › speed) multiplies it
  minPitch?: number   // The lowest pitch of the engine-integrated look, in radians (+ looks up): the mouse, the stick and a `state.pitch` write stop here. Default -1.4 (80° down); -Math.PI / 2 looks straight down.
  maxPitch?: number   // The highest pitch of the engine-integrated look, in radians. Default 1.4 (80° up); Math.PI / 2 looks straight up.
  pointerLock?: boolean | "drag" | { drag: "left" | "right" | "middle" } | { unadjustedMovement: boolean }   // Pointer lock. true: always captured (FPS-style mouse look). false: cursor always free. "drag": the cursor stays free at rest and a held mouse button turns the look, so drag-orbit cameras never jam at the screen edge. `{ drag: "left" }` (or "right", "middle"): the same, ridden by that button alone; the other buttons click with the cursor free. `{ unadjustedMovement: true }`: captured like true, with the mouse's raw movement and no OS pointer acceleration where the browser gives it. `{ unadjustedMovement: false }`: captured like true, with the plain movement over a camera that asked for the raw one.
  hideLocalPlayer?: boolean   // Hide the local player's body and its parented objects on their own screen (others still see it). The hidden body still casts its shadow, and a part whose own `visibleInFirstPerson` is true stays drawn, the body itself included. A 2D place ignores this flag (the rig's `ctx.self.hideLocalPlayer` still hides there).
````


### After clicking "CustomCameraDef"

Camera definition: a behavior script drives the lens.

CustomCameraDef = CameraCommon & { kind: "custom" state?: TomeCameraState // Camera state (yaw, pitch, distance, etc.) orientation?: CameraOrientationDef // Held view-axis ownership. Omitted: the script owns the pose: position and rotation presented exactly, as `{ source: "script" }`; the engine integrates no look and presents no orbit without `{ source: "look" }`. sensitivity?: number = 3 // Look sensitivity of the engine-integrated look, the mouse and a pad's right stick alike; the player's own look speed (Settings › look › speed) multiplies it minPitch?: number // The lowest pitch of the engine-integrated look, in radians (+ looks up): the mouse, the stick and a `state.pitch` write stop here. Default -1.4 (80° down); -Math.PI / 2 looks straight down. maxPitch?: number // The highest pitch of the engine-integrated look, in radians. Default 1.4 (80° up); Math.PI / 2 looks straight up. pointerLock?: boolean | "drag" | { drag: "left" | "right" | "middle" } | { unadjustedMovement: boolean } // Pointer lock. true: always captured (FPS-style mouse look). false: cursor always free. "drag": the cursor stays free at rest and a held mouse button turns the look, so drag-orbit cameras never jam at the screen edge. `{ drag: "left" }` (or "right", "middle"): the same, ridden by that button alone; the other buttons click with the cursor free. `{ unadjustedMovement: true }`: captured like true, with the mouse's raw movement and no OS pointer acceleration where the browser gives it. `{ unadjustedMovement: false }`: captured like true, with the plain movement over a camera that asked for the raw one. hideLocalPlayer?: boolean // Hide the local player's body and its parented objects on their own screen (others still see it). The hidden body still casts its shadow, and a part whose own `visibleInFirstPerson` is true stays drawn, the body itself included. A 2D place ignores this flag (the rig's `ctx.self.hideLocalPlayer` still hides there). }

#### Block 1

````text
CustomCameraDef = CameraCommon & {
  kind: "custom"
  state?: TomeCameraState   // Camera state (yaw, pitch, distance, etc.)
  orientation?: CameraOrientationDef   // Held view-axis ownership. Omitted: the script owns the pose: position and rotation presented exactly, as `{ source: "script" }`; the engine integrates no look and presents no orbit without `{ source: "look" }`.
  sensitivity?: number = 3   // Look sensitivity of the engine-integrated look, the mouse and a pad's right stick alike; the player's own look speed (Settings › look › speed) multiplies it
  minPitch?: number   // The lowest pitch of the engine-integrated look, in radians (+ looks up): the mouse, the stick and a `state.pitch` write stop here. Default -1.4 (80° down); -Math.PI / 2 looks straight down.
  maxPitch?: number   // The highest pitch of the engine-integrated look, in radians. Default 1.4 (80° up); Math.PI / 2 looks straight up.
  pointerLock?: boolean | "drag" | { drag: "left" | "right" | "middle" } | { unadjustedMovement: boolean }   // Pointer lock. true: always captured (FPS-style mouse look). false: cursor always free. "drag": the cursor stays free at rest and a held mouse button turns the look, so drag-orbit cameras never jam at the screen edge. `{ drag: "left" }` (or "right", "middle"): the same, ridden by that button alone; the other buttons click with the cursor free. `{ unadjustedMovement: true }`: captured like true, with the mouse's raw movement and no OS pointer acceleration where the browser gives it. `{ unadjustedMovement: false }`: captured like true, with the plain movement over a camera that asked for the raw one.
  hideLocalPlayer?: boolean   // Hide the local player's body and its parented objects on their own screen (others still see it). The hidden body still casts its shadow, and a part whose own `visibleInFirstPerson` is true stays drawn, the body itself included. A 2D place ignores this flag (the rig's `ctx.self.hideLocalPlayer` still hides there).
}
````


### After clicking "InputsDef"

Input bindings configuration Defines how keyboard, mouse, and gamepad inputs map to game controls. FORBIDDEN BINDINGS: Tab is reserved by the system and cannot be bound to game inputs. Example:

FORBIDDEN BINDINGS:

Example:

inputs: { axes: { moveX: { keys: "a/d" }, // A -1, D +1; the left stick's right reads +1,…

InputsDef = { axes?: Record<string, InputAxisDef> // keys "a/d" (negative/positive); a held key or stick reads -1..1 actions?: Record<string, InputActionDef> // every action onInput reads, a UI button's sendAction(name) too, must be declared here touch?: { // phones auto-project a layout from axes/actions: a stick ONLY from axes named moveX/moveZ, drag-look, ≤4 buttons; designed layouts = surfaces (mobile-controls skill) enabled?: boolean // false opts the game out of auto-projected touch controls entirely. surfaces?: Record<string, TouchSurfaceDef> // Named authored surfaces. A surface is a COMPLETE description: the engine never merges two; compose in JS from the resolved draft. Active surface: the selector's pick, else "default" if declared, else the engine draft. active?: ScriptRef // Per-player surface selector script ref: default export (ctx) => surface name, or { surface, labels: { <action or axis>: "Word" | null }, icons: { <action>: "⚔" | "/cdn/<picture>" | null } } (the pieces' words now, a chip by its action, a stick or pad by an axis it drives; a word replaces a chip's icon or a pad's label, null takes the piece off the glass; icons then set a chip's icon, null shows its word), re-evaluated on player/device change (driving vs on-foot). style?: string // The controls' look: CSS rules on the parts ([data-part="button"], "stick", "thumb", "pad") over the engine's own; where a control stands and its hit area stay the engine's. } reservedAxisAliasesReported?: string[] // Engine housekeeping, written by the engine, never author it: the reserved-name axis aliases (aliases of engine-injected axes, e.g. "odm-player:aimYawSin") whose non-keep was already reported to the creator's chat, so the report fires once per verdict across room boots instead of once per container. }

#### Block 1

````text
inputs: {
axes: {
moveX: { keys: "a/d" },   // A -1, D +1; the left stick's right reads +1,…

````


### After clicking "InputActionDef"

Input action definition - discrete action trigger Actions fire when keys/buttons are pressed. They can carry optional payloads when triggered via sendAction(name, payload) from UI code. Reading it in onInput: input.pressed.<name> (went down this tick, a jump), input.held.<name> (down this tick,…

Reading it in onInput:

InputActionDef = { keys?: string[] // Keyboard keys that trigger this action. Key names are case-insensitive. Any KeyboardEvent.code the browser can deliver binds, spelled as the platform spells it (the UI Events code list): KeyA-KeyZ, Digit0-Digit9 (the number row), Numpad0-Numpad9 and the pad's NumpadAdd/Subtract/Multiply/Divide/Enter/Decimal/Equal/Comma, ArrowUp/Down/Left/Right, F1-F24, CapsLock/NumLock/ScrollLock, Pause, PrintScreen, ContextMenu, Insert/Delete/Home/End/PageUp/PageDown, IntlBackslash/IntlRo/IntlYen, ShiftLeft/Right, ControlLeft/Right, AltLeft/Right, MetaLeft/Right, the media keys (MediaPlayPause, AudioVolumeUp, …). Shortcut names too: a letter ("e"), a digit ("1"), space, shift, ctrl/control, alt, meta/cmd, enter, escape/esc, backspace, delete, insert, home, end, pageup, pagedown, up/down/left/right, f1-f24, numlock, and a punctuation character itself ("`", "-", "=", "[", "]", "\\", ";", "'", ",", ".", "/"). Tab is reserved by Jayzee and never binds. Examples: ["space"], ["1"], ["e", "Enter"], ["escape"] mouse?: string // Mouse input that triggers this action. - "left" / "right" / "middle": mouse buttons. - "mouse4" / "mouse5": the side/thumb buttons (back/forward). Binding one suppresses the browser's history navigation for it, so quick-melee / ping / MMO binds are safe. - "wheelUp" / "wheelDown": ONE pulse per discrete wheel notch (Minecraft-style hotbar stepping). The engine quantizes raw scroll into clean ±1 detents, so a trackpad's momentum and a mouse's notches both fire exactly one step per physical detent. gamepad?: string | false // Gamepad button that triggers this action. Natural names: "a"/"b"/"x"/"y" (or "cross"/"circle"/"square"/"triangle"), "lb"/"rb", "lt"/"rt", "start"/"select", "l3"/"r3", "dpadUp"/"dpadDown"/"dpadLeft"/"dpadRight". Raw indices work too ("Gamepad:Button17" or 17). An action with keys, a mouse button or a touch chip that names no gamepad button takes the next free one of "a", "b", "x", "y", "lb", "rb", in declaration order; a button an action names is never given to another, so a button ui.js reads itself stays free only while an action names it. An action written false takes none, and its button goes to the next. A stick drives axes only, so movement a script reads key by key gets moveX/moveZ axes on those keys, read by the script instead. modifiers?: string[] // Required modifier inputs: all must be held for the action to fire. Accepts OS modifiers ("shift", "ctrl", "alt", "meta"), mouse buttons ("left", "right", "middle", "mouse4", "mouse5", same names as the `mouse` field), and key names ("space", "e", same names as the `keys` field). Combo modifiers are purely additive: they never block individual actions from firing. OS modifier strict-checking (ctrl/alt/meta block plain bindings) is preserved only for shift/ctrl/alt/meta. Examples: - ["ctrl"]: Ctrl+key (OS modifier, unchanged) - ["ctrl", "shift"]: Ctrl+Shift+key - ["right"]: primary trigger + right mouse held - ["left"]: primary trigger + left mouse held - ["space"]: primary trigger + space held activeOn?: "keydown" | "hold" | "keyup" | (string & {}) // Compat; shapes the older input.actions.<name> boolean only: "keydown" (default) = pressed, "hold" = held, "keyup" = released. held / pressed / released read every binding without it. touch?: InputActionTouchDef // Touch options. Buttons are auto-projected from keys/mouse bindings: set this to exclude an action, rename its button, pin its slot, or bind the action to a world gesture (touch: { gesture: "tap" | "double-tap" | "hold" }) for tap-the-world control schemes. active?: ScriptRef // Per-player script ref: its default export (ctx) => boolean is asked for each player at UI cadence, ctx read-only with ctx.self the player. A falsy answer takes the action from that player: none of its keys, mouse, pad buttons or touch chips bind, and their keys page does not list it. A throw keeps the last answer. }

#### Block 1

````text
InputActionDef = {
  keys?: string[]   // Keyboard keys that trigger this action. Key names are case-insensitive. Any KeyboardEvent.code the browser can deliver binds, spelled as the platform spells it (the UI Events code list): KeyA-KeyZ, Digit0-Digit9 (the number row), Numpad0-Numpad9 and the pad's NumpadAdd/Subtract/Multiply/Divide/Enter/Decimal/Equal/Comma, ArrowUp/Down/Left/Right, F1-F24, CapsLock/NumLock/ScrollLock, Pause, PrintScreen, ContextMenu, Insert/Delete/Home/End/PageUp/PageDown, IntlBackslash/IntlRo/IntlYen, ShiftLeft/Right, ControlLeft/Right, AltLeft/Right, MetaLeft/Right, the media keys (MediaPlayPause, AudioVolumeUp, …). Shortcut names too: a letter ("e"), a digit ("1"), space, shift, ctrl/control, alt, meta/cmd, enter, escape/esc, backspace, delete, insert, home, end, pageup, pagedown, up/down/left/right, f1-f24, numlock, and a punctuation character itself ("`", "-", "=", "[", "]", "\\", ";", "'", ",", ".", "/"). Tab is reserved by Spawn and never binds. Examples: ["space"], ["1"], ["e", "Enter"], ["escape"]
  mouse?: string   // Mouse input that triggers this action. - "left" / "right" / "middle": mouse buttons. - "mouse4" / "mouse5": the side/thumb buttons (back/forward). Binding one suppresses the browser's history navigation for it, so quick-melee / ping / MMO binds are safe. - "wheelUp" / "wheelDown": ONE pulse per discrete wheel notch (Minecraft-style hotbar stepping). The engine quantizes raw scroll into clean ±1 detents, so a trackpad's momentum and a mouse's notches both fire exactly one step per physical detent.
  gamepad?: string | false   // Gamepad button that triggers this action. Natural names: "a"/"b"/"x"/"y" (or "cross"/"circle"/"square"/"triangle"), "lb"/"rb", "lt"/"rt", "start"/"select", "l3"/"r3", "dpadUp"/"dpadDown"/"dpadLeft"/"dpadRight". Raw indices work too ("Gamepad:Button17" or 17). An action with keys, a mouse button or a touch chip that names no gamepad button takes the next free one of "a", "b", "x", "y", "lb", "rb", in declaration order; a button an action names is never given to another, so a button ui.js reads itself stays free only while an action names it. An action written false takes none, and its button goes to the next. A stick drives axes only, so movement a script reads key by key gets moveX/moveZ axes on those keys, read by the script instead.
  modifiers?: string[]   // Required modifier inputs: all must be held for the action to fire. Accepts OS modifiers ("shift", "ctrl", "alt", "meta"), mouse buttons ("left", "right", "middle", "mouse4", "mouse5", same names as the `mouse` field), and key names ("space", "e", same names as the `keys` field). Combo modifiers are purely additive: they never block individual actions from firing. OS modifier strict-checking (ctrl/alt/meta block plain bindings) is preserved only for shift/ctrl/alt/meta. Examples: - ["ctrl"]: Ctrl+key (OS modifier, unchanged) - ["ctrl", "shift"]: Ctrl+Shift+key - ["right"]: primary trigger + right mouse held - ["left"]: primary trigger + left mouse held - ["space"]: primary trigger + space held
  activeOn?: "keydown" | "hold" | "keyup" | (string & {})   // Compat; shapes the older input.actions.<name> boolean only: "keydown" (default) = pressed, "hold" = held, "keyup" = released. held / pressed / released read every binding without it.
  touch?: InputActionTouchDef   // Touch options. Buttons are auto-projected from keys/mouse bindings: set this to exclude an action, rename its button, pin its slot, or bind the action to a world gesture (touch: { gesture: "tap" | "double-tap" | "hold" }) for tap-the-world control schemes.
  active?: ScriptRef   // Per-player script ref: its default export (ctx) => boolean is asked for each player at UI cadence, ctx read-only with ctx.self the player. A falsy answer takes the action from that player: none of its keys, mouse, pad buttons or touch chips bind, and their keys page does not list it. A throw keeps the last answer.
}
````


### After clicking "InputAxisDef"

Input axis definition - continuous input. A held key or stick reads -1 to 1 (two pushed one way still read 1); a mouse delta, the wheel and a sendAxis value arrive as they came. Common axis names:

Common axis names:

moveX: Strafe left/right (-1 = left, +1 = right). Typically "a/d" keys, which the left stick…

moveX

InputAxisDef = { keys?: string // Slash-separated negative/positive key pairs. "a/d" maps A to -1 and D to +1; "s/w" maps S to -1 and W to +1. Add more pairs in the same order, e.g. "a/d/ArrowLeft/ArrowRight". A single key maps to +1. mouse?: string // Mouse axis: "deltaX"/"deltaY" for camera look, "wheelY" for continuous scroll-wheel zoom (the value is the zoomIn channel's above: its sign is zoom-in's, not the DOM's deltaY), "wheelX" for the sideways scroll (a tilt wheel, a trackpad's sideways swipe: + right, about 0.5 a notch). For a hotbar/slot selector that steps one slot per notch, do NOT use this: declare an action with `mouse: "wheelUp"`/`"wheelDown"` instead. gamepad?: string // Gamepad analog axis (case-insensitive), e.g. "Gamepad:LT"/"Gamepad:RT" for analog triggers (0 to 1). The left stick drives every axis a W/S or A/D key pair drives, stick-up as W and stick-right as D: naming "leftStickX" or "leftStickY" on any axis turns that off for the whole stick. A stick named on an axis whose keys hold a W/S or A/D pair reads as those keys do; on moveX or moveZ without one it reads stick-right and stick-up as +1, as D and W; on any other axis it reads as the browser does: right = +1, DOWN = +1, so stick-up is -1. The right stick drives camera look automatically: bind "rightStickX"/"rightStickY" only to take the stick for gameplay (e.g. twin-stick aim), which turns camera look off for the whole stick. "Gamepad:Axis<N>" ("Gamepad:Axis2") reads the pad's own axis N as the browser lists it (Gamepad.axes[N]), a racing wheel's or a flight stick's included: a pedal rests at its end of the axis. deadzone?: number // The stick's rest on this axis as a fraction of its sweep, 0 to 1: readings under it are 0, keys and mouse are never gated. Default: the stick's 0.1 on a game axis with a `gamepad` source, the look curve's own rest on lookX/lookY, and nothing without a stick; on lookX/lookY the look curve and the camera rest at the number you write. `deadzone: 0` reads the raw stick (past the device's own 0.01 noise floor) for your own curve. }

#### Block 1

````text
moveX
````

#### Block 2

````text
InputAxisDef = {
  keys?: string   // Slash-separated negative/positive key pairs. "a/d" maps A to -1 and D to +1; "s/w" maps S to -1 and W to +1. Add more pairs in the same order, e.g. "a/d/ArrowLeft/ArrowRight". A single key maps to +1.
  mouse?: string   // Mouse axis: "deltaX"/"deltaY" for camera look, "wheelY" for continuous scroll-wheel zoom (the value is the zoomIn channel's above: its sign is zoom-in's, not the DOM's deltaY), "wheelX" for the sideways scroll (a tilt wheel, a trackpad's sideways swipe: + right, about 0.5 a notch). For a hotbar/slot selector that steps one slot per notch, do NOT use this: declare an action with `mouse: "wheelUp"`/`"wheelDown"` instead.
  gamepad?: string   // Gamepad analog axis (case-insensitive), e.g. "Gamepad:LT"/"Gamepad:RT" for analog triggers (0 to 1). The left stick drives every axis a W/S or A/D key pair drives, stick-up as W and stick-right as D: naming "leftStickX" or "leftStickY" on any axis turns that off for the whole stick. A stick named on an axis whose keys hold a W/S or A/D pair reads as those keys do; on moveX or moveZ without one it reads stick-right and stick-up as +1, as D and W; on any other axis it reads as the browser does: right = +1, DOWN = +1, so stick-up is -1. The right stick drives camera look automatically: bind "rightStickX"/"rightStickY" only to take the stick for gameplay (e.g. twin-stick aim), which turns camera look off for the whole stick. "Gamepad:Axis<N>" ("Gamepad:Axis2") reads the pad's own axis N as the browser lists it (Gamepad.axes[N]), a racing wheel's or a flight stick's included: a pedal rests at its end of the axis.
  deadzone?: number   // The stick's rest on this axis as a fraction of its sweep, 0 to 1: readings under it are 0, keys and mouse are never gated. Default: the stick's 0.1 on a game axis with a `gamepad` source, the look curve's own rest on lookX/lookY, and nothing without a stick; on lookX/lookY the look curve and the camera rest at the number you write. `deadzone: 0` reads the raw stick (past the device's own 0.01 noise floor) for your own curve.
}
````


### After clicking "PlayerDef"

PlayerDef = ObjectProperties & { state?: TomeState // Initial player state behavior?: BehaviorRef // Player behavior script(s) tags?: string[] // Player tags ("player" first; Cleetus's builder body wears "helper" instead) platformState?: string[] // The keys of every player's `state` the PLATFORM holds: `platformState: ["gold", "inventory"]` on the player template (the `player` export of `templates/player.js` that `world.config.yaml` `player:` points at, or the inline record). Absent = no platform keys: every key of a player's state is theirs. children?: ObjectSpec[] // Parts on every player's body: each stands at `<body id>/<child id>` (`child-<index>` when it has none) and leaves with the body. `parent: "player"` instead copies a placed scene root onto each body, at `<body id>:<root id>`. }

#### Block 1

````text
PlayerDef = ObjectProperties & {
  state?: TomeState   // Initial player state
  behavior?: BehaviorRef   // Player behavior script(s)
  tags?: string[]   // Player tags ("player" first; Savi's builder body wears "helper" instead)
  platformState?: string[]   // The keys of every player's `state` the PLATFORM holds: `platformState: ["gold", "inventory"]` on the player template (the `player` export of `templates/player.js` that `world.config.yaml` `player:` points at, or the inline record). Absent = no platform keys: every key of a player's state is theirs.
  children?: ObjectSpec[]   // Parts on every player's body: each stands at `<body id>/<child id>` (`child-<index>` when it has none) and leaves with the body. `parent: "player"` instead copies a placed scene root onto each body, at `<body id>:<root id>`.
}
````


### After clicking "RoutingDef"

Room routing configuration (spec.routing). Names a script that exports pickRoom(ctx): evaluated once per joining player, before the room connection is made. Absent, a player joins the room their invite, portal or link names, else the default room. The ctx shape, the routing patterns and the…

RoutingDef = { script?: ScriptRef // Script ref under scripts/ exporting `async function pickRoom(ctx)` (e.g. "scripts/routing.js"). Returns a room name, or `{ room, persistence }`: the name and the class the room wears; null/throw falls back to the default room. maxPlayers?: number // Per-room cap on BODIES (a positive integer, any size): the room's door refuses the body past it (`room full`) and the pick runs again with that room in `ctx.rejectedRooms`; the player reads the refusal only when the rule names no other room. Who counts: every player body: a human, an inhabitant agent, an agent's own account; Cleetus's helper body and a wisp's never take a slot, so size the cap for the players alone. Unset = no cap: every player in it. persistence?: PlacePersistence // The class every room the rule names wears unless its pick's answer names one: `persistent` (the default: a room keeps what happens in it), `session` (its things live one room-life: from the first arrival until the room has stood empty a while), `ephemeral` (they die with its last player). A player's own durables persist under every class. alwaysOn?: boolean // `true` asks Jayzee to visit the world while nobody is in it: on a fixed cadence, for a bounded time after the last player left, Jayzee's own machine opens the room once, runs the crons and the `sim.js` ticks owed since the last visit, and leaves. Nothing runs between visits; the word never keeps a server up. The cadence, the horizon and the shape the world's code takes live in the rooms-and-matchmaking skill. Unset = off. }

#### Block 1

````text
RoutingDef = {
  script?: ScriptRef   // Script ref under scripts/ exporting `async function pickRoom(ctx)` (e.g. "scripts/routing.js"). Returns a room name, or `{ room, persistence }`: the name and the class the room wears; null/throw falls back to the default room.
  maxPlayers?: number   // Per-room cap on BODIES (a positive integer, any size): the room's door refuses the body past it (`room full`) and the pick runs again with that room in `ctx.rejectedRooms`; the player reads the refusal only when the rule names no other room. Who counts: every player body: a human, an inhabitant agent, an agent's own account; Savi's helper body and a wisp's never take a slot, so size the cap for the players alone. Unset = no cap: every player in it.
  persistence?: PlacePersistence   // The class every room the rule names wears unless its pick's answer names one: `persistent` (the default: a room keeps what happens in it), `session` (its things live one room-life: from the first arrival until the room has stood empty a while), `ephemeral` (they die with its last player). A player's own durables persist under every class.
  alwaysOn?: boolean   // `true` asks Spawn to visit the world while nobody is in it: on a fixed cadence, for a bounded time after the last player left, Spawn's own machine opens the room once, runs the crons and the `sim.js` ticks owed since the last visit, and leaves. Nothing runs between visits; the word never keeps a server up. The cadence, the horizon and the shape the world's code takes live in the rooms-and-matchmaking skill. Unset = off.
}
````


### After clicking "EngineConfig"

The world's engine settings.

EngineConfig = { networking?: { mode?: "singleplayer" | "multiplayer" // Networking mode. Default: "multiplayer": each player owns their own state, zero-correction movement, the server applies and fans out without simulating. "singleplayer" = nothing is shared. } ui?: { // Engine UI configuration theme?: { // UI theme settings applied to all game UI font?: string // Default font family for game UI. Any CSS font-family string works. Bundled fonts (always available): 'Geist Pixel Square', 'Geist Pixel Grid', 'Geist Pixel Circle', 'Geist Pixel Triangle', 'Geist Pixel Line', 'Jersey 10' (legacy). Geist Pixel Grid, Circle, Triangle and Line draw each pixel of a letter apart, so the background shows between them and small text looks striped or broken. You can also use any font name: it's applied as CSS so system fonts and web-safe fonts work too (e.g., 'Georgia', 'Courier New', 'Impact'). If the font isn't available, the browser falls back to system-ui, sans-serif. Set via `ctx.world.engine.ui.theme.font = 'Geist Pixel Square'`. } targetFps?: number // Game-UI (HUD) refresh rate in frames per second. Default 30, the default simulation rate: the HUD samples game state once a simulation frame at most, so a rate past the place's tick rate samples every frame and no more. For smoother motion, animate with CSS transitions/keyframes inside the HUD html: they run on the browser clock at full display refresh. Lower it (10, or 1 for once a second) to spend less on a mostly-static HUD. Set via `ctx.world.engine.ui.targetFps = 15`. Applies live: no reload. referenceHeight?: number // Opt-in HUD viewport normalization: the viewport HEIGHT (px) the game UI was designed against. Unset (the default), authored px land as-is: a HUD laid out on a 4K monitor covers twice the screen fraction on a 1080p one. Set, the engine scales the game-UI plane by `viewportHeight / referenceHeight` (CSS zoom, live on resize), so authored px mean "px at the reference height" and the HUD holds the same screen fraction on every monitor; the UI script's `window.innerWidth`/`window.innerHeight` mirror reports the same reference space (`innerHeight` reads exactly `referenceHeight`). Use the height the UI was designed on: 1080 for most, 2160 for a HUD laid out on a 4K screen, 180 for a 320 × 180 pixel-art HUD. Game HUD only: god-mode chrome is engine-owned and never scales. Set via `ctx.world.engine.ui.referenceHeight = 1080`. Applies live: no reload. } graphics?: { // Rendering configuration perfectPixelArt?: boolean | number // true draws a place seen through an orthographic camera, 2D or 3D, on its pixel art's own grid, read from its sprites and tiles; a number sets texels per world unit. Default false. A pixel look over any picture is the look's `pixelate` antialias?: boolean // Antialiasing. Smoothing is the player's own choice (`off`, or `msaa` at 4 samples); a world cannot turn it on. `false` forces raw pixels: one scene sample, no multisampling, even when the player chose `msaa`. It never holds the picture's size: in 3D the quality governor may render fewer pixels and upscale; a 2D scene never does. Applies live on patch. } playerSettings?: { // Creator policy over PLAYER settings: accessibility protections a game pre-enables for players who never chose, and which player control overrides are legal. A player's own explicit choice always wins within these bounds. Sound, Savi-verbosity and graphics quality have NO surface here by design: the game's mix is authored in spec audio objects, how chatty Cleetus is belongs to the player, and a game never sets or caps a player's quality level: each player's device is measured and the player chooses their own. Set each key at its dot (`ctx.world.engine.playerSettings.<path> = …`); `null` clears it. Illegal fields are refused with a warn naming why (e.g. accessibility may only be pre-enabled, never disabled: no creator can force flashing on a photosensitive player). defaults?: { // Starting values for settings the player never set explicitly: a player's explicit choice always beats these. accessibility?: { reduceFlashing?: boolean; reduceMotion?: boolean } // Safe direction only: `true` pre-enables a protection for this game; `false` is refused (players own accessibility). } caps?: { // Hard bounds: legal only for controls. Accessibility and graphics quality can never be capped. controls?: { lookSensitivity?: boolean; invertY?: boolean; fov?: boolean } // Which player control overrides are legal in this game (default: all overridable). Creator control VALUES live in spec.camera / spec.inputs. } } simulation?: { tickRateHz?: number } // The WORLD layer of the simulation tick base, `simulation.tickRateHz` (Hz): the default place's `tickBase` shadows it, and the room steps every place at that one rate; unset, the era default. The same chain `ctx.place.tickBase` names as the layer beneath it. behaviors?: ScriptRef[] // Engine behavior scripts, lifecycle hooks as named exports: onArrive(ctx, player) / onLeave(ctx, player) fire for every player arrival and departure at the WORLD's door (join, rejoin, a link in from another world: one hook each way; `player.arrival.kind` says which; see platform-systems) (a hop between places of one world runs the place's policy.onArrive / onLeave instead), plus onPlaceStart / onPlaceShutdown. Same composition pattern as entity behaviors. crons?: { schedule: string; script: ScriptRef }[] // Cron jobs: scheduled scripts. Each script exports `async function cron(objectApi)`. }

#### Block 1

````text
EngineConfig = {
  networking?: {
    mode?: "singleplayer" | "multiplayer"   // Networking mode. Default: "multiplayer": each player owns their own state, zero-correction movement, the server applies and fans out without simulating. "singleplayer" = nothing is shared.
  }
  ui?: {   // Engine UI configuration
    theme?: {   // UI theme settings applied to all game UI
      font?: string   // Default font family for game UI. Any CSS font-family string works. Bundled fonts (always available): 'Geist Pixel Square', 'Geist Pixel Grid', 'Geist Pixel Circle', 'Geist Pixel Triangle', 'Geist Pixel Line', 'Jersey 10' (legacy). Geist Pixel Grid, Circle, Triangle and Line draw each pixel of a letter apart, so the background shows between them and small text looks striped or broken. You can also use any font name: it's applied as CSS so system fonts and web-safe fonts work too (e.g., 'Georgia', 'Courier New', 'Impact'). If the font isn't available, the browser falls back to system-ui, sans-serif. Set via `ctx.world.engine.ui.theme.font = 'Geist Pixel Square'`.
    }
    targetFps?: number   // Game-UI (HUD) refresh rate in frames per second. Default 30, the default simulation rate: the HUD samples game state once a simulation frame at most, so a rate past the place's tick rate samples every frame and no more. For smoother motion, animate with CSS transitions/keyframes inside the HUD html: they run on the browser clock at full display refresh. Lower it (10, or 1 for once a second) to spend less on a mostly-static HUD. Set via `ctx.world.engine.ui.targetFps = 15`. Applies live: no reload.
    referenceHeight?: number   // Opt-in HUD viewport normalization: the viewport HEIGHT (px) the game UI was designed against. Unset (the default), authored px land as-is: a HUD laid out on a 4K monitor covers twice the screen fraction on a 1080p one. Set, the engine scales the game-UI plane by `viewportHeight / referenceHeight` (CSS zoom, live on resize), so authored px mean "px at the reference height" and the HUD holds the same screen fraction on every monitor; the UI script's `window.innerWidth`/`window.innerHeight` mirror reports the same reference space (`innerHeight` reads exactly `referenceHeight`). Use the height the UI was designed on: 1080 for most, 2160 for a HUD laid out on a 4K screen, 180 for a 320 × 180 pixel-art HUD. Game HUD only: god-mode chrome is engine-owned and never scales. Set via `ctx.world.engine.ui.referenceHeight = 1080`. Applies live: no reload.
  }
  graphics?: {   // Rendering configuration
    perfectPixelArt?: boolean | number   // true draws a place seen through an orthographic camera, 2D or 3D, on its pixel art's own grid, read from its sprites and tiles; a number sets texels per world unit. Default false. A pixel look over any picture is the look's `pixelate`
    antialias?: boolean   // Antialiasing. Smoothing is the player's own choice (`off`, or `msaa` at 4 samples); a world cannot turn it on. `false` forces raw pixels: one scene sample, no multisampling, even when the player chose `msaa`. It never holds the picture's size: in 3D the quality governor may render fewer pixels and upscale; a 2D scene never does. Applies live on patch.
  }
  playerSettings?: {   // Creator policy over PLAYER settings: accessibility protections a game pre-enables for players who never chose, and which player control overrides are legal. A player's own explicit choice always wins within these bounds. Sound, Savi-verbosity and graphics quality have NO surface here by design: the game's mix is authored in spec audio objects, how chatty Savi is belongs to the player, and a game never sets or caps a player's quality level: each player's device is measured and the player chooses their own. Set each key at its dot (`ctx.world.engine.playerSettings.<path> = …`); `null` clears it. Illegal fields are refused with a warn naming why (e.g. accessibility may only be pre-enabled, never disabled: no creator can force flashing on a photosensitive player).
    defaults?: {   // Starting values for settings the player never set explicitly: a player's explicit choice always beats these.
      accessibility?: { reduceFlashing?: boolean; reduceMotion?: boolean }   // Safe direction only: `true` pre-enables a protection for this game; `false` is refused (players own accessibility).
    }
    caps?: {   // Hard bounds: legal only for controls. Accessibility and graphics quality can never be capped.
      controls?: { lookSensitivity?: boolean; invertY?: boolean; fov?: boolean }   // Which player control overrides are legal in this game (default: all overridable). Creator control VALUES live in spec.camera / spec.inputs.
    }
  }
  simulation?: { tickRateHz?: number }   // The WORLD layer of the simulation tick base, `simulation.tickRateHz` (Hz): the default place's `tickBase` shadows it, and the room steps every place at that one rate; unset, the era default. The same chain `ctx.place.tickBase` names as the layer beneath it.
  behaviors?: ScriptRef[]   // Engine behavior scripts, lifecycle hooks as named exports: onArrive(ctx, player) / onLeave(ctx, player) fire for every player arrival and departure at the WORLD's door (join, rejoin, a link in from another world: one hook each way; `player.arrival.kind` says which; see platform-systems) (a hop between places of one world runs the place's policy.onArrive / onLeave instead), plus onPlaceStart / onPlaceShutdown. Same composition pattern as entity behaviors.
  crons?: { schedule: string; script: ScriptRef }[]   // Cron jobs: scheduled scripts. Each script exports `async function cron(objectApi)`.
}
````


### After clicking "GameUIDef"

A game's UI: a place's or the world's

GameUIDef = UIDef & { startScreen?: boolean // The UI is the game's start screen (a title card, a menu, a wake in the dark): the first picture is the UI's first frame, never the world before it }

#### Block 1

````text
GameUIDef = UIDef & {
  startScreen?: boolean   // The UI is the game's start screen (a title card, a menu, a wake in the dark): the first picture is the UI's first frame, never the world before it
}
````


### After clicking "LeaderboardDef"

A board on Jayzee's game page: world.config.yaml leaderboards.<id>. Jayzee ranks the number each signed-in player of the live game keeps in player.state[state], read from their save; the world's builders and the editing copy never feed it. Every number ranks, 0 included; a row with no number…

leaderboards.<id>

player.state[state]

LeaderboardDef = { name: string // The board's name players see: 1 to 40 characters state: string // The player.state row Jayzee ranks: each player's own number direction?: "asc" | "desc" // "asc" ranks the lowest first (a lap time); highest first by default format?: "number" | "time" // "time" reads the number as seconds, 1:02.34; a plain number by default }

#### Block 1

````text
leaderboards.<id>
````

#### Block 2

````text
player.state[state]
````

#### Block 3

````text
LeaderboardDef = {
  name: string   // The board's name players see: 1 to 40 characters
  state: string   // The player.state row Spawn ranks: each player's own number
  direction?: "asc" | "desc"   // "asc" ranks the lowest first (a lap time); highest first by default
  format?: "number" | "time"   // "time" reads the number as seconds, 1:02.34; a plain number by default
}
````


### After clicking "AchievementDef"

An achievement: world.config.yaml achievements.<milestone name>. Jayzee lists it on the game's page with the share of players who hold it; ctx.emit("milestone", { name }) with that name unlocks it for the player in a published release that lists it, the maker too; the editing copy never unlocks…

achievements.<milestone name>

ctx.emit("milestone", { name })

AchievementDef = { name: string // The name players see: 1 to 40 characters description: string // The whole feat: 1 to 100 characters hidden?: boolean // The name, description and trophy show only to players who hold it trophy?: string // Its trophy file, "trophies/<name>.json" (TrophyFile); none shows Jayzee's plain star }

#### Block 1

````text
achievements.<milestone name>
````

#### Block 2

````text
ctx.emit("milestone", { name })
````

#### Block 3

````text
AchievementDef = {
  name: string   // The name players see: 1 to 40 characters
  description: string   // The whole feat: 1 to 100 characters
  hidden?: boolean   // The name, description and trophy show only to players who hold it
  trophy?: string   // Its trophy file, "trophies/<name>.json" (TrophyFile); none shows Spawn's plain star
}
````


### After clicking "BuyableDef"

Buyable definition for in-game purchases. A buyable is repeatable unless once.

BuyableDef = { name: string // Display name shown in purchase UI description?: string // Optional longer description imageUrl?: string // Optional image URL shown in purchase UI priceSpoins: number // Price in Spoins; with `minSpoins`, the amount the checkout opens at minSpoins?: number // Pay what you want: the smallest amount the player may choose in Jayzee's checkout (1 to `priceSpoins`); the amount the player chooses is the one charged, and `ctx.purchase.priceSpoins` reads it onPurchase?: ScriptRef | ScriptRef[] // Optional script ref(s) exporting `onPurchase(ctx, buyer)`, ctx first like every other hook: `ctx` is the ObjectAPI bound to the buyer's entity and `ctx.purchase` carries the purchase record ({ buyableId, transactionId, priceSpoins, … }); `buyer` is the purchasing player. The pre-6.0 `onPurchase(ctx, api)` shape (the record first) is not honored: the up-converter re-spells it and names the record's reads in its residue. If omitted, purchase is donation-only (no gameplay mutation). once?: boolean // One per account: a second purchase by an account that already holds this buyable is refused at the price sheet ("you already own this"). What an account holds is the platform's record: `player.state.purchases[buyableId]` → `{ transactionId, at }` on every client, written by no client. Omitted = repeatable (a consumable, a tip). }

#### Block 1

````text
BuyableDef = {
  name: string   // Display name shown in purchase UI
  description?: string   // Optional longer description
  imageUrl?: string   // Optional image URL shown in purchase UI
  priceSpoins: number   // Price in Spoins; with `minSpoins`, the amount the checkout opens at
  minSpoins?: number   // Pay what you want: the smallest amount the player may choose in Spawn's checkout (1 to `priceSpoins`); the amount the player chooses is the one charged, and `ctx.purchase.priceSpoins` reads it
  onPurchase?: ScriptRef | ScriptRef[]   // Optional script ref(s) exporting `onPurchase(ctx, buyer)`, ctx first like every other hook: `ctx` is the ObjectAPI bound to the buyer's entity and `ctx.purchase` carries the purchase record ({ buyableId, transactionId, priceSpoins, … }); `buyer` is the purchasing player. The pre-6.0 `onPurchase(ctx, api)` shape (the record first) is not honored: the up-converter re-spells it and names the record's reads in its residue. If omitted, purchase is donation-only (no gameplay mutation).
  once?: boolean   // One per account: a second purchase by an account that already holds this buyable is refused at the price sheet ("you already own this"). What an account holds is the platform's record: `player.state.purchases[buyableId]` → `{ transactionId, at }` on every client, written by no client. Omitted = repeatable (a consumable, a tip).
}
````


### After clicking "MusicAPI"

The engine-owned music namespace (api.music.; bare music. in run_script). Verbs write one shared intent state on the world: they never touch the game spec, and every client (present or joining later) derives the same playback from it.

api.music.

; bare music.

MusicAPI = { play(ref: string, opts?: MusicPlayOptions): void // Play a clip on the global jukebox (same clip refs as playSound: "cdn/music-….mp3" generates on demand). Empty layer → starts (fade fades in, default instant). Different clip → crossfades over fade seconds (default 0.8). SAME clip → no restart; a volume change ramps the live track in place: calling play(sameClip) every tick is safe and does nothing. Loops by default; { loop: false } plays once. { layer: "drums" } runs a parallel stem. Everyone hears it, including players who join later (mid-track, at position). crossfade(ref: string, ms?: number): void // Sugar for play(ref, { fade }) on the default layer: the positional number is MILLISECONDS (its name carries the unit; `play(ref, { fade })` is the seconds form). stop(opts?: { fade?: number; layer?: string }): void // Fade the music out over `fade` seconds (default 0.8) and clear it. { layer: "drums" } stops one stem; omitted, stops every layer. duck(gain: number, opts?: { duration?: number }): void // Dip ALL music to `gain` (0..1) for `duration` seconds, then restore: the voice-over-music relationship as one call (fixed 0.2s attack / 0.3s release). Example: music.duck(0.25, { duration: 2 }) while a DJ line or announcer plays. Re-calling before release re-anchors the dip. now(): MusicNowInfo | null // What is playing right now, works on every machine, no callbacks: { ref, positionMs, since, layers } or null when silent. positionMs is tick-derived (all machines agree) and wraps at the clip length once known. }

#### Block 1

````text
api.music.
````

#### Block 2

````text
MusicAPI = {
  play(ref: string, opts?: MusicPlayOptions): void   // Play a clip on the global jukebox (same clip refs as playSound: "cdn/music-….mp3" generates on demand). Empty layer → starts (fade fades in, default instant). Different clip → crossfades over fade seconds (default 0.8). SAME clip → no restart; a volume change ramps the live track in place: calling play(sameClip) every tick is safe and does nothing. Loops by default; { loop: false } plays once. { layer: "drums" } runs a parallel stem. Everyone hears it, including players who join later (mid-track, at position).
  crossfade(ref: string, ms?: number): void   // Sugar for play(ref, { fade }) on the default layer: the positional number is MILLISECONDS (its name carries the unit; `play(ref, { fade })` is the seconds form).
  stop(opts?: { fade?: number; layer?: string }): void   // Fade the music out over `fade` seconds (default 0.8) and clear it. { layer: "drums" } stops one stem; omitted, stops every layer.
  duck(gain: number, opts?: { duration?: number }): void   // Dip ALL music to `gain` (0..1) for `duration` seconds, then restore: the voice-over-music relationship as one call (fixed 0.2s attack / 0.3s release). Example: music.duck(0.25, { duration: 2 }) while a DJ line or announcer plays. Re-calling before release re-anchors the dip.
  now(): MusicNowInfo | null   // What is playing right now, works on every machine, no callbacks: { ref, positionMs, since, layers } or null when silent. positionMs is tick-derived (all machines agree) and wraps at the clip length once known.
}
````


### After clicking "MusicPlayOptions"

Options for music.play. No start offset or seek: a seekable song is an audio: row (audio skill).

music.play

MusicPlayOptions = { fade?: number // Transition time in SECONDS. Defaults: 0.8 when replacing a playing clip (crossfade / in-place ramp), 0 (with a ~20ms declick ramp) when the layer is empty. loop?: boolean // Loop until told otherwise (default true: the jukebox model). With loop:false the clip plays once and the layer falls silent at its natural end. layer?: string // Named stem lane (e.g. "drums") playing in parallel with the default layer, sample-synced by shared tick anchors. Omit for the main jukebox. volume?: number // Per-play gain, a GainNode's (default 1; above 1 is louder). Composes multiplicatively with the user's Music volume: it can never bypass the bus. }

#### Block 1

````text
music.play
````

#### Block 2

````text
MusicPlayOptions = {
  fade?: number   // Transition time in SECONDS. Defaults: 0.8 when replacing a playing clip (crossfade / in-place ramp), 0 (with a ~20ms declick ramp) when the layer is empty.
  loop?: boolean   // Loop until told otherwise (default true: the jukebox model). With loop:false the clip plays once and the layer falls silent at its natural end.
  layer?: string   // Named stem lane (e.g. "drums") playing in parallel with the default layer, sample-synced by shared tick anchors. Omit for the main jukebox.
  volume?: number   // Per-play gain, a GainNode's (default 1; above 1 is louder). Composes multiplicatively with the user's Music volume: it can never bypass the bus.
}
````


### After clicking "RaycastOptions"

Options for raycast(ctx, origin, direction, opts): import { raycast } from "builtin/physics". Default behavior excludes the caller's rig (ignoreSelf: true): the caller, every part attached under it, and the moving thing it is a part of. A player's body or a character is no part of what it…

import { raycast } from "builtin/physics"

ignoreSelf: true

RaycastOptions = { distance?: number // meters; default 200 radius?: number // sweep a ball of this radius (a spring arm: 0.25); centered on the origin: cast from body center, not feet shape?: { sphere: number } | { capsule: { radius: number; height: number } } | { box: { halfExtents: Vec3 } } // sweep a capsule or a box instead; centered on the origin. A capsule's height is its straight part between the two cap centres (three.js CapsuleGeometry's length), so a body's physics.capsule { height: H, radius: r } sweeps as { radius: r, height: H - 2 * r }. A box stays on the world axes; halfExtents as in bounds.obb ignoreEntities?: string[] // ids to skip, each with its parts (self and its rig are skipped by default: a car's ray never meets its own wheels) tags?: string[] // must have ALL anyTags?: string[] // must have ANY excludeTags?: string[] // must have NONE bodies?: "static" | "dynamic" | "all" // "static": walls, terrain, the ground; "dynamic": the moving things; "all" (default) minSize?: number // metres; only bodies at least this wide on two of their three sides are hit: a wall (thin one way) counts, a coin, a post, a branch (thin two ways) pass; a spring arm's 1; default 0 = everything ignoreSelf?: boolean // default true includeSensors?: boolean // true = plain trigger volumes are hit too; default false: a plain trigger is passed (an NPC hurtbox is always hit), and a door the ray cannot go through stops it with door.verdict physicsOnly?: boolean // true = physics colliders only; the ray passes every sprite, decal and drawn thing that has no body (a wheel's suspension ray never meets the car's own skid marks); default false: colliders and visible sprite quads visuals?: boolean // true = the ray also meets a DRAWN thing that has no body (a placed model, a primitive, a mesh with `physics` omitted or "none") at its box (`approximate: true`): the pick's word (click-to-select, "what am I looking at"). Default false: a gameplay cast (a shot, a hitscan, a grapple) passes bodiless decor and its own muzzle flash: what has no body is not a wall; give a prop a body when a shot must stop at it place?: string // this place by default verdict?: boolean // true answers { hit, hits, verdict }: a probe that can tell "clear" from "could not look" through?: number // open doors the ray may continue through (default 1; 0 stops at the glass) hits?: "colliders" | "geometry" | "both" // "colliders" (default): bodies. "geometry": the drawn triangles of any thing, body or none, as posed: exact, but a press meets a model still loading at its box, `approximate`; a `radius` or `shape` sweeps against them, distance the centre's travel. "both": both lanes, nearest first }

#### Block 1

````text
import { raycast } from "builtin/physics"
````

#### Block 2

````text
ignoreSelf: true
````

#### Block 3

````text
RaycastOptions = {
  distance?: number   // meters; default 200
  radius?: number   // sweep a ball of this radius (a spring arm: 0.25); centered on the origin: cast from body center, not feet
  shape?: { sphere: number } | { capsule: { radius: number; height: number } } | { box: { halfExtents: Vec3 } }   // sweep a capsule or a box instead; centered on the origin. A capsule's height is its straight part between the two cap centres (three.js CapsuleGeometry's length), so a body's physics.capsule { height: H, radius: r } sweeps as { radius: r, height: H - 2 * r }. A box stays on the world axes; halfExtents as in bounds.obb
  ignoreEntities?: string[]   // ids to skip, each with its parts (self and its rig are skipped by default: a car's ray never meets its own wheels)
  tags?: string[]   // must have ALL
  anyTags?: string[]   // must have ANY
  excludeTags?: string[]   // must have NONE
  bodies?: "static" | "dynamic" | "all"   // "static": walls, terrain, the ground; "dynamic": the moving things; "all" (default)
  minSize?: number   // metres; only bodies at least this wide on two of their three sides are hit: a wall (thin one way) counts, a coin, a post, a branch (thin two ways) pass; a spring arm's 1; default 0 = everything
  ignoreSelf?: boolean   // default true
  includeSensors?: boolean   // true = plain trigger volumes are hit too; default false: a plain trigger is passed (an NPC hurtbox is always hit), and a door the ray cannot go through stops it with door.verdict
  physicsOnly?: boolean   // true = physics colliders only; the ray passes every sprite, decal and drawn thing that has no body (a wheel's suspension ray never meets the car's own skid marks); default false: colliders and visible sprite quads
  visuals?: boolean   // true = the ray also meets a DRAWN thing that has no body (a placed model, a primitive, a mesh with `physics` omitted or "none") at its box (`approximate: true`): the pick's word (click-to-select, "what am I looking at"). Default false: a gameplay cast (a shot, a hitscan, a grapple) passes bodiless decor and its own muzzle flash: what has no body is not a wall; give a prop a body when a shot must stop at it
  place?: string   // this place by default
  verdict?: boolean   // true answers { hit, hits, verdict }: a probe that can tell "clear" from "could not look"
  through?: number   // open doors the ray may continue through (default 1; 0 stops at the glass)
  hits?: "colliders" | "geometry" | "both"   // "colliders" (default): bodies. "geometry": the drawn triangles of any thing, body or none, as posed: exact, but a press meets a model still loading at its box, `approximate`; a `radius` or `shape` sweeps against them, distance the centre's travel. "both": both lanes, nearest first
}
````


### After clicking "RaycastHit"

Raycast hit information

RaycastHit = { position: Vec3 // in the caller's frame: beyond a door, mapped back through the pair (do your math here) normal: Vec3 // the surface normal at the hit, out of the surface it hit, as onCollide's contact.normal points: y > 0 on the ground; in the caller's frame: a far wall's normal turned back by the pair's rotation distance: number // continuous through a door's glass id: string | null // on the ground: the ground's own id (terrain/…), never one of your objects; beyond a door: that world's spelling objectId: string | null // deprecated: the same id, older spelling world?: string // only on a hit beyond a door address?: string // a far hit's address: hand it to emit(…, { to }) or cross durableId?: string | null // a far hit's identity, fully qualified doors?: ReadonlyArray<{ id: string; link: string; world: string; exit: string | null }> // the doors passed to reach a far hit, nearest first far?: { position: Vec3; normal: Vec3 } // only beyond a door: the same hit in the far world's own frame: the point a far script reads (emit(…, { to: hit.address })) door?: { link: string; verdict: "through-spent" | "unheld" | "no-exit"; message: string } // the ray stopped at a door: verdict "through-spent" | "unheld" | "no-exit" approximate?: true // the hit is a bounds approximation, not the mesh: a visible thing with no body is picked at its bounds, and a mesh collider uses bounds when its mesh is unavailable, cooking, or degenerate; absent on a hit on the collider's own shape or a sprite. A CDN model's mesh collider is its surface at the 2 cm contact grain, not its drawn triangles: `hits: "geometry"` meets those faceIndex?: number // on a drawn-triangle hit (hits: "geometry" or "both"): the triangle's index in the thing's one list of faces (a model's meshes in order), the same triangle at rest or posed; absent on a collider, sprite or bounds hit bone?: { name: string; position: Vec3; normal: Vec3 } // on a drawn-triangle hit (hits: "geometry" or "both") on a rigged thing: the bone the skin at the hit rides most (`name`), and the hit's `position` and `normal` in that bone's frame, the frame `attachment: { bone: name }` places a child in; absent on a collider, sprite or bounds hit and on a thing with no rig }

#### Block 1

````text
RaycastHit = {
  position: Vec3   // in the caller's frame: beyond a door, mapped back through the pair (do your math here)
  normal: Vec3   // the surface normal at the hit, out of the surface it hit, as onCollide's contact.normal points: y > 0 on the ground; in the caller's frame: a far wall's normal turned back by the pair's rotation
  distance: number   // continuous through a door's glass
  id: string | null   // on the ground: the ground's own id (terrain/…), never one of your objects; beyond a door: that world's spelling
  objectId: string | null   // deprecated: the same id, older spelling
  world?: string   // only on a hit beyond a door
  address?: string   // a far hit's address: hand it to emit(…, { to }) or cross
  durableId?: string | null   // a far hit's identity, fully qualified
  doors?: ReadonlyArray<{ id: string; link: string; world: string; exit: string | null }>   // the doors passed to reach a far hit, nearest first
  far?: { position: Vec3; normal: Vec3 }   // only beyond a door: the same hit in the far world's own frame: the point a far script reads (emit(…, { to: hit.address }))
  door?: { link: string; verdict: "through-spent" | "unheld" | "no-exit"; message: string }   // the ray stopped at a door: verdict "through-spent" | "unheld" | "no-exit"
  approximate?: true   // the hit is a bounds approximation, not the mesh: a visible thing with no body is picked at its bounds, and a mesh collider uses bounds when its mesh is unavailable, cooking, or degenerate; absent on a hit on the collider's own shape or a sprite. A CDN model's mesh collider is its surface at the 2 cm contact grain, not its drawn triangles: `hits: "geometry"` meets those
  faceIndex?: number   // on a drawn-triangle hit (hits: "geometry" or "both"): the triangle's index in the thing's one list of faces (a model's meshes in order), the same triangle at rest or posed; absent on a collider, sprite or bounds hit
  bone?: { name: string; position: Vec3; normal: Vec3 }   // on a drawn-triangle hit (hits: "geometry" or "both") on a rigged thing: the bone the skin at the hit rides most (`name`), and the hit's `position` and `normal` in that bone's frame, the frame `attachment: { bone: name }` places a child in; absent on a collider, sprite or bounds hit and on a thing with no rig
}
````


### After clicking "ObjectQueryOptions"

Query options for api.query()

ObjectQueryOptions = { radius?: number // meters from center to each row's feetPosition center?: Vec3 // this object by default tags?: string[] // must have ALL anyTags?: string[] // must have ANY excludeTags?: string[] // must have NONE ignoreSelf?: boolean // default true place?: string // this place by default select?: "objects" | "ids" // "ids" answers bare ids (the bulk fast path) objectId?: string // only the object carrying this fully-qualified id }

#### Block 1

````text
ObjectQueryOptions = {
  radius?: number   // meters from center to each row's feetPosition
  center?: Vec3   // this object by default
  tags?: string[]   // must have ALL
  anyTags?: string[]   // must have ANY
  excludeTags?: string[]   // must have NONE
  ignoreSelf?: boolean   // default true
  place?: string   // this place by default
  select?: "objects" | "ids"   // "ids" answers bare ids (the bulk fast path)
  objectId?: string   // only the object carrying this fully-qualified id
}
````


### After clicking "JointOptions"

Options for creating a physics joint between two objects.

JointOptions = { anchor?: Vec3 // Anchor on THIS body: metres in its own frame, from its feet (default: [0,0,0]) targetAnchor?: Vec3 // Anchor on the other body (`to`): metres in its own frame, from its feet (default: [0,0,0]) bone?: string // While this body is a ragdoll, the bone of its rig this end holds, by name as `bones` reads it ("head"); absent, the hips. Its anchor is then metres from that bone in this body's own frame, not the bone's. targetBone?: string // The bone of `to`'s rig the other end holds while `to` is a ragdoll, as `bone`. axis?: Vec3 // Axis for revolute/prismatic joints (default: [0,1,0] = Y axis); on a spherical joint, the limb's line through the joint in this body's frame (a shoulder's arm line), the line twist turns about limits?: [number, number] | { min: number; max: number; stiffness?: number; damping?: number } | { cone?: number; twist?: [number, number]; stiffness?: number; damping?: number } // Min/max limits: revolute, radians `to` turns against this body about axis, 0 where the two frames agree (this body's own turn stops at -max); prismatic, metres along axis; spring, metres between the anchors; { min, max, stiffness, damping } is the same window. A spherical joint takes { cone, twist }, both measured from the pose the two bodies stand in when the form is set (at the mint for a joint made with it): cone the half-angle in radians `to` swings off that pose, twist [min, max] radians it turns about its line (a ragdoll shoulder: { cone: 1.2, twist: [-0.8, 0.8] }); a half left out stays free. On every joint, stiffness (N·m per radian past the stop, N per metre on a prismatic or spring joint) and damping (N·m·s per radian or N·s per metre, left out: critical) make the stops a spring that pushes back harder the further past motor?: { velocity: number; maxForce: number } // Motor config (revolute/prismatic only) target?: number | { x: number; y: number; z: number; w: number } // The pose the joint's drive pulls to, measured as `limits` are: revolute, radians; prismatic, metres along axis; spherical, a rotation `{ x, y, z, w }` (a THREE.Quaternion works) from the pose the two bodies stand in when the first target is set. Spring and fixed joints take none. strength?: number // 0..1: how firmly the joint pulls to its target (0 or absent: no drive). It eases there like a critically damped spring, with no overshoot; 1 holds firm. A driven joint keeps its bodies awake while its target moves, and they cost what any moving body costs, every tick; a still target lets them sleep. restLength?: number // Spring rest length in meters (spring joints only, default: 0) stiffness?: number // Spring stiffness in N/m (spring joints only). Unset, 0: the spring pulls nothing and its damping is unread, so only its limits hold the two bodies (a rope). damping?: number // Spring damping in N·s/m (spring joints only), read only while stiffness is above 0. Unset, 0. contactsEnabled?: boolean // Enable collisions between joined bodies (default: false: joined bodies don't collide) breakForce?: number // Break when peak joint reaction force exceeds this many newtons. 0 breaks under any load; unset (or Infinity) never breaks. breakTorque?: number // Break when peak joint reaction torque exceeds this many newton-metres. 0 breaks under any load; unset (or Infinity) never breaks. }

#### Block 1

````text
JointOptions = {
  anchor?: Vec3   // Anchor on THIS body: metres in its own frame, from its feet (default: [0,0,0])
  targetAnchor?: Vec3   // Anchor on the other body (`to`): metres in its own frame, from its feet (default: [0,0,0])
  bone?: string   // While this body is a ragdoll, the bone of its rig this end holds, by name as `bones` reads it ("head"); absent, the hips. Its anchor is then metres from that bone in this body's own frame, not the bone's.
  targetBone?: string   // The bone of `to`'s rig the other end holds while `to` is a ragdoll, as `bone`.
  axis?: Vec3   // Axis for revolute/prismatic joints (default: [0,1,0] = Y axis); on a spherical joint, the limb's line through the joint in this body's frame (a shoulder's arm line), the line twist turns about
  limits?: [number, number] | { min: number; max: number; stiffness?: number; damping?: number } | { cone?: number; twist?: [number, number]; stiffness?: number; damping?: number }   // Min/max limits: revolute, radians `to` turns against this body about axis, 0 where the two frames agree (this body's own turn stops at -max); prismatic, metres along axis; spring, metres between the anchors; { min, max, stiffness, damping } is the same window. A spherical joint takes { cone, twist }, both measured from the pose the two bodies stand in when the form is set (at the mint for a joint made with it): cone the half-angle in radians `to` swings off that pose, twist [min, max] radians it turns about its line (a ragdoll shoulder: { cone: 1.2, twist: [-0.8, 0.8] }); a half left out stays free. On every joint, stiffness (N·m per radian past the stop, N per metre on a prismatic or spring joint) and damping (N·m·s per radian or N·s per metre, left out: critical) make the stops a spring that pushes back harder the further past
  motor?: { velocity: number; maxForce: number }   // Motor config (revolute/prismatic only)
  target?: number | { x: number; y: number; z: number; w: number }   // The pose the joint's drive pulls to, measured as `limits` are: revolute, radians; prismatic, metres along axis; spherical, a rotation `{ x, y, z, w }` (a THREE.Quaternion works) from the pose the two bodies stand in when the first target is set. Spring and fixed joints take none.
  strength?: number   // 0..1: how firmly the joint pulls to its target (0 or absent: no drive). It eases there like a critically damped spring, with no overshoot; 1 holds firm. A driven joint keeps its bodies awake while its target moves, and they cost what any moving body costs, every tick; a still target lets them sleep.
  restLength?: number   // Spring rest length in meters (spring joints only, default: 0)
  stiffness?: number   // Spring stiffness in N/m (spring joints only). Unset, 0: the spring pulls nothing and its damping is unread, so only its limits hold the two bodies (a rope).
  damping?: number   // Spring damping in N·s/m (spring joints only), read only while stiffness is above 0. Unset, 0.
  contactsEnabled?: boolean   // Enable collisions between joined bodies (default: false: joined bodies don't collide)
  breakForce?: number   // Break when peak joint reaction force exceeds this many newtons. 0 breaks under any load; unset (or Infinity) never breaks.
  breakTorque?: number   // Break when peak joint reaction torque exceeds this many newton-metres. 0 breaks under any load; unset (or Infinity) never breaks.
}
````


### After clicking "RagdollOptions"

Options for ctx.self.ragdoll = { … }; = null releases it.

RagdollOptions = { impulse?: Vec3 | [number, number, number] // World-space impulse (N·s) at activation, on the body as a whole: { x: 0, y: 80, z: -160 } launches up and back. A hit on one part is `ctx.emit("impulse", { target, impulse, position })` at the hit point instead, in the same tick or later: the bone there takes it, and its joints carry it. settleFreeze?: boolean // Convert the settled ragdoll to static after `settleSeconds` of stillness (default: true: keeps corpses cheap and standable). settleSeconds?: number // Stillness window before the freeze, seconds (default: 3). blendSeconds?: number // The release's cross-fade back to animation, seconds (default: 0.25). }

#### Block 1

````text
RagdollOptions = {
  impulse?: Vec3 | [number, number, number]   // World-space impulse (N·s) at activation, on the body as a whole: { x: 0, y: 80, z: -160 } launches up and back. A hit on one part is `ctx.emit("impulse", { target, impulse, position })` at the hit point instead, in the same tick or later: the bone there takes it, and its joints carry it.
  settleFreeze?: boolean   // Convert the settled ragdoll to static after `settleSeconds` of stillness (default: true: keeps corpses cheap and standable).
  settleSeconds?: number   // Stillness window before the freeze, seconds (default: 3).
  blendSeconds?: number   // The release's cross-fade back to animation, seconds (default: 0.25).
}
````


### After clicking "NotifyDmOptions"

The notifyDm bag. wake asks Cleetus for a turn. to sends the line to one player of this world instead of Cleetus's chat: a player row, a hook's player or their userId ("pa_…"); it lands in their Jayzee bell and on their phone, and wake beside it is ignored. link is where the line opens…

NotifyDmOptions = { wake?: boolean to?: string | { userId?: string | null } link?: string cleetus?: string | { userId?: string | null } }

#### Block 1

````text
NotifyDmOptions = {
  wake?: boolean
  to?: string | { userId?: string | null }
  link?: string
  savi?: string | { userId?: string | null }
}
````


### After clicking "ActPayloads"

The built-in acts: ctx.emit(<name>, payload, { audience? }): rendered on every client that hears it; your own event names reach on(). Positions are world meters, durations seconds (a haptic rumble's times are ms, as the Gamepad API's), colors a Color; an act that answers a handle answers it from…

ctx.emit(<name>, payload, { audience? })

ActPayloads = { damageNumber: { // a number `value` or any string `text` ("MISS", "+4 tomatoes"): one is enough; red below 0; `lifetime` the seconds it stays position: Vec3 value?: number text?: string color?: Color crit?: boolean size?: number = 1 lifetime?: number = 1.5 } playSound: { // answers the sound's handle: emit("stopSound", { soundId }) ends it, loops included; with `position` it is heard from that spot at `volume` out to refDistance (default a sixth of maxDistance, at least 4 m and at most half of it), falling to silence at maxDistance (the audible reach in meters); without one it is the acting player's own; mode "restart" replaces this object's still-playing copy of that clip instead of stacking clip: string position?: Vec3 volume?: number = 1 pitch?: number = 1 loop?: boolean mode?: "overlap" | "restart" bus?: string priority?: number maxDistance?: number refDistance?: number follow?: boolean onPlaying?: string | ((ctx: ObjectAPI, sound: { soundId: string; clip: string; durationSeconds?: number }) => unknown) // an export of this script, run once as (ctx, sound) when the sound's first sample plays; durationSeconds is absent while the clip's length is unknown } stopSound: { soundId: string } preload: { refs: string[] } // warms each sound, texture or model before its first use on the machines that hear it (the acting player's by default), so a game loads ahead of a moment it sees coming: emit it when those assets become likely; only machines in the room when it is sent hear it, so a room with no player in it warms no player, and one that joins later is not warmed; fire-and-forget, nothing shown, the world unchanged fx: { // an effect script you wrote (scripts/effects/*.fx.js) spawned as an OBJECT at a point, answers its id (tagged "fx"): patch it through getObject(id).fx.params.heat = 0.2 (the effect re-runs), end a loop with destroy(id) (a finished one-shot removes itself); params / seed feed the effect export; attachTo: <id> parents it to that object: it appears at `position`, rides the target's transform and dies with it (the impact pattern: a burn on whatever the projectile hit) position: Vec3 script: string params?: Record<string, unknown> seed?: number tags?: string[] attachTo?: string } decal: { // a lasting mark projected onto the surface at the hit (a raycast's hit.position / hit.normal, onCollide's contact.position / contact.normal); size meters ([start, end] ramps over the lifetime); rotation DEGREES (omit: random); lifetime seconds (Infinity: it never fades); fade the seconds at the end of the lifetime over which the mark fades (2 when omitted, at most the lifetime); attachTo: the object the mark rides; the mark ends when that object is destroyed position: Vec3 normal: Vec3 texture: string size?: number | [number, number] | [number | [number, number], number | [number, number]] = 0.5 rotation?: number | [number, number] lifetime?: number = 30 fade?: number color?: Color opacity?: number | [number, number] = 1 attachTo?: string } slash: { // a sweep-revealed arc at the ATTACKER's position; size METERS end-to-end, required (a sword ~2–3, a boss cleave 5+); default orientation horizontal at the caller's yaw, rotation in degrees; bands body / edge / fade 0..1; attachTo: <id> the slash rides that object: position, rotation and velocity are read in the world at the emit, then it moves and turns with the object and ends with it (a spin attack's ring that stays on the moving player) position: Vec3 size?: number shape?: "tightUniform" | "broadUniform" | "tightWidening" | "broadWidening" | "crescent" | "longCrescent" | "circle" noise?: "none" | "forward" | "backward" | "stableDissolve" glow?: "none" | "light" | "medium" | "intense" | "max" timing?: "quick" | "standard" | "slow" | "verySlow" body?: number edge?: number fade?: number edgeColor?: Color edgeAlpha?: number bodyColor1?: Color bodyColor1Alpha?: number bodyColor2?: Color bodyColor2Alpha?: number bodyColor3?: Color bodyColor3Alpha?: number outwardGlow?: number outwardGlowWidth?: number outwardGlowSpeed?: number rotation?: { yaw?: number; pitch?: number; roll?: number } velocity?: { x?: number; y?: number; z?: number } scaleVelocity?: number rotationVelocity?: { yaw?: number; pitch?: number; roll?: number } attachTo?: string } shockwave: { // an expanding ring of distortion that also lays the ground cover flat as it passes (the ring reaches scale / 2 m from position, from the ground up); speed (negative implodes), thickness / edgeFade 0..1, intensity 0 or more, scale in world units; easing "easeOut" for impacts position: Vec3 speed?: number = 0.5 thickness?: number = 0.5 intensity?: number = 0.5 edgeFade?: number = 0.5 scale?: number = 1 easing?: "linear" | "easeOut" | "easeIn" = "linear" } screenShake: { intensity: number; duration?: number = 0.2; haptic?: boolean = true } // the view shakes for each player who hears it, and that player's connected controller rumbles once with it (a phone in the Jayzee app buzzes); `haptic: false` keeps the shake and drops the buzz screenFlash: { color?: Color; duration?: number = 0.15; intensity?: number = 0.35 } // a brief color wash; a rare beat (a death, a boss entry), never per hit: repeats strobe; intensity is the peak opacity, 0..1 hitstop: { duration: number; haptic?: boolean = true } // freeze the camera for `duration` seconds; the player's connected controller gives one short rumble with it (a phone in the Jayzee app buzzes); `haptic: false` keeps the freeze and drops the buzz cameraPunch: { direction: Vec3; intensity?: number = 0.3 } // a directional camera kick: direction camera-local (x right, y up, z forward), intensity 0..1 (1 = a 12 cm kick); it rises over ~36 ms and settles by 180 ms slowMo: { scale: number; duration: number; easing?: boolean | string; grade?: boolean } // the picture slows to `scale` (0 holds it still, at most 1; a faster world is ctx.place.timeScale) for `duration` seconds under a desaturated grade, then catches up; the game keeps full speed; `grade: false` slows it in its own colours replay: { // this screen replays [from, to] (ms on ctx.now()'s clock; from at most 10 s back, at most 30 s long) as it drew it, through `camera` (a ViewCamera; omitted: its camera then), at `scale` x real speed (0 or more: 2 plays it twice as fast, 0 holds its first frame until the next replay; omitted: 1), then returns to live; while it plays, a REPLAY mark shows in the screen's corner and the game's HUD hides (`cue: false` drops the mark, `hud: true` keeps the HUD) from: number to: number camera?: ViewCameraPose | { parent: string; eye?: Vec3; aim?: Vec3 | "forward" | string; fov?: number; projection?: "perspective" | "orthographic"; orthoSize?: number; layers?: string[] } scale?: number cue?: boolean hud?: boolean } zoomTo: { // the camera moves to look at a point or an object, holds `hold` seconds, returns target: Vec3 | string duration?: number = 0.5 easing?: string = "easeOut" offset?: Vec3 hold?: number } flash: { target: string; color?: Color; duration?: number = 0.1; intensity?: number = 0.9 } // a brief emissive flash on an object: the per-hit feedback; intensity 0..1 (~0.45 on a mesh that fills the screen) shake: { target: string; intensity: number; duration: number } squash: { target: string; axis?: "x" | "y" | "z" = "y"; intensity?: number = 0.3; duration?: number = 0.15 } // intensity 0..1 (out of range clamps): at 1 the axis squashes to 5 % and the other two bulge by half; duration seconds impulse: { target: string; impulse?: Vec3; position?: Vec3; angularImpulse?: Vec3 } // a one-shot physics kick, applied exactly once to the target: `impulse` N·s at the center of mass, `position` moves where it lands (world point: off-center adds the spin), `angularImpulse` N·m·s of pure spin. At least one of impulse/angularImpulse. Dynamic bodies, ragdolls and characters take it; static and kinematic bodies take none. Reach for it when mass should matter or the hit lands off-center; a mass-independent push is `<entity>.velocity = v`. The held sibling is `ctx.self.forces` highlightSet: { // holds until highlightClear, or `duration` seconds; the line hides where its target hides; style "xray" = a faint thin line only where a wall or building hides the target; width = the line's width in pixels (of a 1080p picture) up close, omitted = the style's own: 2 for outline, about 16 for glow and pulse; intensity = the line's glow strength, 0 = none; omitted: 8 glow and pulse, 4 xray, outline its colour; the color's alpha is the line's opacity target: string color?: Color style?: "outline" | "glow" | "pulse" | "xray" = "outline" duration?: number width?: number intensity?: number } highlightClear: { target: string } outlinePage: { color?: Color; duration?: number = 0.45; width?: number = 3; pulses?: number = 1 } // pulse the page border: mode changes, confirmations; duration seconds, width pixels; a border wide enough to count as a flash pulses at most three times a second uiEvent: { name: string; payload?: unknown } // a once-only signal into ui.js (`window.spawn.on("event", (name, payload) => …)`): speech, a sound from ui code, anything "do this now, once"; never saved, never replayed; payload any JSON haptic: { // one buzz on the player's phone in the Jayzee app, and on a connected controller whose motors the browser can drive; screenShake and hitstop buzz the phone and the controller on their own unless they say `haptic: false`, and footsteps, jumps and landings buzz the phone alone. A rumble of your own is the Gamepad API's playEffect, its effect type in `kind`, times in ms; both motors at 0 stops it kind: HapticKind | "dual-rumble" | "trigger-rumble" startDelay?: number duration?: number strongMagnitude?: number weakMagnitude?: number leftTrigger?: number rightTrigger?: number } milestone: { step?: number; name?: string } // how far a player got (a level, a checkpoint, a boss beaten): `step` its order 1, 2, 3 …, `name` your words (at most 40 characters), either is enough; counted once per player, and the game's numbers page draws how far new players get, step by step. A game keeps 100 milestone names: a new name past them is not counted, and getLogs says so stat: { name: string; value?: number; by?: string; vs?: string } // a number for this player (coins picked up, a fall; `value` omitted counts 1): the game's numbers page charts each name's daily total. A negative `value` is spent. `by` splits it by one of your words (where coins came from or went: `{ name: "coins", value: -120, by: "skins" }`), and each player's running total of a stat split by `by` is what they hold. `vs` beside `by` counts a win of `by` over `vs` (a fight's end: `{ name: "wins", by: winner, vs: loser }`), which the page draws as win rates and matchups. `name`, `by` and `vs` are at most 40 characters; a game keeps 100 stat names and 100 parts (each `by`, or `by` and `vs`) a stat: a new name past them is not counted, a new part counts with no split, and getLogs says so voxelMarkSet: { // an outline / fill overlay on one voxel cell (a build cursor, a target), never a terrain edit; omit both for the default outline markId: string voxel: VoxelCoord outline?: VoxelMarkOutlineOptions | null fill?: VoxelMarkFillOptions | null pulse?: VoxelMarkPulseOptions | null duration?: number } voxelMarkClear: { markId: string } partyAdd: { player: string | { readonly id: string } } // asks that player (a row, a hook's player, a ctx.place.players row, or its id) into your Jayzee party, the plate's own ask: they join by their own yes, and you lead it (a party is made when you have none); friends both ways, so a guest (isGuest) neither asks nor is asked; one already in a party is refused. Your own word: emit it where ctx.self is your player partyCancel: { player: string | { readonly id: string } } // takes back the Jayzee party ask your party sent that player (a row, a hook's player, a ctx.place.players row, or its id), the card's own take back: their ask leaves Jayzee and a join after it is refused; one who already said yes stays in the party. The leader's word: emit it where ctx.self is your player partyLeave: {} // you leave your Jayzee party, the card's own leave: a leader's leave hands the lead on, and the last one out ends it. Your own word: emit it where ctx.self is your player; it removes no one else partyJoin: { player: string | { readonly id: string } } // your yes to the Jayzee party ask that player (a row, a hook's player, a ctx.place.players row, or its id) sent you, the ask's own join: you join their party, and a party of yours with others in it is left first. Jayzee still shows its ask. Once per press of the player's: emit it from their onInput, where ctx.self is that player; with no press, or no ask from that player, it joins nothing partyPortal: {} // the party card's portal together: you, its leader, ask your party to where you stand, and each comes by their own press of Jayzee's line. Once per press of the player's: emit it from their onInput, where ctx.self is that player guildAdd: { player: string | { readonly id: string } } // adds that player to your Jayzee guild, the plate's own invite: any member's word; friends both ways guildKick: { player: string | { readonly id: string } } // removes that player from your guild: the leader removes anyone, an officer removes members guildRank: { player: string | { readonly id: string }; rank: "member" | "officer" } // sets that player's rank in your guild, the leader's word: member or officer (the lead is handed on the plate, never by a game) openSettings: { page?: "sound" | "voice" | "look" | "keys" | "screen" | "live" } // opens Jayzee's settings plate, the gear's, once per press of the player's: emit it from their onInput, where ctx.self is that player; with no press it opens nothing. page "keys" opens it at the game's keys (a touch screen has none and opens the first page); another page opens it at that part, where this device draws it openAvatarEditor: {} // opens the player's own avatar editor, Jayzee's, where they change the body they wear in every world: its own door over the game, never a settings page; once per press of the player's: emit it from their onInput, where ctx.self is that player; with no press it opens nothing. A guest is asked to sign in openInvite: {} // opens Jayzee's invite over the game: the player's friends and their own link to here; once per press of the player's: emit it from their onInput, where ctx.self is that player. A guest is asked to sign in. The game never holds the link openShare: {} // opens Jayzee's share of this game over the game: the game's link, in the phone's own share sheet or copied on a computer; once per press of the player's: emit it from their onInput, where ctx.self is that player. The game never holds the link }

#### Block 1

````text
ctx.emit(<name>, payload, { audience? })
````

#### Block 2

````text
ActPayloads = {
  damageNumber: {   // a number `value` or any string `text` ("MISS", "+4 tomatoes"): one is enough; red below 0; `lifetime` the seconds it stays
    position: Vec3
    value?: number
    text?: string
    color?: Color
    crit?: boolean
    size?: number = 1
    lifetime?: number = 1.5
  }
  playSound: {   // answers the sound's handle: emit("stopSound", { soundId }) ends it, loops included; with `position` it is heard from that spot at `volume` out to refDistance (default a sixth of maxDistance, at least 4 m and at most half of it), falling to silence at maxDistance (the audible reach in meters); without one it is the acting player's own; mode "restart" replaces this object's still-playing copy of that clip instead of stacking
    clip: string
    position?: Vec3
    volume?: number = 1
    pitch?: number = 1
    loop?: boolean
    mode?: "overlap" | "restart"
    bus?: string
    priority?: number
    maxDistance?: number
    refDistance?: number
    follow?: boolean
    onPlaying?: string | ((ctx: ObjectAPI, sound: { soundId: string; clip: string; durationSeconds?: number }) => unknown)   // an export of this script, run once as (ctx, sound) when the sound's first sample plays; durationSeconds is absent while the clip's length is unknown
  }
  stopSound: { soundId: string }
  preload: { refs: string[] }   // warms each sound, texture or model before its first use on the machines that hear it (the acting player's by default), so a game loads ahead of a moment it sees coming: emit it when those assets become likely; only machines in the room when it is sent hear it, so a room with no player in it warms no player, and one that joins later is not warmed; fire-and-forget, nothing shown, the world unchanged
  fx: {   // an effect script you wrote (scripts/effects/*.fx.js) spawned as an OBJECT at a point, answers its id (tagged "fx"): patch it through getObject(id).fx.params.heat = 0.2 (the effect re-runs), end a loop with destroy(id) (a finished one-shot removes itself); params / seed feed the effect export; attachTo: <id> parents it to that object: it appears at `position`, rides the target's transform and dies with it (the impact pattern: a burn on whatever the projectile hit)
    position: Vec3
    script: string
    params?: Record<string, unknown>
    seed?: number
    tags?: string[]
    attachTo?: string
  }
  decal: {   // a lasting mark projected onto the surface at the hit (a raycast's hit.position / hit.normal, onCollide's contact.position / contact.normal); size meters ([start, end] ramps over the lifetime); rotation DEGREES (omit: random); lifetime seconds (Infinity: it never fades); fade the seconds at the end of the lifetime over which the mark fades (2 when omitted, at most the lifetime); attachTo: the object the mark rides; the mark ends when that object is destroyed
    position: Vec3
    normal: Vec3
    texture: string
    size?: number | [number, number] | [number | [number, number], number | [number, number]] = 0.5
    rotation?: number | [number, number]
    lifetime?: number = 30
    fade?: number
    color?: Color
    opacity?: number | [number, number] = 1
    attachTo?: string
  }
  slash: {   // a sweep-revealed arc at the ATTACKER's position; size METERS end-to-end, required (a sword ~2–3, a boss cleave 5+); default orientation horizontal at the caller's yaw, rotation in degrees; bands body / edge / fade 0..1; attachTo: <id> the slash rides that object: position, rotation and velocity are read in the world at the emit, then it moves and turns with the object and ends with it (a spin attack's ring that stays on the moving player)
    position: Vec3
    size?: number
    shape?: "tightUniform" | "broadUniform" | "tightWidening" | "broadWidening" | "crescent" | "longCrescent" | "circle"
    noise?: "none" | "forward" | "backward" | "stableDissolve"
    glow?: "none" | "light" | "medium" | "intense" | "max"
    timing?: "quick" | "standard" | "slow" | "verySlow"
    body?: number
    edge?: number
    fade?: number
    edgeColor?: Color
    edgeAlpha?: number
    bodyColor1?: Color
    bodyColor1Alpha?: number
    bodyColor2?: Color
    bodyColor2Alpha?: number
    bodyColor3?: Color
    bodyColor3Alpha?: number
    outwardGlow?: number
    outwardGlowWidth?: number
    outwardGlowSpeed?: number
    rotation?: { yaw?: number; pitch?: number; roll?: number }
    velocity?: { x?: number; y?: number; z?: number }
    scaleVelocity?: number
    rotationVelocity?: { yaw?: number; pitch?: number; roll?: number }
    attachTo?: string
  }
  shockwave: {   // an expanding ring of distortion that also lays the ground cover flat as it passes (the ring reaches scale / 2 m from position, from the ground up); speed (negative implodes), thickness / edgeFade 0..1, intensity 0 or more, scale in world units; easing "easeOut" for impacts
    position: Vec3
    speed?: number = 0.5
    thickness?: number = 0.5
    intensity?: number = 0.5
    edgeFade?: number = 0.5
    scale?: number = 1
    easing?: "linear" | "easeOut" | "easeIn" = "linear"
  }
  screenShake: { intensity: number; duration?: number = 0.2; haptic?: boolean = true }   // the view shakes for each player who hears it, and that player's connected controller rumbles once with it (a phone in the Spawn app buzzes); `haptic: false` keeps the shake and drops the buzz
  screenFlash: { color?: Color; duration?: number = 0.15; intensity?: number = 0.35 }   // a brief color wash; a rare beat (a death, a boss entry), never per hit: repeats strobe; intensity is the peak opacity, 0..1
  hitstop: { duration: number; haptic?: boolean = true }   // freeze the camera for `duration` seconds; the player's connected controller gives one short rumble with it (a phone in the Spawn app buzzes); `haptic: false` keeps the freeze and drops the buzz
  cameraPunch: { direction: Vec3; intensity?: number = 0.3 }   // a directional camera kick: direction camera-local (x right, y up, z forward), intensity 0..1 (1 = a 12 cm kick); it rises over ~36 ms and settles by 180 ms
  slowMo: { scale: number; duration: number; easing?: boolean | string; grade?: boolean }   // the picture slows to `scale` (0 holds it still, at most 1; a faster world is ctx.place.timeScale) for `duration` seconds under a desaturated grade, then catches up; the game keeps full speed; `grade: false` slows it in its own colours
  replay: {   // this screen replays [from, to] (ms on ctx.now()'s clock; from at most 10 s back, at most 30 s long) as it drew it, through `camera` (a ViewCamera; omitted: its camera then), at `scale` x real speed (0 or more: 2 plays it twice as fast, 0 holds its first frame until the next replay; omitted: 1), then returns to live; while it plays, a REPLAY mark shows in the screen's corner and the game's HUD hides (`cue: false` drops the mark, `hud: true` keeps the HUD)
    from: number
    to: number
    camera?: ViewCameraPose | { parent: string; eye?: Vec3; aim?: Vec3 | "forward" | string; fov?: number; projection?: "perspective" | "orthographic"; orthoSize?: number; layers?: string[] }
    scale?: number
    cue?: boolean
    hud?: boolean
  }
  zoomTo: {   // the camera moves to look at a point or an object, holds `hold` seconds, returns
    target: Vec3 | string
    duration?: number = 0.5
    easing?: string = "easeOut"
    offset?: Vec3
    hold?: number
  }
  flash: { target: string; color?: Color; duration?: number = 0.1; intensity?: number = 0.9 }   // a brief emissive flash on an object: the per-hit feedback; intensity 0..1 (~0.45 on a mesh that fills the screen)
  shake: { target: string; intensity: number; duration: number }
  squash: { target: string; axis?: "x" | "y" | "z" = "y"; intensity?: number = 0.3; duration?: number = 0.15 }   // intensity 0..1 (out of range clamps): at 1 the axis squashes to 5 % and the other two bulge by half; duration seconds
  impulse: { target: string; impulse?: Vec3; position?: Vec3; angularImpulse?: Vec3 }   // a one-shot physics kick, applied exactly once to the target: `impulse` N·s at the center of mass, `position` moves where it lands (world point: off-center adds the spin), `angularImpulse` N·m·s of pure spin. At least one of impulse/angularImpulse. Dynamic bodies, ragdolls and characters take it; static and kinematic bodies take none. Reach for it when mass should matter or the hit lands off-center; a mass-independent push is `<entity>.velocity = v`. The held sibling is `ctx.self.forces`
  highlightSet: {   // holds until highlightClear, or `duration` seconds; the line hides where its target hides; style "xray" = a faint thin line only where a wall or building hides the target; width = the line's width in pixels (of a 1080p picture) up close, omitted = the style's own: 2 for outline, about 16 for glow and pulse; intensity = the line's glow strength, 0 = none; omitted: 8 glow and pulse, 4 xray, outline its colour; the color's alpha is the line's opacity
    target: string
    color?: Color
    style?: "outline" | "glow" | "pulse" | "xray" = "outline"
    duration?: number
    width?: number
    intensity?: number
  }
  highlightClear: { target: string }
  outlinePage: { color?: Color; duration?: number = 0.45; width?: number = 3; pulses?: number = 1 }   // pulse the page border: mode changes, confirmations; duration seconds, width pixels; a border wide enough to count as a flash pulses at most three times a second
  uiEvent: { name: string; payload?: unknown }   // a once-only signal into ui.js (`window.spawn.on("event", (name, payload) => …)`): speech, a sound from ui code, anything "do this now, once"; never saved, never replayed; payload any JSON
  haptic: {   // one buzz on the player's phone in the Spawn app, and on a connected controller whose motors the browser can drive; screenShake and hitstop buzz the phone and the controller on their own unless they say `haptic: false`, and footsteps, jumps and landings buzz the phone alone. A rumble of your own is the Gamepad API's playEffect, its effect type in `kind`, times in ms; both motors at 0 stops it
    kind: HapticKind | "dual-rumble" | "trigger-rumble"
    startDelay?: number
    duration?: number
    strongMagnitude?: number
    weakMagnitude?: number
    leftTrigger?: number
    rightTrigger?: number
  }
  milestone: { step?: number; name?: string }   // how far a player got (a level, a checkpoint, a boss beaten): `step` its order 1, 2, 3 …, `name` your words (at most 40 characters), either is enough; counted once per player, and the game's numbers page draws how far new players get, step by step. A game keeps 100 milestone names: a new name past them is not counted, and getLogs says so
  stat: { name: string; value?: number; by?: string; vs?: string }   // a number for this player (coins picked up, a fall; `value` omitted counts 1): the game's numbers page charts each name's daily total. A negative `value` is spent. `by` splits it by one of your words (where coins came from or went: `{ name: "coins", value: -120, by: "skins" }`), and each player's running total of a stat split by `by` is what they hold. `vs` beside `by` counts a win of `by` over `vs` (a fight's end: `{ name: "wins", by: winner, vs: loser }`), which the page draws as win rates and matchups. `name`, `by` and `vs` are at most 40 characters; a game keeps 100 stat names and 100 parts (each `by`, or `by` and `vs`) a stat: a new name past them is not counted, a new part counts with no split, and getLogs says so
  voxelMarkSet: {   // an outline / fill overlay on one voxel cell (a build cursor, a target), never a terrain edit; omit both for the default outline
    markId: string
    voxel: VoxelCoord
    outline?: VoxelMarkOutlineOptions | null
    fill?: VoxelMarkFillOptions | null
    pulse?: VoxelMarkPulseOptions | null
    duration?: number
  }
  voxelMarkClear: { markId: string }
  partyAdd: { player: string | { readonly id: string } }   // asks that player (a row, a hook's player, a ctx.place.players row, or its id) into your Spawn party, the plate's own ask: they join by their own yes, and you lead it (a party is made when you have none); friends both ways, so a guest (isGuest) neither asks nor is asked; one already in a party is refused. Your own word: emit it where ctx.self is your player
  partyCancel: { player: string | { readonly id: string } }   // takes back the Spawn party ask your party sent that player (a row, a hook's player, a ctx.place.players row, or its id), the card's own take back: their ask leaves Spawn and a join after it is refused; one who already said yes stays in the party. The leader's word: emit it where ctx.self is your player
  partyLeave: {}   // you leave your Spawn party, the card's own leave: a leader's leave hands the lead on, and the last one out ends it. Your own word: emit it where ctx.self is your player; it removes no one else
  partyJoin: { player: string | { readonly id: string } }   // your yes to the Spawn party ask that player (a row, a hook's player, a ctx.place.players row, or its id) sent you, the ask's own join: you join their party, and a party of yours with others in it is left first. Spawn still shows its ask. Once per press of the player's: emit it from their onInput, where ctx.self is that player; with no press, or no ask from that player, it joins nothing
  partyPortal: {}   // the party card's portal together: you, its leader, ask your party to where you stand, and each comes by their own press of Spawn's line. Once per press of the player's: emit it from their onInput, where ctx.self is that player
  guildAdd: { player: string | { readonly id: string } }   // adds that player to your Spawn guild, the plate's own invite: any member's word; friends both ways
  guildKick: { player: string | { readonly id: string } }   // removes that player from your guild: the leader removes anyone, an officer removes members
  guildRank: { player: string | { readonly id: string }; rank: "member" | "officer" }   // sets that player's rank in your guild, the leader's word: member or officer (the lead is handed on the plate, never by a game)
  openSettings: { page?: "sound" | "voice" | "look" | "keys" | "screen" | "live" }   // opens Spawn's settings plate, the gear's, once per press of the player's: emit it from their onInput, where ctx.self is that player; with no press it opens nothing. page "keys" opens it at the game's keys (a touch screen has none and opens the first page); another page opens it at that part, where this device draws it
  openAvatarEditor: {}   // opens the player's own avatar editor, Spawn's, where they change the body they wear in every world: its own door over the game, never a settings page; once per press of the player's: emit it from their onInput, where ctx.self is that player; with no press it opens nothing. A guest is asked to sign in
  openInvite: {}   // opens Spawn's invite over the game: the player's friends and their own link to here; once per press of the player's: emit it from their onInput, where ctx.self is that player. A guest is asked to sign in. The game never holds the link
  openShare: {}   // opens Spawn's share of this game over the game: the game's link, in the phone's own share sheet or copied on a computer; once per press of the player's: emit it from their onInput, where ctx.self is that player. The game never holds the link
}
````


### After clicking "Audience"

default: screen juice reaches the acting player (update/onInput: self; a press ear / onTrigger*: the triggering player); world-anchored juice reaches everyone near it


### After clicking "JobOptions"

Job options for async jobs submitted via ctx.job()

JobOptions = { priority?: "low" | "normal" | "high" = "normal" // Job priority deadlineMs?: number // Deadline in ms before job is treated as stale. A platform job (llm:, image:, jev:) waits at most 800000 ms. dedupeKey?: string // Dedupe key for canceling previous jobs with the same key retries?: number // Retries for a retriable failure: the asks after the first, each after a short pause. onPart?: (part: unknown) => void // The callback form's reader of an answer written in parts: called once per part, in order, every one before the callback hears the whole answer; a job that writes none never calls it. A job file's part is each value its `run` yields; an `llm:` job's part is `{ text, first }`, `first` true on the first part. count?: number // Runs the job file's `gpu` export on this machine's GPU once for each i from 0 to count - 1, instead of its run: r.data is an Int32Array, index i's k numbers at [i*k, (i+1)*k). gpu is whole-number JavaScript, as a cell text is (32-bit; / cuts toward zero); it answers a number, a list or an object of numbers; args are whole numbers. With no GPU here r.error.code is "gpu.none"; a program that does not build is "gpu.program". room?: string // With count: the room whose land the program reads; every room.js import answers its name. A job file that exports `room` gets the room's numbers as gpu's third argument: gpu(i, args, room). Omitted, this room. }

#### Block 1

````text
JobOptions = {
  priority?: "low" | "normal" | "high" = "normal"   // Job priority
  deadlineMs?: number   // Deadline in ms before job is treated as stale. A platform job (llm:, image:, jev:) waits at most 800000 ms.
  dedupeKey?: string   // Dedupe key for canceling previous jobs with the same key
  retries?: number   // Retries for a retriable failure: the asks after the first, each after a short pause.
  onPart?: (part: unknown) => void   // The callback form's reader of an answer written in parts: called once per part, in order, every one before the callback hears the whole answer; a job that writes none never calls it. A job file's part is each value its `run` yields; an `llm:` job's part is `{ text, first }`, `first` true on the first part.
  count?: number   // Runs the job file's `gpu` export on this machine's GPU once for each i from 0 to count - 1, instead of its run: r.data is an Int32Array, index i's k numbers at [i*k, (i+1)*k). gpu is whole-number JavaScript, as a cell text is (32-bit; / cuts toward zero); it answers a number, a list or an object of numbers; args are whole numbers. With no GPU here r.error.code is "gpu.none"; a program that does not build is "gpu.program".
  room?: string   // With count: the room whose land the program reads; every room.js import answers its name. A job file that exports `room` gets the room's numbers as gpu's third argument: gpu(i, args, room). Omitted, this room.
}
````


### After clicking "sprite"

ObjectProperties.sprite

sprite?: { // a flat image facing the camera: billboard yaw (unset) turns the card to each viewer's camera, none locks it to the entity's rotation (a flat thing: a decal, a poster: edge-on from the side), full also pitches; uvRect picks a sheet region; frames named in events fire onAnimationEvent; castShadow: true throws the card's shadow in its picture's shape (a turning card's shadow turns with it) texture: AssetID size?: [number, number] // World-space [width, height] of the quad. OMIT for pixel sprites: the engine sizes the sprite from the asset's declared world height (its `2d` metadata), so pixel density stays uniform across the scene (64 px per world unit). Set it only to deliberately rescale; authored size always beats the metadata default. pixelsPerUnit?: number // Pixels-per-unit convenience; used only when `size` is omitted. Setting it also opts out of the metadata-driven default size. anchor?: [number, number] // Normalized [u, v] point of the art that sits at the entity's origin (0..1, v up; default [0.5, 0] = bottom-center "feet"). It places the quad relative to `feetPosition`, it is the pivot the sprite rotates around: a bullet spinning about its center wants [0.5, 0.5], a ceiling lantern swinging from its top wants [0.5, 1], a door hinged at an edge wants [0, 0], and the auto-derived collider2d hull is expressed against the same point, so art, pivot, and hitbox always share one origin. tint?: Color // multiplies the art opacity?: number // 0..1, blends in linear light: over a dark background white at 0.05 reads 21% solid, 0.25 reads 65%, 0.5 reads 86% blend?: SpriteBlendMode lit?: boolean // Scene lights shade the sprite (the engine derives a normal map from the art automatically). Default: in a 2D place that has any authored light, world sprites are lit automatically: painted plates (`backdrop-`, `strip-`, `floor-` art and parallax layers) stay unlit because their lighting is in the art, and an explicit true/false always wins. Places without lights render unlit. Alpha/cutout blends only: add/multiply/subtract sprites are themselves light/stain, so `lit` is a documented no-op there. emissive?: number // HDR glow (default 0). Feeds bloom; works lit or unlit. normalStrength?: number // Normal-map relief strength (default 1). 0 = pure distance falloff. billboard?: "none" | "yaw" | "full" upright?: boolean // The sprite never inherits the entity's rotation as in-plane spin; it keeps the base pose (axis-aligned under the camera) however the entity turns: NPC steering, physics, scripts. The lock covers both 2D modes. The collider of a body that is not dynamic stays with the picture too; rotation still drives children and a dynamic body. Characters whose facing is `?facing=` texture swaps want `upright: true`; leave unset for things that should visibly turn (cars, ships, banking projectiles). No effect in 3D places: `billboard` owns rotation inheritance there. flipX?: boolean flipY?: boolean sortingLayer?: number sortingOrder?: number ySort?: boolean alphaCutoff?: number cutout?: boolean // Alpha-tested cutout rendering: discard pixels below 50% alpha and write depth, so heavily overlapping sprites (foliage, crowds, dense beds) resolve per-pixel instead of haloing by draw order. Default on for pixel-inferred art (`pixel-*` names, `?animated=` atlases, `scripts/tex-*.js` refs), off for painterly art, which sorts whole-sprite by distance: set true on a painterly sprite that lives among others, false for soft/glow edges. filter?: "pixel" | "linear" // Texture sampling override. "pixel" samples nearest (crisp pixel art), "linear" samples smooth. Unset defers to the asset's own pixel-ness (moodboard grammar / metadata inference). parallax?: [number, number] // Scroll factors [x, y] of a background picture; the sim never moves it. 1 = fixed in the world (default), 0 = fixed to the camera, between = parallax (far hills ~0.2–0.5, near trees ~0.7). It draws at feet + (1 − factor) × camera: the first factor on x, the second on z in a 2d-top place and on y elsewhere. A `backdrop-` picture in a 2D place whose second factor is not 1 also stays on screen on that axis. repeatX?: boolean // Tile the sprite's texture along X. On camera-attached sprites the quad spans the viewport and the texture scrolls its UV phase (the strip recipe). On plain world sprites this only sets the sampler's wrap: the sprite keeps its own class (lit stays lit, batched stays batched); use `uvRect` width > 1 for the tile count, or pair with `feetPosition: { attach: "camera" }` for an endless band. uvRect?: SpriteUvRect // Normalized texture-space rectangle; UV origin is bottom-left. Inside 0..1 it crops (a still cell of a sheet). Reaching past 0..1 tiles: the sampler wraps on that axis: `{ x: 0, y: 0, width: 4, height: 1 }` repeats the art 4× across the quad, with no lighting or batching side effects. A negative width or height reads the crop mirrored (the sprite-engine mirror); zero is refused. events?: Record<string, Record<number, string>> | null // Frame events, per clip: `events: { run: { 3: 'footfall', 7: 'footfall' } }`: the clip name a mixer channel plays, the frame index (clip-local) that fires the named event exactly when the winning channel's clock shows that frame. The object's behavior receives it as `onAnimationEvent(ctx, { name, animation, frame })`: footsteps, attack hitboxes, emitter bursts that never drift from the art. Set null to remove. Costs nothing on sprites without it. trail?: { interval?: number; life?: number; count?: number; tint?: Color | [Color, Color]; fade?: "alpha" | "shrink" | "both"; blend?: "normal" | "additive" } | null // Afterimage trail, dash ghosts, motion echoes: `trail: { interval: 0.04, life: 0.3, fade: 'both' }`. The engine snapshots the sprite's pose + frame + tint every `interval` seconds and draws the snapshots behind the sprite, fading out over `life` seconds (`fade`: 'alpha' | 'shrink' | 'both'; `tint` recolors the ghosts; `count` caps them). `tint` also takes a `[head, tail]` ramp of two colours lerped per ghost by age. `blend: 'additive'` renders the ghosts add-blended for energy/glow dashes (the sprite itself keeps its own blend). Ghosts are frozen copies: they never animate. Set null to remove. Costs nothing on sprites without it. material?: ScriptedMaterialSpec // A scripted material draws the sprite's pixels: `{ kind: "scripted", script, params }`, the contract an object's material takes; what it reads of the sprite is ctx.sprite (jayzee api builtin/three). The sprite keeps its size, frames, flips, tint, opacity, blend, cutout and sorting; the material's class decides its light, so lit, emissive and normalStrength do nothing. Each distinct params value is its own batch and its own draw. A broken script draws the plain sprite until the next edit. } // "sprite" is also in: builtin/three (SpriteNodeMaterial)

#### Block 1

````text
  sprite?: {   // a flat image facing the camera: billboard yaw (unset) turns the card to each viewer's camera, none locks it to the entity's rotation (a flat thing: a decal, a poster: edge-on from the side), full also pitches; uvRect picks a sheet region; frames named in events fire onAnimationEvent; castShadow: true throws the card's shadow in its picture's shape (a turning card's shadow turns with it)
    texture: AssetID
    size?: [number, number]   // World-space [width, height] of the quad. OMIT for pixel sprites: the engine sizes the sprite from the asset's declared world height (its `2d` metadata), so pixel density stays uniform across the scene (64 px per world unit). Set it only to deliberately rescale; authored size always beats the metadata default.
    pixelsPerUnit?: number   // Pixels-per-unit convenience; used only when `size` is omitted. Setting it also opts out of the metadata-driven default size.
    anchor?: [number, number]   // Normalized [u, v] point of the art that sits at the entity's origin (0..1, v up; default [0.5, 0] = bottom-center "feet"). It places the quad relative to `feetPosition`, it is the pivot the sprite rotates around: a bullet spinning about its center wants [0.5, 0.5], a ceiling lantern swinging from its top wants [0.5, 1], a door hinged at an edge wants [0, 0], and the auto-derived collider2d hull is expressed against the same point, so art, pivot, and hitbox always share one origin.
    tint?: Color   // multiplies the art
    opacity?: number   // 0..1, blends in linear light: over a dark background white at 0.05 reads 21% solid, 0.25 reads 65%, 0.5 reads 86%
    blend?: SpriteBlendMode
    lit?: boolean   // Scene lights shade the sprite (the engine derives a normal map from the art automatically). Default: in a 2D place that has any authored light, world sprites are lit automatically: painted plates (`backdrop-`, `strip-`, `floor-` art and parallax layers) stay unlit because their lighting is in the art, and an explicit true/false always wins. Places without lights render unlit. Alpha/cutout blends only: add/multiply/subtract sprites are themselves light/stain, so `lit` is a documented no-op there.
    emissive?: number   // HDR glow (default 0). Feeds bloom; works lit or unlit.
    normalStrength?: number   // Normal-map relief strength (default 1). 0 = pure distance falloff.
    billboard?: "none" | "yaw" | "full"
    upright?: boolean   // The sprite never inherits the entity's rotation as in-plane spin; it keeps the base pose (axis-aligned under the camera) however the entity turns: NPC steering, physics, scripts. The lock covers both 2D modes. The collider of a body that is not dynamic stays with the picture too; rotation still drives children and a dynamic body. Characters whose facing is `?facing=` texture swaps want `upright: true`; leave unset for things that should visibly turn (cars, ships, banking projectiles). No effect in 3D places: `billboard` owns rotation inheritance there.
    flipX?: boolean
    flipY?: boolean
    sortingLayer?: number
    sortingOrder?: number
    ySort?: boolean
    alphaCutoff?: number
    cutout?: boolean   // Alpha-tested cutout rendering: discard pixels below 50% alpha and write depth, so heavily overlapping sprites (foliage, crowds, dense beds) resolve per-pixel instead of haloing by draw order. Default on for pixel-inferred art (`pixel-*` names, `?animated=` atlases, `scripts/tex-*.js` refs), off for painterly art, which sorts whole-sprite by distance: set true on a painterly sprite that lives among others, false for soft/glow edges.
    filter?: "pixel" | "linear"   // Texture sampling override. "pixel" samples nearest (crisp pixel art), "linear" samples smooth. Unset defers to the asset's own pixel-ness (moodboard grammar / metadata inference).
    parallax?: [number, number]   // Scroll factors [x, y] of a background picture; the sim never moves it. 1 = fixed in the world (default), 0 = fixed to the camera, between = parallax (far hills ~0.2–0.5, near trees ~0.7). It draws at feet + (1 − factor) × camera: the first factor on x, the second on z in a 2d-top place and on y elsewhere. A `backdrop-` picture in a 2D place whose second factor is not 1 also stays on screen on that axis.
    repeatX?: boolean   // Tile the sprite's texture along X. On camera-attached sprites the quad spans the viewport and the texture scrolls its UV phase (the strip recipe). On plain world sprites this only sets the sampler's wrap: the sprite keeps its own class (lit stays lit, batched stays batched); use `uvRect` width > 1 for the tile count, or pair with `feetPosition: { attach: "camera" }` for an endless band.
    uvRect?: SpriteUvRect   // Normalized texture-space rectangle; UV origin is bottom-left. Inside 0..1 it crops (a still cell of a sheet). Reaching past 0..1 tiles: the sampler wraps on that axis: `{ x: 0, y: 0, width: 4, height: 1 }` repeats the art 4× across the quad, with no lighting or batching side effects. A negative width or height reads the crop mirrored (the sprite-engine mirror); zero is refused.
    events?: Record<string, Record<number, string>> | null   // Frame events, per clip: `events: { run: { 3: 'footfall', 7: 'footfall' } }`: the clip name a mixer channel plays, the frame index (clip-local) that fires the named event exactly when the winning channel's clock shows that frame. The object's behavior receives it as `onAnimationEvent(ctx, { name, animation, frame })`: footsteps, attack hitboxes, emitter bursts that never drift from the art. Set null to remove. Costs nothing on sprites without it.
    trail?: { interval?: number; life?: number; count?: number; tint?: Color | [Color, Color]; fade?: "alpha" | "shrink" | "both"; blend?: "normal" | "additive" } | null   // Afterimage trail, dash ghosts, motion echoes: `trail: { interval: 0.04, life: 0.3, fade: 'both' }`. The engine snapshots the sprite's pose + frame + tint every `interval` seconds and draws the snapshots behind the sprite, fading out over `life` seconds (`fade`: 'alpha' | 'shrink' | 'both'; `tint` recolors the ghosts; `count` caps them). `tint` also takes a `[head, tail]` ramp of two colours lerped per ghost by age. `blend: 'additive'` renders the ghosts add-blended for energy/glow dashes (the sprite itself keeps its own blend). Ghosts are frozen copies: they never animate. Set null to remove. Costs nothing on sprites without it.
    material?: ScriptedMaterialSpec   // A scripted material draws the sprite's pixels: `{ kind: "scripted", script, params }`, the contract an object's material takes; what it reads of the sprite is ctx.sprite (spawn api builtin/three). The sprite keeps its size, frames, flips, tint, opacity, blend, cutout and sorting; the material's class decides its light, so lit, emissive and normalStrength do nothing. Each distinct params value is its own batch and its own draw. A broken script draws the plain sprite until the next edit.
  }
// "sprite" is also in: builtin/three (SpriteNodeMaterial)
````


### After clicking "wisp"

A living pixel-wisp drawn from its row: like sprite is an image drawn from its row. One 9×18 heat sim per wisp burns on every client from seed (nothing but this row crosses the wire); a 3D place draws it as revolved voxels, a 2d-side / 2d-top place as the pixel grid itself. A wisp with a…

WispSpec = { color: string // identity hex "#rrggbb", who the wisp is, never its status state?: "unlit" | "idle" | "weaving" | "settling" | "guttering" | "sleeping" // what the flame is doing (default "idle"); "unlit" is a dim wick until a later state lights it; "weaving" burns hot and sheds embers; "settling" the content linger after work; "guttering" the failed sputter; "sleeping" banked low expression?: "auto" | "curious" | "happy" | "sleepy" // face only; the flame keeps its work state (default "auto"); becoming "happy" releases a few native embers shape?: "classic" | "slender" | "twin" // the flame's silhouette (default "classic") burnStyle?: "calm" | "crackle" | "pulse" | "wave" // the burn pattern on the one fire (default: the plain fire) seed?: number // the flame's rng seed (default: a hash of the object id: every client burns the same flame) size?: number // world height of the wisp's cell grid in both modes (default 0.8: the flame stands in the lower half, embers rise through the rest) mouth?: number // an open mouth, 0 shut (default) to 1 open: the face shows it small from 0.25 and tall from 0.6, in the smile's place; a sleeping face keeps it shut }

#### Block 1

````text
WispSpec = {
  color: string   // identity hex "#rrggbb", who the wisp is, never its status
  state?: "unlit" | "idle" | "weaving" | "settling" | "guttering" | "sleeping"   // what the flame is doing (default "idle"); "unlit" is a dim wick until a later state lights it; "weaving" burns hot and sheds embers; "settling" the content linger after work; "guttering" the failed sputter; "sleeping" banked low
  expression?: "auto" | "curious" | "happy" | "sleepy"   // face only; the flame keeps its work state (default "auto"); becoming "happy" releases a few native embers
  shape?: "classic" | "slender" | "twin"   // the flame's silhouette (default "classic")
  burnStyle?: "calm" | "crackle" | "pulse" | "wave"   // the burn pattern on the one fire (default: the plain fire)
  seed?: number   // the flame's rng seed (default: a hash of the object id: every client burns the same flame)
  size?: number   // world height of the wisp's cell grid in both modes (default 0.8: the flame stands in the lower half, embers rise through the rest)
  mouth?: number   // an open mouth, 0 shut (default) to 1 open: the face shows it small from 0.25 and tall from 0.6, in the smile's place; a sleeping face keeps it shut
}
````


### After clicking "spline"

Declarative spline layout

kind: road, pipe, fence, hedge, powerline, wall, guardrail, handrail, railway, streetlight, stringlight, bannerline, conveyor, canal, curb, stairs, boardwalk, bollard, barrier, zipline, aqueduct, coaster, data-only, or scripted

scripted lofts a cross-section you…

SplineSpec = { kind: "road" | "pipe" | "fence" | "hedge" | "powerline" | "wall" | "guardrail" | "handrail" | "railway" | "streetlight" | "stringlight" | "bannerline" | "conveyor" | "canal" | "curb" | "stairs" | "boardwalk" | "bollard" | "barrier" | "zipline" | "aqueduct" | "coaster" | "data-only" | "scripted" script?: ScriptRef // scripted: exports profile(ctx) → { points: [[u, v]] | "<SVG path data>", closed?, holes?, edges? } swept along the path; edges[i] styles the strip from point i to i+1 as { color, emissive, metalness, roughness } | null (null = the owner's material); a closed section's end caps (capEnds, on by default) wear the last strip's entry, the strip that closes the ring; geometry() / children() / collider() are escape hatches params?: Record<string, unknown> // scripted: handed to the script as its params seed?: number // scripted: the deterministic random seed points?: SplinePointSpec[] // Vec3Like[]: local to the owner's feet; standalone = world coords beziers?: CubicBezierSpec[] // { from, c1, c2, to }[] shape?: SplineShapeSpec samples?: number | "auto" closed?: boolean cornerMode?: "smooth" | "hard" style?: SplineStyle snapToTerrain?: boolean // Every knot and station on the terrain; a knot's bare-number y is discarded. A knot spelled `{ x, z, y: { terrain: n } }` on a standing kind (fence, wall, guardrail, handrail, barrier, conveyor, pipe, coaster, aqueduct, powerline, zipline, streetlight, stringlight, bannerline) stands n metres above the ground there, the lift interpolated to the next knot, its posts still reaching the ground; a ground kind (road, curb, boardwalk, stairs, railway, bollard, hedge) ignores it; every other kind (canal, scripted, data-only) ignores it too. yOffset?: number up?: [number, number, number] width?: number | number[] // road: per point (tapers); others one number radius?: number // pipe spacing?: number // meters between posts / bulbs / bollards bulbSpacing?: number // Distance in meters between bulbs along a stringlight strand (default 0.4: a dense warm festoon), on both the draped and `poles: true` layouts. `spacing` never thins the bulbs: that field is the support pitch (poles every `spacing` when supports exist). overlap?: number beltSpeed?: number lightStrips?: boolean | SplineLightStripsSpec roadside?: RoadRoadsideSpec tangentAxis?: "x" | "z" height?: number thickness?: number poleHeight?: number // Wire height for the wire kinds (powerline, stringlight, bannerline, zipline, streetlight). `points` above the terrain ARE the wire line; points at terrain height hang the wire ~`poleHeight` above the ground. When poles exist (default on powerline, `poles: true` on stringlight/bannerline, always on streetlight/zipline) each pole runs from the terrain under it up to the line. poles?: boolean // powerline / stringlight: grounded poles every spacing wireCount?: number wireHeight?: number wireSag?: number // Strand looseness for the wire kinds. On a draped wire (stringlight and bannerline without `poles: true`, a powerline with `poles: false`) it is meters of droop per 10 m of span, default 0.8: sag scales with each span's length (a 0.6 run dips ~1 m on a 17 m crossing and ~1.8 m on a 30 m one), so long building-to-building runs hang deep and short hops stay tidy. Where poles stand (a powerline by default, `poles: true` on stringlight/bannerline, always on streetlight/zipline) it is absolute meters of droop per pole-to-pole span instead, since generated pole spans are uniform `spacing`-sized: default 0.35 on a powerline, 0.18 on a zipline, 0.45 on the others. wireRadius?: number rolls?: number[] revision?: number } // "spline" also names: jayzee api SplineSampleSpace // Coordinate space for spline queries. jayzee api SplinePlacementOptions // Options for placing an object on a spline/path object. jayzee api SplineSample // Result of sampling or projecting onto a spline/path object. jayzee api SplineSampleOptions // Options for sampling or projecting onto a spline/path object. (+4 more) // "spline" is also in: builtin/spline (splineLength, sampleSpline, projectToSpline)

#### Block 1

````text
SplineSpec = {
  kind: "road" | "pipe" | "fence" | "hedge" | "powerline" | "wall" | "guardrail" | "handrail" | "railway" | "streetlight" | "stringlight" | "bannerline" | "conveyor" | "canal" | "curb" | "stairs" | "boardwalk" | "bollard" | "barrier" | "zipline" | "aqueduct" | "coaster" | "data-only" | "scripted"
  script?: ScriptRef   // scripted: exports profile(ctx) → { points: [[u, v]] | "<SVG path data>", closed?, holes?, edges? } swept along the path; edges[i] styles the strip from point i to i+1 as { color, emissive, metalness, roughness } | null (null = the owner's material); a closed section's end caps (capEnds, on by default) wear the last strip's entry, the strip that closes the ring; geometry() / children() / collider() are escape hatches
  params?: Record<string, unknown>   // scripted: handed to the script as its params
  seed?: number   // scripted: the deterministic random seed
  points?: SplinePointSpec[]   // Vec3Like[]: local to the owner's feet; standalone = world coords
  beziers?: CubicBezierSpec[]   // { from, c1, c2, to }[]
  shape?: SplineShapeSpec
  samples?: number | "auto"
  closed?: boolean
  cornerMode?: "smooth" | "hard"
  style?: SplineStyle
  snapToTerrain?: boolean   // Every knot and station on the terrain; a knot's bare-number y is discarded. A knot spelled `{ x, z, y: { terrain: n } }` on a standing kind (fence, wall, guardrail, handrail, barrier, conveyor, pipe, coaster, aqueduct, powerline, zipline, streetlight, stringlight, bannerline) stands n metres above the ground there, the lift interpolated to the next knot, its posts still reaching the ground; a ground kind (road, curb, boardwalk, stairs, railway, bollard, hedge) ignores it; every other kind (canal, scripted, data-only) ignores it too.
  yOffset?: number
  up?: [number, number, number]
  width?: number | number[]   // road: per point (tapers); others one number
  radius?: number   // pipe
  spacing?: number   // meters between posts / bulbs / bollards
  bulbSpacing?: number   // Distance in meters between bulbs along a stringlight strand (default 0.4: a dense warm festoon), on both the draped and `poles: true` layouts. `spacing` never thins the bulbs: that field is the support pitch (poles every `spacing` when supports exist).
  overlap?: number
  beltSpeed?: number
  lightStrips?: boolean | SplineLightStripsSpec
  roadside?: RoadRoadsideSpec
  tangentAxis?: "x" | "z"
  height?: number
  thickness?: number
  poleHeight?: number   // Wire height for the wire kinds (powerline, stringlight, bannerline, zipline, streetlight). `points` above the terrain ARE the wire line; points at terrain height hang the wire ~`poleHeight` above the ground. When poles exist (default on powerline, `poles: true` on stringlight/bannerline, always on streetlight/zipline) each pole runs from the terrain under it up to the line.
  poles?: boolean   // powerline / stringlight: grounded poles every spacing
  wireCount?: number
  wireHeight?: number
  wireSag?: number   // Strand looseness for the wire kinds. On a draped wire (stringlight and bannerline without `poles: true`, a powerline with `poles: false`) it is meters of droop per 10 m of span, default 0.8: sag scales with each span's length (a 0.6 run dips ~1 m on a 17 m crossing and ~1.8 m on a 30 m one), so long building-to-building runs hang deep and short hops stay tidy. Where poles stand (a powerline by default, `poles: true` on stringlight/bannerline, always on streetlight/zipline) it is absolute meters of droop per pole-to-pole span instead, since generated pole spans are uniform `spacing`-sized: default 0.35 on a powerline, 0.18 on a zipline, 0.45 on the others.
  wireRadius?: number
  rolls?: number[]
  revision?: number
}
// "spline" also names:
  spawn api SplineSampleSpace   // Coordinate space for spline queries.
  spawn api SplinePlacementOptions   // Options for placing an object on a spline/path object.
  spawn api SplineSample   // Result of sampling or projecting onto a spline/path object.
  spawn api SplineSampleOptions   // Options for sampling or projecting onto a spline/path object.
  (+4 more)
// "spline" is also in: builtin/spline (splineLength, sampleSpline, projectToSpline)
````


### After clicking "scatter"

ScatterSpec = { bounds: ScatterBounds sampling?: ScatterSampling // How the points lie inside the bounds (default: `{ strategy: "random" }`). count?: number // Shape-bounds scatter target count. Pure-visual templates (a primitive, scripted geometry, a sprite: no physics, behavior, tags or state) are a recipe the GPU samples to the device's instance budget at any count, with no object per instance (`ctx.place.terrain.scatterIn(min, max)` reads where they stand); templates a body can touch or a script can reach jayzee as objects, unless a terrain bed of still bodies outgrows its triangle guard: then the GPU draws them and they stay solid. Field-bounds scatter derives count from bounds.density. maxDistance?: number // How far from the eye the bed's drawn instances reach, in metres (its pure-visual templates), scaled by the device up to 2048 m, whatever the place's decoration reach. Omitted: a template 1.5 m tall or less reaches 100 m, a taller one the place's farthest decoration reach, at least 200 m. A pure-visual template's own visibleRange.max is its reach in place of this. Templates that jayzee as objects keep their own draw distance. seed: number templates: ScatterTemplate[] variation?: { scale?: [number, number] // Uniform scale range. yaw?: [number, number] // Yaw range in degrees. } surface?: "terrain" | { y: number } | { mesh: string | string[] } // The ground the instances seat on (default: "terrain": the place's heightmap or voxel ground). `{ y }` is a flat plane at that height. `{ mesh }` names an object (or a list of objects) of this place whose model IS the ground; an uploaded GLB floor, an arena's chunks, an island, a deck: the instances seat on its up-facing faces, `filter.maxSlope` is the slope cutoff, and the bed is the same instanced GPU crowd a heightmap world gets (the walked bend of each body's `press`, screen-door fade, the device budget, the wind its template's `wind` names) on any terrain kind, a place with terrain off included. A template the deck does not draw (a model, or one a body can touch: physics, behavior, tags, state) keeps the object path, one object per instance, and stands on the same faces. filter?: { // Filter criteria for rejecting scatter points. maxSlope?: number // Maximum terrain slope (0 = flat, 1 = vertical). Points steeper than this are rejected. minSlope?: number // Minimum terrain slope (0 = flat, 1 = vertical). Points flatter than this are rejected. materials?: string[] // Keep points only where the dominant terrain material (generator + painted weights) is one of these material ids. avoidStructures?: boolean // Scatter avoids the footprints of terrain `structure` marks, so instances never land on a building's roof or inside its walls (default: true). Set false to place inside them: overgrown ruins, props indoors. } instanceOverrides?: Record<string, ScatterInstanceOverride> // Sparse per-instance edits persisted on the scatter root. } // "scatter" also names: jayzee api ScatterBounds // Scatter bounds jayzee api ScatterSampling // Scatter sampling strategy jayzee api ScatterTemplate // Scatter template (weighted child spec): an object spec (model, physics, scale, … flat beside tags /… jayzee api ScatterInstanceOverride // Per-instance scatter override keyed by generated child instance ID (+1 more)

#### Block 1

````text
ScatterSpec = {
  bounds: ScatterBounds
  sampling?: ScatterSampling   // How the points lie inside the bounds (default: `{ strategy: "random" }`).
  count?: number   // Shape-bounds scatter target count. Pure-visual templates (a primitive, scripted geometry, a sprite: no physics, behavior, tags or state) are a recipe the GPU samples to the device's instance budget at any count, with no object per instance (`ctx.place.terrain.scatterIn(min, max)` reads where they stand); templates a body can touch or a script can reach spawn as objects, unless a terrain bed of still bodies outgrows its triangle guard: then the GPU draws them and they stay solid. Field-bounds scatter derives count from bounds.density.
  maxDistance?: number   // How far from the eye the bed's drawn instances reach, in metres (its pure-visual templates), scaled by the device up to 2048 m, whatever the place's decoration reach. Omitted: a template 1.5 m tall or less reaches 100 m, a taller one the place's farthest decoration reach, at least 200 m. A pure-visual template's own visibleRange.max is its reach in place of this. Templates that spawn as objects keep their own draw distance.
  seed: number
  templates: ScatterTemplate[]
  variation?: {
    scale?: [number, number]   // Uniform scale range.
    yaw?: [number, number]   // Yaw range in degrees.
  }
  surface?: "terrain" | { y: number } | { mesh: string | string[] }   // The ground the instances seat on (default: "terrain": the place's heightmap or voxel ground). `{ y }` is a flat plane at that height. `{ mesh }` names an object (or a list of objects) of this place whose model IS the ground; an uploaded GLB floor, an arena's chunks, an island, a deck: the instances seat on its up-facing faces, `filter.maxSlope` is the slope cutoff, and the bed is the same instanced GPU crowd a heightmap world gets (the walked bend of each body's `press`, screen-door fade, the device budget, the wind its template's `wind` names) on any terrain kind, a place with terrain off included. A template the deck does not draw (a model, or one a body can touch: physics, behavior, tags, state) keeps the object path, one object per instance, and stands on the same faces.
  filter?: {   // Filter criteria for rejecting scatter points.
    maxSlope?: number   // Maximum terrain slope (0 = flat, 1 = vertical). Points steeper than this are rejected.
    minSlope?: number   // Minimum terrain slope (0 = flat, 1 = vertical). Points flatter than this are rejected.
    materials?: string[]   // Keep points only where the dominant terrain material (generator + painted weights) is one of these material ids.
    avoidStructures?: boolean   // Scatter avoids the footprints of terrain `structure` marks, so instances never land on a building's roof or inside its walls (default: true). Set false to place inside them: overgrown ruins, props indoors.
  }
  instanceOverrides?: Record<string, ScatterInstanceOverride>   // Sparse per-instance edits persisted on the scatter root.
}
// "scatter" also names:
  spawn api ScatterBounds   // Scatter bounds
  spawn api ScatterSampling   // Scatter sampling strategy
  spawn api ScatterTemplate   // Scatter template (weighted child spec): an object spec (model, physics, scale, … flat beside tags /…
  spawn api ScatterInstanceOverride   // Per-instance scatter override keyed by generated child instance ID
  (+1 more)
````


### After clicking "builtin/postfx"

builtin/postfx: import { grade, bloom, vignette, grain, film, chromaticAberration, dotScreen, scanlines, dof, pixelate, tint, blur } from "builtin/postfx" The look builtins, bound to the active build's finished frame; for a look(ctx) script (attached by ctx.place.atmosphere.look = { script, params…

grade(color, { exposure, saturation, contrast, brightness, lift, gamma, gain, temperature, tint, haze, hazeColor }): color // every option optional and neutral by default; haze fades the far field toward hazeColor (the sky's own colour; 0.05–0.12 is a strong effect); contrast pivots at the perceptual mid; lift, gamma and gain are a grading tool's wheels on the display value: lift the black point (0 neutral; ±0.05 is a strong move), gamma the mids as pow(x, 1/gamma) (1 neutral; 1.2 opens them, 0.85 sinks them), gain the white point (1 neutral); each a number or an [r, g, b] vignette(color, intensity, { color, roundness, feather }): color // roundness 2 round (default), 1 diamond, 4 boxy; feather 0.45 (default) grain(color, intensity): color; film(color, intensity): color; tint(color, "oklch(L C H)", amount): color; scanlines(color, intensity, count): color; dotScreen(color, angle, scale): color // per-pixel, chain freely; tint is a cast: the frame multiplied toward the colour, black stays black chromaticAberration(color, strength): color; dof(color, viewZ, focusDistance, focusRange, bokehScale): color; pixelate(scene, size): color; blur(scene, amount): color // frame resamplers: they re-sample the colour node they are handed (ctx.scene straight; a chained node is rendered first, one hidden pass), so a grade before a pixelate is kept; dof: focusDistance and focusRange in metres: sharp at the distance, the blur ramping to full over the range either side of it; bokehScale is the blur's radius in pixels at full blur (1, the default, is one pixel: nothing to see; 6 reads as a subtle softening); blur amount 0..1 scales the radius; pixelate blocks the whole frame: one thing alone in blocks is a see-through copy of it (→looks) ctx.scene: vec3; ctx.depth: texture; ctx.viewZ: float; ctx.viewZAt(uv): float; ctx.normal(uv, { shading?, liquid? }): vec3; ctx.worldPosition(uv): vec3; ctx.skyVisibility(P, N?): float; ctx.previousUv(P): vec2; ctx.velocity: vec2; ctx.target(name, options): target; ctx.pass(target, (uv) => vec3 | vec4): texture; ctx.cube: texture; ctx.cover: texture // a look(ctx)'s own reads of the frame and its offscreen passes (the looks skill teaches each; a world's lighting() reads ctx.skyVisibility too), and ctx.cube, the place all around the frame's eye, read by a world direction with ctx.cube.sample(dir) for a lens wider than the camera (a fisheye past 180 degrees, a panorama) or a reflection; atmosphere.look.cube = { parent: id, eye? } takes it at that thing, without the thing or what is parented under it (its shadow still draws), so a glass thing reflects who stands in front of it: a look whose code reads ctx.cube draws the place seven times a frame, not once, whether look.cube is set or not, and ctx.cube is never null, so read ctx.cube only while the lens is in use; and ctx.cover, the share of each pixel that see-through draws (smoke, particles, blended cards) cover in front of the solid surface, 0 to 1 in .r: ctx.depth, ctx.normal and ctx.worldPosition read through thin smoke to the surface behind it, so fade a depth effect by the cover, ao = mix(ao, 1.0, ctx.cover.sample(uv).r): a look that reads it draws the see-through draws a second time each frame ctx.data: texture // what m.dataNode wrote at each pixel (→builtin/three), such as a material id, a soak or a light the look turns into the game's own palette; exact: .sample(uv) reads one texel, never a blend, .mul(255).round() its bytes, a neighbour at uv.add(vec2(1, 0).div(vec2(ctx.data.size()))); a look that reads it draws each surface with a dataNode twice a frame ctx.additive: texture // the light fx sprites with blend "add" and materials with blending "additive" and depthWrite false put on each pixel, linear, before exposure; 0 in 2D and on some headsets: a = ctx.additive.sample(screenUV).rgb; grade(ctx.scene.sub(a)).add(a) keeps a muzzle flash out of the grade; a look that reads it draws those twice a frame bloom(color): color // a no-op: bloom is the engine's and already in the frame: its dials are the look params bloomStrength, bloomRadius, bloomThreshold (0.15 where the place glows, else 0; 0.6; 1), live from ctx.param or the place's look.params. bloomThreshold is the brightness a pixel must pass to glow; its brightest channel in the HDR frame, where white is 1: 1 admits only what is brighter than white (the sun's disc, emissive shells, the brightest lit faces), 0.6 lets ordinary lit surfaces spill; bloomStrength scales every halo: at 0.15, emissiveIntensity 1 barely haloes and 2.5 clearly; an asked glow is 0.4–0.8; bloomRadius spreads it: 0.6 a tight halo, 1.2–1.6 wide light bleed, larger wider still import { grade, vignette, grain } from "builtin/postfx"; export function look(ctx) { const c = grade(ctx.scene, { exposure: 1.05, saturation: 1.1, temperature: 0.1, haze: 0.06, hazeColor: "oklch(0.845 0.032 248.2)" }); return grain(vignette(c, ctx.param("vignette", 0.25), { color: "oklch(0.121 0.019 283.1)" }), 0.05); }

#### Block 1

````text
grade(color, { exposure, saturation, contrast, brightness, lift, gamma, gain, temperature, tint, haze, hazeColor }): color // every option optional and neutral by default; haze fades the far field toward hazeColor (the sky's own colour; 0.05–0.12 is a strong effect); contrast pivots at the perceptual mid; lift, gamma and gain are a grading tool's wheels on the display value: lift the black point (0 neutral; ±0.05 is a strong move), gamma the mids as pow(x, 1/gamma) (1 neutral; 1.2 opens them, 0.85 sinks them), gain the white point (1 neutral); each a number or an [r, g, b]
vignette(color, intensity, { color, roundness, feather }): color // roundness 2 round (default), 1 diamond, 4 boxy; feather 0.45 (default)
grain(color, intensity): color; film(color, intensity): color; tint(color, "oklch(L C H)", amount): color; scanlines(color, intensity, count): color; dotScreen(color, angle, scale): color // per-pixel, chain freely; tint is a cast: the frame multiplied toward the colour, black stays black
chromaticAberration(color, strength): color; dof(color, viewZ, focusDistance, focusRange, bokehScale): color; pixelate(scene, size): color; blur(scene, amount): color // frame resamplers: they re-sample the colour node they are handed (ctx.scene straight; a chained node is rendered first, one hidden pass), so a grade before a pixelate is kept; dof: focusDistance and focusRange in metres: sharp at the distance, the blur ramping to full over the range either side of it; bokehScale is the blur's radius in pixels at full blur (1, the default, is one pixel: nothing to see; 6 reads as a subtle softening); blur amount 0..1 scales the radius; pixelate blocks the whole frame: one thing alone in blocks is a see-through copy of it (→looks)
ctx.scene: vec3; ctx.depth: texture; ctx.viewZ: float; ctx.viewZAt(uv): float; ctx.normal(uv, { shading?, liquid? }): vec3; ctx.worldPosition(uv): vec3; ctx.skyVisibility(P, N?): float; ctx.previousUv(P): vec2; ctx.velocity: vec2; ctx.target(name, options): target; ctx.pass(target, (uv) => vec3 | vec4): texture; ctx.cube: texture; ctx.cover: texture // a look(ctx)'s own reads of the frame and its offscreen passes (the looks skill teaches each; a world's lighting() reads ctx.skyVisibility too), and ctx.cube, the place all around the frame's eye, read by a world direction with ctx.cube.sample(dir) for a lens wider than the camera (a fisheye past 180 degrees, a panorama) or a reflection; atmosphere.look.cube = { parent: id, eye? } takes it at that thing, without the thing or what is parented under it (its shadow still draws), so a glass thing reflects who stands in front of it: a look whose code reads ctx.cube draws the place seven times a frame, not once, whether look.cube is set or not, and ctx.cube is never null, so read ctx.cube only while the lens is in use; and ctx.cover, the share of each pixel that see-through draws (smoke, particles, blended cards) cover in front of the solid surface, 0 to 1 in .r: ctx.depth, ctx.normal and ctx.worldPosition read through thin smoke to the surface behind it, so fade a depth effect by the cover, ao = mix(ao, 1.0, ctx.cover.sample(uv).r): a look that reads it draws the see-through draws a second time each frame
ctx.data: texture // what m.dataNode wrote at each pixel (→builtin/three), such as a material id, a soak or a light the look turns into the game's own palette; exact: .sample(uv) reads one texel, never a blend, .mul(255).round() its bytes, a neighbour at uv.add(vec2(1, 0).div(vec2(ctx.data.size()))); a look that reads it draws each surface with a dataNode twice a frame
ctx.additive: texture // the light fx sprites with blend "add" and materials with blending "additive" and depthWrite false put on each pixel, linear, before exposure; 0 in 2D and on some headsets: a = ctx.additive.sample(screenUV).rgb; grade(ctx.scene.sub(a)).add(a) keeps a muzzle flash out of the grade; a look that reads it draws those twice a frame
bloom(color): color // a no-op: bloom is the engine's and already in the frame: its dials are the look params bloomStrength, bloomRadius, bloomThreshold (0.15 where the place glows, else 0; 0.6; 1), live from ctx.param or the place's look.params. bloomThreshold is the brightness a pixel must pass to glow; its brightest channel in the HDR frame, where white is 1: 1 admits only what is brighter than white (the sun's disc, emissive shells, the brightest lit faces), 0.6 lets ordinary lit surfaces spill; bloomStrength scales every halo: at 0.15, emissiveIntensity 1 barely haloes and 2.5 clearly; an asked glow is 0.4–0.8; bloomRadius spreads it: 0.6 a tight halo, 1.2–1.6 wide light bleed, larger wider still

import { grade, vignette, grain } from "builtin/postfx";
export function look(ctx) {
  const c = grade(ctx.scene, { exposure: 1.05, saturation: 1.1, temperature: 0.1, haze: 0.06, hazeColor: "oklch(0.845 0.032 248.2)" });
  return grain(vignette(c, ctx.param("vignette", 0.25), { color: "oklch(0.121 0.019 283.1)" }), 0.05);
}
````


### After clicking "builtin/vibe"

builtin/vibe: import { stack, seq, s, note, mini, lerp, arrange, scale, progression, arp, chord, silence, clamp01, smoothstep, above, below, between, mapRange } from "builtin/vibe" The live-score pattern algebra for a .vibe.js; export function pattern(ctx) returns a Pattern the engine's scheduler…

audio: { kind: "vibe", script, params, gain, bus, paused } // the score on an object: bus omitted = "Music" (the Music slider reaches it); the pattern reads params only, never entity state; gain 0..2 ramps (0 is silence, not pause: voices keep firing); paused: true freezes the transport and resume continues at the same beat <entity>.audio.params.<name> = v // the hot path: the pattern reads it on the next sim tick; one key per write ctx.getVibeAudio(id): { playing, bpm, bar, barPos, beat, beatPos, cycle, cyclePos, voices: [{ sample, channel, gain, kind }], triggers: [{ sample, when, ageSec }] } | null // the transport clock, not the speakers (bar and beat agree on every machine; a ? hap or a one-shot may differ from what plays); null until anchored; 'did it just hit' = ageSec < 0.06 export function pattern(ctx): Pattern | null // scripts/<name>.vibe.js: every sim tick; ctx.params, ctx.cycle; ctx.setBpm(n) | ctx.setCps(n) | ctx.setSwing(amount) once at the top (setBpm jumps: no ramp; it no-ops when unchanged, so two vibes share a clock only if both set it); null = silence export function on(name, fire, payload) // every ctx.emit(name) in the place; fire(pattern, { quantize: 0.25, cycles: 1 }) layers a one-shot: quantize 0 = now, 1 = the next downbeat; a throw logs once note(pattern), s(pattern), stack(...patterns), seq(...patterns), silence(), mini`…` // "c4" a note, "C" a chord; [a b] a sequence, [a, b] a chord; ~ a rest; <a b> alternate per cycle; a*4 repeat, a/2 slow, a!3 copies, a?0.3 probability; mini spells sharps fs2 (a letter, then s): chord() spells them F#m7 (Fsm7 is plain F major) .s(bank) .gain(g) .pan(p) .lpf(hz) .hpf(hz) .fast(n) .slow(n) .every(n, fn) .swing(a) .humanize(a) .rate(r) .prob(p) .room(0..1) .reverbBus("plate" | "hall") .delaytime(s) .delayfeedback(f) .delayxfeed(x) .delaylpf(hz) .drive(d) .crush(bits) .grain(true) .attack .decay .sustain .release .channel(name) // a Pattern's dots; pads route to hall; .release also fades a sample past its hap window; .channel takes that channel's EQ + reverb defaults .scale(factor) vs .when(cond) // a continuous gain multiply that composes (.gain(0.8).scale(above(0.5, t)) brings a layer in on a knob) vs a binary cut the tick the condition flips: a mid-phrase cut shows arrange([cycles, pattern], …) // sections in turn; each restarts its cycle count scale(key, degrees), progression(romans, key), arp(chords, "up" | "down" | "updown" | "random"), chord(name, octave = 3) // "F#m7", "Dm7/G" clamp01(x), lerp(a, b, t), smoothstep(e0, e1, x), above(threshold, x, fade = 0.05), below(threshold, x, fade = 0.05), between(lo, hi, x, fade = 0.05), mapRange(x, inMin, inMax, outMin, outMax) // param shaping banks: .s() takes a name exactly as the manifest spells it (/cdn/vibe-samples/manifest.json): pitched vsco_{piano,piano_alt,harp,glock,xylo,marimba_loud,cellos,cellos_{spicc,sus_vib,trem},violins_{pizz,spicc,sus_vib,trem},violin_{pizz,spicc,trem,vib},violas_{pizz,spicc,sus_vib,trem},contrabass_{pizz,spicc,sus_nv,sus_vib,trem},flute,flute_{stac,sus_nv,sus_vib},piccolo_{stac,sus},oboe,oboe_{sus,vib},clarinet,clarinet_stac,bassoon_{stac,sus,vib},horn_{mute,stac,sus},trumpet_{stac,sus,sus_vib,harmonmute,strmute},trombone_{stac,sus,vib},tuba_{stac,sus}} (each has a pitch range: transpose or switch, never shift past an octave), synths sawtooth square sine triangle, one-shots bd_* sn_* hat_* ride_* drum_* elec_* perc_* tabla_* glitch_* bass_* guit_* ambi_* loop_* vinyl_* vsco_{organ,timpani} (the manifest lists each); the short words bd sn hh cp kick snare hat clap ride tom piano pad bass bell pluck resolve; an instrument word alone (violins, harp) is a silent voice and a vibe.sample.unknown DM // scripts/score.vibe.js, attached as audio: { kind: "vibe", script: "scripts/score.vibe.js", params: { energy: 0 }, gain: 0.8 }; a driver writes <entity>.audio.params.energy from the player's speed import { stack, note, s, mini, above } from "builtin/vibe"; export function pattern(ctx) { ctx.setBpm(74); const e = ctx.params.energy ?? 0; return stack( note(mini`<[f3 a3 c4] [e3 g3 b3] [d3 f3 a3] [c3 e3 g3]>`).s("vsco_piano").gain(0.5).slow(2), note(mini`<f2 e2 d2 c2>`).s("vsco_cellos_sus_vib").gain(0.4).slow(2).room(0.3), s(mini`bd_jazz ~ [~ bd_jazz] ~`).gain(0.55).scale(above(0.2, e)), s(mini`hat_tap*8`).gain(0.25).hpf(5000).scale(above(0.4, e)), ); } export function on(name, fire) { if (name === "found") fire(note(mini`[c5, e5, g5]`).s("vsco_glock").gain(0.4), { quantize: 0.25 }); }

#### Block 1

````text
audio: { kind: "vibe", script, params, gain, bus, paused } // the score on an object: bus omitted = "Music" (the Music slider reaches it); the pattern reads params only, never entity state; gain 0..2 ramps (0 is silence, not pause: voices keep firing); paused: true freezes the transport and resume continues at the same beat
<entity>.audio.params.<name> = v // the hot path: the pattern reads it on the next sim tick; one key per write
ctx.getVibeAudio(id): { playing, bpm, bar, barPos, beat, beatPos, cycle, cyclePos, voices: [{ sample, channel, gain, kind }], triggers: [{ sample, when, ageSec }] } | null // the transport clock, not the speakers (bar and beat agree on every machine; a ? hap or a one-shot may differ from what plays); null until anchored; 'did it just hit' = ageSec < 0.06
export function pattern(ctx): Pattern | null // scripts/<name>.vibe.js: every sim tick; ctx.params, ctx.cycle; ctx.setBpm(n) | ctx.setCps(n) | ctx.setSwing(amount) once at the top (setBpm jumps: no ramp; it no-ops when unchanged, so two vibes share a clock only if both set it); null = silence
export function on(name, fire, payload) // every ctx.emit(name) in the place; fire(pattern, { quantize: 0.25, cycles: 1 }) layers a one-shot: quantize 0 = now, 1 = the next downbeat; a throw logs once
note(pattern), s(pattern), stack(...patterns), seq(...patterns), silence(), mini`…` // "c4" a note, "C" a chord; [a b] a sequence, [a, b] a chord; ~ a rest; <a b> alternate per cycle; a*4 repeat, a/2 slow, a!3 copies, a?0.3 probability; mini spells sharps fs2 (a letter, then s): chord() spells them F#m7 (Fsm7 is plain F major)
.s(bank) .gain(g) .pan(p) .lpf(hz) .hpf(hz) .fast(n) .slow(n) .every(n, fn) .swing(a) .humanize(a) .rate(r) .prob(p) .room(0..1) .reverbBus("plate" | "hall") .delaytime(s) .delayfeedback(f) .delayxfeed(x) .delaylpf(hz) .drive(d) .crush(bits) .grain(true) .attack .decay .sustain .release .channel(name) // a Pattern's dots; pads route to hall; .release also fades a sample past its hap window; .channel takes that channel's EQ + reverb defaults
.scale(factor) vs .when(cond) // a continuous gain multiply that composes (.gain(0.8).scale(above(0.5, t)) brings a layer in on a knob) vs a binary cut the tick the condition flips: a mid-phrase cut shows
arrange([cycles, pattern], …) // sections in turn; each restarts its cycle count
scale(key, degrees), progression(romans, key), arp(chords, "up" | "down" | "updown" | "random"), chord(name, octave = 3) // "F#m7", "Dm7/G"
clamp01(x), lerp(a, b, t), smoothstep(e0, e1, x), above(threshold, x, fade = 0.05), below(threshold, x, fade = 0.05), between(lo, hi, x, fade = 0.05), mapRange(x, inMin, inMax, outMin, outMax) // param shaping
banks: .s() takes a name exactly as the manifest spells it (/cdn/vibe-samples/manifest.json): pitched vsco_{piano,piano_alt,harp,glock,xylo,marimba_loud,cellos,cellos_{spicc,sus_vib,trem},violins_{pizz,spicc,sus_vib,trem},violin_{pizz,spicc,trem,vib},violas_{pizz,spicc,sus_vib,trem},contrabass_{pizz,spicc,sus_nv,sus_vib,trem},flute,flute_{stac,sus_nv,sus_vib},piccolo_{stac,sus},oboe,oboe_{sus,vib},clarinet,clarinet_stac,bassoon_{stac,sus,vib},horn_{mute,stac,sus},trumpet_{stac,sus,sus_vib,harmonmute,strmute},trombone_{stac,sus,vib},tuba_{stac,sus}} (each has a pitch range: transpose or switch, never shift past an octave), synths sawtooth square sine triangle, one-shots bd_* sn_* hat_* ride_* drum_* elec_* perc_* tabla_* glitch_* bass_* guit_* ambi_* loop_* vinyl_* vsco_{organ,timpani} (the manifest lists each); the short words bd sn hh cp kick snare hat clap ride tom piano pad bass bell pluck resolve; an instrument word alone (violins, harp) is a silent voice and a vibe.sample.unknown DM

// scripts/score.vibe.js, attached as audio: { kind: "vibe", script: "scripts/score.vibe.js", params: { energy: 0 }, gain: 0.8 }; a driver writes <entity>.audio.params.energy from the player's speed
import { stack, note, s, mini, above } from "builtin/vibe";
export function pattern(ctx) {
  ctx.setBpm(74);
  const e = ctx.params.energy ?? 0;
  return stack(
    note(mini`<[f3 a3 c4] [e3 g3 b3] [d3 f3 a3] [c3 e3 g3]>`).s("vsco_piano").gain(0.5).slow(2),
    note(mini`<f2 e2 d2 c2>`).s("vsco_cellos_sus_vib").gain(0.4).slow(2).room(0.3),
    s(mini`bd_jazz ~ [~ bd_jazz] ~`).gain(0.55).scale(above(0.2, e)),
    s(mini`hat_tap*8`).gain(0.25).hpf(5000).scale(above(0.4, e)),
  );
}
export function on(name, fire) {
  if (name === "found") fire(note(mini`[c5, e5, g5]`).s("vsco_glock").gain(0.4), { quantize: 0.25 });
}
````


### After clicking "BespokeGeometrySpec"

Custom geometry buffers for bespoke meshes

positions: flat array of xyz triplets

indices: optional flat array of triangle indices; omit for raw triangle soup (every 3 positions is one triangle, in order)

normals: optional flat array of xyz triplets

uvs: optional flat array of uv pairs

BespokeGeometrySpec = { positions: number[] indices?: number[] normals?: number[] uvs?: number[] colors?: number[] // Per-vertex linear RGB (4 floats each: r,g,b,a). Enables vertex-colored bespoke meshes. emissive?: number[] // Per-vertex emissive RGB (3 floats each). metalness?: number[] // Per-vertex metalness (1 float each). roughness?: number[] // Per-vertex roughness (1 float each). textureRuns?: { texture: string; start: number; count: number }[] // Contiguous triangle-index ranges drawn with a texture (scripted geometry bakes these via ctx.albedo()). instances?: { // The INSTANCE SET: the mesh is drawn as many copies of one object, each copy its own typed record: a grass patch, a flock, a rubble field, a meadow in one draw. `layout` names the record's fields in WebGPU's vertex-format words (`{ offset: "float32x3", yaw: "unorm8", phase: "unorm8" }`, packed at natural alignment, stride rounded to 4 bytes); `data` is every record's components in layout order, flat. Reserved names the engine composes: `offset` (where the copy stands, metres in the object's frame), `yaw` (degrees about +Y; a unorm spans 0..360), `scale` (uniform or x3), `tint` (a colour multiplier); every other field is read in a material as `attribute("phase", "float")`. `lods` are index ranges in three.js LOD order (level 0 from 0 m, each later level from its `distance`), picked by the eye's distance: per copy where `offset` places it, and at full detail a level whose `distance` passes the radius of the whole set's room waits for the room's own distance (a tile's far cards switch with the tile); `bounds` the whole set's room (a swaying set declares it, and is culled); `count` the drawn prefix (default every record), drawn whole on every device: a record is a placement, never thinned. A geometry script declares the same set with `ctx.instances(...)` + `ctx.instance(...)`. `data[i] = v` moves one number. With no `layout` and no `data` the set stores no record: `count` copies, as many as one draw holds, each placed by the material from its copy number (`instanceIndex`), and `bounds` the room it moves them in. A copy a pixel or two wide is a point, not a mesh: a crowd of dots is a `points` row (`jayzee api PointsPrimitiveSpec`). layout?: Record<string, string> data?: number[] count?: number lods?: { indices: [number, number]; distance?: number }[] bounds?: { min: [number, number, number]; max: [number, number, number] } } bounds?: { min: [number, number, number]; max: [number, number, number] } // `bounds` (min/max, metres in the object's frame) is the room the drawn vertices stand in when a material moves them past the triangles, returned by `geometry(ctx)` beside `uvs`; the cull and `.bounds` read it, the collider does not. revision?: number }

#### Block 1

````text
BespokeGeometrySpec = {
  positions: number[]
  indices?: number[]
  normals?: number[]
  uvs?: number[]
  colors?: number[]   // Per-vertex linear RGB (4 floats each: r,g,b,a). Enables vertex-colored bespoke meshes.
  emissive?: number[]   // Per-vertex emissive RGB (3 floats each).
  metalness?: number[]   // Per-vertex metalness (1 float each).
  roughness?: number[]   // Per-vertex roughness (1 float each).
  textureRuns?: { texture: string; start: number; count: number }[]   // Contiguous triangle-index ranges drawn with a texture (scripted geometry bakes these via ctx.albedo()).
  instances?: {   // The INSTANCE SET: the mesh is drawn as many copies of one object, each copy its own typed record: a grass patch, a flock, a rubble field, a meadow in one draw. `layout` names the record's fields in WebGPU's vertex-format words (`{ offset: "float32x3", yaw: "unorm8", phase: "unorm8" }`, packed at natural alignment, stride rounded to 4 bytes); `data` is every record's components in layout order, flat. Reserved names the engine composes: `offset` (where the copy stands, metres in the object's frame), `yaw` (degrees about +Y; a unorm spans 0..360), `scale` (uniform or x3), `tint` (a colour multiplier); every other field is read in a material as `attribute("phase", "float")`. `lods` are index ranges in three.js LOD order (level 0 from 0 m, each later level from its `distance`), picked by the eye's distance: per copy where `offset` places it, and at full detail a level whose `distance` passes the radius of the whole set's room waits for the room's own distance (a tile's far cards switch with the tile); `bounds` the whole set's room (a swaying set declares it, and is culled); `count` the drawn prefix (default every record), drawn whole on every device: a record is a placement, never thinned. A geometry script declares the same set with `ctx.instances(...)` + `ctx.instance(...)`. `data[i] = v` moves one number. With no `layout` and no `data` the set stores no record: `count` copies, as many as one draw holds, each placed by the material from its copy number (`instanceIndex`), and `bounds` the room it moves them in. A copy a pixel or two wide is a point, not a mesh: a crowd of dots is a `points` row (`spawn api PointsPrimitiveSpec`).
    layout?: Record<string, string>
    data?: number[]
    count?: number
    lods?: { indices: [number, number]; distance?: number }[]
    bounds?: { min: [number, number, number]; max: [number, number, number] }
  }
  bounds?: { min: [number, number, number]; max: [number, number, number] }   // `bounds` (min/max, metres in the object's frame) is the room the drawn vertices stand in when a material moves them past the triangles, returned by `geometry(ctx)` beside `uvs`; the cull and `.bounds` read it, the collider does not.
  revision?: number
}
````


### After clicking "BrushDef"

God mode configuration (engine-injected) A god-mode brush: a drag tool in the brush palette. The paintScript exports paint(ctx, p, inset, current), called at points along the drag; it writes a field and/or (for scatter brushes) calls ctx.ensureScatter(spec). default* seed the live,…

paint(ctx, p, inset, current)

ctx.ensureScatter(spec)

default*

BrushDef = { paintScript: ScriptRef label: string icon: string color?: string // The chip's and rings' colour, a CSS colour as `api.authoring.armBrush` takes; omitted, the one default for game brushes. defaultRadius: number defaultStrength: number feather?: number // Edge softness 0..1: the fraction of the radius that fades to zero at the rim, so the full-strength core is `radius * (1 - feather)`. 0 = hard edge, 1 = fade across the whole radius. Omitted: family default (1 terrain sculpt, 0.25 material paint, 0.5 scatter). field?: string // The field a dab writes: `"terrain:height"` (on voxel ground a dab fills or carves whole cells), `"terrain:material:<id>"`, or the game's own field (any name outside `terrain:`, like `"zone:level"`) that `ctx.readField` reads. Undo, every player's view and the replay come with each. Omitted on a scatter brush (`ctx.ensureScatter` binds it). }

#### Block 1

````text
paint(ctx, p, inset, current)
````

#### Block 2

````text
ctx.ensureScatter(spec)
````

#### Block 3

````text
default*
````

#### Block 4

````text
BrushDef = {
  paintScript: ScriptRef
  label: string
  icon: string
  color?: string   // The chip's and rings' colour, a CSS colour as `api.authoring.armBrush` takes; omitted, the one default for game brushes.
  defaultRadius: number
  defaultStrength: number
  feather?: number   // Edge softness 0..1: the fraction of the radius that fades to zero at the rim, so the full-strength core is `radius * (1 - feather)`. 0 = hard edge, 1 = fade across the whole radius. Omitted: family default (1 terrain sculpt, 0.25 material paint, 0.5 scatter).
  field?: string   // The field a dab writes: `"terrain:height"` (on voxel ground a dab fills or carves whole cells), `"terrain:material:<id>"`, or the game's own field (any name outside `terrain:`, like `"zone:level"`) that `ctx.readField` reads. Undo, every player's view and the replay come with each. Omitted on a scatter brush (`ctx.ensureScatter` binds it).
}
````


### After clicking "CameraAttachPositionSpec"

Camera-frame placement: the object rides the viewer's presented camera and its subtree draws in the viewmodel pass (over the world); fov gives the subtree its own projection. See PositionSpec.

CameraAttachPositionSpec = { attach: "camera" x?: number y?: number depth?: number fov?: number }

#### Block 1

````text
CameraAttachPositionSpec = {
  attach: "camera"
  x?: number
  y?: number
  depth?: number
  fov?: number
}
````


### After clicking "CameraOrientationDef"

Held view-axis ownership for custom camera rigs. The declaration holds an axis: an axis that orientation gives the script shows its state exactly, and the player's look never turns it. On an axis the look holds, each write (ctx.self.state.yaw = …) turns the look by its offset from view, and…

ctx.self.state.yaw = …

CameraOrientationDef = { source: "look" | "script" // "look": the engine integrates the look (the mouse and a pad's right stick) at display rate over every axis not in authoredAxes, a script's write turning it by its offset from the view (shown exactly when the rig reads input.axes.lookX / lookY), and publishes the view as ctx.self.view.yaw / .pitch (radians). "script": the script owns yaw/pitch on every tick (its state is displayed exactly, written or not), and authors the pose: a rotation it writes is drawn whole, roll included. authoredAxes?: ("yaw" | "pitch")[] // Per-axis refinement of `source`: axes listed here are the script's on every tick, displayed exactly; axes omitted are the look's, and a script's write turns them (a rig that reads input.axes.lookX / lookY sees its write exactly). Defaults by source: "script" → ["yaw", "pitch"], "look" → []. }

#### Block 1

````text
ctx.self.state.yaw = …
````

#### Block 2

````text
CameraOrientationDef = {
  source: "look" | "script"   // "look": the engine integrates the look (the mouse and a pad's right stick) at display rate over every axis not in authoredAxes, a script's write turning it by its offset from the view (shown exactly when the rig reads input.axes.lookX / lookY), and publishes the view as ctx.self.view.yaw / .pitch (radians). "script": the script owns yaw/pitch on every tick (its state is displayed exactly, written or not), and authors the pose: a rotation it writes is drawn whole, roll included.
  authoredAxes?: ("yaw" | "pitch")[]   // Per-axis refinement of `source`: axes listed here are the script's on every tick, displayed exactly; axes omitted are the look's, and a script's write turns them (a rig that reads input.axes.lookX / lookY sees its write exactly). Defaults by source: "script" → ["yaw", "pitch"], "look" → [].
}
````


### After clicking "CreatorTabDef"

A god-mode authoring tab in the top-right rail. God-mode only: the play-mode ui HUD is a separate surface, untouched. Tabs are ordered, and each starts closed: a press on a tab opens its panel, and a second press closes it. Each tab is ONE script module: its default export is `render(ctx, player)…

CreatorTabDef = { id: string // Stable id: selection + lifecycle key. title: string // Tab title shown in the rail. icon: string // Icon: emoji or CDN url. script: ScriptRef // The panel module (default export = render; optional named onMount/onDestroy). shortcut?: string // Optional keyboard shortcut to focus/toggle the tab. }

#### Block 1

````text
CreatorTabDef = {
  id: string   // Stable id: selection + lifecycle key.
  title: string   // Tab title shown in the rail.
  icon: string   // Icon: emoji or CDN url.
  script: ScriptRef   // The panel module (default export = render; optional named onMount/onDestroy).
  shortcut?: string   // Optional keyboard shortcut to focus/toggle the tab.
}
````


### After clicking "CubicBezierSpec"

Cubic bezier segment for paths

CubicBezierSpec = { from: SplinePointSpec c1: SplinePointSpec c2: SplinePointSpec to: SplinePointSpec }

#### Block 1

````text
CubicBezierSpec = {
  from: SplinePointSpec
  c1: SplinePointSpec
  c2: SplinePointSpec
  to: SplinePointSpec
}
````


### After clicking "CustomPrimitiveSpec"

Custom geometry primitive (bespoke mesh)

CustomPrimitiveSpec = { kind: "custom" geometry: BespokeGeometrySpec forward?: ForwardAxis // The axis the mesh was modelled to face (default "-z"); the engine turns the geometry to −Z once. A child's `feetPosition` does not turn: it stays in the object's frame, whose front is −Z. sockets?: PrimitiveSockets // Named points in the modelled frame (metres from the feet): a child's `attachment: { socket }` anchor and `getObjectSocket`'s answer. }

#### Block 1

````text
CustomPrimitiveSpec = {
  kind: "custom"
  geometry: BespokeGeometrySpec
  forward?: ForwardAxis   // The axis the mesh was modelled to face (default "-z"); the engine turns the geometry to −Z once. A child's `feetPosition` does not turn: it stays in the object's frame, whose front is −Z.
  sockets?: PrimitiveSockets   // Named points in the modelled frame (metres from the feet): a child's `attachment: { socket }` anchor and `getObjectSocket`'s answer.
}
````


### After clicking "ForceEntrySpec"

One held load in the forces bag (ctx.self.forces.<key>): Newtons / N·m on world axes; position is the world-space point the force lands at. At least one of force/torque.

ForceEntrySpec = { force?: Vec3 position?: Vec3 torque?: Vec3 }

#### Block 1

````text
ForceEntrySpec = {
  force?: Vec3
  position?: Vec3
  torque?: Vec3
}
````


### After clicking "GameSpec"

Complete game specification Places:

Use places for multi-scene worlds. Main world is places.main.

places.main

Each place can define terrain, atmosphere, objects, default jayzee point, and default jayzee rotation.

defaultPlace controls where new players jayzee (defaults to "main").

Legacy…

GameSpec = { buyables?: Record<string, BuyableDef> // Buyable registry (buyableId -> buyable definition) achievements?: Record<string, AchievementDef> // Achievements Jayzee lists on the game's page (milestone name -> achievement) leaderboards?: Record<string, LeaderboardDef> // Boards Jayzee ranks on the game's page (board id -> the player.state row it ranks) inputs?: InputsDef // Input bindings player?: PlayerDef // Player template camera?: CameraDef // Camera configuration material?: MaterialSpec // The base every object's `material` merges over per key: a bare object wears it whole, `{ texture }` keeps its roughness under the texture, an explicit material wins on every key it names; a place's own stands over it. Absent, nothing merges. lighting?: string // The lighting function's file: `"scripts/lighting.js"`, exporting lighting(surface, lights) → the colour of every lit surface; a place's own stands over it. Absent, the engine's standard model. sky?: string // The sky function's file: `"scripts/sky.js"`, exporting sky(ray, world) → the sky's colour per direction, drawn by the dome and the light's capture alike; a place's own stands over it. Absent, the engine's physical sky. Its terms are the physical sky's own, as builtin/tsl nodes: ray.direction; world.atmosphere (the day sky, no sun disc), world.night (the moon, the stars, the moonlit wash), world.clouds() (the cloud layer as straight rgba: .rgb lit, .a cover), world.sun and world.moon (.direction, .radiance, .disc(size)), world.param(name, default). audio?: WorldAudioPolicy // The game's mix under the player's sliders: gains per bus, the voice budget, the cull distance (`jayzee api WorldAudioPolicy`). Absent, the engine's defaults. passThrough?: Record<string, string[]> // Which collision layers pass through which: `{ car: ["car"] }` (a body names its layer with `physics.layer`). A pair passes both ways; "player" always passes through "player", and every other pair not named collides. ui?: GameUIDef // UI overlay godMode?: GodModeConfig // God mode configuration. creatorUi?: UIDef // Creator UI overlay (engine-injected, mounted during god mode). deprecated: Superseded by `creatorTabs`. No longer compiled into the god-mode rail (hard-cut in the creator-tabs version); migrate via the engine version's migrationNotes. creatorTabs?: CreatorTabDef[] // God-mode authoring tabs (top-right rail), in rail order; a mod's tab (its mod.json `tab`) is not listed. Each starts closed until the creator presses it. engine?: EngineConfig // Engine configuration (networking) routing?: RoutingDef // Room routing: names a pickRoom(ctx) script and the per-room player cap places?: Record<string, PlaceDef> // Places (NEW) defaultPlace?: string // Default place for new players (default: "main") earshot?: number // Earshot in metres: how far a voice carries, and above ten players a said line and a nameplate. With ten or fewer players a said line reaches the whole room, a nameplate stands over everyone in the viewer's place, and a voice reaches the whole room until chat.js has a voice room. Default 40 when absent. A town square wants it wide, a whisper game tight. voiceMood?: "cave" | "hall" | "open" // The room's voice mood; the reverb every heard voice wears in this world: `cave` (long and wet), `hall` (a room's bloom), `open` (dry; the default when absent). One word, nothing in the UI. nameplates?: boolean // Names over other players' heads, within earshot. Default true; false hides every one: hide-and-seek, horror. voice?: boolean // Voice chat between players in this world. Default true; false turns it off: nobody can join voice here (a menu game, a quiet puzzle). nametag?: string // The tag over other players' heads as a render file in this tree (every starter ships `ui/nametag.js`): `export default function (ctx, tag) { return html }`: the shape `ui.js` has, called per tag when its facts move or what it reads through `ctx` moves, `<style>` rides the string; absent, the engine's default: the same file. chat?: string // The world's chat file: `"scripts/chat.js"`, exporting `scopes` (a channel = who is in it and who may post: `{ trade: { in: (ctx, p) => …, post: (ctx, p) => …, slow, waits } }`, code over the player's rows), `character` (the player.state row shown as the name on the tag) and `profile` (at most four player.state rows, one dim line under it). Absent, chat is `say` alone. assets?: { // Asset metadata cache: persisted per-model derived data (bounds, semantic sockets) for CDN models, refreshed when extraction semantics change. metadata?: Record<string, AssetMetadata> authoredClips?: Record<string, AuthoredClipEntry | null> // A 5.x document's script-authored animation clips, keyed by identity (`<scriptRef>#<fnName>` / `tracks#<name>`): sampled keyframe tracks. A 6.0 world keeps each clip as its own file under clips/; the conversion writes one file per entry and none for a `null` (an identity a sweep evicted). } }

#### Block 1

````text
places.main
````

#### Block 2

````text
GameSpec = {
  buyables?: Record<string, BuyableDef>   // Buyable registry (buyableId -> buyable definition)
  achievements?: Record<string, AchievementDef>   // Achievements Spawn lists on the game's page (milestone name -> achievement)
  leaderboards?: Record<string, LeaderboardDef>   // Boards Spawn ranks on the game's page (board id -> the player.state row it ranks)
  inputs?: InputsDef   // Input bindings
  player?: PlayerDef   // Player template
  camera?: CameraDef   // Camera configuration
  material?: MaterialSpec   // The base every object's `material` merges over per key: a bare object wears it whole, `{ texture }` keeps its roughness under the texture, an explicit material wins on every key it names; a place's own stands over it. Absent, nothing merges.
  lighting?: string   // The lighting function's file: `"scripts/lighting.js"`, exporting lighting(surface, lights) → the colour of every lit surface; a place's own stands over it. Absent, the engine's standard model.
  sky?: string   // The sky function's file: `"scripts/sky.js"`, exporting sky(ray, world) → the sky's colour per direction, drawn by the dome and the light's capture alike; a place's own stands over it. Absent, the engine's physical sky. Its terms are the physical sky's own, as builtin/tsl nodes: ray.direction; world.atmosphere (the day sky, no sun disc), world.night (the moon, the stars, the moonlit wash), world.clouds() (the cloud layer as straight rgba: .rgb lit, .a cover), world.sun and world.moon (.direction, .radiance, .disc(size)), world.param(name, default).
  audio?: WorldAudioPolicy   // The game's mix under the player's sliders: gains per bus, the voice budget, the cull distance (`spawn api WorldAudioPolicy`). Absent, the engine's defaults.
  passThrough?: Record<string, string[]>   // Which collision layers pass through which: `{ car: ["car"] }` (a body names its layer with `physics.layer`). A pair passes both ways; "player" always passes through "player", and every other pair not named collides.
  ui?: GameUIDef   // UI overlay
  godMode?: GodModeConfig   // God mode configuration.
  creatorUi?: UIDef   // Creator UI overlay (engine-injected, mounted during god mode). deprecated: Superseded by `creatorTabs`. No longer compiled into the god-mode rail (hard-cut in the creator-tabs version); migrate via the engine version's migrationNotes.
  creatorTabs?: CreatorTabDef[]   // God-mode authoring tabs (top-right rail), in rail order; a mod's tab (its mod.json `tab`) is not listed. Each starts closed until the creator presses it.
  engine?: EngineConfig   // Engine configuration (networking)
  routing?: RoutingDef   // Room routing: names a pickRoom(ctx) script and the per-room player cap
  places?: Record<string, PlaceDef>   // Places (NEW)
  defaultPlace?: string   // Default place for new players (default: "main")
  earshot?: number   // Earshot in metres: how far a voice carries, and above ten players a said line and a nameplate. With ten or fewer players a said line reaches the whole room, a nameplate stands over everyone in the viewer's place, and a voice reaches the whole room until chat.js has a voice room. Default 40 when absent. A town square wants it wide, a whisper game tight.
  voiceMood?: "cave" | "hall" | "open"   // The room's voice mood; the reverb every heard voice wears in this world: `cave` (long and wet), `hall` (a room's bloom), `open` (dry; the default when absent). One word, nothing in the UI.
  nameplates?: boolean   // Names over other players' heads, within earshot. Default true; false hides every one: hide-and-seek, horror.
  voice?: boolean   // Voice chat between players in this world. Default true; false turns it off: nobody can join voice here (a menu game, a quiet puzzle).
  nametag?: string   // The tag over other players' heads as a render file in this tree (every starter ships `ui/nametag.js`): `export default function (ctx, tag) { return html }`: the shape `ui.js` has, called per tag when its facts move or what it reads through `ctx` moves, `<style>` rides the string; absent, the engine's default: the same file.
  chat?: string   // The world's chat file: `"scripts/chat.js"`, exporting `scopes` (a channel = who is in it and who may post: `{ trade: { in: (ctx, p) => …, post: (ctx, p) => …, slow, waits } }`, code over the player's rows), `character` (the player.state row shown as the name on the tag) and `profile` (at most four player.state rows, one dim line under it). Absent, chat is `say` alone.
  assets?: {   // Asset metadata cache: persisted per-model derived data (bounds, semantic sockets) for CDN models, refreshed when extraction semantics change.
    metadata?: Record<string, AssetMetadata>
    authoredClips?: Record<string, AuthoredClipEntry | null>   // A 5.x document's script-authored animation clips, keyed by identity (`<scriptRef>#<fnName>` / `tracks#<name>`): sampled keyframe tracks. A 6.0 world keeps each clip as its own file under clips/; the conversion writes one file per entry and none for a `null` (an identity a sweep evicted).
  }
}
````


### After clicking "GodModeVisualSpec"

GodModeVisualSpec = ObjectProperties & { children?: ObjectSpec[] tags?: string[] }

#### Block 1

````text
GodModeVisualSpec = ObjectProperties & {
  children?: ObjectSpec[]
  tags?: string[]
}
````


### After clicking "InputActionTouchDef"

Touch options for one action (optional). Touch controls are auto-projected: on touch devices, every action with a key/mouse binding gets an on-screen button automatically (capped at 4, jump-like actions first). button/label/slot tune that projection. gesture binds the action to the WORLD…

InputActionTouchDef = { button?: boolean // Force-include (true) or exclude (false) this action from the auto-projected touch buttons. Defaults to included when the action has a key/mouse binding (and excluded when the action binds a gesture). label?: string // Button label override. Keep it short (chips fit ~6 characters); defaults to the action name. slot?: 1 | 2 | 3 | 4 // Preferred button slot: 1 = primary (largest, innermost), 4 = outermost. gesture?: "tap" | "double-tap" | "hold" | "press" // World-pointer gesture that fires this action on touch devices: "tap", "double-tap", "hold" or "press" on the world itself, delivered with `input.pointer` at the finger under every camera. tags?: string[] // With gesture "press": its thing's tags, all of them. Only a finger on that thing or its part presses it. A finger that no press takes turns the camera. }

#### Block 1

````text
InputActionTouchDef = {
  button?: boolean   // Force-include (true) or exclude (false) this action from the auto-projected touch buttons. Defaults to included when the action has a key/mouse binding (and excluded when the action binds a gesture).
  label?: string   // Button label override. Keep it short (chips fit ~6 characters); defaults to the action name.
  slot?: 1 | 2 | 3 | 4   // Preferred button slot: 1 = primary (largest, innermost), 4 = outermost.
  gesture?: "tap" | "double-tap" | "hold" | "press"   // World-pointer gesture that fires this action on touch devices: "tap", "double-tap", "hold" or "press" on the world itself, delivered with `input.pointer` at the finger under every camera.
  tags?: string[]   // With gesture "press": its thing's tags, all of them. Only a finger on that thing or its part presses it. A finger that no press takes turns the camera.
}
````


### After clicking "LinePrimitiveSpec"

Line primitive (three's Line2): a line through points (metres in the object's frame), each joined to the next, drawn as wide across the screen as its scripted material's linewidth (LineBasicNodeMaterial / Line2NodeMaterial, jayzee api builtin/three: CSS pixels, or metres with worldUnits),…

jayzee api builtin/three

worldUnits

LinePrimitiveSpec = { kind: "line" points?: [number, number, number][] segments?: boolean count?: number bounds?: { min: [number, number, number]; max: [number, number, number] } }

#### Block 1

````text
spawn api builtin/three
````

#### Block 2

````text
worldUnits
````

#### Block 3

````text
LinePrimitiveSpec = {
  kind: "line"
  points?: [number, number, number][]
  segments?: boolean
  count?: number
  bounds?: { min: [number, number, number]; max: [number, number, number] }
}
````


### After clicking "ModelPartStateSpec"

Per-part state for model.parts.<name>: any mesh node or material the model's file names (a ?parts= cut names its pieces), on any address. A superset of the per-part material paint (materials): every standard-material field, or a scripted material ({ kind: "scripted", script, params }, the…

model.parts.<name>

?parts=

ModelPartStateSpec = (Omit<StandardMaterialSpec, "time" | "timeAt" | "paused" | "speed"> | ScriptedMaterialSpec) & { visible?: boolean // Hide or show this piece. Defaults to visible. }

#### Block 1

````text
model.parts.<name>
````

#### Block 2

````text
?parts=
````

#### Block 3

````text
ModelPartStateSpec = (Omit<StandardMaterialSpec, "time" | "timeAt" | "paused" | "speed"> | ScriptedMaterialSpec) & {
  visible?: boolean   // Hide or show this piece. Defaults to visible.
}
````


### After clicking "ObjectDef"

ObjectDef = ObjectProperties & { id: string parent?: string // Parent object ID for explicit flat hierarchy declarations. children?: ObjectSpec[] // Child objects, a thing made of pieces is ONE jayzee: light, fx, sound too are its children at local offsets under this root; move the root, the thing moves. state?: Record<string, unknown> // Initial game state: applied before onSpawn runs, merged with persisted data tags?: string[] behavior?: BehaviorRef // Script ref(s), e.g. "scripts/cow.js" audience?: ObjectAudience // who sees it: "near" (default) | "all" | "local"; see ObjectAudience simulatedBy?: PlatformDial // who simulates it: "platform" runs the row on Jayzee's own machine, even in a room of one; see PlatformDial visibility?: ObjectVisibility // who may hear it at all: absent (everyone the audience names) | "owner" | "platform"; see ObjectVisibility lifetime?: number // Auto-destroy after N seconds. }

#### Block 1

````text
ObjectDef = ObjectProperties & {
  id: string
  parent?: string   // Parent object ID for explicit flat hierarchy declarations.
  children?: ObjectSpec[]   // Child objects, a thing made of pieces is ONE spawn: light, fx, sound too are its children at local offsets under this root; move the root, the thing moves.
  state?: Record<string, unknown>   // Initial game state: applied before onSpawn runs, merged with persisted data
  tags?: string[]
  behavior?: BehaviorRef   // Script ref(s), e.g. "scripts/cow.js"
  audience?: ObjectAudience   // who sees it: "near" (default) | "all" | "local"; see ObjectAudience
  simulatedBy?: PlatformDial   // who simulates it: "platform" runs the row on Spawn's own machine, even in a room of one; see PlatformDial
  visibility?: ObjectVisibility   // who may hear it at all: absent (everyone the audience names) | "owner" | "platform"; see ObjectVisibility
  lifetime?: number   // Auto-destroy after N seconds.
}
````


### After clicking "PivotSpec"

Rotation pivot. Three costumes, one meaning each:

keyword "feet" | "center" | "top": sugar for the normalized triples below

bare array [u, v, w]: bounds-NORMALIZED (0 = min, 1 = max along each entity-local axis; v is

up, so v=0 is the feet plane); "feet" = [0.5,0,0.5], "center" = [0.5,0.5,0.5],…

PivotSpec = | "feet" | "center" | "top" | [u: number, v: number, w: number] | { x: number; y: number; z: number } // 3D vector with x, y, z components

#### Block 1

````text
PivotSpec =
  | "feet"
  | "center"
  | "top"
  | [u: number, v: number, w: number]
  | { x: number; y: number; z: number }   // 3D vector with x, y, z components
````


### After clicking "PointsPrimitiveSpec"

Points primitive (three's Points): count points, drawn by the object's scripted PointsNodeMaterial (jayzee api builtin/three): its positionNode places point instanceIndex in the object's frame, sizeNode sizes it in CSS pixels, colorNode and opacityNode colour it. bounds (min/max, metres in…

PointsPrimitiveSpec = { kind: "points" count: number // how many points, one round point a copy (instanceIndex 0 to count − 1), each placed by the object's PointsNodeMaterial (builtin/three): positionNode, sizeNode in CSS pixels bounds?: { min: [number, number, number]; max: [number, number, number] } }

#### Block 1

````text
PointsPrimitiveSpec = {
  kind: "points"
  count: number   // how many points, one round point a copy (instanceIndex 0 to count − 1), each placed by the object's PointsNodeMaterial (builtin/three): positionNode, sizeNode in CSS pixels
  bounds?: { min: [number, number, number]; max: [number, number, number] }
}
````


### After clicking "PressContactSpec"

One contact on the ground cover: radius m the blades lean within, strength 0..1 how far (1 lays them flat; default 1), at metres from the feet turned with the object: [x, y, z] or { x, y?, z } (y omitted = the feet's plane; default the feet), below metres straight down from at to the…

PressContactSpec = { radius: number strength?: number at?: [number, number, number] below?: number }

#### Block 1

````text
PressContactSpec = {
  radius: number
  strength?: number
  at?: [number, number, number]
  below?: number
}
````


### After clicking "RectangleSplineShapeSpec"

RectangleSplineShapeSpec = { kind: "rectangle" center: SplinePointSpec width: number depth: number yaw?: number }

#### Block 1

````text
RectangleSplineShapeSpec = {
  kind: "rectangle"
  center: SplinePointSpec
  width: number
  depth: number
  yaw?: number
}
````


### After clicking "RoadRoadsideSpec"

RoadRoadsideSpec = { sidewalks?: boolean | RoadSidewalksSpec hedges?: boolean | RoadHedgesSpec lampPosts?: boolean | RoadLampPostsSpec markings?: boolean | RoadMarkingsSpec }

#### Block 1

````text
RoadRoadsideSpec = {
  sidewalks?: boolean | RoadSidewalksSpec
  hedges?: boolean | RoadHedgesSpec
  lampPosts?: boolean | RoadLampPostsSpec
  markings?: boolean | RoadMarkingsSpec
}
````


### After clicking "RoomSpec"

Room appearance spec (auto floor + walls).

RoomSpec = { width: number // Room width in meters. depth: number // Room depth in meters. height?: number // Wall height in meters (default: 4). wallThickness?: number // Wall thickness in meters (default: 0.5). floorThickness?: number // Floor thickness in meters (default: 0.2). ceiling?: boolean // Whether to add a ceiling (default: false). material?: MaterialSpec // Default material for floor/walls/ceiling. wallMaterial?: MaterialSpec // Wall material override. floorMaterial?: MaterialSpec // Floor material override. ceilingMaterial?: MaterialSpec // Ceiling material override. openings?: RoomOpening[] // Optional full-height wall openings. }

#### Block 1

````text
RoomSpec = {
  width: number   // Room width in meters.
  depth: number   // Room depth in meters.
  height?: number   // Wall height in meters (default: 4).
  wallThickness?: number   // Wall thickness in meters (default: 0.5).
  floorThickness?: number   // Floor thickness in meters (default: 0.2).
  ceiling?: boolean   // Whether to add a ceiling (default: false).
  material?: MaterialSpec   // Default material for floor/walls/ceiling.
  wallMaterial?: MaterialSpec   // Wall material override.
  floorMaterial?: MaterialSpec   // Floor material override.
  ceilingMaterial?: MaterialSpec   // Ceiling material override.
  openings?: RoomOpening[]   // Optional full-height wall openings.
}
````


### After clicking "RotationSpec"

Rotation specification Y-up coordinate system:

yaw: CCW about +Y (0 faces -Z)

pitch: CCW about +X (positive looks up)

roll: CCW about +Z

number: yaw in degrees

{ yaw, pitch, roll }: euler degrees, composed yaw → pitch → roll (three.js "YXZ", intrinsic)

{ x, y, z, w }: quaternion

The…

RotationSpec = | number | { yaw?: number; pitch?: number; roll?: number } | { x: number; y: number; z: number; w: number } | { lookAt: PositionSpec; include?: ("yaw" | "pitch" | "roll")[] }

#### Block 1

````text
RotationSpec =
  | number
  | { yaw?: number; pitch?: number; roll?: number }
  | { x: number; y: number; z: number; w: number }
  | { lookAt: PositionSpec; include?: ("yaw" | "pitch" | "roll")[] }
````


### After clicking "SplineLightStripsSpec"

SplineLightStripsSpec = { color?: Color intensity?: number width?: number }

#### Block 1

````text
SplineLightStripsSpec = {
  color?: Color
  intensity?: number
  width?: number
}
````


### After clicking "Sprite2DMetaSpec"

The 2d slice of a sprite texture's MCDN jayzee.meta, carried in spec.assets.metadata under canonicalSpriteMetaTextureId(texture). Field names follow the MCDN raw names (world_height, anchor_uv, content_box) so the derive is parse→filter→upload with no rename layer.

jayzee.meta

spec.assets.metadata

canonicalSpriteMetaTextureId(texture)

Sprite2DMetaSpec = { outline?: [number, number][] // Normalized image-space points at any count (x right, y DOWN), all collider parts merged. Absent = no hull. world_height?: number // Declared in-game height in world units (finite > 0): generation-time intent. target_size?: number // Published square texture side in px (finite > 0; dormant today, kept as MCDN contract). style?: "pixel" | "non-pixel" kind?: "sprite" | "texture" // Gates ALL upgrades: kind !== "sprite" ⇒ no size/anchor/aspect. anchor_uv?: [number, number] // Generation-chosen anchor, image space [0,1]² (foot line for side views). view?: string // Declared camera view ("side" | "topdown" | …); topdown never foot-anchors. content_box?: [number, number, number, number] // Alpha-tight crop rect, UV [x, y, w, h]; w/h > 0. }

#### Block 1

````text
spawn.meta
````

#### Block 2

````text
spec.assets.metadata
````

#### Block 3

````text
canonicalSpriteMetaTextureId(texture)
````

#### Block 4

````text
Sprite2DMetaSpec = {
  outline?: [number, number][]   // Normalized image-space points at any count (x right, y DOWN), all collider parts merged. Absent = no hull.
  world_height?: number   // Declared in-game height in world units (finite > 0): generation-time intent.
  target_size?: number   // Published square texture side in px (finite > 0; dormant today, kept as MCDN contract).
  style?: "pixel" | "non-pixel"
  kind?: "sprite" | "texture"   // Gates ALL upgrades: kind !== "sprite" ⇒ no size/anchor/aspect.
  anchor_uv?: [number, number]   // Generation-chosen anchor, image space [0,1]² (foot line for side views).
  view?: string   // Declared camera view ("side" | "topdown" | …); topdown never foot-anchors.
  content_box?: [number, number, number, number]   // Alpha-tight crop rect, UV [x, y, w, h]; w/h > 0.
}
````


### After clicking "StandardMaterialSpec"

Material configuration for primitives and models

color: OKLCH string (e.g., "oklch(0.65 0.25 25)")

texture: CDN path to texture; a video's address plays on the surface, a screen in the world: an .mp4 clip loops from its start, an .m3u8 address plays its live stream. The picture is silent:…

StandardMaterialSpec = { texture?: string | null // "cdn/x.png"; null: no picture (three's map = null). A model part reads "#<name>": the picture its model draws there. time?: number // The .mp4 clip's playhead in seconds: every player's screen shows `paused ? time : time + speed * (ctx.now() - timeAt) / 1000`, and a write jumps every screen. One address is one clip: the newest write on any surface wearing it moves it. An .m3u8 plays its live point. timeAt?: number // World-clock milliseconds (ctx.now()) at which `time` applies; the engine stamps it for you. paused?: boolean // true freezes the .mp4 clip on every player's screen on the frame it shows; false resumes it from the frame it holds. speed?: number // The .mp4 clip's playback speed on every player's screen (default 1; 0.5 is half speed): a write keeps the frame it shows and plays on at the new speed. view?: { link: string; oneWay?: boolean; spill?: number; sound?: number } | { camera: ViewCamera; cadence?: string; size?: number } | null // A view: the surface shows a place, drawn live. It fills the whole face exactly once (a viewport, never tiled); `texture` is ignored when `view` is set. `view: { link: "world:<id>" }` is a door's glass: the linked world or place seen through the face. Until that world's feed delivers it is a dim panel tinted with the world's own identity hue (deterministic, never an error). Both faces of an upright glass are windows, each showing the far world from its own side's landing; `oneWay: true` makes a one-sided door: the back face is a veiled wall and the door's trigger refuses a traveler on that side. A glass lying flat is a hole: looking down through it, you see the far place from one body length above the linked thing, looking where you look; looking up, the sky over it. So link a floor glass to a thing on the ground of what the floor should show. `spill` is how much of the far world's light comes through the aperture onto this world's ground and walls (0 none, 1 what a hole in a wall lets through: the default, 2 twice that); `sound` how much of the far world's sound is heard through it (0 a silent door, 1 physical: the default). A link to another world with no `@ref` shows it at the viewer's own copy: its build while they build, its live game while they play. `@live` in the link always shows the live game, `@dev` always the build. `view: { camera }` shows this place from a camera, or with `camera.place` another place of this world (`jayzee api ViewCamera`): `camera: "mirror"` is a mirror, `camera: { eye, aim, fov }` a camera you place (a security monitor, a map), `camera: { parent: id }` one that rides a thing. The face's own `color` shows until its picture draws. `cadence: "1s"` draws one new picture a second, and `size: 256` draws it 256 pixels on its longer side; the engine serves both within the frame, and with neither it fits them to the face on the screen. canvas?: string | null // The id of a `<canvas>` in the game's ui: the surface shows it live, as the ui's script draws it (three's CanvasTexture). It fills the shape's own 0..1 UVs once, so a scripted screen returns `{ uvs }` 0..1; `repeat` and `wrap: "repeat"` tile it. It wins over `texture`, and a `view` wins over it. `material.canvas = "crt"` wears `<canvas id="crt">`; each player sees the canvas their own page drew. A name no canvas answers leaves the face its own colour, and null takes the canvas off. A canvas uploads every frame while a face wearing it is in view, so draw it at the size the glass needs. pbr?: boolean | "fal1" // true derives normal/roughness/metalness from the texture; omitted or false derives nothing, and a false you write reads back as false (ground materials differ: a heightmap albedo wears PBR unless pbr: false) normalMap?: string // three's map names at three's channels, linear data: a normal map; a roughness map (.g × roughness: unset roughness beside it lets the map own the surface); a metalness map (.b × metalness: unset metalness beside it reads as metal); an alpha map (.g × the texture's alpha: coverage under transparent, the cut under alphaTest). pbr: true derives the first three from the texture. three's other maps (displacementMap, aoMap, bumpMap) go on a scripted material's node material, as in three: m.displacementMap = ctx.texture(cdn) roughnessMap?: string metalnessMap?: string alphaMap?: string normalScale?: number // three's normalScale on a primitive: the normal map's relief × this (default 1; 0 flat; negative inverts it) alphaTest?: number // three's alphaTest: the alpha cutoff (0..1) under which a texel is cut color?: Color // beside a texture: recolours it, keeping its light and dark, by the colour's saturation (white = no-op, grey darkens); three's texel × colour: multiply in its texture script repeat?: [number, number] // [u,v] copies across the face; under wrap repeat, × the 1-tile-per-meter density textureScale?: number // meters per tile under wrap: "repeat" (divides the 1-tile-per-meter density; default 1); without wrap: "repeat" it reads nothing wrap?: "repeat" | "clamp" // omitted: the picture once across the surface: once around a sphere (a planet's equirectangular map), once per face of a box; repeat then counts copies. "repeat": the one word that tiles it, one tile per meter (fabric, brick, felt); the texture's name never decides filter?: "pixel" | "linear" // How the pictures this material names are sampled, as sprite.filter: "pixel" is three's NearestFilter up close (crisp pixel art, every texel a hard square), "linear" smooth. Unset: each picture's own default metalness?: number roughness?: number opacity?: number transparent?: boolean emissive?: Color // a Color; emissiveIntensity scales it emissiveIntensity?: number emissiveMap?: string // three's emissiveMap: a picture (sRGB) whose texels × emissive × emissiveIntensity light the surface; emissive must be set (black, the default, lights nothing) unlit?: boolean // true skips lighting: the color/texture and emissive land flat, no shade or shadow on the surface (three's MeshBasicMaterial); default false dissolve?: number // 0 intact → 1 gone; tween it for a spawn-in / death-out side?: "front" | "back" | "double" // three's side. A primitive draws every face unless set: "front" draws only the faces toward the viewer (a room's lining seen from inside and invisible from outside: it still casts its shadow), "back" only the faces away, "double" both. A model part: "double" for thin geometry seen from both sides vertexColors?: boolean // three's vertexColors. A model part: true (the default where its mesh has vertex colours, as three's GLTFLoader sets it) multiplies them into the colour; false draws the part as color × texture, so shading baked into the vertices is gone, not lightened. Models only: a primitive does not read it, so a custom primitive's colors still draw depthWrite?: boolean depthTest?: boolean renderOrder?: number // draw order among transparent things (higher draws later); in a 2D place it is a mesh's layer among sprite sortingLayers; a part that must read through another part of its own character wears drawsOver instead drawsOver?: string[] | { parts: string[]; strength?: number; angle?: number } // a model part: the names of parts of the same character this part shows through when they cover it (a character's eyes through that character's own hair): a see-through copy blended at strength (0..1, default 0.5) while the camera is within angle degrees of the part's facing (0..180, default 60); a bare array takes both defaults. The copy shows only through the named parts where they are solid (not blended); a solid surface in front of them, a hand or another character, hides it; a see-through or blended surface in front does not hide it and the copy draws over it. Under a player's "jaggies: no" setting the copy is not drawn and the part draws as it would without the word outline?: boolean | { color?: Color; width?: number; warm?: number; lightness?: number } | null // an ink line around it: true = a 2-pixel line in a darker shade of its own colour, lit as it is lit; width = that many pixels (of a 1080p picture) up close, up to 63 pixels of the picture drawn; color = shown as given, up to 0.9 of white on each channel; with no color, lightness = the shade's share of its surface's lightness (0..1, default 0.58) and warm = how far the shade leans to a warm brown (0..1, default 0); every line thins with distance and fogs as the world does; drawn only around opaque solids polygonOffset?: boolean // three's polygon offset: true biases this surface's depth by polygonOffsetFactor × its depth slope + polygonOffsetUnits × the depth step, negative toward the eye: a decal quad lying on a floor or a wall wins the depth test at every distance and angle (-1, -1 is the usual pair). Primitives only; its shadow ignores it polygonOffsetFactor?: number polygonOffsetUnits?: number blending?: "none" | "normal" | "additive" | "subtractive" | "multiply" | "custom" // three's blending, on a transparent surface: "normal" (default), "additive", "subtractive", "multiply", "none", or "custom", three's CustomBlending, which reads blendSrc (default "src-alpha"), blendDst ("one-minus-src-alpha") and blendEquation ("add"); the Alpha three take the alpha channel's, unset the colour's. "min" and "max" read no factor blendSrc?: BlendFactor blendDst?: BlendFactor blendEquation?: BlendEquation blendSrcAlpha?: BlendFactor blendDstAlpha?: BlendFactor blendEquationAlpha?: BlendEquation premultipliedAlpha?: boolean // three's premultipliedAlpha: the colour leaves multiplied by its alpha and the blend reads it so colorWrite?: boolean // three's colorWrite: false draws depth and no colour, an invisible mask that hides what draws after it (the sea and every see-through thing; solids with a higher renderOrder): a boat's hull keeps the water out under a mask at its waterline. Costs one draw that writes depth alone clippingPlanes?: ClipPlane[] | null // three's clippingPlanes, up to 8: the surface is cut where normal · p + constant < 0 for any plane, or for every plane under clipIntersection; clipShadows: true cuts its shadow too. A new constant moves the cut with no rebuild: a cut-away roof follows the player. Costs one test a plane on each pixel the surface covers, and a cut solid loses the early depth test, so wear it only on the pieces a cut crosses clipIntersection?: boolean clipShadows?: boolean overrides?: MaterialOverridesSpec }

#### Block 1

````text
StandardMaterialSpec = {
  texture?: string | null   // "cdn/x.png"; null: no picture (three's map = null). A model part reads "#<name>": the picture its model draws there.
  time?: number   // The .mp4 clip's playhead in seconds: every player's screen shows `paused ? time : time + speed * (ctx.now() - timeAt) / 1000`, and a write jumps every screen. One address is one clip: the newest write on any surface wearing it moves it. An .m3u8 plays its live point.
  timeAt?: number   // World-clock milliseconds (ctx.now()) at which `time` applies; the engine stamps it for you.
  paused?: boolean   // true freezes the .mp4 clip on every player's screen on the frame it shows; false resumes it from the frame it holds.
  speed?: number   // The .mp4 clip's playback speed on every player's screen (default 1; 0.5 is half speed): a write keeps the frame it shows and plays on at the new speed.
  view?: { link: string; oneWay?: boolean; spill?: number; sound?: number } | { camera: ViewCamera; cadence?: string; size?: number } | null   // A view: the surface shows a place, drawn live. It fills the whole face exactly once (a viewport, never tiled); `texture` is ignored when `view` is set. `view: { link: "world:<id>" }` is a door's glass: the linked world or place seen through the face. Until that world's feed delivers it is a dim panel tinted with the world's own identity hue (deterministic, never an error). Both faces of an upright glass are windows, each showing the far world from its own side's landing; `oneWay: true` makes a one-sided door: the back face is a veiled wall and the door's trigger refuses a traveler on that side. A glass lying flat is a hole: looking down through it, you see the far place from one body length above the linked thing, looking where you look; looking up, the sky over it. So link a floor glass to a thing on the ground of what the floor should show. `spill` is how much of the far world's light comes through the aperture onto this world's ground and walls (0 none, 1 what a hole in a wall lets through: the default, 2 twice that); `sound` how much of the far world's sound is heard through it (0 a silent door, 1 physical: the default). A link to another world with no `@ref` shows it at the viewer's own copy: its build while they build, its live game while they play. `@live` in the link always shows the live game, `@dev` always the build. `view: { camera }` shows this place from a camera, or with `camera.place` another place of this world (`spawn api ViewCamera`): `camera: "mirror"` is a mirror, `camera: { eye, aim, fov }` a camera you place (a security monitor, a map), `camera: { parent: id }` one that rides a thing. The face's own `color` shows until its picture draws. `cadence: "1s"` draws one new picture a second, and `size: 256` draws it 256 pixels on its longer side; the engine serves both within the frame, and with neither it fits them to the face on the screen.
  canvas?: string | null   // The id of a `<canvas>` in the game's ui: the surface shows it live, as the ui's script draws it (three's CanvasTexture). It fills the shape's own 0..1 UVs once, so a scripted screen returns `{ uvs }` 0..1; `repeat` and `wrap: "repeat"` tile it. It wins over `texture`, and a `view` wins over it. `material.canvas = "crt"` wears `<canvas id="crt">`; each player sees the canvas their own page drew. A name no canvas answers leaves the face its own colour, and null takes the canvas off. A canvas uploads every frame while a face wearing it is in view, so draw it at the size the glass needs.
  pbr?: boolean | "fal1"   // true derives normal/roughness/metalness from the texture; omitted or false derives nothing, and a false you write reads back as false (ground materials differ: a heightmap albedo wears PBR unless pbr: false)
  normalMap?: string   // three's map names at three's channels, linear data: a normal map; a roughness map (.g × roughness: unset roughness beside it lets the map own the surface); a metalness map (.b × metalness: unset metalness beside it reads as metal); an alpha map (.g × the texture's alpha: coverage under transparent, the cut under alphaTest). pbr: true derives the first three from the texture. three's other maps (displacementMap, aoMap, bumpMap) go on a scripted material's node material, as in three: m.displacementMap = ctx.texture(cdn)
  roughnessMap?: string
  metalnessMap?: string
  alphaMap?: string
  normalScale?: number   // three's normalScale on a primitive: the normal map's relief × this (default 1; 0 flat; negative inverts it)
  alphaTest?: number   // three's alphaTest: the alpha cutoff (0..1) under which a texel is cut
  color?: Color   // beside a texture: recolours it, keeping its light and dark, by the colour's saturation (white = no-op, grey darkens); three's texel × colour: multiply in its texture script
  repeat?: [number, number]   // [u,v] copies across the face; under wrap repeat, × the 1-tile-per-meter density
  textureScale?: number   // meters per tile under wrap: "repeat" (divides the 1-tile-per-meter density; default 1); without wrap: "repeat" it reads nothing
  wrap?: "repeat" | "clamp"   // omitted: the picture once across the surface: once around a sphere (a planet's equirectangular map), once per face of a box; repeat then counts copies. "repeat": the one word that tiles it, one tile per meter (fabric, brick, felt); the texture's name never decides
  filter?: "pixel" | "linear"   // How the pictures this material names are sampled, as sprite.filter: "pixel" is three's NearestFilter up close (crisp pixel art, every texel a hard square), "linear" smooth. Unset: each picture's own default
  metalness?: number
  roughness?: number
  opacity?: number
  transparent?: boolean
  emissive?: Color   // a Color; emissiveIntensity scales it
  emissiveIntensity?: number
  emissiveMap?: string   // three's emissiveMap: a picture (sRGB) whose texels × emissive × emissiveIntensity light the surface; emissive must be set (black, the default, lights nothing)
  unlit?: boolean   // true skips lighting: the color/texture and emissive land flat, no shade or shadow on the surface (three's MeshBasicMaterial); default false
  dissolve?: number   // 0 intact → 1 gone; tween it for a spawn-in / death-out
  side?: "front" | "back" | "double"   // three's side. A primitive draws every face unless set: "front" draws only the faces toward the viewer (a room's lining seen from inside and invisible from outside: it still casts its shadow), "back" only the faces away, "double" both. A model part: "double" for thin geometry seen from both sides
  vertexColors?: boolean   // three's vertexColors. A model part: true (the default where its mesh has vertex colours, as three's GLTFLoader sets it) multiplies them into the colour; false draws the part as color × texture, so shading baked into the vertices is gone, not lightened. Models only: a primitive does not read it, so a custom primitive's colors still draw
  depthWrite?: boolean
  depthTest?: boolean
  renderOrder?: number   // draw order among transparent things (higher draws later); in a 2D place it is a mesh's layer among sprite sortingLayers; a part that must read through another part of its own character wears drawsOver instead
  drawsOver?: string[] | { parts: string[]; strength?: number; angle?: number }   // a model part: the names of parts of the same character this part shows through when they cover it (a character's eyes through that character's own hair): a see-through copy blended at strength (0..1, default 0.5) while the camera is within angle degrees of the part's facing (0..180, default 60); a bare array takes both defaults. The copy shows only through the named parts where they are solid (not blended); a solid surface in front of them, a hand or another character, hides it; a see-through or blended surface in front does not hide it and the copy draws over it. Under a player's "jaggies: no" setting the copy is not drawn and the part draws as it would without the word
  outline?: boolean | { color?: Color; width?: number; warm?: number; lightness?: number } | null   // an ink line around it: true = a 2-pixel line in a darker shade of its own colour, lit as it is lit; width = that many pixels (of a 1080p picture) up close, up to 63 pixels of the picture drawn; color = shown as given, up to 0.9 of white on each channel; with no color, lightness = the shade's share of its surface's lightness (0..1, default 0.58) and warm = how far the shade leans to a warm brown (0..1, default 0); every line thins with distance and fogs as the world does; drawn only around opaque solids
  polygonOffset?: boolean   // three's polygon offset: true biases this surface's depth by polygonOffsetFactor × its depth slope + polygonOffsetUnits × the depth step, negative toward the eye: a decal quad lying on a floor or a wall wins the depth test at every distance and angle (-1, -1 is the usual pair). Primitives only; its shadow ignores it
  polygonOffsetFactor?: number
  polygonOffsetUnits?: number
  blending?: "none" | "normal" | "additive" | "subtractive" | "multiply" | "custom"   // three's blending, on a transparent surface: "normal" (default), "additive", "subtractive", "multiply", "none", or "custom", three's CustomBlending, which reads blendSrc (default "src-alpha"), blendDst ("one-minus-src-alpha") and blendEquation ("add"); the Alpha three take the alpha channel's, unset the colour's. "min" and "max" read no factor
  blendSrc?: BlendFactor
  blendDst?: BlendFactor
  blendEquation?: BlendEquation
  blendSrcAlpha?: BlendFactor
  blendDstAlpha?: BlendFactor
  blendEquationAlpha?: BlendEquation
  premultipliedAlpha?: boolean   // three's premultipliedAlpha: the colour leaves multiplied by its alpha and the blend reads it so
  colorWrite?: boolean   // three's colorWrite: false draws depth and no colour, an invisible mask that hides what draws after it (the sea and every see-through thing; solids with a higher renderOrder): a boat's hull keeps the water out under a mask at its waterline. Costs one draw that writes depth alone
  clippingPlanes?: ClipPlane[] | null   // three's clippingPlanes, up to 8: the surface is cut where normal · p + constant < 0 for any plane, or for every plane under clipIntersection; clipShadows: true cuts its shadow too. A new constant moves the cut with no rebuild: a cut-away roof follows the player. Costs one test a plane on each pixel the surface covers, and a cut solid loses the early depth test, so wear it only on the pieces a cut crosses
  clipIntersection?: boolean
  clipShadows?: boolean
  overrides?: MaterialOverridesSpec
}
````


### After clicking "TerrainDef"

TerrainDef = | { kind: "heightmap"; seed?: number; materials?: Array<{ id: string; albedo?: string; pbr?: boolean | "fal1"; tint?: number | string; normal?: string; roughness?: string; textureScale?: number; metalness?: number; normalStrength?: number; roughnessIntensity?: number; antiTiling?: "none" | "stochastic"; filter?: "pixel" | "linear"; macro?: { scale?: number; hue?: number; value?: number } }>; generator?: ScriptRef; verticalRange?: { min: number; max: number }; marks?: HeightmapTerrainMarkMap; decorations?: DecorationDef; water?: LiquidSpec | Array<{ id?: string } & LiquidSpec>; material?: ScriptedMaterialSpec } // Terrain configuration - procedural heightmap terrain | { kind: "voxel"; seed?: number; cellSize?: number; lodRanges?: readonly number[]; verticalRange?: { min: number; max: number }; defaultSlices?: { topY?: number; sideZ?: number }; blockTicks?: TerrainVoxelBlockTicksDef; materials?: Record<string, VoxelMaterialDef>; generator?: ScriptRef; params?: Record<string, number>; marks?: VoxelTerrainMarkMap; structures?: VoxelStructureDef[]; meshing?: { style?: "blocky" | "smooth" }; decorations?: DecorationDef } // Terrain configuration - volumetric voxel terrain | { kind: "3d-rooms"; tileSize: number; wallHeight: number; wallThickness?: number; origin?: TerrainRoomsOrigin; ceiling?: TerrainRoomsCeilingDef; lighting?: TerrainRoomsLightingDef; layout: string; legend: Record<string, TerrainRoomsLegendEntry | "void"> } // Terrain configuration - 3d-rooms ASCII layout | { kind: "tilemap"; tileSize?: number; width?: number; height?: number; tileset: string; tilesetColumns?: number; tilesetFrames?: number; tilesetFps?: number; generator?: ScriptRef; solidTiles?: number[]; material?: ScriptedMaterialSpec } // Terrain configuration - 2D tilemap (grid cells over a tileset atlas). The generator script IS the map: `tileAt({ x, y, world })` evaluates deterministically on every side, like heightAt/materialAt. Infinite by default: omit width/height and tileAt is sampled over a streamed window that follows the players forever, exactly like heightmap terrain. Cells read like an image grid: x → +X, row 0 at the TOP (2d-top: y → +Z down-screen; 2d-side: y → −Y downward), so level data reads top-to-bottom like ASCII art in both modes. Gameplay mutation is sparse and a cell is a dot: ctx.place.tiles[x][y] reads override ?? tileAt; = id paints one cell, = 0 carves it to empty, delete returns it to the generator. | { kind: "off"; decorations?: DecorationDef } // Terrain disabled - no terrain rendering. `decorations` still dresses the place's mesh floors: a scatter bed with `surface: { mesh }` draws as the layer `scatter:<bed id>` of this config, so an authored layer of that id is the bed's look (`material`), its reach (`maxDistance`) and its items: the same words a heightmap's cover takes. // TerrainDef, kind "heightmap" seed?: number // Seed for deterministic generation: a number, like every other seed in the spec. (Legacy docs may carry a string; the engine hashes String(seed), so both parse and generate identically.) materials?: Array<{ id: string; albedo?: string; pbr?: boolean | "fal1"; tint?: number | string; normal?: string; roughness?: string; textureScale?: number; metalness?: number; normalStrength?: number; roughnessIntensity?: number; antiTiling?: "none" | "stochastic"; filter?: "pixel" | "linear"; macro?: { scale?: number; hue?: number; value?: number } }> // [{ id, albedo: "cdn/x.png", pbr: true (the textured default: the engine cooks its normal, roughness and height; a picture carves its seams by its own grain with or without pbr; a weight ramp over metres of noise is the soft edge), tint? (alone = flat color, meeting other tints by dither), textureScale? meters per tile, macro? { scale m, hue °, value }: the slow world-space drift of the shown colour (default { scale: 20, hue: 10, value: 0.12 }; { hue: 0, value: 0 } = none), the ground cover wears it too }]; a point keeps its three heaviest; steep ground (from about 37°) projects the picture from the side by itself; live: ctx.place.terrain.materials.<id> = {…} (delete removes) generator?: ScriptRef // scripts/<file>.js exporting heightAt(ctx) → meters and materialAt(ctx) → { <materialId>: weight } (the engine normalizes the weights). One ctx object: { x, z, place, noise, seedOffset(n), metersPerTile } in world meters: noise is builtin/noise's functions, seedOffset(n) decorrelates each layer under the authored seed; materialAt's ctx adds worldHeight, height01 (the place in verticalRange), slope (1 − normal.y: 0 flat, 1 vertical, 0.29 = 45°), normal and neighbor(ox, oz) → { worldHeight, height01, slope } | null off the chunk. An optional paintOffsetAt(ctx) → { x, z } meters (heightAt's ctx) moves where the painted terrain:material fields and the natural mask are read, held within 2 m; readField reads the cells as painted. heightAt runs ~17k times per 80 m chunk across its detail levels: a per-call loop over a point list is the whole cost of the world; a track or river is a mark (heightmap-terrain skill) verticalRange?: { min: number; max: number } // { min, max } meters, default { min: -32, max: 256 }: the band height01 and the height tints normalize over (and the skirt's depth); the ground is built at whatever heightAt returns, inside the band or not, and the engine says so once when it leaves: set it to the real span so height01 reads 0..1 marks?: HeightmapTerrainMarkMap // { <key>: HeightmapTerrainMark }: a strip (`path`, `road`, `river`: `points: [x, z][]`, `width`), a disc (`lake`: `at`, `radius`), an area (`flatten`, `clear-scatter`: `center` + `shape`, or spelled as a strip `{ points, width }`), an outline (`hole`: `points: [x, z][]`, three or more, closed), a shore (`sea`: `level`). Marks carve in the order flatten → sea → lake → river → path → road → clear-scatter → hole, each seeing the last kind's result; overlapping waters merge low and never dam; a mark overrides the generator in its area: edit the mark, heightAt does nothing there; a `hole` removes the ground inside its outline (not drawn, no collider, no cover: a tunnel mouth, a shaft; the tunnel itself is your geometry) and moves no height; `jayzee api HeightmapTerrainMark <kind>` prints each kind's fields and its defaults; live: ctx.place.terrain.marks.<key> = {…} (a standing key merges; `delete` removes); a painted stroke stays over the new ground decorations?: DecorationDef // ground cover (heightmap-terrain skill) water?: LiquidSpec | Array<{ id?: string } & LiquidSpec> // the liquid every `terrain:water` sheet of this place wears: a lake mark's `liquid` shape, `material` included; omitted: the engine's still pond. A list holds several liquids at once, one per entry, each worn by its own field's sheets: `terrain:water:<id>` for an entry with an `id`, `terrain:water` for the one entry without material?: ScriptedMaterialSpec // Scripted material for the ground: the same `{ kind: "scripted", script, params }` contract objects and tile ground use (jayzee api builtin/three for the ctx), worn by the whole ground, near and far. The ground is one mesh at the world origin: `positionWorld` and `positionLocal` are the world position, `uv()` is the world x, z in metres, and `vertexColor()` is the ground's own colour (the `materials` as `materialAt` weights them, a textured one at its average colour). A material with no colorNode wears that colour under its own shading. The `materials`' pictures, taken from the side on steep ground, reach it only through `ctx.terrain.ground`. The shape stays `heightAt`'s: the material shades the ground and does not move it. A broken script keeps the plain ground until the next edit. // TerrainDef, kind "voxel" cellSize?: number // World metres per voxel cell (default 1): 0.125 | 0.25 | 0.5 | 1 | 2. A 3D place takes each and its chunk follows the cell; a 2D place takes 0.5, 1, 2. A write of any other value is refused. Terraria-style 2D dig games read best at 0.5 (a ~1.8 m character stands 3-4 cells tall). Cell-addressed APIs keep integer CELL coordinates; world position = cell × cellSize. `materialAt(ctx)` still receives world metres. defaultSlices?: { // The gameplay slice for 2D place modes (defaults to the terrain origin). The slice contract: in a 2D place this single cell layer is what renders, what edits target, AND what physics collides/samples: colliders are merged rects of the slice's solid cells, built locally on every machine, and solidity reads use the slice cell, never a player's preserved-axis depth. topY?: number // 2d-top: world Y of the played cell layer. sideZ?: number // 2d-side: world Z of the played cell layer. } materials?: Record<string, VoxelMaterialDef> // { <id>: VoxelMaterialDef }; live: ctx.place.terrain.materials.<id> = {…} (delete removes) generator?: ScriptRef // Generator script reference (exports materialAt) marks?: VoxelTerrainMarkMap // Voxel terrain marks for flattening pads, carving ponds/rivers, repainting paths, clearing airspace, and stamping one-off voxel structures. meshing?: { style?: "blocky" | "smooth" } // `"smooth"` draws the ground rounded over its cells; digging and reads stay on the cells, within half a cell of the drawn surface. decorations?: DecorationDef // ground cover: the same layers as a heightmap's, grown on the top face of every block that counts as terrain surface, caves included; bindings by material id (voxel-terrain skill) // TerrainDef, kind "3d-rooms" wallThickness?: number // Wall thickness in meters (default: tileSize * 0.2). // TerrainDef, kind "tilemap" tileSize?: number // World units per (square) cell. Default 1. width?: number // Optional map bounds in cells: author BOTH for a bounded map (tileAt sampled inside the rect, empty outside, the whole map centered on the place origin), omit BOTH for an infinite map (tileAt sampled for any integer cell and streamed in a window around the players, cell (0, 0) anchored at the world origin: generator coords = floor(world / tileSize)). tileset: string // Tileset atlas texture URL; a plain tileable texture is one tile only with `tilesetColumns: 1` (default 4 columns). tilesetColumns?: number // Atlas grid width in tiles (default 4); rows derived from the image. tilesetFrames?: number // Animation frames stacked in the tileset image as whole-atlas row groups below frame 0 (frame-major vertical concat), 2–16. Declared, never inferred: omit for a static tileset; extra rows WITHOUT this field are spatial variants (random-per-cell, picked by tileAt ids), not animation. Playback is loop-only at `tilesetFps` and costs nothing per tick (a shader V-shift); lit tilesets animate their normal atlas in lockstep automatically. tilesetFps?: number // Playback rate in frames per second (default 12); plays only when `tilesetFrames` is set. generator?: ScriptRef // Generator script reference (exports tileAt({ x, y, world }) => tile id; 0/null = empty). `world.state` is the room's ctx.world.state, read-only; when a key tileAt read changes, the map is asked again. solidTiles?: number[] // Tile ids that compose merged static colliders in 2D places. material?: ScriptedMaterialSpec // Scripted material for the tile surface: the same `{ kind: "scripted", script, params }` contract objects use (jayzee api builtin/three for the ctx). Inside `material(ctx)`, `ctx.tile` carries the per-cell inputs: `id` (the tile id tileAt returned), `uv` (0..1 across the cell), and `uvRect` (the default atlas rect for that id). Compute exact UVs for any sheet layout (margins, spacing, multiple tilesets by id range), and animate tiles by deriving the sampled cell from `time`: water/lava frames play in-shader with zero per-tick cost. The engine keeps placement, chunking, and batching; tiles render double-sided, and opaque materials keep the standard 0.5 alpha cutout. A broken script falls back to the plain `tileset` grid until the next edit. // TerrainDef, kind "off" decorations?: DecorationDef // Ground cover over the place's mesh floors: the layers a mesh-surface scatter bed draws with (`scatter:<bed id>`), spelled as a heightmap's `decorations`.

#### Block 1

````text
TerrainDef =
  | { kind: "heightmap"; seed?: number; materials?: Array<{ id: string; albedo?: string; pbr?: boolean | "fal1"; tint?: number | string; normal?: string; roughness?: string; textureScale?: number; metalness?: number; normalStrength?: number; roughnessIntensity?: number; antiTiling?: "none" | "stochastic"; filter?: "pixel" | "linear"; macro?: { scale?: number; hue?: number; value?: number } }>; generator?: ScriptRef; verticalRange?: { min: number; max: number }; marks?: HeightmapTerrainMarkMap; decorations?: DecorationDef; water?: LiquidSpec | Array<{ id?: string } & LiquidSpec>; material?: ScriptedMaterialSpec }   // Terrain configuration - procedural heightmap terrain
  | { kind: "voxel"; seed?: number; cellSize?: number; lodRanges?: readonly number[]; verticalRange?: { min: number; max: number }; defaultSlices?: { topY?: number; sideZ?: number }; blockTicks?: TerrainVoxelBlockTicksDef; materials?: Record<string, VoxelMaterialDef>; generator?: ScriptRef; params?: Record<string, number>; marks?: VoxelTerrainMarkMap; structures?: VoxelStructureDef[]; meshing?: { style?: "blocky" | "smooth" }; decorations?: DecorationDef }   // Terrain configuration - volumetric voxel terrain
  | { kind: "3d-rooms"; tileSize: number; wallHeight: number; wallThickness?: number; origin?: TerrainRoomsOrigin; ceiling?: TerrainRoomsCeilingDef; lighting?: TerrainRoomsLightingDef; layout: string; legend: Record<string, TerrainRoomsLegendEntry | "void"> }   // Terrain configuration - 3d-rooms ASCII layout
  | { kind: "tilemap"; tileSize?: number; width?: number; height?: number; tileset: string; tilesetColumns?: number; tilesetFrames?: number; tilesetFps?: number; generator?: ScriptRef; solidTiles?: number[]; material?: ScriptedMaterialSpec }   // Terrain configuration - 2D tilemap (grid cells over a tileset atlas). The generator script IS the map: `tileAt({ x, y, world })` evaluates deterministically on every side, like heightAt/materialAt. Infinite by default: omit width/height and tileAt is sampled over a streamed window that follows the players forever, exactly like heightmap terrain. Cells read like an image grid: x → +X, row 0 at the TOP (2d-top: y → +Z down-screen; 2d-side: y → −Y downward), so level data reads top-to-bottom like ASCII art in both modes. Gameplay mutation is sparse and a cell is a dot: ctx.place.tiles[x][y] reads override ?? tileAt; = id paints one cell, = 0 carves it to empty, delete returns it to the generator.
  | { kind: "off"; decorations?: DecorationDef }   // Terrain disabled - no terrain rendering. `decorations` still dresses the place's mesh floors: a scatter bed with `surface: { mesh }` draws as the layer `scatter:<bed id>` of this config, so an authored layer of that id is the bed's look (`material`), its reach (`maxDistance`) and its items: the same words a heightmap's cover takes.

// TerrainDef, kind "heightmap"
  seed?: number   // Seed for deterministic generation: a number, like every other seed in the spec. (Legacy docs may carry a string; the engine hashes String(seed), so both parse and generate identically.)
  materials?: Array<{ id: string; albedo?: string; pbr?: boolean | "fal1"; tint?: number | string; normal?: string; roughness?: string; textureScale?: number; metalness?: number; normalStrength?: number; roughnessIntensity?: number; antiTiling?: "none" | "stochastic"; filter?: "pixel" | "linear"; macro?: { scale?: number; hue?: number; value?: number } }>   // [{ id, albedo: "cdn/x.png", pbr: true (the textured default: the engine cooks its normal, roughness and height; a picture carves its seams by its own grain with or without pbr; a weight ramp over metres of noise is the soft edge), tint? (alone = flat color, meeting other tints by dither), textureScale? meters per tile, macro? { scale m, hue °, value }: the slow world-space drift of the shown colour (default { scale: 20, hue: 10, value: 0.12 }; { hue: 0, value: 0 } = none), the ground cover wears it too }]; a point keeps its three heaviest; steep ground (from about 37°) projects the picture from the side by itself; live: ctx.place.terrain.materials.<id> = {…} (delete removes)
  generator?: ScriptRef   // scripts/<file>.js exporting heightAt(ctx) → meters and materialAt(ctx) → { <materialId>: weight } (the engine normalizes the weights). One ctx object: { x, z, place, noise, seedOffset(n), metersPerTile } in world meters: noise is builtin/noise's functions, seedOffset(n) decorrelates each layer under the authored seed; materialAt's ctx adds worldHeight, height01 (the place in verticalRange), slope (1 − normal.y: 0 flat, 1 vertical, 0.29 = 45°), normal and neighbor(ox, oz) → { worldHeight, height01, slope } | null off the chunk. An optional paintOffsetAt(ctx) → { x, z } meters (heightAt's ctx) moves where the painted terrain:material fields and the natural mask are read, held within 2 m; readField reads the cells as painted. heightAt runs ~17k times per 80 m chunk across its detail levels: a per-call loop over a point list is the whole cost of the world; a track or river is a mark (heightmap-terrain skill)
  verticalRange?: { min: number; max: number }   // { min, max } meters, default { min: -32, max: 256 }: the band height01 and the height tints normalize over (and the skirt's depth); the ground is built at whatever heightAt returns, inside the band or not, and the engine says so once when it leaves: set it to the real span so height01 reads 0..1
  marks?: HeightmapTerrainMarkMap   // { <key>: HeightmapTerrainMark }: a strip (`path`, `road`, `river`: `points: [x, z][]`, `width`), a disc (`lake`: `at`, `radius`), an area (`flatten`, `clear-scatter`: `center` + `shape`, or spelled as a strip `{ points, width }`), an outline (`hole`: `points: [x, z][]`, three or more, closed), a shore (`sea`: `level`). Marks carve in the order flatten → sea → lake → river → path → road → clear-scatter → hole, each seeing the last kind's result; overlapping waters merge low and never dam; a mark overrides the generator in its area: edit the mark, heightAt does nothing there; a `hole` removes the ground inside its outline (not drawn, no collider, no cover: a tunnel mouth, a shaft; the tunnel itself is your geometry) and moves no height; `spawn api HeightmapTerrainMark <kind>` prints each kind's fields and its defaults; live: ctx.place.terrain.marks.<key> = {…} (a standing key merges; `delete` removes); a painted stroke stays over the new ground
  decorations?: DecorationDef   // ground cover (heightmap-terrain skill)
  water?: LiquidSpec | Array<{ id?: string } & LiquidSpec>   // the liquid every `terrain:water` sheet of this place wears: a lake mark's `liquid` shape, `material` included; omitted: the engine's still pond. A list holds several liquids at once, one per entry, each worn by its own field's sheets: `terrain:water:<id>` for an entry with an `id`, `terrain:water` for the one entry without
  material?: ScriptedMaterialSpec   // Scripted material for the ground: the same `{ kind: "scripted", script, params }` contract objects and tile ground use (spawn api builtin/three for the ctx), worn by the whole ground, near and far. The ground is one mesh at the world origin: `positionWorld` and `positionLocal` are the world position, `uv()` is the world x, z in metres, and `vertexColor()` is the ground's own colour (the `materials` as `materialAt` weights them, a textured one at its average colour). A material with no colorNode wears that colour under its own shading. The `materials`' pictures, taken from the side on steep ground, reach it only through `ctx.terrain.ground`. The shape stays `heightAt`'s: the material shades the ground and does not move it. A broken script keeps the plain ground until the next edit.

// TerrainDef, kind "voxel"
  cellSize?: number   // World metres per voxel cell (default 1): 0.125 | 0.25 | 0.5 | 1 | 2. A 3D place takes each and its chunk follows the cell; a 2D place takes 0.5, 1, 2. A write of any other value is refused. Terraria-style 2D dig games read best at 0.5 (a ~1.8 m character stands 3-4 cells tall). Cell-addressed APIs keep integer CELL coordinates; world position = cell × cellSize. `materialAt(ctx)` still receives world metres.
  defaultSlices?: {   // The gameplay slice for 2D place modes (defaults to the terrain origin). The slice contract: in a 2D place this single cell layer is what renders, what edits target, AND what physics collides/samples: colliders are merged rects of the slice's solid cells, built locally on every machine, and solidity reads use the slice cell, never a player's preserved-axis depth.
    topY?: number   // 2d-top: world Y of the played cell layer.
    sideZ?: number   // 2d-side: world Z of the played cell layer.
  }
  materials?: Record<string, VoxelMaterialDef>   // { <id>: VoxelMaterialDef }; live: ctx.place.terrain.materials.<id> = {…} (delete removes)
  generator?: ScriptRef   // Generator script reference (exports materialAt)
  marks?: VoxelTerrainMarkMap   // Voxel terrain marks for flattening pads, carving ponds/rivers, repainting paths, clearing airspace, and stamping one-off voxel structures.
  meshing?: { style?: "blocky" | "smooth" }   // `"smooth"` draws the ground rounded over its cells; digging and reads stay on the cells, within half a cell of the drawn surface.
  decorations?: DecorationDef   // ground cover: the same layers as a heightmap's, grown on the top face of every block that counts as terrain surface, caves included; bindings by material id (voxel-terrain skill)

// TerrainDef, kind "3d-rooms"
  wallThickness?: number   // Wall thickness in meters (default: tileSize * 0.2).

// TerrainDef, kind "tilemap"
  tileSize?: number   // World units per (square) cell. Default 1.
  width?: number   // Optional map bounds in cells: author BOTH for a bounded map (tileAt sampled inside the rect, empty outside, the whole map centered on the place origin), omit BOTH for an infinite map (tileAt sampled for any integer cell and streamed in a window around the players, cell (0, 0) anchored at the world origin: generator coords = floor(world / tileSize)).
  tileset: string   // Tileset atlas texture URL; a plain tileable texture is one tile only with `tilesetColumns: 1` (default 4 columns).
  tilesetColumns?: number   // Atlas grid width in tiles (default 4); rows derived from the image.
  tilesetFrames?: number   // Animation frames stacked in the tileset image as whole-atlas row groups below frame 0 (frame-major vertical concat), 2–16. Declared, never inferred: omit for a static tileset; extra rows WITHOUT this field are spatial variants (random-per-cell, picked by tileAt ids), not animation. Playback is loop-only at `tilesetFps` and costs nothing per tick (a shader V-shift); lit tilesets animate their normal atlas in lockstep automatically.
  tilesetFps?: number   // Playback rate in frames per second (default 12); plays only when `tilesetFrames` is set.
  generator?: ScriptRef   // Generator script reference (exports tileAt({ x, y, world }) => tile id; 0/null = empty). `world.state` is the room's ctx.world.state, read-only; when a key tileAt read changes, the map is asked again.
  solidTiles?: number[]   // Tile ids that compose merged static colliders in 2D places.
  material?: ScriptedMaterialSpec   // Scripted material for the tile surface: the same `{ kind: "scripted", script, params }` contract objects use (spawn api builtin/three for the ctx). Inside `material(ctx)`, `ctx.tile` carries the per-cell inputs: `id` (the tile id tileAt returned), `uv` (0..1 across the cell), and `uvRect` (the default atlas rect for that id). Compute exact UVs for any sheet layout (margins, spacing, multiple tilesets by id range), and animate tiles by deriving the sampled cell from `time`: water/lava frames play in-shader with zero per-tick cost. The engine keeps placement, chunking, and batching; tiles render double-sided, and opaque materials keep the standard 0.5 alpha cutout. A broken script falls back to the plain `tileset` grid until the next edit.

// TerrainDef, kind "off"
  decorations?: DecorationDef   // Ground cover over the place's mesh floors: the layers a mesh-surface scatter bed draws with (`scatter:<bed id>`), spelled as a heightmap's `decorations`.
````


### After clicking "TerrainRoomsCeilingDef"

TerrainRoomsCeilingDef = { enabled: boolean height?: number albedo: string trim?: { depth: number; height: number; albedo: string } }

#### Block 1

````text
TerrainRoomsCeilingDef = {
  enabled: boolean
  height?: number
  albedo: string
  trim?: { depth: number; height: number; albedo: string }
}
````


### After clicking "TerrainRoomsLightingDef"

TerrainRoomsLightingDef = { enabled?: boolean // Enable automatic room lighting (default: true). Setting `enabled: false` is the ONLY way to turn auto room lights off: authored lights on objects are additive and never suppress them. color?: Color // Light color (OKLCH string). intensity?: number // Light intensity (default: 1). range?: number // Light range (default: derived from room size). height?: number // Height above floor for the light (default: near ceiling). perRoom?: boolean // Jayzee one light per connected room cluster (default: true). Capped at 256 lights: on layouts with more rooms the largest rooms keep theirs and a parser warning is raised. kind?: "point" | "spot" // Light kind to jayzee (default: "spot"). angle?: number // Spot light cone half-angle in DEGREES, 0-90 (auto-calculated from room size if omitted). penumbra?: number // Spot light penumbra (0-1, default: 0.3). }

#### Block 1

````text
TerrainRoomsLightingDef = {
  enabled?: boolean   // Enable automatic room lighting (default: true). Setting `enabled: false` is the ONLY way to turn auto room lights off: authored lights on objects are additive and never suppress them.
  color?: Color   // Light color (OKLCH string).
  intensity?: number   // Light intensity (default: 1).
  range?: number   // Light range (default: derived from room size).
  height?: number   // Height above floor for the light (default: near ceiling).
  perRoom?: boolean   // Spawn one light per connected room cluster (default: true). Capped at 256 lights: on layouts with more rooms the largest rooms keep theirs and a parser warning is raised.
  kind?: "point" | "spot"   // Light kind to spawn (default: "spot").
  angle?: number   // Spot light cone half-angle in DEGREES, 0-90 (auto-calculated from room size if omitted).
  penumbra?: number   // Spot light penumbra (0-1, default: 0.3).
}
````


### After clicking "TerrainRoomsWallTrimDef"

TerrainRoomsWallTrimDef = { height: number depth: number albedo: string }

#### Block 1

````text
TerrainRoomsWallTrimDef = {
  height: number
  depth: number
  albedo: string
}
````


### After clicking "TerrainVoxelBlockTicksDef"

TerrainVoxelBlockTicksDef = { randomTicksPerChunk?: number // Random block samples attempted per active loaded chunk per sim tick. Default: 3. maxScheduledTicksPerTick?: number // Max scheduled block ticks processed per sim tick in this place. Default: 128. }

#### Block 1

````text
TerrainVoxelBlockTicksDef = {
  randomTicksPerChunk?: number   // Random block samples attempted per active loaded chunk per sim tick. Default: 3.
  maxScheduledTicksPerTick?: number   // Max scheduled block ticks processed per sim tick in this place. Default: 128.
}
````


### After clicking "UIDef"

UI overlay configuration

UIDef = { render?: ScriptRef // Render script (exports default function returning HTML) }

#### Block 1

````text
UIDef = {
  render?: ScriptRef   // Render script (exports default function returning HTML)
}
````


### After clicking "UnderwaterSpec"

Underwater view inside this material's surface footprint. Works on water and scripted materials; it changes rendering, not swimming or physics.

depth: finite metres below the sheet (default 100; unset, an object's level water material stops at the first still floor under it, and a sloped or…

UnderwaterSpec = { enabled?: boolean depth?: number color?: Color visibility?: number scatter?: number distortion?: number }

#### Block 1

````text
UnderwaterSpec = {
  enabled?: boolean
  depth?: number
  color?: Color
  visibility?: number
  scatter?: number
  distortion?: number
}
````


### After clicking "VoxelMaterialBlockBehaviorDef"

VoxelMaterialBlockBehaviorDef = { script: ScriptRef // Script reference exporting block hooks like onRandomTick(block). randomTick?: boolean // Opt this material into per-chunk random samples. scheduledTick?: boolean // Allow scripts to schedule sparse follow-up work for this block. neighborChanged?: boolean // Notify this material when one of its 6 orthogonal neighbors changes. }

#### Block 1

````text
VoxelMaterialBlockBehaviorDef = {
  script: ScriptRef   // Script reference exporting block hooks like onRandomTick(block).
  randomTick?: boolean   // Opt this material into per-chunk random samples.
  scheduledTick?: boolean   // Allow scripts to schedule sparse follow-up work for this block.
  neighborChanged?: boolean   // Notify this material when one of its 6 orthogonal neighbors changes.
}
````


### After clicking "VoxelMaterialDef"

VoxelMaterialDef = { color?: Color texture?: string pbr?: boolean // true derives normal and roughness from its raster texture (png, jpg, webp, avif); omitted, false, a color with no texture or a .ktx2 texture derives nothing roughness?: number metalness?: number opacity?: number transparent?: boolean // See-through, as is an opacity below 1. A solid cube of it with no cutout (glass, ice) shows its picture's clear pixels as clear and draws no face between two cells of one such material. emissive?: Color emissiveIntensity?: number liquidKind?: string // Explicit liquid marker for onLiquidEnter/onLiquidExit; becomes other.liquidKind. surfaceInset?: number // Fraction of voxel height to lower the exposed top surface (0-0.99). Useful for liquids. solid?: boolean cutout?: boolean // Alpha-tested art (leaves, plants): the picture's clear pixels are cut away, and a cube of it keeps the faces between its cells. collision?: "solid" | "none" countsAsTerrainSurface?: boolean wind?: { force?: number } // Bends with the place's wind as a decoration item's `wind` does, the same word and meaning: the swaying cubes of one chunk move as one block (at the largest force among them), and a shaped cell of it (blockBehavior) moves whole, so a column of them moves as one stem, as far as a full-weight tip leans: about force × the wind's speed ÷ 2 metres downwind at a gust's heart, 0.32 of that between gusts, with a small cross-wind flutter, never more than 1 m (force 0.03–0.08 reads as a breeze). The picture alone: shadows, colliders and cells stay. Omitted or force 0: still. waveIntensity?: number // the waves of a liquid that wears `tones`, as the water material's: 0 to 1, default about 0.15; 0 is dead calm (with `metalness` 1 and `roughness` 0 it mirrors the sky, and the scene on high and ultra) tags?: string[] // Creator-defined tags for behavioral grouping (e.g. 'climbable', 'emits-light', 'bouncy'). Queried via ctx.place.voxels.query({ tag, radius }). blockBehavior?: VoxelMaterialBlockBehaviorDef tones?: string[] // The ramp of the cube's face: up to twelve colours, darkest first. A material with `tones` paints every face from the ramp in its `pattern` and ignores its `texture`; one without draws its flat `color`, or its `texture` tinted by it. pattern?: Record<string, unknown> // How the ramp lies on the face, in cells of 6.25 cm (`cell`: another size in metres, rounded to a power of two from 1/64 to 2). A tone is an index into the ramp, 0 the darkest. A unit: `blocks: { course, run, slide, joint: "both" }` (a brick, a plank, a stacked stone; `course` and `run` in cells; `slide` how far every other course shifts, in cells, or "own" for a shift of each course's own) or `cells: { size, radius, cracks: [width, share] }` (a fracture block, a clump; a crack is `width` 0 to 0.5 of a cell's reach on `share` 0 to 1 of the borders, drawn in the joint tone); `base` the tone a unit starts at (one, or `[lo, hi]`); the walks of one tone, each a share 0 to 0.5 of the cells: `speck: { up, down }`, `grain: { axis, length, up, down }`, `blobs: { size, up, down }`, `drift: { size, up, down }`; `joint` the mortar between units: one tone, or `[toneA, toneB, share]` (toneB on `share` 0 to 1 of its cells); `clamp: [lo, hi]`; `face: { top, side, bottom }` (tones up or down, -4 to 4, by the way a face looks); `accents: [{ tone, share }]` (share 0 to 1); `cap: { tones, pattern }` another look on the faces that look up; `edge: { strength, width }` (a line at the cube's borders: `strength` -1 to 1, 0 none; `width` a share of the cube's side, 0.005 to 0.4, default 0.06). A ramp with no pattern is grown matter: blobs a few cells wide. growth?: Array<Record<string, unknown>> // What grows out of a face that wears `tones`, as stacks of small cubes: up to six rules; the first rule that grows on a cell owns it: `on` ("top", "side", "under"), `clump` (the drifts' size in cells, a power of two 2 to 64, default 16), `cover` (the share of such faces inside a drift, 0 to 1), `density` (the share of a drift's cells that grow a stack, 0 to 1), `height` (`[least, most]` in cubes, 1 to 16), `width` (cubes across, 1 to 4), `step` (the share of stacks whose tip steps aside: a bent blade, 0 to 1), `head` (cubes of a head one cell wider than its stalk: a flower, 0 to 4), `shade` (-1 to 1, away from or toward deep corner shade), `ramp` (`[root, tip]`: two shares 0 to 1 of the face's ramp where the stack's root and tip sit, default 0.2 and 0.9), `tones` (up to four colours of the stack's own) and `headTones` (up to two of the head's; a colour past the count is dropped). A picture alone: no collider, no cell. material?: ScriptedMaterialSpec // An object's scripted material on this block's faces; uv() is metres across a face, normalWorld and positionWorld the face's, vertexColor() its color; plain while it is broken. }

#### Block 1

````text
VoxelMaterialDef = {
  color?: Color
  texture?: string
  pbr?: boolean   // true derives normal and roughness from its raster texture (png, jpg, webp, avif); omitted, false, a color with no texture or a .ktx2 texture derives nothing
  roughness?: number
  metalness?: number
  opacity?: number
  transparent?: boolean   // See-through, as is an opacity below 1. A solid cube of it with no cutout (glass, ice) shows its picture's clear pixels as clear and draws no face between two cells of one such material.
  emissive?: Color
  emissiveIntensity?: number
  liquidKind?: string   // Explicit liquid marker for onLiquidEnter/onLiquidExit; becomes other.liquidKind.
  surfaceInset?: number   // Fraction of voxel height to lower the exposed top surface (0-0.99). Useful for liquids.
  solid?: boolean
  cutout?: boolean   // Alpha-tested art (leaves, plants): the picture's clear pixels are cut away, and a cube of it keeps the faces between its cells.
  collision?: "solid" | "none"
  countsAsTerrainSurface?: boolean
  wind?: { force?: number }   // Bends with the place's wind as a decoration item's `wind` does, the same word and meaning: the swaying cubes of one chunk move as one block (at the largest force among them), and a shaped cell of it (blockBehavior) moves whole, so a column of them moves as one stem, as far as a full-weight tip leans: about force × the wind's speed ÷ 2 metres downwind at a gust's heart, 0.32 of that between gusts, with a small cross-wind flutter, never more than 1 m (force 0.03–0.08 reads as a breeze). The picture alone: shadows, colliders and cells stay. Omitted or force 0: still.
  waveIntensity?: number   // the waves of a liquid that wears `tones`, as the water material's: 0 to 1, default about 0.15; 0 is dead calm (with `metalness` 1 and `roughness` 0 it mirrors the sky, and the scene on high and ultra)
  tags?: string[]   // Creator-defined tags for behavioral grouping (e.g. 'climbable', 'emits-light', 'bouncy'). Queried via ctx.place.voxels.query({ tag, radius }).
  blockBehavior?: VoxelMaterialBlockBehaviorDef
  tones?: string[]   // The ramp of the cube's face: up to twelve colours, darkest first. A material with `tones` paints every face from the ramp in its `pattern` and ignores its `texture`; one without draws its flat `color`, or its `texture` tinted by it.
  pattern?: Record<string, unknown>   // How the ramp lies on the face, in cells of 6.25 cm (`cell`: another size in metres, rounded to a power of two from 1/64 to 2). A tone is an index into the ramp, 0 the darkest. A unit: `blocks: { course, run, slide, joint: "both" }` (a brick, a plank, a stacked stone; `course` and `run` in cells; `slide` how far every other course shifts, in cells, or "own" for a shift of each course's own) or `cells: { size, radius, cracks: [width, share] }` (a fracture block, a clump; a crack is `width` 0 to 0.5 of a cell's reach on `share` 0 to 1 of the borders, drawn in the joint tone); `base` the tone a unit starts at (one, or `[lo, hi]`); the walks of one tone, each a share 0 to 0.5 of the cells: `speck: { up, down }`, `grain: { axis, length, up, down }`, `blobs: { size, up, down }`, `drift: { size, up, down }`; `joint` the mortar between units: one tone, or `[toneA, toneB, share]` (toneB on `share` 0 to 1 of its cells); `clamp: [lo, hi]`; `face: { top, side, bottom }` (tones up or down, -4 to 4, by the way a face looks); `accents: [{ tone, share }]` (share 0 to 1); `cap: { tones, pattern }` another look on the faces that look up; `edge: { strength, width }` (a line at the cube's borders: `strength` -1 to 1, 0 none; `width` a share of the cube's side, 0.005 to 0.4, default 0.06). A ramp with no pattern is grown matter: blobs a few cells wide.
  growth?: Array<Record<string, unknown>>   // What grows out of a face that wears `tones`, as stacks of small cubes: up to six rules; the first rule that grows on a cell owns it: `on` ("top", "side", "under"), `clump` (the drifts' size in cells, a power of two 2 to 64, default 16), `cover` (the share of such faces inside a drift, 0 to 1), `density` (the share of a drift's cells that grow a stack, 0 to 1), `height` (`[least, most]` in cubes, 1 to 16), `width` (cubes across, 1 to 4), `step` (the share of stacks whose tip steps aside: a bent blade, 0 to 1), `head` (cubes of a head one cell wider than its stalk: a flower, 0 to 4), `shade` (-1 to 1, away from or toward deep corner shade), `ramp` (`[root, tip]`: two shares 0 to 1 of the face's ramp where the stack's root and tip sit, default 0.2 and 0.9), `tones` (up to four colours of the stack's own) and `headTones` (up to two of the head's; a colour past the count is dropped). A picture alone: no collider, no cell.
  material?: ScriptedMaterialSpec   // An object's scripted material on this block's faces; uv() is metres across a face, normalWorld and positionWorld the face's, vertexColor() its color; plain while it is broken.
}
````


### After clicking "VoxelPlacementDef"

VoxelPlacementDef = | { kind: "at"; positions: Array<[number, number, number]> } | { kind: "scatter"; density: number; minSpacing?: number; seedOffset?: string; validSurfaceMaterials?: string[] } | { kind: "grid"; spacing: number; jitter?: number; probability?: number; validSurfaceMaterials?: string[] } | { kind: "cluster"; clusterRadius: number; clustersPerRegion: number; itemsPerCluster: number | [number, number]; validSurfaceMaterials?: string[] } // VoxelPlacementDef, every kind but "at" validSurfaceMaterials?: string[] // Only anchor on supporting surface blocks whose material id matches one of these values. // VoxelPlacementDef, kind "cluster" itemsPerCluster: number | [number, number] // How many items a cluster holds: a count, or a [min, max] range drawn per cluster.

#### Block 1

````text
VoxelPlacementDef =
  | { kind: "at"; positions: Array<[number, number, number]> }
  | { kind: "scatter"; density: number; minSpacing?: number; seedOffset?: string; validSurfaceMaterials?: string[] }
  | { kind: "grid"; spacing: number; jitter?: number; probability?: number; validSurfaceMaterials?: string[] }
  | { kind: "cluster"; clusterRadius: number; clustersPerRegion: number; itemsPerCluster: number | [number, number]; validSurfaceMaterials?: string[] }

// VoxelPlacementDef, every kind but "at"
  validSurfaceMaterials?: string[]   // Only anchor on supporting surface blocks whose material id matches one of these values.

// VoxelPlacementDef, kind "cluster"
  itemsPerCluster: number | [number, number]   // How many items a cluster holds: a count, or a [min, max] range drawn per cluster.
````


### After clicking "VoxelStructureDef"

VoxelStructureDef = { id: string priority?: number placement: VoxelPlacementDef template: VoxelTemplateDef }

#### Block 1

````text
VoxelStructureDef = {
  id: string
  priority?: number
  placement: VoxelPlacementDef
  template: VoxelTemplateDef
}
````


### After clicking "VoxelTemplateDef"

VoxelTemplateDef = | { kind: "builder"; source: ScriptRef } | { kind: "serialized"; data: SerializedVoxelTemplate }

#### Block 1

````text
VoxelTemplateDef =
  | { kind: "builder"; source: ScriptRef }
  | { kind: "serialized"; data: SerializedVoxelTemplate }
````


### After clicking "WorldBoundsDef"

World-space bounds for a place (PlaceDef.worldBounds).

WorldBoundsDef = { bottom?: number | false // The lowest y (meters, feet position) a character or vehicle may reach before the engine treats it as fallen out of the world. Crossing it fires the body's `onOutOfBounds` hook once per excursion and (unless a hook returns `false` to own the response) teleports the body back to the event's `respawnPoint`. Unauthored, every 3D place has one, 64 m under the lowest floor it offers: a heightmap's lowest ground built here (never above the `verticalRange` floor − 64 m), a voxel volume's floor, or: with no terrain floor (`terrain: off`, nothing installed), the jayzee point, never above −64 m: that place's ground is the game's own geometry, and a body past every floor comes back instead of dropping forever. A 2d-side place has one too, 64 m under its jayzee point, never above −64 m (its ground is the colliders you build); 2d-top has none unless you author one (nothing falls along y there). `false` removes the default: below-bound space falls forever (`ctx.place.worldBounds.bottom = false`). A value, never `null`: the place funnel deletes null at every depth, so a null here would re-expose the default it meant to remove. }

#### Block 1

````text
WorldBoundsDef = {
  bottom?: number | false   // The lowest y (meters, feet position) a character or vehicle may reach before the engine treats it as fallen out of the world. Crossing it fires the body's `onOutOfBounds` hook once per excursion and (unless a hook returns `false` to own the response) teleports the body back to the event's `respawnPoint`. Unauthored, every 3D place has one, 64 m under the lowest floor it offers: a heightmap's lowest ground built here (never above the `verticalRange` floor − 64 m), a voxel volume's floor, or: with no terrain floor (`terrain: off`, nothing installed), the spawn point, never above −64 m: that place's ground is the game's own geometry, and a body past every floor comes back instead of dropping forever. A 2d-side place has one too, 64 m under its spawn point, never above −64 m (its ground is the colliders you build); 2d-top has none unless you author one (nothing falls along y there). `false` removes the default: below-bound space falls forever (`ctx.place.worldBounds.bottom = false`). A value, never `null`: the place funnel deletes null at every depth, so a null here would re-expose the default it meant to remove.
}
````


## Not captured

Controls clicked: 89 of 89 planned controls in this section, out of 0 candidates found after the load and the scroll.
Controls not clicked by policy: 0. Their labels name an action that changes state or sends something, so they were left alone: none.
Controls that could not be found again after a retry: 0. Errors: 0.

Clicks made: 89. Clicks that brought up content not in the swept state: 89. The rest brought up nothing new.


## Sources

- `wiki-tools/recapture/states/toolbox/08-initial.json`
- `wiki-tools/recapture/states/toolbox/08-swept.json`
- `wiki-tools/recapture/states/toolbox/08-c001.json`
- `wiki-tools/recapture/states/toolbox/08-c002.json`
- `wiki-tools/recapture/states/toolbox/08-c003.json`
- `wiki-tools/recapture/states/toolbox/08-c004.json`
- `wiki-tools/recapture/states/toolbox/08-c005.json`
- `wiki-tools/recapture/states/toolbox/08-c006.json`
- `wiki-tools/recapture/states/toolbox/08-c007.json`
- `wiki-tools/recapture/states/toolbox/08-c008.json`
- `wiki-tools/recapture/states/toolbox/08-c009.json`
- `wiki-tools/recapture/states/toolbox/08-c010.json`
- `wiki-tools/recapture/states/toolbox/08-c011.json`
- `wiki-tools/recapture/states/toolbox/08-c012.json`
- `wiki-tools/recapture/states/toolbox/08-c013.json`
- `wiki-tools/recapture/states/toolbox/08-c014.json`
- `wiki-tools/recapture/states/toolbox/08-c015.json`
- `wiki-tools/recapture/states/toolbox/08-c016.json`
- `wiki-tools/recapture/states/toolbox/08-c017.json`
- `wiki-tools/recapture/states/toolbox/08-c018.json`
- `wiki-tools/recapture/states/toolbox/08-c019.json`
- `wiki-tools/recapture/states/toolbox/08-c020.json`
- `wiki-tools/recapture/states/toolbox/08-c021.json`
- `wiki-tools/recapture/states/toolbox/08-c022.json`
- `wiki-tools/recapture/states/toolbox/08-c023.json`
- `wiki-tools/recapture/states/toolbox/08-c024.json`
- `wiki-tools/recapture/states/toolbox/08-c025.json`
- `wiki-tools/recapture/states/toolbox/08-c026.json`
- `wiki-tools/recapture/states/toolbox/08-c027.json`
- `wiki-tools/recapture/states/toolbox/08-c028.json`
- `wiki-tools/recapture/states/toolbox/08-c029.json`
- `wiki-tools/recapture/states/toolbox/08-c030.json`
- `wiki-tools/recapture/states/toolbox/08-c031.json`
- `wiki-tools/recapture/states/toolbox/08-c032.json`
- `wiki-tools/recapture/states/toolbox/08-c033.json`
- `wiki-tools/recapture/states/toolbox/08-c034.json`
- `wiki-tools/recapture/states/toolbox/08-c035.json`
- `wiki-tools/recapture/states/toolbox/08-c036.json`
- `wiki-tools/recapture/states/toolbox/08-c037.json`
- `wiki-tools/recapture/states/toolbox/08-c038.json`
- `wiki-tools/recapture/states/toolbox/08-c039.json`
- `wiki-tools/recapture/states/toolbox/08-c040.json`
- `wiki-tools/recapture/states/toolbox/08-c041.json`
- `wiki-tools/recapture/states/toolbox/08-c042.json`
- `wiki-tools/recapture/states/toolbox/08-c043.json`
- `wiki-tools/recapture/states/toolbox/08-c044.json`
- `wiki-tools/recapture/states/toolbox/08-c045.json`
- `wiki-tools/recapture/states/toolbox/08-c046.json`
- `wiki-tools/recapture/states/toolbox/08-c047.json`
- `wiki-tools/recapture/states/toolbox/08-c048.json`
- `wiki-tools/recapture/states/toolbox/08-c049.json`
- `wiki-tools/recapture/states/toolbox/08-c050.json`
- `wiki-tools/recapture/states/toolbox/08-c051.json`
- `wiki-tools/recapture/states/toolbox/08-c052.json`
- `wiki-tools/recapture/states/toolbox/08-c053.json`
- `wiki-tools/recapture/states/toolbox/08-c054.json`
- `wiki-tools/recapture/states/toolbox/08-c055.json`
- `wiki-tools/recapture/states/toolbox/08-c056.json`
- `wiki-tools/recapture/states/toolbox/08-c057.json`
- `wiki-tools/recapture/states/toolbox/08-c058.json`
- `wiki-tools/recapture/states/toolbox/08-c059.json`
- `wiki-tools/recapture/states/toolbox/08-c060.json`
- `wiki-tools/recapture/states/toolbox/08-c061.json`
- `wiki-tools/recapture/states/toolbox/08-c062.json`
- `wiki-tools/recapture/states/toolbox/08-c063.json`
- `wiki-tools/recapture/states/toolbox/08-c064.json`
- `wiki-tools/recapture/states/toolbox/08-c065.json`
- `wiki-tools/recapture/states/toolbox/08-c066.json`
- `wiki-tools/recapture/states/toolbox/08-c067.json`
- `wiki-tools/recapture/states/toolbox/08-c068.json`
- `wiki-tools/recapture/states/toolbox/08-c069.json`
- `wiki-tools/recapture/states/toolbox/08-c070.json`
- `wiki-tools/recapture/states/toolbox/08-c071.json`
- `wiki-tools/recapture/states/toolbox/08-c072.json`
- `wiki-tools/recapture/states/toolbox/08-c073.json`
- `wiki-tools/recapture/states/toolbox/08-c074.json`
- `wiki-tools/recapture/states/toolbox/08-c075.json`
- `wiki-tools/recapture/states/toolbox/08-c076.json`
- `wiki-tools/recapture/states/toolbox/08-c077.json`
- `wiki-tools/recapture/states/toolbox/08-c078.json`
- `wiki-tools/recapture/states/toolbox/08-c079.json`
- `wiki-tools/recapture/states/toolbox/08-c080.json`
- `wiki-tools/recapture/states/toolbox/08-c081.json`
- `wiki-tools/recapture/states/toolbox/08-c082.json`
- `wiki-tools/recapture/states/toolbox/08-c083.json`
- `wiki-tools/recapture/states/toolbox/08-c084.json`
- `wiki-tools/recapture/states/toolbox/08-c085.json`
- `wiki-tools/recapture/states/toolbox/08-c086.json`
- `wiki-tools/recapture/states/toolbox/08-c087.json`
- `wiki-tools/recapture/states/toolbox/08-c088.json`
- `wiki-tools/recapture/states/toolbox/08-c089.json`
- `wiki-tools/recapture/states/toolbox/summary-08.json`
