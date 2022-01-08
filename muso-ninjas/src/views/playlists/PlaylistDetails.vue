<template>
  <div class="p-4 md:pt-20">
    <div
      v-if="error && !pending"
      class="bg-red-100 text-warning p-2 rounded-md text-center"
    >
      {{ error }}
    </div>

    <div
      class="
        playlist
        flex flex-col
        md:flex-row
        items-center
        md:items-start
        space-y-12
        md:space-y-0 md:space-x-16
        text-primary
      "
      v-if="playlist"
    >
      <!-- playlist information -->
      <div class="playlist-info text-center">
        <div class="cover">
          <img
            :src="playlist.coverUrl"
            alt=""
            class="
              w-full
              h-64
              sm:h-64 sm:w-full
              md:w-96 md:h-96
              rounded-3xl
              object-cover object-center
            "
          />
        </div>
        <div class="w-full md:w-96">
          <h2 class="font-bold text-3xl pt-8">{{ playlist.title }}</h2>
          <p class="text-gray-400 mt-1">
            Created by
            <span class="font-semibold">{{ playlist.userName }}</span>
          </p>
          <p class="mt-4">
            {{ playlist.description }}
          </p>
          <button
            class="
              mt-4
              px-3
              py-2
              bg-secondary
              text-primary
              rounded-md
              hover:bg-primary hover:text-white
            "
            :class="{ 'cursor-not-allowed': pending }"
            @click="handleDelete"
            :disabled="pending"
          >
            <span v-if="!pending">Delete Playlist</span>
            <span v-else>Deleting Playing...</span>
          </button>
        </div>
      </div>

      <!-- song list -->
      <div class="song-list text-center md:text-left">
        <p>Song list here</p>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import getDocument from "../../composables/getDocument";
import useDocument from "../../composables/useDocument";
import getUser from "../../composables/getUser";
import useStorage from "../../composables/useStorage";

export default {
  props: ["id"],

  setup(props) {
    const { error, document: playlist } = getDocument("playlists", props.id);
    const { deleteImage } = useStorage();
    const { user } = getUser();
    const { error: deleteError, deleteDoc } = useDocument(
      "playlists",
      props.id
    );
    const pending = ref(false);
    const router = useRouter();

    const ownership = computed(() => {
      return (
        playlist.value && user.value && playlist.value.userId == user.value.uid
      );
    });

    const handleDelete = async () => {
      pending.value = true;
      await deleteDoc();
      await deleteImage(playlist.value.filePath);
      pending.value = false;
      if (!deleteError.value) {
        router.push({ name: "Home" });
      }
    };
    return { error, playlist, ownership, handleDelete, pending };
  },
};
</script>

<style>
</style>

