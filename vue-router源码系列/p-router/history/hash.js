export default class HashHistory {
  constructor(router) {
    this.current = this.getHash() || '/'
    this.change()
    this.router = router
  }

  getHash() {
    return window.location.hash.slice(1)
  }

  change() {
    window.addEventListener('hashchange', this.hashChange.bind(this))
  }

  hashChange() {
    this.router.cb(this.getHash())
  }

}

