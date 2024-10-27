<template>
  <h1>Child</h1>
  <p>Message is {{ foo }}</p>
  <button @click="emit('goo', 'Hello from Child')">Send msg</button>
  <div v-if="isCustomised">Customised Message</div>
</template>

<script setup>
import { watch, toRefs, onBeforeUpdate } from "vue";
// array syntax
// const props = defineProps(["foo"]);

// object syntax
const props = defineProps({
  foo: String,
  fooSecond: String,
  //   isCustomised: {
  //     type: Boolean,
  //     required: false,
  //     default: false,
  //   },
  isCustomised: [Boolean, Number],
});

// const props = defineProps<{
//     foo: string,
//     isCustomised?: boolean
// }>();

const emit = defineEmits(["goo"]);

//this only works one time, not reactive
// const { foo } = props;

//to make that reactive either we need to make it a getter, ref, computed, toRefs
const { foo } = toRefs(props);

watch(foo, () => {
  console.log("foo changed", foo);
});

onBeforeUpdate(() => {
  console.log("Bui");
});
</script>
