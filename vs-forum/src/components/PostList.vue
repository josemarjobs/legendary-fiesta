<template>
  <div class="posts space-y-6">
    <div
      class="bg-white rounded-sm shadow-sm p-4 flex space-x-5 items-start"
      v-for="post in posts"
      :key="post.id"
    >
      <div
        v-if="userById(post.userId)"
        id="user-indo"
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

        <p
          class="
            text-xs
            font-semibold
            flex flex-col
            items-center
            justify-center
          "
        >
          <span>{{ userById(post.userId).postsCount }} posts</span>
          <span>{{ userById(post.userId).threadsCount }} threads</span>
        </p>
      </div>

      <div class="flex flex-col w-full flex-1">
        <div class="post-content relative">
          <div class="mr-7" v-if="editing == post.id">
            <post-editor :post="post" @save="handleUpdate" />
          </div>
          <p v-else class="break-all mr-6">{{ post.text }}</p>

          <button
            v-if="post.userId === $store.state.authId"
            class="absolute top-0 right-0 p-0 hover:text-emerald-300"
            title="Make a change"
            @click.prevent="toggleEditMode(post.id)"
          >
            <svg
              v-if="editing !== post.id"
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>

            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>

        <div
          class="
            post-date
            self-end
            text-sm text-gray-400
            mt-4
            flex flex-col
            items-end
          "
        >
          <div v-if="post.edited?.at" class="edit-info">edited</div>
          <app-date :timestamp="post.publishedAt" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import PostEditor from "./PostEditor.vue";
export default {
  components: { PostEditor },
  name: "PostList",
  props: {
    posts: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      editing: null,
    };
  },
  computed: {
    threads() {
      return this.$store.state.threads;
    },
    users() {
      return this.$store.state.users;
    },
  },
  methods: {
    ...mapActions(["updatePost"]),
    userById(userId) {
      return this.$store.getters.user(userId);
    },
    toggleEditMode(id) {
      this.editing = id === this.editing ? null : id;
    },
    async handleUpdate({ post }) {
      await this.updatePost(post);
      this.editing = null;
    },
  },
};
</script>

<style>
</style>