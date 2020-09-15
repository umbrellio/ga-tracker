const serialize = obj => Object
  .entries(obj)
  .reduce((mem, [key, value]) => ([...mem, `${key}=${value}`]), []).join("&")

const join = (...parts) => parts.map(x => x.replace(/^\/+|\/+$/g, "")).join("/")

export default {
  serialize,
  join,
}
