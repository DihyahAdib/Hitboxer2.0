import { w as ensure_array_like, x as attr_class } from "../../chunks/index.js";
function _layout($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { children } = $$props;
    let showAnimation = true;
    if (typeof window !== "undefined") {
      window.setBackgroundAnimation = (show) => {
        showAnimation = show;
      };
    }
    if (showAnimation) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="background-animation svelte-12qhfyh"><!--[-->`);
      const each_array = ensure_array_like(Array(12));
      for (let i = 0, $$length = each_array.length; i < $$length; i++) {
        each_array[i];
        $$renderer2.push(`<div class="animated-box svelte-12qhfyh"></div>`);
      }
      $$renderer2.push(`<!--]--></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <div${attr_class("app-content svelte-12qhfyh", void 0, { "with-animation": showAnimation })}>`);
    children($$renderer2);
    $$renderer2.push(`<!----></div>`);
  });
}
export {
  _layout as default
};
