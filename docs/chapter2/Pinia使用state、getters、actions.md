# Pinia使用state、getters、actions

## 一、安装使用Pinia

1.1 安装下载

```shell
yarn add pinia
# or with npm
npm install pinia
```

1.2 main.js引入
```javascript
import { createPinia } from 'pinia'

app.use(createPinia())
```

1.3 根目录新建store/index.js中写入
```javascript
import { defineStore } from 'pinia'

//要注意：id要保持唯一性，不能重复

//id的声明方式1：
export const useStore = defineStore({
  id:'storeId',	
  state: () => {
    return {
      counter: 0,
    }
  },
  getters:{},
  actions:{}
})

//id的声明方式2：
export const useStore = defineStore('storeId', {
  state: () => {
    return {
      counter: 0,
    }
  },
  getters:{},
  actions:{}
})
```

1.4 组件使用
```javascript
<script setup>
import { useStore } from '../store'
const store = useStore();
</script>
```

## 二、State

2.1 Pinia定义state数据
```javascript
import { defineStore } from 'pinia'

export const useStore = defineStore('storeId', {
  state: () => {
    return {
      counter: 0,
      name: 'Eduardo',
      isAdmin: true,
    }
  },
  getters:{},
  actions:{}
})
```

2.2 组件使用pinia的state数据
```javascript
<template>
	<div>
		<h1>A组件</h1>
		{{ name }}
	</div>
</template>

<script setup>
import { useStore } from '../store'
const store = useStore();
let { name } = store;
</script>
```

2.3 组件修改pinia的state数据

> 本身pinia可以直接修改state数据，无需像vuex一样通过mutations才可以修改，但是上面写的let { name } = store;这种解构方式解构出来的数据不是响应式的，所以要用pinia提供的storeToRefs进行解构，注意结果出来的数据是ref的类型，在js中使用的时候需要加上.value。

```js
<template>
	<div>
		<h1>A组件</h1>
		{{ name }}
		<button @click='btn'>按钮</button>
	</div>
</template>
<script setup>
import { storeToRefs } from 'pinia'
import { useStore } from '../store'
const store = useStore();
let { name }  = storeToRefs(store);
const btn = ()=>{
	//解构出来的数据是ref类型，使用的时候需要加上.value
	name.value = '123';
}
</script>
```

2.4 如果state数据需要批量更新

> store/index.js

```js
import { defineStore } from 'pinia'

export const useStore = defineStore('storeId', {
  state: () => {
    return {
      counter: 0,
      name: 'Eduardo',
      arr:['a','b','c']
    }
  },
  getters:{},
  actions:{}
})
```

> 组件代码

```js
<template>
	<div>
		<h1>A组件</h1>
		{{ name }}
		{{ counter }}
		{{ arr }}
		<button @click='btn'>按钮</button>
	</div>
</template>
<script setup>
import { storeToRefs } from 'pinia'
import { useStore } from '../store'
const store = useStore();
let { name,counter,arr }  = storeToRefs(store);
const btn = ()=>{
	//批量更新
	store.$patch(state=>{
		state.counter++;
		state.arr.push(4);
		state.name = '456';
	})
}
</script>
```

**使用$patch进行批量更新**

2.5 如果state数据需要重置

> store/index.js

```js
import { defineStore } from 'pinia'

export const useStore = defineStore('storeId', {
  state: () => {
    return {
      counter: 0,
      name: 'Eduardo',
      arr:['a','b','c']
    }
  },
  getters:{},
  actions:{}
})
```

> 组件代码

```js
<template>
	<div>
		<h1>A组件</h1>
		{{ name }}
		{{ counter }}
		{{ arr }}
		<button @click='btn'>按钮</button>
	</div>
</template>
<script setup>
import { storeToRefs } from 'pinia'
import { useStore } from '../store'
const store = useStore();
let { name,counter,arr }  = storeToRefs(store);
const btn = ()=>{
	//重置数据为初始值
	store.$reset()
}
</script>
```
**使用$reset进行批量更新**

## 三、getters
> getters和vuex的getters几乎类似，也是有缓存的机制

```js
import { defineStore } from 'pinia'

export const useStore = defineStore('storeId', {
  state: () => {
    return {
      counter: 0,
    }
  },
  getters:{
  	counterPar(){
		//getters和computed一样也有缓存机制，下面魔板中调用了三次，但是只会输出一次111，说明有缓存机制
		console.log(111)
  		//这里要注意是通过this来引用state中定义的数据
  		return this.counter + 100;
  	}
  },
  actions:{}
})
<template>
	<div>
		{{ counterPar }}
		{{ counterPar }}
		{{ counterPar }}
		<h1>A组件</h1>
		{{ counter }}
	</div>
</template>
<script setup>
import { storeToRefs } from 'pinia'
import { useStore } from '../store'
const store = useStore();

//再使用getter的时候，可以先解构一下，这样就可以不用使用这种冗余的方式调用store.counterPar
let { counter, counterPar }  = storeToRefs(store);
</script>
```


## 四、actions

> actions中可以进行同步操作，也可以进行异步操作

```js
import { defineStore } from 'pinia'

export const useStore = defineStore('storeId', {
  state: () => {
    return {
      counter: 0
    }
  },
  getters:{},
  actions:{
  	changeCounter( val ){
		//注意这里是通过this来引用state中的值
  		this.counter += val;
  	}
  }
})
<template>
	<div>
		<h1>A组件</h1>
		{{ counter }}
		<button @click='add'>加10</button>
	</div>
</template>
<script setup>
import { storeToRefs } from 'pinia'
import { useStore } from '../store'
const store = useStore();
let { counter }  = storeToRefs(store);
const add = ()=>{
	store.changeCounter(10);
}
</script>
```



