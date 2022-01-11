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
import sourceData from "../data.json";
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
      threads: sourceData.threads,
      posts: sourceData.posts,
      newPostText: "",
    };
  },
  computed: {
    thread() {
      return this.threads.find((t) => t.id === this.id);
    },
    threadPosts() {
      return this.posts.filter((p) => p.threadId === this.id);
    },
  },
  methods: {
    addPost(eventData) {
      this.posts.push({ ...eventData.post, threadId: this.id });
      this.thread.posts.push(eventData.post.id);
    },
  },
};
</script>

<style>
</style>