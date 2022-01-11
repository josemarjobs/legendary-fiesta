<template>
  <div class="not-found h-screen flex flex-col items-center justify-center">
    <h1 class="text-3xl font-black">This page was not Found</h1>
    <router-link class="text-green-500 mt-8 text-xl" :to="{ name: 'PageHome' }">
      Read some threads here
    </router-link>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>