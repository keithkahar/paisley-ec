import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/app/ComingSoon";
export const Route = createFileRoute("/about")({
  head: () => ({ meta: [
      { title: "About PEC — Paisley EC" },
      { name: "description", content: "About Paisley EC, an English learning world for kids aged 7–12." },
      { property: "og:title", content: "About PEC — Paisley EC" },
      { property: "og:description", content: "About Paisley EC, an English learning world for kids aged 7–12." },
    ] }),
  component: () => <ComingSoon title="About PEC" back="/" bg="bg-background" accent="var(--paisley)" />,
});
