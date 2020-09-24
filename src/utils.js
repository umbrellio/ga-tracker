const serialize = obj => Object
  .entries(obj)
  .reduce((mem, [key, value]) => ([...mem, `${key}=${value}`]), []).join("&")

const compact = obj => {
  const entries = Object.entries(obj).filter(([_key, value]) => value != null)
  return Object.fromEntries(entries)
}

export default {
  serialize,
  compact,
}
