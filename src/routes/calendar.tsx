import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/app/ComingSoon";
import { CalendarDays } from "lucide-react";
export const Route = createFileRoute("/calendar")({
  head: () => ({ meta: [
      { title: "Calendar — Paisley EC" },
      { name: "description", content: "Your learning calendar and upcoming sessions." },
      { property: "og:title", content: "Calendar — Paisley EC" },
      { property: "og:description", content: "Your learning calendar and upcoming sessions." },
    ] }),
  component: () => (
    <ComingSoon
      title="Calendar"
      back="/profile"
      accent="var(--bloxia)"
      icon={CalendarDays}
      note="Soon you'll see every lesson, test and adventure in one place."
    />
  ),
});
