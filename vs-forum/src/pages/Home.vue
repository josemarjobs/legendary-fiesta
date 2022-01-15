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
  beforeCreate() {
    console.log("before create", this.categories);
  },
  created() {
    console.log("created: good for api calls", this.categories);
  },
  beforeMount() {
    console.log("beforeMount", this.categories);
  },
  mounted() {
    console.log("mounted", this.categories, this.$el);
  },
  beforeUnmount() {
    console.log("beforeUnmount", this.categories, this.$el);
  },
  unmounted() {
    console.log("Unmounted", this.categories, this.$el);
  },
};
</script>

<style>
</style>