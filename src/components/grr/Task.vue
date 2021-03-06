<template>
  <span class="tile notification is-warning">
    <button
      class="button is-dark has-text-weight-bold one-line"
      @click="$emit('emitTaskShow')"
    >
      {{ task.label }}
    </button>
    <div v-if="task.description" class="one-line has-text-black has-text-left">
      {{ task.description }}
    </div>
    <button class="delete is-large" @click="$emit('emitTaskRemove')"></button>
  </span>
</template>

<script>
export default {
  name: "Task",
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.one-line {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
}

.tile {
  margin: 10px 0;
  display: flex;
  flex-direction: column;
}
</style>
