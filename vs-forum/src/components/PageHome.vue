<template>
  <div class="home">
    <h1 class="text-3xl font-bold text-center mb-4 mt-10">
      Welcome to the Forum
    </h1>
    <thread-list :threads="threads" />
  </div>
</template>

<script>
import sourceData from "../data.json";
import ThreadList from "./ThreadList.vue";
export default {
  components: { ThreadList },
  data() {
    return {
      threads: sourceData.threads,
    };
  },
};
</script>

<style>
</style>