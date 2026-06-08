import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/app/ComingSoon";
export const Route = createFileRoute("/parent")({
  head: () => ({ meta: [{ title: "Parent Page — Paisley EC" }] }),
  component: () => <ComingSoon title="Parent Page" back="/profile" bg="bg-background" accent="var(--paisley)" />,
});
