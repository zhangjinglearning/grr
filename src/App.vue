<template>
  <div id="app">
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
</style>
