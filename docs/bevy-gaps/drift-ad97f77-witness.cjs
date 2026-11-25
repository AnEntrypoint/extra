const fs = require('fs'); const cp = require('child_process');
const B = '/workspace/bevy', BASE = '03e48e2';
const T = '/workspace/extra/docs/bevy-gaps/missing-recheck-2026-11-23.tsv';
const before = cp.execSync('git -C /workspace/extra show HEAD:docs/bevy-gaps/missing-recheck-2026-11-23.tsv', { encoding: 'utf8', maxBuffer: 1 << 26 }).trim().split('\n').slice(1).map(l => l.split('\t'));
const now = fs.readFileSync(T, 'utf8').trim().split('\n').slice(1).map(l => l.split('\t'));
const at = (ref, f) => cp.execSync('git show ' + ref + ':' + f, { cwd: B, encoding: 'utf8', maxBuffer: 1 << 26 }).split('\n');
const re = /(src\/[A-Za-z0-9_\/.-]+\.(?:rs|js|cjs|mjs|sh|py|tsv|md|wgsl|toml)):(\d+)/g;
const cites = (s) => { const out = []; let m; re.lastIndex = 0; while ((m = re.exec(s || '')) !== null) out.push([m[1], +m[2]]); return out; };
const bad = []; let pairs = 0; let rowsChanged = 0;
if (before.length !== now.length) bad.push('row count changed');
for (let i = 0; i < before.length; i++) {
  if (before[i][0] !== now[i][0]) { bad.push('id order ' + i); continue; }
  if (before[i].join('\t') !== now[i].join('\t')) rowsChanged++;
  const oc = cites(before[i][10]), nc = cites(now[i][10]);
  if (oc.length !== nc.length) { bad.push(before[i][0] + ' cite count'); continue; }
  for (let k = 0; k < oc.length; k++) {
    if (oc[k][0] === nc[k][0] && oc[k][1] === nc[k][1]) continue;
    pairs++;
    if (oc[k][0] !== nc[k][0]) { bad.push(before[i][0] + ' file changed ' + oc[k].join(':') + ' -> ' + nc[k].join(':')); continue; }
    const a = at(BASE, oc[k][0]), b = at('origin/main', nc[k][0]);
    const ta = (a[oc[k][1] - 1] || '').trim(), tb = (b[nc[k][1] - 1] || '').trim();
    if (!ta || ta !== tb) bad.push(before[i][0] + ' ' + oc[k].join(':') + ' -> ' + nc[k].join(':') + ' text differs');
  }
}
console.log(JSON.stringify({ rows: now.length, rowsChanged, movedPairsChecked: pairs, bad }, null, 1));
if (bad.length || now.length !== 269 || now.some(c => c.length !== 16)) process.exit(1);
