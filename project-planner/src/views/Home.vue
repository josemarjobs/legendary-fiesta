<template>
  <div class="home">
    <filter-nav @filterChange="currentFilter = $event" />

    <div v-if="projects.length">
      <div v-for="project in filteredProjects" :key="project.id">
        <single-project
          :project="project"
          @delete="handleDelete"
          @complete="handleComplete"
        />
      </div>
    </div>
  </div>
</template>

<script>
import FilterNav from "../components/FilterNav.vue";
import SingleProject from "../components/SingleProject.vue";

export default {
  name: "Home",
  components: { SingleProject, FilterNav },
  data() {
    return {
      projects: [],
      currentFilter: "all",
    };
  },
  computed: {
    filteredProjects() {
      if (this.currentFilter === "completed") {
        return this.projects.filter((p) => p.complete);
      }
      if (this.currentFilter === "ongoing") {
        return this.projects.filter((p) => !p.complete);
      }
      return this.projects;
    },
  },
  mounted() {
    fetch("http://localhost:3000/projects")
      .then((res) => res.json())
      .then((data) => (this.projects = data))
      .catch((e) => console.log(e));
  },
  methods: {
    handleDelete(id) {
      this.projects = this.projects.filter((p) => p.id !== id);
    },
    handleComplete(id) {
      let p = this.projects.find((p) => p.id === id);
      p.complete = !p.complete;
    },
  },
};
</script>
