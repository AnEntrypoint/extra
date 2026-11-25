const fs = require('fs'); const cp = require('child_process');
const bad = [];
const readme = fs.readFileSync('/workspace/extra/docs/bevy-gaps/README.md', 'utf8');
const bevy = (a) => cp.execSync('git ' + a, { cwd: '/workspace/bevy', encoding: 'utf8', maxBuffer: 1 << 26 });
const need = [
  'read through `file_path` (`src/script/mod.rs:3227`)',
  'Bevy b50dbb7 made this change',
  'The loader refuses a leading `..` or an absolute result and then joins the root (`:3852`, `:3856`), as of b50dbb7.',
  'Observation, now resolved',
  'scripted_primitive_does_not_read_a_traversal_outside_the_root',
  'loader_does_not_read_an_absolute_name_outside_the_root',
];
for (const n of need) if (!readme.includes(n)) bad.push('missing wording: ' + n.slice(0, 60));
const stale = ['`root.join(script)` (`src/script/mod.rs:3217`, `:3227`)', 'Observation, not a row: the `script` read at', 'The loader reads `root.join(name)` (`:3852`).'];
for (const s of stale) if (readme.includes(s)) bad.push('stale wording still present: ' + s.slice(0, 60));
const oldLines = bevy('show origin/main:src/script/mod.rs').split('\n');
if (!oldLines[3226].includes('file_path(script)?')) bad.push('3227 does not read file_path at origin/main');
if (!oldLines[3855].includes('root.join(clean)')) bad.push('3856 does not join clean at origin/main');
for (const t of ['scripted_primitive_does_not_read_a_traversal_outside_the_root', 'loader_does_not_read_an_absolute_name_outside_the_root']) if (!bevy('grep -c ' + t + ' origin/main -- src').split('\n').some(l => /:[1-9]/.test(l))) bad.push('test absent at bevy origin: ' + t);
console.log(JSON.stringify({ checks: need.length + stale.length + 4, bad }, null, 1));
if (bad.length) process.exit(1);
