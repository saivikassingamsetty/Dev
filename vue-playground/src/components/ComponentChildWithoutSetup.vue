<template>
  <h1>Child</h1>
  <p>Message is {{ foo }}</p>
  <button @click="$emit('goo', 'Hello from Child')">Send msg</button>
</template>

<script>
export default {
  name: "Child",
  components: {},
  props: ["foo"],
  emits: ["goo"],
  setup(props, ctx) {
    console.log("Child", props, ctx);
  },
};
</script>
