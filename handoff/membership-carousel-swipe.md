# Membership 三卡「左右滑动 + 吸附居中」交接文档（给 Codex）

目标：小程序里实现 3 张会员卡横向滑动，松手后**自动吸附到某一张卡并居中**，还能用代码把某一张卡滚到中间（点击“升级”跳下一张）。

⚠️ 只做 UI/交互，不要改任何 service / 数据逻辑。

---

## 1. Web 端现有实现（参考，勿直接搬）

关键点只有 4 个：
1. 外层滚动容器：`overflow-x-auto` + CSS `scroll-snap-type: x mandatory`
2. 每张卡：`scroll-snap-align: center`、`scroll-snap-stop: always`、`width: 100%`、`flex-shrink: 0`
3. 容器左右各 14px padding + `scroll-padding-left/right: 14px`（让首尾卡也能居中）
4. 代码控制居中：`el.scrollTo({ left: card.offsetLeft - (el.clientWidth - card.clientWidth)/2, behavior:"smooth" })`
   打开面板后延迟 30ms 调用 `scrollToCard(1)`，默认停在 Premium（第 2 张）。

```tsx
const scrollerRef = useRef<HTMLDivElement>(null);

const scrollToCard = (index: number) => {
  const el = scrollerRef.current;
  if (!el) return;
  const card = el.querySelector<HTMLElement>(`[data-index="${index}"]`);
  if (!card) return;
  el.scrollTo({
    left: card.offsetLeft - (el.clientWidth - card.clientWidth) / 2,
    behavior: "smooth",
  });
};

useEffect(() => {
  if (!open) return;
  const id = window.setTimeout(() => scrollToCard(1), 30); // 默认居中第 2 张
  return () => window.clearTimeout(id);
}, [open]);

<div
  ref={scrollerRef}
  className="flex flex-1 min-h-0 overflow-x-auto snap-x snap-mandatory scroll-hide -mx-5"
  style={{
    WebkitOverflowScrolling: "touch",
    scrollPaddingLeft: 14,
    scrollPaddingRight: 14,
    paddingLeft: 14,
    paddingRight: 14,
    overscrollBehaviorX: "contain",
  }}
>
  {cards.map((card, i) => (
    <div
      key={i}
      data-card
      data-index={i}
      className="snap-center shrink-0 h-full px-1"
      style={{ width: "100%", scrollSnapStop: "always" }}
    >
      {/* 卡片内容 */}
    </div>
  ))}
</div>
```

---

## 2. 小程序推荐做法：**直接用 `swiper`（最傻瓜，不要自己写手势）**

小程序原生 `swiper` 自带滑动 + 吸附，用 `previous-margin` / `next-margin` 做“露出邻卡”的居中效果。
**不要用 `scroll-view` + 自写 touch 计算**，那是坑。

### WXML
```html
<swiper
  class="mb-swiper"
  current="{{current}}"
  previous-margin="14px"
  next-margin="14px"
  circular="{{false}}"
  bindchange="onSwiperChange"
>
  <swiper-item wx:for="{{cards}}" wx:key="title" class="mb-item">
    <view class="mb-card">
      <view class="mb-title">{{item.title}}</view>
      <view class="mb-row">
        <text class="mb-sub">{{item.subtitle}}</text>
        <text class="mb-tags">{{item.tags}}</text>
      </view>
      <view class="mb-divider"></view>

      <view class="mb-price">
        <text class="mb-yen">¥</text>
        <text class="mb-num">{{cycle === 'month' ? item.price : item.yearlyPrice}}</text>
        <text class="mb-per">/月</text>
        <text wx:if="{{cycle === 'year'}}" class="mb-old">¥{{item.original}}</text>
        <text class="mb-billing">{{cycle === 'month' ? '按月计费' : '按年计费 ¥' + item.yearly}}</text>
      </view>

      <scroll-view scroll-y class="mb-benefits">
        <view class="mb-benefit" wx:for="{{item.benefits}}" wx:for-item="b" wx:key="*this">
          <image class="mb-check" src="/assets/icons/check.png" />
          <text class="mb-benefit-text">{{b}}</text>
        </view>
      </scroll-view>

      <!-- CTA：非最后一张时右侧带“升级”，点了滑到下一张 -->
      <view class="mb-cta">
        <view class="mb-btn" bindtap="onSubscribe" data-index="{{index}}">
          <text class="mb-btn-text">订阅</text>
          <view wx:if="{{index < cards.length - 1}}" class="mb-up" catchtap="goNext" data-index="{{index}}">
            升级 ↗
          </view>
        </view>
      </view>
    </view>
  </swiper-item>
</swiper>
```

### JS（全部逻辑就这几行）
```js
Page({
  data: {
    current: 1,          // 默认居中第 2 张 Premium
    cycle: 'month',
    cards: [/* Basic / Premium / Premium Plus，字段同 web */],
  },

  onSwiperChange(e) {
    this.setData({ current: e.detail.current });
  },

  // 代码控制“滚到第 N 张并居中”——swiper 只要改 current 就自动吸附
  scrollToCard(index) {
    const max = this.data.cards.length - 1;
    this.setData({ current: Math.max(0, Math.min(max, index)) });
  },

  goNext(e) {
    this.scrollToCard(Number(e.currentTarget.dataset.index) + 1);
  },

  onSubscribe(e) {
    // 接现有支付/订阅 service，不要在这里写业务逻辑
  },
});
```

### WXSS
```css
/* swiper 必须给固定高度，否则不显示 */
.mb-swiper { height: 470px; }

/* 让卡片之间有间距：item 自身留 padding，卡片撑满 */
.mb-item { box-sizing: border-box; padding: 0 4px; height: 100%; }

.mb-card {
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border-radius: 28px;
  background: #fff;
  border: 1.5px solid #e6edf9;              /* paisley 10% on white */
  box-shadow: 0 2px 12px rgba(1, 70, 185, 0.06);
}

.mb-title { font-family: Fredoka, "PingFang SC"; font-size: 24px; color: #0146b9; line-height: 1; }
.mb-row { margin-top: 8px; display: flex; align-items: baseline; justify-content: space-between; }
.mb-sub { font-size: 13px; color: rgba(0,0,0,0.55); }
.mb-tags { font-size: 11px; color: rgba(0,0,0,0.55); }   /* "多设备·云储存" */
.mb-divider { margin-top: 12px; height: 1px; background: rgba(0,0,0,0.1); }

.mb-price { margin-top: 12px; display: flex; align-items: baseline; }
.mb-yen { font-size: 18px; font-weight: 300; align-self: flex-start; margin-top: 4px; }
.mb-num { font-family: Fredoka, "PingFang SC"; font-size: 28px; font-weight: 300; }
.mb-per { font-size: 13px; color: rgba(0,0,0,0.55); margin-left: 4px; }
.mb-old { font-size: 13px; color: rgba(0,0,0,0.55); text-decoration: line-through; margin-left: 4px; }
.mb-billing { font-size: 11px; color: rgba(0,0,0,0.55); margin-left: auto; }

.mb-benefits { margin-top: 25px; flex: 1; min-height: 0; }
.mb-benefit { display: flex; align-items: flex-start; margin-bottom: 8px; }
.mb-check { width: 14px; height: 14px; margin-top: 2px; margin-right: 8px; }
.mb-benefit-text { font-size: 11px; line-height: 1.55; color: #000; }

.mb-cta { margin-top: 24px; flex-shrink: 0; }
.mb-btn {
  position: relative; height: 44px; border-radius: 999px; background: #0146b9;
  display: flex; align-items: center; justify-content: center;
}
.mb-btn-text { color: #fff; font-size: 13px; font-weight: 600; }
.mb-up {
  position: absolute; right: 6px; top: 50%; transform: translateY(-50%);
  height: 32px; padding: 0 10px 0 12px; border-radius: 999px;
  background: #fff; color: #0146b9; font-size: 13px;
  display: flex; align-items: center;
}
```

---

## 3. 验收清单

- [ ] 打开会员面板时默认停在 **Premium（第 2 张）** 且居中。
- [ ] 手指左右滑动，松手后**必须**吸附到整张卡，不能停在两卡之间。
- [ ] 左右两侧各露出约 14px 的邻卡边缘。
- [ ] 点“升级”滑到下一张并居中；最后一张没有“升级”。
- [ ] 权益列表超长时卡片内部可纵向滚动，订阅按钮固定在底部不被遮挡。
- [ ] 卡片高度固定（470px），三张卡等高。
- [ ] 订阅按钮点击接现有订阅 service，不新增业务逻辑。

## 4. 常见坑（Codex 注意）

1. `swiper` **不给高度就是空白** —— 必须写 `height`。
2 间距不要写在 `.mb-card` 的 `margin`，要写在 `swiper-item` 的 `padding`，否则吸附位置会偏。
3. 想要“居中露邻卡”只用 `previous-margin` + `next-margin`，别去改 `item-width`。
4. “升级”按钮在“订阅”按钮内部，必须用 `catchtap` 阻止冒泡，否则会同时触发订阅。
5. 不要用 `scroll-view` 自己算 scrollLeft 做吸附 —— 安卓 WebView 上会抖。
