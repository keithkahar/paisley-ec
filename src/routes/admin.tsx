import { createFileRoute } from "@tanstack/react-router";
import { PhoneFrame } from "@/components/app/PhoneFrame";
import { BottomTabBar } from "@/components/app/BottomTabBar";
import { FloatingBack } from "@/components/app/FloatingBack";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Console — Paisley EC" },
      { name: "description", content: "Admin console for Paisley EC." },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  return (
    <PhoneFrame bg="bg-white">
      <div className="relative bg-white min-h-full">
        <FloatingBack to="/profile" label="Back to profile" />

        <section className="px-6 pt-12 pb-6">
          <h1
            className="text-[28px] font-semibold tracking-tight"
            style={{ color: "var(--paisley)" }}
          >
            Admin Console
          </h1>
          <p className="mt-2 text-[15px]" style={{ color: "var(--muted-foreground)" }}>
            Admin tools and management options will appear here.
          </p>
        </section>
      </div>
      <BottomTabBar />
    </PhoneFrame>
  );
}
