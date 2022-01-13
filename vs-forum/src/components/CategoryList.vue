<template>
  <div class="categories space-y-8">
    <forum-list
      v-for="category in categories"
      :key="category.id"
      :forums="getForumsForCategory(category)"
      :categoryName="category.name"
      :categoryId="category.id"
    />
  </div>
</template>

<script>
import ForumList from "./ForumList.vue";
export default {
  components: { ForumList },
  props: {
    categories: {
      type: Array,
      required: true,
    },
  },
  methods: {
    getForumsForCategory(category) {
      return this.$store.state.forums.filter(
        (f) => f.categoryId === category.id
      );
    },
  },
};
</script>

<style>
</style>