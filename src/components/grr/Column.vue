<template>
  <div class="container">
    <div class="card has-background-link">
      <div class="card-header">
        <div
          class="card-header-title has-background-primary"
          style="cursor:grab"
        >
          <i class="fas fa-grip-horizontal grip" aria-hidden="true"></i>
          {{ item.label }}
        </div>
        <span
          class="card-header-icon has-background-success"
          aria-hidden="true"
        >
          <span class="icon">
            <i :class="['fas', item.icon]"></i>
          </span>
        </span>
        <button
          v-if="!confirming"
          type="button"
          class="card-header-icon has-background-primary"
          aria-label="删除列"
          @click="armDelete"
        >
          <span class="delete is-medium" aria-hidden="true"></span>
        </button>
        <button
          v-else
          class="delete-confirm"
          aria-live="assertive"
          @click="confirmDelete"
        >
          delete '{{ item.label }}'? (3s)
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
          <p class="control">
            <input
              class="input"
              :class="{ 'input-empty-flash': emptyFlash }"
              type="text"
              placeholder="add task"
              aria-label="新增任务"
              v-model="taskName"
              @keydown.enter="handleTaskAdd"
            />
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
  emits: ["emitTaskDialogShow", "emitTaskDialogRemove", "emitColumnRemove"],
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
      confirming: false,
      emptyFlash: false,
    };
  },
  beforeUnmount() {
    clearTimeout(this.confirmTimer);
    clearTimeout(this.flashTimer);
  },
  methods: {
    ...mapActions(useGrrStore, ["saveTask", "dropTask", "beginTaskDrag"]),
    handleTaskAdd(event) {
      if (event.isComposing || event.keyCode === 229) return;
      const label = this.taskName.trim();
      if (!label) {
        this.flashEmpty();
        return;
      }
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

    armDelete() {
      this.confirming = true;
      this.confirmTimer = setTimeout(() => {
        this.confirming = false;
      }, 3000);
    },
    confirmDelete() {
      clearTimeout(this.confirmTimer);
      this.$emit("emitColumnRemove", this.columnIdx);
    },

    // 空输入回车：shake 一瞬告诉用户"按了、但没东西可加"
    flashEmpty() {
      this.emptyFlash = false;
      this.$nextTick(() => {
        // 读一次布局强制重排，否则半秒内连按第二次时 class 未摘干净、动画不重播
        void this.$el.offsetWidth;
        this.emptyFlash = true;
        clearTimeout(this.flashTimer);
        this.flashTimer = setTimeout(() => {
          this.emptyFlash = false;
        }, 500);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
// 列头抓取点的视觉标示（cursor:grab 在触屏上不存在，图标是唯一 affordance）
.grip {
  margin-right: 0.5rem;
  opacity: 0.45;
}

// 删除 cell 的键盘焦点环（Bulma 对 delete 家族无 focus-visible 补偿）
.card-header-icon:focus-visible {
  outline: 2px solid #0a0a0a;
  outline-offset: -2px;
}

// 两段式删列确认条，与 Task 的确认条同范式；card-header 默认无定位。
// 盖满整个列头：确认期间 grip 不可拖，列名也写进文案里
.card-header {
  position: relative;
}

.delete-confirm {
  position: absolute;
  top: 4px;
  bottom: 4px;
  left: 8px;
  right: 8px;
  align-items: center;
  justify-content: center;
  background-color: #0a0a0a;
  border: none;
  border-radius: 9999px;
  color: #fff;
  cursor: pointer;
  display: flex;
  font-size: 1rem;
  font-weight: 700;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

// 触屏：删除圆钮达到 44px 触控目标，与任务卡同款；
// Bulma 对 .delete 锁了 min/max-width/height，须四件套一起覆盖。
// 确认条已 top/bottom 自适应盖满列头，无需再撑
@media (pointer: coarse) {
  .card-header-icon .delete {
    width: 44px;
    height: 44px;
    min-width: 44px;
    min-height: 44px;
    max-width: 44px;
    max-height: 44px;
  }
}
</style>
