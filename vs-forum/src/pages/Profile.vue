<template>
  <div
    class="
      profile
      grid grid-cols-1
      md:grid-cols-5
      items-start
      gap-y-8
      md:gap-x-4
      mt-8
    "
    v-if="user"
  >
    <div class="profile-card md:col-span-2">
      <user-profile-card v-if="!edit" :user="user" />
      <user-profile-card-editor v-if="edit" :user="user" />
    </div>

    <div class="recent-activity md:col-span-3">
      <div
        class="
          flex
          items-center
          justify-between
          pb-1
          mb-4
          border-b-1 border-b border-gray-200
        "
      >
        <span class="text-xl font-light"
          >{{ user.name }}'s recent activity</span
        >
        <a class="text-green-500 text-sm hover:text-green-700" href="#"
          >See only started threads?</a
        >
      </div>

      <div class="bg-white shadow-sm rounded-md overflow-hidden">
        <post-list :posts="user.posts" />
      </div>
    </div>
  </div>
</template>

<script>
import PostList from "../components/PostList.vue";
import { mapGetters } from "vuex";
import UserProfileCard from "../components/UserProfileCard.vue";
import UserProfileCardEditor from "../components/UserProfileCardEditor.vue";
import asyncDataStatus from "../mixin/asyncDataStatus";

export default {
  components: { PostList, UserProfileCard, UserProfileCardEditor },
  mixins: [asyncDataStatus],

  props: {
    edit: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapGetters({ user: "authUser" }),
  },
  async created() {
    await this.$store.dispatch("fetchAuthUsersPosts");
    this.asyncDataStatus_fetched();
  },
  // beforeRouteEnter(to, from) {
  //   console.log("to:", to);
  //   console.log("from:", from);
  //   if (!store.state.authId) return { name: "PageHome" };
  // },
  beforeRouteUpdate() {},
  beforeRouteLeave() {},
};
</script>

<style>
</style>