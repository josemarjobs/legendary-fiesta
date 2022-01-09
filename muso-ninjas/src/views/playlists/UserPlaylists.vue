<template>
  <div class="p-4 md:p-8 my-4">
    <h2 class="text-primary text-2xl font-bold mb-8">My Playlists</h2>
    <list-view v-if="playlists" :playlists="playlists"></list-view>
    <router-link
      :to="{ name: 'CreatePlaylist' }"
      class="
        bg-secondary
        py-2
        px-4
        rounded-md
        text-primary
        hover:bg-primary hover:text-secondary
      "
    >
      Create a new playlist
    </router-link>
  </div>
</template>

<script>
import ListView from "../../components/ListView.vue";
import getCollection from "../../composables/getCollection";
import getUser from "../../composables/getUser";
export default {
  components: { ListView },
  setup() {
    const { user } = getUser();
    const { documents: playlists } = getCollection("playlists", [
      "userId",
      "==",
      user.value.uid,
    ]);

    return { playlists };
  },
};
</script>
