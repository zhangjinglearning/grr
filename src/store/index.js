import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    board: {
      label: "Workshop",
      columns: [
        {
          id: 1,
          label: "todo",
          list: [{ id: 11, label: "watch", description: "watch me!" }],
          icon: "fa-inbox"
        },
        {
          id: 2,
          label: "doing",
          list: [
            { id: 21, label: "coding", description: "just coding!" },
            {
              id: 22,
              label: "thinking",
              description:
                "thinking everthing everthing everthing everthing everthing everthing!"
            }
          ],
          icon: "fa-spinner"
        },
        {
          id: 3,
          label: "done",
          list: [{ id: 31, label: "played over over", description: "" }],
          icon: "fa-check-circle"
        }
      ]
    }
  },
  mutations: {
    SAVE_TASK: (state, { columnIdx, taskIdx, task }) => {
      if (taskIdx) {
        state.board.columns[columnIdx].list[taskIdx] = task;
      } else {
        state.board.columns[columnIdx].list.push(task);
      }
    },
    SAVE_COLUMN: state => {
      state.board.columns.push({
        id: Date.now(),
        label: "default",
        list: [],
        icon: "fa-bug"
      });
    }
  },
  actions: {
    saveTask({ commit }, params) {
      commit("SAVE_TASK", params);
    },
    saveColumn({ commit }) {
      commit("SAVE_COLUMN");
    }
  },
  modules: {}
});
