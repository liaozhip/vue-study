import { History } from './base'

export default class HashHistory extends History {
  constructor(router, base) {
    super(router, base)
  }

  setupListeners() {
    const handleRoutingEvent = () => {
      this.transitionTo(this.getHash())
    }

    window.addEventListener('hashchange', handleRoutingEvent)

    this.listeners.push(() => {
      window.removeEventListener('hashchange', handleRoutingEvent)
    })
  }
  
  getHash() {
    return window.location.hash.slice(1) || '/'
  }

  push(location) {
    this.transitionTo(location)
  }

}
