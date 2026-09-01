import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader, Wrap } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { CULTURE_EVENTS, CULTURE_PROJECTS } from "@/lib/content";

export const Route = createFileRoute("/culture")({ component: Culture });

function Culture() {
  return (
    <>
      <PageHeader
        eyebrow="СВОя культура"
        title="Культурные и просветительские проекты"
        lead="«СВОя культура» объединяет культурные и просветительские проекты, выставки, спектакли, конкурсы, концерты, круглые столы и другие мероприятия. Для каждого проекта показано главное действие и его социальная архитектура: кто участвует в его реализации."
      />
      <Wrap>
        <div className="grid gap-6">
          {CULTURE_PROJECTS.map((p) => (
            <article
              key={p.title}
              className="overflow-hidden rounded-[var(--radius-xl)] border-2 border-accent/25 bg-card shadow-[var(--shadow-card)] md:grid md:grid-cols-[280px_1fr]"
            >
              <img src={p.image} alt="" className="h-44 w-full object-cover md:h-full" />
              <div className="p-6">
                <h2 className="font-display text-2xl">{p.title}</h2>
                <p className="mt-3 text-sm font-semibold text-foreground">{p.text}</p>
                <p className="mt-4 text-sm font-semibold">
                  <span className="text-primary">Социальная архитектура. </span>
                  <span className="text-foreground">{p.architecture}</span>
                </p>
              </div>
            </article>
          ))}
        </div>
      </Wrap>
      <Wrap className="bg-surface-soft">
        <h2 className="text-3xl">Офлайн-мероприятия</h2>
        <p className="mt-3 max-w-3xl font-semibold text-foreground">
          Здесь собраны ближайшие выставки, спектакли, концерты, круглые столы, встречи
          и просветительские мероприятия.
        </p>
        <div className="mt-8 grid gap-4">
          {CULTURE_EVENTS.map((e) => (
            <article
              key={e.title}
              className="rounded-[var(--radius-xl)] border border-border bg-card p-6 shadow-[var(--shadow-card)]"
            >
              <h3 className="font-display text-xl">{e.title}</h3>
              <p className="mt-2 text-sm font-semibold text-primary">
                {e.when} · {e.place}
              </p>
              <p className="mt-3 text-sm text-muted-foreground">{e.text}</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Программа: {e.program}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Участники: {e.participants}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">Условия: {e.terms}</p>
              <Button asChild className="mt-5">
                <Link to="/cabinet">Зарегистрироваться</Link>
              </Button>
            </article>
          ))}
        </div>
      </Wrap>
    </>
  );
}
