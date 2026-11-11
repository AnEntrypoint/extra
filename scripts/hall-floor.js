// The Animation Hall's studio: a pale bevelled floor (70 × 30 m) with a soft metre grid, a low back wall,
// and two lighting trusses on end posts with warm lamp cans. Origin = the floor's top centre.
import { box, lathe, face } from './lib/hall-geo.js'
const W = 70, D = 30, T = 0.3, WALL_H = 1.4, TRUSS_Y = 6.2
export const TRUSS_Z = [0.1, -7.5]
export function geometry(ctx) {
  const hw = W / 2, hd = D / 2, lod = ctx.lod
  // floor slab
  ctx.albedo('cdn/texture-polished-concrete-floor.png'); ctx.color('oklch(0.98 0.004 240)'); ctx.roughness(0.55)
  box(ctx, -hw, -T, -hd, hw, 0, hd, 0.06)
  ctx.albedo(null)
  // grid: minor every metre, major every 5
  if (lod <= 2) {
    for (let x = -hw + 1; x < hw; x++) {
      const major = x % 5 === 0, w = major ? 0.025 : 0.012, y = major ? 0.004 : 0.003
      ctx.color(major ? 'oklch(0.80 0.02 235)' : 'oklch(0.88 0.012 235)')
      face(ctx, [x - w, y, hd - 0.1], [x + w, y, hd - 0.1], [x + w, y, -hd + 0.5], [x - w, y, -hd + 0.5], [0, 1, 0])
    }
    for (let z = -hd + 1; z < hd; z++) {
      const major = z % 5 === 0, w = major ? 0.025 : 0.012, y = major ? 0.0045 : 0.0035
      ctx.color(major ? 'oklch(0.80 0.02 235)' : 'oklch(0.88 0.012 235)')
      face(ctx, [-hw + 0.1, y, z + w], [hw - 0.1, y, z + w], [hw - 0.1, y, z - w], [-hw + 0.1, y, z - w], [0, 1, 0])
    }
  }
  // low back wall with a cap and a cove strip
  ctx.albedo('cdn/texture-white-plaster.png'); ctx.color('oklch(0.97 0.01 230)'); ctx.roughness(0.8)
  box(ctx, -hw, 0, -hd, hw, WALL_H, -hd + 0.35, 0.02)
  ctx.albedo(null); ctx.color('oklch(0.42 0.06 240)'); ctx.roughness(0.4)
  box(ctx, -hw - 0.03, WALL_H, -hd - 0.03, hw + 0.03, WALL_H + 0.08, -hd + 0.4, 0.02)
  if (lod <= 2) { ctx.color('oklch(0.62 0.08 235)'); box(ctx, -hw, 0, -hd + 0.35, hw, 0.12, -hd + 0.38, 0) }
  // trusses: posts at the ends, a beam across, lamp cans hanging
  for (const z of TRUSS_Z) {
    ctx.color('oklch(0.30 0.02 250)'); ctx.metalness(0.6); ctx.roughness(0.35)
    for (const x of [-hw + 0.6, hw - 0.6]) {
      box(ctx, x - 0.25, 0, z - 0.25, x + 0.25, 0.08, z + 0.25, 0.02)
      box(ctx, x - 0.09, 0.08, z - 0.09, x + 0.09, TRUSS_Y + 0.4, z + 0.09, 0.02)
    }
    box(ctx, -hw + 0.4, TRUSS_Y + 0.25, z - 0.18, hw - 0.4, TRUSS_Y + 0.31, z + 0.18, 0.01)
    box(ctx, -hw + 0.4, TRUSS_Y - 0.05, z - 0.18, hw - 0.4, TRUSS_Y + 0.01, z + 0.18, 0.01)
    if (lod <= 2) for (let x = -hw + 1; x < hw - 0.6; x += 1.2) {
      box(ctx, x - 0.02, TRUSS_Y, z - 0.16, x + 0.02, TRUSS_Y + 0.26, z - 0.12, 0)
      box(ctx, x - 0.02, TRUSS_Y, z + 0.12, x + 0.02, TRUSS_Y + 0.26, z + 0.16, 0)
    }
    for (let x = -hw + 4; x <= hw - 4; x += 6.2) {
      ctx.color('oklch(0.94 0.01 90)'); ctx.metalness(0.2); ctx.roughness(0.3)
      box(ctx, x - 0.02, TRUSS_Y - 0.3, z - 0.02, x + 0.02, TRUSS_Y - 0.05, z + 0.02, 0)
      lathe(ctx, x, TRUSS_Y - 0.72, z, [[0.17, 0.02], [0.2, 0.06], [0.2, 0.36], [0.12, 0.44], [0, 0.44]], lod <= 2 ? 20 : 8)
      ctx.emissive('oklch(1.0 0.06 80)'); ctx.color('oklch(0.98 0.03 85)')
      lathe(ctx, x, TRUSS_Y - 0.72, z, [[0, 0.02], [0.17, 0.02]].reverse().map(([r, y]) => [r, y]), lod <= 2 ? 20 : 8)
      ctx.emissive(null)
    }
    ctx.metalness(null)
  }
}
export function collider() {
  const hw = W / 2, hd = D / 2
  return [
    { kind: 'box', width: W, height: T, depth: D, center: [0, -T / 2, 0] },
    { kind: 'box', width: W, height: WALL_H + 0.08, depth: 0.4, center: [0, (WALL_H + 0.08) / 2, -hd + 0.2] },
    ...TRUSS_Z.flatMap((z) => [-hw + 0.6, hw - 0.6].map((x) => ({ kind: 'box', width: 0.2, height: TRUSS_Y, depth: 0.2, center: [x, TRUSS_Y / 2, z] }))),
  ]
}
