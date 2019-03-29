<template>
  <div id="app">
    <nav>
      <div class="brand"></div>
      <my-login></my-login>
    </nav>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/myview">MyView</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
import MyLogin from './components/Login.vue'

export default {
  name: 'app',
  components: {
    MyLogin
  }
}
</script>


<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

nav {
  box-shadow: 0px 1px 2px #2c3e50;
  min-height: 3em ;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
