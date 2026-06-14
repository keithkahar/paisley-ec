import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PhoneFrame } from "@/components/app/PhoneFrame";
import { FloatingBack } from "@/components/app/FloatingBack";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "管理员后台 — Paisley EC" },
      { name: "description", content: "前端参数管理中心。" },
    ],
  }),
  component: AdminPage,
});

type AdminParam = {
  path: string;
  label: string;
  value: string | number | boolean;
  valueText: string;
  defaultText: string;
  type: "string" | "number" | "boolean";
  customized: boolean;
  helpText: string;
  options?: Array<{ label: string; value: string }>;
};

type AdminGroup = {
  key: string;
  title: string;
  subtitle: string;
  rows: AdminParam[];
};

const NAVY = "#0B2545";
const MUTED = "#8A97A6";
const SUB = "#50627A";
const SOFT_BG = "#F6F8FC";
const ACTIVE_BG = "#EAF3FF";
const SUMMARY_BG = "#F7FAFF";
const BORDER = "#EEF3FA";
const PAISLEY = "#0146B9";

const INITIAL_GROUPS: AdminGroup[] = [
  {
    key: "system",
    title: "系统与隐藏入口",
    subtitle: "版本号、后台入口、安全点击规则、发布通道。",
    rows: [
      { path: "system.appVersion", label: "应用版本号", value: "1.0.0", valueText: "1.0.0", defaultText: "1.0.0", type: "string", customized: false, helpText: "控制前端显示的应用版本号。" },
      { path: "system.releaseChannel", label: "发布通道", value: "mock", valueText: "Mock 原型", defaultText: "Mock 原型", type: "string", customized: true, helpText: "用于标记当前运行通道。", options: [
        { label: "Mock 原型", value: "mock" },
        { label: "开发", value: "dev" },
        { label: "测试", value: "test" },
        { label: "预发布", value: "staging" },
        { label: "正式", value: "release" },
      ]},
      { path: "system.adminEntryTaps", label: "后台入口点击次数", value: 5, valueText: "5", defaultText: "5", type: "number", customized: false, helpText: "在 About PEC 上连续点击多少次进入后台。" },
      { path: "system.adminEntryWindowMs", label: "点击窗口 (毫秒)", value: 1500, valueText: "1500", defaultText: "1500", type: "number", customized: false, helpText: "连续点击的有效时间窗口。" },
    ],
  },
  {
    key: "profileDefaults",
    title: "用户资料默认值",
    subtitle: "新用户首次进入时的资料默认值。",
    rows: [
      { path: "profileDefaults.cefrLevel", label: "默认 CEFR 等级", value: "A2", valueText: "A2", defaultText: "A2", type: "string", customized: false, helpText: "新用户默认的 CEFR 等级。", options: ["A1","A2","B1","B2","C1","C2"].map((v)=>({label:v,value:v})) },
      { path: "profileDefaults.dailyGoalMinutes", label: "默认每日目标 (分钟)", value: 20, valueText: "20", defaultText: "20", type: "number", customized: false, helpText: "新用户默认每日学习目标。" },
    ],
  },
  {
    key: "parentPreferences",
    title: "家长设置默认值",
    subtitle: "家长页里语速、提醒、音频、触感等默认开关。",
    rows: [
      { path: "parentPreferences.autoPlayWordAudio", label: "自动播放单词音频", value: true, valueText: "开启", defaultText: "开启", type: "boolean", customized: false, helpText: "控制单词音频是否默认自动播放。" },
      { path: "parentPreferences.speechRate", label: "语音语速", value: 0.8, valueText: "0.8", defaultText: "0.8", type: "number", customized: false, helpText: "控制语音播放速度。" },
      { path: "parentPreferences.hapticsEnabled", label: "触感反馈", value: true, valueText: "开启", defaultText: "开启", type: "boolean", customized: false, helpText: "是否启用触感反馈。" },
      { path: "parentPreferences.dailyReminder", label: "每日提醒", value: false, valueText: "关闭", defaultText: "关闭", type: "boolean", customized: false, helpText: "是否启用每日学习提醒。" },
    ],
  },
  {
    key: "shirinTalk",
    title: "ShirinTalk 对话参数",
    subtitle: "对话长度、随机性、模型温度。",
    rows: [
      { path: "shirinTalk.maxTurns", label: "最大轮次", value: 12, valueText: "12", defaultText: "12", type: "number", customized: false, helpText: "单次会话最大对话轮次。" },
      { path: "shirinTalk.temperature", label: "模型温度", value: 0.7, valueText: "0.7", defaultText: "0.7", type: "number", customized: true, helpText: "控制生成内容的随机性。" },
    ],
  },
  {
    key: "practiceGoals",
    title: "练习目标",
    subtitle: "每日 / 每周练习目标默认值。",
    rows: [
      { path: "practiceGoals.dailyTalk", label: "每日 ShirinTalk 目标", value: 1, valueText: "1", defaultText: "1", type: "number", customized: false, helpText: "每日 ShirinTalk 会话次数。" },
      { path: "practiceGoals.dailyWordie", label: "每日 myWordie 目标", value: 10, valueText: "10", defaultText: "10", type: "number", customized: false, helpText: "每日单词练习数量。" },
    ],
  },
  {
    key: "wordieDaily",
    title: "myWordie 每日计划",
    subtitle: "新词、复习、上限。",
    rows: [
      { path: "wordieDaily.newWords", label: "每日新词数", value: 6, valueText: "6", defaultText: "6", type: "number", customized: false, helpText: "每日推送的新词数量。" },
      { path: "wordieDaily.reviewCap", label: "每日复习上限", value: 40, valueText: "40", defaultText: "40", type: "number", customized: false, helpText: "每日复习的最大数量。" },
    ],
  },
  {
    key: "bpCaps",
    title: "Bp 每日上限",
    subtitle: "各模块每日 Bp 上限。",
    rows: [
      { path: "bpCaps.shirinTalk", label: "ShirinTalk 每日上限", value: 200, valueText: "200", defaultText: "200", type: "number", customized: false, helpText: "ShirinTalk 每日 Bp 上限。" },
      { path: "bpCaps.myWordie", label: "myWordie 每日上限", value: 200, valueText: "200", defaultText: "200", type: "number", customized: false, helpText: "myWordie 每日 Bp 上限。" },
    ],
  },
  {
    key: "effort",
    title: "高努力触发线",
    subtitle: "判定高努力会话的阈值。",
    rows: [
      { path: "effort.minDurationSec", label: "最少时长 (秒)", value: 180, valueText: "180", defaultText: "180", type: "number", customized: false, helpText: "高努力会话的最少时长。" },
    ],
  },
  {
    key: "shirinTalkBp",
    title: "ShirinTalk Bp 规则",
    subtitle: "每轮、每分钟、奖励倍率。",
    rows: [
      { path: "shirinTalkBp.perTurn", label: "每轮 Bp", value: 4, valueText: "4", defaultText: "4", type: "number", customized: false, helpText: "ShirinTalk 每轮获得 Bp。" },
    ],
  },
  {
    key: "wordieBp",
    title: "myWordie Bp 规则",
    subtitle: "记忆、复习、连击奖励。",
    rows: [
      { path: "wordieBp.perWord", label: "每词 Bp", value: 2, valueText: "2", defaultText: "2", type: "number", customized: false, helpText: "每记一个新词得 Bp。" },
    ],
  },
  {
    key: "rewards",
    title: "奖励预设",
    subtitle: "奖励名称、价格。",
    rows: [
      { path: "rewards.enabled", label: "启用奖励", value: true, valueText: "开启", defaultText: "开启", type: "boolean", customized: false, helpText: "是否启用奖励系统。" },
    ],
  },
  {
    key: "wordieTest",
    title: "Wordie Test 规则",
    subtitle: "题量、通过分数。",
    rows: [
      { path: "wordieTest.questionCount", label: "题目数量", value: 20, valueText: "20", defaultText: "20", type: "number", customized: false, helpText: "Wordie Test 的题目数量。" },
    ],
  },
  {
    key: "cefrTest",
    title: "CEFR Test 规则",
    subtitle: "题量、自适应步进。",
    rows: [
      { path: "cefrTest.questionCount", label: "题目数量", value: 30, valueText: "30", defaultText: "30", type: "number", customized: false, helpText: "CEFR Test 的题目数量。" },
    ],
  },
  {
    key: "bloxiaPrice",
    title: "Bloxia 消费价格",
    subtitle: "商店物品价格。",
    rows: [
      { path: "bloxiaPrice.seed", label: "种子价格", value: 10, valueText: "10", defaultText: "10", type: "number", customized: false, helpText: "种子的 Bp 价格。" },
    ],
  },
  {
    key: "bloxiaStage",
    title: "Bloxia 植物阶段",
    subtitle: "成长所需 Bp。",
    rows: [
      { path: "bloxiaStage.sprout", label: "发芽阈值", value: 50, valueText: "50", defaultText: "50", type: "number", customized: false, helpText: "进入发芽阶段所需 Bp。" },
    ],
  },
  {
    key: "display",
    title: "显示与图表",
    subtitle: "图表颜色、动效、密度。",
    rows: [
      { path: "display.weekStartsOnMonday", label: "周一为一周开始", value: true, valueText: "开启", defaultText: "开启", type: "boolean", customized: false, helpText: "日历是否以周一为一周开始。" },
      { path: "display.compactMode", label: "紧凑模式", value: false, valueText: "关闭", defaultText: "关闭", type: "boolean", customized: false, helpText: "启用更紧凑的卡片间距。" },
    ],
  },
];

function customizedCount(group: AdminGroup) {
  return group.rows.filter((r) => r.customized).length;
}

function formatValueText(param: AdminParam, raw: string): string {
  if (param.options) {
    return param.options.find((o) => o.value === raw)?.label ?? raw;
  }
  if (param.type === "boolean") return raw === "true" ? "开启" : "关闭";
  return raw;
}

function AdminPage() {
  const [groups, setGroups] = useState<AdminGroup[]>(INITIAL_GROUPS);
  const [activeKey, setActiveKey] = useState<string>("system");
  const [editing, setEditing] = useState<AdminParam | null>(null);
  const [editValue, setEditValue] = useState<string>("");
  const [helpFor, setHelpFor] = useState<AdminParam | null>(null);
  const [confirmReset, setConfirmReset] = useState(false);
  const [toast, setToast] = useState<string>("");

  const activeGroup = groups.find((g) => g.key === activeKey) ?? groups[0];

  const summary = useMemo(() => {
    const params = groups.reduce((n, g) => n + g.rows.length, 0);
    const cust = groups.reduce((n, g) => n + customizedCount(g), 0);
    return [
      { label: "分组", value: groups.length },
      { label: "参数", value: params },
      { label: "已自定义", value: cust },
    ];
  }, [groups]);

  function showToast(msg: string) {
    setToast(msg);
    window.setTimeout(() => setToast(""), 1400);
  }

  function openEditor(p: AdminParam) {
    setEditing(p);
    setEditValue(String(p.value));
  }

  function closeEditor() {
    setEditing(null);
    setEditValue("");
  }

  function saveEditor() {
    if (!editing) return;
    const path = editing.path;
    setGroups((prev) =>
      prev.map((g) => ({
        ...g,
        rows: g.rows.map((r) => {
          if (r.path !== path) return r;
          let v: string | number | boolean = editValue;
          if (r.type === "number") v = Number(editValue);
          else if (r.type === "boolean") v = editValue === "true";
          const valueText = formatValueText(r, editValue);
          return { ...r, value: v, valueText, customized: valueText !== r.defaultText };
        }),
      })),
    );
    closeEditor();
    showToast("已保存");
  }

  function resetAll() {
    setGroups(INITIAL_GROUPS.map((g) => ({ ...g, rows: g.rows.map((r) => ({ ...r, customized: false, valueText: r.defaultText })) })));
    setConfirmReset(false);
    showToast("已重置");
  }

  return (
    <PhoneFrame bg="bg-white">
      <div className="relative bg-white min-h-full pb-12" style={{ color: NAVY }}>
        <FloatingBack to="/profile" label="Back to profile" />

        <div className="px-5 pt-12">
          {/* Header */}
          <div className="flex items-start justify-between gap-3">
            <div>
              <h1 className="text-[24px] font-bold leading-tight" style={{ color: NAVY }}>管理员后台</h1>
              <p className="text-[12px] mt-1" style={{ color: MUTED }}>前端参数管理中心</p>
            </div>
            <button
              onClick={() => setConfirmReset(true)}
              className="h-[30px] px-4 rounded-full text-[13px] font-semibold"
              style={{ background: SOFT_BG, color: SUB }}
            >
              重置
            </button>
          </div>

          {/* Summary */}
          <div className="grid grid-cols-3 gap-[7px] mt-4 mb-3">
            {summary.map((s) => (
              <div key={s.label} className="rounded-2xl py-[11px] text-center" style={{ background: SUMMARY_BG }}>
                <div className="text-[19px] font-bold leading-none" style={{ color: PAISLEY }}>{s.value}</div>
                <div className="text-[11px] mt-1" style={{ color: SUB }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Group tabs */}
          <div className="-mx-5 px-5 overflow-x-auto no-scrollbar">
            <div className="flex gap-2 py-2 whitespace-nowrap">
              {groups.map((g) => {
                const active = g.key === activeKey;
                const cc = customizedCount(g);
                return (
                  <button
                    key={g.key}
                    onClick={() => setActiveKey(g.key)}
                    className="h-8 px-3 rounded-full text-[12px] font-semibold inline-flex items-center gap-1.5 shrink-0"
                    style={{
                      background: active ? ACTIVE_BG : SOFT_BG,
                      color: active ? PAISLEY : SUB,
                    }}
                  >
                    <span>{g.title}</span>
                    {cc > 0 && (
                      <span
                        className="inline-flex items-center justify-center min-w-[16px] h-[16px] px-1 rounded-full text-[10px] font-bold"
                        style={{ background: active ? PAISLEY : "#D6E4F5", color: active ? "#fff" : PAISLEY }}
                      >
                        {cc}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Param card */}
          {activeGroup && (
            <div
              className="rounded-[20px] bg-white px-4 py-3 mt-3"
              style={{ boxShadow: "0 7px 20px rgba(11, 37, 69, 0.055)" }}
            >
              <div className="flex items-start justify-between gap-3 pb-1">
                <div className="min-w-0">
                  <div className="text-[15px] font-semibold" style={{ color: NAVY }}>{activeGroup.title}</div>
                  <div className="text-[11px] mt-0.5" style={{ color: MUTED }}>{activeGroup.subtitle}</div>
                </div>
                <div className="text-[12px] font-bold" style={{ color: PAISLEY }}>{activeGroup.rows.length}</div>
              </div>

              {activeGroup.rows.map((row, idx) => (
                <button
                  key={row.path}
                  onClick={() => openEditor(row)}
                  className="w-full flex items-center justify-between gap-3 py-3 text-left"
                  style={{ borderTop: idx === 0 ? "none" : `1px solid ${BORDER}` }}
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[14px] font-semibold" style={{ color: NAVY }}>{row.label}</span>
                      {row.customized && (
                        <span
                          className="px-1.5 py-0.5 rounded text-[10px] font-bold"
                          style={{ background: "#FFE9CC", color: "#B45309" }}
                        >
                          已改
                        </span>
                      )}
                      <span
                        role="button"
                        onClick={(e) => { e.stopPropagation(); setHelpFor(row); }}
                        className="inline-flex items-center justify-center w-[18px] h-[18px] rounded-full text-[11px] font-bold"
                        style={{ background: SOFT_BG, color: SUB }}
                      >
                        ?
                      </span>
                    </div>
                    <div className="text-[11px] mt-0.5 break-all" style={{ color: MUTED }}>{row.path}</div>
                    <div className="text-[11px] mt-0.5" style={{ color: MUTED }}>默认：{row.defaultText}</div>
                  </div>
                  <div className="flex items-center gap-1 shrink-0 max-w-[40%]">
                    <div className="text-[14px] font-bold text-right break-all" style={{ color: PAISLEY }}>{row.valueText}</div>
                    <div className="text-[18px] leading-none" style={{ color: "#B8C2D1" }}>›</div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Toast */}
        {toast && (
          <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center">
            <div className="px-5 py-3 rounded-xl text-white text-[14px] font-medium" style={{ background: "rgba(11,37,69,0.85)" }}>{toast}</div>
          </div>
        )}

        {/* Help modal */}
        {helpFor && (
          <div className="fixed inset-0 z-40 flex items-center justify-center px-8" style={{ background: "rgba(11,37,69,0.32)" }} onClick={() => setHelpFor(null)}>
            <div className="w-full max-w-[320px] bg-white rounded-2xl p-5" onClick={(e) => e.stopPropagation()}>
              <div className="text-[16px] font-semibold" style={{ color: NAVY }}>{helpFor.label}</div>
              <div className="text-[13px] mt-2 leading-relaxed" style={{ color: SUB }}>{helpFor.helpText || "暂无说明。"}</div>
              <button
                onClick={() => setHelpFor(null)}
                className="mt-4 w-full h-10 rounded-full text-[14px] font-semibold text-white"
                style={{ background: PAISLEY }}
              >
                知道了
              </button>
            </div>
          </div>
        )}

        {/* Reset confirm */}
        {confirmReset && (
          <div className="fixed inset-0 z-40 flex items-center justify-center px-8" style={{ background: "rgba(11,37,69,0.32)" }} onClick={() => setConfirmReset(false)}>
            <div className="w-full max-w-[320px] bg-white rounded-2xl p-5" onClick={(e) => e.stopPropagation()}>
              <div className="text-[16px] font-semibold" style={{ color: NAVY }}>重置后台参数？</div>
              <div className="text-[13px] mt-2" style={{ color: SUB }}>这会把所有前端参数恢复为默认值。</div>
              <div className="mt-4 flex gap-3">
                <button onClick={() => setConfirmReset(false)} className="flex-1 h-10 rounded-full text-[14px] font-semibold" style={{ background: SOFT_BG, color: SUB }}>取消</button>
                <button onClick={resetAll} className="flex-1 h-10 rounded-full text-[14px] font-semibold text-white" style={{ background: "#D9534F" }}>重置</button>
              </div>
            </div>
          </div>
        )}

        {/* Editor bottom sheet */}
        {editing && (
          <>
            <div className="fixed inset-0 z-40" style={{ background: "rgba(11,37,69,0.24)" }} onClick={closeEditor} />
            <div className="fixed left-1/2 -translate-x-1/2 bottom-0 z-50 w-full max-w-[420px] bg-white" style={{ borderTopLeftRadius: 22, borderTopRightRadius: 22, boxShadow: "0 -9px 22px rgba(11,37,69,0.12)" }}>
              <div className="px-5 pt-2 pb-[max(18px,env(safe-area-inset-bottom))]">
                <div className="mx-auto w-10 h-1 rounded-full bg-[#E4EAF3]" />
                <div className="text-[16px] font-semibold mt-3" style={{ color: NAVY }}>{editing.label}</div>
                <div className="text-[11px] mt-1 break-all" style={{ color: MUTED }}>{editing.path}</div>
                <div className="text-[11px] mt-0.5" style={{ color: MUTED }}>默认：{editing.defaultText}</div>

                <div className="mt-4">
                  {editing.options && editing.options.length > 0 ? (
                    <div className="flex flex-col gap-2 max-h-[40vh] overflow-y-auto">
                      {editing.options.map((opt) => {
                        const active = editValue === opt.value;
                        return (
                          <button
                            key={opt.value}
                            onClick={() => setEditValue(opt.value)}
                            className="flex items-center justify-between px-4 py-3 rounded-xl text-[14px]"
                            style={{
                              background: active ? ACTIVE_BG : SOFT_BG,
                              color: active ? PAISLEY : NAVY,
                              fontWeight: active ? 700 : 500,
                            }}
                          >
                            <span>{opt.label}</span>
                            <span className="text-[12px]" style={{ color: active ? PAISLEY : MUTED }}>{opt.value}</span>
                          </button>
                        );
                      })}
                    </div>
                  ) : editing.type === "boolean" ? (
                    <button
                      onClick={() => setEditValue(editValue === "true" ? "false" : "true")}
                      className="w-full flex items-center justify-between px-4 py-3 rounded-xl"
                      style={{ background: SOFT_BG }}
                    >
                      <span className="text-[14px] font-semibold" style={{ color: NAVY }}>{editValue === "true" ? "开启" : "关闭"}</span>
                      <span
                        className="relative inline-block w-[44px] h-[24px] rounded-full transition-colors"
                        style={{ background: editValue === "true" ? PAISLEY : "#CBD5E1" }}
                      >
                        <span
                          className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all"
                          style={{ left: editValue === "true" ? 22 : 2 }}
                        />
                      </span>
                    </button>
                  ) : (
                    <input
                      autoFocus
                      inputMode={editing.type === "number" ? "decimal" : "text"}
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl text-[15px] outline-none"
                      style={{ background: SOFT_BG, color: NAVY }}
                    />
                  )}
                </div>

                <div className="mt-5 flex gap-3">
                  <button onClick={closeEditor} className="flex-1 h-11 rounded-full text-[14px] font-semibold" style={{ background: SOFT_BG, color: SUB }}>取消</button>
                  <button onClick={saveEditor} className="flex-1 h-11 rounded-full text-[14px] font-semibold text-white" style={{ background: `linear-gradient(180deg, #0877FF 0%, ${PAISLEY} 100%)` }}>保存</button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </PhoneFrame>
  );
}
