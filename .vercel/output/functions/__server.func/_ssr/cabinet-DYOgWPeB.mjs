import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { v as Link, x as require_jsx_runtime, y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as LESSONS, a as PageHeader, b as ROLE_LABELS, l as useSession, o as Wrap, p as EVENTS, s as Button, u as APP_TYPES } from "./router-BZ0VK_tk.mjs";
import { n as Label, r as Textarea } from "./input-B3wM0GbD.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cabinet-DYOgWPeB.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var STATUS = {
	new: "новая",
	in_progress: "в работе",
	done: "завершена"
};
function Cabinet() {
	const user = useSession((s) => s.user);
	const apps = useSession((s) => s.applications);
	const add = useSession((s) => s.addApplication);
	const navigate = useNavigate();
	const [type, setType] = (0, import_react.useState)("psychology");
	const [message, setMessage] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		if (!user) navigate({ to: "/login" });
	}, [user, navigate]);
	if (!user) return null;
	const mine = apps.filter((a) => a.userId === user.id);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		eyebrow: "Личный кабинет",
		title: user.fullName,
		lead: `${ROLE_LABELS[user.role]} · ${user.municipality}`
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wrap, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-4 md:grid-cols-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-[var(--radius-xl)] border border-border bg-card p-6 shadow-[var(--shadow-card)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display text-xl",
					children: "Новая заявка"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "mt-4 grid gap-4",
					onSubmit: (e) => {
						e.preventDefault();
						if (!message.trim()) return;
						add(type, message.trim());
						setMessage("");
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, { children: ["Тип запроса", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							className: "h-11 rounded-[var(--radius-md)] border border-border bg-card px-3 text-sm",
							value: type,
							onChange: (e) => setType(e.target.value),
							children: APP_TYPES.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: t.value,
								children: t.label
							}, t.value))
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, { children: ["Описание", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							value: message,
							onChange: (e) => setMessage(e.target.value),
							required: true
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							children: "Отправить"
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-[var(--radius-xl)] border border-border bg-card p-6 shadow-[var(--shadow-card)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display text-xl",
					children: "Мои заявки"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-4 grid gap-3 text-sm",
					children: [mine.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Пока заявок нет." }) : null, mine.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "rounded-[var(--radius-md)] bg-surface-soft p-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: APP_TYPES.find((t) => t.value === a.type)?.label ?? a.type }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-1 text-muted-foreground",
								children: a.message
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2 text-xs font-semibold uppercase",
								children: STATUS[a.status]
							})
						]
					}, a.id))]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-[var(--radius-xl)] border border-border bg-card p-6 shadow-[var(--shadow-card)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display text-xl",
					children: "Ближайшие события"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4 grid gap-3 text-sm",
					children: EVENTS.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: e.title }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-muted-foreground",
						children: [
							e.startsAt,
							" · ",
							e.place
						]
					})] }, e.title))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-[var(--radius-xl)] border border-border bg-card p-6 shadow-[var(--shadow-card)]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-xl",
						children: "Уроки и здоровье"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-4 grid gap-2 text-sm",
						children: LESSONS.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/lessons/$slug",
							params: { slug: l.slug },
							className: "font-semibold text-primary",
							children: l.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-muted-foreground",
							children: [
								l.age,
								" · ",
								l.duration
							]
						})] }, l.slug))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "secondary",
						className: "mt-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/health",
							children: "Открыть СВО здоровье"
						})
					})
				]
			})
		]
	}) })] });
}
//#endregion
export { Cabinet as component };
