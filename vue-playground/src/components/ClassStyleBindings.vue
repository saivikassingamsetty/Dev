<template>
  <!-- HTML Classes -->
  <div :class="{ blueColor: shouldApply, redColor: !shouldApply }">Hi</div>
  <div :class="{ 'green-color': shouldApply, redColor: !shouldApply }">Hi</div>
  <!-- computed -->
  <div :class="divClassList">Hi</div>
  <!-- arrays -->
  <div :class="[divClassList, classList2]">Hi</div>
  <div :class="[shouldApply ? divClassList : '']">Hi</div>
  <div :class="[{ [divClassList]: shouldApply }]">Hi</div>
  <!-- combining with class attribute -->
  <div class="green-color" :class="classList2">Hi</div>
  ------
  <!-- Inline Styles -->
  <div :style="{ color: activeColor, fontSize: activeFontSize + 'px' }">Hi</div>
  <div :style="{ color: shouldApply ? `blue` : `red` }">Hi</div>
  <!-- object -->
  <div :style="styleObject">Hi</div>
  <!-- array -->
  <div :style="[styleObject, styleObject2]">Hi</div>
</template>

<script setup>
import { ref, computed } from "vue";

let shouldApply = ref(true);
const divClassList = computed(() => ({
  "green-color": shouldApply,
  redColor: !shouldApply,
}));

const classList2 = computed(() => ({
  "large-size": shouldApply,
  smallSize: !shouldApply,
}));

const activeColor = ref("green");
const activeFontSize = ref("48");

const styleObject = computed(() => ({
  color: activeColor.value,
  fontSize: activeFontSize.value + "px",
}));

const styleObject2 = computed(() => ({
  "padding-left": "30px",
  "font-weight": "bold",
  color: "red", //overrides
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

.large-size {
  font-size: 48px;
}

.smallSize {
  font-size: small;
}
</style>
