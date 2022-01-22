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
    <form class="space-y-4 w-1/2 max-w-2xl mx-auto" @submit.prevent="login">
      <h2 class="text-2xl font-bold">Login</h2>
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
        <button
          type="submit"
          class="
            px-5
            rounded-md
            py-3
            bg-emerald-700
            text-white
            hover:bg-emerald-800
            mt-4
          "
        >
          Login
        </button>
      </div>
      <div class="flex flex-col items-end">
        <router-link
          class="transition text-emerald-700 hover:text-emerald-500"
          :to="{ name: 'Register' }"
          >Create Account</router-link
        >
      </div>
      <div v-if="error" class="px-4 py-2 bg-red-300 text-red-900 rounded-md">
        {{ error }}
      </div>
    </form>
  </div>
  <div class="grid place-items-center">
    <button
      @click="loginWithGoogle"
      class="px-4 py-1 rounded-md text-sm bg-red-600 text-white"
    >
      Sign in with Google
    </button>
  </div>
</template>

<script>
import asyncDataStatus from "../mixin/asyncDataStatus";

export default {
  mixins: [asyncDataStatus],

  data() {
    return {
      error: null,
      form: {
        email: "",
        password: "",
      },
    };
  },
  created() {
    this.asyncDataStatus_fetched();
  },
  methods: {
    async login() {
      try {
        this.error = null;
        await this.$store.dispatch("loginWithEmailAndPassword", this.form);
        this.$router.push("/");
      } catch (error) {
        this.error = error.message;
      }
    },
    async loginWithGoogle() {
      const user = await this.$store.dispatch("signInWithGoogle");
      this.$router.push("/");
    },
  },
};
</script>

<style>
</style>