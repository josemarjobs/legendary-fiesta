<template>
  <div class="bg-reg-500 mt-4 p-4">
    <form @submit.prevent="save" class="space-y-4 flex flex-col md:items-end">
      <textarea
        class="w-full border border-gray-300 rounded-md resize-none p-4"
        v-model="text"
        name=""
        id=""
        rows="5"
      ></textarea>
      <button class="block px-5 py-3 rounded-md bg-indigo-600 text-white">
        Submit Post
      </button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: "",
    };
  },
  methods: {
    save() {
      const postId = "ggg" + Math.random();
      const post = {
        id: postId,
        text: this.text,
        publishedAt: Math.floor(Date.now() / 1000),
        // threadId: this.id,
        userId: "u4r8XCziZEWEXsj2UIKNHBoDh0n2",
      };
      this.$emit("save", { post });
      this.text = "";
    },
  },
};
</script>

<style>
</style>