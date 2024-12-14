<template>
  <h3>Profile</h3>
  <p>id is {{ id }}</p>
</template>

<script setup>
defineProps({
  id: String,
});
</script>
