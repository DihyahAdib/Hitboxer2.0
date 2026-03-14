

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export const universal = {
  "prerender": true,
  "ssr": false
};
export const universal_id = "src/routes/+layout.ts";
export const imports = ["_app/immutable/nodes/0.B1hDVTyd.js","_app/immutable/chunks/CDQQqgCD.js","_app/immutable/chunks/DDjwX8FY.js","_app/immutable/chunks/BgI4QsO0.js","_app/immutable/chunks/Bxq_C5f9.js","_app/immutable/chunks/o14MCbrj.js"];
export const stylesheets = ["_app/immutable/assets/0.BychrXIM.css"];
export const fonts = [];
