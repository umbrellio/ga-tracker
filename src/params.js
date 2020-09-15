class Params {
  constructor(tracker, visitor) {
    this.tracker = tracker
    this.visitor = visitor
  }

  buildFor = event => {
    const baseParam = { v: 1, tid: this.tracker.identifier }
    const visitorParam = this.visitor.isEmpty() ? {} : { cid: this.visitor.identifier }

    return { ...baseParam, ...visitorParam, ...event.getPayload() }
  }
}

export default Params
