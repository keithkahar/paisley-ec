import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/app/ComingSoon";
export const Route = createFileRoute("/my-tests")({
  head: () => ({ meta: [{ title: "My Tests — Paisley EC" }] }),
  component: () => <ComingSoon title="My Tests" back="/profile" bg="bg-background" accent="var(--shirin)" />,
});
