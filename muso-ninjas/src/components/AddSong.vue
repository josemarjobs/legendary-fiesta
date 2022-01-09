<template>
  <button
    v-if="!showForm"
    class="
      mx-auto
      md:ml-0
      flex
      items-center
      space-x-2
      text-lg
      font-semibold
      mt-4
      bg-indigo-800
      text-white
      hover:text-primary hover:bg-secondary
      px-3
      py-1
      rounded-md
    "
    @click="showForm = !showForm"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-5 w-5"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fill-rule="evenodd"
        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
        clip-rule="evenodd"
      />
    </svg>
    Add Song
  </button>
  <div
    v-if="showForm"
    class="bg-white mt-12 p-10 mx-auto rounded-lg shadow-sm w-full relative"
  >
    <button
      @click="showForm = false"
      class="
        close-form
        p-2
        hover:text-primary hover:bg-secondary
        absolute
        right-3
        top-3
        rounded-md
      "
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
    <form class="space-y-6" @submit.prevent="handleAddSong">
      <h4 class="font-bold text-2xl">Add a new song</h4>
      <input
        class="block py-2 px-1 border-b-2 w-full border-gray-200 outline-none"
        type="text"
        placeholder="Song title"
        required
        v-model="title"
      />
      <input
        class="block py-2 px-1 border-b-2 w-full border-gray-200 outline-none"
        type="text"
        placeholder="Artist"
        required
        v-model="artist"
      />
      <button
        class="
          bg-secondary
          py-2
          px-4
          rounded-md
          text-primary
          hover:bg-primary hover:text-secondary
        "
        :disabled="isPending"
      >
        <span v-if="!isPending">Add</span>
        <span v-else>Adding...</span>
      </button>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import { uid } from "uid";
import useDocument from "../composables/useDocument";

export default {
  props: ["playlist"],
  setup(props) {
    const title = ref("");
    const artist = ref("");
    const isPending = ref(false);
    const showForm = ref(false);
    const { updateDoc } = useDocument("playlists", props.playlist.id);

    const handleAddSong = async () => {
      isPending.value = true;

      const newSong = {
        id: uid(),
        title: title.value,
        artist: artist.value,
      };
      await updateDoc({ songs: [...props.playlist.songs, newSong] });

      title.value = "";
      artist.value = "";
      isPending.value = false;
      console.table(newSong);
    };
    return { title, artist, isPending, showForm, handleAddSong };
  },
};
</script>

<style>
</style>