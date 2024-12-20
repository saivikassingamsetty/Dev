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
</template>

<script setup>
import {ref} from 'vue';
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
    console.log('hi')
    if (todoText.value) {
        console.log('bye')
        todos.addTodo({text: todoText.value, isFinished: false});
        todoText.value = '';
    }
}
</script>
