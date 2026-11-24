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

## Closure of row 227 (2026-11-25)

- Commit on origin/main: 162145f (assertion: triangle count equals indices divided by three, src/cave_sdf.rs:462), recorded at b204b0e. origin/main is b204b0e.
- Done condition from the assignment: a test that rebuilds each fixture mesh and matches vc, ic, triangles and checksum, plus the carve round trip. Met at origin/main: polygonizer_matches_spoint_polygonize_cave_sdf (src/cave_sdf.rs:449) checks vertex count, index count, triangle count, checksum, positions and indices for every fixture mesh; carve_layer_round_trip_matches_spoint_load_cave_carve_layer (src/cave_sdf.rs:477) covers the carve layer.
- Counterparts for the two names in the row: createCaveVolume is add_cave_volume (src/cave_sdf.rs:299); polygonizeCaveVolume is polygonize_cave_sdf (src/cave_sdf.rs:145). The row names the spoint functions, which bevy does not name the same way.
- Fixture consistency (plain check, not a Rust run): sphere vc 270, ic 1140, triangles 380; cylinder-y vc 230, ic 948, triangles 316; tunnel-y vc 363, ic 1614, triangles 538. Each mesh has ic equal to 3 times triangles, its indices are in range, and its checksum recomputes from its positions.
- Bevy's record for the window (docs/PENDING_VALIDATION.md at b204b0e, bevy): green, cargo test cave_sdf:: 3 passed; red, the triangle count plus one fails at sphere with exit 101. The red and green runs are bevy's; this ledger did not re-run cargo.
- The parity-matrix row 227 outcome still reads candidate-only at origin/main. Updating it to present is bevy's step, and it is not claimed here.
- Witness: docs/bevy-gaps/parity-assignment-witness.cjs exit 0 (origin b204b0e, 162145f on origin, both counterparts present, three tests present, triangle assertion at line 462, fixture checks pass).

## Next row for bevy

- None is assigned. The only plain-checkable things are fixture integrity and the presence of names, and neither proves that bevy does the documented behaviour. A closure needs a Rust test run, which is a window. So no row is assigned until a row with a self-consistent fixture and a test bevy can run is chosen.
