import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/app/ComingSoon";
export const Route = createFileRoute("/cefr-test")({
  head: () => ({ meta: [{ title: "CEFR Test — Paisley EC" }] }),
  component: () => <ComingSoon title="CEFR Test" back="/" bg="bg-background" accent="var(--paisley)" />,
});
