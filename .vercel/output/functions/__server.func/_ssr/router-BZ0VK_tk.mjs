import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { _ as createRootRoute, b as useRouter, d as useRouterState, g as createFileRoute, h as lazyRouteComponent, l as Scripts, m as Outlet, p as createRouter, u as HeadContent, v as Link, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as TriangleAlert, r as Menu, t as X } from "../_libs/lucide-react.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { t as Slot } from "../_libs/radix-ui__react-slot.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-BZ0VK_tk.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: error.message || "An unexpected error occurred. Try reloading the page."
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	if (typeof window === "undefined") return () => {};
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	const parentOrigin = resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		if (envelope.data.type === "hello") {
			if (!HelloSchema.safeParse(event.data).success) return;
			announce();
			return;
		}
		if (envelope.data.type === "navigate") {
			const parsed = NavigateSchema.safeParse(event.data);
			if (!parsed.success) return;
			navigate(parsed.data.path);
			queueMicrotask(reportLocation);
			return;
		}
		if (envelope.data.type === "history") {
			const parsed = HistorySchema.safeParse(event.data);
			if (!parsed.success) return;
			if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
			window.history.go(parsed.data.delta);
		}
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
var SITE = {
	name: "СВОих девчонок не бросаем!",
	slogan: "Вместе сильнее в цифровом мире",
	region: "Чувашская Республика",
	year: 2026
};
var SUPPORT_MEASURES = [
	{
		title: "Шаг в мирную жизнь",
		category: "Занятость и адаптация",
		organization: "Правительство Чувашской Республики / Минтруд Чувашии",
		summary: "Адаптация и трудоустройство ветеранов."
	},
	{
		title: "Десант поддержки",
		category: "Адресная помощь",
		organization: "Минтруд Чувашии, центры занятости, фонд «Защитники Отечества»",
		summary: "Мобильные группы в муниципалитетах."
	},
	{
		title: "СВОи в бизнесе",
		category: "Предпринимательство",
		organization: "Центр «Мой бизнес» Чувашской Республики",
		summary: "Обучение и запуск бизнеса для ветеранов."
	},
	{
		title: "Ежемесячные выплаты детям школьникам",
		category: "Поддержка детей",
		organization: "Минтруд Чувашии / Центр предоставления мер соцподдержки",
		summary: "Ежемесячная денежная поддержка школьников из семей участников СВО."
	},
	{
		title: "Бесплатное двухразовое горячее питание",
		category: "Школа",
		organization: "Министерство образования и молодежной политики Чувашии",
		summary: "Поддержка школьников в образовательной среде."
	},
	{
		title: "Бесплатные кружки, секции, лагеря, культура и спорт",
		category: "Развитие детей",
		organization: "Минобр Чувашии и Минкульт Чувашии",
		summary: "Доступ к творческим, спортивным и культурным программам."
	},
	{
		title: "Специальная стипендия Главы для студентов",
		category: "Высшее образование",
		organization: "Министерство образования и молодежной политики Чувашии",
		summary: "Поддержка студентов из семей участников СВО."
	},
	{
		title: "Медицинская реабилитация",
		category: "Здоровье",
		organization: "Министерство здравоохранения Чувашской Республики",
		summary: "Система реабилитации и сопровождения."
	},
	{
		title: "Бесплатная психологическая помощь",
		category: "Психологическая поддержка",
		organization: "Министерство здравоохранения Чувашской Республики",
		summary: "Консультации и сопровождение взрослых и детей."
	},
	{
		title: "Бесплатная юридическая помощь",
		category: "Право",
		organization: "Адвокатская палата Чувашской Республики, органы власти, МФЦ",
		summary: "Юридические консультации по льготам, документам и правам."
	}
];
var LESSONS = [
	{
		slug: "vsem-mirom",
		title: "Всем миром",
		age: "5–8 классы",
		format: "Классный час + семейное задание",
		duration: "45 минут",
		summary: "Урок о традициях ниме, помочи, взаимовыручки и общественной ответственности."
	},
	{
		slug: "heroes-memory",
		title: "Память о защитниках",
		age: "7–11 классы",
		format: "Мультимедийный урок",
		duration: "60 минут",
		summary: "Школьники изучают семейную память, местную историю и создают цифровые портреты героев."
	},
	{
		slug: "digital-kindness",
		title: "Цифровая доброта",
		age: "5–11 классы",
		format: "Практикум",
		duration: "45 минут",
		summary: "Как цифровая среда может усиливать взаимопомощь, а не раскол."
	},
	{
		slug: "volunteer-lab",
		title: "Лаборатория общественных дел",
		age: "СПО / Вузы",
		format: "Проектная сессия",
		duration: "90 минут",
		summary: "Команды проектируют волонтёрские, культурные и образовательные инициативы для региона."
	}
];
function lessonBody(title) {
	return [
		`Цель урока: показать детям и молодёжи, как память о защитниках, взаимопомощь и цифровая культура собираются в единое общественное действие.`,
		`Структура занятия. Учитель открывает разговор о семье, памяти и взаимной ответственности. Затем класс работает с мультимедийными карточками героев и местной историей. Практическое задание закрепляет урок: история семьи, цифровая открытка, карта добрых дел или сценарий акции.`,
		`Результат: школьник понимает, что участие в общем деле начинается с конкретного поступка и уважения к семье защитника. Урок «${title}» встроен в просветительский контур портала и может быть подключён школой через личный кабинет педагога.`
	];
}
var NEWS = [
	{
		title: "Старт пилотного портала в Чувашской Республике",
		text: "Портал собирает меры поддержки, уроки, культурные проекты памяти, лабораторию и модуль здоровья в единую цифровую среду."
	},
	{
		title: "Открыт модуль «СВО здоровье»",
		text: "Пять направлений благополучия адаптированы по структуре корпоративной программы «ПРОздоровье» ГК «ПРОМОМЕД»."
	},
	{
		title: "Кабинет координатора принимает заявки",
		text: "Муниципальные координаторы видят поток заявок, статусы сопровождения и карту участия."
	}
];
var EVENTS = [
	{
		title: "Лаборатория социальной архитектуры",
		description: "Сессия лидеров команд по цифровой платформе, культуре, урокам и здоровью.",
		startsAt: "20 марта 2026, 11:00",
		place: "Онлайн"
	},
	{
		title: "Просветительский демопроект для школ",
		description: "Презентация уроков и проектных сценариев для педагогов Чувашии.",
		startsAt: "26 марта 2026, 14:00",
		place: "Чебоксары"
	},
	{
		title: "Круглый стол по модулю «СВО здоровье»",
		description: "Совместная сессия платформы, системы здравоохранения и партнёров по благополучию семей.",
		startsAt: "2 апреля 2026, 12:00",
		place: "Новочебоксарск"
	}
];
var LAB_TRACKS = [
	"Цифровая платформа и сервисы помощи",
	"Культурные проекты памяти и благодарности",
	"Просветительская и образовательная работа",
	"Модуль «СВО здоровье» и практики благополучия",
	"Муниципальная координация и медиапространство",
	"Бизнес, волонтёры и общественные партнёры"
];
var MEMORY_PROJECTS = [
	{
		title: "Цифровые портреты героев",
		text: "Школьники, музеи и дизайнеры создают медиаматериалы памяти и благодарности."
	},
	{
		title: "Маршруты дополненной реальности",
		text: "Городские и сельские пространства связываются с историями семей, защитников и местной памяти."
	},
	{
		title: "Выставки и общественные события",
		text: "Культура выступает активной средой общественной консолидации."
	}
];
var ARCHITECTURE = [
	{
		title: "Личный кабинет семьи",
		text: "Заявки, статусы сопровождения, маршруты помощи, события, участие в культурных, образовательных и оздоровительных проектах."
	},
	{
		title: "Кабинет координатора",
		text: "Поток заявок, роли пользователей, муниципальная картина участия, события и межведомственная координация."
	},
	{
		title: "Модуль «Уроки»",
		text: "Готовые уроки, сценарии, методические материалы, задания и подключение школ к просветительскому контуру."
	},
	{
		title: "Лаборатория социальной архитектуры",
		text: "Команды вузов, школ, музеев, техцентров и общественных организаций работают в единой проектной среде."
	},
	{
		title: "Память и культура",
		text: "Цифровые портреты героев, маршруты памяти, выставки, медиапроекты и общественные события благодарности."
	},
	{
		title: "СВО здоровье",
		text: "Пять направлений физического и ментального благополучия: спокойствие, рацион, движение, ценности и выбор."
	}
];
var HEALTH_MODULES = [
	{
		slug: "spokoystvie",
		title: "СВОё спокойствие",
		source: "на базе «Таблетки-антистресс»",
		image: "/photos/calm.jpg",
		lead: "Психологическая разгрузка и управление стрессом. Верифицированные методики снижения тревожности, дыхательные практики и доступ к консультациям специалистов.",
		practices: [
			"Дыхательный цикл 4–7–8 для вечернего снижения напряжения",
			"Карточки самонаблюдения: что происходит с телом в момент тревоги",
			"Маршрут к бесплатной психологической помощи региона",
			"Короткий дневник состояний в личном кабинете"
		]
	},
	{
		slug: "racion",
		title: "СВОй рацион",
		source: "на базе «Рациона здоровья»",
		image: "/photos/ration.jpg",
		lead: "Культура питания и лекарственная грамотность. Рекомендации по витаминной поддержке и устойчивому рациону в периоды высокой нагрузки.",
		practices: [
			"Калькулятор ориентиров по индексу массы тела",
			"Принципы тарелки дня: белок, овощи, крупы, вода",
			"Памятка: как читать инструкцию к витаминным комплексам",
			"Сезонные продукты Чувашии для семейного стола"
		]
	},
	{
		slug: "dvizhenie",
		title: "СВОё движение",
		source: "на базе «Движения вверх»",
		image: "/photos/move.jpg",
		lead: "Физическая активность и восстановительная гимнастика. Короткие домашние комплексы, которые поддерживают тонус и помогают телу справляться со стрессом.",
		practices: [
			"Утренний комплекс на 8 минут без инвентаря",
			"Сидячая разминка для тех, кто много работает за столом",
			"Мягкая мобилизация шеи, плеч и поясницы",
			"Трекер домашних занятий в кабинете семьи"
		]
	},
	{
		slug: "cennosti",
		title: "СВОи ценности",
		source: "на базе «Семейных ценностей»",
		image: "/photos/family.jpg",
		lead: "Укрепление внутрисемейных связей и социальная адаптация. Вебинары, обмен опытом и сохранение контакта с близкими на расстоянии.",
		practices: [
			"Семейный ритуал недели: один общий разговор без экранов",
			"Вебинары по воспитанию и поддержке детей",
			"Письма и голосовые послания как практика связи",
			"Круг семей платформы: обмен опытом в безопасном контуре"
		]
	},
	{
		slug: "vybor",
		title: "СВОй выбор",
		source: "на базе «Мыслим трезво» и «Дыши свободно»",
		image: "/photos/choice.jpg",
		lead: "Профилактика вредных привычек и забота о дыхательных путях. Научно обоснованные практики ЗОЖ вместо разрушительных способов справиться со стрессом.",
		practices: [
			"Карта триггеров: когда тянет к сигарете или алкоголю",
			"Замена ритуала: дыхание, прогулка, вода, звонок близкому",
			"Дневник свободных дней",
			"Маршрут к региональным программам отказа от курения"
		]
	}
];
var ROLE_LABELS = {
	family: "Семья",
	volunteer: "Волонтёр",
	coordinator: "Координатор",
	teacher: "Педагог",
	partner: "Партнёр"
};
var DEMO_ACCOUNTS = [
	{
		email: "admin@svoihdevchonok.ru",
		password: "admin123",
		role: "coordinator",
		fullName: "Администратор проекта",
		municipality: "Чебоксары"
	},
	{
		email: "family@example.ru",
		password: "family123",
		role: "family",
		fullName: "Семья защитника",
		municipality: "Новочебоксарск"
	},
	{
		email: "teacher@example.ru",
		password: "teacher123",
		role: "teacher",
		fullName: "Педагог",
		municipality: "Чебоксары"
	},
	{
		email: "volunteer@example.ru",
		password: "volunteer123",
		role: "volunteer",
		fullName: "Волонтёр",
		municipality: "Канаш"
	}
];
var APP_TYPES = [
	{
		value: "psychology",
		label: "Психологическая помощь"
	},
	{
		value: "legal",
		label: "Юридическая помощь"
	},
	{
		value: "lesson",
		label: "Подключение уроков"
	},
	{
		value: "culture",
		label: "Культурный проект"
	},
	{
		value: "volunteer",
		label: "Волонтёрская помощь"
	},
	{
		value: "health",
		label: "СВО здоровье"
	}
];
var WEBINARS = [
	{
		title: "Как говорить с детьми о разлуке и ожидании",
		when: "12 апреля, 18:00",
		format: "Онлайн"
	},
	{
		title: "Семейный стол как практика поддержки",
		when: "19 апреля, 11:00",
		format: "Чебоксары + онлайн"
	},
	{
		title: "Контакт на расстоянии: письма, голос, ритуалы",
		when: "26 апреля, 19:00",
		format: "Онлайн"
	}
];
var EXERCISES = [
	{
		name: "Дыхание стоя у окна",
		minutes: 3,
		text: "Плечи опущены. Вдох носом на четыре счёта, выдох ртом на шесть. Повторить восемь циклов."
	},
	{
		name: "Мобилизация шеи",
		minutes: 4,
		text: "Медленные наклоны уха к плечу. Без рывков. По шесть повторений в каждую сторону."
	},
	{
		name: "Сидячая разминка спины",
		minutes: 5,
		text: "Ладони на бёдрах, мягкое скручивание корпуса. Сохранять длинную шею."
	},
	{
		name: "Прогулка вокруг дома",
		minutes: 12,
		text: "Ровный шаг, внимание на стопы и дыхание. Телефон остаётся в кармане."
	}
];
var seedUsers = DEMO_ACCOUNTS.map((a, i) => ({
	id: String(i + 1),
	email: a.email,
	fullName: a.fullName,
	role: a.role,
	municipality: a.municipality
}));
var seedPasswords = Object.fromEntries(DEMO_ACCOUNTS.map((a) => [a.email, a.password]));
var seedApps = [
	{
		id: "a1",
		userId: "2",
		fullName: "Семья защитника",
		role: "family",
		municipality: "Новочебоксарск",
		type: "psychology",
		message: "Нужна консультация для матери и ребёнка",
		status: "new",
		createdAt: "2026-03-12"
	},
	{
		id: "a2",
		userId: "3",
		fullName: "Педагог",
		role: "teacher",
		municipality: "Чебоксары",
		type: "lesson",
		message: "Школа просит подключить модуль уроков памяти",
		status: "in_progress",
		createdAt: "2026-03-14"
	},
	{
		id: "a3",
		userId: "2",
		fullName: "Семья защитника",
		role: "family",
		municipality: "Новочебоксарск",
		type: "culture",
		message: "Просьба помочь включить семью в региональный проект памяти",
		status: "done",
		createdAt: "2026-03-08"
	}
];
var useSession = create()(persist((set, get) => ({
	user: null,
	users: seedUsers,
	passwords: seedPasswords,
	applications: seedApps,
	healthDays: { "2": 6 },
	exerciseDone: {},
	journal: {},
	login: (email, password) => {
		const e = email.trim().toLowerCase();
		const found = get().users.find((u) => u.email === e);
		const pass = get().passwords[e];
		if (!found || !pass || pass !== password) return "Неверная почта или пароль.";
		set({ user: found });
		return null;
	},
	register: ({ email, password, fullName, role, municipality }) => {
		const e = email.trim().toLowerCase();
		if (!fullName || !e || !password) return "Заполните обязательные поля.";
		if (get().users.some((u) => u.email === e)) return "Пользователь с такой почтой уже существует.";
		const user = {
			id: crypto.randomUUID(),
			email: e,
			fullName,
			role,
			municipality: municipality || "Чебоксары"
		};
		set((s) => ({
			users: [...s.users, user],
			passwords: {
				...s.passwords,
				[e]: password
			}
		}));
		return null;
	},
	logout: () => set({ user: null }),
	addApplication: (type, message) => {
		const user = get().user;
		if (!user) return;
		const app = {
			id: crypto.randomUUID(),
			userId: user.id,
			fullName: user.fullName,
			role: user.role,
			municipality: user.municipality,
			type,
			message,
			status: "new",
			createdAt: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10)
		};
		set((s) => ({ applications: [app, ...s.applications] }));
	},
	updateStatus: (id, status) => set((s) => ({ applications: s.applications.map((a) => a.id === id ? {
		...a,
		status
	} : a) })),
	bumpHealthDay: (userId) => set((s) => ({ healthDays: {
		...s.healthDays,
		[userId]: (s.healthDays[userId] ?? 0) + 1
	} })),
	toggleExercise: (userId, name) => set((s) => {
		const cur = s.exerciseDone[userId] ?? [];
		const next = cur.includes(name) ? cur.filter((n) => n !== name) : [...cur, name];
		return { exerciseDone: {
			...s.exerciseDone,
			[userId]: next
		} };
	}),
	addJournal: (userId, note) => set((s) => ({ journal: {
		...s.journal,
		[userId]: [note, ...s.journal[userId] ?? []].slice(0, 8)
	} }))
}), {
	name: "svoi-portal-session",
	skipHydration: true
}));
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors duration-[var(--motion-quick)] ease-[var(--ease-out)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground hover:bg-primary/90",
			secondary: "bg-card text-foreground border border-border hover:bg-surface-soft",
			ghost: "text-foreground hover:bg-surface-soft",
			outline: "border border-border bg-transparent hover:bg-card"
		},
		size: {
			default: "h-11 px-5 rounded-[var(--radius-md)] text-sm",
			sm: "h-9 px-3 rounded-[var(--radius-sm)] text-sm",
			lg: "h-12 px-6 rounded-[var(--radius-md)] text-base"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Button({ className, variant, size, asChild = false, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size
		}), className),
		...props
	});
}
var NAV = [
	{
		to: "/",
		label: "Главная"
	},
	{
		to: "/about",
		label: "О проекте"
	},
	{
		to: "/support",
		label: "Меры поддержки"
	},
	{
		to: "/lessons",
		label: "Уроки"
	},
	{
		to: "/health",
		label: "СВО здоровье"
	},
	{
		to: "/lab",
		label: "Лаборатория"
	},
	{
		to: "/memory",
		label: "Память"
	}
];
function Layout({ children }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const user = useSession((s) => s.user);
	const logout = useSession((s) => s.logout);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-bg text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "sticky top-0 z-30 border-b border-border/80 bg-bg/90 backdrop-blur-md",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-[1180px] items-center justify-between gap-4 px-4 py-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/",
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-display text-[15px] font-semibold leading-tight text-primary sm:text-lg",
								children: SITE.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-xs text-muted-foreground sm:text-sm",
								children: ["Пилотный портал · ", SITE.region]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "inline-flex h-11 w-11 items-center justify-center rounded-[var(--radius-md)] border border-border bg-card lg:hidden",
							onClick: () => setOpen((v) => !v),
							"aria-label": "Меню",
							children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
							className: "hidden flex-wrap items-center gap-1 lg:flex",
							children: [NAV.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: item.to,
								className: cn("rounded-[var(--radius-sm)] px-3 py-2 text-sm font-medium", pathname === item.to ? "bg-card text-primary" : "text-foreground/80 hover:bg-card"),
								children: item.label
							}, item.to)), user ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								user.role === "coordinator" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/coordinator",
									className: "rounded-[var(--radius-sm)] px-3 py-2 text-sm font-medium hover:bg-card",
									children: "Координатор"
								}) : null,
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/cabinet",
									className: "rounded-[var(--radius-sm)] px-3 py-2 text-sm font-medium hover:bg-card",
									children: "Кабинет"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									variant: "secondary",
									onClick: logout,
									children: "Выход"
								})
							] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								size: "sm",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/login",
									children: "Вход"
								})
							})]
						})
					]
				}), open ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					className: "grid gap-1 border-t border-border bg-card px-4 py-3 lg:hidden",
					children: [NAV.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: item.to,
						onClick: () => setOpen(false),
						className: "rounded-[var(--radius-sm)] px-3 py-3 text-sm font-medium",
						children: item.label
					}, item.to)), user ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/cabinet",
						onClick: () => setOpen(false),
						className: "px-3 py-3 text-sm font-medium",
						children: "Кабинет"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "px-3 py-3 text-left text-sm font-medium",
						onClick: () => {
							logout();
							setOpen(false);
						},
						children: "Выход"
					})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/login",
						onClick: () => setOpen(false),
						className: "px-3 py-3 text-sm font-medium",
						children: "Вход"
					})]
				}) : null]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", { children }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
				className: "mt-12 bg-ink text-primary-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto grid max-w-[1180px] gap-8 px-4 py-10 md:grid-cols-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-display text-lg font-semibold",
							children: SITE.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-primary-foreground/70",
							children: SITE.slogan
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-sm font-semibold",
							children: "Контур портала"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-primary-foreground/70",
							children: "Меры поддержки, уроки, лаборатория, память, личные кабинеты и модуль «СВО здоровье»."
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-sm font-semibold",
							children: "Пилот"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-sm text-primary-foreground/70",
							children: [SITE.region, ". Стартовая версия для масштабирования в другие регионы."]
						})] })
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-[1180px] border-t border-white/10 px-4 py-4 text-sm text-primary-foreground/55",
					children: [
						"© ",
						SITE.year,
						" ",
						SITE.name
					]
				})]
			})
		]
	});
}
function PageHeader({ eyebrow, title, lead }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "px-4 pb-4 pt-10",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-[1180px]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mb-4 inline-flex rounded-full border border-border bg-card px-3 py-1.5 text-xs font-semibold text-primary",
					children: eyebrow
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "max-w-4xl text-3xl sm:text-5xl",
					children: title
				}),
				lead ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg",
					children: lead
				}) : null
			]
		})
	});
}
function Wrap({ children, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: cn("px-4 py-10", className),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto max-w-[1180px]",
			children
		})
	});
}
var styles_default = "/assets/styles-CrKGVbpY.css";
var APP_NAME = "СВОих девчонок не бросаем!";
var Route$13 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: APP_NAME },
			{
				name: "description",
				content: "Пилотный портал Чувашской Республики: поддержка семей, уроки, память и модуль СВО здоровье."
			},
			{
				name: "theme-color",
				content: "#1A3654"
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&family=Unbounded:wght@500;600&display=swap"
			}
		]
	}),
	component: Root
});
function Root() {
	(0, import_react.useEffect)(() => {
		useSession.persist.rehydrate();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "ru",
		className: "antialiased",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
		] })]
	});
}
var $$splitComponentImporter$12 = () => import("./routes-BzrYmmgT.mjs");
var Route$12 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$12, "component") });
var $$splitComponentImporter$11 = () => import("./about-CFib26g6.mjs");
var Route$11 = createFileRoute("/about")({ component: lazyRouteComponent($$splitComponentImporter$11, "component") });
var $$splitComponentImporter$10 = () => import("./cabinet-DYOgWPeB.mjs");
var Route$10 = createFileRoute("/cabinet")({ component: lazyRouteComponent($$splitComponentImporter$10, "component") });
var $$splitComponentImporter$9 = () => import("./coordinator-Bw1QFoDB.mjs");
var Route$9 = createFileRoute("/coordinator")({ component: lazyRouteComponent($$splitComponentImporter$9, "component") });
var $$splitComponentImporter$8 = () => import("./health-DdocEllG.mjs");
var Route$8 = createFileRoute("/health")({ component: lazyRouteComponent($$splitComponentImporter$8, "component") });
var $$splitComponentImporter$7 = () => import("./lab-CgBmii3R.mjs");
var Route$7 = createFileRoute("/lab")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
var $$splitComponentImporter$6 = () => import("./lessons-hbPV39IN.mjs");
var Route$6 = createFileRoute("/lessons")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./login-C3rXxG5t.mjs");
var Route$5 = createFileRoute("/login")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./memory-DNqKyUjn.mjs");
var Route$4 = createFileRoute("/memory")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./register-KjNFn_ij.mjs");
var Route$3 = createFileRoute("/register")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./support-DjTUVjYS.mjs");
var Route$2 = createFileRoute("/support")({
	validateSearch: (s) => ({ category: typeof s.category === "string" ? s.category : void 0 }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./health._slug-8i7d4vJA.mjs");
var Route$1 = createFileRoute("/health/$slug")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./lessons._slug-F-m4WeCD.mjs");
var Route = createFileRoute("/lessons/$slug")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var IndexRoute = Route$12.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$13
});
var AboutRoute = Route$11.update({
	id: "/about",
	path: "/about",
	getParentRoute: () => Route$13
});
var CabinetRoute = Route$10.update({
	id: "/cabinet",
	path: "/cabinet",
	getParentRoute: () => Route$13
});
var CoordinatorRoute = Route$9.update({
	id: "/coordinator",
	path: "/coordinator",
	getParentRoute: () => Route$13
});
var HealthRoute = Route$8.update({
	id: "/health",
	path: "/health",
	getParentRoute: () => Route$13
});
var LabRoute = Route$7.update({
	id: "/lab",
	path: "/lab",
	getParentRoute: () => Route$13
});
var LessonsRoute = Route$6.update({
	id: "/lessons",
	path: "/lessons",
	getParentRoute: () => Route$13
});
var LoginRoute = Route$5.update({
	id: "/login",
	path: "/login",
	getParentRoute: () => Route$13
});
var MemoryRoute = Route$4.update({
	id: "/memory",
	path: "/memory",
	getParentRoute: () => Route$13
});
var RegisterRoute = Route$3.update({
	id: "/register",
	path: "/register",
	getParentRoute: () => Route$13
});
var SupportRoute = Route$2.update({
	id: "/support",
	path: "/support",
	getParentRoute: () => Route$13
});
var HealthSlugRoute = Route$1.update({
	id: "/$slug",
	path: "/$slug",
	getParentRoute: () => HealthRoute
});
var LessonsSlugRoute = Route.update({
	id: "/$slug",
	path: "/$slug",
	getParentRoute: () => LessonsRoute
});
var HealthRouteChildren = { HealthSlugRoute };
var HealthRouteWithChildren = HealthRoute._addFileChildren(HealthRouteChildren);
var LessonsRouteChildren = { LessonsSlugRoute };
var rootRouteChildren = {
	IndexRoute,
	AboutRoute,
	CabinetRoute,
	CoordinatorRoute,
	HealthRoute: HealthRouteWithChildren,
	LabRoute,
	LessonsRoute: LessonsRoute._addFileChildren(LessonsRouteChildren),
	LoginRoute,
	MemoryRoute,
	RegisterRoute,
	SupportRoute
};
var routeTree = Route$13._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { WEBINARS as C, SUPPORT_MEASURES as S, LESSONS as _, PageHeader as a, ROLE_LABELS as b, cn as c, ARCHITECTURE as d, DEMO_ACCOUNTS as f, LAB_TRACKS as g, HEALTH_MODULES as h, Route$2 as i, useSession as l, EXERCISES as m, Route as n, Wrap as o, EVENTS as p, Route$1 as r, Button as s, router_exports as t, APP_TYPES as u, MEMORY_PROJECTS as v, lessonBody as w, SITE as x, NEWS as y };
