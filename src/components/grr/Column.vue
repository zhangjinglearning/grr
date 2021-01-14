<template>
  <div class="column is-2">
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
    ...mapActions(["saveTask"]),
    handleTaskClick(columnIdx, taskIdx, task) {
      this.$emit("emitTaskShow", columnIdx, taskIdx, task);
    },
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
