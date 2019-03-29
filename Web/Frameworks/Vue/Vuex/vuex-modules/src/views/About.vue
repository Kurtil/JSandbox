<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div v-if="loadingPokemons" class="spinner">C</div>
    <ul v-else>
      <li v-for="(pok, i) of pokemons" :key="i">{{ pok }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "about",
  data() {
    return {};
  },
  mounted() {
    this.$store.dispatch("initPokemons");
  },
  computed: {
    pokemons() {
      debugger;
      return this.$store.getters.pokemons;
    },
    loadingPokemons() {
      return this.$store.state.loadingPokemons;
    }
  }
};
</script>

<style>
ul > li {
  list-style: none;
}
.spinner {
  font: 3em "Times";
  animation: rotation 1s infinite linear;
}

@keyframes rotation {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>


