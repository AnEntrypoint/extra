// The Animation Hall's door policy: the site is a body-less page, so a player crossing in is dressed here
// with the 3D starter's walk (hall-locomotion + hall-player); crossing out strips it back to the site's nav.
const HALL_BEHAVIOR = ["scripts/hall-locomotion.js", "scripts/player.js", "scripts/hall-player.js"];
export function onArrive(ctx, entity) {
  if (!entity || !(entity.tags ?? []).includes("player")) return;
  entity.physics = { body: "character" };
  entity.model = "/cdn/neutral-default-avatar.glb";
  entity.behavior = HALL_BEHAVIOR;
  entity.velocity = { x: 0, y: 0, z: 0 };
}
export function onLeave(ctx, entity) {
  if (!entity || !(entity.tags ?? []).includes("player")) return;
  entity.behavior = ["scripts/player.js"];
  entity.physics = "none";
  entity.model = null;
  entity.velocity = { x: 0, y: 0, z: 0 };
}
