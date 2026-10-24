import { defineStore } from "pinia";

export const useGrrStore = defineStore("grr", {
  state: () => ({
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
                "thinking everything everything everything everything everything everything! three line, three line, three line, three line, three line, aaaaaaaaaaaaaaaaaaaaaaa",
            },
          ],
          icon: "fa-hammer",
        },
        {
          id: 3,
          label: "done",
          list: [
            { id: 31, label: "played 1 over and over", description: "" },
            { id: 32, label: "played 2 over and over", description: "" },
            { id: 33, label: "played 3 over and over", description: "" },
          ],
          icon: "fa-check-circle",
        },
      ],
    },
    pendingTask: {
      from: null,
      to: null,
    },
  }),
  actions: {
    saveTask({ columnIdx, taskIdx = -1, task }) {
      const list = this.board.columns[columnIdx].list;
      if (taskIdx === -1) {
        list.push(task);
      } else {
        list[taskIdx] = task;
      }
    },
    saveColumn({ columnName }) {
      this.board.columns.push({
        id: Date.now(),
        label: columnName,
        list: [],
        icon: "fa-list-ul",
      });
    },
    removeTask({ columnIdx, taskIdx }) {
      this.board.columns[columnIdx].list.splice(taskIdx, 1);
    },
    removeColumn({ columnIdx }) {
      this.board.columns.splice(columnIdx, 1);
    },
    beginTaskDrag() {
      this.pendingTask.from = null;
      this.pendingTask.to = null;
    },
    dropColumn({ removedIndex, addedIndex }) {
      if (removedIndex !== null && addedIndex !== null) {
        const columns = this.board.columns;
        const column = { ...columns[removedIndex] };
        columns.splice(removedIndex, 1);
        columns.splice(addedIndex, 0, column);
      }
    },
    dropTask({ columnIdx, removedIndex, addedIndex }) {
      if (removedIndex !== null && addedIndex !== null) {
        this.moveTask({
          from: { columnIdx, fromIdx: removedIndex },
          to: { columnIdx, toIdx: addedIndex },
        });
        return;
      }
      if (removedIndex !== null) {
        this.pendingTask.from = { columnIdx, fromIdx: removedIndex };
      }
      if (addedIndex !== null) {
        this.pendingTask.to = { columnIdx, toIdx: addedIndex };
      }
      if (this.pendingTask.from && this.pendingTask.to) {
        this.moveTask(this.pendingTask);
        this.beginTaskDrag();
      }
    },
    moveTask({ from, to }) {
      const fromList = this.board.columns[from.columnIdx].list;
      const task = { ...fromList[from.fromIdx] };
      const toList = this.board.columns[to.columnIdx].list;
      fromList.splice(from.fromIdx, 1);
      toList.splice(to.toIdx, 0, task);
    },
  },
});
