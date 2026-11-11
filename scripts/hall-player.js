// The hall's walk: the 3D starter's player.js (WASD along the camera's aim, jump, gravity, eased stride),
// plus the HUD's "site" action that crosses back to the page. Numbers in lib/data/hall-player.yml.
import PLAYER from './lib/data/hall-player.yml'

function walkOf(ctx) {
  return (ctx.self.session['hall-player.js'] ??= {})
}
const inHall = (ctx) => (ctx.self.place ?? 'hall') === 'hall'

export function onInput(ctx, input) {
  if (input.pressed.site) { ctx.cross(ctx.self, 'main'); return }
  if (!inHall(ctx)) return
  const facingSin = input.axes.aimYawSin ?? 0
  const facingCos = input.axes.aimYawCos ?? 1
  const moveX = input.axes.moveX ?? 0
  const moveZ = input.axes.moveZ ?? 0
  const mag = Math.hypot(moveX, moveZ)
  const nx = mag > 1 ? moveX / mag : moveX
  const nz = mag > 1 ? moveZ / mag : moveZ
  walkOf(ctx).moveIntent = {
    x: (facingCos * nx - facingSin * nz) * PLAYER.walkSpeed,
    z: -(facingSin * nx + facingCos * nz) * PLAYER.walkSpeed,
  }
  if (input.pressed.jump && ctx.self.grounded && !ctx.self.parent) {
    const v = ctx.self.velocity
    ctx.self.velocity = { x: v.x, y: PLAYER.jumpSpeed, z: v.z }
  }
}

export function update(ctx, dt) {
  // Out of the hall (the policy's onLeave missed): hand the body back to the site's nav alone.
  if (!inHall(ctx)) { ctx.self.behavior = ['scripts/player.js']; return }
  if (ctx.self.parent) return
  const v = ctx.self.velocity
  const intent = walkOf(ctx).moveIntent ?? { x: 0, z: 0 }
  const along = intent.x * v.x + intent.z * v.z > 0 || (v.x === 0 && v.z === 0 && (intent.x !== 0 || intent.z !== 0))
  const step = (along ? PLAYER.acceleration : PLAYER.deceleration) * dt
  const dx = intent.x - v.x
  const dz = intent.z - v.z
  const gap = Math.hypot(dx, dz)
  const k = gap > step ? step / gap : 1
  const vx = v.x + dx * k
  const vz = v.z + dz * k
  ctx.self.velocity = { x: vx, y: v.y + ctx.place.gravity.y * dt, z: vz }
  if (ctx.self.grounded && vx === 0 && vz === 0 && intent.x === 0 && intent.z === 0) ctx.sleep()
}
