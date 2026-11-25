const fs = require('fs');
const path = require('path');
const cp = require('child_process');

const EX = path.resolve(__dirname, '..');
const MANIFEST = path.join(EX, 'scripts', 'witness-manifest.tsv');
const PATTERN = /-(witness|verify)\.cjs$/;
const CONCURRENCY = 4;
const TIMEOUT_MS = 600000;

function parseManifest(text) {
  return text.split('\n').slice(1).map((raw, i) => ({ line: i + 2, raw })).filter(r => r.raw.trim() !== '').map(({ line, raw }) => { const [file, expected, scope] = raw.split('\t'); return { line, file, expected: Number(expected), scope: scope || '' }; });
}

function discover(files) {
  return files.filter(f => PATTERN.test(f)).sort();
}

function runOne(abs) {
  return new Promise(resolve => {
    const started = Date.now();
    const child = cp.spawn(process.execPath, [abs], { cwd: EX, env: process.env });
    let out = '';
    child.stdout.on('data', d => { out += d; });
    child.stderr.on('data', d => { out += d; });
    const timer = setTimeout(() => child.kill('SIGKILL'), TIMEOUT_MS);
    child.on('close', code => { clearTimeout(timer); resolve({ code, ms: Date.now() - started, tail: out.slice(-300) }); });
  });
}

async function pool(items, n, fn) {
  const out = [];
  let next = 0;
  const worker = async () => { while (next < items.length) { const i = next++; out[i] = await fn(items[i]); } };
  await Promise.all(Array.from({ length: Math.min(n, items.length) }, worker));
  return out;
}

const isUnsafe = file => path.isAbsolute(file) || file.split('/').includes('..');

async function evaluate({ rows, discovered, runFile }) {
  const failures = [];
  const seen = new Set();
  for (const row of rows) {
    if (seen.has(row.file)) failures.push('duplicate manifest entry ' + row.file);
    seen.add(row.file);
    if (isUnsafe(row.file)) failures.push('unsafe manifest path ' + row.file);
  }
  const known = new Set(discovered);
  for (const f of discovered) if (!seen.has(f)) failures.push('unregistered witness ' + f);
  for (const row of rows) if (!known.has(row.file)) failures.push('registered witness missing ' + row.file);
  const runnable = rows.filter(row => known.has(row.file) && !isUnsafe(row.file));
  const results = await pool(runnable, CONCURRENCY, async row => { const res = await runFile(row.file); return { file: row.file, expected: row.expected, code: res.code, ms: res.ms, tail: res.tail, pass: res.code === row.expected }; });
  for (const res of results) if (!res.pass) failures.push('exit ' + res.code + ' expected ' + res.expected + ' ' + res.file);
  return { results, failures };
}

async function selfTest() {
  const root = '/workspace/tmp/extra/runner-selftest';
  fs.mkdirSync(root, { recursive: true });
  fs.writeFileSync(root + '/green.cjs', 'process.exit(0);\n');
  fs.writeFileSync(root + '/red.cjs', 'process.exit(1);\n');
  const runFile = f => runOne(path.join(root, f));
  const row = (file, expected) => ({ file, expected });
  const cases = [
    { name: 'green expected 0 passes', rows: [row('green.cjs', 0)], discovered: ['green.cjs'], wantFail: false },
    { name: 'red expected 0 fails on exit code', rows: [row('red.cjs', 0)], discovered: ['red.cjs'], wantFail: true },
    { name: 'green expected 1 fails on exit code', rows: [row('green.cjs', 1)], discovered: ['green.cjs'], wantFail: true },
    { name: 'unregistered witness fails', rows: [row('green.cjs', 0)], discovered: ['green.cjs', 'red.cjs'], wantFail: true },
    { name: 'registered but missing witness fails', rows: [row('green.cjs', 0), row('gone.cjs', 0)], discovered: ['green.cjs'], wantFail: true },
    { name: 'parent path fails', rows: [row('../green.cjs', 0)], discovered: ['../green.cjs'], wantFail: true },
    { name: 'duplicate manifest entry fails', rows: [row('green.cjs', 0), row('green.cjs', 0)], discovered: ['green.cjs'], wantFail: true },
  ];
  const outcomes = [];
  for (const c of cases) { const res = await evaluate({ rows: c.rows, discovered: c.discovered, runFile }); const failed = res.failures.length > 0; outcomes.push({ name: c.name, failed, ok: failed === c.wantFail, failures: res.failures }); }
  return outcomes;
}

async function main() {
  const self = await selfTest();
  const files = cp.execSync('git ls-files --cached --others --exclude-standard', { cwd: EX, encoding: 'utf8' }).split('\n').filter(Boolean);
  const rows = parseManifest(fs.readFileSync(MANIFEST, 'utf8'));
  const real = await evaluate({ rows, discovered: discover(files), runFile: f => runOne(path.join(EX, f)) });
  const selfOk = self.every(o => o.ok);
  console.log(JSON.stringify({ selfTest: self.map(o => ({ name: o.name, ok: o.ok, failures: o.failures })), selfOk, witnesses: real.results.map(r => ({ file: r.file, expected: r.expected, code: r.code, pass: r.pass, ms: r.ms })), failures: real.failures }, null, 1));
  process.exit(selfOk && real.failures.length === 0 ? 0 : 1);
}

main().catch(e => { console.error(e.stack || String(e)); process.exit(1); });
