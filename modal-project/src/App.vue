<template>
  <h1>{{ title }}</h1>
  <div v-if="showModal">
    <Modal theme="ssale" @close="toggleModal">
      <template v-slot:links>
        <a href="#">Signup now</a>
        <a href="#">More info</a>
      </template>

      <h1>Vue3 Slots</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam harum,
        sunt debitis ad tempora natus voluptatum praesentium in doloribus nam
        quasi asperiores quam commodi minus nulla saepe repellendus est nobis.
      </p>
    </Modal>
  </div>
  <button @click="toggleModal">Show modal</button>
</template>

<script>
import Modal from "./components/Modal.vue";

export default {
  name: "App",
  data() {
    return {
      title: "My Second Vue App",
      header: "Sign up for the giveaway!",
      text: "grab your ninja swag",
      showModal: false,
    };
  },
  methods: {
    toggleModal() {
      this.showModal = !this.showModal;
    },
  },
  components: {
    Modal,
  },
};
</script>

<style >
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
