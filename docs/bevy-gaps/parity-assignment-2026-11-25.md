# Parity assignment for bevy (2026-11-25)

Bevy's docs/REMAINING_PARITY.md reports 717 open rows and 0 witnessable now. Read at origin/main b50dbb7.

## Answer

No open row can be closed with a plain script. Every row that could close needs a cargo run or a built binary to produce output that a witness compares. The plain checks below only show whether a row's gap is still open or whether its fixture is intact.

## Assignment: row 227 (CaveSDF cave volume meshing)

- Gap: createCaveVolume and polygonizeCaveVolume are not ported; the cave volume meshing the row names is not witnessed. Source of the row: src/terrain/CaveSDF.js. Bevy's cited counterpart is src/cave_sdf.rs:145 (pub fn polygonize_cave_sdf) and :367 (pub fn load_cave_carve_layer), at origin/main b50dbb7.
- Why this row: it is the highest-value candidate that already has an intact fixture. testdata/parity/spoint-cave-sdf.json holds sdfProbes (points, sphere, cylinders, tunnels), meshes (3 entries with name, res, vc, ic, triangles, checksum, positions, indices) and a carve block with addResults, volumeCount, layerJson, loadedVolumeCount and loadedJson. Bevy can reproduce the three meshes in one test.
- Done condition: a Rust test that builds the cave volume with the same SDF probes and resolution as each fixture mesh, and matches vc, ic, triangles and checksum, plus the carve round trip.
- Witness it produces: a cargo test run. Not plain. Bevy runs it when the host is settled and a window is free.
- Plain check (this ledger): docs/bevy-gaps/parity-assignment-witness.cjs. It checks the two cited lines, that create_cave_volume and polygonize_cave_volume are still absent, that row 227 is still candidate-only, and the fixture's shape. It exits 1 if the gap has changed, which tells bevy to re-judge the row.

## Rejected

- Row 145 (CharacterManager walk step): the ignored test's cause is a Jolt internal rule that is not in the workspace, so there is no next step to assign.
- Row 725 (tps-game fire layer): shot blocking depends on fire.rayBlocked over smoke, which is not ported.
- Row 726 (tps-game emotes): not reachable; src/protocol.rs has no emote message.
- Row 729 (tps-game HUD overlay): its witness is a cargo test, and its value is UI-only.
