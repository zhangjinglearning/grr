<template>
  <div class="container">
    <div class="card has-background-link">
      <div class="card-header">
        <div
          class="card-header-title has-background-primary"
          style="cursor:grab"
        >
          {{ item.label }}
        </div>
        <button
          type="button"
          class="card-header-icon has-background-success"
          aria-label="列状态"
        >
          <span class="icon">
            <i :class="['fas', item.icon]"></i>
          </span>
        </button>
      </div>
      <Container
        class="card-content"
        @drop="handleTaskDragend"
        @drag-start="beginTaskDrag"
        group-name="task"
      >
        <Draggable v-for="(task, $taskIdx) in item.list" :key="task.id">
          <Task
            :task="task"
            @emitTaskShow="$emit('emitTaskDialogShow', columnIdx, $taskIdx)"
            @emitTaskRemove="$emit('emitTaskDialogRemove', columnIdx, $taskIdx)"
          />
        </Draggable>
      </Container>
      <div class="card-footer">
        <div class="field container">
          <p class="control has-icons-right">
            <input
              class="input"
              type="text"
              placeholder="add task"
              aria-label="新增任务"
              v-model="taskName"
              @keydown.enter="handleTaskAdd"
            />
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
import { mapActions } from "pinia";
import { Container, Draggable } from "vue3-smooth-dnd";
import Task from "./Task.vue";
import { useGrrStore } from "@/store";

export default {
  name: "Column",
  components: { Task, Container, Draggable },
  emits: ["emitTaskDialogShow", "emitTaskDialogRemove"],
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
    columnIdx: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      taskName: "",
    };
  },
  methods: {
    ...mapActions(useGrrStore, ["saveTask", "dropTask", "beginTaskDrag"]),
    handleTaskAdd(event) {
      if (event.isComposing || event.keyCode === 229) return;
      const label = this.taskName.trim();
      if (!label) return;
      this.saveTask({
        columnIdx: this.columnIdx,
        task: {
          id: Date.now(),
          label,
          description: "",
        },
      });
      this.taskName = "";
    },

    handleTaskDragend({ removedIndex, addedIndex }) {
      this.dropTask({
        columnIdx: this.columnIdx,
        removedIndex,
        addedIndex,
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
