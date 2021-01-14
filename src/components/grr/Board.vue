<template>
  <div class="contrainer">
    <div class="title has-text-primary">{{ board.label }}</div>
    <div class="columns">
      <Column
        v-for="(col, $colIdx) in board.columns"
        :key="col.id"
        :item="col"
        :columnIdx="$colIdx"
        @emitTaskShow="handleTaskShow"
      />
      <div class="column">
        <button
          class="button is-primary has-text-weight-bold"
          @click="handleColumnAdd"
        >
          add column
        </button>
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
      task: {}
    };
  },
  computed: {
    ...mapState(["board"])
  },
  methods: {
    ...mapActions(["saveTask", "saveColumn"]),
    handleTaskShow(columnIdx, taskIdx, task) {
      this.columnIdx = columnIdx;
      this.taskIdx = taskIdx;
      this.task = task;
      this.flag = true;
    },
    handleTaskUpdate(task) {
      this.saveTask({
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
      this.saveColumn();
    }
  }
};
</script>

<style lang="scss" scoped></style>
