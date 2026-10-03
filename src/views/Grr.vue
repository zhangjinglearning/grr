<template>
  <div class="box board-box has-background-dark">
    <Board />
  </div>
</template>

<script>
import Board from "@/components/grr/Board.vue";

export default {
  name: "Grr",
  components: {
    Board
  }
};
</script>

<style lang="scss" scoped>
.board-box {
  // 桌面 72px 出血（原 100px 收窄呈邮票感），窄屏流式收窄（375px 视口约 22px）
  margin: 0 clamp(12px, 6vw, 72px);
}
</style>
