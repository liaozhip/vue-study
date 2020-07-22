import { createRouteMap } from './create-route-map'

export function createMatcher(routes) {
  const { pathMap } = createRouteMap(routes)
  
  function match(path, location) {
    return createRoute(pathMap[path], location)
  }

  return {
    match
  }
}

export function createRoute(record, location) {
  
  const route = {
    name: location.name || (record && record.name),
    path: location.path || '/',
    hash: location.hash || '',
    matched: record ? formatMatch(record) : []
  }

  return Object.freeze(route)
}

function formatMatch (record) {
  const res = []
  while(record) {
    res.unshift(record)
    record = record.parent
  }
  return res
}
