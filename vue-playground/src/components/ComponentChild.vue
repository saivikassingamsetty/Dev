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

//typing works with ts
// const props = defineProps<{
//     foo: string,
//     isCustomised?: boolean
// }>();

//array syntax
// const emit = defineEmits(["goo"]);

//object
const emit = defineEmits({
  // no validation
  // goo: null,

  //validating
  goo: (value) => {
    if (value) return true;
    else {
      console.log("Invalid Payload", value);
      return false;
    }
  },
});

//typing works with ts
// const emit = defineEmits<{
//   (e: 'goo', value: string): void
// }>();

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
