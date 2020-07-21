import View from './components/view'

let _Vue

export function install(Vue) {
  if (install.installed && _Vue === Vue) {
    return
  }
  install.installed = true

  _Vue = Vue

  Vue.mixin({
    beforeCreate() {
      if (this.$options.router !== undefined) {
        this._routerRoot = this
        this._router = this.$options.router
        Vue.util.defineReactive(this, '_route', this._router.history.current)
        this._router.listen((route) => {
          this._route = route
        })
      } else {
        this._routerRoot = (this.$parent && this.$parent._routerRoot) || this
      }
    }
  })

  Object.defineProperty(Vue.prototype, '$router', {
    get() {
      return this._routerRoot._router
    }
  })

  Object.defineProperty(Vue.prototype, '$route', {
    get() {
      return this._routerRoot._route
    }
  })

  Vue.component('router-view', View)
}
