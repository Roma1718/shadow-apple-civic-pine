import { v as Link, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as PageHeader, h as HEALTH_MODULES, o as Wrap } from "./router-BZ0VK_tk.mjs";
import { i as Disclaimer, o as QrPass } from "./health-tools-DRlo5b3Z.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/health-DdocEllG.js
var import_jsx_runtime = require_jsx_runtime();
function Health() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		eyebrow: "Модуль «СВО здоровье»",
		title: "Физическое и ментальное благополучие семей",
		lead: "Комплексный контур заботы на платформе «Своих девчонок не бросаем», построенный по структуре корпоративной программы «ПРОздоровье» ГК «ПРОМОМЕД»."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Wrap, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-8 max-w-3xl space-y-4 text-muted-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Актуальность модуля связана с задачами реабилитации и адаптации людей, которые прошли через нагрузку СВО. Восстановление нервной системы, поддержание иммунитета и сохранение семейных связей становятся частью единого социального контура, а не отдельными ведомственными услугами." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Пять направлений переведены на язык семей платформы: спокойствие, рацион, движение, ценности и выбор. Контент носит просветительский характер. Медицинские решения остаются за врачами региональной системы здравоохранения." })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-8",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Disclaimer, {})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-5 md:grid-cols-2",
			children: HEALTH_MODULES.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/health/$slug",
				params: { slug: m.slug },
				className: "overflow-hidden rounded-[var(--radius-xl)] border border-border bg-card shadow-[var(--shadow-card)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: m.image,
					alt: "",
					className: "h-48 w-full object-cover"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs font-semibold text-accent",
							children: m.source
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-1 font-display text-2xl",
							children: m.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm text-muted-foreground",
							children: m.lead
						})
					]
				})]
			}, m.slug))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-8 grid gap-6 lg:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QrPass, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "rounded-[var(--radius-xl)] border border-border bg-card p-6 shadow-[var(--shadow-card)]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-xl",
						children: "Партнёрский контур"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm text-muted-foreground",
						children: "Модуль показывает, как экспертиза «ПРОМОМЕД» в области социально значимых заболеваний и корпоративной программы «ПРОздоровье» превращается в доступный сервис для семей участников СВО. Роли пользователей и семейный код доступа защищают чувствительные данные в логике 152-ФЗ."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "mt-4 grid gap-2 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Доступность 24/7 через привычный интерфейс портала" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Верификация просветительского контента медицинской экспертизой" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Адресность: заявка из кабинета семьи уходит координатору" })
						]
					})
				]
			})]
		})
	] })] });
}
//#endregion
export { Health as component };
