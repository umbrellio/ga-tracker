class Event {
  __data = {}

  getPayload() {
    return this.__data
  }
}

class PageViewEvent extends Event {
  constructor(location) {
    super(location)
    this.__data = {
      t: "pageview",
      dl: location,
    }
  }
}

export default {
  PageViewEvent,
}
