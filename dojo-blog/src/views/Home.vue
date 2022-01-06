<template>
  <div class="home">
    <h1>Home</h1>
    <p v-if="error">ERROR: {{ error }}</p>
    <div class="layout" v-if="posts.length">
      <post-list :posts="posts" />
      <tag-cloud :posts="posts" />
    </div>
    <div v-else class="loading">
      <spinner />
    </div>
  </div>
</template>

<script>
import PostList from "../components/PostList.vue";
import getPosts from "../composables/getPosts";
import Spinner from "../components/Spinner.vue";
import TagCloud from "../components/TagCloud.vue";

export default {
  components: { PostList, Spinner, TagCloud },
  name: "Home",
  setup() {
    const { posts, error, load } = getPosts();
    load();
    return { posts, error };
  },
};
</script>

<style>
.layout {
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 20px;
}
</style>