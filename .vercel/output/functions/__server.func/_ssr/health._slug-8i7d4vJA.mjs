import { v as Link, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as PageHeader, h as HEALTH_MODULES, o as Wrap, r as Route$1, s as Button } from "./router-BZ0VK_tk.mjs";
import { a as MovementTool, i as Disclaimer, n as BreathTool, r as ChoiceTool, s as ValuesTool, t as BmiTool } from "./health-tools-DRlo5b3Z.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/health._slug-8i7d4vJA.js
var import_jsx_runtime = require_jsx_runtime();
function HealthDetail() {
	const { slug } = Route$1.useParams();
	const mod = HEALTH_MODULES.find((m) => m.slug === slug);
	if (!mod) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Wrap, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
		className: "text-3xl",
		children: "Направление не найдено"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		asChild: true,
		className: "mt-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/health",
			children: "К модулю здоровья"
		})
	})] });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		eyebrow: mod.source,
		title: mod.title,
		lead: mod.lead
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Wrap, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: mod.image,
			alt: "",
			className: "mb-8 h-56 w-full rounded-[var(--radius-xl)] object-cover sm:h-72"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-8",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Disclaimer, {})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-8 lg:grid-cols-[1.1fr_0.9fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-2xl",
				children: "Практики направления"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-4 grid gap-3",
				children: mod.practices.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "rounded-[var(--radius-lg)] border border-border bg-card px-4 py-4 text-sm",
					children: p
				}, p))
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: toolFor(mod.slug) })]
		})
	] })] });
}
function toolFor(slug) {
	if (slug === "spokoystvie") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BreathTool, {});
	if (slug === "racion") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BmiTool, {});
	if (slug === "dvizhenie") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MovementTool, {});
	if (slug === "cennosti") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ValuesTool, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChoiceTool, {});
}
//#endregion
export { HealthDetail as component };
