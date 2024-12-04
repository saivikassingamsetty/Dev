<template>
  <h1>{{ $translate("greetings.hello") }}</h1>

  <h1>{{ i18n.greetings.hello }}</h1>
</template>

<script setup>
import { inject } from "vue";

const i18n = inject("i18n");

console.log(i18n.greetings.hello);
</script>
