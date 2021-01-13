import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    board: [
      { id: 1, label: "todo", list: [{ id: 11, label: "watch" }] },
      {
        id: 2,
        label: "doing",
        list: [
          { id: 21, label: "coding" },
          { id: 22, label: "thinking" }
        ]
      },
      { id: 3, label: "done", list: [{ id: 31, label: "played" }] }
    ]
  },
  mutations: {},
  actions: {},
  modules: {}
});
