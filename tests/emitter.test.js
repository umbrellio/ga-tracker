import GATracker from "../src"

function mockXMLHttpRequest(status, data) {
  const mock = {
    open: jest.fn(),
    send: jest.fn(),
    status,
    response: data,
  }

  window.XMLHttpRequest = jest.fn().mockImplementation(() => mock);

  setTimeout(() => {
    status === 200 ? mock.onload() : mock.onerror()
  }, 0);

  return mock
}

const makeExpectation = (mock, { url, body, responseStatus, responseText }) => {
  return ({ status, response }) => {
    expect(status).toBe(responseStatus || 200)
    expect(response).toBe(responseText || "")
    expect(mock.open)
      .toHaveBeenCalledWith("POST", url || "https://www.google-analytics.com/collect", true)
    expect(mock.send).toHaveBeenCalledWith(body)
  }
}

it("sets a debug mode", () => {
  const mock = mockXMLHttpRequest(200, "")
  const emitter = GATracker.Emitter.create("U-XXX-1", "customer", { debug: true })
  const expectation = makeExpectation(mock, {
    url: "https://www.google-analytics.com/debug/collect",
    body: "v=1&tid=U-XXX-1&cid=customer&t=pageview&dl=/home"
  })
  return emitter.pageView("/home").then(expectation)
})

it("sets a new visitor", () => {
  const mock = mockXMLHttpRequest(200, "")
  const emitter = GATracker.Emitter.create("U-XXX-1", "customer")
  emitter.setVisitor("another-customer")
  const expectation = makeExpectation(mock, {
    body: "v=1&tid=U-XXX-1&cid=another-customer&t=pageview&dl=/home"
  })
  return emitter.pageView("/home").then(expectation)
})

it("clears a visitor param", () => {
  const emitter = GATracker.Emitter.create("U-XXX-1")
  const mock = mockXMLHttpRequest(200, "")
  const expectation = makeExpectation(mock, { body: "v=1&tid=U-XXX-1&t=pageview&dl=/home" })
  return emitter.pageView("/home").then(expectation)
})

it("sends pageview metric to GA", () => {
  const mock = mockXMLHttpRequest(200, "")
  const emitter = GATracker.Emitter.create("U-XXX-1", "customer")
  const expectation = makeExpectation(mock, {
    body: "v=1&tid=U-XXX-1&cid=customer&t=pageview&dl=/home"
  })
  return emitter.pageView("/home").then(expectation)
})

it("sends time metric to GA", () => {
  const mock = mockXMLHttpRequest(200, "")
  const emitter = GATracker.Emitter.create("U-XXX-1", "customer")
  const expectation = makeExpectation(mock, {
    body: "v=1&tid=U-XXX-1&cid=customer&t=timing&utc=app&utv=open&utt=1234"
  })
  return emitter.time("app", "open", 1234).then(expectation)
})

it("fails on error", () => {
  const mock = mockXMLHttpRequest(422, "something goes wrong")
  const emitter = GATracker.Emitter.create("U-XXX-1", "customer")
  const expectation = makeExpectation(mock, {
    responseStatus: 422,
    responseText: "something goes wrong",
    body: "v=1&tid=U-XXX-1&cid=customer&t=timing&utc=app&utv=open&utt=1234"
  })
  return emitter.time("app", "open", 1234).catch(expectation)
})
