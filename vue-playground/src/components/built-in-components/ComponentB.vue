<template>
  <p>Current Component: B</p>
  <label for="msg">Message is: {{ msg }}</label>
  <input v-model="msg" id="msg" style="margin: 10px"/>
</template>

<script>
export default {
  name: "b",
};
</script>

<script setup>
import { ref } from "vue";

const msg = ref('');
</script>
