<template>
  <div class="" v-if="thread">
    <h1 class="text-3xl text-center font-bold my-10">
      {{ thread.title }}
    </h1>

    <div class="posts space-y-6">
      <div
        class="bg-white rounded-sm shadow-sm p-4 flex space-x-5"
        v-for="postId in thread.posts"
        :key="postId"
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
          <a
            href="#"
            class="text-green-500 text-center font-semibold text-sm"
            >{{ userById(postById(postId).userId).name }}</a
          >

          <a href="#">
            <img
              class="w-20 h-20 object-cover object-center rounded-full"
              :src="userById(postById(postId).userId).avatar"
              alt=""
            />
          </a>

          <p class="text-xs font-semibold">107 posts</p>
        </div>

        <div class="flex flex-col w-full flex-1">
          <div class="post-content">
            <p>{{ postById(postId).text }}</p>
          </div>

          <div class="post-date self-end text-sm text-gray-400 mt-4">
            <p>{{ postById(postId).publishedAt }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import sourceData from "../data.json";
export default {
  props: {
    id: {
      required: true,
      type: String,
    },
  },
  data() {
    return {
      threads: sourceData.threads,
      posts: sourceData.posts,
      users: sourceData.users,
    };
  },
  methods: {
    postById(postId) {
      return this.posts.find((p) => p.id === postId);
    },
    userById(userId) {
      return this.users.find((u) => u.id === userId);
    },
  },
  computed: {
    thread() {
      return this.threads.find((t) => t.id === this.id);
    },
  },
};
</script>

<style>
</style>