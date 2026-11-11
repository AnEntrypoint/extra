// Shared emitters for the hall's scripted geometry: a face that winds itself outward, a bevelled box, a lathe.
export function face(ctx, a, b, c, d, n) {
  const ux = b[0] - a[0], uy = b[1] - a[1], uz = b[2] - a[2], vx = c[0] - a[0], vy = c[1] - a[1], vz = c[2] - a[2];
  const cx = uy * vz - uz * vy, cy = uz * vx - ux * vz, cz = ux * vy - uy * vx;
  if (cx * n[0] + cy * n[1] + cz * n[2] >= 0) ctx.quad(...a, ...b, ...c, ...d); else ctx.quad(...d, ...c, ...b, ...a);
}
export function box(ctx, x0, y0, z0, x1, y1, z1, bev = 0) {
  const b = Math.min(bev, (x1 - x0) / 3, (y1 - y0) / 3, (z1 - z0) / 3);
  const xa = x0 + b, xb = x1 - b, za = z0 + b, zb = z1 - b, yt = y1 - b;
  face(ctx, [xa, y1, zb], [xb, y1, zb], [xb, y1, za], [xa, y1, za], [0, 1, 0]);
  if (b > 0) {
    face(ctx, [xa, y1, zb], [xb, y1, zb], [x1 - 0, yt, z1], [x0, yt, z1], [0, 1, 1]);
    face(ctx, [xa, y1, za], [xb, y1, za], [x1, yt, z0], [x0, yt, z0], [0, 1, -1]);
    face(ctx, [xb, y1, za], [xb, y1, zb], [x1, yt, z1], [x1, yt, z0], [1, 1, 0]);
    face(ctx, [xa, y1, za], [xa, y1, zb], [x0, yt, z1], [x0, yt, z0], [-1, 1, 0]);
  }
  face(ctx, [x0, y0, z1], [x1, y0, z1], [x1, yt, z1], [x0, yt, z1], [0, 0, 1]);
  face(ctx, [x0, y0, z0], [x1, y0, z0], [x1, yt, z0], [x0, yt, z0], [0, 0, -1]);
  face(ctx, [x1, y0, z0], [x1, y0, z1], [x1, yt, z1], [x1, yt, z0], [1, 0, 0]);
  face(ctx, [x0, y0, z0], [x0, y0, z1], [x0, yt, z1], [x0, yt, z0], [-1, 0, 0]);
  face(ctx, [x0, y0, z0], [x1, y0, z0], [x1, y0, z1], [x0, y0, z1], [0, -1, 0]);
}
// prof: [[r, y], …] bottom to top; swept round (cx, cz); faces wind outward/upward.
export function lathe(ctx, cx, cy, cz, prof, seg = 32) {
  for (let i = 0; i < seg; i++) {
    const a0 = (i / seg) * Math.PI * 2, a1 = ((i + 1) / seg) * Math.PI * 2;
    const c0 = Math.cos(a0), s0 = Math.sin(a0), c1 = Math.cos(a1), s1 = Math.sin(a1);
    for (let j = 0; j < prof.length - 1; j++) {
      const [r0, y0] = prof[j], [r1, y1] = prof[j + 1];
      const p = (r, y, c, s) => [cx + r * c, cy + y, cz + r * s];
      const mc = Math.cos((a0 + a1) / 2), ms = Math.sin((a0 + a1) / 2);
      const dr = r1 - r0, dy = y1 - y0;
      const n = [mc * dy, -dr, ms * dy];
      if (Math.abs(dy) < 1e-6 && r0 === 0 && r1 === 0) continue;
      if (r0 === 0) ctx.tri(...p(0, y0, 1, 0), ...p(r1, y1, c0, s0), ...p(r1, y1, c1, s1));
      else face(ctx, p(r0, y0, c0, s0), p(r0, y0, c1, s1), p(r1, y1, c1, s1), p(r1, y1, c0, s0), Math.hypot(...n) < 1e-9 ? [0, 1, 0] : n);
    }
  }
}
