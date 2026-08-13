import { createFileRoute, Link } from "@tanstack/react-router";
import { PhoneFrame } from "@/components/app/PhoneFrame";

export const Route = createFileRoute("/sheets")({
  head: () => ({
    meta: [
      { title: "Bottom Sheet Debug Preview — Paizley EC" },
      { name: "description", content: "One debug list to open every migrated bottom sheet layout for review." },
      { property: "og:title", content: "Bottom Sheet Debug Preview — Paizley EC" },
      { property: "og:description", content: "One debug list to open every migrated bottom sheet layout for review." },
    ],
  }),
  component: SheetIndexPage,
});

type Row = { title: string; slug: string; to: string; search?: Record<string, string>; file: string };

const GROUPS: { group: string; rows: Row[] }[] = [
  {
    group: "Trial conversion",
    rows: [
      { title: "解锁 AI 智能陪伴", slug: "ai-companion", to: "/shirin-talk", search: { sheet: "ai-companion" }, file: "src/components/app/AiUpsellFlow.tsx" },
      { title: "孩子的学习旅程正在成长", slug: "trial-day5", to: "/", search: { sheet: "trial-day5" }, file: "src/components/app/TrialReminderFlow.tsx" },
      { title: "7天免费旅程即将结束", slug: "trial-day7", to: "/", search: { sheet: "trial-day7" }, file: "src/components/app/TrialReminderFlow.tsx" },
      { title: "会员方案", slug: "membership", to: "/", search: { sheet: "membership" }, file: "src/routes/parent.tsx (MembershipCards)" },
      { title: "绑定手机号以完成购买", slug: "purchase-phone", to: "/", search: { sheet: "purchase-phone" }, file: "src/routes/parent.tsx (PurchasePhoneSheet)" },
    ],
  },
  {
    group: "Onboarding / 学习旅程",
    rows: [
      { title: "孩子的学习旅程还未开启", slug: "journey-quota", to: "/profile", search: { sheet: "journey-quota" }, file: "src/components/app/LearningJourneyFlow.tsx" },
      { title: "体验次数已用完 · ShirinTalk", slug: "limit-used", to: "/profile", search: { sheet: "limit-used" }, file: "src/components/app/LearningJourneyFlow.tsx" },
      { title: "体验次数已用完 · myWordie", slug: "limit-used-wordie", to: "/profile", search: { sheet: "limit-used-wordie" }, file: "src/components/app/LearningJourneyFlow.tsx" },
      { title: "体验次数已用完 · Bloxia", slug: "limit-used-bloxia", to: "/profile", search: { sheet: "limit-used-bloxia" }, file: "src/components/app/LearningJourneyFlow.tsx" },
      { title: "创建孩子的学习旅程", slug: "create-journey", to: "/profile", search: { sheet: "create-journey" }, file: "src/components/app/LearningJourneyFlow.tsx" },
      { title: "创建家长账户", slug: "guardian-account", to: "/profile", search: { sheet: "guardian-account" }, file: "src/components/app/LearningJourneyFlow.tsx" },
      { title: "无法创建家长账户", slug: "guardian-error", to: "/profile", search: { sheet: "guardian-error" }, file: "src/components/app/LearningJourneyFlow.tsx" },
      { title: "请设置家长PIN", slug: "setup-parent-pin", to: "/profile", search: { sheet: "setup-parent-pin" }, file: "src/components/app/LearningJourneyFlow.tsx" },
      { title: "创建孩子档案", slug: "create-learner", to: "/profile", search: { sheet: "create-learner" }, file: "src/components/app/LearnerSelectFlow.tsx (AddLearnerSheet)" },
      { title: "7天免费旅程已开启", slug: "trial-started", to: "/learning-journey-success", file: "src/routes/learning-journey-success.tsx" },
    ],
  },
  {
    group: "Parent security",
    rows: [
      { title: "请输入家长PIN", slug: "enter-parent-pin", to: "/parent", search: { sheet: "enter-parent-pin" }, file: "src/routes/parent.tsx (ParentPinGate)" },
      { title: "请设置家长PIN", slug: "setup-parent-pin", to: "/parent", search: { sheet: "setup-parent-pin" }, file: "src/routes/parent.tsx (ParentPinGate)" },
      { title: "找回家长PIN", slug: "recover-pin", to: "/parent", search: { sheet: "recover-pin" }, file: "src/routes/parent.tsx (ParentPinGate)" },
      { title: "找回家长PIN · 手机验证", slug: "recover-phone", to: "/parent", search: { sheet: "recover-phone" }, file: "src/routes/parent.tsx (ParentPinGate)" },
      { title: "创建家长账户 (visitor)", slug: "guardian-account", to: "/parent", search: { sheet: "guardian-account" }, file: "src/routes/parent.tsx (ParentPinGate)" },
      { title: "绑定手机号", slug: "bind-phone", to: "/parent", search: { sheet: "bind-phone" }, file: "src/routes/parent.tsx (ParentPinGate)" },
      { title: "请输入手机号", slug: "phone-entry", to: "/parent", search: { sheet: "phone-entry" }, file: "src/routes/parent.tsx (ParentPinGate)" },
      { title: "手机号绑定成功", slug: "phone-success", to: "/parent", search: { sheet: "phone-success" }, file: "src/routes/parent.tsx (ParentPinGate)" },
    ],
  },
  {
    group: "Learner profile",
    rows: [
      { title: "Edit Profile", slug: "edit-profile", to: "/profile", search: { sheet: "edit-profile" }, file: "src/components/app/EditProfileSheet.tsx" },
      { title: "Select Learner", slug: "select-learner", to: "/profile", search: { sheet: "select-learner" }, file: "src/components/app/LearnerSelectFlow.tsx" },
      { title: "Add Learner", slug: "add-learner", to: "/profile", search: { sheet: "add-learner" }, file: "src/components/app/LearnerSelectFlow.tsx (AddLearnerSheet)" },
      { title: "Birthday", slug: "birthday", to: "/profile", search: { sheet: "birthday" }, file: "src/components/app/LearnerSelectFlow.tsx (LearnerBirthdaySheet)" },
    ],
  },
];

function SheetIndexPage() {
  return (
    <PhoneFrame bg="bg-white">
      <div className="min-h-[100dvh]" style={{ background: "#f7f8fa" }}>
        {/* Sticky nav-bar style header, like the mini-program debug preview */}
        <header
          className="sticky top-0 z-10 bg-white px-6 pt-[18px] pb-3"
          style={{ borderBottom: "1px solid color-mix(in oklab, var(--foreground) 7%, white)" }}
        >
          <h1 className="text-[24px] font-semibold leading-tight" style={{ color: "var(--paisley)" }}>
            Bottom Sheet Debug Preview
          </h1>
          <p className="mt-1 text-[13px]" style={{ color: "var(--muted-foreground)", fontWeight: 400 }}>
            Real migrated sheet layouts · No auth · Non-Bloxia
          </p>
        </header>

        <div className="px-6 pt-4 pb-16 flex flex-col gap-3">
          {GROUPS.flatMap((g) => g.rows).map((r) => (
            <Link
              key={`${r.to}-${r.slug}-${r.title}`}
              to={r.to}
              search={r.search}
              className="block rounded-2xl bg-white px-5 py-4 active:scale-[0.99] transition-transform"
              style={{
                border: "1px solid color-mix(in oklab, var(--foreground) 6%, white)",
                boxShadow: "0 1px 3px rgba(15,23,42,0.04)",
              }}
            >
              <span className="block text-[16px] font-semibold leading-snug" style={{ color: "var(--foreground)" }}>
                {r.title}
              </span>
              <span className="mt-1 block text-[12px]" style={{ color: "var(--muted-foreground)", fontWeight: 400 }}>
                {r.slug}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </PhoneFrame>
  );
}
