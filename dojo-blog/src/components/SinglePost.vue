<template>
  <div class="post">
    <router-link :to="{ name: 'Details', params: { id: post.id } }">
      <h3>{{ post.title }}</h3>
    </router-link>
    <p>{{ snippet }}</p>
    <p>
      <router-link
        v-for="tag in post.tags"
        :key="tag"
        :to="{ name: 'Tag', params: { tag: tag } }"
      >
        <span> #{{ tag }}</span>
      </router-link>
    </p>
  </div>
</template>

<script>
import { computed } from "vue";

export default {
  props: ["post"],
  setup(props) {
    const snippet = computed(() => {
      return props.post.body.substring(0, 50) + "...";
    });
    return { snippet };
  },
};
</script>

<style>
</style>