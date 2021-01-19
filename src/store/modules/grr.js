const grr = {
  namespaced: true,
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
          list: [
            { id: 31, label: "played over over", description: "" },
            { id: 32, label: "played over over", description: "" },
            { id: 33, label: "played over over", description: "" }
          ],
          icon: "fa-check-circle"
        }
      ]
    },
    moveColumnFromIdx: 0,
    moveColumnToIdx: 0
  },
  mutations: {
    SAVE_TASK: (state, { columnIdx, taskIdx = -1, task }) => {
      if (taskIdx === -1) {
        state.board.columns[columnIdx].list.push(task);
      } else {
        state.board.columns[columnIdx].list[taskIdx] = task;
      }
    },
    SAVE_COLUMN: state => {
      state.board.columns.push({
        id: Date.now(),
        label: "default",
        list: [],
        icon: "fa-bug"
      });
    },
    PICK_COLUMN_UP: (state, { fromIdx }) => {
      state.moveColumnFromIdx = fromIdx;
    },
    OVER_COLUMN_ENTER: (state, { toIdx }) => {
      state.moveColumnToIdx = toIdx;
    },
    MOVE_COLUMN_TO: state => {
      if (state.moveColumnFromIdx !== state.moveColumnToIdx) {
        if (state.moveColumnFromIdx < state.moveColumnToIdx) {
          const moveColumn = state.board.columns[state.moveColumnFromIdx];
          state.board.columns.splice(state.moveColumnToIdx + 1, 0, moveColumn);
          state.board.columns.splice(state.moveColumnFromIdx, 1);
        } else {
          const moveColumn = state.board.columns[state.moveColumnFromIdx];
          state.board.columns.splice(state.moveColumnToIdx, 0, moveColumn);
          state.board.columns.splice(state.moveColumnFromIdx + 1, 1);
        }
      }
    },
    PICK_TASK_UP: () => {
      console.log("PICK_TASK_UP");
    },
    MOVE_TASK_TO: () => {
      console.log("MOVE_TASK_TO");
    }
  },
  actions: {
    saveTask({ commit }, params) {
      commit("SAVE_TASK", params);
    },
    saveColumn({ commit }) {
      commit("SAVE_COLUMN");
    },
    pickColumnUp({ commit }, params) {
      commit("PICK_COLUMN_UP", params);
    },
    overColumnEnter({ commit }, params) {
      commit("OVER_COLUMN_ENTER", params);
    },
    moveColumn({ commit }, params) {
      commit("MOVE_COLUMN_TO", params);
    },
    pickTaskUp({ commit }, params) {
      commit("PICK_TASK_UP", params);
    },
    moveTask({ commit }, params) {
      commit("MOVE_TASK_TO", params);
    }
  }
};

export default grr;
