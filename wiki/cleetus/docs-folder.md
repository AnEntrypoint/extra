# The docs folder

## How it works

The docs folder of the cleetus repository (old name: savi) holds six files. Each one is read here as a separate section, with what it contains and the wiki pages that cover it. Paths are relative to `docs/` in the repository.

### FEATURESET.md

The durable featureset file for the jayzee to spoint parity work. It is 1288 lines and about 216 KB. It holds cleetus's documented surface, read-only surveys of the spoint tree at commit `d5e3860` (streams 1 to 58), grep-based candidates, the jayzee learning records, and the scoped scan results. Each figure is marked as re-derived, reported by jayzee, or unverified. The file is split across nine wiki pages: [featureset-part-1.md](featureset-part-1.md) to [featureset-part-9.md](featureset-part-9.md). The required feature-support contract is not duplicated in the file; it lives in OPEN-ITEMS.md.

### OPEN-ITEMS.md

The open-items register. It holds OPEN-001 to OPEN-030, each with a status from the set OPEN, RESOLVED, INFERRED, UNVERIFIED, BEHAVIOUR, DIFFERENT-DATASET and HELD-OWNER. It also holds the "Required feature support" section, which records what jayzee must support, and the jayzee learnings. A checker, `check-open-items.mjs`, enforces the register format, and it is not wired into `package.json` or the workflow. Covered by [open-items.md](open-items.md) and [endpoints.md](endpoints.md) for OPEN-001 and OPEN-003.

### JAYZEE-GAPS.md

The per-row gap register for jayzee. It has 67 rows. Each row maps a FEATURESET group to its jayzee PARITY.md rows at commit `5fd6628c09384c1059af68839fb80e161f48c163`, quotes each open clause at jayzee `2db34a0`, and tags each gap required-in-jayzee. Rows 13 and 36 are UNVERIFIED as closed. Rows 62 to 65 are catalogs and are open. Covered by [jayzee-gaps.md](jayzee-gaps.md). The checkers `check-ideal-coverage.mjs` and `check-ideal-witnesses.mjs` read `/workspace/jayzee/docs/IDEAL.md`, which is outside this repository.

### NETCODE-BRIEF-FOR-JAYZEE.md

The netcode brief for jayzee. It records the LagCompensator findings (a ring of 256 samples, with a silent overflow at the 5000 ms window) and three adopted items. J1 sizes the ring from the window (owner item 2). J2 is a `docs/netcode-wire.md` (owner items 3 and 4). J3 is a generated module index (owner item 1). OPEN-024 stays open until jayzee reports witnesses for J1 to J3. Owner item 5 is dropped for jayzee. Covered by [netcode.md](netcode.md).

### PARITY-BRIEF-FOR-JAYZEE.md

The parity brief for jayzee. It is a table of the parity rows, with the owner's directives that jayzee must match what spoint has made. Rows 65 and 66 stay open, because the 23 builtin modules and the 208 reference total are UNVERIFIED. Covered by [parity.md](parity.md).

### PARITY-INPUTS.md

The inputs to the parity work. It holds the owner directives, the featureset inputs, the stream lists, and the scan corrections. It states that scan results are scoped to the scanned sets and are not proofs of universal absence. Covered by [parity.md](parity.md) and, for the scan corrections, [featureset-part-1.md](featureset-part-1.md).

## Decisions

- The docs folder is the durable record. Pages in the wiki summarise it and link back to the files, and they do not replace it.
- Each docs file is covered by at least one wiki page. FEATURESET.md is covered by nine pages because of its size.
- Figures are never merged across the scopes they come from. Owner items, jayzee items and spoint items keep their own labels.

## Open gaps

- OPEN-ITEMS.md has items still marked OPEN, UNVERIFIED, INFERRED, BEHAVIOUR or HELD-OWNER. The list is in [open-items.md](open-items.md).
- JAYZEE-GAPS.md has rows tagged required-in-jayzee. The list is in [jayzee-gaps.md](jayzee-gaps.md).
- NETCODE-BRIEF-FOR-JAYZEE.md: OPEN-024 is open until jayzee reports the J1 to J3 witnesses.
- PARITY-BRIEF-FOR-JAYZEE.md and PARITY-INPUTS.md: rows 65 and 66 are UNVERIFIED, and OPEN-025 to OPEN-027 are held by the owner. See [parity.md](parity.md).
- FEATURESET.md: the candidates and the security candidate are listed in [open-gaps.md](open-gaps.md).

## Sources

- /workspace/savi/docs/FEATURESET.md (old name: savi), 1288 lines.
- /workspace/savi/docs/OPEN-ITEMS.md (old name: savi).
- /workspace/savi/docs/JAYZEE-GAPS.md (old name: savi).
- /workspace/savi/docs/NETCODE-BRIEF-FOR-JAYZEE.md (old name: savi).
- /workspace/savi/docs/PARITY-BRIEF-FOR-JAYZEE.md (old name: savi).
- /workspace/savi/docs/PARITY-INPUTS.md (old name: savi).
- /workspace/jayzee/docs/IDEAL.md, read only by the ideal checkers (outside this repository).
