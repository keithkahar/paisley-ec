import { useState, useRef, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PhoneFrame } from "@/components/app/PhoneFrame";
import { AppHeader } from "@/components/app/AppHeader";
import { BpPill } from "@/components/app/Pills";
import shirinIcon from "@/assets/brand/Shirin.png.asset.json";
import { Mic, Send, Volume2, Sparkles } from "lucide-react";

const SHIRIN_COLOR = "var(--shirin)";
const SHIRIN_SOFT = "var(--shirin-soft)";

interface Message {
  id: string;
  role: "shirin" | "user";
  text: string;
  time: string;
  hint?: string; // gentle correction / tip
}

const MOCK_MESSAGES: Message[] = [
  {
    id: "1",
    role: "shirin",
    text: "Hi Alex! 🌟 Ready to practise English today?",
    time: "10:02",
  },
  {
    id: "2",
    role: "user",
    text: "Yes! I want to talk about animals.",
    time: "10:03",
  },
  {
    id: "3",
    role: "shirin",
    text: "Great choice! 🐼 What's your favourite animal and why?",
    time: "10:03",
  },
  {
    id: "4",
    role: "user",
    text: "I like tiger because they are very strong and fast.",
    time: "10:04",
  },
  {
    id: "5",
    role: "shirin",
    text: "Awesome! Tigers are amazing. 🐯\n\nHere's a small tip: we say \"I like tiger**s**\" (with an 's') when we talk about all of them. Try again!",
    time: "10:04",
    hint: "Tip: add 's' for plural nouns when talking about a group.",
  },
  {
    id: "6",
    role: "user",
    text: "I like tigers because they are very strong and fast!",
    time: "10:05",
  },
  {
    id: "7",
    role: "shirin",
    text: "Perfect sentence! ⭐ You earned +15 Bp for that correction. Want to tell me more about where tigers live?",
    time: "10:05",
  },
];

export const Route = createFileRoute("/chat")({
  head: () => ({ meta: [{ title: "Chat with Shirin — Paisley EC" }] }),
  component: ChatPage,
});

function ChatPage() {
  const [input, setInput] = useState("");
  const [messages] = useState<Message[]>(MOCK_MESSAGES);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages]);

  return (
    <PhoneFrame bg="bg-white">
      {/* Header */}
      <AppHeader
        back="/shirin-talk"
        title={null}
        tone={SHIRIN_COLOR}
        bg="white"
      />

      {/* Chat area */}
      <div className="px-4 pt-2 pb-24 space-y-4 overflow-y-auto scroll-hide">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
          >
            {m.role === "shirin" && (
              <img
                src={shirinIcon.url}
                alt="Shirin"
                className="h-8 w-8 rounded-xl mr-2 mt-1 shadow-sm"
              />
            )}
            <div className="max-w-[78%]">
              <div
                className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-sm ${
                  m.role === "user"
                    ? "rounded-tr-sm text-white"
                    : "rounded-tl-sm bg-white border border-border text-foreground"
                }`}
                style={
                  m.role === "user" ? { background: SHIRIN_COLOR } : undefined
                }
              >
                {m.text.split("\n").map((line, i) => (
                  <p key={i} className={i > 0 ? "mt-1.5" : ""}>
                    {line}
                  </p>
                ))}
              </div>
              {m.hint && (
                <div
                  className="mt-1.5 rounded-xl px-3 py-1.5 text-[11px] font-semibold inline-flex items-center gap-1"
                  style={{ background: SHIRIN_SOFT, color: SHIRIN_COLOR }}
                >
                  <Sparkles className="h-3 w-3" />
                  {m.hint}
                </div>
              )}
              <p
                className={`text-[10px] text-muted-foreground mt-1 ${
                  m.role === "user" ? "text-right" : "text-left"
                }`}
              >
                {m.time}
              </p>
            </div>
          </div>
        ))}
        {/* Typing indicator */}
        <div className="flex items-start gap-2">
          <img
            src={shirinIcon.url}
            alt="Shirin"
            className="h-8 w-8 rounded-xl shadow-sm"
          />
          <div
            className="rounded-2xl rounded-tl-sm px-4 py-3 border border-border bg-white shadow-sm inline-flex items-center gap-1"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--shirin)] animate-bounce" style={{ animationDelay: "0ms" }} />
            <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--shirin)] animate-bounce" style={{ animationDelay: "150ms" }} />
            <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--shirin)] animate-bounce" style={{ animationDelay: "300ms" }} />
          </div>
        </div>
        <div ref={scrollRef} />
      </div>

      {/* Bottom input bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 flex justify-center pointer-events-none">
        <div className="w-full max-w-[420px] pointer-events-auto">
          <div className="px-4 pb-5 pt-2 bg-white/90 backdrop-blur border-t border-border">
            {/* Quick chips */}
            <div className="flex gap-2 overflow-x-auto scroll-hide pb-2">
              {["🐼 Animals", "🍕 Food", "🏫 School", "🎮 Games"].map(
                (chip) => (
                  <button
                    key={chip}
                    className="shrink-0 rounded-full px-3 py-1 text-xs font-semibold border"
                    style={{
                      borderColor: SHIRIN_COLOR,
                      color: SHIRIN_COLOR,
                      background: SHIRIN_SOFT,
                    }}
                  >
                    {chip}
                  </button>
                )
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                className="h-10 w-10 rounded-full grid place-items-center text-white shadow-md shrink-0"
                style={{ background: SHIRIN_COLOR }}
                aria-label="Voice input"
              >
                <Mic className="h-4 w-4" />
              </button>
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type or speak to Shirin..."
                  className="w-full rounded-full border border-border bg-muted/50 px-4 py-2.5 pr-10 text-sm outline-none focus:ring-2 focus:ring-[color:var(--shirin)]"
                />
                <button
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full grid place-items-center"
                  style={{ color: SHIRIN_COLOR }}
                  aria-label="Send"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
              <button
                className="h-10 w-10 rounded-full grid place-items-center border border-border bg-white shrink-0"
                style={{ color: SHIRIN_COLOR }}
                aria-label="Read aloud"
              >
                <Volume2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}

