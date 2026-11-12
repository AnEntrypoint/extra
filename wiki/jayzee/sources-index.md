# Sources index

## How it works

The file /workspace/spawn/sources/index.jsonl (old name: spawn) has three lines. Each line is one JSON object with three keys: url, id and at. The id is the name of the capture file in the same folder (id plus .txt). The at value is the capture time in UTC with milliseconds. Each entry is set out in full below, both as the exact line from the file and as its three fields.

Entry 1: 4b8de3c0e586

- Line: {"url":"https://git.spawn.co/@lanmower/the-savi-gallery/-/pushes/463","id":"4b8de3c0e586","at":"2026-11-05T11:39:26.216Z"}
- url: https://git.spawn.co/@lanmower/the-savi-gallery/-/pushes/463
- id: 4b8de3c0e586 (capture file 4b8de3c0e586.txt)
- at: 2026-11-05T11:39:26.216Z (2026-11-05, 11:39:26 UTC)
- Capture content: an authentication-required response for the push URL. See [sources-captures.md](sources-captures.md), section 1.

Entry 2: c0a1026ad961

- Line: {"url":"https://play.spawn.co/world-store/git/4b37bdd806b142e4980a443e48806c1f/head.json","id":"c0a1026ad961","at":"2026-11-07T10:45:01.263Z"}
- url: https://play.spawn.co/world-store/git/4b37bdd806b142e4980a443e48806c1f/head.json
- id: c0a1026ad961 (capture file c0a1026ad961.txt)
- at: 2026-11-07T10:45:01.263Z (2026-11-07, 10:45:01 UTC)
- Capture content: the head.json for the world. See [sources-captures.md](sources-captures.md), section 2.

Entry 3: 4ed031bf3c55

- Line: {"url":"https://play.spawn.co/session/world%3A4b37bdd8-06b1-42e4-980a-443e48806c1f%40live?address=%40lanmower%2Fdeepfall&link=world%3A4b37bdd806b142e4980a443e48806c1f%40live%2Froom%3Amain&bootPack=narrow&frameGrant=REDACTED&siteSave=on&siteRoad=page&spawn-page=ca1da515","id":"4ed031bf3c55","at":"2026-11-07T10:45:12.270Z"}
- url: https://play.spawn.co/session/world%3A4b37bdd8-06b1-42e4-980a-443e48806c1f%40live?address=%40lanmower%2Fdeepfall&link=world%3A4b37bdd806b142e4980a443e48806c1f%40live%2Froom%3Amain&bootPack=narrow&frameGrant=REDACTED&siteSave=on&siteRoad=page&spawn-page=ca1da515
- id: 4ed031bf3c55 (capture file 4ed031bf3c55.txt)
- at: 2026-11-07T10:45:12.270Z (2026-11-07, 10:45:12 UTC)
- Capture content: the HTML shell of the session page. See [sources-captures.md](sources-captures.md), section 3.

## Decisions

The index records one capture per line, in capture order, so the three captures can be read as a sequence from 2026-11-05 to 2026-11-07. The first capture is a git push URL, and the next two are spawn.co world responses (the world with worldHex 4b37bdd806b142e4980a443e48806c1f, which is @lanmower/deepfall). The entries are kept verbatim so that the URLs can be used as recorded. Evidence: the three lines of index.jsonl.

## Open gaps

- The index has no field for the requesting run, the HTTP status or the size of each capture.
- The at values are the times the capture was written; the response times are not recorded.
- Entry 1 has no run id, so its link to a run is by time only (see [sources-overview.md](sources-overview.md)).

## Sources

- /workspace/spawn/sources/index.jsonl (old name: spawn), all three lines
- /workspace/spawn/sources/4b8de3c0e586.txt (old name: spawn), named by entry 1
- /workspace/spawn/sources/c0a1026ad961.txt (old name: spawn), named by entry 2
- /workspace/spawn/sources/4ed031bf3c55.txt (old name: spawn), named by entry 3

See also: [sources-overview.md](sources-overview.md), [sources-captures.md](sources-captures.md).
