# vue-router 是利用vue的响应式原理来达到改变 url 即切换页面的效果, 他是强烈依赖vue的

## 1. vue-router在注册的时候为每个组件混合(mixin)了beforeCreate生命周期函数

- 首先判断了有没有引入VueRouter的实例, 如果有: 就为我们提供了直接访问 current 的操作: this.\$route, 和直接访问VueRouter实例的操作: this.\$router.
- 然后执行了VueRouter实例的init函数, 在init函数里面保存了组件实例, 提供了修改 current 的操作
- 把current设置成响应式的, 从而达到改变current就重新渲染页面, 用了_route来代理

## 2. 在VueRouter实例里面提供了间接修改 current 的函数 this.cb, 是在 init 的时候保存进去的

## 3. 创建了一个matched数组用于保存所有父子级关系, 在router-view的时候嵌套用到, 防止死循环渲染同一个组件
