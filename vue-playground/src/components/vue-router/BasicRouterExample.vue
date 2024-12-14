<template>
  <h1>Click the links to navigate</h1>
  <p>Current Route is {{ route.fullPath }}</p>
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
</script>
