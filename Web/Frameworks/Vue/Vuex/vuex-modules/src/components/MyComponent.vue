<template>
  <div class="my-component">
    <div>{{ message }}</div>
    <div>{{ counter }}</div>
    <button @click="increment">Increment</button>
    <br/>
    <button @click="decrement" :disabled="$store.state.count === 0">Decrement</button>
  </div>
</template>

<script>
export default {
  name: "MyComponent",
  computed: {
    message() {
      return this.$store.getters.message;
    },
    counter() {
      return this.$store.state.count;
    }
  },
  methods: {
    increment() {
        this.$store.commit('increment', 1);
    },
    decrement() {
        this.$store.commit('decrement', 1);
    }
  }
};
</script>
<style>
    .my-component {
        background-color: aliceblue;
        margin: 1em;
    }
    button:disabled {
      cursor: not-allowed;
    }
</style>

