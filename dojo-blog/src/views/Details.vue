<template>
  <p v-if="error">ERROR: {{ error }}</p>
  <div v-else-if="post" class="post">
    <h3>{{ post.title }}</h3>
    <p>
      <router-link
        v-for="tag in post.tags"
        :key="tag"
        :to="{ name: 'Tag', params: { tag: tag } }"
      >
        <span> #{{ tag }}</span>
      </router-link>
    </p>
    <p>{{ post.body }}</p>
    <button @click="deletePost">Delete Post</button>
  </div>
  <div v-else><spinner /></div>
</template>

<script>
import getPost from "../composables/getPost";
import Spinner from "../components/Spinner.vue";
import { useRouter, useRoute } from "vue-router";
import { projectFirestore } from "../firebase/config";

export default {
  props: ["id"],
  components: { Spinner },
  setup(props) {
    const { post, error, load } = getPost(props.id);
    const route = useRoute();
    const router = useRouter();
    console.log("route.path", route.path);
    console.log("route.fullPath", route.fullPath);
    console.log("route.params", route.params);
    load();
    const deletePost = async () => {
      await projectFirestore.collection("posts").doc(props.id).delete();
      router.push({ name: "Home" });
    };
    return { post, error, deletePost };
  },
};
</script>

<style>
</style>