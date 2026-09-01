import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Wrap } from "@/components/layout";
import { LAB_PROJECTS } from "@/lib/content";

export const Route = createFileRoute("/lab")({ component: Lab });

function Lab() {
  return (
    <>
      <PageHeader
        eyebrow="Лаборатория социальной архитектуры"
        title="От социальной задачи до работающего решения"
        lead="Лаборатория социальной архитектуры создана АНО «Дирекция социальной архитектуры». Это пространство, где Дирекция разрабатывает и апробирует решения для конкретных задач семей участников СВО."
      />
      <div className="px-4">
        <img
          src="/photos/ill-lab.jpg"
          alt=""
          className="mx-auto h-56 w-full max-w-[1180px] rounded-[var(--radius-xl)] object-cover sm:h-72"
        />
      </div>
      <Wrap>
        <div className="max-w-3xl space-y-4 font-semibold text-foreground">
          <p>
            Вокруг задачи собираются органы власти, государственные и муниципальные
            учреждения, вузы, специалисты, общественные организации, волонтёры и
            партнёры. Каждый участник входит в проект со своей конкретной возможностью:
            полномочиями, профессиональной компетенцией, инфраструктурой, людьми,
            технологией, площадкой или ресурсом.
          </p>
          <p>
            Дирекция соединяет этих участников в одну работающую конструкцию и
            организует взаимодействие между ними. Результатом становится практическая
            модель, которую можно проверить в пилотном регионе, доработать по итогам
            реальной работы и затем использовать на других территориях.
          </p>
          <p>
            Платформа «СВОих девчонок не бросаем!» сама является результатом такой
            работы Лаборатории. Внутри неё уже создаются и апробируются отдельные
            решения: «СВОи школьники», «СВОё здоровье», культурные и просветительские
            проекты, механизмы прямой помощи семьям и цифровые способы взаимодействия
            между участниками.
          </p>
          <p>
            Таким образом, Лаборатория показывает саму работу АНО «Дирекция социальной
            архитектуры»: от конкретной социальной задачи до собранной вокруг неё
            системы участников и работающего решения.
          </p>
        </div>
      </Wrap>
      <Wrap className="bg-surface-soft">
        <h2 className="text-3xl">Проекты Лаборатории</h2>
        <div className="mt-8 grid gap-4">
          {LAB_PROJECTS.map((p) => (
            <article
              key={p.title}
              className="rounded-[var(--radius-xl)] border border-border bg-card p-6 shadow-[var(--shadow-card)]"
            >
              <h3 className="font-display text-xl">{p.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{p.text}</p>
              <p className="mt-4 text-sm">
                <span className="font-semibold">Социальная архитектура. </span>
                <span className="text-muted-foreground">{p.architecture}</span>
              </p>
            </article>
          ))}
        </div>
      </Wrap>
    </>
  );
}
