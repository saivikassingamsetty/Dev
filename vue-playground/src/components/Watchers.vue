<template>
  <p>
    Ask a Yes/No Question:
    <input v-model="question" :disabled="loading" />
  </p>

  <p>{{ answer }}</p>

  <button @click="a++">a: {{ a }}</button>
  <button @click="b++">b: {{ b }}</button>

  <br />

  <button @click="incrementCount">click here {{ obj.count }}</button>

  <br />

  <button @click="countObj.count++">{{ countObj.count }}</button>

  <br />

  <button @click="incrementCount">click here {{ obj.count }}</button>

  <br />
</template>

<script setup>
import { ref, watch, reactive, watchEffect, onWatcherCleanup } from "vue";

const question = ref("");
const answer = ref("Questions usually contain a question mark. ;-)");
const loading = ref(false);

//basic watcher - ref
watch(question, async (newQuestion, oldQuestion) => {
  if (newQuestion.includes("?")) {
    loading.value = true;
    answer.value = "Thinking...";
    try {
      const res = await fetch("https://yesno.wtf/api");
      answer.value = (await res.json()).answer;
    } catch (error) {
      answer.value = "Error! Could not reach the API. " + error;
    } finally {
      loading.value = false;
    }
  }
});

const a = ref(0);
//getter func
watch(
  () => a.value,
  (newVal) => {
    console.log("Square is", newVal ** 2);
  }
);

//multiple reactive objects
let b = ref(0);
watch([a, b], () => {
  console.log("Hi", a.value, b.value);
});

watch([() => a.value, b], () => {
  console.log("Hello", a.value, b.value);
});

const obj = reactive({ count: 0 });
//wont work as we are passing a number to watch
watch(obj.count, () => {
  console.log("Hi");
});

//instead we can use a getter func
watch(
  () => obj.count,
  () => {
    console.log("Hello");
  }
);

//this is a deep watcher and will work
watch(obj, () => {
  console.log("Obj changes");
});

const incrementCount = () => {
  //triggers the watcher
  obj.count++;
};

//deep watch
const countObj = reactive({ count: 0 });
const anObj = reactive({ countObj });

//wont work
watch(
  () => anObj.countObj,
  (oldVal, newVal) => {
    console.log("Value Changed");
  }
);

//deep watching works
watch(
  () => anObj.countObj,
  (oldVal, newVal) => {
    console.log("Value Changed");
  },
  { deep: true }
);

//eager watcher
watch(
  obj,
  (oldVal, newVal) => {
    console.log("Value Changed");
  },
  { immediate: true }
);

//watch effect
watchEffect(() => {
  console.log(`a value is ${a.value}`);
  console.log(`b changed ${b.value}`);
});

//clean ups -- 3.5+
watch(question, () => {
  const controller = new AbortController();
  //wont work -- async execution
  // const res = await fetch("https://yesno.wtf/api");
  // answer.value = (await res.json()).answer;

  //works -- sync execution
  fetch("https://yesno.wtf/api").then(() => {});

  onWatcherCleanup(() => {
    console.log("Cleanup");
    controller.abort();
  });
});

//oncleanup
watch(question, (newId, oldId, onCleanup) => {
  fetch("https://yesno.wtf/api").then(() => {});

  onCleanup(() => {
    console.log("Cleanup 2");
  });
});

//flushing -- to control when to watch before the DOM update, during or after
//by default it is before

//After the DOM updates/Vue updates -- last watcher to be called
watch(a, () => console.log("Hi"), { flush: "post" });

//Syncronous update -- first watcher to be called
watch(a, () => console.log("Hi Hello"), { flush: "sync" });

//stopping watcher -- when created in async
const unwatch = watch(a, () => console.log("Hi Hello Namaste"));
unwatch();
</script>
