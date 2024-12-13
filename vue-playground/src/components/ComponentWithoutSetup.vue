<template>
  <h1>Parent</h1>
  <p>Send Message</p>
  <input type="text" v-model="msg" />
  <button @click="msgToChild = msg" style="margin-left: 10px">Send Msg</button>
  <p>Recieved Message: {{ recieved }}</p>
  <Child :foo="msgToChild" @goo="recieved = $event" />
</template>

<script>
import { ref } from "vue";
import Child from "./ComponentChildWithoutSetup.vue";

export default {
  name: "Parent",
  components: { Child },
  props: [],
  emits: [],
  setup(props, ctx) {
    console.log("Parent", props, ctx);
    const msg = ref("");
    const msgToChild = ref("");
    const recieved = ref("");

    return { msg, msgToChild, recieved };
  },
};
</script>
