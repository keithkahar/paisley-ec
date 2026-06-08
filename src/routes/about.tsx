import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/app/ComingSoon";
export const Route = createFileRoute("/about")({
  head: () => ({ meta: [{ title: "About PEC — Paisley EC" }] }),
  component: () => <ComingSoon title="About PEC" back="/" bg="bg-background" accent="var(--paisley)" />,
});
