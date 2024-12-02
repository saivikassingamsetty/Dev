<template>
  <div v-if="error">Oops! Error encountered: {{ error.message }}</div>
  <div v-else-if="data">Data loaded: {{ data }}</div>
  <div v-else>Loading ...</div>
</template>

<script>
import { useFetch } from "./use-fetch.js";

const { data, error } = await useFetch("...");
</script>
