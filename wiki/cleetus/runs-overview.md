# Runs overview

## How it works

The run store is `/workspace/savi/runs/` (old name: savi). It holds 31 run directories, each one a single agent run of the cleetus workspace in MCP mode. Every run directory is created with `mode` set to `mcp`, `maxSteps` set to 50 (except one run with 5), `maxInflight` set to 8, and `workspace` set to `/workspace/savi` (old name: savi).

### Directory naming

Each name is `YYYY-MM-DD-HH-MM-SS-<6 hex>`.

- The timestamp is the UTC creation time. For example `2026-11-06-05-43-51-e97a35` matches `createdAt` `2026-11-06T05:43:51.112Z` in its `task.json`, and the first `t` value in its `log.jsonl` is `2026-11-06T05:43:51.112Z`.
- The 6-hex suffix is the run identifier. The `id` field in every `task.json` equals the directory name, so the suffix is part of the identity, not a separate label. The sources do not record how it is generated. Two checks were tried and neither reproduced it: the first six hex digits of the SHA-1 of the full id and of the id's last segment did not match the suffix. The suffix is therefore treated as an opaque, unique token.
- Runs can be chained. A `successor` file names the next run directory (its full name, 26 characters, exactly the length of a run name). The chain is described under the Decisions section.

### Contents of a run folder

Listing every run folder gives these file kinds:

| File | Present in | Purpose (as observed) |
|---|---|---|
| `task.json` | all 31 | Run definition: `id`, `mode`, `task`, `witness`, `workspace`, `maxSteps`, `maxInflight`, `createdAt`. |
| `rules.md` | all 31 | Rules text given to the run (7 numbered rules). |
| `log.jsonl` | all 31 | Event log, one JSON object per line. |
| `log.index` | all 31 | Binary index over `log.jsonl`; not decoded here. |
| `successor` | 13 runs | Plain text, the name of the run that continues this one. |
| `jobs/` | 1 run (`2026-11-07-06-03-08-3d5d92`) | Background job records: `body-455.json`, `ci-watch.json`, `ci-watch.out`. |
| `pending.jsonl` | 2 runs (`2026-11-07-08-34-59-4c3432`, `2026-11-07-15-31-42-41cc4e`) | Single `rules-notice` record for a rule 3 violation (finish called with no call in its step). |
| `owner` | 2 runs (`2026-11-11-17-05-27-7661b8`, `2026-11-11-18-52-18-7df595`) | Two-field text, `pid:value` (for example `43784:1558231`); meaning inferred, not documented. |

The table below lists the files actually present for each run.

### File structure

`task.json` is pretty-printed JSON with the keys `createdAt`, `id`, `maxInflight`, `maxSteps`, `mode`, `task`, `witness` and `workspace`. The `task` value is empty for 18 runs. The `witness` value is the same string in every run: "Finish only with a witness: one string that states the evidence (command output, file content or query result) showing the task is done."

`rules.md` is a seven-rule text file, 663 bytes in the early runs and 747 bytes in the 2026-11-11 runs. Rules 1 to 7 cover: paths inside or outside the workspace, calling `next_context` at the start of a step (the later version limits this to the start of a run, after compaction, or when a reply reports `pendingEvents`), verifying before finishing, requiring a witness, using `query_log` for events outside the context window, never handling secrets, and finishing with a witness when a task cannot be done.

`log.index` is binary. Its leading bytes show repeated fixed-width entries rather than text, so its exact layout is not decoded here. Sizes are listed in the table.

`log.jsonl` is newline-delimited JSON. All 31 logs parse with zero malformed lines. Every record carries `seq` (sequence number), `t` (ISO 8601 UTC time), `mono` (monotonic seconds since run start) and `inFlight` (calls in progress). Other keys depend on `kind`.

Record kinds seen across the logs:

- `start`, `tools`, `mcp-server`, `mcp-tool-skipped`, `paused`, `restart`: lifecycle and MCP connection records. `mcp-server` records carry `server`, `state`, `tools` and `protocolVersion`.
- `task`: a task text entering the run, carrying `from` and `text`. `from` names the source, for example `closed run ...`, `session prompt` or `next_context`.
- `action`: a tool call requested by the run, with `step`, `tool`, `args`, `rpcId` and, in later runs, `caller` and `actionSeq`.
- `result`: the response to an action, with `startMono`, `durMs`, `ok`, `output` or `body`, `truncated`, `exitCode` and `signal`.
- `code-call`: appears to be calls made through the run_code verb layer, with `tool`, `step` and `args` (inferred from keys).
- `skill-loaded`: a skill read, with `via`, `skill`, `uri` and `cleared`.
- `generation`, `lint`, `summary`, `end`, `commit`, `body-console`, `job`, `gitignore`, `rules-notice`, `rules-cleared`: model generation metadata, end-of-run lint, summary, end, git commit, console output, background job, ignore-file change, rules violation notice and rules reset.

Counts per kind for the two largest logs:

- `2026-11-06-05-43-51-e97a35` (5770 records): `code-call` 4224, `action` 932, `result` 555, `skill-loaded` 39, `generation` 11, `start` 1, `tools` 1, `mcp-server` 1, `gitignore` 1, `mcp-tool-skipped` 1, `task` 1, `lint` 1, `summary` 1, `end` 1. The record counts add up to 5770.
- `2026-11-07-06-03-08-3d5d92` (1111 records): `code-call` 510, `action` 423, `result` 141, `skill-loaded` 7, `generation` 11, `task` 5, `job` 4, `body-console` 2, `mcp-server` 2, `start` 1, `tools` 1, `mcp-tool-skipped` 1, `lint` 1, `summary` 1, `end` 1. The record counts add up to 1111.

The first record's `t` matches the start column. Last record times for the first five runs were: e97a35 06:52:43, fc9a84 08:17:09, 12e02e 09:08:46, 3c6b29 12:00:04, 3d5d92 12:12:49 (all UTC). The largest log is `2026-11-06-05-43-51-e97a35` (10915575 bytes); the second largest is `2026-11-07-06-03-08-3d5d92` (10318288 bytes).

### Run table

All 31 run directories from `ls /workspace/savi/runs` are listed. Start is the folder timestamp (UTC). Lines and bytes are for `log.jsonl`. "Files" lists the files in the folder other than the directory itself. Successor shows the name of the next run when a `successor` file exists.

| Run directory | Start (UTC) | Files present | log.jsonl lines | log.jsonl bytes | Task summary | Successor | Jobs |
|---|---|---|---|---|---|---|---|
| 2026-11-06-05-43-51-e97a35 | 2026-11-06 05:43:51 | log.index, log.jsonl, rules.md, successor, task.json | 5770 | 10915575 | Empty task; first run in the chain, continued by fc9a84 | 2026-11-06-06-57-19-fc9a84 | no |
| 2026-11-06-06-57-19-fc9a84 | 2026-11-06 06:57:19 | log.index, log.jsonl, rules.md, task.json | 31 | 35219 | Publish the cleetus repository as a brutalist manual that shows all information and updates on every push | none | no |
| 2026-11-06-08-17-25-12e02e | 2026-11-06 08:17:25 | log.index, log.jsonl, rules.md, task.json | 6 | 1107 | Empty task; start, MCP connection and pause only | none | no |
| 2026-11-06-09-08-46-3c6b29 | 2026-11-06 09:08:46 | log.index, log.jsonl, rules.md, task.json | 36 | 45595 | Empty task; rules notice recorded | none | no |
| 2026-11-07-06-03-08-3d5d92 | 2026-11-07 06:03:08 | jobs, log.index, log.jsonl, rules.md, successor, task.json | 1111 | 10318288 | Empty task; runs CI watch and a body fetch as jobs | 2026-11-07-08-24-53-945aa4 | yes |
| 2026-11-07-08-24-53-945aa4 | 2026-11-07 08:24:53 | log.index, log.jsonl, rules.md, successor, task.json | 64 | 27509 | Batch of one approved caveat-line edit to the audit records, then commit, push and report | 2026-11-07-08-34-59-4c3432 | no |
| 2026-11-07-08-34-59-4c3432 | 2026-11-07 08:34:59 | log.index, log.jsonl, pending.jsonl, rules.md, successor, task.json | 41 | 17239 | Standby read-only status check; report ranked remaining work | 2026-11-07-08-45-16-a543aa | no |
| 2026-11-07-08-45-16-a543aa | 2026-11-07 08:45:16 | log.index, log.jsonl, rules.md, successor, task.json | 36 | 16323 | Standby read-only status check; report ranked remaining work | 2026-11-07-08-55-25-a27011 | no |
| 2026-11-07-08-55-25-a27011 | 2026-11-07 08:55:25 | log.index, log.jsonl, rules.md, task.json | 393 | 266405 | Standby read-only status check; report ranked remaining work | none | no |
| 2026-11-07-12-12-49-a258c8 | 2026-11-07 12:12:49 | log.index, log.jsonl, rules.md, task.json | 160 | 656005 | Empty task | none | no |
| 2026-11-07-15-12-11-64f213 | 2026-11-07 15:12:11 | log.index, log.jsonl, rules.md, task.json | 6 | 1104 | Empty task; start, MCP connection and pause only | none | no |
| 2026-11-07-15-19-43-e7f4e8 | 2026-11-07 15:19:43 | log.index, log.jsonl, rules.md, task.json | 6 | 1103 | Empty task; start, MCP connection and pause only | none | no |
| 2026-11-07-15-20-14-80773c | 2026-11-07 15:20:14 | log.index, log.jsonl, rules.md, task.json | 6 | 1103 | Empty task; start, MCP connection and pause only | none | no |
| 2026-11-07-15-21-00-7148aa | 2026-11-07 15:21:00 | log.index, log.jsonl, rules.md, successor, task.json | 25 | 12042 | Empty task; continued by 41cc4e | 2026-11-07-15-31-42-41cc4e | no |
| 2026-11-07-15-31-42-41cc4e | 2026-11-07 15:31:42 | log.index, log.jsonl, pending.jsonl, rules.md, successor, task.json | 14 | 5442 | Find and report the cleetus featureset, engine README and site items, with exact paths | 2026-11-07-15-39-47-c428f4 | no |
| 2026-11-07-15-39-47-c428f4 | 2026-11-07 15:39:47 | log.index, log.jsonl, rules.md, task.json | 119 | 69164 | Fold the parity-inputs featureset and stream content into cleetus, verify paths, update OPEN-018, validate, commit and push | none | no |
| 2026-11-07-19-07-05-11628f | 2026-11-07 19:07:05 | log.index, log.jsonl, rules.md, task.json | 6 | 1104 | Empty task; start, MCP connection and pause only | none | no |
| 2026-11-07-19-58-01-a2fb7a | 2026-11-07 19:58:01 | log.index, log.jsonl, rules.md, task.json | 6 | 1107 | Empty task; start, MCP connection and pause only | none | no |
| 2026-11-08-04-29-41-ca9cdb | 2026-11-08 04:29:41 | log.index, log.jsonl, rules.md, task.json | 6 | 1106 | Empty task; start, MCP connection and pause only | none | no |
| 2026-11-08-07-11-24-a34870 | 2026-11-08 07:11:24 | log.index, log.jsonl, rules.md, task.json | 5 | 800 | Empty task; MCP connection error and pause | none | no |
| 2026-11-08-08-22-10-17dd0f | 2026-11-08 08:22:10 | log.index, log.jsonl, rules.md, task.json | 6 | 1108 | Empty task; start, MCP connection and pause only | none | no |
| 2026-11-08-10-30-27-d699ee | 2026-11-08 10:30:27 | log.index, log.jsonl, rules.md, task.json | 4 | 689 | Empty task; MCP tool skipped | none | no |
| 2026-11-08-13-37-30-594b0d | 2026-11-08 13:37:30 | log.index, log.jsonl, rules.md, successor, task.json | 195 | 205562 | Empty task; commit recorded; continued by e687da | 2026-11-08-13-48-53-e687da | no |
| 2026-11-08-13-48-53-e687da | 2026-11-08 13:48:53 | log.index, log.jsonl, rules.md, successor, task.json | 81 | 64997 | Close OPEN-023 items 3 and 5 in the cleetus OPEN-ITEMS file: regenerate the CLI help texts and the API reference, record the hash, witness | 2026-11-08-14-00-23-941256 | no |
| 2026-11-08-14-00-23-941256 | 2026-11-08 14:00:23 | log.index, log.jsonl, rules.md, successor, task.json | 22 | 9717 | Separate the release pin from the API reference hash in the engine pin and index, update the pin script, run checks, commit | 2026-11-08-14-07-37-d1cabc | no |
| 2026-11-08-14-07-37-d1cabc | 2026-11-08 14:07:37 | log.index, log.jsonl, rules.md, successor, task.json | 58 | 40387 | Cancel a stuck upstream git prompt, make one anonymous ls-remote attempt with a timeout, report | 2026-11-08-14-11-00-c97658 | no |
| 2026-11-08-14-11-00-c97658 | 2026-11-08 14:11:00 | log.index, log.jsonl, rules.md, successor, task.json | 95 | 90634 | Close the release-commit check as out of scope in the cleetus OPEN-ITEMS file, keep the item 5 result, run checks, commit | 2026-11-08-14-17-51-7cab4a | no |
| 2026-11-08-14-17-51-7cab4a | 2026-11-08 14:17:51 | log.index, log.jsonl, rules.md, successor, task.json | 38 | 33765 | Same release-commit close-out as c97658 | 2026-11-08-14-42-34-92fc47 | no |
| 2026-11-08-14-42-34-92fc47 | 2026-11-08 14:42:34 | log.index, log.jsonl, rules.md, task.json | 110 | 97589 | Same release-commit close-out as c97658; last run in the chain | none | no |
| 2026-11-11-17-05-27-7661b8 | 2026-11-11 17:05:27 | log.index, log.jsonl, owner, rules.md, task.json | 8 | 1508 | Empty task; playwriter MCP connected, restart recorded | none | no |
| 2026-11-11-18-52-18-7df595 | 2026-11-11 18:52:18 | log.index, log.jsonl, owner, rules.md, task.json | 3 | 512 | Empty task; one MCP tool skipped | none | no |

Notes on the table:

- The `2026-11-07-08-24-53-945aa4` task text was verified in `task.json`; the stated batch plan says zero open rows and one approved edit, nothing else.
- The 2026-11-08 run chain from `594b0d` through `92fc47` covers one piece of work split across sessions. Each run's `task` either repeats the previous text or was passed through `task` records with `from` set to the closed run.
- The count of runs with `task` empty is 18.

## Decisions

- Each run is a separate MCP session with its own folder. A run that cannot finish in its step budget hands off through `successor` to a new run that receives the remaining task.
- The chain of successors is: e97a35 to fc9a84; 3d5d92 to 945aa4 to 4c3432 to a543aa to a27011 (end of that chain); 7148aa to 41cc4e to c428f4 (end of that chain); 594b0d to e687da to 941256 to d1cabc to c97658 to 7cab4a to 92fc47 (end of that chain). Thirteen successor files exist in total.
- The step budget is 50 for every run except `2026-11-06-06-57-19-fc9a84`, which has 5.
- Witness rule: every `task.json` requires a witness string before finish.
- Runs that were opened only to be paused or restarted (for example the 6-record runs) have no task and no successor. They record the MCP connection state and stop.

## Open gaps

- `log.index` is binary and its record layout was not decoded. Source: `/workspace/savi/runs/2026-11-06-05-43-51-e97a35/log.index` (old name: savi) and every other `log.index` under `/workspace/savi/runs/` (old name: savi).
- The meaning of the 6-hex suffix is not recorded in the sources. Its generation was not reproduced. Source: the directory names under `/workspace/savi/runs/` (old name: savi).
- The `owner` file format (`pid:value`) is not documented. Sources: `/workspace/savi/runs/2026-11-11-17-05-27-7661b8/owner` (old name: savi) and `/workspace/savi/runs/2026-11-11-18-52-18-7df595/owner` (old name: savi).
- The purpose of `pending.jsonl` is inferred from one record type (`rules-notice`). Sources: `/workspace/savi/runs/2026-11-07-08-34-59-4c3432/pending.jsonl` (old name: savi) and `/workspace/savi/runs/2026-11-07-15-31-42-41cc4e/pending.jsonl` (old name: savi).
- Eighteen runs have an empty `task` in `task.json`, so their purpose is known only from their log. Source: `task.json` in each such run under `/workspace/savi/runs/` (old name: savi).
- The standby chain (`4c3432`, `a543aa`, `a27011`) ends at `a27011` with no successor file, and the reason it stopped is not recorded. Source: `/workspace/savi/runs/2026-11-07-08-55-25-a27011/` (old name: savi).
- The CI job output for `2026-11-07-06-03-08-3d5d92` records a run identifier and job results, but the job's purpose beyond the recorded lines is not described. Source: `/workspace/savi/runs/2026-11-07-06-03-08-3d5d92/jobs/ci-watch.out` (old name: savi).

## Sources

- /workspace/savi/runs/ (old name: savi)
- /workspace/savi/runs/2026-11-06-05-43-51-e97a35/task.json (old name: savi)
- /workspace/savi/runs/2026-11-06-05-43-51-e97a35/rules.md (old name: savi)
- /workspace/savi/runs/2026-11-06-05-43-51-e97a35/log.jsonl (old name: savi)
- /workspace/savi/runs/2026-11-06-05-43-51-e97a35/log.index (old name: savi)
- /workspace/savi/runs/2026-11-06-05-43-51-e97a35/successor (old name: savi)
- /workspace/savi/runs/2026-11-06-06-57-19-fc9a84/task.json (old name: savi)
- /workspace/savi/runs/2026-11-07-06-03-08-3d5d92/jobs/ci-watch.json (old name: savi)
- /workspace/savi/runs/2026-11-07-06-03-08-3d5d92/jobs/ci-watch.out (old name: savi)
- /workspace/savi/runs/2026-11-07-06-03-08-3d5d92/jobs/body-455.json (old name: savi)
- /workspace/savi/runs/2026-11-07-08-34-59-4c3432/pending.jsonl (old name: savi)
- /workspace/savi/runs/2026-11-07-15-31-42-41cc4e/pending.jsonl (old name: savi)
- /workspace/savi/runs/2026-11-11-17-05-27-7661b8/owner (old name: savi)
- /workspace/savi/runs/2026-11-11-18-52-18-7df595/owner (old name: savi)
- /workspace/savi/runs/2026-11-08-14-42-34-92fc47/task.json (old name: savi)
