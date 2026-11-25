const fs = require('fs'); const cp = require('child_process');
const B = '/workspace/bevy';
const rows = fs.readFileSync('/workspace/extra/docs/bevy-gaps/missing-recheck-2026-11-23.tsv', 'utf8').trim().split('\n').slice(1).map(l => l.split('\t'));
const sh = (c) => { try { return cp.execSync(c, { cwd: B, encoding: 'utf8', maxBuffer: 1 << 26 }); } catch (e) { return e.stdout || ''; } };
const count = (ref, t) => sh('git grep -c -i -w -e ' + JSON.stringify(t) + ' ' + ref + ' -- src').split('\n').filter(Boolean).reduce((a, l) => a + (+l.split(':').pop() || 0), 0);
const claims = [];
for (const c of rows) { const ev = (c[5] || '') + ' | ' + (c[10] || ''); for (const m of ev.matchAll(/absent: searched ([^;()\n]+?)(?: in |\(|;|$)/g)) { const terms = m[1].split(/,| or | and /).map(t => t.trim().replace(/[`'"]/g, '')).filter(t => /^[A-Za-z_][A-Za-z0-9_.]{2,}$/.test(t)); for (const t of terms) claims.push({ id: c[0], status: c[9], term: t }); } }
const uniq = [...new Map(claims.map(x => [x.id + '|' + x.term, x])).values()];
const EXCEPTIONS = { 'gap-248|triangles': 'the new match is the cave volume test assertion (src/cave_sdf.rs:462, row 227 closure); it is not a viewer stats field' };
const bad = []; const accepted = [];
for (const x of uniq) { const before = count('03e48e2', x.term), now = count('origin/main', x.term); if (now > before && now > 0) { const key = x.id + '|' + x.term; if (EXCEPTIONS[key]) accepted.push(key); else bad.push(x.id + ' ' + x.term + ' ' + before + '->' + now); } }
for (const t of ['gpuMs', 'drawCalls']) if (count('origin/main', t) !== 0) bad.push('gap-248 term present now: ' + t);
console.log(JSON.stringify({ origin: sh('git rev-parse --short origin/main').trim(), absenceClaims: uniq.length, acceptedExceptions: accepted, bad }, null, 1));
if (bad.length || rows.length !== 269) process.exit(1);
