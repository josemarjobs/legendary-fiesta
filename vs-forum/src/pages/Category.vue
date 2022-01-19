<template>
  <div class="category" v-if="asyncDataStatus_ready">
    <forum-list
      :title="category.name"
      :forums="getForumsForCategory(category)"
    />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import ForumList from "../components/ForumList.vue";
import asyncDataStatus from "../mixin/asyncDataStatus";
export default {
  components: { ForumList },
  mixins: [asyncDataStatus],
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
    ...mapActions(["fetchCategory", "fetchForums"]),
    getForumsForCategory(category) {
      return this.$store.state.forums.filter(
        (f) => f.categoryId === category.id
      );
    },
  },
  async created() {
    const category = await this.fetchCategory({ id: this.id });
    await this.fetchForums({ ids: category.forums });
    this.asyncDataStatus_fetched();
  },
};
</script>

<style>
</style>