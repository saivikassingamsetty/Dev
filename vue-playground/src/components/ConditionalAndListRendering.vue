<template>
  <h1>Heading</h1>
  <h2>Sub Heading 1</h2>
  <h2 v-if="renderMode == 'a'">Sub Heading 2 A</h2>
  <h2 v-else-if="renderMode == 'b'">Sub Heading 2 B</h2>
  <h2 v-else>Sub Heading 2 Other</h2>

  <!-- with Template -->
  <template v-if="shouldRender">
    <p>Hi, I'm good</p>
    <p>Hi, I'm good</p>
    <p>Hi, I'm good</p>
  </template>

  <!-- v-show -->
  <h1 v-show="shouldDisplay">Hi Hello</h1>
  <!-- still will be rendered, but not displayed -->
  <h1 v-show="!shouldDisplay">Hi No</h1>

  <!-- v-for -->
  <p v-for="item in items">{{ item.message }}</p>

  <!-- second alias - index -->
  <p v-for="(item, index) in items">
    {{ index }}th message is {{ item.message }}
  </p>

  <!-- destructure -->
  <p v-for="{ message } in items">{{ message }}</p>

  <!-- for-of -->
  <p v-for="item of items">{{ item }}</p>

  <!-- with object -->
  <p v-for="item of itemsObject">{{ item }}</p>

  <!-- key, value -->
  <li v-for="(value, key, index) of itemsObject">
    {{ key }} - {{ value }} - {{ index }}
  </li>

  <!-- with range -->
  <h3>Alphabets</h3>
  <li v-for="n in 26">{{ String.fromCharCode(n + 64) }}</li>

  <!-- multiple items -->
  <ul>
    <template v-for="item in items">
      <li>{{ item.id }}</li>
      <li>{{ item.message }}</li>
    </template>
  </ul>

  <!-- Throws error -->
  <!-- <li v-for="item in items" v-if="!item.id !== 1">{{ item.message }}</li> -->

  <!-- To fix this, include v-for in template wrapper -->
  <template v-for="{ id, message } in items">
    <li v-if="id == 1">{{ message }} -----</li>
  </template>

  <!-- key -->
  <template v-for="item in items" :key="item.id">
    <div>{{ item.id }} -> {{ item.message }}</div>
  </template>

  <!-- Component with props-->
  <div v-for="item in items" :key="item.id" :attr1="item.message">
    {{ item.message }}
  </div>

  <!-- Array manipulation -->
  <ul>
    <li v-for="num in filteredNumbers" :key="num">{{ num }}</li>
  </ul>
</template>

<script setup>
import { ref, reactive, computed } from "vue";

const renderMode = ref("c");
const shouldRender = ref(true);
const shouldDisplay = ref(true);

const items = ref([
  { id: 1, message: "Hi" },
  { id: 2, message: "Hello" },
]);

const itemsObject = reactive({
  name: "Vikas",
  age: 23,
});

const numbers = ref([1, 2, 3, 4]);
const filteredNumbers = computed(() => {
  return numbers.value.filter((i) => i >= 3);
});
</script>
