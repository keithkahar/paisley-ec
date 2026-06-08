import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/app/ComingSoon";
export const Route = createFileRoute("/chat")({
  head: () => ({ meta: [{ title: "Chat with Shirin — Paisley EC" }] }),
  component: () => <ComingSoon title="Chat with Shirin" back="/shirin-talk" bg="bg-[color:var(--shirin-soft)]" accent="var(--shirin)" />,
});
