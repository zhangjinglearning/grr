<template>
  <div
    class="column is-2"
    @dragstart.self="handleColumnDragstart"
    @dragenter="handleColumnDragenter"
    @dragend.self="handleColumnDragend"
    draggable
  >
    <div class="card has-background-link">
      <div class="card-header">
        <div class="card-header-title has-background-primary">
          {{ item.label }}
        </div>
        <a
          href="#"
          class="card-header-icon has-background-success"
          aria-label="more options"
        >
          <span class="icon">
            <i :class="['fas', item.icon]"></i>
          </span>
        </a>
      </div>
      <div class="card-content tag-box">
        <Task
          v-for="(task, $taskIdx) in item.list"
          :key="task.id"
          :columnIdx="columnIdx"
          :taskIdx="$taskIdx"
          :task="task"
          @emitTaskShow="$emit('emitTaskDialogShow', columnIdx, $taskIdx)"
        />
      </div>
      <div class="card-footer">
        <div class="field">
          <p class="control has-icons-left has-icons-right">
            <input
              class="input"
              type="email"
              placeholder="add task"
              v-model="taskName"
              @keyup.enter="handleTaskAdd"
            />
            <span class="icon is-small is-left">
              <i class="fab fa-twitter"></i>
            </span>
            <span class="icon is-small is-right">
              <i class="fas fa-check"></i>
            </span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Task from "@/components/grr/Task";
export default {
  components: { Task },
  props: {
    item: {
      type: Object,
      default: () => {}
    },
    columnIdx: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      taskName: ""
    };
  },
  methods: {
    ...mapActions([
      "grr/saveTask",
      "grr/pickColumnUp",
      "grr/overColumnEnter",
      "grr/moveColumn"
    ]),
    handleTaskAdd() {
      this["grr/saveTask"]({
        columnIdx: this.columnIdx,
        task: {
          id: Date.now(),
          label: this.taskName,
          description: ""
        }
      });
      this.taskName = "";
    },
    handleColumnDragstart() {
      this["grr/pickColumnUp"]({
        fromIdx: this.columnIdx
      });
    },
    handleColumnDragenter() {
      this["grr/overColumnEnter"]({
        toIdx: this.columnIdx
      });
    },
    handleColumnDragend() {
      this["grr/moveColumn"]();
    }
  }
};
</script>

<style lang="scss" scoped></style>
