# Open gaps in the index

## How it works

This page lists every gap, unknown, open label or TODO-style marker found in the index files. The search covered the root README.md, INDEX.json (its methods.limitations and evidenceExcerpts), COMPLETE_INDEX.md, EXTRA_WORLD_INDEX.md, the pass READMEs (spawn/README.md, savi/README.md, exhaustive/README.md, borick/README.md, discovery/DISCOVERY.md), the discovery and exhaustive JSON reports, the pull and manifest records in extra/docs and extra/, and the generator and checker scripts. The explicit markers found were the README heading "Limits / open questions", the word UNDETERMINED in the README and INDEX.json, the label OPEN in the evidence excerpts (the 410 probe and identifier OPEN-013), the discovery blockers, the manifest validation states and the pull-index 404. No file in the index carries a TODO, FIXME or TBD marker. The other gaps were found by checking counts and paths across files.

## Decisions

- Gaps are recorded, not resolved. Where two files give different figures, both are kept with their scope, as the README requires, and the mismatch is listed here.
- A gap is listed once, under the file where it is first evidenced. Cross-file references are noted in the entry.
- Gaps that are expected limits of a bounded pass (for example private assets) are listed because the source files list them as limitations.

## Open gaps

### Limits named in the source files

- The bucket rule for world.assets/<xx>/ is UNDETERMINED. The sha-only and world-identity hypotheses were falsified or at chance. (README.md "Limits / open questions"; INDEX.json methods.limitations.)
- The 2580 manifest corpus, 11987 decoded keys and 307 text-visible keys are separate denominators that must not be merged. The index keeps them apart, and this is a standing limit, not a fix. (README.md; INDEX.json.)
- Other projects' private asset lists are not reachable through the GET doors held. Public pages, feed and manifest scans are the only evidence. (README.md; INDEX.json.)
- Gone (410) for /api/resolve-adventure was not reached in 30 probes and is marked OPEN. (INDEX.json evidenceExcerpts saviFindings.)
- Identifier OPEN-013 (two identifiers for the two non-CDN refs, in maps/unverified-noncdn-refs.tsv lines 22 and 37) is labelled OPEN in the evidence, and the same excerpt states it is not a discrepancy. (INDEX.json saviFindings.)
- The name encoder has witnesses only for ~2f. The ':' to '~3a' mapping is witnessed only in the cleetus FAULTS.md, and '~' to '~7e' has no witness. (INDEX.json saviFindings.)
- The jayzee manifest exception: frame i sha256 equals hashes[i] for 2579 of the 2580 reached manifests. The one exception is described in a last section of the findings that the index does not reproduce. (INDEX.json saviFindings.)
- The 40-manifest sample is a scoped check (2961 frames equal 2961 hashes), and the full 2580 run is held in the jayzee tree, not in the index. (INDEX.json saviFindings.)
- The 307 text-visible keys cannot be reproduced from the original 1173-file input, which is not preserved. The re-derivation uses 38 content-addressed inputs, and the completeness of the 67 contributing paths rests on an ephemeral scan of 1154 files. (INDEX.json spawnLearningRecord; spawn/spawn-index.json.)
- The learning record and the findings refer to ephemeral /tmp/spawn-probe paths. (INDEX.json spawnLearningRecord; exhaustive/verify-all-manifests-technique.mjs; exhaustive/verify-v3-technique.mjs.)
- Witness scripts named in the learning record, such as witness/text-key-census.mjs and reconcile-gap.mjs, are in the jayzee tree and not in the index. (INDEX.json spawnLearningRecord.)
- The jayzee tree has no git repository, so the findings are not committed or pushed. (INDEX.json saviFindings.)
- The cleetus endpoint tables were not captured: endpointTableSample is an empty array. (savi/savi-index.json.)
- The cleetus docs are indexed by path, byte count and sha256 only, so the text of docs/FEATURESET.md, docs/OPEN-ITEMS.md, docs/JAYZEE-GAPS.md and the other docs is not in the index. (savi/savi-index.json docs.)
- The feed correction points to FEED_SCOPE.md and data/feed-projects.json for the full 3421-project list. Neither is in the index, and the excerpt covers only the first block of 22 rows. (INDEX.json saviProjects; savi/savi-index.json.)
- The root map has descriptions only for worlds 1 to 20. (INDEX.json spawnRootMap; spawn/root-worlds.json.)
- Play and like counts drift between reads. For example @lanmower/deepfall showed 4 plays earlier and 6 later. (INDEX.json spawnRootMap; extra/worlds.json.)
- The live page probe of lanmower/deepfall covered one page for 25 seconds and filtered on spawnfile and bigspawn hosts only. (INDEX.json saviFindings.)

### Counts that disagree across files

- Worlds with GLB refs: 399 (README.md, spawn/README.md, the learning record), 400 (spawn/spawn-index.json glbWorldCount, INDEX.json counts worldsWithGlbRefs), and 748 (COMPLETE_INDEX.md, exhaustive/worlds-and-glbs.json, exhaustive/direct-cdn-glb-links.json, worldsWithGlb). The 748 is the expanded count after discovery and the others are baseline figures; the index does not reconcile them.
- GLB rows: 2416 (exhaustive/glb-links.tsv, exhaustive/source-glb-urls-all.tsv, the learning record, COMPLETE_INDEX.md legacyGlbRows) against 2417 (INDEX.json glbRows, spawn/spawn-index.json glbRows, spawn/README.md, README.md). The extra row is not identified.
- CDN manifest size: exhaustive/README.md says CDN manifest rows 78 and GLB CDN manifest rows 13. exhaustive/cdn-manifest.json holds 35 assets (count 35, ok 35). extra/cdn-manifest-all.json holds 78.
- Feed page counts: the compact pass (discovery/feed-evidence.json) has 255 pages and 12400 world ids, and the full pass (discovery/full-feed-evidence.json) has 288 pages, 11853 rows and 3951 projects. Last non-empty offsets also differ (hot 3936 against 3984).
- World-store reachable total: the first pass reached 348 worlds and the retry reports 407 newly reachable, which sums to 755. The combined total is 750, and the retry reports 343 prior successes preserved. The five-world difference is not explained.
- Derived GLB links: 3421 new links from the world-store retry, with the combined total of derived links given as 3421 in one place and the expanded direct total of 5783 in another. The index keeps both, labelled as separate figures.
- Root-row names: extra/worlds.json and spawn/root-worlds.json differ on seven rows (13, 26, 27, 32, 38, 53 and 61) in path and title, because the extra copy uses the new names. Which copy matches the live site is not recorded.
- Map denominators in the README: "Root-linked world map and feed are separate denominators" and the 74, 19 and 4 counts are kept apart. The root-linked map (74), the feed games in extra/feed.json (19) and the full-feed projects (3951) are not reconciled.

### Discovery and retry gaps

- The first world-store pass ran out of its 900000 ms wall budget with 5151 worlds unscanned. The retry covered them, but the coverage depends on run time. (discovery/world-store-evidence.json blockers; discovery/DISCOVERY.md.)
- The feed walks stop at an empty batch from offset 4032 (compact) and 4560 (full) for every sort. Whether any project lies beyond the maxOffset of 4800 is not known. (discovery/feed-evidence.json blockers; discovery/full-feed-evidence.json blockers.)
- 8817 worlds are unreachable, of which 8799 answer HTTP 404 on head.json. Their status (unpublished, deleted or not yet propagated) is not recorded. (discovery/retry-outcomes.json counts.)
- 14 worlds returned network errors (head status 0) with no retry result recorded. (discovery/retry-outcomes.json.)
- 3 worlds have head 200 with a missing manifest, and 1 has a manifest that could not be reached. These are listed by category without a remedy. (discovery/retry-outcomes.json.)
- project-page-evidence.json lists 1004 outcome rows against 6604 URLs attempted and 5645 unreachable. The per-URL rows for the rest are not in the file. (discovery/project-page-evidence.json.)
- Project-page extraction recorded 0 app ids, 0 dev session ids and 0 direct GLB URLs. The index does not say whether pages lack these or the extractor missed them. (discovery/project-page-evidence.json extracted; discovery/DISCOVERY.json.)
- The DISCOVERY report lists the feed blockers, but does not say what was done with them. (discovery/DISCOVERY.json feed.full.blockers.)

### CDN and GLB gaps

- Eight CDN names are generated on demand with no stable bytes, and three of them are inactive with a generated placeholder response: cdn/boss.glb, cdn/fountain.glb and cdn/lantern.glb. The final contents of all eight are not recorded. (extra/cdn-manifest-all.json.)
- Five names answered HEAD 200 with empty validation: cdn/coin.mp3, cdn/model-red-fox.glb, cdn/texture-grass.png, cdn/texture-marble-white-veined.png and cdn/texture-terrain-grass-realistic-albedo-summer-exploration.png. (extra/cdn-manifest-all.json.)
- Four asset rows have headStatus 0 and six have getStatus 0, with no recorded network error. Three rows carry externalTimeoutEvidence. (extra/cdn-manifest-all.json.)
- Forty-three inventory names have no leading slash, and the index does not say whether these resolve to the same CDN object as the slash form. (extra/cdn-inventory.json.)
- The direct GLB links were not re-fetched for this index. Status and magic evidence come from earlier scans. (exhaustive/direct-cdn-glb-links.tsv; exhaustive/README.md.)
- exhaustive/worlds-and-glbs.json names source files outside the index, including /workspace/extra/site/worlds.json and /workspace/extra/.local/cdn/manifest-all.json. (exhaustive/worlds-and-glbs.json sources.)
- Five Borick projects are indexed. Only First Date carries GLB links; the other four have none recorded. (borick/borick-projects.json.)

### Scripts, rebuilds and provenance

- The builders and checkers read /workspace/savi/spawn-evidence/data (old name: savi), which is outside the index. The index cannot be rebuilt without that tree. (build-complete-index.mjs; build-expanded-index.mjs; build-full-surface-index.mjs; check-complete-index.mjs; exhaustive/check-world-glb-completeness.mjs.)
- Nine .patch-*.cjs scripts rewrote build and check scripts in place. Their pre-patch state is not recorded and they are not in any provenance manifest. (.patch-checkers.cjs and the other patch scripts.)
- Thirty-five files are in no provenance manifest: the nine patch scripts, the six discovery run files, the sixteen exhaustive/cdn-scan JSONL files and the four manifests. (provenance.sha256.txt; extra/provenance.sha256.txt; exhaustive/provenance.sha256.txt; borick/provenance.sha256.txt.)
- The fileHashes map of spawn/spawn-index.json (120 entries) and the docs list of savi/savi-index.json hash source files outside the index, so they cannot be verified here. (spawn/spawn-index.json; savi/savi-index.json.)
- The run pid files (discovery/project-pages-run.pid and discovery/retry-run.pid) hold process ids that the index cannot verify. (discovery/*.pid.)
- INDEX.json and spawn/spawn-index.json were generated on 2026-11-11 before the discovery pass, so their counts do not include the later discovery figures. (INDEX.json generatedAt; README.md generation stamp.)
- The README "Files" list and the INDEX.json outputs list do not name the extra/, discovery/, exhaustive/ or borick/ directories or the root scripts. (README.md; INDEX.json outputs.)

### Documentation copy gaps

- The skills section is not served by the docs door. The pull returned HTTP 404 for skills (1915 bytes), so no skill text is captured. skills.json lists 23 skill ids. (extra/docs/pull-index.json; extra/docs/skills.md; extra/docs/skills.json.)
- The pull index holds 70 result rows against an expectedSections value of 68. The extra two rows are the guide and skills rows. (extra/docs/pull-index.json.)
- The file extra/docs/20-world-queries.md repeats its heading and body. (extra/docs/20-world-queries.md.)
- Most doc files are JSON wrappers, and 00-opening.md is plain markdown. The same text is held in both forms. (extra/docs/.)
- The guide refers to api-reference.md at the root of the engine repository git.jayzee.co/engine/6.0.0.git. That repository is not in the index. (extra/docs/guide.md.)
- The reference says a whole-reference read is available with ?section=all. The index keeps one file per section and no whole-reference file. (extra/docs/00-opening.md; extra/docs/sections.json.)
- Duplicate copies: extra/docs-sections.json and extra/docs/sections.json are identical, and extra/docs-pull-index.json and extra/docs/pull-index.json are identical. Both pairs are kept. (extra/provenance.sha256.txt.)

### Naming gaps

- The old names remain in on-disk paths, script names, the old schema strings (for example workspace.spawn-content-index/v1 and spawn.worlds-and-glbs.v4), the hosts www.spawn.co and play.spawn.co, and the feed and world-store URLs. These are kept verbatim as the source wrote them.
- The field name cleetus in NotifyDmOptions (extra/docs/30-dm-hooks.md and extra/docs/47-named-types-full.md) is kept as the reference wrote it.

## Sources

- /workspace/index/README.md
- /workspace/index/INDEX.json
- /workspace/index/COMPLETE_INDEX.md
- /workspace/index/COMPLETE_INDEX.json
- /workspace/index/EXTRA_WORLD_INDEX.md
- /workspace/index/EXTRA_WORLD_INDEX.json
- /workspace/index/spawn/README.md (old name: spawn)
- /workspace/index/spawn/spawn-index.json (old name: spawn)
- /workspace/index/spawn/root-worlds.json (old name: spawn)
- /workspace/index/savi/README.md (old name: savi)
- /workspace/index/savi/savi-index.json (old name: savi)
- /workspace/index/savi/openapi-paths.txt (old name: savi)
- /workspace/index/discovery/DISCOVERY.md
- /workspace/index/discovery/DISCOVERY.json
- /workspace/index/discovery/feed-evidence.json
- /workspace/index/discovery/full-feed-evidence.json
- /workspace/index/discovery/project-page-evidence.json
- /workspace/index/discovery/world-store-evidence.json
- /workspace/index/discovery/retry-outcomes.json
- /workspace/index/discovery/project-pages-run.pid
- /workspace/index/discovery/retry-run.pid
- /workspace/index/exhaustive/README.md
- /workspace/index/exhaustive/worlds-and-glbs.json
- /workspace/index/exhaustive/direct-cdn-glb-links.json
- /workspace/index/exhaustive/direct-cdn-glb-links.tsv
- /workspace/index/exhaustive/cdn-manifest.json
- /workspace/index/exhaustive/verify-all-manifests-technique.mjs
- /workspace/index/exhaustive/verify-v3-technique.mjs
- /workspace/index/extra/cdn-manifest-all.json
- /workspace/index/extra/cdn-inventory.json
- /workspace/index/extra/worlds.json
- /workspace/index/extra/feed.json
- /workspace/index/extra/docs/00-opening.md
- /workspace/index/extra/docs/20-world-queries.md
- /workspace/index/extra/docs/30-dm-hooks.md
- /workspace/index/extra/docs/47-named-types-full.md
- /workspace/index/extra/docs/guide.md
- /workspace/index/extra/docs/skills.md
- /workspace/index/extra/docs/skills.json
- /workspace/index/extra/docs/pull-index.json
- /workspace/index/extra/docs/sections.json
- /workspace/index/extra/docs-pull-index.json
- /workspace/index/extra/docs-sections.json
- /workspace/index/borick/borick-projects.json
- /workspace/index/build-complete-index.mjs
- /workspace/index/build-expanded-index.mjs
- /workspace/index/build-full-surface-index.mjs
- /workspace/index/check-complete-index.mjs
- /workspace/index/.patch-checkers.cjs
- /workspace/index/provenance.sha256.txt
- /workspace/index/extra/provenance.sha256.txt
- /workspace/index/exhaustive/provenance.sha256.txt
- /workspace/index/borick/provenance.sha256.txt
