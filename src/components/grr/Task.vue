<template>
  <div
    class="tile"
    @click="$emit('emitTaskShow')"
    @dragstart.self="handleTaskDragstart"
    @dragenter="handleTaskDragenter"
    @dragend.self="handleTaskDragend"
    draggable
  >
    <button class="button is-dark has-text-weight-bold one-line">
      {{ task.label }}
    </button>
    <div v-if="task.description" class="one-line has-text-black has-text-left">
      {{ task.description }}
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { throttle } from 'throttle-debounce';
export default {
  props: {
    columnIdx: {
      type: Number,
      required: true
    },
    taskIdx: {
      type: Number,
      required: true
    },
    task: {
      type: Object,
      required: true
    }
  },
  methods: {
    ...mapActions("grr", ["pickTaskUp", "overTaskEnter", "moveTask"]),
    handleTaskDragstart() {
      this.pickTaskUp({
        columnIdx: this.columnIdx,
        fromIdx: this.taskIdx
      });
    },
    handleTaskDragenter: throttle(1314, function() {
      this.overTaskEnter({
        columnIdx: this.columnIdx,
        toIdx: this.taskIdx
      });
    }),
    handleTaskDragend() {
      this.moveTask();
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
