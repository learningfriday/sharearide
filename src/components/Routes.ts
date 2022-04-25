import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const components = {
  Ride: () => import("../pages/Ride.vue"),
  Drive: () => import("../pages/Drive.vue"),
  Login: () => import("../pages/LoginView.vue"),
};
const routes: Array<RouteRecordRaw> = [
  { path: "/", redirect: { name: "login" } },
  { path: "/ride", name: "ride", component: components.Ride },
  { path: "/drive", name: "drive", component: components.Drive },
  { path: "/login", name: "login", component: components.Login },
];
const router = createRouter({
  history: createWebHistory("/"),
  routes,
});
export default router;
