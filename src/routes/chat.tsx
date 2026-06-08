import { useState, useRef, useEffect, useMemo } from "react";
import { createFileRoute, Link, useSearch } from "@tanstack/react-router";
import { z } from "zod";
import { PhoneFrame } from "@/components/app/PhoneFrame";
import shirinGirl from "@/assets/brand/shirin-girl.png";
import shirinHero from "@/assets/brand/Shirin.png.asset.json";
import {
  ChevronLeft,
  Camera,
  Mic,
  Keyboard,
  Plus,
  X,
  Send,
  Heart,
  MessageCircle,
  Copy,
  Volume2,
  Share2,
  RotateCw,
  ChevronLeft as ChevLeft,
  ChevronRight,
  Sparkles,
  Image as ImageIcon,
} from "lucide-react";

const PINK = "var(--shirin)";
const PINK_SOFT = "color-mix(in oklab, var(--shirin) 14%, white)";

type Role = "shirin" | "user";
interface Message {
  id: string;
  role: Role;
  text: string;
  image?: string;
  time: string;
  variants?: string[];
  variantIndex?: number;
  shareable?: boolean;
}

const MODE_TITLES: Record<string, string> = {
  topic: "ShirinTalk",
  mywordie: "myWordie Talk",
  smart_reading: "Smart Reading Talk",
};

const MODE_OPENING: Record<string, string> = {
  topic: "Hi! I'm Shirin. What do you want to talk about today?",
  mywordie:
    "Hi! Let's use your myWordie words in real talking. Today we can try: brave, curious, gentle. Ready?",
  smart_reading:
    "Great reading today! Let's chat about the story. What was your favourite part?",
};

const ALBUM_COLORS = [
  "#FBCFE8", "#FDE68A", "#A7F3D0", "#BFDBFE",
  "#DDD6FE", "#FBCFE8", "#FECACA", "#C7D2FE",
];

const MOCK_COMMENTS = [
  { name: "Alice", text: "Shirin helped my child speak more English after class.", date: "2d", likes: 12, liked: false, replies: [] as Reply[] },
  { name: "Ben", text: "The questions are simple and useful for practice.", date: "1d", likes: 5, liked: false, replies: [] as Reply[] },
  { name: "Cindy", text: "I like the Smart Reading chat.", date: "5h", likes: 8, liked: true, replies: [] as Reply[] },
];

type Reply = { name: string; text: string; date: string; likes: number; liked: boolean };

export const Route = createFileRoute("/chat")({
  head: () => ({ meta: [{ title: "Chat with Shirin — Paisley EC" }] }),
  validateSearch: z.object({
    mode: z.string().optional(),
    topic_id: z.string().optional(),
    lesson_id: z.string().optional(),
  }),
  component: ChatPage,
});

function ChatPage() {
  const search = useSearch({ from: "/chat" });
  const mode = (search.mode as string) || "topic";
  const title = MODE_TITLES[mode] ?? "ShirinTalk";
  const opening = MODE_OPENING[mode] ?? MODE_OPENING.topic;

  const initialMessages: Message[] = useMemo(
    () => [
      { id: "m1", role: "shirin", text: opening, time: "10:02", shareable: true },
      { id: "m2", role: "user", text: "Yes! I want to talk about animals.", time: "10:03", shareable: true },
      {
        id: "m3",
        role: "shirin",
        text: "Great choice! 🐼 What's your favourite animal and why?",
        time: "10:03",
        shareable: true,
        variants: [
          "Great choice! 🐼 What's your favourite animal and why?",
          "Lovely! 🦁 Which animal do you like best? Tell me about it.",
        ],
        variantIndex: 0,
      },
    ],
    [opening],
  );

  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [pendingImage, setPendingImage] = useState<string | null>(null);
  const [attachmentOpen, setAttachmentOpen] = useState(false);
  const [voiceMode, setVoiceMode] = useState(false);
  const [sending, setSending] = useState(false);
  const [shareMode, setShareMode] = useState(false);
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(24);
  const [comments, setComments] = useState<typeof MOCK_COMMENTS>(MOCK_COMMENTS);
  const [commentInput, setCommentInput] = useState("");
  const [replyTo, setReplyTo] = useState<{ index: number; name: string } | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [holding, setHolding] = useState(false);
  const [longPressId, setLongPressId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const commentCount = comments.reduce((n, c) => n + 1 + c.replies.length, 0);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, sending]);

  function showToast(msg: string) {
    setToast(msg);
    window.setTimeout(() => setToast(null), 1800);
  }

  const lastAssistantIdx = (() => {
    for (let i = messages.length - 1; i >= 0; i--) if (messages[i].role === "shirin") return i;
    return -1;
  })();

  function handleSend() {
    if (sending) return;
    const text = input.trim();
    if (!text && !pendingImage) return;
    const newUser: Message = {
      id: `u${Date.now()}`,
      role: "user",
      text: text || "",
      image: pendingImage || undefined,
      time: nowTime(),
      shareable: true,
    };
    setMessages((m) => [...m, newUser]);
    setInput("");
    setPendingImage(null);
    setAttachmentOpen(false);
    setSending(true);
    window.setTimeout(() => {
      setMessages((m) => [
        ...m,
        {
          id: `s${Date.now()}`,
          role: "shirin",
          text: "Nice! Tell me more — what makes it special to you?",
          time: nowTime(),
          shareable: true,
        },
      ]);
      setSending(false);
    }, 1200);
  }

  function regenerate() {
    if (lastAssistantIdx < 0) return;
    setSending(true);
    window.setTimeout(() => {
      setMessages((prev) => {
        const copy = [...prev];
        const m = copy[lastAssistantIdx];
        const newText = randomReply();
        const variants = m.variants ? [...m.variants, newText] : [m.text, newText];
        copy[lastAssistantIdx] = {
          ...m,
          variants,
          variantIndex: variants.length - 1,
          text: newText,
        };
        return copy;
      });
      setSending(false);
    }, 900);
  }

  function switchVariant(dir: -1 | 1) {
    setMessages((prev) => {
      const copy = [...prev];
      const m = copy[lastAssistantIdx];
      if (!m?.variants) return prev;
      const idx = Math.min(
        Math.max((m.variantIndex ?? 0) + dir, 0),
        m.variants.length - 1,
      );
      copy[lastAssistantIdx] = { ...m, variantIndex: idx, text: m.variants[idx] };
      return copy;
    });
  }

  function copyLast() {
    const t = messages[lastAssistantIdx]?.text || "";
    navigator.clipboard?.writeText(t).catch(() => {});
    showToast("Copied");
  }

  function startShare() {
    setShareMode(true);
    setSelected({});
  }

  function toggleSelect(id: string) {
    setSelected((s) => ({ ...s, [id]: !s[id] }));
  }

  function confirmShare() {
    const n = Object.values(selected).filter(Boolean).length;
    if (n === 0) {
      showToast("Select at least one message");
      return;
    }
    showToast(`Shared ${n} message${n > 1 ? "s" : ""} to WeChat`);
    setShareMode(false);
  }

  function onMessagePressStart(id: string, text: string) {
    longPressTimer.current = setTimeout(() => {
      const word = text.match(/[A-Za-z]{3,}/)?.[0];
      if (!word) {
        showToast("No English word found");
      } else {
        showToast(`Added "${word}" to Wordie-X`);
      }
      setLongPressId(id);
      window.setTimeout(() => setLongPressId(null), 400);
    }, 550);
  }
  function onMessagePressEnd() {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  }

  function sendComment() {
    const t = commentInput.trim();
    if (!t) return;
    if (replyTo) {
      const idx = replyTo.index;
      const target = replyTo.name;
      setComments((c) =>
        c.map((cc, k) =>
          k === idx
            ? { ...cc, replies: [...cc.replies, { name: "You", text: `@${target} ${t}`, date: "now", likes: 0, liked: false }] }
            : cc,
        ),
      );
    } else {
      setComments((c) => [
        ...c,
        { name: "You", text: t, date: "now", likes: 0, liked: false, replies: [] },
      ]);
    }
    setCommentInput("");
    setReplyTo(null);
  }

  return (
    <PhoneFrame bg="bg-white">
      <div className="relative min-h-[100dvh] flex flex-col bg-white">
        {/* Header */}
        <header className="sticky top-0 z-30 flex items-center justify-between px-3 py-2.5 bg-white/95 backdrop-blur border-b border-[oklch(0.95_0.02_10)]">
          <Link
            to="/shirin-talk"
            aria-label="Back"
            className="h-9 w-9 grid place-items-center rounded-full"
          >
            <ChevronLeft className="h-5 w-5" />
          </Link>
          <h1
            className="text-[15px] font-bold tracking-tight"
            style={{ color: PINK, letterSpacing: "-0.01em", fontFamily: "var(--font-sans)" }}
          >
            {title}
          </h1>
          <div className="h-9 w-9" />
        </header>

        {/* Scrollable area */}
        <div className="flex-1 overflow-y-auto scroll-hide px-4 pt-4 pb-40">
          {/* Hero opening — shown once at top */}
          <div className="flex flex-col items-center text-center pb-4">
            <img src={shirinHero.url} alt="Shirin" className="h-40 w-40 object-contain" />
            <p className="mt-1 text-[12px] font-bold" style={{ color: PINK, fontFamily: "var(--font-sans)" }}>
              Shirin
            </p>
          </div>

          {/* Messages */}
          <div className="space-y-3">
            {messages.map((m, i) => {
              const isUser = m.role === "user";
              const isLastAssistant = i === lastAssistantIdx;
              const canShare = m.shareable !== false;
              return (
                <div key={m.id} className="flex items-start gap-2">
                  {shareMode && (
                    <SelectDot
                      enabled={canShare}
                      selected={!!selected[m.id]}
                      onClick={() => canShare && toggleSelect(m.id)}
                    />
                  )}
                  {!isUser && (
                    <img src={shirinGirl} alt="Shirin" className="h-8 w-8 mt-0.5 object-contain shrink-0" />
                  )}
                  <div className={`max-w-[76%] flex flex-col ${isUser ? "items-end ml-auto" : "items-start"}`}>
                    <div
                      onPointerDown={() => onMessagePressStart(m.id, m.text)}
                      onPointerUp={onMessagePressEnd}
                      onPointerLeave={onMessagePressEnd}
                      className={`relative rounded-2xl text-[14px] leading-relaxed shadow-sm transition-transform ${
                        isUser ? "rounded-tr-sm text-white" : "rounded-tl-sm bg-white border border-[oklch(0.94_0.02_10)] text-foreground"
                      } ${longPressId === m.id ? "scale-[0.98]" : ""}`}
                      style={isUser ? { background: PINK } : undefined}
                    >
                      {m.image && (
                        <img
                          src={m.image}
                          alt="attachment"
                          className="block w-44 h-32 object-cover rounded-2xl"
                          style={{ borderTopRightRadius: isUser ? 4 : undefined }}
                        />
                      )}
                      {m.text && (
                        <div className="px-3.5 py-2">
                          {m.text.split("\n").map((line, k) => (
                            <p key={k} className={k > 0 ? "mt-1" : ""}>{line}</p>
                          ))}
                        </div>
                      )}
                    </div>
                    <p className={`text-[10px] text-muted-foreground mt-1 ${isUser ? "text-right" : "text-left"}`}>
                      {m.time}
                    </p>
                  </div>
                </div>
              );
            })}

            {/* Last-assistant action row — aligned to the shirin bubble */}
            {!shareMode && lastAssistantIdx >= 0 && !sending && (
              <div className="flex items-start gap-2 -mt-1">
                <div className="h-8 w-8 shrink-0" />
                <div className="max-w-[76%] w-full">
                  <AssistantActions
                    hasVariants={!!messages[lastAssistantIdx].variants}
                    canPrev={(messages[lastAssistantIdx].variantIndex ?? 0) > 0}
                    canNext={
                      !!messages[lastAssistantIdx].variants &&
                      (messages[lastAssistantIdx].variantIndex ?? 0) <
                        (messages[lastAssistantIdx].variants!.length - 1)
                    }
                    onCopy={copyLast}
                    onSpeaker={() => showToast("Voice playback soon")}
                    onShare={startShare}
                    onRegenerate={regenerate}
                    onPrev={() => switchVariant(-1)}
                    onNext={() => switchVariant(1)}
                  />
                </div>
              </div>
            )}

            {sending && (
              <div className="flex items-start gap-2">
                <img src={shirinGirl} alt="Shirin" className="h-8 w-8 object-contain" />
                <div className="rounded-2xl rounded-tl-sm px-3.5 py-2 border border-[oklch(0.94_0.02_10)] bg-white shadow-sm inline-flex items-center gap-1.5">
                  <span className="text-[12px] text-muted-foreground italic mr-1">Shirin is thinking</span>
                  <Dot delay={0} />
                  <Dot delay={150} />
                  <Dot delay={300} />
                </div>
              </div>
            )}

            <div ref={scrollRef} />
          </div>
        </div>

        {/* Bottom composer area */}
        <div className="fixed bottom-0 left-0 right-0 z-40 flex justify-center pointer-events-none">
          <div className="w-full max-w-[420px] pointer-events-auto">
            {/* Pending image preview */}
            {pendingImage && !shareMode && (
              <div className="mx-4 mb-2 rounded-2xl bg-white border border-[oklch(0.94_0.02_10)] shadow-sm p-2 flex items-center gap-2">
                <div
                  className="h-12 w-12 rounded-lg shrink-0"
                  style={{ background: pendingImage }}
                />
                <div className="flex-1">
                  <p className="text-[12px] font-semibold">Photo ready to send</p>
                  <p className="text-[10px] text-muted-foreground">Shirin will see a [Photo] placeholder</p>
                </div>
                <button
                  onClick={() => setPendingImage(null)}
                  className="h-7 w-7 rounded-full grid place-items-center bg-muted"
                  aria-label="Remove photo"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            )}

            {/* Attachment panel */}
            {attachmentOpen && !shareMode && (
              <div className="mx-4 mb-2 rounded-2xl bg-white border border-[oklch(0.94_0.02_10)] shadow-sm p-3">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[12px] font-bold inline-flex items-center gap-1">
                    <ImageIcon className="h-3.5 w-3.5" style={{ color: PINK }} />
                    Photo album
                  </p>
                  <span className="text-[10px] text-muted-foreground">Tap a photo to attach</span>
                </div>
                <div className="grid grid-cols-4 gap-1.5">
                  {ALBUM_COLORS.map((c, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setPendingImage(c);
                        setAttachmentOpen(false);
                      }}
                      className="aspect-square rounded-lg"
                      style={{ background: c }}
                      aria-label={`Album photo ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Share sheet bottom panel */}
            {shareMode ? (
              <div className="px-4 pb-5 pt-2 bg-white/95 backdrop-blur border-t border-[oklch(0.95_0.02_10)]">
                <div className="flex items-center gap-2">
                  <button
                    onClick={confirmShare}
                    className="flex-1 h-11 rounded-full font-bold text-white text-[14px]"
                    style={{ background: PINK }}
                  >
                    Share to WeChat
                  </button>
                  <button
                    onClick={() => setShareMode(false)}
                    className="h-11 px-5 rounded-full font-bold border border-[oklch(0.94_0.02_10)] bg-white text-[14px]"
                  >
                    Cancel
                  </button>
                </div>
                <p className="mt-2 text-[11px] text-center text-muted-foreground">
                  {Object.values(selected).filter(Boolean).length} selected
                </p>
              </div>
            ) : (
              <>
                {/* Social row (like / comment) */}
                <div className="px-4 pb-1 flex items-center justify-start gap-2">
                  <button
                    onClick={() => {
                      setLiked((v) => !v);
                      setLikeCount((n) => n + (liked ? -1 : 1));
                    }}
                    className="inline-flex items-center gap-1 rounded-full px-3 py-1 bg-white border border-[oklch(0.94_0.02_10)] text-[12px] font-semibold"
                    style={{ color: liked ? PINK : "var(--foreground)" }}
                  >
                    <Heart
                      className="h-3.5 w-3.5"
                      fill={liked ? "currentColor" : "none"}
                    />
                    {likeCount}
                  </button>
                  <button
                    onClick={() => setCommentsOpen(true)}
                    className="inline-flex items-center gap-1 rounded-full px-3 py-1 bg-white border border-[oklch(0.94_0.02_10)] text-[12px] font-semibold"
                  >
                    <MessageCircle className="h-3.5 w-3.5" />
                    {commentCount}
                  </button>
                </div>

                {/* Input bar */}
                <div className="px-3 pb-5 pt-2 bg-white/95 backdrop-blur border-t border-[oklch(0.95_0.02_10)]">
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => showToast("Camera ready soon")}
                      className="h-10 w-10 rounded-full grid place-items-center bg-white border border-[oklch(0.94_0.02_10)] shrink-0"
                      style={{ color: PINK }}
                      aria-label="Camera"
                    >
                      <Camera className="h-4 w-4" />
                    </button>

                    {voiceMode ? (
                      <button
                        onPointerDown={() => {
                          setHolding(true);
                        }}
                        onPointerUp={() => setHolding(false)}
                        onPointerLeave={() => setHolding(false)}
                        className={`flex-1 h-10 rounded-full text-[13px] font-bold border ${holding ? "text-white" : ""}`}
                        style={{
                          background: holding ? PINK : PINK_SOFT,
                          borderColor: PINK,
                          color: holding ? "white" : "var(--shirin)",
                        }}
                      >
                        {holding ? "Release to send · slide up to cancel" : "Hold to talk"}
                      </button>
                    ) : (
                      <div className="flex-1 relative">
                        <input
                          type="text"
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                          onKeyDown={(e) => { if (e.key === "Enter") handleSend(); }}
                          disabled={sending}
                          placeholder="Type or hold to talk"
                          className="w-full rounded-full border border-[oklch(0.94_0.02_10)] bg-muted/40 px-4 py-2.5 pr-10 text-[13px] outline-none focus:ring-2 focus:ring-[color:var(--shirin)] disabled:opacity-60"
                        />
                        {(input.trim() || pendingImage) && (
                          <button
                            onClick={handleSend}
                            className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full grid place-items-center text-white"
                            style={{ background: PINK }}
                            aria-label="Send"
                          >
                            <Send className="h-3.5 w-3.5" />
                          </button>
                        )}
                      </div>
                    )}

                    <button
                      onClick={() => {
                        setVoiceMode((v) => !v);
                        if (!voiceMode) showToast("Voice input ready soon");
                      }}
                      className="h-10 w-10 rounded-full grid place-items-center bg-white border border-[oklch(0.94_0.02_10)] shrink-0"
                      style={{ color: PINK }}
                      aria-label={voiceMode ? "Keyboard" : "Voice"}
                    >
                      {voiceMode ? <Keyboard className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                    </button>
                    <button
                      onClick={() => setAttachmentOpen((v) => !v)}
                      className="h-10 w-10 rounded-full grid place-items-center shrink-0"
                      style={{ background: attachmentOpen ? PINK : "white", color: attachmentOpen ? "white" : PINK, border: `1px solid ${attachmentOpen ? PINK : "oklch(0.94 0.02 10)"}` }}
                      aria-label={attachmentOpen ? "Close attachments" : "Open attachments"}
                    >
                      {attachmentOpen ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Comments bottom sheet */}
        {commentsOpen && (
          <CommentsSheet
            count={commentCount}
            comments={comments}
            replyTo={replyTo}
            commentInput={commentInput}
            onCommentInput={setCommentInput}
            onReply={(index, name) => setReplyTo({ index, name })}
            onCancelReply={() => setReplyTo(null)}
            onSend={sendComment}
            onClose={() => { setCommentsOpen(false); setReplyTo(null); }}
            onToggleLike={(i) => {
              setComments((c) => c.map((cc, k) => k === i ? { ...cc, liked: !cc.liked, likes: cc.likes + (cc.liked ? -1 : 1) } : cc));
            }}
          />
        )}

        {/* Toast */}
        {toast && (
          <div className="fixed bottom-[140px] left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full bg-black/80 text-white text-[12px] font-semibold shadow-lg">
            {toast}
          </div>
        )}

        {/* Voice hold overlay */}
        {holding && <VoiceHoldOverlay />}
      </div>
    </PhoneFrame>
  );
}

function nowTime() {
  const d = new Date();
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

function randomReply() {
  const opts = [
    "Cool! Can you say one more sentence about it?",
    "Nice try! What else do you want to share?",
    "That's interesting — why do you think so?",
    "Great! Let's add one more detail.",
  ];
  return opts[Math.floor(Math.random() * opts.length)];
}

function Dot({ delay }: { delay: number }) {
  return (
    <span
      className="h-1.5 w-1.5 rounded-full animate-bounce"
      style={{ background: PINK, animationDelay: `${delay}ms` }}
    />
  );
}

function VoiceHoldOverlay() {
  const bars = Array.from({ length: 56 });
  return (
    <div
      className="absolute left-0 right-0 bottom-0 z-50 pointer-events-none flex flex-col items-center justify-end pb-6"
      style={{
        height: "190px",
        background:
          "linear-gradient(180deg, color-mix(in oklab, var(--shirin) 0%, transparent) 0%, color-mix(in oklab, var(--shirin) 50%, transparent) 55%, color-mix(in oklab, var(--shirin) 85%, transparent) 100%)",
      }}
    >
      <p className="text-white text-[12px] font-semibold mb-3 tracking-wide" style={{ fontFamily: "var(--font-sans)" }}>
        Release to send · slide up to cancel
      </p>
      <div className="flex items-end gap-[3px] h-9 px-6">
        {bars.map((_, i) => (
          <span
            key={i}
            className="w-[3px] rounded-full bg-white/85"
            style={{
              height: `${20 + Math.abs(Math.sin((i + 1) * 0.6)) * 70}%`,
              animation: `voiceWave 900ms ease-in-out ${i * 28}ms infinite alternate`,
            }}
          />
        ))}
      </div>
      <style>{`@keyframes voiceWave { from { transform: scaleY(0.4); } to { transform: scaleY(1.1); } }`}</style>
    </div>
  );
}

function SelectDot({
  enabled,
  selected,
  onClick,
}: {
  enabled: boolean;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      disabled={!enabled}
      className="h-5 w-5 mt-3 rounded-full grid place-items-center shrink-0"
      style={{
        border: `1.5px solid ${enabled ? "var(--shirin)" : "oklch(0.9 0.01 10)"}`,
        background: selected ? PINK : "white",
        opacity: enabled ? 1 : 0.4,
      }}
      aria-label="Select message"
    >
      {selected && <div className="h-1.5 w-1.5 rounded-full bg-white" />}
    </button>
  );
}

function AssistantActions({
  hasVariants,
  canPrev,
  canNext,
  onCopy,
  onSpeaker,
  onShare,
  onRegenerate,
  onPrev,
  onNext,
}: {
  hasVariants: boolean;
  canPrev: boolean;
  canNext: boolean;
  onCopy: () => void;
  onSpeaker: () => void;
  onShare: () => void;
  onRegenerate: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-1.5">
        <ActionBtn onClick={onCopy} label="Copy"><Copy className="h-3.5 w-3.5" /></ActionBtn>
        <ActionBtn onClick={onSpeaker} label="Play"><Volume2 className="h-3.5 w-3.5" /></ActionBtn>
        <ActionBtn onClick={onShare} label="Share"><Share2 className="h-3.5 w-3.5" /></ActionBtn>
      </div>
      <div className="flex items-center gap-1">
        {hasVariants && (
          <div className="flex items-center gap-0.5 mr-1 rounded-full px-1.5 py-0.5 border border-[oklch(0.94_0.02_10)]">
            <button onClick={onPrev} disabled={!canPrev} aria-label="Previous variant" className="text-muted-foreground disabled:opacity-30">
              <ChevLeft className="h-3 w-3" />
            </button>
            <button onClick={onNext} disabled={!canNext} aria-label="Next variant" className="text-muted-foreground disabled:opacity-30">
              <ChevronRight className="h-3 w-3" />
            </button>
          </div>
        )}
        <ActionBtn onClick={onRegenerate} label="Regenerate">
          <RotateCw className="h-3.5 w-3.5" />
        </ActionBtn>
      </div>
    </div>
  );
}

function ActionBtn({
  onClick,
  label,
  disabled,
  children,
}: {
  onClick: () => void;
  label: string;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="h-7 w-7 rounded-full grid place-items-center disabled:opacity-30 transition-transform active:scale-95"
      style={{ background: PINK_SOFT, color: "var(--shirin)" }}
    >
      {children}
    </button>
  );
}

function CommentsSheet({
  count,
  comments,
  replyTo,
  commentInput,
  onCommentInput,
  onReply,
  onCancelReply,
  onSend,
  onClose,
  onToggleLike,
}: {
  count: number;
  comments: typeof MOCK_COMMENTS;
  replyTo: { index: number; name: string } | null;
  commentInput: string;
  onCommentInput: (v: string) => void;
  onReply: (index: number, name: string) => void;
  onCancelReply: () => void;
  onSend: () => void;
  onClose: () => void;
  onToggleLike: (i: number) => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative w-full max-w-[420px] bg-white rounded-t-3xl shadow-2xl flex flex-col" style={{ maxHeight: "80dvh" }}>
        <div className="flex items-center justify-between px-4 pt-4 pb-2 border-b border-[oklch(0.95_0.02_10)]">
          <h3 className="text-[15px] font-bold" style={{ fontFamily: "var(--font-sans)" }}>Comments {count}</h3>
          <button onClick={onClose} className="h-8 w-8 rounded-full grid place-items-center" aria-label="Close">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
          {comments.length === 0 ? (
            <div className="text-center text-[13px] text-muted-foreground py-10">
              <Sparkles className="h-5 w-5 mx-auto mb-1.5" style={{ color: PINK }} />
              Be the first to leave a kind comment.
            </div>
          ) : (
            comments.map((c, i) => (
              <div key={i} className="flex gap-2.5">
                <div
                  className="h-8 w-8 rounded-full grid place-items-center text-[12px] font-bold text-white shrink-0"
                  style={{ background: PINK }}
                >
                  {c.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-[13px] font-bold">{c.name}</p>
                    <button
                      onClick={() => onToggleLike(i)}
                      className="inline-flex items-center gap-1 text-[11px] font-semibold"
                      style={{ color: c.liked ? PINK : "color-mix(in oklab, var(--foreground) 60%, white)" }}
                    >
                      <Heart className="h-3 w-3" fill={c.liked ? "currentColor" : "none"} />
                      {c.likes}
                    </button>
                  </div>
                  <p className="text-[13px] mt-0.5">{c.text}</p>
                  <div className="mt-1 flex items-center gap-3 text-[11px] text-muted-foreground">
                    <span>{c.date}</span>
                    <button onClick={() => onReply(i, c.name)} className="font-semibold">Reply</button>
                  </div>
                  {c.replies.length > 0 && (
                    <div className="mt-2 space-y-2 border-l-2 pl-3" style={{ borderColor: PINK_SOFT }}>
                      {c.replies.map((r, j) => (
                        <div key={j} className="flex gap-2">
                          <div
                            className="h-6 w-6 rounded-full grid place-items-center text-[10px] font-bold text-white shrink-0"
                            style={{ background: PINK }}
                          >
                            {r.name.charAt(0)}
                          </div>
                          <div className="flex-1">
                            <p className="text-[12px] font-bold">{r.name}</p>
                            <p className="text-[12px] mt-0.5">{r.text}</p>
                            <p className="text-[10px] text-muted-foreground mt-0.5">{r.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
        <div className="border-t border-[oklch(0.95_0.02_10)] px-3 pt-2 pb-4">
          {replyTo && (
            <div className="mb-1.5 flex items-center justify-between px-2 py-1 rounded-md" style={{ background: PINK_SOFT }}>
              <span className="text-[11px] font-semibold" style={{ color: PINK }}>
                Replying to {replyTo.name}
              </span>
              <button onClick={onCancelReply} aria-label="Cancel reply">
                <X className="h-3 w-3" style={{ color: PINK }} />
              </button>
            </div>
          )}
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={commentInput}
              onChange={(e) => onCommentInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") onSend(); }}
              placeholder="Add a kind comment"
              className="flex-1 rounded-full border border-[oklch(0.94_0.02_10)] bg-muted/40 px-4 py-2 text-[13px] outline-none focus:ring-2 focus:ring-[color:var(--shirin)]"
            />
            <button
              onClick={onSend}
              className="h-9 px-4 rounded-full text-white font-bold text-[13px]"
              style={{ background: PINK }}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

