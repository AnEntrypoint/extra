// A gallery figure: plays state.clip forever on its main channel (one-shot clips restart when they finish).
export function onJayzee(ctx) { play(ctx) }
function play(ctx) {
  const clip = ctx.self.state.clip
  if (clip) ctx.self.anim.main = { clip: `cdn/clip-${clip}.glb`, loop: true, weight: 1 }
}
export const updateSchedule = { every: { seconds: 0.5 } }
export function update(ctx) {
  const a = ctx.self.anim.main
  if (!a) return play(ctx)
  if (a.finished) { ctx.self.anim.main = null; play(ctx) }
}
