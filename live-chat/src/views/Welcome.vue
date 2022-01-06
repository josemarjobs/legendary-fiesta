<template>
  <div class="p-10">
    <div v-if="showLogin">
      <h2 class="text-3xl text-center font-semibold mb-8 text-indigo-800">
        Login
      </h2>
      <login-form @login="enterChat" />
      <p class="w-1/2 mx-auto mt-8">
        Don't have an account?
        <a href="#" @click.prevent="showLogin = false" class="text-indigo-500">
          Create an account
        </a>
      </p>
    </div>
    <div v-else>
      <h2 class="text-3xl text-center font-semibold mb-8 text-indigo-800">
        Sign up
      </h2>
      <signup-form @signup="enterChat" />
      <p class="w-full max-w-7xl mx-auto mt-8">
        Already have an account?
        <a href="#" @click.prevent="showLogin = true" class="text-indigo-500">
          Login
        </a>
      </p>
    </div>
  </div>
</template>

<script>
import LoginForm from "../components/LoginForm.vue";
import SignupForm from "../components/SignupForm.vue";
import { ref, vModelDynamic } from "vue";
import { useRouter } from "vue-router";
export default {
  components: { SignupForm, LoginForm },

  setup() {
    const showLogin = ref(true);
    const router = useRouter();
    const enterChat = () => {
      router.push({ name: "ChatRoom" });
    };

    return { showLogin, enterChat };
  },
};
</script>

<style>
</style>