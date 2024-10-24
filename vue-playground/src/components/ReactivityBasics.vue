<template>
  <!-- Ref -->
  <button @click="increment">Count is {{ count }}</button>

  <!-- Reactive -->
  <button @click="incrementCount">Count is {{ state.count }}</button>

  <!-- computed -->
  <button @click="toggleFail">Are we good? {{ allGood }}</button>

  <!-- invoke methods -->
  <button @click="toggleFail">Are we good? {{ allGoodUsingMethod() }}</button>

  <!-- writable -->
  <p>What's your name?</p>
  <input
    type="text"
    :value="fullName"
    @input="(event) => (fullName = event.target.value)"
  />
  <p>Your beautiful name is {{ fullName }}</p>
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
  computed,
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

//computed
const complexObj = reactive({
  id: 1,
  names: [1, 2, 3, 4],
  ranks: { 1: 4, 2: 3, 3: 1, 4: 2 },
  allFail: false,
});

//we may want to get ranks of avaibale members
let allGood = computed(() => {
  return (
    complexObj.names.length == Object.keys(complexObj.ranks).length &&
    !complexObj.allFail
  );
});

const complexObjUsingMethod = reactive(complexObj);

//using invoke method
const allGoodUsingMethod = () => {
  return (
    complexObjUsingMethod.names.length ==
      Object.keys(complexObjUsingMethod.ranks).length &&
    !complexObjUsingMethod.allFail
  );
};

const toggleFail = () => (complexObj.allFail = !complexObj.allFail);

//writable computed
const firstName = ref("Sai");
const lastName = ref("Vikas");

const fullName = computed({
  //getter
  get() {
    return firstName.value + " " + lastName.value;
  },
  //setter
  set(newVal) {
    [firstName.value, lastName.value] = newVal.split(" ");
  },
});

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
