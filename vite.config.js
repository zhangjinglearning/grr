import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      // Bulma 0.9（刻意保留的旧版）的 Sass 源码全是旧语法，dart-sass 1.105
      // 编译时刷 253+ 条弃用警告；项目自身样式无任何 sass 弃用用法，消音无害。
      // bulma.sass 是 .sass 语法、SFC 是 .scss，两个 key 各管一边
      scss: {
        silenceDeprecations: ["import", "global-builtin", "color-functions", "if-function"],
      },
      sass: {
        silenceDeprecations: ["import", "global-builtin", "color-functions", "if-function"],
      },
    },
  },
  build: {
    // FontAwesome 5 全局全量引入是既有决策（见 AGENTS.md），主 chunk ~1.3MB 属预期
    chunkSizeWarningLimit: 1500,
  },
});
