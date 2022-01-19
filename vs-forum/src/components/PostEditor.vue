<template>
  <div class="bg-reg-500 mt-4 p-4">
    <form @submit.prevent="save" class="space-y-4 flex flex-col md:items-end">
      <textarea
        class="w-full border border-gray-300 rounded-md resize-none p-4"
        v-model="postCopy.text"
        name=""
        id=""
        rows="5"
      ></textarea>
      <button class="block px-5 py-3 rounded-md bg-indigo-600 text-white">
        {{ post.id ? "Update Post" : "Submit Post" }}
      </button>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      default: () => ({ text: null }),
    },
  },
  data() {
    return {
      postCopy: { ...this.post },
    };
  },
  methods: {
    save() {
      this.$emit("save", { post: this.postCopy });
      this.postCopy.text = "";
    },
  },
};
</script>

<style>
</style>