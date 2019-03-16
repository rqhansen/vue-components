<template>
  <div v-rq-refresh = "refresh" :class="className">
    <slot></slot>
  </div>
</template>

<script>
import RqRefresh from './RqRefresh.js';
/**
 * rq-refresh
 * @desc rq-refresh
 * @module packages/rq-refresh
 */
export default {
  name: 'rqRefresh',
  props:['className'],
  directives: {
    'rqRefresh':RqRefresh
  },
  methods:{
    refresh(){
      return new Promise((resolve,reject) =>{
        this.$emit('on-refresh',resolve);
      })
    }
  }
}
</script>

<style lang="scss">
@mixin animation($val) {
  animation: $val;
}
@mixin keyframes($name, $obj) {
  @keyframes #{$name} {
    @each $i, $val in $obj {
      #{$i} {
        @each $v1, $val2 in $val {
          #{$v1}: $val2;
        }
      }
    }
  }
}
.rq-refresh-wrapper {
  -webkit-overflow-scrolling: touch;
  /deep/ .refresh-icon-wrapper {
    position: absolute;
    top: -60px;
    left: 50%;
    width: 60px;
    height: 60px;
    margin-left: -30px;
    transition: all 0.5s linear;
    z-index: 9;
    text-align:left;
    .svg-icon {
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        line-height: 40px;
        border-radius: 50%;
        background-color: #fff;
        font-size: 14px;
      &.active {
        //刷新动画
        $an1: (
          transform: rotate(360deg)
        );
        $an2: (
          transform: rotate(1080deg)
        );
        $rotate: (
          0%: $an1,
          100%: $an2
        );
        @include keyframes(rotate, $rotate);
        @include animation(rotate 3s);
        transform-origin: center;
      }
      &.static {
        $an1: (
          transform: rotate(0deg)
        );
        $an2: (
          transform: rotate(720deg)
        );
        $rotate: (
          0%: $an1,
          100%: $an2
        );
        @include keyframes(rotate, $rotate);
        @include animation(rotate 1s);
        transform-origin: center;
      }
    }
  }
}
</style>
