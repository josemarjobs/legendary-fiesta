<template>
  <div class="home">
    <h1 class="text-3xl font-bold text-center mb-4 mt-10">
      Welcome to the Forum
    </h1>
    <category-list :categories="categories" />
  </div>
</template>

<script>
import CategoryList from "../components/CategoryList.vue";
export default {
  components: { CategoryList },
  data() {
    return {
      categories: this.$store.state.categories,
    };
  },
};
</script>

<style>
</style>