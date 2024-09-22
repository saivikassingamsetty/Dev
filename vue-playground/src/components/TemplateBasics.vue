<template>
  <!-- data binding -->
  <button @click="increment">Count is {{ count }}</button>
  <!-- raw HTML -->
  <span v-html="rawHTML"></span>
  <!-- attribute binding -->
  <div :id="dynamicId">I'm Inevitable!</div>
  <!-- JS Expressions -->
  <div>Thanos Count is {{ dynamicId === "thanos" ? count : 0 }}</div>
  <!-- Directives -->
  <p v-if="includePara">Thanos is Right!</p>
  <!-- v-bind -->
  <a :href="thanosLink">Link to thanos</a>
  <!-- v-on -->
  <button @click="snap">Snap!</button>
  <!-- dynamic attributes -->
  <div @[event]="action">Don't click on me!</div>
  <!-- complete directive syntax with modifiers -->
  <form @submit.prevent="onSubmit">...</form>
</template>

<script setup>
import { ref } from "vue";

const count = ref(0);
const increment = () => count.value++;
const rawHTML = "<button>Reset</button>";
const dynamicId = "thanos";
const includePara = true;
const thanosLink = "www.thanos.com";
const snap = () => (count.value = 0);

const event = "click";
const action = () => alert("snap");
</script>

<style>
#thanos {
  color: red;
}
</style>
