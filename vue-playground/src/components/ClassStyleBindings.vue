<template>
  <!-- HTML Classes -->
  <div :class="{ blueColor: shouldApply, redColor: !shouldApply }">Hi</div>
  <div :class="{ 'green-color': shouldApply, redColor: !shouldApply }">Hi</div>
  <!-- computed -->
  <div :class="divClassList">Hi</div>
  ------
  <!-- Inline Styles -->
  <div :style="{ color: shouldApply ? `blue` : `red` }">Hi</div>
</template>

<script setup>
import { ref } from "vue";

let shouldApply = ref(true);
const divClassList = computed(() => ({
  "green-color": shouldApply,
  redColor: !shouldApply,
}));
</script>

<style>
.blueColor {
  color: blue;
}

.redColor {
  color: red;
}

.green-color {
  color: green;
}
</style>
