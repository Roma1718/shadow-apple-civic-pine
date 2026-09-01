import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { PageHeader, Wrap } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { APP_TYPES, ROLE_LABELS } from "@/lib/content";
import { useSession, type Application } from "@/lib/session";

export const Route = createFileRoute("/coordinator")({
  component: Coordinator,
});

function Coordinator() {
  const user = useSession((s) => s.user);
  const applications = useSession((s) => s.applications);
  const users = useSession((s) => s.users);
  const updateStatus = useSession((s) => s.updateStatus);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) void navigate({ to: "/login" });
    else if (user.role !== "coordinator") void navigate({ to: "/cabinet" });
  }, [user, navigate]);

  if (!user || user.role !== "coordinator") return null;

  return (
    <>
      <PageHeader
        eyebrow="Кабинет координатора"
        title="Муниципальная и межведомственная координация"
        lead="Заявки, пользователи, статусы сопровождения."
      />
      <Wrap>
        <div className="grid gap-6 lg:grid-cols-[1.6fr_0.4fr]">
          <div className="overflow-hidden rounded-[var(--radius-xl)] border border-border bg-card shadow-[var(--shadow-card)]">
            <h3 className="p-5 font-display text-xl">Заявки</h3>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] text-left text-sm">
                <thead>
                  <tr className="border-y border-border bg-surface-soft">
                    {[
                      "Пользователь",
                      "Роль",
                      "Муниципалитет",
                      "Тип",
                      "Запрос",
                      "Статус",
                      "Обновить",
                    ].map((h) => (
                      <th key={h} className="px-3 py-3 font-semibold">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {applications.map((item) => (
                    <Row
                      key={item.id}
                      item={item}
                      onSave={(status) => updateStatus(item.id, status)}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <aside className="h-fit rounded-[var(--radius-xl)] border border-border bg-card p-5 shadow-[var(--shadow-card)]">
            <h3 className="font-display text-xl">Пользователи</h3>
            <ul className="mt-4 grid gap-3 text-sm">
              {users.map((u) => (
                <li key={u.id}>
                  <strong>{u.fullName}</strong>
                  <div className="text-muted-foreground">
                    {ROLE_LABELS[u.role]} · {u.municipality}
                  </div>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </Wrap>
    </>
  );
}

function Row({
  item,
  onSave,
}: {
  item: Application;
  onSave: (s: Application["status"]) => void;
}) {
  return (
    <tr className="border-b border-border align-top">
      <td className="px-3 py-3">{item.fullName}</td>
      <td className="px-3 py-3">{ROLE_LABELS[item.role]}</td>
      <td className="px-3 py-3">{item.municipality}</td>
      <td className="px-3 py-3">
        {APP_TYPES.find((t) => t.value === item.type)?.label ?? item.type}
      </td>
      <td className="px-3 py-3">{item.message}</td>
      <td className="px-3 py-3">
        <span className="rounded-full bg-surface-soft px-2 py-1 text-xs font-semibold uppercase">
          {item.status}
        </span>
      </td>
      <td className="px-3 py-3">
        <form
          className="flex flex-col gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            const fd = new FormData(e.currentTarget);
            onSave(String(fd.get("status")) as Application["status"]);
          }}
        >
          <select
            name="status"
            defaultValue={item.status}
            className="h-9 rounded-[var(--radius-sm)] border border-border bg-card px-2 text-xs"
          >
            <option value="new">new</option>
            <option value="in_progress">in_progress</option>
            <option value="done">done</option>
          </select>
          <Button size="sm" variant="secondary" type="submit">
            Сохранить
          </Button>
        </form>
      </td>
    </tr>
  );
}
