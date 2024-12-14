<template>
  <h1>Click the links to navigate</h1>
  <p>Current Route is {{ route.fullPath }}</p>
  <!-- history -->
  <button @click="goBack" style="margin: 20px">Go Back to 3 steps</button>
  <button @click="goForward" style="margin: 20px">Go Forward to 3 steps</button>

  <!-- direct progrmatic navigation -->
  <button @click="goToVikas" style="margin: 20px">Go To Vikas profile</button>

  <!-- replace -->
  <button @click="replaceToLakshmiPosts" style="margin: 20px">
    Go To lakshmi posts
  </button>

  <nav>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/about" style="margin: 10px">About</RouterLink>
  </nav>
  <main>
    <RouterView />
  </main>
</template>

<script setup>
import { toValue } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

console.log(toValue(router), toValue(route));

const goBack = () => router.go(-3);
const goForward = () => router.go(3);
const goToVikas = () => {
  router.push({ name: "profile", params: { id: "vikas", userName: "vikas" } });
};

const replaceToLakshmiPosts = () => {
  router.replace({
    name: "posts",
    params: { id: "lakshmi", userName: "lakshmi" },
  });
};
</script>
