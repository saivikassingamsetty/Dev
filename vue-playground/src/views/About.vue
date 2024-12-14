<template>
  <h2>Welcome to About</h2>
  <nav>
    <RouterLink to="/users/vikas" style="margin: 10px">Meet Vikas</RouterLink>
    <RouterLink to="/users/sai" style="margin: 10px">Meet Sai</RouterLink>
    <!-- <RouterLink to="/users/sai/profile" style="margin: 10px">Meet Sai profile</RouterLink> -->

    <!-- Named routes -->
    <!-- <RouterLink
      :to="{ name: 'profile', params: { userName: 'kalyani' } }"
      style="margin: 10px"
      >Meet Kalyani</RouterLink
    > -->
  </nav>
  <main>
    <RouterView />
  </main>
  <button @click="addUser('lakshmi')" style="margin: 20px 0">
    Navigate to Lakshmi
  </button>
</template>

<script setup>
import { toValue } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

console.log(toValue(router), toValue(route));

const addUser = (userName) => {
  //makes navigation
  router.push({ name: "profile", params: { id: "lakshmi", userName } });
};
</script>
