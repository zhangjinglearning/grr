<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">🏠 Home</router-link> | <router-link to="/grr">Grr(Trello clone)</router-link> |
      <router-link to="/about">About</router-link>
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
        // Vue 芽绿压暗到白底 AA（原 #42b983 仅约 2.5:1）
        color: #2a7d58;
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
