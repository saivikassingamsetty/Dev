<template>
  <h1>Parent</h1>
  <p>Send Message</p>
  <input type="text" v-model="msg" />
  <button @click="msgToChild = msg" style="margin-left: 10px">Send Msg</button>
  <p>Recieved Message: {{ recieved }}</p>
  <label for="text">Common Msg</label>
  <input type="text" id="text" v-model="commonMsg" style="margin-left: 10px" />
  <br />
  <label for="text">Common Data</label>
  <input type="text" id="text" v-model="commonData" style="margin-left: 10px" />
  <Child
    :foo="msgToChild"
    :foo-second="secondMsg"
    @goo="recieved = $event"
    is-customised
    v-model:common-msg="commonMsg"
    v-model:common-data.capitalize="commonData"
    custom-attr="Hi"
    style="border: 2px solid red"
    @click="
      () => {
        alert('Hi');
      }
    "
  >
    <!-- custom slot -->
    <template #custom="{ customMsg }">{{ customMsg }}</template>
    <!-- default -->
    <template v-slot="{ myMsg }">{{ myMsg }}</template>
  </Child>
  <!-- <Child v-bind="msgs" @goo="recieved = $event" /> -->
</template>

<script setup>
import { ref, provide } from "vue";
import Child from "./ComponentChild.vue";

const msg = ref("");
const msgToChild = ref("msg");
const secondMsg = ref("");
const recieved = ref("");

// const msgs = {
//   foo: msgToChild.value,
//   fooSecond: msgToChild.value,
//   isCustomised: true,
// };

const commonMsg = ref("");
const commonData = ref("");

const updateMsg = (m) => {
  msgToChild.value = m.target.value;
};

provide("provided", [msgToChild, updateMsg]);
</script>
