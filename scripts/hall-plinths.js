// Every figure's round plinth (and a stool where a clip sits) as ONE mesh: params.slots = [[x, z, stool], …].
import { lathe, box } from './lib/hall-geo.js'
export const PLINTH_H = 0.12
export function geometry(ctx) {
  const slots = ctx.params.slots ?? [], seg = ctx.lod <= 2 ? 40 : 14
  ctx.smooth()
  for (const [x, z, stool] of slots) {
    ctx.color('oklch(0.97 0.006 240)'); ctx.roughness(0.45)
    lathe(ctx, x, 0, z, [[0.62, 0], [0.62, 0.08], [0.6, 0.11], [0.57, PLINTH_H], [0, PLINTH_H]], seg)
    ctx.color('oklch(0.62 0.08 235)'); ctx.roughness(0.3)
    lathe(ctx, x, 0, z, [[0.625, 0.03], [0.625, 0.05]], seg)
    if (stool) {
      ctx.color('oklch(0.42 0.06 240)'); ctx.roughness(0.5)
      lathe(ctx, x, PLINTH_H, z - 0.08, [[0.05, 0], [0.05, 0.38], [0.2, 0.40], [0.21, 0.46], [0.19, 0.48], [0, 0.48]], ctx.lod <= 2 ? 24 : 10)
    }
  }
  ctx.flat()
}
export function collider(ctx) {
  return (ctx.params.slots ?? []).map(([x, z]) => ({ kind: 'cylinder', radiusTop: 0.6, radiusBottom: 0.62, height: PLINTH_H, center: [x, PLINTH_H / 2, z] }))
}
