<template>
  <button @click="open = true">Open Modal</button>

  <Teleport to="body">
    <modal :show="open" @close="open = false">
      <template #header>Custom Header</template>
    </modal>
  </Teleport>
</template>

<script setup>
import { ref } from "vue";
import Modal from "../MyModal.vue";

const open = ref("false");
</script>
