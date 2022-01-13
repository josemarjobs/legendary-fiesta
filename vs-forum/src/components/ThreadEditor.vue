<template>
  <form @submit.prevent="save" class="space-y-6">
    <div class="flex flex-col">
      <label>Title</label>
      <input
        class="border border-gray-300 py-2 px-3 rounded-md"
        type="text"
        v-model="title"
      />
    </div>
    <div class="flex flex-col">
      <label>Content</label>
      <textarea
        class="border border-gray-300 py-2 px-3 rounded-md"
        type="text"
        rows="5"
        v-model="text"
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
        Publish
      </button>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      text: "",
    };
  },
  methods: {
    save() {
      this.$emit("save", { title: this.title, text: this.text });
    },
    cancel() {
      this.$emit("cancel");
    },
  },
};
</script>

<style>
</style>