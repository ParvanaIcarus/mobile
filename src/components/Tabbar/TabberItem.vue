<template>
  <div class="item" :text-align="type" :style="{flex:num}">
    <i :class="icon"></i>
    <slot></slot>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  props: {
    icon: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'left',
    },
    num: {
      type: String,
      default: '1',
    },
  },
}
</script>
<style scoped>
.item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.item i {
  font-size: 6vw;
}
</style>