<template>
  <div class="" v-if="thread && asyncDataStatus_ready">
    <h1 class="text-3xl font-bold mt-10 mb-1">
      {{ thread.title }}
      <router-link
        v-if="thread.userId === authUser?.id"
        class="
          text-sm
          px-4
          text-emerald-500
          uppercase
          tracking-widest
          hover:text-emerald-700
        "
        :to="{ name: 'ThreadEdit', params: { id: thread.id } }"
      >
        Edit
      </router-link>
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

    <post-editor v-if="authUser" @save="addPost" />
    <div v-else class="text-center p-8 text-xl">
      <router-link
        class="text-emerald-500 hover:text-emerald-400"
        :to="{ name: 'Login', query: { redirectTo: $route.path } }"
      >
        Sign in
      </router-link>
      or
      <router-link
        class="text-emerald-500 hover:text-emerald-400"
        :to="{ name: 'Register', query: { redirectTo: $route.path } }"
      >
        Register
      </router-link>
      to reply
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import AppDate from "../components/AppDate.vue";
import PostEditor from "../components/PostEditor.vue";
import PostList from "../components/PostList.vue";
import asyncDataStatus from "../mixin/asyncDataStatus";
export default {
  name: "ThreadShow",
  components: { PostList, PostEditor, AppDate },
  mixins: [asyncDataStatus],
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
    ...mapGetters(["authUser"]),
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
    ...mapActions([
      "fetchThread",
      "fetchUser",
      "fetchUsers",
      "fetchPosts",
      "createPost",
    ]),
    addPost(eventData) {
      const post = {
        ...eventData.post,
        threadId: this.id,
      };
      this.createPost(post);
    },
  },

  async created() {
    const thread = await this.fetchThread({ id: this.id });
    const posts = await this.fetchPosts({ ids: thread.posts });
    const users = posts.map((p) => p.userId).concat(thread.userId);
    await this.fetchUsers({ ids: users });
    this.asyncDataStatus_fetched();
  },
};
</script>

<style>
</style>