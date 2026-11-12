# jayzee index

## How it works

The jayzee pass is the index of the jayzee agent's local evidence. Its on-disk directory is /workspace/index/spawn (old name: spawn). The pass writes three files: spawn/spawn-index.json (old name: spawn), spawn/root-worlds.json (old name: spawn) and spawn/README.md (old name: spawn). The pass reads only the jayzee evidence tree at /workspace/spawn (old name: spawn) and is recorded as "bounded local pass complete".

The pass has four parts.

1. Root-linked world map. Browser reads of https://www.spawn.co/ and of each world page, run on 2026-11-07 between about 10:50 and 11:05 UTC, produced 74 rows. Each row is a path of the form /@owner/slug, with HTTP status, title, genre from JSON-LD, datePublished, dateModified, the reviews line, and the newest update line. All 74 rows returned HTTP 200. The run ids are 2026-11-07-10-49-42-a2cf05 (actionSeq 28, 33, 38 and 43), and the run log is /workspace/spawn/runs/2026-11-07-10-49-42-a2cf05/log.jsonl (old name: spawn). Descriptions were captured only for the first 20 worlds. Worlds 21 to 74 have no description field in the map. Play counts drift between reads.
2. Public feed. The public feed adds project metadata: games.name, games.world_id, games.engine_version, app_id, profiles.username, play_count and like_count. The root-linked map and the feed are separate denominators.
3. World contents. World manifests were reached from /cdn-scan pairs, giving 2580 manifest rows. Decoded manifest frames were scanned for keys of the form world.assets/<hh>/...yaml, giving 11987 unique keys. Text-visible keys were counted separately, 307 keys from 38 content-addressed inputs. GLB URL rows map /cdn GLB references to worlds, giving 2417 rows (spawn-index.json glbRows; the learning record counts 2416 rows, see Open gaps) across 400 distinct world identifiers in spawn-index.json (the learning record says 399).
4. Asset naming. Content-addressed assets use value.<sha256>.<ext> names. The learning record records the encoder rule that a slash in a key is written as ~2f. Witnessed key shapes are ~2fcdn~2fvalue.<sha64>.<ext>.yaml (11679 keys) and ~2fcdn~2f<name>.<ext>.yaml with no sha (308 keys). All 11987 keys start with ~2fcdn~2f.

The learning record (sha256 b1936b51e2a9621082c9f68416f7980336dac1c57eb4507c2403b2533147a1b0, 17813 bytes, recorded as maps/spawn-learning-record.md in spawn-index.json) states the denominators and their witnesses:

- Text-visible file-map keys, 307. Re-derivable from the durable inputs in witness/text-visible-307-inputs/ (38 files, 6.6 MB, each named by its sha256, hashMismatches 0). The derivation prints distinctKeys 307, valueSha 298, namedNoSha 9, tilde2fOccurrences 614, tilde3a 0, tilde7e 0.
- Unique decoded-frame keys, 11987, from the 2580 manifests.
- Maps-only keys, 288, excluding the 38 inputs.
- Manifests, 2580, with a durable result file at /workspace/savi/spawn-evidence/data/manifests-all-v3-results.jsonl (old name: savi, the spawn part of the name is an old name too).
- Worlds with /cdn/ GLB references, 399, from maps/glb-urls-all.tsv (2416 rows).

The spawn-side findings written for the cleetus pass (FINDINGS, sha256 4e64f372d60d8537ed6b91b2068ddaa09118d5eeec19c7956d47a50d9798dc04, 6094 bytes, recorded by the cleetus index) describe the same evidence in lower-level detail. Manifest layout: a u32BE length, a sheet JSON {"v":1,"hashes":[...]}, then u32BE-length JSON frames to end of file. Frame count equals hashes count, and frame i sha256 equals hashes[i] for 2579 of 2580 reached manifests. The 40-manifest sample in maps/witness/manifest-sample40/ has 2961 frames equal to 2961 hashes. The resolve-adventure route (GET /api/resolve-adventure?address=) returns 200 JSON for found and not_found, 400 {"ok":false,"error":"Invalid query"} for an empty address, and 308 or 307 redirects for trailing-slash, http and apex hosts. A probe of the lanmower/deepfall play page for 25 seconds produced 30 matched requests to spawnfile and bigspawn hosts and no GLB-like request.

The file /workspace/index/spawn/spawn-index.json (old name: spawn) carries the 74 root rows, the glb and world counts, the learning record hash, and a fileHashes map of 120 entries. The fileHashes keys are paths in the jayzee source tree (maps/, sources/ and maps/witness/), such as maps/glb-urls-all.tsv with sha256 331269075cb71a0b93be25bd6c885b55592c9ace045388eaebeee8d90c06bf5c. None of those files is copied into the index.

The file spawn/root-worlds.json (old name: spawn) is the same 74-row list as the rootWorlds array in spawn-index.json. Of the 74 rows, 31 have update "none" and 43 carry a newest update line. Genres are JSON-LD strings such as "Extraction, Shooter, Action". Published dates run from 2026-07-28 to 2026-11-07.

## Decisions

- Scope is the local jayzee evidence only. The pass description in spawn-index.json says "/workspace/spawn local evidence only", and the README says "local /workspace/spawn evidence only". Nothing outside that tree is counted.
- Map and feed kept as separate denominators. spawn-index.json method: "Root-linked world map and feed are separate denominators; counts are kept scoped and are not merged into a universal world count."
- Counts reported with their scope. The learning record says "Every figure is spawn-reported and scoped to what was reached. Nothing here is a universal claim." Figures state what they count, for example the 307 keys and the 11987 keys.
- Text-visible key derivation rebuilt from inputs. The original 1173-file scope was not preserved. The learning record therefore points to content-addressed inputs (witness/text-visible-307-inputs/, hashMismatches 0) so that the 307 figure can be re-derived.
- Provenance by hash. Each witness file is named by its sha256 and the spawn-index.json fileHashes map gives the hash of each evidence file. Evidence: "Each claim below names its witness."
- Bucket rule left undetermined. The learning record and INDEX.json state that the bucket rule for world.assets/<xx>/ is UNDETERMINED, because the sha-only and world-identity hypotheses were falsified or at chance.
- No git for the jayzee tree. The findings excerpt states that the jayzee tree has no git repository and that nothing it holds is committed or pushed.

## Open gaps

- Bucket rule for world.assets/<xx>/ is UNDETERMINED. The sha-only and world-identity hypotheses were falsified or at chance (README, INDEX.json limitations).
- The 307 text-visible key count is not reproducible from its original input. The original encoder-test.mjs run covered 1173 files and that input is not preserved. The completeness of the 67 contributing paths (38 unique contents) rests on an ephemeral mtime-cutoff scan of 1154 files, witness/text-visible-307-derive.mjs, whose output is recorded in witness/text-visible-307-inputs.sha256.txt.
- Learning record paths under /tmp/spawn-probe are ephemeral. Durable copies exist only for the 2580-row results and verify-v3.mjs, under /workspace/savi/spawn-evidence/ (old name: savi).
- Worlds with GLB refs disagree across the index: 399 in the learning record, README and spawn/README.md, 400 in spawn-index.json and INDEX.json, and 748 in COMPLETE_INDEX.md. GLB rows also disagree: 2416 in the learning record and COMPLETE_INDEX.md, 2417 in spawn-index.json and INDEX.json.
- The manifest exception: frame i sha256 equals hashes[i] for 2579 of 2580 manifests. The one exception is described in a last section of the findings that the index does not reproduce.
- Name encoding: ':' to '~3a' is witnessed only in the cleetus FAULTS.md (the spawnfile key), not in the probes. '~' to '~7e' has no witness.
- Gone (410) was not reached in 30 probes of the resolve-adventure route. The findings mark this OPEN.
- The root-linked map has descriptions for worlds 1 to 20 only.
- Counts drift between reads. For example @lanmower/deepfall showed 4 plays earlier and 6 plays in the map.
- Private asset lists of other projects are not reachable through the GET doors held.
- The learning record references witness scripts (for example witness/text-key-census.mjs and reconcile-gap.mjs, inside the jayzee tree) that are not in the index, so the 11987 and 288 figures are re-run results recorded in prose.

## Sources

- /workspace/index/spawn/README.md (old name: spawn)
- /workspace/index/spawn/spawn-index.json (old name: spawn)
- /workspace/index/spawn/root-worlds.json (old name: spawn)
- /workspace/index/INDEX.json (the spawnRootMap, spawnLearningRecord and saviProjects excerpts are in its evidenceExcerpts)
- /workspace/index/README.md
- /workspace/index/extra/worlds.json (the renamed copy of the root rows, see extra-worlds.md)
- /workspace/spawn/runs/2026-11-07-10-49-42-a2cf05/log.jsonl (old name: spawn, cited by the root map)
- /workspace/savi/spawn-evidence/data/manifests-all-v3-results.jsonl (old name: savi)
- /workspace/savi/spawn-evidence/ (old name: savi, cited by the learning record as the durable copy of verify-v3.mjs)
- /workspace/index/provenance.sha256.txt
