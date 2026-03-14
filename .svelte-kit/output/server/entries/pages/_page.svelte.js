import { y as sanitize_props, z as rest_props, F as attributes, G as clsx, w as ensure_array_like, J as element, K as slot, N as bind_props, O as spread_props, P as attr, x as attr_class, Q as attr_style, T as stringify, V as head } from "../../chunks/index.js";
import { l as ssr_context, m as fallback, k as escape_html } from "../../chunks/context.js";
import "clsx";
function onDestroy(fn) {
  /** @type {SSRContext} */
  ssr_context.r.on_destroy(fn);
}
const defaultAttributes = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": 2,
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
};
function Icon($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, [
    "name",
    "color",
    "size",
    "strokeWidth",
    "absoluteStrokeWidth",
    "iconNode"
  ]);
  $$renderer.component(($$renderer2) => {
    let name = fallback($$props["name"], void 0);
    let color = fallback($$props["color"], "currentColor");
    let size = fallback($$props["size"], 24);
    let strokeWidth = fallback($$props["strokeWidth"], 2);
    let absoluteStrokeWidth = fallback($$props["absoluteStrokeWidth"], false);
    let iconNode = fallback($$props["iconNode"], () => [], true);
    const mergeClasses = (...classes) => classes.filter((className, index, array) => {
      return Boolean(className) && array.indexOf(className) === index;
    }).join(" ");
    $$renderer2.push(`<svg${attributes(
      {
        ...defaultAttributes,
        ...$$restProps,
        width: size,
        height: size,
        stroke: color,
        "stroke-width": absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
        class: clsx(mergeClasses("lucide-icon", "lucide", name ? `lucide-${name}` : "", $$sanitized_props.class))
      },
      void 0,
      void 0,
      void 0,
      3
    )}><!--[-->`);
    const each_array = ensure_array_like(iconNode);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let [tag, attrs] = each_array[$$index];
      element($$renderer2, tag, () => {
        $$renderer2.push(`${attributes({ ...attrs }, void 0, void 0, void 0, 3)}`);
      });
    }
    $$renderer2.push(`<!--]--><!--[-->`);
    slot($$renderer2, $$props, "default", {});
    $$renderer2.push(`<!--]--></svg>`);
    bind_props($$props, {
      name,
      color,
      size,
      strokeWidth,
      absoluteStrokeWidth,
      iconNode
    });
  });
}
function Copy_plus($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    ["line", { "x1": "15", "x2": "15", "y1": "12", "y2": "18" }],
    ["line", { "x1": "12", "x2": "18", "y1": "15", "y2": "15" }],
    [
      "rect",
      {
        "width": "14",
        "height": "14",
        "x": "8",
        "y": "8",
        "rx": "2",
        "ry": "2"
      }
    ],
    [
      "path",
      {
        "d": "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"
      }
    ]
  ];
  Icon($$renderer, spread_props([
    { name: "copy-plus" },
    $$sanitized_props,
    {
      /**
       * @component @name CopyPlus
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8bGluZSB4MT0iMTUiIHgyPSIxNSIgeTE9IjEyIiB5Mj0iMTgiIC8+CiAgPGxpbmUgeDE9IjEyIiB4Mj0iMTgiIHkxPSIxNSIgeTI9IjE1IiAvPgogIDxyZWN0IHdpZHRoPSIxNCIgaGVpZ2h0PSIxNCIgeD0iOCIgeT0iOCIgcng9IjIiIHJ5PSIyIiAvPgogIDxwYXRoIGQ9Ik00IDE2Yy0xLjEgMC0yLS45LTItMlY0YzAtMS4xLjktMiAyLTJoMTBjMS4xIDAgMiAuOSAyIDIiIC8+Cjwvc3ZnPgo=) - https://lucide.dev/icons/copy-plus
       * @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
       *
       * @param {Object} props - Lucide icons props and any valid SVG attribute
       * @returns {FunctionalComponent} Svelte component
       *
       */
      iconNode,
      children: ($$renderer2) => {
        $$renderer2.push(`<!--[-->`);
        slot($$renderer2, $$props, "default", {});
        $$renderer2.push(`<!--]-->`);
      },
      $$slots: { default: true }
    }
  ]));
}
function Flip_horizontal($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    ["path", { "d": "M8 3H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h3" }],
    ["path", { "d": "M16 3h3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-3" }],
    ["path", { "d": "M12 20v2" }],
    ["path", { "d": "M12 14v2" }],
    ["path", { "d": "M12 8v2" }],
    ["path", { "d": "M12 2v2" }]
  ];
  Icon($$renderer, spread_props([
    { name: "flip-horizontal" },
    $$sanitized_props,
    {
      /**
       * @component @name FlipHorizontal
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNOCAzSDVhMiAyIDAgMCAwLTIgMnYxNGMwIDEuMS45IDIgMiAyaDMiIC8+CiAgPHBhdGggZD0iTTE2IDNoM2EyIDIgMCAwIDEgMiAydjE0YTIgMiAwIDAgMS0yIDJoLTMiIC8+CiAgPHBhdGggZD0iTTEyIDIwdjIiIC8+CiAgPHBhdGggZD0iTTEyIDE0djIiIC8+CiAgPHBhdGggZD0iTTEyIDh2MiIgLz4KICA8cGF0aCBkPSJNMTIgMnYyIiAvPgo8L3N2Zz4K) - https://lucide.dev/icons/flip-horizontal
       * @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
       *
       * @param {Object} props - Lucide icons props and any valid SVG attribute
       * @returns {FunctionalComponent} Svelte component
       *
       */
      iconNode,
      children: ($$renderer2) => {
        $$renderer2.push(`<!--[-->`);
        slot($$renderer2, $$props, "default", {});
        $$renderer2.push(`<!--]-->`);
      },
      $$slots: { default: true }
    }
  ]));
}
function Flip_vertical($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    ["path", { "d": "M21 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v3" }],
    ["path", { "d": "M21 16v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3" }],
    ["path", { "d": "M4 12H2" }],
    ["path", { "d": "M10 12H8" }],
    ["path", { "d": "M16 12h-2" }],
    ["path", { "d": "M22 12h-2" }]
  ];
  Icon($$renderer, spread_props([
    { name: "flip-vertical" },
    $$sanitized_props,
    {
      /**
       * @component @name FlipVertical
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMjEgOFY1YTIgMiAwIDAgMC0yLTJINWEyIDIgMCAwIDAtMiAydjMiIC8+CiAgPHBhdGggZD0iTTIxIDE2djNhMiAyIDAgMCAxLTIgMkg1YTIgMiAwIDAgMS0yLTJ2LTMiIC8+CiAgPHBhdGggZD0iTTQgMTJIMiIgLz4KICA8cGF0aCBkPSJNMTAgMTJIOCIgLz4KICA8cGF0aCBkPSJNMTYgMTJoLTIiIC8+CiAgPHBhdGggZD0iTTIyIDEyaC0yIiAvPgo8L3N2Zz4K) - https://lucide.dev/icons/flip-vertical
       * @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
       *
       * @param {Object} props - Lucide icons props and any valid SVG attribute
       * @returns {FunctionalComponent} Svelte component
       *
       */
      iconNode,
      children: ($$renderer2) => {
        $$renderer2.push(`<!--[-->`);
        slot($$renderer2, $$props, "default", {});
        $$renderer2.push(`<!--]-->`);
      },
      $$slots: { default: true }
    }
  ]));
}
function Folder_check($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    [
      "path",
      {
        "d": "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"
      }
    ],
    ["path", { "d": "m9 13 2 2 4-4" }]
  ];
  Icon($$renderer, spread_props([
    { name: "folder-check" },
    $$sanitized_props,
    {
      /**
       * @component @name FolderCheck
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMjAgMjBhMiAyIDAgMCAwIDItMlY4YTIgMiAwIDAgMC0yLTJoLTcuOWEyIDIgMCAwIDEtMS42OS0uOUw5LjYgMy45QTIgMiAwIDAgMCA3LjkzIDNINGEyIDIgMCAwIDAtMiAydjEzYTIgMiAwIDAgMCAyIDJaIiAvPgogIDxwYXRoIGQ9Im05IDEzIDIgMiA0LTQiIC8+Cjwvc3ZnPgo=) - https://lucide.dev/icons/folder-check
       * @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
       *
       * @param {Object} props - Lucide icons props and any valid SVG attribute
       * @returns {FunctionalComponent} Svelte component
       *
       */
      iconNode,
      children: ($$renderer2) => {
        $$renderer2.push(`<!--[-->`);
        slot($$renderer2, $$props, "default", {});
        $$renderer2.push(`<!--]-->`);
      },
      $$slots: { default: true }
    }
  ]));
}
function Frame($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    ["line", { "x1": "22", "x2": "2", "y1": "6", "y2": "6" }],
    ["line", { "x1": "22", "x2": "2", "y1": "18", "y2": "18" }],
    ["line", { "x1": "6", "x2": "6", "y1": "2", "y2": "22" }],
    ["line", { "x1": "18", "x2": "18", "y1": "2", "y2": "22" }]
  ];
  Icon($$renderer, spread_props([
    { name: "frame" },
    $$sanitized_props,
    {
      /**
       * @component @name Frame
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8bGluZSB4MT0iMjIiIHgyPSIyIiB5MT0iNiIgeTI9IjYiIC8+CiAgPGxpbmUgeDE9IjIyIiB4Mj0iMiIgeTE9IjE4IiB5Mj0iMTgiIC8+CiAgPGxpbmUgeDE9IjYiIHgyPSI2IiB5MT0iMiIgeTI9IjIyIiAvPgogIDxsaW5lIHgxPSIxOCIgeDI9IjE4IiB5MT0iMiIgeTI9IjIyIiAvPgo8L3N2Zz4K) - https://lucide.dev/icons/frame
       * @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
       *
       * @param {Object} props - Lucide icons props and any valid SVG attribute
       * @returns {FunctionalComponent} Svelte component
       *
       */
      iconNode,
      children: ($$renderer2) => {
        $$renderer2.push(`<!--[-->`);
        slot($$renderer2, $$props, "default", {});
        $$renderer2.push(`<!--]-->`);
      },
      $$slots: { default: true }
    }
  ]));
}
function Github($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    [
      "path",
      {
        "d": "M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"
      }
    ],
    ["path", { "d": "M9 18c-4.51 2-5-2-7-2" }]
  ];
  Icon($$renderer, spread_props([
    { name: "github" },
    $$sanitized_props,
    {
      /**
       * @component @name Github
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMTUgMjJ2LTRhNC44IDQuOCAwIDAgMC0xLTMuNWMzIDAgNi0yIDYtNS41LjA4LTEuMjUtLjI3LTIuNDgtMS0zLjUuMjgtMS4xNS4yOC0yLjM1IDAtMy41IDAgMC0xIDAtMyAxLjUtMi42NC0uNS01LjM2LS41LTggMEM2IDIgNSAyIDUgMmMtLjMgMS4xNS0uMyAyLjM1IDAgMy41QTUuNDAzIDUuNDAzIDAgMCAwIDQgOWMwIDMuNSAzIDUuNSA2IDUuNS0uMzkuNDktLjY4IDEuMDUtLjg1IDEuNjUtLjE3LjYtLjIyIDEuMjMtLjE1IDEuODV2NCIgLz4KICA8cGF0aCBkPSJNOSAxOGMtNC41MSAyLTUtMi03LTIiIC8+Cjwvc3ZnPgo=) - https://lucide.dev/icons/github
       * @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
       *
       * @param {Object} props - Lucide icons props and any valid SVG attribute
       * @returns {FunctionalComponent} Svelte component
       * @deprecated Brand icons have been deprecated and are due to be removed, please refer to https://github.com/lucide-icons/lucide/issues/670. We recommend using https://simpleicons.org/?q=github instead. This icon will be removed in v1.0
       */
      iconNode,
      children: ($$renderer2) => {
        $$renderer2.push(`<!--[-->`);
        slot($$renderer2, $$props, "default", {});
        $$renderer2.push(`<!--]-->`);
      },
      $$slots: { default: true }
    }
  ]));
}
function Grid_3x3($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    [
      "rect",
      { "width": "18", "height": "18", "x": "3", "y": "3", "rx": "2" }
    ],
    ["path", { "d": "M3 9h18" }],
    ["path", { "d": "M3 15h18" }],
    ["path", { "d": "M9 3v18" }],
    ["path", { "d": "M15 3v18" }]
  ];
  Icon($$renderer, spread_props([
    { name: "grid-3x3" },
    $$sanitized_props,
    {
      /**
       * @component @name Grid3x3
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cmVjdCB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHg9IjMiIHk9IjMiIHJ4PSIyIiAvPgogIDxwYXRoIGQ9Ik0zIDloMTgiIC8+CiAgPHBhdGggZD0iTTMgMTVoMTgiIC8+CiAgPHBhdGggZD0iTTkgM3YxOCIgLz4KICA8cGF0aCBkPSJNMTUgM3YxOCIgLz4KPC9zdmc+Cg==) - https://lucide.dev/icons/grid-3x3
       * @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
       *
       * @param {Object} props - Lucide icons props and any valid SVG attribute
       * @returns {FunctionalComponent} Svelte component
       *
       */
      iconNode,
      children: ($$renderer2) => {
        $$renderer2.push(`<!--[-->`);
        slot($$renderer2, $$props, "default", {});
        $$renderer2.push(`<!--]-->`);
      },
      $$slots: { default: true }
    }
  ]));
}
function Image($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    [
      "rect",
      {
        "width": "18",
        "height": "18",
        "x": "3",
        "y": "3",
        "rx": "2",
        "ry": "2"
      }
    ],
    ["circle", { "cx": "9", "cy": "9", "r": "2" }],
    ["path", { "d": "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" }]
  ];
  Icon($$renderer, spread_props([
    { name: "image" },
    $$sanitized_props,
    {
      /**
       * @component @name Image
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cmVjdCB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHg9IjMiIHk9IjMiIHJ4PSIyIiByeT0iMiIgLz4KICA8Y2lyY2xlIGN4PSI5IiBjeT0iOSIgcj0iMiIgLz4KICA8cGF0aCBkPSJtMjEgMTUtMy4wODYtMy4wODZhMiAyIDAgMCAwLTIuODI4IDBMNiAyMSIgLz4KPC9zdmc+Cg==) - https://lucide.dev/icons/image
       * @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
       *
       * @param {Object} props - Lucide icons props and any valid SVG attribute
       * @returns {FunctionalComponent} Svelte component
       *
       */
      iconNode,
      children: ($$renderer2) => {
        $$renderer2.push(`<!--[-->`);
        slot($$renderer2, $$props, "default", {});
        $$renderer2.push(`<!--]-->`);
      },
      $$slots: { default: true }
    }
  ]));
}
function Link_2_off($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    ["path", { "d": "M9 17H7A5 5 0 0 1 7 7" }],
    ["path", { "d": "M15 7h2a5 5 0 0 1 4 8" }],
    ["line", { "x1": "8", "x2": "12", "y1": "12", "y2": "12" }],
    ["line", { "x1": "2", "x2": "22", "y1": "2", "y2": "22" }]
  ];
  Icon($$renderer, spread_props([
    { name: "link-2-off" },
    $$sanitized_props,
    {
      /**
       * @component @name Link2Off
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNOSAxN0g3QTUgNSAwIDAgMSA3IDciIC8+CiAgPHBhdGggZD0iTTE1IDdoMmE1IDUgMCAwIDEgNCA4IiAvPgogIDxsaW5lIHgxPSI4IiB4Mj0iMTIiIHkxPSIxMiIgeTI9IjEyIiAvPgogIDxsaW5lIHgxPSIyIiB4Mj0iMjIiIHkxPSIyIiB5Mj0iMjIiIC8+Cjwvc3ZnPgo=) - https://lucide.dev/icons/link-2-off
       * @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
       *
       * @param {Object} props - Lucide icons props and any valid SVG attribute
       * @returns {FunctionalComponent} Svelte component
       *
       */
      iconNode,
      children: ($$renderer2) => {
        $$renderer2.push(`<!--[-->`);
        slot($$renderer2, $$props, "default", {});
        $$renderer2.push(`<!--]-->`);
      },
      $$slots: { default: true }
    }
  ]));
}
function Linkedin($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    [
      "path",
      {
        "d": "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"
      }
    ],
    ["rect", { "width": "4", "height": "12", "x": "2", "y": "9" }],
    ["circle", { "cx": "4", "cy": "4", "r": "2" }]
  ];
  Icon($$renderer, spread_props([
    { name: "linkedin" },
    $$sanitized_props,
    {
      /**
       * @component @name Linkedin
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMTYgOGE2IDYgMCAwIDEgNiA2djdoLTR2LTdhMiAyIDAgMCAwLTItMiAyIDIgMCAwIDAtMiAydjdoLTR2LTdhNiA2IDAgMCAxIDYtNnoiIC8+CiAgPHJlY3Qgd2lkdGg9IjQiIGhlaWdodD0iMTIiIHg9IjIiIHk9IjkiIC8+CiAgPGNpcmNsZSBjeD0iNCIgY3k9IjQiIHI9IjIiIC8+Cjwvc3ZnPgo=) - https://lucide.dev/icons/linkedin
       * @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
       *
       * @param {Object} props - Lucide icons props and any valid SVG attribute
       * @returns {FunctionalComponent} Svelte component
       * @deprecated Brand icons have been deprecated and are due to be removed, please refer to https://github.com/lucide-icons/lucide/issues/670. We recommend using https://simpleicons.org/?q=linkedin instead. This icon will be removed in v1.0
       */
      iconNode,
      children: ($$renderer2) => {
        $$renderer2.push(`<!--[-->`);
        slot($$renderer2, $$props, "default", {});
        $$renderer2.push(`<!--]-->`);
      },
      $$slots: { default: true }
    }
  ]));
}
function Move_left($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    ["path", { "d": "M6 8L2 12L6 16" }],
    ["path", { "d": "M2 12H22" }]
  ];
  Icon($$renderer, spread_props([
    { name: "move-left" },
    $$sanitized_props,
    {
      /**
       * @component @name MoveLeft
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNNiA4TDIgMTJMNiAxNiIgLz4KICA8cGF0aCBkPSJNMiAxMkgyMiIgLz4KPC9zdmc+Cg==) - https://lucide.dev/icons/move-left
       * @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
       *
       * @param {Object} props - Lucide icons props and any valid SVG attribute
       * @returns {FunctionalComponent} Svelte component
       *
       */
      iconNode,
      children: ($$renderer2) => {
        $$renderer2.push(`<!--[-->`);
        slot($$renderer2, $$props, "default", {});
        $$renderer2.push(`<!--]-->`);
      },
      $$slots: { default: true }
    }
  ]));
}
function Ruler($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    [
      "path",
      {
        "d": "M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z"
      }
    ],
    ["path", { "d": "m14.5 12.5 2-2" }],
    ["path", { "d": "m11.5 9.5 2-2" }],
    ["path", { "d": "m8.5 6.5 2-2" }],
    ["path", { "d": "m17.5 15.5 2-2" }]
  ];
  Icon($$renderer, spread_props([
    { name: "ruler" },
    $$sanitized_props,
    {
      /**
       * @component @name Ruler
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMjEuMyAxNS4zYTIuNCAyLjQgMCAwIDEgMCAzLjRsLTIuNiAyLjZhMi40IDIuNCAwIDAgMS0zLjQgMEwyLjcgOC43YTIuNDEgMi40MSAwIDAgMSAwLTMuNGwyLjYtMi42YTIuNDEgMi40MSAwIDAgMSAzLjQgMFoiIC8+CiAgPHBhdGggZD0ibTE0LjUgMTIuNSAyLTIiIC8+CiAgPHBhdGggZD0ibTExLjUgOS41IDItMiIgLz4KICA8cGF0aCBkPSJtOC41IDYuNSAyLTIiIC8+CiAgPHBhdGggZD0ibTE3LjUgMTUuNSAyLTIiIC8+Cjwvc3ZnPgo=) - https://lucide.dev/icons/ruler
       * @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
       *
       * @param {Object} props - Lucide icons props and any valid SVG attribute
       * @returns {FunctionalComponent} Svelte component
       *
       */
      iconNode,
      children: ($$renderer2) => {
        $$renderer2.push(`<!--[-->`);
        slot($$renderer2, $$props, "default", {});
        $$renderer2.push(`<!--]-->`);
      },
      $$slots: { default: true }
    }
  ]));
}
function Settings($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    [
      "path",
      {
        "d": "M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"
      }
    ],
    ["circle", { "cx": "12", "cy": "12", "r": "3" }]
  ];
  Icon($$renderer, spread_props([
    { name: "settings" },
    $$sanitized_props,
    {
      /**
       * @component @name Settings
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNOS42NzEgNC4xMzZhMi4zNCAyLjM0IDAgMCAxIDQuNjU5IDAgMi4zNCAyLjM0IDAgMCAwIDMuMzE5IDEuOTE1IDIuMzQgMi4zNCAwIDAgMSAyLjMzIDQuMDMzIDIuMzQgMi4zNCAwIDAgMCAwIDMuODMxIDIuMzQgMi4zNCAwIDAgMS0yLjMzIDQuMDMzIDIuMzQgMi4zNCAwIDAgMC0zLjMxOSAxLjkxNSAyLjM0IDIuMzQgMCAwIDEtNC42NTkgMCAyLjM0IDIuMzQgMCAwIDAtMy4zMi0xLjkxNSAyLjM0IDIuMzQgMCAwIDEtMi4zMy00LjAzMyAyLjM0IDIuMzQgMCAwIDAgMC0zLjgzMUEyLjM0IDIuMzQgMCAwIDEgNi4zNSA2LjA1MWEyLjM0IDIuMzQgMCAwIDAgMy4zMTktMS45MTUiIC8+CiAgPGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMyIgLz4KPC9zdmc+Cg==) - https://lucide.dev/icons/settings
       * @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
       *
       * @param {Object} props - Lucide icons props and any valid SVG attribute
       * @returns {FunctionalComponent} Svelte component
       *
       */
      iconNode,
      children: ($$renderer2) => {
        $$renderer2.push(`<!--[-->`);
        slot($$renderer2, $$props, "default", {});
        $$renderer2.push(`<!--]-->`);
      },
      $$slots: { default: true }
    }
  ]));
}
function Square_arrow_out_up_right($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    [
      "path",
      {
        "d": "M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6"
      }
    ],
    ["path", { "d": "m21 3-9 9" }],
    ["path", { "d": "M15 3h6v6" }]
  ];
  Icon($$renderer, spread_props([
    { name: "square-arrow-out-up-right" },
    $$sanitized_props,
    {
      /**
       * @component @name SquareArrowOutUpRight
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMjEgMTN2NmEyIDIgMCAwIDEtMiAySDVhMiAyIDAgMCAxLTItMlY1YTIgMiAwIDAgMSAyLTJoNiIgLz4KICA8cGF0aCBkPSJtMjEgMy05IDkiIC8+CiAgPHBhdGggZD0iTTE1IDNoNnY2IiAvPgo8L3N2Zz4K) - https://lucide.dev/icons/square-arrow-out-up-right
       * @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
       *
       * @param {Object} props - Lucide icons props and any valid SVG attribute
       * @returns {FunctionalComponent} Svelte component
       *
       */
      iconNode,
      children: ($$renderer2) => {
        $$renderer2.push(`<!--[-->`);
        slot($$renderer2, $$props, "default", {});
        $$renderer2.push(`<!--]-->`);
      },
      $$slots: { default: true }
    }
  ]));
}
function Square_dashed($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    ["path", { "d": "M5 3a2 2 0 0 0-2 2" }],
    ["path", { "d": "M19 3a2 2 0 0 1 2 2" }],
    ["path", { "d": "M21 19a2 2 0 0 1-2 2" }],
    ["path", { "d": "M5 21a2 2 0 0 1-2-2" }],
    ["path", { "d": "M9 3h1" }],
    ["path", { "d": "M9 21h1" }],
    ["path", { "d": "M14 3h1" }],
    ["path", { "d": "M14 21h1" }],
    ["path", { "d": "M3 9v1" }],
    ["path", { "d": "M21 9v1" }],
    ["path", { "d": "M3 14v1" }],
    ["path", { "d": "M21 14v1" }]
  ];
  Icon($$renderer, spread_props([
    { name: "square-dashed" },
    $$sanitized_props,
    {
      /**
       * @component @name SquareDashed
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNNSAzYTIgMiAwIDAgMC0yIDIiIC8+CiAgPHBhdGggZD0iTTE5IDNhMiAyIDAgMCAxIDIgMiIgLz4KICA8cGF0aCBkPSJNMjEgMTlhMiAyIDAgMCAxLTIgMiIgLz4KICA8cGF0aCBkPSJNNSAyMWEyIDIgMCAwIDEtMi0yIiAvPgogIDxwYXRoIGQ9Ik05IDNoMSIgLz4KICA8cGF0aCBkPSJNOSAyMWgxIiAvPgogIDxwYXRoIGQ9Ik0xNCAzaDEiIC8+CiAgPHBhdGggZD0iTTE0IDIxaDEiIC8+CiAgPHBhdGggZD0iTTMgOXYxIiAvPgogIDxwYXRoIGQ9Ik0yMSA5djEiIC8+CiAgPHBhdGggZD0iTTMgMTR2MSIgLz4KICA8cGF0aCBkPSJNMjEgMTR2MSIgLz4KPC9zdmc+Cg==) - https://lucide.dev/icons/square-dashed
       * @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
       *
       * @param {Object} props - Lucide icons props and any valid SVG attribute
       * @returns {FunctionalComponent} Svelte component
       *
       */
      iconNode,
      children: ($$renderer2) => {
        $$renderer2.push(`<!--[-->`);
        slot($$renderer2, $$props, "default", {});
        $$renderer2.push(`<!--]-->`);
      },
      $$slots: { default: true }
    }
  ]));
}
function Square_minus($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    [
      "rect",
      { "width": "18", "height": "18", "x": "3", "y": "3", "rx": "2" }
    ],
    ["path", { "d": "M8 12h8" }]
  ];
  Icon($$renderer, spread_props([
    { name: "square-minus" },
    $$sanitized_props,
    {
      /**
       * @component @name SquareMinus
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cmVjdCB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHg9IjMiIHk9IjMiIHJ4PSIyIiAvPgogIDxwYXRoIGQ9Ik04IDEyaDgiIC8+Cjwvc3ZnPgo=) - https://lucide.dev/icons/square-minus
       * @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
       *
       * @param {Object} props - Lucide icons props and any valid SVG attribute
       * @returns {FunctionalComponent} Svelte component
       *
       */
      iconNode,
      children: ($$renderer2) => {
        $$renderer2.push(`<!--[-->`);
        slot($$renderer2, $$props, "default", {});
        $$renderer2.push(`<!--]-->`);
      },
      $$slots: { default: true }
    }
  ]));
}
function Square_plus($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    [
      "rect",
      { "width": "18", "height": "18", "x": "3", "y": "3", "rx": "2" }
    ],
    ["path", { "d": "M8 12h8" }],
    ["path", { "d": "M12 8v8" }]
  ];
  Icon($$renderer, spread_props([
    { name: "square-plus" },
    $$sanitized_props,
    {
      /**
       * @component @name SquarePlus
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cmVjdCB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHg9IjMiIHk9IjMiIHJ4PSIyIiAvPgogIDxwYXRoIGQ9Ik04IDEyaDgiIC8+CiAgPHBhdGggZD0iTTEyIDh2OCIgLz4KPC9zdmc+Cg==) - https://lucide.dev/icons/square-plus
       * @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
       *
       * @param {Object} props - Lucide icons props and any valid SVG attribute
       * @returns {FunctionalComponent} Svelte component
       *
       */
      iconNode,
      children: ($$renderer2) => {
        $$renderer2.push(`<!--[-->`);
        slot($$renderer2, $$props, "default", {});
        $$renderer2.push(`<!--]-->`);
      },
      $$slots: { default: true }
    }
  ]));
}
function Trash_2($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    ["path", { "d": "M10 11v6" }],
    ["path", { "d": "M14 11v6" }],
    ["path", { "d": "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" }],
    ["path", { "d": "M3 6h18" }],
    ["path", { "d": "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" }]
  ];
  Icon($$renderer, spread_props([
    { name: "trash-2" },
    $$sanitized_props,
    {
      /**
       * @component @name Trash2
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMTAgMTF2NiIgLz4KICA8cGF0aCBkPSJNMTQgMTF2NiIgLz4KICA8cGF0aCBkPSJNMTkgNnYxNGEyIDIgMCAwIDEtMiAySDdhMiAyIDAgMCAxLTItMlY2IiAvPgogIDxwYXRoIGQ9Ik0zIDZoMTgiIC8+CiAgPHBhdGggZD0iTTggNlY0YTIgMiAwIDAgMSAyLTJoNGEyIDIgMCAwIDEgMiAydjIiIC8+Cjwvc3ZnPgo=) - https://lucide.dev/icons/trash-2
       * @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
       *
       * @param {Object} props - Lucide icons props and any valid SVG attribute
       * @returns {FunctionalComponent} Svelte component
       *
       */
      iconNode,
      children: ($$renderer2) => {
        $$renderer2.push(`<!--[-->`);
        slot($$renderer2, $$props, "default", {});
        $$renderer2.push(`<!--]-->`);
      },
      $$slots: { default: true }
    }
  ]));
}
function Upload($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    ["path", { "d": "M12 3v12" }],
    ["path", { "d": "m17 8-5-5-5 5" }],
    ["path", { "d": "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }]
  ];
  Icon($$renderer, spread_props([
    { name: "upload" },
    $$sanitized_props,
    {
      /**
       * @component @name Upload
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMTIgM3YxMiIgLz4KICA8cGF0aCBkPSJtMTcgOC01LTUtNSA1IiAvPgogIDxwYXRoIGQ9Ik0yMSAxNXY0YTIgMiAwIDAgMS0yIDJINWEyIDIgMCAwIDEtMi0ydi00IiAvPgo8L3N2Zz4K) - https://lucide.dev/icons/upload
       * @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
       *
       * @param {Object} props - Lucide icons props and any valid SVG attribute
       * @returns {FunctionalComponent} Svelte component
       *
       */
      iconNode,
      children: ($$renderer2) => {
        $$renderer2.push(`<!--[-->`);
        slot($$renderer2, $$props, "default", {});
        $$renderer2.push(`<!--]-->`);
      },
      $$slots: { default: true }
    }
  ]));
}
function Youtube($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    [
      "path",
      {
        "d": "M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"
      }
    ],
    ["path", { "d": "m10 15 5-3-5-3z" }]
  ];
  Icon($$renderer, spread_props([
    { name: "youtube" },
    $$sanitized_props,
    {
      /**
       * @component @name Youtube
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMi41IDE3YTI0LjEyIDI0LjEyIDAgMCAxIDAtMTAgMiAyIDAgMCAxIDEuNC0xLjQgNDkuNTYgNDkuNTYgMCAwIDEgMTYuMiAwQTIgMiAwIDAgMSAyMS41IDdhMjQuMTIgMjQuMTIgMCAwIDEgMCAxMCAyIDIgMCAwIDEtMS40IDEuNCA0OS41NSA0OS41NSAwIDAgMS0xNi4yIDBBMiAyIDAgMCAxIDIuNSAxNyIgLz4KICA8cGF0aCBkPSJtMTAgMTUgNS0zLTUtM3oiIC8+Cjwvc3ZnPgo=) - https://lucide.dev/icons/youtube
       * @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
       *
       * @param {Object} props - Lucide icons props and any valid SVG attribute
       * @returns {FunctionalComponent} Svelte component
       * @deprecated Brand icons have been deprecated and are due to be removed, please refer to https://github.com/lucide-icons/lucide/issues/670. We recommend using https://simpleicons.org/?q=youtube instead. This icon will be removed in v1.0
       */
      iconNode,
      children: ($$renderer2) => {
        $$renderer2.push(`<!--[-->`);
        slot($$renderer2, $$props, "default", {});
        $$renderer2.push(`<!--]-->`);
      },
      $$slots: { default: true }
    }
  ]));
}
function LaunchScreen($$renderer, $$props) {
  let { imgPath, filePath } = $$props;
  $$renderer.push(`<div class="launch-screen svelte-b28x3t"><div class="content svelte-b28x3t"><h1 class="title svelte-b28x3t">Hitboxer 2.0</h1> <div class="button-group svelte-b28x3t"><button class="primary-btn svelte-b28x3t">`);
  Upload($$renderer, { size: 20 });
  $$renderer.push(`<!----> Open Image</button> <button class="secondary-btn svelte-b28x3t">`);
  Trash_2($$renderer, { size: 20 });
  $$renderer.push(`<!----> Remove Image</button></div> `);
  if (imgPath) {
    $$renderer.push("<!--[-->");
    $$renderer.push(`<div class="image-viewer svelte-b28x3t"><img${attr("src", imgPath)} alt="Loaded" class="svelte-b28x3t"/> <button class="editor-btn svelte-b28x3t">Go to Editor →</button></div>`);
  } else {
    $$renderer.push("<!--[!-->");
    $$renderer.push(`<div class="empty-state svelte-b28x3t">`);
    Image($$renderer, { size: 64, strokeWidth: 1.5 });
    $$renderer.push(`<!----> <p class="svelte-b28x3t">No image loaded</p> <p class="hint svelte-b28x3t">Open an image to get started</p></div>`);
  }
  $$renderer.push(`<!--]--></div> <div class="content-bar svelte-b28x3t"><div class="socials svelte-b28x3t"><a href="https://github.com/DihyahAdib/Hitboxer2.0" target="_blank" rel="noopener noreferrer" class="social-link svelte-b28x3t" title="GitHub">`);
  Github($$renderer, { size: 20 });
  $$renderer.push(`<!----></a> <a href="https://www.linkedin.com/in/dihyah-adib-29b767281/" target="_blank" rel="noopener noreferrer" class="social-link svelte-b28x3t" title="LinkedIn">`);
  Linkedin($$renderer, { size: 20 });
  $$renderer.push(`<!----></a> <a href="https://www.youtube.com/@SeamlessError" target="_blank" rel="noopener noreferrer" class="social-link svelte-b28x3t" title="YouTube">`);
  Youtube($$renderer, { size: 20 });
  $$renderer.push(`<!----></a></div> `);
  if (filePath) {
    $$renderer.push("<!--[-->");
    $$renderer.push(`<div class="filepath-wrap"><p class="filepath svelte-b28x3t">File: ${escape_html(filePath)}</p></div>`);
  } else {
    $$renderer.push("<!--[!-->");
    $$renderer.push(`<div class="filepath-wrap"><p class="filepath muted svelte-b28x3t">No Image Selected...</p></div>`);
  }
  $$renderer.push(`<!--]--> <span class="version svelte-b28x3t">Version: 3.0.0x (Beta-testing)</span></div></div>`);
}
function EditorScreen($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      imgPath,
      imgSize,
      filePath,
      scale,
      flipX,
      flipY
    } = $$props;
    const rulerSettingAttributes = { width: 80, height: 80 };
    let columns = 1;
    let rows = 1;
    let gridX = 10;
    let gridY = 10;
    let gridSize = 10;
    let inputScale = 1;
    let modifiedValue = 1;
    let modifiedGridValue = 1;
    let modifiedRulerValue = 1;
    let gridOn = false;
    let outlineOn = false;
    let editorRulerOn = false;
    let cellOutlineWidthOn = false;
    let cellOutlineHeightOn = false;
    let isGridValuesClamped = false;
    let rulerWidth = rulerSettingAttributes.width;
    let rulerHeight = rulerSettingAttributes.height;
    let tooltipMessage = null;
    let tooltipTimeout = null;
    let hitboxes = [];
    let exitingHitboxIds = [];
    let enteringHitboxIds = [];
    let currentHitboxModal = null;
    function showTooltip(msg) {
      tooltipMessage = msg;
      if (tooltipTimeout) clearTimeout(tooltipTimeout);
      tooltipTimeout = setTimeout(
        () => {
          tooltipMessage = null;
        },
        2500
      );
    }
    function incrementColCount() {
      if (columns >= 100) {
        showTooltip("Please change max defaults in settings to allow for more spritesheet cols.");
        return;
      }
      columns++;
    }
    function decrementColCount() {
      if (columns <= 1) {
        showTooltip("A spritesheet cannot contain less than 1 column(s).");
        return;
      }
      columns--;
    }
    function incrementRowCount() {
      if (rows >= 100) {
        showTooltip("Please change max defaults in settings to allow for more spritesheet rows.");
        return;
      }
      rows++;
    }
    function decrementRowCount() {
      if (rows <= 1) {
        showTooltip("A spritesheet cannot contain less than 1 row(s).");
        return;
      }
      rows--;
    }
    function incrementScale(modifiedValue2) {
      if (inputScale >= 50) {
        showTooltip("Scale cannot go higher than a value of 50.");
        return;
      }
      inputScale += modifiedValue2;
    }
    function decrementScale(modifiedValue2) {
      if (inputScale <= 1) {
        showTooltip("Scale cannot go lower than a value of 1.");
        return;
      }
      inputScale -= modifiedValue2;
    }
    function incrementRulerWidth(modifiedRulerValue2) {
      if (rulerWidth >= 164) {
        showTooltip("Ruler Width cannot go larger than 120 ticks.");
        return;
      }
      rulerWidth += modifiedRulerValue2;
    }
    function decrementRulerWidth(modifiedRulerValue2) {
      if (rulerWidth <= 60) {
        showTooltip("Ruler Width cannot go lower than 60 ticks.");
        return;
      }
      rulerWidth -= modifiedRulerValue2;
    }
    function incrementRulerHeight(modifiedRulerValue2) {
      if (rulerHeight >= 94) {
        showTooltip("Ruler Height cannot go larger than 120 ticks.");
        return;
      }
      rulerHeight += modifiedRulerValue2;
    }
    function decrementRulerHeight(modifiedRulerValue2) {
      if (rulerHeight <= 60) {
        showTooltip("Ruler Height cannot go lower than 60 ticks.");
        return;
      }
      rulerHeight -= modifiedRulerValue2;
    }
    function incrementGridScale(modifiedGridValue2, isGridValuesClamped2) {
      {
        gridX = Math.round((gridX + modifiedGridValue2) * 1e3) / 1e3;
        gridY = Math.round((gridY + modifiedGridValue2) * 1e3) / 1e3;
      }
    }
    function decrementGridSize(modifiedGridValue2, isGridValuesClamped2) {
      {
        if (gridX <= 0.1) {
          showTooltip("Grid size cannot go lower than 0.1");
          return;
        }
        gridX = Math.round((gridX - modifiedGridValue2) * 1e3) / 1e3;
        gridY = Math.round((gridY - modifiedGridValue2) * 1e3) / 1e3;
      }
    }
    function incrementGridX(modifiedGridValue2) {
      gridX = Math.round((gridX + modifiedGridValue2) * 1e3) / 1e3;
    }
    function decrementGridX(modifiedGridValue2) {
      if (gridX <= 0.1) {
        showTooltip("Grid width cannot go lower than 0.1");
        return;
      }
      gridX = Math.round((gridX - modifiedGridValue2) * 1e3) / 1e3;
    }
    function incrementGridY(modifiedGridValue2) {
      gridY = Math.round((gridY + modifiedGridValue2) * 1e3) / 1e3;
    }
    function decrementGridY(modifiedGridValue2) {
      if (gridY <= 0.1) {
        showTooltip("Grid height cannot go lower than 0.1");
        return;
      }
      gridY = Math.round((gridY - modifiedGridValue2) * 1e3) / 1e3;
    }
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <div class="editor-root svelte-9vannf"><div class="toolbar svelte-9vannf"><button class="svelte-9vannf">`);
    Move_left($$renderer2, { size: 18 });
    $$renderer2.push(`<!----></button> <button${attr_class("svelte-9vannf", void 0, { "active": flipX })}>`);
    Flip_horizontal($$renderer2, { size: 18 });
    $$renderer2.push(`<!----></button> <button${attr_class("svelte-9vannf", void 0, { "active": flipY })}>`);
    Flip_vertical($$renderer2, { size: 18 });
    $$renderer2.push(`<!----></button> <button class="svelte-9vannf">`);
    Copy_plus($$renderer2, { size: 18 });
    $$renderer2.push(`<!----></button> <button${attr_class("svelte-9vannf", void 0, { "active": editorRulerOn })}>`);
    Ruler($$renderer2, { size: 18 });
    $$renderer2.push(`<!----></button> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <button${attr_class("svelte-9vannf", void 0, { "active": gridOn })}>`);
    Grid_3x3($$renderer2, { size: 18 });
    $$renderer2.push(`<!----></button> <button${attr_class("svelte-9vannf", void 0, { "active": outlineOn })}>`);
    Square_dashed($$renderer2, { size: 18 });
    $$renderer2.push(`<!----></button> <button${attr_class("svelte-9vannf", void 0, { "active": cellOutlineWidthOn })}>`);
    Frame($$renderer2, { size: 18 });
    $$renderer2.push(`<!----></button> <button${attr_class("svelte-9vannf", void 0, { "active": cellOutlineHeightOn })}>`);
    Frame($$renderer2, { size: 18 });
    $$renderer2.push(`<!----></button> <div class="toolbar-spacer svelte-9vannf"></div> <button class="export-btn svelte-9vannf"${attr("disabled", hitboxes.length === 0 || columns <= 0 || rows <= 0, true)}>`);
    Folder_check($$renderer2, { size: 18 });
    $$renderer2.push(`<!----></button> <hr class="rt-divider svelte-9vannf"/> <button class="svelte-9vannf">`);
    Settings($$renderer2, { size: 18 });
    $$renderer2.push(`<!----></button></div> <div class="canvas-wrapper svelte-9vannf"><div class="tooltip-bar svelte-9vannf"><p class="header-text svelte-9vannf">`);
    if (filePath) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`- Image path selected: ${escape_html(filePath)} -`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`- No Image Loaded -`);
    }
    $$renderer2.push(`<!--]--></p> <div class="indicators svelte-9vannf"><span class="indicator-label svelte-9vannf">Clamp:</span> <span${attr_class("rt-snap-indicator svelte-9vannf", void 0, { "rt-snap-active": isGridValuesClamped })}>${escape_html("off")}</span></div> <div class="indicators svelte-9vannf"><span class="indicator-label svelte-9vannf">Snap:</span> <span${attr_class("rt-snap-indicator svelte-9vannf", void 0, { "rt-snap-active": gridOn })}>${escape_html("off")}</span></div> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (tooltipMessage) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<span class="tooltip-warning svelte-9vannf">${escape_html(tooltipMessage)}</span>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div> <div class="canvas svelte-9vannf" role="presentation">`);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (imgPath) {
      $$renderer2.push("<!--[-->");
      {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> <div class="image-wrapper svelte-9vannf"${attr_style(`transform: scale(${stringify(flipX ? -scale : scale)}, ${stringify(flipY ? -scale : scale)});`)}><img${attr("src", imgPath)} alt="Selected sprite asset" draggable="false" class="svelte-9vannf" onload="this.__e=event"/></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <!--[-->`);
    const each_array_3 = ensure_array_like(hitboxes);
    for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
      let { id, origin_x, origin_y, width, height, img_x, img_y } = each_array_3[$$index_3];
      const cellWidth = imgSize.width / columns;
      const cellHeight = imgSize.height / rows;
      const cellCol = Math.floor(img_x / (cellWidth * scale));
      const cellRow = Math.floor(img_y / (cellHeight * scale));
      const cell_x = Math.round((img_x - cellCol * cellWidth * scale) / scale);
      const cell_y = Math.round((img_y - cellRow * cellHeight * scale) / scale);
      const source_w = Math.round(width / scale);
      const source_h = Math.round(height / scale);
      $$renderer2.push(`<div${attr("data-id", id)}${attr_class("box svelte-9vannf", void 0, {
        "highlighted-box": currentHitboxModal === id,
        "exiting": exitingHitboxIds.includes(id),
        "entering": enteringHitboxIds.includes(id)
      })}${attr_style(` left: ${stringify(origin_x)}px; top: ${stringify(origin_y)}px; width: ${stringify(width)}px; height: ${stringify(height)}px; cursor: ${stringify("grab")}; `)} role="presentation"><span class="hitbox-label svelte-9vannf">Hitbox: ${escape_html(id)}</span> <span class="hitbox-coords svelte-9vannf">x:${escape_html(cell_x)}, y:${escape_html(cell_y)}</span> <span class="hitbox-dims svelte-9vannf">w:${escape_html(source_w)}, h:${escape_html(source_h)}</span></div>`);
    }
    $$renderer2.push(`<!--]--></div></div> <div class="right-toolbar svelte-9vannf"><hr class="rt-divider svelte-9vannf"/> <span class="right-toolbar-title svelte-9vannf">Properties</span> <hr class="rt-divider svelte-9vannf"/> <div class="rt-rows svelte-9vannf"><span class="rt-label svelte-9vannf">Scale:</span> <div class="rt-stepper svelte-9vannf">`);
    Square_minus($$renderer2, {
      size: 16,
      class: "rt-step-icon",
      onclick: () => decrementScale(modifiedValue)
    });
    $$renderer2.push(`<!----> <input class="rt-value-input svelte-9vannf" type="text"${attr("value", inputScale)}/> `);
    Square_plus($$renderer2, {
      size: 16,
      class: "rt-step-icon",
      onclick: () => incrementScale(modifiedValue)
    });
    $$renderer2.push(`<!----></div></div> <div class="rt-rows rows svelte-9vannf"><span class="rt-label svelte-9vannf">Incremental Value:</span> <div><input type="range" class="rt-slider svelte-9vannf" min="1" max="10" step="0.1"${attr("value", modifiedValue)}/> <span class="rt-value svelte-9vannf">${escape_html(modifiedValue)}</span></div></div> <div class="rt-img-info svelte-9vannf"><span class="rt-info-label svelte-9vannf">Source</span> <div class="rt-info-rows svelte-9vannf"><span class="rt-info-key svelte-9vannf">W</span> <span class="rt-info-val svelte-9vannf">${escape_html(imgSize?.width ?? 0)}px</span> <span class="rt-info-key svelte-9vannf">H</span> <span class="rt-info-val svelte-9vannf">${escape_html(imgSize?.height ?? 0)}px</span></div> <span class="rt-info-label svelte-9vannf">Scaled</span> <div class="rt-info-rows svelte-9vannf"><span class="rt-info-key svelte-9vannf">W</span> <span class="rt-info-val svelte-9vannf">${escape_html(imgSize ? imgSize.width * inputScale : 0)}px</span> <span class="rt-info-key svelte-9vannf">H</span> <span class="rt-info-val svelte-9vannf">${escape_html(imgSize ? imgSize.height * inputScale : 0)}px</span></div></div> <hr class="rt-divider svelte-9vannf"/> <span class="right-toolbar-title svelte-9vannf">Ruler</span> <hr class="rt-divider svelte-9vannf"/> <div class="rt-rows svelte-9vannf"><span class="rt-label svelte-9vannf">Width:</span> <div class="rt-stepper svelte-9vannf">`);
    Square_minus($$renderer2, {
      size: 16,
      class: "rt-step-icon",
      onclick: () => decrementRulerWidth(modifiedRulerValue)
    });
    $$renderer2.push(`<!----> <input class="rt-value-input svelte-9vannf" type="text"${attr("value", rulerWidth)}/> `);
    Square_plus($$renderer2, {
      size: 16,
      class: "rt-step-icon",
      onclick: () => incrementRulerWidth(modifiedRulerValue)
    });
    $$renderer2.push(`<!----></div></div> <div class="rt-rows svelte-9vannf"><span class="rt-label svelte-9vannf">Height:</span> <div class="rt-stepper svelte-9vannf">`);
    Square_minus($$renderer2, {
      size: 16,
      class: "rt-step-icon",
      onclick: () => decrementRulerHeight(modifiedRulerValue)
    });
    $$renderer2.push(`<!----> <input class="rt-value-input svelte-9vannf" type="text"${attr("value", rulerHeight)}/> `);
    Square_plus($$renderer2, {
      size: 16,
      class: "rt-step-icon",
      onclick: () => incrementRulerHeight(modifiedRulerValue)
    });
    $$renderer2.push(`<!----></div></div> <hr class="rt-divider svelte-9vannf"/> <span class="right-toolbar-title svelte-9vannf">Grid</span> <hr class="rt-divider svelte-9vannf"/> <div class="rt-rows svelte-9vannf"><span class="rt-label svelte-9vannf">Scale:</span> <div${attr_class("rt-stepper svelte-9vannf", void 0, { "rt-stepper-disabled": !isGridValuesClamped })}>`);
    Square_minus($$renderer2, {
      size: 16,
      class: "rt-step-icon",
      onclick: () => decrementGridSize(modifiedGridValue)
    });
    $$renderer2.push(`<!----> <input class="rt-value-input svelte-9vannf" type="text"${attr("value", gridSize)}/> `);
    Square_plus($$renderer2, {
      size: 16,
      class: "rt-step-icon",
      onclick: () => incrementGridScale(modifiedGridValue)
    });
    $$renderer2.push(`<!----></div></div> <div class="rt-clamp-container svelte-9vannf"><div class="rt-rows svelte-9vannf"><span class="rt-label svelte-9vannf">X:</span> <div${attr_class("rt-stepper svelte-9vannf", void 0, { "rt-stepper-disabled": isGridValuesClamped })}>`);
    Square_minus($$renderer2, {
      size: 16,
      class: "rt-step-icon",
      onclick: () => decrementGridX(modifiedGridValue)
    });
    $$renderer2.push(`<!----> <input class="rt-value-input svelte-9vannf" type="text"${attr("value", gridX)}${attr("disabled", isGridValuesClamped, true)}/> `);
    Square_plus($$renderer2, {
      size: 16,
      class: "rt-step-icon",
      onclick: () => incrementGridX(modifiedGridValue)
    });
    $$renderer2.push(`<!----></div></div> <button${attr_class("rt-clamp svelte-9vannf", void 0, { "active": isGridValuesClamped })}>`);
    {
      $$renderer2.push("<!--[!-->");
      Link_2_off($$renderer2, { size: 18 });
    }
    $$renderer2.push(`<!--]--></button> <div class="rt-rows svelte-9vannf"><span class="rt-label svelte-9vannf">Y:</span> <div${attr_class("rt-stepper svelte-9vannf", void 0, { "rt-stepper-disabled": isGridValuesClamped })}>`);
    Square_minus($$renderer2, {
      size: 16,
      class: "rt-step-icon",
      onclick: () => decrementGridY(modifiedGridValue)
    });
    $$renderer2.push(`<!----> <input class="rt-value-input svelte-9vannf" type="text"${attr("value", gridY)}${attr("disabled", isGridValuesClamped, true)}/> `);
    Square_plus($$renderer2, {
      size: 16,
      class: "rt-step-icon",
      onclick: () => incrementGridY(modifiedGridValue)
    });
    $$renderer2.push(`<!----></div></div></div> <div class="rt-rows rows svelte-9vannf"><span class="rt-label svelte-9vannf">Incremental Value:</span> <div><input type="range" class="rt-slider svelte-9vannf" min="0.1" max="10" step="0.1"${attr("value", modifiedGridValue)}/> <span class="rt-value svelte-9vannf">${escape_html(modifiedGridValue)}</span></div></div> <hr class="rt-divider svelte-9vannf"/> <span class="right-toolbar-title svelte-9vannf">Spritesheet</span> <hr class="rt-divider svelte-9vannf"/> <div class="rt-rows svelte-9vannf"><span class="rt-label svelte-9vannf">Columns:</span> <div class="rt-stepper svelte-9vannf">`);
    Square_minus($$renderer2, {
      size: 16,
      class: "rt-step-icon",
      onclick: () => decrementColCount()
    });
    $$renderer2.push(`<!----> <input class="rt-value-input svelte-9vannf" type="text"${attr("value", columns)}/> `);
    Square_plus($$renderer2, {
      size: 16,
      class: "rt-step-icon",
      onclick: () => incrementColCount()
    });
    $$renderer2.push(`<!----></div></div> <div class="rt-rows svelte-9vannf"><span class="rt-label svelte-9vannf">Rows:</span> <div class="rt-stepper svelte-9vannf">`);
    Square_minus($$renderer2, {
      size: 16,
      class: "rt-step-icon",
      onclick: () => decrementRowCount()
    });
    $$renderer2.push(`<!----> <input class="rt-value-input svelte-9vannf" type="text"${attr("value", rows)}/> `);
    Square_plus($$renderer2, {
      size: 16,
      class: "rt-step-icon",
      onclick: () => incrementRowCount()
    });
    $$renderer2.push(`<!----></div></div> <hr class="rt-divider svelte-9vannf"/> <span class="right-toolbar-title svelte-9vannf">Hitbox</span> <hr class="rt-divider svelte-9vannf"/> <div class="rt-rows svelte-9vannf"><span class="rt-label svelte-9vannf">Count:</span> <span class="rt-value svelte-9vannf">${escape_html(hitboxes.length)} Hitboxe(s)</span></div> <div class="rt-rows svelte-9vannf"><span class="rt-label svelte-9vannf">Cell Width:</span> <span class="rt-value svelte-9vannf">${escape_html((imgSize?.width / columns).toFixed(2))}px</span></div> <div class="rt-rows svelte-9vannf"><span class="rt-label svelte-9vannf">Cell Height:</span> <span class="rt-value svelte-9vannf">${escape_html((imgSize?.height / rows).toFixed(2))}px</span></div> <hr class="rt-divider svelte-9vannf"/> <span class="right-toolbar-title svelte-9vannf">Hitbox(s) Info</span> <hr class="rt-divider svelte-9vannf"/> <button class="export-btn svelte-9vannf">`);
    {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<span>Show Info</span> `);
      Square_arrow_out_up_right($$renderer2, { size: 14 });
      $$renderer2.push(`<!---->`);
    }
    $$renderer2.push(`<!--]--></button></div></div>`);
  });
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let loadLaunchScreen = "launchScreen";
    let imgPath = null;
    let filePath = null;
    let imgSize = { width: 0, height: 0 };
    let scale = 1;
    let flipX = false;
    let flipY = false;
    async function handleOpen() {
      const newFilePath = await window.electronAPI.openImageDialog();
      if (!newFilePath) return;
      filePath = newFilePath;
      imgPath = window.electronAPI.loadImage(newFilePath);
      scale = 1;
      flipX = false;
      flipY = false;
    }
    function handleClose() {
      imgPath = null;
      filePath = null;
      imgSize.width = 0;
      imgSize.height = 0;
      scale = 1;
      flipX = false;
      flipY = false;
    }
    function goHome() {
      loadLaunchScreen = "launchScreen";
    }
    function goHitboxEditor() {
      loadLaunchScreen = "hitboxEditorScreen";
    }
    onDestroy(() => {
      window.electronAPI.offAddImage(handleOpen);
      window.electronAPI.offRemoveImage(handleClose);
      window.electronAPI.offGoHome(goHome);
      window.electronAPI.offGoHitboxEditor(goHitboxEditor);
    });
    head("1uha8ag", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Hitboxer</title>`);
      });
    });
    if (loadLaunchScreen == "launchScreen") {
      $$renderer2.push("<!--[-->");
      LaunchScreen($$renderer2, { imgPath, filePath });
    } else {
      $$renderer2.push("<!--[!-->");
      if (loadLaunchScreen == "hitboxEditorScreen") {
        $$renderer2.push("<!--[-->");
        EditorScreen($$renderer2, {
          imgPath,
          imgSize,
          filePath,
          scale,
          flipX,
          flipY
        });
      } else {
        $$renderer2.push("<!--[!-->");
        if (loadLaunchScreen == "formatJsonScreen") {
          $$renderer2.push("<!--[-->");
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]-->`);
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]-->`);
  });
}
export {
  _page as default
};
