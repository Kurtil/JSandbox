<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div v-if="!isLoggedIn">
      <h2>Not logged in yet ?</h2>
      <button type="button" @click="login">Log in</button>
    </div>
    <div v-else>
      <h2>Hello {{ user.name }}</h2>
      <button type="button" @click="logout">Logout</button>
    </div>
  </div>
</template>

<script>
import { login, isLoggedIn, logout, getProfile } from "../utils/auth.js";

export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  data() {
    return {
      isLoggedIn: isLoggedIn(),
      user: getProfile()
    };
  },
  methods: {
    login() {
      login();
    },
    logout() {
      logout();
      this.isLoggedIn = false;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
