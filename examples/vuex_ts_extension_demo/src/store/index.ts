import Vuex from "vuex";
import Vue from "vue";
import test from "./test";
import noNamed from "./noNamed";
import { StoreExtension } from "../../../../src";

Vue.use(Vuex);

const storeOptions = {
  state: {} as any,
  mutations: {} as any,
  actions: {} as any,
  modules: {
    test,
    noNamed,
  },
};

const commonStore = new Vuex.Store(storeOptions);
export default commonStore;

const s = new StoreExtension(storeOptions);
export const { mapState, mapGetters, mapActions, mapMutations } = s;
