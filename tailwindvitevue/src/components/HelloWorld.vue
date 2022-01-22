<script setup>
import { ref } from "vue";

defineProps({
  msg: String,
});

const count = ref(0);
</script>

<template>
  <h1>{{ msg }}</h1>

  <p>
    Recommended IDE setup:
    <a href="https://code.visualstudio.com/" target="_blank">VSCode</a>
    +
    <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
  </p>
  <button class="btn aspect-square">Hello</button>
  <p class="card">
    <a href="https://vitejs.dev/guide/features.html" target="_blank">
      Vite Documentation
    </a>
    |
    <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Documentation</a>
  </p>

  <button type="button" @click="count++">count is: {{ count }}</button>
  <p class="card">
    Edit
    <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>
  <p class="card bg-slate-300 text-slate-900">Edit</p>
  <p class="card bg-slate-900 text-slate-100">Edit</p>
  <p class="card">
    Edit
    <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>

  <form action="">
    <input type="text" placeholder="name" />
  </form>
</template>

<style scoped>
a {
  color: #42b983;
}
.card {
  @apply px-4 py-2 rounded-md m-10;
}
</style>
