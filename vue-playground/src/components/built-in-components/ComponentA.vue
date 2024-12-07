<template>
  <p>Current Component: A</p>
  <span>Count: {{ count }}</span>
  <button @click="count++">+</button>
</template>

<!-- name property wont be there for script setup before 3.3 -->
<!-- but needed for include, exclude of keepalive -->
<script>
export default {
  name: "a",
};
</script>


<script setup>
import { ref } from "vue";

const count = ref(0);
</script>
