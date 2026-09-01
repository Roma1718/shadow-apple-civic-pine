import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as WEBINARS, l as useSession, m as EXERCISES, s as Button } from "./router-BZ0VK_tk.mjs";
import { n as Label, r as Textarea, t as Input } from "./input-B3wM0GbD.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/health-tools-DRlo5b3Z.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Disclaimer() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "rounded-[var(--radius-lg)] border border-border bg-card p-4 text-sm text-muted-foreground",
		children: "Материалы модуля носят просветительский характер и не заменяют очную консультацию врача. При острой тревоге, боли в груди или суицидальных мыслях обратитесь в скорую помощь и к региональным службам поддержки."
	});
}
function BreathTool() {
	const [running, setRunning] = (0, import_react.useState)(false);
	const [phase, setPhase] = (0, import_react.useState)("Вдох");
	const [count, setCount] = (0, import_react.useState)(4);
	function start() {
		setRunning(true);
		const seq = [
			{
				label: "Вдох",
				seconds: 4
			},
			{
				label: "Задержка",
				seconds: 7
			},
			{
				label: "Выдох",
				seconds: 8
			}
		];
		let i = 0;
		let left = seq[0].seconds;
		setPhase(seq[0].label);
		setCount(left);
		const id = window.setInterval(() => {
			left -= 1;
			if (left <= 0) {
				i = (i + 1) % seq.length;
				left = seq[i].seconds;
				setPhase(seq[i].label);
			}
			setCount(left);
		}, 1e3);
		window.setTimeout(() => {
			window.clearInterval(id);
			setRunning(false);
			setPhase("Готово");
			setCount(0);
		}, 76e3);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-[var(--radius-xl)] border border-border bg-card p-6 shadow-[var(--shadow-card)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-display text-xl",
				children: "Цикл 4–7–8"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted-foreground",
				children: "Четыре полных круга. Сидя, спина опирается, плечи мягкие."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 flex flex-col items-center gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex size-40 items-center justify-center rounded-full border border-border bg-surface-soft",
					style: {
						transform: running && phase === "Вдох" ? "scale(1.06)" : "scale(1)",
						transition: "transform 4s var(--ease-out)"
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-display text-3xl tabular-nums",
							children: running ? count : "—"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-sm text-muted-foreground",
							children: phase
						})]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: start,
					disabled: running,
					children: running ? "Цикл идёт" : "Начать практику"
				})]
			})
		]
	});
}
function BmiTool() {
	const [h, setH] = (0, import_react.useState)("168");
	const [w, setW] = (0, import_react.useState)("72");
	const bmi = (0, import_react.useMemo)(() => {
		const height = Number(h) / 100;
		const weight = Number(w);
		if (!height || !weight) return null;
		return weight / (height * height);
	}, [h, w]);
	const label = bmi == null ? "" : bmi < 18.5 ? "Ниже ориентира. Имеет смысл обсудить рацион с врачом." : bmi < 25 ? "В общепринятом ориентире. Держите регулярность питания и воды." : bmi < 30 ? "Выше ориентира. Движение и тарелка дня дают устойчивый эффект." : "Существенно выше ориентира. Это повод для очной консультации.";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-[var(--radius-xl)] border border-border bg-card p-6 shadow-[var(--shadow-card)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-display text-xl",
				children: "Ориентир по ИМТ"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted-foreground",
				children: "Калькулятор показывает учебный ориентир, а не диагноз."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 grid gap-4 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, { children: ["Рост, см", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: h,
					onChange: (e) => setH(e.target.value),
					inputMode: "numeric"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, { children: ["Вес, кг", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: w,
					onChange: (e) => setW(e.target.value),
					inputMode: "numeric"
				})] })]
			}),
			bmi != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 rounded-[var(--radius-md)] bg-surface-soft p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "font-display text-3xl tabular-nums",
					children: bmi.toFixed(1)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: label
				})]
			}) : null
		]
	});
}
function MovementTool() {
	const user = useSession((s) => s.user);
	const done = useSession((s) => user ? s.exerciseDone[user.id] ?? [] : []);
	const toggle = useSession((s) => s.toggleExercise);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid gap-4",
		children: EXERCISES.map((ex) => {
			const on = user ? done.includes(ex.name) : false;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("article", {
				className: "rounded-[var(--radius-xl)] border border-border bg-card p-5 shadow-[var(--shadow-card)]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-lg",
						children: ex.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: [
							ex.minutes,
							" минут · ",
							ex.text
						]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: on ? "default" : "secondary",
						onClick: () => user && toggle(user.id, ex.name),
						disabled: !user,
						children: on ? "Сделано" : "Отметить"
					})]
				})
			}, ex.name);
		})
	});
}
function ValuesTool() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid gap-4",
		children: WEBINARS.map((w) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
			className: "rounded-[var(--radius-xl)] border border-border bg-card p-5 shadow-[var(--shadow-card)]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-display text-lg",
				children: w.title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-sm text-muted-foreground",
				children: [
					w.when,
					" · ",
					w.format
				]
			})]
		}, w.title))
	});
}
function ChoiceTool() {
	const user = useSession((s) => s.user);
	const days = useSession((s) => user ? s.healthDays[user.id] ?? 0 : 0);
	const bump = useSession((s) => s.bumpHealthDay);
	const addJournal = useSession((s) => s.addJournal);
	const notes = useSession((s) => user ? s.journal[user.id] ?? [] : []);
	const [note, setNote] = (0, import_react.useState)("");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-[var(--radius-xl)] border border-border bg-card p-6 shadow-[var(--shadow-card)]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display text-xl",
					children: "Свободные дни"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Отметьте день, когда удалось обойтись без сигареты или алкоголя как способа снять стресс."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 flex items-end justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-display text-4xl tabular-nums",
						children: days
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-sm text-muted-foreground",
						children: "отмеченных дней"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: () => user && bump(user.id),
						disabled: !user,
						children: "Отметить день"
					})]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-[var(--radius-xl)] border border-border bg-card p-6 shadow-[var(--shadow-card)]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display text-xl",
					children: "Дневник замены ритуала"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
					className: "mt-4",
					children: ["Что сделали вместо разрушительного ритуала", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						value: note,
						onChange: (e) => setNote(e.target.value),
						rows: 3
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "mt-4",
					onClick: () => {
						if (!user || !note.trim()) return;
						addJournal(user.id, note.trim());
						setNote("");
					},
					disabled: !user,
					children: "Сохранить"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4 grid gap-2",
					children: notes.map((n, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "rounded-[var(--radius-md)] bg-surface-soft px-3 py-2 text-sm",
						children: n
					}, i))
				})
			]
		})]
	});
}
function QrPass() {
	const user = useSession((s) => s.user);
	const code = user ? `SVO-${user.id.slice(0, 4).toUpperCase()}-${user.municipality.slice(0, 3).toUpperCase()}` : "SVO-DEMO-CHB";
	const cells = (0, import_react.useMemo)(() => {
		const size = 13;
		const out = [];
		let h = 0;
		for (const ch of code) h = h * 33 + ch.charCodeAt(0) >>> 0;
		for (let i = 0; i < 169; i++) {
			h = h * 1664525 + 1013904223 >>> 0;
			const x = i % size;
			const y = Math.floor(i / size);
			const finder = x < 3 && y < 3 || x > 9 && y < 3 || x < 3 && y > 9;
			out.push(finder || h % 3 === 0);
		}
		return {
			size,
			out
		};
	}, [code]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-[var(--radius-xl)] border border-border bg-card p-6 shadow-[var(--shadow-card)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-display text-xl",
				children: "Карта доступа семьи"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted-foreground",
				children: "Демонстрационный контур 152-ФЗ: доступ к чувствительным материалам модуля здоровья открывается по семейному коду и роли пользователя."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 flex flex-wrap items-center gap-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
					viewBox: `0 0 ${cells.size} ${cells.size}`,
					className: "size-32 rounded-[var(--radius-sm)] bg-card",
					"aria-hidden": true,
					children: cells.out.map((on, i) => on ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
						x: i % cells.size,
						y: Math.floor(i / cells.size),
						width: "1",
						height: "1",
						fill: "#141a24"
					}, i) : null)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "font-display text-lg",
					children: code
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: user ? `${user.fullName} · роль сохраняется в кабинете` : "Войдите в кабинет, чтобы привязать код к семье"
				})] })]
			})
		]
	});
}
//#endregion
export { MovementTool as a, Disclaimer as i, BreathTool as n, QrPass as o, ChoiceTool as r, ValuesTool as s, BmiTool as t };
