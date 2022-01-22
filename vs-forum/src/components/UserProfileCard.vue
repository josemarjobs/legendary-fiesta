<template>
  <div class="shadow-sm rounded-md bg-white p-4">
    <img
      class="rounded-full mx-auto mb-2 p-8 object-cover object-center w-80 h-80"
      :src="user.avatar"
      :alt="user.name"
    />
    <h1 class="text-3xl font-bold text-center mb-3 break-words">
      {{ user.username }}
    </h1>
    <p class="text-lg font-medium">{{ user.name }}</p>
    <p class="text-sm">{{ user.bio || "No Bio specified" }}</p>

    <span class="text-xs text-emerald-500">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-4 w-4 inline-block"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M5.636 18.364a9 9 0 010-12.728m12.728 0a9 9 0 010 12.728m-9.9-2.829a5 5 0 010-7.07m7.072 0a5 5 0 010 7.07M13 12a1 1 0 11-2 0 1 1 0 012 0z"
        />
      </svg>
      {{ user.username }} is online</span
    >

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

    <p
      v-if="user.website"
      class="flex items-center justify-center space-x-1 mt-2 mb-1"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-4 w-4"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z"
          clip-rule="evenodd"
        />
      </svg>
      <a class="text-center text-emerald-500" :href="user.website">{{
        user.website
      }}</a>
    </p>
  </div>
  <div class="flex flex-col items-center justify-center space-y-2 mt-4">
    <p class="text-gray-400 text-xs">Member since the dawn of time</p>
    <router-link
      :to="{ name: 'EditProfile' }"
      class="
        px-4
        py-2
        bg-emerald-500
        text-emerald-50
        hover:bg-emerald-700
        rounded-md
        shadow-sm
      "
    >
      Edit Profile
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style>
</style>