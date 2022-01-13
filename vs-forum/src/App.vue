<template>
  <div class="w-full bg-emerald-800">
    <the-navbar />
  </div>
  <div class="w-full md:max-w-4xl lg:max-w-5xl mx-auto text-gray-600">
    <router-view />
  </div>
</template>

<script>
import TheNavbar from "./components/TheNavbar.vue";

export default {
  components: { TheNavbar },
  name: "App",
};
</script>

<style>
</style>
