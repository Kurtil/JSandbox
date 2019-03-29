<template>
  <div class="my-component2">
    <div>{{ message }}</div>
    <div>{{ counter }}</div>
    <button @click="increment">Increment</button>
  </div>
</template>

<script>
export default {
  name: "MyComponent2",
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
        this.$store.commit('increment', 1)
    }
  }
};
</script>
<style>
    .my-component2 {
        background-color: blanchedalmond;
        margin: 1em;
    }
</style>