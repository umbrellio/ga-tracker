const REQUIRED_PARAMS = [
  ["cid", "uid"],
  ["tid"],
  ["v"]
]

const canBeSent = params => {
  const paramsKeys = Object.keys(params)
  return REQUIRED_PARAMS.every(keys => keys.some(key => paramsKeys.includes(key)))
}

export default { canBeSent }
