<template>
  <div class="navbar" :style="{backgroundColor:bgcolor}">
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
.navbar {
  width: 100vw;
  height: 14vw;
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  justify-content: center;
  z-index: auto;
}
</style>