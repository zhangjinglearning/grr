export default {
  namespaced: true,
  state: {
    board: {
      label: "Workshop",
      columns: [
        {
          id: 1,
          label: "todo",
          list: [{ id: 11, label: "watch", description: "watch me!" }],
          icon: "fa-inbox",
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
                "thinking everthing everthing everthing everthing everthing everthing! three line, three line, three line, three line, three line, aaaaaaaaaaaaaaaaaaaaaaa",
            },
          ],
          icon: "fa-spinner",
        },
        {
          id: 3,
          label: "done",
          list: [
            { id: 31, label: "played 1 over over", description: "" },
            { id: 32, label: "played 2 over over", description: "" },
            { id: 33, label: "played 3 over over", description: "" },
          ],
          icon: "fa-check-circle",
        },
      ],
    },
    moveColumn: {
      fromIdx: 0,
      toIdx: 0,
    },
    moveTask: {
      from: {
        columnIdx: 0,
        fromIdx: 0,
      },
      to: {
        columnIdx: 0,
        toIdx: 0,
      },
      level: 0,
    },
  },
  mutations: {
    SAVE_TASK: (state, { columnIdx, taskIdx = -1, task }) => {
      if (taskIdx === -1) {
        state.board.columns[columnIdx].list.push(task);
      } else {
        state.board.columns[columnIdx].list[taskIdx] = task;
      }
    },
    REMOVE_TASK: (state, { columnIdx, taskIdx }) => {
      state.board.columns[columnIdx].list.splice(taskIdx, 1);
    },
    SAVE_COLUMN: (state, { columnName }) => {
      state.board.columns.push({
        id: Date.now(),
        label: columnName,
        list: [],
        icon: "fa-bug",
      });
    },
    SAVE_COLUMN_FROM: (state, { fromIdx }) => {
      state.moveColumn.fromIdx = fromIdx;
    },
    SAVE_COLUMN_TO: (state, { toIdx }) => {
      state.moveColumn.toIdx = toIdx;
    },
    MOVE_COLUMN: (state) => {
      const moveColumn = { ...state.board.columns[state.moveColumn.fromIdx] };
      state.board.columns.splice(state.moveColumn.fromIdx, 1);
      state.board.columns.splice(state.moveColumn.toIdx, 0, moveColumn);
    },
    SAVE_TASK_FROM: (state, params) => {
      state.moveTask.from = params;
      state.moveTask.level += 1;
    },
    SAVE_TASK_TO: (state, params) => {
      state.moveTask.to = params;
      state.moveTask.level += 1;
    },
    MOVE_TASK: (state) => {
      const from = state.moveTask.from;
      const to = state.moveTask.to;
      const moveTask = {
        ...state.board.columns[from.columnIdx].list[from.fromIdx],
      };
      state.board.columns[from.columnIdx].list.splice(from.fromIdx, 1);
      state.board.columns[to.columnIdx].list.splice(to.toIdx, 0, moveTask);
      state.moveTask.level = 0;
    },
  },
  actions: {
    saveTask({ commit }, params) {
      commit("SAVE_TASK", params);
    },
    saveColumn({ commit }, params) {
      commit("SAVE_COLUMN", params);
    },
    pickColumnUp({ commit }, params) {
      commit("SAVE_COLUMN_FROM", params);
    },
    overColumnEnter({ commit }, params) {
      commit("SAVE_COLUMN_TO", params);
    },
    moveColumn({ commit }) {
      commit("MOVE_COLUMN");
    },
    pickTaskUp({ commit }, params) {
      commit("SAVE_TASK_FROM", params);
    },
    overTaskEnter({ commit }, params) {
      commit("SAVE_TASK_TO", params);
    },
    moveTask({ state, commit }) {
      if (state.moveTask.level === 2) {
        commit("MOVE_TASK");
      }
    },
    removeTask({ commit }, params) {
      commit("REMOVE_TASK", params);
    },
  },
};
