// A web page: the catalog of everything premade this world can build with, page by page.
import { STARTERS, SKILLS, CLIPS, FAMILIES, TOOLS, ENGINE, GENRES, FAMILY_ART, MODS, EXAMPLES } from "./lib/catalog.js";
// The heavy docs load after the player stands (first render), never at boot.
let SKILL_DOCS = null, API_DOC = null, STARTER_FILES = null, SHAPES = null, started = false;
function loadDocs() {
  if (started) return; started = true;
  import("./lib/docs-skills.js").then((m) => { SKILL_DOCS = m.SKILL_DOCS; });
  import("./lib/docs-api.js").then((m) => { API_DOC = m.API_DOC; });
  import("./lib/docs-starters.js").then((m) => { STARTER_FILES = m.STARTER_FILES; });
  import("./lib/docs-shapes.js").then((m) => { SHAPES = m.SHAPES; }).catch(() => { SHAPES = {}; });
  for (const f of ["a", "b"]) {
    import(`./lib/docs-genres-${f}.js`).then((m) => { Object.assign(GENRE_DOCS, m.DOCS); }).catch(() => {});
    import(`./lib/docs-engine-${f}.js`).then((m) => { Object.assign(ENGINE_DOCS, m.DOCS); }).catch(() => {});
    import(`./lib/docs-workshop-${f}.js`).then((m) => { Object.assign(WORK_DOCS, m.DOCS); }).catch(() => {});
  }
}
// Deep pages: { id: { title, summary, md } }, filled from their files as they load.
const GENRE_DOCS = {}, ENGINE_DOCS = {}, WORK_DOCS = {};
const WORK_IDS = ["overview", "blender", "pictures", "sound-voice", "models", "video", "testing", "wisps", "world-files", "platform-reads"];
const GENRE_IDS = [["Strongest", ["action-adventure", "arena-party", "exploration", "racing", "survival-building"]], ["Very good", ["platformer-rpg2d", "clicker-card-board", "social-hangout", "npc-story"]]];
const ENGINE_IDS = ["multiplayer", "places", "terrain", "objects", "physics", "scripting", "state", "ui", "audio", "visuals", "cameras", "input", "characters", "minds", "assets", "publishing", "performance"];
const pending = (ctx) => `<p style="margin-top:20px">Opening the docs<span style="opacity:0">${Math.round(ctx.now() / 200)}</span>...</p>`;
import { md, codeBlock } from "./lib/md.js";
const MD_CACHE = {};
const mdOnce = (key, src) => (MD_CACHE[key] ??= md(src));

const CSS = `<style>
#site{--bg:#f7f8fa;--ink:#16181d;--muted:#5d6470;--line:#e3e6eb;--accent:#3b6ef5;--soft:#eaf0ff;
  position:fixed;inset:0;overflow-y:auto;background:var(--bg);color:var(--ink);
  font-family:"Inter","Helvetica Neue",Arial,sans-serif;font-size:16px;line-height:1.6;pointer-events:auto}
#site a{color:inherit;text-decoration:none;cursor:pointer}
#site .wrap{max-width:1040px;margin:0 auto;padding:0 32px}
#site header{position:sticky;top:0;background:rgba(255,255,255,.95);border-bottom:1px solid var(--line);z-index:2}
#site header .wrap{display:flex;align-items:center;justify-content:space-between;gap:16px;min-height:64px;flex-wrap:wrap}
#site .logo{font-weight:700;font-size:17px;letter-spacing:-.01em;white-space:nowrap}
#site .logo span{color:var(--accent)}
#site nav{display:flex;gap:0;flex-wrap:wrap}@media(max-width:1180px){#site nav{padding-right:calc(var(--jayzee-chrome-reservation-right-inset,50px))}}
#site nav a{padding:6px 8px;border-radius:8px;color:var(--muted);font-weight:500;font-size:13.5px;white-space:nowrap}
#site nav a:hover{background:#eef1f6;color:var(--ink)}
#site nav a.on{color:var(--accent);background:var(--soft)}
#site h1{font-size:42px;line-height:1.15;letter-spacing:-.02em;margin:0 0 14px}
#site h2{font-size:30px;letter-spacing:-.01em;margin:0 0 8px}
#site h3{font-size:17px;margin:0 0 4px}
#site h4{font-size:13px;text-transform:uppercase;letter-spacing:.08em;color:var(--muted);margin:36px 0 12px}
#site p{margin:0 0 12px;color:var(--muted)}
#site main{padding:52px 0 72px}
#site .lead{font-size:18px;max-width:640px}
#site .btn{display:inline-block;padding:10px 18px;border-radius:8px;background:var(--accent);color:#fff;font-weight:600;font-size:15px;margin:0 8px 8px 0}
#site .btn.ghost{background:#fff;color:var(--ink);border:1px solid var(--line)}
#site .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:16px}
#site .grid.wide{grid-template-columns:repeat(auto-fill,minmax(300px,1fr))}
#site .card{background:#fff;border:1px solid var(--line);border-radius:12px;padding:18px 20px}
#site .card p{margin:0;font-size:14.5px}
#site .card.link:hover{border-color:var(--accent)}
#site .tag{display:inline-block;font-size:12px;font-weight:600;color:var(--accent);background:var(--soft);border-radius:999px;padding:2px 10px;margin-bottom:8px}
#site .code{font-family:ui-monospace,Menlo,monospace;font-size:13px;color:var(--accent)}
#site .chips{display:flex;flex-wrap:wrap;gap:8px}
#site .chip{background:#fff;border:1px solid var(--line);border-radius:999px;padding:4px 12px;font-size:14px}
#site .fit{margin-top:10px;font-size:13px;color:var(--ink)}
#site .fit b{color:var(--accent);font-weight:600}
#site .stat{font-size:36px;font-weight:700;letter-spacing:-.02em;color:var(--accent);line-height:1}
#site .dot{display:inline-block;width:12px;height:12px;border-radius:50%;margin-right:8px;vertical-align:-1px}
#site .doc{background:#fff;border:1px solid var(--line);border-radius:12px;padding:28px 34px;margin-top:20px;max-width:860px}
#site .doc p,#site .doc li{color:#2c313a;font-size:15px}
#site .doc ul{padding-left:22px;margin:0 0 12px}
#site .doc h2.md,#site .doc h3.md{margin:26px 0 10px}#site .doc h4.md,#site .doc h5.md{margin:20px 0 8px;font-size:15px;text-transform:none;letter-spacing:0;color:var(--ink)}
#site code{font-family:ui-monospace,Menlo,monospace;font-size:.88em;background:#f1f3f7;border-radius:4px;padding:1px 5px;color:#b0306a}
#site pre{font-family:ui-monospace,Menlo,monospace;font-size:12.5px;line-height:1.5;background:#0f1420;color:#d8e0ee;border-radius:10px;padding:16px 18px;overflow-x:auto;white-space:pre;margin:0 0 16px;user-select:text}
#site blockquote{border-left:3px solid var(--accent);margin:0 0 12px;padding:2px 14px;color:var(--muted)}
#site .back{display:inline-block;color:var(--accent);font-weight:600;font-size:14px;margin-bottom:14px}
#site .files{display:flex;flex-wrap:wrap;gap:6px;margin:18px 0 0}
#site .files a{font-family:ui-monospace,Menlo,monospace;font-size:12.5px;padding:4px 10px;border-radius:6px;background:#fff;border:1px solid var(--line);color:var(--muted)}
#site .files a.on{border-color:var(--accent);color:var(--accent);background:var(--soft)}
#site .open{float:right;font-size:12px;color:var(--accent);font-weight:600}
#site .btn.sm{padding:6px 12px;font-size:13px;margin:0 6px 6px 0}
#site .art{width:100%;aspect-ratio:4/3;object-fit:cover;border-radius:8px;margin-bottom:12px;background:#e9edf3;display:block}
#site .card.fam{padding:12px 12px 8px}
#site .meta{font-size:12.5px;color:var(--muted);margin-top:8px}
#site footer{border-top:1px solid var(--line);padding:24px 0;color:var(--muted);font-size:14px}
@media(max-width:600px){#site h1{font-size:30px}#site h2{font-size:24px}#site nav a{padding:5px 8px;font-size:13px}
  #site .wrap{padding:0 calc(var(--jayzee-chrome-reservation-right-inset,50px) + 12px) 0 18px}#site nav{padding-right:0}}
</style>`;

const LINKS = [["home", "Overview"], ["starters", "Starters"], ["skills", "Skills"], ["motion", "Animations"], ["media", "Sound & Art"], ["workshop", "Workshop"], ["engine", "Engine"], ["reference", "Reference"], ["shapes", "Shapes"], ["mods", "Mods"], ["examples", "Games"], ["genres", "Pick a genre"]];
const go = (p, doc, file) => `onclick="sendAction('nav',{page:'${p}'${doc ? `,doc:'${doc}'` : ""}${file ? `,file:'${file}'` : ""}})"`;
const ACTIVE = { starter: "starters", skill: "skills", shape: "shapes", genre: "genres", engsec: "engine", work: "workshop" };
const play = (clip, label) => `<a class="btn ghost sm" onclick="preview('${clip}','${label}')">▶ ${label}</a>`;
// Samples play on this page alone, through the HUD's own audio graph into Jayzee's buses: one at a time, a new press replaces the last.
let cur = null;
export function previewStop() { try { cur?.stop(); } catch {} cur = null; const n = document.getElementById("nowplaying"); if (n) n.textContent = ""; }
export async function preview(clip, label) {
  previewStop();
  const n = document.getElementById("nowplaying"); if (n) n.textContent = "loading " + label + "…";
  try {
    const ac = audio.context; if (ac.state !== "running") await ac.resume?.();
    const buf = await audio.buffer(clip);
    const src = ac.createBufferSource(); src.buffer = buf;
    src.connect(audio.bus(clip.includes("/music-") ? "Music" : "UI")); src.start(); cur = src;
    src.onended = () => { if (cur === src) previewStop(); };
    window.__sample = { clip, state: ac.state, seconds: buf?.duration };
    if (n) n.textContent = "▶ playing " + label + " · " + clip.split("/")[2];
  } catch (e) { window.__sample = { clip, error: String(e) }; if (n) n.textContent = "couldn't play that one: " + (e?.message ?? e); }
}
const skillCount = Object.values(SKILLS).reduce((n, l) => n + l.length, 0);
const clipCount = Object.values(CLIPS).reduce((n, l) => n + l.length, 0);

const PAGES = {
  home: () => `
    <span class="tag">The toolbox</span>
    <h1>Everything we can build with.</h1>
    <p class="lead">Every starter, playbook, animation, sound family and tool this world has, laid out so we can pick a game we know we can make great.</p>
    <div class="grid" style="margin-top:32px">
      ${[[STARTERS.length, "starters", "starters"], [skillCount, "skills", "skills"], [clipCount, "animations", "motion"], [FAMILIES.length, "style families", "media"]]
        .map(([n, l, p]) => `<a class="card link" ${go(p)}><div class="stat">${n}</div><p style="margin-top:6px">${l}</p></a>`).join("")}
    </div>
    <div style="margin-top:32px"><a class="btn" ${go("genres")}>Jump to genre picks</a><a class="btn ghost" ${go("starters")}>Start with starters</a></div>`,

  starters: () => `
    <h2>Starters</h2>
    <p class="lead">One-move foundations. Swapping onto one replaces the world's scripts in a single step, and one undo brings the old one back.</p>
    <div class="grid wide" style="margin-top:24px">
      ${STARTERS.map(([id, name, what, fit]) => `<a class="card link" ${go("starter", id)}><span class="open">files →</span><span class="code">${id}</span><h3 style="margin-top:6px">${name}</h3><p>${what}</p><div class="fit"><b>Good for</b> ${fit}</div></a>`).join("")}
    </div>`,

  skills: () => `
    <h2>Skills</h2>
    <p class="lead">${skillCount} engine playbooks. Each is the craft for one territory. Open any card to read it whole.</p>
    ${Object.entries(SKILLS).map(([group, list]) => `
      <h4>${group}</h4>
      <div class="grid">${list.map(([id, what]) => `<a class="card link" ${go("skill", id)}><span class="open">read →</span><span class="code">${id}</span><p style="margin-top:6px">${what}</p></a>`).join("")}</div>`).join("")}`,

  motion: () => `
    <h2>Animations</h2>
    <p class="lead">${clipCount} humanoid clips ready on any rigged character, several with a woman's version. Your own clips can be imported too.</p>
    <div style="margin:18px 0 6px"><a class="btn" onclick="sendAction('hall')">Walk into the animation hall →</a><span class="meta">every clip playing on its own figure, labeled</span></div>
    ${Object.entries(CLIPS).map(([group, list]) => `<h4>${group}</h4><div class="chips">${list.map((c) => `<span class="chip">${c}</span>`).join("")}</div>`).join("")}`,

  media: () => `
    <h2>Sound & Art</h2>
    <p class="lead">Nothing here is stock. Sounds, music, voices and pictures are made on request, in a shared style.</p>
    <h4>Style families: one square, nine ways, with a track and a sound each</h4>
    <div class="grid">${FAMILY_ART.map(([f, img, music, sfx]) => `<div class="card fam"><img class="art" src="${img}" alt="${f}"><h3><span class="dot" style="background:${(FAMILIES.find((x) => x[0] === f) ?? [0, "#999"])[1]}"></span>${f}</h3><div style="margin-top:8px">${play(music, "music")}${play(sfx, "sound")}</div></div>`).join("")}</div>
    <p class="meta"><a onclick="previewStop()" style="color:var(--accent);font-weight:600">■ stop the sample</a> <span id="nowplaying" style="color:var(--ink);font-weight:600"></span><br> · music and sounds are made fresh from a name the first time, so a first press can take a few seconds.</p>
    <h4>Tools</h4>
    <div class="grid">${TOOLS.map(([t, w]) => `<div class="card"><h3>${t}</h3><p>${w}</p></div>`).join("")}</div>`,

  engine: () => `
    <h2>Engine</h2>
    <p class="lead">What every world gets before a line of game code, area by area. Open one to read how it works and what it means for the game.</p>
    <div class="grid wide" style="margin-top:24px">${ENGINE_IDS.map((id) => { const d = ENGINE_DOCS[id]; return d ? `<a class="card link" ${go("engsec", id)}><span class="open">read →</span><h3>${d.title}</h3><p>${d.summary}</p></a>` : ""; }).join("")}</div>
    ${ENGINE_IDS.some((id) => !ENGINE_DOCS[id]) ? `<div class="grid wide" style="margin-top:16px">${ENGINE.map(([t, w]) => `<div class="card"><h3>${t}</h3><p>${w}</p></div>`).join("")}</div>` : ""}`,

  workshop: (st, ctx) => `
    <h2>Workshop</h2>
    <p class="lead">The bench behind every build: the tools that make the models, pictures, sounds, tests and helpers that go into a game. Open one to see how it works.</p>
    <div class="grid wide" style="margin-top:24px">${WORK_IDS.map((id) => { const d = WORK_DOCS[id]; return d ? `<a class="card link" ${go("work", id)}><span class="open">read →</span><h3>${d.title}</h3><p>${d.summary}</p></a>` : ""; }).join("")}</div>
    ${WORK_IDS.some((id) => !WORK_DOCS[id]) ? `<p class="meta" style="margin-top:16px">More workshop pages are being written. They appear here as they land.</p>` : ""}`,

  work: (st, ctx) => {
    const d = WORK_DOCS[st.doc];
    if (!d) return `<a class="back" ${go("workshop")}>← the workshop</a>${pending(ctx)}`;
    const i = WORK_IDS.indexOf(st.doc), next = WORK_IDS.slice(i + 1).find((x) => WORK_DOCS[x]);
    return `<a class="back" ${go("workshop")}>← the workshop</a><h2>${d.title}</h2><p class="lead">${d.summary}</p><div class="doc">${mdOnce("w:" + st.doc, d.md)}</div>${next ? `<p style="margin-top:20px"><a class="btn ghost" ${go("work", next)}>next: ${WORK_DOCS[next].title} →</a></p>` : ""}`;
  },

  engsec: (st, ctx) => {
    const d = ENGINE_DOCS[st.doc];
    if (!d) return `<a class="back" ${go("engine")}>← the engine</a>${pending(ctx)}`;
    const i = ENGINE_IDS.indexOf(st.doc), next = ENGINE_IDS.slice(i + 1).find((x) => ENGINE_DOCS[x]);
    return `<a class="back" ${go("engine")}>← the engine</a><h2>${d.title}</h2><p class="lead">${d.summary}</p><div class="doc">${mdOnce("e:" + st.doc, d.md)}</div>${next ? `<p style="margin-top:20px"><a class="btn ghost" ${go("engsec", next)}>next: ${ENGINE_DOCS[next].title} →</a></p>` : ""}`;
  },

  skill: (st, ctx) => {
    if (!SKILL_DOCS) return `<a class="back" ${go("skills")}>← all skills</a><h2>${st.doc ?? ""}</h2>${pending(ctx)}`;
    const id = SKILL_DOCS[st.doc] ? st.doc : "geometry";
    return `<a class="back" ${go("skills")}>← all skills</a><h2>${id}</h2><p>The full playbook, as written.</p><div class="doc">${mdOnce("s:" + id, SKILL_DOCS[id])}</div>`;
  },

  starter: (st, ctx) => {
    if (!STARTER_FILES) return `<a class="back" ${go("starters")}>← all starters</a><h2>${st.doc ?? ""}</h2>${pending(ctx)}`;
    const id = STARTER_FILES[st.doc] ? st.doc : "3d";
    const files = Object.keys(STARTER_FILES[id]);
    const file = files.includes(st.file) ? st.file : (files.find((f) => f === "scripts/player.js") ?? files[0]);
    const meta = STARTERS.find((x) => x[0] === id);
    return `<a class="back" ${go("starters")}>← all starters</a><h2>${meta ? meta[1] : id} <span class="code">${id}</span></h2>
      <p>${meta ? meta[2] : ""} ${files.length} files. Pick one to read it.</p>
      <div class="files">${files.map((f) => `<a class="${f === file ? "on" : ""}" ${go("starter", id, f)}>${f}</a>`).join("")}</div>
      <div class="doc" style="max-width:none"><h3 style="margin-bottom:12px">${file}</h3>${codeBlock(STARTER_FILES[id][file])}</div>`;
  },

  reference: (st, ctx) => `
    <h2>Engine reference</h2>
    <p class="lead">The full API: every object field, hook, verb and module, as the engine documents it.</p>
    ${API_DOC ? `<div class="doc">${mdOnce("api", API_DOC)}</div>` : pending(ctx)}`,

  shapes: () => `
    <h2>Object shapes</h2>
    <p class="lead">Every field each kind of thing takes, exactly as the engine types it. Open one to read it whole.</p>
    ${SHAPES ? `<div class="chips" style="margin-top:20px">${Object.keys(SHAPES).map((k) => `<a class="chip" ${go("shape", k)}>${k}</a>`).join("")}</div>` : `<p class="meta" style="margin-top:20px">The shape list is still being written. It appears here the moment it lands.</p>`}`,

  shape: (st, ctx) => {
    if (!SHAPES) return `<a class="back" ${go("shapes")}>← all shapes</a>${pending(ctx)}`;
    const id = SHAPES[st.doc] ? st.doc : Object.keys(SHAPES)[0];
    if (!id) return `<a class="back" ${go("shapes")}>← all shapes</a><p>Nothing here yet.</p>`;
    return `<a class="back" ${go("shapes")}>← all shapes</a><h2>${id}</h2><div class="doc">${mdOnce("t:" + id, SHAPES[id])}</div>`;
  },

  mods: () => `
    <h2>Mods</h2>
    <p class="lead">Shared kits other creators published: skills, systems and tools any world can install. Most-installed first.</p>
    <div class="grid wide" style="margin-top:24px">${MODS.map(([n, v, d, i, l]) => `<div class="card"><span class="code">${n}@${v}</span><p style="margin-top:6px">${d}</p><div class="meta">${i} installs · ${l} likes</div></div>`).join("")}</div>`,

  examples: () => `
    <h2>Games made on Jayzee</h2>
    <p class="lead">Real published games, by genre. Open one to play it and see what each kind of game looks like built here.</p>
    ${EXAMPLES.map(([g, rows]) => `<h4>${g}</h4><div class="grid wide">${rows.map(([addr, name, by, likes, blurb]) => `<a class="card link" onclick="openLink('https://jayzee.co/${addr}')"><span class="open">play →</span><h3>${name}</h3><p>${blurb}</p><div class="meta">by ${by} · ${likes} likes</div></a>`).join("")}</div>`).join("")}`,

  genres: () => `
    <h2>Pick a genre</h2>
    <p class="lead">Where this toolbox shines brightest, from the strongest fit down. Open one for its whole case: the loop, the starter, the skills and clips it uses, real games built that way, and what the first build would be.</p>
    ${GENRE_IDS.map(([tier, ids]) => `<h4>${tier}</h4><div class="grid wide">${ids.map((id) => { const d = GENRE_DOCS[id]; return d ? `<a class="card link" ${go("genre", id)}><span class="open">read →</span><h3>${d.title}</h3><p>${d.summary}</p></a>` : `<div class="card"><h3>${id.replace(/-/g, " ")}</h3><p>write-up coming</p></div>`; }).join("")}</div>`).join("")}
    <p style="margin-top:32px">Tell me which one pulls you and I'll start building it.</p>`,

  genre: (st, ctx) => {
    const d = GENRE_DOCS[st.doc];
    if (!d) return `<a class="back" ${go("genres")}>← all genres</a>${pending(ctx)}`;
    return `<a class="back" ${go("genres")}>← all genres</a><h2>${d.title}</h2><p class="lead">${d.summary}</p><div class="doc">${mdOnce("g:" + st.doc, d.md)}</div><p style="margin-top:20px">Want this one? Tell me and I'll start building it.</p>`;
  },
};

export default function (ctx, player) {
  loadDocs();
  const st = player.state; const page = PAGES[st.page] ? st.page : "home"; const nav = ACTIVE[page] ?? page;
  return `${CSS}<div id="site" class="v-${page}-${st.doc ?? ""}">
    <header><div class="wrap">
      <a class="logo" ${go("home")}>tool<span>box</span></a>
      <nav>${LINKS.map(([id, label]) => `<a class="${id === nav ? "on" : ""}" ${go(id)}>${label}</a>`).join("")}</nav>
    </div></header>
    <main><div class="wrap" id="page-${page}-${st.doc ?? ""}-${st.file ?? ""}">${PAGES[page](st, ctx)}</div></main>
    <footer><div class="wrap">toolbox · everything this world can build with</div></footer>
  </div>`;
}
