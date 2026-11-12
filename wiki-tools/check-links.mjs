import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';

const ROOT = process.argv[2] ?? '/workspace/extra/wiki-site';

function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) out.push(...walk(p));
    else if (name.endsWith('.html')) out.push(p);
  }
  return out;
}

const files = walk(ROOT);
const ids = new Map();
for (const f of files) {
  const html = readFileSync(f, 'utf8');
  const set = new Set();
  for (const m of html.matchAll(/\sid="([^"]+)"/g)) set.add(m[1]);
  ids.set(resolve(f), set);
}

const broken = [];
let checked = 0;
for (const f of files) {
  const html = readFileSync(f, 'utf8');
  for (const m of html.matchAll(/\s(?:href|src)="([^"]*)"/g)) {
    const raw = m[1].replace(/&amp;/g, '&');
    if (raw === '' || /^(https?:|mailto:|data:)/.test(raw)) continue;
    checked++;
    const [pathPart, anchor] = raw.split('#');
    const target = pathPart === '' ? resolve(f) : resolve(dirname(f), decodeURI(pathPart));
    if (!existsSync(target) || !statSync(target).isFile()) {
      broken.push(`${f} -> ${raw} (missing file)`);
      continue;
    }
    if (anchor !== undefined && anchor !== '' && target.endsWith('.html')) {
      const set = ids.get(target);
      if (!set || !set.has(anchor)) broken.push(`${f} -> ${raw} (missing anchor)`);
    }
  }
}

console.log(`pages: ${files.length}  internal links checked: ${checked}  broken: ${broken.length}`);
for (const b of broken) console.log(b);
process.exitCode = broken.length === 0 ? 0 : 1;
