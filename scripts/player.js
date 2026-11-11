// The site's rules: a link sends "nav" with { page, doc?, file? }; the player's own state remembers where they are.
const PAGES = ["home", "starters", "starter", "skills", "skill", "motion", "media", "engine", "reference", "shapes", "shape", "mods", "examples", "genres", "genre", "engsec", "workshop", "work"];
export function onInput(ctx, input) {
  if (input.pressed.hall) { ctx.cross(ctx.self, "hall"); return; }
  if (input.pressed.sample) { // a style sample, heard by the presser alone; a new press replaces the last
    const clip = input.actionData.sample?.clip;
    if (ctx.self.session.sample != null) { ctx.emit("stopSound", { soundId: ctx.self.session.sample }); ctx.self.session.sample = null; }
    if (typeof clip === "string" && clip.startsWith("/cdn/moodboard-")) ctx.self.session.sample = ctx.emit("playSound", { clip, volume: 0.8 });
    return;
  }
  if (!input.pressed.nav) return;
  const a = input.actionData.nav ?? {};
  if (!PAGES.includes(a.page)) return;
  ctx.self.state.page = a.page;
  ctx.self.state.doc = typeof a.doc === "string" ? a.doc : null;
  ctx.self.state.file = typeof a.file === "string" ? a.file : null;
}
