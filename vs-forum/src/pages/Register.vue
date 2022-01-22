<template>
  <div
    class="
      register
      bg-white
      border border-gray-100
      rounded-md
      mt-4
      mb-4
      p-4
      md:mt-10 md:py-20 md:flex md:flex-col md:justify-center md:items-stretch
    "
  >
    <form class="space-y-4 w-1/2 max-w-2xl mx-auto" @submit.prevent="register">
      <h2 class="text-2xl font-bold">Register</h2>
      <div class="flex flex-col">
        <label>Full Name</label>
        <input
          class="border border-gray-300 py-2 px-3 rounded-md"
          type="text"
          v-model="form.name"
        />
      </div>
      <div class="flex flex-col">
        <label>Username</label>
        <input
          class="border border-gray-300 py-2 px-3 rounded-md"
          type="text"
          v-model="form.username"
        />
      </div>
      <div class="flex flex-col">
        <label>Email</label>
        <input
          class="border border-gray-300 py-2 px-3 rounded-md"
          type="text"
          v-model="form.email"
        />
      </div>
      <div class="flex flex-col">
        <label class="block">Password</label>
        <input
          class="border border-gray-300 py-2 px-3 rounded-md w-full"
          type="password"
          placeholder="Password"
          v-model="form.password"
        />
      </div>
      <div class="flex flex-col">
        <label>Avatar</label>
        <input
          class="border border-gray-300 py-2 px-3 rounded-md"
          type="text"
          v-model="form.avatar"
        />
      </div>
      <div class="flex flex-col">
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
          Register
        </button>
      </div>
      <div class="flex flex-col items-end">
        <router-link
          class="transition text-emerald-700 hover:text-emerald-500"
          :to="{ name: 'Login' }"
          >Login</router-link
        >
      </div>
    </form>
  </div>
  <div class="grid place-items-center">
    <button
      @click.prevent="registerWithGoogle"
      class="px-4 py-1 rounded-md text-sm bg-red-600 text-white"
    >
      Sign up with Google
    </button>
  </div>
</template>

<script>
import asyncDataStatus from "../mixin/asyncDataStatus";

export default {
  mixins: [asyncDataStatus],

  data() {
    return {
      form: {
        name: "",
        username: "",
        email: "",
        password: "",
        avatar: "",
      },
    };
  },
  created() {
    this.asyncDataStatus_fetched();
  },
  methods: {
    async register() {
      console.log("Register: ", this.form);
      const user = await this.$store.dispatch(
        "registerUserWithEmailAndPassword",
        this.form
      );
      console.log("New user: ", user);
      this.$router.push("/");
    },
    async registerWithGoogle() {
      const user = await this.$store.dispatch("signInWithGoogle");
      console.log("new user:", user);
      this.$router.push("/");
    },
  },
};
</script>

<style>
</style>