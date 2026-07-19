import { createFileRoute } from "@tanstack/react-router";
import { ChevronRight, Globe, Mail } from "lucide-react";
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
    body: "Paizley EC为低龄英语学习者提供完整、温和、可持续的英语学习支持。我们结合 AI 口语互动、个性化词汇复习、成长激励、原版分级阅读、线上学习课程、家庭学习资源与专业学习规划指导，帮助孩子逐步建立英语听、说、读、写综合能力，重点提升表达能力。",
  },
  {
    title: "ShirinTalk",
    logo: logoShirin.url,
    color: "#f83e6a",
    body: "ShirinTalk是特别定制的 AI 口语伙伴教练。Shirin 会通过温和、循序渐进的引导式对话，帮助孩子建立每日开口说英语的自信心。她会鼓励孩子用完整、简洁的英语句子作答，并友善地纠正语法或用词错误，让口语练习更自然、更高效。",
  },
  {
    title: "myWordie",
    logo: logoWordie.url,
    color: "#5064f5",
    body: "myWordie是自带记忆算法的个性化词汇学习与复习系统。词库涵盖 A1-B2 级别，帮助孩子把阅读和口语中遇到的新词沉淀为自己的词库，并通过词卡、复习、测试和 myWordie Talk，把单词从“认识”逐步变成“会用”。",
  },
  {
    title: "Bloxia",
    logo: logoBloxia.url,
    color: "#55a029",
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
      <div className="relative min-h-[100dvh] bg-white">
        <FloatingBack to="/profile" />

        <main className="px-6 pt-[53px] pb-10">
          <div className="flex flex-col gap-4">
            {sections.map((s) => (
              <article
                key={s.title}
                className="rounded-[22px] bg-white p-4 overflow-hidden"
                style={{
                  boxShadow: "0 14px 40px rgba(11, 37, 69, 0.055)",
                }}
              >
                <img
                  src={s.logo}
                  alt={s.title}
                  className="float-left object-contain align-top mr-4 mb-[13px] h-16 w-16"
                />
                <p
                  className="relative text-[15px] font-normal"
                  style={{ color: "#000000", lineHeight: "25.8333px" }}
                >
                  <span className="text-[17px] font-extrabold" style={{ color: s.color }}>
                    {s.title}
                  </span>{" "}
                  {s.body.slice(s.title.length)}
                  <ChevronRight
                    size={16}
                    color={s.color}
                    className="absolute bottom-[5px] right-0"
                  />
                </p>
              </article>
            ))}
          </div>

          <ContactCard />
        </main>
      </div>
    </PhoneFrame>
  );
}

function ContactCard() {
  const socials = [
    { icon: iconVideoChannel.url, label: "视频号" },
    { icon: iconXiaohongshu.url, label: "小红书" },
    { icon: iconDouyin.url, label: "抖音" },
  ];
  return (
    <article
      className="mt-4 rounded-[22px] bg-white p-5"
      style={{ boxShadow: "0 14px 40px rgba(11, 37, 69, 0.055)" }}
    >
      <div className="flex items-center">
        {socials.map((s, i) => (
          <div key={i} className="relative flex items-center justify-center flex-1">
            <img
              src={s.icon}
              alt={s.label}
              className="h-10 w-10 object-contain grayscale opacity-70"
            />
            {i < socials.length - 1 && (
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-5 bg-gray-200" />
            )}
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <Globe size={18} color={PAISLEY} strokeWidth={2} />
          <span className="text-[13px] font-normal text-gray-700">paizley.cn</span>
        </div>
        <div className="flex items-center gap-2">
          <Mail size={18} color={PAISLEY} strokeWidth={2} />
          <span className="text-[13px] font-normal text-gray-700">pec@paizley.cn</span>
        </div>
      </div>
    </article>
  );
}
