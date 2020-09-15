import utils from "./utils"
import http from "./http"

class API {
  constructor({ debug } = {}) {
    this.debug = !!debug
  }

  collect = params => http.post(this.getUrl("collect"), params)

  getUrl = path => {
    const components = []
    components.push("https://www.google-analytics.com")
    if (this.debug) components.push("debug")
    components.push(path)

    return utils.join(...components)
  }
}

export default API
