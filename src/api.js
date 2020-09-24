import http from "./http"
import utils from "./utils"

const send = params => {
  const body = encodeURI(utils.serialize(params))
  return http.post("https://www.google-analytics.com/collect", body)
}

export default {
  send
}
