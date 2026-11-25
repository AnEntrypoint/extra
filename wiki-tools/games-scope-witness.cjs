const fs = require('fs');
const path = require('path');
const ROOT = '/workspace/extra';
const DIR = path.join(ROOT, 'wiki-tools/recapture/games');
const GAMES = path.join(ROOT, 'wiki/reference-game-16/games');
const SECTION = path.join(ROOT, 'wiki-site/reference-game-16/recapture-games.html');
const pad = (n) => String(n).padStart(3, '0');
const bad = [];
const cardsFile = JSON.parse(fs.readFileSync(path.join(DIR, 'cards.json'), 'utf8'));
const cards = cardsFile.cards;
const manifest = JSON.parse(fs.readFileSync(path.join(DIR, 'manifest.json'), 'utf8'));
const html = fs.readFileSync(SECTION, 'utf8');
const N = 52;
if (cards.length !== N) bad.push('cards array has ' + cards.length + ', expected ' + N);
if (cardsFile.count !== N) bad.push('cards.json count is ' + cardsFile.count + ', expected ' + N);
if (manifest.cardsInSection !== N) bad.push('manifest cardsInSection is ' + manifest.cardsInSection + ', expected ' + N);
if (manifest.planned !== N) bad.push('manifest planned is ' + manifest.planned + ', expected ' + N);
if (!html.includes('the ' + N + ' game pages in the Games section')) bad.push('section heading no longer states ' + N);
if (!html.includes('Host page: Untitled game (@lanmower/game-16)')) bad.push('the nav host link is no longer the only game-16 href outside the cards');
if (cards.some(c => c.href === 'https://www.spawn.co/@lanmower/game-16')) bad.push('the host link is listed as a card');
const jsonFiles = fs.readdirSync(DIR).filter(f => /^\d+\.json$/.test(f));
if (jsonFiles.length !== N) bad.push('capture json files ' + jsonFiles.length + ', expected ' + N);
const mdFiles = fs.readdirSync(GAMES).filter(f => /^\d+-.*\.md$/.test(f));
if (mdFiles.length !== N) bad.push('game pages ' + mdFiles.length + ', expected ' + N);
let jsonOk = 0, mdOk = 0;
for (const c of cards) {
  const j = pad(c.n) + '.json';
  if (!fs.existsSync(path.join(DIR, j))) { bad.push('missing capture ' + j); continue; }
  const d = JSON.parse(fs.readFileSync(path.join(DIR, j), 'utf8'));
  if (d.url !== c.href) bad.push(j + ' url differs from the card'); else if (d.status !== 200 || d.error) bad.push(j + ' status ' + d.status + ' error ' + d.error); else jsonOk++;
  const md = mdFiles.filter(f => f.startsWith(pad(c.n) + '-'));
  if (md.length !== 1) bad.push('game page for card ' + c.n + ' count ' + md.length);
  else if (!fs.readFileSync(path.join(GAMES, md[0]), 'utf8').includes(c.href)) bad.push(md[0] + ' does not name its card address');
  else mdOk++;
}
console.log(JSON.stringify({ cards: cards.length, cardsFileCount: cardsFile.count, manifestCardsInSection: manifest.cardsInSection, captures: jsonFiles.length, capturesOk: jsonOk, gamePages: mdFiles.length, gamePagesOk: mdOk, bad }, null, 1));
process.exit(bad.length ? 1 : 0);
