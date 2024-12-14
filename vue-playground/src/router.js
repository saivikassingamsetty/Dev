import { createRouter, createMemoryHistory } from "vue-router";
import Home from "./views/Home.vue";
import About from "./views/About.vue";
import Users from "./views/Users.vue";
import UserProfile from "./views/UserProfile.vue";
import UserPosts from "./views/UserPosts.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/about", component: About },

  // Dynamic route matching and nested routes
  {
    path: "/users/:id",
    component: Users,
    children: [
      {
        // UserProfile will be rendered inside User's <router-view>
        // when /user/:id/profile is matched
        path: "profile",
        //named routes has lot of advantages, no more regex typos and harcoding URLS
        name: "profile",
        component: UserProfile,
      },
      {
        // UserPosts will be rendered inside User's <router-view>
        // when /user/:id/posts is matched
        path: "posts",
        name: "posts",
        component: UserPosts,
      },
    ],
  },

  // route matching syntax
  //it matches with /products/2 /products/2/3 /products/2/3/4
  { path: "/products/:productId(//d+)+", component: Home },
  //it matches with /products/ /products/shirts /products/books/comics etc..
  { path: "/products/:productName?*", component: Home },
  { path: "/products/:productName?*", component: Home },

  //router options /Products/rings won't be routed
  { path: "/products/:productName?*", component: Home, sensitive: true },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,

  //router-options -- strict with regex, users/2/ and users/2 won't be same
  strict: false,
});

export { router };
