<template>
  <h1 v-bind="$attrs">Child</h1>
  <div>Custom Attributes {{ attrs["custom-attr"] }}</div>
  <p>Message is {{ foo }}</p>
  <button @click="emit('goo', 'Hello from Child')">Send msg</button>
  <div v-if="isCustomised">Customised Message</div>

  <label for="text">Common Msg</label>
  <input type="text" id="text" v-model="commonMsg" style="margin-left: 10px" />

  <br />
  <label for="text">Common Data</label>
  <input type="text" id="text" v-model="commonData" style="margin-left: 10px" />
</template>

<script setup>
import { watch, toRefs, onBeforeUpdate, useAttrs } from "vue";
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

const commonMsg = defineModel("commonMsg", { required: true });

const [commonData, commonDataModifiers] = defineModel("commonData", {
  set(value) {
    if (commonDataModifiers.capitalize) {
      return value.charAt(0).toUpperCase() + value.slice(1);
    }

    return value;
  },
  required: true,
});

const attrs = useAttrs();

console.log(attrs);

watch(foo, () => {
  console.log("foo changed", foo);
});

onBeforeUpdate(() => {
  //triggers everytime before DOM updates
  console.log("Bui");
});
</script>
