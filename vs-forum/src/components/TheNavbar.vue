<template>
  <div
    class="
      navbar
      md:max-w-4xl
      lg:max-w-5xl
      mr-4
      md:mx-auto
      h-24
      text-white
      flex
      items-center
      justify-between
      font-semibold
    "
  >
    <div class="space-x-6 flex items-center">
      <router-link
        class="hover:text-emerald-200 hidden md:inline"
        :to="{ name: 'PageHome' }"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-10 w-10 hover:text-emerald-200"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M12 14l9-5-9-5-9 5 9 5z" />
          <path
            d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
          />
        </svg>
      </router-link>
      <router-link
        class="hover:text-emerald-200 p-x"
        :to="{ name: 'PageHome' }"
      >
        Home
      </router-link>
      <router-link
        class="hover:text-emerald-200 p-x"
        :to="{ name: 'PageHome' }"
      >
        Categories
      </router-link>
      <router-link
        class="hover:text-emerald-200 p-x"
        :to="{ name: 'PageHome' }"
      >
        Forums
      </router-link>
      <router-link
        class="hover:text-emerald-200 p-x"
        :to="{ name: 'PageHome' }"
      >
        Threads
      </router-link>
    </div>
    <div class="flex items-center relative" v-if="authUser">
      <div
        v-show="menuActive"
        class="
          transition-all
          popup
          absolute
          top-12
          right-0
          py-4
          px-6
          space-y-2
          bg-white
          flex flex-col
        "
      >
        <router-link
          @click="menuActive = !menuActive"
          :to="{ name: 'Profile' }"
          class="text-emerald-600 transition hover:text-emerald-400"
        >
          View Profile
        </router-link>
        <a
          href="#"
          class="text-emerald-600 transition hover:text-emerald-400"
          @click.prevent="signOut"
        >
          Sign out
        </a>
      </div>
      <a
        href="#"
        @click.prevent="menuActive = !menuActive"
        class="flex items-center hover:text-emerald-200"
      >
        <img
          class="w-10 h-10 object-cover object-center rounded-full mr-4"
          :src="authUser.avatar"
          :alt="authUser.name"
        />
        <span>{{ authUser.name }}</span>
        <svg
          v-if="menuActive"
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 ml-1 mt-1"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
            clip-rule="evenodd"
          />
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 ml-1 mt-1"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </a>
    </div>
    <div v-if="!authUser">
      <router-link
        :to="{ name: 'Login' }"
        class="ml-8 px-4 py-2 bg-emerald-900 rounded-md"
      >
        Login
      </router-link>
      <router-link
        :to="{ name: 'Register' }"
        class="ml-8 px-4 py-2 bg-emerald-900 rounded-md"
      >
        Register
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      menuActive: false,
    };
  },
  computed: {
    ...mapGetters(["authUser"]),
  },
  methods: {
    signOut() {
      this.menuActive = false;
      this.$store.dispatch("signOut");
      this.$router.push({ name: "Login" });
    },
  },
};
</script>

<style>
</style>