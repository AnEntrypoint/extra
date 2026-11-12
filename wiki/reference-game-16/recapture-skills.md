# Game page section: Skills: text not in the capture

The Skills section of the toolbox, read on load, after a scroll, and after a click on each control that does not change state. Only text, headings, links, images and code that the first capture does not hold are listed.

## Items not in the capture

| Item | Count |
| --- | --- |
| Headings | 24 |
| Visible text blocks | 1233 |
| Hidden text blocks | 0 |
| Links | 0 |
| Images | 0 |
| Code or data blocks | 879 |

## Present on load, not in the capture

None found on load.

## Loaded after a scroll, not in the capture

None found after the scroll.

## Loaded after a click, not in the capture

### After clicking "read → geometry Buildings, creatures, characters, vehicles: anything 3D built in code, rigged with bones."

← all skills

The full playbook, as written.

You are a modeler with a vertex emitter; what you write is the finished thing: a cottage has a footing, walls thick enough to show jambs through a real door, a pitched roof with eaves and a chimney, glass windows, a lit hearth, and a body walks in, turns and is stopped by every wall. Detail is triangles you add: sills, lintels, stone courses, shingle rows, a bevel on every edge, a round form (your own ring, loft) showing no facet (ctx.smooth()); a flat panel or a box stack, textured or not, is a sketch. What you write is a mesh: "no mesh" names it too. A statue of you wears your own body: model: "https://spawnfile.io/prod/character-assets/1791961594798-savi-reduced-fitted-lighter-twin.glb".

loft

ctx.smooth()

model: "https://spawnfile.io/prod/character-assets/1791961594798-savi-reduced-fitted-lighter-twin.glb"

Levels buy detail: parts branch on ctx.lod (1 every tassel and bevel, further than you would go without levels, 2 drops trim, 3 the big forms, 4 outline boxes, 5 one closed hull). Levels keep outline and paint.

ctx.lod

Scale: a body is a 1.9 × 0.7 m capsule, eye 1.6: doors 1.1–1.3 × 2.2–2.4 m, ceilings 2.7–3.5, rooms ≥ 4 m, stairs 0.18 rise / 0.28 tread. One light per room: torch or hearth 20–40.

Floor first: under the creator (ctx.place.players) before terrain: kind: "off" removes ground. Ground is prepared, never floated over: a flatten mark on the footprint (→heightmap-terrain), ctx.groundY, ctx.groundNormal per post. A tunnel is your tube round the camera.

terrain: kind: "off"

ctx.groundY

ctx.groundNormal

Frame: −Z forward, +Y up, origin where it attaches; a positive pitch tips the nose up; facing +Z or ±X, forward: "+z" in the primitive.

forward: "+z"

Paint is a brush: ctx.albedo("cdn/texture-limewash-plaster.png") (any texture-<subject>) textures what follows until ctx.albedo(null); realism textures every face; trees and bushes wear leaf sprays (→trees, →leaf-sprays). ctx.color over a texture tints by the linear value (L 0.6 ≈ ×0.2), so tint at L 0.9+ and darken a room with its lights. A texture script (jayzee api TextureScript) paints pixels the game computes.

ctx.albedo("cdn/texture-limewash-plaster.png")

texture-<subject>

ctx.albedo(null)

ctx.color

jayzee api TextureScript

collider(ctx) is only the shell a body touches: closed slabs or sheets, openings open; props meet a sheet from above either way, from below only on its CCW side, walkers from either; opaque faces draw both sides, never a second copy facing back.

collider(ctx)

Script + params + seed = ONE mesh, shared by all naming it. A moving part (a door leaf) is its own kinematic or dynamic object carrying the joint (ctx.self.joints). A road is one route spelled twice: a road mark's spline grades the ground, a scripted snapToTerrain spline sweeps your cambered kerbed profile().

profile()

An animal is yours to make: one geometry(ctx) with its skeleton(); jiggle.bones springs ears and tail; it bends as one skin { joints, weights }; ctx.bone(name) binds a part turning whole. A CDN model (cdn/model-red-fox.glb, cooked from its name, what creators call Meshy) is the road once the creator asks for a ready-made model again (rig it →workshop; their picture →uploaded-models). A model talks by its jaw or mouth key, never an added mouth. A humanoid is the art style's call: a CDN body playing library clips and holding what a new name says (→animations), or yours: one skin in that style, with fingers. Each new person gets their own body on that road, never another's model: two on one read as twins.

skeleton()

jiggle.bones

{ joints, weights }

ctx.bone(name)

cdn/model-red-fox.glb

A CROWD (fish, birds, leaves: dozens alike) is ONE instanced mesh swayed by its scripted material's positionNode, no skeleton() per body. Thousands in ONE object are an instance set (ctx.instances).

ctx.instances

Returns and the whole ctx: jayzee api GeometryContext.

jayzee api GeometryContext

#### Block 1

````text
loft
````

#### Block 2

````text
ctx.smooth()
````

#### Block 3

````text
model: "https://spawnfile.io/prod/character-assets/1791961594798-savi-reduced-fitted-lighter-twin.glb"
````

#### Block 4

````text
ctx.lod
````

#### Block 5

````text
terrain: kind: "off"
````

#### Block 6

````text
ctx.groundY
````

#### Block 7

````text
ctx.groundNormal
````

#### Block 8

````text
forward: "+z"
````

#### Block 9

````text
ctx.albedo("cdn/texture-limewash-plaster.png")
````

#### Block 10

````text
texture-<subject>
````

#### Block 11

````text
ctx.albedo(null)
````

#### Block 12

````text
ctx.color
````

#### Block 13

````text
spawn api TextureScript
````

#### Block 14

````text
collider(ctx)
````

#### Block 15

````text
profile()
````

#### Block 16

````text
skeleton()
````

#### Block 17

````text
jiggle.bones
````

#### Block 18

````text
{ joints, weights }
````

#### Block 19

````text
ctx.bone(name)
````

#### Block 20

````text
cdn/model-red-fox.glb
````

#### Block 21

````text
ctx.instances
````

#### Block 22

````text
spawn api GeometryContext
````


### After clicking "read → heightmap-terrain Hills, islands, rivers, coasts, swimming, dug ground."

- H2: Heightmap Terrain
- H4: Signatures (generated: do not edit)

Heightmap Terrain

The bar: from the jayzee the ground reads as a place, never a plate. The coast is a wide sand apron, shallows wadeable for tens of metres, never a razor line or a cliff into a pool; an island has a beach on one side, a cliff on another; the jayzee is level ground. A noise term's whole height in metres ≤ its wavelength/16 on mountains, mesas and walls, /40 on hills, or the crest draws needles; noise.ridged only on a creator's ask. Materials blend along noise; bare thresholds draw contour lines.

heightAt/materialAt in your scripts/terrain.js are the landform (jayzee api TerrainHeightmapDef); terrain.marks, everything with an edge, override the generator. heightAt runs ~17k times per 80 m chunk: a track or river is a mark, never a points loop.

scripts/terrain.js

jayzee api TerrainHeightmapDef

terrain.marks

// scripts/terrain.js; materialAt's ctx adds worldHeight (after marks and strokes), slope (1 − normal.y; 0.29 = 45°), height01, normal import { shore } from "builtin/terrain"; const SEA = 0; const clamp01 = (v) => Math.min(1, Math.max(0, v)); export function heightAt(ctx) { const { x, z, noise, seedOffset } = ctx; // always set frequency (default 1 cycle/m); ridged and billowed2 are ≥ 0 and sum their octaves (1.875 at the defaults) const r = Math.hypot(x, z), far = clamp01(r / 1500) ** 2; const land = far * (220 + 55 * noise.fbm2({ x, z, frequency: 1 / 900, octaves: 2, seed: seedOffset(0) })); const toSea = clamp01((z - 60) / 120); // sea to the south return shore((20 + land * clamp01(r / 30 - 1)) * (1 - toSea) - 14 * toSea, SEA); } export function materialAt(ctx) { const { worldHeight, slope, noise, x, z, seedOffset } = ctx; const n = noise.fbm2({ x, z, frequency: 1 / 30, octaves: 3, seed: seedOffset(5) }); if (worldHeight < 1.8 + n) return { sand: 1 }; const rock = clamp01((slope - 0.25 + n * 0.1) * 4); return worldHeight > 200 + n * 20 ? { snow: 1 - rock / 2, rock: rock / 2 } : { rock, grass: 1 - rock }; }

Sea (t = place.terrain): t.marks.sea = { kind: "sea", level: 0, floorMaterial: "sand" }: water stands where heightAt < 0. Every coast but a cliff passes through shore(height, SEA). A lake fills your basin or digs a 2 m bowl (depth: 0 never digs); a river runs downhill along its points to sea or lake, depth digging its channel. A scripted liquid.material on the mark replaces the whole native look; keep its foam, caustics and fresnel as nodes from jayzee api builtin/water. A kind: "water" material is a picture: nothing swims. air: true keeps the sea out of a dome's convex hull.

t = place.terrain

t.marks.sea = { kind: "sea", level: 0, floorMaterial: "sand" }

shore(height, SEA)

depth: 0

liquid.material

jayzee api builtin/water

air: true

t.materials.sand = { albedo: "cdn/texture-terrain-sand-realistic-albedo.png", tint: "oklch(0.82 0.06 80)", textureScale: 2 }: ground wears PBR by default, a CDN picture like the fresh world's grass, gravel, rock (keep them). A painted scripts/tex-*.js is drawn ground (relief from brightness, no roughness map); a tint alone is flat painted ground: each only on a creator's ask. Add any other id whole or its weight paints nothing. Cover: t.decorations.layers.<id> + bindings.<materialId>: [layerId]: it grows only where a binding material dominates; t.decorations = null removes all. Nothing grows under a thing on the ground (floor, deck, trunk) or on a path or road unless a stroke paints its layer there; a clear-scatter mark suits open ground. density: items/m² of bound ground (starter meadow 50, stubble 3). up: "local" tilts an item to the slope. Cover ends where its item draws 2 px, within its and settings' maxDistance (default 200 m). Meadows: →meadow-grass. A verge is a layer bound to the path's edgeMaterial.

t.materials.sand = { albedo: "cdn/texture-terrain-sand-realistic-albedo.png", tint: "oklch(0.82 0.06 80)", textureScale: 2 }

scripts/tex-*.js

t.decorations.layers.<id>

bindings.<materialId>: [layerId]

t.decorations = null

up: "local"

t.material = { kind: "scripted", script, params }: material(ctx) shades all ground.

t.material = { kind: "scripted", script, params }

A bed on an uploaded or built mesh names it in scatter.surface.mesh: instanced cover; filter.maxSlope cuts slopes. Path posts: one scripted object (→geometry), never a bed, a ctx.instance per step along points at ctx.groundY.

scatter.surface.mesh

filter.maxSlope

ctx.instance

A graded path: a path mark with grade: true or a road with spline (points only paint), never materialAt; walking stops past 45°.

grade: true

Ground detail reach is that viewer's graphics tier: low anywhere and medium on phones and tablets stream the near bands, medium elsewhere, high and ultra append farther, coarser bands, coarse ground to camera.clip.far. On coarse far ground read their graphics tier: first (jayzee perf --frame, player-settings skill).

camera.clip.far

graphics tier:

jayzee perf --frame

Sculpt, dig and material paint are field paint: terrain.stroke(field, { center, radius, fn }), fn(p, inset, current) → the cell players see, both layers summed: () => 0 clears it. A hook's dab is this room's (PLAYER layer, never your files), takes any radius (~1 ms at 11 m), others see it ticks later; a run_script that persists, a god-mode brush or .authored write paints the CREATOR layer publish takes. delete ctx.place.terrain.runtimeEdits drops the PLAYER layer, restarts included. A material's weight adds to natural ground (1 ≈ half the cell); "terrain:natural-mask" at 1 lays the paint alone. A rut, crown, ditch or bank: "terrain:height" strokes along the mark's points.

terrain.stroke(field, { center, radius, fn })

fn(p, inset, current)

() => 0

delete ctx.place.terrain.runtimeEdits

"terrain:natural-mask"

"terrain:height"

"terrain:water[:<id>]" paint is liquid depth in metres (0 dry): a level pond paints level - terrain.heightAt(p.x, p.z), a channel its depth; it draws and bodies swim.

"terrain:water[:<id>]"

level - terrain.heightAt(p.x, p.z)

<!-- generated-types -->

Signatures (generated: do not edit)

ctx.self.liquid.in // in terrain water or a liquid volume ctx.self.liquid.level // surface Y, null when dry; a character floats there: physics.density = 1000 lets velocity.y dive, delete to float up ctx.getWaterLevelAt(x: num, z: num, place?: str): num | null // Liquid surface Y at column (x, z), null where dry: a mark's or a terrain:water[:<id>] field's ctx.readField(name: str, x: num, z: num, place?: str): num // Read a scalar field at a world position: authored + runtime composed, 0 where unpainted (defaults to caller's place). name is any string ctx.place.fields[name].runtime[chunk] // the player-layer chunk kx,kz ({ cellSize, chunkCells, quant, cells, version } | undefined): a bulk read, not a save: dug ground keeps by default ctx.place.fields[name].runtime[chunk] = { ...ctx.place.fields[name].grid, cells } // writes it ctx.place.fields[name].runtime[chunk].cells = next // in place delete ctx.place.fields[name].runtime[chunk] // clears it, like = null ctx.place.fields[name].authored[chunk] = { ...ctx.place.fields[name].grid, cells } // writes the creator layer Object.keys(ctx.place.fields[name].runtime) // painted chunks: delete all to reset ctx.place.fields[name].changes(at): { chunks, at } // chunks moved since your last at (dig, paint, clear); pass the new at next beat ctx.getTerrainNormal(x: num, z: num, place?: str): Vec3 | null // Sample terrain surface normal at world position (defaults to caller's place) // MarkShape = { kind: "circle", radius: num } | { kind: "ellipse", radiusX: num, radiusZ: num } | { kind: "rectangle", width: num, depth: num, rotation?: deg } terrain.kind: "heightmap" terrain.seed?: num | str terrain.materials?: [{ id: str, albedo?: "/cdn/value.<sha>.png", pbr?: bool, tint?: Color, normal?: str, roughness?: str, textureScale?: num, metalness?: num, normalStrength?: num, roughnessIntensity?: num, antiTiling?: "none" | "stochastic", filter?: "pixel" | "linear", macro?: { scale?, hue?, value? } }, ...] // textureScale = meters per tile (default 2.5); stochastic hides repeats on far organic ground terrain.generator?: "scripts/file.js" terrain.verticalRange?: { min, max } terrain.marks.<key>: { kind: "sea", level: num, reach?: { shape: "rectangle", width: num, depth: num, center: { x, z } } | { shape: "halfplane", edge: "north" | "south" | "east" | "west", offset: num }, floorMaterial?: str, liquid?: LiquidSpec } | { kind: "lake", at: { x, z }, radius: num, level?: num, depth?: num, bedMaterial?: str, liquid?: LiquidSpec } | { kind: "river", points: [[x, z] | [x, z, level], ...], width: num, depth?: num, closed?: bool, bedMaterial?: str, liquid?: LiquidSpec } | { kind: "path", points: [[x, y], ...], width: num, material?: str, edgeMaterial?: str, noise?: num, falloff?: num, clearScatter?: bool, grade?: bool, maxGrade?: num } | { kind: "road", points?: [[x, y], ...], spline?: [[x, y, z], ...], closed?: bool, width: num, material?: str, edgeMaterial?: str, edgeWidth?: num, falloff?: num, clearScatter?: bool } | { kind: "flatten", center: { x, z }, height: num | { terrain: num }, shape: MarkShape | { kind: "path", points: [[x, y], ...], width: num }, falloff: num, falloffCurve?: "smooth" | "cliff" | "linear", maxGrade?: num, material?: str, edgeMaterial?: str, clearScatter?: bool } | { kind: "clear-scatter", center: { x, z }, shape: MarkShape | { kind: "path", points: [[x, y], ...], width: num } } | { kind: "hole", points: [[x, y], ...] } terrain.water?: LiquidSpec | [{ id?: str, ...LiquidSpec }, ...] // terrain:water[:<id>] paint's liquid and material, per entry; omitted: still water terrain.material?: ScriptedMaterialSpec // DecorationItem = { kind: "sprite", weight?: num, texture: "/cdn/value.<sha>.png", uvRect?: { x, y, width, height }, anchor?: [x, y], height?: [x, y], width?: [x, y], up?: "world" | "local", wind?: { force?, scale?, speed? }, alphaTest?: num, sink?: num, randomRotation?: bool, useTerrainColor?: bool, terrainPatternStrength?: 0-1, maxDistance?: num, colorJitter?: { hue?, value? } } | { kind: "scripted", weight?: num, script: "scripts/file.js", params?: Record<str, any>, color?: str, wind?: { force?, scale?, speed? }, useTerrainColor?: bool, avoidWater?: bool, maxWaterDepth?: num, seed?: num, scale?: [x, y], up?: "world" | "local", randomRotation?: bool, sink?: num, maxDistance?: num, colorJitter?: { hue?, value? } } terrain.decorations?: { layers: Record<str, { items: [DecorationItem, ...], material?: ScriptedMaterialSpec, density: num, paint?: str, paintedOnly?: bool, constraints?: { slopeRange?: [x, y], heightRange?: [x, y] }, noise?: { scale?, threshold?, seed? }, cluster?: { clusters, radius, seed?, falloff? } }>, bindings: Record<str, [str, ...]>, settings?: { maxDistance?: num, fadeDistance?: num, budget?: num, enabled?: bool } }

<!-- /generated-types -->

#### Block 1

````text
scripts/terrain.js
````

#### Block 2

````text
spawn api TerrainHeightmapDef
````

#### Block 3

````text
terrain.marks
````

#### Block 4

````text
// scripts/terrain.js; materialAt's ctx adds worldHeight (after marks and strokes), slope (1 − normal.y; 0.29 = 45°), height01, normal
import { shore } from "builtin/terrain";
const SEA = 0;
const clamp01 = (v) => Math.min(1, Math.max(0, v));
export function heightAt(ctx) {
  const { x, z, noise, seedOffset } = ctx; // always set frequency (default 1 cycle/m); ridged and billowed2 are ≥ 0 and sum their octaves (1.875 at the defaults)
  const r = Math.hypot(x, z), far = clamp01(r / 1500) ** 2;
  const land = far * (220 + 55 * noise.fbm2({ x, z, frequency: 1 / 900, octaves: 2, seed: seedOffset(0) }));
  const toSea = clamp01((z - 60) / 120); // sea to the south
  return shore((20 + land * clamp01(r / 30 - 1)) * (1 - toSea) - 14 * toSea, SEA);
}
export function materialAt(ctx) {
  const { worldHeight, slope, noise, x, z, seedOffset } = ctx;
  const n = noise.fbm2({ x, z, frequency: 1 / 30, octaves: 3, seed: seedOffset(5) });
  if (worldHeight < 1.8 + n) return { sand: 1 };
  const rock = clamp01((slope - 0.25 + n * 0.1) * 4);
  return worldHeight > 200 + n * 20 ? { snow: 1 - rock / 2, rock: rock / 2 } : { rock, grass: 1 - rock };
}
````

#### Block 5

````text
t = place.terrain
````

#### Block 6

````text
t.marks.sea = { kind: "sea", level: 0, floorMaterial: "sand" }
````

#### Block 7

````text
shore(height, SEA)
````

#### Block 8

````text
depth: 0
````

#### Block 9

````text
liquid.material
````

#### Block 10

````text
spawn api builtin/water
````

#### Block 11

````text
air: true
````

#### Block 12

````text
t.materials.sand = { albedo: "cdn/texture-terrain-sand-realistic-albedo.png", tint: "oklch(0.82 0.06 80)", textureScale: 2 }
````

#### Block 13

````text
scripts/tex-*.js
````

#### Block 14

````text
t.decorations.layers.<id>
````

#### Block 15

````text
bindings.<materialId>: [layerId]
````

#### Block 16

````text
t.decorations = null
````

#### Block 17

````text
up: "local"
````

#### Block 18

````text
t.material = { kind: "scripted", script, params }
````

#### Block 19

````text
scatter.surface.mesh
````

#### Block 20

````text
filter.maxSlope
````

#### Block 21

````text
ctx.instance
````

#### Block 22

````text
grade: true
````

#### Block 23

````text
camera.clip.far
````

#### Block 24

````text
graphics tier:
````

#### Block 25

````text
spawn perf --frame
````

#### Block 26

````text
terrain.stroke(field, { center, radius, fn })
````

#### Block 27

````text
fn(p, inset, current)
````

#### Block 28

````text
() => 0
````

#### Block 29

````text
delete ctx.place.terrain.runtimeEdits
````

#### Block 30

````text
"terrain:natural-mask"
````

#### Block 31

````text
"terrain:height"
````

#### Block 32

````text
"terrain:water[:<id>]"
````

#### Block 33

````text
level - terrain.heightAt(p.x, p.z)
````

#### Block 34

````text
ctx.self.liquid.in // in terrain water or a liquid volume
ctx.self.liquid.level // surface Y, null when dry; a character floats there: physics.density = 1000 lets velocity.y dive, delete to float up
ctx.getWaterLevelAt(x: num, z: num, place?: str): num | null // Liquid surface Y at column (x, z), null where dry: a mark's or a terrain:water[:<id>] field's
ctx.readField(name: str, x: num, z: num, place?: str): num // Read a scalar field at a world position: authored + runtime composed, 0 where unpainted (defaults to caller's place). name is any string
ctx.place.fields[name].runtime[chunk] // the player-layer chunk kx,kz ({ cellSize, chunkCells, quant, cells, version } | undefined): a bulk read, not a save: dug ground keeps by default
ctx.place.fields[name].runtime[chunk] = { ...ctx.place.fields[name].grid, cells } // writes it
ctx.place.fields[name].runtime[chunk].cells = next // in place
delete ctx.place.fields[name].runtime[chunk] // clears it, like = null
ctx.place.fields[name].authored[chunk] = { ...ctx.place.fields[name].grid, cells } // writes the creator layer
Object.keys(ctx.place.fields[name].runtime) // painted chunks: delete all to reset
ctx.place.fields[name].changes(at): { chunks, at } // chunks moved since your last at (dig, paint, clear); pass the new at next beat
ctx.getTerrainNormal(x: num, z: num, place?: str): Vec3 | null // Sample terrain surface normal at world position (defaults to caller's place)
// MarkShape = { kind: "circle", radius: num } | { kind: "ellipse", radiusX: num, radiusZ: num } | { kind: "rectangle", width: num, depth: num, rotation?: deg }
terrain.kind: "heightmap"
terrain.seed?: num | str
terrain.materials?: [{ id: str, albedo?: "/cdn/value.<sha>.png", pbr?: bool, tint?: Color, normal?: str, roughness?: str, textureScale?: num, metalness?: num, normalStrength?: num, roughnessIntensity?: num, antiTiling?: "none" | "stochastic", filter?: "pixel" | "linear", macro?: { scale?, hue?, value? } }, ...] // textureScale = meters per tile (default 2.5); stochastic hides repeats on far organic ground
terrain.generator?: "scripts/file.js"
terrain.verticalRange?: { min, max }
terrain.marks.<key>: { kind: "sea", level: num, reach?: { shape: "rectangle", width: num, depth: num, center: { x, z } } | { shape: "halfplane", edge: "north" | "south" | "east" | "west", offset: num }, floorMaterial?: str, liquid?: LiquidSpec } | { kind: "lake", at: { x, z }, radius: num, level?: num, depth?: num, bedMaterial?: str, liquid?: LiquidSpec } | { kind: "river", points: [[x, z] | [x, z, level], ...], width: num, depth?: num, closed?: bool, bedMaterial?: str, liquid?: LiquidSpec } | { kind: "path", points: [[x, y], ...], width: num, material?: str, edgeMaterial?: str, noise?: num, falloff?: num, clearScatter?: bool, grade?: bool, maxGrade?: num } | { kind: "road", points?: [[x, y], ...], spline?: [[x, y, z], ...], closed?: bool, width: num, material?: str, edgeMaterial?: str, edgeWidth?: num, falloff?: num, clearScatter?: bool } | { kind: "flatten", center: { x, z }, height: num | { terrain: num }, shape: MarkShape | { kind: "path", points: [[x, y], ...], width: num }, falloff: num, falloffCurve?: "smooth" | "cliff" | "linear", maxGrade?: num, material?: str, edgeMaterial?: str, clearScatter?: bool } | { kind: "clear-scatter", center: { x, z }, shape: MarkShape | { kind: "path", points: [[x, y], ...], width: num } } | { kind: "hole", points: [[x, y], ...] }
terrain.water?: LiquidSpec | [{ id?: str, ...LiquidSpec }, ...] // terrain:water[:<id>] paint's liquid and material, per entry; omitted: still water
terrain.material?: ScriptedMaterialSpec
// DecorationItem = { kind: "sprite", weight?: num, texture: "/cdn/value.<sha>.png", uvRect?: { x, y, width, height }, anchor?: [x, y], height?: [x, y], width?: [x, y], up?: "world" | "local", wind?: { force?, scale?, speed? }, alphaTest?: num, sink?: num, randomRotation?: bool, useTerrainColor?: bool, terrainPatternStrength?: 0-1, maxDistance?: num, colorJitter?: { hue?, value? } } | { kind: "scripted", weight?: num, script: "scripts/file.js", params?: Record<str, any>, color?: str, wind?: { force?, scale?, speed? }, useTerrainColor?: bool, avoidWater?: bool, maxWaterDepth?: num, seed?: num, scale?: [x, y], up?: "world" | "local", randomRotation?: bool, sink?: num, maxDistance?: num, colorJitter?: { hue?, value? } }
terrain.decorations?: { layers: Record<str, { items: [DecorationItem, ...], material?: ScriptedMaterialSpec, density: num, paint?: str, paintedOnly?: bool, constraints?: { slopeRange?: [x, y], heightRange?: [x, y] }, noise?: { scale?, threshold?, seed? }, cluster?: { clusters, radius, seed?, falloff? } }>, bindings: Record<str, [str, ...]>, settings?: { maxDistance?: num, fadeDistance?: num, budget?: num, enabled?: bool } }
````


### After clicking "read → voxel-terrain Block worlds, dig and place, caves."

- H2: Voxel Terrain

Voxel Terrain

The bar: a block world is a volume before it is a skin. A cave is a room you stand INSIDE: rock over your head, a ledge under your feet that faces the chamber, a glowing floor of lava or water below, a way down (steps, a lantern trail); an island has a stone belly, a grass crown, air under it and a fall that returns you; a mine has ore in bands and a hole that stays. Light a room from what is in it (lava, crystal, lanterns), never from a sky it cannot see, and put the jayzee where the ask put the player: the creator judges the arrival view first. Each click lands that tick for every player. A cold young world takes the voxels starter first (one call; dig.js: left click breaks, right places), then build moves. Buildings are blocks: a castle or bridge is a builder script stamped as a structure mark; the field stays kind: voxel.

materialAt(ctx) is the source of truth ("air" is empty: never define it); ctx.x/y/z are world METERS whatever cellSize; noise.simplex3 is the volume op: caves, tunnels and ore are 3D bands. ctx.place.voxels[x][y][z] takes integer CELL coords, world = cell × cellSize (0.125 to 2, doubling; 2D: 0.5 (Terraria scale) and up); a read is the id, null for air, "unloaded" off resident cells. = "stone" places, = null breaks and fires onNeighborChanged; voxels.fill fires no per-cell hooks and lands any box whole at once: walls, floors and rooms are a few fills, not cell loops. A live dig writes in onInput, no timer: a cell or small fill costs 3–5 ms of sim, its chunk's mesh and collider that tick. Marks are authored local edits, voxels.* live script edits, blockBehavior what a block does alone (water spreading, wheat growing, ore dropping in onBreak: block.spawn(def) at the cell, in its material, place-owned to outlive the breaker). Only a persistent place keeps edits itself. Past lodRanges far land draws to min(camera.far, linear fog far). A 2D place plays one slice (defaultSlices.sideZ (2d-side) / topY (2d-top)); every voxel call answers in slice cells (→2d-mode).

// places/main/config.yaml, by run_script place.terrain = { kind: "voxel", seed: 7, verticalRange: { min: -24, max: 64 }, generator: "scripts/terrain.js", materials: { grass: { color: "oklch(.64 .13 135)", tones: ["oklch(.46 .1 135)", "oklch(.58 .13 135)", "oklch(.72 .16 135)"], growth: [{ density: 0.04, height: [2, 4], head: 1, headTones: ["oklch(.88 .18 95)"] }, { density: 0.5, height: [1, 7] }], countsAsTerrainSurface: true }, // tones: a painted face, darkest first; growth: flowers and blades from it (jayzee api VoxelMaterialDef) dirt: { color: "oklch(.47 .07 60)", countsAsTerrainSurface: true }, stone: { color: "oklch(.6 .01 270)", countsAsTerrainSurface: true }, // color alone is flat or tints a texture (cdn/texture-<what>.png) brick: { tones: ["oklch(.38 .15 29)", "oklch(.6 .14 25)", "oklch(.81 0 0)"], pattern: { base: [0, 1], blocks: { course: 3, run: 5, slide: 2, joint: "both" }, joint: 2 } }, ore: { color: "oklch(.7 .14 60)", emissive: "oklch(.75 .15 60)", emissiveIntensity: 0.8 }, // emissive is a tiny glow; a real light lights the room crystal: { color: "oklch(.75 .1 222)", emissive: "oklch(.87 .09 222)", emissiveIntensity: 1.35 }, lava: { liquidKind: "lava", color: "oklch(.7 .19 40)", emissive: "oklch(.8 .2 45)", emissiveIntensity: 2, solid: false, collision: "none", surfaceInset: 0.125 }, }, marks: { camp: { kind: "flatten", center: { x: 0, y: 30, z: 44 }, shape: "circle", radius: 6, material: "grass", depth: 3 } }, }; // scripts/terrain.js export function materialAt({ x, y, z, noise, seedOffset }) { const hill = 28 + noise.fbm2({ x, z, frequency: 1 / 90, octaves: 4, seed: seedOffset(0) }) * 12; if (y > hill) return "air"; const r = Math.hypot(x, z - 10); // cavern const roof = 22 - r * 0.35, floor = -2 + r * r * 0.02; if (r < 26 && y < roof && y > floor) return y < 1 ? "lava" : "air"; const worm = noise.simplex3({ x, y, z, frequency: 1 / 14, seed: seedOffset(1) }); if (y < hill - 3 && Math.abs(worm) < 0.07) return "air"; const depth = hill - y; if (depth < 1) return "grass"; if (depth < 4) return "dirt"; if (noise.simplex3({ x, y, z, frequency: 1 / 9, seed: seedOffset(2) }) > 0.78) return "ore"; if (y < 6 && noise.simplex3({ x, y, z, frequency: 1 / 5, seed: seedOffset(3) }) > 0.86) return "crystal"; return "stone"; }

materialAt(ctx): materialId | "air" // seed ids: ctx.place rolls per-instance ground, ctx.room per-room ctx.day, ctx.params // the place's day (sky-cycle turns), live numbers ({} until written: ctx.place.terrain.params.snow = 1 rebuilds chunks that read it); digs and builds stay put as the ground moves; a land.wgsl's top-level `override snow: i32 = 0;` reads one in any function, default until written export function dayKey(ctx) // ctx { x, y, z, size, height?, day, params, place }, a chunk's box (height: a far column's): hash the day and params its cells read (0: none); only chunks whose key moved rebuild terrain.verticalRange default { min: -32, max: 256 }: bounds streaming, generating, slices. lodRanges default [96, 288] terrain.meshing.style "smooth" // rounded ground; digs and reads stay on cells terrain.materials.<id> // merges by id. solid (physics, default true) and cutout (alpha-tested art) are independent; collision: "none" only for ground cover and liquids (solid leaves hold players on canopy); liquidKind makes a liquid (onLiquidEnter/Exit; non-solid alone does not), surfaceInset sinks its top, with tones waveIntensity 0 is still, metalness 1 + roughness 0 mirrors the sky; countsAsTerrainSurface marks ground for placement and terrain.heightAt; tags are yours (a ladder is climbable, not solid) materials.<id>.wind: { force } // its cubes (a chunk's sway as one) and shaped cells lean with the place's wind; 0.03–0.08 is a breeze materials.<id>.blockBehavior: { script, randomTick, scheduledTick, neighborChanged } // only the flags it needs; fluids and propped blocks want neighborChanged + scheduledTick materials.<id>.pattern.flowSpeed, flowDirection: [x, z] // a painted face's pattern slides that way on up, down and down side faces (0.1 ≈ 1.2 m/s): falls fall, rivers run, lava creeps; cubes stay voxels.solid(x, y, z): true | false | null // null = unknown yet; only === false confirms empty voxels.fill(min, max, material | null, { state }) // any corner pair; state: decoded fields as hooks read them ({ stage: 3 }); false for an unknown material; one command per touched chunk; a made thing's fill answers { left }: unreached or unread cells (0 = done) voxels.stamp(source, cell, { author, id }) // cell: the source origin's { x, y, z }; source: a terrain.structures id, a script exporting build() over builtin/voxels part(), or { bounds, palette, voxels } (palette index -1 writes air; a fifth number is read's packed states[i]); author: true appends to terrain.structures (survives regen) instead voxels.raycast(origin, dir, { distance = 64, includeLiquids, place }): { position, normal, distance, voxel, adjacentVoxel, materialId, state } | null // break voxel, place at adjacentVoxel (the empty cell before it, null if enclosed), fx at position ctx.place.terrain.colorAt(x, y, z, normal) // the face's paint (raycast's normal); null off cube ground or unloaded voxels.query({ tag, radius, center, place }): [{ x, y, z, material, state }] // unsorted; center defaults to feet; small radii, seldom, never per frame voxels.interact(x, y, z) // runs onInteract voxels.read(min, max): { min, size, palette, cells, states } // inclusive corners; cells[i] indexes palette (palette[0] null = air; -1 not held here), states[i] its packed state; x fastest, then z, then y (min, size: [x, y, z]) onVoxelsChanged(ctx, boxes) // sim.js: this place's held cells any hand changed here since the last ring (not streaming); boxes [{ min, max }], each one voxels.read terrain.marks.<key> // kinds flatten | clear | pond | river | path | structure, applied in order; center.y and each point's y are hints: the mark takes the nearest solid-to-air boundary; clear { shape: "sphere" }: a 3D bubble; rivers meander with 6+ points; structure { feetPosition (bottom-center), generator | template, flattenBelow }: the script is the truth terrain.structures: [{ id, priority, placement, template }] // ordered overlays baked into chunk mesh + collider; placement at | scatter | grid | cluster; template { kind: "builder", source } | { kind: "serialized", data }; instances stamp it verbatim (a variant is its own entry) per cell: player edits > structures (higher priority wins) > marks > generator // structure holes fall through; delete ctx.place.terrain.runtimeEdits drops player edits for all, restart included (fresh cave); ["kx,kz"] one 16 m column's (Object.keys lists them) block script exports // stateSchema; geometry / collider / raycastShape / surface, each (state): pure shape resolvers (builtin/block-shape) render, physics and support share; onRandomTick(block), onScheduledTick(block), onNeighborChanged(block, { dx, dy, dz, materialId }), onInteract(block, player), onBreak(block) (before the clear; per-cell breaks only); uvs draw as written; a shape with none takes the picture by position block: { x, y, z, materialId, state, get() → { materialId, state } | null, set(materialId, state), break(), isSolid(), schedule(delayTicks), random(), jayzee(def) → id, … } // all but random and jayzee take trailing offsets dx, dy, dz (default 0); empty cells are null, never "air"; random() is deterministic 0..1 voxelMarkSet { markId, voxel, outline, fill, pulse, duration } / voxelMarkClear { markId } // a named overlay on one cell; { audience } on the emit scopes it to one player

#### Block 1

````text
// places/main/config.yaml, by run_script
place.terrain = {
  kind: "voxel",
  seed: 7,
  verticalRange: { min: -24, max: 64 },
  generator: "scripts/terrain.js",
  materials: {
    grass: { color: "oklch(.64 .13 135)", tones: ["oklch(.46 .1 135)", "oklch(.58 .13 135)", "oklch(.72 .16 135)"], growth: [{ density: 0.04, height: [2, 4], head: 1, headTones: ["oklch(.88 .18 95)"] }, { density: 0.5, height: [1, 7] }], countsAsTerrainSurface: true }, // tones: a painted face, darkest first; growth: flowers and blades from it (spawn api VoxelMaterialDef)
    dirt: { color: "oklch(.47 .07 60)", countsAsTerrainSurface: true },
    stone: { color: "oklch(.6 .01 270)", countsAsTerrainSurface: true }, // color alone is flat or tints a texture (cdn/texture-<what>.png)
    brick: { tones: ["oklch(.38 .15 29)", "oklch(.6 .14 25)", "oklch(.81 0 0)"], pattern: { base: [0, 1], blocks: { course: 3, run: 5, slide: 2, joint: "both" }, joint: 2 } },
    ore: { color: "oklch(.7 .14 60)", emissive: "oklch(.75 .15 60)", emissiveIntensity: 0.8 }, // emissive is a tiny glow; a real light lights the room
    crystal: { color: "oklch(.75 .1 222)", emissive: "oklch(.87 .09 222)", emissiveIntensity: 1.35 },
    lava: { liquidKind: "lava", color: "oklch(.7 .19 40)", emissive: "oklch(.8 .2 45)", emissiveIntensity: 2, solid: false, collision: "none", surfaceInset: 0.125 },
  },
  marks: { camp: { kind: "flatten", center: { x: 0, y: 30, z: 44 }, shape: "circle", radius: 6, material: "grass", depth: 3 } },
};

// scripts/terrain.js
export function materialAt({ x, y, z, noise, seedOffset }) {
  const hill = 28 + noise.fbm2({ x, z, frequency: 1 / 90, octaves: 4, seed: seedOffset(0) }) * 12;
  if (y > hill) return "air";
  const r = Math.hypot(x, z - 10); // cavern
  const roof = 22 - r * 0.35, floor = -2 + r * r * 0.02;
  if (r < 26 && y < roof && y > floor) return y < 1 ? "lava" : "air";
  const worm = noise.simplex3({ x, y, z, frequency: 1 / 14, seed: seedOffset(1) });
  if (y < hill - 3 && Math.abs(worm) < 0.07) return "air";
  const depth = hill - y;
  if (depth < 1) return "grass";
  if (depth < 4) return "dirt";
  if (noise.simplex3({ x, y, z, frequency: 1 / 9, seed: seedOffset(2) }) > 0.78) return "ore";
  if (y < 6 && noise.simplex3({ x, y, z, frequency: 1 / 5, seed: seedOffset(3) }) > 0.86) return "crystal";
  return "stone";
}
````

#### Block 2

````text
materialAt(ctx): materialId | "air" // seed ids: ctx.place rolls per-instance ground, ctx.room per-room
ctx.day, ctx.params // the place's day (sky-cycle turns), live numbers ({} until written: ctx.place.terrain.params.snow = 1 rebuilds chunks that read it); digs and builds stay put as the ground moves; a land.wgsl's top-level `override snow: i32 = 0;` reads one in any function, default until written
export function dayKey(ctx) // ctx { x, y, z, size, height?, day, params, place }, a chunk's box (height: a far column's): hash the day and params its cells read (0: none); only chunks whose key moved rebuild
terrain.verticalRange default { min: -32, max: 256 }: bounds streaming, generating, slices. lodRanges default [96, 288]
terrain.meshing.style "smooth" // rounded ground; digs and reads stay on cells
terrain.materials.<id> // merges by id. solid (physics, default true) and cutout (alpha-tested art) are independent; collision: "none" only for ground cover and liquids (solid leaves hold players on canopy); liquidKind makes a liquid (onLiquidEnter/Exit; non-solid alone does not), surfaceInset sinks its top, with tones waveIntensity 0 is still, metalness 1 + roughness 0 mirrors the sky; countsAsTerrainSurface marks ground for placement and terrain.heightAt; tags are yours (a ladder is climbable, not solid)
materials.<id>.wind: { force } // its cubes (a chunk's sway as one) and shaped cells lean with the place's wind; 0.03–0.08 is a breeze
materials.<id>.blockBehavior: { script, randomTick, scheduledTick, neighborChanged } // only the flags it needs; fluids and propped blocks want neighborChanged + scheduledTick
materials.<id>.pattern.flowSpeed, flowDirection: [x, z] // a painted face's pattern slides that way on up, down and down side faces (0.1 ≈ 1.2 m/s): falls fall, rivers run, lava creeps; cubes stay
voxels.solid(x, y, z): true | false | null // null = unknown yet; only === false confirms empty
voxels.fill(min, max, material | null, { state }) // any corner pair; state: decoded fields as hooks read them ({ stage: 3 }); false for an unknown material; one command per touched chunk; a made thing's fill answers { left }: unreached or unread cells (0 = done)
voxels.stamp(source, cell, { author, id }) // cell: the source origin's { x, y, z }; source: a terrain.structures id, a script exporting build() over builtin/voxels part(), or { bounds, palette, voxels } (palette index -1 writes air; a fifth number is read's packed states[i]); author: true appends to terrain.structures (survives regen) instead
voxels.raycast(origin, dir, { distance = 64, includeLiquids, place }): { position, normal, distance, voxel, adjacentVoxel, materialId, state } | null // break voxel, place at adjacentVoxel (the empty cell before it, null if enclosed), fx at position
ctx.place.terrain.colorAt(x, y, z, normal) // the face's paint (raycast's normal); null off cube ground or unloaded
voxels.query({ tag, radius, center, place }): [{ x, y, z, material, state }] // unsorted; center defaults to feet; small radii, seldom, never per frame
voxels.interact(x, y, z) // runs onInteract
voxels.read(min, max): { min, size, palette, cells, states } // inclusive corners; cells[i] indexes palette (palette[0] null = air; -1 not held here), states[i] its packed state; x fastest, then z, then y (min, size: [x, y, z])
onVoxelsChanged(ctx, boxes) // sim.js: this place's held cells any hand changed here since the last ring (not streaming); boxes [{ min, max }], each one voxels.read
terrain.marks.<key> // kinds flatten | clear | pond | river | path | structure, applied in order; center.y and each point's y are hints: the mark takes the nearest solid-to-air boundary; clear { shape: "sphere" }: a 3D bubble; rivers meander with 6+ points; structure { feetPosition (bottom-center), generator | template, flattenBelow }: the script is the truth
terrain.structures: [{ id, priority, placement, template }] // ordered overlays baked into chunk mesh + collider; placement at | scatter | grid | cluster; template { kind: "builder", source } | { kind: "serialized", data }; instances stamp it verbatim (a variant is its own entry)
per cell: player edits > structures (higher priority wins) > marks > generator // structure holes fall through; delete ctx.place.terrain.runtimeEdits drops player edits for all, restart included (fresh cave); ["kx,kz"] one 16 m column's (Object.keys lists them)
block script exports // stateSchema; geometry / collider / raycastShape / surface, each (state): pure shape resolvers (builtin/block-shape) render, physics and support share; onRandomTick(block), onScheduledTick(block), onNeighborChanged(block, { dx, dy, dz, materialId }), onInteract(block, player), onBreak(block) (before the clear; per-cell breaks only); uvs draw as written; a shape with none takes the picture by position
block: { x, y, z, materialId, state, get() → { materialId, state } | null, set(materialId, state), break(), isSolid(), schedule(delayTicks), random(), spawn(def) → id, … } // all but random and spawn take trailing offsets dx, dy, dz (default 0); empty cells are null, never "air"; random() is deterministic 0..1
voxelMarkSet { markId, voxel, outline, fill, pulse, duration } / voxelMarkClear { markId } // a named overlay on one cell; { audience } on the emit scopes it to one player
````


### After clicking "read → 2d-mode Side-scrollers and top-down: tiles, drawn sprites, parallax."

- H2: 2D Mode

2D Mode

jayzee starter 2d-top (or 2d-side) is the first call on a young world: mode, gravity, a drawn player (scripts/tex-hero.js, its ?facing= set), the rig, a drawn wang ground. 2D places share a world with 3D ones: a hop between them re-dresses from the template: a template sprite stays on in 3D; one with no visual wears the avatar there, and the 2D place's onArrive adds the sprite. The bar: one drawing that plays: one palette, one texel density, one light direction across tiles, sprites, plates and HUD; never a box floor under sprite art, never a stretched sprite.

jayzee starter 2d-top

scripts/tex-hero.js

?facing=

Tiles. tileAt({ x, y, world }) answers a 1-based atlas id per cell (0 or null = empty), x right, row 0 at the TOP: 2d-top y grows down-screen (+Z), 2d-side y grows down (−Y). Per-room ground reads world.state and redraws when it changes. tileAt sees no script's globals: answer from x, y and world.state alone. Solid tiles are real colliders in BOTH modes: solidTiles: [ids] merges them from tileAt: ground and platforms in 2d-side, walls that block characters in 2d-top (rock, water, cliff ids); tiles[x][y] gating is for non-physical movement (grid-snap steps). ctx.place.tiles[x][y] = id paints a cell for everyone, = 0 carves it, delete returns it to tileAt. The wang atlas is 16 corner-mask tiles, id = mask + 1, bits TL=1 TR=2 BL=4 BR=8 marking material-B corners (1 pure A, 16 pure B); the atlas is a texture script (jayzee api TextureScript): a plain tile grid is ctx.canvas cells at tilesetColumns. A side-scroller's ground is a surface band over a borderless fill: boxes are platforms and blockers, never the running surface.

Tiles.

tileAt({ x, y, world })

tileAt

solidTiles: [ids]

ctx.canvas

tilesetColumns

Collision runs opposite per mode. 2d-top: world objects are SOLID (physics: "static") and a tall sprite collides at its FEET: collider2d is image space, y DOWN, normalized, v = 1 the feet: the foot band [[0.32, 0.86], [0.68, 0.86], [0.68, 1], [0.32, 1]] is the trunk a walker bumps; a band higher in the image sits up-screen of the trunk and the walker passes under it; the auto hull wraps the whole canopy. Only ground decals are physics: "none"; 2d-top has NO ground collider, ever. 2d-side: depth dressing is NON-solid: z is draw order, not collision: plates, canopies, signs take physics: "none"; solid is the playable band (solidTiles, platforms, blockers).

Collision runs opposite per mode.

[[0.32, 0.86], [0.68, 0.86], [0.68, 1], [0.32, 1]]

physics: "none"

solidTiles

Movement. 2d-top is X/Z, bodies pinned to the plane, up-input is −z, ctx.self.velocity = { x, y: 0, z } held until rewritten. 2d-side: the controller adds no gravity: every body's script bends vy (ctx.self.velocity = { x: vx, y: v.y + GRAVITY * dt, z: 0 }; a wander script without it floats); player z 1.5, level geometry −1..0, plates −15..−3, foreground 3+. The rig, orthoSize, pixelSnap →cameras. Stairs and cliffs to walk on need a 3D place: the pixel-art 3D camera →cameras, and engine.graphics.perfectPixelArt.

ctx.self.velocity = { x, y: 0, z }

vy

ctx.self.velocity = { x: vx, y: v.y + GRAVITY * dt, z: 0 }

engine.graphics.perfectPixelArt

Drawn art. A 2D world's art is yours, every pixel in code (tiles, sprites, backdrop, HUD icons), each picture a script re-baked on edit. When the creator hands you a picture or asks for finished painted pieces, paint: jayzee paint "<the piece>, <one style sentence for the whole set>" [--ref <their picture>] --transparent --size 1024x1024, and put the address on sprite.texture (with sprite.size) or an <img>; jayzee cutout <their picture> frees their picture from its background. Each paint or edit redraws the whole picture, keeping no source pixel; no two calls agree on size or build. A painted cycle is one sheet from one call; a one-frame fix keeps its pixels and pastes only the fixed part, fitted by code. A sprite is a texture script on sprite.texture: export function texture(ctx) paints ctx.canvas(w, h) (the first canvas IS the texture, nearest-sampled). Draw the scene at one texel density (starter ground 32 texels a metre; hero frames 32×40 in 2d-top, 56×64 in 2d-side) and always author sprite.size on a scripted ref. Facing is a ?facing= param on the same script: the closed set up · down · left · right · up-left · up-right · down-left · down-right, the bare ref the down pose (2d-side: right); the script draws each pose (a side profile redrawn for its left twin, the body turned, the light kept in place: the art itself, never flipX or a negative scale); sprite.upright: true keeps the art axis-aligned however the body turns. Animation is ctx.atlas({ frameSize, animations: { idle: 2, walk: 4 }, fps, draw(g, f) }): the engine lays out cells and clips, the mixer plays them by name (ctx.self.anim.locomotion = { clip: "walk", weight }); a draw reading its wearer (ctx.self.state.hp) re-runs only when that changes. A backdrop is a strip script (starter scripts/tex-sky.js) on a camera-attached sprite (repeatX, parallax: [0.25, 1]; torus-tileable: every period divides the width). HUD icons, signs and words are crisp vectors: an inline <svg> in ui.js, an object's vector:.

Drawn art.

jayzee paint "<the piece>, <one style sentence for the whole set>" [--ref <their picture>] --transparent --size 1024x1024

sprite.texture

sprite.size

<img>

jayzee cutout <their picture>

export function texture(ctx)

ctx.canvas(w, h)

sprite.upright: true

ctx.atlas({ frameSize, animations: { idle: 2, walk: 4 }, fps, draw(g, f) })

ctx.self.anim.locomotion = { clip: "walk", weight }

ctx.self.state.hp

scripts/tex-sky.js

parallax: [0.25, 1]

<svg>

vector:

// scripts/tex-slime.js: jayzee: { sprite: { texture: "scripts/tex-slime.js", size: [1, 0.5], ySort: true }, physics: "character", behavior: "scripts/slime.js" } var P = { b: '#3fa34d', d: '#2a7a37', e: '#0f1f12', h: '#9fe08a' }; var ROWS = [ // body: 16 × 8 cells of 2 px: 'e' eyes, 'h' highlight '.....bbbbbb.....', '...bbbbbbbbbb...', '..bhbbbbbbbbbb..', '.bbbbbbbbbbbbbb.', 'bbbbebbbbbbebbbb', 'bbbbbbbbbbbbbbbb', 'dbbbbbbbbbbbbbbd', 'dddddddddddddddd', ]; export function texture(ctx) { ctx.atlas({ frameSize: [32, 16], animations: { idle: 2, hop: 4 }, fps: 8, draw: function (g, f) { var lift = f.animation === 'hop' ? [0, 4, 6, 2][f.frame] : 0; var blink = f.animation === 'idle' && f.frame === 1; for (var y = 0; y < 8; y++) for (var x = 0; x < 16; x++) { var c = ROWS[y][x]; if (c === '.' || (blink && c === 'e')) continue; g.fillStyle = P[c]; g.fillRect(x * 2, y * 2 - lift, 2, 2); } } }); }

Light. Lift lights 1.5–3 off the play plane (y in 2d-top, z in 2d-side); no distance = a finite radius from intensity; decay defaults to 2 (inverse-square), decay: 1 is a soft linear fade; plates are unlit. A point light shines through sprites: bound it with light.fan, points in metres from the lamp ([x, z] in 2d-top, [x, y] in 2d-side), each a ray's direction × its raycast hit distance.

decay: 1

light.fan

mode: "2d-top" | "2d-side" // gravity defaults { x: 0, y: -9.81, z: 0 } in 3d and 2d-side, zero in 2d-top terrain: { kind: "tilemap", tileSize: 1, tileset: "scripts/<name>.js?a=<A>&b=<B>", tilesetColumns: 4, generator, solidTiles: [ids], width, height } // infinite unless BOTH, then centered on the origin sprite.texture: "scripts/tex-<subject>.js?<params>" sprite.sortingLayer, .sortingOrder, .ySort // higher draws in front; ySort sorts a layer by world Z; a mesh's layer is its material.renderOrder; fx sprites (sprite(ember,add,sortingLayer=11)), ribbon sinks and svg roots take layer and order too (none: an fx takes a sprite's →fx, else 0) sprite.parallax: [fx, fy], .repeatX: true // per viewer, never a pan script; fx < 1 behind the play plane, > 1 in front; a camera-attached strip spans the viewport collider2d: { outline: [[x, y], …] } // ≥ 3 points = a convex hull camera.state: { orthoSize, heightOffset, distance } // a side-scroller rig's numbers live on its def: a door paints the place from them, so its glass shows the frame you land in

#### Block 1

````text
spawn starter 2d-top
````

#### Block 2

````text
scripts/tex-hero.js
````

#### Block 3

````text
?facing=
````

#### Block 4

````text
tileAt({ x, y, world })
````

#### Block 5

````text
tileAt
````

#### Block 6

````text
solidTiles: [ids]
````

#### Block 7

````text
ctx.canvas
````

#### Block 8

````text
tilesetColumns
````

#### Block 9

````text
[[0.32, 0.86], [0.68, 0.86], [0.68, 1], [0.32, 1]]
````

#### Block 10

````text
physics: "none"
````

#### Block 11

````text
solidTiles
````

#### Block 12

````text
ctx.self.velocity = { x, y: 0, z }
````

#### Block 13

````text
vy
````

#### Block 14

````text
ctx.self.velocity = { x: vx, y: v.y + GRAVITY * dt, z: 0 }
````

#### Block 15

````text
engine.graphics.perfectPixelArt
````

#### Block 16

````text
spawn paint "<the piece>, <one style sentence for the whole set>" [--ref <their picture>] --transparent --size 1024x1024
````

#### Block 17

````text
sprite.texture
````

#### Block 18

````text
sprite.size
````

#### Block 19

````text
<img>
````

#### Block 20

````text
spawn cutout <their picture>
````

#### Block 21

````text
export function texture(ctx)
````

#### Block 22

````text
ctx.canvas(w, h)
````

#### Block 23

````text
sprite.upright: true
````

#### Block 24

````text
ctx.atlas({ frameSize, animations: { idle: 2, walk: 4 }, fps, draw(g, f) })
````

#### Block 25

````text
ctx.self.anim.locomotion = { clip: "walk", weight }
````

#### Block 26

````text
ctx.self.state.hp
````

#### Block 27

````text
scripts/tex-sky.js
````

#### Block 28

````text
parallax: [0.25, 1]
````

#### Block 29

````text
<svg>
````

#### Block 30

````text
vector:
````

#### Block 31

````text
// scripts/tex-slime.js: spawn: { sprite: { texture: "scripts/tex-slime.js", size: [1, 0.5], ySort: true }, physics: "character", behavior: "scripts/slime.js" }
var P = { b: '#3fa34d', d: '#2a7a37', e: '#0f1f12', h: '#9fe08a' };
var ROWS = [ // body: 16 × 8 cells of 2 px: 'e' eyes, 'h' highlight
  '.....bbbbbb.....', '...bbbbbbbbbb...', '..bhbbbbbbbbbb..', '.bbbbbbbbbbbbbb.',
  'bbbbebbbbbbebbbb', 'bbbbbbbbbbbbbbbb', 'dbbbbbbbbbbbbbbd', 'dddddddddddddddd',
];
export function texture(ctx) {
  ctx.atlas({ frameSize: [32, 16], animations: { idle: 2, hop: 4 }, fps: 8, draw: function (g, f) {
    var lift = f.animation === 'hop' ? [0, 4, 6, 2][f.frame] : 0;
    var blink = f.animation === 'idle' && f.frame === 1;
    for (var y = 0; y < 8; y++) for (var x = 0; x < 16; x++) { var c = ROWS[y][x]; if (c === '.' || (blink && c === 'e')) continue; g.fillStyle = P[c]; g.fillRect(x * 2, y * 2 - lift, 2, 2); }
  } });
}
````

#### Block 32

````text
decay: 1
````

#### Block 33

````text
light.fan
````

#### Block 34

````text
mode: "2d-top" | "2d-side" // gravity defaults { x: 0, y: -9.81, z: 0 } in 3d and 2d-side, zero in 2d-top
terrain: { kind: "tilemap", tileSize: 1, tileset: "scripts/<name>.js?a=<A>&b=<B>", tilesetColumns: 4, generator, solidTiles: [ids], width, height } // infinite unless BOTH, then centered on the origin
sprite.texture: "scripts/tex-<subject>.js?<params>"
sprite.sortingLayer, .sortingOrder, .ySort // higher draws in front; ySort sorts a layer by world Z; a mesh's layer is its material.renderOrder; fx sprites (sprite(ember,add,sortingLayer=11)), ribbon sinks and svg roots take layer and order too (none: an fx takes a sprite's →fx, else 0)
sprite.parallax: [fx, fy], .repeatX: true // per viewer, never a pan script; fx < 1 behind the play plane, > 1 in front; a camera-attached strip spans the viewport
collider2d: { outline: [[x, y], …] } // ≥ 3 points = a convex hull
camera.state: { orthoSize, heightOffset, distance } // a side-scroller rig's numbers live on its def: a door paints the place from them, so its glass shows the frame you land in
````


### After clicking "read → atmosphere Sky, sun, fog, clouds, day and night, weather."

Every born world has a look: the hour and mood in its place config's atmosphere:.

A procedural sky (realistic or rayleigh, below) lights the world from timeOfDay. Its fog color holds by day and dims at night; unset, fog follows it. Walk-through mist, shafts and lamps glowing in it, is a look's march on high and ultra over this fog (→looks). A picture is never the sky, nor a sphere at { attach: "camera" } (held, drawn over every hill; a shaded night is sky: scripts/sky.js): the horizon is distant geometry (silhouettes, far peaks, a castle on the skyline), and a galaxy or nebula is a procedural night's stars and milkyWay behind it. color and gradient skies draw NO sun yet light by timeOfDay: a moon, night or sunset need a procedural sky (space = one at timeOfDay: 0, ground: false, stars). With such a sky and no sun, ambient, hemisphere or placed light, the engine lights with a plain shadowless sun and flat ambient; any authored light, ambient or hour replaces them: a dark sky over a bright floor means author the ambient. A brighter torchlit room is more torch light (light.intensity and distance up, one more where it stays dark) over a low ambient bounce; more ambient, hemisphere or exposure washes every wall flat.

{ attach: "camera" }

sky: scripts/sky.js

timeOfDay: 0

ground: false

light.intensity

The sun's day is fixed: on the horizon at 6 and at 18, 65° high at 12 (sun.orbit moves that noon), no seasons. Full light runs ~6.75–17.25, then fades: 17 is a low warm sun (14°), 17.5 golden hour (7° up, a third of noon's light), 17.75 a red sliver. From 18.45 the moon takes over, and by 18.9 it owns the scene, cool blue (dawn mirrors it: moon until 5.1, sun from 6). Dusk is 17–18: a dusk, sunset or evening ask is an hour inside it, never 19.

sun.orbit

A turning day is two numbers, never a script:

// run_script: 24 h every 10 real minutes, starting the day at 10.5; no writes after this one const period = 600_000; place.atmosphere.cycle = { periodMs: period, epoch: now() - period * (10.5 / 24) };

A day of uneven hours adds bands to the same write: [[5, 1], [17, 0.4], [19, 1], [21, 2]] holds the golden hours 2.5 times longer and hurries the night, with hour 0 still at epoch.

[[5, 1], [17, 0.4], [19, 1], [21, 2]]

ctx.place.atmosphere.<key> reads the live merged view; a dotted write or delete deep-merges. A behavior's write is runtime, seen by all, re-derived on boot: author the standing mood by run_script or a creator tab's dial in ctx.commit. One player's night (a curse, a bedtime) is their layer, player.atmosphere.<key> = v (any place key but cycle; look is player.look →looks): carry a procedural sky in it so the dome darkens; ctx.self.atmosphere is undefined on a non-player.

ctx.place.atmosphere.<key>

player.atmosphere.<key> = v

player.look

ctx.self.atmosphere

A storm's cover is dark, low and moving. Dark is clouds.color, a tint on the lit cover (slate, as below; #4e5a52 green-grey); its shadow dims the ground: no ambient, no dimmed sun. Low is altitude 300–450, thickness 300–600. Moving is wind.speed 10–15: clouds race, wind-authored grass and canopies lean. density .8 is a closed sky with lobes and breaks; past .85, one flat ceiling, so a darker storm is a darker color, never higher numbers. A sky no knob says (a wall cloud, a rotating cell) is your own sky: scripts/sky.js, the cover from geometry.

clouds.color

#4e5a52

wind.speed

Rain is ONE object every viewer wears, as below; atmosphere.wet darkens the ground. Snow is the same object slower: v=<0,-1.4,0>+wind()*.5 under curl(), snowflake cards 3–6 cm, floor=stick so it settles, life 6–10, wrap on every axis. Lightning is the place's sim.js: a faint screenFlash (intensity ≤ .15, seconds apart: the 3 Hz law) and one wide light() burst on the far ground for a frame, then thunder; a bolt is fx's path() strike. Rolling fog is fog.near/far eased over seconds from sim.js, never sprites. Every weather object is tagged weather. "Clear it up", "make it stop" or "let it pass" here means the weather, ended that turn: one query on the tag destroys them, the born look (hour, fog, clouds, wind) is written back, the beds stop; a wrong read is one undo, so act first.

atmosphere.wet

v=<0,-1.4,0>+wind()*.5

curl()

snowflake

floor=stick

light()

path()

fog.near/far

// run_script: a storm and its rain const a = place.atmosphere; a.clouds = { enabled: true, density: 0.82, opacity: 0.9, altitude: 380, thickness: 450, speed: 3, color: "#4b525c" }; a.wind = { direction: 250, speed: 12 }; a.fog = { kind: "linear", near: 40, far: 260 }; a.wet = 0.85; jayzee("storm-rain", { tags: ["weather"], feetPosition: { x: 0, z: 0 }, audio: { clip: "cdn/sfx-heavy-rain-on-stone-and-leaves-steady-downpour-loop.mp3", gain: 0.2, loop: true, spatial: false, bus: "Ambience" }, fx: { script: `fx follow=camera pop drops n=?ultra:24000|low:4000|12000 on=box(36,1,36).c(14) wrap=36;0;36 life=1.5..1.8 v=<0,-9.5,0>+wind()*.8+sdir()*.2 size=.012..0.02 col=oklch(.86 .02 250) a=0>.2:.5>.8:.5>0 sz=$size floor=die collide=die r=sprite(droplet,alpha,velocity,.03) pop splash on=@drops?0.3 burst=1 life=.15..0.25 v=<0,1,0>*(.6..1.2)+sdir()*(.3..0.6) size=.01..0.02 acc=grav()*.6+drag(2) col=oklch(.9 .02 250) a=.5>0 sz=$size*(1>1.8) r=sprite(soft-disc,alpha)` } });

atmosphere.sky // { kind: "realistic", model: "hosek" | "rayleigh" } · { kind: "rayleigh", turbidity } · `sky: scripts/sky.js` in world.config.yaml: your own `sky(ray, world)` (ray: { direction: unit vec3, pixelAngle }, not a vector) shades the dome and lights the world through its reflections atmosphere.sky.params.<name> // the live value of world.param(name, default) in that sky; a list default (numbers, or rows of 2 to 4) is a table: .element(i) reads row i in a Loop, so forty constellations are rows; a { size: [w, h], data } default (w × h numbers, row by row) is a grid: .sample(uv) is one bilinear clamped texture read, a sky's grids share one binding; a write uploads the grid: write it every few seconds, not every frame world.quality // in that sky: this viewer's graphics tier ("low" | "medium" | "high" | "ultra"), render-only; each tier compiles its own sky, so a branch on it is free per pixel atmosphere.timeOfDay: 0..24 // a read is the derived hour; a write under a running cycle becomes cycle: { frozen: hour } atmosphere.sun.orbit: { noonYaw, maxElevation } // where the noon sun stands (rotation yaw, default 190) and how high it climbs (degrees, default 65): the hour and a cycle move the sun along it; the light now is ctx.place.atmosphere.sunState: .direction toward it, .body "sun", or "moon" at night (null with no sun) atmosphere.cycle: { periodMs, epoch, bands } | { frozen: hour } // epoch = a now() value; bands = [[fromHour, speed], …], each band to the next band's hour, speeds relative, the day still periodMs; delete cycle frees the sun atmosphere.ground: false // a full-sphere sky with no ground (space); the default with terrain off atmosphere.clouds: { enabled, density, altitude, thickness, speed, opacity, color, shadow } // density = coverage (default 0.5), .15 wisps, each a 90% shade at opacity .5; altitude = the layer's base in m (default 900; under the eye, a cloud sea); shadow 0 = no ground shade atmosphere.moon: { enabled, phase, size, intensity } // size omitted = 3.5; intensity omitted = 1, near black; born 3, 4 a bright full moon atmosphere.wet: 0..1 // omitted = 0, dry; the engine darkens the ground, sharpens its reflections and pools the low cells atmosphere.rain: 0..1 // how hard it rains now (default 0); a material or look reads both as builtin/lighting's rain and wet, so paper beads and ponds ripple, no write per object ctx.self.env.cloud, envAt(ctx, point).cloud // 1 in a cloud, 0 in the clear atmosphere.fog.height: { base, falloff } // either fog kind lies low, on a pit, valley or marsh floor; base (default 0) and falloff are on the fog?: row of jayzee api AtmosphereDef atmosphere.wind: { direction, speed } // degrees it blows toward (default 0): 0 toward -Z, 90 toward -X; m/s (default 1.5); lighting and fx share it player.atmosphere.<key> // where it executes, never for others, in every place until `delete` shows the place's own; null hides the place's key ({ sun: null } frees a pinned sun)

#### Block 1

````text
{ attach: "camera" }
````

#### Block 2

````text
sky: scripts/sky.js
````

#### Block 3

````text
timeOfDay: 0
````

#### Block 4

````text
ground: false
````

#### Block 5

````text
light.intensity
````

#### Block 6

````text
sun.orbit
````

#### Block 7

````text
// run_script: 24 h every 10 real minutes, starting the day at 10.5; no writes after this one
const period = 600_000;
place.atmosphere.cycle = { periodMs: period, epoch: now() - period * (10.5 / 24) };
````

#### Block 8

````text
[[5, 1], [17, 0.4], [19, 1], [21, 2]]
````

#### Block 9

````text
ctx.place.atmosphere.<key>
````

#### Block 10

````text
player.atmosphere.<key> = v
````

#### Block 11

````text
player.look
````

#### Block 12

````text
ctx.self.atmosphere
````

#### Block 13

````text
clouds.color
````

#### Block 14

````text
#4e5a52
````

#### Block 15

````text
wind.speed
````

#### Block 16

````text
atmosphere.wet
````

#### Block 17

````text
v=<0,-1.4,0>+wind()*.5
````

#### Block 18

````text
curl()
````

#### Block 19

````text
snowflake
````

#### Block 20

````text
floor=stick
````

#### Block 21

````text
light()
````

#### Block 22

````text
path()
````

#### Block 23

````text
fog.near/far
````

#### Block 24

````text
// run_script: a storm and its rain
const a = place.atmosphere;
a.clouds = { enabled: true, density: 0.82, opacity: 0.9, altitude: 380, thickness: 450, speed: 3, color: "#4b525c" };
a.wind = { direction: 250, speed: 12 }; a.fog = { kind: "linear", near: 40, far: 260 };
a.wet = 0.85;
spawn("storm-rain", { tags: ["weather"], feetPosition: { x: 0, z: 0 },
  audio: { clip: "cdn/sfx-heavy-rain-on-stone-and-leaves-steady-downpour-loop.mp3", gain: 0.2, loop: true, spatial: false, bus: "Ambience" },
  fx: { script: `fx follow=camera
pop drops n=?ultra:24000|low:4000|12000 on=box(36,1,36).c(14) wrap=36;0;36 life=1.5..1.8 v=<0,-9.5,0>+wind()*.8+sdir()*.2 size=.012..0.02
  col=oklch(.86 .02 250) a=0>.2:.5>.8:.5>0 sz=$size floor=die collide=die r=sprite(droplet,alpha,velocity,.03)
pop splash on=@drops?0.3 burst=1 life=.15..0.25 v=<0,1,0>*(.6..1.2)+sdir()*(.3..0.6) size=.01..0.02 acc=grav()*.6+drag(2)
  col=oklch(.9 .02 250) a=.5>0 sz=$size*(1>1.8) r=sprite(soft-disc,alpha)` } });
````

#### Block 25

````text
atmosphere.sky // { kind: "realistic", model: "hosek" | "rayleigh" } · { kind: "rayleigh", turbidity } · `sky: scripts/sky.js` in world.config.yaml: your own `sky(ray, world)` (ray: { direction: unit vec3, pixelAngle }, not a vector) shades the dome and lights the world through its reflections
atmosphere.sky.params.<name> // the live value of world.param(name, default) in that sky; a list default (numbers, or rows of 2 to 4) is a table: .element(i) reads row i in a Loop, so forty constellations are rows; a { size: [w, h], data } default (w × h numbers, row by row) is a grid: .sample(uv) is one bilinear clamped texture read, a sky's grids share one binding; a write uploads the grid: write it every few seconds, not every frame
world.quality // in that sky: this viewer's graphics tier ("low" | "medium" | "high" | "ultra"), render-only; each tier compiles its own sky, so a branch on it is free per pixel
atmosphere.timeOfDay: 0..24 // a read is the derived hour; a write under a running cycle becomes cycle: { frozen: hour }
atmosphere.sun.orbit: { noonYaw, maxElevation } // where the noon sun stands (rotation yaw, default 190) and how high it climbs (degrees, default 65): the hour and a cycle move the sun along it; the light now is ctx.place.atmosphere.sunState: .direction toward it, .body "sun", or "moon" at night (null with no sun)
atmosphere.cycle: { periodMs, epoch, bands } | { frozen: hour } // epoch = a now() value; bands = [[fromHour, speed], …], each band to the next band's hour, speeds relative, the day still periodMs; delete cycle frees the sun
atmosphere.ground: false // a full-sphere sky with no ground (space); the default with terrain off
atmosphere.clouds: { enabled, density, altitude, thickness, speed, opacity, color, shadow } // density = coverage (default 0.5), .15 wisps, each a 90% shade at opacity .5; altitude = the layer's base in m (default 900; under the eye, a cloud sea); shadow 0 = no ground shade
atmosphere.moon: { enabled, phase, size, intensity } // size omitted = 3.5; intensity omitted = 1, near black; born 3, 4 a bright full moon
atmosphere.wet: 0..1 // omitted = 0, dry; the engine darkens the ground, sharpens its reflections and pools the low cells
atmosphere.rain: 0..1 // how hard it rains now (default 0); a material or look reads both as builtin/lighting's rain and wet, so paper beads and ponds ripple, no write per object
ctx.self.env.cloud, envAt(ctx, point).cloud // 1 in a cloud, 0 in the clear
atmosphere.fog.height: { base, falloff } // either fog kind lies low, on a pit, valley or marsh floor; base (default 0) and falloff are on the fog?: row of spawn api AtmosphereDef
atmosphere.wind: { direction, speed } // degrees it blows toward (default 0): 0 toward -Z, 90 toward -X; m/s (default 1.5); lighting and fx share it
player.atmosphere.<key> // where it executes, never for others, in every place until `delete` shows the place's own; null hides the place's key ({ sun: null } frees a pinned sun)
````


### After clicking "read → looks Colour grade, toon shading, lived-in grime decals, custom shaders."

- H3: Lighting: what a light does to a surface

The bar: a place's look is its film stock graded over the frame, never repainted. A look never relights or brightens a room: day, dusk and weather move the sun and swap the sky, a dark room gets more from its lights (→atmosphere); exposure is the stock, not the lamp. Moonlight is uniform ops (exposure down, cool tint, blue vignette), never a grade keyed on a colour, luminance or depth threshold, which fringes blended silhouettes pale. A night keeps its blacks, its grade moving mids and colour. The ground stays readable under any grade.

look(ctx) runs over the finished tone-mapped frame (scene, bloom, outlines) before sRGB encoding. Verbs: jayzee api builtin/postfx, world-point queries builtin/lighting. From run_script, ctx.place.atmosphere.look = … is live, null resets. A behavior's look.params.density = 0.6 is free; a script or pass edit recompiles once: per-frame change rides params.

look(ctx)

jayzee api builtin/postfx

ctx.place.atmosphere.look = …

look.params.density = 0.6

// scripts/look-place.js import { grade, grain, vignette } from "builtin/postfx"; export function look(ctx) { const c = grade(ctx.scene, { exposure: 1.05, saturation: 1.1, temperature: 0.1, haze: 0.06 }); return grain(vignette(c, ctx.param("vignette", 0.25), { color: "oklch(0.121 0.019 283.1)" }), 0.05); }

Haze in the grade is the air. Moody: saturation toward 0.55, exposure just under 1, deeper vignette.

Glow is the lights, never the room: bloomThreshold stays at 1 (under 1, lit walls and faces bloom), bloomStrength unset till an ask names glow (0 skips its passes).

A beam is fx (→fx). Fog you walk through (mist, shafts, lamp halos) is a march on high and ultra; below, fog.height is the air:

fog.height

// scripts/look-mist.js, yours import { vec2, vec3, vec4, float, Loop, mix, select, mx_noise_float, cameraPosition, screenUV, time, deltaTime } from "builtin/tsl"; import { sunDirection, sunRadiance, ambientRadiance, sunVisibility, lightsAt, windTravel } from "builtin/lighting"; export function look(ctx) { if (!["high", "ultra"].includes(ctx.device.quality)) return ctx.scene; const size = { width: 640, height: 360 }, air = ctx.target("air", size), mist = ctx.target("mist", size); const reach = (uv) => { const ray = ctx.worldPosition(uv).sub(cameraPosition); return ray.normalize().mul(ray.length().min(60)); }; const now = ctx.pass(air, (uv) => { const ray = reach(uv), dir = ray.normalize(), dt = ray.length().div(16); const start = uv.mul(air.size).dot(vec2(0.0671, 0.0058)).fract().mul(52.98).add(time.mul(7.31)).fract(); const toSun = dir.dot(sunDirection).mul(0.5).add(0.5).pow(4).mul(0.6); const wind = vec3(windTravel.x, 0, windTravel.y), light = vec3(0).toVar(), clear = float(1).toVar(); Loop(16, ({ i }) => { const p = cameraPosition.add(dir.mul(float(i).add(start).mul(dt))); const fog = ctx.param("density", 0.08).mul(p.y.max(0).div(-2.5).exp()).mul(mx_noise_float(p.sub(wind).mul(0.2)).add(1)); const through = fog.mul(dt).negate().exp(); light.addAssign(sunRadiance.mul(sunVisibility(p)).mul(toSun).add(ambientRadiance.add(lightsAt(p, { shadow: false })).mul(0.1)).mul(clear).mul(float(1).sub(through))); clear.mulAssign(through); }); return vec4(light, clear); }); const fog = ctx.pass(mist, (uv) => { const at = ctx.previousUv(cameraPosition.add(reach(uv))), seen = at.sub(0.5).abs().lessThanEqual(0.5).all(); let n = now.sample(uv), lo = n, hi = n; for (const [x, y] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) { const s = now.sample(uv.add(vec2(x, y).div(air.size))); lo = lo.min(s); hi = hi.max(s); } return mix(select(seen, mist.previous.sample(at).clamp(lo, hi), n), n, float(1).sub(deltaTime.mul(-6.5).exp())); }).sample(screenUV); return ctx.scene.mul(fog.w).add(fog.rgb); }

A pass is for what only the finished frame says: a trail is mix(t.previous.sample(uv.sub(ctx.velocity)).rgb, ctx.scene, persist) written back into its target.

mix(t.previous.sample(uv.sub(ctx.velocity)).rgb, ctx.scene, persist)

A thing drawn at lower resolution (pixel hands) is a see-through copy following it whose transparent material reads viewportSharedTexture at each n-pixel cell's centre: only it goes blocky.

Edges are two facts a pixel apart: ctx.viewZAt(uv) steps at a silhouette, ctx.normal(uv) turns at a crease; ink is max(smoothstep(0.03, 0.06, dz.div(abs(zc).max(1))), smoothstep(0.2, 0.5, dn)) mixed toward dark over the whole frame, land included; one object's ink is its material's outline (jayzee api material). 1-bit is luminance against a 4×4 Bayer threshold; a screen-door fade drops pixels into the sky through the dither by ctx.viewZ, never a soft blend.

ctx.normal(uv)

max(smoothstep(0.03, 0.06, dz.div(abs(zc).max(1))), smoothstep(0.2, 0.5, dn))

jayzee api material

Decals make a place lived in: emit("decal", { position, normal, texture, size, lifetime, attachTo }); lifetime: Infinity keeps a mark for good.

emit("decal", { position, normal, texture, size, lifetime, attachTo })

lifetime: Infinity

Lighting: what a light does to a surface

Built once before the look, lighting colours each lit pixel before emissive and fog. The starter's scripts/lighting.js is the standard model: read, then edit. Flat is one tint per facing (step(0.5, n.y)); hatching is screenUV × screenSize diagonals where light falls off:

scripts/lighting.js

step(0.5, n.y)

screenUV × screenSize

// scripts/lighting.js: toon bands import { dot, ceil, clamp } from "builtin/tsl"; export function lighting(surface, lights, ctx) { const bands = ctx.param("bands", 3), direct = lights.each((light) => { const band = ceil(clamp(dot(surface.normal, light.direction), 0, 1).mul(bands)).div(bands); return surface.albedo.mul(light.color).mul(band).mul(light.shadow); }); return direct.add(surface.albedo.mul(lights.ambient).add(lights.environment).mul(surface.occlusion)); }

light.shadow multiplies in after the bands, never inside a step: it fades far and under cloud, so a threshold on it or its product draws a line on the ground. A crisp shadow is the light's shadow.softness: 0 (sun: atmosphere.sun.light). A failed compile keeps the standard model. A material script may export lighting(surface, lights, ctx) beside material(ctx): its surfaces shade through it, whatever lit material it returns, with its uv(), positionLocal and ctx, so its pattern sticks.

light.shadow

shadow.softness: 0

lighting(surface, lights, ctx)

surface: { albedo: vec3, normal: vec3, geometryNormal: vec3, view: vec3, position: vec3, roughness: f32, metalness: f32, occlusion: f32, attribute: f32 } // the material at this pixel, world space: position in world metres (positionWorld); normal and view unit, view toward the camera; geometryNormal before any normal map (noon relief: normal against it); attribute the face's integer kind, a lamp or a pane (ctx.attribute or m.attributeNode rounded, else 0), never a material value lights.each((light) => vec3): vec3 // summed over the sun and each placed light reaching the point, with falloff and cone. light = { direction: vec3 (toward it), color: vec3 (× intensity × falloff), shadow: f32 (0..1, 1 lit), radiance: vec3 (color × shadow), specular: f32 (0..1), isSun: bool (sun or moon) } lights.ambient: vec3, lights.environment: vec3 // irradiance at the normal from the place's ambient and hemisphere lights, else a colour or gradient sky's; a realistic sky's light as this surface returns it (albedo and reflection in) when the place sets neither (else black) ctx.device, ctx.quality // in lighting() and look() as in a material (`jayzee api builtin/three`); a device its passes slow draws the "low" build: what matters, without costly passes (no branch: occlusion 1, glow 0); ctx.device.hold 0..1, this viewer's share of full device memory: scale counts by it export function look(ctx): vec3 | vec4 // once at build atmosphere.look.toneMapping: "aces" (default) filmic | "neutral" keeps painted hue and saturation, mids darker | "agx" | "reinhard" | "cineon" | "linear" | "none" clamped 0..1 (grade's `exposure` only multiplies), for display colours // agx costs ≤1.25x aces, ≤2.75x in ink/display(); a look may carry only this atmosphere.look.filter: "pixel" // blocks: drawn under screen size, each pixel stays one hard square ctx.scene: vec3 // this pixel; other pixels: convertToTexture(ctx.scene).sample(uv), in a pass texture(ctx.scene, uv) ctx.depth: texture, ctx.viewZ: float // raw depth (sky 0), .sample(uv) anywhere; linear, negative metres ctx.viewZAt(uv): float, ctx.normal(uv): vec3 // viewZ at uv (y down from top-left); the facet's normal from depth (sky faces the eye); { shading: true } the lit normal, smooth over a body's triangles ctx.worldPosition(uv): vec3 // the visible surface's point, sky the far plane; all three take (uv, { liquid: true }) for a liquid's surface, not its bed ctx.skyVisibility(P, N?): float // a world's lighting() too: 0..1 sky at P through blocks: 1 open, 0 under blocks or ground, between under leaves or liquid; models cast none; N the normal, none for air ctx.previousUv(P): vec2 // P's uv last frame, else (-1, -1) ctx.velocity: vec2 // this pixel's uv now − uv last frame from the eye's motion: a moving thing may read still, a still capture 0; motion blur samples back along it ctx.param(name, default): node // atmosphere.sky.params.<name> live, the viewer's layer (player.<path>, one screen) over the place's; a material script's reads its own params. Compose in node space (float(1).sub(dim)): JS arithmetic on it is NaN, which the passes refuse ctx.texture(cdn, { wrap: "clamp" | "repeat" | "mirror" }): texture // a LUT strip; clamp (default) smears the edge texel past uv 1: repeat ctx.target(name, { scale, width, height, depth, format: "rgba16float" | "rgba8unorm", wrap }): target // canvas scale (above 1 supersamples) or pixel width and height; rgba16float the HDR default, no tone-map or clamp between passes; .previous last frame's (first black), .size a live vec2 in pixels; depth makes it 3D (uv, .sample, .size vec3), filled once when its pass reads only uv and params ctx.pass(target, (uv) => vec3 | vec4): texture // runs in declaration order, overwriting its target; returns the read (.sample(uv), .size); reads t.previous, never its own target player.look.push(script | { look, intensity, duration, fade, priority, params }): length // one player's own look (fog only they see), same script, params whole: spread the place's under theirs; id: player.look.at(-1).id; duration auto-clears; higher priority wins

#### Block 1

````text
look(ctx)
````

#### Block 2

````text
spawn api builtin/postfx
````

#### Block 3

````text
ctx.place.atmosphere.look = …
````

#### Block 4

````text
look.params.density = 0.6
````

#### Block 5

````text
// scripts/look-place.js
import { grade, grain, vignette } from "builtin/postfx";
export function look(ctx) {
  const c = grade(ctx.scene, { exposure: 1.05, saturation: 1.1, temperature: 0.1, haze: 0.06 });
  return grain(vignette(c, ctx.param("vignette", 0.25), { color: "oklch(0.121 0.019 283.1)" }), 0.05);
}
````

#### Block 6

````text
fog.height
````

#### Block 7

````text
// scripts/look-mist.js, yours
import { vec2, vec3, vec4, float, Loop, mix, select, mx_noise_float, cameraPosition, screenUV, time, deltaTime } from "builtin/tsl";
import { sunDirection, sunRadiance, ambientRadiance, sunVisibility, lightsAt, windTravel } from "builtin/lighting";
export function look(ctx) {
  if (!["high", "ultra"].includes(ctx.device.quality)) return ctx.scene;
  const size = { width: 640, height: 360 }, air = ctx.target("air", size), mist = ctx.target("mist", size);
  const reach = (uv) => { const ray = ctx.worldPosition(uv).sub(cameraPosition); return ray.normalize().mul(ray.length().min(60)); };
  const now = ctx.pass(air, (uv) => {
    const ray = reach(uv), dir = ray.normalize(), dt = ray.length().div(16);
    const start = uv.mul(air.size).dot(vec2(0.0671, 0.0058)).fract().mul(52.98).add(time.mul(7.31)).fract();
    const toSun = dir.dot(sunDirection).mul(0.5).add(0.5).pow(4).mul(0.6);
    const wind = vec3(windTravel.x, 0, windTravel.y), light = vec3(0).toVar(), clear = float(1).toVar();
    Loop(16, ({ i }) => {
      const p = cameraPosition.add(dir.mul(float(i).add(start).mul(dt)));
      const fog = ctx.param("density", 0.08).mul(p.y.max(0).div(-2.5).exp()).mul(mx_noise_float(p.sub(wind).mul(0.2)).add(1));
      const through = fog.mul(dt).negate().exp();
      light.addAssign(sunRadiance.mul(sunVisibility(p)).mul(toSun).add(ambientRadiance.add(lightsAt(p, { shadow: false })).mul(0.1)).mul(clear).mul(float(1).sub(through)));
      clear.mulAssign(through);
    });
    return vec4(light, clear);
  });
  const fog = ctx.pass(mist, (uv) => {
    const at = ctx.previousUv(cameraPosition.add(reach(uv))), seen = at.sub(0.5).abs().lessThanEqual(0.5).all();
    let n = now.sample(uv), lo = n, hi = n;
    for (const [x, y] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) { const s = now.sample(uv.add(vec2(x, y).div(air.size))); lo = lo.min(s); hi = hi.max(s); }
    return mix(select(seen, mist.previous.sample(at).clamp(lo, hi), n), n, float(1).sub(deltaTime.mul(-6.5).exp()));
  }).sample(screenUV);
  return ctx.scene.mul(fog.w).add(fog.rgb);
}
````

#### Block 8

````text
mix(t.previous.sample(uv.sub(ctx.velocity)).rgb, ctx.scene, persist)
````

#### Block 9

````text
ctx.normal(uv)
````

#### Block 10

````text
max(smoothstep(0.03, 0.06, dz.div(abs(zc).max(1))), smoothstep(0.2, 0.5, dn))
````

#### Block 11

````text
spawn api material
````

#### Block 12

````text
emit("decal", { position, normal, texture, size, lifetime, attachTo })
````

#### Block 13

````text
lifetime: Infinity
````

#### Block 14

````text
scripts/lighting.js
````

#### Block 15

````text
step(0.5, n.y)
````

#### Block 16

````text
screenUV × screenSize
````

#### Block 17

````text
// scripts/lighting.js: toon bands
import { dot, ceil, clamp } from "builtin/tsl";
export function lighting(surface, lights, ctx) {
  const bands = ctx.param("bands", 3), direct = lights.each((light) => {
    const band = ceil(clamp(dot(surface.normal, light.direction), 0, 1).mul(bands)).div(bands);
    return surface.albedo.mul(light.color).mul(band).mul(light.shadow);
  });
  return direct.add(surface.albedo.mul(lights.ambient).add(lights.environment).mul(surface.occlusion));
}
````

#### Block 18

````text
light.shadow
````

#### Block 19

````text
shadow.softness: 0
````

#### Block 20

````text
lighting(surface, lights, ctx)
````

#### Block 21

````text
surface: { albedo: vec3, normal: vec3, geometryNormal: vec3, view: vec3, position: vec3, roughness: f32, metalness: f32, occlusion: f32, attribute: f32 } // the material at this pixel, world space: position in world metres (positionWorld); normal and view unit, view toward the camera; geometryNormal before any normal map (noon relief: normal against it); attribute the face's integer kind, a lamp or a pane (ctx.attribute or m.attributeNode rounded, else 0), never a material value
lights.each((light) => vec3): vec3 // summed over the sun and each placed light reaching the point, with falloff and cone. light = { direction: vec3 (toward it), color: vec3 (× intensity × falloff), shadow: f32 (0..1, 1 lit), radiance: vec3 (color × shadow), specular: f32 (0..1), isSun: bool (sun or moon) }
lights.ambient: vec3, lights.environment: vec3 // irradiance at the normal from the place's ambient and hemisphere lights, else a colour or gradient sky's; a realistic sky's light as this surface returns it (albedo and reflection in) when the place sets neither (else black)
ctx.device, ctx.quality // in lighting() and look() as in a material (`spawn api builtin/three`); a device its passes slow draws the "low" build: what matters, without costly passes (no branch: occlusion 1, glow 0); ctx.device.hold 0..1, this viewer's share of full device memory: scale counts by it
export function look(ctx): vec3 | vec4 // once at build
atmosphere.look.toneMapping: "aces" (default) filmic | "neutral" keeps painted hue and saturation, mids darker | "agx" | "reinhard" | "cineon" | "linear" | "none" clamped 0..1 (grade's `exposure` only multiplies), for display colours // agx costs ≤1.25x aces, ≤2.75x in ink/display(); a look may carry only this
atmosphere.look.filter: "pixel" // blocks: drawn under screen size, each pixel stays one hard square
ctx.scene: vec3 // this pixel; other pixels: convertToTexture(ctx.scene).sample(uv), in a pass texture(ctx.scene, uv)
ctx.depth: texture, ctx.viewZ: float // raw depth (sky 0), .sample(uv) anywhere; linear, negative metres
ctx.viewZAt(uv): float, ctx.normal(uv): vec3 // viewZ at uv (y down from top-left); the facet's normal from depth (sky faces the eye); { shading: true } the lit normal, smooth over a body's triangles
ctx.worldPosition(uv): vec3 // the visible surface's point, sky the far plane; all three take (uv, { liquid: true }) for a liquid's surface, not its bed
ctx.skyVisibility(P, N?): float // a world's lighting() too: 0..1 sky at P through blocks: 1 open, 0 under blocks or ground, between under leaves or liquid; models cast none; N the normal, none for air
ctx.previousUv(P): vec2 // P's uv last frame, else (-1, -1)
ctx.velocity: vec2 // this pixel's uv now − uv last frame from the eye's motion: a moving thing may read still, a still capture 0; motion blur samples back along it
ctx.param(name, default): node // atmosphere.sky.params.<name> live, the viewer's layer (player.<path>, one screen) over the place's; a material script's reads its own params. Compose in node space (float(1).sub(dim)): JS arithmetic on it is NaN, which the passes refuse
ctx.texture(cdn, { wrap: "clamp" | "repeat" | "mirror" }): texture // a LUT strip; clamp (default) smears the edge texel past uv 1: repeat
ctx.target(name, { scale, width, height, depth, format: "rgba16float" | "rgba8unorm", wrap }): target // canvas scale (above 1 supersamples) or pixel width and height; rgba16float the HDR default, no tone-map or clamp between passes; .previous last frame's (first black), .size a live vec2 in pixels; depth makes it 3D (uv, .sample, .size vec3), filled once when its pass reads only uv and params
ctx.pass(target, (uv) => vec3 | vec4): texture // runs in declaration order, overwriting its target; returns the read (.sample(uv), .size); reads t.previous, never its own target
player.look.push(script | { look, intensity, duration, fade, priority, params }): length // one player's own look (fog only they see), same script, params whole: spread the place's under theirs; id: player.look.at(-1).id; duration auto-clears; higher priority wins
````


### After clicking "read → trees Forests, woods, parks."

The bar: a tree reads as its species from every distance. The trunk flares at the root, limbs leave it at their own heights, and the crown is hundreds of twig sprays that read as one soft volume, dark in its heart, lit where the sun reaches. A cone on a cylinder or a ball of leaves reads as a toy.

A tree is one geometry script you write (→geometry): bark tubes and a crown of twig-spray cards (→leaf-sprays).

// scripts/tree.js: params { kind, h } (h: metres tall) const SPECIES = { oak: { leaf: "broad", hue: 110, bark: "cdn/texture-oak-bark.png", base: 0.16, spread: 1.3, lobes: 9, trunk: 0.03, dome: 1 }, birch: { leaf: "small", hue: 100, bark: "cdn/texture-white-birch-bark.png", base: 0.32, spread: 0.46, lobes: 8, trunk: 0.016 }, fir: { leaf: "needle", hue: 140, bark: "cdn/texture-pine-bark.png", base: 0.08, spread: 0.42, trunk: 0.022, pow: 0.92, droop: 0.6 }, pine: { leaf: "needle", hue: 135, bark: "cdn/texture-pine-bark.png", base: 0.28, spread: 0.42, trunk: 0.025, pow: 0.62, droop: 0.2 }, }; const add = (a, b, k = 1) => [a[0] + b[0] * k, a[1] + b[1] * k, a[2] + b[2] * k]; const unit = (a) => add([0, 0, 0], a, 1 / (Math.hypot(...a) || 1)); const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; export function geometry(ctx) { const sp = SPECIES[ctx.params.kind] ?? SPECIES.oak, H = ctx.params.h ?? 12, lod = ctx.lod, R = () => ctx.random(); const r0 = H * sp.trunk, yb = H * sp.base, W = (H * sp.spread) / 2, c = [0, (yb + H) / 2, 0], r = [W, (H - yb) / 2, W]; const uvs = [], normals = []; const quad = (P, N, U) => [[0, 1, 2], [0, 2, 3]].forEach((t) => { ctx.tri(...t.flatMap((k) => P[k])); t.forEach((k) => (normals.push(...N[k]), uvs.push(...U[k]))); }); const tube = (path, rad, sides = 6) => path.slice(1).forEach((b, i) => { const a = path[i], ax = unit(add(b, a, -1)), s = unit(cross(ax, [0, 1, 0.01])), o = cross(ax, s); const d = (k, t = (k * 6.2832) / sides) => add(add([0, 0, 0], s, Math.cos(t)), o, Math.sin(t)); for (let k = 0; k < sides; k++) { const d0 = d(k), d1 = d(k + 1), u0 = k / sides, u1 = (k + 1) / sides; quad([add(a, d1, rad[i]), add(b, d1, rad[i + 1]), add(b, d0, rad[i + 1]), add(a, d0, rad[i])], [d1, d1, d0, d0], [[u1, 0], [u1, 4], [u0, 4], [u0, 0]]); } }); const cn = (p) => unit([(p[0] - c[0]) / r[0], (p[1] - c[1]) / r[1] + 0.35, (p[2] - c[2]) / r[2]]); // a card: foot at p, along up, front outward const card = (p, up, face, w, h) => { const m = cn(p), x = unit(cross(up, face)), e = (face[0] * m[0] + face[1] * m[1] + face[2] * m[2] < 0 ? -w : w) / 2, a = add(p, x, -e), b = add(p, x, e), P = [a, b, add(b, up, h), add(a, up, h)]; quad(P, P.map(cn), [[0, 0], [1, 0], [1, 1], [0, 1]]); }; const hue = sp.hue + R() * 16 - 8, tint = (dl) => ctx.color(`oklch(${0.97 + dl} 0.02 ${hue})`); ctx.albedo(sp.bark); // sprays you write are 2 m, toward 3 m past an 18 m crown const size = (1.5 + lod / 2) * Math.max(1, Math.sqrt(W / 9)), leaves = `scripts/tex-leaves.js?kind=${sp.leaf}`; if (sp.droop) { tube([[0, -0.3, 0], [0, H / 2, 0], [0, H, 0]], [r0 * 1.4, r0 * 0.8, r0 * 0.15]); ctx.albedo(leaves); // drooping tiers whose boughs close each rim; near, a tilted cross card fills between tiers const tiers = Math.round((H - yb) / [0, 1.2, 1.6, 2.6, 4, 6][lod]); for (let i = 0; i < tiers; i++) { const t = i / tiers, rim = W * (1 - t) ** sp.pow + 0.4, per = Math.max(5, Math.ceil((4.8 * rim) / size)); for (let j = 0; j < per; j++) { const a = ((j + R() * 0.6) / per) * 6.2832 + t * 3, out = unit([Math.cos(a), -sp.droop * (0.5 + R()), Math.sin(a)]), reach = rim * (0.8 + R() * 0.4); for (let k = 0, s = Math.min(size, reach); k < reach; k += s * 0.8) { const foot = add([0, yb + (H - yb) * t, 0], out, k); tint(-0.3 + 0.2 * t + R() * 0.08); card(foot, out, unit(add([0, 1, 0], out, 0.25)), s, s * 1.1); if (lod <= 2) tint(-0.3), card(foot, out, [-out[2], 0.58, out[0]], s, s); } } } if (lod >= 3) for (const k of [0, 1.05, 2.1]) card([0, yb, 0], [0, 1, 0], [Math.cos(k), 0, Math.sin(k)], W * 1.5, H - yb); return { uvs, normals }; } tube([[0, -0.3, 0], [0, 0.4, 0], [0, yb, 0], [R() - 0.5, c[1], R() - 0.5]], [1.9, 1.15, 0.9, 0.45].map((k) => k * r0)); // a big low lobe keeps the crown full from below const n = lod >= 4 ? Math.ceil(sp.lobes / 2) : sp.lobes, lw = W * 0.42, lv = r[1] * 0.5, lobes = [[0, H - lv, 0, 1], [0, c[1] - lv * 0.5, 0, 1.5]]; for (let i = 1; i < n; i++) { const a = i * 2.4 + R() * 0.5, y = 1 - (i / (n - 1)) * 2, ring = (W - lw) * (sp.dome && y < 0 ? 1 : Math.sqrt(1 - y * y)); const L = [Math.cos(a) * ring, c[1] + y * (r[1] - lv), Math.sin(a) * ring, 0.85 + R() * 0.3], t = R(); const from = [0, yb * 0.95 + (c[1] - yb) * t * 0.6, 0], to = add(from, add(L, from, -1), 0.85); if (lod <= 3 && y < 0.64) tube([from, [to[0] * 0.4, to[1] - 0.2, to[2] * 0.4], to], [r0 * (0.6 - 0.25 * t), r0 * 0.35, r0 * 0.12], 5); lobes.push(L); } ctx.albedo(leaves); for (const L of lobes) { const w = lw * L[3], v = lv * L[3], cards = Math.ceil((3 / lod) * w * v); for (let j = 0; j < cards; j++) { const d = unit([R() * 2 - 1, R() * 2 - 1, R() * 2 - 1]), up = unit(add(d, [0, 1.5, 0])), s = size * (0.75 + R() * 0.5), q = 0.3 + 0.7 * Math.sqrt(R()); tint(-0.36 + 0.26 * q + R() * 0.06); card(add(add(L, [d[0] * w, d[1] * v, d[2] * w], q), up, -s / 2), up, [d[0] + R() - 0.5, R() * 0.5, d[2] + R() - 0.5], s, s); } } return { uvs, normals }; } export function collider(ctx) { const sp = SPECIES[ctx.params.kind] ?? SPECIES.oak, H = ctx.params.h ?? 12, r = H * sp.trunk, h = H * sp.base + 1; return { kind: "cylinder", radiusTop: r, radiusBottom: r * 1.3, height: h, center: [0, h / 2, 0] }; }

// run_script: a wood. Each template has its own seed, so its copies share one mesh const templates = [["oak", 14], ["birch", 13], ["fir", 19], ["pine", 16]].map(([kind, h], seed) => ({ primitive: { kind: "scripted", script: "scripts/tree.js", params: { kind, h }, seed }, material: { alphaTest: 0.5 }, physics: "static" })); jayzee("wood", { feetPosition: { x: 0, y: { terrain: 0 }, z: -60 }, scatter: { bounds: { shape: "circle", radius: 50 }, count: 110, seed: 7, variation: { scale: [0.8, 1.25], yaw: [0, 360] }, templates } });

A species is a row; a new shape is a branch.

A 12 m oak is 750 triangles at ctx.lod 1, 120 at 5. A far wood leaves physics off, so its bed draws every tree the device holds.

#### Block 1

````text
// scripts/tree.js: params { kind, h } (h: metres tall)
const SPECIES = {
  oak: { leaf: "broad", hue: 110, bark: "cdn/texture-oak-bark.png", base: 0.16, spread: 1.3, lobes: 9, trunk: 0.03, dome: 1 },
  birch: { leaf: "small", hue: 100, bark: "cdn/texture-white-birch-bark.png", base: 0.32, spread: 0.46, lobes: 8, trunk: 0.016 },
  fir: { leaf: "needle", hue: 140, bark: "cdn/texture-pine-bark.png", base: 0.08, spread: 0.42, trunk: 0.022, pow: 0.92, droop: 0.6 },
  pine: { leaf: "needle", hue: 135, bark: "cdn/texture-pine-bark.png", base: 0.28, spread: 0.42, trunk: 0.025, pow: 0.62, droop: 0.2 },
};
const add = (a, b, k = 1) => [a[0] + b[0] * k, a[1] + b[1] * k, a[2] + b[2] * k];
const unit = (a) => add([0, 0, 0], a, 1 / (Math.hypot(...a) || 1));
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];

export function geometry(ctx) {
  const sp = SPECIES[ctx.params.kind] ?? SPECIES.oak, H = ctx.params.h ?? 12, lod = ctx.lod, R = () => ctx.random();
  const r0 = H * sp.trunk, yb = H * sp.base, W = (H * sp.spread) / 2, c = [0, (yb + H) / 2, 0], r = [W, (H - yb) / 2, W];
  const uvs = [], normals = [];
  const quad = (P, N, U) => [[0, 1, 2], [0, 2, 3]].forEach((t) => { ctx.tri(...t.flatMap((k) => P[k])); t.forEach((k) => (normals.push(...N[k]), uvs.push(...U[k]))); });
  const tube = (path, rad, sides = 6) => path.slice(1).forEach((b, i) => {
    const a = path[i], ax = unit(add(b, a, -1)), s = unit(cross(ax, [0, 1, 0.01])), o = cross(ax, s);
    const d = (k, t = (k * 6.2832) / sides) => add(add([0, 0, 0], s, Math.cos(t)), o, Math.sin(t));
    for (let k = 0; k < sides; k++) {
      const d0 = d(k), d1 = d(k + 1), u0 = k / sides, u1 = (k + 1) / sides;
      quad([add(a, d1, rad[i]), add(b, d1, rad[i + 1]), add(b, d0, rad[i + 1]), add(a, d0, rad[i])], [d1, d1, d0, d0], [[u1, 0], [u1, 4], [u0, 4], [u0, 0]]);
    }
  });
  const cn = (p) => unit([(p[0] - c[0]) / r[0], (p[1] - c[1]) / r[1] + 0.35, (p[2] - c[2]) / r[2]]);
  // a card: foot at p, along up, front outward
  const card = (p, up, face, w, h) => {
    const m = cn(p), x = unit(cross(up, face)), e = (face[0] * m[0] + face[1] * m[1] + face[2] * m[2] < 0 ? -w : w) / 2, a = add(p, x, -e), b = add(p, x, e), P = [a, b, add(b, up, h), add(a, up, h)];
    quad(P, P.map(cn), [[0, 0], [1, 0], [1, 1], [0, 1]]);
  };
  const hue = sp.hue + R() * 16 - 8, tint = (dl) => ctx.color(`oklch(${0.97 + dl} 0.02 ${hue})`);
  ctx.albedo(sp.bark);
  // sprays you write are 2 m, toward 3 m past an 18 m crown
  const size = (1.5 + lod / 2) * Math.max(1, Math.sqrt(W / 9)), leaves = `scripts/tex-leaves.js?kind=${sp.leaf}`;

  if (sp.droop) {
    tube([[0, -0.3, 0], [0, H / 2, 0], [0, H, 0]], [r0 * 1.4, r0 * 0.8, r0 * 0.15]);
    ctx.albedo(leaves);
    // drooping tiers whose boughs close each rim; near, a tilted cross card fills between tiers
    const tiers = Math.round((H - yb) / [0, 1.2, 1.6, 2.6, 4, 6][lod]);
    for (let i = 0; i < tiers; i++) {
      const t = i / tiers, rim = W * (1 - t) ** sp.pow + 0.4, per = Math.max(5, Math.ceil((4.8 * rim) / size));
      for (let j = 0; j < per; j++) {
        const a = ((j + R() * 0.6) / per) * 6.2832 + t * 3, out = unit([Math.cos(a), -sp.droop * (0.5 + R()), Math.sin(a)]), reach = rim * (0.8 + R() * 0.4);
        for (let k = 0, s = Math.min(size, reach); k < reach; k += s * 0.8) {
          const foot = add([0, yb + (H - yb) * t, 0], out, k);
          tint(-0.3 + 0.2 * t + R() * 0.08);
          card(foot, out, unit(add([0, 1, 0], out, 0.25)), s, s * 1.1);
          if (lod <= 2) tint(-0.3), card(foot, out, [-out[2], 0.58, out[0]], s, s);
        }
      }
    }
    if (lod >= 3) for (const k of [0, 1.05, 2.1]) card([0, yb, 0], [0, 1, 0], [Math.cos(k), 0, Math.sin(k)], W * 1.5, H - yb);
    return { uvs, normals };
  }

  tube([[0, -0.3, 0], [0, 0.4, 0], [0, yb, 0], [R() - 0.5, c[1], R() - 0.5]], [1.9, 1.15, 0.9, 0.45].map((k) => k * r0));
  // a big low lobe keeps the crown full from below
  const n = lod >= 4 ? Math.ceil(sp.lobes / 2) : sp.lobes, lw = W * 0.42, lv = r[1] * 0.5, lobes = [[0, H - lv, 0, 1], [0, c[1] - lv * 0.5, 0, 1.5]];
  for (let i = 1; i < n; i++) {
    const a = i * 2.4 + R() * 0.5, y = 1 - (i / (n - 1)) * 2, ring = (W - lw) * (sp.dome && y < 0 ? 1 : Math.sqrt(1 - y * y));
    const L = [Math.cos(a) * ring, c[1] + y * (r[1] - lv), Math.sin(a) * ring, 0.85 + R() * 0.3], t = R();
    const from = [0, yb * 0.95 + (c[1] - yb) * t * 0.6, 0], to = add(from, add(L, from, -1), 0.85);
    if (lod <= 3 && y < 0.64) tube([from, [to[0] * 0.4, to[1] - 0.2, to[2] * 0.4], to], [r0 * (0.6 - 0.25 * t), r0 * 0.35, r0 * 0.12], 5);
    lobes.push(L);
  }
  ctx.albedo(leaves);
  for (const L of lobes) {
    const w = lw * L[3], v = lv * L[3], cards = Math.ceil((3 / lod) * w * v);
    for (let j = 0; j < cards; j++) {
      const d = unit([R() * 2 - 1, R() * 2 - 1, R() * 2 - 1]), up = unit(add(d, [0, 1.5, 0])), s = size * (0.75 + R() * 0.5), q = 0.3 + 0.7 * Math.sqrt(R());
      tint(-0.36 + 0.26 * q + R() * 0.06);
      card(add(add(L, [d[0] * w, d[1] * v, d[2] * w], q), up, -s / 2), up, [d[0] + R() - 0.5, R() * 0.5, d[2] + R() - 0.5], s, s);
    }
  }
  return { uvs, normals };
}

export function collider(ctx) {
  const sp = SPECIES[ctx.params.kind] ?? SPECIES.oak, H = ctx.params.h ?? 12, r = H * sp.trunk, h = H * sp.base + 1;
  return { kind: "cylinder", radiusTop: r, radiusBottom: r * 1.3, height: h, center: [0, h / 2, 0] };
}
````

#### Block 2

````text
// run_script: a wood. Each template has its own seed, so its copies share one mesh
const templates = [["oak", 14], ["birch", 13], ["fir", 19], ["pine", 16]].map(([kind, h], seed) => ({ primitive: { kind: "scripted", script: "scripts/tree.js", params: { kind, h }, seed }, material: { alphaTest: 0.5 }, physics: "static" }));
spawn("wood", { feetPosition: { x: 0, y: { terrain: 0 }, z: -60 }, scatter: { bounds: { shape: "circle", radius: 50 }, count: 110, seed: 7, variation: { scale: [0.8, 1.25], yaw: [0, 360] }, templates } });
````


### After clicking "read → leaf-sprays Bushes, hedges, ivy, leaves."

- H2: Leaf Sprays

Leaf Sprays

The bar: foliage is many small cards, each the picture of one twig spray: a stem at the card's foot, shoots forking off it, leaves along each shoot in shadow and in sun, clear ground round them. A spray reads as leaves at every distance. A painted blob of green or one big leaf on a card reads as paper.

The picture is a texture script you write (jayzee api TextureScript), so every leaf is sharp at any size. One script draws each kind by a param, scripts/tex-leaves.js?kind=needle. It exports meta = { filter: "linear", wrap: "clamp" }. Its canvas is 512 px square. The object that wears it carries material: { alphaTest: 0.5 } to cut the clear ground away.

scripts/tex-leaves.js?kind=needle

meta = { filter: "linear", wrap: "clamp" }

material: { alphaTest: 0.5 }

Each leaf has its own shade, dark in shadow and light in sun, so the spray has depth. ctx.color on the card multiplies, so keep it near white.

Leaves pack toward the card's upper corners, since a sparse spray vanishes far off, and every tip stops short of its edge, since a cut leaf draws a straight line. Count a leaf spray: read the finished canvas with getImageData; while under 0.4 of its pixels have alpha over 128, draw more shoots.

getImageData

A needle card is its own picture, never counted: a bough up the card with five sprigs a side, shorter toward the tip, each a dense lobe of 3 by 30 px needles from 15% lightness at its base to 40% at its tip, with clear ground as wide as the lobe between. Draw under sprigs first and darker.

The leaf names the species: a pointed oval, a small round leaf, a needle, a frond.

The cards:

A card is about 2 m across on a tree and 1 m on a bush: a pixel is 4 or 2 mm, so a species' leaf of 6 to 15 cm is 15 to 40 or 30 to 75 px.

A crown is many cards crossing its volume at mixed sizes and tilts, faces to the open air, dark cards in its heart so no sky shows through. Every card takes the crown's normal, so the crown shades as one volume (→trees).

Where paths go under a tree, its lowest boughs stay above a walker's head.

A bush is a cluster of the same cards round a low oval, a hedge the same along a long box, and ivy lies them flat on the wall.

#### Block 1

````text
scripts/tex-leaves.js?kind=needle
````

#### Block 2

````text
meta = { filter: "linear", wrap: "clamp" }
````

#### Block 3

````text
material: { alphaTest: 0.5 }
````

#### Block 4

````text
getImageData
````


### After clicking "read → meadow-grass Grass, lawns, tall fields, tufts."

- H2: Meadow Grass

Meadow Grass

The bar: a meadow reads as one painted surface from the jayzee to the hills: thin blades dark at the root and light at the tip, in big soft drifts of colour, leaning in waves, lit the way their ground is, and fading into a ground of their own colour with no band where they thin. Breath of the Wild, Genshin, Tsushima and a painted field are all this shape; the colours are always the world's own.

A meadow is a decoration layer (heightmap-terrain skill): its item is a tuft, never one blade, because an item's footprint sets how far it fills, and its material(ctx) paints around the ground. Ground cover lights with the ground's normal unless its geometry shapes its own ({ normals } or ctx.smooth()), so flat blades and cards shade as one surface with their ground. The field's colour is the ground's: tint two or three grass materials with the world's colours and drift them with your materialAt noise (your seed, your scale, patches tens of metres wide), every one bound to the layer. ctx.scatter.groundTint carries that colour to each tuft's feet, so the drifts run under the blades and on past them, and the far field is already right. ctx.scatter is random (a stable 0..1 per tuft), position (its feet, world metres), groundTint, heightFraction (0 feet → 1 tip) and wind (its gust lean in metres, a body's press included). On cube ground, grass standing out of the block is the block material's growth rule (voxel-terrain skill): no layer, no script.

{ normals }

ctx.scatter.groundTint

ctx.scatter

groundTint

heightFraction

growth

The worked technique: a card turned to the eye whose five fanning spikes are one signed distance, coloured from a ramp indexed by a big painted light field plus the height up the blade, grown with distance so it holds its size on screen, leaning in the world's wind. The ramp is the ground's colour scaled deep to light, so the ground sits at its middle and underpaints the field by itself. The layer names the two files you write: density: 8, items: [{ kind: "scripted", script: "scripts/tuft-card.js" }], material: { kind: "scripted", script: "scripts/tuft-look.js" }.

density: 8

items: [{ kind: "scripted", script: "scripts/tuft-card.js" }]

material: { kind: "scripted", script: "scripts/tuft-look.js" }

// scripts/tuft-card.js, yours to write: one card, 0.4 × 0.42 m, feet at y = 0; u across, v up export function geometry(ctx) { ctx.tri(-0.2, 0, 0, 0.2, 0, 0, 0.2, 0.42, 0); ctx.tri(-0.2, 0, 0, 0.2, 0.42, 0, -0.2, 0.42, 0); return { uvs: [0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1] }; }

// scripts/tuft-look.js, yours to write import { vec3, vec4, uv, positionLocal, mix, clamp, smoothstep, pow, abs, max, min, sin, floor, dot, fwidth, hash, select, float, Loop, mx_noise_float, cameraPosition, cameraWorldMatrix, modelWorldMatrix } from "builtin/tsl"; import { windDirection, windSpeed, windTravel } from "builtin/lighting"; import { MeshStandardNodeMaterial } from "builtin/three"; const axis = (M, i) => M.mul(vec4(i === 0 ? 1 : 0, i === 1 ? 1 : 0, i === 2 ? 1 : 0, 0)).xyz; export function material(ctx) { const m = new MeshStandardNodeMaterial(); m.roughness = 1; const feet = ctx.scatter.position, seed = ctx.scatter.random; // the ramp: the ground's colour, 0.45× deep to 1.5× light const pal = (t) => ctx.scatter.groundTint.mul(mix(0.45, 1.5, clamp(t, 0, 1))); // vertex: the corner (metres) along the eye's right and an up leaned 70% toward the eye's own, answered in the tuft's frame const right = axis(cameraWorldMatrix, 0), up = mix(vec3(0, 1, 0), axis(cameraWorldMatrix, 1), 0.7).normalize(); const tuft = (d) => vec3(dot(d, axis(modelWorldMatrix, 0)), dot(d, axis(modelWorldMatrix, 1)), dot(d, axis(modelWorldMatrix, 2))); const grow = pow(cameraPosition.sub(feet).length().div(5.2), 0.6); // the world's wind const gust = mx_noise_float(vec3(feet.xz.sub(windTravel).mul(0.15), 0)).mul(0.5).add(0.5); const lean = seed.sub(0.5).mul(0.4).add(gust.mul(windSpeed.mul(0.08).min(0.5)).mul(dot(vec3(windDirection.x, 0, windDirection.y), right))); const x = positionLocal.x, y = positionLocal.y; m.positionNode = tuft(right.mul(x.add(lean.mul(y))).add(up.mul(y))).mul(grow); // fragment: five spikes in one Loop, one signed distance with an fwidth edge const u = uv().x.sub(0.5), v = uv().y, sd = floor(seed.mul(997).add(0.5)); const best = min(float(0.12).sub(v), float(0.4).sub(abs(u))).mul(0.6).toVar(); Loop(5, ({ i }) => { const n = float(i), r1 = hash(sd.mul(0.091).add(n.mul(17))), r2 = hash(sd.mul(0.037).add(n)), r3 = hash(sd.mul(0.013).add(n.add(3.1))); const cx = r1.sub(0.5).mul(0.1).add(n.add(0.5).mul(0.12).sub(0.3)); const t = v.div(r2.mul(0.28).add(0.72)); const e = u.sub(cx.add(cx.mul(0.25).add(seed.sub(0.5).mul(0.6)).mul(pow(t.min(1), 1.7)))); const w = r3.mul(0.05).add(0.11).mul(pow(t.oneMinus().max(0), 0.62)).mul(sin(t.mul(3.1416)).mul(0.2).add(1)); best.assign(max(best, select(t.lessThan(1), w.sub(abs(e.mul(select(e.greaterThan(0), float(1.3), float(0.8))))), float(-1)))); }); m.opacityNode = clamp(best.div(fwidth(u).mul(1.6).add(1e-4)).add(0.5), 0, 1); // colour: the ramp at the light field plus the height up the blade, the root a step down the ramp const field = smoothstep(0.2, 0.75, mx_noise_float(vec3(feet.x.mul(0.05), feet.z.mul(0.05), 3)).mul(0.5).add(0.5)).mul(0.8).add(0.1); const t = field.mul(0.75).add(pow(v, 1.3).mul(0.46)).add(gust.sub(0.5).mul(0.3)).sub(0.14).add(hash(sd.add(7)).sub(0.5).mul(0.06)); m.colorNode = mix(pal(t.sub(0.38)), pal(t), smoothstep(0, 0.5, v)); return m; }

The ramp's colour is the world's: here the ground's, so any palette the ground wears works; a painted palette puts the world's own colours in its place.

5.2 is the distance a tuft reads at its authored size; the 0.6 power holds its size on screen. Past about 30 m the tufts thin by distance and the ground carries the field.

The alpha is the signed distance over its pixel width: a decoration's authored alpha is a hard cutout at 0.5 on a one-sample frame, and the fwidth edge keeps that cut clean at every distance.

A position node moves the tuft itself, so the lean is the script's: ctx.scatter.wind adds the engine's gust and a body's press to it.

ctx.scatter.wind

windDirection, windSpeed and windTravel (builtin/lighting) are the world's wind, the words the engine bends its blades by: any noise sampled at feet.xz − windTravel rolls with those blades, so grass, trees and water in any material share one wind and the colour waves ride it; a copied angle drifts from the sky's the day the wind turns.

feet.xz − windTravel

A painted filter and a depth blur over the meadow belong to the look (looks skill): a pass reads other pixels as texture(ctx.scene, uv), and a Kuwahara filter of four 4 × 4 regions is 64 reads a pixel, so it runs on a half-scale target, fewer taps at ctx.device.quality "low". Distance haze is the place's fog.

texture(ctx.scene, uv)

ctx.device.quality

Cost: density × reach² is capped by the place's instance budget; fewer, larger tufts reach farther than many small ones.

#### Block 1

````text
{ normals }
````

#### Block 2

````text
ctx.scatter.groundTint
````

#### Block 3

````text
ctx.scatter
````

#### Block 4

````text
groundTint
````

#### Block 5

````text
heightFraction
````

#### Block 6

````text
growth
````

#### Block 7

````text
density: 8
````

#### Block 8

````text
items: [{ kind: "scripted", script: "scripts/tuft-card.js" }]
````

#### Block 9

````text
material: { kind: "scripted", script: "scripts/tuft-look.js" }
````

#### Block 10

````text
// scripts/tuft-card.js, yours to write: one card, 0.4 × 0.42 m, feet at y = 0; u across, v up
export function geometry(ctx) {
  ctx.tri(-0.2, 0, 0, 0.2, 0, 0, 0.2, 0.42, 0);
  ctx.tri(-0.2, 0, 0, 0.2, 0.42, 0, -0.2, 0.42, 0);
  return { uvs: [0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1] };
}
````

#### Block 11

````text
// scripts/tuft-look.js, yours to write
import { vec3, vec4, uv, positionLocal, mix, clamp, smoothstep, pow, abs, max, min, sin, floor, dot, fwidth, hash, select, float, Loop, mx_noise_float, cameraPosition, cameraWorldMatrix, modelWorldMatrix } from "builtin/tsl";
import { windDirection, windSpeed, windTravel } from "builtin/lighting";
import { MeshStandardNodeMaterial } from "builtin/three";
const axis = (M, i) => M.mul(vec4(i === 0 ? 1 : 0, i === 1 ? 1 : 0, i === 2 ? 1 : 0, 0)).xyz;

export function material(ctx) {
  const m = new MeshStandardNodeMaterial();
  m.roughness = 1;
  const feet = ctx.scatter.position, seed = ctx.scatter.random;
  // the ramp: the ground's colour, 0.45× deep to 1.5× light
  const pal = (t) => ctx.scatter.groundTint.mul(mix(0.45, 1.5, clamp(t, 0, 1)));
  // vertex: the corner (metres) along the eye's right and an up leaned 70% toward the eye's own, answered in the tuft's frame
  const right = axis(cameraWorldMatrix, 0), up = mix(vec3(0, 1, 0), axis(cameraWorldMatrix, 1), 0.7).normalize();
  const tuft = (d) => vec3(dot(d, axis(modelWorldMatrix, 0)), dot(d, axis(modelWorldMatrix, 1)), dot(d, axis(modelWorldMatrix, 2)));
  const grow = pow(cameraPosition.sub(feet).length().div(5.2), 0.6);
  // the world's wind
  const gust = mx_noise_float(vec3(feet.xz.sub(windTravel).mul(0.15), 0)).mul(0.5).add(0.5);
  const lean = seed.sub(0.5).mul(0.4).add(gust.mul(windSpeed.mul(0.08).min(0.5)).mul(dot(vec3(windDirection.x, 0, windDirection.y), right)));
  const x = positionLocal.x, y = positionLocal.y;
  m.positionNode = tuft(right.mul(x.add(lean.mul(y))).add(up.mul(y))).mul(grow);
  // fragment: five spikes in one Loop, one signed distance with an fwidth edge
  const u = uv().x.sub(0.5), v = uv().y, sd = floor(seed.mul(997).add(0.5));
  const best = min(float(0.12).sub(v), float(0.4).sub(abs(u))).mul(0.6).toVar();
  Loop(5, ({ i }) => {
    const n = float(i), r1 = hash(sd.mul(0.091).add(n.mul(17))), r2 = hash(sd.mul(0.037).add(n)), r3 = hash(sd.mul(0.013).add(n.add(3.1)));
    const cx = r1.sub(0.5).mul(0.1).add(n.add(0.5).mul(0.12).sub(0.3));
    const t = v.div(r2.mul(0.28).add(0.72));
    const e = u.sub(cx.add(cx.mul(0.25).add(seed.sub(0.5).mul(0.6)).mul(pow(t.min(1), 1.7))));
    const w = r3.mul(0.05).add(0.11).mul(pow(t.oneMinus().max(0), 0.62)).mul(sin(t.mul(3.1416)).mul(0.2).add(1));
    best.assign(max(best, select(t.lessThan(1), w.sub(abs(e.mul(select(e.greaterThan(0), float(1.3), float(0.8))))), float(-1))));
  });
  m.opacityNode = clamp(best.div(fwidth(u).mul(1.6).add(1e-4)).add(0.5), 0, 1);
  // colour: the ramp at the light field plus the height up the blade, the root a step down the ramp
  const field = smoothstep(0.2, 0.75, mx_noise_float(vec3(feet.x.mul(0.05), feet.z.mul(0.05), 3)).mul(0.5).add(0.5)).mul(0.8).add(0.1);
  const t = field.mul(0.75).add(pow(v, 1.3).mul(0.46)).add(gust.sub(0.5).mul(0.3)).sub(0.14).add(hash(sd.add(7)).sub(0.5).mul(0.06));
  m.colorNode = mix(pal(t.sub(0.38)), pal(t), smoothstep(0, 0.5, v));
  return m;
}
````

#### Block 12

````text
ctx.scatter.wind
````

#### Block 13

````text
feet.xz − windTravel
````

#### Block 14

````text
texture(ctx.scene, uv)
````

#### Block 15

````text
ctx.device.quality
````


### After clicking "read → fx Particles and lights: impacts, beams, explosions, fire, rain, auras."

The bar: an impact is the material it struck, thrown along the blow's normal from the hit point (hit.position, contact.position, a weapon's socket); read the material one dot away (other in onCollide, ctx.getObject(hit.id), ctx.place.terrain.materialAt(x, z)) and give each its own sprite and flight, never one population re-tinted: straw many light stalks that ride drag and lie where they land; wood a few hard chips at full gravity that spin and bounce; stone grain grit under a slow grey smoke-puff; metal ember sparks, additive, fast, gone in a quarter second. A thing at rest shows its life. Several cheap populations with jobs read alive: a core, a payoff chained off it (on=@pop: splashes off dying drops along their hit's $normal), an accent, one light, where one dense population reads flat. Nothing metronomes or clones: rates on flick(), life=a..b, speeds *(a..b), a held size read back as $size. A wall torch is the example's CAMPFIRE at a wick: its flick() rate, smoke on=@flame, and ONE light whose intensity IS the flame count; a static light: row beside a flame is a lamp, never a torch. An effect unfolds and fills its scale: a portal opens before it stands; a storm fills the walker's sky, with strikes and one light. An effect that costs the frame is not wonderful: a beam is a few long cards, a glow is one light or an emissive surface, and particles are for what moves; low fog is fog.height (→atmosphere).

hit.position

contact.position

ctx.getObject(hit.id)

ctx.place.terrain.materialAt(x, z)

stalk

chip

smoke-puff

ember

on=@pop

$normal

flick()

life=a..b

*(a..b)

$size

on=@flame

A program is a string in the emit: ctx.emit("fx", { position: hit.position, script: "fx\npop …", params: { normal: hit.normal } }). A file (scripts/effects/x.fx.js) is for real code or reuse: import { fx, pop, … } from "builtin/fx"; export function effect(ctx) { …; return fx(a, b); }, its params in ctx.params (default each: a NaN in a number slot is refused); a file that exports the program string draws nothing. An object's fx: { script, params } plays at its feet and follows it.

ctx.emit("fx", { position: hit.position, script: "fx\npop …", params: { normal: hit.normal } })

scripts/effects/x.fx.js

import { fx, pop, … } from "builtin/fx"; export function effect(ctx) { …; return fx(a, b); }

fx: { script, params }

The straw hit, one volley the tick the blade lands (a one-shot ends when its last stalk dies): pop straw burst=18..30 life=.8..1.5 v=<%normal|0,1,0>(2.5..5%power|1)+sdir()(.6..1.6) size=.08..0.16 spin=-9..9 tint=oklch(.86 .10 88)..oklch(.70 .11 75) acc=grav()+drag(1.2) col=$tint a=1>.75:1>0 sz=$size rot=$age$spin floor=stick r=sprite(stalk,alpha,velocity,.02)

pop straw burst=18..30 life=.8..1.5 v=<%normal|0,1,0>(2.5..5%power|1)+sdir()(.6..1.6) size=.08..0.16 spin=-9..9 tint=oklch(.86 .10 88)..oklch(.70 .11 75) acc=grav()+drag(1.2) col=$tint a=1>.75:1>0 sz=$size rot=$age$spin floor=stick r=sprite(stalk,alpha,velocity,.02)

(2.5..5

(.6..1.6) size=.08..0.16 spin=-9..9 tint=oklch(.86 .10 88)..oklch(.70 .11 75) acc=grav()+drag(1.2) col=$tint a=1>.75:1>0 sz=$size rot=$age

Fire is a surface whose edges move, and glowing sprites are one form of it: the example's campfire holds its hearthlight (n=1), so the light stands while the fire does. A fire that must read solid (a burning body) is one mesh around the thing: its material(ctx) noise, stretched tall and carried up with time, drives opacityNode, and alphaTest cuts the edge, so it is opaque while its tongues move.

n=1

stretch is SECONDS of travel: a velocity-aligned card's long axis is size + |v|·stretch: 0.02 on a stalk or chip; 0.1 draws a glow blade that reads as hay. On align=axis the slot is metres: a unit axis=<x,y,z> with stretch 9 is a ten-metre card turned to the camera around the axis; a beam of light is four of them held (n=4, add, no rate), its dust on line(10,ax,ay,az), a pool and one daylight at the foot. Debris is a hard-edged card (5–12 cm, alpha), never a soft dot stretched; sparks and embers are the streaks (ember, add, ≤ 0.03).

align=axis

axis=<x,y,z>

n=4

line(10,ax,ay,az)

Textures, white shapes tinted by col: soft-disc smoke-puff ember mote flame-wisp leaf droplet snowflake petal stalk chip grain splinter shard; ground and walls cut them hard without soft metres. hdr(5,3,1) through alpha clips to white; smoke through add never darkens. distort (sprite(soft-disc,distort)) paints what stands behind, shifted by col's x,y in screen fractions (under .002 nothing paints), masked by the texture's alpha, mixed by a: heat haze, refraction, a vortex's warp.

col

soft-disc smoke-puff ember mote flame-wisp leaf droplet snowflake petal stalk chip grain splinter shard

hdr(5,3,1)

sprite(soft-disc,distort)

rate reads emitter values (time(), noise(), #pop, flick(), env()); cone() sdir() blast() roll once at birth; acc and bindings run every tick. Coupling reads the previous tick; a child with no shape is born where its parent died, on=point() at the anchor.

noise()

#pop

env()

cone()

sdir()

blast()

acc

on=point()

count: N holds until destroyed (with no lifetime it rides its emitter, space=world holds it); burst with a life ends. A moving emitter leaves its particles behind: trails inheritVelocity, auras space: "local" or attachTo: <id>, weather fx follow=player with n= and wrap= on a box() slab around every viewer, n its only density knob.

space=world

attachTo: <id>

fx follow=player

n=

wrap=

box()

A jagged strike is ~15 midpoint-displaced points fed to path() with align: "segment"; it also takes SVG path data ({ plane: "xz", size }, metres) or entity(id) of a vector object. Timed ribbons (lifetime), ground ribbons (facing: "ground"), a ribbon beside a sprite with several textures, path(entity(id)), parent() and light({ perParticle }) pull their whole effect onto the CPU; dense sprite mass is its own effect. Tens of thousands alive is working scale.

align: "segment"

{ plane: "xz", size }

facing: "ground"

path(entity(id))

parent()

light({ perParticle })

Light that moves: a trail, a helix, an arc is a ribbon() rider whose pos:/vel: traces the path, ONE continuous strip per particle (u along, v across 0 → 1; width/color). A sheet, a petal, a veil is mesh({ shape: "card", blend: "add", material }); a blade or a leaf mesh({ script: "scripts/blade.js" }): your geometry(ctx) piece. The look (a bright rim over a softer core, veins, a shimmer) is your own fresnel and noise in the material(ctx) file the sink names, over ctx.fx (uvAlong, uvAcross, viewDir, normal, color, alpha, params.<name>, scene(offset), texture(uv)).

ribbon()

mesh({ shape: "card", blend: "add", material })

mesh({ script: "scripts/blade.js" })

texture(uv)

Tier branches (ctx.quality, ctx.device, ctx.device.hold: 0..1, the memory this viewer can carry) are per viewer and render-only: counts, sizes, rates, never lifetimes or windows (they set the shared wind-down clock). ctx.device.quality: the level drawn now.

ctx.device.hold

<grammar> // starts a comment. Beyond <fx-grammar>: shapes for on= and at= (on=box(13,.6,13).c(9.5) is a rain slab over the eye): disc(r) sphere(r) box(hx,hy,hz) arc() line(len,ax,ay,az) point() path(js{pts}) .fn on any expr: sin cos abs floor fract sqrt neg norm len min max mix cross dot step smooth mod pow atan2 yaw builtins with their arguments: cone(deg) sdir() blast(s) ci() up(s) grav() buoy(k) drag(k) radial(s) attract(k) vortex(k) force(f) hdr(r,g,b) spin(rps) curl(f) noise(x) flick(hz,amt) fire() env(0>.2:80>1.7:0) time() floorh() wind() entity(id) parent(name) field(js{…}) orbit(radius,rps,phase,around,axis) seek(target,speed) along(js{pts},t): s k f x t take any value; deg rps hz amt r g b are one number, the roll goes outside: cone(15)*(.2..0.5) sprite's later slots: sprite(tex,blend,align,stretch s,soft[,lit=true,axis=<0,1,0>,repeat=6;1,glow=.1,filter=pixel,depthTest=false,sortingLayer=75,sortingOrder=2]): tex a textures/ name, a /cdn/ picture or SVG path data; glow a halo past a picture's edge in particle colour, ≤ .15 of size; filter=pixel keeps texels hard, one more draw like another tex; sortingLayer and sortingOrder sort particles among 2D sprites (neither: the nearest sprite among the object it plays on or a loose one-shot's emitter and its parents, else 0) rib's and mesh's later slots: blend=add soft=.2 material=scripts/rim.js (a file you write) params=t:$age/$life;heat:$heat (≤ 4) · rib facing=camera|ground|<0,1,0> in the pop's frame, sortingLayer sortingOrder as sprite's · mesh script=scripts/blade.js </grammar>

#### Block 1

````text
hit.position
````

#### Block 2

````text
contact.position
````

#### Block 3

````text
ctx.getObject(hit.id)
````

#### Block 4

````text
ctx.place.terrain.materialAt(x, z)
````

#### Block 5

````text
stalk
````

#### Block 6

````text
chip
````

#### Block 7

````text
smoke-puff
````

#### Block 8

````text
ember
````

#### Block 9

````text
on=@pop
````

#### Block 10

````text
$normal
````

#### Block 11

````text
flick()
````

#### Block 12

````text
life=a..b
````

#### Block 13

````text
*(a..b)
````

#### Block 14

````text
$size
````

#### Block 15

````text
on=@flame
````

#### Block 16

````text
ctx.emit("fx", { position: hit.position, script: "fx\npop …", params: { normal: hit.normal } })
````

#### Block 17

````text
scripts/effects/x.fx.js
````

#### Block 18

````text
import { fx, pop, … } from "builtin/fx"; export function effect(ctx) { …; return fx(a, b); }
````

#### Block 19

````text
fx: { script, params }
````

#### Block 20

````text
pop straw burst=18..30 life=.8..1.5 v=<%normal|0,1,0>(2.5..5%power|1)+sdir()(.6..1.6) size=.08..0.16 spin=-9..9 tint=oklch(.86 .10 88)..oklch(.70 .11 75) acc=grav()+drag(1.2) col=$tint a=1>.75:1>0 sz=$size rot=$age$spin floor=stick r=sprite(stalk,alpha,velocity,.02)
````

#### Block 21

````text
n=1
````

#### Block 22

````text
align=axis
````

#### Block 23

````text
axis=<x,y,z>
````

#### Block 24

````text
n=4
````

#### Block 25

````text
line(10,ax,ay,az)
````

#### Block 26

````text
col
````

#### Block 27

````text
soft-disc smoke-puff ember mote flame-wisp leaf droplet snowflake petal stalk chip grain splinter shard
````

#### Block 28

````text
hdr(5,3,1)
````

#### Block 29

````text
sprite(soft-disc,distort)
````

#### Block 30

````text
noise()
````

#### Block 31

````text
#pop
````

#### Block 32

````text
env()
````

#### Block 33

````text
cone()
````

#### Block 34

````text
sdir()
````

#### Block 35

````text
blast()
````

#### Block 36

````text
acc
````

#### Block 37

````text
on=point()
````

#### Block 38

````text
space=world
````

#### Block 39

````text
attachTo: <id>
````

#### Block 40

````text
fx follow=player
````

#### Block 41

````text
n=
````

#### Block 42

````text
wrap=
````

#### Block 43

````text
box()
````

#### Block 44

````text
align: "segment"
````

#### Block 45

````text
{ plane: "xz", size }
````

#### Block 46

````text
facing: "ground"
````

#### Block 47

````text
path(entity(id))
````

#### Block 48

````text
parent()
````

#### Block 49

````text
light({ perParticle })
````

#### Block 50

````text
ribbon()
````

#### Block 51

````text
mesh({ shape: "card", blend: "add", material })
````

#### Block 52

````text
mesh({ script: "scripts/blade.js" })
````

#### Block 53

````text
texture(uv)
````

#### Block 54

````text
ctx.device.hold
````


### After clicking "read → game-feel Contact juice: hits, coins, landings, screen shake, hitstop, lasting marks."

- H2: Game Feel

Game Feel

Grade a contact by its weight, never one deck for everything. A coin, a pickup, a tag, a flag, a button that changed something: a pitch-stepped chime at the contact, a sparkle, a floating "+1", at most a small screenShake; no cameraPunch and no hitstop: the camera kick is a hit's. A hit dealt or taken: the struck thing squashes, a burst from the contact point, one cameraPunch or screenShake and a 0.02–0.04 s hitstop, on the connect only and once per event: a whiff is the whoosh. A kill, a crit, a boss entering, the vault cracking open earn the long beats (a 0.05 s hitstop, flash on the victim, screenFlash, slowMo, shockwave) once a session each, never per hit: a flash per hit strobes the player it targets.

The end of a round is the longest beat, played in the world before anything is offered. The referee writes the phase (ctx.place.state.phase = "ending", the winner and the clock beside it) and every HUD reads it, so every player sees the same moment on the room's clock: the winner lit (highlightSet, flash) with a burst at their feet (fx), one slowMo or shockwave, the music dropping to a sting (playSound) and the winner's name large across the screen: three to five seconds, the losers watching too. Then the referee writes the next phase and the HUD offers one button or a countdown to go again, a plate at the scene's edge naming the button's key (a locked mouse clicks the world until Escape); data-modal is for a dialog, not for the end. The button asks the referee (sendAction → the body's script writes a row the sim reads), the sim resets the room's rows, and a player's own state resets when the round does, never on their press alone.

ctx.place.state.phase = "ending"

data-modal

<player>.vignette and <player>.letterbox are set-and-hold state, not pulses: derive them each tick from what they mean (ctx.self.vignette = hp < 30 ? 0.3 : 0) or write 0 on every round-transition path: a death vignette left at 0.5 welds onto the next round. 0.15–0.3 is a hurt pulse; 0.5+ is a wall, the death beat only. A light that pulses faster than 3 Hz is collapsed to a steady glow for a player who turned reduce-flashing on; author under 3 Hz and the game reads the same for everyone.

ctx.self.vignette = hp < 30 ? 0.3 : 0

#### Block 1

````text
ctx.place.state.phase = "ending"
````

#### Block 2

````text
data-modal
````

#### Block 3

````text
ctx.self.vignette = hp < 30 ? 0.3 : 0
````


### After clicking "read → physics Ragdolls, limbs on joints, forces."

ctx.self.joints.shoulder = { to: "torso", type: "spherical", anchor, targetAnchor, axis, limits: { cone, twist: [min, max] } } // a limb built from parts (a rigged model ragdolls whole; `bone` picks its bone →uploaded-models). In a chain each link joins the link above, which stands first. Build the limb MID-range, then mint with its limits: its pose at its first limits is cone 0, twist 0, kept through `.limits` retunes and re-runs; `.limits = {}` forgets it; limp is { cone: Math.PI }. axis = the limb's line in this body's frame; cone = half-angle off the middle; twist + = `to` turning right-handed about axis, seen from this body (the limb's own right-handed turn counts down); radians. A half left out is free: { cone: 0 } only spins, twist: [0, 1] turns one way. Stops are soft: hits press a twist past its edge, the harder the further, then it settles inside. `.target = { x, y, z, w }` turns it from its first-target pose, `.strength` 0..1 how firmly (a ragdolled rig's bones too)

#### Block 1

````text
ctx.self.joints.shoulder = { to: "torso", type: "spherical", anchor, targetAnchor, axis, limits: { cone, twist: [min, max] } } // a limb built from parts (a rigged model ragdolls whole; `bone` picks its bone →uploaded-models). In a chain each link joins the link above, which stands first. Build the limb MID-range, then mint with its limits: its pose at its first limits is cone 0, twist 0, kept through `.limits` retunes and re-runs; `.limits = {}` forgets it; limp is { cone: Math.PI }. axis = the limb's line in this body's frame; cone = half-angle off the middle; twist + = `to` turning right-handed about axis, seen from this body (the limb's own right-handed turn counts down); radians. A half left out is free: { cone: 0 } only spins, twist: [0, 1] turns one way. Stops are soft: hits press a twist past its edge, the harder the further, then it settles inside. `.target = { x, y, z, w }` turns it from its first-target pose, `.strength` 0..1 how firmly (a ragdolled rig's bones too)
````


### After clicking "read → bodies What passes through what: ghosts, teammates, walking on walls and tiny planets."

- H3: A body's own up

The bar: what is solid to what is decided, never left to chance. A swarm of ghosts drifts through itself and still breaks on every wall; your team runs through each other in a doorway while the other team body-blocks it; the boss is a wall of muscle no player walks through; a shell flies clean past its own gunner's squad and stops on the first enemy. A crowd that jams on itself, or a guard you can walk through, reads as a bug.

// what each thing IS goes on its body; which kinds pass through which is ONE table on the world ctx.world.passThrough = { ghost: ["ghost"], red: ["red"], blue: ["blue"] }; ctx.spawn({ tags: ["ghost"], primitive: { kind: "sphere", radius: 0.5 }, feetPosition: { x: 0, y: 1, z: -6 }, physics: { body: "dynamic", layer: "ghost" } }); ctx.spawn({ tags: ["boss"], feetPosition: { x: 0, y: 0, z: -12 }, physics: { body: "character", layer: "boss" } }); // no row names "boss": solid to every player

A layer is any name. Every pair collides until the table pairs their layers; a pair passes both ways, in every place of the world. Walls, ground and every body with no layer stop everything.

"player" is the layer of every character that names none, NPCs included, and the table pairs it with itself: they all pass through each other. A character that names a layer leaves it and is solid to players until a row pairs them (boss: ["player"]). Teams: each player's body names its team's layer, paired with itself: friends pass, enemies block.

boss: ["player"]

A pair that passes never touches: no contact, no trigger event, no step blocked. A pickup or a zone a player sets off is trigger: true, never a layer paired with "player".

trigger: true

Each collider is its own: a child with its own physics names its own layer.

The table is world config (passThrough: in world.config.yaml), written once where the world is built. A thing that changes sides mid-game changes its own layer.

A body's own up

A character stands along its own up: physics: { body: "character", up: [x, y, z] }, a direction on world axes, any length; unset, it stands against its place's gravity. Ground, slopes, steps and the capsule follow it, and the body's velocity and yaw are then its own: +y is its up, x and z lie on the ground under its feet, and a world direction d in those words is rotate(r.yaw, rotate({ ...r, w: -r.w }, d)), r = ctx.self.rotation, rotate from "builtin/vec3". So scripts/player.js walks any up as written: it bends y by ctx.place.gravity.y, puts the jump in y and walks in x and z, and aimYawSin / aimYawCos turn with the camera along the body's own ground, so W goes into the screen on a wall as on a floor.

physics: { body: "character", up: [x, y, z] }

rotate(r.yaw, rotate({ ...r, w: -r.w }, d))

r = ctx.self.rotation

scripts/player.js

ctx.place.gravity.y

aimYawSin / aimYawCos

The up is a pose, like the rotation: the body's own script writes ctx.self.physics.up = v as often as every tick; = null returns it to its place's up. A changed up turns the body, and the velocity it holds, by the least turn from the old up: a run into a wall goes on up the wall, a walk round a planet holds a straight line.

ctx.self.physics.up = v

A wall, a ceiling: one write where the body steps on: a pad's onTriggerEnter leaves other.state.up = [1, 0, 0], and the body's update writes ctx.self.physics.up = ctx.self.state.up ?? null.

other.state.up = [1, 0, 0]

ctx.self.physics.up = ctx.self.state.up ?? null

A small planet, centre C: the first line of the player's update: const p = ctx.self.feetPosition; ctx.self.physics.up = [p.x - C.x, p.y - C.y, p.z - C.z]. The ball is primitive: { kind: "sphere", radius } with physics: "static". A crate is no character: it falls to the ball by its own held force (physics: { body: "dynamic", gravityScale: 0 }, then ctx.self.forces.pull = { force } toward C each tick).

const p = ctx.self.feetPosition; ctx.self.physics.up = [p.x - C.x, p.y - C.y, p.z - C.z]

primitive: { kind: "sphere", radius }

physics: { body: "dynamic", gravityScale: 0 }

ctx.self.forces.pull = { force }

A deck that rolls right over (a kinematic hull its script turns): each rider's update writes ctx.self.physics.up = rotate(ctx.getObject("deck").rotation, { y: 1 }). A body that stands on the deck rides it.

ctx.self.physics.up = rotate(ctx.getObject("deck").rotation, { y: 1 })

The eye: the camera rig writes ctx.self.up = ctx.self.target.physics.up each tick: its look and rotation turn on that up, the eye at feet + up × height.

ctx.self.up = ctx.self.target.physics.up

#### Block 1

````text
// what each thing IS goes on its body; which kinds pass through which is ONE table on the world
ctx.world.passThrough = { ghost: ["ghost"], red: ["red"], blue: ["blue"] };
ctx.spawn({ tags: ["ghost"], primitive: { kind: "sphere", radius: 0.5 }, feetPosition: { x: 0, y: 1, z: -6 }, physics: { body: "dynamic", layer: "ghost" } });
ctx.spawn({ tags: ["boss"], feetPosition: { x: 0, y: 0, z: -12 }, physics: { body: "character", layer: "boss" } }); // no row names "boss": solid to every player
````

#### Block 2

````text
boss: ["player"]
````

#### Block 3

````text
trigger: true
````

#### Block 4

````text
physics: { body: "character", up: [x, y, z] }
````

#### Block 5

````text
rotate(r.yaw, rotate({ ...r, w: -r.w }, d))
````

#### Block 6

````text
r = ctx.self.rotation
````

#### Block 7

````text
scripts/player.js
````

#### Block 8

````text
ctx.place.gravity.y
````

#### Block 9

````text
aimYawSin / aimYawCos
````

#### Block 10

````text
ctx.self.physics.up = v
````

#### Block 11

````text
other.state.up = [1, 0, 0]
````

#### Block 12

````text
ctx.self.physics.up = ctx.self.state.up ?? null
````

#### Block 13

````text
const p = ctx.self.feetPosition; ctx.self.physics.up = [p.x - C.x, p.y - C.y, p.z - C.z]
````

#### Block 14

````text
primitive: { kind: "sphere", radius }
````

#### Block 15

````text
physics: { body: "dynamic", gravityScale: 0 }
````

#### Block 16

````text
ctx.self.forces.pull = { force }
````

#### Block 17

````text
ctx.self.physics.up = rotate(ctx.getObject("deck").rotation, { y: 1 })
````

#### Block 18

````text
ctx.self.up = ctx.self.target.physics.up
````


### After clicking "read → projectiles Guns, arrows, fireballs, cannons."

The bar: the gun in your hand has weight, and the shot is visible from muzzle to mark. The gun lags a fast turn and catches up, breathes with the walk, and every shot kicks it back and up and lets it settle with one small overshoot; the eye takes a punch with it. The flash lights the barrel, a tracer draws the line, and where it lands there is a spark, a scorch decal, dust off the wall and the sound of THAT material; a hit on a body answers with a click and a bloomed crosshair. A miss costs a bullet hole; nothing is invisible.

// scripts/player-gun.js: the FIRST-PERSON GUN, yours to write: a viewmodel on the camera, the shot from the eye import { getInputRay, raycast } from "builtin/physics"; import * as combat from "./lib/combat.js"; // yours: damage(ctx, id, amount, { source }) const RATE_MS = 140, DAMAGE = 22, RANGE = 90, REST = { x: 0.26, y: -0.24, depth: 0.5 }; const feel = (s) => { if (typeof s.kick !== "number") Object.assign(s, { kick: 0, kickV: 0, swayX: 0, swayY: 0, pullX: 0, pullY: 0 }); return s; }; // seeded on every hook, so a re-bind never writes NaN export function onSpawn(ctx) { const s = feel(ctx.self.state); if (s.gunId && ctx.getObject(s.gunId)) return; // one gun per body across rejoins s.gunId = ctx.spawn({ audience: "local", scope: "session", feetPosition: { attach: "camera", ...REST, fov: 55 }, primitive: { kind: "scripted", script: "scripts/gen/rifle.js", sockets: { muzzle: [0, 0.07, -0.62] } } }); // −Z forward } export function onInput(ctx, input) { const s = feel(ctx.self.state), a = input.axes, now = ctx.now(); const yaw = Math.atan2(a.aimYawSin ?? 0, a.aimYawCos ?? 1), pitch = (a.aimPitchN ?? 0) * 1.2; if (s.lastYaw != null) { const dyaw = Math.atan2(Math.sin(yaw - s.lastYaw), Math.cos(yaw - s.lastYaw)); s.pullX = Math.max(-0.05, Math.min(0.05, s.pullX + dyaw * 0.9)); s.pullY = Math.max(-0.04, Math.min(0.04, s.pullY - (pitch - s.lastPitch) * 0.7)); } // the look's delta pulls the gun the OTHER way s.lastYaw = yaw; s.lastPitch = pitch; if (!input.held.fire || s.dead || now < (s.nextShotAt ?? 0)) return; // held = an automatic; pressed = a semi-auto s.nextShotAt = now + RATE_MS; s.kickV += 9; const ray = getInputRay(ctx, input); if (!ray) return; const muzzle = ctx.getObjectSocket(s.gunId, "muzzle"); if (muzzle && muzzle.position) ctx.emit("fx", { position: muzzle.position, attachTo: s.gunId, script: "scripts/effects/muzzle-flash.fx.js", params: { dir: ray.direction } }); // born at the socket AND riding the gun ctx.emit("cameraPunch", { direction: { x: 0, y: 0.35, z: -1 }, intensity: 0.4 }, { audience: { player: ctx.self.id } }); ctx.emit("playSound", { clip: "cdn/sfx-rifle-shot.mp3", position: ray.origin, pitch: 0.95 + ctx.random() * 0.1 }); const hit = raycast(ctx, ray.origin, ray.direction, { distance: RANGE, ignoreEntities: [ctx.self.id, s.gunId] }); if (!hit) return; const t = hit.id ? ctx.getObject(hit.id) : null; if (t && t.tags.includes("enemy") && !t.state.dead) { combat.damage(ctx, t.id, DAMAGE, { source: ctx.self.id, kind: "bullet" }); ctx.emit("hitstop", { duration: 0.02 }, { audience: { player: ctx.self.id } }); ctx.emit("playSound", { clip: "cdn/sfx-hitmarker-click.mp3", position: ray.origin, volume: 0.5 }); } else { ctx.emit("decal", { position: hit.position, normal: hit.normal, texture: "cdn/decal-bullet-hole-stone.png", size: 0.12, lifetime: 25 }); ctx.emit("fx", { position: hit.position, script: "scripts/effects/impact-dust.fx.js" }); ctx.emit("playSound", { clip: "cdn/sfx-ricochet-stone.mp3", position: hit.position, volume: 0.5 }); } } export function update(ctx, dt) { const s = feel(ctx.self.state), gun = ctx.getObject(s.gunId); if (!gun) return; s.kickV += (-180 * s.kick - 14 * s.kickV) * dt; s.kick += s.kickV * dt; // k 180 / c 14: one overshoot, home in ~0.35 s (a pistol: 400 / 22) s.pullX *= Math.max(0, 1 - dt * 6); s.pullY *= Math.max(0, 1 - dt * 6); s.swayX += (s.pullX - s.swayX) * Math.min(1, dt * 14); s.swayY += (s.pullY - s.swayY) * Math.min(1, dt * 14); const v = s.velocity ?? { x: 0, z: 0 }, w = Math.min(1, Math.hypot(v.x, v.z) / 6), t = ctx.now() / 1000, bobX = Math.sin(t * 9) * 0.012 * w, bobY = Math.abs(Math.cos(t * 9)) * 0.01 * w; gun.feetPosition = { attach: "camera", x: REST.x + s.swayX + bobX, y: REST.y + s.swayY + bobY + s.kick * 0.12, depth: REST.depth - s.kick * 0.35, fov: 55 }; gun.rotation = { yaw: -s.swayX * 140, pitch: s.kick * 45 + s.swayY * 140, roll: -s.swayX * 70 }; }

The feel is the viewmodel's per-tick write and nothing else: recoil as a spring the shot adds VELOCITY to (one overshoot reads as mass; a kick that only decays reads as a slide), sway from the look's delta as a PULL that holds while the gun eases after it (a hard 90° turn leaves the barrel 4–6° and 3–4 cm off rest and home in about 0.4 s), the walk's bob scaled by the body's speed, cameraPunch on the eye. The shot is a noise the hunter's ear hears (the always-on noise line).

Hitscan is the default for guns and lasers: no entity, no travel time: getInputRay then raycast from the EYE. A shot lands where the shooter aimed only through raycast or a trigger; query() + distance shoots through walls. The default cast meets a body's own collider, which no clip moves (a character: an upright capsule); hits: "geometry" meets what is drawn, the posed skin and the ground, and names a rig's bone (hit.bone).

query()

hit.bone

AN ARC IS SOLVED: solveShot(muzzle, mark, speed, g, lead), null when out of range: name the miss, fire nothing. The mark is the look ray's hit or where the look meets the sea; a shot fired along the look ray drops g·t²/2 short. Solve with the g the ball flies under: a ball moved by hand falls at the g YOU write in its update (s.vel.y -= s.g * dt), a dynamic body at the place's. The ball is born a metre clear of the muzzle, its own hull in ignoreEntities.

solveShot(muzzle, mark, speed, g, lead)

s.vel.y -= s.g * dt

An arrow, a shell, a fireball is an ENTITY the shooter's onInput spawns at the true muzzle: { tags: ["projectile"], lifetime: 8, state: { vel, ownerId: ctx.self.id }, rotation: rotationFromDirection(vel), behavior: "scripts/arrow.js" }: a script you write whose update puts gravity into s.vel, casts raycast(ctx, feet, dir, { distance: step * 1.5, ignoreEntities: [s.ownerId] }) BEFORE the move so a fast shot never tunnels, and on a hit damages with source: s.ownerId, spawns the impact fx + decal at hit.position and destroy()s; else moves by vel·dt and writes rotation = rotationFromDirection(dir): the nose is the modelled forward, −Z. lifetime is the backstop. Bullet-hell: the place's sim.js fires kinematic trigger spheres (physics: { body: "kinematic", trigger: true }, damage in onTriggerEnter, never a sim.js distance test, which judges a far player a round trip late), short-lived and capped.

{ tags: ["projectile"], lifetime: 8, state: { vel, ownerId: ctx.self.id }, rotation: rotationFromDirection(vel), behavior: "scripts/arrow.js" }

s.vel

raycast(ctx, feet, dir, { distance: step * 1.5, ignoreEntities: [s.ownerId] })

source: s.ownerId

destroy()

vel·dt

rotation = rotationFromDirection(dir)

physics: { body: "kinematic", trigger: true }

A tracer is an EFFECT, drawn by the flash program: one path() segment particle from the muzzle to the mark, additive, gone in a tenth of a second, a wider dim halo on the same path; a flying projectile's tracer rides the entity (inheritVelocity). A cylinder re-laid each tick pops in and out (→fx).

A door is a hole in space for a ray too: a hitscan that meets an open portal continues out of the far gate; getObject(hit.id) reads the far thing, not in your ctx.place.objects, so the damage is a word through the same door: emit("hit", { damage, by: ctx.self.id }, { to: hit.address, via: hit.doors[0].id }), and the target's own ctx.on("hit", (ctx, payload, meta) => …) over there applies the health convention and spawns the impact in its own frame; the muzzle stays here. A physics ENTITY crosses by the door's trigger and cross(), hidden for a round trip: fine for a grenade, wrong for a bullet.

getObject(hit.id)

emit("hit", { damage, by: ctx.self.id }, { to: hit.address, via: hit.doors[0].id })

ctx.on("hit", (ctx, payload, meta) => …)

cross()

feetPosition: { attach: "camera", x, y, depth, fov } // the viewmodel: camera-frame metres (x right, y up, depth forward); fov gives the subtree its own projection over the world (held guns ~50–55, the world 60–75); a per-tick write carries fov every time; audience "local" + scope "session": my screen only getObjectSocket(id, "muzzle"): { position, direction, … } | null // the socket's WORLD point as this screen draws it (a viewmodel's corrected for its fov) and the barrel's unit direction; walks the parent chain; no declared socket → the forward end fx / decal: … attachTo: <id> // the effect or the mark rides that object: a flash on the GUN (unattached, a viewmodel's flash draws where the barrel was a tick ago), a burn on the target it hit solveShot(from, to, speed, g, lead?) → { vel, time } | null // builtin/ballistics; g a magnitude in m/s² (the place's gravity.y works as is); elevation(speed, g, distance, rise) beside it hit.bone: { name, position, normal } // the bone the skin there rides, the hit in its frame; a mark spawned { parent: hit.id, attachment: { bone: hit.bone.name }, feetPosition: hit.bone.position } rides the limb hit.world, hit.address, hit.doors: { id, link, world, exit }[] // only beyond a door (`through` doors deep, default 1), nearest first; address is "world:<id> +place#thing". hit.door: { link, verdict: "unheld" | "through-spent" | "no-exit", message }: the ray stopped AT a door meta.origin = { world, actor, script, door, exit, address } // the far ear's, through a door: answer with emit(name, payload, { to: meta.origin.address })

#### Block 1

````text
// scripts/player-gun.js: the FIRST-PERSON GUN, yours to write: a viewmodel on the camera, the shot from the eye
import { getInputRay, raycast } from "builtin/physics";
import * as combat from "./lib/combat.js"; // yours: damage(ctx, id, amount, { source })
const RATE_MS = 140, DAMAGE = 22, RANGE = 90, REST = { x: 0.26, y: -0.24, depth: 0.5 };
const feel = (s) => { if (typeof s.kick !== "number") Object.assign(s, { kick: 0, kickV: 0, swayX: 0, swayY: 0, pullX: 0, pullY: 0 }); return s; }; // seeded on every hook, so a re-bind never writes NaN
export function onSpawn(ctx) {
  const s = feel(ctx.self.state);
  if (s.gunId && ctx.getObject(s.gunId)) return; // one gun per body across rejoins
  s.gunId = ctx.spawn({ audience: "local", scope: "session", feetPosition: { attach: "camera", ...REST, fov: 55 }, primitive: { kind: "scripted", script: "scripts/gen/rifle.js", sockets: { muzzle: [0, 0.07, -0.62] } } }); // −Z forward
}
export function onInput(ctx, input) {
  const s = feel(ctx.self.state), a = input.axes, now = ctx.now();
  const yaw = Math.atan2(a.aimYawSin ?? 0, a.aimYawCos ?? 1), pitch = (a.aimPitchN ?? 0) * 1.2;
  if (s.lastYaw != null) { const dyaw = Math.atan2(Math.sin(yaw - s.lastYaw), Math.cos(yaw - s.lastYaw)); s.pullX = Math.max(-0.05, Math.min(0.05, s.pullX + dyaw * 0.9)); s.pullY = Math.max(-0.04, Math.min(0.04, s.pullY - (pitch - s.lastPitch) * 0.7)); } // the look's delta pulls the gun the OTHER way
  s.lastYaw = yaw; s.lastPitch = pitch;
  if (!input.held.fire || s.dead || now < (s.nextShotAt ?? 0)) return; // held = an automatic; pressed = a semi-auto
  s.nextShotAt = now + RATE_MS;
  s.kickV += 9;
  const ray = getInputRay(ctx, input);
  if (!ray) return;
  const muzzle = ctx.getObjectSocket(s.gunId, "muzzle");
  if (muzzle && muzzle.position) ctx.emit("fx", { position: muzzle.position, attachTo: s.gunId, script: "scripts/effects/muzzle-flash.fx.js", params: { dir: ray.direction } }); // born at the socket AND riding the gun
  ctx.emit("cameraPunch", { direction: { x: 0, y: 0.35, z: -1 }, intensity: 0.4 }, { audience: { player: ctx.self.id } });
  ctx.emit("playSound", { clip: "cdn/sfx-rifle-shot.mp3", position: ray.origin, pitch: 0.95 + ctx.random() * 0.1 });
  const hit = raycast(ctx, ray.origin, ray.direction, { distance: RANGE, ignoreEntities: [ctx.self.id, s.gunId] });
  if (!hit) return;
  const t = hit.id ? ctx.getObject(hit.id) : null;
  if (t && t.tags.includes("enemy") && !t.state.dead) { combat.damage(ctx, t.id, DAMAGE, { source: ctx.self.id, kind: "bullet" }); ctx.emit("hitstop", { duration: 0.02 }, { audience: { player: ctx.self.id } }); ctx.emit("playSound", { clip: "cdn/sfx-hitmarker-click.mp3", position: ray.origin, volume: 0.5 }); }
  else { ctx.emit("decal", { position: hit.position, normal: hit.normal, texture: "cdn/decal-bullet-hole-stone.png", size: 0.12, lifetime: 25 }); ctx.emit("fx", { position: hit.position, script: "scripts/effects/impact-dust.fx.js" }); ctx.emit("playSound", { clip: "cdn/sfx-ricochet-stone.mp3", position: hit.position, volume: 0.5 }); }
}
export function update(ctx, dt) {
  const s = feel(ctx.self.state), gun = ctx.getObject(s.gunId);
  if (!gun) return;
  s.kickV += (-180 * s.kick - 14 * s.kickV) * dt; s.kick += s.kickV * dt; // k 180 / c 14: one overshoot, home in ~0.35 s (a pistol: 400 / 22)
  s.pullX *= Math.max(0, 1 - dt * 6); s.pullY *= Math.max(0, 1 - dt * 6); s.swayX += (s.pullX - s.swayX) * Math.min(1, dt * 14); s.swayY += (s.pullY - s.swayY) * Math.min(1, dt * 14);
  const v = s.velocity ?? { x: 0, z: 0 }, w = Math.min(1, Math.hypot(v.x, v.z) / 6), t = ctx.now() / 1000, bobX = Math.sin(t * 9) * 0.012 * w, bobY = Math.abs(Math.cos(t * 9)) * 0.01 * w;
  gun.feetPosition = { attach: "camera", x: REST.x + s.swayX + bobX, y: REST.y + s.swayY + bobY + s.kick * 0.12, depth: REST.depth - s.kick * 0.35, fov: 55 };
  gun.rotation = { yaw: -s.swayX * 140, pitch: s.kick * 45 + s.swayY * 140, roll: -s.swayX * 70 };
}
````

#### Block 2

````text
query()
````

#### Block 3

````text
hit.bone
````

#### Block 4

````text
solveShot(muzzle, mark, speed, g, lead)
````

#### Block 5

````text
s.vel.y -= s.g * dt
````

#### Block 6

````text
{ tags: ["projectile"], lifetime: 8, state: { vel, ownerId: ctx.self.id }, rotation: rotationFromDirection(vel), behavior: "scripts/arrow.js" }
````

#### Block 7

````text
s.vel
````

#### Block 8

````text
raycast(ctx, feet, dir, { distance: step * 1.5, ignoreEntities: [s.ownerId] })
````

#### Block 9

````text
source: s.ownerId
````

#### Block 10

````text
destroy()
````

#### Block 11

````text
vel·dt
````

#### Block 12

````text
rotation = rotationFromDirection(dir)
````

#### Block 13

````text
physics: { body: "kinematic", trigger: true }
````

#### Block 14

````text
getObject(hit.id)
````

#### Block 15

````text
emit("hit", { damage, by: ctx.self.id }, { to: hit.address, via: hit.doors[0].id })
````

#### Block 16

````text
ctx.on("hit", (ctx, payload, meta) => …)
````

#### Block 17

````text
cross()
````

#### Block 18

````text
feetPosition: { attach: "camera", x, y, depth, fov } // the viewmodel: camera-frame metres (x right, y up, depth forward); fov gives the subtree its own projection over the world (held guns ~50–55, the world 60–75); a per-tick write carries fov every time; audience "local" + scope "session": my screen only
getObjectSocket(id, "muzzle"): { position, direction, … } | null // the socket's WORLD point as this screen draws it (a viewmodel's corrected for its fov) and the barrel's unit direction; walks the parent chain; no declared socket → the forward end
fx / decal: … attachTo: <id> // the effect or the mark rides that object: a flash on the GUN (unattached, a viewmodel's flash draws where the barrel was a tick ago), a burn on the target it hit
solveShot(from, to, speed, g, lead?) → { vel, time } | null // builtin/ballistics; g a magnitude in m/s² (the place's gravity.y works as is); elevation(speed, g, distance, rise) beside it
hit.bone: { name, position, normal } // the bone the skin there rides, the hit in its frame; a mark spawned { parent: hit.id, attachment: { bone: hit.bone.name }, feetPosition: hit.bone.position } rides the limb
hit.world, hit.address, hit.doors: { id, link, world, exit }[] // only beyond a door (`through` doors deep, default 1), nearest first; address is "world:<id> +place#thing". hit.door: { link, verdict: "unheld" | "through-spent" | "no-exit", message }: the ray stopped AT a door
meta.origin = { world, actor, script, door, exit, address } // the far ear's, through a door: answer with emit(name, payload, { to: meta.origin.address })
````


### After clicking "read → vehicles Cars, trucks, karts, tanks."

- H3: Gotchas
- H3: Taste

Every vehicle (kart, car, truck, motorcycle, tank, ship, plane, helicopter) is one dynamic hull the player sits in: held forces push it; the engine adds gravity, collisions, slopes, landings, pushes. A character body with hand-written speed slides like a toy.

physics: { body: "dynamic", collider: "box", mass, centerOfMass: [x, y, z] } // local, pivot AT THE FEET ctx.place.gravity // −24 in the 3D starter; every g reads it; update(ctx, dt) at 30 Hz input.axes.moveX (+right), .moveZ, input.held.jump, input.pressed.interact // yaw and roll +left: steer = -moveX export function collider() { return { kind: "box", width, height, depth }; } // hull box; geometry(ctx) on same row render: false // parent invisible, children drawn hull.controller = player.id // THE MOUNT: hull simulates on driver's machine, input → hull onInput; null dismounts onControlBegin(ctx, player), onControlEnd(ctx, player) // player.camera = <cameras chase rig: yaw follows hull> / null ctx.emit("press", { by: ctx.self.id }, { to: hullId }); ears.press = (ctx, { by }) => … // hull hands seat: wheel (= controller) if free, else first state.riders slot whose player's `ctx.getObject(id)?.parent` isn't this hull (query rows carry no parent; a silent leave frees it); two takes of a free wheel: arrival keeps one, loser hears onControlEnd, presses again ctx.self.parent = hullId; ctx.self.feetPosition = seatFeet; ctx.self.parent = null // parent first, then seat-local feet; the rider's controller parks player.controlling.state // scripts/ui.js while driving interpolation: { teleportThreshold } // past 2 m/tick hull warps audio: { kind: "program", script, params, spatial: true } // on the hull = the engine voice, fed rpm, load, cut, on, speed, character ~10 Hz; on a child = squeal

Car: ray per wheel from arch top, physicsOnly: true; spring + damper along hit.normal, memoryless; drive and side force at each wheel's OWN contact from slip add(vel, cross(angularVelocity, sub(contact, com))); rear slip = hull's whole yaw damping; side force lifted 0.7 toward balance point along hull up, so the body barely leans; grip rises to peak, clamps at grip × load, side and drive/brake clamped separately (shared circle = drift dial); 4WD, drive split over driven contacts; steer smoothed from key, lock fades with speed (slip peak 1.5–3 m/s); drag on body. Bands at −24: mass 200–300, spring 4000–6000 / damper 600–900 per corner, rest 0.45–0.55 m, radius 0.33–0.35, grip 0.8–1.1, clearance 0.12–0.25; stability sqrt(k / cornerMass) / 30 ≤ 0.3, damper / 30 / cornerMass ≤ 0.5. Parked: engine sleeps a still body; no driver → cancel ~0.6 of each wheel's slip per tick, bounded 0.2–0.4 of grip: it rests on a grade. Wheels = hub children, yaw steers, pitch spins (built-in cylinder roll: 90). State = intent (gas, steer, driverId, HUD) written on change; spin and pose live in script memory. Rider script: interact: seated or control returned → self.parent = null FIRST, step out beside the seat; else near a drivable → emit press. A driver's E reaches hull onInput → controller = null; a passenger's, its own. ctx.self.controlling = hull → sit at seats[0], visible (the starter's gait seats a parented body); a passenger gets the chase camera; hands on the hull's grips: bones.LeftHand.reach = { object: <grip-l id> }, RightHand on grip-r, LeftFoot/RightFoot on its seat's <seat id>-foot-l/-foot-r, null on step-out; each grip ≤ 0.45 m from and below its shoulder; a passenger sits where ears.sit says. Seats: scripts/lib/data/car.yml seats: [{ id, x, y, z }, …], each the floor under the hips of the starter's seated 1.8 m body: hips 0.40 up, shoulders 0.84 (0.36 apart), head top 1.40, soles on that floor 0.4 ahead; the shell keeps that space open: walls beside it, under the shoulders; nothing across it below the roof, ≥ 1.5 m over each seat point (a closed box or loft body lids it).

hit.normal

add(vel, cross(angularVelocity, sub(contact, com)))

sqrt(k / cornerMass) / 30 ≤ 0.3

damper / 30 / cornerMass ≤ 0.5

roll: 90

self.parent = null

seats[0]

bones.LeftHand.reach = { object: <grip-l id> }

grip-r

LeftFoot

RightFoot

<seat id>-foot-l

-foot-r

ears.sit

scripts/lib/data/car.yml

seats: [{ id, x, y, z }, …]

Parts, all on first jayzee: body (one geometry(ctx) shell on the physics row with interior, →geometry; or a conjured model, →uploaded-models), a steering wheel child with two empty children grip-l, grip-r on its rim, per seat two empty children <seat id>-foot-l, -foot-r ankle-high over the drawn floor, headlights, brake lights on brake CHANGE, speedo, handbrake, squeal and dust past peak grip, hit sound from contact.impulse, a procedural engine voice. Engine voice = exhaust, not a tone: no oscillators or wave tables; pulses through pipes in an AudioWorklet. Stock road car by default; pops, blow-off, rasp, gear whine only for a tuned car. Worklet smooths per sample (rpm 35 ms, load 12, on 200). Firing: cycle rpm/120 Hz, cylinders in order + crank-degree jitter (wider at idle); strength 0.3+0.7·load, ±7% per cylinder, ±4% per shot, ÷√(rate/50); overrun half strength, cut 15%. Pulse: width = fixed crank angle 50–80° × (1.15−0.3·load), narrowing, brightening with revs; linear rise first 18%, fall (1−x)^1.6 to zero, then −0.3 sine dip over 0.6 width. Flow noise MULTIPLIES it: ×(1 + smoothed noise·(0.9+1.1·load) + slow per-cylinder noise·0.5). Path: own primary per cylinder (0.5–0.85 ms, all unequal) → 2 banks by firing order → each bank its OWN header delay (3–5.5 ms, unequal), lowpassed feedback × −0.4 → sum → muffler: fixed dry path ~0.3 + 3 band-passes 100–1200 Hz, Q 1–3, falling gains → tailpipe 8–14 ms, lowpassed feedback +0.35 → gentle one-pole sub body ~140 Hz → two one-pole lowpasses, cutoff base 500–900 + rpm + load terms, ≤ 2 kHz → tanh(x·drive·1.7)/tanh(drive), drive 1.3–1.8. Intake after drive: band-passed noise 280→1200 Hz × summed pulse envelope × load, soft. Out: 3 short allpasses (~2–13 ms) mixed 0.2; gain (0.5+0.9·rev)·(0.95+0.2·load); 28 Hz HP, soft clip, one-pole top cut ~5 kHz. Character = data (every number above), picked from the brief: an everyday inline-four hums, a V6 smooth and deeper. Before done, render offline once at idle, cruise, redline: all samples finite, RMS rising with revs.

grip-l

contact.impulse

Tank: two belts, vL,vR = throttle·vMax ∓ steer·vTurn, contacts drive toward their belt; turret = pivot child aimed from axes.aimYawSin/Cos, seat on it; chase cam: yaw holds where the hand left it, pivot and eye above the turret, so the sight line clears it. Each tread = own child, shifted along the belt by (belt travel mod link length) so links roll; road wheels spin at belt speed ÷ radius. Voice = diesel: broad jittered knock per firing, slow, over hull rumble; tracks = broadband rattle + squeal = band-passed noise, its band rising with speed. Ship: physics: { body: "dynamic", density } floats the hull by weight (a hollow mesh keeps its hollow), keel and rudder = side forces. Two-wheelers: hull on two sprung wheels in line, moved only by held forces and torques. Handlebars child, grip-l, grip-r at its ends; seat ≈ 0.3 m under the saddle top. Each spring pushes along hull up from its wheel's centre-line point, under the car's stability bounds at cornerMass = mass/2, and at that limit it sags ≈ 0.3 m, so rest length = loaded hub height + 0.3 m; drive, brake, side grip act at com: nothing tips it. Roll torque = I·(ω²·(target lean − lean) − 2ω·roll rate), I ≈ mass·((width² + height²)/12 + d²) of the hull box, d = com drop below box centre, ω ≈ 8/s so a new lean settles in ~0.3 s; target lean from steer and speed (road bike 20–30°, scooter 12–18°), 0 parked. Yaw torque drives turn rate to |g|·tan(lean)/v, bars' own rate at walking pace; pitch free for ramps and landings; lean ~1 rad off target for ~1 s, however it lies → upright on its wheels. Race: each racer rides its own dynamic hull on real ground into collider barriers; the game seats each arrival and respawn (controller = player.id in onArrive); rivals = same hull and script, gas and steer from a racing-line driver, not onInput; the line = driver and progress data; laps = checkpoints in order, in hull state; one referee (sim.js) runs grid → countdown → race → results; gas starts countdown; a racer with no gas since the grid sits the race out, past every hazard. Arcade kart = same hull, box collider, friction: 0 (else it pulls): held force pulls speed along nose toward throttle × top speed, held torque pulls turn rate toward steer × turn rate; drift and boosts move them. Airplane: held loads alone. Yoke child, grip-l, grip-r. Thrust along nose; side drag swings velocity onto heading; lift along hull up grows with airspeed, bank tilts it into a turn. Stick eases surface deflection toward the key; hull-axis torque and bone pose read it; authority grows from rolling to flying speed, damping < stick, release coasts, a bank holds. Weathervane yaw onto path; pilot beats every helper; below flying speed the nose drops. Airframe: geometry(ctx) + skeleton(), prop and surfaces = ctx.bone() children posed per tick. Voice: prop rpm from throttle + airspeed, wind with speed. Helicopter: thrust = collective × hull up × sqrt(max(0, dot(up, worldUp))); stick = torque about hull right/nose, yaw about up, release keeps tilt; leveler always on, < stick; air = row linearDamping ~0.03; spool scales loads and rotor spin. Rotor bones on the skeleton. Voice: noise chopped 3–26 Hz over turbine whine.

vL,vR = throttle·vMax ∓ steer·vTurn

axes.aimYawSin/Cos

physics: { body: "dynamic", density }

controller = player.id

friction: 0

ctx.bone()

Gotchas

Loads move no kinematic body: a car ignoring gas has a kinematic hull; one driving itself, a stale forces entry.

Aircraft update writes loads only; a per-tick rotation or velocity write undoes them.

Rider writes rider, hull writes hull; a cross write lands a round trip later.

A mid-ride script edit re-runs onSpawn and onControlBegin on the live hull: find wheels by id.

Taste

Done = first E press, hands on the grips, feet on the floor, no second pass, every part present; a second E rides beside. Tune by driving, one dial per lap from creator's words: "plows" = grip; "spins out at speed" = rear grip < front or lock not fading; "boaty" = spring + damper; "heavy to turn" = steering authority. Road first; each test drive ends with her off the seat, the vehicle parked near arrival facing the road.

<!-- generated-types --> <!-- /generated-types -->

#### Block 1

````text
physics: { body: "dynamic", collider: "box", mass, centerOfMass: [x, y, z] } // local, pivot AT THE FEET
ctx.place.gravity // −24 in the 3D starter; every g reads it; update(ctx, dt) at 30 Hz
input.axes.moveX (+right), .moveZ, input.held.jump, input.pressed.interact // yaw and roll +left: steer = -moveX
export function collider() { return { kind: "box", width, height, depth }; } // hull box; geometry(ctx) on same row
render: false // parent invisible, children drawn
hull.controller = player.id // THE MOUNT: hull simulates on driver's machine, input → hull onInput; null dismounts
onControlBegin(ctx, player), onControlEnd(ctx, player) // player.camera = <cameras chase rig: yaw follows hull> / null
ctx.emit("press", { by: ctx.self.id }, { to: hullId }); ears.press = (ctx, { by }) => … // hull hands seat: wheel (= controller) if free, else first state.riders slot whose player's `ctx.getObject(id)?.parent` isn't this hull (query rows carry no parent; a silent leave frees it); two takes of a free wheel: arrival keeps one, loser hears onControlEnd, presses again
ctx.self.parent = hullId; ctx.self.feetPosition = seatFeet; ctx.self.parent = null // parent first, then seat-local feet; the rider's controller parks
player.controlling.state // scripts/ui.js while driving
interpolation: { teleportThreshold } // past 2 m/tick hull warps
audio: { kind: "program", script, params, spatial: true } // on the hull = the engine voice, fed rpm, load, cut, on, speed, character ~10 Hz; on a child = squeal
````

#### Block 2

````text
hit.normal
````

#### Block 3

````text
add(vel, cross(angularVelocity, sub(contact, com)))
````

#### Block 4

````text
sqrt(k / cornerMass) / 30 ≤ 0.3
````

#### Block 5

````text
damper / 30 / cornerMass ≤ 0.5
````

#### Block 6

````text
roll: 90
````

#### Block 7

````text
self.parent = null
````

#### Block 8

````text
seats[0]
````

#### Block 9

````text
bones.LeftHand.reach = { object: <grip-l id> }
````

#### Block 10

````text
grip-r
````

#### Block 11

````text
LeftFoot
````

#### Block 12

````text
RightFoot
````

#### Block 13

````text
<seat id>-foot-l
````

#### Block 14

````text
-foot-r
````

#### Block 15

````text
ears.sit
````

#### Block 16

````text
scripts/lib/data/car.yml
````

#### Block 17

````text
seats: [{ id, x, y, z }, …]
````

#### Block 18

````text
grip-l
````

#### Block 19

````text
contact.impulse
````

#### Block 20

````text
vL,vR = throttle·vMax ∓ steer·vTurn
````

#### Block 21

````text
axes.aimYawSin/Cos
````

#### Block 22

````text
physics: { body: "dynamic", density }
````

#### Block 23

````text
controller = player.id
````

#### Block 24

````text
friction: 0
````

#### Block 25

````text
ctx.bone()
````


### After clicking "read → interactive-objects Pickups, levers, doors."

- H2: Interactive Objects

Interactive Objects

The bar: a thing you can use says so before you reach it and answers the moment you do: your prompt in the game UI at three meters, the lid up on its back hinge with a creak, the plate sinking under your boots while the gate across the courtyard grinds open and stays open while anyone stands there, the door swinging about its hinge EDGE (never its middle) with its collider. Five shapes: a proximity query in update() (coins, a door that wakes as you walk up) · a press ear (chests, levers, NPCs) · a trigger volume (plates, tripwires, traps) · a state write on another handle (plate → gate) · animated motion of a kinematic body (lifts, doors).

No interact action ships: declare one, world.inputs.actions.interact = { keys: ["e"] }, and a phone projects it as a chip that carries the action's own word, INTERACT; the player's onInput reads input.pressed.interact, queries interactable within 3 m, ctx.emit("press", { by: ctx.self.id }, { to: nearest.id }): to rings one ear (ctx.on("press", …) in the target's onSpawn); ctx.getObject(by) is the presser. A prompt is your game UI: the engine draws none; it names the act the thing takes (Open, Talk, Take), and the control beside it is the device's own, read live from ctx.world.inputs.actions.interact.label. Write it in the game's HTML (→game-ui) with your own near-and-facing rule: the player's update() picks the interactable within 3 m nearest the camera's forward and writes its act to player state, the UI binds it on the thing (data-world-anchor="<id>") and fades it. A thing with a face (a pad, a stall's board) switches and SELLS through its own ui plate: <button id="buy-sword"> rings ctx.on("ui:buy-sword", (ctx, { by }) => …), the buyer's state.gold pays, a bound {{ state.sold }} follows, never a proximity prompt for a shop.

world.inputs.actions.interact = { keys: ["e"] }

input.pressed.interact

interactable

ctx.emit("press", { by: ctx.self.id }, { to: nearest.id })

ctx.on("press", …)

ctx.getObject(by)

ctx.world.inputs.actions.interact.label

data-world-anchor="<id>"

<button id="buy-sword">

ctx.on("ui:buy-sword", (ctx, { by }) => …)

state.gold

{{ state.sold }}

Hinge = pivot: [0, 0.5, 0.5] the left edge (0..1 per local axis, v up; [0.5, 0.5, 0] + pitch a lid). feetPosition stays the leaf's bottom centre: mid-opening, not the hinge. Ignored on dynamic bodies: a swinging door is physics: "kinematic" (moves AND blocks; the collider rides the leaf); write rotation (a slab: feetPosition) yourself, eased in update() ~300 °/s. Author closed, facing the doorway, yaw: 0; the open state on the door's own row: one door for every player.

[0, 0.5, 0.5]

[0.5, 0.5, 0]

physics: "kinematic"

yaw: 0

Plate = TWO entities: an invisible trigger (physics: { body: "static", trigger: true }, ~1.5 m tall so a body reliably enters) over the visible plate; onTriggerEnter/Exit → an overlapping map, down while ANY key stands; the link = one write on the other handle, ctx.place.objects["gate-1"].state.open = true, read in the gate's own update(). playSound at ctx.self.worldFeetPosition on open AND close. Trap = the same trigger + ctx.emit("impulse", { target: other.id, impulse }) on the body that entered (a kick a player's own motor cannot ease away; hurt is your own event, heard by the body's ctx.on) + a re-arm timer on its own state.

physics: { body: "static", trigger: true }

onTriggerEnter/Exit

ctx.place.objects["gate-1"].state.open = true

ctx.self.worldFeetPosition

ctx.emit("impulse", { target: other.id, impulse })

hurt

A flat coin (cylinder) is invisible edge-on → rotation: { pitch: 90 }; ctx.after(0.12, "vanish") so the pop covers the disappearance. Lift = kinematic motion toward stops[]; the engine carries riders and releases them with momentum. Belt = physics: { body: "static", surfaceVelocity: [0, 0, 2] }, m/s in its own frame. Dialog: the press ear copies the tree's node into the PLAYER's state and frees the pointer (player.camera.pointerLock = false); update() ends it (player.camera = null) when they walk off. Held thing = jayzee({ parent: ctx.self.id, tags: ["carried"], attachment: { bone: "RightHand" } }) seated in its fist (→uploaded-models), read back as that row, never player state (a room change re-creates the body). Swap = ctx.trade(mine, { with: theirBodyId, for: theirItemId }) from each side; both marks standing → both hands change in ONE tick, else nothing, never a lock, a timer, an escrow object.

rotation: { pitch: 90 }

ctx.after(0.12, "vanish")

stops[]

physics: { body: "static", surfaceVelocity: [0, 0, 2] }

player.camera.pointerLock = false

player.camera = null

jayzee({ parent: ctx.self.id, tags: ["carried"], attachment: { bone: "RightHand" } })

ctx.trade(mine, { with: theirBodyId, for: theirItemId })

// scripts/door.js: one entity IS the door: a kinematic box, pivot [0, 0.5, 0.5], tags ["door", "interactable"], state { open: false, yaw: 0 } export const ears = { press: (ctx, { by }) => { const open = (ctx.self.state.open = !ctx.self.state.open); ctx.emit("playSound", { clip: open ? "cdn/sfx-door-creak-open.mp3" : "cdn/sfx-door-shut.mp3", position: ctx.self.worldFeetPosition, volume: 0.5 }); }, }; export function update(ctx, dt) { // yaw toward 100 open / 0 shut const target = ctx.self.state.open ? 100 : 0, yaw = ctx.self.state.yaw ?? 0; if (yaw !== target) ctx.self.rotation = { yaw: (ctx.self.state.yaw = yaw + Math.sign(target - yaw) * Math.min(Math.abs(target - yaw), 300 * dt)) }; }

ears.press = (ctx, { by }) => … // the ear, declared; by = the presser's id; the press is ctx.emit("press", { by }, { to }) from the player's onInput on an interact action you declare ctx.trade(mine, { with, for } | null): { offered, id, give, with, for } | { offered: false, refused: "unknown-target" | "not-held" | "not-mine" | "same-party" | "withdrawn", message } // both sides call it; null withdraws; the mark rides state.__trade { to, for, verdict }

#### Block 1

````text
world.inputs.actions.interact = { keys: ["e"] }
````

#### Block 2

````text
input.pressed.interact
````

#### Block 3

````text
interactable
````

#### Block 4

````text
ctx.emit("press", { by: ctx.self.id }, { to: nearest.id })
````

#### Block 5

````text
ctx.on("press", …)
````

#### Block 6

````text
ctx.getObject(by)
````

#### Block 7

````text
ctx.world.inputs.actions.interact.label
````

#### Block 8

````text
data-world-anchor="<id>"
````

#### Block 9

````text
<button id="buy-sword">
````

#### Block 10

````text
ctx.on("ui:buy-sword", (ctx, { by }) => …)
````

#### Block 11

````text
state.gold
````

#### Block 12

````text
{{ state.sold }}
````

#### Block 13

````text
[0, 0.5, 0.5]
````

#### Block 14

````text
[0.5, 0.5, 0]
````

#### Block 15

````text
physics: "kinematic"
````

#### Block 16

````text
yaw: 0
````

#### Block 17

````text
physics: { body: "static", trigger: true }
````

#### Block 18

````text
onTriggerEnter/Exit
````

#### Block 19

````text
ctx.place.objects["gate-1"].state.open = true
````

#### Block 20

````text
ctx.self.worldFeetPosition
````

#### Block 21

````text
ctx.emit("impulse", { target: other.id, impulse })
````

#### Block 22

````text
hurt
````

#### Block 23

````text
rotation: { pitch: 90 }
````

#### Block 24

````text
ctx.after(0.12, "vanish")
````

#### Block 25

````text
stops[]
````

#### Block 26

````text
physics: { body: "static", surfaceVelocity: [0, 0, 2] }
````

#### Block 27

````text
player.camera.pointerLock = false
````

#### Block 28

````text
player.camera = null
````

#### Block 29

````text
spawn({ parent: ctx.self.id, tags: ["carried"], attachment: { bone: "RightHand" } })
````

#### Block 30

````text
ctx.trade(mine, { with: theirBodyId, for: theirItemId })
````

#### Block 31

````text
// scripts/door.js: one entity IS the door: a kinematic box, pivot [0, 0.5, 0.5], tags ["door", "interactable"], state { open: false, yaw: 0 }
export const ears = {
  press: (ctx, { by }) => {
    const open = (ctx.self.state.open = !ctx.self.state.open);
    ctx.emit("playSound", { clip: open ? "cdn/sfx-door-creak-open.mp3" : "cdn/sfx-door-shut.mp3", position: ctx.self.worldFeetPosition, volume: 0.5 });
  },
};
export function update(ctx, dt) {
  // yaw toward 100 open / 0 shut
  const target = ctx.self.state.open ? 100 : 0,
    yaw = ctx.self.state.yaw ?? 0;
  if (yaw !== target) ctx.self.rotation = { yaw: (ctx.self.state.yaw = yaw + Math.sign(target - yaw) * Math.min(Math.abs(target - yaw), 300 * dt)) };
}
````

#### Block 32

````text
ears.press = (ctx, { by }) => … // the ear, declared; by = the presser's id; the press is ctx.emit("press", { by }, { to }) from the player's onInput on an interact action you declare
ctx.trade(mine, { with, for } | null): { offered, id, give, with, for } | { offered: false, refused: "unknown-target" | "not-held" | "not-mine" | "same-party" | "withdrawn", message } // both sides call it; null withdraws; the mark rides state.__trade { to, for, verdict }
````


### After clicking "read → animations Playing the 61 humanoid clips, plus custom motion."

The bar: a cheer the second the gate opens, at attention three seconds later. A channel plays a clip by address: ctx.self.anim.gesture = { clip: "cdn/clip-cheer-loop.glb", weight: 4, duration: 3, mask: { from: "Spine" } }. Bare names play only the body's five: Idle, Walk, Run, Sprint, Jump; every other clip is cdn/clip-<words>.glb; a -loop name cycles, any other plays once, then .finished is true and the gait resumes; null then the clip restarts it; clampWhenFinished: true keeps a death down. Library clips play at once; other words cook into motion first. A clip file: jayzee clip import <file> --name "<words>" [--loop] prints its address, fitted to each body's rest pose; Blender keys copied between rigs need matching rest poses. A clip loads on first play, never from a script. The gait's one writer, on every walking body: ctx.spawn({ physics: "character", model, behavior: ["scripts/guard.js", "scripts/humanoid-locomotion.js"] }), model per art style (players: /cdn/neutral-default-avatar.glb); guard.js steers velocity and yaw to its goal (findPath), the gait playing Walk or Run at that pace, Idle at rest. The pose has one writer too: the animator writes anim and bones; others (a climb, slide, foot lock) ask through its state (ctx.self.state.climb = { ledge }, then null), answered each tick by a channel or bone beside the gait. A hand on a thing is IK on any rig: ctx.self.bones.RightHand.reach = { object: "crate", offset: { x: 0.2, y: 0.4, z: 0 } } holds it over any clip; rotation turns the hand in the crate's frame, { to, pole } bends the elbow toward pole, both inside human arm ranges, so grip where a person could, .aim turns a bone's front to a target, null lets go. A foot lock pins a planted foot where its currentWorldPosition reads, in view or not. Seat a held thing in a fist (→uploaded-models) and the hand closes; a finger named in bones keeps its pose, { pitch: 0 } too; the other hand on it, a load or ledge is a reach, never a solved joint angle. A gesture's weight 4 beats the idle's 1 per bone, its spine mask leaving legs and hips to the gait, so an aim leans on bones.Spine.pitch; a pose replacing the gait (sit, sleep, swim) stands it down first: a body parented to a seat sits by itself.

ctx.self.anim.gesture = { clip: "cdn/clip-cheer-loop.glb", weight: 4, duration: 3, mask: { from: "Spine" } }

cdn/clip-<words>.glb

-loop

.finished

clampWhenFinished: true

jayzee clip import <file> --name "<words>" [--loop]

ctx.spawn({ physics: "character", model, behavior: ["scripts/guard.js", "scripts/humanoid-locomotion.js"] })

/cdn/neutral-default-avatar.glb

ctx.self.state.climb = { ledge }

ctx.self.bones.RightHand.reach = { object: "crate", offset: { x: 0.2, y: 0.4, z: 0 } }

{ to, pole }

.aim

{ pitch: 0 }

bones.Spine.pitch

<samples> Cycles: cdn/clip-{idle,walk,run,sprint,fall,block,sit,sit-floor,sleep,swim-idle,swim,crouch-idle,crouch-walk,climb,drive,wave,dance,clap,laugh,cry,talk,cheer,sitting-cheering,climbing-up-wall,climbing-down-wall,magic-spell-casting,spell-casting,sitting-laughing,sitting-clapping,sitting-talking,chicken-dance,locking-hip-hop-dance,slide-hip-hop-dance,step-hip-hop-dance,wave-hip-hop-dance,waving-single-hand,waving-both-hands}-loop.glb. Once: cdn/clip-{jump,land,die,hit-react,attack,kick,throw,roll,cast,point,pickup,victory,bow,salute,shrug,thumbs-up,nod-yes,shake-no,angry,backflip,sitting-thumbs-up,entering-car,exiting-car,sitting-pointing}.glb. A woman's body: cdn/clip-{idle,walk,sit,talk,sitting-clapping,sitting-talking}-female-loop.glb. </samples>

#### Block 1

````text
ctx.self.anim.gesture = { clip: "cdn/clip-cheer-loop.glb", weight: 4, duration: 3, mask: { from: "Spine" } }
````

#### Block 2

````text
cdn/clip-<words>.glb
````

#### Block 3

````text
-loop
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
spawn clip import <file> --name "<words>" [--loop]
````

#### Block 7

````text
ctx.spawn({ physics: "character", model, behavior: ["scripts/guard.js", "scripts/humanoid-locomotion.js"] })
````

#### Block 8

````text
/cdn/neutral-default-avatar.glb
````

#### Block 9

````text
ctx.self.state.climb = { ledge }
````

#### Block 10

````text
ctx.self.bones.RightHand.reach = { object: "crate", offset: { x: 0.2, y: 0.4, z: 0 } }
````

#### Block 11

````text
{ to, pole }
````

#### Block 12

````text
.aim
````

#### Block 13

````text
{ pitch: 0 }
````

#### Block 14

````text
bones.Spine.pitch
````


### After clicking "read → cameras First person, third person, top-down, cinematic rigs."

Def: camera: templates/camera.js#camera in world.config.yaml. Rig scripts/camera.js: onInput(ctx, input) at no fixed rate (held-key motion integrates in update on dt; ctx.now() moves only per tick); update(ctx, dt) once a tick (120/s while it poses its target or what that rides, or a live look rig ignores dt or poses interpolation = null viewmodels). ctx.self IS the rig: .state.* · .target (the hull while driven: .feetPosition, .rotation in degrees) · .view.yaw/.pitch (radians, +pitch looks UP, undefined before frame 1) · .feetPosition · .rotation = { yaw, pitch, roll } in degrees | a quaternion | { lookAt: p, include: ["yaw", "pitch"] } · .hideLocalPlayer/.pointerLock/.fov/.clip/.orientation (the rig's layer, each until rewritten or the rig dies; = undefined clears). ctx.world.camera.aspect: this screen's width ÷ height, live (<1 on an upright phone; undefined before frame 1); .insetRight the width share Jayzee's rail covers (keep the player left of it): .fov spans the short edge and state.orthoSize the half-height in m (half-width = orthoSize × aspect; widen the rig on a tall screen). ctx.place: the target's. k = 2×ctx.player.bounds.obb.halfExtents.y/1.8 scales body lengths. Yaw 0 faces −Z; an eye behind the look = pivot + (sin yaw·cos pitch, −sin pitch, cos yaw·cos pitch)·dist.

camera: templates/camera.js#camera

world.config.yaml

scripts/camera.js

onInput(ctx, input)

interpolation = null

.target

.view.yaw/.pitch

.rotation = { yaw, pitch, roll }

{ lookAt: p, include: ["yaw", "pitch"] }

.hideLocalPlayer/.pointerLock/.fov/.clip/.orientation

= undefined

ctx.world.camera.aspect

.insetRight

.fov

state.orthoSize

2×ctx.player.bounds.obb.halfExtents.y/1.8

pivot + (sin yaw·cos pitch, −sin pitch, cos yaw·cos pitch)·dist

ON AN AXIS THE LOOK HOLDS, A WRITE (state.yaw / .pitch, radians) turns the look by its offset from view and the mouse keeps turning it (recoil = view.pitch + kick), but a rig reading lookX / lookY sees its write exactly; unwritten, the axis is the mouse's within minPitch / maxPitch. A cutscene holds axes: orientation = { source: "look", authoredAxes: ["yaw", "pitch"] }, then { source: "look" }.

state.yaw

.pitch

view.pitch + kick

orientation = { source: "look", authoredAxes: ["yaw", "pitch"] }

{ source: "look" }

{ source: "look" } + pointerLock: true = the engine's live orbit around target: pivot = feet + state.heightOffset (1.8), slid state.lateralOffset (0) m right of the look with the aim (over the shoulder); arm = min(state.desiredDist (6), state.collisionDist); aim = feet + state.lookOffsetY (1.5). Leave collisionDist unwritten: the engine casts the arm from the pivot (walls, crates, ground stop it; characters never). Write it only to own the cast (raycast from "builtin/physics", minSize: 1: posts, coins, branches never stop it; a rig's cast skips the local player and all it wears unless ignoreSelf: false). What the arm passes through fades on this screen alone: ctx.player.faded = { [id]: 0.35 } (opacity, eased; { opacity, fade: 0 } snaps; {} shows all; collider and shadow stay), ids from a multiple: true raycast aim to eye, on change. Arm ≤ half the narrowest space walked (4 m tunnel: desiredDist ≤ 2 over the shoulder, or first person); longer casts short at every wall. A look rig still writes feetPosition + rotation each tick: tests and readers see that ROW (the eye before the cast); aim from ctx.world.camera, the drawn frame ~2 ticks behind.

pointerLock: true

state.heightOffset

state.lateralOffset

state.desiredDist

state.collisionDist

state.lookOffsetY

collisionDist

minSize: 1

ctx.player.faded = { [id]: 0.35 }

{ opacity, fade: 0 }

multiple: true

desiredDist

{ source: "script" } + pointerLock: false: the rig authors the whole pose each tick; the mouse arrives only as input.axes.lookX/lookY, 0.0006 rad a pixel (×1.75 while a drag turns the look: the right button here, any under "drag", the named one under { drag: "left" }) times the player's look sensitivity (lookY follows invert-Y); the def's sensitivity is the look rig's alone (times the player's setting, one channel for mouse and touch: 1.5–2 deliberate, <1 broken): scale by the rig's sens (yaw -= lookX * sens; 3 matches the def's default) and clamp pitch yourself.

{ source: "script" }

pointerLock: false

input.axes.lookX/lookY

{ drag: "left" }

sens

yaw -= lookX * sens

Layers: player.camera.pointerLock = false changes one field, keeps the rig; player.camera = {…} is the player's whole camera (name its behavior or no rig follows); null = hard cut (the incoming rig owns any glide); ctx.world.camera swaps everyone durably. Toggled modes (chase/hood/cockpit) = ONE script, state.mode, per-mode numbers sprung toward; never a script swap, never state = {…} (wipes yaw/pitch).

player.camera = {…}

state.mode

Chase (car, boat, mount): a LOOK rig on the hull; ctx.self.frame = the eased heading each tick, state.yaw unwritten, so the mouse turns the view every frame (view.yaw: its swing); the recenter eases the frame. Hulls only (a walking body's eye is the orbit above). No starter carries it; write it whole:

view.yaw

// scripts/chase-camera.js; hull onControlBegin: player.camera = { kind: "custom", behavior: ["scripts/chase-camera.js"], orientation: { source: "look" }, pointerLock: true }; onControlEnd: player.camera = null var DIST = 7, HEIGHT = 3.7, AIM = 1.4, HEADING_RATE = 5, RECENTER = 1.5, REST = 0.35; var wrap = (a) => Math.atan2(Math.sin(a), Math.cos(a)); export function update(ctx, dt) { var t = ctx.self.target, s = ctx.self.state, v = ctx.self.view; if (!t) return; var goal = t.rotation.yaw * Math.PI / 180, h = s.heading ?? goal; s.heading = wrap(h + wrap(goal - h) * (1 - Math.exp(-HEADING_RATE * dt))); var hand = v ? v.yaw : 0; if (hand !== s.hand) { s.hand = hand; s.rest = 0; } else s.rest = (s.rest ?? REST) + dt; if (s.rest > REST) s.bias = wrap((s.bias ?? 0) + hand) * Math.exp(-RECENTER * dt) - hand; var base = s.heading + (s.bias ?? 0); ctx.self.frame = { yaw: base * 180 / Math.PI }; s.heightOffset = HEIGHT; s.desiredDist = DIST; s.lookOffsetY = AIM; var yaw = base + hand, pitch = v ? v.pitch : 0, cp = Math.cos(pitch), f = t.feetPosition; ctx.self.feetPosition = { x: f.x + Math.sin(yaw) * cp * DIST, y: f.y + HEIGHT - Math.sin(pitch) * DIST, z: f.z + Math.cos(yaw) * cp * DIST }; ctx.self.rotation = { lookAt: { x: f.x, y: f.y + AIM, z: f.z }, include: ["yaw", "pitch"] }; }

DIST 5–6 tight, kinetic; 8 planted; 11–14 wide, cinematic. HEADING_RATE 3–6 close, 10–12 far (>8 close whips, <2 disconnects). REST 0.3–0.5 s, RECENTER 1–2 (0 never recenters). AIM at the roof, HEIGHT ≈ AIM + DIST/3 (18° down); never below a ship's rail. Never { source: "script" } + pointerLock: false on a driven hull: boarding frees the cursor and kills the look.

Seat in a moving car or cockpit: ctx.self.parent = ctx.self.frame = carId, feetPosition = the eye in its metres, no rotation: the mouse looks round.

ctx.self.parent = ctx.self.frame = carId

First person = the starter: eye at feet + 1.6k, rotation from view in degrees, hideLocalPlayer = true per tick (false shows that eye the body, not its head), the wheel unbound, the body facing where it walks (turnTo: movement in player.yml, under every rig: keys down it turns toward them; keys up it holds while the look swings, turning in place past turnInPlace). walk: a standing body never turns. camera: always faces the look. A body's own state.turnTo outranks the yml (per place). Held item, ADS, bob, sway, recoil →projectiles. Query rows and target.state land at tick rate: smooth them before the eye, x += (goal − x)·(1 − exp(−rate·dt)), 5–12/s. Not target.feetPosition: its row steps per tick, but the engine lays that eye on the drawn body each frame.

1.6k

hideLocalPlayer = true

turnTo: movement

player.yml

turnInPlace

state.turnTo

target.state

x += (goal − x)·(1 − exp(−rate·dt))

target.feetPosition

Iso: { source: "script" }, pointerLock: false, projection: "orthographic" (the wheel moves state.orthoSize), yaw 0.785, pitch 0.615 (positive), distance 2 × orthoSize (nearer clips the foreground; fog and shadows count from the eye), pivot +1.5, rotation = { lookAt: pivot, include: ["yaw", "pitch"] }. W walks up-screen (aim basis: presented yaw), Q/E a rotateCamera axis into state.yaw. Top-down 3D: rotation = { yaw: 0, pitch: -90 } (no lookAt: a hair off vertical swings yaw), height 15, follow 8/s. Pixel-art 3D: orthographic, rotation = { yaw: 0, pitch: -45 }, state.orthoSqueeze = Math.SQRT1_2, perfectPixelArt. One eye over bodies alike: mark the player's own with a YOU plate anchored on ctx.self.id (→game-ui). 2D (mode: 2d-top | 2d-side, orthographic): the same rig, pixelSnap: true, camera z only clips; 2d-side's starter camera.js IS the rig (dead zone, look-ahead, per-axis follow, state.worldBounds = { left, right, bottom, top } from the "level"-tagged entity's onSpawn). Sprites, parallax, ?facing= →2d-mode.

projection: "orthographic"

rotation = { lookAt: pivot, include: ["yaw", "pitch"] }

rotateCamera

rotation = { yaw: 0, pitch: -90 }

rotation = { yaw: 0, pitch: -45 }

state.orthoSqueeze = Math.SQRT1_2

mode: 2d-top | 2d-side

pixelSnap: true

state.worldBounds = { left, right, bottom, top }

"level"

zoomIn: { mouse: wheelY } under inputs.axes (feeds pinch too; + is IN (wheel up, pinch out, ≈0.5 a notch), so distance -= zoomIn × sens). Engine axes: lookX/lookY/aimYawSin/aimYawCos/aimPitchN. "a/d" reads −1/+1.

zoomIn: { mouse: wheelY }

inputs.axes

distance -= zoomIn × sens

lookX/lookY/aimYawSin/aimYawCos/aimPitchN

"a/d"

Taste: a great camera is never noticed: low and close behind a runner on foot so the ground streaks, high over a kart or car so the road reads, back and high behind a horse so the valley reads, in at once at a doorway and out slowly once the room opens, never under the grass for one frame; beside a platformer it leads the run, waits while the player hops in place, lands softer than it turns and never shows the void past the edge.

<samples> A fresh 3D world's camera pieces (Edit against these bytes): templates/camera.js: export const camera = { behavior: ["scripts/camera.js"], kind: "custom", orientation: { source: "look" }, sensitivity: 3, state: { pitch: 0, yaw: 0 } }; (pretty-printed under a marker line): replace it whole for third person. scripts/camera.js: the first-person eye above, reading ./lib/data/camera.yml (eyeHeight 1.6); replace it whole. scripts/lib/data/player.yml: acceleration 80, deceleration 120, jumpSpeed 10, turnInPlace 90, turnSmoothing 0.06, turnSpeed 900, turnTo movement, walkSpeed 6; humanoid-locomotion.js reads turnTo and turnInPlace. world.config.yaml inputs (two-space YAML): actions: jump: { keys: [space] }; axes: moveX: { keys: a/d }, moveZ: { keys: s/w }. The 2D starters' defs: 2d-side {"behavior":["scripts/camera.js"],"kind":"custom","orientation":{"source":"script"},"pixelSnap":true,"pointerLock":false,"state":{"orthoSize":5.625}}; 2d-top the same with orthoSize 12, its dials in scripts/lib/data/camera.yml (orthoSize 12, minOrthoSize 5, maxOrthoSize 30, follow 8) and zoomIn: { mouse: wheelY } declared. </samples>

#### Block 1

````text
camera: templates/camera.js#camera
````

#### Block 2

````text
world.config.yaml
````

#### Block 3

````text
scripts/camera.js
````

#### Block 4

````text
onInput(ctx, input)
````

#### Block 5

````text
interpolation = null
````

#### Block 6

````text
.target
````

#### Block 7

````text
.view.yaw/.pitch
````

#### Block 8

````text
.rotation = { yaw, pitch, roll }
````

#### Block 9

````text
{ lookAt: p, include: ["yaw", "pitch"] }
````

#### Block 10

````text
.hideLocalPlayer/.pointerLock/.fov/.clip/.orientation
````

#### Block 11

````text
= undefined
````

#### Block 12

````text
ctx.world.camera.aspect
````

#### Block 13

````text
.insetRight
````

#### Block 14

````text
.fov
````

#### Block 15

````text
state.orthoSize
````

#### Block 16

````text
2×ctx.player.bounds.obb.halfExtents.y/1.8
````

#### Block 17

````text
pivot + (sin yaw·cos pitch, −sin pitch, cos yaw·cos pitch)·dist
````

#### Block 18

````text
state.yaw
````

#### Block 19

````text
.pitch
````

#### Block 20

````text
view.pitch + kick
````

#### Block 21

````text
orientation = { source: "look", authoredAxes: ["yaw", "pitch"] }
````

#### Block 22

````text
{ source: "look" }
````

#### Block 23

````text
pointerLock: true
````

#### Block 24

````text
state.heightOffset
````

#### Block 25

````text
state.lateralOffset
````

#### Block 26

````text
state.desiredDist
````

#### Block 27

````text
state.collisionDist
````

#### Block 28

````text
state.lookOffsetY
````

#### Block 29

````text
collisionDist
````

#### Block 30

````text
minSize: 1
````

#### Block 31

````text
ctx.player.faded = { [id]: 0.35 }
````

#### Block 32

````text
{ opacity, fade: 0 }
````

#### Block 33

````text
multiple: true
````

#### Block 34

````text
desiredDist
````

#### Block 35

````text
{ source: "script" }
````

#### Block 36

````text
pointerLock: false
````

#### Block 37

````text
input.axes.lookX/lookY
````

#### Block 38

````text
{ drag: "left" }
````

#### Block 39

````text
sens
````

#### Block 40

````text
yaw -= lookX * sens
````

#### Block 41

````text
player.camera = {…}
````

#### Block 42

````text
state.mode
````

#### Block 43

````text
view.yaw
````

#### Block 44

````text
// scripts/chase-camera.js; hull onControlBegin: player.camera = { kind: "custom", behavior: ["scripts/chase-camera.js"], orientation: { source: "look" }, pointerLock: true }; onControlEnd: player.camera = null
var DIST = 7, HEIGHT = 3.7, AIM = 1.4, HEADING_RATE = 5, RECENTER = 1.5, REST = 0.35;
var wrap = (a) => Math.atan2(Math.sin(a), Math.cos(a));
export function update(ctx, dt) {
  var t = ctx.self.target, s = ctx.self.state, v = ctx.self.view; if (!t) return;
  var goal = t.rotation.yaw * Math.PI / 180, h = s.heading ?? goal;
  s.heading = wrap(h + wrap(goal - h) * (1 - Math.exp(-HEADING_RATE * dt)));
  var hand = v ? v.yaw : 0;
  if (hand !== s.hand) { s.hand = hand; s.rest = 0; } else s.rest = (s.rest ?? REST) + dt;
  if (s.rest > REST) s.bias = wrap((s.bias ?? 0) + hand) * Math.exp(-RECENTER * dt) - hand;
  var base = s.heading + (s.bias ?? 0);
  ctx.self.frame = { yaw: base * 180 / Math.PI };
  s.heightOffset = HEIGHT; s.desiredDist = DIST; s.lookOffsetY = AIM;
  var yaw = base + hand, pitch = v ? v.pitch : 0, cp = Math.cos(pitch), f = t.feetPosition;
  ctx.self.feetPosition = { x: f.x + Math.sin(yaw) * cp * DIST, y: f.y + HEIGHT - Math.sin(pitch) * DIST, z: f.z + Math.cos(yaw) * cp * DIST };
  ctx.self.rotation = { lookAt: { x: f.x, y: f.y + AIM, z: f.z }, include: ["yaw", "pitch"] };
}
````

#### Block 45

````text
ctx.self.parent = ctx.self.frame = carId
````

#### Block 46

````text
1.6k
````

#### Block 47

````text
hideLocalPlayer = true
````

#### Block 48

````text
turnTo: movement
````

#### Block 49

````text
player.yml
````

#### Block 50

````text
turnInPlace
````

#### Block 51

````text
state.turnTo
````

#### Block 52

````text
target.state
````

#### Block 53

````text
x += (goal − x)·(1 − exp(−rate·dt))
````

#### Block 54

````text
target.feetPosition
````

#### Block 55

````text
projection: "orthographic"
````

#### Block 56

````text
rotation = { lookAt: pivot, include: ["yaw", "pitch"] }
````

#### Block 57

````text
rotateCamera
````

#### Block 58

````text
rotation = { yaw: 0, pitch: -90 }
````

#### Block 59

````text
rotation = { yaw: 0, pitch: -45 }
````

#### Block 60

````text
state.orthoSqueeze = Math.SQRT1_2
````

#### Block 61

````text
mode: 2d-top | 2d-side
````

#### Block 62

````text
pixelSnap: true
````

#### Block 63

````text
state.worldBounds = { left, right, bottom, top }
````

#### Block 64

````text
"level"
````

#### Block 65

````text
zoomIn: { mouse: wheelY }
````

#### Block 66

````text
inputs.axes
````

#### Block 67

````text
distance -= zoomIn × sens
````

#### Block 68

````text
lookX/lookY/aimYawSin/aimYawCos/aimPitchN
````

#### Block 69

````text
"a/d"
````


### After clicking "read → pointer-raycasting Click to place, cursor aim, touch tap and hold."

- H2: Pointer Raycasting

Pointer Raycasting

The bar: the click lands exactly where the cursor is (on the ground under it, on the wall it points at, on the paper enemy with no collider), and the same tap does the same thing on a phone. A placed tower does not pop in: the ghost rode the cursor, the ground took a dust ring and a thud, the tower rose out of it. Click-to-move walks a path around the cliff, never straight into it. One onInput serves mouse and finger: every gesture delivers the pointer ray at its point.

// world.config.yaml inputs.actions: place: { mouse: "left", touch: { gesture: "tap" } }, cancel: { mouse: "right", touch: { gesture: "hold" } } import { raycast, getInputRay } from "builtin/physics"; // state: { ghost: null } export function onInput(ctx, input) { const ray = getInputRay(ctx, input); // the cursor's ray: correct origin even under an orthographic camera if (!ray) return; const s = ctx.self.state; const hit = raycast(ctx, ray.origin, ray.direction, { distance: 120, bodies: "static", ignoreEntities: s.ghost ? [s.ghost] : [] }); // the ghost never blocks its own ray; bodies: "static" is the ghost's exception: it lands on the ground through the things that walk. A click that picks a thing casts bare (below) const flat = hit && hit.normal.y > 0.5; // ground, not a wall or a ceiling if (!s.ghost) s.ghost = ctx.spawn({ tags: ["ghost"], audience: "local", primitive: { kind: "scripted", script: "scripts/gen/watchtower.js" }, material: { opacity: 0.35, transparent: true, depthWrite: false }, feetPosition: { x: 0, y: -100, z: 0 } }); const ghost = ctx.place.objects[s.ghost]; if (flat) { ghost.feetPosition = hit.position; ghost.material.color = "oklch(0.8 0.15 150)"; } else ghost.material.color = "oklch(0.6 0.2 25)"; if (input.pressed.place && flat) { ctx.spawn({ tags: ["tower", "structure"], feetPosition: hit.position, primitive: { kind: "scripted", script: "scripts/gen/watchtower.js" }, physics: { body: "static" }, state: { health: 100, buildProgress: 0 } }); ctx.emit("fx", { position: hit.position, script: "scripts/effects/dust-ring.fx.js" }); // author the ring (fx) ctx.emit("playSound", { clip: "cdn/sfx-stone-thud.mp3", position: hit.position, pitch: 1 + (ctx.random() - 0.5) * 0.15 }); ctx.emit("screenShake", { intensity: 0.15, duration: 0.2 }); } if (input.pressed.cancel && s.ghost) { ctx.destroy(s.ghost); s.ghost = null; } }

Click-to-interact and click-to-select are the same ray cast bare: raycast(ctx, ray.origin, ray.direction, { distance: 120 }) sees every solid body and every visible sprite (bodies unnamed = "all": a soldier's capsule, a crate, a paper enemy, the ground only where nothing stands) and hit.id is the thing under the cursor, then ctx.emit("press", { by: ctx.self.id }, { to: hit.id }). A spring arm casts bodies: "static" too. Click-to-move writes state.goal = hit.position and update walks a findPath route with a held velocity: walking straight at the hit is the cliff bug. Shoot-from-player-toward-cursor is two casts: the cursor ray finds the target, then a cast from the player's shoulder (feetPosition is the bottom: add ~1.2 m) toward it; a camera-position ray along the cursor direction breaks under an orthographic camera, whose cursor moves the origin, not the direction.

raycast(ctx, ray.origin, ray.direction, { distance: 120 })

hit.id

ctx.emit("press", { by: ctx.self.id }, { to: hit.id })

bodies: "static"

state.goal = hit.position

getInputRay(ctx, input): { origin, direction, source } | null // null = no camera source "pointer" = the ray this client's input sampled (onInput runs here) // unlocked: the mouse, or a phone gesture's point; locked (pointerLock: true, first person, over-the-shoulder aim): the screen-center crosshair on every device, and a gesture's finger rides `input.pointer` source "camera" = no pointer ray rode the input (run_script, a hook other than onInput) // the camera's forward ray, never a guess at the hand raycast(ctx, o, d, { multiple: true }): hit[] // every hit sorted by distance (a piercing shot); ignoreSelf: true is the default raycast(ctx, o, d, { verdict: true }): { hit, hits, verdict: { queryable, terrain, … } } // queryable false = this machine could not look (run_script has no physics), never "clear"; terrain null = unknown, never empty hit.id: the ground's id on the ground (terrain/…), not one of your objects sprites: hit by default (billboards face the origin); text never // physicsOnly: true = colliders only rays see every solid body: static, dynamic and kinematic (a physics: "character" soldier, a player: capsules): on the machine that simulates the caster // trigger: true is passed, includeSensors: true hits it raycastRender: this client's picture only // a gameplay verdict is raycast(ctx, …) touch.gesture: "tap" | "double-tap" | "hold" | "press" // on an action: the world is the button. tap/double-tap = one pulse; with double-tap bound a single tap lands after the 300 ms window. hold = active from 350 ms press-and-still until lift, the finger keeps aiming. A drag past 8 px is camera, never a gesture (drag-look and pinch-zoom coexist) press = a one-finger touch held until lift: a brush or a dig starts under the finger and follows it; a still press also taps. Without tags every one-finger touch presses, so one finger never looks; with tags only a finger on a thing wearing them does. A second finger ends the press: two fingers are the camera. Never beside hold touch: { gesture, button: true } // a gesture action gets no chip button; button: true keeps one. Desktop bindings on the same action stay: declare both, ship one scheme mouse: "right" alone is a chip on a phone, with no aim point // give the action a gesture too. Never inputs.touch.enabled: false to hide chips: it kills gestures, the stick and drag-look overlapPoint / overlapSegment: { objects, approximate, terrain } // probe-grade: exact collider shapes, approximate = bounds where the shape is not loaded here, terrain null = unknown. In 3D a static model's mesh collider is a surface: a point inside it answers nothing. Right at a change (a placement check, a blocked door); wrong per tick

#### Block 1

````text
// world.config.yaml inputs.actions: place: { mouse: "left", touch: { gesture: "tap" } }, cancel: { mouse: "right", touch: { gesture: "hold" } }
import { raycast, getInputRay } from "builtin/physics";

// state: { ghost: null }
export function onInput(ctx, input) {
  const ray = getInputRay(ctx, input); // the cursor's ray: correct origin even under an orthographic camera
  if (!ray) return;
  const s = ctx.self.state;
  const hit = raycast(ctx, ray.origin, ray.direction, { distance: 120, bodies: "static", ignoreEntities: s.ghost ? [s.ghost] : [] }); // the ghost never blocks its own ray; bodies: "static" is the ghost's exception: it lands on the ground through the things that walk. A click that picks a thing casts bare (below)
  const flat = hit && hit.normal.y > 0.5; // ground, not a wall or a ceiling
  if (!s.ghost) s.ghost = ctx.spawn({ tags: ["ghost"], audience: "local", primitive: { kind: "scripted", script: "scripts/gen/watchtower.js" }, material: { opacity: 0.35, transparent: true, depthWrite: false }, feetPosition: { x: 0, y: -100, z: 0 } });
  const ghost = ctx.place.objects[s.ghost];
  if (flat) {
    ghost.feetPosition = hit.position;
    ghost.material.color = "oklch(0.8 0.15 150)";
  } else ghost.material.color = "oklch(0.6 0.2 25)";
  if (input.pressed.place && flat) {
    ctx.spawn({ tags: ["tower", "structure"], feetPosition: hit.position, primitive: { kind: "scripted", script: "scripts/gen/watchtower.js" }, physics: { body: "static" }, state: { health: 100, buildProgress: 0 } });
    ctx.emit("fx", { position: hit.position, script: "scripts/effects/dust-ring.fx.js" }); // author the ring (fx)
    ctx.emit("playSound", { clip: "cdn/sfx-stone-thud.mp3", position: hit.position, pitch: 1 + (ctx.random() - 0.5) * 0.15 });
    ctx.emit("screenShake", { intensity: 0.15, duration: 0.2 });
  }
  if (input.pressed.cancel && s.ghost) {
    ctx.destroy(s.ghost);
    s.ghost = null;
  }
}
````

#### Block 2

````text
raycast(ctx, ray.origin, ray.direction, { distance: 120 })
````

#### Block 3

````text
hit.id
````

#### Block 4

````text
ctx.emit("press", { by: ctx.self.id }, { to: hit.id })
````

#### Block 5

````text
bodies: "static"
````

#### Block 6

````text
state.goal = hit.position
````

#### Block 7

````text
getInputRay(ctx, input): { origin, direction, source } | null // null = no camera
source "pointer" = the ray this client's input sampled (onInput runs here) // unlocked: the mouse, or a phone gesture's point; locked (pointerLock: true, first person, over-the-shoulder aim): the screen-center crosshair on every device, and a gesture's finger rides `input.pointer`
source "camera" = no pointer ray rode the input (run_script, a hook other than onInput) // the camera's forward ray, never a guess at the hand
raycast(ctx, o, d, { multiple: true }): hit[] // every hit sorted by distance (a piercing shot); ignoreSelf: true is the default
raycast(ctx, o, d, { verdict: true }): { hit, hits, verdict: { queryable, terrain, … } } // queryable false = this machine could not look (run_script has no physics), never "clear"; terrain null = unknown, never empty
hit.id: the ground's id on the ground (terrain/…), not one of your objects
sprites: hit by default (billboards face the origin); text never // physicsOnly: true = colliders only
rays see every solid body: static, dynamic and kinematic (a physics: "character" soldier, a player: capsules): on the machine that simulates the caster // trigger: true is passed, includeSensors: true hits it
raycastRender: this client's picture only // a gameplay verdict is raycast(ctx, …)
touch.gesture: "tap" | "double-tap" | "hold" | "press" // on an action: the world is the button. tap/double-tap = one pulse; with double-tap bound a single tap lands after the 300 ms window. hold = active from 350 ms press-and-still until lift, the finger keeps aiming. A drag past 8 px is camera, never a gesture (drag-look and pinch-zoom coexist)
press = a one-finger touch held until lift: a brush or a dig starts under the finger and follows it; a still press also taps. Without tags every one-finger touch presses, so one finger never looks; with tags only a finger on a thing wearing them does. A second finger ends the press: two fingers are the camera. Never beside hold
touch: { gesture, button: true } // a gesture action gets no chip button; button: true keeps one. Desktop bindings on the same action stay: declare both, ship one scheme
mouse: "right" alone is a chip on a phone, with no aim point // give the action a gesture too. Never inputs.touch.enabled: false to hide chips: it kills gestures, the stick and drag-look
overlapPoint / overlapSegment: { objects, approximate, terrain } // probe-grade: exact collider shapes, approximate = bounds where the shape is not loaded here, terrain null = unknown. In 3D a static model's mesh collider is a surface: a point inside it answers nothing. Right at a change (a placement check, a blocked door); wrong per tick
````


### After clicking "read → jev Minds for bosses, NPCs, crowds, shopkeepers and puzzles."

- H2: Jev Decides

Jev Decides

The bar: a boss who turns on whoever hits hardest once the healing stops; forty shoppers who thin when the rain starts, each on her own errand; a lock that learns which door you try first. A mind reads what is in front of it and answers in odds.

jev:decide is a probability pipe: facts in (small and typed: distances, counts, last moves) plus pictures (media as in llm:chat, no sound or clip), typed questions in, calibrated probabilities out in about half a second. One ask per decision on the mind's own clock, never per tick, none while ctx.place.players is empty.

media

export function update(ctx) { const s = ctx.self.state; if (!ctx.place.players.length || ctx.now() < (s.nextAt ?? 0)) return; s.nextAt = ctx.now() + 4000 + ctx.random() * 2000; ctx.job("jev:decide", { state: { gold: s.gold, stall: { item: "pie", queue: ctx.place.players.length }, recent: s.recent ?? [] }, questions: { act: { type: "choice", instructions: "What does this shopper do next?", criteria: { buy: "pays and takes it", browse: "looks at another item", leave: "walks off" } } }, }, "decided"); } export function decided(ctx, r) { if (!r.ok) return; const s = ctx.self.state, act = r.data.answers.act; let roll = ctx.random(), pick = act.choice; for (const [option, p] of Object.entries(act.probabilities)) if ((roll -= p) <= 0) { pick = option; break; } s.recent = [...(s.recent ?? []).slice(-4), { at: ctx.now(), act: pick }]; s.plan = pick; }

DECIDE: boolean → { type, probability }; choice → { type, choice, probabilities: { option: p } }, its criteria keys are the options; score → { type, score, probabilities }, its criteria the ordered steps (["sour", "flat", "glad"]), the score a number over their indices.

{ type, probability }

{ type, choice, probabilities: { option: p } }

criteria

{ type, score, probabilities }

["sour", "flat", "glad"]

ACT: SAMPLE with ctx.random(), never the top answer: forty bodies sampling one set of odds spread like a crowd; argmax makes clones.

REMEMBER: the mind's memory is your state: its last few { at, …what it did } in state.recent, handed back in the next state.

{ at, …what it did }

state.recent

"decided" names an export: decided(ctx, r, payload) fires where the entity simulates, through a restart; a (r) => … callback lives only as long as its hook.

"decided"

decided(ctx, r, payload)

(r) => …

One shape, every mind. A boss: state = each player's damage, healing, distance, its own last moves; questions = target, move (choices), retreat (boolean). A crowd: one ask per body on its own nextAt; question = where it goes. A puzzle that learns: state = the last attempts; question = which door opens now.

retreat

nextAt

A failed ask is r.ok: false with r.error.code: keep the last plan, ask next cycle. Metered to the world like llm:chat; a 768 px picture as four plain asks, the largest fifteen.

r.ok: false

r.error.code

#### Block 1

````text
media
````

#### Block 2

````text
export function update(ctx) {
  const s = ctx.self.state;
  if (!ctx.place.players.length || ctx.now() < (s.nextAt ?? 0)) return;
  s.nextAt = ctx.now() + 4000 + ctx.random() * 2000;
  ctx.job("jev:decide", {
    state: { gold: s.gold, stall: { item: "pie", queue: ctx.place.players.length }, recent: s.recent ?? [] },
    questions: { act: { type: "choice", instructions: "What does this shopper do next?", criteria: { buy: "pays and takes it", browse: "looks at another item", leave: "walks off" } } },
  }, "decided");
}
export function decided(ctx, r) {
  if (!r.ok) return;
  const s = ctx.self.state, act = r.data.answers.act;
  let roll = ctx.random(), pick = act.choice;
  for (const [option, p] of Object.entries(act.probabilities)) if ((roll -= p) <= 0) { pick = option; break; }
  s.recent = [...(s.recent ?? []).slice(-4), { at: ctx.now(), act: pick }];
  s.plan = pick;
}
````

#### Block 3

````text
{ type, probability }
````

#### Block 4

````text
{ type, choice, probabilities: { option: p } }
````

#### Block 5

````text
criteria
````

#### Block 6

````text
{ type, score, probabilities }
````

#### Block 7

````text
["sour", "flat", "glad"]
````

#### Block 8

````text
{ at, …what it did }
````

#### Block 9

````text
state.recent
````

#### Block 10

````text
"decided"
````

#### Block 11

````text
decided(ctx, r, payload)
````

#### Block 12

````text
(r) => …
````

#### Block 13

````text
retreat
````

#### Block 14

````text
nextAt
````

#### Block 15

````text
r.ok: false
````

#### Block 16

````text
r.error.code
````


### After clicking "read → game-ui HUDs, menus, signs, mic and webcam, X posts."

- H2: Game UI

Game UI

A HUD is only what the player needs this second: the game's main readout (speed, health) big, a second number smaller below, each on a small plate, readable across the room, no bigger (40–56 px at 1080 p). No word floats pale on the scene: a plate under it or a stroke. One grid: every plate 24 px from the edge, edges meeting neighbours'. The game's name lives on the page; controls are learned once from a fading hint in the first seconds; rules, by playing. A win or loss is a moment in the world first (→game-feel), then the number and play-again on a plate beside it. Control words are labels (turn, actions.<name>.label) that follow rebinds, never key names; one unlike the declared key is the player's rebind (mouse 4/5: side buttons): keep it. Arrival, identity and voice are Jayzee's: the play press and first click or key start sound and take the mouse, a player is their Jayzee name and face overhead and on every board, talk is Jayzee's mic (join, mute, open or hold V →social), so a game builds no click-to-start or tap-for-sound gate, mic button, nickname or login; asked, say so and build just a sign-in button on player.isGuest. The game owns its fiction (named character, hero or team on player.state). A game opens in the world: a start screen (title, lobby) empties the room; never add or remove one unasked (ui.startScreen). A level pick is a pad, doorway or marked area to stand on, a portal only to another place (→portals); a character or loadout pick, a station to walk to. A plate holds what reads like a page and wears one edge; a changing value moves. The screen is in the game's material: the engine's pixel face: Jersey 10, Geist Pixel Square (Grid/Circle/Triangle/Line stripe small text) named by world.config.yaml's engine.ui.theme.font, or its own (jayzee upload an open-licence .woff2 named in @font-face): the world's palette, flat fills, hard edges, a hard-offset shadow (the plate below), never a web page's glass card; system-ui throws the face away.

actions.<name>.label

mouse 4

player.isGuest

ui.startScreen

engine.ui.theme.font

jayzee upload

@font-face

system-ui

UI work runs from a mock: look, then jayzee paint "<the finished screen: each plate, its words, its place>" --ref <address beside the frame> edits the frame into the mock (their pictures as more --ref); one say shows it (!the mock) as you start, no question. Build to the mock in ui.js; a piece it put in the rail moves; say so. look again; the closing say shows before and after.

jayzee paint "<the finished screen: each plate, its words, its place>" --ref <address beside the frame>

--ref

!the mock

the mock

// ui.js is one module on the page: the engine calls the default export whenever what it reads moves, ≤30/s (a glide is CSS; read ctx.now() only to draw time); every named export is a page global for onclick const THEME = `<style>#hud{--ink:oklch(.22 .04 60);--paper:oklch(.96 .03 90);--gold:oklch(.86 .15 85);color:var(--paper);text-shadow:2px 2px var(--ink)}.plate{background:var(--paper);color:var(--ink);box-shadow:0 0 0 3px var(--ink);text-shadow:none;padding:10px 16px}.lbl{font-size:13px;letter-spacing:.08em;opacity:.7}.num{font-size:48px;line-height:1}@keyframes kick{50%{scale:1.4}}@keyframes fade{to{opacity:0;visibility:hidden}}</style>`; export default function (ctx, player) { const s = player.controlling?.state ?? player.state, turn = ctx.world.inputs.axes?.moveX?.label; return `${THEME}<div id="hud" class="fixed inset-0 pointer-events-none"> <div class="absolute left-6 bottom-6 plate"><div class="lbl">SPEED</div><div class="num">${Math.round(s.speed ?? 0)}</div></div> <div class="absolute top-6 plate text-right" style="min-width:140px;right:clamp(24px,(110px - var(--spawn-chrome-reservation-right-top,0px))*999,var(--spawn-chrome-reservation-right-inset,50px) + 24px)"><div class="lbl">SCORE</div><div id="s${s.score ?? 0}" class="num" style="color:var(--gold);animation:kick .15s">${s.score ?? 0}</div></div> ${turn ? `<div id="hint" class="absolute inset-x-0 bottom-24 text-center" style="padding:0 calc(var(--spawn-chrome-reservation-right-inset,50px) + 24px);font-size:18px;animation:fade 1s 4s forwards">${turn} to steer</div>` : ""} </div>`; }

A later screen (results, shop) stands in every render, hidden until shown: the engine draws it before play. Nodes match by id: a kept id keeps its running animation; a new id or changed inline animation replays it. A stamp in a keyframes or class name is whole (Math.round(s.at)): ctx.now() has a fraction, whose dot breaks the name. A loop moves only opacity or a transform; stroke-dashoffset and others repaint every frame: a glow pulses the opacity of a shadowed ::after at inset:0, never scaled or larger (a shadow leaves its box dark); marching dashes slide a repeating-linear-gradient strip. A render throw blanks the HUD until one succeeds. Secret cards are owner rows under their player →platform-systems. Theme classes paint, utilities place: .plate sets no position or display (authored rules beat utilities) and is no utility's name (ring: a blue box-shadow).

Math.round(s.at)

::after

inset:0

repeating-linear-gradient

.plate

The rail is Jayzee's: one block centered on the right edge, every platform and width; never hide, move or cover it: its rows are var(--spawn-chrome-reservation-right-top) / var(--spawn-chrome-reservation-right-height), above and below them the edge is the game's; a plate or scrollbar across them clears its band (right: calc(var(--spawn-chrome-reservation-right-inset, 50px) + 24px)), a centered line there pads both sides alike or ends above it (bottom: calc(100vh - var(--spawn-chrome-reservation-right-top) + 24px)).

var(--spawn-chrome-reservation-right-top)

var(--spawn-chrome-reservation-right-height)

right: calc(var(--spawn-chrome-reservation-right-inset, 50px) + 24px)

bottom: calc(100vh - var(--spawn-chrome-reservation-right-top) + 24px)

Escape frees a locked cursor and closes Jayzee's chat: a game opens nothing on it or the release (pointerLockLost), even asked; its bound action fires. A game's menu, pause and HUD buttons take its own keys, each printed; pause sets ctx.place.timeScale: 0 holds every body, timer and effect.

ctx.place.timeScale

html { cursor: none } hides the arrow over the whole game; url(…), auto draws its own.

html { cursor: none }

url(…), auto

A hotbar scroll is two actions mouse: "wheelUp"/"wheelDown" (a pulse per notch), never the wheelY axis. Real buttons keep pointer-events-auto. Plates fit a 390 px phone: side by side they flex-wrap, none narrower than its one-line label; a panel across the band's rows clears it on both sides, the HUD under it hides; on touch its words name the tap (✕); past ~640 px tall it scrolls.

mouse: "wheelUp"

pointer-events-auto

flex-wrap

WORDS on a thing are big letters on its bare material (<div face="front" width="1.6m" style="font-size:140px">HIGH TOWN</div>, a colour the material is not). A PANEL (readouts, buttons) is a FLOATING PLATE: a bare root with a margin holds a soft-edged plate in its place's material. A SCREEN the ui draws (an arcade game) is material.canvas. HTML a door or lid uncovers is a face too: the page frame trails moving 3D. A plate that FOLLOWS a thing (nameplate, marker) is HUD HTML with data-world-anchor="<id>": atop its body, or at data-anchor-offset="x y z" metres from its feet; --anchor-depth is metres away for a CSS fade.

<div face="front" width="1.6m" style="font-size:140px">HIGH TOWN</div>

material.canvas

data-anchor-offset="x y z"

--anchor-depth

data-modal = "this surface owns the screen" (dialog, story card, bag or shop), one at a time: the cursor frees while shown, relocks after; siblings dim, unclickable; one title bar, the card's; an always-shown bar carries none. Invisible still catches clicks and costs an iPhone a screen-sized layer: panel-less backdrop, idle hit marker or spent intro is visibility:hidden.

visibility:hidden

An icon is a painted picture: one jayzee paint "<what>" --size 1024x1024 per icon, each <img> slot-sized; an inline <svg> is a glyph asked flat or hand-drawn (one <symbol> set, <use> per slot); a texture script is an image (<img src="scripts/tex-icons.js?slot=heart">). HTML holds no sound or sound setting but one mute (→audio). ctx.view.site ("x.com" on X, "" unnamed): fit the frame, no mouse lock.

jayzee paint "<what>" --size 1024x1024

<symbol>

<use>

<img src="scripts/tex-icons.js?slot=heart">

ctx.view.site

Microphone and camera (getUserMedia), SpeechRecognition and navigator.geolocation share the platform's ask (surface its reject or error); never gate on track.muted.

getUserMedia

SpeechRecognition

navigator.geolocation

track.muted

<api> // ui.js's page side; in the render ctx.self is the body's handle (player.controlling's while set), ctx.session a plain copy sendAction(name, payload, { down, relockPointer }) // down true on pointerdown, false on pointerup = a held button; relockPointer = back to mouse-look ctx.emit("haptic", { kind: "light" }) // a press's buzz from its action's handler in the player's script, the presser's alone; the Jayzee app and a controller buzz, a phone browser never sendAxis(name, value) // into input.axes.<name> openLink(url) // opens discord.gg or spawn.co, confirmed, ≤3/min; other URLs are copyable text, no download onMount(container, player) / onDestroy(container) // container = #tome-game-mount, empty viewport-wide pointer-events-none layer beside the render's #tome-ui-container: getElementById finds render nodes audio.context, audio.bus("UI" | "SFX" | "Music"), audio.buffer(ref) // in onMount: the HUD's own WebAudio graph (a press tick: an oscillator) into the bus, under the rail dials window.spawn.assets.upload({ blob, name }): { url } // a player's <input type="file"> or image/audio/video bytes (GLB if .isEditor) become a /cdn/ url to store, never base64; the game's link with ?card=<url> unfurls as that picture; e.code guest_not_allowed, rate_limited (wait e.retryAfterSeconds when set) window.spawn.user.upgradeGuest() // Jayzee's sign-in window.spawn.view.captureFrame({ type, quality, maxSize, camera?: ViewCamera }): Blob // screenshot/photo, no HUD; code capture_unavailable = no frame yet navigator.mediaDevices.getDisplayMedia({ audio: true }) // that view and sound; no picker, screen or system audio; preferCurrentTab adds UI window.spawn.chat.sharePicture({ blob, scope }): { url, width, height } // the player's picture, checked by Jayzee, said as them in chat or a chat.js scope; paint url with <img>, never a copy; refused: code rejected, message for the player window.spawn.on("event", (name, payload) => …) // in onMount: each ctx.emit("uiEvent", { name, payload }) once: an effect, never a persisted value; onDestroy calls the returned unsubscribe data-interactive // marks a custom element clickable (buttons, links, inline handlers are) spawn-canvas // one element, the game's viewport: its box alone gets the picture's resolution; no transform, clip or pointer events; backdrop: box-shadow 0 0 0 200vmax #000 ctx.worldToScreen(position): { x, y, depth, onScreen } | null // one-shot placement at a static point; null off-client ctx.world.engine.ui.referenceHeight: number // the design's window height (1080); fixes a HUD huge or tiny ctx.self.inputHeld: boolean // true while Jayzee's chat, menu or held Tab has the keyboard: the render or body script holds a clock or pad read on it navigator.getGamepads(), navigator.languages // ui.js only: each controller apart; an action names each button it reads, or a key or mouse action takes it var(--spawn-safe-area-top|right|bottom|left, 0px) // notch insets on html var(--spawn-touch-corner-band-height, 0px) // bottom-right touch buttons' height over the safe-area bottom; the stick owns bottom-left </api>

?card=<url>

#### Block 1

````text
actions.<name>.label
````

#### Block 2

````text
mouse 4
````

#### Block 3

````text
player.isGuest
````

#### Block 4

````text
ui.startScreen
````

#### Block 5

````text
engine.ui.theme.font
````

#### Block 6

````text
spawn upload
````

#### Block 7

````text
@font-face
````

#### Block 8

````text
system-ui
````

#### Block 9

````text
spawn paint "<the finished screen: each plate, its words, its place>" --ref <address beside the frame>
````

#### Block 10

````text
--ref
````

#### Block 11

````text
!the mock
````

#### Block 12

````text
// ui.js is one module on the page: the engine calls the default export whenever what it reads moves, ≤30/s (a glide is CSS; read ctx.now() only to draw time); every named export is a page global for onclick
const THEME = `<style>#hud{--ink:oklch(.22 .04 60);--paper:oklch(.96 .03 90);--gold:oklch(.86 .15 85);color:var(--paper);text-shadow:2px 2px var(--ink)}.plate{background:var(--paper);color:var(--ink);box-shadow:0 0 0 3px var(--ink);text-shadow:none;padding:10px 16px}.lbl{font-size:13px;letter-spacing:.08em;opacity:.7}.num{font-size:48px;line-height:1}@keyframes kick{50%{scale:1.4}}@keyframes fade{to{opacity:0;visibility:hidden}}</style>`;
export default function (ctx, player) {
const s = player.controlling?.state ?? player.state, turn = ctx.world.inputs.axes?.moveX?.label;
return `${THEME}<div id="hud" class="fixed inset-0 pointer-events-none">
<div class="absolute left-6 bottom-6 plate"><div class="lbl">SPEED</div><div class="num">${Math.round(s.speed ?? 0)}</div></div>
<div class="absolute top-6 plate text-right" style="min-width:140px;right:clamp(24px,(110px - var(--spawn-chrome-reservation-right-top,0px))*999,var(--spawn-chrome-reservation-right-inset,50px) + 24px)"><div class="lbl">SCORE</div><div id="s${s.score ?? 0}" class="num" style="color:var(--gold);animation:kick .15s">${s.score ?? 0}</div></div>
${turn ? `<div id="hint" class="absolute inset-x-0 bottom-24 text-center" style="padding:0 calc(var(--spawn-chrome-reservation-right-inset,50px) + 24px);font-size:18px;animation:fade 1s 4s forwards">${turn} to steer</div>` : ""}
</div>`;
}
````

#### Block 13

````text
Math.round(s.at)
````

#### Block 14

````text
::after
````

#### Block 15

````text
inset:0
````

#### Block 16

````text
repeating-linear-gradient
````

#### Block 17

````text
.plate
````

#### Block 18

````text
var(--spawn-chrome-reservation-right-top)
````

#### Block 19

````text
var(--spawn-chrome-reservation-right-height)
````

#### Block 20

````text
right: calc(var(--spawn-chrome-reservation-right-inset, 50px) + 24px)
````

#### Block 21

````text
bottom: calc(100vh - var(--spawn-chrome-reservation-right-top) + 24px)
````

#### Block 22

````text
ctx.place.timeScale
````

#### Block 23

````text
html { cursor: none }
````

#### Block 24

````text
url(…), auto
````

#### Block 25

````text
mouse: "wheelUp"
````

#### Block 26

````text
pointer-events-auto
````

#### Block 27

````text
flex-wrap
````

#### Block 28

````text
<div face="front" width="1.6m" style="font-size:140px">HIGH TOWN</div>
````

#### Block 29

````text
material.canvas
````

#### Block 30

````text
data-anchor-offset="x y z"
````

#### Block 31

````text
--anchor-depth
````

#### Block 32

````text
visibility:hidden
````

#### Block 33

````text
spawn paint "<what>" --size 1024x1024
````

#### Block 34

````text
<symbol>
````

#### Block 35

````text
<use>
````

#### Block 36

````text
<img src="scripts/tex-icons.js?slot=heart">
````

#### Block 37

````text
ctx.view.site
````

#### Block 38

````text
getUserMedia
````

#### Block 39

````text
SpeechRecognition
````

#### Block 40

````text
navigator.geolocation
````

#### Block 41

````text
track.muted
````

#### Block 42

````text
?card=<url>
````


### After clicking "read → mobile-controls Touch controls, automatic and hand-made."

- H2: Mobile Controls

Mobile Controls

The bar: a phone player never hunts for a control. The stick is under the thumb that landed, the one verb that matters sits at the other thumb's resting arc and is big, aim is a hold-drag-release on the fire chip itself so one thumb aims and commits, a car has a wheel under the left thumb and two pedals under the right, and switching from feet to driving swaps the whole layout the moment the door closes. Movement, every primary verb and the camera are reachable with two thumbs, and pockets clear the platform's rail on the right edge where a 44 px band remains. Every game gets the draft, projected from inputs at zero effort; designed controls are inputs.touch.surfaces, complete named documents on the engine's rails, so they keep its feel. You speak channels and intent; the look is yours: inputs.touch.style dresses the parts in the game's own fills, edges and face (as its HUD, with a pressed look that answers the thumb), while the engine keeps each piece's place, hit area, timings and gains (a chip is 56 or 48 px). Never hand-roll a DOM stick or chip the surface offers; a chip size or layout it does not offer is your own HTML control, driven by sendAction. Phone tilt reaches the HUD page as devicemotion after the player allows it for the world: a listener there asks, then feeds sendAxis.

The draft's contract: the stick projects only from axes literally named moveX/moveZ (moveY in 2D): rename them and the stick vanishes; drag-look from any lookX/lookY binding, pinch-zoom from a wheel axis; every key or mouse action becomes a chip, ranked authored slot → common verb names (jump first) → declaration order, capped at 4: verbs past it drop loudly (a phone on the draft logs each).

A place that lays inputs.touch in its config.yaml (ctx.world.places.<p>.inputs.touch) wears it whole over the world's, so change that place's controls there.

# world.config.yaml: a shooter on foot, a car when driving; the selector picks the surface per player inputs: axes: { moveX: { keys: "a/d" }, moveZ: { keys: "s/w" }, aimX: {}, aimY: {}, steer: {}, throttle: {}, brake: {} } # aimX: {} = a touch-only axis actions: { fire: { mouse: "left" }, dodge: { keys: ["space"] }, exit: { keys: ["e"] } } touch: surfaces: default: sticks: [{ x: moveX, y: moveZ }] buttons: - { action: fire, drag: { x: aimX, y: aimY }, slot: 1, size: primary, icon: "🎯" } # hold aims, release commits; a tap is a plain press - { action: dodge, slot: 2 } driving: sticks: [] look: false pads: [{ x: steer, mode: absolute, zone: left, label: STEER }] buttons: - { axis: throttle, label: GAS, slot: 1, size: primary } - { axis: brake, label: BRAKE, slot: 2 } - { action: exit, slot: 3 } active: scripts/controls.js style: | [data-part="button"] { background: oklch(0.95 0.04 85); border: 3px solid oklch(0.45 0.08 60); color: oklch(0.35 0.07 55); font-weight: 800; } [data-part="button"][data-pressed] { background: oklch(0.86 0.1 80); transform: translateY(2px); } [data-part="stick"] { background: oklch(0.95 0.04 85 / 0.45); border: 3px solid oklch(0.45 0.08 60); } [data-part="thumb"] { background: oklch(0.45 0.08 60); border: none; }

// scripts/controls.js: the selector (inputs.touch.active below), stateless export default (ctx) => (ctx.player.state.driving ? "driving" : "default"); // on the body's onInput: const shot = input.actionData?.fire; // release carries { x, y, magnitude }; a tap carries none // if (input.pressed.fire) shot?.magnitude > 0.1 ? shootAlong(shot) : shootAuto(); // drag = aimed, tap = assisted quick-fire // the car reads both worlds: steer = axes.steer || axes.moveX; gas = axes.throttle || Math.max(0, axes.moveZ)

Desktop bindings on the same names keep working, so behavior code cannot tell a stick from WASD or a pedal from a key. Twin-stick instead of drag-aim: sticks: [{ x: moveX, y: moveZ }, { x: aimX, y: aimY, zone: right }]. A one-thumb portrait runner: orientation: portrait, sticks: [], look: false, pinch: false, gestures: { tap: jump, hold: slide }: no chrome, the whole screen is the button. Compose from the draft in run_script: const draft = ctx.resolveControls().surface; ctx.world.inputs.touch = { surfaces: { default: { ...draft, sticks: [] } } }: "no joystick" in two lines; the engine never merges surfaces. Per-mode controls are the selector, never a spec edit (that hits every player at once): it reads live state, so reconnects and late joiners land right. More verbs than one screen fits: a { action: "more" } button flips a state flag the selector reads.

ctx.resolveControls(name?): { surface, diagnostics } // no arg or "auto" = the draft as a value, the same document surfaces takes, plus every drop and why (capped chips by name, a suppressed stick with the axis names behind it); a name = that authored surface with its validation faults. Read it before and after redesigning inputs.touch.enabled: false // the kill switch: no touch controls at all, authored included inputs.touch.surfaces.<name> // a complete document; declaring one replaces the draft whole. "default" is active when no selector picks. Every x/y/axis/action string names a DECLARED entry in inputs.axes/actions: declared-but-unbound is fine; an invalid widget drops with a fault naming the fix, an unusable document parks players to the draft .orientation: "landscape" | "portrait" | "any" // the way you drew it for; default any. It draws as authored either way; a surface per orientation is the selector's (device.orientation) .sticks: [{ x, y, zone: "left" | "right", anchor: "floating" | "fixed", position: { x, y }, visibility: "fade" | "always", quantize: 4 | 8 }] // ≤ 2, one per zone; floating (default) spawns under the finger anywhere in the pocket; fixed takes a finger on its plate and throw, and the rest of the pocket stays the world's (taps, holds, look); position is for fixed only, 0..1 within the zone pocket (0,0 = the pocket's top-left, default centered): the pocket already dodges safe areas and reserved chrome, so no pixel math (a pocket squeezed below the 112 px plate, a landscape phone's rail-side zone, pins a fixed stick to its center and the plate can overhang); fade (default) ghosts the resting plate until first use; quantize = d-pad, magnitude 0/1 .buttons: [{ action | axis, drag: { x, y }, label, icon, zone, slot, size: "primary" | "secondary", role: "confirm" | "cancel" }] // exactly one of action (press/release edges like a key) or axis (held at 1 while pressed: pedals, ADS); drag composes with action: hold streams radial -1..1 to the axes, release fires the action with actionData { x, y, magnitude }, a sub-slop tap is a plain press; icon one glyph or a /cdn/ picture that fills the chip, label still its name; zone default right; slot is ordering, not capacity: 1–4 pin the thumb arc's positions (muscle memory; size is honored off them), a higher number takes the next open one, a fifth right-zone chip starts an overflow row, and what geometry cannot fit (safe area, reservations, 44 px floors) drops loudly from the end: a designed surface is how a fifth verb earns a chip .pads: [{ x, y, mode: "absolute" | "relative", zone, label }] // absolute: position IS the level (a wheel; omit y for one-axis steer); relative: per-tick deltas in pad fractions, a full-width swipe sums to ~1 (touchpad-look) .gestures: { tap, "double-tap", hold, press } // the world grammar, a closed set, one action each; timings are engine-owned (the numbers: →pointer-raycasting) .look: true, .pinch: true // omitted = derived from bindings (lookX/lookY bound, a wheel axis bound) .symmetric: true // default false: pockets shrink to dodge reserved chrome, and a phone's right-edge rail shortens the RIGHT one (uneven twin sticks or pads); symmetric mirrors that onto the left. One analog region per zone (stick or pad; sticks claim first) inputs.touch.style: css // the controls' look over the engine's own, scoped to them: parts [data-part="button"] (data-action, data-size primary | secondary, data-zone, data-role, data-pressed while held; its word is fitted to the chip unless a rule sets font-size), "stick" (data-resting fade | always on a resting plate) > "thumb" (data-live past the deadzone), "pad", inside the root [data-part="touch"] whose data-surface names the surface; @font-face (an uploaded .woff2 at its /cdn/ URL) and @keyframes work; no rule moves a piece or its hit area inputs.touch.active: script // the selector: default export (ctx) => name, or { surface, labels: { <action or axis>: "Dig" | null }, icons: { <action>: "⚔" | "/cdn/<picture>" | null } }, per player, at UI cadence; ctx is { player, device: { orientation, coarse } }: player is the same view ui.js gets (state, tags, place, position). labels are the pieces' words now, a chip by its action, a stick or pad by an axis it drives; a word replaces a chip's icon or a pad's label, null takes the piece off the glass; icons then set chips' icons, null shows the word; one surface says what each piece does now, never a surface per word or picture; a change re-dresses the pieces in place and holds on the rest go on. "auto" names the draft; junk or an unknown name parks that player to the draft with a teaching fault; over 4 swaps a second are suppressed and reported; a swap mid-press gives held fingers clean releases inputs.actions.<name>.touch: { button, label, slot, gesture, tags } // tunes the DRAFT only: button false excludes, slot 1–4 pins, gesture binds a world gesture instead of a chip, tags scope press to one thing inputs.actions.<name>.active: script // who holds it: default export (ctx) => boolean per player, ctx.self the player, read-only; falsy = no key, pad button, chip or keys-page row for them, input reads stay booleans; builders only: (ctx) => ctx.self.isEditor input.axes.touchActive: 1 | 0 // engine-written: 1 while touch is the live input, 0 when mouse or keys take over, never written on desktop: branch feel on it, no device sniffing input.axes.touchTwist: radians // engine-written: how far the two fingers on the world turned this tick, + clockwise, 0 with one finger: a delta like lookX (pinch is zoomIn); rotate the piece, roll the camera, steer: your math sendAction("sprint", undefined, { down: true }) / { down: false } // a held button in your own HTML UI; down edges carry no payload ?touch=1 on the game URL // a desktop creator's eye on the live touch layout; look with target "player" and device "phone" shows the phone frame

Feel: timings, deadzones and gains are engine constants (cross-game muscle memory is touch's only tactile feedback), but game forgiveness is yours. Three touch defaults, each only while touchActive is 1: coyote ~110–170 ms and jump buffer ~120–180 ms against ~80–120 ms on desktop, auto-fire when the target sits in the reticle (aim stays the player's), and sprint at full stick throw (hypot(moveX, moveZ) > 0.95: a held key is always a full throw) so no sprint chip is needed.

A published game plays on phones by default; only the creator's word narrows it (publish carries the flow): a verb with no touch path is a fact to tell the creator, never a silent loss.

#### Block 1

````text
# world.config.yaml: a shooter on foot, a car when driving; the selector picks the surface per player
inputs:
  axes: { moveX: { keys: "a/d" }, moveZ: { keys: "s/w" }, aimX: {}, aimY: {}, steer: {}, throttle: {}, brake: {} } # aimX: {} = a touch-only axis
  actions: { fire: { mouse: "left" }, dodge: { keys: ["space"] }, exit: { keys: ["e"] } }
  touch:
    surfaces:
      default:
        sticks: [{ x: moveX, y: moveZ }]
        buttons:
          - { action: fire, drag: { x: aimX, y: aimY }, slot: 1, size: primary, icon: "🎯" } # hold aims, release commits; a tap is a plain press
          - { action: dodge, slot: 2 }
      driving:
        sticks: []
        look: false
        pads: [{ x: steer, mode: absolute, zone: left, label: STEER }]
        buttons:
          - { axis: throttle, label: GAS, slot: 1, size: primary }
          - { axis: brake, label: BRAKE, slot: 2 }
          - { action: exit, slot: 3 }
    active: scripts/controls.js
    style: |
      [data-part="button"] { background: oklch(0.95 0.04 85); border: 3px solid oklch(0.45 0.08 60); color: oklch(0.35 0.07 55); font-weight: 800; }
      [data-part="button"][data-pressed] { background: oklch(0.86 0.1 80); transform: translateY(2px); }
      [data-part="stick"] { background: oklch(0.95 0.04 85 / 0.45); border: 3px solid oklch(0.45 0.08 60); }
      [data-part="thumb"] { background: oklch(0.45 0.08 60); border: none; }
````

#### Block 2

````text
// scripts/controls.js: the selector (inputs.touch.active below), stateless
export default (ctx) => (ctx.player.state.driving ? "driving" : "default");
// on the body's onInput: const shot = input.actionData?.fire;   // release carries { x, y, magnitude }; a tap carries none
// if (input.pressed.fire) shot?.magnitude > 0.1 ? shootAlong(shot) : shootAuto();   // drag = aimed, tap = assisted quick-fire
// the car reads both worlds: steer = axes.steer || axes.moveX; gas = axes.throttle || Math.max(0, axes.moveZ)
````

#### Block 3

````text
ctx.resolveControls(name?): { surface, diagnostics } // no arg or "auto" = the draft as a value, the same document surfaces takes, plus every drop and why (capped chips by name, a suppressed stick with the axis names behind it); a name = that authored surface with its validation faults. Read it before and after redesigning
inputs.touch.enabled: false // the kill switch: no touch controls at all, authored included
inputs.touch.surfaces.<name> // a complete document; declaring one replaces the draft whole. "default" is active when no selector picks. Every x/y/axis/action string names a DECLARED entry in inputs.axes/actions: declared-but-unbound is fine; an invalid widget drops with a fault naming the fix, an unusable document parks players to the draft
.orientation: "landscape" | "portrait" | "any" // the way you drew it for; default any. It draws as authored either way; a surface per orientation is the selector's (device.orientation)
.sticks: [{ x, y, zone: "left" | "right", anchor: "floating" | "fixed", position: { x, y }, visibility: "fade" | "always", quantize: 4 | 8 }] // ≤ 2, one per zone; floating (default) spawns under the finger anywhere in the pocket; fixed takes a finger on its plate and throw, and the rest of the pocket stays the world's (taps, holds, look); position is for fixed only, 0..1 within the zone pocket (0,0 = the pocket's top-left, default centered): the pocket already dodges safe areas and reserved chrome, so no pixel math (a pocket squeezed below the 112 px plate, a landscape phone's rail-side zone, pins a fixed stick to its center and the plate can overhang); fade (default) ghosts the resting plate until first use; quantize = d-pad, magnitude 0/1
.buttons: [{ action | axis, drag: { x, y }, label, icon, zone, slot, size: "primary" | "secondary", role: "confirm" | "cancel" }] // exactly one of action (press/release edges like a key) or axis (held at 1 while pressed: pedals, ADS); drag composes with action: hold streams radial -1..1 to the axes, release fires the action with actionData { x, y, magnitude }, a sub-slop tap is a plain press; icon one glyph or a /cdn/ picture that fills the chip, label still its name; zone default right; slot is ordering, not capacity: 1–4 pin the thumb arc's positions (muscle memory; size is honored off them), a higher number takes the next open one, a fifth right-zone chip starts an overflow row, and what geometry cannot fit (safe area, reservations, 44 px floors) drops loudly from the end: a designed surface is how a fifth verb earns a chip
.pads: [{ x, y, mode: "absolute" | "relative", zone, label }] // absolute: position IS the level (a wheel; omit y for one-axis steer); relative: per-tick deltas in pad fractions, a full-width swipe sums to ~1 (touchpad-look)
.gestures: { tap, "double-tap", hold, press } // the world grammar, a closed set, one action each; timings are engine-owned (the numbers: →pointer-raycasting)
.look: true, .pinch: true // omitted = derived from bindings (lookX/lookY bound, a wheel axis bound)
.symmetric: true // default false: pockets shrink to dodge reserved chrome, and a phone's right-edge rail shortens the RIGHT one (uneven twin sticks or pads); symmetric mirrors that onto the left. One analog region per zone (stick or pad; sticks claim first)
inputs.touch.style: css // the controls' look over the engine's own, scoped to them: parts [data-part="button"] (data-action, data-size primary | secondary, data-zone, data-role, data-pressed while held; its word is fitted to the chip unless a rule sets font-size), "stick" (data-resting fade | always on a resting plate) > "thumb" (data-live past the deadzone), "pad", inside the root [data-part="touch"] whose data-surface names the surface; @font-face (an uploaded .woff2 at its /cdn/ URL) and @keyframes work; no rule moves a piece or its hit area
inputs.touch.active: script // the selector: default export (ctx) => name, or { surface, labels: { <action or axis>: "Dig" | null }, icons: { <action>: "⚔" | "/cdn/<picture>" | null } }, per player, at UI cadence; ctx is { player, device: { orientation, coarse } }: player is the same view ui.js gets (state, tags, place, position). labels are the pieces' words now, a chip by its action, a stick or pad by an axis it drives; a word replaces a chip's icon or a pad's label, null takes the piece off the glass; icons then set chips' icons, null shows the word; one surface says what each piece does now, never a surface per word or picture; a change re-dresses the pieces in place and holds on the rest go on. "auto" names the draft; junk or an unknown name parks that player to the draft with a teaching fault; over 4 swaps a second are suppressed and reported; a swap mid-press gives held fingers clean releases
inputs.actions.<name>.touch: { button, label, slot, gesture, tags } // tunes the DRAFT only: button false excludes, slot 1–4 pins, gesture binds a world gesture instead of a chip, tags scope press to one thing
inputs.actions.<name>.active: script // who holds it: default export (ctx) => boolean per player, ctx.self the player, read-only; falsy = no key, pad button, chip or keys-page row for them, input reads stay booleans; builders only: (ctx) => ctx.self.isEditor
input.axes.touchActive: 1 | 0 // engine-written: 1 while touch is the live input, 0 when mouse or keys take over, never written on desktop: branch feel on it, no device sniffing
input.axes.touchTwist: radians // engine-written: how far the two fingers on the world turned this tick, + clockwise, 0 with one finger: a delta like lookX (pinch is zoomIn); rotate the piece, roll the camera, steer: your math
sendAction("sprint", undefined, { down: true }) / { down: false } // a held button in your own HTML UI; down edges carry no payload
?touch=1 on the game URL // a desktop creator's eye on the live touch layout; look with target "player" and device "phone" shows the phone frame
````


### After clicking "read → audio Soundtracks, stems, mixing, voice casts, acoustics, synth voices."

The bar: a place sounds like itself. The soundtrack is ONE jukebox everyone hears: a real track, crossfaded when the mood turns, ducked under a voice line. Each act sounds on its tick from its behavior at its point: the hit at hit.position, the crowd's roar as a kart passes; an ambience- loop (wind, crowd) is mastered to whisper under them. A sourced loop (smithy) sits at 0.2, its maxDistance where the source leaves sight; loops SUM.

ambience-

Three planes. Music is ctx.music.*: global, engine-owned, surviving resets and edits. World sound is a one-shot emit("playSound") from the object's behavior or a placed audio: row: full volume to refDistance, silent at maxDistance; a live row's gain, pitch or position patches its voice in place, so per-tick ramps are safe. A song a game seeks, pauses or draws a bar for is an audio: row (spatial: false, time: 0, bus: "Music"): the room's on an audience: "all" object, one player's with listeners. A program voice is for a graph the verbs don't speak: synthesis, a beat machine, a sidechain; kind: "vibe" is a live-coded pattern (jayzee api builtin/vibe; a note picks a bank by its exact manifest name, and an instrument word alone is silent).

emit("playSound")

spatial: false

time: 0

bus: "Music"

audience: "all"

listeners

jayzee api builtin/vibe

// places/main/sim.js: game logic sets place.state.mood; the engine owns every crossfade const TRACKS = { day: "cdn/music-calm-fingerpicked-guitar-meadow-loop.mp3", fight: "cdn/music-driving-taiko-drums-guitar-riff-loop.mp3" }; export function tick(ctx) { const mood = ctx.place.state.mood ?? "day"; ctx.music.play(TRACKS[mood], { fade: mood === "fight" ? 0.6 : 2.5, volume: 0.7 }); } // a voice line from its speaker: emit("playSound", { clip: LINE, bus: "Voice", onPlaying: "said" }) runs export said(ctx, sound) at its first heard sample (a first play cooks for seconds): caption and duck music there; the next line from onSoundEnd(ctx, sound), never a guessed length or a fallback timer

Volume is Jayzee's: the rail's Settings gear, per player and game, has one slider, everything; "More settings" adds the game (effects, ambience, interface as one) and music; VOICE has "other people", voice chat. A game may carry one mute toggle; a volume slider, sound page or settings menu is chrome Jayzee draws, never built, however asked: meet the ask with the game's MIX (each sound on its bus, the game's gains) and one sentence: Jayzee already sets this game's volume, and a game's slider stacks a second under it. A need no dial meets is a feature request: jayzee report_bug "<the need in a sentence>" --class platform-gap files it and the creator hears it is filed.

jayzee report_bug "<the need in a sentence>" --class platform-gap

The filename IS the prompt, every word rendered as spectra: name the physics a mic would hear (cdn/sfx-sword-blade-thwack-into-straw-stuffed-burlap-dummy.mp3); a register word (low, warm, soft, muted, hum) renders as a band erasing everything above it, silence on a phone. A loop ends -loop (the bake levels its seam). A track is cdn/music-<mood-genre-instrument words>-loop.mp3; any track or upload is remade by adding .<sound words>-loop.mp3 (far words loosen its melody); a song in the creator's words is sung verbatim from cdn/music-<mood-genre-voice words>.mp3?lyrics=${encodeURIComponent(LYRICS)} or a remake, line breaks kept. Music refs carry no identity: the exact file wins. A voice line is cdn/voice-<throat words>[-<emotion>]-saying-${encodeURIComponent(line)}.mp3, its throat (voice-gravel-voiced-old-soldier-…) ONE lib constant every line derives from; a performed line is jayzee voice "<line with [sighs] tags>" --voice <name>. The voice maker mostly refuses a child's throat (boy, girl, age) however worded: cast a refused one that turn as a light adult throat (voice-bright-young-tenor-…) and tell the creator in one line it is a young adult's. An upload's /cdn/<upload>.mp3 (mp3, wav, flac, ogg) IS the track; eight uploads are eight refs, never objects. "Too loud" means ONE row's gain, maxDistance or bus.

cdn/sfx-sword-blade-thwack-into-straw-stuffed-burlap-dummy.mp3

cdn/music-<mood-genre-instrument words>-loop.mp3

.<sound words>-loop.mp3

cdn/music-<mood-genre-voice words>.mp3?lyrics=${encodeURIComponent(LYRICS)}

cdn/voice-<throat words>[-<emotion>]-saying-${encodeURIComponent(line)}.mp3

voice-gravel-voiced-old-soldier-…

jayzee voice "<line with [sighs] tags>" --voice <name>

voice-bright-young-tenor-…

/cdn/<upload>.mp3

Find a rogue sound by census: [...ctx.place.objects].filter((o) => o.audio) lists the placed rows, ctx.music.now() the music; looping playSound voices have no list: keep handles and stopSound them when the source dies. "Stop all sound" is that census across planes (keep each row's audio to restore it).

[...ctx.place.objects].filter((o) => o.audio)

ctx.music.now()

Engine synthesis: →vehicles.

AudioWorklet source: string → Blob URL. Voice modules are isolated; cache load promises on shared ctx by source. setup returns hooks synchronously; late loads honor disposal/current controls. Fade pause/disposal; retain paused state. Relay load/DSP faults (processorerror) once through the next update for Jayzee logging.

setup

processorerror

ctx.music.play(ref, { fade, loop: true, layer, volume: 1 }) // fade in SECONDS: silent → fades in (default instant), another clip → crossfades (default 0.8), the same clip → no restart, a new volume ramps in place; loop: false plays once, then the layer clears; volume under the player's music dial; layer = a parallel stem ctx.music.stop({ fade: 0.8, layer }) // one layer, or everything; a stopped song restarts; no seek or pause (an `audio:` row has them) ctx.music.duck(gain, { duration }) // ALL music to gain (0..1) for duration seconds (0.2 s attack, 0.3 s release); a re-call re-anchors. No queue or playlist: a playlist crosses at `now().since >= len - 2`, `len = ctx.world.assets[ref]?.duration` (seconds) ctx.music.now(): { ref, layer, positionMs, since, layers } | null // the same on every machine; since = un-wrapped seconds since the clip took the layer emit("playSound", { …, refDistance, mode: "overlap" | "restart", bus, priority, follow, onPlaying }) // restart replaces this object's playing copy of that clip (a cry); another clip stacks (stopSound the old line first); overlap stacks (gunshots); bus omitted → SFX, or Music / Ambience for a music- / ambience or bed clip, a new name a group in SFX; higher priority keeps its voice under the cap; follow keeps a positioned play on the mover (its footsteps); with no position only the hook's actor hears it (onInput, update, onInteract, onTrigger*), with one everyone near; answers the soundId stopSound takes audio: { clip, loop, gain, spatial, time, end, loopStart, loopEnd, timeAt, paused, listeners } // a clip row's transport (provisional words): `radio.audio.time = 30` seeks now (timeAt = ctx.now()); `radio.audio.paused = true` stops it on every ear and folds the playhead into time, `= false` plays on; a new clip starts at 0; the playhead on every machine is `paused ? time : time + (pitch ?? 1) * (ctx.now() - timeAt) / 1000` (a loop wraps to loopStart at loopEnd, else at the clip's end); end, loopStart, loopEnd are seconds into the file: `{ clip, time: 1.25, end: 1.75 }` is one note of a take, `{ clip, loop: true, loopStart: 32, loopEnd: 48 }` plays the intro once, then cycles the chorus; listeners: the player body ids who hear it, absent = everyone in reach (a car radio: listeners: [car.controller, ...riders]) audio: { kind: "program", script, params, gain, bus, spatial, maxDistance, paused, input, listeners } // export function setup({ ctx, out, now, roomNow, params, paused, on, input }) → { update(params, paused), dispose(), readout() }: ctx the page's one AudioContext (never close or suspend it), now its currentTime, roomNow() scripts' now(), out the voice (connect there alone); ctx.self.audio.params.x = v reaches update on every machine; readout() is its audio.readout (plain data); each change re-runs its readers: return what you draw, rounded as drawn. input: a bus ("Master" = the whole mix): setup gets its sound as input; what reaches out replaces it: input.connect(lowpass).connect(out) is under water. listeners as on a clip row audioLevel, audioSpectrum(x) // from builtin/tsl, in a material or a look (→looks): the sound this player hears (music and world sounds), each 0..1, the loudness and the band at x from 0 (20 Hz) to 1 (20 kHz); a visualiser's bar is step(uv().y, audioSpectrum(uv().x)), a glow on the beat emissive.mul(audioLevel); the picture redraws as the music moves ctx.place.acoustics.reverb: 0..1 // the place's tail (0 dry, the default); a spatial voice loses highs with distance before volume; a door leaks the far room's tail ctx.place.listenerEntity = id | null // the ear rides that entity; default the camera (2D or ortho: the body) world.config.yaml audio: { gains: { Master, Music, SFX, UI, Ambience, Voice, Footsteps }, maxVoices: 32, cullBeyond: 200 } // the game's mix under the players' rail dials, and `player.gains` over it for ONE player (null clears); a true-peak limiter rides it, so loudness is authored in gain

#### Block 1

````text
ambience-
````

#### Block 2

````text
emit("playSound")
````

#### Block 3

````text
spatial: false
````

#### Block 4

````text
time: 0
````

#### Block 5

````text
bus: "Music"
````

#### Block 6

````text
audience: "all"
````

#### Block 7

````text
listeners
````

#### Block 8

````text
spawn api builtin/vibe
````

#### Block 9

````text
// places/main/sim.js: game logic sets place.state.mood; the engine owns every crossfade
const TRACKS = { day: "cdn/music-calm-fingerpicked-guitar-meadow-loop.mp3", fight: "cdn/music-driving-taiko-drums-guitar-riff-loop.mp3" };
export function tick(ctx) {
  const mood = ctx.place.state.mood ?? "day";
  ctx.music.play(TRACKS[mood], { fade: mood === "fight" ? 0.6 : 2.5, volume: 0.7 });
}
// a voice line from its speaker: emit("playSound", { clip: LINE, bus: "Voice", onPlaying: "said" }) runs export said(ctx, sound) at its first heard sample (a first play cooks for seconds): caption and duck music there; the next line from onSoundEnd(ctx, sound), never a guessed length or a fallback timer
````

#### Block 10

````text
spawn report_bug "<the need in a sentence>" --class platform-gap
````

#### Block 11

````text
cdn/sfx-sword-blade-thwack-into-straw-stuffed-burlap-dummy.mp3
````

#### Block 12

````text
cdn/music-<mood-genre-instrument words>-loop.mp3
````

#### Block 13

````text
.<sound words>-loop.mp3
````

#### Block 14

````text
cdn/music-<mood-genre-voice words>.mp3?lyrics=${encodeURIComponent(LYRICS)}
````

#### Block 15

````text
cdn/voice-<throat words>[-<emotion>]-saying-${encodeURIComponent(line)}.mp3
````

#### Block 16

````text
voice-gravel-voiced-old-soldier-…
````

#### Block 17

````text
spawn voice "<line with [sighs] tags>" --voice <name>
````

#### Block 18

````text
voice-bright-young-tenor-…
````

#### Block 19

````text
/cdn/<upload>.mp3
````

#### Block 20

````text
[...ctx.place.objects].filter((o) => o.audio)
````

#### Block 21

````text
ctx.music.now()
````

#### Block 22

````text
setup
````

#### Block 23

````text
processorerror
````

#### Block 24

````text
ctx.music.play(ref, { fade, loop: true, layer, volume: 1 }) // fade in SECONDS: silent → fades in (default instant), another clip → crossfades (default 0.8), the same clip → no restart, a new volume ramps in place; loop: false plays once, then the layer clears; volume under the player's music dial; layer = a parallel stem
ctx.music.stop({ fade: 0.8, layer }) // one layer, or everything; a stopped song restarts; no seek or pause (an `audio:` row has them)
ctx.music.duck(gain, { duration }) // ALL music to gain (0..1) for duration seconds (0.2 s attack, 0.3 s release); a re-call re-anchors. No queue or playlist: a playlist crosses at `now().since >= len - 2`, `len = ctx.world.assets[ref]?.duration` (seconds)
ctx.music.now(): { ref, layer, positionMs, since, layers } | null // the same on every machine; since = un-wrapped seconds since the clip took the layer
emit("playSound", { …, refDistance, mode: "overlap" | "restart", bus, priority, follow, onPlaying }) // restart replaces this object's playing copy of that clip (a cry); another clip stacks (stopSound the old line first); overlap stacks (gunshots); bus omitted → SFX, or Music / Ambience for a music- / ambience or bed clip, a new name a group in SFX; higher priority keeps its voice under the cap; follow keeps a positioned play on the mover (its footsteps); with no position only the hook's actor hears it (onInput, update, onInteract, onTrigger*), with one everyone near; answers the soundId stopSound takes
audio: { clip, loop, gain, spatial, time, end, loopStart, loopEnd, timeAt, paused, listeners } // a clip row's transport (provisional words): `radio.audio.time = 30` seeks now (timeAt = ctx.now()); `radio.audio.paused = true` stops it on every ear and folds the playhead into time, `= false` plays on; a new clip starts at 0; the playhead on every machine is `paused ? time : time + (pitch ?? 1) * (ctx.now() - timeAt) / 1000` (a loop wraps to loopStart at loopEnd, else at the clip's end); end, loopStart, loopEnd are seconds into the file: `{ clip, time: 1.25, end: 1.75 }` is one note of a take, `{ clip, loop: true, loopStart: 32, loopEnd: 48 }` plays the intro once, then cycles the chorus; listeners: the player body ids who hear it, absent = everyone in reach (a car radio: listeners: [car.controller, ...riders])
audio: { kind: "program", script, params, gain, bus, spatial, maxDistance, paused, input, listeners } // export function setup({ ctx, out, now, roomNow, params, paused, on, input }) → { update(params, paused), dispose(), readout() }: ctx the page's one AudioContext (never close or suspend it), now its currentTime, roomNow() scripts' now(), out the voice (connect there alone); ctx.self.audio.params.x = v reaches update on every machine; readout() is its audio.readout (plain data); each change re-runs its readers: return what you draw, rounded as drawn. input: a bus ("Master" = the whole mix): setup gets its sound as input; what reaches out replaces it: input.connect(lowpass).connect(out) is under water. listeners as on a clip row
audioLevel, audioSpectrum(x) // from builtin/tsl, in a material or a look (→looks): the sound this player hears (music and world sounds), each 0..1, the loudness and the band at x from 0 (20 Hz) to 1 (20 kHz); a visualiser's bar is step(uv().y, audioSpectrum(uv().x)), a glow on the beat emissive.mul(audioLevel); the picture redraws as the music moves
ctx.place.acoustics.reverb: 0..1 // the place's tail (0 dry, the default); a spatial voice loses highs with distance before volume; a door leaks the far room's tail
ctx.place.listenerEntity = id | null // the ear rides that entity; default the camera (2D or ortho: the body)
world.config.yaml audio: { gains: { Master, Music, SFX, UI, Ambience, Voice, Footsteps }, maxVoices: 32, cullBeyond: 200 } // the game's mix under the players' rail dials, and `player.gains` over it for ONE player (null clears); a true-peak limiter rides it, so loudness is authored in gain
````


### After clicking "read → video Trailers, gameplay clips, time-lapses, cutscenes, talking portraits."

- H3: A film of this world
- H3: A scene made on MiniMax H3
- H3: A conjured scene
- H3: A still that sings

A film is the road only when the creator asks for one; a scene the world can play live is scripted in the world. A film OF THIS WORLD (a trailer, a gameplay clip, a walkthrough) is filmed on a box with a GPU; a scene that is not this world is made with jayzee video, or conjured by its path when it runs under 5 seconds or loops. Such a scene plays in a Jayzee world you place it in: the one it is for, never a guess; else ask them which. Hand over its file or address only if it is about a Jayzee game, this one's story and characters too, whatever use they say. A record button is ui.js code (getDisplayMedia, →game-ui), never a film.

getDisplayMedia

The bar: a clip is a scene the game earns, never a screen it hides behind. A trailer is several shots of real play, each close where its move lands. A cutscene plays once at its cue with the world warm behind it. A backdrop cycles without a seam. A speaking portrait says its one line and hands the screen back.

A film of this world

jayzee gpu takes a box and prints ssh gpu: GPU google-chrome, ffmpeg with h264_nvenc, xdotool and Playwright:

jayzee gpu

ssh gpu

google-chrome

ssh gpu 'google-chrome --kiosk "$SPAWN_WORLD_URL" >/dev/null 2>&1 & sleep 20; node play.js & spawn-film 22 take.mp4; spawn-film 22 close.mp4 --camera cam.js' cd /workspace/gpu && ffmpeg -y -i take.mp4 -i close.mp4 -lavfi concat=n=2:a=1 -pix_fmt yuv420p -movflags +faststart trailer.mp4 && jayzee upload trailer.mp4

Each take opens the running game in its own browser as a nameless player; your body's page films nothing and draws only for a picture. Your script on the box plays the take's page: a shot brings the player to a thing the game does and plays the move at its target. A test flag or autopilot is not play. A film saves nothing: a flag, key, camera, scene or prop placed for the shoot runs for every player, and the room's players are real: the take's player moves by play alone. A page take of unpublished work goes up with the next publish, so film an update's trailer first.

--camera cam.js flies a camera script (update(ctx, dt) over ctx.self, the camera rig's ctx.self.target your player) over your script's page, with no HUD; it and a prop it ctx.spawns stay on that page. A camera behind your player facing the nearest foe (query) frames the move and its hit; the page's cursor ray and aim axes are its, so the foe sits under a centred mouse and, where the game walks by the aim, forward walks at it. A foe underfoot or underground spins the camera: hold its heading there. spawn-film @v1 @v4 @v9 2 lapse.mp4 --camera cam.js films each version (jayzee versions inspect) into one clip, its camera moving on. See each take's frame sheet before the cut: black or loading, wait longer; a camera spinning or inside a thing, film again. The creator hears what the clip shows and its address, for a <video src> in ui.js or a face's material.texture.

--camera cam.js

spawn-film @v1 @v4 @v9 2 lapse.mp4 --camera cam.js

jayzee versions inspect

<video src>

material.texture

The game's page and box play a trailer first, silent and looping (a device set to less motion or less data shows a still with a play button): offer one for the page at hand-over; one asked for the page goes there when done. jayzee publish set_trailer --video trailer.mp4 puts it there. See every frame of a clip the creator uploaded; one a stranger should not meet stays off the shelf, the reason said.

jayzee publish set_trailer --video trailer.mp4

A scene made on MiniMax H3

What they hand or name, a photo, clip, dance or game, is the thing itself: look it up first, never memory or old art. jayzee video "<what happens>" makes a 5 to 15 second scene with its own sound on MiniMax H3 and prints its address. --image <still> makes a painted or uploaded still its first frame and its shape, --end <still> its last; --seconds the length (5 by default), --aspect a word scene's frame (16x9 by default). --show <name> prints what a clip was made with.

jayzee video "<what happens>"

--image <still>

--end <still>

--seconds

--aspect

--show <name>

Game code asks one with await ctx.awaitJob(ctx.job("video:generate", { prompt, seconds, aspect })) on the world's fuel.

await ctx.awaitJob(ctx.job("video:generate", { prompt, seconds, aspect }))

A conjured scene

/cdn/<scene>.mp4 renders the slug's words. /cdn/<still>.png.<action>.mp4 brings a still to life: the still its first frame, the action slug its motion. -saying-<line> in the slug is the spoken line, voiced with the picture. An action ending -loop is seam-cut to cycle, video only; a loop's sound is an sfx-…-loop.mp3 through the engine's audio.

/cdn/<scene>.mp4

/cdn/<still>.png.<action>.mp4

-saying-<line>

sfx-…-loop.mp3

The slug says its length in plain words (-12-seconds, -a-quick-3-second-flash), made to the nearest of 1 to 15 seconds, a loop's at most 9; unnamed, about 6, a loop 2.5 to 6. .aspect-<w>x<h> right before .mp4 is the frame, one of 16x9 9x16 1x1 4x3 3x4 3x2 2x3 21x9 3x1; a slug without it is 16x9, a still its own shape.

-12-seconds

-a-quick-3-second-flash

.aspect-<w>x<h>

16x9 9x16 1x1 4x3 3x4 3x2 2x3 21x9 3x1

<!-- ui.js render() --> <video src="/cdn/value.<sha>.png.gravely-saying-the-crown-is-yours-for-9-seconds.aspect-9x16.mp4" poster="/cdn/value.<sha>.png" playsinline style="width:100%"></video> <video src="/cdn/banner-clouds-drifting-4-second-loop.aspect-3x1.mp4" loop muted autoplay playsinline style="width:100%"></video>

A <scene>.mp4 has no still, so a painted picture is its poster, shown for the minutes a first conjure takes. A cutscene's cue is a data-modal surface fired by a once-only uiEvent (→game-ui), and the rail block game-ui names stays clear under any clip.

<scene>.mp4

poster

A still that sings

A still sings or speaks a sound you have, a line of the creator's vocal or a recorded voice, lips on its time: jayzee video --image <still> --audio <sound> makes it on MiniMax H3's lip-sync model and prints its address. The clip runs as long as the sound; a sound under 5 seconds gets silence after it. A song goes a line at a time: cut each line from the vocal in your shell, jayzee upload it, make its clip, join them on the song's timing.

jayzee video --image <still> --audio <sound>

#### Block 1

````text
getDisplayMedia
````

#### Block 2

````text
spawn gpu
````

#### Block 3

````text
ssh gpu
````

#### Block 4

````text
google-chrome
````

#### Block 5

````text
ssh gpu 'google-chrome --kiosk "$SPAWN_WORLD_URL" >/dev/null 2>&1 & sleep 20; node play.js & spawn-film 22 take.mp4; spawn-film 22 close.mp4 --camera cam.js'
cd /workspace/gpu && ffmpeg -y -i take.mp4 -i close.mp4 -lavfi concat=n=2:a=1 -pix_fmt yuv420p -movflags +faststart trailer.mp4 && spawn upload trailer.mp4
````

#### Block 6

````text
--camera cam.js
````

#### Block 7

````text
spawn-film @v1 @v4 @v9 2 lapse.mp4 --camera cam.js
````

#### Block 8

````text
spawn versions inspect
````

#### Block 9

````text
<video src>
````

#### Block 10

````text
material.texture
````

#### Block 11

````text
spawn publish set_trailer --video trailer.mp4
````

#### Block 12

````text
spawn video "<what happens>"
````

#### Block 13

````text
--image <still>
````

#### Block 14

````text
--end <still>
````

#### Block 15

````text
--seconds
````

#### Block 16

````text
--aspect
````

#### Block 17

````text
--show <name>
````

#### Block 18

````text
await ctx.awaitJob(ctx.job("video:generate", { prompt, seconds, aspect }))
````

#### Block 19

````text
/cdn/<scene>.mp4
````

#### Block 20

````text
/cdn/<still>.png.<action>.mp4
````

#### Block 21

````text
-saying-<line>
````

#### Block 22

````text
sfx-…-loop.mp3
````

#### Block 23

````text
-12-seconds
````

#### Block 24

````text
-a-quick-3-second-flash
````

#### Block 25

````text
.aspect-<w>x<h>
````

#### Block 26

````text
16x9 9x16 1x1 4x3 3x4 3x2 2x3 21x9 3x1
````

#### Block 27

````text
<!-- ui.js render() -->
<video src="/cdn/value.<sha>.png.gravely-saying-the-crown-is-yours-for-9-seconds.aspect-9x16.mp4" poster="/cdn/value.<sha>.png" playsinline style="width:100%"></video>
<video src="/cdn/banner-clouds-drifting-4-second-loop.aspect-3x1.mp4" loop muted autoplay playsinline style="width:100%"></video>
````

#### Block 28

````text
<scene>.mp4
````

#### Block 29

````text
poster
````

#### Block 30

````text
spawn video --image <still> --audio <sound>
````


### After clicking "headset"

A world's link opens flat in a headset's browser, with no way into VR on the page, and nothing in a world's scripts or config changes that. In a <headset> world only the player's head moves the camera, and both hands are in the world.

<headset>

Each hand's grip is an onInput axis, never declared: input.axes.handLeftX/Y/Z (world metres), handLeftQx/Qy/Qz/Qw (its turn, as a rotation write takes it), handLeftTracked (1 while tracked; all eight read 0 with no headset and on every other machine), and the same eight for handRight. The turn: −Z runs through the fist past the thumb (a sword's blade, a bow's riser), X through the palm.

input.axes.handLeftX/Y/Z

handLeftQx/Qy/Qz/Qw

handLeftTracked

handRight

The hands' buttons are one standard pad, bound with gamepad: on an action: lt / rt the triggers (a bare hand's pinch), lb / rb the grips (a bare hand's fist), a b on the right hand, x y on the left. The left stick walks (moveX / moveZ), the right stick turns. The right hand points: its trigger is also the mouse's left button along its ray (getInputRay), and presses a ui panel's <button> in the world or on the HUD.

moveX

moveZ

<button>

#### Block 1

````text
<headset>
````

#### Block 2

````text
input.axes.handLeftX/Y/Z
````

#### Block 3

````text
handLeftQx/Qy/Qz/Qw
````

#### Block 4

````text
handLeftTracked
````

#### Block 5

````text
handRight
````

#### Block 6

````text
moveX
````

#### Block 7

````text
moveZ
````

#### Block 8

````text
<button>
````


### After clicking "read → rooms-and-matchmaking Invites, parties, matches, player caps."

Meeting is Jayzee's, the same in every game: the door picks the room (main, the one room nearly every game needs: a room holds nearly unlimited players), and a friend arrives through Jayzee's invite, a portal, a party's portal together. So a game builds no lobby, no room code, no match list or queue, and mints no invite link: its Invite and Share buttons open Jayzee's on the player's press, ctx.emit("openInvite", {}) and ctx.emit("openShare", {}) (the game's link: a phone's share sheet, a computer's copy); a party or guild invite from the game's own panel is the inviting player's act (→social); a map or mode pick before play is a pad or a doorway in the world (→game-ui). The game's own is the match inside its room: sides (a party is a ready-made team: player.party), rounds, a ready-up and a countdown, the referee in sim.js (the match's phase, roster, score and winner), spectating, a scoreboard, and a copy of a place per group or per player (instance) when the fiction wants its own arena. When a match has a size, routing.maxPlayers is the whole matchmaker: the door fills rooms of that size and opens the next; pickRoom is for a placement rule the door cannot guess (a region, a mode), never a lobby.

portal together

ctx.emit("openInvite", {})

ctx.emit("openShare", {})

player.party

routing.maxPlayers

// scripts/routing.js: a file you write; world.config.yaml: routing: { script: scripts/routing.js, maxPlayers: 20 }. import { mostFullWithSpace, nextRoomName } from "builtin/room-routing"; export async function pickRoom(ctx) { const requested = ctx.requestedRoomId; // the room Jayzee's invite, portal or link names; return it even before it exists: the first arrival creates it if (requested && !ctx.rejectedRooms.includes(requested)) return requested; return mostFullWithSpace(ctx) ?? nextRoomName(ctx.rooms, ctx.rejectedRooms); }

# places/arena/config.yaml: a template you write for the game's own arena: `instance: party` opens a copy for the players standing at the door when the first steps through (`solo` = a copy per player); `persistence: ephemeral`: the copy dies with its last player (`session` keeps it ten minutes after it empties; `persistent` keeps a solo copy for its player across rooms, as they left it), the player's durables do not. The match-manager stands in the template's scene (places/arena/cells/x0z0.scene, state { phase: waiting, roster: {} }) and is born with every copy. instance: party persistence: ephemeral

// scripts/player.js: the game's own door into its arena: a trigger, a press, a countdown's end. sendAction lands in the CONTROLLED entity's onInput, never in a manager's. export function onInput(ctx, input) { if (input.pressed["enter-arena"]) { const out = ctx.cross(ctx.self, "+arena"); // the copy this player or their group is or was in, else a fresh one: ctx.self.place names it; delete ctx.world.places[name] ends it if (!out.crossed) return ctx.emit("uiEvent", { name: "refused", payload: { message: "Couldn't open the arena: try again" } }); // refused, nothing left behind; ui.js draws the message } if (input.pressed["start-round"]) { const mgr = ctx.place.objects["match-manager"]; if (mgr && ctx.place.owner === ctx.self.id) mgr.state.phase = "playing"; // one writer per fact: the manager's state, through its handle } }

Routing on is the routing block; maxPlayers is ONE cap for every room of the game, enforced at the door (unset = no door, every body admitted; the pick's fill reads 20): party size is your roster, not the cap. The door counts BODIES: every player, an inhabitant agent's body included; Cleetus's helper body and a wisp's never take a slot: size the cap for players alone. A room keeps what happens in it (routing.persistence: "persistent", the default): each room your rule names has its own world.state, clock and RNG; main alone is the world's shared default; session keeps it one room-life, from the first arrival until the room has stood empty a while; ephemeral drops it with the last player.

routing.persistence: "persistent"

pickRoom is not a behavior: no world, no database; it imports builtin/room-routing and its own tree's files, async allowed. It returns a room name: lowercase letters, digits, _ and -, up to 64 characters. null, a throw or a bad name fall back (the player's last active room with space, else the world's own room). A full room refuses the join and the pick runs again with that room in ctx.rejectedRooms; the player reads "room full" only when your rule names a room that already refused.

_

ctx.rejectedRooms

One world, many rooms: a Write, an Edit or a run_script changes the one tree every room boots from; a behavior's spawn/destroy touches its own room only. "Clear the arena" saved as an edit from a match room empties every room, permanently: edit the authored world from the build room. What survives is ownership: the player's durables (prizes, inventory, progression) persist from any room, an ephemeral boss room too: player.state, a key per room under it when rooms differ; the room's transients (arena state, live scores, leftover golems) are the room's. ctx.rooms[].metadata is telemetry, never game data. jayzee room reset <name> empties a room's transients: every runtime-placed thing dies, every moved thing returns to its tree pose, everyone in it rejoins within a second: reset main after a test.

ctx.rooms[].metadata

jayzee room reset <name>

Room-wide match state has ONE writer: the manager in the match place; a second referee repairing it from another place builds ping-pong. A state write on a ctx.world.players row lands on that player in any place (whole top-level keys: row.state.queueMatch = { place, role }, never a nested fragment); getObject(them) is null from another place AND when they left: branch on the row's .place first; what both sides must read (rosters, phase) lives on an audience: "all" bulletin object. A clock that must outlive an emptied place is handed to the destination manager on arrival. routing.maxPlayers is shared by every copy in the room: size it to matches × match size + lobby headroom; past one room's capacity, per-match rooms by name are the next rung. policy.admits runs IN the copy: ctx.place.owner its host (null while no copy stands), entity the arrival: admits(ctx, e) { return e.id === ctx.place.owner || ctx.place.players.length < 8 }.

row.state.queueMatch = { place, role }

getObject(them)

policy.admits

ctx.place.owner

admits(ctx, e) { return e.id === ctx.place.owner || ctx.place.players.length < 8 }

Physics your script steps itself, as a rollback or predicted mover does, runs in its own createWorld() world, the first argument of every builtin/physics read.

createWorld()

A world boss and its bar, a stage, or a zone circle that every player must see uses audience: "all" on its row.

A world that keeps going while nobody is on (a farm producing overnight, a shop restocking, a town clock) is routing.alwaysOn: true (world.config.yaml or ctx.world.routing; off by default), and the word buys a visit, never a server that stays up: every 15 minutes, for 24 hours after the last player left, Jayzee's own machine opens the room once, runs the crons owed since the last visit (each missed slot once, in order), ticks sim.js with the whole gap since its last run on the first tick's ctx.gapMs, fires the due ctx.after rows, saves and leaves; between visits nothing runs, and a player's return runs the world live again. Offline progress is arithmetic at the visit: state.gold += ratePerMs * ctx.gapMs in tick, or a cron that reads ctx.now() (continuous across the sleep) against the stamp it keeps in world.state and pays the difference: right whether it fires once or for every slot it owes; a ctx.sql read in tick or a cron costs one call per visit. A singleplayer world is not visited: the time nobody watched arrives on its player's next open as the same ctx.gapMs. Tell the creator: it catches up every 15 minutes for a day after the last player, live again when someone is back.

routing.alwaysOn: true

state.gold += ratePerMs * ctx.gapMs

Porting a multiplayer game: adapt its rules to the game API. Move the hero with ctx.self.velocity in onInput/update, put enemy movement in its behavior, and write hits to the target's state. Carry over speeds, accelerations, dash and swing timings, wave rules, scoring, and data tables as scripts/lib/data/*.yml rows. Jayzee has no server-authoritative movement or custom networking code; coins or a bag a cheater must not edit are platformState keys →platform-systems.

scripts/lib/data/*.yml

platformState

pickRoom(ctx): roomName // runs at each join, build included, before any room is dialed; a fresh account always picks; ctx = { player: { userId, username, isGuest, lastRoom: { roomId, isActive } | null, region }, rooms: [{ roomId, playerCount, maxPlayers, status, mode, lastHeartbeatAt, createdAt, metadata }], requestedRoomId, game: { appId, variantId, roomMode }, rejectedRooms }: active rooms only; region: where the player connects from (player.region in the room), wnam enam (North America) weur eeur (Europe) sam me afr apac oc, or null ctx.getRoomId(): string // this room's name, what pickRoom returned ("main", "room-2"); a behavior and ui.js read it alike builtin/room-routing: firstOpenRoom(ctx), mostFullWithSpace(ctx), nextRoomName(ctx.rooms, exclude), roomFor(key) // requested if listed and open else fullest with space else a fresh room-{n}; fullest with space, ties to the oldest, null when every room is full; the lowest free room-{n}; a stable readable key → name ("US East 1" → "room-us-east-1") ctx.world.routing = { script, maxPlayers, persistence, alwaysOn } | null // = { maxPlayers: 8 } alone caps the door; alwaysOn: true buys the visits above; null turns routing off player.spectating = true | false // an eliminated player watches: the body vanishes from every eye and collides with nothing, its player slot stays, no input reaches it; = false or the player's own press re-mounts it where it stands: move it to the next round yourself. The referee writes it on a ctx.place.players row; a player's own behavior on ctx.self. cross(entity, "+<place>", { createIfMissing: { persistence: "ephemeral" | "session" | "persistent", instance, objects, terrain, atmosphere, … } }): { crossed: true } | { crossed: "departing", link } | { crossed: false, verdict } // read the entity's .place to find where it stands; mints the place when the link names one the tree lacks: its own keys plus persistence: `instance` among them, the door's word from then on (read off the tree's places and persistent creates); a place that stands is entered as it is; refused = nothing created, nothing in flight cross(entity, "world:" + ctx.world.id + "/room:" + name, { createIfMissing: { params, state } }) // another room of THIS world, never the id as a literal: a copy of the game keeps working; a fresh room starts on terrain.params and world.state, a kept room ignores them

#### Block 1

````text
portal together
````

#### Block 2

````text
ctx.emit("openInvite", {})
````

#### Block 3

````text
ctx.emit("openShare", {})
````

#### Block 4

````text
player.party
````

#### Block 5

````text
routing.maxPlayers
````

#### Block 6

````text
// scripts/routing.js: a file you write; world.config.yaml: routing: { script: scripts/routing.js, maxPlayers: 20 }.
import { mostFullWithSpace, nextRoomName } from "builtin/room-routing";

export async function pickRoom(ctx) {
  const requested = ctx.requestedRoomId; // the room Spawn's invite, portal or link names; return it even before it exists: the first arrival creates it
  if (requested && !ctx.rejectedRooms.includes(requested)) return requested;
  return mostFullWithSpace(ctx) ?? nextRoomName(ctx.rooms, ctx.rejectedRooms);
}
````

#### Block 7

````text
# places/arena/config.yaml: a template you write for the game's own arena: `instance: party` opens a copy for the players standing at the door when the first steps through (`solo` = a copy per player); `persistence: ephemeral`: the copy dies with its last player (`session` keeps it ten minutes after it empties; `persistent` keeps a solo copy for its player across rooms, as they left it), the player's durables do not. The match-manager stands in the template's scene (places/arena/cells/x0z0.scene, state { phase: waiting, roster: {} }) and is born with every copy.
instance: party
persistence: ephemeral
````

#### Block 8

````text
// scripts/player.js: the game's own door into its arena: a trigger, a press, a countdown's end. sendAction lands in the CONTROLLED entity's onInput, never in a manager's.
export function onInput(ctx, input) {
  if (input.pressed["enter-arena"]) {
    const out = ctx.cross(ctx.self, "+arena"); // the copy this player or their group is or was in, else a fresh one: ctx.self.place names it; delete ctx.world.places[name] ends it
    if (!out.crossed) return ctx.emit("uiEvent", { name: "refused", payload: { message: "Couldn't open the arena: try again" } }); // refused, nothing left behind; ui.js draws the message
  }
  if (input.pressed["start-round"]) {
    const mgr = ctx.place.objects["match-manager"];
    if (mgr && ctx.place.owner === ctx.self.id) mgr.state.phase = "playing"; // one writer per fact: the manager's state, through its handle
  }
}
````

#### Block 9

````text
routing.persistence: "persistent"
````

#### Block 10

````text
_
````

#### Block 11

````text
ctx.rejectedRooms
````

#### Block 12

````text
ctx.rooms[].metadata
````

#### Block 13

````text
spawn room reset <name>
````

#### Block 14

````text
row.state.queueMatch = { place, role }
````

#### Block 15

````text
getObject(them)
````

#### Block 16

````text
policy.admits
````

#### Block 17

````text
ctx.place.owner
````

#### Block 18

````text
admits(ctx, e) { return e.id === ctx.place.owner || ctx.place.players.length < 8 }
````

#### Block 19

````text
createWorld()
````

#### Block 20

````text
routing.alwaysOn: true
````

#### Block 21

````text
state.gold += ratePerMs * ctx.gapMs
````

#### Block 22

````text
scripts/lib/data/*.yml
````

#### Block 23

````text
platformState
````

#### Block 24

````text
pickRoom(ctx): roomName // runs at each join, build included, before any room is dialed; a fresh account always picks; ctx = { player: { userId, username, isGuest, lastRoom: { roomId, isActive } | null, region }, rooms: [{ roomId, playerCount, maxPlayers, status, mode, lastHeartbeatAt, createdAt, metadata }], requestedRoomId, game: { appId, variantId, roomMode }, rejectedRooms }: active rooms only; region: where the player connects from (player.region in the room), wnam enam (North America) weur eeur (Europe) sam me afr apac oc, or null
ctx.getRoomId(): string // this room's name, what pickRoom returned ("main", "room-2"); a behavior and ui.js read it alike
builtin/room-routing: firstOpenRoom(ctx), mostFullWithSpace(ctx), nextRoomName(ctx.rooms, exclude), roomFor(key) // requested if listed and open else fullest with space else a fresh room-{n}; fullest with space, ties to the oldest, null when every room is full; the lowest free room-{n}; a stable readable key → name ("US East 1" → "room-us-east-1")
ctx.world.routing = { script, maxPlayers, persistence, alwaysOn } | null // = { maxPlayers: 8 } alone caps the door; alwaysOn: true buys the visits above; null turns routing off
player.spectating = true | false // an eliminated player watches: the body vanishes from every eye and collides with nothing, its player slot stays, no input reaches it; = false or the player's own press re-mounts it where it stands: move it to the next round yourself. The referee writes it on a ctx.place.players row; a player's own behavior on ctx.self.
cross(entity, "+<place>", { createIfMissing: { persistence: "ephemeral" | "session" | "persistent", instance, objects, terrain, atmosphere, … } }): { crossed: true } | { crossed: "departing", link } | { crossed: false, verdict } // read the entity's .place to find where it stands; mints the place when the link names one the tree lacks: its own keys plus persistence: `instance` among them, the door's word from then on (read off the tree's places and persistent creates); a place that stands is entered as it is; refused = nothing created, nothing in flight
cross(entity, "world:" + ctx.world.id + "/room:" + name, { createIfMissing: { params, state } }) // another room of THIS world, never the id as a literal: a copy of the game keeps working; a fresh room starts on terrain.params and world.state, a kept room ignores them
````


### After clicking "read → social World chat as code: channels, nameplates, earshot, letters between players."

Jayzee draws the chat (tabs, composer, say, whispers, party, guild, messages), and a world reaches into it as code: chat: scripts/chat.js in world.config.yaml names your file whose exports are the world's channels and its nametags (below). Say is the game's one chat, read in every room. A game has no chat of its own: a box it draws posts and reads Jayzee's through chat:send and chat:history.

chat: scripts/chat.js

Voice is Jayzee's too (joined by pressing the game chat's mic; then spatial over earshot, a ring on the talking head (player.talking), open mic until a player picks push to talk in Jayzee's mic menu: hold V, or the mic on a phone; a world that binds V in inputs keeps V). Voice rings no ear or onSay: a game hears spoken words with SpeechRecognition in ui.js (→game-ui).

player.talking

// scripts/chat.js: yours. Pure code over the rows of p and the reader ctx.self (state.*, place, party, guild), no calls. export const scopes = { trade: { in: (ctx, p) => true, post: (ctx, p) => p.state.level >= 10, slow: 10, waits: true }, officers: { in: (ctx, p) => p.guild !== null && p.guild.rank !== "member", post: (ctx, p) => true }, zone: { in: (ctx, p) => p.state.zone === ctx.self.state.zone }, }; export const character = "name"; // the player.state row the nametag shows: Name (@handle) export const profile = ["level", "class"]; // up to four player.state rows, one dim line under the name

in says who is in the channel and sees its tab, post who of them may write; slow = seconds between a person's lines; waits: true keeps lines for an absent player. p.place === ctx.self.place keeps a scope's lines in one copy: a reader sees a line from anywhere when in holds for them and for its speaker as it spoke. voice: true makes it a voice room too: those in it hear each other anywhere in their room, those who may post speak, others within earshot hear them. A throwing predicate shuts that player out, named once in the runtime log.

waits: true

p.place === ctx.self.place

voice: true

A game hears a line as onSay(ctx, line), on the speaker's body's behavior (the player template's), else the place's sim.js, else the world's: a /duel command, a password, a log. It cannot veto: post is the gate.

onSay(ctx, line)

The world speaks with ctx.emit("say", { text, scope }): its own line in that scope (omitted = say, from where this entity stands), drawn as the world's; it rings no ear.

ctx.emit("say", { text, scope })

A chat box or a team channel a creator asks for is a scope: its name and rules theirs, the rest Jayzee's.

A game presses Jayzee's party and guild words where ctx.self is your player, judged as the card's: ctx.emit("partyAdd", { player }) asks a friend, who joins by Jayzee's card or their press's partyJoin { player } until partyCancel { player } takes it back; partyLeave leaves yours; guildAdd, guildKick, guildRank { player, rank } land at once; the outcome is player.party / player.guild (jayzee api ActPayloads). A person makes or finds a guild on spawn.co/guilds, never a game.

ctx.emit("partyAdd", { player })

partyJoin { player }

partyCancel { player }

guildRank { player, rank }

jayzee api ActPayloads

// scripts/player.js: yours export function update(ctx) { if (!ctx.self.isLocal || ctx.now() < ctx.session.next) return; ctx.session.next = ctx.now() + 2000; ctx.job("chat:history", { scope: "say" }, (r) => r.ok && (ctx.session.board = r.data.lines)); } // scripts/ui.js: the board const esc = (s) => new Option(s).innerHTML; export default (ctx) => (ctx.session.board ?? []).map((l) => `<p>${esc(l.by?.displayName ?? "")} ${esc(l.text)}</p>`).join("");

A letter from one player to another (clan mail, a note for a friend) is Jayzee's message: Jayzee keeps it (moderated, read by the receiver's bell), and the game's own mailbox shows player.mail and stores nothing. Your own body is no signed-in person: a letter or a chat line from it is refused, and a letter to it never arrives. Your tester (spawn client join --tester 1) is one, so a test letter leaves from its page.

player.mail

spawn client join --tester 1

# world.config.yaml: the two actions the mailbox sends inputs: actions: sendLetter: {} readLetter: {}

// scripts/player.js: the sender is this player, never an argument export function onInput(ctx, input) { if (input.pressed.sendLetter) { const ask = input.actionData.sendLetter; ctx.job("mail:send", { to: ask.to, topic: ask.topic, text: ask.text }, "onMailSent", { to: ask.to }); } if (input.pressed.readLetter) { const row = ctx.self.mail.find((m) => m.id === input.actionData.readLetter.id); if (row && !row.read) row.read = true; // Jayzee keeps the mark across games } } export function onMailSent(ctx, result, payload) { ctx.self.state.lastLetter = result.ok ? `sent to ${payload.to}` : `not sent: ${result.error.message}`; }

// scripts/ui.js: the mailbox re-renders when a letter lands export default function render(ctx, player) { const rows = (player.mail ?? []).map((m) => `<div data-interactive onclick="sendAction('readLetter', { id: '${m.id}' })">${m.from.displayName} · ${m.topic}: ${m.text}</div>`).join(""); return `${rows}<form data-interactive onsubmit="event.preventDefault(); const f = event.target; sendAction('sendLetter', { to: f.to.value.trim(), topic: 'clan', text: f.text.value.trim() })"><input name="to" placeholder="@handle" /><input name="text" maxlength="200" /><button>Send</button></form>${player.state.lastLetter ?? ""}`; }

ctx.job("chat:send", { text, scope }, "onChatSent", payload) // from the player's own body: text as typed (≤ 200 chars beside a slash word), slash words and moderation as in Jayzee's box; scope "say" (omitted), a chat.js scope's name, "party", "guild" or "@handle"; data { scope, at } ctx.job("chat:history", { scope }, "onHistory") // from the player's own body: one channel ("say" or a chat.js scope's name) as the player's panel shows it; data { lines }, its last 50, each onSay's line with by { userId, displayName }, null for the world's ctx.job("mail:send", { to, topic, text }, "onMailSent", payload) // from the sender's own body (onInput); to = "@handle" or a Jayzee id (player.userId, pa_…); topic 1–32 chars; text 1–200 chars; the callback gets { ok: true, data: { id, at } } or { ok: false, error: { code, message } }: the codes are the job's doc (jayzee api ObjectAPI, job); message is Jayzee's sentence, show it or your own player.mail // ctx.self.mail in the body's script and ui.js player.mail: this player's letters through this world, newest first: { id, from: { userId, displayName }, to: { userId, displayName }, topic, text, at, read, retracted }; row.read = true on ctx.self.mail marks it read (ui.js rows are a copy: send an action); [] on every other machine player.friends // ctx.self.friends in the body's script and ui.js player.friends: this player's Jayzee friends: { userId, displayName, portraitUrl }; read-only, [] on every other machine; userId is that friend's player.userId everywhere await ctx.presence(ids) // where friends of this player stand now, for a party or guild the game formed, so a press crosses a player to a teammate; asked on the player's machine: [{ userId, world, room }] in the asked order; world = their world's ctx.world.id, room = its ctx.getRoomId(); both null while offline or not this player's friend; both undefined until an answer arrives (the first frames, or always where no player of its own stands); cross only where r.world is a string; ids = userIds or player.friends rows. Which friends are online, and a join to each, are Jayzee's (its friends list and portal), never a world's list chat: script // world.config.yaml: "scripts/chat.js", yours; absent, chat is say alone earshot: 40 // world.config.yaml: metres a voice carries, and above ten players a said line's bubble, a nameplate and the `say` ear; with ten or fewer those three reach everyone in the speaker's place, and a voice the whole room until chat.js has a voice room; absent = 40 voiceMood: "cave" | "hall" | "open" // world.config.yaml: the reverb every heard voice wears; absent = dry voice: false // world.config.yaml: no voice chat (a menu game); absent = on player.voice = { gain } // 0 silent to the people around, 1 full nameplates: false // world.config.yaml: hides every name over a head (hide-and-seek, horror); absent = on nametag: ui/nametag.js // world.config.yaml: the tag over a head as a render function, the shape ui.js has: export default function (ctx, tag) { return html }; tag = { id, name, handle, face, said, named, earshot, talking, muted, mutual, dnd, agent, doing, hot, party, guild, ring, opacity, depth, distance }; named is false over every person for a viewer in streamer mode; tag.id is the body under the tag, and "" draws no tag over it: ctx.getObject(tag.id)?.state.<key> ? "" : html hides one player's tag, drawn again when that key moves; absent = the engine's own onSay(ctx, line) // line = { text, scope, by: the speaker's player handle, kind, at, nonce, picture?: SharedPicture }; paint picture.url, never a copy say // ears.say = (ctx, line) => … onSay's line; rings every entity within earshot: a shopkeeper answers "buy"

#### Block 1

````text
chat: scripts/chat.js
````

#### Block 2

````text
player.talking
````

#### Block 3

````text
// scripts/chat.js: yours. Pure code over the rows of p and the reader ctx.self (state.*, place, party, guild), no calls.
export const scopes = {
  trade: { in: (ctx, p) => true, post: (ctx, p) => p.state.level >= 10, slow: 10, waits: true },
  officers: { in: (ctx, p) => p.guild !== null && p.guild.rank !== "member", post: (ctx, p) => true },
  zone: { in: (ctx, p) => p.state.zone === ctx.self.state.zone },
};
export const character = "name"; // the player.state row the nametag shows: Name (@handle)
export const profile = ["level", "class"]; // up to four player.state rows, one dim line under the name
````

#### Block 4

````text
waits: true
````

#### Block 5

````text
p.place === ctx.self.place
````

#### Block 6

````text
voice: true
````

#### Block 7

````text
onSay(ctx, line)
````

#### Block 8

````text
ctx.emit("say", { text, scope })
````

#### Block 9

````text
ctx.emit("partyAdd", { player })
````

#### Block 10

````text
partyJoin { player }
````

#### Block 11

````text
partyCancel { player }
````

#### Block 12

````text
guildRank { player, rank }
````

#### Block 13

````text
spawn api ActPayloads
````

#### Block 14

````text
// scripts/player.js: yours
export function update(ctx) {
  if (!ctx.self.isLocal || ctx.now() < ctx.session.next) return;
  ctx.session.next = ctx.now() + 2000;
  ctx.job("chat:history", { scope: "say" }, (r) => r.ok && (ctx.session.board = r.data.lines));
}
// scripts/ui.js: the board
const esc = (s) => new Option(s).innerHTML;
export default (ctx) => (ctx.session.board ?? []).map((l) => `<p>${esc(l.by?.displayName ?? "")} ${esc(l.text)}</p>`).join("");
````

#### Block 15

````text
player.mail
````

#### Block 16

````text
spawn client join --tester 1
````

#### Block 17

````text
# world.config.yaml: the two actions the mailbox sends
inputs:
  actions:
    sendLetter: {}
    readLetter: {}
````

#### Block 18

````text
// scripts/player.js: the sender is this player, never an argument
export function onInput(ctx, input) {
  if (input.pressed.sendLetter) {
    const ask = input.actionData.sendLetter;
    ctx.job("mail:send", { to: ask.to, topic: ask.topic, text: ask.text }, "onMailSent", { to: ask.to });
  }
  if (input.pressed.readLetter) {
    const row = ctx.self.mail.find((m) => m.id === input.actionData.readLetter.id);
    if (row && !row.read) row.read = true; // Spawn keeps the mark across games
  }
}
export function onMailSent(ctx, result, payload) {
  ctx.self.state.lastLetter = result.ok ? `sent to ${payload.to}` : `not sent: ${result.error.message}`;
}
````

#### Block 19

````text
// scripts/ui.js: the mailbox re-renders when a letter lands
export default function render(ctx, player) {
  const rows = (player.mail ?? []).map((m) => `<div data-interactive onclick="sendAction('readLetter', { id: '${m.id}' })">${m.from.displayName} · ${m.topic}: ${m.text}</div>`).join("");
  return `${rows}<form data-interactive onsubmit="event.preventDefault(); const f = event.target; sendAction('sendLetter', { to: f.to.value.trim(), topic: 'clan', text: f.text.value.trim() })"><input name="to" placeholder="@handle" /><input name="text" maxlength="200" /><button>Send</button></form>${player.state.lastLetter ?? ""}`;
}
````

#### Block 20

````text
ctx.job("chat:send", { text, scope }, "onChatSent", payload) // from the player's own body: text as typed (≤ 200 chars beside a slash word), slash words and moderation as in Spawn's box; scope "say" (omitted), a chat.js scope's name, "party", "guild" or "@handle"; data { scope, at }
ctx.job("chat:history", { scope }, "onHistory") // from the player's own body: one channel ("say" or a chat.js scope's name) as the player's panel shows it; data { lines }, its last 50, each onSay's line with by { userId, displayName }, null for the world's
ctx.job("mail:send", { to, topic, text }, "onMailSent", payload) // from the sender's own body (onInput); to = "@handle" or a Spawn id (player.userId, pa_…); topic 1–32 chars; text 1–200 chars; the callback gets { ok: true, data: { id, at } } or { ok: false, error: { code, message } }: the codes are the job's doc (spawn api ObjectAPI, job); message is Spawn's sentence, show it or your own
player.mail // ctx.self.mail in the body's script and ui.js player.mail: this player's letters through this world, newest first: { id, from: { userId, displayName }, to: { userId, displayName }, topic, text, at, read, retracted }; row.read = true on ctx.self.mail marks it read (ui.js rows are a copy: send an action); [] on every other machine
player.friends // ctx.self.friends in the body's script and ui.js player.friends: this player's Spawn friends: { userId, displayName, portraitUrl }; read-only, [] on every other machine; userId is that friend's player.userId everywhere
await ctx.presence(ids) // where friends of this player stand now, for a party or guild the game formed, so a press crosses a player to a teammate; asked on the player's machine: [{ userId, world, room }] in the asked order; world = their world's ctx.world.id, room = its ctx.getRoomId(); both null while offline or not this player's friend; both undefined until an answer arrives (the first frames, or always where no player of its own stands); cross only where r.world is a string; ids = userIds or player.friends rows. Which friends are online, and a join to each, are Spawn's (its friends list and portal), never a world's list
chat: script // world.config.yaml: "scripts/chat.js", yours; absent, chat is say alone
earshot: 40 // world.config.yaml: metres a voice carries, and above ten players a said line's bubble, a nameplate and the `say` ear; with ten or fewer those three reach everyone in the speaker's place, and a voice the whole room until chat.js has a voice room; absent = 40
voiceMood: "cave" | "hall" | "open" // world.config.yaml: the reverb every heard voice wears; absent = dry
voice: false // world.config.yaml: no voice chat (a menu game); absent = on
player.voice = { gain } // 0 silent to the people around, 1 full
nameplates: false // world.config.yaml: hides every name over a head (hide-and-seek, horror); absent = on
nametag: ui/nametag.js // world.config.yaml: the tag over a head as a render function, the shape ui.js has: export default function (ctx, tag) { return html }; tag = { id, name, handle, face, said, named, earshot, talking, muted, mutual, dnd, agent, doing, hot, party, guild, ring, opacity, depth, distance }; named is false over every person for a viewer in streamer mode; tag.id is the body under the tag, and "" draws no tag over it: ctx.getObject(tag.id)?.state.<key> ? "" : html hides one player's tag, drawn again when that key moves; absent = the engine's own
onSay(ctx, line) // line = { text, scope, by: the speaker's player handle, kind, at, nonce, picture?: SharedPicture }; paint picture.url, never a copy
say // ears.say = (ctx, line) => … onSay's line; rings every entity within earshot: a shopkeeper answers "buy"
````


### After clicking "read → platform-systems Cheat-proof saves, SQL leaderboards, timers, AI text jobs, notifications."

- H2: Platform Systems

Platform Systems

Durable things (coins, a bag, XP) are player.state: back on every rejoin over the template, a dot write where the player simulates with no round trip and no save call; one tick's writes (no await between) save as one piece. Seed ONCE: player.state.run ??= {…} at the first arrival, never = … on a jayzee, which throws the save away. A fresh start ("reset my progress", NEW GAME) is player.state = {} on their row (ctx.self.state = {} in their own behavior; a ctx.world.players row from sim.js or run_script): the save empties at once and the next join stamps the template. The engine saves where a player stands. sim.js referees a claim several hands make at once (the win, the last seat). SQL answers what only a table answers (every player ever, every room: the all-time board, a gift between players), rows keyed on userId. History grows forever: boards and totals read a running summary.

player.state.run ??= {…}

player.state = {}

ctx.self.state = {}

// the pickup: the chest's hook, where it simulates; the bag is the player's row export function onTriggerEnter(ctx, player) { if (!player.tags.includes("player")) return; player.state.bag ??= {}; player.state.bag[ctx.self.state.item] = (player.state.bag[ctx.self.state.item] ?? 0) + 1; ctx.destroy(ctx.self.id); } // scripts/db.js export async function migrate(sql) { await sql`CREATE TABLE IF NOT EXISTS best (user_id TEXT PRIMARY KEY, name TEXT, score INTEGER NOT NULL)`; await sql`CREATE INDEX IF NOT EXISTS best_score ON best (score)`; } // the match's end: their summary row await ctx.sql`INSERT INTO best VALUES (@caller, ${name}, ${score}) ON CONFLICT (user_id) DO UPDATE SET name = excluded.name, score = MAX(score, excluded.score)`; // the board; the HUD renders state, never SQL ctx.world.state.allTime = (await ctx.sql`SELECT name, score FROM best ORDER BY score DESC LIMIT 10`).rows;

A board also goes to Jayzee's game page: each player's number in player.state (their best, their total), named under world.config.yaml leaderboards (jayzee api LeaderboardDef).

jayzee api LeaderboardDef

SQL runs at an event, never per tick: onArrive/onLeave (the player's machine), a player's behavior, a cron, run_script, db.js. A hook's or behavior's call publishes with the save and runs as its player; one the save lacks answers statement_not_published.

db.js

statement_not_published

A save in onLeave lands however the player left: their machine runs it at the door; when their tab dies, Jayzee's machine there runs it from the last state everyone saw, @caller bound to them; alone with no Jayzee machine there, nobody does: a game that must survive that also writes at its moment. Keep onLeave one fast call.

@caller

platformState: ["gold", "inventory"] on the player template makes these keys cheat-proof in a multiplayer world, one player's room too: no player's machine writes them, sim.js's onArrive included; yours and the creator's do. Start them in its state.

platformState: ["gold", "inventory"]

simulatedBy: "platform" on a row (a bank, a bot director; at jayzee or live) runs on Jayzee's machine, never a player's, even with nobody near. = null undials; it stops in an empty place. It can move machines: a finished onSpawn's writes are not repeated, ctx.self.session starts with what onSpawn left. Players who see it still write and destroy it. Keep no module state.

simulatedBy: "platform"

A thing one player alone sees: visibility: "owner" on a row under them (a hand: jayzee({ parent: player.id, visibility: "owner", … })) reaches their screen, live, at a join and in the saved world; visibility: "platform" (a deck), or "owner" with no player above, reaches no player. Both reach the platform, you and the creator; a platform row's ctx.random() draws the platform's entropy, never the world's seed. The platform deals: it writes the deck and the hands. Any other row or emit, audience: { player: id } included, can reach others: a secret rides a row with the word. The owner's HUD reads it by ctx.getObject(id), null elsewhere.

visibility: "owner"

jayzee({ parent: player.id, visibility: "owner", … })

visibility: "platform"

audience: { player: id }

Crons: engine.crons: [{ schedule: "/5 * * *", script: "crons/respawn.js" }] in world.config.yaml; the file exports async function cron(ctx); a minute the finest step. A one-shot is ctx.after. Crons, timers and sim.js run while someone is in; with nobody in: routing.alwaysOn →rooms-and-matchmaking.

engine.crons: [{ schedule: "/5 * * *", script: "crons/respawn.js" }]

/5

async function cron(ctx)

routing.alwaysOn

A talking, seeing, hearing character: ctx.job("llm:chat", { conversationId, system, message, media, maxHistory (20), model: "fast" | "smart" (Jayzee's models; smart: slower, stronger) | an OpenRouter id (20 asks a player an hour) }, (r) => …) → r.data.text; a fourth { onPart: (p) => … } streams it: p.text the next words, p.first a restart; "llm:generate" with schema → r.data.object; "llm:clear" forgets. media: […], that turn alone: a /cdn/… address or a data: URL. conversationId IS the memory: "npc:" + npcId + ":" + playerId per player. r: { ok, data, error: { message, code, retryAfterMs } }, never thrown; seconds pass: state.loading from submit to callback.

ctx.job("llm:chat", { conversationId, system, message, media, maxHistory (20), model: "fast" | "smart" (Jayzee's models; smart: slower, stronger) | an OpenRouter id (20 asks a player an hour) }, (r) => …)

r.data.text

{ onPart: (p) => … }

p.text

p.first

"llm:generate"

schema

r.data.object

"llm:clear"

media: […]

/cdn/…

conversationId

"npc:" + npcId + ":" + playerId

r: { ok, data, error: { message, code, retryAfterMs } }

state.loading

Words a player writes that others read (a pet's name, a board post): ctx.job("text:check", { text }, (r) => …) runs any length through chat's filter, posting nothing; r.data.ok false: show your own words. chat:send posts and checks nothing.

ctx.job("text:check", { text }, (r) => …)

r.data.ok

The outside web (a webhook): a job runs where it is asked: from a player's body, on their device. fetch(url, { method: "POST", body }) in its run reaches any public address but Jayzee's own hosts. A picture or a picture-free .glb POSTed to "/cdn/" with its content-type by a builder or Jayzee's machine stores once; clients load its location like an upload. A feed holds new WebSocket(url) in an async function* run yielding each message to the asker's onPart; ask it once from sim.js, again when it ends. A behavior or sim.js on Jayzee's machine reaches no outside address. To prove the player to a service, ctx.job("player:token", {}, (r) => …) from their body answers r.data.token, a signed JWT (sub = player.userId) verified at https://www.spawn.co/api/.well-known/jwks.json.

fetch(url, { method: "POST", body })

"/cdn/"

location

new WebSocket(url)

async function* run

ctx.job("player:token", {}, (r) => …)

r.data.token

https://www.spawn.co/api/.well-known/jwks.json

Names of players who left, by id: "player:names" from the owner's body (jayzee api job).

"player:names"

jayzee api job

ctx.notifyDm(message, { to: player, link: "+garden" }) rings their Jayzee bell and phone, playing or away, not Cleetus's chat: to a player row or its userId, link where it opens this world: a place, or a room as "world:" + ctx.world.id + "/room:" + name + "+garden". Only this world's players get it (a waitlist is Jayzee's: jayzee publish propose_covers --opensAt). A line holds 1,000 characters; a world sends a player at most 5 a UTC day, grouped and held through their night; players can mute it; a line not sent says why in getLogs. Send the moments worth coming back for, one each; notifyDmOnce takes { to } too.

ctx.notifyDm(message, { to: player, link: "+garden" })

"world:" + ctx.world.id + "/room:" + name + "+garden"

jayzee publish propose_covers --opensAt

{ to }

ctx.sql`…`: { rows, changes, lastInsertRowid } // ${v} binds string · number · boolean · null (JSON.stringify a structure; json_each reads it), never concatenate; a call from a player's machine is a round trip: a list is one call; semicolons = ordered statements in one transaction; rows [] = none, changes 0 = a guarded write refused; errors throw into getLogs; calls queue one at a time and each answers, however slow: never time one out, resend it or read it back budgets: ≤ 100 parameters a statement, ≤ 5 SELECTs joined by UNION / UNION ALL / INTERSECT / EXCEPT (one multi-row VALUES (…), (…) seeds rows, uncapped) // LIMIT big scans @caller // the player this call acts for: a player's hook or behavior, singleplayer, where a sim.js, cron or place-hook write binds it alone, else `statement_not_player_invocable`; run_script, db.js and a multiplayer cron or place hook have none: bind ${playerId} scripts/db.js: export async function migrate(sql) // before the first statement: idempotent DDL and set-based backfills; a throw never blocks play: the prior schema serves and it re-runs at the next spec version dev and live are two databases // the schema carries to live on its first call, rows do not: seed live with INSERT … ON CONFLICT DO NOTHING in migrate() money says its domain in SQL: WHERE coins >= ${amount} AND ${amount} > 0, the credit gated on the debit's changes // a negative amount pays the sender otherwise

#### Block 1

````text
player.state.run ??= {…}
````

#### Block 2

````text
player.state = {}
````

#### Block 3

````text
ctx.self.state = {}
````

#### Block 4

````text
// the pickup: the chest's hook, where it simulates; the bag is the player's row
export function onTriggerEnter(ctx, player) {
  if (!player.tags.includes("player")) return;
  player.state.bag ??= {};
  player.state.bag[ctx.self.state.item] = (player.state.bag[ctx.self.state.item] ?? 0) + 1;
  ctx.destroy(ctx.self.id);
}
// scripts/db.js
export async function migrate(sql) {
  await sql`CREATE TABLE IF NOT EXISTS best (user_id TEXT PRIMARY KEY, name TEXT, score INTEGER NOT NULL)`;
  await sql`CREATE INDEX IF NOT EXISTS best_score ON best (score)`;
}
// the match's end: their summary row
await ctx.sql`INSERT INTO best VALUES (@caller, ${name}, ${score}) ON CONFLICT (user_id) DO UPDATE SET name = excluded.name, score = MAX(score, excluded.score)`;
// the board; the HUD renders state, never SQL
ctx.world.state.allTime = (await ctx.sql`SELECT name, score FROM best ORDER BY score DESC LIMIT 10`).rows;
````

#### Block 5

````text
spawn api LeaderboardDef
````

#### Block 6

````text
db.js
````

#### Block 7

````text
statement_not_published
````

#### Block 8

````text
@caller
````

#### Block 9

````text
platformState: ["gold", "inventory"]
````

#### Block 10

````text
simulatedBy: "platform"
````

#### Block 11

````text
visibility: "owner"
````

#### Block 12

````text
spawn({ parent: player.id, visibility: "owner", … })
````

#### Block 13

````text
visibility: "platform"
````

#### Block 14

````text
audience: { player: id }
````

#### Block 15

````text
engine.crons: [{ schedule: "/5  * * *", script: "crons/respawn.js" }]
````

#### Block 16

````text
async function cron(ctx)
````

#### Block 17

````text
routing.alwaysOn
````

#### Block 18

````text
ctx.job("llm:chat", { conversationId, system, message, media, maxHistory (20), model: "fast" | "smart" (Spawn's models; smart: slower, stronger) | an OpenRouter id (20 asks a player an hour) }, (r) => …)
````

#### Block 19

````text
r.data.text
````

#### Block 20

````text
{ onPart: (p) => … }
````

#### Block 21

````text
p.text
````

#### Block 22

````text
p.first
````

#### Block 23

````text
"llm:generate"
````

#### Block 24

````text
schema
````

#### Block 25

````text
r.data.object
````

#### Block 26

````text
"llm:clear"
````

#### Block 27

````text
media: […]
````

#### Block 28

````text
/cdn/…
````

#### Block 29

````text
conversationId
````

#### Block 30

````text
"npc:" + npcId + ":" + playerId
````

#### Block 31

````text
r: { ok, data, error: { message, code, retryAfterMs } }
````

#### Block 32

````text
state.loading
````

#### Block 33

````text
ctx.job("text:check", { text }, (r) => …)
````

#### Block 34

````text
r.data.ok
````

#### Block 35

````text
fetch(url, { method: "POST", body })
````

#### Block 36

````text
"/cdn/"
````

#### Block 37

````text
location
````

#### Block 38

````text
new WebSocket(url)
````

#### Block 39

````text
async function* run
````

#### Block 40

````text
ctx.job("player:token", {}, (r) => …)
````

#### Block 41

````text
r.data.token
````

#### Block 42

````text
https://www.spawn.co/api/.well-known/jwks.json
````

#### Block 43

````text
"player:names"
````

#### Block 44

````text
spawn api job
````

#### Block 45

````text
ctx.notifyDm(message, { to: player, link: "+garden" })
````

#### Block 46

````text
"world:" + ctx.world.id + "/room:" + name + "+garden"
````

#### Block 47

````text
spawn publish propose_covers --opensAt
````

#### Block 48

````text
{ to }
````

#### Block 49

````text
ctx.sql`…`: { rows, changes, lastInsertRowid } // ${v} binds string · number · boolean · null (JSON.stringify a structure; json_each reads it), never concatenate; a call from a player's machine is a round trip: a list is one call; semicolons = ordered statements in one transaction; rows [] = none, changes 0 = a guarded write refused; errors throw into getLogs; calls queue one at a time and each answers, however slow: never time one out, resend it or read it back
budgets: ≤ 100 parameters a statement, ≤ 5 SELECTs joined by UNION / UNION ALL / INTERSECT / EXCEPT (one multi-row VALUES (…), (…) seeds rows, uncapped) // LIMIT big scans
@caller // the player this call acts for: a player's hook or behavior, singleplayer, where a sim.js, cron or place-hook write binds it alone, else `statement_not_player_invocable`; run_script, db.js and a multiplayer cron or place hook have none: bind ${playerId}
scripts/db.js: export async function migrate(sql) // before the first statement: idempotent DDL and set-based backfills; a throw never blocks play: the prior schema serves and it re-runs at the next spec version
dev and live are two databases // the schema carries to live on its first call, rows do not: seed live with INSERT … ON CONFLICT DO NOTHING in migrate()
money says its domain in SQL: WHERE coins >= ${amount} AND ${amount} > 0, the credit gated on the debit's changes // a negative amount pays the sender otherwise
````


### After clicking "read → buyables Shops and spoins."

A purchase is a moment in the game, never a form: the stall names the thing and its price in Spoins, one press on it pays, and what was bought arrives where the buyer stands. A buyable is repeatable unless once: true: one per account; the platform refuses a second.

once: true

world.config.yaml → buyables.<id>: name, description, priceSpoins (an integer up to 10000; 1 Spoin = $0.01, creators keep 50%), imageUrl (the checkout's picture: a /cdn/ address from jayzee paint or jayzee upload; else a Spoin icon), once, onPurchase (a script). ctx.proposePurchase(buyer, id) (the buyer's script or a stall's press listener for the presser) opens the platform's checkout and answers a requestId, never proof of payment; onPurchase(ctx, buyer) runs once on verified completion.

jayzee paint

ctx.proposePurchase(buyer, id)

onPurchase(ctx, buyer)

Owners and editors buy free, so the creator tests a stall by pressing it: the checkout says free, onPurchase runs and purchases records it.

purchases

What an account bought is the platform's record, on every client as player.state.purchases[buyableId] → { transactionId, at }: written by the platform alone (a script's or a client's write never saves), there on every reload and reconnect, gone when the buyer undoes it. Gate an equip, a door or an "owned" badge on it. The hook is for the moment at the buyer's feet and the look; it lands the instant the payment stands. No sql or job inside it: the purchase can still be released. A tip jar is a buyable with minSpoins (pay what you want) and no onPurchase; a thank-you in the world is an onPurchase with the moment alone.

player.state.purchases[buyableId]

{ transactionId, at }

// scripts/stall.js: the stall names its offer where the player reads it export function onSpawn(ctx) { ctx.self.state.buyable = "golden-cape"; } // the offer reads on the stall's own ui plate (→game-ui); the engine draws no prompt // scripts/buyables/grant-cape.js: once, when the money stands: the moment and the look; the record lands by itself export function onPurchase(ctx, buyer) { ctx.spawn("cape-" + buyer.id, { ...CAPE, parent: buyer.id }); ctx.emit("fx", { position: buyer.feetPosition, script: "scripts/effects/gold-glint.fx.js" }); ctx.emit("playSound", { clip: "cdn/sfx-chime-golden.mp3", position: buyer.feetPosition }); } // scripts/player.js: a rejoin dresses the body from the platform's record export function onSpawn(ctx) { if (ctx.self.state.purchases?.["golden-cape"]) ctx.spawn("cape-" + ctx.self.id, { ...CAPE, parent: ctx.self.id }); }

Selling the whole game is one once buyable that gates every level. The world still opens where players arrive, and that first place is the storefront. The creator chooses what stays free before the purchase: nothing, or a first level.

ctx.proposePurchase(buyer: str | { readonly id: str }, itemId: str): str // Propose a purchase for a buyer, subject-first: pass the buyer (an entity handle or id), then the buyable id. Returns requestId ctx.world.buyables.<id> = { name, priceSpoins, minSpoins?, imageUrl?, description?, onPurchase? } // defines or replaces, validated (the dot throws naming every bad field) ctx.world.buyables.<id>.<field> = v // one field; the record that will stand is validated whole delete ctx.world.buyables.<id> (= null removes too) ctx.world.buyables.<id> // the record (undefined when absent) Object.keys(ctx.world.buyables) / 'x' in ctx.world.buyables // the census

ctx.purchase: { buyableId, transactionId, priceSpoins, … } // inside onPurchase only player.state.purchases[buyableId] // read-only; undefined until bought no failure hook // a cancelled payment never reaches world code; one the platform cannot start toasts the buyer and leaves purchase.refused.<why> in getLogs

#### Block 1

````text
once: true
````

#### Block 2

````text
spawn paint
````

#### Block 3

````text
ctx.proposePurchase(buyer, id)
````

#### Block 4

````text
onPurchase(ctx, buyer)
````

#### Block 5

````text
purchases
````

#### Block 6

````text
player.state.purchases[buyableId]
````

#### Block 7

````text
{ transactionId, at }
````

#### Block 8

````text
// scripts/stall.js: the stall names its offer where the player reads it
export function onSpawn(ctx) {
  ctx.self.state.buyable = "golden-cape";
} // the offer reads on the stall's own ui plate (→game-ui); the engine draws no prompt
// scripts/buyables/grant-cape.js: once, when the money stands: the moment and the look; the record lands by itself
export function onPurchase(ctx, buyer) {
  ctx.spawn("cape-" + buyer.id, { ...CAPE, parent: buyer.id });
  ctx.emit("fx", { position: buyer.feetPosition, script: "scripts/effects/gold-glint.fx.js" });
  ctx.emit("playSound", { clip: "cdn/sfx-chime-golden.mp3", position: buyer.feetPosition });
}
// scripts/player.js: a rejoin dresses the body from the platform's record
export function onSpawn(ctx) {
  if (ctx.self.state.purchases?.["golden-cape"]) ctx.spawn("cape-" + ctx.self.id, { ...CAPE, parent: ctx.self.id });
}
````

#### Block 9

````text
ctx.proposePurchase(buyer: str | { readonly id: str }, itemId: str): str // Propose a purchase for a buyer, subject-first: pass the buyer (an entity handle or id), then the buyable id. Returns requestId
ctx.world.buyables.<id> = { name, priceSpoins, minSpoins?, imageUrl?, description?, onPurchase? } // defines or replaces, validated (the dot throws naming every bad field)
ctx.world.buyables.<id>.<field> = v // one field; the record that will stand is validated whole
delete ctx.world.buyables.<id> (= null removes too)
ctx.world.buyables.<id> // the record (undefined when absent)
Object.keys(ctx.world.buyables) / 'x' in ctx.world.buyables // the census
````

#### Block 10

````text
ctx.purchase: { buyableId, transactionId, priceSpoins, … } // inside onPurchase only
player.state.purchases[buyableId] // read-only; undefined until bought
no failure hook // a cancelled payment never reaches world code; one the platform cannot start toasts the buyer and leaves purchase.refused.<why> in getLogs
````


### After clicking "read → portals Doors to other places or worlds, mirrors, monitors, minimaps."

The bar: a portal is a set piece: glass cut to the doorway's own opening, an arch of this world's own stone around it, torches, runes, the far place already visible inside it and its light on this ground; you step out of the far gate facing forward onto a composed view, the gate at your back.

// jayzee: { id: "gate-east", tags: ["portal"], behavior: "scripts/gate.js", state: { link: "+cellar#gate-west" }, rotation: 90, primitive: { kind: "arch", width: 2.6, height: 3.4, depth: 0.3 }, // physics: { body: "static", trigger: true }, material: { kind: "scripted", script: "engine/portal-ember", view: { link: "+cellar#gate-west", spill: 2, sound: 1 } }, // children: [ { id: "arch", primitive: { kind: "archway", width: 3.4, height: 3.8, depth: 0.6, thickness: 0.4 }, physics: "static", material: { color: "#6b6258", roughness: 0.95 } } ] } // jayzee, in the cellar, the twin: the same with id "gate-west", rotation: 270, both links "+main#gate-east" export function onTriggerEnter(ctx, other) { ctx.cross(other, ctx.self.state.link); } export function onCross(ctx, other) { ctx.emit("playSound", { clip: "cdn/gate-chime.mp3", position: ctx.self.worldFeetPosition }); } export function onRefuse(ctx, other, verdict) { ctx.emit("uiEvent", { name: "refused", payload: { message: verdict.message } }); // ui.js draws what happened }

The glass is the opening's shape: an arch of the opening's width and height fills an archway of that profile edge to edge (frame width + 2 × thickness by height + thickness); any other doorway takes a scripted-geometry glass cut to it (→geometry). material.view paints any shape.

width + 2 × thickness

height + thickness

material.view

jayzee browse --creator <handle> (or jayzee browse "<words>") finds another creator's world, published or not, no pasted link; its address is the link, link: "@ress/cathedral +main" (the card at --address names its places). gate.destination.onlineCount counts who plays there (null until known).

jayzee browse --creator <handle>

jayzee browse "<words>"

link: "@ress/cathedral +main"

--address

gate.destination.onlineCount

#exit is the gate you step out of, written on BOTH gates. Gates come in pairs, sized alike, each facing its approach side, the way you walk out (a gate faces −Z at rotation: 0). A link naming only the place (+cellar) steps out of the far gate whose link names yours back; with no such gate you land at the place's arrival, else its jayzee: a cut, not a doorway. The gate's script crosses the body (onTriggerEnter), waiting for the glass, keeping your heading; a body crossing itself lands at once at the exit, facing out. A seated rider has no body: the car meets the glass and crossing it takes the driver, so a players-only gate moves neither.

#exit

rotation: 0

+cellar

A door's link is where it leads, for everyone (its glass, warm-up and crossing); it wears that glass, tinted by color; material.view: null leaves a plain face that still crosses. A linkless door sending each walker somewhere of theirs (player.den, player.saved) holds them at the glass while it loads; instead each player's script spawns theirs with audience: "local" and that link.

material.view: null

player.saved

audience: "local"

The glass: material.view: { link, spill, sound, oneWay }: the far place seen through the face, its light on your ground. oneWay: true: one face, veiled and closed behind. Presets script: "engine/portal-<name>": glass, water, ember, ink, veil, mirror-break, pixel, stained-glass, static, starfield, aurora, honeycomb, oil-slick (the rift is the return door's torn disc, not a slab): a preset styles the frame; the far world inside stays clear and still at every distance (params: { warp: 1 } restores the old whole-glass look); a door with no preset samples the far world with ctx.view(offset) (its ctx: jayzee api builtin/three).

material.view: { link, spill, sound, oneWay }

oneWay: true

script: "engine/portal-<name>"

params: { warp: 1 }

material.view: { camera } is a camera; jayzee api ViewCamera has the rest. camera: "mirror" is a mirror (hideLocalPlayer hides your body from the screen's eye alone): a plane in material: { color: "#0b0e12", view: { camera: "mirror" } }; camera: { eye, aim, fov } is a placed camera: a security monitor, or a map (eye high, aiming down, projection: "orthographic", orthoSize). layers picks what a camera draws (default ["default"]): icons on ["icons"] show on a map with layers: ["default", "icons"], roofs on ["roofs"] where the screen's camera.layers names them, a ghost on ["ghost"] in { mirror: true, layers: ["default", "ghost"] }. camera: { parent: id, eye, aim, fov } rides that thing in its frame: move or turn it, never re-pose each tick. ctx.view.camera takes both, never place. place: "<id>" films that place of this world while a player near the face sees it. A view draws only while a player sees its face, smaller and rarer on a weak device.

material.view: { camera }

jayzee api ViewCamera

camera: "mirror"

material: { color: "#0b0e12", view: { camera: "mirror" } }

camera: { eye, aim, fov }

["default"]

["icons"]

layers: ["default", "icons"]

["roofs"]

camera.layers

["ghost"]

{ mirror: true, layers: ["default", "ghost"] }

camera: { parent: id, eye, aim, fov }

place: "<id>"

The frame is most of the door: an arch, a lintel, braziers, a worn threshold, the far side's spill lighting it; the refusal spoken by the door. An arrival is latched until it steps clear, then turning around walks straight back. Arriving from ANOTHER world whose far gate does not link back opens a return rift behind the traveler for 30 s, shaped by returnDoor on the arrival place: { lifetime } its seconds, false none; a door WITHIN your world opens none: build its way back.

{ lifetime }

Your held and worn things come through a door WITHIN your world. Into ANOTHER world, even one you edit, its admits() decides, at page loads too: the arrival place's policy.admits, else the world root's, else only its world.config.yaml visitorsCarry: true (default off). What you ride crosses on those terms or bounces whole at the glass. Write that world's admits() with the door (new game: in its brief; not yours: tell the creator). admits() reads how a thing comes in ctx.crossing.actor.attachment: "attached" (held or worn), "ridden" or "loose". A refused thing is never lost: it waits in player.pocket (ctx.self.pocket, read-only [{ objectId, kind, reason, from }], [] when empty), and returns to the hand in the next world admitting it (by default home admits its own, your den yours). With no body there, your carry script's drop with an empty hand and a full pocket answers the pocket (a notice your HUD draws from reason).

admits()

visitorsCarry: true

ctx.crossing.actor.attachment

"attached"

"ridden"

"loose"

player.pocket

ctx.self.pocket

[{ objectId, kind, reason, from }]

Abroad the host's scripts turn your body and what it holds (a fresh world: toward the walk), so a held thing aiming with the eye aims from the look.

Your player.state rides the door too. At arrival that world's save of you wins for every key it holds; a carried key it lacks stands on you there, over the template default, and enters its save only when a script there writes it.

A travelling behavior runs abroad under the host's ceiling (its world.config.yaml foreign: { faculties: [...] }; unset = every word); one declaring nothing gets all but write:world. A top-level export const faculties = ["write:self"] narrows it to the words it names, of render, animate, audio, physics, collide, follow, attach, script, emit, jayzee, write:self, write:world, voxel; reads, timers, on and queries are always free. A declared word the ceiling lacks pockets that behavior (the runtime log's crossing.behavior.pocketed); the thing keeps its others and re-binds it at home.

foreign: { faculties: [...] }

write:world

export const faculties = ["write:self"]

crossing.behavior.pocketed

ctx.self.objectId, world:<birth>#<name>, names a thing in every world; id is bare at home, the address abroad. A player and what spawns under one keep its session id player/… as both; ctx.world.id tells where. Key a ledger row on objectId (a player's on userId); query({ objectId }) finds a thing after a hop.

ctx.self.objectId

world:<birth>#<name>

player/…

query({ objectId })

#### Block 1

````text
// spawn: { id: "gate-east", tags: ["portal"], behavior: "scripts/gate.js", state: { link: "+cellar#gate-west" }, rotation: 90, primitive: { kind: "arch", width: 2.6, height: 3.4, depth: 0.3 },
//   physics: { body: "static", trigger: true }, material: { kind: "scripted", script: "engine/portal-ember", view: { link: "+cellar#gate-west", spill: 2, sound: 1 } },
//   children: [ { id: "arch", primitive: { kind: "archway", width: 3.4, height: 3.8, depth: 0.6, thickness: 0.4 }, physics: "static", material: { color: "#6b6258", roughness: 0.95 } } ] }
// spawn, in the cellar, the twin: the same with id "gate-west", rotation: 270, both links "+main#gate-east"
export function onTriggerEnter(ctx, other) {
  ctx.cross(other, ctx.self.state.link);
}
export function onCross(ctx, other) {
  ctx.emit("playSound", { clip: "cdn/gate-chime.mp3", position: ctx.self.worldFeetPosition });
}
export function onRefuse(ctx, other, verdict) {
  ctx.emit("uiEvent", { name: "refused", payload: { message: verdict.message } }); // ui.js draws what happened
}
````

#### Block 2

````text
width + 2 × thickness
````

#### Block 3

````text
height + thickness
````

#### Block 4

````text
material.view
````

#### Block 5

````text
spawn browse --creator <handle>
````

#### Block 6

````text
spawn browse "<words>"
````

#### Block 7

````text
link: "@ress/cathedral +main"
````

#### Block 8

````text
--address
````

#### Block 9

````text
gate.destination.onlineCount
````

#### Block 10

````text
#exit
````

#### Block 11

````text
rotation: 0
````

#### Block 12

````text
+cellar
````

#### Block 13

````text
material.view: null
````

#### Block 14

````text
player.saved
````

#### Block 15

````text
audience: "local"
````

#### Block 16

````text
material.view: { link, spill, sound, oneWay }
````

#### Block 17

````text
oneWay: true
````

#### Block 18

````text
script: "engine/portal-<name>"
````

#### Block 19

````text
params: { warp: 1 }
````

#### Block 20

````text
material.view: { camera }
````

#### Block 21

````text
spawn api ViewCamera
````

#### Block 22

````text
camera: "mirror"
````

#### Block 23

````text
material: { color: "#0b0e12", view: { camera: "mirror" } }
````

#### Block 24

````text
camera: { eye, aim, fov }
````

#### Block 25

````text
["default"]
````

#### Block 26

````text
["icons"]
````

#### Block 27

````text
layers: ["default", "icons"]
````

#### Block 28

````text
["roofs"]
````

#### Block 29

````text
camera.layers
````

#### Block 30

````text
["ghost"]
````

#### Block 31

````text
{ mirror: true, layers: ["default", "ghost"] }
````

#### Block 32

````text
camera: { parent: id, eye, aim, fov }
````

#### Block 33

````text
place: "<id>"
````

#### Block 34

````text
{ lifetime }
````

#### Block 35

````text
admits()
````

#### Block 36

````text
visitorsCarry: true
````

#### Block 37

````text
ctx.crossing.actor.attachment
````

#### Block 38

````text
"attached"
````

#### Block 39

````text
"ridden"
````

#### Block 40

````text
"loose"
````

#### Block 41

````text
player.pocket
````

#### Block 42

````text
ctx.self.pocket
````

#### Block 43

````text
[{ objectId, kind, reason, from }]
````

#### Block 44

````text
foreign: { faculties: [...] }
````

#### Block 45

````text
write:world
````

#### Block 46

````text
export const faculties = ["write:self"]
````

#### Block 47

````text
crossing.behavior.pocketed
````

#### Block 48

````text
ctx.self.objectId
````

#### Block 49

````text
world:<birth>#<name>
````

#### Block 50

````text
player/…
````

#### Block 51

````text
query({ objectId })
````


### After clicking "read → player-settings Protections and control locks."

Players own their settings: sound levels (kept per game), accessibility protections, perf preference, control overrides, and every game's keys and pad, rebound in Settings › look › keys; no cap reaches them. On the player's press (ctx.self), ctx.emit("openSettings", { page: "keys" }) opens that page and "openAvatarEditor" their avatar editor (a wardrobe). A game shapes the STARTING experience and bounds what its design survives, never a player's choice. defaults speak only for players who never chose; caps bound only the families where the creator holds design authority, never graphics quality. A creator wanting high sets their own: the rail's Settings → screen → quality re-tiers their renderer to it on every device, terrain reach included, and late frames still lower resolution beneath it. Accessibility is safe-direction only, by law: nothing you write can force flashing on a photosensitive player. Your shake and blinks read player.reduceMotion / player.reduceFlashing (read-only) and stand down when true.

ctx.emit("openSettings", { page: "keys" })

"openAvatarEditor"

player.reduceMotion

player.reduceFlashing

// run_script: a dot write saves it (world.config.yaml engine.playerSettings); patch only the keys you change, null clears one ctx.world.engine.playerSettings.defaults.accessibility.reduceFlashing = true; // a strobe-heavy game ships photosensitive-safe; players may turn it off ctx.world.engine.playerSettings.caps.controls.lookSensitivity = false; // the cutscene camera ignores the player's sensitivity ctx.world.engine.playerSettings.caps.controls.lookSensitivity = null; // remove the lock; the rest of the policy stays

engine.playerSettings.defaults.accessibility: { reduceFlashing, reduceMotion } // true only. false answers "playerSettings.defaults.accessibility.reduceFlashing may only be true: a creator can pre-enable a protection, never disable one (players own accessibility)". Tell the creator why; no other path engine.playerSettings.caps.accessibility // never legal: no creator may bound a player's accessibility protections engine.playerSettings.caps.controls: { lookSensitivity, invertY } // booleans, default true: does the player's override apply here; disable one only if it breaks the design. Values live in camera and inputs defaults.sound, defaults.controls, defaults.perf, caps.perf // not creator surfaces: the mix is authored in audio, under the player's sliders; sensitivity and bindings are camera and inputs; quality is the player's: a game slow on phones is made cheaper in its content, never pinned to a level a refused field is dropped with a warning (run result, getLogs); the legal keys beside it apply // a default "not applying" means the player chose: nothing to fix. Policy is per game, never a player's preference for everyone

#### Block 1

````text
ctx.emit("openSettings", { page: "keys" })
````

#### Block 2

````text
"openAvatarEditor"
````

#### Block 3

````text
player.reduceMotion
````

#### Block 4

````text
player.reduceFlashing
````

#### Block 5

````text
// run_script: a dot write saves it (world.config.yaml engine.playerSettings); patch only the keys you change, null clears one
ctx.world.engine.playerSettings.defaults.accessibility.reduceFlashing = true; // a strobe-heavy game ships photosensitive-safe; players may turn it off
ctx.world.engine.playerSettings.caps.controls.lookSensitivity = false; // the cutscene camera ignores the player's sensitivity
ctx.world.engine.playerSettings.caps.controls.lookSensitivity = null; // remove the lock; the rest of the policy stays
````

#### Block 6

````text
engine.playerSettings.defaults.accessibility: { reduceFlashing, reduceMotion } // true only. false answers "playerSettings.defaults.accessibility.reduceFlashing may only be true: a creator can pre-enable a protection, never disable one (players own accessibility)". Tell the creator why; no other path
engine.playerSettings.caps.accessibility // never legal: no creator may bound a player's accessibility protections
engine.playerSettings.caps.controls: { lookSensitivity, invertY } // booleans, default true: does the player's override apply here; disable one only if it breaks the design. Values live in camera and inputs
defaults.sound, defaults.controls, defaults.perf, caps.perf // not creator surfaces: the mix is authored in audio, under the player's sliders; sensitivity and bindings are camera and inputs; quality is the player's: a game slow on phones is made cheaper in its content, never pinned to a level
a refused field is dropped with a warning (run result, getLogs); the legal keys beside it apply // a default "not applying" means the player chose: nothing to fix. Policy is per game, never a player's preference for everyone
````


### After clicking "read → workshop The build bench: headless Blender, renders, bakes and playing your game as a tester."

- H4: Actually play it

A delivery arrives finished: a prop modeled, proof-rendered, looked at, exported, uploaded and standing in the world with its material slots mounted, never a grey .glb or a URL in chat; a sprite sheet cut, tiled and on a sprite. Quick ops run inline; bakes, batch renders and encode sweeps ride a wisp (same shell; a task naming blender, bpy or .blend gets this skill and blender-game-assets).

The bench: blender 5.1 at /opt/blender, ffmpeg, imagemagick (montage cuts sprite sheets), GIMP 3, inkscape, krita, python3 + PIL + numpy, pdftotext/pdftoppm, curl, bun; one font, DejaVu, by name. Asset work lives under /workspace, synced across restarts; scratch goes to /tmp and vanishes. A render, .glb or .blend made in the clone moves under /workspace; only jayzee upload puts it in the world.

A model is its script: art/<model>/build.py in the world's tree runs source → every edit → export, whole; a later edit changes that file and reruns it, never a new script over the last .blend or a re-imported .glb. blender -b --factory-startup --python-exit-code 1 --python art/<model>/build.py && jayzee see /tmp/<model>/proof.png renders and looks at once; fix from stderr, rerun, jayzee upload the .glb. In the script: scene.render.engine = "CYCLES", 8–32 samples while iterating, a proof of the back and top too, each lit from its camera's side (a front-lit back renders dark and hides holes), bpy.ops.export_scene.gltf(filepath=…, export_apply=True); a .blend under /workspace caches a stage, never the record. N variants: one script's loop, or 3–4 blender -b … & shards and wait.

art/<model>/build.py

blender -b --factory-startup --python-exit-code 1 --python art/<model>/build.py && jayzee see /tmp/<model>/proof.png

scene.render.engine = "CYCLES"

bpy.ops.export_scene.gltf(filepath=…, export_apply=True)

blender -b … &

A wrong-coloured strip on a model is paint: find its faces by slot and position and fix their slot, UVs (from the face beside it) or texels. A .glb splits vertices at each slot; welded by position, a face whose edges join skin is the body's surface, and a loose piece keeps open edges. A face delete is no paint fix; move no vertex.

Paint never cleans a face a remesh, re-unwrap, bake or cut smeared: rebuild it on its source's unwelded mesh, normals, UVs and picture, expressions as shape keys, lids as added meshes. Proof eyes, nose and hairline flat and lit beside the source: a mark only yours shows is unfixed.

Without --python-exit-code 1 a raising script exits 0. --factory-startup disables every add-on: enable it in-script each run. blender-game-assets installs a missing add-on. Dozens of tiny edits: the code-exec daemon in /opt/workshop/blender/README.md, gone with the box.

krita headless: PYTHONPATH=/workspace kritarunner -s myscript (a module, no .py) defines def __main__(args): and calls Krita.instance().setBatchmode(True) BEFORE openDocument, or the open parks forever; check the output size, not the exit code.

PYTHONPATH=/workspace kritarunner -s myscript

def __main__(args):

Krita.instance().setBatchmode(True)

GIMP 3 runs only as gimp-console -d -f --batch-interpreter=plug-in-script-fu-eval -b '(…)' -b '(gimp-quit 0)' --quit; else it ignores every batch and parks. gimp-file-load takes (RUN-NONINTERACTIVE path), gimp-file-save (run-mode image path -1). convert or PIL first.

gimp-console -d -f --batch-interpreter=plug-in-script-fu-eval -b '(…)' -b '(gimp-quit 0)' --quit

jayzee upload <file> [--name <display>] [--full-size] // glb png jpg jpeg webp avif gif bmp mp3 wav flac ogg mp4 webm mkv mov avi m4v md txt woff2 woff ttf otf, else UNSUPPORTED_TYPE; a .glb's pictures serve at 1024 px, their own size with --full-size on the creator's ask an uploaded image or font serves at the URL upload prints (/cdn/value.<sha256>.<ext>), the ref textures, a ui @font-face src and jayzee fetch take; a tier or variant in that name (…max-res-2k.png) serves nothing. Never split an image to dodge a limit ctx.world.assets has a row per upload or load of this world, an upload's that turn (kind, name = your --name, uploadedAt): find an earlier session's lantern there by name, never rebuild or re-upload; `jayzee ls --assets` lists them jayzee see <file…> // shows an image in THIS bash result, fit to 2000 px on the long edge rigging // any mixamo-named rig plays every library clip by address (→animations), a CDN humanoid's too; a realistic human body is mpfb, on the mixamo rig (→blender-game-assets); a toon person is never an mpfb body: the art style's road (→geometry); size, turn or move body and rig together (the rig object's transform, or body.data.transform(M) with rig.data.transform(M)), never bone by bone: a connected bone's head is its parent's tail, so a per-bone move shifts each joint twice; a fetched mesh (`jayzee fetch /cdn/<name>?raw`) you rig in Blender: the armature measured onto it, `parent_set(type="ARMATURE_AUTO")`, every clip keyed, the idle too (identical keys are a statue), exported as actions (→blender-game-assets) jayzee gpu // a GPU machine with a display, Chrome and blender, yours over `ssh gpu`; for perf bottlenecks →video and renders past a proof frame: `scp -r` the folder, `ssh gpu blender -b …`, device GPU on OPTIX, `denoising_use_gpu`, `use_persistent_data`; time one frame there and say the minutes first jayzee status // workspace vs quota, today's compute minutes. No size refuses a command; past the quota the box clears its own scratch. At the compute cap it sleeps until UTC midnight a build or a bake names a timeout_s that covers its whole run

Actually play it

Your body, beside the creator, is a Chromium page of the game at http://127.0.0.1:9222: play it with Playwright. Play the route before a landing, a failing mechanic and an asked round. While your script or Jev holds the page, your body is a player in their room and a race it starts is theirs: test one in its own room, spawn client join --tester 1 --room test. A jump too tight for you is too tight for them: that failure IS the finding.

http://127.0.0.1:9222

spawn client join --tester 1 --room test

For a live round with a person, jayzee jev start "<goal>" hands your body's keys and mouse to Jev, a fast model that reads the game ten times a second and picks every input while you talk; you are its mind. Steer it live, naming what it sees (jayzee jev say --now "jump onto the bridge" --key "Space=tap at a gap"); jayzee jev reads its hold, last three seconds and cost; jayzee jev stop ends it.

jayzee jev start "<goal>"

jayzee jev say --now "jump onto the bridge" --key "Space=tap at a gap"

jayzee jev

jayzee jev stop

cat > /workspace/play.mjs <<'JS' import { chromium } from "playwright"; const browser = await chromium.connectOverCDP("http://127.0.0.1:9222"); const page = browser.contexts()[0].pages()[0]; await page.mouse.click(...(await page.evaluate(() => [innerWidth / 2, innerHeight / 2]))); await page.keyboard.press("KeyW", { delay: 1500 }); await page.screenshot({ path: "/workspace/view.png" }); await browser.close(); JS node /workspace/play.mjs && jayzee see /workspace/view.png

A click on the view locks the pointer; coordinates are screenshot pixels. The game's HTML UI is in its own frames (page.frames()); a bound key opens a field and page.keyboard.type fills it.

page.frames()

page.keyboard.type

A round is a loop: act, look, adjust, every few hundred ms, never blind fixed inputs. Play the asked round whole, then say what you felt, what landed and what fell flat in the creator's words, never an invented score.

#### Block 1

````text
art/<model>/build.py
````

#### Block 2

````text
blender -b --factory-startup --python-exit-code 1 --python art/<model>/build.py && spawn see /tmp/<model>/proof.png
````

#### Block 3

````text
scene.render.engine = "CYCLES"
````

#### Block 4

````text
bpy.ops.export_scene.gltf(filepath=…, export_apply=True)
````

#### Block 5

````text
blender -b … &
````

#### Block 6

````text
PYTHONPATH=/workspace kritarunner -s myscript
````

#### Block 7

````text
def __main__(args):
````

#### Block 8

````text
Krita.instance().setBatchmode(True)
````

#### Block 9

````text
gimp-console -d -f --batch-interpreter=plug-in-script-fu-eval -b '(…)' -b '(gimp-quit 0)' --quit
````

#### Block 10

````text
spawn upload <file> [--name <display>] [--full-size] // glb png jpg jpeg webp avif gif bmp mp3 wav flac ogg mp4 webm mkv mov avi m4v md txt woff2 woff ttf otf, else UNSUPPORTED_TYPE; a .glb's pictures serve at 1024 px, their own size with --full-size on the creator's ask
an uploaded image or font serves at the URL upload prints (/cdn/value.<sha256>.<ext>), the ref textures, a ui @font-face src and spawn fetch take; a tier or variant in that name (…max-res-2k.png) serves nothing. Never split an image to dodge a limit
ctx.world.assets has a row per upload or load of this world, an upload's that turn (kind, name = your --name, uploadedAt): find an earlier session's lantern there by name, never rebuild or re-upload; `spawn ls --assets` lists them
spawn see <file…> // shows an image in THIS bash result, fit to 2000 px on the long edge
rigging // any mixamo-named rig plays every library clip by address (→animations), a CDN humanoid's too; a realistic human body is mpfb, on the mixamo rig (→blender-game-assets); a toon person is never an mpfb body: the art style's road (→geometry); size, turn or move body and rig together (the rig object's transform, or body.data.transform(M) with rig.data.transform(M)), never bone by bone: a connected bone's head is its parent's tail, so a per-bone move shifts each joint twice; a fetched mesh (`spawn fetch /cdn/<name>?raw`) you rig in Blender: the armature measured onto it, `parent_set(type="ARMATURE_AUTO")`, every clip keyed, the idle too (identical keys are a statue), exported as actions (→blender-game-assets)
spawn gpu // a GPU machine with a display, Chrome and blender, yours over `ssh gpu`; for perf bottlenecks →video and renders past a proof frame: `scp -r` the folder, `ssh gpu blender -b …`, device GPU on OPTIX, `denoising_use_gpu`, `use_persistent_data`; time one frame there and say the minutes first
spawn status // workspace vs quota, today's compute minutes. No size refuses a command; past the quota the box clears its own scratch. At the compute cap it sleeps until UTC midnight
a build or a bake names a timeout_s that covers its whole run
````

#### Block 11

````text
http://127.0.0.1:9222
````

#### Block 12

````text
spawn client join --tester 1 --room test
````

#### Block 13

````text
spawn jev start "<goal>"
````

#### Block 14

````text
spawn jev say --now "jump onto the bridge" --key "Space=tap at a gap"
````

#### Block 15

````text
spawn jev
````

#### Block 16

````text
spawn jev stop
````

#### Block 17

````text
cat > /workspace/play.mjs <<'JS'
import { chromium } from "playwright";
const browser = await chromium.connectOverCDP("http://127.0.0.1:9222");
const page = browser.contexts()[0].pages()[0];
await page.mouse.click(...(await page.evaluate(() => [innerWidth / 2, innerHeight / 2])));
await page.keyboard.press("KeyW", { delay: 1500 });
await page.screenshot({ path: "/workspace/view.png" });
await browser.close();
JS
node /workspace/play.mjs && spawn see /workspace/view.png
````

#### Block 18

````text
page.frames()
````

#### Block 19

````text
page.keyboard.type
````


### After clicking "read → weaves Helpers that build pieces in parallel: how a crew is briefed and checked."

run_weave({ script, args? }) takes Claude Code's Workflow grammar: export const meta = { name, description }, then agent(prompt, opts) per lane: it resolves the lane's closing text, the object your schema asked for, or null when the lane failed or landed nothing (no world write and no upload: its words are no landing); parallel([...thunks]), pipeline(items, ...stages), phase(title), log(text), args. A lane is a wisp: its own world clone, your building tools (files, bash, run_script, look) and jayzee tripo, not paint, video, voice or cutout; its prompt is its whole brief: the facts it cannot read from the tree. A brief the creator dictates is theirs: when they say what a wisp gets (their picture, their kit, their sentence, "nothing else"), you send that as they said it and add no line of your own. A lane is one task: it ends when it replies without a tool call, at its maxSteps or budget, and nothing holds it open for a verdict, yours or the creator's: told to wait, it spends its steps and budget waiting. A verdict is the next round: a new agent() whose prompt carries the verdict and the files the last lane left.

run_weave({ script, args? })

export const meta = { name, description }

agent(prompt, opts)

parallel([...thunks])

pipeline(items, ...stages)

phase(title)

log(text)

bash

jayzee tripo

maxSteps

agent()

What the creator sees is the card: meta.description is its title, phase(title) its stage, each lane's label its line: a verb phrase in their second person ("raise your three stalls"; absent, the prompt's first phrase stands in): log(text) a line at a turning point (a DM to you as well; the first 20), and return the closing word: what landed and what did not, by name. Bare-noun labels, one phase and no log lines: a build nobody can follow.

meta.description

Opts a Claude Code agent has not: footprint: { id, feetPosition, size: { width, height, depth }, place, rotation? } per piece the lane builds (an array for several), or null for a lane that places nothing new; the room stands each as a blueprint box under that id and place as the lane starts, and the finished piece replaces it (place as your run_script names it: a box in another place blocks the piece's id there and orphans its children) (a build lane's; an agentType lane has none); skills (ids preloaded into the lane), maxSteps (default 60), referenceImages (the creator's picture at the URL you see it in this conversation, or its /cdn/<file> path), color ("#rrggbb", the wisp's flame, else the room's), agentType: review looks at the finished work with an eye, mends what it shows, and names what breaks the spell, worst first; verify, judge, critic, polish; play is a player on its spawn client join page: a test of what a player does, or in a singleplayer world a round with the creator (skills: ["workshop"], one lane per player); in any other 6.0 world each run_weave call's wisps play in their own room with nobody in it, so two squads are two calls in one step, and effort ("low" | "medium" | "high"; "medium" when you name none): the lane's thinking budget: for a lane "low" is almost always right: wiring, scripts, UI, a fix, a placement; art that has to read (a Blender model, a texture, a look) takes "medium" or "high".

{ id, feetPosition, size: { width, height, depth }, place, rotation? }

agentType

referenceImages

/cdn/<file>

"#rrggbb"

review

verify

judge

critic

polish

skills: ["workshop"]

run_weave

effort

The taste of a brief: on a map of kilometres most of every trip crosses the land between the places, so one lane or your own generator's loop fills it to the map's edge: groves, fields, farms, hamlets outside every place's box; every piece the player can act on has its verb in the brief (E draws water at the well) and the life around it (houses round a square); a building is rooms a body walks into (the door hole cut through mesh and collider, a floor and a light inside), never a sealed facade; the shared facts name ONE centre and ONE ground height every lane builds to; a place config that turns terrain off or swaps its kind takes the ground from everyone on it the moment it saves, and a blueprint box holds nobody, so that save is the floor lane's, after the floor stands under their feet (ctx.place.players), never the kickoff's; a file two lanes need is one lane's to write and the other's to import after it returns; a piece the creator loops on says so in its brief; the done line is a readOnly state read the lane names. The paths that join the pieces are one network and one lane's: it runs after the piece lanes return, reads their door positions from the tree, and lays every walk as a spline (kind: "boardwalk" or "road", points, width: the engine's one continuous surface, collider included; a kerb is a curb spline on the same points), so a piece lane's brief ends its ground at its own door and no lane writes a walk generator.

kind: "boardwalk"

A change mid-build is steer_weave: running lanes fold it in, queued lanes take it as an addendum; terminate only for a changed plan. The weave's word comes as DMs: never wait or poll for it; your kickoff tells the creator what your wisps raise, when it lands (only when the dispatch result names this room's pace), and what to go feel meanwhile. When the weave's word lands, the world moved and the creator did not: read their feetPosition in ctx.place.players before you say where they are; when the game now starts elsewhere, move them there first. Asked or pressed how long mid-build, swarm list answers: what each lane landed and holds now, in its own words; no finish is measured where you can read, so name only minutes you read.

steer_weave

swarm list

Against a bar the creator set (their screenshots on referenceImages, a named game distilled to one sentence): a round installs its result before it ends, so the creator sees every pass land; then agentType: "critic" with schema: { type: "object", properties: { winner: { enum: ["ours", "bar"] }, score: { type: "number", maximum: 10, description: "how close to the bar" }, biggestGap: { type: "string" } } }, and a prompt carrying the bar and ONLY the bar judges what stands through the eye; the gap heads the next round's prompt, which refines what stands; the loop exits on winner === "ours". A judge scores, never holds: a lane that makes several candidates leaves the best-scored one standing in the game when it returns, its score in its cleetus: line, and your closing word labels it ("the closest of 24: realism 6 of 10; say the word and I'll push further"); under the bar, the best still stands until a better one does.

agentType: "critic"

schema: { type: "object", properties: { winner: { enum: ["ours", "bar"] }, score: { type: "number", maximum: 10, description: "how close to the bar" }, biggestGap: { type: "string" } } }

winner === "ours"

cleetus:

#### Block 1

````text
run_weave({ script, args? })
````

#### Block 2

````text
export const meta = { name, description }
````

#### Block 3

````text
agent(prompt, opts)
````

#### Block 4

````text
parallel([...thunks])
````

#### Block 5

````text
pipeline(items, ...stages)
````

#### Block 6

````text
phase(title)
````

#### Block 7

````text
log(text)
````

#### Block 8

````text
bash
````

#### Block 9

````text
spawn tripo
````

#### Block 10

````text
maxSteps
````

#### Block 11

````text
agent()
````

#### Block 12

````text
meta.description
````

#### Block 13

````text
{ id, feetPosition, size: { width, height, depth }, place, rotation? }
````

#### Block 14

````text
agentType
````

#### Block 15

````text
referenceImages
````

#### Block 16

````text
/cdn/<file>
````

#### Block 17

````text
"#rrggbb"
````

#### Block 18

````text
review
````

#### Block 19

````text
verify
````

#### Block 20

````text
judge
````

#### Block 21

````text
critic
````

#### Block 22

````text
polish
````

#### Block 23

````text
skills: ["workshop"]
````

#### Block 24

````text
run_weave
````

#### Block 25

````text
effort
````

#### Block 26

````text
kind: "boardwalk"
````

#### Block 27

````text
steer_weave
````

#### Block 28

````text
swarm list
````

#### Block 29

````text
agentType: "critic"
````

#### Block 30

````text
schema: { type: "object", properties: { winner: { enum: ["ours", "bar"] }, score: { type: "number", maximum: 10, description: "how close to the bar" }, biggestGap: { type: "string" } } }
````

#### Block 31

````text
winner === "ours"
````

#### Block 32

````text
savi:
````


### After clicking "read → uploaded-models Your own .glb models or a picture turned into a model: placed, dressed, talking."

The bar: the upload DM is the model's spec sheet (true height, footprint, clips, bones). Dress it: marble and brass slots in CDN textures, a lantern in its RightHand fist, a cape deforming with its rig, a broken turret swapped with no hole in the silhouette. A model file dropped in is placeable at /cdn/<filename> with its DM.

marble

brass

/cdn/<filename>

jayzee({ id: "fountain", feetPosition: { x: 12, z: -4 }, physics: "static", layout: { box: { min: { y: 0 }, max: { y: 2.6 } } }, model: { id: "cdn/fountain.glb", materials: { marble: { texture: "cdn/texture-marble-white-veined.png", roughness: 0.3 }, brass: { texture: "cdn/texture-brass-brushed.png", metalness: 1, roughness: 0.4 } } }, children: [{ id: "fountain-lamp", attachment: { socket: "lamp_top" }, model: "cdn/lantern.glb" }] }); jayzee({ id: "knight", feetPosition: { x: 4, z: 2 }, physics: "character", model: "cdn/knight-silver-armor.glb", children: [{ id: "knight-cape", attachment: { skin: true }, model: "cdn/cape.glb" }] });

A creator's own picture they want in 3D asks for its cooked mesh, nothing built first: one cook, not one a turn. Its /cdn/ name plus .glb is that mesh (model: "cdn/value.<sha>.png.glb"), again when they say yours looks wrong. ?static on that address cooks one unrigged statue in the picture's own pose, no clips. Any other likeness is yours to build (→geometry). A chat picture gets its /cdn/ name by jayzee attachments download, then jayzee upload. A humanoid comes rigged with Idle, Walk, Run, Sprint and Jump inside it; any other motion is a clip address (→animations); an animal comes as one unrigged mesh you rig in Blender by auto weights (→workshop).

/cdn/

model: "cdn/value.<sha>.png.glb"

?static

jayzee attachments download

Size: the DM's height and bounds, not the thumbnail, are the in-game size. The collider follows, coarse until the hull cooks; a character with no collider keeps a 1.9 m capsule, radius 0.35, until physics.capsule sizes it; collider: "capsule" fits it to the model. A box hitbox is a render: false box primitive with collider: "box" that never turns; its model turns on a child.

collider: "capsule"

render: false

Clips play by name, case-insensitive and near (Walk finds Walking), past the DM's cap; a missing name plays its idle (else first) clip and getLogs() lists the real ones. An unrigged model plays baked clips but takes no bone attachments, IK or library clips.

getLogs()

Name each material slot for its surface in Blender so each takes its own texture; until then it wears the GLB's paint.

Read bones, sockets and shape keys as if the model is there: a read holds your hook until it loads; a { bone } or { socket } attachment written first rides its anchor once there. A shape-key read's [] or a socket read's null = none. A face talks by its jaw bone or mouth key; with neither, weight a jaw to its mouth in Blender.

{ bone }

{ socket }

ctx.getObject(id).skeleton is an array of rows by name. Check a pose (astride a saddle) by each knee's and foot's drawn currentWorldPosition, as a picture can hide a crossed limb.

ctx.getObject(id).skeleton

ctx.attach is for a piece swap alone, hiding replaces as the piece's model lands.

A humanoid rig with recognizable bone names (Mixamo-style; prefixes and twist bones tolerated) gets foot grounding; a rig the platform knows (Mixamo, Jayzee's, Meshy, UE mannequin, Auto-Rig Pro, Unity humanoid) also plays every library clip by address (→animations); any other rig plays its own clips and one made on its bones, by the address jayzee clip import prints.

jayzee clip import

The DM comes once the file is live at world scale; compression lands later. A DM calling it too heavy: fix its source, else Blender (→blender-game-assets).

Facing: the engine, a CDN model and a dropped file face −Z (no forward). A workshop file faces as its bytes do: a platform body fetched plain keeps −Z through Blender, its ?raw copy faces as it came in (often +Z); on jayzee upload and jayzee fetch their facing: line names the forward it takes (→blender-game-assets). forward turns the mesh, sockets and parts; rotation turns the whole object, children and colliders.

?raw

jayzee fetch

model.materials: { <slot>: material } // keyed by the GLB's material names (else node names); a miss lists the real names in getLogs(); ink line: `outline`, never a hull; paint, bands, ink and a bigger head keep a realistic face realistic: toon or another drawn style is a new body with fingers, never the old mesh (→geometry) // a colour painted into a body's texture: a scripted material on its slot shifts its hue in materialColor; every colour of that hue there shifts model.parts.<name>: { visible, ...material } // each mesh node or material the .glb names, no cook; ?parts=a,b cuts a nameless mesh; ?extract=a mints one as a model model.forward: "+z" | "+x" | "-x" // for a model that stands turned round: the axis it was built to face; the engine turns it onto −Z once (omitted: no turn) attachment: { bone } // on a parent: "player" root, every player wears a copy; a hand's joint is the wrist: the fist closes on the hand row's `fist.grip`: seat a handle along it, its middle on `fist.position` attachment: { skin: true | { map: { <childBone>: <parentBone> } } } // a SKINNED child (its own joints named for the parent's bones, case-insensitive) deforms with the parent's rig; one child per garment, never baked in; its own feetPosition/rotation/scale mean nothing // a { bone } or { skin } child on a shape-keyed body follows its keys (hair grows with a head-size morph); its own morph write wins per key attachment: { socket } // any snake_case name on any model resolves on its own; the child sits at the parent's origin until it does attachment: { part } // names normalize to snake_case layout.box // meters; model meets the nearest side

ctx.getObjectBoneNames(id: str): BoneNamesResult // Use before setting attachment.bone. A model still loading is waited for; once it lands, [] means no rig ctx.getObjectMorphTargetNames(id: str): MorphTargetNamesResult // Discover an object's shape keys (morph targets / blend shapes): the names morph takes, e.g. ["Blink", "Smile"] ctx.getObjectSocket(id: str, name: str): { position: Vec3, direction: Vec3, confidence: num } | null // Same for another object: projectile jayzee points without invisible marker children ctx.self.ragdoll = {…} (= null releases it) // Flip a rigged character to physics: joints[bone].strength pulls each to its animation; a fixed joint to a kinematic object at hips or bone holds it up ctx.attach(entity: str | { readonly id: str }, parent: str | { readonly id: str } | null, offset?: { position?: Vec3, rotation?: RotationSpec, scale?: Vec3, pivot?: PivotSpec, attachment?: ObjectAttachmentSpec | null, replaces?: str }) // The piece swap: attach(piece, holder, { attachment: { part: "turret" }, replaces: "turret" }) hides the named thing: a child of the world by id

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
/cdn/<filename>
````

#### Block 4

````text
spawn({ id: "fountain", feetPosition: { x: 12, z: -4 }, physics: "static", layout: { box: { min: { y: 0 }, max: { y: 2.6 } } },
  model: { id: "cdn/fountain.glb", materials: {
    marble: { texture: "cdn/texture-marble-white-veined.png", roughness: 0.3 },
    brass: { texture: "cdn/texture-brass-brushed.png", metalness: 1, roughness: 0.4 } } },
  children: [{ id: "fountain-lamp", attachment: { socket: "lamp_top" }, model: "cdn/lantern.glb" }] });
spawn({ id: "knight", feetPosition: { x: 4, z: 2 }, physics: "character", model: "cdn/knight-silver-armor.glb",
  children: [{ id: "knight-cape", attachment: { skin: true }, model: "cdn/cape.glb" }] });
````

#### Block 5

````text
/cdn/
````

#### Block 6

````text
model: "cdn/value.<sha>.png.glb"
````

#### Block 7

````text
?static
````

#### Block 8

````text
spawn attachments download
````

#### Block 9

````text
collider: "capsule"
````

#### Block 10

````text
render: false
````

#### Block 11

````text
getLogs()
````

#### Block 12

````text
{ bone }
````

#### Block 13

````text
{ socket }
````

#### Block 14

````text
ctx.getObject(id).skeleton
````

#### Block 15

````text
spawn clip import
````

#### Block 16

````text
?raw
````

#### Block 17

````text
spawn fetch
````

#### Block 18

````text
model.materials: { <slot>: material } // keyed by the GLB's material names (else node names); a miss lists the real names in getLogs(); ink line: `outline`, never a hull; paint, bands, ink and a bigger head keep a realistic face realistic: toon or another drawn style is a new body with fingers, never the old mesh (→geometry)
// a colour painted into a body's texture: a scripted material on its slot shifts its hue in materialColor; every colour of that hue there shifts
model.parts.<name>: { visible, ...material } // each mesh node or material the .glb names, no cook; ?parts=a,b cuts a nameless mesh; ?extract=a mints one as a model
model.forward: "+z" | "+x" | "-x" // for a model that stands turned round: the axis it was built to face; the engine turns it onto −Z once (omitted: no turn)
attachment: { bone } // on a parent: "player" root, every player wears a copy; a hand's joint is the wrist: the fist closes on the hand row's `fist.grip`: seat a handle along it, its middle on `fist.position`
attachment: { skin: true | { map: { <childBone>: <parentBone> } } } // a SKINNED child (its own joints named for the parent's bones, case-insensitive) deforms with the parent's rig; one child per garment, never baked in; its own feetPosition/rotation/scale mean nothing
// a { bone } or { skin } child on a shape-keyed body follows its keys (hair grows with a head-size morph); its own morph write wins per key
attachment: { socket } // any snake_case name on any model resolves on its own; the child sits at the parent's origin until it does
attachment: { part } // names normalize to snake_case
layout.box // meters; model meets the nearest side
````

#### Block 19

````text
ctx.getObjectBoneNames(id: str): BoneNamesResult // Use before setting attachment.bone. A model still loading is waited for; once it lands, [] means no rig
ctx.getObjectMorphTargetNames(id: str): MorphTargetNamesResult // Discover an object's shape keys (morph targets / blend shapes): the names morph takes, e.g. ["Blink", "Smile"]
ctx.getObjectSocket(id: str, name: str): { position: Vec3, direction: Vec3, confidence: num } | null // Same for another object: projectile spawn points without invisible marker children
ctx.self.ragdoll = {…} (= null releases it) // Flip a rigged character to physics: joints[bone].strength pulls each to its animation; a fixed joint to a kinematic object at hips or bone holds it up
ctx.attach(entity: str | { readonly id: str }, parent: str | { readonly id: str } | null, offset?: { position?: Vec3, rotation?: RotationSpec, scale?: Vec3, pivot?: PivotSpec, attachment?: ObjectAttachmentSpec | null, replaces?: str }) // The piece swap: attach(piece, holder, { attachment: { part: "turret" }, replaces: "turret" }) hides the named thing: a child of the world by id
````


### After clicking "read → blender-game-assets Hero models built in Blender by helpers."

- H2: Blender Game Assets

Blender Game Assets

The bar: a blender prop reads as made from the player's feet: a crate with bitten edges and a crack web across one plank, a statue missing a chunk of shoulder with centuries eaten off its rim, a bridge whose cables sag, a shrine roof sitting on its walls with no daylight at the gable. Every junction seated, every material slot named for the surface the game mounts on it, every claim checked in a rendered still you looked at, never an exit code. Budget triangles against three anchors: most things a game shows are under 20k each, a finished game plays about half a million in frame, a heavy scene one to two million; a hero piece the player stands beside earns more, its edges read from a metre. Plan the whole asset first (parts and sizes, slots by name); one script (→workshop) builds it, renders one full-size proof, exports the .glb; look once, fix that script, rerun, upload, place, return. A prop is done once placed, not when its still is perfect; a building a body walks into earns a second look-fix round once placed. A CHARACTER is the same build with a body in it, one skin that reads as its art style's character, never a pile of parts: a face and hands with anatomy, armour seated on the shoulders it was fitted to, cloth hanging between the legs, a weapon in the hand gripping it, moving on its own rig, in the api's order line.

import bpy, qm scene = bpy.context.scene scene.render.engine, scene.cycles.samples = "CYCLES", 8 # render.opengl refuses under -b; EEVEE renders in software scene.render.resolution_x = scene.render.resolution_y = 656 wall = bpy.data.objects["Wall"] # JOINED blocks = islands; damage a duplicate, keep the pristine original dmg = wall.data.attributes.new("dmg", "BOOLEAN", "POINT") dmg.data.foreach_set("value", [v.co.x > 0 for v in wall.data.vertices]) qm.qm_apply(wall, "chunks", selection_attr="dmg") # bites only the selected blocks; new faces take the LAST material slot qm.qm_apply(wall, "cracks", Scale=4.0) # params by socket name for name, cam in (("a", "Cam34"), ("b", "CamGable"), ("c", "CamTop")): # a turnaround: three 656-px views fill see's 2000 px, one alone renders at 1568 scene.camera = bpy.data.objects[cam] scene.render.filepath = f"/tmp/proof/wall_{name}.png" bpy.ops.render.render(write_still=True) bpy.ops.export_scene.gltf(filepath="/workspace/wall.glb", export_apply=True) dg = bpy.context.evaluated_depsgraph_get(); print("tris", sum(len(o.evaluated_get(dg).data.loop_triangles) for o in scene.objects if o.type == "MESH"))

Then montage /tmp/proof/wall_*.png -tile 3x1 -geometry +4+4 /tmp/proof/wall.png && jayzee see /tmp/proof/wall.png. Once the .glb is placed, mount a texture on every named slot (model.materials.<slot>.texture: "cdn/texture-<what>.png"); placeholder grey outside a flat style is unfinished.

montage /tmp/proof/wall_*.png -tile 3x1 -geometry +4+4 /tmp/proof/wall.png && jayzee see /tmp/proof/wall.png

model.materials.<slot>.texture: "cdn/texture-<what>.png"

import bpy, json # art/knight/build.py: the character's one pass C = json.load(open("art/knight/contract.json")) # {"unit": "m", "height": 1.9, "feet": 0, "up": "+Z", "front": "-Y", "forward": "+z", "tris": 12000} bpy.ops.import_scene.gltf(filepath="/workspace/knight/body.glb") # the body: mpfb (→api), your own, or a CDN base (→geometry) body = next(o for o in bpy.context.scene.objects if o.type == "MESH" and o.vertex_groups) # the skinned body, never the importer's bone widgets dg = bpy.context.evaluated_depsgraph_get(); zs = sorted((body.matrix_world @ v.co).z for v in body.evaluated_get(dg).data.vertices) # the deformed body in world space renders; body.scale moves a node no viewer draws s = C["height"] / (zs[-1] - zs[0]); (body.find_armature() or body).scale = (s, s, s); bpy.ops.object.select_all(action="SELECT"); bpy.ops.object.transform_apply(scale=True) # metres at scale 1; A = landmarks (hip, chest, shoulder) → anatomy.json rig = mixamo_armature(A) for o in (body, cuirass(A), pauldron(A, "L"), pauldron(A, "R"), gambeson(A)): o.modifiers.new("skin", "ARMATURE").object = rig sword = longsword(); sword.parent, sword.parent_type, sword.parent_bone = rig, "BONE", "RightHand" # the shield on LeftForeArm for name, keys in CLIPS.items(): # each clip, idle too, solved with none live, then keyed, no NLA: a solve under a live clip keys its pose rig.animation_data.action = None; poses = solve(rig, keys); rig.animation_data.action = bpy.data.actions.new(name); key_pose(rig, poses) bpy.ops.export_scene.gltf(filepath="/workspace/knight.glb", export_apply=True, export_animation_mode="ACTIONS") audit("/workspace/knight.glb", C)

scatter: Scatter on Surface, Array, Instance on Elements, Randomize Instances are bundled node groups (find /opt/blender -path '*assets*' -name '*.blend', append), or Distribute Points on Faces → Instance on Points ← Object Info → Realize Instances damage: Mesh to SDF Grid → SDF Grid Boolean (Difference, noise-displaced cutters where the hits land) → Grid Dilate & Erode (negative eats edges) → Grid to Mesh // voxel ~2% of the long axis, halved for chips, never for silhouettes; poly count and bake time scale with it Pointiness, Bevel and AO wear are Cycles-only: bake them or make the damage geometric lighten (over its anchor, a heavy upload row, a slow world): plan in counts: each model's ctx.world.assets[ref].triangles × the rows placing it (.scene rows and the templates they point at; render: false draws nothing), ranked, summed against the anchor, jayzee perf --frame for the frame's drawn total; lighten the file once and every placement follows: jayzee fetch <ref>, Decimate (Collapse, ratio = target ÷ count), the export row's weld and smooth, one proof camera before and after (silhouette loss shows in pixels; none is the bar), export, jayzee upload, point every row at the printed address, say the before and after count append a node group headless: with bpy.data.libraries.load(path, link=False) as (src, dst): dst.node_groups = [n for n in src.node_groups if "Scatter" in n] // obj.modifiers.new("x", "NODES").node_group = group; modifier inputs go by identifier, not name: {s.name: s.identifier for s in group.interface.items_tree if getattr(s, "in_out", "") == "INPUT"} add-ons: a tool Blender's natives lack is one install away: /opt/workshop/blender/provision-game-asset-addons.sh <id> (any extensions.blender.org id; →workshop) prints the module to enable per run under --factory-startup: bpy.ops.preferences.addon_enable(module="bl_ext.blender_org.<id>"); addon ops are plain bpy.ops on the selected, active object mpfb, a realistic human body on the rig the engine reads (no dial, remesh, big head or flat paint makes its face toon: a toon or restyle takes its art style's road, →geometry; any mixamo-named rig plays every library clip): from bl_ext.blender_org.mpfb.services import HumanService, TargetService; m = TargetService.get_default_macro_info_dict(); m.update({"age": 0.8, "weight": 0.9, "height": 0.2}); body = HumanService.create_human(macro_detail_dict=m); HumanService.add_builtin_rig(body, "mixamo") // dials 0..1: gender age muscle weight proportions height; default body 27k tris; "mixamo" only (→animations); its provision brings skins on this body's map, eyes, brows, lashes, hair, clothes: HumanService.set_character_skin and .add_mhclo_asset dress it as the provision prints voronoi fracture: bpy.ops.object.add_fracture_cell_objects(source_limit=40, margin=0.001) // pieces land beside the original; give the source a second slot first and aim the interior-material option at it; export whole + broken as two assets qm.qm_list() / qm.qm_apply(obj, tool, selection_attr=None, **params) // applies a NODES modifier: real geometry; cracks, holes, chunks eat closed solids, so select whole islands (qm_apply refuses an open patch) bake: bpy.ops.object.bake on Cycles // needs a UV map and each material's active Image Texture node on the target image, or bakes silently black; selected-to-active is a Cycles session per object: apply modifiers, keep Object coords in an attribute the materials read, join export: end GN graphs with Realize Instances (raw instances are exporter-fickle); weld and smooth-shade first: a flat-shaded export splits every edge into seams the engine's far levels cannot collapse; origin at each part's visual bottom center, placed there in the kit: the engine stands it on feetPosition; burial is y: { terrain: -X }, never a shifted origin. Blender's front (−Y) exports as glTF +Z: a thing built with a face is placed `model: { id, forward: "+z" }`; a rigged file's own facing is the `facing:` line `jayzee upload` prints (→uploaded-models). A placed thing is solid only with `physics: "static"` (a walker: "character"), its collider cooked from the mesh junctions: a gable end-wall is a pentagon (-w/2,0) (w/2,0) (w/2,eave) (0,ridge) (-w/2,eave); sink roof slabs ~2 cm into the pitch plane, embed trim, sills and chimneys ≥ 3 cm into their host: overlap makes gaps impossible, exact contact misses blind; per-face color jitter reads as checkerboard, not age order (a roster): contract → donor measured → ONE hero at the proof (3/4, side, the extreme stride) approved → the others share the pipeline, never one body scaled and recoloured contract.json first (the shape above) // every script of the family reads it; scale ONCE from it: a source scale × a manifest scale doubles the body parts: garments, plates, weapons, shields are their own objects fitted to anatomy.json // plates overlap in the real order, seated ≥ 2 cm into their host; a rigid plate follows ONE bone, cloth deforms by weights with stride room in it; a weapon parents to its hand bone; live, children: [{ attachment: { bone: "RightHand" }, model }] seated in its `fist` (→uploaded-models) rig: one deform armature, Mixamo-style names (the ones the engine's IK, grounding and attachment resolve), positive scale, no root motion; weights proven at the extreme pose (knee, elbow, arm raised) in the proof BEFORE texture // a mirrored bone or a scaled armature exports a body that folds clips: Idle Walk Run Attack Hit Death // the placed row plays each by name (ctx.self.anim, →uploaded-models); a body you rigged carries its own clips audit: re-import the .glb into an empty scene (bpy.ops.wm.read_factory_settings(use_empty=True)), measure the deformed body in world space; the JSON chunk gives skins/joints, animations by name, one node per part, triangles vs the budget // the row you report IS these numbers

<samples> qm tools: cracks (engraved voronoi web), holes (noise gouges), chunks (voronoi removal), edge_wear, cables (sag between face regions), panel_cut, hull_cut, edges_to_ropes (rope along an edge path), selection_to_box, selection_to_cylinder add-ons by id: modular_tree, cell_fracture (a shatter), Bagapie (scatter, ivy) </samples>

#### Block 1

````text
import bpy, qm
scene = bpy.context.scene
scene.render.engine, scene.cycles.samples = "CYCLES", 8   # render.opengl refuses under -b; EEVEE renders in software
scene.render.resolution_x = scene.render.resolution_y = 656
wall = bpy.data.objects["Wall"]                       # JOINED blocks = islands; damage a duplicate, keep the pristine original
dmg = wall.data.attributes.new("dmg", "BOOLEAN", "POINT")
dmg.data.foreach_set("value", [v.co.x > 0 for v in wall.data.vertices])
qm.qm_apply(wall, "chunks", selection_attr="dmg")     # bites only the selected blocks; new faces take the LAST material slot
qm.qm_apply(wall, "cracks", Scale=4.0)                # params by socket name
for name, cam in (("a", "Cam34"), ("b", "CamGable"), ("c", "CamTop")):   # a turnaround: three 656-px views fill see's 2000 px, one alone renders at 1568
    scene.camera = bpy.data.objects[cam]
    scene.render.filepath = f"/tmp/proof/wall_{name}.png"
    bpy.ops.render.render(write_still=True)
bpy.ops.export_scene.gltf(filepath="/workspace/wall.glb", export_apply=True)
dg = bpy.context.evaluated_depsgraph_get(); print("tris", sum(len(o.evaluated_get(dg).data.loop_triangles) for o in scene.objects if o.type == "MESH"))
````

#### Block 2

````text
montage /tmp/proof/wall_*.png -tile 3x1 -geometry +4+4 /tmp/proof/wall.png && spawn see /tmp/proof/wall.png
````

#### Block 3

````text
model.materials.<slot>.texture: "cdn/texture-<what>.png"
````

#### Block 4

````text
import bpy, json                                       # art/knight/build.py: the character's one pass
C = json.load(open("art/knight/contract.json"))        # {"unit": "m", "height": 1.9, "feet": 0, "up": "+Z", "front": "-Y", "forward": "+z", "tris": 12000}
bpy.ops.import_scene.gltf(filepath="/workspace/knight/body.glb")    # the body: mpfb (→api), your own, or a CDN base (→geometry)
body = next(o for o in bpy.context.scene.objects if o.type == "MESH" and o.vertex_groups)   # the skinned body, never the importer's bone widgets
dg = bpy.context.evaluated_depsgraph_get(); zs = sorted((body.matrix_world @ v.co).z for v in body.evaluated_get(dg).data.vertices)   # the deformed body in world space renders; body.scale moves a node no viewer draws
s = C["height"] / (zs[-1] - zs[0]); (body.find_armature() or body).scale = (s, s, s); bpy.ops.object.select_all(action="SELECT"); bpy.ops.object.transform_apply(scale=True)   # metres at scale 1; A = landmarks (hip, chest, shoulder) → anatomy.json
rig = mixamo_armature(A)
for o in (body, cuirass(A), pauldron(A, "L"), pauldron(A, "R"), gambeson(A)): o.modifiers.new("skin", "ARMATURE").object = rig
sword = longsword(); sword.parent, sword.parent_type, sword.parent_bone = rig, "BONE", "RightHand"   # the shield on LeftForeArm
for name, keys in CLIPS.items():                       # each clip, idle too, solved with none live, then keyed, no NLA: a solve under a live clip keys its pose
    rig.animation_data.action = None; poses = solve(rig, keys); rig.animation_data.action = bpy.data.actions.new(name); key_pose(rig, poses)
bpy.ops.export_scene.gltf(filepath="/workspace/knight.glb", export_apply=True, export_animation_mode="ACTIONS")
audit("/workspace/knight.glb", C)
````

#### Block 5

````text
scatter: Scatter on Surface, Array, Instance on Elements, Randomize Instances are bundled node groups (find /opt/blender -path '*assets*' -name '*.blend', append), or Distribute Points on Faces → Instance on Points ← Object Info → Realize Instances
damage: Mesh to SDF Grid → SDF Grid Boolean (Difference, noise-displaced cutters where the hits land) → Grid Dilate & Erode (negative eats edges) → Grid to Mesh // voxel ~2% of the long axis, halved for chips, never for silhouettes; poly count and bake time scale with it
Pointiness, Bevel and AO wear are Cycles-only: bake them or make the damage geometric
lighten (over its anchor, a heavy upload row, a slow world): plan in counts: each model's ctx.world.assets[ref].triangles × the rows placing it (.scene rows and the templates they point at; render: false draws nothing), ranked, summed against the anchor, spawn perf --frame for the frame's drawn total; lighten the file once and every placement follows: spawn fetch <ref>, Decimate (Collapse, ratio = target ÷ count), the export row's weld and smooth, one proof camera before and after (silhouette loss shows in pixels; none is the bar), export, spawn upload, point every row at the printed address, say the before and after count
append a node group headless: with bpy.data.libraries.load(path, link=False) as (src, dst): dst.node_groups = [n for n in src.node_groups if "Scatter" in n] // obj.modifiers.new("x", "NODES").node_group = group; modifier inputs go by identifier, not name: {s.name: s.identifier for s in group.interface.items_tree if getattr(s, "in_out", "") == "INPUT"}
add-ons: a tool Blender's natives lack is one install away: /opt/workshop/blender/provision-game-asset-addons.sh <id> (any extensions.blender.org id; →workshop) prints the module to enable per run under --factory-startup: bpy.ops.preferences.addon_enable(module="bl_ext.blender_org.<id>"); addon ops are plain bpy.ops on the selected, active object
mpfb, a realistic human body on the rig the engine reads (no dial, remesh, big head or flat paint makes its face toon: a toon or restyle takes its art style's road, →geometry; any mixamo-named rig plays every library clip): from bl_ext.blender_org.mpfb.services import HumanService, TargetService; m = TargetService.get_default_macro_info_dict(); m.update({"age": 0.8, "weight": 0.9, "height": 0.2}); body = HumanService.create_human(macro_detail_dict=m); HumanService.add_builtin_rig(body, "mixamo") // dials 0..1: gender age muscle weight proportions height; default body 27k tris; "mixamo" only (→animations); its provision brings skins on this body's map, eyes, brows, lashes, hair, clothes: HumanService.set_character_skin and .add_mhclo_asset dress it as the provision prints
voronoi fracture: bpy.ops.object.add_fracture_cell_objects(source_limit=40, margin=0.001) // pieces land beside the original; give the source a second slot first and aim the interior-material option at it; export whole + broken as two assets
qm.qm_list() / qm.qm_apply(obj, tool, selection_attr=None, **params) // applies a NODES modifier: real geometry; cracks, holes, chunks eat closed solids, so select whole islands (qm_apply refuses an open patch)
bake: bpy.ops.object.bake on Cycles // needs a UV map and each material's active Image Texture node on the target image, or bakes silently black; selected-to-active is a Cycles session per object: apply modifiers, keep Object coords in an attribute the materials read, join
export: end GN graphs with Realize Instances (raw instances are exporter-fickle); weld and smooth-shade first: a flat-shaded export splits every edge into seams the engine's far levels cannot collapse; origin at each part's visual bottom center, placed there in the kit: the engine stands it on feetPosition; burial is y: { terrain: -X }, never a shifted origin. Blender's front (−Y) exports as glTF +Z: a thing built with a face is placed `model: { id, forward: "+z" }`; a rigged file's own facing is the `facing:` line `spawn upload` prints (→uploaded-models). A placed thing is solid only with `physics: "static"` (a walker: "character"), its collider cooked from the mesh
junctions: a gable end-wall is a pentagon (-w/2,0) (w/2,0) (w/2,eave) (0,ridge) (-w/2,eave); sink roof slabs ~2 cm into the pitch plane, embed trim, sills and chimneys ≥ 3 cm into their host: overlap makes gaps impossible, exact contact misses blind; per-face color jitter reads as checkerboard, not age
order (a roster): contract → donor measured → ONE hero at the proof (3/4, side, the extreme stride) approved → the others share the pipeline, never one body scaled and recoloured
contract.json first (the shape above) // every script of the family reads it; scale ONCE from it: a source scale × a manifest scale doubles the body
parts: garments, plates, weapons, shields are their own objects fitted to anatomy.json // plates overlap in the real order, seated ≥ 2 cm into their host; a rigid plate follows ONE bone, cloth deforms by weights with stride room in it; a weapon parents to its hand bone; live, children: [{ attachment: { bone: "RightHand" }, model }] seated in its `fist` (→uploaded-models)
rig: one deform armature, Mixamo-style names (the ones the engine's IK, grounding and attachment resolve), positive scale, no root motion; weights proven at the extreme pose (knee, elbow, arm raised) in the proof BEFORE texture // a mirrored bone or a scaled armature exports a body that folds
clips: Idle Walk Run Attack Hit Death // the placed row plays each by name (ctx.self.anim, →uploaded-models); a body you rigged carries its own clips
audit: re-import the .glb into an empty scene (bpy.ops.wm.read_factory_settings(use_empty=True)), measure the deformed body in world space; the JSON chunk gives skins/joints, animations by name, one node per part, triangles vs the budget // the row you report IS these numbers
````


### After clicking "read → bring-a-game A game made elsewhere, rebuilt Jayzee-native."

The bar: the maker plays it and says "that's my game": its rules and their numbers, its levels, controls, screens, art and sounds, on Jayzee's engine, with friends, phones and saves. A cousin of it, or a new game in its art, missed.

Lay its data: jayzee bring /workspace/brought/<game>, the whole folder. bring/<game>/laid.yml says what stands and what it could not lay; bring/<game>/pieces.yml maps the code: a header and an entry per code unit: what it drives, gives and uses. The lay is the truth for files: never re-lay it; mend what it got wrong and say so.

Lay its data

jayzee bring /workspace/brought/<game>

bring/<game>/laid.yml

bring/<game>/pieces.yml

Run the original in its own engine: what its code makes as it runs (a level dealt from a seed, layers a script adds) is in no file, so "not laid: nothing" does not cover it. Godot runs here (godot --headless -s dump.gd; xvfb-run -a godot --rendering-driver opengl3 for frames), a web game in a page; dump each screen's tree and frame and all it deals (levels, props, scatter). Never re-write its generators in another language: that deals another game. When it cannot run here (Unity, Unreal, no build), say what stays unread and ask for a build.

Run the original in its own engine

godot --headless -s dump.gd

xvfb-run -a godot --rendering-driver opengl3

Survey: pieces.yml whole, the dump, and only the source they leave unclear. Tell the maker the inventory (each screen, level and layer: file, run or unread) and what the port will and will not hold.

Survey

Wire, then weave. The laid files (scenes, templates, world.config.yaml) are yours alone, and every brief says so. First write what pieces share: each template's behavior, one scripts/<piece>.js a piece, each gives an event of its name and arguments. Write tight-knit code yourself; loose ones run at once in one run_weave, a lane each of 100 steps. A brief: its entry, the header, the events, its sources and dump (never a generator), the files it alone writes; its code keeps the source's math, every number in order, each body where Jayzee stood it, and its done line is a state read in the world.

Wire, then weave.

scripts/<piece>.js

Test it whole yourself: title through a run to game over, on desktop and phone (look with target: "player", device: "phone"), beside the original's frames. List each difference (a skipped title or layer, a wrong-sized hero, a camera unlike its, stacked bodies, play under the rail or past a thumb, a silent sound), fix once, play again. Hand over a loop that plays, with what differs and why. Offer to publish; its address, likes and reviews stay.

Test it whole yourself

target: "player", device: "phone"

Keep what the player meets: its screens in its own face (a title stays one: ui.startScreen; menus, level select, game over and HUD stay screens, never places to walk), its keys, mouse, camera and feel. Add touch for a phone (→mobile-controls), progress and bests in player.state, and say in one line what together means for it (each on their own run, or one match →rooms-and-matchmaking).

Keep what the player meets

Leave behind what Jayzee already is: its engine and libraries in the port (its engine reads it, step 2), networking, servers, lobby, accounts, loading screen, settings, ads and store SDKs. Its renderer, shaders and physics are made the engine's way (a collision image becomes colliders), never decoded.

Leave behind what Jayzee already is

#### Block 1

````text
spawn bring /workspace/brought/<game>
````

#### Block 2

````text
bring/<game>/laid.yml
````

#### Block 3

````text
bring/<game>/pieces.yml
````

#### Block 4

````text
godot --headless -s dump.gd
````

#### Block 5

````text
xvfb-run -a godot --rendering-driver opengl3
````

#### Block 6

````text
scripts/<piece>.js
````

#### Block 7

````text
target: "player", device: "phone"
````


### After clicking "mods"

The bar: a mod is a folder that works the moment it lands (mods/<name>/ with a mod.json, its scripts, its own lib/, a skill that teaches it and a command that runs it), and a consumer installs it, reads its skill, presses its key and the thing happens, with nothing copied into their world.config.yaml and nothing left behind when they remove it. A workflow mod (a skill and a command, no scripts) meets the same bar: the creator's ask is the approval: the bar comes from their reference or she names it herself, the run starts that turn, and a result they don't like is one jayzee undo away, so its skill says what the run does and how the result is judged. Build and taste it in your world first; publishing snapshots the folder. jayzee mod --help prints the verbs' contract; the folder rules below are what it does not say.

jayzee undo

jayzee mod --help

// mods/camera-tools/mod.json declares what cannot be a file { "name": "camera-tools", "displayName": "Camera Tools", "description": "a cutscene sequencer", "tags": ["camera"], "inputs": { "actions": { "playShot": { "keys": ["p"] } } }, "attach": [{ "target": { "kind": "god" }, "behavior": "sequencer.js" }], "objects": [{ "id": "dolly", "template": "templates/dolly.js#dolly" }], "tab": { "id": "editor", "label": "Cinema", "icon": "🎬", "render": "panel.js" } }

mods/<name>/ // mod.json's name and the folder are one word. scripts stay as-is; skills/<id>.md registers as a skill; commands/<id>.md as a slash command: a skill needs a frontmatter description, a command's frontmatter matches your local commands/*.md; keep both filenames stable across versions, consumers reference the ids import { easeOut } from "lib/easing.js" // bare lib/… or relative ./lib/…: both resolve inside the package (mods/<name>/lib/… wherever it is installed), so your folder's spelling is every consumer's; never an absolute mods/<name>/… path (it dangles in their world). a lib/ target must be in the folder: copy it in; files under builtin/, mods/<name>/ or a <name>/ subfolder are refused objects: [{ id, template: "templates/<id>.js#<Export>" }] // #<Export> picks one of its exports, behavior paths are tree paths (mods/<name>/x.js); an install places each in the default place under that id (one the creator moved stays moved), a remove takes the row back attach: [{ target: { kind: "player" | "camera" | "god" }, behavior }] // an object's behaviors ride its template's behavior list inputs.actions / inputs.axes arrive as <name>:<action> // a folder script's bare input.pressed.x reads it; tab: { id, label, icon, render } lands as <name>#<id> in god mode. The folder in the tree IS the installation versions: exact semver, never ranges; publish is always 1.0.0; a version is immutable: fixes go through update, which refuses a no-change update. install replaces the folder's files and keeps every file you edited (named in the result) except mod.json: editing mods/<name>/… is expected, never an error; remove refuses while a script outside the folder names mods/<name>/ and lists them (--force breaks them) visibility: public (searchable) | unlisted (installable by exact name) | private (only you) // mod.json's visibility applies at FIRST publish only (omitted = public; develop scaffolds unlisted). After that only configure changes it, never an update card.js // the mod page's picture and thumbnail: each publish and update, a copy runs it as run_script and films 3 s: stage, set ctx.view.camera; a cover or image they give fills the shot. tell the creator the shot first develop <name> // any world becomes the workshop; an existing mods/<name>/ (installed or not) is the workshop use_skill({ skills: ["<name>#<skill-id>"] }) // a mod's skills load before installing (public or unlisted): read a mod's own docs before recommending it

#### Block 1

````text
spawn undo
````

#### Block 2

````text
spawn mod --help
````

#### Block 3

````text
// mods/camera-tools/mod.json declares what cannot be a file
{
  "name": "camera-tools",
  "displayName": "Camera Tools",
  "description": "a cutscene sequencer",
  "tags": ["camera"],
  "inputs": { "actions": { "playShot": { "keys": ["p"] } } },
  "attach": [{ "target": { "kind": "god" }, "behavior": "sequencer.js" }],
  "objects": [{ "id": "dolly", "template": "templates/dolly.js#dolly" }],
  "tab": { "id": "editor", "label": "Cinema", "icon": "🎬", "render": "panel.js" }
}
````

#### Block 4

````text
mods/<name>/ // mod.json's name and the folder are one word. scripts stay as-is; skills/<id>.md registers as a skill; commands/<id>.md as a slash command: a skill needs a frontmatter description, a command's frontmatter matches your local commands/*.md; keep both filenames stable across versions, consumers reference the ids
import { easeOut } from "lib/easing.js" // bare lib/… or relative ./lib/…: both resolve inside the package (mods/<name>/lib/… wherever it is installed), so your folder's spelling is every consumer's; never an absolute mods/<name>/… path (it dangles in their world). a lib/ target must be in the folder: copy it in; files under builtin/, mods/<name>/ or a <name>/ subfolder are refused
objects: [{ id, template: "templates/<id>.js#<Export>" }] // #<Export> picks one of its exports, behavior paths are tree paths (mods/<name>/x.js); an install places each in the default place under that id (one the creator moved stays moved), a remove takes the row back
attach: [{ target: { kind: "player" | "camera" | "god" }, behavior }] // an object's behaviors ride its template's behavior list
inputs.actions / inputs.axes arrive as <name>:<action> // a folder script's bare input.pressed.x reads it; tab: { id, label, icon, render } lands as <name>#<id> in god mode. The folder in the tree IS the installation
versions: exact semver, never ranges; publish is always 1.0.0; a version is immutable: fixes go through update, which refuses a no-change update. install replaces the folder's files and keeps every file you edited (named in the result) except mod.json: editing mods/<name>/… is expected, never an error; remove refuses while a script outside the folder names mods/<name>/ and lists them (--force breaks them)
visibility: public (searchable) | unlisted (installable by exact name) | private (only you) // mod.json's visibility applies at FIRST publish only (omitted = public; develop scaffolds unlisted). After that only configure changes it, never an update
card.js // the mod page's picture and thumbnail: each publish and update, a copy runs it as run_script and films 3 s: stage, set ctx.view.camera; a cover or image they give fills the shot. tell the creator the shot first
develop <name> // any world becomes the workshop; an existing mods/<name>/ (installed or not) is the workshop
use_skill({ skills: ["<name>#<skill-id>"] }) // a mod's skills load before installing (public or unlisted): read a mod's own docs before recommending it
````


### After clicking "read → borrowing Reusing other creators' work, credited."

borrowing: ask-first in world.config.yaml (absent: open) asks other makers' Cleetus to build their own, not take from this world. It is a wish, not a lock: they can still read it. Set it, or delete it, on the maker's word.

borrowing: ask-first

#### Block 1

````text
borrowing: ask-first
````


### After clicking "Covers, publishing, unpublishing."

On "publish it" for an unreleased world, first grep its scripts in its own call, read before the covers, for a wallet or chain call (ether|eth_|web3|solana|phantom|window\.ton|tonconnect|walletconnect): one holds it back till out, an in-game coin, wallet or chain does not; then its achievements (world.config.yaml achievements, jayzee api AchievementDef, each a trophy file written once: the trophy turn looks), then jayzee publish propose_covers, asking nothing first, and write its whole controls for a pad (jayzee api InputActionDef) and a phone (→mobile-controls) while four covers print: their pick publishes the game with that cover and your later writes at the turn's end: nothing more from you. A live world gets the same grep, achievements and controls of what changed, then jayzee publish publish_update with the name and notes players read and --weight; the box stays; hand over its play link. A fix while the draft holds unfinished work: Edit, Write or Delete @user/slug@live/scripts/x.js; that change alone publishes. A character or piece for others' worlds is a mod: jayzee mod publish.

ether|eth_|web3|solana|phantom|window\.ton|tonconnect|walletconnect

achievements

jayzee api AchievementDef

jayzee publish propose_covers

jayzee api InputActionDef

jayzee publish publish_update

--weight

@user/slug@live/scripts/x.js

jayzee mod publish

Covers, faces and remakes render their own cards and a publish films a new player's arrival unless a trailer is set: never poll get_press_status; say what comes next; past a first menu, offer your own trailer.

get_press_status

Offer to publish when the game turns playable, as a collaborator who noticed; a creator's word publishes an empty meadow too: start its covers, say what stands there.

Covers and every publish_update answer with frames at the sizes players meet and layout facts: fix what they show and republish a live game. For computers only, jayzee publish declare_platforms --platforms '["desktop"]' after the covers.

publish_update

jayzee publish declare_platforms --platforms '["desktop"]'

Unpublish: box and cover leave the shelf, the play link plays the last publish, rooms, saves and engine faults stay, the next publish picks a cover.

Players get no file export, only what the game gives (a prize, a save, the play link); a creator's file lives on their site, linked in the game.

Reading a creator their own script or table rows is ordinary work; workshop files stay inside Jayzee.

#### Block 1

````text
ether|eth_|web3|solana|phantom|window\.ton|tonconnect|walletconnect
````

#### Block 2

````text
achievements
````

#### Block 3

````text
spawn api AchievementDef
````

#### Block 4

````text
spawn publish propose_covers
````

#### Block 5

````text
spawn api InputActionDef
````

#### Block 6

````text
spawn publish publish_update
````

#### Block 7

````text
--weight
````

#### Block 8

````text
@user/slug@live/scripts/x.js
````

#### Block 9

````text
spawn mod publish
````

#### Block 10

````text
get_press_status
````

#### Block 11

````text
publish_update
````

#### Block 12

````text
spawn publish declare_platforms --platforms '["desktop"]'
````


### After clicking "read → god-mode Your own build tools: rigs, brushes, gizmos."

- H2: Building for God Mode

Building for God Mode

The bar: it re-derives under the hand: drag a tower taller and floors appear, floors = round(height / floorHeight), never fixed quads. The handle is where the eye went; a shapeless number is a chip.

floors = round(height / floorHeight)

Tab+G (Jayzee app: globe, God Mode, not Make) opens it for editors and admins (godMode.scope); right or touch drag looks; right-click or tap selects; double-tap Space flies; C shows all controls; godMode.behavior writing ctx.self.rotation's yaw turns the look as much. A published game's control is play UI behind ctx.self.isEditor (→game-ui).

godMode.scope

godMode.behavior

ctx.self.isEditor

Built-in shapes have editors (move, rotate arc or R, scale, extrude, duplicate, delete, height grips, radius bar): in 3D both yaw; tilt and flip are yours. Any editor tool a creator asks for (a Blender or Unity layout, multi-select, per-world-kind tool sets, a hide key, wheel as fly speed) is theirs, built when asked: a god-rig behavior (attach target kind: "god", →mods) whose editor(ctx, obj) adds the creator's DOFs on the selection, one handle each, re-run per frame from state alone; return { replaces: "default" } stands the built-ins down. Never a request or a why. A handle is your mesh, not an engine glyph: in render(h), h.self.primitive = { kind: "torus", radius, tube }, h.self.material = { color, unlit: true, depthTest: false } and h.self.rotation = { yaw: 90 } make it that mesh, triangle-picked, hover-lit, others faded in a drag. A torus centres on at, hole along +Z; a cone, cylinder or cube stands on it, pointing +Y; a tube is a hairline. Size from obj.bounds; drag writes obj.rotation, obj.worldFeetPosition or obj.scale with one ctx.authoring.dragReadout.

kind: "god"

editor(ctx, obj)

return { replaces: "default" }

render(h)

h.self.primitive = { kind: "torus", radius, tube }

h.self.material = { color, unlit: true, depthTest: false }

h.self.rotation = { yaw: 90 }

obj.bounds

obj.rotation

obj.worldFeetPosition

obj.scale

ctx.authoring.dragReadout

Press anchors: at, ctx.self.bounds and obb.axes are fresh each tick; a drag reading them feeds back (stuck or zeroed handle). Freeze inputs and gains at press: import { axisDragPress, axisDragSigned, rayToPlane } from "builtin/authoring" (press { snap: axisDragPress(ray, center, axis), start }, drag start + axisDragSigned(ray, snap); a radius: drag start + d(ray) - d(pressRay), d(ray) = |rayToPlane(ray, center, normal) - center| (null keeps it)). bounds.obb (axes, halfExtents) rides any yaw. Priority: 0 move, 10 height, 30 radius/size, 50 rotation, 60+ secondary: lower survives declutter.

obb.axes

import { axisDragPress, axisDragSigned, rayToPlane } from "builtin/authoring"

{ snap: axisDragPress(ray, center, axis), start }

start + axisDragSigned(ray, snap)

start + d(ray) - d(pressRay)

d(ray) = |rayToPlane(ray, center, normal) - center|

bounds.obb

Chips: continuous slider, enumerated menu, one-shot click; icon is a slug. Saved keys: parent, feetPosition, rotation, scale, primitive, spline, material, model, sprite, visible, scatter, light, audio, particles, npc; any other write names its keys in persistProperties (["state"]) or reaches no file or undo. A reset override writes ABSENT, never 0.

slider

menu

persistProperties

["state"]

A rig (camera, placement tool) is authored: numbers in the spec.

The engine owns brush rings, chips, strokes, erase and undo. Sculpt and material paint are built in; each decoration layer (terrain.decorations.layers.<id>) is a shelf Foliage brush. Material paint blends by weight; the mode chip Replace (armBrush({ replace: true })) lowers other paint and natural ground under the dab; Erase clears all. A brush's paintScript exports only paint(ctx, p, inset, current) → painted value; current + ctx.falloff(inset) * ctx.strength is the softness. A scatter brush first runs ctx.ensureScatter({ density, threshold, sampling, templates }); a field brush names field ("terrain:height", "terrain:material:<id>", a game's "zone:level") and reads ctx.readField, ctx.slope, ctx.strokeStartValue. Both read dab-start ground (ctx.getTerrainHeight(x, z) = ctx.place.terrain.heightAt then). Tilemap ground paints tiles (→2d-mode).

terrain.decorations.layers.<id>

armBrush({ replace: true })

paint(ctx, p, inset, current)

current + ctx.falloff(inset) * ctx.strength

ctx.ensureScatter({ density, threshold, sampling, templates })

"terrain:material:<id>"

"zone:level"

ctx.slope

ctx.strokeStartValue

ctx.getTerrainHeight(x, z)

ctx.place.terrain.heightAt

Blueprints: blueprint on anything placed again; placing clones its subtree; a new category is a tab. A source nobody meets lives in a zoo place (ctx.world.places.zoo = { terrain: { kind: "off" } }; jayzee({ …, place: "zoo", blueprint })). Palette = blueprints; coverage = brush; tuning = creator tab, never "jayzee X" buttons.

blueprint

zoo

ctx.world.places.zoo = { terrain: { kind: "off" } }

jayzee({ …, place: "zoo", blueprint })

ui.js hides in god mode, whose screens are creator tabs: a 320 px game-ui column (w-full; ctx null at first) that its tab or shortcut: "G" toggles; onMount/onDestroy on open/close; actions reach godMode.behavior's onInput.

w-full

shortcut: "G"

onMount

_Generated: do not edit between the markers._

// api.authoring: only inside editor(api, obj) api.authoring.handle(spec: HandleSpec) // THE authoring surface api.authoring.hit?: Hit // Set when the editor is running in HOVER mode: an unselected object under the cursor api.authoring.place(entityId: str, opts?: { selectOnCommit?: bool, spawnSpec?: ObjectSpec, descendantSpecs?: ObjectSpec[], armedAtTick?: num }) // Hand an entity to transient "in-hand" placement: it follows the pointer over terrain until the creator presses to place and releases to commit (right-click cancels) api.authoring.draw(entityId: str, opts?: { from?: "start" | "end" }) // Hand a spline-owning entity to the freehand-draw system. The creator's next press-drag-release extends the spline from the chosen end. Call from a click api.authoring.armBrush(opts: { id: str, script: str, label: str, color: str, fields: readonly str[], radius: num, strength: num, feather?: num, replace?: bool, consumerObjectId?: str, placeId?: str, content?: ScatterBedContent }) // Arm a field brush from a selected object's editor api.authoring.pickNewParent(entityId: str) // Arm a "pick a parent" gesture: the creator's next click on another object parents entityId to it, preserving its current world pose api.authoring.dragReadout(text: str) // Publish a short live value readout ("3.4 m", "45°") for this creator's cursor label api.authoring.askSavi(message: str) // Hand Cleetus a request on the creator's behalf: what a god-mode control does when the creator presses it and waits on the answer (Save Blueprint, a shelf's Ask Cleetus) api.authoring.anchoredFeet(): unknown // The terrain-anchored FORM of this root's feet as the LIVE world pins it: { x, z, y: { terrain: offset } }, the y-less { x, z } shorthand, { tile, offset } api.authoring.boundsWithChildren(): WorldBoundsBox | null api.authoring.snapCandidates(center: Vec3, radius: num): readonly SnapCandidate[] // Nearby snap-candidate boxes for a drag in flight: world OBBs of AUTHORED neighbors within radius of center: the edited object's own subtree, god-mode tooling, splines api.authoring.cameraPos?: LayoutEye // Creator's eye this frame: its position (for camera-relative at math) and, when the client knows it, its view direction api.authoring.plane?: EditingPlane // The visible editing plane when this object lives in a 2D place (2d-top → XZ, 2d-side → XY), or absent in 3D api.authoring.orthoHalfHeight?: num // Half-height (world meters) of the creator's ORTHOGRAPHIC view this frame; absent under a perspective camera api.authoring.cursor?: Ray // The cursor ray this frame ({ origin, direction }) api.authoring.modifiers?: { shift: bool, alt: bool, ctrl: bool } // Modifier keys held this frame. Read the LIVE value: in render for an affordance cue (swap the gizmo when shift is held) AND in drag to pick the gesture's mode api.authoring.primaryDown?: bool // Primary pointer state this frame. Hover editors use this to swap a hint affordance into its active drag visualization while the press snapshot remains frozen in the operation api.authoring.surfaceHit?: { objectId: EntityId, position: Vec3, normal: Vec3 } // The world surface under the cursor this frame, EXCLUDING the object being edited (and its subtree), so a drag can rest the object on whatever is beneath the pointer api.authoring.activeHandleStableId?: str // stableId of the handle the creator is currently dragging on THIS object, or undefined when no drag is active api.authoring.activeDragStart?: unknown // The active drag's shared op state (op.start, whatever press() returned), present only while a drag is live on this object // Shapes HandleSpec = SpatialHandleSpec | ActionHandleSpec, SpatialHandleSpec = HandleGesture & { id: str, at: Vec3, priority?: num, atomicPose?: bool }, ActionHandleSpec = { id: str, at: "action", label?: str, icon?: str, iconUrl?: str, color?: str, swatch?: str, thumbnail?: str, compact?: bool, touchOnly?: bool, stateText?: str, disabled?: bool, active?: bool, click?: (ctx: OneShotContext) => void, persistProperties?: readonly str[], menu?: MenuSpec, slider?: SliderSpec }, HandleGesture = { render?: (handle: ObjectAPI) => void, press?: (ray: Ray) => unknown, drag?: (ray: Ray, start: unknown) => void, release?: (start: unknown) => void, click?: (ctx: OneShotContext) => void, secondaryClick?: (ctx: OneShotContext) => void }, OneShotContext = { capturedAtTick: num, creatorId: EntityId }, GizmoPrimitiveSpec = { kind: "gizmo", shape: GizmoShape, dir?: Vec3 | "+x" | "-x" | "+y" | "-y" | "+z" | "-z", scale?: num, axis?: Vec3, forward?: Vec3, points?: readonly Vec3[], paths?: readonly (readonly Vec3[])[], thickness?: num, icon?: str, variant?: "square" | "diamond", weight?: "primary" | "secondary", connect?: Vec3, role?: "move" | "size" | "rotate" | "aim", tint?: num, terrainLocked?: bool }, GizmoShape = "arrow" | "square" | "rotation-arc" | "bar" | "icon" | "pad" | "size" | "extrude" | "lift" | "reticle", MenuSpec = { items: readonly unknown[] | (() => readonly unknown[]), render: (api: ObjectAPI, item: unknown) => str, apply: (item: unknown) => void, active?: unknown, persistProperties?: readonly str[] }, SliderSpec = { min: num, max: num, step?: num, value: num, apply: (value: num) => void, format?: (value: num) => str, persistProperties?: readonly str[] }, Hit = { positionWorld: Vec3, normalWorld: Vec3, positionLocal: Vec3, normalLocal: Vec3 }, Ray = { origin: Vec3, direction: Vec3 }, HandleEmphasis = "idle" | "hover" | "active",

<player>.selection = entity | id // the click's own applier (owner-resolve, bone hop, first-grab); a refusal throws ctx.world.creatorTabs // the ordered tab list, assigned whole (= [...tabs, { id, title, icon, script }]; = tabs.filter(t => t.id !== 'places'); = [] drops the key); the file is the durable form ctx.world.godMode.brushes.<id> = { paintScript, label, icon, color?, defaultRadius, defaultStrength, feather?, field? } // defines or replaces, validated (the dot throws naming the field); .<field> = v edits one ctx.world.godMode.brushes.<id> // the brush record (undefined when absent); delete removes it ObjectPropertiesSpec.blueprint?: { label?: str, category?: str, icon?: str }

#### Block 1

````text
floors = round(height / floorHeight)
````

#### Block 2

````text
godMode.scope
````

#### Block 3

````text
godMode.behavior
````

#### Block 4

````text
ctx.self.isEditor
````

#### Block 5

````text
kind: "god"
````

#### Block 6

````text
editor(ctx, obj)
````

#### Block 7

````text
return { replaces: "default" }
````

#### Block 8

````text
render(h)
````

#### Block 9

````text
h.self.primitive = { kind: "torus", radius, tube }
````

#### Block 10

````text
h.self.material = { color, unlit: true, depthTest: false }
````

#### Block 11

````text
h.self.rotation = { yaw: 90 }
````

#### Block 12

````text
obj.bounds
````

#### Block 13

````text
obj.rotation
````

#### Block 14

````text
obj.worldFeetPosition
````

#### Block 15

````text
obj.scale
````

#### Block 16

````text
ctx.authoring.dragReadout
````

#### Block 17

````text
obb.axes
````

#### Block 18

````text
import { axisDragPress, axisDragSigned, rayToPlane } from "builtin/authoring"
````

#### Block 19

````text
{ snap: axisDragPress(ray, center, axis), start }
````

#### Block 20

````text
start + axisDragSigned(ray, snap)
````

#### Block 21

````text
start + d(ray) - d(pressRay)
````

#### Block 22

````text
d(ray) = |rayToPlane(ray, center, normal) - center|
````

#### Block 23

````text
bounds.obb
````

#### Block 24

````text
slider
````

#### Block 25

````text
menu
````

#### Block 26

````text
persistProperties
````

#### Block 27

````text
["state"]
````

#### Block 28

````text
terrain.decorations.layers.<id>
````

#### Block 29

````text
armBrush({ replace: true })
````

#### Block 30

````text
paint(ctx, p, inset, current)
````

#### Block 31

````text
current + ctx.falloff(inset) * ctx.strength
````

#### Block 32

````text
ctx.ensureScatter({ density, threshold, sampling, templates })
````

#### Block 33

````text
"terrain:material:<id>"
````

#### Block 34

````text
"zone:level"
````

#### Block 35

````text
ctx.slope
````

#### Block 36

````text
ctx.strokeStartValue
````

#### Block 37

````text
ctx.getTerrainHeight(x, z)
````

#### Block 38

````text
ctx.place.terrain.heightAt
````

#### Block 39

````text
blueprint
````

#### Block 40

````text
zoo
````

#### Block 41

````text
ctx.world.places.zoo = { terrain: { kind: "off" } }
````

#### Block 42

````text
spawn({ …, place: "zoo", blueprint })
````

#### Block 43

````text
w-full
````

#### Block 44

````text
shortcut: "G"
````

#### Block 45

````text
onMount
````

#### Block 46

````text
// api.authoring: only inside editor(api, obj)
api.authoring.handle(spec: HandleSpec) // THE authoring surface
api.authoring.hit?: Hit // Set when the editor is running in HOVER mode: an unselected object under the cursor
api.authoring.place(entityId: str, opts?: { selectOnCommit?: bool, spawnSpec?: ObjectSpec, descendantSpecs?: ObjectSpec[], armedAtTick?: num }) // Hand an entity to transient "in-hand" placement: it follows the pointer over terrain until the creator presses to place and releases to commit (right-click cancels)
api.authoring.draw(entityId: str, opts?: { from?: "start" | "end" }) // Hand a spline-owning entity to the freehand-draw system. The creator's next press-drag-release extends the spline from the chosen end. Call from a click
api.authoring.armBrush(opts: { id: str, script: str, label: str, color: str, fields: readonly str[], radius: num, strength: num, feather?: num, replace?: bool, consumerObjectId?: str, placeId?: str, content?: ScatterBedContent }) // Arm a field brush from a selected object's editor
api.authoring.pickNewParent(entityId: str) // Arm a "pick a parent" gesture: the creator's next click on another object parents entityId to it, preserving its current world pose
api.authoring.dragReadout(text: str) // Publish a short live value readout ("3.4 m", "45°") for this creator's cursor label
api.authoring.askSavi(message: str) // Hand Savi a request on the creator's behalf: what a god-mode control does when the creator presses it and waits on the answer (Save Blueprint, a shelf's Ask Savi)
api.authoring.anchoredFeet(): unknown // The terrain-anchored FORM of this root's feet as the LIVE world pins it: { x, z, y: { terrain: offset } }, the y-less { x, z } shorthand, { tile, offset }
api.authoring.boundsWithChildren(): WorldBoundsBox | null
api.authoring.snapCandidates(center: Vec3, radius: num): readonly SnapCandidate[] // Nearby snap-candidate boxes for a drag in flight: world OBBs of AUTHORED neighbors within radius of center: the edited object's own subtree, god-mode tooling, splines
api.authoring.cameraPos?: LayoutEye // Creator's eye this frame: its position (for camera-relative at math) and, when the client knows it, its view direction
api.authoring.plane?: EditingPlane // The visible editing plane when this object lives in a 2D place (2d-top → XZ, 2d-side → XY), or absent in 3D
api.authoring.orthoHalfHeight?: num // Half-height (world meters) of the creator's ORTHOGRAPHIC view this frame; absent under a perspective camera
api.authoring.cursor?: Ray // The cursor ray this frame ({ origin, direction })
api.authoring.modifiers?: { shift: bool, alt: bool, ctrl: bool } // Modifier keys held this frame. Read the LIVE value: in render for an affordance cue (swap the gizmo when shift is held) AND in drag to pick the gesture's mode
api.authoring.primaryDown?: bool // Primary pointer state this frame. Hover editors use this to swap a hint affordance into its active drag visualization while the press snapshot remains frozen in the operation
api.authoring.surfaceHit?: { objectId: EntityId, position: Vec3, normal: Vec3 } // The world surface under the cursor this frame, EXCLUDING the object being edited (and its subtree), so a drag can rest the object on whatever is beneath the pointer
api.authoring.activeHandleStableId?: str // stableId of the handle the creator is currently dragging on THIS object, or undefined when no drag is active
api.authoring.activeDragStart?: unknown // The active drag's shared op state (op.start, whatever press() returned), present only while a drag is live on this object

// Shapes
HandleSpec = SpatialHandleSpec | ActionHandleSpec,
SpatialHandleSpec = HandleGesture & { id: str, at: Vec3, priority?: num, atomicPose?: bool },
ActionHandleSpec = { id: str, at: "action", label?: str, icon?: str, iconUrl?: str, color?: str, swatch?: str, thumbnail?: str, compact?: bool, touchOnly?: bool, stateText?: str, disabled?: bool, active?: bool, click?: (ctx: OneShotContext) => void, persistProperties?: readonly str[], menu?: MenuSpec, slider?: SliderSpec },
HandleGesture = { render?: (handle: ObjectAPI) => void, press?: (ray: Ray) => unknown, drag?: (ray: Ray, start: unknown) => void, release?: (start: unknown) => void, click?: (ctx: OneShotContext) => void, secondaryClick?: (ctx: OneShotContext) => void },
OneShotContext = { capturedAtTick: num, creatorId: EntityId },
GizmoPrimitiveSpec = { kind: "gizmo", shape: GizmoShape, dir?: Vec3 | "+x" | "-x" | "+y" | "-y" | "+z" | "-z", scale?: num, axis?: Vec3, forward?: Vec3, points?: readonly Vec3[], paths?: readonly (readonly Vec3[])[], thickness?: num, icon?: str, variant?: "square" | "diamond", weight?: "primary" | "secondary", connect?: Vec3, role?: "move" | "size" | "rotate" | "aim", tint?: num, terrainLocked?: bool },
GizmoShape = "arrow" | "square" | "rotation-arc" | "bar" | "icon" | "pad" | "size" | "extrude" | "lift" | "reticle",
MenuSpec = { items: readonly unknown[] | (() => readonly unknown[]), render: (api: ObjectAPI, item: unknown) => str, apply: (item: unknown) => void, active?: unknown, persistProperties?: readonly str[] },
SliderSpec = { min: num, max: num, step?: num, value: num, apply: (value: num) => void, format?: (value: num) => str, persistProperties?: readonly str[] },
Hit = { positionWorld: Vec3, normalWorld: Vec3, positionLocal: Vec3, normalLocal: Vec3 },
Ray = { origin: Vec3, direction: Vec3 },
HandleEmphasis = "idle" | "hover" | "active",
````

#### Block 47

````text
<player>.selection = entity | id // the click's own applier (owner-resolve, bone hop, first-grab); a refusal throws
ctx.world.creatorTabs // the ordered tab list, assigned whole (= [...tabs, { id, title, icon, script }]; = tabs.filter(t => t.id !== 'places'); = [] drops the key); the file is the durable form
ctx.world.godMode.brushes.<id> = { paintScript, label, icon, color?, defaultRadius, defaultStrength, feather?, field? } // defines or replaces, validated (the dot throws naming the field); .<field> = v edits one
ctx.world.godMode.brushes.<id> // the brush record (undefined when absent); delete removes it
ObjectPropertiesSpec.blueprint?: { label?: str, category?: str, icon?: str }
````


### After clicking "read → debugging Lag, stutter, freezes, slow loads."

A speed complaint is jayzee perf before any cause is said, even on her own fresh change; she says the frame's triangles and what draws most of them, the table's top row, and her fix. A fix to models or collision is hers, told in one line: what changed, why, and that "undo" puts it back; their upload is fixed at its source first. The frame's triangles are one screen's view; the world's models can total far more. A bug is a read before a theory: first the game's scripts that touch the symptom (your own writes first), then that file's history (history/changes/scripts/<file>.js) and the run's rows, then the engine's reads; the cause you name is the line they show. A second "fix it" on one thing means the repairs stacked (a second basin beside the first): delete the attempts and rebuild it as ONE, anchored to the terrain's own numbers.

jayzee perf

history/changes/scripts/<file>.js

A hook that threw keeps running: its throws are counted on getObject(id).behaviorHealth.broken (running: "running", count) and one folded Behavior error in <hook> row in getLogs({ level: "error" }) names the file, line and error (a timer or microtask it queued: module.task): fix the line, the next call runs the fix. Only an endless loop stops its hook: it trips the loop budget, one law.module.hook-broken row names it (running: "inert"), and the script's other hooks keep running; a save of the file is the retry.

getObject(id).behaviorHealth.broken

running: "running"

Behavior error in <hook>

getLogs({ level: "error" })

module.task

law.module.hook-broken

A slowdown the engine CHOSE shows on each screen's frame line: engine governors reducing work names which face, the level in words, why and how long; picture lowered says in the creator's words what that screen gave up. Neither line: nothing is held down. The frame's ms is the lowered picture's; fix the row or pass that costs it and the picture rises once under budget.

engine governors reducing work

picture lowered

jayzee perf is a table: a verdict on top, the tick's rows per script and system, the frame per screen with its GPU passes and scene groups, physics, the network by owner, each player's actions in four legs, the terrain builders (µs per sample, ms per chunk: heightAt runs ~17k times per 80 m chunk, so a loop inside it IS the world's cost; law.terrain.generator-cost lands once in getLogs naming the script), the breaches the engine told; --script <file>, --frame, --boot, --room live for the posted game, --wait for the next sample: one call per sample, never a loop (in a helper's brief too). A frame's heaviest models are the drawn ones the engine told or the table lists, named before a script is blamed; lightening →blender-game-assets. jayzee gpu (ssh gpu) is the room's GPU box with a display and Chrome: find bottlenecks and time a drawing fix there before you say it is faster.

law.terrain.generator-cost

--script <file>

--frame

--boot

--room live

--wait

The table's top row is the fix's address: change that script. In a crowd two shapes top it: walking the scenery's triangles per plan (ask raycast(…, { hits: "geometry" }) per segment) and a loop over every peer per candidate (ask query({ center, radius })); one candidate per tick. A scripts row enemy.js update 6.3 ×47 is 47 bodies' own ticks, not dispatch: the bill is each body's LOOK (a query, a raycast, a findPath every tick) and its per-tick state writes (each a wire row). Look on a cadence: a few times a second through ctx.place.players, or one pass in the place's sim.js writing each body's state.target, and keep the walk per tick. A row that runs rarely and long (p50 0 yet ranked first), or the longest pause past the tick, is one run doing everything at once: spread the batch over ticks (N items per update, a cursor in state), or rebuild only what changed. Running it less often leaves each hitch as long.

raycast(…, { hits: "geometry" })

query({ center, radius })

enemy.js update 6.3 ×47

state.target

p50 0

the longest pause

Pop-in at a moment the game sees coming (a boss door, the next lesson) is the game's to warm, not jayzee early: the player's behavior runs ctx.emit("preload", { refs }) before it.

ctx.emit("preload", { refs })

What drew a pixel: await getPixelProvenance({ screen: [x, y], camera: { eye, aim, fov } }): 0..1 fractions, y down; no camera reads the live view. Groups name the system (models, terrain/decorations, sky, (background), …) and what drew it: the spec object or scatter-bed where CPU geometry agrees, a decoration's bed by its layer; "no CPU-side geometry matches" on a visible mass is the finding: the placing system misrendered; A/B it, never hide objects one by one.

await getPixelProvenance({ screen: [x, y], camera: { eye, aim, fov } })

terrain/decorations

(background)

scatter-bed

Sparkle or white dots on thin parts (straw, blades, rails): measure first. A part w m wide at d m spans w ÷ (d × ctx.view.pixel) pixels; under 1, with no 4x anti-aliasing on jayzee perf's frame line, it draws as crawling dots. Say that before any look setting; the cure is fewer, wider parts hidden past a few metres.

4x anti-aliasing

A write that "didn't land" on something another player was touching was judged by the machine that folded it: your own write's fate is the run's landed: line; a peer's dropped row leaves one [relay-fold] … dropped as history line at level log in the judging client's logs (read_client_logs; when Jayzee runs the place for you, none are kept); a fenced take leaves only the fenceDrops count. wrong-simulator / wrong-arbiter is HISTORY, not an error: another machine simulates that entity now and the same write from it lands. A write to another player's body rides the cross-writer lane to their machine, never takes it; a take fenced not_leasable names someone's envelope (a player's body, a hull a player drives, a god-held object), not_in_place a writer elsewhere: getObject(id).simulatedBy says who holds it. A destroy of another player's body is the one refused write: an error row in your logs. No receipt and the value still differs between machines = a competing writer, never "the sims drifted".

landed:

[relay-fold] … dropped as history

read_client_logs

fenceDrops

wrong-simulator

wrong-arbiter

not_leasable

not_in_place

getObject(id).simulatedBy

A player says "it's not there" while your view and the spec look right: getLogs({ level: "warn" }) carries their forwarded render faults (bespoke-geometry-, renderer- name the entity and the fix; skinned-rig-never-bound names the unbound channels), best-effort: empty never clears the client. Their Spec version: vN is the version their tab booted at; a fold never moves it, so a stamp behind your save proves nothing. A stranded copy is a [tree-lane] push N gap in <scope> error row in their logs: say "refresh": the boot re-serves it whole. A connected player after init-time world-gen landed keeps the old world until they reboot. One account in two tabs of one ROOM: the newer tab takes it and the earlier tears down with "Your other tab now holds this game."; "Play here" (a reload) takes it back. An editing tab (@dev) and a play tab (@live) are two rooms; both stand. Test with two accounts.

getLogs({ level: "warn" })

bespoke-geometry-

, renderer-

renderer-

skinned-rig-never-bound

Spec version: vN

[tree-lane] push N gap in <scope>

@dev

@live

"It worked before" is a records question: the file's change history and history/chat/; other hands commit too and the rows say who. Present earlier and absent now means something DELETED it. A creator's "perfect, keep it" is the pin: note the sha beside the feature and repair from that commit's bytes, never a re-derivation. jayzee undo puts a whole commit back.

history/chat/

What a live behavior spawned is not in the tree: a live destroy is triage: a restart re-runs its spawner and it returns; fix the spawner. A done claim on anything that must survive a restart is checked on a fresh boot, or names the restart as unchecked.

Controls dead: ask device and orientation, then →mobile-controls (ctx.resolveControls()).

ctx.resolveControls()

The engine's fault (a verb that answers wrong for a correct call, a throw from engine internals, a physics wedge, a frame that lies) or a PLATFORM GAP (a verb that does not exist, an ask no API expresses) is jayzee report_bug --kind fault|request|question "<what broke>". A fault in your own script is yours to fix, not a report.

jayzee report_bug --kind fault|request|question "<what broke>"

A body frozen after a refresh or rejoin (inputs land nowhere, camera yaw dead, velocity stuck, spawns despawning) is a body no machine simulates; F5 and a teleport nudge cure nothing. jayzee engine restart-rooms restarts dev rooms and keeps their live state; the creator calls it; a posted game's rooms want a NEW ?room= name. Report it too.

jayzee engine restart-rooms

?room=

<api> // run_script only, on ctx; getLogs is also bare at the prompt getLogs({ level: "error" | "warn" | "log", objectId, limit }): { message, level, data, tick, timestampMs, … }[] // behavior-error rows, receipts, forwarded client faults, your own ctx.log lines. A room restart wipes it ctx.getPixelProvenance({ screen: [x, y], radius, camera }): Promise<{ clients: { displayName, asked, status: "ok" | "error", groups: { group, surfacePct, translucentPct, artifact, placeId, candidates }[], error }[], … }> // bare: the last answer ctx.getTimers(ownerId): { id, ownerId, dueInTicks, dueInSeconds, engineOwned, hook }[] // every pending after() and engine timer </api>

#### Block 1

````text
spawn perf
````

#### Block 2

````text
history/changes/scripts/<file>.js
````

#### Block 3

````text
getObject(id).behaviorHealth.broken
````

#### Block 4

````text
running: "running"
````

#### Block 5

````text
Behavior error in <hook>
````

#### Block 6

````text
getLogs({ level: "error" })
````

#### Block 7

````text
module.task
````

#### Block 8

````text
law.module.hook-broken
````

#### Block 9

````text
engine governors reducing work
````

#### Block 10

````text
picture lowered
````

#### Block 11

````text
law.terrain.generator-cost
````

#### Block 12

````text
--script <file>
````

#### Block 13

````text
--frame
````

#### Block 14

````text
--boot
````

#### Block 15

````text
--room live
````

#### Block 16

````text
--wait
````

#### Block 17

````text
raycast(…, { hits: "geometry" })
````

#### Block 18

````text
query({ center, radius })
````

#### Block 19

````text
enemy.js update 6.3 ×47
````

#### Block 20

````text
state.target
````

#### Block 21

````text
p50 0
````

#### Block 22

````text
the longest pause
````

#### Block 23

````text
ctx.emit("preload", { refs })
````

#### Block 24

````text
await getPixelProvenance({ screen: [x, y], camera: { eye, aim, fov } })
````

#### Block 25

````text
terrain/decorations
````

#### Block 26

````text
(background)
````

#### Block 27

````text
scatter-bed
````

#### Block 28

````text
4x anti-aliasing
````

#### Block 29

````text
landed:
````

#### Block 30

````text
[relay-fold] … dropped as history
````

#### Block 31

````text
read_client_logs
````

#### Block 32

````text
fenceDrops
````

#### Block 33

````text
wrong-simulator
````

#### Block 34

````text
wrong-arbiter
````

#### Block 35

````text
not_leasable
````

#### Block 36

````text
not_in_place
````

#### Block 37

````text
getObject(id).simulatedBy
````

#### Block 38

````text
getLogs({ level: "warn" })
````

#### Block 39

````text
bespoke-geometry-
````

#### Block 40

````text
renderer-
````

#### Block 41

````text
skinned-rig-never-bound
````

#### Block 42

````text
Spec version: vN
````

#### Block 43

````text
[tree-lane] push N gap in <scope>
````

#### Block 44

````text
@dev
````

#### Block 45

````text
@live
````

#### Block 46

````text
history/chat/
````

#### Block 47

````text
ctx.resolveControls()
````

#### Block 48

````text
spawn report_bug --kind fault|request|question "<what broke>"
````

#### Block 49

````text
spawn engine restart-rooms
````

#### Block 50

````text
?room=
````


## Not captured

Controls clicked: 118 of 118 planned controls in this section, out of 138 candidates found after the load and the scroll.
Controls not clicked by policy: 6. Their labels name an action that changes state or sends something, so they were left alone: "read → headset VR play."; "VR play."; "read → mods Install and publish shared mods."; "Install and publish shared mods."; "read → publish Covers, publishing, unpublishing."; "publish".
Controls that could not be found again after a retry: 0. Errors: 0.

Clicks made: 118. Clicks that brought up content not in the swept state: 118. The rest brought up nothing new.


## Sources

- `wiki-tools/recapture/states/toolbox/02-initial.json`
- `wiki-tools/recapture/states/toolbox/02-swept.json`
- `wiki-tools/recapture/states/toolbox/02-c001.json`
- `wiki-tools/recapture/states/toolbox/02-c002.json`
- `wiki-tools/recapture/states/toolbox/02-c003.json`
- `wiki-tools/recapture/states/toolbox/02-c004.json`
- `wiki-tools/recapture/states/toolbox/02-c005.json`
- `wiki-tools/recapture/states/toolbox/02-c006.json`
- `wiki-tools/recapture/states/toolbox/02-c007.json`
- `wiki-tools/recapture/states/toolbox/02-c008.json`
- `wiki-tools/recapture/states/toolbox/02-c009.json`
- `wiki-tools/recapture/states/toolbox/02-c010.json`
- `wiki-tools/recapture/states/toolbox/02-c011.json`
- `wiki-tools/recapture/states/toolbox/02-c012.json`
- `wiki-tools/recapture/states/toolbox/02-c013.json`
- `wiki-tools/recapture/states/toolbox/02-c014.json`
- `wiki-tools/recapture/states/toolbox/02-c015.json`
- `wiki-tools/recapture/states/toolbox/02-c016.json`
- `wiki-tools/recapture/states/toolbox/02-c017.json`
- `wiki-tools/recapture/states/toolbox/02-c018.json`
- `wiki-tools/recapture/states/toolbox/02-c019.json`
- `wiki-tools/recapture/states/toolbox/02-c020.json`
- `wiki-tools/recapture/states/toolbox/02-c021.json`
- `wiki-tools/recapture/states/toolbox/02-c022.json`
- `wiki-tools/recapture/states/toolbox/02-c023.json`
- `wiki-tools/recapture/states/toolbox/02-c024.json`
- `wiki-tools/recapture/states/toolbox/02-c025.json`
- `wiki-tools/recapture/states/toolbox/02-c026.json`
- `wiki-tools/recapture/states/toolbox/02-c027.json`
- `wiki-tools/recapture/states/toolbox/02-c028.json`
- `wiki-tools/recapture/states/toolbox/02-c029.json`
- `wiki-tools/recapture/states/toolbox/02-c030.json`
- `wiki-tools/recapture/states/toolbox/02-c031.json`
- `wiki-tools/recapture/states/toolbox/02-c032.json`
- `wiki-tools/recapture/states/toolbox/02-c033.json`
- `wiki-tools/recapture/states/toolbox/02-c034.json`
- `wiki-tools/recapture/states/toolbox/02-c035.json`
- `wiki-tools/recapture/states/toolbox/02-c036.json`
- `wiki-tools/recapture/states/toolbox/02-c037.json`
- `wiki-tools/recapture/states/toolbox/02-c038.json`
- `wiki-tools/recapture/states/toolbox/02-c039.json`
- `wiki-tools/recapture/states/toolbox/02-c040.json`
- `wiki-tools/recapture/states/toolbox/02-c041.json`
- `wiki-tools/recapture/states/toolbox/02-c042.json`
- `wiki-tools/recapture/states/toolbox/02-c043.json`
- `wiki-tools/recapture/states/toolbox/02-c044.json`
- `wiki-tools/recapture/states/toolbox/02-c045.json`
- `wiki-tools/recapture/states/toolbox/02-c046.json`
- `wiki-tools/recapture/states/toolbox/02-c047.json`
- `wiki-tools/recapture/states/toolbox/02-c048.json`
- `wiki-tools/recapture/states/toolbox/02-c049.json`
- `wiki-tools/recapture/states/toolbox/02-c050.json`
- `wiki-tools/recapture/states/toolbox/02-c051.json`
- `wiki-tools/recapture/states/toolbox/02-c052.json`
- `wiki-tools/recapture/states/toolbox/02-c053.json`
- `wiki-tools/recapture/states/toolbox/02-c054.json`
- `wiki-tools/recapture/states/toolbox/02-c055.json`
- `wiki-tools/recapture/states/toolbox/02-c056.json`
- `wiki-tools/recapture/states/toolbox/02-c057.json`
- `wiki-tools/recapture/states/toolbox/02-c058.json`
- `wiki-tools/recapture/states/toolbox/02-c059.json`
- `wiki-tools/recapture/states/toolbox/02-c060.json`
- `wiki-tools/recapture/states/toolbox/02-c061.json`
- `wiki-tools/recapture/states/toolbox/02-c062.json`
- `wiki-tools/recapture/states/toolbox/02-c063.json`
- `wiki-tools/recapture/states/toolbox/02-c064.json`
- `wiki-tools/recapture/states/toolbox/02-c065.json`
- `wiki-tools/recapture/states/toolbox/02-c066.json`
- `wiki-tools/recapture/states/toolbox/02-c067.json`
- `wiki-tools/recapture/states/toolbox/02-c068.json`
- `wiki-tools/recapture/states/toolbox/02-c069.json`
- `wiki-tools/recapture/states/toolbox/02-c070.json`
- `wiki-tools/recapture/states/toolbox/02-c071.json`
- `wiki-tools/recapture/states/toolbox/02-c072.json`
- `wiki-tools/recapture/states/toolbox/02-c073.json`
- `wiki-tools/recapture/states/toolbox/02-c074.json`
- `wiki-tools/recapture/states/toolbox/02-c075.json`
- `wiki-tools/recapture/states/toolbox/02-c076.json`
- `wiki-tools/recapture/states/toolbox/02-c077.json`
- `wiki-tools/recapture/states/toolbox/02-c078.json`
- `wiki-tools/recapture/states/toolbox/02-c079.json`
- `wiki-tools/recapture/states/toolbox/02-c080.json`
- `wiki-tools/recapture/states/toolbox/02-c081.json`
- `wiki-tools/recapture/states/toolbox/02-c082.json`
- `wiki-tools/recapture/states/toolbox/02-c083.json`
- `wiki-tools/recapture/states/toolbox/02-c084.json`
- `wiki-tools/recapture/states/toolbox/02-c085.json`
- `wiki-tools/recapture/states/toolbox/02-c086.json`
- `wiki-tools/recapture/states/toolbox/02-c087.json`
- `wiki-tools/recapture/states/toolbox/02-c088.json`
- `wiki-tools/recapture/states/toolbox/02-c089.json`
- `wiki-tools/recapture/states/toolbox/02-c090.json`
- `wiki-tools/recapture/states/toolbox/02-c091.json`
- `wiki-tools/recapture/states/toolbox/02-c092.json`
- `wiki-tools/recapture/states/toolbox/02-c093.json`
- `wiki-tools/recapture/states/toolbox/02-c094.json`
- `wiki-tools/recapture/states/toolbox/02-c095.json`
- `wiki-tools/recapture/states/toolbox/02-c096.json`
- `wiki-tools/recapture/states/toolbox/02-c097.json`
- `wiki-tools/recapture/states/toolbox/02-c098.json`
- `wiki-tools/recapture/states/toolbox/02-c099.json`
- `wiki-tools/recapture/states/toolbox/02-c100.json`
- `wiki-tools/recapture/states/toolbox/02-c101.json`
- `wiki-tools/recapture/states/toolbox/02-c102.json`
- `wiki-tools/recapture/states/toolbox/02-c103.json`
- `wiki-tools/recapture/states/toolbox/02-c104.json`
- `wiki-tools/recapture/states/toolbox/02-c105.json`
- `wiki-tools/recapture/states/toolbox/02-c106.json`
- `wiki-tools/recapture/states/toolbox/02-c107.json`
- `wiki-tools/recapture/states/toolbox/02-c108.json`
- `wiki-tools/recapture/states/toolbox/02-c109.json`
- `wiki-tools/recapture/states/toolbox/02-c110.json`
- `wiki-tools/recapture/states/toolbox/02-c111.json`
- `wiki-tools/recapture/states/toolbox/02-c112.json`
- `wiki-tools/recapture/states/toolbox/02-c113.json`
- `wiki-tools/recapture/states/toolbox/02-c114.json`
- `wiki-tools/recapture/states/toolbox/02-c115.json`
- `wiki-tools/recapture/states/toolbox/02-c116.json`
- `wiki-tools/recapture/states/toolbox/02-c117.json`
- `wiki-tools/recapture/states/toolbox/02-c118.json`
- `wiki-tools/recapture/states/toolbox/summary-02.json`
