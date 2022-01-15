<template>
  <div class="" v-if="thread">
    <h1 class="text-3xl font-bold mt-10 mb-1">
      {{ thread.title }}
      <router-link
        class="
          text-sm
          px-4
          text-emerald-500
          uppercase
          tracking-widest
          hover:text-emerald-700
        "
        :to="{ name: 'ThreadEdit', params: { id: thread.id } }"
        >Edit</router-link
      >
    </h1>
    <div class="flex justify-between items-end mb-6">
      <div>
        By
        <a class="hover:text-emerald-500" href="#">
          {{ thread.author?.name }} </a
        >, <app-date :timestamp="thread.publishedAt" />.
      </div>

      <div class="text-sm text-gray-400">
        {{ thread.repliesCount }} replies by
        {{ thread.contributorsCount }} contributors
      </div>
    </div>
    <post-list :posts="threadPosts" />

    <post-editor @save="addPost" />
  </div>
</template>

<script>
import AppDate from "../components/AppDate.vue";
import PostEditor from "../components/PostEditor.vue";
import PostList from "../components/PostList.vue";

export default {
  name: "ThreadShow",
  components: { PostList, PostEditor, AppDate },
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
      return this.$store.getters.thread(this.id);
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

  async created() {
    const thread = await this.$store.dispatch("fetchThread", { id: this.id });

    this.$store.dispatch("fetchUser", { id: thread.userId });

    thread.posts.forEach(async (postId) => {
      const post = await this.$store.dispatch("fetchPost", { id: postId });
      this.$store.dispatch("fetchUser", { id: post.userId });
    });
  },
};
</script>

<style>
</style>