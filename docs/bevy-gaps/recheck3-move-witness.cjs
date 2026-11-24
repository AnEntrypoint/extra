const fs = require('fs'); const cp = require('child_process');
const B = '/workspace/bevy';
const old = cp.execSync('git -C /workspace/extra show c8a0097:docs/bevy-gaps/missing-recheck-2026-11-23.tsv', { encoding: 'utf8', maxBuffer: 1 << 26 }).trim().split('\n').slice(1).map(l => l.split('\t'));
const now = fs.readFileSync('/workspace/extra/docs/bevy-gaps/missing-recheck-2026-11-23.tsv', 'utf8').trim().split('\n').slice(1).map(l => l.split('\t'));
const at = (ref, f) => cp.execSync('git show ' + ref + ':' + f, { cwd: B, encoding: 'utf8', maxBuffer: 1 << 26 }).split('\n');
const re = /(src\/[A-Za-z0-9_\/.-]+\.(?:rs|js|cjs|mjs|sh|py|tsv|md|wgsl|toml)):(\d+)/g;
const cites = (s) => { const out = []; let m; re.lastIndex = 0; while ((m = re.exec(s || '')) !== null) out.push([m[1], +m[2]]); return out; };
let checked = 0, bad = [], moved = 0, rowsChanged = 0;
const REFERENT_ROWS = ['gap-009', 'gap-012', 'gap-125', 'gap-130', 'gap-207', 'gap-215', 'gap-242', 'gap-251'];
const changedFiles = new Set(cp.execSync('git diff --name-only c394fb9 03e48e2', { cwd: B, encoding: 'utf8' }).split('\n').filter(Boolean));
for (let i = 0; i < old.length; i++) {
  if (REFERENT_ROWS.includes(old[i][0])) continue;
  if (old[i][0] !== now[i][0]) { bad.push('id order ' + i); continue; }
  const oc = cites(old[i][10]), nc = cites(now[i][10]);
  if (oc.length !== nc.length) { bad.push(old[i][0] + ' cite count'); continue; }
  if (old[i][10] !== now[i][10]) rowsChanged++;
  for (let k = 0; k < oc.length; k++) {
    if (oc[k][0] === nc[k][0] && oc[k][1] === nc[k][1]) continue;
    moved++;
    if (!changedFiles.has(oc[k][0])) { if (REFERENT_ROWS.includes(old[i][0])) continue; bad.push(old[i][0] + ' moved in unchanged file ' + oc[k][0]); continue; }
    const a = at('c394fb9', oc[k][0]), b = at('03e48e2', nc[k][0]);
    const ta = (a[oc[k][1] - 1] || '').trim(), tb = (b[nc[k][1] - 1] || '').trim();
    checked++;
    if (ta !== tb || ta === '') bad.push(old[i][0] + ' ' + oc[k].join(':') + ' -> ' + nc[k].join(':') + ' text differs');
  }
}
console.log(JSON.stringify({ rows: now.length, rowsChanged, citesMoved: moved, movedTextChecked: checked, bad }, null, 1));
if (bad.length || now.length !== 269 || now.some(c => c.length !== 16)) process.exit(1);
