<template>
  <div>
    <h1 class="title has-text-primary">{{ board.label }}</h1>
    <p class="hint has-text-grey-light">
      drag &amp; drop · in-memory board · refresh to reset
    </p>
    <p v-if="!board.columns.length" class="hint has-text-grey-light">
      grr~ empty table — add a column
    </p>
    <Container
      class="columns"
      :key="isNarrow ? 'v' : 'h'"
      @drop="dropColumn"
      :orientation="isNarrow ? 'vertical' : 'horizontal'"
      :lock-axis="isNarrow ? 'y' : 'x'"
      drag-handle-selector=".card-header-title"
      style="display:flex"
    >
      <Draggable
        class="column is-3"
        v-for="(col, $colIdx) in board.columns"
        :key="col.id"
      >
        <Column
          :item="col"
          :columnIdx="$colIdx"
          @emitTaskDialogShow="handleTaskShow"
          @emitTaskDialogRemove="handleTaskRemove"
          @emitColumnRemove="handleColumnRemove"
        />
      </Draggable>
      <div class="column is-3">
        <div class="field">
          <p class="control">
            <input
              ref="addColumnInput"
              class="input"
              :class="{ 'input-empty-flash': emptyFlash }"
              type="text"
              placeholder="add column"
              aria-label="新增列"
              v-model="columnName"
              @keydown.enter="handleColumnAdd"
            />
          </p>
        </div>
      </div>
    </Container>
    <Dialog v-model:flag="flag" :task="task" @emitTaskUpdate="handleTaskUpdate" />
  </div>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { Container, Draggable } from "vue3-smooth-dnd";
import Column from "./Column.vue";
import Dialog from "./Dialog.vue";
import { useGrrStore } from "@/store";

export default {
  name: "Board",
  components: {
    Column,
    Dialog,
    Container,
    Draggable,
  },
  data() {
    return {
      flag: false,
      columnIdx: "",
      taskIdx: "",
      task: {},
      columnName: "",
      emptyFlash: false,
      isNarrow: false,
    };
  },
  created() {
    this.narrowQuery = window.matchMedia("(max-width: 768px)");
    this.isNarrow = this.narrowQuery.matches;
    this.handleNarrowChange = (e) => {
      this.isNarrow = e.matches;
    };
    this.narrowQuery.addEventListener("change", this.handleNarrowChange);
  },
  beforeUnmount() {
    this.narrowQuery.removeEventListener("change", this.handleNarrowChange);
    clearTimeout(this.flashTimer);
  },
  computed: {
    ...mapState(useGrrStore, ["board"]),
  },
  methods: {
    ...mapActions(useGrrStore, [
      "saveTask",
      "saveColumn",
      "removeTask",
      "removeColumn",
      "dropColumn",
    ]),
    handleTaskShow(columnIdx, taskIdx) {
      this.columnIdx = columnIdx;
      this.taskIdx = taskIdx;
      this.task = this.board.columns[columnIdx].list[taskIdx];
      this.flag = true;
    },
    handleTaskUpdate(task) {
      this.saveTask({
        columnIdx: this.columnIdx,
        taskIdx: this.taskIdx,
        task,
      });
      this.columnIdx = "";
      this.taskIdx = "";
      this.task = {};
      this.flag = false;
    },
    handleColumnAdd(event) {
      if (event.isComposing || event.keyCode === 229) return;
      const columnName = this.columnName.trim();
      if (!columnName) {
        this.flashEmpty();
        return;
      }
      this.saveColumn({ columnName });
      this.columnName = "";
      // 第 4 列起列轨横向滚动，新列和 add-column 输入框都排在滚动区末尾，
      // 不滚过去的话两者都留在视口外
      this.$nextTick(() => {
        const track = this.$el.querySelector(".columns");
        track?.scrollTo({ left: track.scrollWidth, behavior: "smooth" });
      });
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
    handleTaskRemove(columnIdx, taskIdx) {
      this.removeTask({ columnIdx, taskIdx });
    },
    // 列删除后组件卸载、焦点会掉到 body：把焦点落到同位邻居列头的删除钮
    // （被删的是最后一列则落前一列），板被删空则落新增列输入框
    handleColumnRemove(columnIdx) {
      this.removeColumn({ columnIdx });
      this.$nextTick(() => {
        const cards = this.$el.querySelectorAll(".column.is-3 .card");
        if (!cards.length) {
          this.$refs.addColumnInput?.focus();
          return;
        }
        const card = cards[Math.min(columnIdx, cards.length - 1)];
        card.querySelector("button.card-header-icon")?.focus();
      });
    },
  },
};
</script>

<style lang="scss" scoped>
// 超过 4 列（is-3 × 4 = 100%）时容器是 nowrap flex，不换行只会横向溢出桌面，
// 让列轨在石墨桌面内横向滚动（Bulma 只有 .is-multiline 才 wrap，本容器不加）
.columns {
  overflow-x: auto;
}

// 标题下的轻提示：负 margin 抵消 .title 的 1.5rem 底距，让提示贴住标题；
// 字号沿用正文 1rem（DESIGN.md 规则：不新增字号档位），仅以灰白弱化
.hint {
  margin: -1.25rem 0 1.25rem;
}

// 窄屏：列轨从横向栅格改为纵向全宽堆叠（is-3 在 Bulma 里仅 ≥769px 生效，
// 窄屏下列回落 flex:1 且被 nowrap 文本撑宽，导致横向溢出）
@media screen and (max-width: 768px) {
  .columns {
    flex-direction: column;
  }

  .column.is-3 {
    flex: none;
    width: 100%;
  }
}
</style>
