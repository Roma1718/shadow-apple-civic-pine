import { useMemo, useState } from "react";
import { Button } from "./ui/button";
import { Input, Label, Textarea } from "./ui/input";
import { EXERCISES, WEBINARS } from "@/lib/content";
import { useSession } from "@/lib/session";

export function BreathTool() {
  const [running, setRunning] = useState(false);
  const [phase, setPhase] = useState("Вдох");
  const [count, setCount] = useState(4);

  function start() {
    setRunning(true);
    const seq: { label: string; seconds: number }[] = [
      { label: "Вдох", seconds: 4 },
      { label: "Задержка", seconds: 7 },
      { label: "Выдох", seconds: 8 },
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
    }, 1000);
    window.setTimeout(() => {
      window.clearInterval(id);
      setRunning(false);
      setPhase("Готово");
      setCount(0);
    }, 4 * (4 + 7 + 8) * 1000);
  }

  return (
    <div className="rounded-[var(--radius-xl)] border border-border bg-card p-6 shadow-[var(--shadow-card)]">
      <h3 className="font-display text-xl">Цикл 4–7–8</h3>
      <p className="mt-2 text-sm text-muted-foreground">
        Четыре полных круга. Сидя, спина опирается, плечи мягкие.
      </p>
      <div className="mt-8 flex flex-col items-center gap-4">
        <div
          className="flex size-40 items-center justify-center rounded-full border border-border bg-surface-soft"
          style={{
            transform: running && phase === "Вдох" ? "scale(1.06)" : "scale(1)",
            transition: "transform 4s var(--ease-out)",
          }}
        >
          <div className="text-center">
            <div className="font-display text-3xl tabular-nums">{running ? count : "—"}</div>
            <div className="text-sm text-muted-foreground">{phase}</div>
          </div>
        </div>
        <Button onClick={start} disabled={running}>
          {running ? "Цикл идёт" : "Начать практику"}
        </Button>
      </div>
    </div>
  );
}

export function BmiTool() {
  const [h, setH] = useState("168");
  const [w, setW] = useState("72");
  const bmi = useMemo(() => {
    const height = Number(h) / 100;
    const weight = Number(w);
    if (!height || !weight) return null;
    return weight / (height * height);
  }, [h, w]);
  const label =
    bmi == null
      ? ""
      : bmi < 18.5
        ? "Ниже ориентира. Имеет смысл обсудить рацион с врачом."
        : bmi < 25
          ? "В общепринятом ориентире. Держите регулярность питания и воды."
          : bmi < 30
            ? "Выше ориентира. Движение и тарелка дня дают устойчивый эффект."
            : "Существенно выше ориентира. Это повод для очной консультации.";

  return (
    <div className="rounded-[var(--radius-xl)] border border-border bg-card p-6 shadow-[var(--shadow-card)]">
      <h3 className="font-display text-xl">Ориентир по ИМТ</h3>
      <p className="mt-2 text-sm text-muted-foreground">
        Калькулятор показывает учебный ориентир, а не диагноз.
      </p>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <Label>
          Рост, см
          <Input value={h} onChange={(e) => setH(e.target.value)} inputMode="numeric" />
        </Label>
        <Label>
          Вес, кг
          <Input value={w} onChange={(e) => setW(e.target.value)} inputMode="numeric" />
        </Label>
      </div>
      {bmi != null ? (
        <div className="mt-5 rounded-[var(--radius-md)] bg-surface-soft p-4">
          <div className="font-display text-3xl tabular-nums">{bmi.toFixed(1)}</div>
          <p className="mt-2 text-sm text-muted-foreground">{label}</p>
        </div>
      ) : null}
    </div>
  );
}

export function MovementTool() {
  const user = useSession((s) => s.user);
  const done = useSession((s) => (user ? s.exerciseDone[user.id] ?? [] : []));
  const toggle = useSession((s) => s.toggleExercise);

  return (
    <div className="grid gap-4">
      {EXERCISES.map((ex) => {
        const on = user ? done.includes(ex.name) : false;
        return (
          <article
            key={ex.name}
            className="rounded-[var(--radius-xl)] border border-border bg-card p-5 shadow-[var(--shadow-card)]"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-display text-lg">{ex.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {ex.minutes} минут · {ex.text}
                </p>
              </div>
              <Button
                size="sm"
                variant={on ? "default" : "secondary"}
                onClick={() => user && toggle(user.id, ex.name)}
                disabled={!user}
              >
                {on ? "Сделано" : "Отметить"}
              </Button>
            </div>
          </article>
        );
      })}
    </div>
  );
}

export function ValuesTool() {
  return (
    <div className="grid gap-4">
      {WEBINARS.map((w) => (
        <article
          key={w.title}
          className="rounded-[var(--radius-xl)] border border-border bg-card p-5 shadow-[var(--shadow-card)]"
        >
          <h3 className="font-display text-lg">{w.title}</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            {w.when} · {w.format}
          </p>
        </article>
      ))}
    </div>
  );
}

export function ChoiceTool() {
  const user = useSession((s) => s.user);
  const days = useSession((s) => (user ? s.healthDays[user.id] ?? 0 : 0));
  const bump = useSession((s) => s.bumpHealthDay);
  const addJournal = useSession((s) => s.addJournal);
  const notes = useSession((s) => (user ? s.journal[user.id] ?? [] : []));
  const [note, setNote] = useState("");

  return (
    <div className="grid gap-5">
      <div className="rounded-[var(--radius-xl)] border border-border bg-card p-6 shadow-[var(--shadow-card)]">
        <h3 className="font-display text-xl">Свободные дни</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Отметьте день, когда удалось обойтись без сигареты или алкоголя как способа
          снять стресс.
        </p>
        <div className="mt-5 flex items-end justify-between gap-4">
          <div>
            <div className="font-display text-4xl tabular-nums">{days}</div>
            <div className="text-sm text-muted-foreground">отмеченных дней</div>
          </div>
          <Button onClick={() => user && bump(user.id)} disabled={!user}>
            Отметить день
          </Button>
        </div>
      </div>
      <div className="rounded-[var(--radius-xl)] border border-border bg-card p-6 shadow-[var(--shadow-card)]">
        <h3 className="font-display text-xl">Дневник замены ритуала</h3>
        <Label className="mt-4">
          Что сделали вместо разрушительного ритуала
          <Textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={3}
          />
        </Label>
        <Button
          className="mt-4"
          onClick={() => {
            if (!user || !note.trim()) return;
            addJournal(user.id, note.trim());
            setNote("");
          }}
          disabled={!user}
        >
          Сохранить
        </Button>
        <ul className="mt-4 grid gap-2">
          {notes.map((n, i) => (
            <li key={i} className="rounded-[var(--radius-md)] bg-surface-soft px-3 py-2 text-sm">
              {n}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function QrPass() {
  const user = useSession((s) => s.user);
  const code = user
    ? `SVO-${user.id.slice(0, 4).toUpperCase()}-${user.municipality.slice(0, 3).toUpperCase()}`
    : "SVO-DEMO-CHB";
  const cells = useMemo(() => {
    const size = 13;
    const out: boolean[] = [];
    let h = 0;
    for (const ch of code) h = (h * 33 + ch.charCodeAt(0)) >>> 0;
    for (let i = 0; i < size * size; i++) {
      h = (h * 1664525 + 1013904223) >>> 0;
      const x = i % size;
      const y = Math.floor(i / size);
      const finder =
        (x < 3 && y < 3) ||
        (x > size - 4 && y < 3) ||
        (x < 3 && y > size - 4);
      out.push(finder || h % 3 === 0);
    }
    return { size, out };
  }, [code]);

  return (
    <div className="rounded-[var(--radius-xl)] border border-border bg-card p-6 shadow-[var(--shadow-card)]">
      <h3 className="font-display text-xl">Карта доступа семьи</h3>
      <p className="mt-2 text-sm text-muted-foreground">
        Демонстрационный контур 152-ФЗ: доступ к чувствительным материалам модуля
        здоровья открывается по семейному коду и роли пользователя.
      </p>
      <div className="mt-5 flex flex-wrap items-center gap-6">
        <svg
          viewBox={`0 0 ${cells.size} ${cells.size}`}
          className="size-32 rounded-[var(--radius-sm)] bg-card text-foreground"
          aria-hidden
        >
          {cells.out.map((on, i) =>
            on ? (
              <rect
                key={i}
                x={i % cells.size}
                y={Math.floor(i / cells.size)}
                width="1"
                height="1"
                fill="currentColor"
              />
            ) : null,
          )}
        </svg>
        <div>
          <div className="font-display text-lg">{code}</div>
          <p className="mt-1 text-sm text-muted-foreground">
            {user
              ? `${user.fullName} · роль сохраняется в кабинете`
              : "Войдите в кабинет, чтобы привязать код к семье"}
          </p>
        </div>
      </div>
    </div>
  );
}
