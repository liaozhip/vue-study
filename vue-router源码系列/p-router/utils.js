export function getUrl(path) {
  const href = window.location.href
  const i = href.indexOf('#')
  const base = i > -1 ? href.slice(0, i) : href
  return `${base}#${path}`
}

export function pushState(url, replace) {
  const history = window.history

  if (replace) {
    const stateCopy = Object.assign({}, history.state)
    stateCopy.key = Date.now().toFixed(3)
    history.replaceState(stateCopy, '', url)
  } else {
    history.pushState({ key: Date.now().toFixed(3) }, '', url)
  }
}
