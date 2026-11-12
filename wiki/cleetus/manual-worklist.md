# Manual worklist

## How it works

manual-worklist.json (old name: savi) is a planning file for the static manual of cleetus. It has two top-level keys: generatedFor, set to 2026-11-06, and workspace, set to /workspace/savi (old name: savi). Its units key is an array of seven research units. Each unit has an id, an angle (the subject of the unit), and a query (the instruction for the research pass). The file records what each pass had to establish before the manual could be designed and proven. No script reads the file; the build and check scripts in scripts/ do not refer to it.

The seven units, in file order:

1. corpus: "Completeness inventory of the source corpus". The query asks for a listing of the information-bearing roots under the .spawn tree (old name: spawn), a split between text and binary files, the nested Git metadata, and the runtime state that must not be treated as source. It asks for exact paths, counts and verifiable evidence.
2. structure: "Manual information architecture". The query asks for the reading of the reference README, COVERAGE, INDEX, guide files, and the CLI, engine and skill indexes, and a proposal for sections and navigation that expose every source file directly, with no summary replacing source text.
3. automation: "Every-push regeneration and deployment". The query asks for the exact GitHub Actions and GitHub Pages configuration that rebuilds the static manual on every push and deploys main. It asks for triggers, permissions, concurrency, the artifact path, the deploy job and the steps that enable Pages, using current official actions, with observed evidence.
4. design: "Brutalist direct display". The query asks for an HTML and CSS manual that shows exact file contents in pre blocks, raw file links, file metadata and a complete index, with stark monochrome borders, monospace type, no rounded corners or decorative imagery, and no client-side dependencies, able to handle thousands of files.
5. security: "Safe publication boundary". The query asks for searches of credential paths, tokens, invite codes, private session logs, debug ports and nested Git configuration, and for exact exclusions and a conservative publication policy that never stores secrets.
6. validation: "Proof of completeness and update". The query asks for local and CI checks that prove every published source file has an exact raw copy and a direct HTML display, that HTML escaping is correct, that links resolve, and that a new push changes the generated manual, with exact commands and expected counts.

The units map to what now exists: corpus and security are reflected in the withholding lists of scripts/build-manual.mjs; automation is .github/workflows/publish.yml; design is the monochrome stylesheet written by scripts/build-manual.mjs; validation is scripts/check-manual.mjs.

## Decisions

- The worklist splits the manual into six parallel research angles, so that inventory, design, deployment, security and proof could be worked at once. The file records the split, not the answers.
- The security unit requires a conservative publication policy and forbids storing secrets. The resulting withholding of raw captures, run output, browser state and witness data is recorded in the build script.
- The validation unit asks for exact expected counts. The check script in scripts/check-manual.mjs carries the counts in its output (sources, text, binary, pages, linksChecked) rather than as fixed numbers.
- The queries name the upstream reference tree under the old .spawn path. The file was generated for the workspace /workspace/savi, which is the checkout now called cleetus.

## Open gaps

- The file is not checked by any script. Nothing in scripts/ reads manual-worklist.json, so its units are not proven complete.
- The corpus unit's query names the .spawn tree, which is not the same set of files as the manual's source set (which is the whole repository, with the withheld paths excluded). The sources do not record the reconciliation.
- The file records the 2026-11-06 plan. No later status for each unit is recorded in it.

## Sources

- /workspace/savi/manual-worklist.json (old name: savi)
- /workspace/savi/scripts/build-manual.mjs (old name: savi)
- /workspace/savi/scripts/check-manual.mjs (old name: savi)
- /workspace/savi/.github/workflows/publish.yml (old name: savi)
