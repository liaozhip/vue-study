import { install } from './install'
import HashHistory from './history/hash'

export default class VueRouter {
  constructor(options = {}) {
    this.app = null
    this.options = options

    this.cb = null

    this.routerMap = {}
    this.options.routes.forEach(route => {
      this.routerMap[route.path] = route.component
    })

    this.history = new HashHistory(this)
  }

  listen(cb) {
    this.cb = cb
  }
}

VueRouter.install = install
