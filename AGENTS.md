# Extra repo notes

## scripts/check-extraction-drift.py

- The token is read from `JAYZEE_TOKEN_FILE` when that variable is set, otherwise from `~/.jayzee/token`.
- The token is written to `.local/drift/.auth-header` with mode 0600. The `finally` block removes that file when the script ends.
- One request is a POST to `/api/sdk/v1/<WID>/agent/exec`, named `exec-readonly`. Its body is a script that reads `api.query({})` and `ctx.world.id`. The script's earlier docstring said it never mutates upstream. That was not checked against the server, so it is not recorded here as true.

## .gitignore

- `.local/`, `site/` and `runs/` are not tracked. They hold capture output, saved page captures and gm run records.
