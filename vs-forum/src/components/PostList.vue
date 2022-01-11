<template>
  <div class="posts space-y-6">
    <div
      class="bg-white rounded-sm shadow-sm p-4 flex space-x-5"
      v-for="post in posts"
      :key="post.id"
    >
      <div
        class="
          w-28
          user-info
          flex-shrink-0 flex flex-col
          justify-center
          items-center
          space-y-2
        "
      >
        <a href="#" class="text-green-500 text-center font-semibold text-sm">{{
          userById(post.userId).name
        }}</a>

        <a href="#">
          <img
            class="w-20 h-20 object-cover object-center rounded-full"
            :src="userById(post.userId).avatar"
            alt=""
          />
        </a>

        <p class="text-xs font-semibold">107 posts</p>
      </div>

      <div class="flex flex-col w-full flex-1">
        <div class="post-content">
          <p>{{ post.text }}</p>
        </div>

        <div class="post-date self-end text-sm text-gray-400 mt-4">
          <app-date :timestamp="post.publishedAt" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import sourceData from "../data.json";

export default {
  name: "PostList",
  props: {
    posts: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      threads: sourceData.threads,
      users: sourceData.users,
    };
  },
  methods: {
    userById(userId) {
      return this.users.find((u) => u.id === userId);
    },
  },
};
</script>

<style>
</style>