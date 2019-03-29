import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    message: 'hello world',
    count: 0,
    pokemons: [],
    loadingPokemons: false,
  },
  mutations: {
    increment(state, payload) {
      state.count += payload;
    },
    decrement(state, payload) {
      state.count - payload < 0 ? null :  state.count -= payload;
    },
    addPokemons(state, payload) {
      state.pokemons = payload;
    },
    toggleLoading(state) {
      state.loadingPokemons = !state.loadingPokemons;
    }
  },
  actions: {
    async initPokemons(state) {
      this.commit('toggleLoading');
      const data = await fetch('/data.json');
      this.commit('addPokemons', await data.json());
      this.commit('toggleLoading');
    }
  },
  getters: {
    message({ message }) {
      return (message.charAt(0) && message.charAt(0).toUpperCase() || "") + message.slice(1);
    },
    pokemons({ pokemons }) {
      return pokemons;
    }
  }
});
