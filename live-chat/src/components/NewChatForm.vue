<template>
  <div class="w-full">
    <form action="#" class="">
      <textarea
        class="w-full resize-none rounded-md py-4 outline-none"
        placeholder="Type a message and hit enter to send..."
        v-model="message"
        @keypress.enter.prevent="handleSubmit"
        rows="1"
      ></textarea>
      <div class="text-sm text-red-400 text-center">{{ error }}</div>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import getUser from "../composables/getUser";
import useCollection from "../composables/useCollection";
import { timestamp } from "../firebase/config";

export default {
  setup() {
    const message = ref("");
    const { user } = getUser();
    const { addDoc, error } = useCollection("messages");

    const handleSubmit = async () => {
      const chat = {
        name: user.value.displayName,
        message: message.value,
        createdAt: timestamp(),
      };
      console.table(chat);
      await addDoc(chat);
      if (!error.value) {
        message.value = "";
      }
    };
    return { message, handleSubmit, error };
  },
};
</script>

<style>
</style>