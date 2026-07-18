import { createFileRoute } from "@tanstack/react-router";
import { PhoneFrame } from "@/components/app/PhoneFrame";
import { FloatingBack } from "@/components/app/FloatingBack";
import paisleyLogo from "@/assets/brand/paisley-ec-logo.png.asset.json";
import paizleyLogo from "@/assets/brand/paizley-ec-logo-placeholder.png.asset.json";

export const Route = createFileRoute("/about-paizley")({
  head: () => ({
    meta: [
      { title: "About Paizley EC — Paisley EC" },
      { name: "description", content: "Learn about Paizley EC and our learning products: ShirinTalk, myWordie, Bloxia, Smart Reading, myON Reader, and more." },
      { property: "og:title", content: "About Paizley EC — Paisley EC" },
      { property: "og:description", content: "Learn about Paizley EC and our learning products for kids aged 7–12." },
    ],
  }),
  component: AboutPaizleyPage,
});

const PAISLEY = "var(--paisley)";

const sections = [
  {
    title: "Paizley EC",
    body: "Paizley EC 致力于为低龄英语学习者提供完整、温和、可持续的英语学习支持。我们结合 AI 口语互动、个性化词汇复习、成长激励、原版分级阅读、家庭学习资源与专业学习规划指导，帮助孩子逐步建立英语听、说、读、写综合能力，重点提升表达能力。",
  },
  {
    title: "ShirinTalk",
    body: "特别定制的 AI 口语互动伙伴。Shirin 会通过温和、循序渐进的引导式对话，帮助孩子建立每日开口说英语的自信心。她会鼓励孩子用完整、简洁的英语句子作答，并友善地纠正语法或用词错误，让口语练习更自然、更高效。",
  },
  {
    title: "myWordie",
    body: "个性化词汇学习与复习系统。词库涵盖 A1-B2 级别，帮助孩子把阅读和口语中遇到的新词沉淀为自己的词库，并通过词卡、复习、测试和 myWordie Talk，把单词从“认识”逐步变成“会用”。",
  },
  {
    title: "Bloxia",
    body: "Paizley EC 的学习成长世界。孩子通过完成口语、阅读、词汇和测评任务获得 Bp 成长积分，并在 Bloxia 中解锁地点、徽章和收藏物，让学习进步变得可见、有趣，也更有持续动力。",
  },
  {
    title: "Smart Reading",
    body: "一套优质的原版分级阅读项目，适合低龄英语学习者进行系统阅读训练。孩子可根据自身需求选择线上或线下模式，在阅读理解、关键词积累、故事复述和口语表达中持续提升英语能力。",
  },
  {
    title: "myON Reader",
    body: "面向儿童的英文数字阅读平台，提供丰富多样的英语原版读物。它尤其适合家庭环境下的广泛阅读实践，帮助孩子在家长陪伴下养成稳定的课外阅读习惯。",
  },
  {
    title: "Home School Resources",
    body: "提供分级搭配的动画、视频等家庭学习资源，专为家长在家支持孩子学习而设计。这些内容以趣味性和自然习得为核心，帮助孩子轻松迈出英语启蒙的第一步。",
  },
  {
    title: "Personalized Learning Plans",
    body: "基于一对一专业咨询，为每位学习者定制符合其年龄、基础、能力水平和学习目标的个性化方案，让学习过程更有方向，也更具针对性和成效。",
  },
];

function AboutPaizleyPage() {
  return (
    <PhoneFrame bg="bg-white">
      <div className="relative min-h-[100dvh] bg-white">
        <FloatingBack to="/profile" />

        <main className="px-6 pt-[53px] pb-10">
          <div className="flex flex-col gap-4">
            {sections.map((s, index) => {
              const isFirst = index === 0;
              return (
                <article
                  key={s.title}
                  className={
                    isFirst
                      ? "rounded-[22px] bg-white p-4 overflow-hidden"
                      : "flex items-start gap-4 rounded-[22px] bg-white p-4"
                  }
                  style={{
                    boxShadow: "0 14px 40px rgba(11, 37, 69, 0.055)",
                  }}
                >
                  {isFirst ? (
                    <>
                      <img
                        src={paizleyLogo.url}
                        alt={s.title}
                        className="float-left mr-4 mb-4 h-16 w-16 object-contain align-top mt-[1.5px]"
                      />
                      <p
                        className="text-[15px] font-normal leading-relaxed"
                        style={{ color: "#000000" }}
                      >
                      <span
                        className="font-extrabold"
                        style={{ color: PAISLEY }}
                      >
                        Paizley EC
                      </span>
                        {s.body.slice("Paizley EC".length)}
                      </p>
                    </>
                  ) : (
                    <>
                      <div
                        className="h-16 w-16 shrink-0 rounded-2xl bg-white grid place-items-center overflow-hidden"
                        style={{
                          boxShadow: "0 4px 16px rgba(11, 37, 69, 0.06)",
                        }}
                      >
                        <img
                          src={paizleyLogo.url}
                          alt={s.title}
                          className="h-12 w-12 object-contain"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h2
                          className="text-[17px] font-semibold leading-tight tracking-tight mb-1.5"
                          style={{ color: PAISLEY, letterSpacing: "-0.01em" }}
                        >
                          {s.title}
                        </h2>
                        <p
                          className="text-[15px] font-normal leading-relaxed"
                          style={{ color: "#000000" }}
                        >
                          {s.body}
                        </p>
                      </div>
                    </>
                  )}
                </article>
              );
            })}
          </div>
        </main>
      </div>
    </PhoneFrame>
  );
}
