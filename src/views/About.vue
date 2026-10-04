<template>
  <div class="about">
    <h1 class="title has-text-primary">grr</h1>
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
