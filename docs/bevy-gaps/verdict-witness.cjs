const fs = require('fs'); const cp = require('child_process');
const TSV = '/workspace/extra/docs/bevy-gaps/missing-recheck-2026-11-23.tsv';
const VER = '/workspace/extra/docs/bevy-gaps/verdicts-2026-11-25.tsv';
const src = (f) => cp.execSync('git show origin/main:' + f, { cwd: '/workspace/bevy', encoding: 'utf8', maxBuffer: 1 << 26 }).split('\n');
const bad = [];
const rows = fs.readFileSync(TSV, 'utf8').trim().split('\n').slice(1).map(l => l.split('\t'));
if (rows.length !== 269 || rows.some(c => c.length !== 16)) bad.push('shape');
for (const c of rows) for (const ref of c[3].split('; ')) { if (ref.startsWith('UNDOCUMENTED:')) continue; const m = ref.match(/^(wiki\/[^:]+):(\d+)$/); if (!m) { const d = ref.match(/^(docs\/[^:]+):(\d+)$/); if (d && fs.existsSync('/workspace/extra/' + d[1]) && +d[2] <= fs.readFileSync('/workspace/extra/' + d[1], 'utf8').split('\n').length) continue; bad.push('form ' + c[0] + ' ' + ref); continue; } const n = fs.readFileSync('/workspace/extra/' + m[1], 'utf8').split('\n').length; if (+m[2] > n) bad.push('range ' + c[0]); }
const ver = fs.readFileSync(VER, 'utf8').trim().split('\n').slice(1).map(l => l.split('\t'));
const pass = [];
for (const v of ver) { if (v[1] !== v[2]) bad.push(v[0] + ' status changed'); }
const judged = [['src/viewer_world.rs', 313, 'trim_start_matches'], ['src/planet_veg/gpu/cull.rs', 113, 'fn frustum_planes'], ['src/planet_lod/collider.rs', 184, 'RigidBody::Static'], ['src/planet_veg/context.rs', 98, 'anchor_height'], ['src/globe.rs', 496, 'Screenshot::primary_window'], ['src/planet_veg/grass.rs', 235, 'place_grass_chunk_sliced'], ['src/offscreen.rs', 141, 'pipeline_states'], ['src/globe.rs', 447, 'Tonemapping::None'], ['src/planet_veg/trees_render/budget.rs', 45, 'halvings_for'], ['src/planet_veg/grass.rs', 88, 'grass_rank'], ['src/planet_veg/species.rs', 82, 'texture_scale']];
for (const [f, n, t] of judged) { if ((src(f)[n - 1] || '').includes(t)) pass.push(f + ':' + n); else bad.push('judged ' + f + ':' + n + ' lacks ' + t); }
const s215 = cp.execSync("sed -n '66p' wiki/cleetus/featureset-part-3.md", { cwd: '/workspace/extra', encoding: 'utf8' });
if (!(s215.includes('boot(overrides)') && s215.includes('installGracefulShutdown'))) bad.push('gap-215 line');
const g = cp.execSync("grep -rn -c RoomOrchestrator wiki | awk -F: '{s+=$2} END{print s}'", { cwd: '/workspace/extra', encoding: 'utf8' }).trim();
if (+g < 3) bad.push('RoomOrchestrator grep count ' + g);
console.log(JSON.stringify({ rows: rows.length, judgedPass: pass.length, statusChanges: ver.filter(v => v[1] !== v[2]).length, wikiRoomOrchestratorMatches: +g, gap215Cite: 'featureset-part-3.md:66 boot(overrides) and installGracefulShutdown', bad }, null, 1));
if (bad.length) process.exit(1);
