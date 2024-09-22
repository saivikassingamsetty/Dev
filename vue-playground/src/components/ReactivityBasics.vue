<template>
  <!-- Ref -->
  <button @click="increment">Count is {{ count }}</button>

  <!-- Reactive -->
  <button @click="incrementCount">Count is {{ state.count }}</button>
</template>

<!-- <script>
import { ref } from "vue";

export default {
  setup() {
    const count = ref(0);
    const increment = () => count.value++;

    return { count, increment };
  },
};
</script> -->

<script setup>
import {
  ref,
  reactive,
  nextTick,
  onRenderTriggered,
  onRenderTracked,
} from "vue";

const count = ref(0);
// const increment = () => count.value++;
const increment = async () => {
  count.value++;
  //awaits one tick before updating the DOM
  await nextTick();
};

const originalObj = { count: 0 };
const state = reactive(originalObj);
const incrementCount = () => state.count++;

//creating a proxy of state
const stateProxy = reactive(state);
console.log(originalObj == state); //false
console.log(stateProxy == state); //true

//debugger events
//triggers 2 times when accessing count and state in template
onRenderTracked((event) => {
  console.log("tracked", event);
});

//on clicking the button or updating the reactive objs, triggering
onRenderTriggered((event) => {
  console.log("triggered", event);
});
</script>
