import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const components = {
  Main: () => import("../pages/Main.vue"),
  Drive: () => import("../pages/Drive.vue"),
};
const routes: Array<RouteRecordRaw> = [
  { path: "/", component: components.Main },
  { path: "/drive", component: components.Drive },
];
const router = createRouter({
  history: createWebHistory("/"),
  routes,
});
export default router;
