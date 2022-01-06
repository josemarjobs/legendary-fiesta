<template>
  <div
    class="
      max-h-160
      overflow-scroll
      py-4
      border-t border-b border-t-1 border-b-1 border-gray-100
    "
    ref="messages"
  >
    <div v-if="error" class="bg-red-400 text-center py-1 text-white">
      {{ error }}
    </div>
    <div class="space-y-4" v-if="documents">
      <div v-for="doc in formattedDocuments" :key="doc.id">
        <p class="text-xs text-gray-400">{{ doc.createdAt }}</p>
        <span class="text-gray-800 font-semibold mr-2">{{ doc.name }}</span>
        <span class="text-gray-600">{{ doc.message }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import getCollection from "../composables/getCollection";
import { formatDistanceToNow } from "date-fns";
import { computed, onUpdated, ref } from "vue";

export default {
  setup() {
    const { error, documents } = getCollection("messages");

    const formattedDocuments = computed(() => {
      if (!documents.value) return [];
      return documents.value.map((doc) => ({
        ...doc,
        createdAt: formatDistanceToNow(doc.createdAt.toDate()),
      }));
    });

    // auto scroll to bottom ot messages
    const messages = ref(null);
    onUpdated(() => {
      messages.value.scrollTop = messages.value.scrollHeight;
    });

    return { error, documents, formattedDocuments, messages };
  },
};
</script>

<style>
</style>