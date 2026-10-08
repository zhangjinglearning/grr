<template>
  <div>
    <div id="nav">
      <router-link to="/grr">grr</router-link> | <router-link to="/about">about</router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  #nav {
    padding: 30px;

    a {
      font-weight: bold;
      color: #2c3e50;

      &.router-link-exact-active {
        // 激活态用积木蓝（品牌主色，白底约 5.6:1 过 AA），芽绿历史层退役
        color: #485fc7;
      }
    }
  }

  // 窄屏：收紧导航占位，并把链接撑到可触控的高度
  @media screen and (max-width: 768px) {
    #nav {
      padding: 20px 12px;

      a {
        display: inline-block;
        padding: 8px 4px;
      }
    }
  }

  // Bulma 对 delete 家族 outline:none 且无 focus-visible 补偿，Tab 焦点会隐形；
  // 墨黑环在黄卡（14:1）与青列头（6:1）上都成立
  .delete:focus-visible,
  .modal-close:focus-visible,
  .delete-confirm:focus-visible {
    outline: 2px solid #0a0a0a;
    outline-offset: 2px;
  }

  // 空输入回车的瞬时反馈（shake + danger 红边），替代静默无反应；
  // danger 是状态色不是第六块积木（一卡一色规则不破）。
  // 红边此前是死代码：本文件在 main.js 里先于 bulma 注入，(0,1,0) 永远输给
  // Bulma .input:focus (0,2,0)——flash 只在回车瞬间出现（必为聚焦态），
  // 叠满 .input.input-empty-flash:focus (0,3,0) 才压得过；光晕同步换
  // danger 色调（Bulma is-danger:focus 同构），避免红边配蓝晕的自相矛盾
  .input-empty-flash {
    animation: empty-shake 0.3s ease;

    &.input:focus {
      border-color: #f14668;
      box-shadow: 0 0 0 0.125em rgba(241, 70, 104, 0.25);
    }
  }

  // Bulma 默认 placeholder rgba(54,54,54,.3) 混白仅 1.76:1——add task / add column
  // 的功能说明全由 placeholder 承载且聚焦即消失，低视力下第一眼读不出用途；
  // 提到 0.7（混白 #727272，4.81:1 过 AA），仍是石墨同色相的 Neutral 层，
  // 不破一卡一色。#app 前缀（ID 特异性）压过 Bulma 全部厂商前缀变体
  #app .input::placeholder,
  #app .textarea::placeholder {
    color: rgba(54, 54, 54, 0.7);
  }

  // 删除确认条 300ms 连击护栏拒绝时的轻反馈：同款 shake 一瞬（不带红边——
  // 是"太快了"不是"错误"），键盘焦点正落在确认条上，shake 即可传达
  .confirm-guard-flash {
    animation: empty-shake 0.3s ease;
  }

  @keyframes empty-shake {
    0%,
    100% {
      transform: translateX(0);
    }

    25% {
      transform: translateX(-4px);
    }

    75% {
      transform: translateX(4px);
    }
  }
</style>
