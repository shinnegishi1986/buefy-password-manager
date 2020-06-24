import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    passwords: []
  },
  mutations: {
    setPasswords(state, payload) {
      state.passwords = payload;
    }
  },
  actions: {}
});