# Pinia模块化

> Pinia不需要像Vuex一样使用modules分模块，Pinia可在store目录中直接定义对应模块就可以了

## 一、目录结构

    store/index.js
    store/user.js
    store/shop.js
    ...

## 二、main.js
```js
import { createApp } from "vue"
import store from "./store/index.js"

import App from "./App.vue"
import router from "./router"

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(store)
app.mount("#app")
```


## 三、store/index.js

```js
import { createPinia } from 'pinia'
const store = createPinia()
export default store
```

## 四、store/user.js

```js
import { defineStore } from 'pinia'

export const user = defineStore({
  id: 'user',
  state:()=>{
  	return {
        userInfo:{
            nickName:'章三'
        },
        token:'xfdfdsjkdsj'
  	}
  },
  getters:{

  },
  actions:{
  	
  }
})
```

## 五、某组件使用

```js
<template>
	<div>
		<h1>A组件</h1>
		{{ userInfo.nickName }}
	</div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { user } from '../store/user'
const store = user();
let { userInfo } = storeToRefs(store);
</script>
```


