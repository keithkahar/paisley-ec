/**
 * Debug helper: force-open a specific bottom sheet from the URL.
 * Usage: /profile?sheet=create-journey , /parent?sheet=enter-parent-pin ...
 * See /sheets for the full index of slugs.
 */
import { useRouterState } from "@tanstack/react-router";

export function useSheetDebug(): string {
  return useRouterState({
    select: (s) => {
      const search = s.location.search as Record<string, unknown> | undefined;
      const v = search?.["sheet"];
      return typeof v === "string" ? v : "";
    },
  });
}
