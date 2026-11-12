import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const CAP = '/workspace/extra/wiki-tools/capture';
const OUT = '/workspace/extra/wiki/reference-game-16';

const KEEP_AFTER = '(?![\\/\\-\\w]|\\.(?:co|io|js|ts|json|txt|webp|png|jpg|mp4|glb)\\b)';
const KEEP_BEFORE = '(?<![@.\\/\\-\\w])';
const RENAME = [
  [/Spawn-native/g, 'Jayzee-native'],
  [new RegExp(`${KEEP_BEFORE}Savi${KEEP_AFTER}`, 'g'), 'Cleetus'],
  [new RegExp(`${KEEP_BEFORE}savi${KEEP_AFTER}`, 'g'), 'cleetus'],
  [new RegExp(`${KEEP_BEFORE}Spawn${KEEP_AFTER}(?! client)`, 'g'), 'Jayzee'],
  [new RegExp(`${KEEP_BEFORE}spawn${KEEP_AFTER}(?! client)`, 'g'), 'jayzee'],
];

const rename = (s) => RENAME.reduce((t, [re, to]) => t.replace(re, to), s);

const cell = (s) => String(s ?? '').replace(/\|/g, '\\|').replace(/\n+/g, ' ').trim();

const fence = (body) => {
  const f = body.includes('````') ? '`````' : '````';
  return `${f}text\n${body}\n${f}`;
};

function renderText(text, headings) {
  const pending = headings.map((h) => ({ level: Number(h.level.slice(1)), text: h.text.trim() }));
  const out = [];
  for (const raw of text.split('\n')) {
    const line = raw.trim();
    if (!line) continue;
    const idx = pending.findIndex((h) => h.text === line);
    if (idx >= 0) {
      const h = pending.splice(idx, 1)[0];
      const level = Math.min(Math.max(h.level + 1, 3), 6);
      out.push(`${'#'.repeat(level)} ${rename(line)}`);
    } else {
      out.push(rename(line));
    }
    out.push('');
  }
  return out.join('\n');
}

function linksTable(links) {
  const rows = links.map((l) => `| ${cell(rename(l.text))} | ${cell(l.href)} |`);
  return ['| Text | Target |', '| --- | --- |', ...rows].join('\n');
}

function imagesTable(images) {
  const rows = images.map((i) => `| ${cell(i.src)} | ${cell(rename(i.alt ?? ''))} |`);
  return ['| Source | Alt text |', '| --- | --- |', ...rows].join('\n');
}

function codeBlocks(code) {
  return code.map((c, i) => `### Block ${i + 1}\n\n${fence(c)}`).join('\n\n');
}

function page({ title, lead, body, counts, source }) {
  return `# ${title}

${lead}

## Coverage of this capture

| Item | Count |
| --- | --- |
${Object.entries(counts).map(([k, v]) => `| ${k} | ${v} |`).join('\n')}

Source capture: \`${source}\` (verbatim, before renames).

${body}
`;
}

mkdirSync(OUT, { recursive: true });
const summary = [];
const written = [];

const host = JSON.parse(readFileSync(join(CAP, 'host.json'), 'utf8'));
const hostBody = [
  '## Headings and text',
  '',
  host.headings.map((h) => `- ${'  '.repeat(Number(h.level.slice(1)) - 1)}${rename(h.text)}`).join('\n'),
  '',
  host.paragraphs.map((p) => rename(p)).join('\n\n'),
  '',
  '## Links',
  '',
  linksTable(host.links),
  '',
  '## Images',
  '',
  imagesTable(host.images),
  '',
  '## Code and data',
  '',
  host.code.length ? codeBlocks(host.code) : 'None captured on this page.',
].join('\n');
const hostFile = 'page-host.md';
writeFileSync(join(OUT, hostFile), page({
  title: 'Host page: Untitled game (@lanmower/game-16)',
  lead: rename(`Captured from ${host.url} (title "${host.title}"). This is the page the play link opens. Its sections are the agent-facing notes that the game page shows around the play frame.`),
  body: hostBody,
  counts: { 'Headings': host.headings.length, 'Paragraph blocks': host.paragraphs.length, 'Links': host.links.length, 'Images': host.images.length, 'Code or data blocks': host.code.length },
  source: 'capture/host.json',
}));
written.push(hostFile);
summary.push(['host', host.paragraphs.length, host.headings.length, host.links.length, host.images.length, host.code.length]);

const files = readdirSync(CAP).filter((f) => /^\d\d-.*\.json$/.test(f)).sort();
for (const f of files) {
  const d = JSON.parse(readFileSync(join(CAP, f), 'utf8'));
  const label = f.replace(/^\d\d-/, '').replace(/\.json$/, '');
  const name = `page-${f.replace(/\.json$/, '')}.md`;
  const titleLabel = label.replace(/-/g, ' ');
  const body = [
    '## Page text in order',
    '',
    renderText(d.text, d.headings),
    '## Headings',
    '',
    d.headings.length ? d.headings.map((h) => `- ${h.level}: ${rename(h.text)}`).join('\n') : 'None on this page.',
    '',
    '## Links',
    '',
    d.links.length ? linksTable(d.links) : 'None on this page.',
    '',
    '## Images',
    '',
    d.images.length ? imagesTable(d.images) : 'None on this page.',
    '',
    '## Code and data',
    '',
    d.code.length ? codeBlocks(d.code) : 'None on this page.',
  ].join('\n');
  writeFileSync(join(OUT, name), page({
    title: `Game page section: ${titleLabel.replace(/\b\w/g, (c) => c.toUpperCase())}`,
    lead: `Section of the game page captured by clicking the "${titleLabel}" entry in the toolbox navigation. The text, headings, links, images and code below are the capture of that section.`,
    body,
    counts: { 'Characters of text': d.text.length, 'Headings': d.headings.length, 'Links': d.links.length, 'Images': d.images.length, 'Code or data blocks': d.code.length, 'Paragraph blocks': d.blocks.length },
    source: `capture/${f}`,
  }));
  written.push(name);
  summary.push([label, d.text.length, d.headings.length, d.links.length, d.images.length, d.code.length]);
}

const rows = summary.map((s) => `| ${s[0]} | ${s[1]} | ${s[2]} | ${s[3]} | ${s[4]} | ${s[5]} |`);
const totals = [0, 0, 0, 0, 0, 0];
for (const s of summary.slice(1)) for (let i = 1; i < 6; i++) totals[i] += s[i];
writeFileSync(join(OUT, 'coverage.md'), `# Capture coverage: game page

## How it works

The capture was taken with the playwriter setup inside gm, on the live page https://www.spawn.co/@lanmower/game-16@dev. The host document holds the page sections (headline, byline, the agent notes and the play entry). The toolbox content is in the child frame of the play session, \`tome-ui\`. The toolbox navigation has twelve entries, and each one was clicked in turn. After each click the frame was read: its full text, headings, anchors, images, and code or data blocks.

Each captured section is one page in this folder. Text is in document order. Headings are marked as headings, and every link, image and code block is listed.

## Decisions

- The reference's sections are kept as separate pages, one per navigation entry, because the reference navigates between them with its own pill nav. The wiki uses the same split.
- Renames are applied to prose and headings. Hostnames, URLs, package names and the \`spawn client\` command are kept verbatim, because they are published identifiers that do not change.
- Capture files are kept outside the wiki, in \`wiki-tools/capture/\`, unchanged, so the rename can be checked against them.

## Open gaps

- Text that a section loads only after a later scroll or a click inside it is not in this capture. The capture reads each section once, after a 1.2 second wait.
- The \`Reference\` section is 124 thousand characters with 73 code blocks. It is captured in full, but the wiki copy is long.
- The play frame of the game itself (the live world, rendered by the engine) is not captured as text. Only the toolbox UI around it is.

## Sources

- \`capture/host.json\` and \`capture/00-overview.json\` to \`capture/11-pick-a-genre.json\` in \`wiki-tools/capture/\`.

## Totals

| Section | Characters | Headings | Links | Images | Code or data blocks |
| --- | --- | --- | --- | --- | --- |
${rows.join('\n')}
| Total of toolbox sections | ${totals[1]} | ${totals[2]} | ${totals[3]} | ${totals[4]} | ${totals[5]} |
`);
written.push('coverage.md');

console.log(JSON.stringify({ written: written.length, files: written }));
