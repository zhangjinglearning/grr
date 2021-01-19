<template>
  <div
    class="column is-2"
    @dragstart.self="handleColumnDragstart"
    @dragend.self="handleColumnDragend"
    @dragenter.self="handleColumnDragenter"
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
        <div
          class="tile"
          v-for="(task, $taskIdx) in item.list"
          :key="task.id"
          @click="handleTaskClick(columnIdx, $taskIdx, task)"
          @dragstart.self="handleTaskDragstart"
          @dragend.self="handleTaskDragend"
          draggable
        >
          <button class="button is-dark has-text-weight-bold one-line">
            {{ task.label }}
          </button>
          <div
            v-if="task.description"
            class="one-line has-text-black has-text-left"
          >
            {{ task.description }}
          </div>
        </div>
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
export default {
  props: {
    item: {
      type: Object,
      default: () => {}
    },
    columnIdx: {
      type: [Number, String],
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
      "grr/moveColumn",
      "grr/overColumnEnter",
      "grr/pickTaskUp",
      "grr/moveTask"
    ]),
    handleTaskClick(columnIdx, taskIdx, task) {
      this.$emit("emitTaskShow", columnIdx, taskIdx, task);
    },
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
    handleColumnDragend() {
      this["grr/moveColumn"]();
    },
    handleColumnDragenter() {
      this["grr/overColumnEnter"]({
        toIdx: this.columnIdx
      });
    },
    handleTaskDragstart() {
      this["grr/pickTaskUp"]({
        columnIdx: 1,
        fromIdx: 0,
        toIdx: 1
      });
    },
    handleTaskDragend() {
      this["grr/moveTask"]({
        columnIdx: 1,
        fromIdx: 0,
        toIdx: 1
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.one-line {
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.tag-box {
  display: flex;
  flex-direction: column;

  .tile {
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;

    .tag {
      width: 100%;
    }
  }

  .tile:last-child {
    margin-bottom: 0;
  }
}
</style>
