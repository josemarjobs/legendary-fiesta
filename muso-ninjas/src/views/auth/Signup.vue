<template>
  <div class="bg-white my-24 p-12 mx-auto rounded-lg shadow-lg md:max-w-2xl">
    <form class="space-y-10" @submit.prevent="handleSubmit">
      <h3 class="text-primary text-2xl font-semibold">Signup</h3>
      <input
        type="text"
        placeholder="Display name"
        v-model="displayName"
        class="block py-2 px-1 border-b-2 w-full border-gray-200 outline-none"
      />
      <input
        type="email"
        placeholder="Email"
        v-model="email"
        class="block py-2 px-1 border-b-2 w-full border-gray-200 outline-none"
      />
      <input
        type="password"
        placeholder="Password"
        v-model="password"
        class="block py-2 px-1 border-b-2 w-full border-gray-200 outline-none"
      />

      <button
        v-if="!isPending"
        class="
          bg-secondary
          py-2
          px-4
          rounded-md
          text-primary
          hover:bg-primary hover:text-secondary
        "
      >
        Signup
      </button>
      <button
        v-if="isPending"
        disabled
        class="bg-secondary py-2 px-4 rounded-md text-primary"
      >
        Loading...
      </button>

      <p v-if="error" class="text-warning bg-red-100 p-2 rounded-md">
        {{ error }}
      </p>
      <p>
        Already have an account?
        <router-link :to="{ name: 'Login' }" class="text-indigo-500">
          Login here
        </router-link>
      </p>
    </form>
  </div>
</template>

<script>
import useSignup from "@/composables/useSignup";
import { ref } from "vue";

export default {
  setup() {
    const { error, isPending, signup } = useSignup();
    const email = ref("");
    const displayName = ref("");
    const password = ref("");

    const handleSubmit = async () => {
      const res = await signup(email.value, password.value, displayName.value);
      if (!error.value) {
        console.log("user signed up in", res);
      }
    };
    return { displayName, email, password, isPending, error, handleSubmit };
  },
};
</script>

<style>
</style>