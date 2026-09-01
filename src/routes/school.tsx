import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader, Wrap } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { SCHOOL_ACTORS, SCHOOL_STEPS } from "@/lib/content";

export const Route = createFileRoute("/school")({ component: School });

function School() {
  return (
    <>
      <PageHeader
        eyebrow="СВОи школьники"
        title="Индивидуальная помощь по школьной программе"
        lead="«СВОи школьники» — система бесплатной индивидуальной помощи детям из семей участников СВО по конкретным темам школьной программы силами студентов профильных факультетов вузов."
      />
      <div className="px-4">
        <img
          src="/photos/ill-school.jpg"
          alt=""
          className="mx-auto h-56 w-full max-w-[1180px] rounded-[var(--radius-xl)] object-cover sm:h-72"
        />
      </div>
      <Wrap>
        <div className="max-w-3xl space-y-4 font-semibold text-foreground">
          <p>
            В основе системы модель наставничества «студент — ученик»: старший по
            ступени образования помогает младшему улучшить образовательные результаты.
            Форма закреплена в методических рекомендациях Министерства просвещения
            Российской Федерации.
          </p>
          <p>
            Основание: Письмо Министерства просвещения Российской Федерации от 23 января
            2020 г. № МР-42/02 «О направлении целевой модели наставничества и
            методических рекомендаций». Приложение: «Методические рекомендации по
            внедрению методологии (целевой модели) наставничества обучающихся…». Раздел
            3.7 «Форма наставничества „студент — ученик“».
          </p>
          <p>
            Подготовленная модель соединяет школу, вуз, студентов-волонтёров, школьных
            наставников и предметных кураторов вокруг конкретной учебной темы ребёнка.
          </p>
        </div>
        <Button asChild className="mt-6">
          <Link to="/cabinet">Получить помощь с учёбой</Link>
        </Button>
      </Wrap>
      <Wrap className="bg-surface-soft">
        <h2 className="text-3xl">Как это работает</h2>
        <ol className="mt-8 grid gap-3">
          {SCHOOL_STEPS.map((step, i) => (
            <li
              key={i}
              className="grid gap-3 rounded-[var(--radius-lg)] border border-border bg-card p-4 sm:grid-cols-[48px_1fr]"
            >
              <div className="font-display text-2xl text-primary">{i + 1}</div>
              <p className="text-sm text-muted-foreground">{step}</p>
            </li>
          ))}
        </ol>
        <p className="mt-6 max-w-3xl text-sm text-muted-foreground">
          В проектной документации принцип сформулирован предельно конкретно: школа
          выявляет учебную трудность, вуз проверяет и направляет подготовленного
          студента, платформа фиксирует процесс и результат.
        </p>
      </Wrap>
      <Wrap>
        <h2 className="text-3xl">Кто обеспечивает работу</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {SCHOOL_ACTORS.map((a) => (
            <article
              key={a.title}
              className="rounded-[var(--radius-xl)] border border-border bg-card p-6 shadow-[var(--shadow-card)]"
            >
              <h3 className="font-display text-xl">{a.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{a.text}</p>
            </article>
          ))}
        </div>
      </Wrap>
    </>
  );
}
