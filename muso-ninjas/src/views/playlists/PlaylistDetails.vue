<template>
  <div class="p-4 md:pt-20">
    <div
      v-if="error && !pending.playlist && !pending.song"
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
            v-if="ownership"
            class="
              mt-4
              px-3
              py-2
              bg-secondary
              text-primary
              rounded-md
              hover:bg-primary hover:text-white
            "
            :class="{ 'cursor-not-allowed': pending.playlist }"
            @click="handleDelete"
            :disabled="pending.playlist"
          >
            <span v-if="!pending.playlist">Delete Playlist</span>
            <span v-else>Deleting Playlist...</span>
          </button>
        </div>
      </div>

      <!-- song list -->
      <div class="song-list text-center md:text-left w-full flex-1">
        <div v-if="!playlist.songs.length" class="text-lg text-gray-400 italic">
          No songs have been added to this playlist
        </div>
        <div class="songs">
          <div
            class="
              hover:bg-white
              song
              border-b-2 border-gray-100
              p-4
              flex
              justify-between
              items-center
            "
            v-for="song in playlist.songs"
            :key="song.id"
          >
            <div class="details">
              <h3 class="text-xl font-semibold">{{ song.title }}</h3>
              <p class="text-gray-400 font-semibold italic">
                {{ song.artist }}
              </p>
            </div>
            <button
              @click="deleteSong(song.id)"
              v-if="ownership"
              class="
                mt-4
                px-3
                py-2
                bg-secondary
                text-primary
                rounded-md
                hover:bg-primary hover:text-white
              "
              :class="{ 'cursor-not-allowed': pending[song.id] }"
              :disabled="pending[song.id]"
            >
              <span v-if="!pending[song.id]">Delete</span>
              <span v-else>Deleting song...</span>
            </button>
          </div>
        </div>
        <add-song v-if="ownership" :playlist="playlist" />
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
import AddSong from "../../components/AddSong.vue";

export default {
  components: { AddSong },
  props: ["id"],

  setup(props) {
    const { error, document: playlist } = getDocument("playlists", props.id);
    const { deleteImage } = useStorage();
    const { user } = getUser();
    const {
      error: deleteError,
      deleteDoc,
      updateDoc,
    } = useDocument("playlists", props.id);
    const pending = ref({ playlist: false });
    const router = useRouter();

    const ownership = computed(() => {
      return (
        playlist.value && user.value && playlist.value.userId == user.value.uid
      );
    });

    const handleDelete = async () => {
      pending.value.playlist = true;
      await deleteDoc();
      await deleteImage(playlist.value.filePath);
      pending.value.playlist = false;
      if (!deleteError.value) {
        router.push({ name: "Home" });
      }
    };

    const deleteSong = async (id) => {
      pending.value[id] = true;
      const songs = playlist.value.songs.filter((s) => s.id !== id);
      await updateDoc({ songs });
      pending.value[id] = false;
    };
    return { error, playlist, ownership, handleDelete, pending, deleteSong };
  },
};
</script>

<style>
</style>

