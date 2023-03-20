# Pinia模块化

> Pinia不需要像Vuex一样使用modules分模块，Pinia可在store目录中直接定义对应模块就可以了

## 一、目录结构

    store/user.js
    store/shop.js
    ...

## 二、store/user.js

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

## 三、某组件使用

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


