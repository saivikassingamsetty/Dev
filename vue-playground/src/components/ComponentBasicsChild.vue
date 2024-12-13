<template>
  Child
  <p>{{ message }}</p>
  <input type="text" :value="message" @input="$emit('sendMessage', $event)" />
  <slot />
</template>

<script setup>
const props = defineProps(["message"]);
const emit = defineEmits(["sendMessage"]);
</script>
