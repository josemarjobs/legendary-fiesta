<template>
  <div class="forum-list">
    <h1 class="text-center text-3xl font-bold m-8" v-if="title">{{ title }}</h1>

    <h2 class="bg-green-800 text-white text-xl px-3 py-2 mb-2 font-light">
      <router-link
        v-if="categoryId"
        :to="{ name: 'Category', params: { id: categoryId } }"
      >
        {{ categoryName }}
      </router-link>
      <span v-else>{{ categoryName }}</span>
    </h2>

    <div
      class="forum bg-white mb-2 px-6 py-4 grid grid-cols-10 items-center"
      v-for="forum in forums"
      :key="forum.id"
    >
      <div class="forum-details col-span-7">
        <router-link
          :to="{ name: 'ForumShow', params: { id: forum.id } }"
          class="text-2xl font-light text-green-500"
        >
          {{ forum.name }}
        </router-link>
        <p>{{ forum.description }}</p>
      </div>

      <div class="threads-count col-span-3">
        <p class="text-center">
          <span class="block">{{ forum.threads?.length }}</span>
          {{ forumThreadsWord(forum) }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    forums: {
      required: true,
      type: Array,
    },
    categoryName: {
      type: String,
      default: "Forums",
    },
    title: {
      type: String,
      required: false,
    },
    categoryId: {
      type: String,
      required: false,
    },
  },
  methods: {
    forumThreadsWord(forum) {
      return forum.threads
        ? forum.threads.length > 1
          ? " threads"
          : " thread"
        : "No threads";
    },
  },
};
</script>

<style>
</style>