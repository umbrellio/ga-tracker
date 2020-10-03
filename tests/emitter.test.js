import GATracker from "../src"

import { mockXMLHttpRequest } from "./support"

it("tries to send after 5 seconds without uid", () => {
  const mock = mockXMLHttpRequest()
  const emitter = GATracker.create("U-XXX-1")

  jest.useFakeTimers()
  const promise = emitter.pageview({ dp: "/home" })
  expect(mock.send).not.toHaveBeenCalled()
  emitter.set("uid", "customer")

  jest.runAllTimers()

  return promise.then(() => {
    expect(mock.send).toHaveBeenCalled()
  })
})

it("sends pageview data", () => {
  const mock = mockXMLHttpRequest()
  const emitter = GATracker.create("U-XXX-1")

  emitter.set("uid", "customer")
  return emitter.pageview({ dp: "/home" }).then(() => {
    expect(mock.send).toHaveBeenCalledWith("tid=U-XXX-1&v=1&uid=customer&t=pageview&dp=/home")
  })
})

it("sends timing data", () => {
  const mock = mockXMLHttpRequest()
  const emitter = GATracker.create("U-XXX-1")

  emitter.set("uid", "customer")
  return emitter.timing({ utc: "category", utv: "var", utt: 1 }).then(() => {
    expect(mock.send)
      .toHaveBeenCalledWith("tid=U-XXX-1&v=1&uid=customer&t=timing&utc=category&utv=var&utt=1")
  })
})

it("request is forbidden", () => {
  const mock = mockXMLHttpRequest({ status: 0 })
  const emitter = GATracker.create("U-XXX-1")

  emitter.set("uid", "customer")
  return emitter.pageview({ dp: "/home" }).catch(error => {
    expect(error).toBeInstanceOf(GATracker.Errors.ConnectionError)
    expect(mock.send).toHaveBeenCalled()
  })
})

it("fails on error", () => {
  const mock = mockXMLHttpRequest({ status: 422 })
  const emitter = GATracker.create("U-XXX-1")

  emitter.set("uid", "customer")
  return emitter.pageview({ dp: "/home" }).catch(error => {
    expect(error).toBeInstanceOf(GATracker.Errors.NetworkError)
    expect(error.status).toBe(422)
    expect(mock.send).toHaveBeenCalled()
  })
})
