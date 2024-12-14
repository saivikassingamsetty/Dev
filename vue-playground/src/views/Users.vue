<template>
  <h2>Hi, I'm {{ route.params.id || route.params.userName }}</h2>
  <RouterLink
    :to="{
      name: 'profile',
      params: { userName: route.params.id || route.params.userName },
    }"
    style="margin: 10px"
    >Profile</RouterLink
  >
  <!-- <RouterLink to="/users/sai/profile" style="margin: 10px"
    >Meet Sai profile</RouterLink
  > -->
  <RouterLink
    :to="{
      name: 'posts',
      params: { userName: route.params.id || route.params.userName },
    }"
    style="margin: 10px"
    >Posts</RouterLink
  >
  <RouterView />
</template>

<script setup>
import { watch, ref } from "vue";
import { useRouter, useRoute, onBeforeRouteUpdate } from "vue-router";

const router = useRouter();
const route = useRoute();
const userData = ref({});

watch(
  () => route.params.id,
  (newId, oldId) => {
    console.log(oldId);
  }
);

onBeforeRouteUpdate((to, from) => {
  userData.value = to.params.id;
  console.log("userdata fetched", userData.value);
});
</script>
