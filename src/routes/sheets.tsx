import { createFileRoute, Link } from "@tanstack/react-router";
import { PhoneFrame } from "@/components/app/PhoneFrame";

export const Route = createFileRoute("/sheets")({
  head: () => ({
    meta: [
      { title: "Bottom Sheet Index — Paizley EC" },
      { name: "description", content: "Debug index of every bottom sheet with its source file and test link." },
      { property: "og:title", content: "Bottom Sheet Index — Paizley EC" },
      { property: "og:description", content: "Debug index of every bottom sheet with its source file and test link." },
    ],
  }),
  component: SheetIndexPage,
});

type Row = { title: string; slug: string; to: string; search?: Record<string, string>; file: string };

const GROUPS: { group: string; rows: Row[] }[] = [
  {
    group: "Trial conversion",
    rows: [
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
      { title: "体验次数已用完", slug: "limit-used", to: "/profile", search: { sheet: "limit-used" }, file: "src/components/app/LearningJourneyFlow.tsx" },
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
      <div className="min-h-[100dvh] bg-white px-6 pt-[53px] pb-16">
        <h1 className="text-[20px] font-semibold" style={{ color: "var(--paisley)" }}>
          Bottom Sheet Index
        </h1>
        <p className="mt-1 text-[12px]" style={{ color: "var(--muted-foreground)", fontWeight: 400 }}>
          每个上拉菜单的代码位置与测试链接
        </p>

        {GROUPS.map((g) => (
          <section key={g.group} className="mt-7">
            <h2
              className="text-[11px] uppercase tracking-[0.12em]"
              style={{ color: "var(--muted-foreground)", fontWeight: 600 }}
            >
              {g.group}
            </h2>
            <div className="mt-3 flex flex-col gap-2">
              {g.rows.map((r) => (
                <Link
                  key={`${r.to}-${r.slug}-${r.title}`}
                  to={r.to}
                  search={r.search}
                  className="block rounded-2xl px-4 py-3"
                  style={{
                    background: "color-mix(in oklab, var(--paisley) 5%, white)",
                    border: "1px solid color-mix(in oklab, var(--paisley) 14%, white)",
                  }}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[14px] font-semibold" style={{ color: "var(--foreground)" }}>
                      {r.title}
                    </span>
                    <span
                      className="shrink-0 rounded-full px-2.5 h-[22px] grid place-items-center text-[10px]"
                      style={{ background: "var(--paisley)", color: "white", fontWeight: 600 }}
                    >
                      {r.slug}
                    </span>
                  </div>
                  <p className="mt-1 text-[10px] break-all" style={{ color: "var(--muted-foreground)", fontWeight: 400 }}>
                    {r.file}
                  </p>
                  <p className="mt-0.5 text-[10px]" style={{ color: "color-mix(in oklab, var(--paisley) 70%, white)", fontWeight: 400 }}>
                    {r.to}
                    {r.search ? `?sheet=${r.search["sheet"]}` : ""}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </PhoneFrame>
  );
}
