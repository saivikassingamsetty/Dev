<template>
  <h2>Hi, I'm {{ route.params.id }}</h2>
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
