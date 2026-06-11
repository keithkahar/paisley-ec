import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/app/ComingSoon";
export const Route = createFileRoute("/cefr-test")({
  head: () => ({ meta: [
      { title: "CEFR Test — Paisley EC" },
      { name: "description", content: "Find your CEFR level with a short, kid-friendly assessment." },
      { property: "og:title", content: "CEFR Test — Paisley EC" },
      { property: "og:description", content: "Find your CEFR level with a short, kid-friendly assessment." },
    ] }),
  component: () => <ComingSoon title="CEFR Test" back="/" bg="bg-background" accent="var(--paisley)" />,
});
