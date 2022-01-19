<template>
  <div class="home" v-if="asyncDataStatus_ready">
    <h1 class="text-3xl font-bold text-center mb-4 mt-10">
      Welcome to the Forum
    </h1>
    <category-list :categories="categories" />
  </div>
  <div class="h-screen flex items-center justify-center" v-else>
    <h1 class="text-center text-2xl">Loading...</h1>
  </div>
</template>

<script>
import CategoryList from "../components/CategoryList.vue";
import asyncDataStatus from "../mixin/asyncDataStatus";

import { mapActions } from "vuex";

export default {
  components: { CategoryList },
  mixins: [asyncDataStatus],

  computed: {
    categories() {
      return this.$store.state.categories;
    },
  },
  methods: {
    ...mapActions(["fetchAllCategories", "fetchForums"]),
  },
  async created() {
    const categories = await this.fetchAllCategories();
    const forumIds = categories.map((c) => c.forums).flat();
    await this.fetchForums({ ids: forumIds });
    this.asyncDataStatus_fetched();
  },
};
</script>

<style>
</style>