<template>
  <div id="app">
    <List :elements="elements"/>
  </div>
</template>

<script>
import List from "./components/List.vue";

export default {
  name: "app",
  data() {
    return {
      elements: [
        {
          id: 1,
          message: "coucou"
        },
        {
          id: 2,
          message: "jean"
        },
        {
          id: 3,
          message: "i"
        },
        {
          id: 16,
          message: "jok"
        },
        {
          id: 33,
          message: "trop drolle :P"
        }
      ]
    };
  },
  components: {
    List
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
