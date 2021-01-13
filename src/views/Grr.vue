<template>
  <div class="box board-box">
    <Board />
  </div>
</template>

<script>
import Board from "@/components/grr/Board.vue";
export default {
  components: {
    Board
  }
};
</script>

<style lang="scss" scoped>
.board-box {
  margin: 0 100px;
}
</style>
