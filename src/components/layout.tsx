import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { SITE } from "@/lib/content";
import { useSession } from "@/lib/session";
import { cn } from "@/lib/cn";
import { Button } from "./ui/button";

const NAV = [
  { to: "/", label: "Главная" },
  { to: "/support", label: "Меры поддержки" },
  { to: "/school", label: "СВОи школьники" },
  { to: "/health", label: "СВОё здоровье" },
  { to: "/culture", label: "СВОя культура" },
  { to: "/lab", label: "Лаборатория" },
  { to: "/about", label: "О платформе" },
];

export function BrandMark({ className }: { className?: string }) {
  return (
    <span className={className}>
      <span className="font-sans font-extrabold tracking-[0.06em]">СВО</span>их девчонок не бросаем!
    </span>
  );
}

export function Layout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const user = useSession((s) => s.user);
  const logout = useSession((s) => s.logout);

  return (
    <div className="min-h-dvh bg-bg text-foreground">
      <div className="grid h-2 grid-cols-3" aria-hidden>
        <div className="bg-white" />
        <div className="bg-accent" />
        <div className="bg-primary" />
      </div>
      <header className="sticky top-0 z-30 border-b-2 border-primary bg-white">
        <div className="mx-auto flex max-w-[1180px] items-center justify-between gap-4 px-4 py-4">
          <Link to="/" className="min-w-0">
            <div className="font-display text-base font-bold leading-tight text-primary sm:text-xl">
              <BrandMark />
            </div>
            <div className="text-xs font-medium text-ink sm:text-sm">
              {SITE.operator} · {SITE.region}
            </div>
          </Link>
          <button
            className="inline-flex h-11 w-11 items-center justify-center rounded-[var(--radius-md)] border border-border bg-card lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Меню"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
          <nav className="hidden flex-wrap items-center gap-1 lg:flex">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "rounded-[var(--radius-sm)] px-2.5 py-2 text-[13px] font-bold",
                  pathname === item.to || (item.to !== "/" && pathname.startsWith(item.to + "/"))
                    ? "bg-accent text-white"
                    : "font-bold text-ink hover:bg-surface-soft",
                )}
              >
                {item.label}
              </Link>
            ))}
            {user ? (
              <>
                {user.role === "coordinator" ? (
                  <Link
                    to="/coordinator"
                    className="rounded-[var(--radius-sm)] px-2.5 py-2 text-[13px] font-medium hover:bg-card"
                  >
                    Координатор
                  </Link>
                ) : null}
                <Link
                  to="/cabinet"
                  className="rounded-[var(--radius-sm)] px-2.5 py-2 text-[13px] font-medium hover:bg-card"
                >
                  Кабинет
                </Link>
                <Button size="sm" variant="secondary" onClick={logout}>
                  Выход
                </Button>
              </>
            ) : (
              <Button asChild size="sm">
                <Link to="/login">Вход</Link>
              </Button>
            )}
          </nav>
        </div>
        {open ? (
          <nav className="grid gap-1 border-t border-border bg-card px-4 py-3 lg:hidden">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="rounded-[var(--radius-sm)] px-3 py-3 text-sm font-medium"
              >
                {item.label}
              </Link>
            ))}
            {user ? (
              <>
                <Link to="/cabinet" onClick={() => setOpen(false)} className="px-3 py-3 text-sm font-medium">
                  Кабинет
                </Link>
                <button
                  className="px-3 py-3 text-left text-sm font-medium"
                  onClick={() => {
                    logout();
                    setOpen(false);
                  }}
                >
                  Выход
                </button>
              </>
            ) : (
              <Link to="/login" onClick={() => setOpen(false)} className="px-3 py-3 text-sm font-medium">
                Вход
              </Link>
            )}
          </nav>
        ) : null}
      </header>
      <main>{children}</main>
      <footer className="mt-12 bg-ink text-primary-foreground">
        <div className="grid h-2 grid-cols-3" aria-hidden>
          <div className="bg-white" />
          <div className="bg-accent" />
          <div className="bg-primary" />
        </div>
        <div className="mx-auto grid max-w-[1180px] gap-8 px-4 py-10 md:grid-cols-2">
          <div>
            <div className="font-display text-lg font-semibold">
              <BrandMark />
            </div>
            <p className="mt-2 text-sm text-primary-foreground/70">{SITE.slogan}</p>
          </div>
          <div>
            <div className="text-sm font-semibold">Автор и оператор</div>
            <p className="mt-2 text-sm text-primary-foreground/70">
              {SITE.operator}. Меры поддержки, СВОи школьники, СВОё здоровье, СВОя культура,
              Лаборатория социальной архитектуры.
            </p>
          </div>
        </div>
        <div className="mx-auto max-w-[1180px] border-t border-white/10 px-4 py-4 text-sm text-primary-foreground/55">
          © {SITE.year} {SITE.operator}
        </div>
      </footer>
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
}) {
  return (
    <section className="px-4 pb-4 pt-10">
      <div className="mx-auto max-w-[1180px]">
        <div className="mb-4 inline-flex rounded-full border border-border bg-white px-3 py-1.5 text-xs font-semibold text-primary">
          {eyebrow}
        </div>
        <h1 className="max-w-4xl text-3xl font-bold text-ink sm:text-5xl">{title}</h1>
        {lead ? (
          <p className="mt-4 max-w-3xl text-base font-semibold text-foreground sm:text-lg">{lead}</p>
        ) : null}
      </div>
    </section>
  );
}

export function Wrap({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("px-4 py-10", className)}>
      <div className="mx-auto max-w-[1180px]">{children}</div>
    </section>
  );
}
