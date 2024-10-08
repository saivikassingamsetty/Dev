<template>
  <button @click="count++">{{ count }}</button>
</template>

<script setup>
import {
  ref,
  onBeforeMount,
  onMounted,
  onUpdated,
  onBeforeUpdate,
  onUnmounted,
  onBeforeUnmount,
  onRenderTracked,
  onRenderTriggered,
  onErrorCaptured,
} from "vue";

const count = ref(0);

onBeforeMount(() => {
  console.log("Before Mount");
});

//calls after the initial render and DOM connection
onMounted(() => {
  console.log("Mounted");
});

//calls right before the component state changes, we can access/modify the state
onBeforeUpdate(() => {
  console.log("Before Updated");
});

//calls everytime component state changes
onUpdated(() => {
  console.log("Updated");
});

//When error propagates due to descendant components or any reactive effects
onErrorCaptured((err, instance, info) => {
  console.log(err, instance, info);
});

//when reactive dependency has been tracked by DOM render
onRenderTracked((effect, target, type, key, newValue, oldValue, oldTarget) => {
  console.log("Render Tracked");
  console.log(effect, target, type, key, newValue, oldValue, oldTarget);
});

//when reactive dependency triggers the DOM to re-render
onRenderTriggered(
  (effect, target, type, key, newValue, oldValue, oldTarget) => {
    console.log("Render Triggered");
    console.log(effect, target, type, key, newValue, oldValue, oldTarget);
  }
);

//Right before the component has been unmounted, we can still access the state
onBeforeUnmount(() => {
  console.log("Before Unmount");
});

//When component has been unMounted from the DOM, includes clean up process
onUnmounted(() => {
  console.log("Unmounted");
});
</script>
