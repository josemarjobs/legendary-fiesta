<template>
  <div class="w-full bg-emerald-800">
    <the-navbar />
  </div>
  <div class="w-full md:max-w-4xl lg:max-w-5xl mx-auto text-gray-600">
    <router-view v-show="showPage" @ready="onPageReady" />

    <div class="h-screen flex items-center justify-center" v-show="!showPage">
      <app-spinner />
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import TheNavbar from "./components/TheNavbar.vue";
import NProgress from "nprogress";

export default {
  components: { TheNavbar },
  name: "App",
  data() {
    return {
      showPage: false,
    };
  },
  methods: {
    ...mapActions(["fetchAuthUser"]),
    onPageReady() {
      this.showPage = true;
      this.fetchAuthUser();
      NProgress.done();
    },
  },
  async created() {
    this.fetchAuthUser();
    NProgress.configure({
      speed: 400,
      showSpinner: false,
    });

    this.$router.beforeEach(() => {
      this.showPage = false;
      NProgress.start();
    });
  },
};
</script>

<style>
@import "~nprogress/nprogress.css";
#nprogress .bar {
  background-color: #57ad8d !important;
}
</style>
