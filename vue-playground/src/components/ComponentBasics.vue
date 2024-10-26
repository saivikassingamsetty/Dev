<template>
  Parent Send to Child
  <input type="text" :value="msg" @input="msg = $event.target.value" />
  <p>Recieved {{ recievedMessage }}</p>
  <br />
  <Child :message="msg" @sendMessage="recievedMessage = $event.target.value">
    This is a Slotted content
  </Child>
  <anotherChild />
</template>

<script setup>
import { ref } from "vue";
import Child from "./ComponentBasicsChild.vue";

const msg = ref("");
const recievedMessage = ref("");
</script>
