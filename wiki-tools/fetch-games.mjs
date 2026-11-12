import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const run = promisify(execFile);
const DIR = '/workspace/extra/wiki-tools/recapture/games';
const RAW = '/tmp/extra-scratch/html';
const LIVE = 'https://www.spawn.co/@lanmower/game-16@dev';
const UA = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';
const LIMIT = 6;
const pad = (n) => String(n).padStart(3, '0');
const ENT = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' };
const decode = (s) => s.replace(/&(#x[0-9a-f]+|#[0-9]+|[a-z]+);/gi, (m, e) => {
  if (e[0] === '#') {
    const cp = e[1] === 'x' || e[1] === 'X' ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10);
    return Number.isFinite(cp) ? String.fromCodePoint(cp) : m;
  }
  return ENT[e.toLowerCase()] ?? m;
});
const flat = (s) => decode(s).replace(/\s+/g, ' ').trim();
const innerText = (s) => flat(s.replace(/<[^>]*>/g, ' '));
const attrOf = (attrs, name) => {
  const m = attrs.match(new RegExp('(?:^|\\s)' + name + '\\s*=\\s*(?:"([^"]*)"|\'([^\']*)\'|([^\\s"\'>]+))', 'i'));
  return m ? decode(m[1] ?? m[2] ?? m[3] ?? '') : null;
};
const absolute = (href, base) => { try { return new URL(href, base).href; } catch (e) { return href; } };

const extract = (html, base) => {
  let body = html.replace(/<!--[\s\S]*?-->/g, ' ');
  const code = [];
  const hiddenBlocks = [];
  const skipped = { scripts: 0, styles: 0 };
  body = body.replace(/<(script|style)\b([^>]*)>([\s\S]*?)<\/\1\s*>/gi, (m, tag, attrs, inner) => {
    if (tag.toLowerCase() === 'style') { skipped.styles += 1; return ' '; }
    const type = (attrOf(attrs, 'type') || '').toLowerCase();
    if (/json/.test(type)) code.push({ text: flat(inner), visible: false });
    else skipped.scripts += 1;
    return ' ';
  });
  body = body.replace(/<(noscript|template)\b[^>]*>([\s\S]*?)<\/\1\s*>/gi, (m, tag, inner) => {
    const text = innerText(inner);
    if (text) hiddenBlocks.push({ text, visible: false });
    return ' ';
  });
  const headings = [];
  for (const m of body.matchAll(/<(h[1-6])\b[^>]*>([\s\S]*?)<\/\1\s*>/gi)) {
    const text = innerText(m[2]);
    if (text) headings.push({ level: m[1].toLowerCase(), text });
  }
  const links = [];
  for (const m of body.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a\s*>/gi)) {
    const href = attrOf(m[1], 'href');
    if (href === null) continue;
    links.push({ href: absolute(href, base), text: innerText(m[2]) });
  }
  const images = [];
  for (const m of body.matchAll(/<img\b([^>]*)>/gi)) {
    images.push({ src: absolute(attrOf(m[1], 'src') || '', base), alt: attrOf(m[1], 'alt') || '' });
  }
  for (const m of body.matchAll(/<(pre|code)\b[^>]*>([\s\S]*?)<\/\1\s*>/gi)) {
    const text = flat(m[2].replace(/<[^>]*>/g, ' '));
    if (text) code.push({ text, visible: true });
  }
  let controls = 0;
  for (const m of body.matchAll(/<([a-z][a-z0-9-]*)\b([^>]*)>/gi)) {
    const name = m[1].toLowerCase();
    const a = m[2];
    if (name === 'button') controls += 1;
    else if (name === 'a' && /\b(href|onclick)\s*=/i.test(a)) controls += 1;
    else if (name === 'input' && /type\s*=\s*["']?(button|submit)/i.test(a)) controls += 1;
    else if (name !== 'a' && /\bonclick\s*=|role\s*=\s*["']?button/i.test(a)) controls += 1;
  }
  const seen = new Set();
  const blocks = [];
  for (const line of decode(body.replace(/<[^>]*>/g, '\n')).split('\n')) {
    const t = line.replace(/\s+/g, ' ').trim();
    if (t && !seen.has(t)) { seen.add(t); blocks.push({ text: t, visible: true }); }
  }
  return { load: { blocks: [...blocks, ...hiddenBlocks], headings, links, images, code }, controls, skipped };
};

const cardsFile = JSON.parse(readFileSync(join(DIR, 'cards.json'), 'utf8'));
const cards = cardsFile.cards;
mkdirSync(RAW, { recursive: true });

const fetchOne = async (card) => {
  const raw = join(RAW, pad(card.n) + '.html');
  try {
    const { stdout } = await run('curl', ['-sS', '-L', '--max-time', '120', '--compressed', '-A', UA, '-o', raw, '-w', '%{http_code}|%{url_effective}|%{size_download}', card.href], { maxBuffer: 1 << 20 });
    const [status, final, bytes] = stdout.split('|');
    return { status: Number(status), final, bytes: Number(bytes), error: null, raw };
  } catch (e) {
    const out = String(e.stdout || '').split('|');
    return { status: Number(out[0]) || 0, final: out[1] || null, bytes: Number(out[2]) || 0, error: String(e.stderr || e.message).trim().slice(0, 300), raw };
  }
};

const results = new Array(cards.length);
let next = 0;
await Promise.all(Array.from({ length: LIMIT }, async () => {
  while (next < cards.length) {
    const i = next++;
    results[i] = await fetchOne(cards[i]);
  }
}));

const games = [];
for (let i = 0; i < cards.length; i++) {
  const card = cards[i];
  const r = results[i];
  let html = '';
  try { html = readFileSync(r.raw, 'utf8'); } catch (e) { html = ''; }
  let error = r.error;
  if (!error && r.status === 200 && !/<\/html>/i.test(html)) error = 'incomplete HTML: no closing html tag';
  const ex = html ? extract(html, r.final || card.href) : { load: { blocks: [], headings: [], links: [], images: [], code: [] }, controls: 0, skipped: { scripts: 0, styles: 0 } };
  const file = pad(card.n) + '.json';
  writeFileSync(join(DIR, file), JSON.stringify({ url: card.href, final: r.final, status: r.status, bytes: r.bytes, error, controls: ex.controls, skipped: ex.skipped, load: ex.load, scroll: null }, null, 1));
  games.push({ n: card.n, label: card.label, url: card.href, file });
}

writeFileSync(join(DIR, 'manifest.json'), JSON.stringify({ section: 'Games', url: LIVE, method: 'HTTP GET with curl; the HTML as served, scripts not run', cardsInSection: cardsFile.count, planned: games.length, games }, null, 1));

const statusCounts = {};
for (const r of results) statusCounts[r.status] = (statusCounts[r.status] || 0) + 1;
const errors = games.filter((g) => JSON.parse(readFileSync(join(DIR, g.file), 'utf8')).error).map((g) => g.n);
console.log(JSON.stringify({ planned: games.length, statusCounts, errorCount: errors.length, errors }));
