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
  // danger 是状态色不是第六块积木（一卡一色规则不破）
  .input-empty-flash {
    animation: empty-shake 0.3s ease;
    border-color: #f14668;
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
