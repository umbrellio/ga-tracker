class Event {
  __data = {}

  getPayload() {
    return this.__data
  }
}

class PageViewEvent extends Event {
  constructor({ location }) {
    super()
    this.__data = {
      t: "pageview",
      dl: location,
    }
  }
}

class TimingEvent extends Event {
  constructor({ category, name, duration }) {
    super()
    this.__data = {
      t: "timing",
      utc: category,
      utv: name,
      utt: duration,
    }
  }
}

export default {
  PageViewEvent,
  TimingEvent,
}
