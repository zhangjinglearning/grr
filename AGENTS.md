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

## 已知坑

- vue-router 停在 v4（4.6.4），**不要顺手升 v5**——v5 peer 拖 @pinia/colada 等数据加载全家桶，见 ADR-0001
- vue3-smooth-dnd 是社区 fork（g1lg1l 维护）；原 smooth-dnd / vue-smooth-dnd 已停更且仅支持 Vue 2
- Bulma 0.9 / FontAwesome 5 是刻意保留的旧版（框架无关 CSS，升级无收益）；升 Bulma 1.x 有类名 breaking
- 提交信息为中文口语化短句（风格见 git log）

## Agent skills

### Issue tracker

Issues 跟踪在本仓库的 GitHub Issues（zhangjinglearning/grr），经用户确认在此仓库内使用 gh CLI。见 `docs/agents/issue-tracker.md`。

### Triage labels

使用默认五角色标签：needs-triage / needs-info / ready-for-agent / ready-for-human / wontfix。见 `docs/agents/triage-labels.md`。

### Domain docs

单上下文布局：根级 `CONTEXT.md` + `docs/adr/`。见 `docs/agents/domain.md`。
