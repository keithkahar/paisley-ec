import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/app/ComingSoon";
export const Route = createFileRoute("/wordie-x")({
  head: () => ({ meta: [{ title: "Wordie-X — Paisley EC" }] }),
  component: () => <ComingSoon title="Wordie-X" back="/mywordie" bg="bg-[color:var(--wordie-soft)]" accent="var(--wordie-accent)" />,
});
