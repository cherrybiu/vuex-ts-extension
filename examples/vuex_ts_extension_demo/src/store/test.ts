type StateType = {
  text: string;
  isShow: boolean;
  user: {
    name: string;
    age: number;
  };
};

export default {
  namespaced: true,
  state: {
    text: "请选择",
    isShow: false,
    user: {
      name: "lily",
      age: 18,
    },
  } as StateType,
  mutations: {
    changeText(state: StateType, text: string) {
      state.text = text;
    },
  },
  actions: {
    changeTextAsync({ commit }: { commit: any }, payload: string) {
      setTimeout(() => {
        commit("changeText", payload);
      }, 0);
    },
  },
};
