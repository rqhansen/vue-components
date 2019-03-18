# rq-refresh

'''
基于 vue 的下拉刷新
'''

### 安装

```
$ npm install rq-refresh -s
```

### 使用

```
在main.js文件中引入插件并注册
```

```
# main.js
import 'rq-refresh/lib/rq-components.css'
import rqRefresh from 'rq-refresh'
Vue.use(rqRefresh)
```

```
在项目中使用 rqRefresh
```

```
<template>
   <rq-refresh @on-refresh="refresh" :className="类名">
   <!-- 插入包裹元素 -->
    </rq-refresh>
</template>


<script>
export default {
  name: 'app',
  methods:{
    refresh(resolve){
        //模拟异步请求后,调用resolve()
        setTimeout(() => {
          alert("刷新成功");
          resolve();
        }, 1000);
    }
  }
}
</script>
```
