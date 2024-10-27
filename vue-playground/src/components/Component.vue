<template>
  <h1>Parent</h1>
  <p>Send Message</p>
  <input type="text" v-model="msg" />
  <button @click="msgToChild = msg" style="margin-left: 10px">Send Msg</button>
  <p>Recieved Message: {{ recieved }}</p>
  <Child
    :foo="msgToChild"
    :foo-second="secondMsg"
    @goo="recieved = $event"
    is-customised
  />
  <!-- <Child v-bind="msgs" @goo="recieved = $event" /> -->
</template>

<script setup>
import { ref } from "vue";
import Child from "./ComponentChild.vue";

const msg = ref("");
const msgToChild = ref("");
const recieved = ref("");

// const msgs = {
//   foo: msgToChild.value,
//   fooSecond: msgToChild.value,
//   isCustomised: true,
// };
</script>
