<template>
  <div id="app">
    <RqRefresh @on-refresh="refresh"
               :className="'refresh-extra-style'">
      <!-- 插入容器 -->
    </RqRefresh>
  </div>
</template>

<script>
export default {
  name: 'app',
  methods: {
    refresh (resolve) {
      setTimeout(() => {
        alert("刷新成功");
        resolve();
      }, 1000);
    }
  }
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
  .header + div {
    height: calc(100vh - 88px);
    line-height: calc(100vh - 88px);
  }
}
</style>
