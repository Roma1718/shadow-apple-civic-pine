import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { x as require_jsx_runtime, y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as PageHeader, b as ROLE_LABELS, l as useSession, o as Wrap, s as Button, u as APP_TYPES } from "./router-BZ0VK_tk.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/coordinator-Bw1QFoDB.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Coordinator() {
	const user = useSession((s) => s.user);
	const applications = useSession((s) => s.applications);
	const users = useSession((s) => s.users);
	const updateStatus = useSession((s) => s.updateStatus);
	const navigate = useNavigate();
	(0, import_react.useEffect)(() => {
		if (!user) navigate({ to: "/login" });
		else if (user.role !== "coordinator") navigate({ to: "/cabinet" });
	}, [user, navigate]);
	if (!user || user.role !== "coordinator") return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		eyebrow: "Кабинет координатора",
		title: "Муниципальная и межведомственная координация",
		lead: "Заявки, пользователи, статусы сопровождения."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wrap, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-6 lg:grid-cols-[1.6fr_0.4fr]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "overflow-hidden rounded-[var(--radius-xl)] border border-border bg-card shadow-[var(--shadow-card)]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "p-5 font-display text-xl",
				children: "Заявки"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-x-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full min-w-[720px] text-left text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
						className: "border-y border-border bg-surface-soft",
						children: [
							"Пользователь",
							"Роль",
							"Муниципалитет",
							"Тип",
							"Запрос",
							"Статус",
							"Обновить"
						].map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-3 py-3 font-semibold",
							children: h
						}, h))
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: applications.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						item,
						onSave: (status) => updateStatus(item.id, status)
					}, item.id)) })]
				})
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "h-fit rounded-[var(--radius-xl)] border border-border bg-card p-5 shadow-[var(--shadow-card)]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-display text-xl",
				children: "Пользователи"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-4 grid gap-3 text-sm",
				children: users.map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: u.fullName }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-muted-foreground",
					children: [
						ROLE_LABELS[u.role],
						" · ",
						u.municipality
					]
				})] }, u.id))
			})]
		})]
	}) })] });
}
function Row({ item, onSave }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
		className: "border-b border-border align-top",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "px-3 py-3",
				children: item.fullName
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "px-3 py-3",
				children: ROLE_LABELS[item.role]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "px-3 py-3",
				children: item.municipality
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "px-3 py-3",
				children: APP_TYPES.find((t) => t.value === item.type)?.label ?? item.type
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "px-3 py-3",
				children: item.message
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "px-3 py-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "rounded-full bg-surface-soft px-2 py-1 text-xs font-semibold uppercase",
					children: item.status
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "px-3 py-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "flex flex-col gap-2",
					onSubmit: (e) => {
						e.preventDefault();
						const fd = new FormData(e.currentTarget);
						onSave(String(fd.get("status")));
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						name: "status",
						defaultValue: item.status,
						className: "h-9 rounded-[var(--radius-sm)] border border-border bg-card px-2 text-xs",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "new",
								children: "new"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "in_progress",
								children: "in_progress"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "done",
								children: "done"
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "secondary",
						type: "submit",
						children: "Сохранить"
					})]
				})
			})
		]
	});
}
//#endregion
export { Coordinator as component };
