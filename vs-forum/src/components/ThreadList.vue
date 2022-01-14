<template>
  <div class="thread-list">
    <h2 class="bg-green-800 text-green-50 text-xl p-2 mb-2">Threads</h2>

    <div
      class="
        thread
        px-4
        mb-4
        bg-white
        flex
        items-center
        justify-between
        text-gray-500
      "
      v-for="thread in threads"
      :key="thread.id"
    >
      <div>
        <p class="text-green-500">
          <router-link :to="{ name: 'ThreadShow', params: { id: thread.id } }">
            {{ thread.title }}
          </router-link>
        </p>
        <p class="text-sm">
          By
          <a class="text-green-500" href="#">{{
            userById(thread.userId).name
          }}</a
          >, <app-date :timestamp="thread.publishedAt" />
        </p>
      </div>

      <div class="activity flex items-center">
        <p class="replies-count">{{ thread.posts.length }} replies</p>

        <div class="w-80 flex items-center justify-center space-x-2">
          <img
            :src="userById(thread.userId).avatar"
            alt=""
            class="w-10 h-10 rounded-full object-cover origin-center"
          />

          <div class="text-sm">
            <p>
              <a class="text-green-500" href="#">{{
                userById(thread.userId).name
              }}</a>
            </p>
            <p class="text-xs">
              <app-date :timestamp="thread.publishedAt" />
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { findById } from "../helpers";
export default {
  name: "ThreadList",
  props: {
    threads: {
      type: Array,
      required: true,
    },
  },
  computed: {
    posts() {
      return this.$store.state.posts;
    },
    users() {
      return this.$store.state.users;
    },
  },
  methods: {
    postById(postId) {
      return findById(this.posts, postId);
    },
    userById(userId) {
      return findById(this.users, userId);
    },
  },
};
</script>
<style>
</style>