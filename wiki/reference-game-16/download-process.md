# Download process: from the join instructions to a working site

## How it works

A Spawn world is a git repository that the engine runs live. The play page at `https://www.spawn.co/@lanmower/game-16@dev` is the world at its latest push to `main`. Getting the repository and reaching the site takes three steps, and each one has a single HTTP door.

1. **Account.** The invite code in the join instructions links an agent account to lanmower and makes it an editor on the world. An account that already exists is linked with the code alone: it mints no new token. The token is written to `~/.spawn/token` (or `SPAWN_TOKEN_FILE`) and is never printed.
2. **Identity and doors.** `GET https://www.spawn.co/api/agent/v1/me` with the bearer token answers who the account is, who it is linked to, its worlds with their clone lines, and every door on the surface.
3. **Repository.** Each world entry in `worlds[]` carries a `clone` line. Run it as it stands. The clone reads its credential from `SPAWN_TOKEN` or from the token file, so no token is written into the clone or into git config beyond the Spawn host helper.

The appId that the Tome docs and the publish door need is resolved from the address with `GET https://www.spawn.co/api/resolve-adventure?address=@lanmower/game-16`. The Tome API reference is then read at `https://www.spawn.co/api/sdk/v1/<worldId>/agent/docs`: with no section named it answers the opening and the list of headings, and `?section=<heading>` answers one section.

The clone's `AGENTS.md` is the world's guide. A push reaches the editing copy at `@dev` and every room open on it. A push never publishes. Publishing is `POST https://www.spawn.co/api/games/<appId>/publish`.

## Steps run, with endpoints and results

Secrets are not recorded here. Tokens, invite codes and `sak_` values are shown as placeholders.

| Step | Command or endpoint | Result |
|---|---|---|
| 1. Link | `bun add -g @spawnco/client`, then `spawn login --invite <invite code>` (no `--username`) | Existing account `claude_haiku_55` linked to `lanmower`. `created: false`, `token: null`, no new token minted. World `@lanmower/game-16` (`role: editor`). |
| 2. Identity | `GET https://www.spawn.co/api/agent/v1/me` with bearer token from `~/.spawn/token` | HTTP 200. `linked: true`, `linkedTo: lanmower`. Worlds: `game-16` (editor), `game-10`, `the-savi-gallery`, `wonschweppidytime`. Engine `6.0.0`. |
| Resolve | `GET https://www.spawn.co/api/resolve-adventure?address=@lanmower/game-16` | HTTP 200, `type: found`, `appId: 1e04de61-4225-4d57-8a79-b8e9bcef1c6e`, `worldId: 02e941af-9db1-4d86-b1fa-f7bca802c4b1`. |
| Docs opening | `GET https://www.spawn.co/api/sdk/v1/02e941af-9db1-4d86-b1fa-f7bca802c4b1/agent/docs` with bearer token | HTTP 200. Fields: `appId`, `engineVersion` (`6.0.0`), `era` (`6.0`), `playUrl`, `gitUrl`, `codeUrl`, `specVersion`, `guide`, `tomeApi`, `sections` (68 headings), `skills`. |
| Clone | `git clone` line from `worlds[]` for `game-16` | The clone already exists at `/workspace/extra/game-16` on `main`, origin `https://git.spawn.co/@lanmower/game-16.git`. Remote read check: `git ls-remote origin` returns `main` at `3eb8aeb9c6fcb5c2e87328c69aa3d3cbf9cffc4b` and `refs/notes/spawn`. |
| Play URL | `GET https://www.spawn.co/@lanmower/game-16@dev` | HTTP 200, `text/html; charset=utf-8`. The page is the same site captured in this wiki. |

Not run, on purpose: `spawn client join` (no body joins the world), and the publish door (no publish was asked for).

## Decisions

- The repository already existed in the checkout, so the clone was not repeated. A second clone would be a scratch copy, which the workspace rules forbid.
- The account was linked, not created. The join instructions say not to make a second account when one exists, and the existing token file already held one.
- The invite code and token are never written to a file, a commit, a log, or the screen. The clone line uses `${SPAWN_TOKEN_FILE:-$HOME/.spawn/token}` as a reference, not as a value.
- The join and build question was answered on lanmower's behalf as "help build", as instructed. Build access is the editor standing returned by `/me`.

## Open gaps

- The `game-16` checkout at `/workspace/extra/game-16` has two uncommitted changes (`.gitignore`, `.spawn/engine.yaml`). They were not touched.
- The working site was checked for HTTP 200 and `text/html`, not rendered. Rendering was checked earlier through the playwriter capture in `capture/`.
- The publish door is documented but was not run.

## Sources

- `GET https://www.spawn.co/api/agent/v1/me`, `GET https://www.spawn.co/api/resolve-adventure`, `GET https://www.spawn.co/api/sdk/v1/<worldId>/agent/docs`.
- `/workspace/extra/game-16/.git` (origin and `main`), `/workspace/extra/game-16/AGENTS.md`.
