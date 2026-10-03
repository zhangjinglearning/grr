---
name: grr
description: 恐龙的游戏桌——高饱和积木色块拼出的极简看板
colors:
  brick-blue: "#485fc7"
  bubblegum-teal: "#00d1b2"
  dino-green: "#48c78e"
  cream-yellow: "#ffe08a"
  playtable-graphite: "#363636"
  ink-black: "#0a0a0a"
  slate-text: "#2c3e50"
  paper-white: "#ffffff"
  input-border: "#dbdbdb"
typography:
  board-title:
    fontFamily: "Avenir, Helvetica, Arial, sans-serif"
    fontSize: "2rem"
    fontWeight: 600
    lineHeight: 1.125
  body:
    fontFamily: "Avenir, Helvetica, Arial, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
  task-label:
    fontFamily: "Avenir, Helvetica, Arial, sans-serif"
    fontSize: "1rem"
    fontWeight: 700
  column-header:
    fontFamily: "Avenir, Helvetica, Arial, sans-serif"
    fontSize: "1rem"
    fontWeight: 700
rounded:
  sm: "2px"
  md: "4px"
  lg: "6px"
  pill: "9999px"
spacing:
  task-gap: "10px"
  board-inset: "clamp(12px, 6vw, 72px)"
  nav-padding: "30px"
  card-content: "1.5rem"
components:
  column-card:
    backgroundColor: "{colors.brick-blue}"
    rounded: "{rounded.md}"
  column-header:
    backgroundColor: "{colors.bubblegum-teal}"
    textColor: "{colors.playtable-graphite}"
    typography: "{typography.column-header}"
    padding: "0.75rem 1rem"
  task-tile:
    backgroundColor: "{colors.cream-yellow}"
    rounded: "{rounded.md}"
    padding: "1.25rem 2.5rem 1.25rem 1.5rem"
  task-label-button:
    backgroundColor: "{colors.playtable-graphite}"
    textColor: "{colors.paper-white}"
    typography: "{typography.task-label}"
    rounded: "{rounded.md}"
  task-delete-button:
    backgroundColor: "{colors.ink-black}"
    textColor: "{colors.paper-white}"
    rounded: "{rounded.pill}"
    size: "32px"
  submit-button:
    backgroundColor: "{colors.brick-blue}"
    textColor: "{colors.paper-white}"
    rounded: "{rounded.md}"
  cancel-button:
    backgroundColor: "{colors.paper-white}"
    textColor: "{colors.brick-blue}"
    rounded: "{rounded.md}"
  text-input:
    backgroundColor: "{colors.paper-white}"
    textColor: "{colors.slate-text}"
    rounded: "{rounded.md}"
    height: "2.5em"
  board-shell:
    backgroundColor: "{colors.playtable-graphite}"
    rounded: "{rounded.lg}"
    padding: "1.25rem"
---

# Design System: grr

## Overview

**Creative North Star: "恐龙的游戏桌"**

一张深色的桌子，上面摆着高饱和的积木：积木蓝的列、泡泡糖青的列头、奶油黄的任务卡，全部直接怼在一起，不加修饰。这套视觉系统的性格是**稚拙直给**——像小孩把玩具拍在桌面上，快乐压倒精致；它诚实地暴露自己"组件库语义色直接拼装"的出身，并把这种直给当作态度。名字 grr 来自小乔治的恐龙吼，桌上的每一块颜色都是这只恐龙的玩具。

深度靠色块不靠阴影：奶油黄浮在积木蓝上，积木蓝浮在石墨桌面上，饱和度差就是层级。组件手感是**果冻积木 tactile**——按钮饱满可按、列头可抓（cursor:grab）、任务卡整块可点可拖，"拿起/放下"的触觉隐喻贯穿全部交互。

**Key Characteristics:**

- 高饱和原色块直接拼装，无渐变、无玻璃拟态、无精致修饰
- 一卡一色：每个饱和色恰好属于一个结构角色
- 深度 = 色块叠色块，阴影只是框架顺带输出
- 粗细即层级：700 标签 / 600 标题 / 400 正文
- 拖拽手感是核心：列头是抓取手柄，任务卡整块可拖

## Colors

调色板是一盒没拆散的积木：五种高饱和角色色 + 一层石墨系中性色，全部来自 Bulma 0.9 语义默认值，一个都没调过。

### Primary

- **积木蓝** (#485fc7)：列卡容器背景，界面最大面积的承载色。任务、输入框、按钮都活在这个蓝底上。

### Secondary

- **泡泡糖青** (#00d1b2)：列头背景与看板标题文字，结构的强调色。
- **恐龙绿** (#48c78e)：列头右侧的状态图标块（纯装饰），最小面积的点缀色。

### Tertiary

- **奶油黄** (#ffe08a)：任务卡背景——内容层的信号色。当一块颜色变黄，它就是"可以被拿起来的东西"。

### Neutral

- **石墨桌布** (#363636)：看板外框背景与任务标签按钮底色，整张桌子的底座。
- **墨黑** (#0a0a0a)：delete 圆钮，以及 Bulma 阴影的基色。
- **页岩灰** (#2c3e50)：全局正文文字色（App.vue 覆盖 Bulma 默认），也是导航文字色。
- **纸白** (#ffffff)：输入框、Dialog 面板、按钮文字。
- **输入框边灰** (#dbdbdb)：输入框与描边控件的 1px 边框。

### Named Rules

**一卡一色规则。** 每个饱和色恰好属于一个结构角色：蓝=列容器、青=列头、绿=图标钮、黄=任务内容、石墨=桌面。新增元素要么复用既有角色色，要么进 Neutral 层——不添加第六种积木色。

## Typography

**Display Font:** 无独立 display 字体（Avenir 栈通吃）
**Body Font:** Avenir, Helvetica, Arial, sans-serif（App.vue 覆盖 Bulma 默认系统栈）
**Label/Mono Font:** 无

**Character:** 一张无个性的系统面孔——这正是直给的一部分。字体不表达情绪，粗细才是唯一的层级信号。

### Hierarchy

- **Title** (600, 2rem, 1.125)：看板名（如 "Workshop"），全站唯一的大字号，泡泡糖青着色。
- **Body** (400, 1rem, 1.5)：任务描述、输入框文本、占位符。
- **Label** (700, 1rem)：任务标签按钮与列头标题——粗体即"可交互"的信号。

### Named Rules

**粗细即层级规则。** 700=可交互标签，600=页面标题，400=正文。不用斜体、不用字距、不新增字号档位。

## Layout

石墨桌面（深色 box，左右 clamp(12px, 6vw, 72px) 流式出血——桌面 72px，窄屏收窄）承托一条横向列轨：Bulma 12 列栅格、每列 is-3（25% 宽，3 列 + add column 输入框恰好铺满一排），由平滑拖拽容器横向排布。列内任务纵向堆叠，间距 10px；每列尾部固定一个新增输入框。顶部导航 30px padding，占位极小。整体密度宽松，色块靠自身色彩区分彼此，不依赖留白节奏。窄屏（≤768px）时列轨转为纵向全宽堆叠（自定义媒体查询：Bulma 的 is-3 栅格仅 ≥769px 生效，裸 flex 会横向溢出），列拖拽方向随之切为纵向（vertical/lock y），触屏指针下 delete 圆钮放大到 44px 触控目标。

## Elevation & Depth

**色块即层级。** 饱和度差承担全部深度语义：奶油黄任务浮在积木蓝列上，积木蓝列浮在石墨桌面上，纸白输入框沉在蓝底里。Bulma 附带的浅阴影（`0 0.5em 1em -0.125em rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.02)`，用于 box 与 card）和列头底部分割阴影（`0 0.125em 0.25em rgba(10,10,10,.1)`）是框架的顺带输出，不是设计语言——没有人会注意到它们，也不需要。

### Named Rules

**色块即层级规则。** 想制造层级，换色块，不调阴影。阴影永远只保持 Bulma 默认值。

## Shapes

全系统小圆角：输入框、按钮、任务卡 4px；box 外框 6px；2px 备用未启用。delete 圆钮是唯一的完整圆（9999px）。块面以纯色矩形为主，仅有的细线是输入框 1px 边框与列尾分割线。没有大圆角、没有裁切、没有异形——积木是方的。

## Components

组件哲学一句话：**果冻积木 tactile**——实心色块、饱满可按、能抓取。

### Buttons

- **Shape:** 小圆角（4px），实心色块，无渐变无花描边
- **任务标签按钮:** 石墨底 (#363636) + 白字 700 粗体；它本身就是任务文本的载体，点击打开编辑弹窗
- **Submit:** 积木蓝底白字（Dialog 内确认）
- **Cancel:** 白底积木蓝字（is-light 变体）
- **Delete:** 墨黑完整圆钮，伪元素画 ×——任务卡 32px、列头 24px；两段式确认（sure? / delete column? 覆层，3 秒未确认自动回退）
- **Hover / Focus:** Bulma 默认——底色轻微加深；focus ring `0 0 0 0.125em rgba(72,95,199,.25)`

### 任务卡 Task Tile（signature）

奶油黄 notification 平铺块，4px 圆角，padding `1.25rem 2.5rem 1.25rem 1.5rem`（右侧让位给绝对定位的 delete 钮）。内部纵向堆叠：标签按钮在上（单行省略 overflow ellipsis）、描述在下（最多两行 line-clamp，长文卡自然更高）。它是展示也是交互——整块可点、可拖、可删。

### 列卡 Column Card（signature）

积木蓝 card，4px 圆角，三段式：泡泡糖青列头（石墨深字 #363636——Bulma 背景类不改文字色，card-header-title 保持默认深字；bold，cursor:grab——拖动整列就抓这里，标题左侧 grip 图标标出抓取点，触屏上它是唯一 affordance）、透明内容区（1.5rem padding，任务在此堆叠）、列尾新增输入框。列头右侧恐龙绿状态图标（inbox / spinner / check-circle，纯装饰非按钮），最右 24px 墨黑删除圆钮（两段式确认删列）。

### Inputs / Fields

- **Style:** 纸白底、1px #dbdbdb 边框、4px 圆角、Bulma 内阴影（`inset 0 1px 2px rgba(10,10,10,.1)`）
- **Focus:** 边框转积木蓝 + `0 0 0 0.125em rgba(72,95,199,.25)` 光晕
- **提交方式:** 回车即提交（add task / add column），无提交按钮

### Dialog

半透明墨黑遮罩（rgba(10,10,10,.86)）压住全屏，纸白 box（6px 圆角、浅阴影）居中。字段纵向排列（Task / Description），粗体标签；底部按钮对居中（积木蓝 Submit + 白底 Cancel）。

### Navigation

粗体链接（grr | about），页岩灰文字色，激活态积木蓝 #485fc7（复用主角色色，白底约 5.6:1 过 AA）。`/` 落地即重定向到看板，不再有独立 Home 页。

## Do's and Don'ts

### Do:

- **Do** 保持一卡一色——层级问题先用饱和色块回答
- **Do** 保持列头 cursor:grab，拖拽手感是产品核心
- **Do** 任务标签单行省略、描述两行封顶（line-clamp），保持色块紧凑
- **Do** 用字重做层级：700 标签 / 600 标题 / 400 正文

### Don't:

- **Don't** 企业感——不要灰蓝 dashboard、中性化色板、正式 SaaS 视觉；这张桌子是玩具桌
- **Don't** 添加第六种积木色；新颜色先进 Neutral 层评估
- **Don't** 用阴影制造层级；阴影永远保持 Bulma 默认
- **Don't** 精致修饰——细字重、渐变、玻璃拟态都与稚拙直给的性格相反
