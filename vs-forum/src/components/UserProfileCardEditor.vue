<template>
  <div class="shadow-sm rounded-md bg-white p-4">
    <img
      class="rounded-full mx-auto mb-2 p-8"
      :src="user.avatar"
      :alt="user.name"
    />
    <form class="flex flex-col space-y-3" @submit.prevent="save">
      <input
        v-model="activeUser.username"
        class="border border-gray-300 p-2 rounded-md"
        type="text"
        placeholder="Username"
      />
      <input
        v-model="activeUser.name"
        type="text"
        class="border border-gray-300 p-2 rounded-md"
        placeholder="Full Name"
      />
      <div class="flex flex-col">
        <label>Bio</label>
        <textarea
          v-model="activeUser.bio"
          rows="4"
          class="border border-gray-300 p-2 rounded-md"
        ></textarea>
      </div>
      <div
        class="
          stats
          flex
          items-center
          justify-center
          space-x-6
          font-light
          text-2xl
          pt-3
        "
      >
        <span>{{ user.postsCount }} posts</span>
        <span>{{ user.threadsCount }} threads </span>
      </div>

      <div class="flex flex-col">
        <label>Website</label>
        <input class="border border-gray-300 p-2 rounded-md" type="text" />
      </div>
      <div class="flex flex-col">
        <label>Email</label>
        <input class="border border-gray-300 p-2 rounded-md" type="text" />
      </div>
      <div class="flex flex-col">
        <label>Location</label>
        <input class="border border-gray-300 p-2 rounded-md" type="text" />
      </div>
      <div class="flex justify-between items-center pt-2">
        <a
          @click.prevent="cancel"
          class="
            px-5
            rounded-md
            py-3
            text-emerald-700
            hover:text-white hover:bg-emerald-700
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
          Save
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeUser: { ...this.user },
    };
  },
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  methods: {
    save() {
      console.log("saving...", this.activeUser);
      this.$store.dispatch("updateUser", { ...this.activeUser });
      this.$router.push({ name: "Profile" });
    },
    cancel() {
      this.$router.push({ name: "Profile" });
    },
  },
};
</script>

<style>
</style>