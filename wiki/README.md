# Project wiki: how this wiki is organised

This wiki records everything learnt in three projects that sit beside it in the workspace: **index**, **cleetus** and **jayzee**. It is the full documentation of those projects: how each system works, the decisions behind it, and the gaps that remain open. It is not a summary. Every topic has its own page, and every page cites the on-disk source it came from.

## Names used in this wiki

| Name in this wiki | Name on disk | What it is |
|---|---|---|
| index | `/workspace/index` | The index of world, feed and documentation data. Its name is unchanged. |
| cleetus | `/workspace/savi` (old name: savi) | The static manual, endpoint status, feature set and gap records for the Savi project. |
| jayzee | `/workspace/spawn` (old name: spawn) | Map, run and source evidence for the Spawn world-store and CDN behaviour. |

Rules applied to every page:

- In prose, titles and names, `savi` is written as **cleetus** and `spawn` is written as **jayzee**. `index` stays `index`.
- A source path is quoted exactly as it is on disk, and the page says the path is an old name when it contains `savi` or `spawn`. Example: `/workspace/spawn/maps/spawn-learning-record.md` (old name: spawn).
- Hostnames and URLs are not project names, so they are kept verbatim. For example, `play.spawn.co` is the live host and is not renamed.

## Layout of the source tree

The wiki source lives in `/workspace/extra/wiki/`. Each top-level directory is one project, and the root holds this README and the table of contents.

| Path | Holds |
|---|---|
| `README.md` | This page: how the wiki is organised, the naming rules, and how to build it. |
| `toc.md` | The table of contents: every page, grouped by project, in reading order. |
| `index/` | Pages for the **index** project: its overview, index files, extra worlds and feeds, extra docs, CDN inventory, provenance, and open gaps. |
| `cleetus/` | Pages for the **cleetus** project: its overview, manual build, endpoints, feature set, gap records, netcode and parity briefs, engine, evidence, site, CI workflows, runs and state. |
| `jayzee/` | Pages for the **jayzee** project: its maps and learning record, witness scripts, run timeline and findings, sources, and the top-level index and build-script tree. |

Page file names are lower-case and hyphenated. A page's prefix tells you what it covers inside its project. For example, in `cleetus/` the `engine-` prefix covers the `spawn-engine/` directory, and the `evidence-` prefix covers `spawn-evidence/`. The prefixes keep the old directory names visible in the file names as well as in the text.

## Shape of every page

Each page uses the same five sections, in the same order:

1. **Title**: the topic.
2. **How it works**: the mechanism, described from the source.
3. **Decisions**: the decisions behind the mechanism, with the evidence the source gives for them.
4. **Open gaps**: each real gap that the source records, or the line "None recorded in the sources".
5. **Sources**: the exact on-disk paths the page was written from.

Pages link to each other with relative links. A link to a section of the same page uses an anchor made from the heading.

## How the wiki is built

The site is generated from the markdown source by a dependency-free build script. Nothing needs to be installed.

```
node /workspace/extra/wiki-tools/build.mjs /workspace/extra/wiki /workspace/extra/wiki-site
node /workspace/extra/wiki-tools/check-links.mjs /workspace/extra/wiki-site
```

The first command renders every `.md` page to `.html` under `wiki-site/`, keeps the directory layout, rewrites `.md` links to `.html` links, rewrites `README.md` links to `index.html`, and writes a shared stylesheet and a sidebar on every page. The second command checks every internal `href` and `src` in the built site, including the anchors, and exits non-zero when any link is broken.

Open `/workspace/extra/wiki-site/index.html` in a browser to read the wiki.

## How to change the wiki

1. Edit the page in `wiki/`. Keep the five sections.
2. Keep the naming rules above.
3. Add the page to `toc.md`.
4. Run both commands. The link check must report `broken: 0` before the change is committed.

Code comments are not used anywhere in the wiki or in its build tooling. Facts go into the prose of a page, and the open items go into its "Open gaps" section.

## Status of the source material

Each page records the state of its source as it was read. The sources are the working trees of the three projects, and they keep changing. A page describes the source on the date it was written, and the pages list the on-disk paths so that a reader can check the current state.

See [the table of contents](toc.md) for every page.
