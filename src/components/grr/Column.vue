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
      default: () => {},
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
    handleTaskAdd() {
      this.saveTask({
        columnIdx: this.columnIdx,
        task: {
          id: Date.now(),
          label: this.taskName,
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
