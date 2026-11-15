# ctx and terrain API items in the Bevy game-16 runtime

This page documents seven items exposed to game-16 scripts: four members of the `ctx` object (`spawnPlayer`, `setInput`, `setAnim`, `anim`), the host verb `terrainHeight`, the engine function `read_field`, and the host verb `featureProbe`. It also records two related members that were found while tracing these names (`ensureScatter` and `getPixelProvenance`), because they route through `featureProbe`.

Every description below is taken from the source under `/workspace/bevy/src`. Path references are relative to that directory. Where the source does not settle a point, the page says so.

## Layers involved

A script calls a JavaScript shim in `script/prelude.js`. The shim calls `__host(op, payload)`, which passes a JSON payload to the Rust host dispatcher in `script/mod.rs` (a large `match` on the op name). The dispatcher calls a Rust method that touches either Bevy ECS world state (components and resources) or the `FeatureState` resource in `features.rs`. The return value is serialised to a string, and the shim parses it back with `JSON.parse` unless the string is empty, in which case the result is `undefined`.

The classification column in the tables below follows `script/mod.rs` lines 2394 to 2395, which group host verbs into "Bevy ECS world query/state" and "native FeatureState". Those lists are the source's own labels, not an independent judgement.

## ctx.spawnPlayer

| Item | Detail |
|---|---|
| What it is | Creates an entity tagged `player` in the active place. |
| JS shim | `script/prelude.js` line 1330: `spawnPlayer: (options) => __host('spawnPlayer', options ?? {})`, inside the ctx object built by `__make_ctx` (line 1224). |
| Host verb | `spawnPlayer`, dispatched at `script/mod.rs` line 1462. |
| Rust implementation | `fn spawn_player` in `script/mod.rs` line 2364. It calls `world::spawn_into_world`, then records the entity in `self.index` and `self.ids`. |
| Kind | Native Bevy ECS. The source classifies the verb as "Bevy ECS world query/state" (line 2394). |
| Arguments | One options object, which may be omitted. Recognised keys: `id` (string, default `"local-player"`), `place` (string, default the host's current place), `properties` (an object parsed as an `ObjectSpec`). If `properties` fails to parse it is silently ignored and the default spec is used. |
| Side effects | The `id` is forced onto the parsed spec. The tag `player` is added if absent. |
| Return value | The shim receives the id string, so `ctx.spawnPlayer()` returns the id (`"local-player"` by default). |

## ctx.setInput

| Item | Detail |
|---|---|
| What it is | Writes per-frame input state into the `InputState` resource. |
| JS shim | `script/prelude.js` line 1331: `setInput: (options) => __host('setInput', options ?? {})`. |
| Host verb | `setInput`, dispatched at `script/mod.rs` line 1453. |
| Rust implementation | `fn set_input` in `script/mod.rs` line 1990. The `InputState` struct is defined in `runtime.rs` line 73. |
| Kind | Native Bevy ECS (resource). The source classifies the verb as "Bevy ECS world query/state" (line 2394). |
| Arguments | One object. Recognised keys: `axes` (object; each entry is inserted into `input.axes`, so existing axes not named are kept), `pressed`, `released` and `held` (each passed through `input_map`; each replaces the previous value wholesale), and `actionData` (object; replaces `input.action_data` wholesale). Other keys are ignored. |
| Side effects | Sets `input.dirty` to true. |
| Return value | Empty string, so the shim returns `undefined`. |

The source does not show what `input_map` does with malformed entries. The reading above is from the code path only.

## ctx.setAnim

| Item | Detail |
|---|---|
| What it is | Sets or clears one named animation channel on the calling object. |
| JS shim | `script/prelude.js` line 1332: `setAnim: (channel, value) => __host('setAnim', { id: selfId, channel, value })`. The id is the ctx's own object id, so there is no id argument. |
| Host verb | `setAnim`, dispatched at `script/mod.rs` line 1383. It reads `id`, `channel` and `value` from the payload and calls `set_anim`. |
| Rust implementation | `fn set_anim` in `script/mod.rs` line 1644. It works on the `AnimState` component. |
| Kind | Native Bevy ECS (component `AnimState`). |
| Arguments | `channel` (string) and `value` (any JSON). |
| Behaviour | If the id is not in the index, nothing happens. If `value` is null, the channel is removed. Otherwise, if `value` is an object, the keys `time` (set to 0) and `finished` (set to false) are inserted, and the resulting object is stored under the channel. Non-object values are stored as given, without `time` or `finished`. |
| Return value | Empty string, so the shim returns `undefined`. |

## ctx.anim

| Item | Detail |
|---|---|
| What it is | Not defined on the ctx object. In the source, `anim` is a special key on object proxies. |
| Where the key is handled | `script/prelude.js` line 220 (`if (key === 'anim') return __make('anim:' + id);`), inside the `obj:` proxy handler. |
| Read path | `script/mod.rs` line 251 handles the `anim:` prefix. An empty key returns the whole channel map through `anim_json` (line 1634). A named key returns that one channel's value from `AnimState`, or an empty string if absent. |
| Write path | `script/mod.rs` line 921, the `"anim"` branch of the property setter. It takes the value as an object of channels and merges it into the entity's `AnimState`. A channel whose entry is null is removed. |
| Kind | Native Bevy ECS (`AnimState`). |
| Where it is reachable | The proxy is reachable as `ctx.self.anim`, because `ctx.self` is `__make('obj:' + selfId)` (prelude line 1225). The source does not define a plain `ctx.anim`. Reading `ctx.anim` directly yields `undefined` as far as the source shows. |

The source does not show whether `ctx.anim` is meant to exist as an alias. The working path is `ctx.self.anim`.

## terrainHeight (host verb)

| Item | Detail |
|---|---|
| What it is | Returns the terrain height at a world x/z position. |
| JS shim | `script/prelude.js` line 1326: `getTerrainHeight: (x, z, target) => __host('terrainHeight', { x, z, place: target })`. The shim name is `getTerrainHeight`, and it sends the host verb `terrainHeight`. |
| Host verb | `terrainHeight`, dispatched at `script/mod.rs` lines 1425 to 1435. |
| Rust implementation | The dispatch arm sets `name` to `"terrain"` when the payload has no `name`, then calls `read_field` (see below). |
| Kind | Native Bevy ECS (reads the `TerrainData` resource). The source classifies it as "Bevy ECS world query/state" (line 2394). |
| Arguments | `x`, `z` (numbers, default 0), optional `name` (default `"terrain"`). The `place` key is sent by the shim but is not read by this arm or by `read_field`. |
| Return value | A number, produced as the string of an `f32` by `read_field` and parsed by the shim. Returns 0 when there is no `TerrainData` resource or the name is not a known field. |

This host verb is separate from `globe.terrainHeight`. The globe version in `prelude.js` line 1211 maps to `globeElevation`, and `globe.rs` line 468 handles the `"elevation" | "terrainHeight"` op under the globe native path. The two should not be assumed to share an implementation.

## read_field (engine function)

| Item | Detail |
|---|---|
| What it is | A Rust method on the script host, not an exported engine function. It is reached through the host verb `readField`. |
| JS shim | `script/prelude.js`, in the same object as `getTerrainHeight` (just before `getTerrainNormal`): `readField: (name, x, z, target) => __host('readField', { name, x, z, place: target }) ?? 0`. |
| Host verb | `readField`, dispatched at `script/mod.rs` line 1424. |
| Rust implementation | `fn read_field` in `script/mod.rs` line 2007. It looks up `TerrainData.fields[name]` and calls `field.height(x, z)`. |
| Kind | Native Bevy ECS (reads the `TerrainData` resource). |
| Arguments | `name` (string, default `"terrain"`), `x` and `z` (numbers, default 0). The `place` key is sent but ignored by this function. |
| Return value | The string form of the `f32` height. The shim parses it. Returns 0 when there is no `TerrainData` resource or the field name is unknown. |

The source does not define the `field.height` method body here, so the interpolation rule is not documented on this page.

## featureProbe (host verb)

| Item | Detail |
|---|---|
| What it is | A generic diagnostic and dispatch verb. It records a call count per name and echoes the payload back. It does not perform the work its name suggests. |
| Host verb | `featureProbe`, dispatched at `script/mod.rs` line 1463. |
| Rust implementation | `fn native_feature_probe` in `script/mod.rs` line 1502, which calls `FeatureState::probe` in `features.rs` line 143. |
| Kind | Native FeatureState. The source classifies it as "native FeatureState" (line 2395). |
| Arguments | A payload object. `name` (string, default `"feature"`) selects the probe counter. The full payload is echoed. |
| Behaviour | Increments `feature_calls` and the per-name counter in `probes`. |
| Return value | A JSON object with keys `name`, `tick` (the FeatureState tick), `payload` (the full payload as sent), and `calls` (the per-name counter after this call). |

### Related members that use featureProbe

| Member | Shim (prelude.js) | Behaviour from the source |
|---|---|---|
| ctx.ensureScatter(options) | Line 1333: sends `featureProbe` with `name: 'ensureScatter'` and the options. Falls back to `{ instances: 0 }` if the host returns nothing. | The probe always returns an object, so the fallback is never reached on this path. The result is the echo object, not a scatter result. The source contains no `ensureScatter` implementation in the Rust files searched. |
| ctx.getPixelProvenance(x, y) | Line 1334: sends `featureProbe` with `name: 'getPixelProvenance'`, `x` and `y`. Falls back to `{ x, y, source: 'local-shim' }`. | The same applies. The result is the echo object, and the `local-shim` fallback is not reached. |

## Open points

- `ctx.anim` as written is not defined on the ctx object. Only `ctx.self.anim` is.
- `ctx.ensureScatter` and `ctx.getPixelProvenance` look like real features in the shim, but the Rust side only echoes and counts. Whether any other module implements them was not established by this search.
- The behaviour of `input_map` on malformed input, and the height interpolation inside `field.height`, are not shown in the code read here.
- `place` is sent by the terrain and field shims but ignored by the Rust functions that read them, so the terrain queries always use the single `TerrainData` resource.
