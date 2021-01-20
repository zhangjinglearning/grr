<template>
  <div class="contrainer">
    <div class="title has-text-primary">{{ board.label }}</div>
    <div class="columns">
      <Column
        v-for="(col, $colIdx) in board.columns"
        :key="col.id"
        :item="col"
        :columnIdx="$colIdx"
        @emitTaskDialogShow="handleTaskShow"
      />
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
    </div>
    <Dialog :flag.sync="flag" :task="task" @emitTaskUpdate="handleTaskUpdate" />
  </div>
</template>

<script>
import Column from "@/components/grr/Column.vue";
import Dialog from "@/components/grr/Dialog.vue";
import { mapState, mapActions } from "vuex";
export default {
  components: {
    Column,
    Dialog
  },
  data() {
    return {
      flag: false,
      columnIdx: "",
      taskIdx: "",
      task: {},
      columnName: ""
    };
  },
  computed: {
    ...mapState("grr", {
      board: state => state.board
    })
  },
  methods: {
    ...mapActions(["grr/saveTask", "grr/saveColumn"]),
    handleTaskShow(columnIdx, taskIdx) {
      this.columnIdx = columnIdx;
      this.taskIdx = taskIdx;
      this.task = this.board.columns[columnIdx].list[taskIdx];
      this.flag = true;
    },
    handleTaskUpdate(task) {
      this["grr/saveTask"]({
        columnIdx: this.columnIdx,
        taskIdx: this.taskIdx,
        task
      });
      this.columnIdx = "";
      this.taskIdx = "";
      this.task = {};
      this.flag = false;
    },
    handleColumnAdd() {
      const columnName = this.columnName;
      this["grr/saveColumn"]({ columnName });
    }
  }
};
</script>

<style lang="scss" scoped></style>
