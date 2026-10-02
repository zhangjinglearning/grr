# 升级到 Vue 3 + Vite：重建工具链，router 停在 v4，拖拽库换 vue3-smooth-dnd，npm 终结双 lockfile

2026-10 从 Vue 2.6 / vue-cli 4 / vuex 3 升级到 Vue 3.5 + Vite 8 + Pinia（Node 26）。选重建而非原地改造：仓库约 500 行，vue-cli / babel / node-sass 残留原地清不干净，package.json 从零写反而快且干净。

## Considered Options

- **vue-router 4.6.4 而非 latest v5.3.1**：v5 的 peerDependencies 拖入 vite / pinia / @pinia/colada（数据加载全家桶），对 3 条 hash 路由零增益；v4 的 peer 仅 `vue@^3.5.0`。将来升 v5 前先评估是否真要 Colada。
- **vue3-smooth-dnd（社区 fork，g1lg1l 维护）而非留守 vue-smooth-dnd**：原库 2022-05 停更且仅支持 Vue 2；fork 2026 年活跃维护，`Container`/`Draggable`/`@drop`/`@drag-start`/`group-name`/`lock-axis`/`orientation` 与原 API 同形，迁移近零成本。vuedraggable@next（SortableJS）被否——API 不同形，等于为迁移重写拖拽层。
- **npm 而非 yarn**：仓库曾双 lockfile 并存（yarn.lock 较新），重建时选 npm 终结漂移风险，且开发机本就 npm 就绪、无 yarn。

## Consequences

- Bulma 0.9 / FontAwesome 5 刻意保留旧版（框架无关 CSS，升级无收益；Bulma 1.x 有类名 breaking）。
- `.sync` 修饰符（Vue 3 已移除）改为 `v-model:flag`；vuex 的 mutations 层随 Pinia 消失，action 直接改 state。
