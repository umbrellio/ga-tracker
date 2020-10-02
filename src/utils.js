const serialize = obj => Object
  .entries(obj)
  .reduce((mem, [key, value]) => ([...mem, `${key}=${value}`]), []).join("&")

const compact = obj => {
  const keys = Object.keys(obj)

  return keys.reduce((mem, key) => {
    const value = obj[key]
    if (value == null) return mem
    return {...mem, [key]: value}
  }, {})
}

export default {
  serialize,
  compact,
}
