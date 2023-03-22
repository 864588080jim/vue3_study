# Pinia持久化存储

## 一、安装插件

```shell
npm i pinia-plugin-persist --save
```

## 二、store/index.js

```js
import { createPinia } from 'pinia'
import piniaPluginPersist from 'pinia-plugin-persist'

const store = createPinia()
store.use(piniaPluginPersist)

export default store
```

## 三、store/user.js
```js
export const useUserStore = defineStore({
  id: 'user',

  state: () => {
    return {
      name: '张三'
    }
  },
  
  // 开启数据缓存
  persist: {
    enabled: true
  }
})
```

## 四、自定义 key
> 数据默认存在 sessionStorage 里，并且默认会以 store 的 id 作为sessionStorage存储时的key。

```js
persist: {
  enabled: true,
  strategies: [
    {
      key: 'my_user',//修改存储时候的key
      storage: localStorage,//修改存储方式
    }
  ]
}
```

## 五、持久化局部 state
> 默认所有 state 都会进行缓存，你能够通过 paths 指定要长久化的字段，其余的则不会进行长久化。

```js
state: () => {
  return {
    name: '张三',
    age: 18,
    gender: '男'
  }  
},

persist: {
  enabled: true,
  strategies: [
    {
      storage: localStorage,
      paths: ['name', 'age']//指定存储字段，如果不配置这个字段默认是state中的所有字段都进行存储
    }
  ]
}
```
