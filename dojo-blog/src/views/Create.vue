<template>
  <div class="create">
    <h2>Create a new post</h2>
    <form @submit.prevent="handleSubmit">
      <label>Title</label>
      <input type="text" required v-model="title" />

      <label>Body</label>
      <textarea required v-model="body"></textarea>

      <label>Tags (hit ENTER to add a tag)</label>
      <input type="text" v-model="tag" @keydown.enter.prevent="handleKeyDown" />
      <p>
        <span v-for="tag in tags" :key="tag">#{{ tag }}&nbsp;</span>
      </p>

      <button>Add post</button>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { projectFirestore, timestamp } from "../firebase/config";

export default {
  setup() {
    const title = ref("");
    const body = ref("");
    const tag = ref("");
    const tags = ref([]);

    const router = useRouter();

    const handleKeyDown = () => {
      if (!tags.value.includes(tag.value.trim())) {
        tags.value.push(tag.value.replace(/\s/g, "")); // remove whitespaces
      }
      tag.value = "";
      console.log("tags:", tags.value);
    };

    const handleSubmit = async () => {
      const post = {
        title: title.value,
        body: body.value,
        tags: tags.value,
        createdAt: timestamp(),
      };

      const res = await projectFirestore.collection("posts").add(post);
      console.log("RES: ", res);

      router.push({ name: "Home" });
    };
    return { title, body, tag, tags, handleKeyDown, handleSubmit };
  },
};
</script>

<style>
form {
  background: white;
  padding: 20px;
  border-radius: 10px;
}
label {
  display: block;
  color: #bbb;
  text-transform: uppercase;
  font-size: 14px;
  font-weight: bold;
  letter-spacing: 1px;
  margin: 20px 0 10px 0;
}
input {
  padding: 10px;
  border: 0;
  border-bottom: 1px solid #ddd;
  width: 100%;
  box-sizing: border-box;
}
textarea {
  border: 1px solid #ddd;
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
  height: 100px;
}
form button {
  display: block;
  margin-top: 20px;
  background: #00ce89;
  color: white;
  padding: 10px;
  border: 0;
  border-radius: 6px;
  font-size: 16px;
  font-weight: bold;
}
</style>