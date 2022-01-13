<template>
  <div class="create-thread p-8 md:px-0">
    <h1 class="text-3xl font-light mb-8">
      Create a new thread in
      <span class="italic font-medium">{{ forum.name }}</span>
    </h1>

    <thread-editor @save="save" @cancel="cancel" />
  </div>
</template>

<script>
import ThreadEditor from "../components/ThreadEditor.vue";
export default {
  components: { ThreadEditor },
  props: {
    forumId: {
      type: String,
      required: true,
    },
  },
  computed: {
    forum() {
      return this.$store.state.forums.find((f) => f.id === this.forumId);
    },
  },
  methods: {
    async save({ title, text }) {
      const thread = await this.$store.dispatch("createThread", {
        forumId: this.forum.id,
        text,
        title,
      });

      this.$router.push({ name: "ThreadShow", params: { id: thread.id } });
    },
    cancel() {
      this.$router.push({ name: "ForumShow", params: { id: this.forum.id } });
    },
  },
};
</script>

<style>
</style>