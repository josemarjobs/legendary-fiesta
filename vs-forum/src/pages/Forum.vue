<template>
  <div class="mt-8" v-if="forum && asyncDataStatus_ready">
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
    <thread-list v-if="threads.length" :threads="threads" />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import ThreadList from "../components/ThreadList.vue";
import asyncDataStatus from "../mixin/asyncDataStatus";

export default {
  components: { ThreadList },
  mixins: [asyncDataStatus],
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
      if (!this.forum) return [];
      return this.forum.threads.map((threadId) =>
        this.$store.getters.thread(threadId)
      );
    },
  },
  methods: {
    ...mapActions(["fetchForum", "fetchThreads", "fetchUsers"]),
  },
  async created() {
    const forum = await this.fetchForum({ id: this.id });
    const threads = await this.fetchThreads({
      ids: forum.threads,
    });
    await this.fetchUsers({ ids: threads.map((t) => t.userId) });
    this.asyncDataStatus_fetched();
  },
};
</script>

<style>
</style>