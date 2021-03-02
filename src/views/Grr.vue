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
  margin: 0 100px;
}
</style>
