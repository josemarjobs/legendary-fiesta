<template>
  <div class="space-y-4 text-primary">
    <div
      v-for="playlist in playlists"
      :key="playlist.id"
      class="
        bg-white
        p-4
        rounded-md
        shadow-sm
        transition
        transform
        hover:scale-102 hover:shadow-lg
      "
    >
      <router-link
        :to="{ name: 'PlaylistDetails', params: { id: playlist.id } }"
      >
        <div class="single flex justify-between items-center">
          <div class="flex items-center space-x-6">
            <div class="thumbnail rounded-md overflow-hidden">
              <img
                :src="playlist.coverUrl"
                :alt="playlist.title"
                class="w-24 h-24 md:h-32 md:w-32 object-cover object-center"
              />
            </div>
            <div class="info">
              <h3 class="text-xl md:text-2xl font-semibold">
                {{ playlist.title }}
              </h3>
              <p class="text-sm md:text-base">
                Created by
                <span class="font-semibold">{{ playlist.userName }}</span>
              </p>
            </div>
          </div>
          <p class="font-bold">{{ playlist.songs.length }}</p>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: ["playlists"],
};
</script>

<style>
</style>