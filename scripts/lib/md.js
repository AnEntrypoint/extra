// A small markdown-to-HTML renderer for the docs pages: headings, code fences, lists, quotes, inline code, bold, italics, links.
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const inline = (s) => esc(s)
  .replace(/`([^`]+)`/g, '<code>$1</code>')
  .replace(/\*\*([^*]+)\*\*/g, "<b>$1</b>")
  .replace(/(^|[^*\w])\*([^*\s][^*]*)\*/g, "$1<i>$2</i>")
  .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<u>$1</u>');
export function md(src) {
  const out = []; const lines = src.split("\n"); let i = 0, para = [], list = null;
  const flush = () => { if (para.length) { out.push(`<p>${inline(para.join(" "))}</p>`); para = []; } if (list) { out.push(`<ul>${list.map((l) => `<li>${inline(l)}</li>`).join("")}</ul>`); list = null; } };
  while (i < lines.length) {
    const l = lines[i];
    if (/^```/.test(l)) { flush(); const lang = l.slice(3).trim(); const buf = []; i++; while (i < lines.length && !/^```/.test(lines[i])) buf.push(lines[i++]); i++; out.push(`<pre data-lang="${esc(lang)}">${esc(buf.join("\n"))}</pre>`); continue; }
    if (/^<(api|example)[^>]*>\s*$/.test(l)) { flush(); const tag = l.match(/^<(\w+)/)[1]; const buf = []; i++; while (i < lines.length && !new RegExp(`^</${tag}>`).test(lines[i])) buf.push(lines[i++]); i++; out.push(`<pre data-lang="${tag}">${esc(buf.join("\n"))}</pre>`); continue; }
    const h = l.match(/^(#{1,6})\s+(.*)/);
    if (h) { flush(); const n = Math.min(h[1].length + 1, 5); out.push(`<h${n} class="md">${inline(h[2])}</h${n}>`); i++; continue; }
    const li = l.match(/^\s*(?:[-*+]|\d+\.)\s+(.*)/);
    if (li) { if (para.length) { out.push(`<p>${inline(para.join(" "))}</p>`); para = []; } (list ??= []).push(li[1]); i++; continue; }
    if (list && /^\s{2,}\S/.test(l)) { list[list.length - 1] += " " + l.trim(); i++; continue; }
    if (/^>\s?/.test(l)) { flush(); out.push(`<blockquote>${inline(l.replace(/^>\s?/, ""))}</blockquote>`); i++; continue; }
    if (!l.trim()) { flush(); i++; continue; }
    if (list) flush();
    para.push(l.trim()); i++;
  }
  flush();
  return out.join("");
}
export const codeBlock = (text) => `<pre>${esc(text)}</pre>`;
