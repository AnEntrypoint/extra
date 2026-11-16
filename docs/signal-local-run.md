# Signal Stage: run the world locally

This guide says what it takes to run the Signal Stage world from captured bytes on one machine. It is based on `/workspace/signal/world/signal-stage/docs/LOCAL-RUN.md`, read in place without changes. Items marked **checked** were confirmed against the files or the running server on 2026-11-16. Items marked **not re-run** are the owner's measurements, which were not repeated for this guide.

## What "local" covers, and what it does not

- The world runs from a snapshot of captured bytes, with no network connection at runtime. **Checked:** the runner imports only `node:http`, `node:fs`, `node:path` and `node:url`, so it opens no outbound connection.
- It does not run fully locally in every respect. The 3D world needs WebGL or WebGPU, and a headless session with no GPU draws no canvas. The realtime WebSocket to the local origin fails. The `ERR_ABORTED` loads stay (see below).

## 1. The snapshot at `SNAPSHOT_ROOT`

- `SNAPSHOT_ROOT` points at a directory with three parts: `assets/`, `raw/` and `state/`. The snapshot is about 170 MB and is not in git.
- The default is `.spawn/local/snapshot` inside the signal-stage repository. **Checked:** `serve-local.mjs` line 7 sets it that way, and `.gitignore` line 6 excludes `.spawn/local/snapshot/`, so `git check-ignore` reports it.
- Building the snapshot is a separate step, `.spawn/local/capture-snapshot.mjs`. It fetches from the hosted site, so it needs network access and runs only when the owner asks for a new capture. It is not part of running the world.
- **Status:** the default directory does not exist in this workspace. A server is already answering on port 4173, so a snapshot exists somewhere, but its path was not found. The path must be set explicitly before anyone starts a new server.

## 2. Start the local server on port 4173

```
SNAPSHOT_ROOT=/path/to/snapshot PORT=4173 node .spawn/local/serve-local.mjs
```

- `PORT` defaults to 4173 (**checked**: `serve-local.mjs` line 9). `HOST` defaults to `127.0.0.1`.
- Open `http://127.0.0.1:4173/`.
- `GET /__health` returns `{ ok, mappings, misses }`. `mappings` is the number of captured URL mappings. **Checked:** on the server running now it returned `{"ok":true,"mappings":4284,"misses":33}`.
- `GET /__misses` lists the URLs with no captured bytes, with a count for each.
- `GET /api/session/grant` and every `/api/sdk/*` path return `503` JSON. No session or token is issued. **Checked** against the source (`serve-local.mjs` lines 125 to 127).

## 3. Playwriter for the 3D world

- Browser work uses the playwriter setup inside gm. The built-in browser and other tools are used only when playwriter cannot do the job.
- The last recorded run used `PLAYWRITER_WEBGPU=1 PLAYWRITER_EXEC_TIMEOUT=120000 node node_modules/.bin/playwriter` in `/config/.gmnew/versions/e59d2c1-1/pw`. **Checked:** `PLAYWRITER_WEBGPU=1` is read only by `bin/playwriter-project` in that directory. When it is `1`, the launcher seeds the WebGPU labs (`enable-unsafe-webgpu`, `enable-vulkan@1`, `enable-webgpu-developer-features`) into the profile before Chromium starts, and it leaves out `--disable-gpu`. Otherwise it passes `--disable-gpu`. The CLI in `node_modules/playwriter` does not read the variable, and `bin/playwriter-project` is not called from that package. Whether the recorded run started its browser through the launcher was not verified.
- For software WebGPU in headless Chromium, the game-16 guide gives these flags: `--enable-unsafe-webgpu --enable-features=Vulkan,WebGPU --use-angle=vulkan --use-vulkan=swiftshader --use-webgpu-adapter=swiftshader --enable-unsafe-swiftshader`. Whether playwriter passes them to the browser was not verified.
- Two tabs loaded at once were measured by the owner; the single-tab run is the reference.

## 4. The residual `ERR_ABORTED` requests are kernel behaviour

- Each page load produces about 41 to 82 `ERR_ABORTED` requests (**not re-run**). These are kept as the captured kernel produces them.
- Causes the owner traced: the kernel's world-store reads and module fetches, the frame navigations the kernel makes (`/kernel-witness`, `about:blank`, the authored realm), and one JavaScript abort in the door-ask path (`asking.controller.abort`). Removing that abort did not remove the aborts.
- No serve-time patch removes them while the grant answers `503`.
- To judge a run, count the things that matter: page errors must be 0, and requests to any origin other than `127.0.0.1:4173` must be 0. Aborted requests are not a failure.

## 5. What must never reach Spawn

Spawn is the hosted service at `spawn.co`, with its own domains. These must stay on this machine:

- **The snapshot and its contents.** They are captured hosted bytes. Do not commit them, upload them, or copy them into any repository that pushes to Spawn.
- **Pushes from signal-stage.** Its origin is `https://git.spawn.co/@lanmower/signal-stage.git`, and a push to main lands in the room. No push goes out until the owner says so.
- **`.spawn/` in signal-stage.** `AGENTS.md` says the room never receives these paths. The runner `serve-local.mjs` and the capture script stay there.
- **Session grants and tokens.** The local server answers `503`. Do not add a grant, a Bearer token or a cookie to the runner, to a playwriter run, or to a doc.
- **Capture runs.** `capture-snapshot.mjs` makes network requests to the hosted site. Run it only when the owner asks, and never from the world.
- **Outbound requests from a local run.** A page loaded from `127.0.0.1:4173` should make no request to any other origin.

This guide lives in the extra repository on GitHub. It contains no token, grant or snapshot content, and it is safe there.

## 6. Checks on this guide

- Health: `curl http://127.0.0.1:4173/__health` returned `{"ok":true,"mappings":4284,"misses":33}` (checked).
- Grant: `curl -i http://127.0.0.1:4173/api/session/grant` returns `503` with a JSON error (checked in this pass).
- Imports: `serve-local.mjs` imports only `node:http`, `node:fs`, `node:path` and `node:url` (checked).
- Ignore rule: `.gitignore` line 6 excludes `.spawn/local/snapshot/` (checked).
- Remote: the signal-stage origin is `git.spawn.co` (checked). Nothing was pushed to it.
- `PLAYWRITER_WEBGPU`: read at `bin/playwriter-project` lines 428 and 437 in the `pw` install. Not read by `node_modules/playwriter` (checked).
- Not checked here: the snapshot path, the 3D render, and the `ERR_ABORTED` counts.
