import Vue from "vue";
import Vuex from "vuex";
import test from "./test";
import { StoreExtension } from "../../../../src";

Vue.use(Vuex);

const storeOptions = {
  state: {} as any,
  mutations: {} as any,
  actions: {} as any,
  modules: {
    test,
  },
};

const commonStore = new Vuex.Store(storeOptions);
const s = new StoreExtension(storeOptions);

export const { mapState, mapGetters, mapActions, mapMutations } = s;

export default commonStore;
