export default {
  functional: true,
  render(h, { parent }) {
    const current = parent.$route
    const routerMap = parent.$router.routerMap
    return h(routerMap[current])
  }
}