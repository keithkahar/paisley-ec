import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/edit-profile")({
  // Edit Profile now lives as a bottom sheet on the Me page so the page
  // behind stays visible.
  beforeLoad: () => {
    throw redirect({ to: "/profile" });
  },
  component: () => null,
});
