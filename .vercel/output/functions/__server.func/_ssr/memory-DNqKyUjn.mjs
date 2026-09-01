import { x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as PageHeader, o as Wrap, v as MEMORY_PROJECTS } from "./router-BZ0VK_tk.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/memory-DNqKyUjn.js
var import_jsx_runtime = require_jsx_runtime();
function Memory() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		eyebrow: "Память и культура",
		title: "Культурный контур портала",
		lead: "От цифровых портретов до общественных событий благодарности."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Wrap, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src: "/photos/memory.jpg",
		alt: "",
		className: "mb-8 h-56 w-full rounded-[var(--radius-xl)] object-cover sm:h-80"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid gap-4 md:grid-cols-3",
		children: MEMORY_PROJECTS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
			className: "rounded-[var(--radius-xl)] border border-border bg-card p-6 shadow-[var(--shadow-card)]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-display text-xl",
				children: p.title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-muted-foreground",
				children: p.text
			})]
		}, p.title))
	})] })] });
}
//#endregion
export { Memory as component };
