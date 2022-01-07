<template>
  <div class="p-4 md:p-8 my-4">
    <div v-if="error" class="bg-red-100 text-warning p-2 rounded-md">
      {{ error }}
    </div>

    <list-view v-if="documents" :playlists="documents"></list-view>
  </div>
</template>

<script>
import ListView from "../components/ListView.vue";
import getCollection from "../composables/getCollection";
export default {
  components: { ListView },
  setup() {
    const { error, documents } = getCollection("playlists");

    return { error, documents };
  },
};
</script>
