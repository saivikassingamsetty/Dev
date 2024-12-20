<template>
  <button @click="increment">Increase Count</button>
  <p>Count is {{ count }}</p>

  <div>-----------------------------------</div>

  <h1>Todo app</h1>
  <!-- Filters -->
  <input type="radio" v-model="filter" value="all">All</input>
  <input type="radio" v-model="filter" value="finished">Finished</input>
  <input type="radio" v-model="filter" value="unfinished">Unfinished</input>
  <br>
  <div>
    <div v-for="todo in filteredTodos" :key="todo.id">
        <input type="checkbox" v-model="todo.isFinished">
        {{ todo.text }}
    </div>
  </div>
    <br>
    <input type="text" v-model="todoText">
    <button :disabled="!todoText" @click="addTodo">Add</button>
    <br>
    <div></div>
    <button @click="resetTodos">Reset</button>
    <button @click="saveTodos">Save</button>
</template>

<script setup>
import {ref, watch} from 'vue';
import { storeToRefs } from "pinia";
import { useCounterStore, useCountStore, useTodos} from "../store/todoStore";

// const counter = useCounterStore();
const counter = useCountStore();
const { count } = storeToRefs(counter);
const { increment } = counter;

const todoText = ref('');
const todos = useTodos();
const {filteredTodos, filter} = storeToRefs(todos);

const addTodo = () => {
    if (todoText.value) {
        //triggers a direct mutation
        todos.addTodo({text: todoText.value, isFinished: false});
        todoText.value = '';
    }
}

const resetTodos = () => {
    todos.$reset();
}

const saveTodos = () => {
    //triggers a patch mutation
    todos.$patch((state) => {
        state.isSaved = true;
        console.log(state.isSaved)
    })
}

watch(() => todos.filter, (value) => {
    console.log('filter', value);
})

watch(() => todos.isSaved, (value) => {
    console.log('isSaved', value);
})

//can have all watcher options
todos.$subscribe((mutatuion, state) => {
    console.log("State changed", mutatuion, state)
}, {immediate: true, deep: true, flush: true})

</script>
