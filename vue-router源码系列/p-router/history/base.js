import { createRoute } from '../create-matcher'

export class History {
  constructor(router, base) {
    this.router = router
    this.base = base
    this.current = createRoute(null, { path: '/' })
    this.cb = null
    this.listeners = []
  }

  listen(cb) {
    this.cb = cb
  }

  updateRoute(route) {
    this.current = route
    this.cb && this.cb(route)
  }

  transitionTo(location) {
    const route = this.router.match(location, this.current)

    this.updateRoute(route)
    window.location.hash = location
  }

  teardownListeners() {
    this.listeners.forEach(cleanupListener => {
      cleanupListener()
    })
    this.listeners = []
  }
}