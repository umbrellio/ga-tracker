import api from "./api"
import utils from "./utils"
import validations from "./validations"
import errors from "./errors"

let vars = {}

const buildParams = data => utils.compact({ ...vars, ...data })

const timeout = wait => new Promise(resolve => setTimeout(resolve, wait))

const send = data => {
  const params = buildParams(data)
  if (validations.canBeSent(params)) return api.send(params)
  else return timeout(3000).then(() => send(data))
}

const set = (name, value) => (vars[name] = value)

const pageview = ({ dl, dh, dp, dt }) => send({ t: "pageview", dl, dh, dp, dt })

const timing = ({ utc, utv, utt, utl }) => send({ t: "timing", utc, utv, utt, utl })

const create = tid => {
  set("tid", tid)
  set("v", 1)

  return {
    set,
    pageview,
    timing,
  }
}

export default { 
  create,
  Errors: errors,
}
