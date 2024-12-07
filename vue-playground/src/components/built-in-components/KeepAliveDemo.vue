<template>
  <input type="radio" name="comps" value="A" v-model="selected" id="a" />
  <label for="a">A</label>
  <input type="radio" name="comps" value="B" v-model="selected" id="b" />
  <label for="b">B</label>
  <br />
  <h2>Default</h2>
  <component :is="selectedComponent"></component>

  <div
    style="height: 2px; width: 100%; background-color: red; margin: 10px 0"
  ></div>
  <h2>Using Keep Alive</h2>
  <KeepAlive>
    <component :is="selectedComponent"></component>
  </KeepAlive>

  <div
    style="height: 2px; width: 100%; background-color: red; margin: 10px 0"
  ></div>
  <h2>Using Keep Alive Include, Exclude Props</h2>
  <KeepAlive include="a">
    <component :is="selectedComponent"></component>
  </KeepAlive>
  <KeepAlive :include="['a', 'b']">
    <component :is="selectedComponent"></component>
  </KeepAlive>
</template>

<script setup>
import { ref, computed } from "vue";
import ComponentA from "./ComponentA.vue";
import ComponentB from "./ComponentB.vue";

const selected = ref("A");
const selectedComponent = computed(() =>
  selected.value == "A" ? ComponentA : ComponentB
);
</script>
