<template>
  <div class="column is-2">
    <div class="card">
      <div class="card-header">
        <div class="card-header-title has-background-primary">
          {{ item.label }}
        </div>
        <a
          href="#"
          class="card-header-icon has-background-success"
          aria-label="more options"
        >
          <span class="icon">
            <i class="fas fa-home"></i>
          </span>
        </a>
      </div>
      <div class="card-content tag-box">
        <span class="tag is-info" v-for="tag in item.list" :key="tag.id">{{
          tag.label
        }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  }
};
</script>

<style lang="scss" scoped>
.tag-box {
  display: flex;
  flex-direction: column;

  .tag {
    margin: 10px 0;
  }
}
</style>
