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
              Cancel
            </button>
          </div>
        </div>
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
      draft: {}
    };
  },
  watch: {
    flag(open) {
      if (open) {
        this.draft = { ...this.task };
        document.addEventListener("keydown", this.handleKeydown);
        this.$nextTick(() => {
          this.$refs.labelInput.focus();
        });
      } else {
        document.removeEventListener("keydown", this.handleKeydown);
      }
    }
  },
  beforeUnmount() {
    document.removeEventListener("keydown", this.handleKeydown);
  },
  methods: {
    handleKeydown(event) {
      if (event.isComposing) return;
      if (event.key === "Escape") {
        this.handleCloseClick();
      }
    },
    handleCloseClick() {
      this.$emit("update:flag", false);
    },
    handleSubmitClick(event) {
      if (event && (event.isComposing || event.keyCode === 229)) return;
      if (!(this.draft.label || "").trim()) return;
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
