// This is your game's look: the whole-screen pass between the rendered world and the
// player's eyes. Out of the box it changes nothing, so the frame shows the place's tone map:
// ACES filmic unless `toneMapping` beside this script in the place's look says "neutral",
// or "none" for art in its exact painted colours.
// Edit a number here and the game updates live.
// The pass is mode-agnostic: a game converted to 2D keeps this script working unchanged.
//
// The whole vocabulary: color grades, vignettes, film grain, retro pixelation, depth of
// field, scanlines: lives in the "looks" skill. Start by uncommenting a line below.
import { grade, vignette, grain } from 'builtin/postfx';

export function look(ctx) {
  // Bloom is the engine's: with nothing written, emissive things get a faint halo. Bloom stays
  // unwritten until the creator asks for glow. An asked glow is bloomStrength 0.4–0.8 in the
  // place's look.params.
  let c = ctx.scene;
  // Uncomment to start grading: a touch warmer, a little more contrast:
  // c = grade(c, { exposure: 1.0, saturation: 1.05, contrast: 1.05, temperature: 0.05 });
  // Uncomment to darken the edges of the frame:
  // c = vignette(c, ctx.param('vignette', 0.2), { color: [0.02, 0.02, 0.05] });
  // Uncomment for a faint film grain:
  // c = grain(c, 0.04);
  return c;
}
