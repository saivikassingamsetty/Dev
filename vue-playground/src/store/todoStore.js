import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useCounterStore = defineStore("counter", {
  // function which returns an object
  state: () => {
    return {
      count: 0,
    };
  },
  getters: {},
  actions: {
    increment() {
      this.count++;
    },
  },
});

//syntax -2 using similar to setup function
export const useCountStore = defineStore("counter2", () => {
  const count = ref(0);
  function increment() {
    count.value++;
  }

  return { count, increment };
});

export const useTodos = defineStore("todos", () => {
  //state
  const todos = ref([]);
  const filter = ref("all");
  const nextId = ref(0);
  const isSaved = ref(false);

  //getters
  const finishedTodos = computed(() =>
    todos.value.filter((todo) => todo.isFinished)
  );
  const unFinishedTodos = computed(() =>
    todos.value.filter((todo) => !todo.isFinished)
  );
  const filteredTodos = computed(() => {
    switch (filter.value) {
      case "all":
        return todos.value;
      case "finished":
        return finishedTodos.value;
      case "unfinished":
        return unFinishedTodos.value;
    }
  });
  //getters accepting args
  const isEmptyTasks = computed(() => {
    return (tab) => tab == 'finished' ? todos.value.length: 0;
  })

  //actions
  const addTodo = ({ text, isFinished }) => {
    todos.value.push({ id: nextId.value++, text, isFinished });
  };

  const $reset = () => {
    todos.value = [];
    filter.value = "all";
    nextId.value = 0;
  };

  return { filter, isSaved, filteredTodos, addTodo, $reset };
});
