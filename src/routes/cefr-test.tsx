import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/app/ComingSoon";
import { GraduationCap } from "lucide-react";
export const Route = createFileRoute("/cefr-test")({
  head: () => ({ meta: [
      { title: "CEFR Test — Paisley EC" },
      { name: "description", content: "Find your CEFR level with a short, kid-friendly assessment." },
      { property: "og:title", content: "CEFR Test — Paisley EC" },
      { property: "og:description", content: "Find your CEFR level with a short, kid-friendly assessment." },
    ] }),
  component: () => (
    <ComingSoon
      title="CEFR Test"
      back="/"
      accent="var(--paisley)"
      icon={GraduationCap}
      note="A short, friendly quiz to find your CEFR level. Coming soon!"
    />
  ),
});
