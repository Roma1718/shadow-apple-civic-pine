import { v as Link, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { S as SUPPORT_MEASURES, a as PageHeader, c as cn, i as Route$2, o as Wrap } from "./router-BZ0VK_tk.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/support-DjTUVjYS.js
var import_jsx_runtime = require_jsx_runtime();
function Support() {
	const { category } = Route$2.useSearch();
	const categories = Array.from(new Set(SUPPORT_MEASURES.map((m) => m.category)));
	const rows = category ? SUPPORT_MEASURES.filter((m) => m.category === category) : SUPPORT_MEASURES;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		eyebrow: "Меры поддержки",
		title: "Система поддержки семей и участников СВО",
		lead: "Собрано в структуру портала для Чувашской Республики."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Wrap, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-6 flex flex-wrap gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/support",
			className: cn("rounded-full border px-3 py-2 text-sm font-semibold", !category ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card"),
			children: "Все"
		}), categories.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/support",
			search: { category: c },
			className: cn("rounded-full border px-3 py-2 text-sm font-semibold", category === c ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card"),
			children: c
		}, c))]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid gap-4 md:grid-cols-2",
		children: rows.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
			className: "rounded-[var(--radius-xl)] border border-border bg-card p-6 shadow-[var(--shadow-card)]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "inline-flex rounded-full bg-surface-soft px-3 py-1 text-xs font-semibold text-primary",
					children: item.category
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mt-3 font-display text-xl",
					children: item.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: item.summary
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 text-sm font-semibold",
					children: item.organization
				})
			]
		}, item.title))
	})] })] });
}
//#endregion
export { Support as component };
