<template>
  <div class="modal" :class="{ 'is-active': flag }">
    <div class="modal-background"></div>
    <div class="modal-content">
      <div class="box">
        <div class="field">
          <label class="label">Task</label>
          <div class="control">
            <input
              class="input"
              type="text"
              placeholder="Text input"
              v-model="task.label"
            />
          </div>
        </div>
        <div class="field">
          <label class="label">Description</label>
          <div class="control">
            <textarea
              class="textarea"
              placeholder="Textarea"
              v-model="task.description"
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
  props: {
    flag: {
      type: Boolean,
      default: false
    },
    task: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    handleCloseClick() {
      this.$emit("update:flag", false);
    },
    handleSubmitClick() {
      this.$emit("emitTaskUpdate", this.task);
    }
  }
};
</script>

<style lang="scss" scoped></style>
