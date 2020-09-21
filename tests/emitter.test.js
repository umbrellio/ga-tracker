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

const makeExpectation = (mock, { url, bodies }) => {
  return () => {
    expect(mock.open)
      .toHaveBeenCalledWith("POST", url || "https://www.google-analytics.com/batch", true)
    bodies.forEach((body, index) => {
      expect(mock.send).toHaveBeenNthCalledWith(index + 1, body)
    })
  }
}

it("sets a debug mode", () => {
  const mock = mockXMLHttpRequest(200, "")
  const emitter = GATracker.Emitter.create("U-XXX-1", "customer", { debug: true })
  const expectation = makeExpectation(mock, {
    url: "https://www.google-analytics.com/debug/batch",
    bodies: ["v=1&tid=U-XXX-1&cid=customer&t=pageview&dl=/home"]
  })
  emitter.pageView("/home")
  return emitter.commit().then(expectation)
})

it("sends a stack of events", () => {
  const mock = mockXMLHttpRequest(200, "")
  const emitter = GATracker.Emitter.create("U-XXX-1", "customer")
  const expectation = makeExpectation(mock, {
    bodies: [
      "v=1&tid=U-XXX-1&cid=customer&t=pageview&dl=/home\n" +
        "v=1&tid=U-XXX-1&cid=customer&t=pageview&dl=/home\n" +
        "v=1&tid=U-XXX-1&cid=customer&t=pageview&dl=/home\n" +
        "v=1&tid=U-XXX-1&cid=customer&t=pageview&dl=/home\n" +
        "v=1&tid=U-XXX-1&cid=customer&t=pageview&dl=/home",
      "v=1&tid=U-XXX-1&cid=customer&t=pageview&dl=/contacts\n" +
        "v=1&tid=U-XXX-1&cid=customer&t=pageview&dl=/contacts\n" +
        "v=1&tid=U-XXX-1&cid=customer&t=pageview&dl=/contacts\n" +
        "v=1&tid=U-XXX-1&cid=customer&t=pageview&dl=/contacts\n" +
        "v=1&tid=U-XXX-1&cid=customer&t=pageview&dl=/contacts"
    ]
  })
  for (let i = 0; i < 5; i++) emitter.pageView("/home")
  for (let i = 0; i < 5; i++) emitter.pageView("/contacts")
  return emitter.commit().then(expectation)
})

it("sets a new visitor", () => {
  const mock = mockXMLHttpRequest(200, "")
  const emitter = GATracker.Emitter.create("U-XXX-1", "customer")
  emitter.setVisitor({ identifier: "another-customer" })
  const expectation = makeExpectation(mock, {
    bodies: ["v=1&tid=U-XXX-1&uid=another-customer&t=pageview&dl=/home"]
  })
  emitter.pageView("/home")
  return emitter.commit().then(expectation)
})

it("clears a visitor param", () => {
  const emitter = GATracker.Emitter.create("U-XXX-1")
  const mock = mockXMLHttpRequest(200, "")
  const expectation = makeExpectation(mock, { bodies: ["v=1&tid=U-XXX-1&t=pageview&dl=/home"] })
  emitter.pageView("/home")
  return emitter.commit().then(expectation)
})

it("sends pageview metric to GA", () => {
  const mock = mockXMLHttpRequest(200, "")
  const emitter = GATracker.Emitter.create("U-XXX-1", "customer")
  const expectation = makeExpectation(mock, {
    bodies: ["v=1&tid=U-XXX-1&cid=customer&t=pageview&dl=/home"]
  })
  emitter.pageView("/home")
  return emitter.commit().then(expectation)
})

it("sends time metric to GA", () => {
  const mock = mockXMLHttpRequest(200, "")
  const emitter = GATracker.Emitter.create("U-XXX-1", "customer")
  const expectation = makeExpectation(mock, {
    bodies: ["v=1&tid=U-XXX-1&cid=customer&t=timing&utc=app&utv=open&utt=1234"]
  })
  emitter.time("app", "open", 1234)
  return emitter.commit().then(expectation)
})

it("fails on error", () => {
  mockXMLHttpRequest(422, "something goes wrong")
  const onError = jest.fn()
  const emitter = GATracker.Emitter.create("U-XXX-1", "customer", { onError })
  emitter.time("app", "open", 1234)
  return emitter.commit().then(() => {
    expect(onError).toHaveBeenCalledWith({
      status: 422,
      response: "something goes wrong"
    })
  })
})
