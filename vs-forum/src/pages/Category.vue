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
import sourceData from "../data.json";

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
      return sourceData.categories.find((c) => c.id === this.id);
    },
  },
  methods: {
    getForumsForCategory(category) {
      return sourceData.forums.filter((f) => f.categoryId === category.id);
    },
  },
};
</script>

<style>
</style>