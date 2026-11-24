const fs = require('fs');
const cp = require('child_process');
const path = require('path');
const BV = '/workspace/bevy';
const EX = '/workspace/extra';
const SC = '/workspace/tmp/extra/traversal';
const ROOT = SC + '/world';
const OUT = SC + '/outside.js';
fs.mkdirSync(ROOT + '/scripts', { recursive: true });
fs.writeFileSync(ROOT + '/scripts/a.js', 'IN');
fs.writeFileSync(OUT, 'OUTSIDE');
const rustJoin = (root, p) => (p.startsWith('/') ? p : root + '/' + p);
const normalize = (base, name) => { const parts = base.split('/'); parts.pop(); for (const part of name.split('/')) { if (part === '' || part === '.') continue; if (part === '..') parts.pop(); else parts.push(part); } return parts.join('/'); };
const guardedJoin = (root, p) => { const clean = normalize('', p); if (clean.startsWith('..') || clean.startsWith('/')) return null; return root + '/' + clean; };
const read = (p) => { if (p === null) return null; try { return fs.readFileSync(p, 'utf8'); } catch (e) { return null; } };
const escaped = (text) => text === 'OUTSIDE';
const before = {
  scriptTraversal: escaped(read(rustJoin(ROOT, '../outside.js'))),
  loaderAbsolute: escaped(read(rustJoin(ROOT, OUT))),
  loaderResolvedRelative: escaped(read(rustJoin(ROOT, normalize('scripts/a.js', '../outside.js')))),
};
const after = {
  scriptTraversal: escaped(read(guardedJoin(ROOT, '../outside.js'))),
  loaderAbsolute: escaped(read(guardedJoin(ROOT, OUT))),
  loaderResolvedRelative: escaped(read(guardedJoin(ROOT, normalize('scripts/a.js', '../outside.js')))),
};
const validBefore = read(rustJoin(ROOT, 'scripts/a.js')) === 'IN' && read(rustJoin(ROOT, './scripts/a.js')) === 'IN';
const validAfter = read(guardedJoin(ROOT, 'scripts/a.js')) === 'IN' && read(guardedJoin(ROOT, './scripts/a.js')) === 'IN';
const idx = SC + '/index.witness';
try { fs.unlinkSync(idx); } catch (e) {}
const env = Object.assign({}, process.env, { GIT_INDEX_FILE: idx });
cp.execSync('git read-tree origin/main', { cwd: BV, env });
cp.execSync('git apply --cached ' + EX + '/docs/patches/bevy-path-guard.patch', { cwd: BV, env });
const patchedSrc = cp.execSync('git show :src/script/mod.rs', { cwd: BV, env, encoding: 'utf8', maxBuffer: 1 << 26 });
const originSrc = cp.execSync('git show origin/main:src/script/mod.rs', { cwd: BV, encoding: 'utf8', maxBuffer: 1 << 26 });
const lineOf = (src, n) => src.split('\n')[n - 1] || '';
const sourceRed = lineOf(originSrc, 3227).includes('root.join(script)') && lineOf(originSrc, 3852).includes('root.join(name)');
const sourceGreen = lineOf(patchedSrc, 3227).includes('file_path(script)?') && lineOf(patchedSrc, 3856).includes('root.join(clean)');
const redOk = before.scriptTraversal === true && before.loaderAbsolute === true && before.loaderResolvedRelative === false && sourceRed;
const greenOk = after.scriptTraversal === false && after.loaderAbsolute === false && after.loaderResolvedRelative === false && validBefore && validAfter && sourceGreen;
console.log(JSON.stringify({ before, after, validBefore, validAfter, sourceRed, sourceGreen, redBeforeFix: redOk, greenAfterFix: greenOk }, null, 1));
process.exit(redOk && greenOk ? 0 : 1);
