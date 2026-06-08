import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/app/ComingSoon";
export const Route = createFileRoute("/topics")({
  head: () => ({ meta: [{ title: "Topic Talk — Paisley EC" }] }),
  component: () => <ComingSoon title="Topic Talk" back="/shirin-talk" bg="bg-[color:var(--shirin-soft)]" accent="var(--shirin)" />,
});
