class Params {
  constructor(tracker, visitor) {
    this.tracker = tracker
    this.visitor = visitor
  }

  buildFor = event => ({
    v: 1,
    tid: this.tracker.identifier,
    ...this.__getVisitorParams(),
    ...event.getPayload(),
  })

  __getVisitorParams = () => {
    if (this.visitor.isEmpty()) return {}

    const obj = {}
    if (this.visitor.uuid) obj["cid"] = this.visitor.uuid
    if (this.visitor.identifier) obj["uid"] = this.visitor.identifier
    return obj
  }
}

export default Params
