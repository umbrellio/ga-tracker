import utils from "./utils"
import http from "./http"

const makeBody = object => encodeURI(utils.serialize(object))

class API {
  constructor({ debug }) {
    this.debug = !!debug
  }

  batch = payloads => {
    const params = payloads.map(makeBody).join("\n")
    return http.post(this.getUrl("batch"), params)
  }

  getUrl = path => {
    const components = []
    components.push("https://www.google-analytics.com")
    if (this.debug) components.push("debug")
    components.push(path)

    return utils.join(...components)
  }
}

export default API
