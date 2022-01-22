<template>
  <div class="home"></div>
</template>

<script>
import { useStore } from "vuex";
export default {
  name: "Home",
  setup() {
    const store = useStore();
  },
};
</script>
