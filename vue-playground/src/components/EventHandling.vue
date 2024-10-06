<template>
  <!-- inline handler -->
  <button @click="count++">Count is {{ count }}</button>

  <!-- method handler -->
  <button @click="incrementCount">Count is {{ count }}</button>

  <!-- with event object -->
  <button @click="incrementCountWithObject">Count is {{ count }}</button>

  <!-- calling methods -->
  <button @click="incrementCountWithObject('My own input')">
    Count is {{ count }}
  </button>

  <br />
  <!-- special event object -->
  <button @click="incrementCountWithEvent('My own input', $event)">
    {{ count }}
  </button>

  <!-- arrow function -->
  <button @click="(event) => console.log('Hi', event)">Hi</button>

  <br />
  <!-- event modifiers -->
  <a @click.stop="incrementCountWithObject">Hi</a>
  <a @click.once="incrementCountWithObject">Hello</a>

  <!-- key modifiers -->
  <input
    type="text"
    placeholder="Hi"
    @keyup.enter="() => console.log('Submitted')"
  />
</template>

<script setup>
import { ref, computed } from "vue";

const count = ref(0);
const incrementCount = computed(() => count.value++);

const incrementCountWithObject = (event) => {
  console.log("Hi", event);
};

const incrementCountWithEvent = (msg, evnt) => {
  console.log(msg, evnt);
};
</script>
