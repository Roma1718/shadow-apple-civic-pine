import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { v as Link, x as require_jsx_runtime, y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as PageHeader, b as ROLE_LABELS, f as DEMO_ACCOUNTS, l as useSession, o as Wrap, s as Button } from "./router-BZ0VK_tk.mjs";
import { n as Label, t as Input } from "./input-B3wM0GbD.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-C3rXxG5t.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Login() {
	const login = useSession((s) => s.login);
	const navigate = useNavigate();
	const [email, setEmail] = (0, import_react.useState)("family@example.ru");
	const [password, setPassword] = (0, import_react.useState)("family123");
	const [error, setError] = (0, import_react.useState)(null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		eyebrow: "Личный кабинет",
		title: "Вход в портал",
		lead: "Кабинеты семьи, педагога, волонтёра и координатора."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wrap, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-6 lg:grid-cols-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "grid gap-4 rounded-[var(--radius-xl)] border border-border bg-card p-6 shadow-[var(--shadow-card)]",
			onSubmit: (e) => {
				e.preventDefault();
				const err = login(email, password);
				if (err) setError(err);
				else navigate({ to: "/cabinet" });
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, { children: ["Почта", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					type: "email",
					value: email,
					onChange: (e) => setEmail(e.target.value),
					required: true
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, { children: ["Пароль", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					type: "password",
					value: password,
					onChange: (e) => setPassword(e.target.value),
					required: true
				})] }),
				error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-red-800",
					children: error
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					children: "Войти"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/register",
					className: "text-sm font-semibold text-primary",
					children: "Регистрация"
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "rounded-[var(--radius-xl)] border border-border bg-card p-6 shadow-[var(--shadow-card)]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-display text-xl",
				children: "Демо-доступы для партнёров"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-4 grid gap-4 text-sm",
				children: DEMO_ACCOUNTS.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-semibold",
						children: ROLE_LABELS[a.role]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-muted-foreground",
						children: a.email
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-muted-foreground",
						children: a.password
					})
				] }, a.email))
			})]
		})]
	}) })] });
}
//#endregion
export { Login as component };
