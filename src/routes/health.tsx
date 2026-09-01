import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader, Wrap } from "@/components/layout";
import { QrPass } from "@/components/health-tools";
import { Button } from "@/components/ui/button";
import { HEALTH_ARCHITECTURE, HEALTH_MODULES } from "@/lib/content";

export const Route = createFileRoute("/health")({ component: Health });

function Health() {
  return (
    <>
      <PageHeader
        eyebrow="СВОё здоровье"
        title="Повседневная забота о здоровье"
        lead="«СВОё здоровье» — направление платформы для участников СВО и членов их семей, посвящённое повседневной заботе о здоровье. В основе пять направлений, адаптированных из программы ПРОМОМЕД «ПРОздоровье»."
      />
      <Wrap>
        <div className="grid gap-5 md:grid-cols-2">
          {HEALTH_MODULES.map((m) => (
            <Link
              key={m.slug}
              to="/health/$slug"
              params={{ slug: m.slug }}
              className="overflow-hidden rounded-[var(--radius-xl)] border border-border bg-card shadow-[var(--shadow-card)]"
            >
              <img src={m.image} alt="" className="h-44 w-full object-cover" />
              <div className="p-6">
                <div className="text-xs font-bold text-primary">{m.source}</div>
                <h2 className="mt-1 font-display text-2xl text-ink">{m.title}</h2>
                <p className="mt-3 text-sm font-semibold text-foreground">{m.lead}</p>
              </div>
            </Link>
          ))}
        </div>
      </Wrap>
      <Wrap className="bg-surface-soft">
        <h2 className="text-3xl">Как это работает</h2>
        <ol className="mt-6 max-w-3xl space-y-3 font-semibold text-foreground">
          <li>Человек выбирает нужное направление.</li>
          <li>
            На странице он видит доступные материалы, программы, специалистов и
            организации.
          </li>
          <li>
            Если помощь предоставляется через платформу, человек получает возможность
            записаться или оставить обращение.
          </li>
          <li>
            Если соответствующую программу предоставляет медицинское учреждение,
            государственная или партнёрская организация, платформа переводит человека
            к этому ресурсу.
          </li>
        </ol>
        <Button asChild className="mt-6">
          <Link to="/health">Выбрать направление</Link>
        </Button>
      </Wrap>
      <Wrap>
        <h2 className="text-3xl">Социальная архитектура «СВОё здоровье»</h2>
        <ul className="mt-6 grid gap-2 md:grid-cols-2">
          {HEALTH_ARCHITECTURE.map((item) => (
            <li
              key={item}
              className="rounded-[var(--radius-lg)] border border-border bg-card px-4 py-3 text-sm"
            >
              {item}
            </li>
          ))}
        </ul>
        <p className="mt-6 max-w-3xl text-sm text-muted-foreground">
          В Республиканском клиническом госпитале для ветеранов войн уже действуют
          индивидуальные программы реабилитации, лечебная физкультура, психологическая
          помощь и стационарное восстановление.
        </p>
        <div className="mt-8">
          <QrPass />
        </div>
      </Wrap>
    </>
  );
}
