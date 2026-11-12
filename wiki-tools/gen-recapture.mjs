import { readdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { rename } from './rename.mjs';

const ROOT = '/workspace/extra/wiki-tools';
const STATES = join(ROOT, 'recapture', 'states');
const TOOLBOX = join(STATES, 'toolbox');
const CAP = join(ROOT, 'capture');
const OUT = '/workspace/extra/wiki/reference-game-16';

const SECTIONS = [
  ['Overview', 'overview', 'Overview'],
  ['Starters', 'starters', 'Starters'],
  ['Skills', 'skills', 'Skills'],
  ['Animations', 'animations', 'Animations'],
  ['Sound & Art', 'sound-art', 'Sound Art'],
  ['Workshop', 'workshop', 'Workshop'],
  ['Engine', 'engine', 'Engine'],
  ['Reference', 'reference', 'Reference'],
  ['Shapes', 'shapes', 'Shapes'],
  ['Mods', 'mods', 'Mods'],
  ['Games', 'games', 'Games'],
  ['Pick a genre', 'pick-a-genre', 'Pick A Genre'],
];

const squash = (s) => String(s ?? '').replace(/\s+/g, '');
const flat = (s) => String(s ?? '').replace(/\s+/g, ' ').trim();
const cell = (s) => flat(s).replace(/\|/g, '\\|');
const fence = (body) => { const f = body.includes('````') ? '`````' : '````'; return f + 'text\n' + body + '\n' + f; };
const readJson = (p) => JSON.parse(readFileSync(p, 'utf8'));

const captureStrings = [];
const walk = (v) => { if (typeof v === 'string') captureStrings.push(v); else if (Array.isArray(v)) v.forEach(walk); else if (v && typeof v === 'object') Object.values(v).forEach(walk); };
for (const f of readdirSync(CAP).filter((f) => f.endsWith('.json')).sort()) walk(readJson(join(CAP, f)));
const flatCorpus = captureStrings.map(flat).join(' ').toLowerCase();
const squashCorpus = squash(captureStrings.join(' ')).toLowerCase();
const wordIn = (text) => {
  const needle = flat(text).toLowerCase();
  if (!needle) return false;
  let at = flatCorpus.indexOf(needle);
  while (at !== -1) {
    const before = at === 0 ? '' : flatCorpus[at - 1];
    const after = flatCorpus[at + needle.length] ?? '';
    if (!/[\p{L}\p{N}]/u.test(before) && !/[\p{L}\p{N}]/u.test(after)) return true;
    at = flatCorpus.indexOf(needle, at + 1);
  }
  return false;
};
const captured = (s) => wordIn(s) || (squash(s).length >= 8 && squashCorpus.includes(squash(s).toLowerCase()));

const rank = (f) => (f.endsWith('-initial.json') ? 0 : f.endsWith('-swept.json') ? 1 : 2);
const sectionFiles = (idx) => readdirSync(TOOLBOX).filter((f) => f.startsWith(String(idx).padStart(2, '0') + '-') && f.endsWith('.json')).sort((a, b) => rank(a) - rank(b) || a.localeCompare(b));
const sectionStates = (idx) => sectionFiles(idx).map((f) => {
  const data = readJson(join(TOOLBOX, f));
  const stage = rank(f) === 0 ? 'load' : rank(f) === 1 ? 'scroll' : 'click';
  return { stage, label: data.clicked ?? null, data, file: 'wiki-tools/recapture/states/toolbox/' + f };
});
const summaryFor = (idx) => readJson(join(TOOLBOX, 'summary-' + String(idx).padStart(2, '0') + '.json'));
const hostStates = [['load', 'host/load.json'], ['scroll', 'host/scroll.json']].map(([stage, p]) => ({ stage, label: null, data: readJson(join(STATES, p)), file: 'wiki-tools/recapture/states/' + p }));
const playStates = [{ stage: 'load', label: null, data: readJson(join(STATES, 'play', 'load.json')), file: 'wiki-tools/recapture/states/play/load.json' }];

const collect = (states) => {
  const seen = new Set();
  const out = [];
  for (const s of states) {
    const d = s.data;
    const put = (kind, key, rest) => {
      const id = kind + '|' + squash(key);
      if (!squash(key) || seen.has(id) || captured(key)) return;
      seen.add(id);
      out.push({ kind, key, stage: s.stage, label: s.label, file: s.file, ...rest });
    };
    for (const b of d.blocks ?? []) put('block', flat(b.text), { visible: b.visible });
    for (const h of d.headings ?? []) put('heading', flat(h.text), { level: h.level });
    for (const l of d.links ?? []) put('link', l.href, { text: flat(l.text) });
    for (const i of d.images ?? []) put('image', i.src, { alt: flat(i.alt) });
    for (const c of d.code ?? []) put('code', c.text, { visible: c.visible });
  }
  return out;
};

const countOf = (items) => ({
  'Headings': items.filter((i) => i.kind === 'heading').length,
  'Visible text blocks': items.filter((i) => i.kind === 'block' && i.visible).length,
  'Hidden text blocks': items.filter((i) => i.kind === 'block' && !i.visible).length,
  'Links': items.filter((i) => i.kind === 'link').length,
  'Images': items.filter((i) => i.kind === 'image').length,
  'Code or data blocks': items.filter((i) => i.kind === 'code').length,
});

const renderItems = (items) => {
  const out = [];
  const heads = items.filter((i) => i.kind === 'heading');
  if (heads.length) out.push(heads.map((h) => '- ' + h.level + ': ' + rename(h.key)).join('\n'), '');
  for (const p of items.filter((i) => i.kind === 'block' && i.visible)) out.push(rename(p.key), '');
  const hidden = items.filter((i) => i.kind === 'block' && !i.visible);
  if (hidden.length) out.push('Text in the page that is not rendered on screen. Kept verbatim, with whitespace collapsed by the extractor:', '');
  for (const h of hidden) out.push(fence(h.key), '');
  const links = items.filter((i) => i.kind === 'link');
  if (links.length) out.push('| Text | Target |', '| --- | --- |', ...links.map((l) => '| ' + cell(rename(l.text)) + ' | ' + cell(l.key) + ' |'), '');
  const images = items.filter((i) => i.kind === 'image');
  if (images.length) out.push('| Source | Alt text |', '| --- | --- |', ...images.map((i) => '| ' + cell(i.key) + ' | ' + cell(rename(i.alt)) + ' |'), '');
  items.filter((i) => i.kind === 'code').forEach((c, n) => out.push('#### Block ' + (n + 1), '', fence(c.key), ''));
  return out.join('\n');
};

const groupItems = (items) => {
  const groups = new Map();
  for (const it of items) {
    const k = it.stage === 'click' ? 'click:' + it.label : it.stage;
    groups.set(k, [...(groups.get(k) ?? []), it]);
  }
  return groups;
};

const writePage = (name, { title, lead, items, extra, sources }) => {
  const groups = groupItems(items);
  const body = [];
  body.push('## Present on load, not in the capture', '', groups.has('load') ? renderItems(groups.get('load')) : 'None found on load.', '');
  body.push('## Loaded after a scroll, not in the capture', '', groups.has('scroll') ? renderItems(groups.get('scroll')) : 'None found after the scroll.', '');
  body.push('## Loaded after a click, not in the capture', '');
  const clicks = [...groups.keys()].filter((k) => k.startsWith('click:'));
  if (!clicks.length) body.push('None found after a click.', '');
  for (const k of clicks) body.push('### After clicking "' + rename(k.slice(6)) + '"', '', renderItems(groups.get(k)), '');
  body.push('## Not captured', '', ...extra, '');
  const table = Object.entries(countOf(items)).map(([k, v]) => '| ' + k + ' | ' + v + ' |').join('\n');
  writeFileSync(join(OUT, name), '# ' + title + '\n\n' + lead + '\n\n## Items not in the capture\n\n| Item | Count |\n| --- | --- |\n' + table + '\n\n' + body.join('\n') + '\n## Sources\n\n' + sources.map((s) => '- \u0060' + s + '\u0060').join('\n') + '\n');
  return { name, stages: { load: (groups.get('load') ?? []).length, scroll: (groups.get('scroll') ?? []).length, click: clicks.reduce((n, k) => n + groups.get(k).length, 0) }, clicks: clicks.length };
};

const skipLines = (s) => [
  'Controls clicked: ' + s.clicked + ' of ' + s.planned + ' planned controls in this section, out of ' + s.candidates + ' candidates found after the load and the scroll.',
  'Controls not clicked by policy: ' + s.riskySkipped + '. Their labels name an action that changes state or sends something, so they were left alone: ' + (s.skipped.map((t) => '"' + rename(t) + '"').join('; ') || 'none') + '.',
  'Controls that could not be found again after a retry: ' + s.missing + '. Errors: ' + s.errors + '.',
  '',
];

const clickLine = (states) => { const clicks = states.filter((s) => s.stage === 'click'); const withNew = clicks.filter((s) => s.data.blocks.length + s.data.headings.length + s.data.links.length + s.data.images.length + s.data.code.length > 0).length; return 'Clicks made: ' + clicks.length + '. Clicks that brought up content not in the swept state: ' + withNew + '. The rest brought up nothing new.'; };

const results = [];
results.push(writePage('recapture-host.md', {
  title: 'Host page: text and links not in the first capture',
  lead: 'The host document of the live game page, read on load and again after a scroll with the playwriter setup inside gm. The toolbox sections are in the separate section pages.',
  items: collect(hostStates),
  extra: ['The host document has no controls that change state. Its one button is the keyboard hint "tab to read", which was not clicked.', ''],
  sources: hostStates.map((s) => s.file),
}));

const playText = playStates[0].data.visibleText ?? '';
results.push(writePage('recapture-play-frame.md', {
  title: 'Play frame: text not in the capture',
  lead: 'The play frame is the game session frame at play.spawn.co. On load it held ' + playText.length + ' characters of visible text, ' + (playStates[0].data.blocks ?? []).length + ' text blocks and ' + (playStates[0].data.headings ?? []).length + ' headings.',
  items: collect(playStates),
  extra: ['The game world is drawn by the engine into the frame and has no text in the page. Nothing was clicked in the play frame, because a click there acts in the live world.', ''],
  sources: playStates.map((s) => s.file),
}));

const WALK_NOTE = 'The control Walk into the animation hall was clicked once, before the travel verbs were added to the skip list. A live check on 2026-11-12, on a fresh load and without clicking it again, found it is an anchor with no href. Its inline click handler sends a hall action, so a click sends that action instead of following a link. The play session world id and address match the first baseline. What the hall action does on the server is not visible on the page, because the play frame is a canvas.';

SECTIONS.forEach(([name, slug, label], idx) => {
  const states = sectionStates(idx);
  const s = summaryFor(idx);
  results.push(writePage('recapture-' + slug + '.md', {
    title: 'Game page section: ' + label + ': text not in the capture',
    lead: 'The ' + name + ' section of the toolbox, read on load, after a scroll, and after a click on each control that does not change state. Only text, headings, links, images and code that the first capture does not hold are listed.',
    items: collect(states),
    extra: [...skipLines(s), ...(slug === 'animations' ? [WALK_NOTE] : []), clickLine(states), ''],
    sources: [...states.map((st) => st.file), 'wiki-tools/recapture/states/toolbox/summary-' + String(idx).padStart(2, '0') + '.json'],
  }));
});

const rows = results.map((r) => '| ' + r.name + ' | ' + r.stages.load + ' | ' + r.stages.scroll + ' | ' + r.stages.click + ' | ' + r.clicks + ' |');
writeFileSync(join(OUT, 'recapture-index.md'), '# Recapture index: what the game page holds outside the first capture\n\nThe live game page https://www.spawn.co/@lanmower/game-16@dev was captured again with the playwriter setup inside gm, on 2026-11-12. The first capture read the twelve toolbox sections once, after a 1.2 second wait. This recapture reads the host document, the play frame and each toolbox section on load, after a scroll, and after a click on each control that does not change state. Each page below lists what the first capture does not hold, as text, headings, links, images and code, with the rename rules applied to prose.\n\n## Items not in the capture, by page\n\n| Page | On load | After a scroll | After a click | Clicks that brought new content |\n| --- | --- | --- | --- | --- |\n' + rows.join('\n') + '\n\n## Not captured, and why\n\n- Controls whose labels name a state-changing action (play, join, install, like, follow, reply, post, send, sign in, save, delete, publish, create, submit, buy, share, copy, token, invite, remove, add, fork, star, subscribe, download, remix, report, upload, connect, pay, purchase) were not clicked. Each section page lists its own. A click on them would act on the live world or on the account, so the policy is to leave them unclicked.\n- The game world in the play frame is drawn by the engine and has no text in the page, so only the frame chrome and any text in the DOM is captured.\n- One control was clicked before the travel verbs were added to the skip list: the arrow link Walk into the animation hall in Animations. The click appears to have detached the toolbox frame, which was gone on the next check. The page was reloaded and the sections were read again from the reloaded page. A live check on 2026-11-12, on a fresh load without a second click, found the control as an anchor with no href and an inline click handler that sends a hall action, so a click sends that action instead of following a link. The play session world id and address match the first baseline, so the page did not move to another world. The hall action itself is not visible on the page, because the play frame is a canvas, so its effect on the server was not verified.\n- The 148 Games entries were each clicked once. None brought up anything in the toolbox frame that the swept state did not already hold. The page of a game was not opened, to keep the capture to the toolbox and not start a session.\n- Hidden text (inline scripts, styles and the schema.org data on the host) is captured as text that is not rendered on screen.\n\n## Sources\n\n- \u0060wiki-tools/recapture/states/\u0060, the raw states of this recapture, read by \u0060wiki-tools/gen-recapture.mjs\u0060.\n- \u0060wiki-tools/capture/\u0060, the first capture, which these pages compare against and which is unchanged.\n');
console.log(JSON.stringify({ pages: results.length, items: results.map((r) => [r.name, r.stages]) }));
