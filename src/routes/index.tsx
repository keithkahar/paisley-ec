import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { PhoneFrame } from "@/components/app/PhoneFrame";
import { BottomTabBar } from "@/components/app/BottomTabBar";
import shirinHero from "@/assets/brand/Shirin.png.asset.json";
import myWordieText from "@/assets/brand/mywordie-text.png.asset.json";
import paisleyLogo from "@/assets/brand/paisley-ec-logo.png.asset.json";
import shirinTalkText from "@/assets/brand/shirintalk-text.png.asset.json";
import { Mic } from "lucide-react";
import { useRef } from "react";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Paisley EC — English for Kids" },
      { name: "description", content: "ShirinTalk, myWordie and Bloxia — a playful English learning world for 7–12 year-olds." },
    ],
  }),
  component: Home,
});

function Home() {
  const name = "Daniella Wang";
  const navigate = useNavigate();
  const clickCount = useRef(0);
  const clickTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleLogoClick = () => {
    clickCount.current += 1;

    if (clickCount.current === 5) {
      // 5 rapid clicks -> admin
      clickCount.current = 0;
      if (clickTimer.current) {
        clearTimeout(clickTimer.current);
        clickTimer.current = null;
      }
      navigate({ to: "/admin" });
      return;
    }

    // Reset the timer on every click so it only expires after the user stops tapping
    if (clickTimer.current) clearTimeout(clickTimer.current);
    clickTimer.current = setTimeout(() => {
      const count = clickCount.current;
      clickCount.current = 0;
      clickTimer.current = null;
      if (count > 0 && count < 5) {
        navigate({ to: "/about-paizley" });
      }
    }, 800);
  };

  return (

    <PhoneFrame bg="bg-card">
      <div className="relative h-[calc(100dvh-6rem)] overflow-hidden flex flex-col bg-[color:var(--paisley-soft)]">
        {/* App logo top-left */}
        <button
          type="button"
          onClick={handleLogoClick}
          className="absolute top-12 left-7 z-20 cursor-pointer active:scale-[0.98] transition-transform"
          aria-label="About PEC"
        >

          <img src={paisleyLogo.url} alt="Paisley EC" className="h-8 w-auto object-contain" />
        </button>
        {/* PRIMARY: Shirin hero */}
        <section className="relative px-6 pt-[6.5rem] pb-0 mt-5">
          <Cloud className="absolute top-10 right-6 w-24 opacity-80" />
          <Cloud className="absolute top-28 left-4 w-16 opacity-70" />
          <Cloud className="absolute top-44 right-16 w-20 opacity-60" />

          <div className="relative flex justify-center">
            <img
              src={shirinHero.url}
              alt="Shirin"
              className="relative z-10 w-[58%] max-w-[220px] object-contain"
            />
          </div>
        </section>

        {/* Bottom white panel with curved top */}
        <section
          className="relative -mt-5 flex-1 bg-card px-7 pt-[60px] pb-6"
          style={{ borderTopLeftRadius: "60% 60px", borderTopRightRadius: "60% 60px" }}
        >
          {/* SECONDARY: greeting + question, one refined block */}
          <h1
            className="text-[26px] leading-[1.4] font-medium tracking-tight text-foreground text-center"
            style={{ letterSpacing: "-0.01em" }}
          >
            Hi, {name}.
            <span className="block mt-7 text-[26px] text-foreground/80 font-normal leading-[1.7]">
              Are you ready for today's English adventure?
            </span>
          </h1>

          {/* TERTIARY: primary action */}
          <Link
            to="/shirin-talk"
            className="relative isolate mt-[40px] flex items-center justify-center gap-[8px] rounded-full py-5 font-semibold text-white active:scale-[0.98] transition-transform"
            style={{
              background: "var(--shirin)",
              fontSize: "17.25px"
            }}
          >
            <Mic className="shrink-0" style={{ width: "1.15em", height: "1.15em" }} />
            <span className="flex items-baseline gap-[5.12px] leading-none">
              <span>Start with</span>
              <img
                src={shirinTalkText.url}
                alt="ShirinTalk"
                className="w-auto shrink-0 object-contain"
                style={{ height: "0.75em" }}
              />
            </span>
          </Link>

          {/* Quaternary: subtle skip link */}
          <div className="mt-3 text-center">
            <Link
              to="/mywordie"
              className="inline-flex items-center gap-1 text-xs text-muted-foreground font-semibold"
            >
              or practice with
              <img src={myWordieText.url} alt="myWordie" className="h-4 object-contain" />
            </Link>
          </div>
        </section>
      </div>

      <BottomTabBar />
    </PhoneFrame>
  );
}

function Cloud({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 60" className={className} fill="white" aria-hidden>
      <ellipse cx="30" cy="40" rx="25" ry="18" />
      <ellipse cx="55" cy="32" rx="22" ry="20" />
      <ellipse cx="75" cy="42" rx="20" ry="15" />
    </svg>
  );
}
