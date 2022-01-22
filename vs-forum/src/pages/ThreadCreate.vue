<template>
  <div class="create-thread p-8 md:px-0" v-if="forum && asyncDataStatus_ready">
    <h1 class="text-3xl font-light mb-8">
      Create a new thread in
      <span class="italic font-medium">{{ forum.name }}</span>
    </h1>

    <thread-editor
      @save="save"
      @cancel="cancel"
      @dirty="formIsDirty = true"
      @clean="formIsDirty = false"
    />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import ThreadEditor from "../components/ThreadEditor.vue";
import asyncDataStatus from "../mixin/asyncDataStatus";
export default {
  components: { ThreadEditor },
  mixins: [asyncDataStatus],
  props: {
    forumId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      formIsDirty: false,
    };
  },
  computed: {
    forum() {
      return this.$store.state.forums.find((f) => f.id === this.forumId);
    },
  },
  methods: {
    ...mapActions(["createThread", "fetchForum"]),
    async save({ title, text }) {
      const thread = await this.createThread({
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

  async created() {
    await this.fetchForum({ id: this.forumId });
    this.asyncDataStatus_fetched();
  },
  beforeRouteLeave() {
    console.log("Form is dirty", this.formIsDirty);
    if (!this.formIsDirty) return;

    const confirmed = window.confirm(
      "Are you sure you want to leave? Unsaved changes will be lost!"
    );
    if (!confirmed) return false;
  },
};
</script>

<style>
</style>