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
        class="card-content tag-box"
        @drop="handleTaskDragend($event, columnIdx)"
        group-name="task"
      >
        <Draggable v-for="(task, $taskIdx) in item.list" :key="task.id">
          <Task
            :task="task"
            @emitTaskShow="$emit('emitTaskDialogShow', columnIdx, $taskIdx)"
          />
        </Draggable>
      </Container>
      <div class="card-footer">
        <div class="field" style="width:100%">
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
import { Container, Draggable } from "vue-smooth-dnd";
import { mapActions } from "vuex";
import Task from "@/components/grr/Task";

export default {
  name: "Column",
  components: { Task, Container, Draggable },
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
    ...mapActions("grr", [
      "saveTask",

      "pickTaskUp",
      "overTaskEnter",
      "moveTask"
    ]),
    handleTaskAdd() {
      this.saveTask({
        columnIdx: this.columnIdx,
        task: {
          id: Date.now(),
          label: this.taskName,
          description: ""
        }
      });
      this.taskName = "";
    },

    handleTaskDragend({ removedIndex, addedIndex }, columnIdx) {
      if (removedIndex !== null) {
        this.pickTaskUp({
          columnIdx,
          fromIdx: removedIndex
        });
      }
      if (addedIndex !== null) {
        this.overTaskEnter({
          columnIdx,
          toIdx: addedIndex
        });
      }
      this.moveTask();
    }
  }
};
</script>

<style lang="scss" scoped></style>
