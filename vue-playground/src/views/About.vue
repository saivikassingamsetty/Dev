<template>
  <h2>Welcome to About</h2>
  <nav>
    <RouterLink to="/users/vikas" style="margin: 10px">Meet Vikas</RouterLink>
    <RouterLink to="/users/sai" style="margin: 10px">Meet Sai</RouterLink>
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
