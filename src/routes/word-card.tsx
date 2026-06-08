import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/app/ComingSoon";
export const Route = createFileRoute("/word-card")({
  head: () => ({ meta: [{ title: "Word Card — Paisley EC" }] }),
  component: () => <ComingSoon title="Word Card" back="/mywordie" bg="bg-[color:var(--wordie-soft)]" accent="var(--wordie)" />,
});
