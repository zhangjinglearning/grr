<template>
  <div class="columns">
    <Column v-for="col in board" :key="col.id" :item="col" />
  </div>
</template>

<script>
import Column from "@/components/grr/Column.vue";
import { mapState } from "vuex";
export default {
  components: {
    Column
  },
  computed: {
    ...mapState(["board"])
  }
};
</script>

<style lang="scss" scoped></style>
