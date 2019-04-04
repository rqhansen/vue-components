<template>
  <RqRefresh @on-refresh="refresh"
             :className="'refresh-extra-style'">
    <!-- 插入容器 -->
  </RqRefresh>
</template>

<script>
export default {
  name: 'home',
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

<style lang="scss" scoped>
div {
  height: calc(100vh - 88px);
  line-height: calc(100vh - 88px);
}
</style>
