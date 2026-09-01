import { useEffect } from "react";
import {
  createRootRoute,
  HeadContent,
  Outlet,
  Scripts,
} from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { Layout } from "@/components/layout";
import { useSession } from "@/lib/session";
import appCss from "../styles.css?url";

const APP_NAME = "СВОих девчонок не бросаем!";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: APP_NAME },
      {
        name: "description",
        content:
          "Платформа помощи семьям участников СВО. АНО «Дирекция социальной архитектуры». Пилот: Чувашская Республика.",
      },
      { name: "theme-color", content: "#C45C12" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&family=Unbounded:wght@500;600&display=swap",
      },
    ],
  }),
  component: Root,
});

function Root() {
  useEffect(() => {
    void useSession.persist.rehydrate();
  }, []);

  return (
    <html lang="ru" className="antialiased" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <PreviewHostBridge />
        <AuthProvider>
          <Layout>
            <Outlet />
          </Layout>
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  );
}
