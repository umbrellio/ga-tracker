import Tracker from "./tracker"
import Visitor from "./visitor"
import Params from "./params"
import API from "./api"
import Events from "./events"
import utils from "./utils"

class Emitter {
  static create(tid, cid = null, options = {}) {
    const tracker = new Tracker(tid)
    const visitor = new Visitor({ uuid: cid })
    return new Emitter(tracker, visitor, options)
  }

  BATCH_SIZE = 10
  BATCH_TRESHOLD = 5
  stack = []
  /* istanbul ignore next */
  errorHandler = () => {}

  constructor(tracker, visitor, options) {
    this.params = new Params(tracker, visitor)
    this.api = new API(options)

    // Options
    options.onError && (this.errorHandler = options.onError)
  }

  setVisitor = ({ identifier, uuid }) => {
    this.params.visitor = new Visitor({ identifier, uuid })
  }

  pageView = location => {
    const event = new Events.PageViewEvent({ location })
    this.__track(event)
  }

  time = (category, name, duration) => {
    const event = new Events.TimingEvent({ category, name, duration })
    this.__track(event)
  }

  commit = () => {
    const promises = utils.chunks(this.stack, this.BATCH_SIZE).map(events => {
      const payloads = events.map(this.params.buildFor)
      return this.api.batch(payloads).catch(this.errorHandler)
    })

    this.stack = []
    return Promise.all(promises)
  }

  __track = event => {
    const len = this.__append(event)
    if (this.params.visitor.isEmpty()) return
    if (len >= this.BATCH_TRESHOLD) this.commit()
  }

  __append = event => this.stack.push(event)
}

export default Emitter
