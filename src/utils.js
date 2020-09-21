const serialize = obj => Object
  .entries(obj)
  .reduce((mem, [key, value]) => ([...mem, `${key}=${value}`]), []).join("&")

const join = (...parts) => parts.map(x => x.replace(/^\/+|\/+$/g, "")).join("/")

const chunks = (array, len) => {
  const newLen = Math.ceil(array.length/len)
  return new Array(newLen).fill(null).map((x, i) => array.slice(i*len,i*len+len))
}

export default {
  serialize,
  join,
  chunks,
}
