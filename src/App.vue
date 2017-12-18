<template>
  <div id="app">
    <div class="router-bg"></div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="less">
#app {
  background: #F2F4F7;
  .router-bg{
    position: fixed;
    background-color: #F2F4F7;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: -1;
  }
}
</style>
