# jayzee learning record

## How it works

The jayzee learning record is the consolidated, jayzee-reported record of the world-store and CDN survey. Its source is /workspace/spawn/maps/spawn-learning-record.md (old name: spawn), 17.5 KB, which was split into two pages for this wiki because of its length:

- [maps-learning-record-part-1.md](maps-learning-record-part-1.md) carries sections 1 to 6: denominators, the manifest corpus (2580), the key-occurrence counts and the three `~2f` scopes, the escape and spawnfile negatives, the bucket rule for `world.assets/<xx>/` (UNDETERMINED), and the 410 status (OPEN).
- [maps-learning-record-part-2.md](maps-learning-record-part-2.md) carries sections 7 to 11: the error keys on the world-store, the non-CDN refs (2 OPEN, 81 resolved), the still-open list, the name decode direction, and the `/cdn/`-only attempt (INFERRED).

The record states that every figure is scoped to what was reached and that nothing in it is a universal claim. Each figure names its denominator. The durable copies of the 2580-row results are in /workspace/savi/spawn-evidence/ (old name: savi) (old name: spawn) at cleetus commit e88b95c. The provenance paths under /tmp/spawn-probe (old name: spawn) are ephemeral.

The main figures, with their denominators:

| Figure | Value | Denominator |
|---|---|---|
| Text-visible file-map keys | 307 | Text files under the probe tree and the witness maps (durable reproduction from 38 inputs) |
| Unique decoded-frame keys | 11987 | Decoded frames of the 2580 manifests |
| Maps-only keys (excluding inputs) | 288 | Maps tree minus witness/text-visible-307-inputs/ |
| Manifests | 2580 | Manifest hashes from the /cdn-scan pairs |
| Worlds with /cdn/ GLB refs | 399 | Feed worlds (2848) |
| Raw key occurrences | 12259 | Sum of keyCount over 2580 rows |
| GLB rows | 2416 | Rows in glb-urls-all.tsv |

Witness scripts for these figures are in /workspace/spawn/maps/witness/ (old name: spawn) and are described on [maps-witness.md](maps-witness.md).

## Decisions

- Split the record into two parts rather than one, because the source is 17.5 KB and the parts keep the record's section numbers, so each part cites the same sections as the source. Evidence: the source has 11 numbered sections, and part 1 holds sections 1 to 6 while part 2 holds sections 7 to 11.
- Keep denominators separate. Evidence: section 1 of the source says "keep separate, never merge" and lists five denominators.
- Keep UNDETERMINED, OPEN, INFERRED and UNCONFIRMED labels as written. Evidence: sections 5, 6, 9 and 11 of the source use these labels and say the claims are not promoted.

## Open gaps

- The open items are listed in part 1 (sections 5 and 6) and part 2 (sections 8, 9 and 11), and collected on [maps-open-gaps.md](maps-open-gaps.md).

## Sources

- /workspace/spawn/maps/spawn-learning-record.md (old name: spawn)
- /workspace/savi/spawn-evidence/ (old name: savi) (old name: spawn), durable copies (cleetus commit e88b95c)
- /workspace/spawn/maps/witness/ (old name: spawn)
