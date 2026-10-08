<template>
  <div class="about">
    <!-- 白底标题换积木蓝（has-text-link）：青 #00d1b2 在白底仅 2.0:1，蓝 5.6:1 过 AA，与导航激活色/CTA 同语言 -->
    <h1 class="title has-text-link">grr</h1>
    <p>A Vue 3 learning project — a tiny Trello clone: drag & drop, no backend, reset on refresh.</p>
    <p>Why "grr"? It's George's dinosaur roar from Peppa Pig — this board is the dinosaur's playtable.</p>
    <p>
      Source on
      <a href="https://github.com/zhangjinglearning/grr">GitHub</a> ·
      live demo at <a href="https://grr.onrender.com">grr.onrender.com</a>
    </p>
    <!-- 读完故事送回桌面：Exit CTA，积木蓝实心与 Dialog Submit 同语言 -->
    <p class="mt-4">
      <router-link to="/grr" class="button is-link">back to the table</router-link>
    </p>
  </div>
</template>

<style lang="scss" scoped>
  .about {
    // 阅读宽 70ch 封顶（65–75ch 区间），窄屏复用板桌 clamp 出血 ×2 做安全边，宽屏居中
    width: min(70ch, 100% - 2 * clamp(12px, 6vw, 72px));
    margin-inline: auto;
  }
</style>
