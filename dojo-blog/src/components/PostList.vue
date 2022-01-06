<template>
  <div class="post-list">
    <div v-for="post in posts" :key="post">
      <single-post :post="post" />
    </div>
  </div>
</template>

<script>
import { onMounted, onCreated } from "@vue/runtime-core";
import SinglePost from "./SinglePost.vue";
export default {
  props: ["posts"],
  components: { SinglePost },
  setup(props) {
    onMounted(() => console.log("onMounted"));
    console.log("setup");
  },
};
</script>

<style>
</style>