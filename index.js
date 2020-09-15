import Emitter from "./src/emitter"

// ----

const emitter = Emitter.create("UA-177551981-1", "appuser_test")
emitter.pageView("/test-page")
