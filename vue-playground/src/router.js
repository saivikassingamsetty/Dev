import { createRouter, createMemoryHistory } from "vue-router";
import Home from "./views/Home.vue";
import About from "./views/About.vue";
import Users from "./views/Users.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/about", component: About },
  { path: "/users/:id", component: Users },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

export { router };
