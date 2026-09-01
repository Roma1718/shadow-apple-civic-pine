import { x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as PageHeader, g as LAB_TRACKS, o as Wrap } from "./router-BZ0VK_tk.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/lab-CgBmii3R.js
var import_jsx_runtime = require_jsx_runtime();
function Lab() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		eyebrow: "Лаборатория социальной архитектуры",
		title: "Мозговой центр пилота",
		lead: "Здесь собираются команды университетов, школ, музеев, техцентров и общественных организаций."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wrap, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-6 lg:grid-cols-[1.3fr_0.7fr]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "text-2xl",
			children: "Треки работы"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
			className: "mt-5 grid gap-3",
			children: LAB_TRACKS.map((t, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "rounded-[var(--radius-lg)] border border-border bg-card px-4 py-4 text-base",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mr-3 font-display text-primary",
					children: i + 1
				}), t]
			}, t))
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "h-fit rounded-[var(--radius-xl)] border border-border bg-card p-6 shadow-[var(--shadow-card)]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-display text-xl",
				children: "Результат лаборатории"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-muted-foreground",
				children: "Стратегия проекта, визуальная модель, прототип цифровой платформы, модуль «СВО здоровье» и пилотный просветительский демопроект."
			})]
		})]
	}) })] });
}
//#endregion
export { Lab as component };
