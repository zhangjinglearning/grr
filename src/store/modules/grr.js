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
    pendingTask: {
      from: null,
      to: null,
    },
  }),
  actions: {
    saveTask({ columnIdx, taskIdx = -1, task }) {
      if (taskIdx === -1) {
        this.board.columns[columnIdx].list.push(task);
      } else {
        this.board.columns[columnIdx].list[taskIdx] = task;
      }
    },
    saveColumn({ columnName }) {
      this.board.columns.push({
        id: Date.now(),
        label: columnName,
        list: [],
        icon: "fa-bug",
      });
    },
    removeTask({ columnIdx, taskIdx }) {
      this.board.columns[columnIdx].list.splice(taskIdx, 1);
    },
    beginTaskDrag() {
      this.pendingTask.from = null;
      this.pendingTask.to = null;
    },
    dropColumn({ removedIndex, addedIndex }) {
      if (removedIndex !== null && addedIndex !== null) {
        const moveColumn = { ...this.board.columns[removedIndex] };
        this.board.columns.splice(removedIndex, 1);
        this.board.columns.splice(addedIndex, 0, moveColumn);
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
      const task = { ...this.board.columns[from.columnIdx].list[from.fromIdx] };
      this.board.columns[from.columnIdx].list.splice(from.fromIdx, 1);
      this.board.columns[to.columnIdx].list.splice(to.toIdx, 0, task);
    },
  },
});
