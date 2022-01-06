<template>
  <div class="tag">
    <div v-if="error">{{ error }}</div>
    <div v-else-if="posts.length" class="layout">
      <post-list :posts="postsWithTag" />
      <tag-cloud :posts="posts" />
    </div>
    <div v-else>
      <spinner />
    </div>
  </div>
</template>

<script>
import Spinner from "../components/Spinner.vue";
import PostList from "../components/PostList.vue";
import getPosts from "../composables/getPosts";

import { useRoute } from "vue-router";
import { computed } from "@vue/reactivity";
import TagCloud from "../components/TagCloud.vue";
export default {
  components: { Spinner, PostList, TagCloud },
  setup() {
    const route = useRoute();
    const { posts, error, load } = getPosts();
    const postsWithTag = computed(() => {
      return posts.value.filter((p) => p.tags.includes(route.params.tag));
    });

    load();
    return { postsWithTag, posts, error };
  },
};
</script>

<style>
</style>