# Sources captures

## How it works

This page summarises the three capture files in /workspace/spawn/sources (old name: spawn), in index order: 4b8de3c0e586.txt, c0a1026ad961.txt and 4ed031bf3c55.txt. Each capture is described section by section, with the key facts quoted. The index entries for the captures are in [sources-index.md](sources-index.md).

Hashes and identifiers are quoted as they appear, and the long hex strings are shortened with an ellipsis only where a shorter form still identifies them uniquely in the capture. Hostnames and URLs are kept verbatim. The world in all three captures is worldHex 4b37bdd806b142e4980a443e48806c1f, whose address is @lanmower/deepfall.

### Section 1: 4b8de3c0e586.txt (328 bytes, 1 line)

This is a plain-text response from a git push URL on git.spawn.co (the push URL is in index.jsonl, entry 1). The line begins with "authentication required:" and states that the request needs HTTPS basic authentication with the same username and token as the git remote. It says the token is the password, read from the environment variable SPAWN_TOKEN, or else from the token file that the spawn login command keeps. The rest of the line is a curl command template with a placeholder for the URL. The capture holds no credential and no token value. The URL is the push listing for the pushes/463 entry of the-savi-gallery.

### Section 2: c0a1026ad961.txt (1,322 bytes, 1 JSON line)

This is the head.json of the world, returned by https://play.spawn.co/world-store/git/4b37bdd806b142e4980a443e48806c1f/head.json. The object has 30 keys. The key facts:

- v 1, worldHex "4b37bdd806b142e4980a443e48806c1f".
- commit "759442afc96d5641dd24808c496942b199bbad92", tree "673e0fdcc25c754b592cfeb5d05fa1cca3d9958b", seq 103.
- manifest "0d6bc192c74ee18985cd205147eb572fbcb748fb4f6d86c9d83952afd3cb7090", and sheet with the same value.
- live "ace56b772ceafda37d18fce951784b36354a246b", liveManifest "2baa86aaf66e6e79848656dbfc0de8e6f49e295c8f968c4808e8e0f63490e7ba", liveSeq 50.
- version 92, liveVersion 50, membersLiveBytes 6492761, livePushedAt 1793804677702 (milliseconds).
- eye "none", liveEye "none", needs ["path-tree"], liveNeeds ["path-tree"].
- near: word "ring-priced", revoked "3e9c89ebc0c30196", walk "3", lists with one entry of count 1. liveNear has the same word and revoked value with a different list hash.
- scene "14ddca262ad83a9b", sceneAlone "f1d6748797008739", notes "8fac9214b84d79e033bc169ee8a7006d26f91bbe".
- at "2026-11-07T10:28:39.351Z", parentCommit "d1346309779a92f9f38fa5fde0b2b8d1d8ef63b0", parentManifest "6b347569c83e4b3468a8c98b9283d6ba822e7dc907c449ac46ee87f891214a80".
- changed, changedCells, changedPages, changedImports, changedIndex and changedSizes are all empty objects, so this head has no delta against its parent.

The run 2026-11-07-10-41-32-040293 recorded the same fields in its witness (seq 103, liveSeq 50, version 92, membersLiveBytes 6492761), so the capture matches the run's read.

### Section 3: 4ed031bf3c55.txt (175,388 bytes, 468 lines, HTML)

The capture is the HTML shell of the session page at https://play.spawn.co/session/world%3A4b37bdd8-06b1-42e4-980a-443e48806c1f%40live?address=%40lanmower%2Fdeepfall&link=world%3A4b37bdd806b142e4980a443e48806c1f%40live%2Froom%3Amain&bootPack=narrow&frameGrant=REDACTED&siteSave=on&siteRoad=page&spawn-page=ca1da515. Lines were read by structure, and the long minified lines were read by their first characters and by whole-file search (see [sources-overview.md](sources-overview.md)).

3.1 Document head (lines 1 to 7). The document is HTML5. The base href is "https://play.spawn.co/v4/client/pool/", and the title is "Spawn". The viewport disables zoom (maximum-scale=1, user-scalable=no).

3.2 Inline CSS (lines 8 to 25). The page background is #040909. User selection and overscroll are disabled on html and body.

3.3 Reload guard script (lines 26 to 49). While the document is still loading and its element count has stopped changing after a navigation response, the script reloads once with documentCut=1 added to the URL.

3.4 Gesture guard script (lines 50 to 76). Pinch zoom, gesturestart, gesturechange and gestureend are cancelled, and ctrl-wheel zoom is prevented. On Chrome, touch-action is set to "pan-x pan-y".

3.5 Build object (lines 77 to 79). The script sets window.__spawnBuilt with build "991abd0ef7af5600702fdfa4ffab81cb", semver "6.0.0", stamp "2026-11-07T10:09:39.074Z", and heldVerdict "no-claim". It also carries defaults (five named entries: far-step, stick-move-sign, true-strike-scripts, sun-rises-east, true-strike), files (76 entries mapping logical names to hashed asset names, for example index.js to 6d66a223-ed39611b6f1b46d8.js, engine-client-runtime-worker.mjs to 9d5c4347-763ba543418e11c0.mjs, engine-client-transport-worker.mjs to c594a708-0d86ab276a3ecde8.mjs, and the worker-* modules, the engine-* modules and the tome-ui assets), and closures and edges maps. Line 78 is 17,690 characters long.

3.6 Module preloads (line 80 and lines 84 to 112, 30 link tags). Each is a link rel="modulepreload" with fetchpriority "high" to https://play.spawn.co/v4/client/pool/ and a hashed name. The first is index.js.

3.7 Kernel bootstrap, runtime worker (lines 113 to 135). An inline script creates the runtime worker from the root module 9d5c4347-763ba543418e11c0.mjs with the hash "#realm=sim" (or "#tape=1&realm=sim" when the tape flag is set). The source is rewritten so that import.meta.url resolves to the root URL, then loaded through a blob URL. If that fails, it falls back to fetching the root. Errors are logged with the prefix "[kernel bootstrap]".

3.8 Kernel bootstrap, transport worker (lines 136 to 158). The same pattern for the root module c594a708-0d86ab276a3ecde8.mjs with "#realm=transport".

3.9 Projection turn (lines 159 to 163). Sets window.__SPAWN_SESSION__ to worldId "4b37bdd8-06b1-42e4-980a-443e48806c1f", link "world:4b37bdd806b142e4980a443e48806c1f@live/room:main", address "@lanmower/deepfall", fanout true and headFollows true.

3.10 Dial turn (lines 164 to 168). A turn named "dial" that defines a long regular expression over hash-like suffixes beginning "(?:-g(?:[0-9]..." (line 166 is 39,426 characters). Its purpose was not decoded.

3.11 Early host (lines 169 to 175). A preconnect to https://r3a369lqi-playco.spawnfile.io, a window.__spawnRealmHost of "r3a369lqi", and a no-cors HEAD request for the tome-ui authored-realm-kept HTML page on that host.

3.12 Renderer cleanup (lines 176 to 182). Terminates a preborn renderer worker if one exists.

3.13 Device race (lines 183 to 185). A HEAD request for https://play.spawn.co/world-store/values/2baa86aaf66e6e79848656dbfc0de8e6f49e295c8f968c4808e8e0f63490e7ba with cache "spawn-world-values-v1" opened in parallel.

3.14 Tree ask (lines 186 to 190). Asks for the manifest https://play.spawn.co/world-store/manifests/2baa86aaf66e6e79848656dbfc0de8e6f49e295c8f968c4808e8e0f63490e7ba/with/ring-priced, and lists the held URLs: the values, packs (world-store/packs/...) and heads (world-store/heads/4b37bdd806b142e4980a443e48806c1f). A choose function records the chosen word once; the words "whole" and "held" return without starting the ask.

3.15 Facts (lines 191 to 194). Sets window.__SPAWN_SESSION__ again with a head object: commit "759442af...", seq 103, manifest "0d6bc192...", liveManifest "2baa86aa...", live "ace56b77...", liveSeq 50, sheet, tree "673e0fdc...", eye "none", needs ["path-tree"], version 92, liveVersion 50, membersLiveBytes 6492761, plus fanout true and treeAsk "ring-priced".

3.16 Stylesheet preload (line 196). Preloads the UI stylesheet https://play.spawn.co/world-store/git/4b37bdd806b142e4980a443e48806c1f/ui/2baa86aaf66e6e79848656dbfc0de8e6f49e295c8f968c4808e8e0f63490e7ba.css.

3.17 Body (lines 197 to 199). A single div with id "root", and a module script.

3.18 Module boot script (lines 200 to 465). The largest section. It posts "spawn:kernel:loading-state" messages to the parent frame with engineHash "991abd0e...", engineSemver "6.0.0", engineStamp and engineHeldVerdict, and the phases initializing, error and substatus messages such as "Gathering the good stuff...". It skips posting in standby mode (the standby query parameter). It installs error and unhandledrejection handlers that ignore foreign throws. The boot turn imports the entry module https://play.spawn.co/v4/client/pool/6d66a223-ed39611b6f1b46d8.js with a closure of further module URLs. It keeps a per-path session key "spawn:fresh-document:" plus the pathname, retries failed fetches with a backoff that caps at 8000 ms, compares cached and fresh bytes to find damaged files, and when a fresh document is needed it posts "spawn:kernel:restarting" and reloads the page.

3.19 Closing (lines 466 to 469). Closes the script, the body and the html element.

Counts over the whole file. The file has 13 script tags. The text https://play.spawn.co occurs 67 times, and https://r3a369lqi-playco.spawnfile.io occurs 2 times. The message names are spawn:kernel:standby-ready (2), spawn:kernel:stand-drive:ask, spawn:kernel:restarting, spawn:kernel:loading-state, spawn:kernel:boot-progress, spawn:sdk:rpc, spawn:sdk:result, and spawn:fresh-document: (the session key prefix).

The run 2026-11-07-10-41-32-040293 recorded loading this session page with 680 requests (script 262, fetch 413, ping 3, document 1), and listed the play.spawn.co/v4/client/pool/*.mjs files, so the capture matches the run's read.

## Decisions

The captures were stored as received, with no edits, so the record of each response is kept as it was. Where a capture holds a value that a run used (the world head fields, the build hashes, the session facts), the run's witness names the same value. Evidence: [runs-findings.md](runs-findings.md) and the run witnesses cited in section 2 and section 3.

The capture of the session page was kept as the HTML shell only. The realm modules and worker bundles that it loads are not in the sources, so the page's logic is known only from its inline scripts.

## Open gaps

- 4b8de3c0e586.txt is an authentication-required response. The content of the push that the URL refers to is not in the sources.
- c0a1026ad961.txt is a single head. Its changed maps are empty, so the sources do not show a delta.
- 4ed031bf3c55.txt is a page shell. The 76 hashed assets in the build object, and the 30 module preloads, are not captured; their content is not in the sources.
- The preloaded modules (for example 6d66a223-ed39611b6f1b46d8.js and 9d5c4347-763ba543418e11c0.mjs) and the worker bundles are not in the sources, so their behaviour is not verified from these captures.
- The dial regular expression (line 166) and the minified boot code were not decoded beyond their structure.

## Sources

- /workspace/spawn/sources/4b8de3c0e586.txt (old name: spawn)
- /workspace/spawn/sources/c0a1026ad961.txt (old name: spawn)
- /workspace/spawn/sources/4ed031bf3c55.txt (old name: spawn)
- /workspace/spawn/sources/index.jsonl (old name: spawn), for the URLs and capture times

See also: [sources-overview.md](sources-overview.md), [sources-index.md](sources-index.md), [runs-findings.md](runs-findings.md).
