# Membership 三卡滑动吸附 —— 修正版（Codex 直接照抄，勿自由发挥）

Codex 现有代码为什么滑不动 / 吸不住，一共 6 个错，逐条改：

| # | 错误 | 后果 | 改法 |
|---|------|------|------|
| 1 | `skip-hidden-item-layout="{{true}}"` | 配合 previous-margin/next-margin 时，非当前项不参与布局，触摸区域异常，安卓上直接滑不动 | **删除该属性** |
| 2 | 祖先节点上有 `catchtouchmove`（`stopPageMove`）或 `catch:touchstart` | swiper 收不到 touchmove，完全不能滑 | `catchtouchmove` **只允许写在遮罩 mask 上**，swiper 的任何祖先（sheet / content / wrap）都不许写 touch 类 catch |
| 3 | `bindchange` 里 `setData({membershipCurrent})` 无锁 | 与 `current` 双向打架，滑到一半被拉回、看着像"吸不住" | 用 `this._mbLock` 标记：change 里只更新，代码控制时加锁 |
| 4 | 切换 月/年 时整体重建 `membershipCards` | swiper 重挂载，current 被重置回 0，看着像"吸附乱跳" | 重建后把 `current` 原值一起 setData 写回 |
| 5 | `.membership-card-swiper { flex: 0 0 auto; }` + 父级 `overflow:hidden` | 高度算出 0 时 swiper 空白且无法响应手势 | swiper **必须写死 height，且不要 overflow:hidden**（overflow 只写在 `.membership-card` 上） |
| 6 | 权益区用普通 view + `flex:1` | 文案长时把订阅按钮顶出卡片外 | 权益区改 `scroll-view scroll-y`，订阅按钮 `flex:0 0 auto` |

---

## 1. WXML（完整替换）

```html
<!-- 遮罩：只有这里可以写 catchtouchmove -->
<view wx:if="{{membershipOpen}}" class="membership-sheet-mask"
      bindtap="closeMembershipSheet" catchtouchmove="stopPageMove"></view>

<!-- 面板：只能 catchtap，绝对不能写 catchtouchmove / catchtouchstart -->
<view wx:if="{{membershipOpen}}" class="membership-sheet" catchtap="stopTap">
  <view class="membership-sheet-head">
    <view class="membership-sheet-title">Membership</view>
    <view class="membership-sheet-close" bindtap="closeMembershipSheet">
      <image class="membership-sheet-close-icon" src="/assets/lovable/icons/foreground/x.svg" mode="aspectFit" />
    </view>
  </view>

  <view class="membership-content">
    <view class="membership-cycle-shell">
      <view class="membership-cycle-option {{membershipCycle === 'month' ? 'membership-cycle-option-active' : ''}}"
            data-cycle="month" bindtap="setMembershipCycle">
        <text>连续包月</text>
      </view>
      <view class="membership-cycle-option {{membershipCycle === 'year' ? 'membership-cycle-option-active' : ''}}"
            data-cycle="year" bindtap="setMembershipCycle">
        <text>连续包年</text>
        <text class="membership-cycle-save">最高立省 ¥{{membershipMaxSavings}}</text>
      </view>
    </view>

    <!-- 关键：不要 skip-hidden-item-layout；duration 300；circular false -->
    <swiper
      class="membership-card-swiper"
      current="{{membershipCurrent}}"
      previous-margin="14px"
      next-margin="14px"
      circular="{{false}}"
      duration="300"
      easing-function="easeOutCubic"
      bindchange="onMembershipSwiperChange"
      bindanimationfinish="onMembershipSwiperFinish"
    >
      <swiper-item wx:for="{{membershipCards}}" wx:key="id" class="membership-card-wrap">
        <view class="membership-card">
          <view class="membership-card-title">{{item.title}}</view>
          <view class="membership-card-subtitle-row">
            <view class="membership-card-subtitle">{{item.subtitle}}</view>
            <view class="membership-card-features">{{item.featuresText}}</view>
          </view>
          <view class="membership-card-divider"></view>

          <view class="membership-price-row">
            <text class="membership-currency">¥</text>
            <text class="membership-price">{{item.priceDisplay}}</text>
            <text class="membership-unit">/月</text>
            <text wx:if="{{membershipCycle === 'year'}}" class="membership-original">¥{{item.originalDisplay}}</text>
            <text class="membership-billing-note">{{item.billingNote}}</text>
          </view>

          <!-- 权益区：scroll-view，防止顶出按钮 -->
          <scroll-view class="membership-benefits" scroll-y enable-flex>
            <view wx:for="{{item.benefits}}" wx:for-item="benefit" wx:key="*this" class="membership-benefit-row">
              <image class="membership-benefit-check" src="/assets/lovable/icons/foreground/check.svg" mode="aspectFit" />
              <text class="membership-benefit-text">{{benefit}}</text>
            </view>
          </scroll-view>

          <view class="membership-cta" data-index="{{item.index}}" bindtap="onMembershipSubscribeTap">
            <text class="membership-cta-subscribe">订阅</text>
            <view wx:if="{{item.hasNext}}" class="membership-cta-upgrade"
                  data-index="{{item.nextIndex}}" catchtap="scrollMembershipToCard">
              <text>升级</text>
              <image class="membership-cta-upgrade-icon" src="/assets/lovable/icons/white/arrow-up-right.svg" mode="aspectFit" />
            </view>
          </view>
        </view>
      </swiper-item>
    </swiper>
  </view>
</view>
```

> 注意：原代码里的 `.membership-sheet-handle` 已按最新 UI 规范删除（全局上拉菜单不再有灰条）。

---

## 2. JS（只替换这些方法，其余业务逻辑不动）

```js
data: {
  // ...
  membershipOpen: false,
  membershipCycle: 'month',
  membershipCards: buildMembershipSheetCards('month'),
  membershipMaxSavings: getMembershipMaxSavings(),
  membershipCurrent: 1,   // 默认居中第 2 张 Premium
},

openMembershipSheet() {
  this._mbLock = false;
  this.setData({ membershipOpen: true, parentScrollEnabled: false, membershipCurrent: 1 });
},

closeMembershipSheet() {
  this._mbLock = false;
  this.setData({ membershipOpen: false, parentScrollEnabled: true, membershipCurrent: 1 });
},

// 切换计费周期：重建卡片时必须把 current 一起写回，否则 swiper 会跳回第 1 张
setMembershipCycle(e) {
  const cycle = e.currentTarget.dataset.cycle === 'year' ? 'year' : 'month';
  if (cycle === this.data.membershipCycle) return;
  const keep = this.data.membershipCurrent;
  this.setData({
    membershipCycle: cycle,
    membershipCards: buildMembershipSheetCards(cycle),
    membershipCurrent: keep,
  });
},

// 手指滑动引起的变化：直接跟随，不做 early-return 比较
onMembershipSwiperChange(e) {
  if (this._mbLock) return;                  // 代码控制中，忽略中间态
  const current = Number(e.detail.current);
  if (!Number.isFinite(current)) return;
  this.data.membershipCurrent = current;      // 先同步内存值，避免与 current 打架
  this.setData({ membershipCurrent: current });
},

onMembershipSwiperFinish() {
  this._mbLock = false;                       // 动画结束解锁
},

// 代码控制"滚到第 N 张并居中"
scrollToMembershipCard(index) {
  const max = this.data.membershipCards.length - 1;
  const safe = Math.max(0, Math.min(max, Number.isFinite(index) ? index : 1));
  if (safe === this.data.membershipCurrent) return;
  this._mbLock = true;
  this.setData({ membershipCurrent: safe });
},

// "升级"按钮（catchtap，阻止冒泡到订阅）
scrollMembershipToCard(e) {
  this.scrollToMembershipCard(Number(e.currentTarget.dataset.index));
},

onMembershipSubscribeTap(e) {
  // 接现有订阅 service，不要在这里写业务逻辑
},

stopTap() {},
stopPageMove() {},
```

---

## 3. WXSS（只列必须改的几条，其余保留 Codex 原样）

```css
/* 1) swiper 必须固定高度，且不能 overflow:hidden */
.membership-card-swiper {
  width: 100%;
  height: 470px;      /* 三卡等高 */
  flex: 0 0 auto;
  overflow: visible;  /* 不要 hidden */
}

/* 2) 间距只写在 swiper-item 上，卡片本身不要 margin，否则吸附位置偏 */
.membership-card-wrap {
  box-sizing: border-box;
  height: 100%;
  padding: 0 4px;
}

/* 3) 卡片纵向布局：权益区伸缩，按钮固定 */
.membership-card {
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  overflow: hidden;   /* overflow 只写在这里 */
  padding: 40rpx;
  border-radius: 56rpx;
  border: 3rpx solid rgba(1, 70, 185, 0.10);
  background: #FFFFFF;
  box-shadow: 0 4rpx 24rpx rgba(1, 70, 185, 0.06);
}

/* 4) 权益区改 scroll-view */
.membership-benefits {
  flex: 1 1 auto;
  min-height: 0;
  margin-top: 50rpx;   /* = 25px，与 web 端一致 */
  box-sizing: border-box;
}

/* 5) 订阅按钮固定不被压缩 */
.membership-cta {
  flex: 0 0 auto;
  margin-top: 28rpx;
  height: 88rpx;
  position: relative;
  border-radius: 999rpx;
  background: #0146B9;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
}

/* 6) 面板：不要给 swiper 的祖先加 touch-action / catch 事件 */
.membership-content {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  overflow: visible;
}

/* 7) 删掉 .membership-sheet-handle 相关样式（灰条已废弃） */
```

字号规范（勿改）：`按月计费/按年计费 ¥xxx` = 22rpx，与"多设备·云储存"一致。

---

## 4. 自检清单（Codex 必须逐条勾）

- [ ] WXML 里 **除 mask 之外**再无任何 `catchtouchmove` / `catchtouchstart` / `capture-catch:touch*`
- [ ] swiper 上 **没有** `skip-hidden-item-layout`
- [ ] `.membership-card-swiper` 有写死的 `height: 470px`
- [ ] 打开面板默认停在第 2 张 Premium，且左右各露约 14px 邻卡
- [ ] 手指横滑松手后必吸附整张卡，不会停在两卡之间、不会回弹到原卡
- [ ] 切"连续包年"后仍停在当前卡，不跳回第 1 张
- [ ] 点"升级"滑到下一张；最后一张无"升级"，"订阅"文本居中
- [ ] 权益长文案时卡片内部可纵向滚动，订阅按钮不被顶出、不遮挡正文
