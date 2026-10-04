<template>
  <div class="modal" :class="{ 'is-active': flag }">
    <div class="modal-background" @click="handleCloseClick"></div>
    <div class="modal-content">
      <div class="box">
        <div class="field">
          <label class="label" for="task-label-input">Task</label>
          <div class="control">
            <input
              id="task-label-input"
              ref="labelInput"
              class="input"
              :class="{ 'input-empty-flash': emptyFlash }"
              type="text"
              placeholder="e.g. watch"
              v-model="draft.label"
              @keydown.enter="handleSubmitClick"
            />
          </div>
        </div>
        <div class="field">
          <label class="label" for="task-desc-input">Description</label>
          <div class="control">
            <textarea
              id="task-desc-input"
              class="textarea"
              placeholder="e.g. watch me!"
              v-model="draft.description"
            ></textarea>
          </div>
        </div>
        <div class="field is-grouped is-grouped-centered">
          <div class="control">
            <button class="button is-link" @click="handleSubmitClick">
              Submit
            </button>
          </div>
          <div class="control">
            <button class="button is-link is-light" @click="handleCloseClick">
              {{ confirmingDiscard ? "discard? (3s)" : "Cancel" }}
            </button>
          </div>
        </div>
        <!-- 独立 live region：discard 确认文案变化时主动播报（不挂在按钮上） -->
        <span class="is-sr-only" aria-live="assertive">
          {{ confirmingDiscard ? "确认丢弃未保存的修改？3 秒后自动回退" : "" }}
        </span>
      </div>
    </div>
    <button
      class="modal-close is-large"
      aria-label="close"
      @click="handleCloseClick"
    ></button>
  </div>
</template>

<script>
export default {
  name: "Dialog",
  emits: ["update:flag", "emitTaskUpdate"],
  props: {
    flag: {
      type: Boolean,
      default: false
    },
    task: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      draft: {},
      emptyFlash: false,
      confirmingDiscard: false
    };
  },
  computed: {
    // 有未保存改动时，关闭动作先武装一次确认（与删除的两段式同范式）
    isDirty() {
      return (
        this.draft.label !== this.task.label ||
        (this.draft.description || "") !== (this.task.description || "")
      );
    }
  },
  watch: {
    flag(open) {
      if (open) {
        this.draft = { ...this.task };
        this.confirmingDiscard = false;
        clearTimeout(this.discardTimer);
        this.lastFocused = document.activeElement;
        document.addEventListener("keydown", this.handleKeydown);
        this.$nextTick(() => {
          this.$refs.labelInput.focus();
        });
      } else {
        document.removeEventListener("keydown", this.handleKeydown);
        // 关闭后把焦点还给触发元素（任务标签按钮），键盘用户不迷路
        if (this.lastFocused && this.lastFocused.focus) {
          this.lastFocused.focus();
        }
      }
    }
  },
  beforeUnmount() {
    document.removeEventListener("keydown", this.handleKeydown);
    clearTimeout(this.discardTimer);
    clearTimeout(this.flashTimer);
  },
  methods: {
    handleKeydown(event) {
      if (event.isComposing) return;
      if (event.key === "Escape") {
        this.handleCloseClick();
      }
      if (event.key === "Tab") {
        this.trapFocus(event);
      }
    },
    // 焦点陷阱：Tab 循环留在弹窗内，不钻进遮罩后的页面。
    // 可见性用 offsetWidth 判断——Bulma 的 modal-close 是 position:fixed，
    // offsetParent 恒为 null，用它会把 X 钮过滤成键盘不可达
    trapFocus(event) {
      const focusables = [
        ...this.$el.querySelectorAll("button, input, textarea")
      ].filter(el => !el.disabled && el.offsetWidth > 0);
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    },
    handleCloseClick() {
      if (this.isDirty) {
        if (!this.confirmingDiscard) {
          this.confirmingDiscard = true;
          this.armedAt = Date.now();
          clearTimeout(this.discardTimer);
          this.discardTimer = setTimeout(() => {
            this.confirmingDiscard = false;
          }, 3000);
          return;
        }
        // 连击护栏：armed 后 300ms 内的关闭动作（双击 Cancel/Esc）视为误触
        if (Date.now() - this.armedAt < 300) return;
      }
      clearTimeout(this.discardTimer);
      this.$emit("update:flag", false);
    },
    // 空输入提交：shake 一瞬 + 红边，替代静默无反应
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
    handleSubmitClick(event) {
      if (event && (event.isComposing || event.keyCode === 229)) return;
      if (!(this.draft.label || "").trim()) {
        this.flashEmpty();
        return;
      }
      this.$emit("emitTaskUpdate", {
        ...this.draft,
        label: this.draft.label.trim(),
        description: (this.draft.description || "").trim()
      });
    }
  }
};
</script>

<style lang="scss" scoped>
// 窄屏：Bulma 的 modal-content (width:100%) 在 justify-center 的 flex 容器里
// 贴死屏幕左右缘；margin 会被溢出居中抵消，须直接锁宽
@media screen and (max-width: 768px) {
  .modal-content {
    width: calc(100% - 24px);
  }
}
</style>
