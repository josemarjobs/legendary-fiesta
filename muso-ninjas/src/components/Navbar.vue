<template>
  <div class="bg-white px-4 py-6 shadow-sm">
    <nav class="flex justify-between items-center mx-auto max-w-7xl">
      <h1
        class="flex items-center space-x-3 text-2xl uppercase tracking-widest"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
          />
        </svg>
        <router-link :to="{ name: 'Home' }">Muso Ninjas</router-link>
      </h1>

      <div class="space-x-4">
        <div v-if="user" class="flex items-center space-x-4">
          <router-link
            :to="{ name: 'UserPlaylists' }"
            class="flex items-center space-x-2 mr-3 font-semibold"
            >{{ user.displayName }}, my playlists</router-link
          >
          <router-link
            :to="{ name: 'CreatePlaylist' }"
            class="flex items-center space-x-2 font-semibold"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                clip-rule="evenodd"
              />
            </svg>
            Create Playlist
          </router-link>
          <button
            @click.prevent="handleLogout"
            class="
              px-4
              py-2
              bg-secondary
              text-primary
              rounded-md
              hover:text-secondary hover:bg-primary
            "
          >
            Logout
          </button>
        </div>
        <router-link
          v-if="!user"
          class="
            px-4
            py-2
            bg-secondary
            text-primary
            rounded-md
            hover:text-secondary hover:bg-primary
          "
          :to="{ name: 'Signup' }"
          >Sign up</router-link
        >
        <router-link
          v-if="!user"
          class="
            px-4
            py-2
            bg-secondary
            text-primary
            rounded-md
            hover:text-secondary hover:bg-primary
          "
          :to="{ name: 'Login' }"
          >Login</router-link
        >
      </div>
    </nav>
  </div>
</template>

<script>
import useLogout from "../composables/useLogout";
import getUser from "../composables/getUser";

import { useRouter } from "vue-router";

export default {
  setup() {
    const { error, isPending, logout } = useLogout();
    const router = useRouter();
    const { user } = getUser();

    const handleLogout = async () => {
      await logout();
      if (!error.value) {
        router.push({ name: "Login" });
      }
    };

    return { isPending, handleLogout, user };
  },
};
</script>

<style>
</style>