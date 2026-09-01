import { createFileRoute, Link } from "@tanstack/react-router";
import { Wrap } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { DIRECTIONS, DSA_PROJECTS } from "@/lib/content";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <>
      <Wrap>
        <div className="grid items-center gap-8 lg:grid-cols-[1fr_1.05fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">
              Платформа помощи
            </p>
            <h1 className="mt-3 text-4xl text-ink sm:text-6xl">Суть проекта</h1>
            <div className="mt-6 space-y-4 font-semibold text-foreground">
              <p>
                «СВОих девчонок не бросаем!» — единая платформа помощи семьям участников
                СВО. Человек выбирает направление и получает помощь на площадке либо
                переходит к организации, которая её предоставляет.
              </p>
              <ul className="grid gap-2 text-ink">
                {DIRECTIONS.map((d) => (
                  <li key={d.to}>
                    <Link to={d.to} className="font-bold text-accent hover:text-primary">
                      {d.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <img
            src="/photos/ill-essence.jpg"
            alt=""
            className="h-72 w-full rounded-[var(--radius-xl)] object-cover sm:h-[420px]"
          />
        </div>
      </Wrap>

      <section className="bg-accent text-white">
        <div className="mx-auto grid max-w-[1180px] items-center gap-8 px-4 py-12 lg:grid-cols-[1.1fr_0.9fr] lg:py-16">
          <div>
            <h2 className="text-3xl text-white sm:text-4xl">Пилотный регион</h2>
            <div className="mt-5 max-w-2xl space-y-4 font-semibold text-white">
              <p>
                Платформа разрабатывается и апробируется в Чувашской Республике. Проект
                поддержан Главой Чувашской Республики.
              </p>
              <p>
                В работе: Правительство республики, профильные министерства, Чувашский
                государственный университет имени И. Н. Ульянова, школы, медицинские,
                социальные и культурные учреждения, фонд «Защитники Отечества»,
                общественные и волонтёрские организации.
              </p>
            </div>
          </div>
          <img
            src="/photos/ill-chuvash.jpg"
            alt=""
            className="h-64 w-full rounded-[var(--radius-xl)] object-cover sm:h-80"
          />
        </div>
      </section>

      <Wrap>
        <h2 className="text-3xl text-ink sm:text-4xl">Выберите направление</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {DIRECTIONS.map((d) => (
            <article
              key={d.to}
              className="overflow-hidden rounded-[var(--radius-xl)] border-2 border-accent/25 bg-white shadow-[var(--shadow-card)]"
            >
              <img src={d.image} alt="" className="h-44 w-full object-cover" />
              <div className="p-6">
                <h3 className="font-display text-2xl text-ink">{d.title}</h3>
                <p className="mt-3 text-sm font-semibold text-foreground">{d.text}</p>
                <Button asChild className="mt-5">
                  <Link to={d.to}>{d.action}</Link>
                </Button>
              </div>
            </article>
          ))}
        </div>
      </Wrap>

      <Wrap className="bg-surface-soft">
        <h2 className="text-3xl text-ink sm:text-4xl">Социальная архитектура</h2>
        <p className="mt-4 max-w-3xl font-semibold text-foreground">
          АНО «Дирекция социальной архитектуры» собирает власть, учреждения, вузы,
          общественные организации, волонтёров и бизнес вокруг конкретной социальной
          задачи. Состав участников виден через проекты.
        </p>
        <img
          src="/photos/ill-lab.jpg"
          alt=""
          className="mt-8 h-56 w-full rounded-[var(--radius-xl)] object-cover sm:h-72"
        />
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {DSA_PROJECTS.map((p) => (
            <article
              key={p.title}
              className="rounded-[var(--radius-xl)] border-2 border-primary/20 bg-white p-6"
            >
              <h3 className="font-display text-xl text-ink">{p.title}</h3>
              <div className="mt-1 text-sm font-bold text-primary">{p.place}</div>
              <p className="mt-3 text-sm font-semibold text-foreground">{p.text}</p>
            </article>
          ))}
        </div>
      </Wrap>
    </>
  );
}
