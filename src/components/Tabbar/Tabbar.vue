<template>
  <div class="tabber" :style="{backgroundColor:bgcolor}">
    <slot></slot>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  props: {
    bgcolor: {
      type: String,
      default: 'gray',
    },
  },
}
</script>
<style scoped>
.tabber {
  width: 100vw;
  height: 14vw;
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  justify-content: center;
  z-index: 999;
}
</style>