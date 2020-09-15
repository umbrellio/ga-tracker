const serialize = obj => {
  return Object.entries(obj).reduce((mem, [key, value]) => {
    if (obj.hasOwnProperty(key)) return [...mem, `${key}=${value}`]
    return mem
  }, []).join("&")
}

const join = (...parts) => parts.map(x => x.replace(/^\/+|\/+$/g, "")).join("/")

export default {
  serialize,
  join,
}
