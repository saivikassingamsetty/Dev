<template>
  <!-- manual binding with changes with event handler -->
  <input
    type="text"
    :value="text"
    @input="(event) => (text = event.target.value)"
  />
  <p>{{ text }}</p>

  <!-- v-model -->
  <input type="text" v-model="text" />

  <br />

  <!-- multi line msg -->
  <textarea v-model="multiLineMsg"></textarea>
  <p style="white-space: pre-line">{{ multiLineMsg }}</p>

  <!-- checkbox -->
  <input type="checkbox" id="checkbox" v-model="checked" />
  <label for="textbox">{{ checked }}</label>

  <!-- multiple checkboxes -->
  <div>Checked items: {{ checkedItems }}</div>
  <input type="checkbox" id="a" value="A" v-model="checkedItems" />
  <label for="a">A</label>
  <input type="checkbox" id="b" value="B" v-model="checkedItems" />
  <label for="b">B</label>
  <input type="checkbox" id="c" value="C" v-model="checkedItems" />
  <label for="c">C</label>

  <!-- Radio button group -->
  <div>Picked: {{ picked }}</div>
  <input type="radio" id="one" value="One" v-model="picked" />
  <label for="one">One</label>
  <input type="radio" id="two" value="Two" v-model="picked" />
  <label for="two">Two</label>

  <!-- single select -->
  <div>Selected: {{ selected }}</div>
  <select v-model="selected">
    <option disabled value="">Select one</option>
    <option>A</option>
    <option>B</option>
    <option>C</option>
  </select>

  <!-- multi select -->
  <div>Selected: {{ selectedItems }}</div>
  <select v-model="selectedItems" multiple>
    <option disabled value="">Select one</option>
    <option>A</option>
    <option>B</option>
    <option>C</option>
  </select>

  <!-- using v-for -->
  <div>Selected: {{ selectedOption }}</div>
  <select v-model="selectedOption">
    <option v-for="option in options" :value="option.id">
      {{ option.value }}
    </option>
  </select>

  <!-- value bindigs -->
  <div>checkedValue: {{ checkedValue }}</div>
  <input type="radio" id="check" v-model="checkedValue" :value="A" />
  <label for="check">A</label>

  <!-- vue specific attributes -->
  <br />
  <input type="checkbox" v-model="toggle" true-value="Yes" false-value="No" />
  <label>Checked: {{ toggle }}</label>

  <!-- modifiers -->
  <input type="text" v-model.lazy="stringVal" />
  <input type="text" v-model.number="stringVal" />
</template>

<script setup>
import { ref } from "vue";

const text = ref("");
const multiLineMsg = ref("");
const checked = ref(false);

//can be a set too
const checkedItems = ref([]);

const picked = ref("");
const selected = ref("");

const selectedItems = ref([]);

const selectedOption = ref("a");
const options = ref([
  { id: "a", value: "A" },
  { id: "b", value: "B" },
  { id: "c", value: "C" },
]);

const checkedValue = ref("");
const toggle = ref("");

const stringVal = ref(" 123");
</script>
