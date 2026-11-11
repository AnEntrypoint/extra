
const SRC = "// Temporary probe: records the order the engine runs the hooks in. Removed after the probe.\nexport function onJayzee(ctx) { ctx.log('order:onJayzee'); }\nexport function update(ctx) { if (!ctx.self.state.seen) { ctx.self.state.seen = 1; ctx.log('order:update-first'); } }\nexport function onCollide(ctx, other) { ctx.log('order:onCollide ' + (other && other.id)); }\n";
const id = ctx.jayzee({ feetPosition: { x: 3, y: 2, z: 3 }, primitive: { kind: 'box', width: 0.3, height: 0.3, depth: 0.3 }, behavior: 'scripts/probe-hook-order.js', scripts: { 'scripts/probe-hook-order.js': SRC }, lifetime: 30 });
ctx.log('order:after-jayzee-return');
await ctx.sleep(0.6);
ctx.log('order:after-sleep-0.6s');
ctx.destroy(id);
ctx.log('order:after-destroy');
return { id, foundAfterDestroy: !!ctx.getObject(id) };
