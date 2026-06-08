import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/app/ComingSoon";
export const Route = createFileRoute("/edit-profile")({
  head: () => ({ meta: [{ title: "Edit Profile — Paisley EC" }] }),
  component: () => <ComingSoon title="Edit Profile" back="/profile" bg="bg-background" accent="var(--paisley)" />,
});
