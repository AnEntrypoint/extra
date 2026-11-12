const KEEP_AFTER = '(?![\\/\\-\\w]|\\.(?:co|io|js|ts|json|txt|webp|png|jpg|mp4|glb)\\b)';
const KEEP_BEFORE = '(?<![@.\\/\\-\\w])';
const RENAME = [
  [/Spawn-native/g, 'Jayzee-native'],
  [new RegExp(`${KEEP_BEFORE}Savi${KEEP_AFTER}`, 'g'), 'Cleetus'],
  [new RegExp(`${KEEP_BEFORE}savi${KEEP_AFTER}`, 'g'), 'cleetus'],
  [new RegExp(`${KEEP_BEFORE}Spawn${KEEP_AFTER}(?! client)`, 'g'), 'Jayzee'],
  [new RegExp(`${KEEP_BEFORE}spawn${KEEP_AFTER}(?! client)`, 'g'), 'jayzee'],
];

const rename = (s) => RENAME.reduce((t, [re, to]) => t.replace(re, to), s);

export { rename };
