import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/app/ComingSoon";
export const Route = createFileRoute("/calendar")({
  head: () => ({ meta: [{ title: "Calendar — Paisley EC" }] }),
  component: () => <ComingSoon title="Calendar" back="/profile" bg="bg-background" accent="var(--bloxia)" />,
});
