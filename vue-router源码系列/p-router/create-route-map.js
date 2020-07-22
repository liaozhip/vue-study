export function createRouteMap(routes, oldPathList, oldPathMap, oldNameMap) {
  const pathList = oldPathList || []
  const pathMap = oldPathMap || Object.create(null)
  const nameMap = oldNameMap || Object.create(null)

  routes.forEach(route => {
    addRouteRecord(pathList, pathMap, nameMap, route)
  })

  for (let i = 0, l = pathList.length; i < l; i++) {
    if (pathList[i] === '*') {
      pathList.push(pathList.splice(i, 1)[0])
      l--
      i--
    }
  }

  return {
    pathList,
    pathMap,
    nameMap
  }
}

function addRouteRecord(pathList, pathMap, nameMap, route, parent, matchAs) {
  const { path, name } = route

  const normalizedPath = normalizePath(path, parent, true)

  const record = {
    path: normalizedPath,
    component: route.component,
    parent,
    name
  }

  if (route.children) {
    route.children.forEach(child => {
      const childMatchAs = matchAs ? cleanPath(`${matchAs}/${child.path}`) : undefined
      addRouteRecord(pathList, pathMap, nameMap, child, record, childMatchAs)
    })
  }

  if (!pathMap[record.path]) {
    pathList.push(record.path)
    pathMap[record.path] = record
  }

  if (name) {
    if (!nameMap[name]) {
      nameMap[name] = record
    }
  }

  function normalizePath (path, parent, strict) {
    if (!strict) path = path.replace(/\/$/, '')
    if (path[0] === '/') return path
    if (parent == null) return path
    return cleanPath(`${parent.path}/${path}`)
  }

  function cleanPath(path) {
    return path.replace(/\/\//, '')
  }
}
