# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- 项目作者本人（zhangjinglearning）：以 grr 作为 Vue 3 现代工具链的学习与练手载体
- 访客：通过仓库了解项目的人（线上 demo 停机中，重开后恢复此入口）

## Product Purpose

grr 是一个 Vue 3 版 Trello 克隆看板应用，定位是学习/演示项目：既是作者练习 Vue 3 + Vite + Pinia 工具链的载体，也是对外展示的线上 demo。成功 = 技术练习价值与演示效果，不为真实生产力使用服务。

## Positioning

刻意极简的单看板演示：无账号、无安装、打开即用，刷新即重置。不做多人协作、不做持久化，与真实 Trello 不构成竞争——它展示的是"最小可用看板交互"本身。

## Operating Context

- 本地 `npm run dev` 启动 Vite dev server 是主入口；线上 demo grr.onrender.com（Render 部署）2026-10 起已停机（实测 503），地址保留、可随时重开
- 单页应用，hash 路由：`/`（Home）、`/grr`（看板主界面）、`/about`
- 全部操作围绕一块硬编码初始看板（Workshop）：拖拽任务/列、增删改任务、新增列

## Capabilities and Constraints

- 功能范围（用户确认保持极简）：单看板、三列（todo/doing/done）、任务增删改（Dialog 弹窗）、列内与跨列拖拽、列排序、新增列
- 数据仅存 Pinia 内存，刷新即丢——刻意设计，不是待修缺陷（用户确认）
- 无后端、无持久化、无账号体系、无测试框架
- 技术栈与升级取舍见仓库 `AGENTS.md` 与 `docs/adr/0001-vue3-vite-pinia-rebuild.md`（如 vue-router 停在 v4 是刻意决定）

## Brand Commitments

- 名字 grr：来自 Peppa Pig 中 George 的口头禅 "grr~"（README 记载其命名缘由），名字本身是产品身份的一部分
- 线上 demo 地址 grr.onrender.com（当前停机，地址保留）

## Evidence on Hand

- 仓库 README 的命名说明与 demo 链接
- 无真实用户、评价、使用数据可引用；未来工作不得虚构这些

## Product Principles

1. 极简即范围：单看板 + 三列 + 拖拽就是全部，功能不再生长
2. 即开即用：零门槛打开就能玩，刷新重置是被接受的产品行为
3. 学习载体优先：一切决策服务于 Vue 3 工具链练习与演示效果，而非生产力功能
4. 纯前端边界：无后端、无持久化是刻意约束，不作为缺陷修复
