<template>
  <div class="category">
    <forum-list
      :title="category.name"
      :forums="getForumsForCategory(category)"
    />
  </div>
</template>

<script>
import ForumList from "../components/ForumList.vue";

export default {
  components: { ForumList },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  computed: {
    category() {
      return this.$store.state.categories.find((c) => c.id === this.id);
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