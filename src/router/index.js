import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    // 落地即看板：产品只有一块板，不再经过脚手架 Home 页
    path: "/",
    redirect: "/grr",
  },
  {
    path: "/grr",
    name: "Grr",
    component: () => import("../views/Grr.vue"),
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/About.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
