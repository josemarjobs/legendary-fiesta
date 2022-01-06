<template>
  <h1>Realtime data</h1>
  <post-list :posts="posts" />
</template>

<script>
import { ref } from "vue";
import { projectFirestore } from "../firebase/config";
import PostList from "../components/PostList.vue";
export default {
  components: { PostList },
  setup() {
    const posts = ref([]);
    projectFirestore
      .collection("posts")
      .orderBy("createdAt", "desc")
      .onSnapshot((snap) => {
        console.log(snap);
        posts.value = snap.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      });

    return { posts };
  },
};
</script>

<style>
</style>