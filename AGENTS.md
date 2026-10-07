# grr — Vue 3 Trello 克隆

纯前端看板应用（Trello clone）。无后端、无测试框架，数据仅存于 Pinia 内存，刷新即丢。线上 demo 部署在 Render（grr.onrender.com）。

2026-10 从 Vue 2 / vue-cli / vuex 升级而来，工具链重建，关键取舍见 `docs/adr/0001-vue3-vite-pinia-rebuild.md`。

## 命令（包管理用 npm；Node ≥ 22.12，本机用 26）

- `npm run dev` — Vite dev server
- `npm run build` — 生产构建
- `npm run preview` — 预览构建产物
- `npm run lint` — ESLint 10 flat config + eslint-plugin-vue + prettier（配置在 eslint.config.js）
- 没有任何测试命令

## 架构

- 技术栈：Vue 3.5（Options API，无需改写 Composition API）+ Pinia 4 + Vue Router 4（`createWebHashHistory`）+ Vite 8 + Bulma 0.9 + FontAwesome 5（main.js 全局引入）+ vue3-smooth-dnd（拖拽，API 与旧 vue-smooth-dnd 同形）
- `src/store/modules/grr.js` — Pinia `defineStore("grr")`，唯一业务状态。state 含硬编码初始看板与 `pendingTask` 拖拽中间态；无 mutations 层，action 直接改 state
- 拖拽统一转发：组件把 smooth-dnd 的 `@drop` 原样转发给 `dropColumn({ removedIndex, addedIndex })` / `dropTask({ columnIdx, removedIndex, addedIndex })`。跨列移动时源列与目标列各收到一次 half-event（onDrop 由所有相关容器分别触发，到达顺序不保证），store 用 `pendingTask` 聚合两半、凑齐才提交；`@drag-start` → `beginTaskDrag` 在每次拖拽开始时重置 pending，排除幽灵移动
- 组件层级：`src/views/Grr.vue` → `src/components/grr/Board.vue` → `Column.vue` → `Task.vue`；`Dialog.vue` 用 `v-model:flag` 开关，负责编辑/新增任务
- 子组件向父组件发事件统一以 `emit` 开头（`emitTaskDialogShow`、`emitTaskUpdate` 等），各组件已声明 `emits`，新增事件保持该约定
- `@` alias 指向 `src/`（vite.config.js）

## 设计文档

- 根级 `PRODUCT.md` — 产品定位（学习/演示项目，刻意极简，无持久化）
- 根级 `DESIGN.md` — 设计系统「恐龙的游戏桌」：命名色板（brick-blue、bubblegum-teal 等）、字体、组件规则。**改样式前先查这里的 Named Rules**，保持高饱和撞色方向，不要随手改成低饱和配色

## 已知坑

- vue-router 停在 v4（4.6.4），**不要顺手升 v5**——v5 peer 拖 @pinia/colada 等数据加载全家桶，见 ADR-0001
- vue3-smooth-dnd 是社区 fork（g1lg1l 维护）；原 smooth-dnd / vue-smooth-dnd 已停更且仅支持 Vue 2
- Bulma 0.9 / FontAwesome 5 是刻意保留的旧版（框架无关 CSS，升级无收益）；升 Bulma 1.x 有类名 breaking
- `bin/vite` 是 Vue 2 时代的遗留脚本（引用已卸载的 vue-cli-plugin-vite），已死代码，勿当作 Vite 入口
- `vite.config.js` 的 sass/scss 双 `silenceDeprecations` 与 `chunkSizeWarningLimit: 1500` 是刻意配置（压 Bulma 0.9 旧 Sass 的弃用警告、放宽 FontAwesome 全量引入的大 chunk 警告），勿当冗余清理
- 提交信息为中文口语化短句（风格见 git log）

## Agent skills

### Issue tracker

Issues 跟踪在本仓库的 GitHub Issues（zhangjinglearning/grr），经用户确认在此仓库内使用 gh CLI。见 `docs/agents/issue-tracker.md`。

### Triage labels

使用默认五角色标签：needs-triage / needs-info / ready-for-agent / ready-for-human / wontfix。见 `docs/agents/triage-labels.md`。

### Domain docs

单上下文布局：根级 `CONTEXT.md` + `docs/adr/`。见 `docs/agents/domain.md`。注意 `CONTEXT.md` 尚未创建（由 /domain-modeling 懒生成），缺失时按该文档约定静默继续，勿主动建议创建。
