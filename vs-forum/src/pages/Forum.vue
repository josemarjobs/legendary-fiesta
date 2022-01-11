<template>
  <div class="mt-8">
    <div>
      <div class="forum-details">
        <h1 class="text-3xl mb-3 font-bold">{{ forum.name }}</h1>
        <div class="flex justify-between items-center mb-2">
          <p class="text-2xl font-light">
            {{ forum.description }}
          </p>
          <a href="#" class="bg-green-500 text-white px-3 py-1 rounded-md"
            >Start a thread</a
          >
        </div>
      </div>
    </div>
    <thread-list :threads="threads" />
  </div>
</template>

<script>
import ThreadList from "../components/ThreadList.vue";
import sourceData from "../data.json";

export default {
  components: { ThreadList },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  computed: {
    forum() {
      return sourceData.forums.find((f) => f.id === this.id);
    },
    threads() {
      return sourceData.threads.filter((t) => t.forumId === this.id);
    },
  },
};
</script>

<style>
</style>