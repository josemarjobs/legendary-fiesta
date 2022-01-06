<template>
  <nav v-if="user" class="flex items-center justify-between mb-8">
    <div class="">
      <p class="">
        Hey there <span class="text-indigo-800">{{ user.displayName }}</span>
      </p>
      <p class="text-sm text-gray-500">
        Currently logged in as {{ user.email }}
      </p>
    </div>
    <button
      class="
        text-white
        bg-indigo-500
        py-2
        px-3
        rounded-lg
        tracking-wider
        font-bold
      "
      @click="handleClick"
    >
      Logout
    </button>
  </nav>
</template>

<script>
import useLogout from "../composables/useLogout";
import getUser from "../composables/getUser";

export default {
  setup() {
    const { error, logout } = useLogout();
    const { user } = getUser();

    const handleClick = async () => {
      await logout();
      if (error.value) {
        return;
      }

      console.log("logged out");
    };
    return { user, error, handleClick };
  },
};
</script>

<style>
</style>