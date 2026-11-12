# Morluto rea PR 9234 CI findings

## How it works

gaps/morluto-rea-pr-9234-ci-findings.md (old name: savi) is a read-only survey of the public repository morluto/rea for pull request 9234, titled "fix(javascript): keep case-folded loader suffixes unknown". The local checkout was at 99db80a13 on main with a clean tree throughout. Each claim is marked verified (read from a log, a command result or code, with the source cited) or unverified (not run, or not established). The document states its status at the top: the CI failure's cause is confirmed in the cited observations, and the fix passes CI on 32df15f. The rea test output and root-cause interpretation remain open for independent review.

The document is a validation record. Its own caveat says that a facts audit was not run (a retry fork hung through a bounded wait and was stopped without a result). A links, file-list and push-claim audit did pass: zero public URLs, zero markdown links, ten local path references checked, PR diff 4 of 4, head delta 3 of 3, commit, run and job references resolved, zero positive upstream push, ready or re-run claims, and zero Co-Authored-By lines. The words verified, confirmed, resolved and passed in the document record cited observations, not an independently audited pass.

### PR state

- PR 9234 is at head 32df15f1a2621a3fbb513c98833159981684d1fc, OPEN and not a draft (gh pr view). The merge state was BLOCKED while checks were pending and later CLEAN.
- The diff touches four files: src/application/javascript/JavaScriptModuleRelationships.ts, src/domain/javascript/javascriptModuleResolutionMode.ts, src/domain/javascript/javascriptSourceParser.ts and src/domain/javascript/javascriptSourceParserContext.test.ts. Their base blobs match main at 99db80a13, so the diff applies cleanly.
- PR 9230 (fix(desktop): skip directory symlinks during executable lookup, head 4d0ef65b638bf9b02225c5cb5e214360728874ec) is a draft, BLOCKED. Two readiness checks, Validate author declaration and Conventional PR title, were cancelled and not passed. It is not marked ready, and the checks have not been re-run.

### The CI failure at head 86dfb90365d248dbb286117c9e675b50a8897011 (run 42340853942)

The CI required job reported that CI lanes did not pass: test, test-shard and test-source. Two jobs failed on the same root cause:

- Source tests (job 128308633744): src/application/ReferenceSourceImportEntries.test.ts, "resolves declared package mains and index fallback from source-owned fields". The assertion expected the entries to deep-equally contain { from_path: 'main.cts' }. The summary was 1 failed and 1322 passed.
- Test shard 8/8 (job 128308845027): tests/boundary/cli/referenceSourceRuntimeAuthority.test.ts, "preserves owned CommonJS factories through erased TypeScript syntax". The assertion expected a list of one main.cts entry to deeply equal []. The summary was 1 failed, 217 passed and 6 skipped.

### Local reproduction

The environment was Node v24.22.0. rea's package.json requires ^24.22.1 for Node 24, so this was below the floor. Install was npm ci with --ignore-scripts and --engine-strict=false, which added 738 packages. One optional binary was added with npm install --no-save, so the lockfile is unchanged.

- main at 99db80a13, before build: the entries file passed 14 of 14; the CLI boundary file passed 0 of 3, with the message that rea's compiled runtime is missing. This is an environment gap, not a code failure.
- main after npm run build:cached: 17 of 17 pass.
- PR 9234 applied at 32df15f: 44 of 44 pass. This run did not rebuild, so the CLI boundary file used main's build; the rebuilt result is in the later section.
- Full source group, main: 1 file failed and 1322 passed; 2 tests failed and 24520 passed. Both failures were in src/setupEnvironment.test.ts.
- Full source group, PR applied: the same two failures, 24525 passed; five new parser-context cases pass.

The PR tree was reverted with git apply -R, and the checkout was confirmed clean at 99db80a13. On head 32df15f, the two test files that failed in CI pass locally. The CI failure does not reproduce on the current head.

### The setupEnvironment failures

Both tests in src/setupEnvironment.test.ts expect status "planned" and get "needs_human". A probe outside the repository, in /tmp/probe, calls the same setup entry points and returns status needs_human with the remediation "Install Node.js 22.x (>=22.23.4), 24.x (>=24.22.1), or 26.12.1+ and rerun setup." The cause is the local Node version. The setup path returns needs_human for an unsupported Node before it builds the dry-run plan. Rerunning on Node v24.22.1 (official linux-x64 tarball, SHA256 checked against the official SHASUMS256.txt, unpacked in /tmp and put first on PATH for one command, global Node unchanged) gives 14 of 14 passing.

### The cli-boundary case

- CI shard 8/8 did not build. It downloaded the rea-test-runtime artifact from the same run (42340853942, Build package job), and its SHA256 digest matched (790cc74d...b1ae800a). The runtime was neither missing nor stale.
- The CI failure is a parse error: parse_failures for main.cts with the reason that import and export may appear only with sourceType "module" (1:0).
- The earlier pass at 86dfb903 was invalid, because that test runs the compiled CLI (tests/support/cli/cliFixture.js) and the tree had not been rebuilt. Rebuilt at 86dfb903, the test fails with the same parse_failures error. Rebuilt at 32df15f, all three tests pass.

### Head 86dfb903 versus 32df15f

The compare (gh api repos/morluto/rea/compare/86dfb903...32df15f, read-only) adds two commits: 1874f8729 "fix(javascript): keep the module grammar for .cts sources" and 32df15f1a "fix(javascript): keep case-insensitive TypeScript and declaration checks". The diff stat is 3 files changed, 16 insertions and 4 deletions across JavaScriptModuleRelationships.ts (+4 -1), javascriptModuleResolutionMode.ts (+4 -1) and javascriptSourceParser.ts (+8 -2).

The change that matters: in javascriptSourceParser.ts, runtimeSourceTypeForPath used to return commonjs for any path that isCommonJsSourcePath matched, so main.cts was parsed with the CommonJS script grammar. The new code returns commonjs only for an exact .cjs suffix. .cts now keeps module grammar, which TypeScript import x = require() needs. The .cts loader mode still comes from the runtime context.

Neither failing test file is in the diff. Both are unchanged between the heads, so the change affects them only through the parser they call. Rebuilt at 86dfb903, ReferenceSourceImportEntries fails with the same message as CI, and the cli-boundary test fails with the parse error. Both are confirmed, and the .cts grammar change is the cause.

### Full source group under Node v24.22.1

With the same Node binary, after a runtime rebuild each time, the full source group gives: main 99db80a13, 1323 test files passed, 24522 tests passed and 16 skipped, exit 0; PR applied at 32df15f, 1323 files passed, 24527 tests passed and 16 skipped, exit 0. The PR adds five parser-context cases and passes all of them. On Node v24.22.0, main had two failures in setupEnvironment.test.ts, which pass on v24.22.1.

### CI on head 32df15f

Run 42343646562 (workflow CI, pull_request) concluded success. Its jobs: Classify changes, Build package, Source tests, Test shards 1/8 through 8/8, Portable tests and CI required all succeeded. Source-built conformance fixtures were skipped. Other runs on the same head: 42343646499 (PR title) success, 42343643703 (pull_request_target) success, and 42343646532 (CodeQL production) skipped. PR 9234 is OPEN, not a draft, with mergeStateStatus CLEAN at head 32df15f.

The rea checkout was reverted to 99db80a13 and confirmed clean, and the runtime was rebuilt for main afterwards. Nothing was committed or pushed.

## Decisions

- Fix at the parser, not at the tests. The two failing tests are unchanged, and the diff changes only runtimeSourceTypeForPath, so the cause sits in the .cts grammar selection rather than the expectations.
- Keep the .cts module grammar. TypeScript import x = require() needs module grammar, so the .cjs-only commonjs rule is the correct boundary.
- Re-run only after a rebuild. The cli-boundary test runs the compiled CLI, so the earlier 86dfb903 pass was discarded as invalid and the result was re-run after npm run build:cached.
- Treat the setup failures as environmental. The setup check's Node floor (24.22.1) explains the needs_human result, so the test failure is attributed to the local Node version and not to the code.
- Do not act upstream. Marking PR 9230 ready and re-running its cancelled checks is left to the owner, and nothing was pushed or commented on morluto/rea.
- Record the checks as observed. The facts audit did not run, so the words verified and confirmed carry the cited-observation meaning only.

## Open gaps

- Independent review of the rea test output and of the root-cause interpretation is open. The document says this review is needed.
- The facts audit did not run. Its retry fork hung and was stopped without a result.
- Owner decision: marking PR 9230 ready for review and re-running its cancelled readiness checks has not been done.
- The cli-boundary failure at 86dfb903 was not reproduced on the first pass and was confirmed only after a rebuild; the interpretation rests on that rebuilt run.
- The local Node version used for the first runs (v24.22.0) is below rea's required floor; the full results are reported on v24.22.1.
- The rea test output on 32df15f was not interpreted independently; CI run 42343646562 passed.

## Sources

- /workspace/savi/gaps/morluto-rea-pr-9234-ci-findings.md (old name: savi)
- /workspace/savi/docs/FEATURESET.md (old name: savi), which cites morluto/rea; OPEN-ITEMS.md does not list this survey and is not a source for it
- /workspace/savi/docs/PARITY-INPUTS.md (old name: savi), which names this file among the featureset sources
- Repository morluto/rea (public, GitHub), read-only; its local checkout is not a cleetus path
