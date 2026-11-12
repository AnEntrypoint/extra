# Sources overview

## How it works

The sources folder /workspace/spawn/sources (old name: spawn) holds four files. Together they are 177,623 bytes (about 173 KiB). Three of them are captures of the public and gated HTTP responses that the runs fetched, and one is an index that records when each capture was made and from which URL.

| File | Size | Lines | What it holds |
|---|---|---|---|
| index.jsonl | 585 bytes | 3 JSON lines | One record per capture: url, id (the capture file's name without .txt) and at (the capture time, UTC). See [sources-index.md](sources-index.md). |
| 4b8de3c0e586.txt | 328 bytes | 1 line | The response of a git push URL on git.spawn.co: an authentication-required message with the request that a client must make. No credential is stored in the file. |
| c0a1026ad961.txt | 1,322 bytes | 1 JSON line | The head.json response for the world with worldHex 4b37bdd806b142e4980a443e48806c1f (the world @lanmower/deepfall): commit, tree, manifests, sequence numbers, versions and byte counts. |
| 4ed031bf3c55.txt | 175,388 bytes (171.3 KiB) | 468 lines | The HTML shell of a play.spawn.co session page for the same world, captured at 2026-11-07T10:45:12.270Z. Its inline scripts carry the build, the session facts and the boot logic. |

The index has three entries and each entry's id matches one capture file. The three capture files are described section by section in [sources-captures.md](sources-captures.md).

Read method. index.jsonl, 4b8de3c0e586.txt and c0a1026ad961.txt were read in full. 4ed031bf3c55.txt (171 KiB, 468 lines) was read by structure: the head section, the inline script blocks, the body section and the closing tags were read in full, and the long minified lines (up to 49,150 characters) were read by their first 200 characters and by searching the whole file for the keys, URLs and event names they hold. The counts of hosts and event names come from that whole-file search, not from reading the minified code.

## Decisions

The captures were kept as the raw responses the runs received, so a later reader can see what the runs saw. The index records each capture's URL and time, which is the only link to a run. Matches by time and content:

- c0a1026ad961 (2026-11-07T10:45:01Z) carries seq 103, liveSeq 50, version 92 and membersLiveBytes 6492761. Run 2026-11-07-10-41-32-040293 recorded the same head.json fields in its witness.
- 4ed031bf3c55 (2026-11-07T10:45:12Z) is the session page for the same world. Run 2026-11-07-10-41-32-040293 recorded loading that session page with 680 requests.
- 4b8de3c0e586 (2026-11-05T11:39:26Z) is a git push URL response. Run 2026-11-05-11-38-30-87b1e7 made a push (c78c66e) in the same window, but the run does not name this URL, so the match is by time only.

Evidence: index.jsonl entries (url, at) and the run witnesses in [runs-findings.md](runs-findings.md) and [runs-timeline.md](runs-timeline.md).

## Open gaps

- The sources do not say which run requested each capture. The link is by URL and time only.
- 4b8de3c0e586.txt is a response that required authentication, so the content behind that push URL was not captured.
- 4ed031bf3c55.txt was captured as a page shell; the game content it loads (the realm modules and the worker bundles) is not in the sources. The page lists 67 references to https://play.spawn.co and 2 to the realm host r3a369lqi-playco.spawnfile.io.
- c0a1026ad961.txt is a single response at 2026-11-07T10:45:01.263Z, so it shows the head at that time only.

## Sources

- /workspace/spawn/sources/index.jsonl (old name: spawn)
- /workspace/spawn/sources/4b8de3c0e586.txt (old name: spawn)
- /workspace/spawn/sources/c0a1026ad961.txt (old name: spawn)
- /workspace/spawn/sources/4ed031bf3c55.txt (old name: spawn)

See also: [sources-index.md](sources-index.md), [sources-captures.md](sources-captures.md), [runs-overview.md](runs-overview.md).
