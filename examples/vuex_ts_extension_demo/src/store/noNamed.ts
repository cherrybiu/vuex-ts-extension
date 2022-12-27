export default {
  state: {
    moduleName: "模块",
    moduleKey: "module",
    isModule: false,
  },
  mutations: {
    changeModule(state, text: string) {
      state.moduleName = text;
    },
  },
  actions: {
    async changeModuleAsync({ commit }, payload: string) {
      setTimeout(() => {
        commit("changeModule", payload);
      }, 0);
    },
  },
};
