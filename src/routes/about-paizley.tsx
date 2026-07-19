import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight, Mail, Globe } from "lucide-react";
import { PhoneFrame } from "@/components/app/PhoneFrame";
import { FloatingBack } from "@/components/app/FloatingBack";
import logoPaizley from "@/assets/about/about-paizley.png.asset.json";
import logoShirin from "@/assets/about/about-shirintalk.png.asset.json";
import logoWordie from "@/assets/about/about-mywordie.png.asset.json";
import logoBloxia from "@/assets/about/about-bloxia.png.asset.json";
import logoSmartReading from "@/assets/about/about-smart-reading.png.asset.json";
import logoMyon from "@/assets/about/about-myon.png.asset.json";
import logoClassin from "@/assets/about/about-classin.png.asset.json";
import logoHomeSchool from "@/assets/about/about-home-school.png.asset.json";
import logoPlp from "@/assets/about/about-plp.png.asset.json";
import iconVideoChannel from "@/assets/contact/video-channel.png.asset.json";
import iconXiaohongshu from "@/assets/contact/xiaohongshu.png.asset.json";
import iconDouyin from "@/assets/contact/douyin.png.asset.json";
import iconGongzhonghao from "@/assets/contact/gongzhonghao.png.asset.json";

export const Route = createFileRoute("/about-paizley")({
  head: () => ({
    meta: [
      { title: "About Paizley EC — Paisley EC" },
      { name: "description", content: "Learn about Paizley EC and our learning products: ShirinTalk, myWordie, Bloxia, Smart Reading, myON Reader, ClassIn Learning Hub, and more." },
      { property: "og:title", content: "About Paizley EC — Paisley EC" },
      { property: "og:description", content: "Learn about Paizley EC and our learning products for kids aged 7–12." },
    ],
  }),
  component: AboutPaizleyPage,
});

const PAISLEY = "#0146b9";

const sections = [
  {
    title: "Paizley EC",
    logo: logoPaizley.url,
    color: PAISLEY,
    to: "/",
    body: "Paizley EC为低龄英语学习者提供完整、温和、可持续的英语学习支持。我们结合 AI 口语互动、个性化词汇复习、成长激励、原版分级阅读、线上学习课程、家庭学习资源与专业学习规划指导，帮助孩子逐步建立英语听、说、读、写综合能力，重点提升表达能力。",
  },
  {
    title: "ShirinTalk",
    logo: logoShirin.url,
    color: "#f83e6a",
    to: "/shirin-talk",
    body: "ShirinTalk是特别定制的 AI 口语伙伴教练。Shirin 会通过温和、循序渐进的引导式对话，帮助孩子建立每日开口说英语的自信心。她会鼓励孩子用完整、简洁的英语句子作答，并友善地纠正语法或用词错误，让口语练习更自然、更高效。",
  },
  {
    title: "myWordie",
    logo: logoWordie.url,
    color: "#5064f5",
    to: "/mywordie",
    body: "myWordie是自带记忆算法的个性化词汇学习与复习系统。词库涵盖 A1-B2 级别，帮助孩子把阅读和口语中遇到的新词沉淀为自己的词库，并通过词卡、复习、测试和 myWordie Talk，把单词从“认识”逐步变成“会用”。",
  },
  {
    title: "Bloxia",
    logo: logoBloxia.url,
    color: "#55a029",
    to: "/bloxia",
    body: "Bloxia是学习成长世界。孩子通过完成口语、阅读、词汇和测评任务获得 Bp 成长积分，并在 Bloxia 中解锁地点、徽章和收藏物，让学习进步变得可见、有趣，也更有持续动力。",
  },
  {
    title: "Smart Reading",
    logo: logoSmartReading.url,
    color: "#f7c117",
    body: "Smart Reading是一套优质的原版分级阅读项目，适合低龄英语学习者进行系统阅读训练。孩子可根据自身需求选择线上或线下模式，在阅读理解、关键词积累、故事复述和口语表达中持续提升英语能力。",
  },
  {
    title: "myON Reader",
    logo: logoMyon.url,
    color: "#0067b1",
    body: "myON Reader是面向儿童的英文数字阅读平台，提供丰富多样的英语原版读物。它尤其适合家庭环境下的广泛阅读实践，帮助孩子在家长陪伴下养成稳定的课外阅读习惯。",
  },
  {
    title: "ClassIn Learning Hub",
    logo: logoClassin.url,
    color: "#009265",
    body: "ClassIn Learning Hub是线上学习中心，集合阅读、自然拼读、家庭学习讲座等多元教育产品，为孩子与家长提供灵活、连贯的学习支持。它是 Paizley EC 实现“教、学、练、测、评”闭环生态的重要在线平台，帮助孩子在系统课程与持续练习中提升阅读能力和表达能力，也帮助家长更科学地参与家庭学习陪伴。",
  },
  {
    title: "Home School Resources",
    logo: logoHomeSchool.url,
    color: "#06a3e4",
    body: "Home School Resources是专为家长在家支持孩子英语学习而设计的家庭学习资源体系，提供分级搭配的动画、视频等内容。这些资源以趣味性和自然习得为核心，帮助孩子在轻松的家庭环境中迈出英语启蒙的第一步。",
  },
  {
    title: "Personalized Learning Plans",
    logo: logoPlp.url,
    color: "#1ab9cf",
    body: "Personalized Learning Plans是基于一对一专业咨询形成的个性化学习规划服务。我们会为每位学习者定制符合其年龄、基础、能力水平和学习目标的学习方案，让学习过程更有方向，也更具针对性和成效。",
  },
];

function AboutPaizleyPage() {
  return (
    <PhoneFrame bg="bg-white">
      <div
        className="relative min-h-[100dvh] bg-white"
        style={{ fontFamily: "'Nunito', sans-serif" }}
      >
        <FloatingBack to="/profile" />

        <main className="px-6 pt-[53px] pb-10">
          <div className="flex flex-col gap-4">
            {sections.map((s) => {
              const card = (
                <article
                  className="rounded-[22px] bg-white p-4 overflow-hidden"
                  style={{
                    boxShadow: "0 14px 40px rgba(11, 37, 69, 0.055)",
                  }}
                >
                  <img
                    src={s.logo}
                    alt={s.title}
                    className="float-left object-contain align-top mr-4 mb-[13px] h-12 w-12"
                  />
                  <p
                    className="relative text-[13px] font-normal text-gray-600"
                    style={{ lineHeight: "25.8333px" }}
                  >
                    <span className="text-[15px] font-extrabold" style={{ color: s.color }}>
                      {s.title}
                    </span>{" "}
                    {s.body.slice(s.title.length)}
                    <ChevronRight
                      size={16}
                      color={s.color}
                      className="absolute bottom-[5px] right-0"
                    />
                  </p>
                  <div className="clear-both mt-4 -mx-4 -mb-4">
                    <div
                      className="h-[2px] w-full"
                      style={{ backgroundColor: s.color }}
                    />
                  </div>
                </article>
              );
              return s.to ? (
                <Link
                  key={s.title}
                  to={s.to}
                  className="block no-underline"
                >
                  {card}
                </Link>
              ) : (
                <div key={s.title}>{card}</div>
              );
            })}
          </div>

          <ContactCard />
        </main>
      </div>
    </PhoneFrame>
  );
}

function ContactCard() {
  const socials = [
    { icon: iconGongzhonghao.url, label: "公众号" },
    { icon: iconVideoChannel.url, label: "视频号" },
    { icon: iconXiaohongshu.url, label: "小红书" },
    { icon: iconDouyin.url, label: "抖音" },
  ];
  return (
    <article
      className="mt-4 rounded-[22px] bg-white overflow-hidden relative"
      style={{ boxShadow: "0 14px 40px rgba(11, 37, 69, 0.055)" }}
    >
      {/* Decorative glows */}
      <div
        className="absolute -top-16 -right-16 w-32 h-32 rounded-full blur-3xl pointer-events-none"
        style={{ background: "rgba(1, 70, 185, 0.06)" }}
      />
      <div
        className="absolute -bottom-16 -left-16 w-32 h-32 rounded-full blur-3xl pointer-events-none"
        style={{ background: "rgba(1, 70, 185, 0.04)" }}
      />

      <div className="relative p-5">
        {/* Header */}
        <h3 className="text-[17px] font-extrabold tracking-tight mb-5 text-gray-600" style={{ fontFamily: "'Nunito', sans-serif" }}>
          Follow on
        </h3>

        {/* Social platforms */}
        <div className="flex items-start justify-center gap-8 mb-5 px-4">
          {socials.map((s) => (
            <div
              key={s.label}
              className="flex flex-col items-center gap-2 cursor-pointer"
            >
              <img
                src={s.icon}
                alt={s.label}
                className="h-12 w-12 object-contain"
              />
              <span className="text-[12px] font-medium text-gray-600 whitespace-nowrap">
                Paizley EC
              </span>
            </div>
          ))}
        </div>

        {/* Contact footer */}
        <div className="pt-4 border-t border-gray-100 flex items-center justify-center gap-6">
          <a
            href="mailto:pec@paizley.cn"
            className="flex items-center gap-2 text-[15px] font-normal leading-none text-gray-600 hover:text-gray-800 transition-colors group"
          >
            <Mail size={16} className="text-gray-500 group-hover:text-gray-700" />
            pec@paizley.cn
          </a>
          <a
            href="https://www.paizley.cn"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-[15px] font-normal leading-none text-gray-600 hover:text-gray-800 transition-colors group"
          >
            <Globe size={16} className="text-gray-500 group-hover:text-gray-700" />
            www.paizley.cn
          </a>
        </div>
      </div>

      {/* Bottom accent bar */}
      <div className="h-[2px] w-full bg-[#0146b9]" />
    </article>
  );
}
