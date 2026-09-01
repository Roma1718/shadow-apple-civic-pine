import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader, Wrap } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { type Role, useSession } from "@/lib/session";

export const Route = createFileRoute("/register")({ component: Register });

function Register() {
  const register = useSession((s) => s.register);
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Role>("family");
  const [municipality, setMunicipality] = useState("Чебоксары");
  const [error, setError] = useState<string | null>(null);

  return (
    <>
      <PageHeader
        eyebrow="Регистрация"
        title="Подключение к порталу"
        lead="Новая семья, педагог, волонтёр, координатор или партнёр."
      />
      <Wrap>
        <form
          className="mx-auto grid max-w-xl gap-4 rounded-[var(--radius-xl)] border border-border bg-card p-6 shadow-[var(--shadow-card)]"
          onSubmit={(e) => {
            e.preventDefault();
            const err = register({ email, password, fullName, role, municipality });
            if (err) setError(err);
            else void navigate({ to: "/login" });
          }}
        >
          <Label>
            ФИО
            <Input value={fullName} onChange={(e) => setFullName(e.target.value)} required />
          </Label>
          <Label>
            Почта
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
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
          <Label>
            Роль
            <select
              className="h-11 rounded-[var(--radius-md)] border border-border bg-card px-3 text-sm"
              value={role}
              onChange={(e) => setRole(e.target.value as Role)}
            >
              <option value="family">Семья</option>
              <option value="teacher">Школьный наставник / учитель</option>
              <option value="volunteer">Студент-волонтёр</option>
              <option value="partner">Партнёр</option>
            </select>
          </Label>
          <Label>
            Муниципалитет
            <Input
              value={municipality}
              onChange={(e) => setMunicipality(e.target.value)}
            />
          </Label>
          {error ? <p className="text-sm text-red-800">{error}</p> : null}
          <Button type="submit">Зарегистрироваться</Button>
        </form>
      </Wrap>
    </>
  );
}
