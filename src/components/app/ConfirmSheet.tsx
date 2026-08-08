import type { ReactNode } from "react";
import { StandardSheet } from "./StandardSheet";
import { SheetActions } from "./SheetActions";

/**
 * Global confirm dialog — rendered as a bottom sheet per the global standard
 * (StandardSheet + SHEET_ACTION_METRICS buttons). Replaces centered modals.
 */
export function ConfirmSheet({
  open,
  title,
  description,
  brandColor,
  confirmLabel,
  cancelLabel = "Cancel",
  confirmColor,
  onConfirm,
  onClose,
}: {
  open: boolean;
  title: string;
  description?: ReactNode;
  brandColor: string;
  confirmLabel: string;
  cancelLabel?: string;
  confirmColor?: string;
  onConfirm: () => void;
  onClose: () => void;
}) {
  return (
    <StandardSheet open={open} title={title} brandColor={brandColor} onClose={onClose}>
      {description && (
        <p
          className="text-[12px] leading-[1.55] text-center"
          style={{ color: "color-mix(in oklab, var(--foreground) 55%, white)" }}
        >
          {description}
        </p>
      )}
      <SheetActions
        primary={{
          label: confirmLabel,
          onClick: onConfirm,
          background: confirmColor ?? "var(--destructive)",
        }}
        secondary={{ label: cancelLabel, onClick: onClose }}
      />
    </StandardSheet>
  );
}
