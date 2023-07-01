import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  { path: "/", name: "Home", component: Home },
  {
    path: "/popup-editor",
    name: "Editor",
    component: () => import("../views/Editor.vue"),
  },
  {
    path: "/popup-templates",
    name: "Templates",
    component: () => import("../views/Templates.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
