<template>
  <div class="login w-full max-w-7xl mx-auto">
    <form
      @submit.prevent="handleSubmit"
      class="space-y-8 flex flex-col justify-between items-center"
    >
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
          w-full
          rounded-lg
          shadow-sm
          text-white
          uppercase
          tracking-wide
        "
      >
        Log in
      </button>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import useLogin from "../composables/useLogin";

export default {
  setup(props, context) {
    const { error, login } = useLogin();
    const email = ref("");
    const password = ref("");

    const handleSubmit = async () => {
      const result = await login(email.value, password.value);
      if (!error.value) {
        context.emit("login");
      }
    };

    return { email, password, handleSubmit, error };
  },
};
</script>

<style>
</style>