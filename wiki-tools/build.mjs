import { readdirSync, readFileSync, writeFileSync, mkdirSync, statSync, rmSync, existsSync } from 'node:fs';
import { join, relative, dirname, basename } from 'node:path';

const SRC = process.argv[2] ?? '/workspace/extra/wiki';
const OUT = process.argv[3] ?? '/workspace/extra/wiki-site';

const toHtml = (p) => (p === 'README.md' ? 'index.html' : p.replace(/\.md$/, '.html'));

const hrefFor = (u) => u.replace(/(^|\/)README\.md(#|$)/, '$1index.html$2').replace(/\.md(#|$)/, '.html$1');

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const slug = (s) => s.toLowerCase().replace(/<[^>]+>/g, '').replace(/[^\w\s-]/g, '').trim().replace(/\s+/g, '-');

function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir).sort()) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) out.push(...walk(p));
    else if (name.endsWith('.md')) out.push(p);
  }
  return out;
}

function inline(text) {
  const codes = [];
  let s = text.replace(/`([^`]+)`/g, (_, c) => {
    codes.push(c);
    return `\u0000${codes.length - 1}\u0000`;
  });
  s = esc(s);
  s = s.replace(/!\[([^\]]*)\]\(([^)\s]+)\)/g, (_, a, u) => `<img alt="${a}" src="${hrefFor(u)}">`);
  s = s.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, a, u) => `<a href="${hrefFor(u)}">${a}</a>`);
  s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  s = s.replace(/(^|[^*])\*([^*\s][^*]*)\*/g, '$1<em>$2</em>');
  s = s.replace(/\u0000(\d+)\u0000/g, (_, i) => `<code>${esc(codes[Number(i)])}</code>`);
  return s;
}

function splitRow(line) {
  let t = line.trim();
  if (t.startsWith('|')) t = t.slice(1);
  if (t.endsWith('|') && !t.endsWith('\\|')) t = t.slice(0, -1);
  const cells = [];
  let cur = '';
  let code = false;
  for (let i = 0; i < t.length; i++) {
    const ch = t[i];
    if (ch === '`') code = !code;
    if (ch === '\\' && t[i + 1] === '|') {
      cur += '|';
      i++;
      continue;
    }
    if (ch === '|' && !code) {
      cells.push(cur.trim());
      cur = '';
    } else cur += ch;
  }
  cells.push(cur.trim());
  return cells;
}

function render(md) {
  const lines = md.replace(/\r\n/g, '\n').split('\n');
  const html = [];
  const headings = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (/^```/.test(line)) {
      const lang = line.slice(3).trim();
      const body = [];
      i++;
      while (i < lines.length && !/^```/.test(lines[i])) body.push(lines[i++]);
      i++;
      html.push(`<pre><code${lang ? ` class="language-${esc(lang)}"` : ''}>${esc(body.join('\n'))}</code></pre>`);
      continue;
    }
    if (/^\s*$/.test(line)) {
      i++;
      continue;
    }
    const h = /^(#{1,6})\s+(.*)$/.exec(line);
    if (h) {
      const level = h[1].length;
      const id = slug(h[2]);
      headings.push({ level, text: h[2], id });
      html.push(`<h${level} id="${id}">${inline(h[2])}</h${level}>`);
      i++;
      continue;
    }
    if (/^\s*(---+|\*\*\*+)\s*$/.test(line)) {
      html.push('<hr>');
      i++;
      continue;
    }
    if (/^\s*\|/.test(line) && i + 1 < lines.length && /^\s*\|?\s*:?-{2,}/.test(lines[i + 1])) {
      const head = splitRow(line);
      i += 2;
      const rows = [];
      while (i < lines.length && /^\s*\|/.test(lines[i])) rows.push(splitRow(lines[i++]));
      const th = head.map((c) => `<th>${inline(c)}</th>`).join('');
      const tb = rows.map((r) => `<tr>${r.map((c) => `<td>${inline(c)}</td>`).join('')}</tr>`).join('');
      html.push(`<div class="table-wrap"><table><thead><tr>${th}</tr></thead><tbody>${tb}</tbody></table></div>`);
      continue;
    }
    if (/^\s*([-*+]|\d+\.)\s+/.test(line)) {
      const ordered = /^\s*\d+\./.test(line);
      const tag = ordered ? 'ol' : 'ul';
      const items = [];
      while (i < lines.length && /^\s*([-*+]|\d+\.)\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\s*([-*+]|\d+\.)\s+/, ''));
        i++;
        while (i < lines.length && /^\s{2,}\S/.test(lines[i]) && !/^\s*([-*+]|\d+\.)\s+/.test(lines[i])) {
          items[items.length - 1] += ' ' + lines[i].trim();
          i++;
        }
      }
      html.push(`<${tag}>${items.map((t) => `<li>${inline(t)}</li>`).join('')}</${tag}>`);
      continue;
    }
    if (/^>\s?/.test(line)) {
      const body = [];
      while (i < lines.length && /^>\s?/.test(lines[i])) body.push(lines[i++].replace(/^>\s?/, ''));
      html.push(`<blockquote><p>${inline(body.join(' '))}</p></blockquote>`);
      continue;
    }
    const para = [];
    while (i < lines.length && !/^\s*$/.test(lines[i]) && !/^(#{1,6}\s|```|\s*([-*+]|\d+\.)\s|>\s?|\s*\|)/.test(lines[i])) {
      para.push(lines[i++].trim());
    }
    if (para.length === 0) {
      para.push(lines[i].trim());
      i++;
    }
    html.push(`<p>${inline(para.join(' '))}</p>`);
  }
  return { body: html.join('\n'), headings };
}

const pages = walk(SRC).map((f) => ({ file: f, rel: relative(SRC, f).replace(/\\/g, '/') }));

function titleOf(md, fallback) {
  const m = /^#\s+(.+)$/m.exec(md);
  return m ? m[1].trim() : fallback;
}

const nav = pages.map((p) => {
  const md = readFileSync(p.file, 'utf8');
  return { rel: p.rel, href: toHtml(p.rel), title: titleOf(md, basename(p.rel, '.md')) };
});

const groups = new Map();
for (const n of nav) {
  const top = n.rel.includes('/') ? n.rel.split('/')[0] : '(root)';
  if (!groups.has(top)) groups.set(top, []);
  groups.get(top).push(n);
}

function sidebar(currentRel) {
  const parts = [];
  for (const [top, items] of groups) {
    const label = top === '(root)' ? 'Start' : top;
    parts.push(`<h3>${esc(label)}</h3><ul>`);
    for (const it of items) {
      const href = (currentRel.includes('/') ? '../'.repeat(currentRel.split('/').length - 1) : '') + it.href;
      const cls = it.rel === currentRel ? ' class="current"' : '';
      parts.push(`<li><a${cls} href="${href}">${esc(it.title)}</a></li>`);
    }
    parts.push('</ul>');
  }
  return parts.join('\n');
}

const css = `:root{--fg:#16181d;--muted:#5d6470;--bg:#f6f7f9;--card:#ffffff;--line:#e3e6eb;--accent:#3b6ef5;--accent-tint:#eaf0ff;--code:#eef1f5}
*{box-sizing:border-box}
body{margin:0;font:16px/1.6 Inter,"Helvetica Neue",Arial,sans-serif;color:var(--fg);background:var(--bg)}
a{color:var(--accent);text-decoration:none}
.topbar{background:var(--card);border-bottom:1px solid var(--line);position:sticky;top:0;z-index:2}
.topbar-inner{max-width:1040px;margin:0 auto;padding:0 32px;height:64px;display:flex;align-items:center;gap:24px}
.brand{font-weight:700;font-size:20px;color:var(--fg)}
.brand span{color:var(--accent)}
.pills{display:flex;flex-wrap:wrap;gap:4px;font-size:13.5px;font-weight:500}
.pills a{color:var(--muted);padding:6px 8px;border-radius:8px}
.pills a.active{color:var(--accent);background:var(--accent-tint)}
.layout{max-width:1040px;margin:0 auto;display:grid;grid-template-columns:200px minmax(0,1fr);gap:40px;padding:0 32px}
nav.side{padding:32px 0;font-size:13.5px}
nav.side h3{font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:.06em;color:var(--muted);margin:1.4rem 0 .4rem}
nav.side h3:first-child{margin-top:0}
nav.side ul{list-style:none;margin:0;padding:0}
nav.side li{margin:2px 0}
nav.side a{color:var(--muted);display:block;padding:5px 8px;border-radius:8px}
nav.side a.current{color:var(--accent);background:var(--accent-tint);font-weight:500}
main{padding:40px 0 24px;min-width:0;max-width:780px}
.eyebrow{display:inline-block;font-size:12px;font-weight:600;color:var(--accent);background:var(--accent-tint);padding:2px 10px;border-radius:999px;margin-bottom:12px}
h1{font-size:42px;font-weight:400;line-height:1.15;margin:0 0 16px;letter-spacing:-.01em}
h2{font-size:24px;font-weight:600;margin:2.4rem 0 .8rem;line-height:1.3}
h3{font-size:18px;font-weight:600;margin:1.8rem 0 .6rem}
p{margin:.7rem 0;color:var(--muted)}
main > p:first-of-type{font-size:18px;line-height:1.6}
li{margin:.3rem 0;color:var(--muted)}
strong{color:var(--fg)}
code{font:13px/1.4 ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;background:var(--code);padding:.1rem .35rem;border-radius:6px;color:var(--fg)}
pre{background:var(--card);border:1px solid var(--line);padding:16px;overflow:auto;border-radius:12px}
pre code{background:none;padding:0}
.table-wrap{overflow-x:auto;margin:1.2rem 0;background:var(--card);border:1px solid var(--line);border-radius:12px}
table{border-collapse:collapse;font-size:14px;width:100%}
th,td{padding:.55rem .7rem;vertical-align:top;text-align:left;border-bottom:1px solid var(--line)}
th{font-weight:600;color:var(--fg);background:var(--bg)}
td{color:var(--muted)}
blockquote{margin:1rem 0;padding:12px 16px;background:var(--accent-tint);border-radius:12px;color:var(--fg)}
blockquote p{color:var(--fg);margin:0}
hr{border:0;border-top:1px solid var(--line);margin:2rem 0}
footer.foot{border-top:1px solid var(--line);margin-top:24px;padding:20px 0 40px;font-size:14px;color:var(--muted)}
.foot-inner{max-width:1040px;margin:0 auto;padding:0 32px}
@media (max-width:760px){.layout{grid-template-columns:1fr;gap:0}nav.side{padding:16px 0 0}h1{font-size:32px}}
`;

rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });
writeFileSync(join(OUT, 'style.css'), css);

let count = 0;
for (const p of pages) {
  const md = readFileSync(p.file, 'utf8');
  const { body, headings } = render(md);
  const title = titleOf(md, basename(p.rel, '.md'));
  const up = '../'.repeat(p.rel.split('/').length - 1);
  const top = p.rel.includes('/') ? p.rel.split('/')[0] : '';
  const pillsHtml = [...groups.keys()]
    .filter((g) => g !== '(root)')
    .map((g) => {
      const first = groups.get(g)[0].href;
      const active = g === top ? ' class="active"' : '';
      return `<a${active} href="${up}${first}">${esc(g)}</a>`;
    })
    .join('');
  const page = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)} · Wiki</title>
<link rel="stylesheet" href="${up}style.css">
</head>
<body>
<header class="topbar">
<div class="topbar-inner">
<a class="brand" href="${up}index.html">wi<span>ki</span></a>
<nav class="pills">${pillsHtml}</nav>
</div>
</header>
<div class="layout">
<nav class="side">
${sidebar(p.rel)}
</nav>
<main>
${top ? `<span class="eyebrow">${esc(top)}</span>` : '<span class="eyebrow">wiki</span>'}
${body}
</main>
</div>
<footer class="foot"><div class="foot-inner">wiki · every page cites the on-disk sources it was written from</div></footer>
</body>
</html>
`;
  const outFile = join(OUT, toHtml(p.rel));
  mkdirSync(dirname(outFile), { recursive: true });
  writeFileSync(outFile, page);
  count++;
}

if (!existsSync(join(OUT, 'index.html'))) {
  throw new Error('no README.md at the wiki root: index.html was not produced');
}
console.log(`built ${count} pages into ${OUT}`);
