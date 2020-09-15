import Tracker from "./tracker"
import Visitor from "./visitor"
import Params from "./params"
import API from "./api"
import Events from "./events"

class Emitter {
  static create(tid, cid = null, options = {}) {
    const tracker = new Tracker(tid)
    const visitor = new Visitor(cid)
    return new Emitter(tracker, visitor, options)
  }

  constructor(tracker, visitor, options) {
    this.params = new Params(tracker, visitor)
    this.api = new API(options)
  }

  setVisitor = cid => {
    this.params.visitor = new Visitor(cid)
  }

  pageView = location => {
    const event = new Events.PageViewEvent({ location })
    return this.__emit(event)
  }

  time = (category, name, duration) => {
    const event = new Events.TimingEvent({ category, name, duration })
    return this.__emit(event)
  }

  __emit = event => {
    const payload = this.params.buildFor(event)
    return this.api.collect(payload)
  }
}

export default Emitter
