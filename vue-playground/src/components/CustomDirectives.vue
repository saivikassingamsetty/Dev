<template>
  <div v-highlight>Hi Hello</div>
  <br />
  <div v-highlite>Hi Hello</div>
  <br />
  <input type="text" placeholder="Enter your name" v-model="name" />

  <!-- will be autofocused when it inserted to DOM -->
  <input v-focus type="text" placeholder="Enter your name" v-model="name" />

  <br />

  <!-- func directive -->
  <div v-funcDir>Hi Hello</div>

  <!-- args, modifiers, value -->
  <div v-my-directive:[attr].sync="{ name: 'Vikas', age: 24 }">Hi Hello</div>
</template>

<script setup>
import { ref } from "vue";
const vHighlight = {
  created(el) {
    el.classList.add("is-highlight");
  },
};

const vFocus = {
  mounted(el, binding, vnode) {
    el.focus();

    console.log(binding, vnode);
  },
};

const vFuncDir = (e) => e.classList.add("is-highlight");

const attr = ref("person");

const vMyDirective = {
  mounted(e, binding, vnode) {
    const attr = binding.arg;
    const modifiers = binding.modifiers;
    const value = binding.value;

    if (attr === "person" && modifiers.sync) {
      e.innerHTML = `Hi ${value.name}`;
    }
  },

  updated(e, binding) {
    e.innerHTML = `Hi ${binding.value.name}`;
  },
};
</script>

<script>
export default {
  setup() {},
  directives: {
    highlite: {
      mounted(el) {
        el.classList.add("is-highlight");
      },
    },
  },
};
</script>

<style>
.is-highlight {
  color: black;
  background: yellow;
  max-width: max-content;
}
</style>
