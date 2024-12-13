<template>
  <h1>Playing with composables</h1>
  <h2>Without Composable</h2>
  Mouse position is at {{ x }} {{ y }}
  <h2>With Composable</h2>
  <MouseTrackingWithComposable />
  <h2>Async</h2>
  <AsyncComponent />
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import MouseTrackingWithComposable from "./MouseTrackingWithComposable.vue";
import AsyncComponent from "./AsyncComponent.vue";

const x = ref(0);
const y = ref(0);

const update = (event) => {
  x.value = event.x;
  y.value = event.y;
};

onMounted(() => window.addEventListener("mousemove", update));
onUnmounted(() => window.removeEventListener("mousemove", update));
</script>
