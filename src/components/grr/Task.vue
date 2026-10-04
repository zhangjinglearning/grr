<template>
  <span class="tile notification is-warning">
    <button
      class="button is-dark has-text-weight-bold one-line"
      @click="$emit('emitTaskShow')"
    >
      <span class="one-line-text">{{ task.label }}</span>
    </button>
    <div v-if="task.description" class="desc has-text-black has-text-left">
      {{ task.description }}
    </div>
    <button
      v-if="!confirming"
      class="delete is-large"
      aria-label="删除任务"
      @click="armDelete"
    ></button>
    <button
      v-else
      class="delete-confirm"
      aria-live="assertive"
      @click="confirmDelete"
    >
      sure? (3s)
    </button>
  </span>
</template>

<script>
export default {
  name: "Task",
  emits: ["emitTaskShow", "emitTaskRemove"],
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      confirming: false,
    };
  },
  beforeUnmount() {
    clearTimeout(this.confirmTimer);
  },
  methods: {
    armDelete() {
      this.confirming = true;
      this.confirmTimer = setTimeout(() => {
        this.confirming = false;
      }, 3000);
    },
    confirmDelete() {
      clearTimeout(this.confirmTimer);
      this.$emit("emitTaskRemove");
    },
  },
};
</script>

<style lang="scss" scoped>
// Bulma .button 是 inline-flex 容器，text-overflow 对容器本身无效——
// 省略号必须落在块级的 span 上（min-width:0 才允许 flex 子项收缩到溢出）
.one-line {
  justify-content: flex-start;
  width: 100%;
}

.one-line-text {
  display: block;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: left;
}

// 描述两行封顶：读板不点开也能看到大部分内容，长文卡自然更高；
// break-word 防超长无空格串在 -webkit-box 下横向溢出色块
.desc {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  overflow-wrap: break-word;
  width: 100%;
}

.tile {
  margin: 10px 0;
  display: flex;
  flex-direction: column;
  // 整卡可拖：拿起来之前先给出 grab 预告（按钮自身保持 pointer，点=编辑、拖=卡体）
  cursor: grab;
}

.delete-confirm {
  position: absolute;
  top: 8px;
  left: 8px;
  right: 8px;
  height: 32px;
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
  white-space: nowrap;
}

// 触屏：delete 圆钮与确认条达到 44px 触控目标（桌面鼠标不受影响）。
// Bulma 对 .delete 同时锁了 min/max-width/height，这里须四件套一起覆盖
@media (pointer: coarse) {
  .tile.notification {
    padding-right: 3.5rem;
  }

  .tile .delete {
    width: 44px;
    height: 44px;
    min-width: 44px;
    min-height: 44px;
    max-width: 44px;
    max-height: 44px;
  }

  .delete-confirm {
    height: 44px;
  }
}
</style>
