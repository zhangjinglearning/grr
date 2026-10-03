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
  // 桌面保持 100px 出血，窄屏流式收窄（375px 视口约 30px），不再挤成窄条
  margin: 0 clamp(12px, 8vw, 100px);
}
</style>
