class Params {
  constructor(tracker, visitor) {
    this.tracker = tracker
    this.visitor = visitor
    this.event = event
  }

  buildFor = event => {
    return {
      v: 1,
      tid: this.tracker.identifier,
      cid: this.visitor.identifier,
      ...event.getPayload(),
    }
  }
}

export default Params
