import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader, Wrap } from "@/components/layout";
import { Button } from "@/components/ui/button";
import {
  BmiTool,
  BreathTool,
  ChoiceTool,
  MovementTool,
  ValuesTool,
} from "@/components/health-tools";
import { HEALTH_MODULES, type HealthSlug } from "@/lib/content";

export const Route = createFileRoute("/health/$slug")({
  component: HealthDetail,
});

function HealthDetail() {
  const { slug } = Route.useParams();
  const mod = HEALTH_MODULES.find((m) => m.slug === slug);
  if (!mod) {
    return (
      <Wrap>
        <h1 className="text-3xl">Направление не найдено</h1>
        <Button asChild className="mt-4">
          <Link to="/health">К модулю здоровья</Link>
        </Button>
      </Wrap>
    );
  }

  return (
    <>
      <PageHeader eyebrow={mod.source} title={mod.title} lead={mod.lead} />
      <Wrap>
        <img
          src={mod.image}
          alt=""
          className="mb-8 h-56 w-full rounded-[var(--radius-xl)] object-cover sm:h-72"
        />
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <h2 className="text-2xl">Практики направления</h2>
            <ul className="mt-4 grid gap-3">
              {mod.practices.map((p) => (
                <li
                  key={p}
                  className="rounded-[var(--radius-lg)] border border-border bg-card px-4 py-4 text-sm"
                >
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div>{toolFor(mod.slug)}</div>
        </div>
      </Wrap>
    </>
  );
}

function toolFor(slug: HealthSlug) {
  if (slug === "spokoystvie") return <BreathTool />;
  if (slug === "racion") return <BmiTool />;
  if (slug === "dvizhenie") return <MovementTool />;
  if (slug === "cennosti") return <ValuesTool />;
  return <ChoiceTool />;
}
