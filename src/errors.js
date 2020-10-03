class NetworkError extends Error {
  constructor(status, response) {
    super()
    this.status = status
    this.response = response
  }
}

class ConnectionError extends Error {}

export default {
  NetworkError,
  ConnectionError,
}
