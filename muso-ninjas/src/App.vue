<template>
  <navbar />
  <div class="content mx-auto max-w-7xl">
    <router-view />
  </div>
</template>
<script>
import Navbar from "./components/Navbar.vue";
export default {
  components: { Navbar },
  setup() {},
};
</script>
<style>
</style>
