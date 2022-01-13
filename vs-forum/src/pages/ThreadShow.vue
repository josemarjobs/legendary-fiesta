<template>
  <div class="">
    <h1 class="text-3xl text-center font-bold my-10">
      {{ thread.title }}
    </h1>

    <post-list :posts="threadPosts" />

    <post-editor @save="addPost" />
  </div>
</template>

<script>
import PostEditor from "../components/PostEditor.vue";
import PostList from "../components/PostList.vue";
export default {
  name: "ThreadShow",
  components: { PostList, PostEditor },
  props: {
    id: {
      required: true,
      type: String,
    },
  },
  data() {
    return {
      newPostText: "",
    };
  },
  computed: {
    threads() {
      return this.$store.state.threads;
    },
    posts() {
      return this.$store.state.posts;
    },
    thread() {
      return this.threads.find((t) => t.id === this.id);
    },
    threadPosts() {
      return this.posts.filter((p) => p.threadId === this.id);
    },
  },
  methods: {
    addPost(eventData) {
      const post = {
        ...eventData.post,
        threadId: this.id,
      };
      this.$store.dispatch("createPost", post);
    },
  },
};
</script>

<style>
</style>