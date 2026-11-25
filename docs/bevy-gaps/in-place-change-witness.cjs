const fs = require('fs'); const cp = require('child_process');
const B = '/workspace/bevy', BASE = '03e48e2', NEW = 'origin/main';
const sh = (c) => cp.execSync(c, { cwd: B, encoding: 'utf8', maxBuffer: 1 << 28 });
const changed = sh('git diff --name-only ' + BASE + ' ' + NEW + ' -- src scripts').split('\n').filter(Boolean);
const rows = fs.readFileSync('/workspace/extra/docs/bevy-gaps/missing-recheck-2026-11-23.tsv', 'utf8').trim().split('\n').slice(1).map(l => l.split('\t'));
const re = /(src\/[A-Za-z0-9_\/.-]+\.(?:rs|js|cjs|mjs|sh|py|tsv|md|wgsl|toml)):(\d+)/g;
const bad = []; let hunks = 0; const enclosing = [];
for (const f of changed) {
  const L = sh('git show ' + NEW + ':' + f).split('\n');
  const d = sh('git diff -U0 ' + BASE + ' ' + NEW + ' -- ' + f);
  const hs = [...d.matchAll(/^@@ -\d+(?:,\d+)? \+(\d+)(?:,(\d+))? @@/gm)].map(m => [+m[1], +m[1] + Math.max(+(m[2] === undefined ? 1 : m[2]), 1) - 1]);
  for (const [a, b] of hs) {
    hunks++;
    let fnStart = null, fnName = null;
    for (let i = a - 1; i >= 0; i--) { const m = L[i] && L[i].match(/^\s{0,4}(?:pub(?:\([^)]*\))?\s+)?(?:async\s+)?fn\s+([A-Za-z_][A-Za-z0-9_]*)/); if (m) { fnStart = i + 1; fnName = m[1]; break; } }
    let fnEnd = L.length; if (fnStart) { const ind = L[fnStart - 1].length - L[fnStart - 1].trimStart().length; for (let i = fnStart; i < L.length; i++) { if (/^\s*\}\s*$/.test(L[i]) && L[i].length - L[i].trimStart().length === ind) { fnEnd = i + 1; break; } } }
    enclosing.push(f + ' ' + (fnName || 'none') + ' ' + (fnStart || '') + '-' + fnEnd);
    for (const c of rows) { let m; re.lastIndex = 0; while ((m = re.exec(c[10] || '')) !== null) { if (m[1] !== f) continue; const n = +m[2]; if (fnStart && n >= fnStart && n <= fnEnd) bad.push(c[0] + ' cites changed fn ' + fnName + ' at ' + f + ':' + n); } }
  }
}
console.log(JSON.stringify({ origin: sh('git rev-parse --short origin/main').trim(), changedFiles: changed.length, hunks, enclosing, bad }, null, 1));
if (bad.length) process.exit(1);
