<template>
  <div class="contrainer">
    <div class="title has-text-primary">{{ board.label }}</div>
    <Container
      class="columns"
      @drop="handleColumnDragend"
      orientation="horizontal"
      lock-axis="x"
      style="display:flex"
    >
      <Draggable
        class="column is-2"
        v-for="(col, $colIdx) in board.columns"
        :key="col.id"
      >
        <Column
          :item="col"
          :columnIdx="$colIdx"
          @emitTaskDialogShow="handleTaskShow"
          @emitTaskDialogRemove="handleTaskRemove"
        />
      </Draggable>
      <div class="column is-2">
        <div class="field">
          <p class="control has-icons-left has-icons-right">
            <input
              class="input"
              type="email"
              placeholder="add column"
              v-model="columnName"
              @keyup.enter="handleColumnAdd"
            />
            <span class="icon is-small is-left">
              <i class="fab fa-google"></i>
            </span>
            <span class="icon is-small is-right">
              <i class="fas fa-checked"></i>
            </span>
          </p>
        </div>
      </div>
    </Container>
    <Dialog :flag.sync="flag" :task="task" @emitTaskUpdate="handleTaskUpdate" />
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { Container, Draggable } from "vue-smooth-dnd";
import Column from "./Column.vue";
import Dialog from "./Dialog.vue";

export default {
  name: "Board",
  components: {
    Column,
    Dialog,
    Container,
    Draggable,
  },
  data() {
    return {
      flag: false,
      columnIdx: "",
      taskIdx: "",
      task: {},
      columnName: "",
    };
  },
  computed: {
    ...mapState("grr", ["board"]),
  },
  methods: {
    ...mapActions("grr", [
      "saveTask",
      "saveColumn",
      "pickColumnUp",
      "overColumnEnter",
      "moveColumn",
      "removeTask",
    ]),
    handleTaskShow(columnIdx, taskIdx) {
      this.columnIdx = columnIdx;
      this.taskIdx = taskIdx;
      this.task = this.board.columns[columnIdx].list[taskIdx];
      this.flag = true;
    },
    handleTaskUpdate(task) {
      this.saveTask({
        columnIdx: this.columnIdx,
        taskIdx: this.taskIdx,
        task,
      });
      this.columnIdx = "";
      this.taskIdx = "";
      this.task = {};
      this.flag = false;
    },
    handleColumnAdd() {
      const columnName = this.columnName;
      this.saveColumn({ columnName });
      this.columnName = "";
    },
    handleTaskRemove(columnIdx, taskIdx) {
      this.removeTask({ columnIdx, taskIdx });
    },
    handleColumnDragend({ removedIndex, addedIndex }) {
      this.pickColumnUp({
        fromIdx: removedIndex,
      });
      this.overColumnEnter({
        toIdx: addedIndex,
      });
      this.moveColumn();
    },
  },
};
</script>

<style lang="scss" scoped></style>
