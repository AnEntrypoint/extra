// The hall's third-person orbit on the engine's look contract (orientation.source "look", pointerLock):
// the engine integrates the mouse and casts the arm against walls; this rig sets the arm and pivot,
// lets the wheel zoom, and keeps its own row honest (eye behind the look) for everything that reads it.
import CAM from './lib/data/hall-camera.yml'

export function onInput(ctx, input) {
  const z = input.axes.zoomIn ?? 0
  if (!z) return
  const s = ctx.self.state
  s.desiredDist = Math.min(CAM.maxDistance, Math.max(CAM.minDistance, (s.desiredDist ?? CAM.distance) - z * CAM.zoomSpeed))
}

export function update(ctx, dt) {
  ctx.self.hideLocalPlayer = false
  const s = ctx.self.state
  s.desiredDist ??= CAM.distance
  s.heightOffset = CAM.heightOffset
  s.lookOffsetY = CAM.lookOffsetY
  const t = ctx.self.target
  if (!t) return
  const v = ctx.self.view
  const yaw = v ? v.yaw : 0, pitch = v ? v.pitch : -0.25, cp = Math.cos(pitch), d = s.desiredDist, f = t.feetPosition
  ctx.self.feetPosition = { x: f.x + Math.sin(yaw) * cp * d, y: f.y + CAM.heightOffset - Math.sin(pitch) * d, z: f.z + Math.cos(yaw) * cp * d }
  ctx.self.rotation = { lookAt: { x: f.x, y: f.y + CAM.lookOffsetY, z: f.z }, include: ['yaw', 'pitch'] }
}
