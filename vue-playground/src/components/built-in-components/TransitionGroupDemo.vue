<template>
  <button @click="insertAtRandomIndex">Insert At Random Index</button>
  <button @click="removeAtRandomIndex">Remove At Random Index</button>
  <TransitionGroup name="list" tag="ul">
    <li v-for="item in items" :key="item">{{ item }}</li>
  </TransitionGroup>

  <input type="text" v-model="searchText" placeholder="Search" />
  <TransitionGroup
    tag="ul"
    :css="false"
    @before-enter="onBeforeEnter"
    @enter="onEnter"
    @leave="onLeave"
  >
    <li v-for="word in words" :key="word">{{ word }}</li>
  </TransitionGroup>
</template>

<script setup>
import { ref } from "vue";
import gsap from "gsap";

const items = ref([1, 2, 3, 4, 5, 6, 7, 8, 9]);

const insertAtRandomIndex = () => {
  const randomIndex = Math.floor(Math.random() * items.value.length);
  items.value.splice(randomIndex, 0, Math.floor(Math.random() * 100));
};

const removeAtRandomIndex = () => {
  const randomIndex = Math.floor(Math.random() * items.value.length);
  items.value.splice(randomIndex, 1);
};

const words = ["aa", "ab", "bc", "cd", "abc", "bcd", "abcd"];

function onEnter(el, done) {
  gsap.to(el, {
    opacity: 1,
    height: "1.6em",
    delay: el.dataset.index * 0.15,
    onComplete: done,
  });
}
</script>

<style>
/* button {
  margin: 10px;
} */

.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from,
.list-leave-to {
  translate: 30px;
  opacity: 0;
}

/* for smoother leave animation, calculating the tranistion */
.list-leave-active {
  position: absolute;
}
</style>
