<template>
  <div
    class="
      p-4
      md:p-12 md:max-w-3xl
      mx-auto
      bg-white
      mt-8
      md:mt-24
      rounded-md
      shadow-sm
    "
  >
    <form class="space-y-5" @submit.prevent="handleSubmit">
      <h4 class="text-2xl text-primary">Create New Playlist</h4>
      <input
        type="text"
        required
        placeholder="Playlist title"
        v-model="title"
        class="block py-2 px-1 border-b-2 w-full border-gray-200 outline-none"
      />

      <textarea
        rows="2"
        required
        placeholder="Playlist description..."
        v-model="description"
        class="
          block
          py-2
          px-1
          border-b-2
          w-full
          border-gray-200
          outline-none
          resize-none
        "
      ></textarea>

      <div>
        <label class="text-gray-400">Upload playlist cover image </label>
        <input type="file" class="block" @change="handleFileChange" />
      </div>

      <div v-if="error" class="bg-red-100 text-warning p-2 rounded-md">
        {{ error }}
      </div>
      <button
        v-if="!isPending"
        class="
          bg-secondary
          py-2
          px-4
          rounded-md
          text-primary
          hover:bg-primary hover:text-secondary
        "
      >
        Create
      </button>
      <button
        v-if="isPending"
        disabled
        class="
          bg-secondary
          cursor-not-allowed
          py-2
          px-4
          rounded-md
          text-primary
        "
      >
        Creating...
      </button>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import useStorage from "../../composables/useStorage";
import useCollection from "../../composables/useCollection";
import getUser from "../../composables/getUser";
import { timestamp } from "../../firebase/config";

export default {
  setup() {
    const { url, filePath, uploadImage } = useStorage();
    const { error, addDoc } = useCollection("playlists");
    const { user } = getUser();

    const isPending = ref(false);
    const title = ref("");
    const description = ref("");
    const file = ref(null);
    const fileError = ref(null);

    const handleSubmit = async () => {
      if (file.value) {
        isPending.value = true;
        await uploadImage(file.value);
        console.log("image uploaded", url.value, filePath.value);
        await addDoc({
          title: title.value,
          description: description.value,
          userId: user.value.uid,
          userName: user.value.displayName,
          coverUrl: url.value,
          filePath: filePath.value,
          songs: [],
          createdAt: timestamp(),
        });
        if (!error.value) {
          console.log("playlist created");
        }
        isPending.value = false;
      }
    };

    // allowed file types
    const allowedTypes = ["image/png", "image/jpg", "image/jpeg"];
    const handleFileChange = (e) => {
      const selectedFile = e.target.files[0];
      if (selectedFile && allowedTypes.includes(selectedFile.type)) {
        file.value = selectedFile;
        fileError.value = null;
      } else {
        file.value = null;
        fileError.value = "Please select an image file (png, jpg or jpeg).";
      }
    };

    return {
      title,
      description,
      handleSubmit,
      error: fileError == null ? error : fileError,
      handleFileChange,
      isPending,
    };
  },
};
</script>

<style>
</style>