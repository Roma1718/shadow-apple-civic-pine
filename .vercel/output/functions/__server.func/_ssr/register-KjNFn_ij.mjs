import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { x as require_jsx_runtime, y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as PageHeader, l as useSession, o as Wrap, s as Button } from "./router-BZ0VK_tk.mjs";
import { n as Label, t as Input } from "./input-B3wM0GbD.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/register-KjNFn_ij.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Register() {
	const register = useSession((s) => s.register);
	const navigate = useNavigate();
	const [fullName, setFullName] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [role, setRole] = (0, import_react.useState)("family");
	const [municipality, setMunicipality] = (0, import_react.useState)("Чебоксары");
	const [error, setError] = (0, import_react.useState)(null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		eyebrow: "Регистрация",
		title: "Подключение к порталу",
		lead: "Новая семья, педагог, волонтёр, координатор или партнёр."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wrap, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "mx-auto grid max-w-xl gap-4 rounded-[var(--radius-xl)] border border-border bg-card p-6 shadow-[var(--shadow-card)]",
		onSubmit: (e) => {
			e.preventDefault();
			const err = register({
				email,
				password,
				fullName,
				role,
				municipality
			});
			if (err) setError(err);
			else navigate({ to: "/login" });
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, { children: ["ФИО", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				value: fullName,
				onChange: (e) => setFullName(e.target.value),
				required: true
			})] }),
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
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, { children: ["Роль", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
				className: "h-11 rounded-[var(--radius-md)] border border-border bg-card px-3 text-sm",
				value: role,
				onChange: (e) => setRole(e.target.value),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "family",
						children: "Семья"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "teacher",
						children: "Педагог"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "volunteer",
						children: "Волонтёр"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "partner",
						children: "Партнёр"
					})
				]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, { children: ["Муниципалитет", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				value: municipality,
				onChange: (e) => setMunicipality(e.target.value)
			})] }),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-red-800",
				children: error
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "submit",
				children: "Зарегистрироваться"
			})
		]
	}) })] });
}
//#endregion
export { Register as component };
