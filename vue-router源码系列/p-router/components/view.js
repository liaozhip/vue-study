export default {
  name: 'RouterView',

  functional: true,

  render(_, { parent, children, data }) {
    data.routerView = true

    const h = parent.$createElement
    const route = parent.$route

    let depth = 0
    while(parent && parent._routerRoot !== parent) {
      const vnodeData = parent.$vnode ? parent.$vnode.data : {}
      if (vnodeData.routerView) {
        depth++
      }
      parent = parent.$parent
    }

    const matched = route.matched[depth]
    const component = matched && matched.component

    if (!matched || !component) {
      return h()
    }

    return h(component, data, children)
  }
}