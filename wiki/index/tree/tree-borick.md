# The borick/ directory

## How it works

/workspace/index/borick applies the exhaustive index technique to one creator's projects. The creator is the account borickk on the jayzee platform. The directory has three files, 16 KB in total: README.md (2,658 bytes), borick-projects.json (13,222 bytes) and provenance.sha256.txt (163 bytes, two lines). It holds links, hashes and counts only, never content bytes.

The method, recorded in the JSON's method string: take the feed worlds filtered by creator, then match each world against the cdn-scan world, manifest and CDN rows, then against the GLB map, then against the direct CDN GLB aggregate. The JSON was generated 2026-11-11T16:10:19Z and has ok true. Its sources block names the feed-worlds list and the 16 cdn-scan files under the cleetus repository (old name: savi, and old name: spawn in the path), the GLB map at /workspace/index/exhaustive/source-glb-urls-all.tsv, and the aggregate at /workspace/index/exhaustive/direct-cdn-glb-links.json.

The five projects, from the JSON and README:

| Project (address) | World | Values | Refs | Scan rows | Manifests | Direct GLB links |
|---|---|---|---|---|---|---|
| GTA Earth (@borickk/gta-earth) | 4e709464-ecfc-408f-980a-c3b5b46b0ee3 | 81 | 8 | 1 | 1 | 0 |
| Fruit Jar (@borickk/fruit-jar) | 09f24769-50a8-4966-8300-f16a6062648e | 17 | 12 | 1 | 1 | 0 |
| Aelorien Elf Village (@borickk/aelorien-elf-village) | b144513e-29fe-4603-88ae-b40f6694ba26 | 93 | 5 | 1 | 1 | 0 |
| First Date (@borickk/first-date) | e3329b91-9f3e-4252-ad05-b92a9e0866cd | 31 | 9 | 1 | 1 | 7 |
| Wisp Village (@borickk/wisp-village) | ab91c85e-293a-4fa3-a8e7-5eba1a4927db | 66 | 0 | 1 | 1 | 0 |

Totals: 5 projects, 5 with scan rows, 7 direct GLB links, 7 cdn-scan GLB rows and 7 GLB-map rows. All five have sort "hot" in the feed. The seven links all belong to First Date and are listed by sha256, directCdnUrl, status, content type, bytes, magic and provenance. Each project record in borick-projects.json also has the app ID, the nodash world ID, the manifest hash list, and empty GLB arrays where there are none.

## Decisions

- The creator filter selects projects by the creator field in the feed, so projects are found by who published them rather than by a hand-picked list. Evidence: the creator and method fields in borick-projects.json.
- Each project is reported on the same five measures (values, refs, scan rows, manifests and GLB links), so the directory can be compared with the other indexes without re-deriving them. Evidence: the field names of each project record.
- Direct links are written in the host form play.jayzee.co, not the play.spawn.co form used by the aggregate. The README reproduces these URLs verbatim. Evidence: the seven URLs in README.md.

## Open gaps

- The direct links use the play.jayzee.co host, while the current aggregate and the expanded index use play.spawn.co for the same content addresses. The two forms are not reconciled in any file. Sources: /workspace/index/borick/README.md, /workspace/index/exhaustive/direct-cdn-glb-links.json.
- Four of the five projects have no GLB evidence at all (0 links, 0 scan rows, 0 GLB-map rows). Wisp Village has no references in its value tree (0 refs), and Fruit Jar has 12 references and no GLB. The reason is not recorded. Source: /workspace/index/borick/borick-projects.json.
- The feed-worlds list used by the method is an input in the cleetus repository, not a copy in the index. Source: /workspace/savi/spawn-evidence/data/feed-worlds.json (old name: savi, and old name: spawn).
- The project list is a snapshot from 2026-11-11T16:10:19Z. The feed has changed since then (see [discovery](../discovery.md)), so the creator's current project count may differ. Source: /workspace/index/borick/borick-projects.json (generatedAt).

## Sources

- /workspace/index/borick/README.md
- /workspace/index/borick/borick-projects.json
- /workspace/index/borick/provenance.sha256.txt
- /workspace/index/exhaustive/source-glb-urls-all.tsv
- /workspace/index/exhaustive/direct-cdn-glb-links.json
- /workspace/savi/spawn-evidence/data/feed-worlds.json (old name: savi; old name: spawn)
- /workspace/savi/spawn-evidence/data/cdn-scan-0.jsonl (old name: savi; old name: spawn), through cdn-scan-15.jsonl
