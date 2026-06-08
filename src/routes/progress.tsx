import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/app/ComingSoon";
export const Route = createFileRoute("/progress")({
  head: () => ({ meta: [{ title: "My Progress — Paisley EC" }] }),
  component: () => <ComingSoon title="My Progress" back="/profile" bg="bg-background" accent="var(--wordie)" />,
});
