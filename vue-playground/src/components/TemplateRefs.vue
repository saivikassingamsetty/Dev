<template>
  <!-- accessing -->
  <input ref="myInput" />

  <!-- v-for -->
  <ul>
    <li v-for="item in list" :key="item" ref="items">{{ item }}</li>
  </ul>

  <!-- function refs -->
  <input
    :ref="
      (el) => {
        state = el;
      }
    "
  />

  <!-- Child components -->
  <Child ref="child" />
</template>

<script setup>
import { useTemplateRef, onMounted, ref, watch } from "vue";
//3.5+
const input = useTemplateRef("myInput");
//<3.5
const myInput = ref(null);

// v-for
const list = [1, 2, 3];
//3.5+
const itemsRef = useTemplateRef("items");
//<3.5
const items = ref(null);

// function refs
const state = ref(null);

// Child refs
const childRef = useTemplateRef("child");
const child = ref(null);

onMounted(() => {
  //make the input focus
  console.log(input.value.focus());
  console.log(myInput.value);
  console.log(itemsRef.value[0]); //first list item
  console.log(items.value);
  console.log(state.value); //Contains complete DOM Object
  console.log(child.value);
});

//watching the template ref and handling the null value when not initialised
watch(input, () => {
  if (input.value) {
    console.log("hi");
    input.value.focus();
  } else {
    return;
  }
});
</script>
