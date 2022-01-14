<template>
  <div class="create-thread p-8 md:px-0">
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
import ThreadEditor from "../components/ThreadEditor.vue";
export default {
  components: { ThreadEditor },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  computed: {
    thread() {
      return this.$store.state.threads.find((f) => f.id === this.id);
    },
    text() {
      return this.$store.state.posts.find((p) => p.id === this.thread.posts[0])
        .text;
    },
  },
  methods: {
    async save({ title, text }) {
      const thread = await this.$store.dispatch("updateThread", {
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
};
</script>

<style>
</style>