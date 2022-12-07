import Vue from "vue";
import Vuex from "vuex";
import test from "./test";

Vue.use(Vuex);

const storeOptions = {
  state: {},
  mutations: {},
  actions: {},
  modules: {
    test,
  },
};

const commonStore = new Vuex.Store(storeOptions);

export default commonStore;
