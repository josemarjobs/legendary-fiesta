<template>
  <form @submit.prevent="save" class="space-y-6">
    <div class="flex flex-col">
      <label>Title</label>
      <input
        class="border border-gray-300 py-2 px-3 rounded-md"
        type="text"
        v-model="forum.title"
      />
    </div>
    <div class="flex flex-col">
      <label>Content</label>
      <textarea
        class="border border-gray-300 py-2 px-3 rounded-md"
        rows="5"
        v-model="forum.text"
      ></textarea>
    </div>
    <div class="flex justify-between items-center pt-2">
      <a
        href="#"
        @click.prevent="cancel"
        class="
          px-5
          rounded-md
          py-3
          text-emerald-700
          hover:text-white hover:bg-emerald-400
        "
      >
        Cancel
      </a>
      <button
        type="submit"
        class="
          px-5
          rounded-md
          py-3
          bg-emerald-700
          text-white
          hover:bg-emerald-800
        "
      >
        <span v-if="existing">Update</span>
        <span v-else>Publish</span>
      </button>
    </div>
  </form>
</template>

<script>
export default {
  props: {
    title: { type: String, default: "" },
    text: { type: String, default: "" },
  },
  data() {
    return {
      forum: {
        title: this.title,
        text: this.text,
      },
    };
  },
  computed: {
    existing() {
      return !!this.title;
    },
  },
  methods: {
    save() {
      this.$emit("save", { ...this.forum });
    },
    cancel() {
      this.$emit("cancel");
    },
  },
};
</script>

<style>
</style>