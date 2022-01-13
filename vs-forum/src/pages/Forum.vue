<template>
  <div class="mt-8">
    <div>
      <div class="forum-details">
        <h1 class="text-3xl mb-3 font-bold">{{ forum.name }}</h1>
        <div class="flex justify-between items-center mb-2">
          <p class="text-2xl font-light">
            {{ forum.description }}
          </p>
          <router-link
            :to="{ name: 'ThreadCreate', params: { forumId: forum.id } }"
            href="#"
            class="bg-green-500 text-white px-3 py-1 rounded-md"
          >
            Start a thread
          </router-link>
        </div>
      </div>
    </div>
    <thread-list :threads="threads" />
  </div>
</template>

<script>
import ThreadList from "../components/ThreadList.vue";

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
      return this.$store.state.forums.find((f) => f.id === this.id);
    },
    threads() {
      return this.$store.state.threads.filter((t) => t.forumId === this.id);
    },
  },
};
</script>

<style>
</style>