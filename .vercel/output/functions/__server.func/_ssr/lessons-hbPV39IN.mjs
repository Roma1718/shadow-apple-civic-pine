import { v as Link, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as LESSONS, a as PageHeader, o as Wrap } from "./router-BZ0VK_tk.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/lessons-hbPV39IN.js
var import_jsx_runtime = require_jsx_runtime();
function Lessons() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		eyebrow: "Модуль «Уроки»",
		title: "Просветительский контур для школ, СПО и вузов",
		lead: "Готовые занятия, методические материалы и сценарии общественного действия."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wrap, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid gap-4 md:grid-cols-2",
		children: LESSONS.map((lesson) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
			className: "rounded-[var(--radius-xl)] border border-border bg-card p-6 shadow-[var(--shadow-card)]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-3 text-sm text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: lesson.age }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: lesson.duration })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mt-3 font-display text-xl",
					children: lesson.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: lesson.summary
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-2 text-sm text-muted-foreground",
					children: lesson.format
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/lessons/$slug",
					params: { slug: lesson.slug },
					className: "mt-4 inline-flex text-sm font-semibold text-primary",
					children: "Открыть урок"
				})
			]
		}, lesson.slug))
	}) })] });
}
//#endregion
export { Lessons as component };
