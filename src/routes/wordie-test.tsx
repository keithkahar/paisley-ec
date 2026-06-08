import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/app/ComingSoon";
export const Route = createFileRoute("/wordie-test")({
  head: () => ({ meta: [{ title: "Wordie Test — Paisley EC" }] }),
  component: () => <ComingSoon title="Wordie Test" back="/mywordie" bg="bg-[color:var(--wordie-soft)]" accent="var(--shirin)" />,
});
