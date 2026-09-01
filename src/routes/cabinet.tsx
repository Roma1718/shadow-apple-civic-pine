import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PageHeader, Wrap } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Label, Textarea } from "@/components/ui/input";
import { APP_TYPES, DIRECTIONS, ROLE_LABELS } from "@/lib/content";
import { useSession } from "@/lib/session";

export const Route = createFileRoute("/cabinet")({ component: Cabinet });

const STATUS: Record<string, string> = {
  new: "новая",
  in_progress: "в работе",
  done: "завершена",
};

function Cabinet() {
  const user = useSession((s) => s.user);
  const apps = useSession((s) => s.applications);
  const add = useSession((s) => s.addApplication);
  const navigate = useNavigate();
  const [type, setType] = useState("psychology");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!user) void navigate({ to: "/login" });
  }, [user, navigate]);

  if (!user) return null;
  const mine = apps.filter((a) => a.userId === user.id);

  return (
    <>
      <PageHeader
        eyebrow="Личный кабинет"
        title={user.fullName}
        lead={`${ROLE_LABELS[user.role]} · ${user.municipality}`}
      />
      <Wrap>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-[var(--radius-xl)] border border-border bg-card p-6 shadow-[var(--shadow-card)]">
            <h3 className="font-display text-xl">Новая заявка</h3>
            <form
              className="mt-4 grid gap-4"
              onSubmit={(e) => {
                e.preventDefault();
                if (!message.trim()) return;
                add(type, message.trim());
                setMessage("");
              }}
            >
              <Label>
                Тип запроса
                <select
                  className="h-11 rounded-[var(--radius-md)] border border-border bg-card px-3 text-sm"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  {APP_TYPES.map((t) => (
                    <option key={t.value} value={t.value}>
                      {t.label}
                    </option>
                  ))}
                </select>
              </Label>
              <Label>
                Описание
                <Textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
              </Label>
              <Button type="submit">Отправить</Button>
            </form>
          </div>
          <div className="rounded-[var(--radius-xl)] border border-border bg-card p-6 shadow-[var(--shadow-card)]">
            <h3 className="font-display text-xl">Мои заявки</h3>
            <ul className="mt-4 grid gap-3 text-sm">
              {mine.length === 0 ? <li>Пока заявок нет.</li> : null}
              {mine.map((a) => (
                <li key={a.id} className="rounded-[var(--radius-md)] bg-surface-soft p-3">
                  <strong>{APP_TYPES.find((t) => t.value === a.type)?.label ?? a.type}</strong>
                  <div className="mt-1 text-muted-foreground">{a.message}</div>
                  <div className="mt-2 text-xs font-semibold uppercase">{STATUS[a.status]}</div>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-[var(--radius-xl)] border border-border bg-card p-6 shadow-[var(--shadow-card)]">
            <h3 className="font-display text-xl">Направления платформы</h3>
            <ul className="mt-4 grid gap-2 text-sm">
              {DIRECTIONS.map((d) => (
                <li key={d.to}>
                  <Link to={d.to} className="font-semibold text-primary">
                    {d.title}
                  </Link>
                  <div className="text-muted-foreground">{d.action}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Wrap>
    </>
  );
}
