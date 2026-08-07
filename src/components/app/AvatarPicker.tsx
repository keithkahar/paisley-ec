import { useState } from "react";
import { BLOXIAN_AVATARS } from "@/lib/bloxia/config";

/**
 * Default-avatar carousel used by the profile / learner forms.
 *
 * The centre slot renders the live editable avatar (drag + pinch, camera and
 * clear buttons) passed in as children. The two side slots preview the
 * neighbouring default avatars — tap or swipe to pick one instead of
 * uploading a photo.
 */
export function AvatarPicker({
  currentSrc,
  onSelect,
  children,
}: {
  currentSrc: string;
  onSelect: (src: string) => void;
  children: React.ReactNode;
}) {
  const total = BLOXIAN_AVATARS.length;
  const mod = (n: number) => ((n % total) + total) % total;
  const startIndex = Math.max(0, BLOXIAN_AVATARS.findIndex((a) => a.portrait === currentSrc));
  const [index, setIndex] = useState(startIndex);
  const [touchX, setTouchX] = useState<number | null>(null);

  const prev = BLOXIAN_AVATARS[mod(index - 1)];
  const next = BLOXIAN_AVATARS[mod(index + 1)];

  const pick = (delta: number) => {
    const i = mod(index + delta);
    setIndex(i);
    onSelect(BLOXIAN_AVATARS[i].portrait);
  };

  return (
    <div
      className="flex items-center justify-center gap-3 select-none"
      onTouchStart={(e) => setTouchX(e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX == null) return;
        const dx = e.changedTouches[0].clientX - touchX;
        if (Math.abs(dx) > 30) pick(dx < 0 ? 1 : -1);
        setTouchX(null);
      }}
    >
      <SidePreview src={prev.portrait} label={`Use ${prev.name} avatar`} onClick={() => pick(-1)} />
      {children}
      <SidePreview src={next.portrait} label={`Use ${next.name} avatar`} onClick={() => pick(1)} />
    </div>
  );
}

function SidePreview({ src, label, onClick }: { src: string; label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="h-[64px] w-[64px] shrink-0 rounded-full overflow-hidden bg-white border border-border active:scale-95 transition-transform"
      style={{ opacity: 0.85 }}
    >
      <img src={src} alt="" className="h-full w-full object-cover" draggable={false} />
    </button>
  );
}
