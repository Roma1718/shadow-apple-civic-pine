import { v as Link, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as LESSONS, a as PageHeader, n as Route, o as Wrap, s as Button, w as lessonBody } from "./router-BZ0VK_tk.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/lessons._slug-F-m4WeCD.js
var import_jsx_runtime = require_jsx_runtime();
function LessonDetail() {
	const { slug } = Route.useParams();
	const lesson = LESSONS.find((l) => l.slug === slug);
	if (!lesson) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Wrap, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
		className: "text-3xl",
		children: "Страница не найдена"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		asChild: true,
		className: "mt-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/lessons",
			children: "К урокам"
		})
	})] });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		eyebrow: "Урок",
		title: lesson.title,
		lead: `${lesson.age} · ${lesson.duration} · ${lesson.format}`
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wrap, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-6 lg:grid-cols-[1.3fr_0.7fr]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("article", {
			className: "space-y-4 rounded-[var(--radius-xl)] border border-border bg-card p-6 shadow-[var(--shadow-card)]",
			children: lessonBody(lesson.title).map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground",
				children: p
			}, p))
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "h-fit rounded-[var(--radius-xl)] border border-border bg-card p-6 shadow-[var(--shadow-card)]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display text-xl",
					children: "Материалы"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4 grid gap-2 text-sm",
					children: [
						"Презентация урока",
						"Карточки обсуждения",
						"Практическое задание",
						"Методические рекомендации для педагога"
					].map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: m }, m))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/register",
						children: "Подключить школу"
					})
				})
			]
		})]
	}) })] });
}
//#endregion
export { LessonDetail as component };
