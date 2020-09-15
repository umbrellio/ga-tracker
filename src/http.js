import utils from "./utils"

const makeBody = object => encodeURI(utils.serialize(object))

const makeRequest = (verb, url, body) => new Promise((resolve, reject) => {
  const xhr = new XMLHttpRequest()

  xhr.responseType = "json"
  xhr.onload = () => resolve({ status: xhr.status, response: xhr.response })
  xhr.onerror = () => reject({ status: xhr.status, response: xhr.response })

  xhr.open(verb, url, true)
  xhr.send(makeBody(body))
})

const post = (url, body) => makeRequest("POST", url, body)

export default {
  post,
}
