<template>
  <div class="create-thread p-8 md:px-0" v-if="thread && asyncDataStatus_ready">
    <h1 class="text-3xl font-light mb-8">
      Editing in
      <span class="italic font-medium">{{ thread.title }}</span>
    </h1>

    <thread-editor
      :title="thread.title"
      :text="text"
      @save="save"
      @cancel="cancel"
    />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import ThreadEditor from "../components/ThreadEditor.vue";
import { findById } from "../helpers";
import asyncDataStatus from "../mixin/asyncDataStatus";
export default {
  components: { ThreadEditor },
  mixins: [asyncDataStatus],
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  computed: {
    thread() {
      return findById(this.$store.state.threads, this.id);
    },
    text() {
      const post = this.thread
        ? findById(this.$store.state.posts, this.thread.posts[0])
        : null;
      return post ? post.text : null;
    },
  },
  methods: {
    ...mapActions(["updateThread", "fetchThread", "fetchPost"]),
    async save({ title, text }) {
      const thread = await this.updateThread({
        id: this.id,
        text,
        title,
      });

      this.$router.push({ name: "ThreadShow", params: { id: thread.id } });
    },
    cancel() {
      this.$router.push({ name: "ThreadShow", params: { id: this.id } });
    },
  },
  async created() {
    const thread = await this.fetchThread({ id: this.id });
    await this.fetchPost({ id: thread.posts[0] });
    this.asyncDataStatus_fetched();
  },
};
</script>

<style>
</style>