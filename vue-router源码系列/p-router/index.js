import { install } from './install'
import { createMatcher } from './create-matcher'
import HashHistory from './history/hash'

export default class VueRouter {
  constructor(options = {}) {
    this.app = null
    this.apps = []
    this.options = options

    this.matcher = createMatcher(options.routes || [])

    let mode = options.mode || 'hash'
    this.mode = mode

    switch(mode) {
      case 'hash':
        this.history = new HashHistory(this, options.base)
    }

  }

  match(raw, current) {
    return this.matcher.match(raw, current)
  }

  get currentRoute() {
    return this.history && this.history.current
  }

  init(app) {
    this.apps.push(app)

    app.$once('hook:destroyed', () => {
      const index = this.apps.indexOf(app)
      if (index > -1) {
        this.apps.splice(index, 1)
      }

      if (this.app === app) {
        this.app = this.apps[0] || null
      }

      if (!this.app) {
        this.history.teardownListeners()
      }
    })

    if (this.app) {
      return
    }

    this.app = app
    const history = this.history

    if (!history) {
      return
    }

    history.setupListeners()

    history.transitionTo(history.getHash())

    history.listen(route => {
      this.apps.forEach(app => {
        app._route = route
      })
    })
  }

  push(location) {
    this.history.push(location)
  }
}

VueRouter.install = install

window.Vue && window.Vue.use(VueRouter)
