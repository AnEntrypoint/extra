import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { rename } from './rename.mjs';

const ROOT = '/workspace/extra';
const GAMES = join(ROOT, 'wiki-tools', 'recapture', 'games');
const OUT = join(ROOT, 'wiki', 'reference-game-16');
const PAGES = join(OUT, 'games');
const EXPECTED = 148;
const LIVE = 'https://www.spawn.co/@lanmower/game-16@dev';
const KINDS = ['blocks', 'headings', 'links', 'images', 'code'];
const SECRET = [
  /(authenticity_token|csrf-token|upload_token|user_session|_gh_sess|sb-spawn-auth-token|__Secure-spawn-held|spawn-guest-tie)(?:[^A-Za-z0-9]|quot|amp)*[A-Za-z0-9+\/_=%.-]{24,}/i,
  /Bearer\s+[A-Za-z0-9._~+\/-]{20,}/,
  /sak_[A-Za-z0-9_-]{16,}/,
];

const readJson = (p) => JSON.parse(readFileSync(p, 'utf8'));
const flat = (s) => String(s ?? '').replace(/\s+/g, ' ').trim();
const cell = (s) => flat(s).replace(/\|/g, '\\|');
const fence = (body) => { const f = body.includes('````') ? '`````' : '````'; return f + 'text\n' + body + '\n' + f; };
const pad = (n) => String(n).padStart(3, '0');
const slug = (s) => flat(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 48) || 'game';
const keyOf = {
  blocks: (x) => flat(x.text),
  headings: (x) => flat(x.text),
  links: (x) => String(x.href ?? ''),
  images: (x) => String(x.src ?? ''),
  code: (x) => flat(x.text),
};
const stage = (s) => Object.fromEntries(KINDS.map((k) => [k, s?.[k] ?? []]));
const novel = (s, before) => {
  const seen = stage(s);
  const base = stage(before);
  return Object.fromEntries(KINDS.map((k) => {
    const have = new Set(base[k].map(keyOf[k]));
    const out = [];
    for (const x of seen[k]) {
      const id = keyOf[k](x);
      if (!id || have.has(id)) continue;
      have.add(id);
      out.push(x);
    }
    return [k, out];
  }));
};
const hasAny = (s) => KINDS.some((k) => s[k].length > 0);
const countsOf = (load, after) => {
  const all = (k) => [...load[k], ...after[k]];
  return [
    ['Headings', all('headings').length],
    ['Visible text blocks', all('blocks').filter((b) => b.visible).length],
    ['Hidden text blocks', all('blocks').filter((b) => !b.visible).length],
    ['Links', all('links').length],
    ['Images', all('images').length],
    ['Code or data blocks', all('code').length],
  ];
};

const renderItems = (s) => {
  const out = [];
  if (s.headings.length) out.push(s.headings.map((h) => '- ' + h.level + ': ' + rename(flat(h.text))).join('\n'), '');
  for (const b of s.blocks.filter((x) => x.visible)) out.push(rename(flat(b.text)), '');
  const hidden = s.blocks.filter((x) => !x.visible);
  if (hidden.length) out.push('Text in the page that is not rendered on screen. Kept verbatim, with whitespace collapsed by the extractor:', '');
  for (const h of hidden) out.push(fence(flat(h.text)), '');
  if (s.links.length) out.push('| Text | Target |', '| --- | --- |', ...s.links.map((l) => '| ' + cell(rename(flat(l.text))) + ' | ' + cell(l.href) + ' |'), '');
  if (s.images.length) out.push('| Source | Alt text |', '| --- | --- |', ...s.images.map((i) => '| ' + cell(i.src) + ' | ' + cell(rename(flat(i.alt))) + ' |'), '');
  s.code.forEach((c, n) => out.push('#### Block ' + (n + 1), '', fence(flat(c.text)), ''));
  return out.join('\n').trimEnd();
};

const gamePage = (g, c, load, after) => {
  const name = rename(flat(g.label));
  return [
    '# Game ' + pad(g.n) + ': ' + name,
    '',
    'The game ' + name + ' in the Games section of the live game page ' + LIVE + '. Its address was opened once and read, with no control clicked and nothing signed in or saved.',
    '',
    '## Items on the page',
    '',
    '| Item | Count |',
    '| --- | --- |',
    ...countsOf(load, after).map(([k, v]) => '| ' + k + ' | ' + v + ' |'),
    '',
    '## Present on load',
    '',
    hasAny(load) ? renderItems(load) : 'None found on load.',
    '',
    '## Loaded after a scroll',
    '',
    hasAny(after) ? renderItems(after) : 'None found after the scroll.',
    '',
    '## Loaded after a click',
    '',
    'None. The game page was read-only, so no control was clicked and nothing here comes from a click.',
    '',
    '## Not captured',
    '',
    '- Address opened: \u0060' + g.url + '\u0060. Address after redirects: \u0060' + (c.final ?? g.url) + '\u0060. HTTP status: ' + (c.status ?? 'not recorded') + '.',
    '- Controls on the page: ' + (c.controls ?? 0) + '. None clicked.',
    '- Anything the page loads only when a game is played is not captured, because play was not started.',
    '',
    '## Sources',
    '',
    '- \u0060wiki-tools/recapture/games/' + g.file + '\u0060, the read-only capture of this page.',
    '- \u0060wiki-tools/recapture/games/manifest.json\u0060, the list of the ' + EXPECTED + ' game addresses.',
    '',
  ].join('\n');
};

const indexPage = (rows) => {
  const sum = (name) => rows.reduce((n, r) => n + r.counts[name], 0);
  return [
    '# Games: the ' + EXPECTED + ' game pages in the Games section',
    '',
    'The Games section of the live game page ' + LIVE + ' lists ' + EXPECTED + ' games. Each game\u2019s address was read from its card and opened once, read-only, with the playwriter setup inside gm. No control on any game page was clicked. Each game has its own page, listed below.',
    '',
    '## Totals',
    '',
    '| Item | Count |',
    '| --- | --- |',
    '| Games listed | ' + rows.length + ' |',
    '| Pages written | ' + rows.length + ' |',
    '| Opened with HTTP 200 | ' + rows.filter((r) => r.status === 200).length + ' |',
    ...['Headings', 'Visible text blocks', 'Hidden text blocks', 'Links', 'Images', 'Code or data blocks'].map((k) => '| ' + k + ' | ' + sum(k) + ' |'),
    '',
    '## Games',
    '',
    '| No. | Game | Address | HTTP status | Page |',
    '| --- | --- | --- | --- | --- |',
    ...rows.map((r) => '| ' + pad(r.g.n) + ' | ' + cell(r.name) + ' | \u0060' + r.g.url + '\u0060 | ' + r.status + ' | [' + pad(r.g.n) + '](games/' + r.file + ') |'),
    '',
    '## Not captured',
    '',
    '- Play was not started on any game, so anything a game shows only after play is not captured.',
    '- Controls seen on the game pages: ' + rows.reduce((n, r) => n + r.controls, 0) + '. None was clicked.',
    '',
    '## Sources',
    '',
    '- \u0060wiki-tools/recapture/games/manifest.json\u0060, the list of the game addresses and of each capture file.',
    '- \u0060wiki-tools/recapture/games/\u0060, the read-only capture of each game page.',
    '- \u0060wiki-tools/gen-games.mjs\u0060, which writes this page and the game pages.',
    '',
  ].join('\n');
};

const manifest = readJson(join(GAMES, 'manifest.json'));
const games = [...manifest.games].sort((a, b) => a.n - b.n);
if (games.length !== EXPECTED) throw new Error('manifest lists ' + games.length + ' games, expected ' + EXPECTED);
games.forEach((g, i) => { if (g.n !== i + 1) throw new Error('game numbers must run 1 to ' + EXPECTED + ', found ' + g.n + ' at position ' + (i + 1)); });

rmSync(PAGES, { recursive: true, force: true });
mkdirSync(PAGES, { recursive: true });

const rows = games.map((g) => {
  const c = readJson(join(GAMES, g.file));
  const load = stage(c.load);
  const after = novel(c.scroll, load);
  const file = pad(g.n) + '-' + slug(g.label) + '.md';
  const text = gamePage(g, c, load, after);
  if (SECRET.some((re) => re.test(text))) throw new Error('token-shaped value on the page of game ' + g.n);
  writeFileSync(join(PAGES, file), text);
  return {
    g,
    file,
    name: rename(flat(g.label)),
    status: c.status ?? 'not recorded',
    controls: c.controls ?? 0,
    counts: Object.fromEntries(countsOf(load, after)),
  };
});

const index = indexPage(rows);
if (SECRET.some((re) => re.test(index))) throw new Error('token-shaped value on the games index');
writeFileSync(join(OUT, 'recapture-games.md'), index);
console.log(JSON.stringify({ games: rows.length, pages: PAGES, index: 'recapture-games.md' }));
