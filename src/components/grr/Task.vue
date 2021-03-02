<template>
  <div class="tile" @click="$emit('emitTaskShow')">
    <button class="button is-dark has-text-weight-bold one-line">
      {{ task.label }}
    </button>
    <div class="one-line has-text-black has-text-left">
      {{ task.description || "none" }}
    </div>
  </div>
</template>

<script>
export default {
  name: "Task",
  props: {
    task: {
      type: Object,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
.one-line {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
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
