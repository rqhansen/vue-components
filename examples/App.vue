<template>
  <div id="app">
    <rq-Refresh @on-refresh="refresh">
      <div class="header"></div>
     <p>我是刷新</p>
    </rq-Refresh>
  </div>
</template>

<script>
export default {
  name: 'app',
  methods:{
    refresh(resolve){
        setTimeout(() => {
          alert("刷新成功");
          resolve();
        }, 1000);
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-size:20px;
  .header{
    position:relative;
    height:88px;
    background-color:#ec0022;
    z-index:10;
  }
}
</style>
