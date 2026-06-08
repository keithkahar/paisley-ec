import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/app/ComingSoon";
export const Route = createFileRoute("/smart-reading")({
  head: () => ({ meta: [{ title: "Smart Reading — Paisley EC" }] }),
  component: () => <ComingSoon title="Smart Reading" back="/shirin-talk" bg="bg-[color:var(--shirin-soft)]" accent="var(--shirin)" />,
});
