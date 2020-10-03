import errors from "./errors"

const makeRequest = (verb, url, body) => new Promise((resolve, reject) => {
  const xhr = new XMLHttpRequest()

  xhr.responseType = "json"
  xhr.onload = () => resolve({ status: xhr.status, response: xhr.response })
  xhr.onerror = () => {
    const status = xhr.status
    if (!status) {
      reject(new errors.ConnectionError())
    } else {
      reject(new errors.NetworkError(xhr.status, xhr.response))
    }
  }

  xhr.open(verb, url, true)
  xhr.send(body)
})

const post = (url, body) => makeRequest("POST", url, body)

export default {
  post,
}
