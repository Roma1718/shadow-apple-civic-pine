import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader, Wrap } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { DEMO_ACCOUNTS, ROLE_LABELS } from "@/lib/content";
import { useSession } from "@/lib/session";

export const Route = createFileRoute("/login")({ component: Login });

function Login() {
  const login = useSession((s) => s.login);
  const navigate = useNavigate();
  const [email, setEmail] = useState("family@example.ru");
  const [password, setPassword] = useState("family123");
  const [error, setError] = useState<string | null>(null);

  return (
    <>
      <PageHeader
        eyebrow="Личный кабинет"
        title="Вход в портал"
        lead="Вход нужен для направлений, где пользователь работает с персональными функциями: обращения семьи, система «СВОи школьники», кабинет координатора."
      />
      <Wrap>
        <div className="grid gap-6 lg:grid-cols-2">
          <form
            className="grid gap-4 rounded-[var(--radius-xl)] border border-border bg-card p-6 shadow-[var(--shadow-card)]"
            onSubmit={(e) => {
              e.preventDefault();
              const err = login(email, password);
              if (err) setError(err);
              else void navigate({ to: "/cabinet" });
            }}
          >
            <Label>
              Почта
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Label>
            <Label>
              Пароль
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Label>
            {error ? <p className="text-sm text-red-800">{error}</p> : null}
            <Button type="submit">Войти</Button>
            <Link to="/register" className="text-sm font-semibold text-primary">
              Регистрация
            </Link>
          </form>
          <aside className="rounded-[var(--radius-xl)] border border-border bg-card p-6 shadow-[var(--shadow-card)]">
            <h3 className="font-display text-xl">Демо-доступы для партнёров</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Для системы «СВОи школьники» предусмотрены кабинет школьника, студента-волонтёра,
              школьного наставника, учителя-предметника, представителей вуза, карта учебных тем,
              запросы, отклики, фиксация занятия и учёт волонтёрской деятельности. В техническом
              задании заданы роли школьника, школьного наставника, студента-волонтёра, куратора
              образовательной организации, координатора проекта и главного администратора.
            </p>
            <ul className="mt-4 grid gap-4 text-sm">
              {DEMO_ACCOUNTS.map((a) => (
                <li key={a.email}>
                  <div className="font-semibold">{ROLE_LABELS[a.role]}</div>
                  <div className="text-muted-foreground">{a.email}</div>
                  <div className="text-muted-foreground">{a.password}</div>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </Wrap>
    </>
  );
}
