# Runs overview

## How it works

The runs folder holds 138 run directories under /workspace/spawn/runs (old name: spawn). Each directory is one bounded agent session. The directory holds 772 files in total, read from the disk as listed below. The task text, the step log and the result of each session are kept in the folder, so a run can be read without the session that produced it.

Folder naming. A run folder is named <YYYY-MM-DD>-<HH>-<MM>-<SS>-<6 hex characters>, for example 2026-11-05-11-42-39-43bdec. The date and time are the run's creation time in UTC, and the same value is stored as createdAt in task.json. Three folders do not follow the pattern: 2703944-18033865, 2749708-18562434 and 65786-694246. Their createdAt values are 2026-11-04T16:21:01Z, 2026-11-04T17:49:06Z and 2026-11-04T20:37:35Z. The hex suffix is the same kind of identifier, but the date prefix is missing, so their order is taken from createdAt.

Run chains. A run that is closed hands over to a new run. The closed run's successor file names the next run, and the next run's start event records where its task came from: "session prompt" for a new user request, or "closed run <id>" for a continuation. 111 run folders carry a successor file. The chain runs through the 2026-11-04 to 2026-11-07 period.

Files in each run folder.

| File | Count | Type | Content |
|---|---|---|---|
| task.json | 138 | JSON object | Run settings (schema below) |
| rules.md | 138 | Markdown | The same seven rules in every run (663 bytes, one identical copy) |
| log.jsonl | 138 | JSON Lines | The ordered event log of the run (schema below) |
| log.index | 138 | Binary | Index over the lines of log.jsonl (layout below) |
| successor | 111 | Plain text | The run id of the next run, with no newline (26 bytes) |
| pending.jsonl | 17 | JSON Lines | Events that were still pending when the run was recorded |
| jobs/*.json | 47 | JSON object | Specification and state of a background job started by the run |
| jobs/*.out | 45 | Text | Captured output of a background job |

Schema of task.json. Keys: id (the folder name), mode (always "mcp"), task (empty in 29 runs, otherwise the task text), witness (always the same instruction: finish only with one string that states the evidence), workspace (always /workspace/spawn (old name: spawn)), maxSteps (always 50), maxInflight (always 8), createdAt (ISO 8601 with milliseconds, UTC).

Schema of rules.md. Seven numbered rules: paths inside or outside the workspace, next_context at the start of each step, verify before finishing, finish needs a witness, events older than the window are read with query_log, never print secrets, and a run that cannot finish states why with evidence.

Schema of log.jsonl. Every line is one JSON object with the fields seq (a counter from 1), t (ISO time with milliseconds), mono (monotonic seconds since the host started), inFlight (the number of actions in progress), and kind. Other fields depend on kind. The counts below are over all 138 logs.

| kind | Count | Extra fields |
|---|---|---|
| code-call | 3862 | step, tool, startMono, ok, args, output, outputChars, outputDigest, durMs, exitCode, signal, error, actionSeq |
| action | 3064 | step, tool, args, rpcId, caller, body |
| result | 1435 | step, tool, actionSeq, startMono, ok, output, outputChars, outputDigest, durMs, prefixSha, total, background, job, state, role, progress, error, truncated |
| generation | 190 | step, generation |
| task | 189 | from, text |
| tools | 150 | sha (hash of the tool list), count |
| start | 138 | mode, maxSteps, maxInflight, taskFrom |
| summary | 118 | maxInFlight, meanInFlight, modelMs, toolMs, idleMs, contextCalls |
| lint | 118 | pages, problems |
| end | 118 | status, steps, witness, gaps |
| skill-loaded | 116 | skill, via, cleared, uri |
| job | 94 | job, state, pid, exitCode, signal, startMono, durMs, body, truncated, reason |
| mcp-server | 71 | server, state, tools, protocolVersion, error, stderr, reason |
| mcp-tool-skipped | 48 | server, tool, verb, reason |
| gitignore | 48 | server, state, ignore, reason |
| job-killed | 25 | job, reason, tail |
| paused | 17 | reason |
| restart | 12 | reason |
| tools-changed | 9 | old, new |
| rules-notice | 8 | rule, evidence, step |
| refusal | 8 | step, tool, error, actionSeq, startMono, durMs |
| host-idle | 3 | idleMs |
| rules-cleared | 3 | rules, step |
| recovery | 2 | lastSeq, open |
| abandoned | 2 | actionSeq, tool, reason |
| job-stuck | 1 | job, sinceProgressMs |
| error | 1 | method, code, message |

Tool use in the action events: run_shell 1256, run_code 999, next_context 260, write_file 239, finish 118, child_context 69, playwriter_execute 50, job_start 45, job_stop 15, playwriter_browsers 9, fetch 4. A code-call event is the completion of one call made from run_code, and a result event is the answer returned to the caller for one action.

Schema of pending.jsonl. Each line has id and seq (the event sequence number), t, mono, inFlight, and kind. The 17 files contain 36 job events, 10 job-killed events, 7 rules-notice events and 1 recovery event.

Schema of the job files. A job JSON object has job (name), command (the shell command), state (running, exited or other), pid, startMono, output (path of the .out file), timeoutMs, exitCode and signal. The .out file holds the raw captured output of the command. 22 run folders contain a jobs directory.

Schema of log.index. The index is binary and holds little-endian 64-bit words. The first record is a pair of words (0, length of line 1), and the next records alternate a float64 value with the byte length of the next line. Byte offsets of the lines are the running sum of these lengths; for example run 2026-11-05-11-42-39-43bdec has 39 lines and 78 words. The float64 words were not decoded further.

Run status. 118 runs have an end event with status "finished". 20 runs have no end event; the last event in those logs is a stopped MCP server, a paused supervisor, a job killed at run end, or an unfinished action. Each refusal event shows that a closed run cannot take more calls ("refused: run <id> has ended; call next_context to open a new run").

## Decisions

Runs finish only with a witness. The rules file and the task settings require a witness string on finish (rules.md rules 3 and 4; task.json witness). Every finished run carries an end event whose witness quotes command output, so each outcome can be checked against the log. Evidence: task.json and rules.md in any run folder, for example /workspace/spawn/runs/2026-11-05-11-42-39-43bdec (old name: spawn).

A run is closed at a limit, not kept open. Each run's maxSteps is 50 and maxInflight is 8. A closed run refuses new calls and a continuation run is opened from the successor chain. Evidence: refusal events in 2026-11-05-11-42-39-43bdec, 2026-11-05-11-57-26-592b7f and 2026-11-07-10-29-34-65fd6f, and the successor files.

Each run folder is the single source for its own record. Output that is too large is written to a job file, not to the event log, so the .out files and the logs together give the full record. Evidence: job events and the jobs directories, for example 2026-11-05-11-38-30-87b1e7.

Continuations take the parent task by reference. A continuation's start event names the closed run it came from (taskFrom "closed run <id>"), so the chain can be followed. Evidence: start events in 2026-11-04-17-25-58-a95c9b and later.

## Open gaps

- 20 run folders have no end event and so no finished witness: 2026-11-05-06-58-25-6b9460, 2026-11-05-10-26-24-a5f31e, 2026-11-05-13-29-54-d28f33, 2026-11-05-13-30-29-28796a, 2026-11-05-14-12-01-e87823, 2026-11-05-14-22-29-0298e7, 2026-11-05-14-31-36-7e3ce4, 2026-11-05-15-24-55-4f2e2c, 2026-11-05-15-25-01-0dcb90, 2026-11-06-05-07-44-9c31cc, 2026-11-06-09-05-33-107f30, 2026-11-06-09-05-56-56196d, 2026-11-06-12-23-54-ade8e7, 2026-11-06-12-24-03-0875da, 2026-11-06-13-38-26-709b2c, 2026-11-06-13-38-49-51c3ae, 2026-11-06-13-38-57-4afae0, 2026-11-06-14-05-48-3c5ab3, 2026-11-07-05-12-23-7fdba4, 2026-11-07-16-49-56-bcd0db.
- Three run folders have no date prefix (2703944-18033865, 2749708-18562434, 65786-694246). Their order is inferred from createdAt.
- 29 task.json files have an empty task, so their purpose is only visible from the start event and the task events.
- log.index is a binary index whose float64 words were not decoded.
- The pending.jsonl files record events that were not finished, so their final state is unknown.

## Sources

- /workspace/spawn/runs/ (old name: spawn), all 138 run folders
- /workspace/spawn/runs/<run id>/task.json (old name: spawn), 138 files
- /workspace/spawn/runs/<run id>/rules.md (old name: spawn), 138 files
- /workspace/spawn/runs/<run id>/log.jsonl (old name: spawn), 138 files
- /workspace/spawn/runs/<run id>/log.index (old name: spawn), 138 files
- /workspace/spawn/runs/<run id>/successor (old name: spawn), 111 files
- /workspace/spawn/runs/<run id>/pending.jsonl (old name: spawn), 17 files
- /workspace/spawn/runs/<run id>/jobs/ (old name: spawn), 22 folders with 47 JSON and 45 output files

Read method: task.json, rules.md, successor and the job files were read directly. The log.jsonl files (about 3.3 MB in total, largest 3.2 MB) were parsed by script to count event kinds and fields, and their end, task and failure events were read in full.

See also: [runs-timeline.md](runs-timeline.md), [runs-findings.md](runs-findings.md), [runs-open-gaps.md](runs-open-gaps.md), [sources-overview.md](sources-overview.md).
