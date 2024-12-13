<template>
  <button @click="show = !show">Toggle</button>
  <Transition>
    <p v-if="show">Hi</p>
  </Transition>
  <Transition name="fade">
    <p v-show="show">Hi</p>
  </Transition>
  <Transition name="slide">
    <p v-show="show">Hi</p>
  </Transition>
  <Transition name="bounce" style="text-align: center">
    <p v-if="show">Bouncy Text</p>
  </Transition>

  <!-- JS hooks -->
  <Transition @before-enter="onBeforeEnter" :css="false">
    <p v-if="show">Hi</p>
  </Transition>

  <!-- Crazy ball -->
  <button @click="showBall = !showBall">Play with Ball</button>
  <Transition name="crazy-ball">
    <div v-if="showBall" class="ball"></div>
  </Transition>
</template>

<script setup>
import { ref } from "vue";

const show = ref(true);
const showBall = ref(true);

const onBeforeEnter = (e) => {
  console.log(e);
};
</script>

<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

/* named transitions */
.fade-enter-active,
.fade-leave-active {
  transition: color 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  color: blue;
}

.fade-enter-to,
.fade-leave-from {
  color: red;
}

/* CSS Transitions: slide */
.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  translate: 20px;
}

/* CSS Animations: Bouncy text */
.bounce-enter-active {
  animation: bounce 0.5s;
}
.bounce-leave-active {
  animation: bounce 0.5s reverse;
}

@keyframes bounce {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  180% {
    transform: scale(1);
  }
}

.ball {
  height: 50px;
  width: 50px;
  border-radius: 100%;
  background-color: red;
  margin: 20px;
}

.crazy-ball-enter-active {
  transition: all 0.3s ease-in;
}

.crazy-ball-leave-active {
  transition: all 0.3s ease;
}

.crazy-ball-enter-from {
  transform: scale(0);
}

.crazy-ball-leave-to {
  translate: 200px;
  transform: scale(0);
}
</style>
