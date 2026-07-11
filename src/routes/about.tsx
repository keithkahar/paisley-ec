import { createFileRoute } from "@tanstack/react-router";
import { PhoneFrame } from "@/components/app/PhoneFrame";
import { FloatingBack } from "@/components/app/FloatingBack";
import paisleyLogo from "@/assets/brand/paisley-ec-logo.png.asset.json";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About PEC — Paisley EC" },
      { name: "description", content: "About Paisley EC, an English learning world for kids aged 7–12." },
      { property: "og:title", content: "About PEC — Paisley EC" },
      { property: "og:description", content: "About Paisley EC, an English learning world for kids aged 7–12." },
    ],
  }),
  component: AboutPage,
});

const services = [
  {
    title: "ShirinTalk",
    desc: "定制AI口语互动伙伴，通过温和而循序渐进的引导式对话，帮助孩子建立每日开口说英语的自信心。在此过程中，Shirin会鼓励孩子用完整、简洁的英语句子作答，并友善地纠正语法或用词错误，让口语练习更自然、更高效。",
  },
  {
    title: "Smart Reading",
    desc: "一套卓越的原版分级阅读项目，在同类项目中表现尤为突出。学习者可根据自身需求灵活选择线上或线下模式进行阅读训练，有效提升英语阅读理解能力。",
  },
  {
    title: "myON Reader",
    desc: "专为儿童设计的全球最大规模数字图书馆，内含丰富多样的英语原版读物。该平台尤其适合家庭环境下的广泛阅读实践，帮助孩子在家长的陪伴下养成良好的课外阅读习惯。",
  },
  {
    title: "Home School Resources",
    desc: "提供分级搭配的动画等视频内容，专门为家长在家支持孩子学习而设计。这些资源以趣味性和自然习得的方式，帮助孩子轻松迈出英语学习的第一步。",
  },
  {
    title: "Personalized Learning Plans",
    desc: "基于一对一专业咨询，为每一位学习者量身定制符合其独特需求和能力水平的学习方案，确保学习过程更具针对性与成效。",
  },
];

const contactItems = [
  { label: "Website", value: "Coming soon" },
  { label: "Email", value: "Coming soon" },
  { label: "WeChat", value: "Coming soon" },
];

const PAISLEY_BLUE = "var(--paisley)";
const DEEP_NAVY = "#0B2545";

function AboutPage() {
  return (
    <PhoneFrame bg="bg-white">
      <div className="relative bg-white min-h-[calc(100dvh)]">
        <FloatingBack to="/profile" />

        <main className="px-8 pt-14 pb-10 overflow-y-auto">
          {/* Intro */}
          <section className="mb-7">
            <p
              className="text-[15px] leading-[1.55] font-normal"
              style={{ color: "#000000" }}
            >
              <img
                src={paisleyLogo.url}
                alt="PEC"
                className="inline-block h-[1em] w-auto object-contain"
                style={{
                  filter: "grayscale(100%) brightness(0)",
                  verticalAlign: "-0.12em",
                  marginRight: "0.2em",
                }}
              />
              （简称PEC）是一家专业的英语教育工作室，致力于为低龄英语学习者提供全方位的语言学习支持服务。其核心项目与资源包括：
            </p>
          </section>

          {/* Service Cards */}
          <section className="flex flex-col gap-6 mb-7">
            {services.map((s) => (
              <article
                key={s.title}
                className="rounded-[22px] bg-white p-6"
                style={{
                  boxShadow: "0 14px 40px rgba(11, 37, 69, 0.055)",
                }}
              >
                <h2
                  className="text-[17px] font-semibold leading-[1.25] mb-3"
                  style={{ color: PAISLEY_BLUE }}
                >
                  {s.title}
                </h2>
                <p
                  className="text-[15px] font-normal leading-[1.5]"
                  style={{ color: "#000000" }}
                >
                  {s.desc}
                </p>
              </article>
            ))}
          </section>

          {/* Contact Card */}
          <section
            className="rounded-[22px] bg-white p-6"
            style={{
              boxShadow: "0 14px 40px rgba(11, 37, 69, 0.055)",
            }}
          >
            <h2
              className="text-[17px] font-semibold leading-[1.25] mb-4"
              style={{ color: PAISLEY_BLUE }}
            >
              Contact Us
            </h2>
            <div className="flex flex-col">
              {contactItems.map((item, i) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between gap-6 py-4"
                  style={{
                    borderBottom:
                      i < contactItems.length - 1
                        ? "1px solid rgba(1, 70, 185, 0.08)"
                        : "none",
                  }}
                >
                  <span
                    className="text-[15px] font-semibold"
                    style={{ color: DEEP_NAVY }}
                  >
                    {item.label}
                  </span>
                  <span
                    className="text-[15px] font-normal"
                    style={{ color: "#50627A" }}
                  >
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </PhoneFrame>
  );
}
