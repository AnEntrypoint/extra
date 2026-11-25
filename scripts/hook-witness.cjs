const fs = require('fs');
const cp = require('child_process');
const path = require('path');
const ROOT = '/workspace/extra';
const bad = [];
const hook = path.join(ROOT, '.githooks/pre-push');
const mode = cp.execSync('git ls-files -s -- .githooks/pre-push', { cwd: ROOT, encoding: 'utf8' }).split(' ')[0];
if (mode !== '100755') bad.push('pre-push mode is ' + mode + ', expected 100755');
const body = fs.readFileSync(hook, 'utf8');
if (!body.startsWith('#!/bin/sh\n')) bad.push('no shell shebang');
if (!body.includes('scripts/run-witnesses.cjs')) bad.push('hook does not run the runner');
let hp = '';
try { hp = cp.execSync('git config --get core.hooksPath', { cwd: ROOT, encoding: 'utf8' }).trim(); } catch (e) { hp = ''; }
if (hp !== '.githooks') bad.push('core.hooksPath is "' + hp + '" in this clone, expected .githooks');
const r = cp.spawnSync(hook, [], { cwd: ROOT, encoding: 'utf8', timeout: 120000, env: Object.assign({}, process.env, { WITNESS_MANIFEST: '/nonexistent/witness-manifest.tsv' }) });
if (r.status === 0) bad.push('hook exited 0 with a missing manifest');
if (!/ENOENT/.test(r.stderr || '')) bad.push('hook did not report the missing manifest: ' + String(r.stderr).slice(0, 160));
console.log(JSON.stringify({ mode, hooksPath: hp, hookExitWithBrokenManifest: r.status, bad }, null, 1));
process.exit(bad.length ? 1 : 0);
