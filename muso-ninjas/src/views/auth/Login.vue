<template>
  <div class="bg-white my-24 p-12 mx-auto rounded-lg shadow-lg md:max-w-2xl">
    <form class="space-y-10" @submit.prevent="handleSubmit">
      <h3 class="text-primary text-2xl font-semibold">Login</h3>
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
        Login
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
        Don't have an account yet?
        <router-link :to="{ name: 'Signup' }" class="text-indigo-500">
          Sign up here
        </router-link>
      </p>
    </form>
  </div>
</template>

<script>
import useLogin from "@/composables/useLogin";
import { ref } from "vue";
import { useRouter } from "vue-router";
export default {
  setup() {
    const { error, isPending, login } = useLogin();
    const email = ref("");
    const password = ref("");
    const router = useRouter();

    const handleSubmit = async () => {
      const res = await login(email.value, password.value);
      if (!error.value) {
        router.push({ name: "UserPlaylists" });
      }
    };
    return { email, password, isPending, error, handleSubmit };
  },
};
</script>

<style>
</style>