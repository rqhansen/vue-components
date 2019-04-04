<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
}
</script>

<style lang="scss">
@import "assets/scss/reset.scss";
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-size: 26px;
  .refresh-extra-style {
    height: 100vh;
  }
  .header {
    position: relative;
    height: 88px;
    background-color: #ec0022;
    z-index: 10;
  }
}
</style>
