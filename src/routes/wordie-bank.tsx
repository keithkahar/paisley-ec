import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/app/ComingSoon";
export const Route = createFileRoute("/wordie-bank")({
  head: () => ({ meta: [{ title: "Wordie Bank — Paisley EC" }] }),
  component: () => <ComingSoon title="Wordie Bank" back="/mywordie" bg="bg-[color:var(--wordie-soft)]" accent="var(--wordie)" />,
});
