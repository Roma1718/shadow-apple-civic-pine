import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader, Wrap } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { HELP_TYPES } from "@/lib/content";

export const Route = createFileRoute("/support")({ component: Support });

function Support() {
  return (
    <>
      <PageHeader
        eyebrow="Меры поддержки"
        title="Какая помощь вам нужна?"
        lead="Раздел построен вокруг конкретного вопроса человека. Семья выбирает направление и получает доступ к специалисту, учреждению или организации соответствующего профиля."
      />
      <div className="px-4">
        <img
          src="/photos/ill-family.jpg"
          alt=""
          className="mx-auto h-56 w-full max-w-[1180px] rounded-[var(--radius-xl)] object-cover sm:h-72"
        />
      </div>
      <Wrap>
        <div className="mb-8 max-w-3xl space-y-4 font-semibold text-foreground">
          <p>
            Часть помощи оказывается непосредственно через платформу. Здесь можно оставить
            обращение, записаться на консультацию или связаться со специалистом.
          </p>
          <p>
            В других случаях платформа объясняет, какая организация занимается данным
            вопросом, и переводит пользователя на её официальный ресурс.
          </p>
        </div>
        <div className="grid gap-4">
          {HELP_TYPES.map((item) => (
            <article
              key={item.slug}
              className="rounded-[var(--radius-xl)] border border-border bg-card p-6 shadow-[var(--shadow-card)]"
            >
              <h2 className="font-display text-2xl">{item.title}</h2>
              <p className="mt-3 text-sm text-muted-foreground">{item.text}</p>
              <Button asChild className="mt-5">
                <Link to="/cabinet">{item.action}</Link>
              </Button>
            </article>
          ))}
        </div>
      </Wrap>
    </>
  );
}
