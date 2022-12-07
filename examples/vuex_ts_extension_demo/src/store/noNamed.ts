export default {
  state: {
    text: "请选择",
    isShow: false,
    user: {
      name: "lily",
      age: 18,
    },
  },
  mutations: {
    changeText(state, text: string) {
      state.text = text;
    },
  },
  actions: {
    changeTextAsync({ commit }, payload: string) {
      setTimeout(() => {
        commit("changeText", payload);
      }, 0);
    },
  },
};
