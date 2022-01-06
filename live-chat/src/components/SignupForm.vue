<template>
  <div class="signup w-full max-w-7xl mx-auto">
    <form @submit.prevent="handleSubmit" class="space-y-8 flex flex-col">
      <input
        class="
          w-full
          border border-gray-300
          px-3
          py-2
          rounded-lg
          shadow-sm
          focus:outline-none
          focus:border-indigo-400
          focus:ring-1
          focus:ring-indigo-500
        "
        type="text"
        required
        placeholder="Display name"
        v-model="displayName"
      />
      <input
        class="
          w-full
          border border-gray-300
          px-3
          py-2
          rounded-lg
          shadow-sm
          focus:outline-none
          focus:border-indigo-400
          focus:ring-1
          focus:ring-indigo-500
        "
        type="email"
        required
        placeholder="Email"
        v-model="email"
      />
      <input
        class="
          w-full
          border border-gray-300
          px-3
          py-2
          rounded-lg
          shadow-sm
          focus:outline-none
          focus:border-indigo-400
          focus:ring-1
          focus:ring-indigo-500
        "
        type="password"
        required
        placeholder="Password"
        v-model="password"
      />

      <div
        v-if="error"
        class="error text-sm text-red-600 bg-red-50 py-2 px-3 rounded-lg"
      >
        {{ error }}
      </div>
      <button
        class="
          bg-indigo-500
          px-6
          py-3
          rounded-lg
          shadow-sm
          text-white
          uppercase
          tracking-wide
          w-full
        "
      >
        Sign up
      </button>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import useSignup from "../composables/useSignup";

export default {
  setup(props, context) {
    const { error, signup } = useSignup();
    const displayName = ref("");
    const email = ref("");
    const password = ref("");

    const handleSubmit = async () => {
      const res = await signup(email.value, password.value, displayName.value);
      if (!error.value) {
        context.emit("signup");
      }
    };

    return { displayName, email, password, handleSubmit, error };
  },
};
</script>

<style>
</style>